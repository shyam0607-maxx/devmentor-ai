'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiCall } from '@/lib/api';
import { ArrowLeft, Copy, Check, LogOut } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  description: string;
  notes: string;
  codeExamples: {
    java: string;
    python: string;
    cpp: string;
  };
  timeComplexity: string;
  spaceComplexity: string;
  difficulty: string;
}

export default function StacksPage() {
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTopic = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const topicData = await apiCall('/dsa/topic/4/stacks');
        setTopic(topicData);
        setError(null);
      } catch (err) {
        console.error('API Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load topic');
        setTopic(null);
      } finally {
        setLoading(false);
      }
    };

    loadTopic();
  }, [router]);

  const handleCopy = () => {
    if (topic) {
      const code = topic.codeExamples[selectedLanguage as keyof typeof topic.codeExamples];
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
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
        <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/dsa" className="flex items-center gap-2 hover:opacity-80 transition">
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-300">Back to DSA</span>
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
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              {error ? 'Error Loading Topic' : 'Topic Not Found'}
            </h1>
            <p className="text-slate-400 mb-8">
              {error || 'The topic you\'re looking for doesn\'t exist.'}
            </p>
            <Link
              href="/dsa"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition"
            >
              Back to DSA Topics
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950">
      <header className="border-b border-indigo-700/50 bg-indigo-950/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dsa" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300">Back to DSA</span>
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
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-cyan-400/20 rounded-lg">
              <span className="text-cyan-400 text-sm font-semibold">{topic.difficulty}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{topic.name}</h1>
          <p className="text-slate-400 text-lg">{topic.description}</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-indigo-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-indigo-100 mb-8">📚 Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4 font-normal text-base">
            <div className="prose prose-invert max-w-none">
              {topic.notes.split('\n').map((line, idx) => {
                if (line.startsWith('## ')) {
                  return <h3 key={idx} className="text-2xl font-bold text-cyan-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
                } else if (line.startsWith('### ')) {
                  return <h4 key={idx} className="text-xl font-bold text-indigo-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
                } else if (line.startsWith('- ')) {
                  return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={idx} className="font-semibold text-indigo-100">{line.replace(/\*\*/g, '')}</p>;
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
        </div>

        {/* 3D Animated Stack Visualization */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-indigo-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-indigo-100 mb-8">🎬 3D Stack Visualization</h2>
          <div className="flex justify-center items-center min-h-96">
            <svg viewBox="0 0 400 500" className="w-full max-w-md h-auto" style={{perspective: '1000px'}}>
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="3" dy="3" stdDeviation="4" floodOpacity="0.3"/>
                </filter>
                <linearGradient id="stackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#06b6d4', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#0891b2', stopOpacity: 1}} />
                </linearGradient>
                <style>{`
                  @keyframes slideDown {
                    0% { transform: translateY(-200px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(0); opacity: 1; }
                  }
                  @keyframes slideUp {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(-150px); opacity: 0; }
                  }
                  .stack-item-1 { animation: slideDown 0.8s ease-out 0s; }
                  .stack-item-2 { animation: slideDown 0.8s ease-out 0.3s backwards; }
                  .stack-item-3 { animation: slideDown 0.8s ease-out 0.6s backwards; }
                  .stack-item-pop { animation: slideUp 0.8s ease-in 2s forwards; }
                `}</style>
              </defs>

              {/* Base */}
              <rect x="50" y="380" width="300" height="20" fill="#1e293b" stroke="#475569" strokeWidth="2"/>

              {/* Stack Items with 3D effect */}
              <g className="stack-item-1">
                <rect x="75" y="310" width="250" height="60" fill="url(#stackGradient)" stroke="#0ea5e9" strokeWidth="2" filter="url(#shadow)"/>
                <text x="200" y="345" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">30</text>
              </g>

              <g className="stack-item-2">
                <rect x="75" y="250" width="250" height="60" fill="url(#stackGradient)" stroke="#0ea5e9" strokeWidth="2" filter="url(#shadow)"/>
                <text x="200" y="285" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">20</text>
              </g>

              <g className="stack-item-3 stack-item-pop">
                <rect x="75" y="190" width="250" height="60" fill="url(#stackGradient)" stroke="#0ea5e9" strokeWidth="2" filter="url(#shadow)"/>
                <text x="200" y="225" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">10</text>
              </g>

              {/* Labels */}
              <text x="200" y="50" textAnchor="middle" fill="#cbd5e1" fontSize="16" fontWeight="bold">Push: 10, 20, 30 → Pop: 30</text>
              <text x="200" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12">LIFO: Last In, First Out</text>
            </svg>
          </div>
          <p className="text-slate-300 text-sm mt-4 text-center">Watch as items are pushed onto the stack and the top item pops off</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-3">⏱️ Time Complexity</h3>
            <p className="text-cyan-400 font-mono text-lg">{topic.timeComplexity}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-3">💾 Space Complexity</h3>
            <p className="text-cyan-400 font-mono text-lg">{topic.spaceComplexity}</p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">💻 Code Examples</h2>

          <div className="flex gap-4 mb-6 border-b border-slate-700">
            {['java', 'python', 'cpp'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 font-semibold transition ${
                  selectedLanguage === lang
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 bg-slate-700 hover:bg-slate-600 rounded transition flex items-center gap-2 text-slate-300"
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

        <div className="flex justify-between mt-12">
          <Link
            href="/dsa"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
          >
            ← Back to Topics
          </Link>
          <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition">
            Mark as Complete ✓
          </button>
        </div>
      </div>
    </div>
  );
}
