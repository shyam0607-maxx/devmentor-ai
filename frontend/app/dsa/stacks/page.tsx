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
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading topic...</div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950">
        <header className="border-b border-indigo-700/50 bg-indigo-950/70 backdrop-blur-sm">
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
            <h1 className="text-3xl font-bold text-white mb-4">{error ? 'Error' : 'Not Found'}</h1>
            <p className="text-slate-400 mb-8">{error || 'Topic not found'}</p>
            <Link href="/dsa" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition">
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

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left: Animated Stack */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-indigo-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-indigo-100 mb-6">🎬 Stack Animation</h2>
            <svg viewBox="0 0 300 400" className="w-full h-auto">
              <defs>
                <filter id="stackShadow">
                  <feDropShadow dx="4" dy="4" stdDeviation="5" floodOpacity="0.4"/>
                </filter>
                <linearGradient id="stackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="1" />
                </linearGradient>
                <style>{`
                  @keyframes pushDown { 0% { transform: translateY(-80px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
                  @keyframes popUp { 0% { opacity: 1; } 100% { transform: translateY(-80px); opacity: 0; } }
                  @keyframes bounce { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.1); } }
                  .stack-base { animation: bounce 1.5s ease-in-out infinite; }
                  .item-1 { animation: pushDown 0.6s ease-out 0s forwards; }
                  .item-2 { animation: pushDown 0.6s ease-out 0.3s forwards; }
                  .item-3 { animation: pushDown 0.6s ease-out 0.6s forwards; }
                  .item-pop { animation: popUp 0.6s ease-in 2s forwards; }
                `}</style>
              </defs>

              <rect x="40" y="320" width="220" height="25" fill="#1e40af" stroke="#3b82f6" strokeWidth="2" className="stack-base"/>
              <text x="150" y="338" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">BASE</text>

              <g className="item-1">
                <rect x="50" y="240" width="200" height="70" fill="url(#stackGrad)" stroke="#0ea5e9" strokeWidth="3" filter="url(#stackShadow)" rx="3"/>
                <text x="150" y="280" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">10</text>
              </g>

              <g className="item-2">
                <rect x="50" y="155" width="200" height="70" fill="url(#stackGrad)" stroke="#06b6d4" strokeWidth="3" filter="url(#stackShadow)" rx="3"/>
                <text x="150" y="195" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">20</text>
              </g>

              <g className="item-3 item-pop">
                <rect x="50" y="70" width="200" height="70" fill="url(#stackGrad)" stroke="#06b6d4" strokeWidth="3" filter="url(#stackShadow)" rx="3"/>
                <text x="150" y="110" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">30</text>
              </g>

              <text x="150" y="25" textAnchor="middle" fill="#cbd5e1" fontSize="13" fontWeight="bold">Push, Push, Pop</text>
            </svg>
          </div>

          {/* Right: Operations Panel */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-cyan-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-cyan-100 mb-6">📊 Operations</h2>
            <div className="space-y-4">
              <div className="bg-indigo-800/30 p-4 rounded border border-indigo-700/50">
                <p className="text-indigo-300 font-semibold mb-2">Push - Add Element</p>
                <p className="text-slate-300 text-sm">Time: O(1)</p>
                <p className="text-slate-400 text-xs mt-1">Only updates top pointer</p>
              </div>
              <div className="bg-cyan-800/30 p-4 rounded border border-cyan-700/50">
                <p className="text-cyan-300 font-semibold mb-2">Pop - Remove Element</p>
                <p className="text-slate-300 text-sm">Time: O(1)</p>
                <p className="text-slate-400 text-xs mt-1">Returns & advances pointer</p>
              </div>
              <div className="bg-indigo-700/30 p-4 rounded border border-indigo-700/50">
                <p className="text-indigo-200 font-semibold mb-2">Peek - View Top</p>
                <p className="text-slate-300 text-sm">Time: O(1)</p>
                <p className="text-slate-400 text-xs mt-1">No modification</p>
              </div>
              <div className="bg-teal-800/30 p-4 rounded border border-teal-700/50">
                <p className="text-teal-300 font-semibold mb-2">Real-World Uses</p>
                <p className="text-slate-300 text-sm">Undo/Redo, Function calls, Expression evaluation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-indigo-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-indigo-100 mb-8">📚 Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4 font-normal text-base">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) {
                return <h3 key={idx} className="text-2xl font-bold text-cyan-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              } else if (line.startsWith('### ')) {
                return <h4 key={idx} className="text-xl font-bold text-indigo-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
              } else if (line.startsWith('- ')) {
                return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
              } else if (line.trim() === '') {
                return <br key={idx} />;
              } else {
                return <p key={idx} className="text-slate-300">{line}</p>;
              }
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-indigo-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-indigo-100 mb-6">💻 Code Examples</h2>

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

        <div className="flex justify-between">
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
