'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiCall } from '@/lib/api';
import { ArrowLeft, Copy, Check, LogOut, Plus, Minus } from 'lucide-react';

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

  // Stack operations state
  const [stackItems, setStackItems] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

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

  const handlePush = () => {
    if (inputValue.trim()) {
      const value = parseInt(inputValue);
      if (!isNaN(value)) {
        setStackItems([...stackItems, value]);
        setMessage(`✓ Pushed ${value} onto stack`);
        setInputValue('');
        setTimeout(() => setMessage(''), 2000);
      }
    }
  };

  const handlePop = () => {
    if (stackItems.length > 0) {
      const popped = stackItems[stackItems.length - 1];
      setStackItems(stackItems.slice(0, -1));
      setMessage(`✓ Popped ${popped} from stack`);
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handlePeek = () => {
    if (stackItems.length > 0) {
      const top = stackItems[stackItems.length - 1];
      setMessage(`✓ Top element: ${top}`);
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage('✗ Stack is empty');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleClear = () => {
    setStackItems([]);
    setMessage('✓ Stack cleared');
    setTimeout(() => setMessage(''), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950 via-red-950 to-orange-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading topic...</div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950 via-red-950 to-orange-950">
        <header className="border-b border-pink-700/50 bg-pink-950/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/dsa" className="flex items-center gap-2 hover:opacity-80 transition">
              <ArrowLeft className="w-5 h-5 text-orange-400" />
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
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-red-950 to-orange-950">
      <header className="border-b border-pink-700/50 bg-gradient-to-r from-pink-950/80 to-red-950/80 backdrop-blur-sm sticky top-0 z-50 shadow-2xl shadow-pink-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dsa" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-pink-300" />
            <span className="text-pink-100">Back to DSA</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-orange-300 hover:text-orange-200 flex items-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-cyan-400/20 rounded-lg">
              <span className="text-orange-400 text-sm font-semibold">{topic.difficulty}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{topic.name}</h1>
          <p className="text-slate-400 text-lg">{topic.description}</p>
        </div>

        {/* Interactive Visualizer Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left: Interactive Stack Visualizer */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-pink-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-pink-100 mb-6">🎮 Interactive Visualizer</h2>

            {/* Stack Display */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-6 min-h-60">
              <p className="text-slate-300 text-sm mb-3 font-semibold">Stack Contents (Top → Bottom)</p>
              <div className="flex flex-col gap-2 justify-end h-40">
                {stackItems.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-slate-400 text-center">
                    <p>Stack is empty</p>
                  </div>
                ) : (
                  stackItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded border-2 text-white font-bold text-center transition-all ${
                        idx === stackItems.length - 1
                          ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 border-cyan-400 shadow-lg shadow-cyan-500/50'
                          : 'bg-gradient-to-r from-indigo-600 to-indigo-700 border-pink-400'
                      }`}
                    >
                      {item}
                      {idx === stackItems.length - 1 && <span className="ml-2 text-xs">← TOP</span>}
                    </div>
                  ))
                )}
              </div>
              <p className="text-slate-400 text-xs mt-3">Size: {stackItems.length}</p>
            </div>

            {/* Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePush()}
                placeholder="Enter value"
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Operation Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={handlePush}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-2 rounded transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Push
              </button>
              <button
                onClick={handlePop}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 rounded transition flex items-center justify-center gap-2"
              >
                <Minus className="w-4 h-4" /> Pop
              </button>
              <button
                onClick={handlePeek}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-2 rounded transition"
              >
                Peek
              </button>
              <button
                onClick={handleClear}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 rounded transition"
              >
                Clear
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className="bg-slate-700/50 border border-slate-600 rounded p-3 text-slate-200 text-sm text-center">
                {message}
              </div>
            )}
          </div>

          {/* Right: Operations Info Panel */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-cyan-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-orange-100 mb-6">📊 Operations Guide</h2>
            <div className="space-y-4">
              <div className="bg-pink-800/30 p-4 rounded border border-pink-700/50">
                <p className="text-pink-300 font-semibold mb-2">🔼 Push - Add Element</p>
                <p className="text-slate-300 text-sm">Adds element to top of stack</p>
                <p className="text-slate-400 text-xs mt-1">Time: O(1) | Space: O(1)</p>
              </div>
              <div className="bg-orange-800/30 p-4 rounded border border-orange-700/50">
                <p className="text-orange-300 font-semibold mb-2">🔽 Pop - Remove Element</p>
                <p className="text-slate-300 text-sm">Removes & returns top element</p>
                <p className="text-slate-400 text-xs mt-1">Time: O(1) | Space: O(1)</p>
              </div>
              <div className="bg-emerald-800/30 p-4 rounded border border-emerald-700/50">
                <p className="text-emerald-300 font-semibold mb-2">👁️ Peek - View Top</p>
                <p className="text-slate-300 text-sm">Returns top without removal</p>
                <p className="text-slate-400 text-xs mt-1">Time: O(1) | Space: O(1)</p>
              </div>
              <div className="bg-teal-800/30 p-4 rounded border border-teal-700/50">
                <p className="text-teal-300 font-semibold mb-2">💡 Real-World Uses</p>
                <p className="text-slate-300 text-sm">Undo/Redo, Function calls, Expression evaluation, Browser history</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Stack Demo */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-pink-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-pink-100 mb-6">🎬 Automatic Animation</h2>
          <svg viewBox="0 0 300 400" className="w-full h-auto max-w-md mx-auto">
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

        {/* Detailed Notes */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-pink-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-pink-100 mb-8">📚 Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4 font-normal text-base">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) {
                return <h3 key={idx} className="text-2xl font-bold text-orange-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              } else if (line.startsWith('### ')) {
                return <h4 key={idx} className="text-xl font-bold text-pink-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
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

        {/* Code Examples */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-pink-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-pink-100 mb-6">💻 Code Examples</h2>

          <div className="flex gap-4 mb-6 border-b border-slate-700">
            {['java', 'python', 'cpp'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 font-semibold transition ${
                  selectedLanguage === lang
                    ? 'text-orange-400 border-b-2 border-cyan-400'
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
