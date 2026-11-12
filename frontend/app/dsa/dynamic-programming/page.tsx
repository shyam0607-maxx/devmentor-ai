'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiCall } from '@/lib/api';
import { ArrowLeft, Copy, Check, LogOut } from 'lucide-react';
import { Celebration } from '@/lib/celebration';

interface Topic {
  id: string; name: string; description: string; notes: string;
  codeExamples: { java: string; python: string; cpp: string };
  timeComplexity: string; spaceComplexity: string; difficulty: string;
}

export default function DPPage() {
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    const loadTopic = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }
        const topicData = await apiCall('/dsa/topic/8/dynamic-programming');
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

  const handleMarkComplete = () => {
    setCelebrating(true);
  };

  const handleCelebrationComplete = () => {
    setCelebrating(false);
    router.push('/dsa/graphs-intro');
  };

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-fuchsia-950 via-slate-900 to-cyan-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>;
  if (!topic) return <div className="min-h-screen bg-gradient-to-br from-fuchsia-950 via-slate-900 to-cyan-950" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-950 via-slate-900 to-cyan-950">
      <Celebration isActive={celebrating} onComplete={handleCelebrationComplete} />
      <header className="border-b border-fuchsia-700/50 bg-fuchsia-950/70 backdrop-blur-sm sticky top-0 z-50">
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
          <div className="bg-gradient-to-br from-fuchsia-900/40 to-slate-900/40 border border-fuchsia-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-fuchsia-100 mb-6">⏱️ Complexity</h2>
            <div className="space-y-4">
              <div className="bg-fuchsia-800/30 p-4 rounded border border-fuchsia-700/50"><p className="text-fuchsia-300 font-semibold">Time</p><p className="text-cyan-400 font-mono">{topic.timeComplexity}</p></div>
              <div className="bg-cyan-800/30 p-4 rounded border border-cyan-700/50"><p className="text-cyan-300 font-semibold">Space</p><p className="text-cyan-400 font-mono">{topic.spaceComplexity}</p></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-cyan-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-cyan-100 mb-6">📊 Complexity Comparison</h2>
            <svg viewBox="0 0 300 180" className="w-full h-auto">
              <defs>
                <style>{`
                  @keyframes grow { 0% { height: 0; } 100% { height: 100%; } }
                  .bar { animation: grow 0.8s ease-out forwards; }
                `}</style>
              </defs>
              <text x="150" y="15" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">Naive vs DP: n=5 (Fibonacci)</text>
              <rect x="30" y="60" width="40" height="2" fill="#cbd5e1"/><text x="50" y="105" textAnchor="middle" fill="#cbd5e1" fontSize="10">Naive</text><text x="50" y="120" textAnchor="middle" fill="#0ea5e9" fontSize="11" fontWeight="bold">O(2^n)</text>
              <rect x="100" y="100" width="40" height="2" fill="#cbd5e1"/><text x="120" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="10">DP</text><text x="120" y="160" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">O(n)</text>
              <text x="150" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">DP: 32 → 5 calls</text>
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-violet-900/40 to-slate-900/40 border border-violet-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-violet-100 mb-6">🔄 Approaches</h2>
            <div className="space-y-3">
              <div className="bg-violet-800/30 p-3 rounded border border-violet-700/50">
                <p className="text-violet-300 font-semibold text-sm">Top-Down</p>
                <p className="text-slate-300 text-xs mt-1">Recursion + Caching</p>
              </div>
              <div className="bg-indigo-800/30 p-3 rounded border border-indigo-700/50">
                <p className="text-indigo-300 font-semibold text-sm">Bottom-Up</p>
                <p className="text-slate-300 text-xs mt-1">Iterative + Tabulation</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-900/40 to-slate-900/40 border border-amber-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-amber-100 mb-6">📋 Classic Problems</h2>
            <ul className="space-y-1 text-xs text-slate-300">
              <li>▸ Fibonacci sequence</li>
              <li>▸ Coin change</li>
              <li>▸ Knapsack problem</li>
              <li>▸ LCS (Longest)</li>
              <li>▸ Edit distance</li>
              <li>▸ Matrix chain</li>
            </ul>
          </div>
        </div>
        <div className="bg-gradient-to-br from-fuchsia-900/40 to-cyan-900/40 border border-fuchsia-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-fuchsia-100 mb-8">📚 Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) return <h3 key={idx} className="text-2xl font-bold text-cyan-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              if (line.startsWith('### ')) return <h4 key={idx} className="text-xl font-bold text-fuchsia-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
              if (line.startsWith('- ')) return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
              if (line.trim()) return <p key={idx} className="text-slate-300">{line}</p>;
              return null;
            })}
          </div>
        </div>
        <div className="bg-gradient-to-br from-fuchsia-900/40 to-cyan-900/40 border border-fuchsia-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-fuchsia-100 mb-6">💻 Code</h2>
          <div className="flex gap-4 mb-6 border-b border-slate-700">
            {['java', 'python', 'cpp'].map((lang) => <button key={lang} onClick={() => setSelectedLanguage(lang)} className={`px-4 py-2 font-semibold ${selectedLanguage === lang ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400'}`}>{lang.toUpperCase()}</button>)}
          </div>
          <div className="relative">
            <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-slate-700 rounded">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>
            <pre className="bg-slate-900 p-6 rounded overflow-x-auto text-slate-300 font-mono text-sm"><code>{topic.codeExamples[selectedLanguage as keyof typeof topic.codeExamples]}</code></pre>
          </div>
        </div>
        <div className="flex justify-between"><Link href="/dsa" className="px-6 py-3 bg-slate-700 text-white rounded-lg">← Back</Link><button onClick={handleMarkComplete} className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition font-semibold">Complete ✓</button></div>
      </div>
    </div>
  );
}
