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

export default function ArraysBasicsPage() {
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

        const topicData = await apiCall('/dsa/topic/2/arrays-basics');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
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

        {/* Array Operations Animation */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-blue-100 mb-6">🎬 Array Operations</h2>
            <svg viewBox="0 0 350 300" className="w-full h-auto">
              <defs>
                <style>{`
                  @keyframes cellShift {
                    0% { transform: translateX(0); }
                    50% { transform: translateX(30px); }
                    100% { transform: translateX(0); }
                  }
                  @keyframes cellHighlight {
                    0%, 100% { fill: #1e40af; }
                    50% { fill: #3b82f6; }
                  }
                  .cell-0 { animation: cellHighlight 2s ease-in-out infinite; }
                  .cell-1 { animation: cellHighlight 2s ease-in-out 0.3s infinite; }
                  .cell-2 { animation: cellHighlight 2s ease-in-out 0.6s infinite; }
                  .cell-3 { animation: cellHighlight 2s ease-in-out 0.9s infinite; }
                `}</style>
              </defs>
              <text x="175" y="25" textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold">Array Access Pattern - O(1)</text>

              <rect x="10" y="60" width="60" height="60" className="cell-0" stroke="#0ea5e9" strokeWidth="2"/>
              <text x="40" y="95" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">10</text>
              <text x="40" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="12">[0]</text>

              <rect x="95" y="60" width="60" height="60" className="cell-1" stroke="#0ea5e9" strokeWidth="2"/>
              <text x="125" y="95" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">20</text>
              <text x="125" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="12">[1]</text>

              <rect x="180" y="60" width="60" height="60" className="cell-2" stroke="#0ea5e9" strokeWidth="2"/>
              <text x="210" y="95" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">30</text>
              <text x="210" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="12">[2]</text>

              <rect x="265" y="60" width="60" height="60" className="cell-3" stroke="#0ea5e9" strokeWidth="2"/>
              <text x="295" y="95" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">40</text>
              <text x="295" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="12">[3]</text>

              <text x="175" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="12">Contiguous Memory</text>
              <text x="175" y="190" textAnchor="middle" fill="#cbd5e1" fontSize="12">Each cell highlighted in sequence</text>

              <rect x="30" y="220" width="140" height="40" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="5"/>
              <text x="100" y="245" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Search: O(n)</text>

              <rect x="200" y="220" width="140" height="40" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="5"/>
              <text x="270" y="245" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Insert: O(n)</text>
            </svg>
          </div>
          <div className="bg-gradient-to-br from-slate-900/40 to-blue-900/40 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-slate-100 mb-6">📊 Array Metrics</h2>
            <div className="space-y-4">
              <div className="bg-blue-800/30 p-4 rounded border border-blue-700/50">
                <p className="text-blue-300 font-semibold mb-2">Access Time</p>
                <p className="text-slate-300 text-sm">O(1) - Direct memory address</p>
              </div>
              <div className="bg-cyan-800/30 p-4 rounded border border-cyan-700/50">
                <p className="text-cyan-300 font-semibold mb-2">Search Time</p>
                <p className="text-slate-300 text-sm">O(n) - Linear scan needed</p>
              </div>
              <div className="bg-blue-700/30 p-4 rounded border border-blue-700/50">
                <p className="text-blue-200 font-semibold mb-2">Insert/Delete</p>
                <p className="text-slate-300 text-sm">O(n) - Shifting required</p>
              </div>
              <div className="bg-indigo-800/30 p-4 rounded border border-indigo-700/50">
                <p className="text-indigo-300 font-semibold mb-2">Space Usage</p>
                <p className="text-slate-300 text-sm">O(n) - Contiguous block</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-blue-800/30 border border-slate-600/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-slate-100 mb-8">📚 Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4 font-normal text-base">
            <div className="prose prose-invert max-w-none">
              {topic.notes.split('\n').map((line, idx) => {
                if (line.startsWith('## ')) {
                  return <h3 key={idx} className="text-2xl font-bold text-amber-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
                } else if (line.startsWith('### ')) {
                  return <h4 key={idx} className="text-xl font-bold text-orange-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
                } else if (line.startsWith('- ')) {
                  return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={idx} className="font-semibold text-orange-100">{line.replace(/\*\*/g, '')}</p>;
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
