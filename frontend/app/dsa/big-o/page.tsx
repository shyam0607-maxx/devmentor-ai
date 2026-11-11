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

export default function BigOPage() {
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

        console.log('Fetching Big O topic from API: /dsa/topic/1/big-o');
        const topicData = await apiCall('/dsa/topic/1/big-o');
        console.log('Topic data received:', topicData);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <header className="border-b border-indigo-700/50 bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50">
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

        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
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

        {/* Big O Graph with Animation */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-purple-100 mb-6">📈 Complexity Graph</h2>
            <svg viewBox="0 0 400 350" className="w-full h-auto bg-slate-900/50 rounded-lg p-4">
              <defs>
                <style>{`
                  @keyframes lineTrace {
                    0% { stroke-dasharray: 500; stroke-dashoffset: 500; }
                    100% { stroke-dasharray: 500; stroke-dashoffset: 0; }
                  }
                  .line-o1 { animation: lineTrace 2s ease-in-out infinite; }
                  .line-olog { animation: lineTrace 2s ease-in-out 0.3s infinite; }
                  .line-on { animation: lineTrace 2s ease-in-out 0.6s infinite; }
                  .line-on2 { animation: lineTrace 2s ease-in-out 0.9s infinite; }
                  .line-o2n { animation: lineTrace 2s ease-in-out 1.2s infinite; }
                `}</style>
              </defs>
              {/* Grid */}
              <defs>
                <pattern id="grid2" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="400" height="350" fill="url(#grid2)" />
              <line x1="40" y1="300" x2="380" y2="300" stroke="#94a3b8" strokeWidth="2"/>
              <line x1="40" y1="300" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2"/>
              <line x1="380" y1="305" x2="390" y2="300" stroke="#94a3b8" strokeWidth="2"/>
              <line x1="35" y1="20" x2="40" y2="10" stroke="#94a3b8" strokeWidth="2"/>
              <text x="390" y="320" fontSize="12" fill="#cbd5e1">n</text>
              <text x="15" y="15" fontSize="12" fill="#cbd5e1">T</text>

              <line x1="40" y1="280" x2="380" y2="280" stroke="#10b981" strokeWidth="3" opacity="0.8" className="line-o1" strokeDasharray="500"/>
              <polyline points="40,270 120,240 200,220 280,205 360,195" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.8" className="line-olog" strokeDasharray="500"/>
              <line x1="40" y1="250" x2="380" y2="50" stroke="#f59e0b" strokeWidth="3" opacity="0.8" className="line-on" strokeDasharray="500"/>
              <polyline points="40,260 90,230 140,180 190,110 240,30" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.8" className="line-on2" strokeDasharray="500"/>
              <polyline points="40,270 70,230 100,160 130,60" fill="none" stroke="#a855f7" strokeWidth="3" opacity="0.8" className="line-o2n" strokeDasharray="500"/>

              <text x="360" y="275" fontSize="11" fill="#10b981" fontWeight="bold">O(1)</text>
              <text x="370" y="195" fontSize="11" fill="#3b82f6" fontWeight="bold">O(log n)</text>
              <text x="385" y="55" fontSize="11" fill="#f59e0b" fontWeight="bold">O(n)</text>
            </svg>
          </div>
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-indigo-100 mb-6">📊 Complexity Comparison</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">O(1)</span>
                  <span className="text-green-400 font-bold">Excellent</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{width: '5%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">O(log n)</span>
                  <span className="text-blue-400 font-bold">Very Good</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{width: '15%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">O(n)</span>
                  <span className="text-yellow-400 font-bold">Good</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{width: '40%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">O(n²)</span>
                  <span className="text-orange-400 font-bold">Poor</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-orange-500 h-3 rounded-full" style={{width: '70%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">O(2ⁿ)</span>
                  <span className="text-purple-400 font-bold">Very Bad</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Original Full-width Graph */}
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-purple-100 mb-6">📈 Full Complexity Graph</h2>
          <svg viewBox="0 0 800 400" className="w-full h-auto bg-slate-900/50 rounded-lg p-4">
            {/* Grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4c5a84" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="800" height="400" fill="url(#grid)" />

            {/* Axes */}
            <line x1="60" y1="350" x2="750" y2="350" stroke="#94a3b8" strokeWidth="2"/>
            <line x1="60" y1="350" x2="60" y2="20" stroke="#94a3b8" strokeWidth="2"/>

            {/* Axis labels */}
            <text x="750" y="375" fontSize="14" fill="#cbd5e1">Input Size (n)</text>
            <text x="20" y="30" fontSize="14" fill="#cbd5e1">Time</text>

            {/* O(1) - Constant */}
            <line x1="60" y1="330" x2="750" y2="330" stroke="#10b981" strokeWidth="3" opacity="0.8"/>
            <text x="760" y="335" fontSize="12" fill="#10b981" fontWeight="bold">O(1)</text>

            {/* O(log n) - Logarithmic */}
            <polyline points="60,320 150,290 250,270 350,255 450,245 550,238 650,233 750,230"
              fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.8"/>
            <text x="760" y="235" fontSize="12" fill="#3b82f6" fontWeight="bold">O(log n)</text>

            {/* O(n) - Linear */}
            <line x1="60" y1="300" x2="750" y2="50" stroke="#f59e0b" strokeWidth="3" opacity="0.8"/>
            <text x="760" y="80" fontSize="12" fill="#f59e0b" fontWeight="bold">O(n)</text>

            {/* O(n²) - Quadratic */}
            <polyline points="60,310 120,290 180,250 240,190 300,110 360,20"
              fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.8"/>
            <text x="370" y="25" fontSize="12" fill="#ef4444" fontWeight="bold">O(n²)</text>

            {/* O(2ⁿ) - Exponential */}
            <polyline points="60,340 100,330 140,310 180,280 220,220 260,80"
              fill="none" stroke="#a855f7" strokeWidth="3" opacity="0.8"/>
            <text x="270" y="80" fontSize="12" fill="#a855f7" fontWeight="bold">O(2ⁿ)</text>
          </svg>
          <p className="text-slate-300 text-sm mt-4">Green (fastest) → Purple (slowest). The graph shows how different algorithms scale with input size.</p>
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
