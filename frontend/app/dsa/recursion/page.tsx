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

export default function RecursionPage() {
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

        const topicData = await apiCall('/dsa/topic/1/recursion');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <header className="border-b border-purple-700/50 bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50">
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

        {/* Animated Recursion Visualization */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-purple-100 mb-6">🔄 Recursion Call Stack</h2>
            <svg viewBox="0 0 300 400" className="w-full h-auto">
              <defs>
                <style>{`
                  @keyframes stackPush {
                    0% { transform: translateY(50px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                  }
                  @keyframes stackPop {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(50px); opacity: 0; }
                  }
                  .call-1 { animation: stackPush 0.5s ease-out 0s forwards; }
                  .call-2 { animation: stackPush 0.5s ease-out 0.3s forwards; }
                  .call-3 { animation: stackPush 0.5s ease-out 0.6s forwards; }
                  .call-pop-3 { animation: stackPop 0.5s ease-in 1.5s forwards; }
                  .call-pop-2 { animation: stackPop 0.5s ease-in 2s forwards; }
                  .call-pop-1 { animation: stackPop 0.5s ease-in 2.5s forwards; }
                `}</style>
                <linearGradient id="stackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#a78bfa', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <text x="150" y="25" textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold">factorial(3)</text>

              <rect x="30" y="70" width="240" height="50" fill="url(#stackGrad)" stroke="#818cf8" strokeWidth="2" className="call-1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
              <text x="150" y="103" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">factorial(3)</text>

              <rect x="30" y="140" width="240" height="50" fill="url(#stackGrad)" stroke="#818cf8" strokeWidth="2" className="call-2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
              <text x="150" y="173" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">factorial(2)</text>

              <rect x="30" y="210" width="240" height="50" fill="url(#stackGrad)" stroke="#818cf8" strokeWidth="2" className="call-3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
              <text x="150" y="243" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">factorial(1) - Base Case</text>

              <text x="150" y="330" textAnchor="middle" fill="#94a3b8" fontSize="12">Stack grows then unwound</text>
              <text x="150" y="350" textAnchor="middle" fill="#94a3b8" fontSize="12">Result: 3! = 6</text>
            </svg>
          </div>
          <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-emerald-100 mb-6">📌 Key Patterns</h2>
            <div className="space-y-3">
              <div className="bg-emerald-800/30 p-3 rounded border border-emerald-700/50">
                <p className="text-emerald-300 text-sm font-semibold">Base Case</p>
                <p className="text-slate-300 text-xs">Stops recursion & returns value</p>
              </div>
              <div className="bg-teal-800/30 p-3 rounded border border-teal-700/50">
                <p className="text-teal-300 text-sm font-semibold">Recursive Case</p>
                <p className="text-slate-300 text-xs">Function calls itself with smaller input</p>
              </div>
              <div className="bg-cyan-800/30 p-3 rounded border border-cyan-700/50">
                <p className="text-cyan-300 text-sm font-semibold">Call Stack</p>
                <p className="text-slate-300 text-xs">Each call waits for inner call to finish</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-emerald-100 mb-8">📚 Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4 font-normal text-base">
            <div className="prose prose-invert max-w-none">
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
