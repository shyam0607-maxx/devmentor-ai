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
  const [showDeviceTest, setShowDeviceTest] = useState(false);
  const [micTestResult, setMicTestResult] = useState<string | null>(null);
  const [speakerTestResult, setSpeakerTestResult] = useState<string | null>(null);

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
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.maxAlternatives = 1;
        console.log('✅ Speech Recognition initialized successfully');

        recognitionRef.current.onstart = () => {
          console.log('✅ Speech recognition started - listening for voice...');
          setIsListening(true);
          setTranscript('');
          setUserAnswer('');
        };

        recognitionRef.current.onend = () => {
          console.log('Speech recognition ended');
          setIsListening(false);
        };

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript.trim();
            const confidence = event.results[i][0].confidence;
            console.log(`📝 Result ${i}: "${transcript}" (confidence: ${(confidence * 100).toFixed(0)}%, final: ${event.results[i].isFinal})`);

            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            const trimmedAnswer = finalTranscript.trim();
            console.log('✅ Final transcript captured:', trimmedAnswer);
            setUserAnswer(trimmedAnswer);
            setTranscript('');
          } else if (interimTranscript) {
            console.log('⏳ Interim transcript:', interimTranscript);
            setTranscript(interimTranscript);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);

          const errorMessages: { [key: string]: string } = {
            'no-speech': 'No speech detected. Make sure to:\n• Speak clearly and loudly\n• Check microphone is working\n• Speak for at least 1 second\n\nTry again!',
            'audio-capture': 'Microphone not found:\n• Check microphone is connected\n• Grant browser permission\n• Try a different browser',
            'network': 'Connection error. Check internet and try again.',
            'not-allowed': 'Microphone permission denied:\n• Click the camera icon in address bar\n• Allow microphone access\n• Reload the page',
            'service-not-allowed': 'Speech service blocked. Try using Chrome or Edge browser.',
          };

          const errorMsg = errorMessages[event.error] || `Speech error: ${event.error}`;
          console.log('Error message shown:', errorMsg);
          alert(errorMsg);

          // Auto-retry for no-speech errors
          if (event.error === 'no-speech') {
            console.log('Retrying speech recognition...');
            setTimeout(() => {
              if (recognitionRef.current) {
                try {
                  recognitionRef.current.start();
                } catch (e) {
                  console.error('Could not retry:', e);
                }
              }
            }, 1000);
          }
        };
      } else {
        console.warn('Speech Recognition not supported in this browser');
        alert('Speech Recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
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

  // Get female voice - prioritize sweet, clear female voices
  const getFemaleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

    const voices = window.speechSynthesis.getVoices();
    console.log('Available voices:', voices.map(v => v.name));

    // Priority 1: Explicit female voices with good names
    const priorityNames = [
      'Victoria',
      'Samantha',
      'Moira',
      'Fiona',
      'Google UK English Female',
      'Google US English Female',
      'Microsoft Zira',
      'Microsoft Aria',
      'Google English US Female',
    ];

    for (const name of priorityNames) {
      const voice = voices.find(v => v.name.includes(name));
      if (voice) {
        console.log('Using priority voice:', voice.name);
        return voice;
      }
    }

    // Priority 2: Any voice explicitly marked as female
    const femaleVoice = voices.find(voice =>
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('lady')
    );
    if (femaleVoice) {
      console.log('Using female-marked voice:', femaleVoice.name);
      return femaleVoice;
    }

    // Priority 3: Google voices (usually better quality)
    const googleVoice = voices.find(v => v.name.includes('Google'));
    if (googleVoice) {
      console.log('Using Google voice:', googleVoice.name);
      return googleVoice;
    }

    // Fallback: First available voice
    console.log('Using default voice:', voices[1]?.name || voices[0]?.name);
    return voices.length > 1 ? voices[1] : voices[0];
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

  // Test microphone - record and playback
  const testMicrophone = async () => {
    try {
      setMicTestResult('Testing microphone... Speak now!');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
          setMicTestResult('Microphone works! You should hear your voice played back.');

          // Stop the stream
          stream.getTracks().forEach(track => track.stop());
        };
      }, 3000);
    } catch (err: any) {
      setMicTestResult('Microphone test failed: ' + err.message);
    }
  };

  // Test speaker - bot says test message
  const testSpeaker = () => {
    setSpeakerTestResult('Testing speaker...');
    speakText('Hello! I am your AI interviewer. This is a test of my voice. Can you hear me clearly?');
    setSpeakerTestResult('Speaker test: Listen carefully!');
  };

  // Start listening to user answer
  const startListening = () => {
    if (typeof window !== 'undefined') {
      if (!recognitionRef.current) {
        alert('Speech Recognition not available in your browser.\n\nSupported: Chrome, Edge, Safari\n\nPlease type your answer manually or use a supported browser.');
        return;
      }

      try {
        setUserAnswer('');
        setTranscript('');
        setIsListening(true);
        console.log('Starting speech recognition...');
        console.log('Recognition object ready:', !!recognitionRef.current);

        // Stop any existing recognition first
        try {
          recognitionRef.current.stop();
          console.log('Stopped previous recognition');
        } catch (e) {
          console.log('No previous recognition to stop');
        }

        // Wait and then start
        setTimeout(() => {
          recognitionRef.current.start();
          console.log('Speech recognition started');
        }, 100);

      } catch (err: any) {
        console.error('Error starting speech recognition:', err);
        setIsListening(false);
        alert('Microphone error. Please:\n\n1. Grant microphone permission\n2. Close other apps using microphone\n3. Try refreshing the page\n4. Use Chrome, Edge, or Safari\n\nOr type your answer manually.');
      }
    }
  };

  // Start interview
  const startInterview = async (topic: Topic) => {
    setSelectedTopic(topic);
    await startCamera();
    setStage('interview');
    setBotIntroduced(true);

    // Bot introduction - in parts with gaps
    const intro1 = "Hi, I'm your AI interviewer";
    const intro2 = `I will be conducting a mock interview on ${topic.name}`;
    const intro3 = "I will ask you questions, and you need to answer them";
    const intro4 = "After each answer, I will tell you if it's correct or not";
    const intro5 = "At the end, I will provide you with the correct answers for all questions";
    const intro6 = "Let's start!";

    // Speak intro parts with gaps
    speakText(intro1);

    setTimeout(() => {
      speakText(intro2);
    }, 2500);

    setTimeout(() => {
      speakText(intro3);
    }, 5500);

    setTimeout(() => {
      speakText(intro4);
    }, 8000);

    setTimeout(() => {
      speakText(intro5);
    }, 10500);

    setTimeout(() => {
      speakText(intro6);
    }, 13000);

    // Load questions after intro
    setTimeout(() => {
      loadQuestions(topic);
    }, 14500);
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
      console.log('⚠️ Cannot submit: no answer or no question');
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

            {/* Device Test Section */}
            <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-purple-700/50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Test Your Devices</h2>
              <p className="text-slate-300 mb-6">Before starting, test your microphone and speaker to ensure the interview works smoothly.</p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Microphone Test */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Test Microphone</h3>
                  <p className="text-slate-400 text-sm mb-4">Record 3 seconds of your voice and hear it played back.</p>
                  <button
                    onClick={testMicrophone}
                    className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2"
                  >
                    <Mic className="w-4 h-4" /> Test Microphone
                  </button>
                  {micTestResult && (
                    <p className={`mt-3 text-sm ${micTestResult.includes('failed') ? 'text-red-400' : 'text-green-400'}`}>
                      {micTestResult}
                    </p>
                  )}
                </div>

                {/* Speaker Test */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Test Speaker</h3>
                  <p className="text-slate-400 text-sm mb-4">Listen to the AI interviewer's voice to ensure it's clear.</p>
                  <button
                    onClick={testSpeaker}
                    className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.172a1 1 0 011.414 0A6.972 6.972 0 0118 10a6.972 6.972 0 01-1.929 4.828 1 1 0 01-1.414-1.414A4.972 4.972 0 0016 10c0-1.713-.67-3.26-1.757-4.414a1 1 0 010-1.414z" />
                      <path d="M12.586 4.172a1 1 0 011.414 0A9.956 9.956 0 0120 10a9.956 9.956 0 01-5.914 7.828 1 1 0 01-1.414-1.414A7.956 7.956 0 0018 10a7.956 7.956 0 00-4.914-7.172 1 1 0 010-1.414z" />
                    </svg>
                    Test Speaker
                  </button>
                  {speakerTestResult && (
                    <p className="mt-3 text-sm text-blue-400">{speakerTestResult}</p>
                  )}
                </div>
              </div>
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

                  {isListening && (
                    <div className="mb-4 p-4 bg-purple-900/40 border border-purple-600 rounded animate-pulse">
                      <p className="text-purple-300 text-center font-semibold">🎤 Listening... Speak your answer</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={submitAnswer}
                      disabled={isSpeaking || !userAnswer.trim()}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> Submit Answer
                    </button>

                    {isListening && (
                      <button
                        onClick={() => {
                          if (recognitionRef.current) {
                            recognitionRef.current.stop();
                            setIsListening(false);
                          }
                        }}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-semibold"
                      >
                        Stop
                      </button>
                    )}
                  </div>
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
