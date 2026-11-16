'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getDSATopics, apiCall } from '@/lib/api';
import { ArrowLeft, Mic, MicOff, Video, VideoOff, LogOut, Send } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  module: number;
}

interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  difficulty: string;
}

interface InterviewResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export default function InterviewPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);

  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState<'topic-selection' | 'interview' | 'results'>('topic-selection');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [interviewResults, setInterviewResults] = useState<InterviewResult[]>([]);
  const [botIntroduced, setBotIntroduced] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Load topics
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const topicsData = await getDSATopics();
        setTopics(topicsData);
      } catch (err) {
        console.error('Failed to load topics:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTopics();

    // Initialize speech recognition (client-side only)
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);
        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              setUserAnswer(transcript);
            } else {
              interimTranscript += transcript;
            }
          }
          setTranscript(interimTranscript);
        };
      }
    }
  }, [router]);

  // Start camera
  const startCamera = async () => {
    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
        alert('Camera not supported in this browser');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: true
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      const errorMsg = err?.name === 'NotAllowedError'
        ? 'Camera/microphone permission denied. Please allow in browser settings.'
        : err?.name === 'NotFoundError'
        ? 'Camera/microphone not found. Please check your device.'
        : 'Unable to access camera. Please check permissions.';
      alert(errorMsg);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  // Get female voice
  const getFemaleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    // Try to find a female voice - prefer Google voices or female-sounding ones
    const femaleVoice = voices.find(voice =>
      voice.name.includes('Female') ||
      voice.name.includes('woman') ||
      voice.name.includes('female') ||
      (voice.name.includes('Google') && voice.name.includes('UK English')) ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Victoria') ||
      voice.name.includes('Moira')
    ) || voices.find(voice => voice.name.includes('female'));
    return femaleVoice || (voices.length > 0 ? voices[0] : null);
  };

  // Text to speech with female voice
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.2;
      utterance.volume = 1;

      const femaleVoice = getFemaleVoice();
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start listening to user answer
  const startListening = () => {
    if (typeof window !== 'undefined' && recognitionRef.current) {
      setUserAnswer('');
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  // Start interview
  const startInterview = async (topic: Topic) => {
    setSelectedTopic(topic);
    await startCamera();
    setStage('interview');

    // Bot introduction
    const introText = `Hello! I am your AI Interview Bot. I will be conducting a mock interview on ${topic.name}. I will ask you questions, and you need to answer them. After each answer, I will tell you if it's correct or not. At the end, I will provide you with the correct answers for all questions. Let's start!`;
    speakText(introText);
    setBotIntroduced(true);

    // Load questions
    setTimeout(() => {
      loadQuestions(topic);
    }, 5000);
  };

  // Load questions for selected topic
  const loadQuestions = async (topic: Topic) => {
    try {
      // Get questions from backend
      const questionsData = await apiCall(`/dsa/interview-questions/${topic.id}`, {
        method: 'GET'
      });
      setQuestions(questionsData);
      setCurrentQuestionIndex(0);
      setCurrentQuestion(questionsData[0]);

      // Ask first question
      setTimeout(() => {
        speakText(questionsData[0].question);
      }, 500);
    } catch (err) {
      console.error('Failed to load questions:', err);
      alert('Failed to load interview questions');
    }
  };

  // Submit answer
  const submitAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) {
      alert('Please provide an answer');
      return;
    }

    try {
      // Evaluate answer
      const evaluation = await apiCall('/ai/evaluate-answer', {
        method: 'POST',
        body: JSON.stringify({
          question: currentQuestion.question,
          userAnswer,
          correctAnswer: currentQuestion.correctAnswer,
          topic: selectedTopic?.name
        })
      });

      // Store result
      const result: InterviewResult = {
        question: currentQuestion.question,
        userAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: evaluation.isCorrect
      };
      setInterviewResults([...interviewResults, result]);

      // Provide feedback
      if (evaluation.isCorrect) {
        speakText('Correct! Well done. That is an excellent answer.');

        // Move to next question after 3 seconds
        setTimeout(() => {
          if (currentQuestionIndex + 1 < questions.length) {
            const nextQuestion = questions[currentQuestionIndex + 1];
            setCurrentQuestion(nextQuestion);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer('');
            setTimeout(() => speakText(nextQuestion.question), 500);
          } else {
            endInterview();
          }
        }, 3000);
      } else {
        // For incorrect answers, provide the correct answer
        speakText(`I'm sorry, that's incorrect. The correct answer is: ${currentQuestion.correctAnswer}`);

        // Move to next question after 5 seconds (longer time to hear the correct answer)
        setTimeout(() => {
          if (currentQuestionIndex + 1 < questions.length) {
            const nextQuestion = questions[currentQuestionIndex + 1];
            setCurrentQuestion(nextQuestion);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer('');
            setTimeout(() => speakText(nextQuestion.question), 500);
          } else {
            endInterview();
          }
        }, 5000);
      }
    } catch (err) {
      console.error('Error evaluating answer:', err);
    }
  };

  // End interview
  const endInterview = async () => {
    stopCamera();
    speakText('Interview completed! Here are the results.');
    setStage('results');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300">Back to Dashboard</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-400 hover:text-red-300 flex items-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Topic Selection */}
        {stage === 'topic-selection' && (
          <div>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-2">Mock Interview</h1>
              <p className="text-slate-400">Select a topic to start your interview</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => startInterview(topic)}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition cursor-pointer"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{topic.name}</h3>
                  <p className="text-slate-400 mb-4">Module {topic.module}</p>
                  <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition">
                    Start Interview <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interview */}
        {stage === 'interview' && selectedTopic && (
          <div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Video Feed */}
              <div>
                <div className="bg-black rounded-lg overflow-hidden mb-4 h-96">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      if (cameraActive) stopCamera();
                      else startCamera();
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      cameraActive
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    }`}
                  >
                    {cameraActive ? (
                      <>
                        <VideoOff className="w-4 h-4" /> Stop Camera
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4" /> Start Camera
                      </>
                    )}
                  </button>
                  <button
                    onClick={startListening}
                    disabled={isListening}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      isListening
                        ? 'bg-purple-500 text-white'
                        : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <Mic className="w-4 h-4 animate-pulse" /> Listening...
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4" /> Start Speaking
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Question & Answer */}
              <div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <p className="text-slate-400 text-sm mb-2">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {currentQuestion?.question}
                  </h3>

                  <div className="mb-6">
                    <label className="text-slate-300 text-sm mb-2 block">Your Answer</label>
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Speak your answer or type here..."
                      className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      rows={4}
                    />
                  </div>

                  {transcript && (
                    <div className="mb-4 p-3 bg-blue-900/30 border border-blue-700 rounded">
                      <p className="text-blue-300 text-sm">Interim: {transcript}</p>
                    </div>
                  )}

                  <button
                    onClick={submitAnswer}
                    disabled={isSpeaking}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition font-semibold disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" /> Submit Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {stage === 'results' && (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Interview Results</h1>
              <p className="text-slate-400">Review your answers and correct solutions</p>
            </div>

            <div className="space-y-6">
              {interviewResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg p-6 ${
                    result.isCorrect
                      ? 'bg-green-900/30 border-green-700'
                      : 'bg-red-900/30 border-red-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex-1">
                      Question {idx + 1}: {result.question}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        result.isCorrect
                          ? 'bg-green-900 text-green-200'
                          : 'bg-red-900 text-red-200'
                      }`}
                    >
                      {result.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-slate-300 text-sm mb-2">Your Answer:</p>
                    <p className="text-slate-200 bg-slate-900/50 p-3 rounded">
                      {result.userAnswer}
                    </p>
                  </div>

                  {!result.isCorrect && (
                    <div>
                      <p className="text-slate-300 text-sm mb-2">Correct Answer:</p>
                      <p className="text-green-200 bg-slate-900/50 p-3 rounded">
                        {result.correctAnswer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href="/dashboard"
                className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition font-semibold text-center"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={() => {
                  setStage('topic-selection');
                  setSelectedTopic(null);
                  setInterviewResults([]);
                  setCurrentQuestionIndex(0);
                  setBotIntroduced(false);
                }}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-semibold"
              >
                Take Another Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
