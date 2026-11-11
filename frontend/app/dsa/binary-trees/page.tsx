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

export default function BinaryTreesPage() {
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

        const topicData = await apiCall('/dsa/topic/5/binary-trees');
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
      <div className="min-h-screen bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading topic...</div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950">
        <header className="border-b border-teal-700/50 bg-teal-950/70 backdrop-blur-sm">
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
    <div className="min-h-screen bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950">
      <header className="border-b border-teal-700/50 bg-teal-950/70 backdrop-blur-sm sticky top-0 z-50">
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

        {/* Two Column Layout - Animation + Properties */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left: Animated Tree */}
          <div className="bg-gradient-to-br from-teal-900/40 to-slate-900/40 border border-teal-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-teal-100 mb-6">🌳 Tree Growth Animation</h2>
            <svg viewBox="0 0 300 400" className="w-full h-auto">
              <defs>
                <filter id="nodeShadow">
                  <feDropShadow dx="3" dy="3" stdDeviation="4" floodOpacity="0.5"/>
                </filter>
                <linearGradient id="treeNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="1" />
                </linearGradient>
                <style>{`
                  @keyframes nodeGrow {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                  }
                  @keyframes nodePulse {
                    0%, 100% { filter: brightness(1); }
                    50% { filter: brightness(1.3); }
                  }
                  @keyframes lineGrow {
                    0% { stroke-dasharray: 100; stroke-dashoffset: 100; opacity: 0; }
                    100% { stroke-dasharray: 100; stroke-dashoffset: 0; opacity: 1; }
                  }
                  .root { animation: nodeGrow 0.6s ease-out 0s forwards, nodePulse 2s ease-in-out 1s infinite; }
                  .left-child { animation: nodeGrow 0.6s ease-out 0.4s forwards, nodePulse 2s ease-in-out 1.4s infinite; }
                  .right-child { animation: nodeGrow 0.6s ease-out 0.4s forwards, nodePulse 2s ease-in-out 1.4s infinite; }
                  .left-left { animation: nodeGrow 0.6s ease-out 0.8s forwards, nodePulse 2s ease-in-out 1.8s infinite; }
                  .left-right { animation: nodeGrow 0.6s ease-out 0.8s forwards, nodePulse 2s ease-in-out 1.8s infinite; }
                  .line { animation: lineGrow 0.8s ease-in-out forwards; stroke-dasharray: 100; }
                  .line-1 { animation-delay: 0.2s; }
                  .line-2 { animation-delay: 0.2s; }
                  .line-3 { animation-delay: 0.6s; }
                  .line-4 { animation-delay: 0.6s; }
                `}</style>
              </defs>

              <line x1="150" y1="60" x2="100" y2="140" stroke="#06b6d4" strokeWidth="2" className="line line-1"/>
              <line x1="150" y1="60" x2="200" y2="140" stroke="#06b6d4" strokeWidth="2" className="line line-2"/>
              <line x1="100" y1="160" x2="75" y2="240" stroke="#06b6d4" strokeWidth="2" className="line line-3"/>
              <line x1="100" y1="160" x2="125" y2="240" stroke="#06b6d4" strokeWidth="2" className="line line-4"/>

              <g className="root">
                <circle cx="150" cy="50" r="25" fill="url(#treeNodeGrad)" stroke="#06b6d4" strokeWidth="2" filter="url(#nodeShadow)"/>
                <text x="150" y="57" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">1</text>
              </g>

              <g className="left-child">
                <circle cx="100" cy="150" r="22" fill="url(#treeNodeGrad)" stroke="#06b6d4" strokeWidth="2" filter="url(#nodeShadow)"/>
                <text x="100" y="157" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">2</text>
              </g>

              <g className="right-child">
                <circle cx="200" cy="150" r="22" fill="url(#treeNodeGrad)" stroke="#06b6d4" strokeWidth="2" filter="url(#nodeShadow)"/>
                <text x="200" y="157" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">3</text>
              </g>

              <g className="left-left">
                <circle cx="75" cy="250" r="18" fill="url(#treeNodeGrad)" stroke="#06b6d4" strokeWidth="2" filter="url(#nodeShadow)"/>
                <text x="75" y="256" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">4</text>
              </g>

              <g className="left-right">
                <circle cx="125" cy="250" r="18" fill="url(#treeNodeGrad)" stroke="#06b6d4" strokeWidth="2" filter="url(#nodeShadow)"/>
                <text x="125" y="256" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">5</text>
              </g>

              <text x="150" y="340" textAnchor="middle" fill="#cbd5e1" fontSize="13" fontWeight="bold">Binary Tree Growth</text>
              <text x="150" y="360" textAnchor="middle" fill="#94a3b8" fontSize="11">Hierarchical Structure</text>
            </svg>
          </div>

          {/* Right: Properties + Complexity */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-cyan-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-cyan-100 mb-6">📋 Tree Properties</h2>
            <div className="space-y-3">
              <div className="bg-teal-800/30 p-4 rounded border border-teal-700/50">
                <p className="text-teal-300 font-semibold mb-2">📏 Height</p>
                <p className="text-slate-300 text-sm">Distance from root to deepest leaf</p>
                <p className="text-slate-400 text-xs mt-1">O(n) worst case | O(log n) balanced</p>
              </div>
              <div className="bg-emerald-800/30 p-4 rounded border border-emerald-700/50">
                <p className="text-emerald-300 font-semibold mb-2">📐 Depth</p>
                <p className="text-slate-300 text-sm">Distance from root to specific node</p>
                <p className="text-slate-400 text-xs mt-1">Used in traversal analysis</p>
              </div>
              <div className="bg-cyan-700/30 p-4 rounded border border-cyan-700/50">
                <p className="text-cyan-200 font-semibold mb-2">🔄 Traversals</p>
                <p className="text-slate-300 text-sm">In-order, Pre-order, Post-order, Level-order</p>
                <p className="text-slate-400 text-xs mt-1">Different use cases, same O(n)</p>
              </div>
              <div className="bg-teal-700/30 p-4 rounded border border-teal-700/50">
                <p className="text-teal-200 font-semibold mb-2">⚖️ Balance</p>
                <p className="text-slate-300 text-sm">Balanced trees optimize operations</p>
                <p className="text-slate-400 text-xs mt-1">Search: O(n) → O(log n)</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-slate-300 text-sm font-semibold mb-2">⏱️ Time Complexity:</p>
              <p className="text-cyan-400 font-mono text-sm">{topic.timeComplexity}</p>
              <p className="text-slate-300 text-sm font-semibold mb-2 mt-3">💾 Space Complexity:</p>
              <p className="text-cyan-400 font-mono text-sm">{topic.spaceComplexity}</p>
            </div>
          </div>
        </div>

        {/* Traversal Methods Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border border-emerald-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-emerald-100 mb-6">🔄 Traversal Methods</h2>
            <div className="space-y-3">
              <div className="bg-emerald-800/30 p-3 rounded border border-emerald-700/50">
                <p className="text-emerald-300 font-semibold">In-order (LDR)</p>
                <p className="text-slate-300 text-xs mt-1">Left → Data → Right (Sorted output for BST)</p>
              </div>
              <div className="bg-cyan-800/30 p-3 rounded border border-cyan-700/50">
                <p className="text-cyan-300 font-semibold">Pre-order (DLR)</p>
                <p className="text-slate-300 text-xs mt-1">Data → Left → Right (Tree copy, expressions)</p>
              </div>
              <div className="bg-teal-800/30 p-3 rounded border border-teal-700/50">
                <p className="text-teal-300 font-semibold">Post-order (LRD)</p>
                <p className="text-slate-300 text-xs mt-1">Left → Right → Data (Tree deletion, cleanup)</p>
              </div>
              <div className="bg-indigo-800/30 p-3 rounded border border-indigo-700/50">
                <p className="text-indigo-300 font-semibold">Level-order (BFS)</p>
                <p className="text-slate-300 text-xs mt-1">Level by level, left to right (Shortest path)</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-900/40 to-slate-900/40 border border-violet-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-violet-100 mb-6">🌲 Tree Types</h2>
            <div className="space-y-3">
              <div className="bg-violet-800/30 p-3 rounded border border-violet-700/50">
                <p className="text-violet-300 font-semibold">Binary Search Tree (BST)</p>
                <p className="text-slate-300 text-xs mt-1">Ordered: Left {`<`} Parent {`<`} Right</p>
              </div>
              <div className="bg-pink-800/30 p-3 rounded border border-pink-700/50">
                <p className="text-pink-300 font-semibold">AVL Tree</p>
                <p className="text-slate-300 text-xs mt-1">Self-balancing, Height difference ≤ 1</p>
              </div>
              <div className="bg-rose-800/30 p-3 rounded border border-rose-700/50">
                <p className="text-rose-300 font-semibold">Red-Black Tree</p>
                <p className="text-slate-300 text-xs mt-1">Self-balancing with color properties</p>
              </div>
              <div className="bg-amber-800/30 p-3 rounded border border-amber-700/50">
                <p className="text-amber-300 font-semibold">Complete Binary Tree</p>
                <p className="text-slate-300 text-xs mt-1">All levels filled except last (may be partial)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Notes */}
        <div className="bg-gradient-to-br from-teal-900/40 to-cyan-900/40 border border-teal-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-teal-100 mb-8">📚 Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4 font-normal text-base">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) {
                return <h3 key={idx} className="text-2xl font-bold text-cyan-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              } else if (line.startsWith('### ')) {
                return <h4 key={idx} className="text-xl font-bold text-teal-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
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

        {/* Practical Applications */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-orange-900/40 to-slate-900/40 border border-orange-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-orange-100 mb-6">💼 Real-World Applications</h2>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">•</span>
                <span><strong>Database Indexing:</strong> B-Trees in SQL databases</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">•</span>
                <span><strong>File Systems:</strong> Directory hierarchies</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">•</span>
                <span><strong>DOM Trees:</strong> HTML/XML document structure</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">•</span>
                <span><strong>Expression Parsing:</strong> Abstract Syntax Trees (AST)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">•</span>
                <span><strong>Game AI:</strong> Decision trees, game tree search</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">•</span>
                <span><strong>Compression:</strong> Huffman coding trees</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-lime-900/40 to-slate-900/40 border border-lime-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-lime-100 mb-6">✅ Common Algorithms</h2>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex gap-3">
                <span className="text-lime-400 font-bold">•</span>
                <span><strong>Searching:</strong> O(log n) in balanced trees</span>
              </li>
              <li className="flex gap-3">
                <span className="text-lime-400 font-bold">•</span>
                <span><strong>Insertion:</strong> Maintain order and balance</span>
              </li>
              <li className="flex gap-3">
                <span className="text-lime-400 font-bold">•</span>
                <span><strong>Deletion:</strong> Complex with multiple cases</span>
              </li>
              <li className="flex gap-3">
                <span className="text-lime-400 font-bold">•</span>
                <span><strong>Tree Rotation:</strong> Rebalancing technique</span>
              </li>
              <li className="flex gap-3">
                <span className="text-lime-400 font-bold">•</span>
                <span><strong>LCA (Lowest Common Ancestor):</strong> O(log n)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-lime-400 font-bold">•</span>
                <span><strong>Path Finding:</strong> DFS/BFS approaches</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-gradient-to-br from-teal-900/40 to-cyan-900/40 border border-teal-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-teal-100 mb-6">💻 Code Examples</h2>

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
