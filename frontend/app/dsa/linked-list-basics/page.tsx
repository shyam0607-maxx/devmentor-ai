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

export default function LinkedListBasicsPage() {
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

        const topicData = await apiCall('/dsa/topic/3/linked-list-basics');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <header className="border-b border-slate-700/50 bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50">
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

        {/* Linked List Animation */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-indigo-100 mb-6">🔗 Linked List Traversal</h2>
            <svg viewBox="0 0 450 200" className="w-full h-auto">
              <defs>
                <style>{`
                  @keyframes nodeTraverse {
                    0%, 100% { fill: #818cf8; }
                    25% { fill: #c7d2fe; }
                    50% { fill: #6366f1; }
                  }
                  .node-1 { animation: nodeTraverse 3s ease-in-out 0s infinite; }
                  .node-2 { animation: nodeTraverse 3s ease-in-out 0.8s infinite; }
                  .node-3 { animation: nodeTraverse 3s ease-in-out 1.6s infinite; }
                `}</style>
                <linearGradient id="nodeFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#a78bfa', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <text x="225" y="25" textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold">Singly Linked List Traversal</text>

              <rect x="20" y="60" width="80" height="60" fill="url(#nodeFill)" stroke="#818cf8" strokeWidth="2" className="node-1" rx="5"/>
              <text x="45" y="95" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">10</text>
              <line x1="100" y1="90" x2="130" y2="90" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              <defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#818cf8" /></marker></defs>

              <rect x="160" y="60" width="80" height="60" fill="url(#nodeFill)" stroke="#818cf8" strokeWidth="2" className="node-2" rx="5"/>
              <text x="185" y="95" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">20</text>
              <line x1="240" y1="90" x2="270" y2="90" stroke="#818cf8" strokeWidth="2"/>

              <rect x="300" y="60" width="80" height="60" fill="url(#nodeFill)" stroke="#818cf8" strokeWidth="2" className="node-3" rx="5"/>
              <text x="325" y="95" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">30</text>
              <line x1="380" y1="90" x2="410" y2="90" stroke="#818cf8" strokeWidth="2"/>

              <text x="420" y="95" fontSize="14" fill="#cbd5e1" fontWeight="bold">∅</text>

              <text x="225" y="160" textAnchor="middle" fill="#94a3b8" fontSize="12">Each node traversed sequentially - O(n)</text>
            </svg>
          </div>
          <div className="bg-gradient-to-br from-slate-900/40 to-indigo-900/40 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-slate-100 mb-6">⚖️ Linked List vs Array</h2>
            <div className="space-y-3">
              <div className="bg-indigo-800/30 p-3 rounded border border-indigo-700/50">
                <p className="text-indigo-300 text-sm font-semibold">Access</p>
                <div className="flex justify-between mt-1">
                  <span className="text-slate-300 text-xs">Array: O(1)</span>
                  <span className="text-slate-300 text-xs">Linked: O(n)</span>
                </div>
              </div>
              <div className="bg-purple-800/30 p-3 rounded border border-purple-700/50">
                <p className="text-purple-300 text-sm font-semibold">Insert/Delete</p>
                <div className="flex justify-between mt-1">
                  <span className="text-slate-300 text-xs">Array: O(n)</span>
                  <span className="text-slate-300 text-xs">Linked: O(1)</span>
                </div>
              </div>
              <div className="bg-indigo-700/30 p-3 rounded border border-indigo-700/50">
                <p className="text-indigo-200 text-sm font-semibold">Memory</p>
                <div className="flex justify-between mt-1">
                  <span className="text-slate-300 text-xs">Array: Contiguous</span>
                  <span className="text-slate-300 text-xs">Linked: Scattered</span>
                </div>
              </div>
              <div className="bg-cyan-800/30 p-3 rounded border border-cyan-700/50">
                <p className="text-cyan-300 text-sm font-semibold">Best Use</p>
                <div className="flex justify-between mt-1">
                  <span className="text-slate-300 text-xs">Random access</span>
                  <span className="text-slate-300 text-xs">Frequent changes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/40 border border-violet-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-violet-100 mb-8">📚 Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4 font-normal text-base">
            <div className="prose prose-invert max-w-none">
              {topic.notes.split('\n').map((line, idx) => {
                if (line.startsWith('## ')) {
                  return <h3 key={idx} className="text-2xl font-bold text-purple-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
                } else if (line.startsWith('### ')) {
                  return <h4 key={idx} className="text-xl font-bold text-violet-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
                } else if (line.startsWith('- ')) {
                  return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={idx} className="font-semibold text-violet-100">{line.replace(/\*\*/g, '')}</p>;
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
