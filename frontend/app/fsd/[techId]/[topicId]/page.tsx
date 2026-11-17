'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { apiCall } from '@/lib/api';
import { ArrowLeft, LogOut, Copy, Check } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  timeComplexity: string;
  spaceComplexity: string;
  notes: string;
  codeExamples: {
    javascript?: string;
    python?: string;
    node?: string;
  };
}

function TopicContent() {
  const router = useRouter();
  const params = useParams();
  const techId = (params?.techId as string) || '';
  const topicId = (params?.topicId as string) || '';

  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(!!techId && !!topicId);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !techId || !topicId) {
      setLoading(false);
      return;
    }

    const loadTopic = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const topicData = await apiCall(`/fsd/technology/${techId}/topic/${topicId}`);
        setTopic(topicData);
      } catch (err) {
        console.error('Failed to load topic:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTopic();
  }, [techId, topicId, router, mounted]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleCopy = () => {
    if (topic) {
      const code = topic.codeExamples[selectedLanguage as keyof typeof topic.codeExamples];
      if (code) {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading topic...</div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Topic Not Found</h1>
            <Link href="/fsd" className="text-cyan-400 hover:text-cyan-300">
              Back to Full Stack Development
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const availableLanguages = Object.keys(topic.codeExamples).filter(
    lang => topic.codeExamples[lang as keyof typeof topic.codeExamples]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-purple-700/50 bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href={`/fsd/${techId}`} className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300">Back</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-400 hover:text-red-300 flex items-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-cyan-400/20 rounded-lg">
              <span className="text-cyan-400 text-sm font-semibold capitalize">{topic.difficulty}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{topic.name}</h1>
          <p className="text-slate-400 text-lg">{topic.description}</p>
        </div>

        {/* 3D Animated Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 3D Animation */}
          <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-purple-100 mb-6">Interactive Concept</h2>
            <div className="w-full h-80 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#a78bfa', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
                  </linearGradient>
                  <style>{`
                    @keyframes float {
                      0% { transform: translateY(0px); }
                      50% { transform: translateY(-20px); }
                      100% { transform: translateY(0px); }
                    }
                    @keyframes rotate {
                      0% { transform: rotateY(0deg); }
                      100% { transform: rotateY(360deg); }
                    }
                    .float-box {
                      animation: float 3s ease-in-out infinite;
                    }
                    .rotate-box {
                      animation: rotate 4s linear infinite;
                      transform-origin: center;
                    }
                  `}</style>
                </defs>

                {/* Floating Cube */}
                <g className="float-box">
                  <rect x="150" y="100" width="100" height="100" fill="url(#grad1)" stroke="#818cf8" strokeWidth="2" rx="10" />
                  <circle cx="200" cy="150" r="40" fill="none" stroke="#34d399" strokeWidth="2" />
                </g>

                {/* Rotating Elements */}
                <g className="rotate-box" opacity="0.6">
                  <circle cx="200" cy="150" r="80" fill="none" stroke="#f472b6" strokeWidth="2" />
                </g>

                {/* Info Text */}
                <text x="200" y="250" textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold">
                  {topic.name} Concept
                </text>
              </svg>
            </div>
          </div>

          {/* Complexity Info */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-extrabold text-emerald-100 mb-4">Complexity Analysis</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-emerald-300 font-semibold mb-2">⏱️ Time Complexity</p>
                  <p className="text-emerald-400 font-mono text-lg">{topic.timeComplexity}</p>
                  <p className="text-slate-400 text-sm mt-1">Expected time for operations</p>
                </div>
                <div>
                  <p className="text-teal-300 font-semibold mb-2">💾 Space Complexity</p>
                  <p className="text-teal-400 font-mono text-lg">{topic.spaceComplexity}</p>
                  <p className="text-slate-400 text-sm mt-1">Memory requirements</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-cyan-100 mb-4">Key Points</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Fundamental concept in this technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Used in many real-world applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Important for optimization and performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Notes */}
        <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-emerald-100 mb-8">Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4 font-normal text-base prose prose-invert max-w-none">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) {
                return <h3 key={idx} className="text-2xl font-bold text-cyan-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              } else if (line.startsWith('### ')) {
                return <h4 key={idx} className="text-xl font-bold text-emerald-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
              } else if (line.startsWith('- ')) {
                return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
              } else if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={idx} className="font-semibold text-emerald-100">{line.replace(/\*\*/g, '')}</p>;
              } else if (line.trim() === '') {
                return <br key={idx} />;
              } else if (line.startsWith('```')) {
                return null;
              } else {
                return <p key={idx} className="text-slate-300">{line}</p>;
              }
            })}
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>

          <div className="flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 font-semibold transition ${
                  selectedLanguage === lang
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 bg-slate-700 hover:bg-slate-600 rounded transition flex items-center gap-2 text-slate-300 z-10"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy
                </>
              )}
            </button>

            <pre className="bg-slate-900 p-6 rounded overflow-x-auto text-slate-300 font-mono text-sm">
              <code>
                {topic.codeExamples[selectedLanguage as keyof typeof topic.codeExamples]}
              </code>
            </pre>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Link
            href={`/fsd/${techId}`}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-semibold"
          >
            ← Back to Topics
          </Link>
          <button
            onClick={() => {
              // Mark as complete
              alert('Topic marked as complete! 🎉');
            }}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition font-semibold"
          >
            Mark as Complete ✓
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TopicPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading topic...</div>
      </div>
    }>
      <TopicContent />
    </Suspense>
  );
}
