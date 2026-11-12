'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiCall } from '@/lib/api';
import { ArrowLeft, Copy, Check, LogOut } from 'lucide-react';

interface Topic {
  id: string; name: string; description: string; notes: string;
  codeExamples: { java: string; python: string; cpp: string };
  timeComplexity: string; spaceComplexity: string; difficulty: string;
}

export default function GraphsPage() {
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopic = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }
        const topicData = await apiCall('/dsa/topic/8/graphs-intro');
        setTopic(topicData);
      } catch (err) {
        setTopic(null);
      } finally { setLoading(false); }
    };
    loadTopic();
  }, [router]);

  const handleCopy = () => {
    if (topic) {
      navigator.clipboard.writeText(topic.codeExamples[selectedLanguage as keyof typeof topic.codeExamples]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-sky-950 via-slate-900 to-cyan-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>;
  if (!topic) return <div className="min-h-screen bg-gradient-to-br from-sky-950 via-slate-900 to-cyan-950" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-950 via-slate-900 to-cyan-950">
      <header className="border-b border-sky-700/50 bg-sky-950/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dsa" className="flex items-center gap-2"><ArrowLeft className="w-5 h-5 text-cyan-400" /><span className="text-slate-300">Back to DSA</span></Link>
          <button onClick={handleLogout} className="px-4 py-2 text-red-400 flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="px-3 py-1 bg-cyan-400/20 rounded-lg w-fit mb-4"><span className="text-cyan-400 text-sm font-semibold">{topic.difficulty}</span></div>
          <h1 className="text-4xl font-bold text-white mb-2">{topic.name}</h1>
          <p className="text-slate-400 text-lg">{topic.description}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-sky-900/40 to-slate-900/40 border border-sky-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-sky-100 mb-6">⏱️ Complexity</h2>
            <div className="space-y-4">
              <div className="bg-sky-800/30 p-4 rounded border border-sky-700/50"><p className="text-sky-300 font-semibold">Time</p><p className="text-cyan-400 font-mono">{topic.timeComplexity}</p></div>
              <div className="bg-cyan-800/30 p-4 rounded border border-cyan-700/50"><p className="text-cyan-300 font-semibold">Space</p><p className="text-cyan-400 font-mono">{topic.spaceComplexity}</p></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-cyan-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-cyan-100 mb-6">🌐 Graph Visualization</h2>
            <svg viewBox="0 0 300 180" className="w-full h-auto">
              <defs>
                <style>{`
                  @keyframes nodeGrow { 0% { r: 0; opacity: 0; } 100% { r: 16; opacity: 1; } }
                  @keyframes edgeGrow { 0% { stroke-dasharray: 100; stroke-dashoffset: 100; } 100% { stroke-dasharray: 100; stroke-dashoffset: 0; } }
                  .graph-node { animation: nodeGrow 0.5s ease-out forwards; }
                  .graph-edge { animation: edgeGrow 0.7s ease-in-out forwards; stroke-dasharray: 100; }
                `}</style>
              </defs>
              <line x1="80" y1="80" x2="160" y2="80" stroke="#06b6d4" strokeWidth="2" className="graph-edge"/>
              <line x1="160" y1="80" x2="160" y2="140" stroke="#06b6d4" strokeWidth="2" className="graph-edge" style={{animationDelay: '0.2s'}}/>
              <line x1="80" y1="80" x2="160" y2="140" stroke="#06b6d4" strokeWidth="2" className="graph-edge" style={{animationDelay: '0.3s'}}/>

              <circle cx="80" cy="80" r="16" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" className="graph-node"/><text x="80" y="85" textAnchor="middle" fill="#fff" fontSize="12">A</text>
              <circle cx="160" cy="80" r="16" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" className="graph-node" style={{animationDelay: '0.15s'}}/><text x="160" y="85" textAnchor="middle" fill="#fff" fontSize="12">B</text>
              <circle cx="160" cy="140" r="16" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" className="graph-node" style={{animationDelay: '0.25s'}}/><text x="160" y="145" textAnchor="middle" fill="#fff" fontSize="12">C</text>

              <text x="150" y="30" textAnchor="middle" fill="#cbd5e1" fontSize="11">Graph: 3 nodes, 3 edges</text>
              <text x="150" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="10">Vertices (nodes) connected by edges</text>
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-blue-100 mb-6">🔍 Graph Types</h2>
            <div className="space-y-2">
              <div className="bg-blue-800/30 p-2 rounded text-xs">
                <p className="text-blue-300 font-semibold">Directed</p>
                <p className="text-slate-300">A → B (one-way)</p>
              </div>
              <div className="bg-cyan-800/30 p-2 rounded text-xs">
                <p className="text-cyan-300 font-semibold">Undirected</p>
                <p className="text-slate-300">A ↔ B (both ways)</p>
              </div>
              <div className="bg-purple-800/30 p-2 rounded text-xs">
                <p className="text-purple-300 font-semibold">Weighted</p>
                <p className="text-slate-300">Edges have values</p>
              </div>
              <div className="bg-indigo-800/30 p-2 rounded text-xs">
                <p className="text-indigo-300 font-semibold">Cyclic</p>
                <p className="text-slate-300">Has cycles/loops</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-slate-900/40 border border-orange-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-orange-100 mb-6">🧭 Traversals</h2>
            <div className="space-y-2">
              <div className="bg-orange-800/30 p-2 rounded border border-orange-700/50">
                <p className="text-orange-300 font-semibold text-sm">BFS (Queue)</p>
                <p className="text-slate-300 text-xs mt-0.5">Level-wise exploration</p>
              </div>
              <div className="bg-sky-800/30 p-2 rounded border border-sky-700/50">
                <p className="text-sky-300 font-semibold text-sm">DFS (Stack)</p>
                <p className="text-slate-300 text-xs mt-0.5">Deep exploration first</p>
              </div>
              <div className="space-y-1 text-xs text-slate-300 mt-3">
                <p><strong className="text-orange-300">Both:</strong> O(V+E)</p>
                <p><strong className="text-orange-300">V:</strong> vertices, E: edges</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-sky-900/40 to-cyan-900/40 border border-sky-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-sky-100 mb-8">📚 Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) return <h3 key={idx} className="text-2xl font-bold text-cyan-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              if (line.startsWith('### ')) return <h4 key={idx} className="text-xl font-bold text-sky-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
              if (line.startsWith('- ')) return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
              if (line.trim()) return <p key={idx} className="text-slate-300">{line}</p>;
              return null;
            })}
          </div>
        </div>
        <div className="bg-gradient-to-br from-sky-900/40 to-cyan-900/40 border border-sky-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-sky-100 mb-6">💻 Code</h2>
          <div className="flex gap-4 mb-6 border-b border-slate-700">
            {['java', 'python', 'cpp'].map((lang) => <button key={lang} onClick={() => setSelectedLanguage(lang)} className={`px-4 py-2 font-semibold ${selectedLanguage === lang ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400'}`}>{lang.toUpperCase()}</button>)}
          </div>
          <div className="relative">
            <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-slate-700 rounded">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>
            <pre className="bg-slate-900 p-6 rounded overflow-x-auto text-slate-300 font-mono text-sm"><code>{topic.codeExamples[selectedLanguage as keyof typeof topic.codeExamples]}</code></pre>
          </div>
        </div>
        <div className="flex justify-between"><Link href="/dsa" className="px-6 py-3 bg-slate-700 text-white rounded-lg">← Back</Link><button className="px-6 py-3 bg-cyan-500 text-white rounded-lg">Complete ✓</button></div>
      </div>
    </div>
  );
}
