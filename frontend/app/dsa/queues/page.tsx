'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiCall } from '@/lib/api';
import { ArrowLeft, Copy, Check, LogOut, Plus, Minus } from 'lucide-react';
import { Celebration } from '@/lib/celebration';

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

export default function QueuesPage() {
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Queue visualizer state
  const [queueItems, setQueueItems] = useState<number[]>([1, 2, 3]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    const loadTopic = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const topicData = await apiCall('/dsa/topic/6/queues');
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

  const handleEnqueue = () => {
    if (inputValue.trim()) {
      const value = parseInt(inputValue);
      if (!isNaN(value)) {
        setQueueItems([...queueItems, value]);
        setMessage(`✓ Enqueued ${value} to rear`);
        setInputValue('');
        setTimeout(() => setMessage(''), 2000);
      }
    }
  };

  const handleDequeue = () => {
    if (queueItems.length > 0) {
      const dequeued = queueItems[0];
      setQueueItems(queueItems.slice(1));
      setMessage(`✓ Dequeued ${dequeued} from front`);
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handlePeek = () => {
    if (queueItems.length > 0) {
      const front = queueItems[0];
      setMessage(`✓ Front element: ${front}`);
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage('✗ Queue is empty');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleClear = () => {
    setQueueItems([]);
    setMessage('✓ Queue cleared');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleMarkComplete = () => {
    setCelebrating(true);
  };

  const handleCelebrationComplete = () => {
    setCelebrating(false);
    router.push('/dsa/hash-tables');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-purple-950 flex items-center justify-center">
        <Celebration isActive={celebrating} onComplete={handleCelebrationComplete} />
        <div className="text-white text-lg">Loading topic...</div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-purple-950">
        <Celebration isActive={celebrating} onComplete={handleCelebrationComplete} />
        <header className="border-b border-violet-700/50 bg-violet-950/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/dsa" className="flex items-center gap-2 hover:opacity-80 transition">
              <ArrowLeft className="w-5 h-5 text-violet-400" />
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
            <Link href="/dsa" className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition">
              Back to DSA Topics
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-purple-950">
      <Celebration isActive={celebrating} onComplete={handleCelebrationComplete} />
      <header className="border-b border-violet-700/50 bg-violet-950/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dsa" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-violet-400" />
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
            <div className="px-3 py-1 bg-violet-400/20 rounded-lg">
              <span className="text-violet-400 text-sm font-semibold">{topic.difficulty}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{topic.name}</h1>
          <p className="text-slate-400 text-lg">{topic.description}</p>
        </div>

        {/* Interactive Queue Visualizer */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left: Queue Display */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-violet-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-violet-100 mb-6">🎮 Queue Visualizer</h2>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-6 min-h-60">
              <p className="text-slate-300 text-sm mb-3 font-semibold">Queue Contents (Front ← → Rear)</p>
              <div className="flex gap-2 justify-start h-40 items-center overflow-x-auto pb-4">
                {queueItems.length === 0 ? (
                  <div className="flex items-center justify-center w-full text-slate-400 text-center">
                    <p>Queue is empty</p>
                  </div>
                ) : (
                  <>
                    {queueItems.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div
                          className={`p-4 rounded border-2 text-white font-bold text-center transition-all min-w-16 ${
                            idx === 0
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400 shadow-lg shadow-emerald-500/50'
                              : 'bg-gradient-to-r from-cyan-600 to-cyan-700 border-violet-400'
                          }`}
                        >
                          {item}
                        </div>
                        {idx === 0 && <span className="text-xs text-purple-400 font-semibold">FRONT</span>}
                        {idx === queueItems.length - 1 && <span className="text-xs text-violet-400 font-semibold">REAR</span>}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <p className="text-slate-400 text-xs mt-3">Size: {queueItems.length}</p>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEnqueue()}
                placeholder="Enter value"
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-violet-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={handleEnqueue}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-2 rounded transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Enqueue
              </button>
              <button
                onClick={handleDequeue}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 rounded transition flex items-center justify-center gap-2"
              >
                <Minus className="w-4 h-4" /> Dequeue
              </button>
              <button
                onClick={handlePeek}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded transition"
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

            {message && (
              <div className="bg-slate-700/50 border border-slate-600 rounded p-3 text-slate-200 text-sm text-center">
                {message}
              </div>
            )}
          </div>

          {/* Right: Operations Info */}
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border border-emerald-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-purple-100 mb-6">📊 Operations Guide</h2>
            <div className="space-y-4">
              <div className="bg-purple-800/30 p-4 rounded border border-emerald-700/50">
                <p className="text-purple-300 font-semibold mb-2">📥 Enqueue - Add Element</p>
                <p className="text-slate-300 text-sm">Adds element at rear of queue</p>
                <p className="text-slate-400 text-xs mt-1">Time: O(1) | Space: O(1)</p>
              </div>
              <div className="bg-orange-800/30 p-4 rounded border border-orange-700/50">
                <p className="text-orange-300 font-semibold mb-2">📤 Dequeue - Remove Element</p>
                <p className="text-slate-300 text-sm">Removes element from front</p>
                <p className="text-slate-400 text-xs mt-1">Time: O(1) | Space: O(1)</p>
              </div>
              <div className="bg-blue-800/30 p-4 rounded border border-blue-700/50">
                <p className="text-blue-300 font-semibold mb-2">👁️ Peek - View Front</p>
                <p className="text-slate-300 text-sm">Returns front without removal</p>
                <p className="text-slate-400 text-xs mt-1">Time: O(1) | Space: O(1)</p>
              </div>
              <div className="bg-violet-800/30 p-4 rounded border border-violet-700/50">
                <p className="text-violet-300 font-semibold mb-2">💡 Real-World Uses</p>
                <p className="text-slate-300 text-sm">Task scheduling, customer service, BFS, print queues</p>
              </div>
            </div>
          </div>
        </div>

        {/* Queue Characteristics - 3 Column */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-teal-900/40 to-slate-900/40 border border-teal-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-teal-100 mb-4">🔄 Queue Types</h2>
            <div className="space-y-2">
              <div className="bg-teal-800/30 p-2 rounded border border-teal-700/50">
                <p className="text-teal-300 font-semibold text-sm">Simple Queue</p>
                <p className="text-slate-300 text-xs mt-0.5">Standard FIFO</p>
              </div>
              <div className="bg-violet-800/30 p-2 rounded border border-violet-700/50">
                <p className="text-violet-300 font-semibold text-sm">Circular</p>
                <p className="text-slate-300 text-xs mt-0.5">Memory efficient</p>
              </div>
              <div className="bg-purple-800/30 p-2 rounded border border-emerald-700/50">
                <p className="text-purple-300 font-semibold text-sm">Priority</p>
                <p className="text-slate-300 text-xs mt-0.5">Priority based</p>
              </div>
              <div className="bg-indigo-800/30 p-2 rounded border border-indigo-700/50">
                <p className="text-indigo-300 font-semibold text-sm">Deque</p>
                <p className="text-slate-300 text-xs mt-0.5">Both ends</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-900/40 to-slate-900/40 border border-violet-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-violet-100 mb-4">⚙️ Key Operations</h2>
            <div className="space-y-2">
              <div className="bg-violet-800/30 p-2 rounded border border-violet-700/50">
                <p className="text-violet-300 font-semibold text-sm">Enqueue</p>
                <p className="text-slate-300 text-xs mt-0.5">O(1) - Add rear</p>
              </div>
              <div className="bg-purple-800/30 p-2 rounded border border-emerald-700/50">
                <p className="text-purple-300 font-semibold text-sm">Dequeue</p>
                <p className="text-slate-300 text-xs mt-0.5">O(1) - Remove front</p>
              </div>
              <div className="bg-blue-800/30 p-2 rounded border border-blue-700/50">
                <p className="text-blue-300 font-semibold text-sm">Peek</p>
                <p className="text-slate-300 text-xs mt-0.5">O(1) - View front</p>
              </div>
              <div className="bg-violet-800/30 p-2 rounded border border-violet-700/50">
                <p className="text-violet-300 font-semibold text-sm">IsEmpty</p>
                <p className="text-slate-300 text-xs mt-0.5">O(1) - Check</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-slate-900/40 border border-orange-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-orange-100 mb-4">💼 Applications</h2>
            <ul className="space-y-1 text-slate-300 text-xs">
              <li className="flex gap-2"><span className="text-orange-400">▸</span><span>CPU scheduling</span></li>
              <li className="flex gap-2"><span className="text-orange-400">▸</span><span>Printer queues</span></li>
              <li className="flex gap-2"><span className="text-orange-400">▸</span><span>Customer service</span></li>
              <li className="flex gap-2"><span className="text-orange-400">▸</span><span>BFS traversal</span></li>
              <li className="flex gap-2"><span className="text-orange-400">▸</span><span>Message queues</span></li>
              <li className="flex gap-2"><span className="text-orange-400">▸</span><span>Breadth searches</span></li>
            </ul>
          </div>
        </div>

        {/* Detailed Notes */}
        <div className="bg-gradient-to-br from-cyan-900/40 to-emerald-900/40 border border-violet-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-violet-100 mb-8">📚 Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4 font-normal text-base">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) {
                return <h3 key={idx} className="text-2xl font-bold text-purple-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              } else if (line.startsWith('### ')) {
                return <h4 key={idx} className="text-xl font-bold text-violet-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
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
        <div className="bg-gradient-to-br from-cyan-900/40 to-emerald-900/40 border border-violet-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-violet-100 mb-6">💻 Code Examples</h2>

          <div className="flex gap-4 mb-6 border-b border-slate-700">
            {['java', 'python', 'cpp'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 font-semibold transition ${
                  selectedLanguage === lang
                    ? 'text-violet-400 border-b-2 border-violet-400'
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
          <button className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition">
            Mark as Complete ✓
          </button>
        </div>
      </div>
    </div>
  );
}
