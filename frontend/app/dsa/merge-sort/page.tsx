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

export default function MergeSortPage() {
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    const loadTopic = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }
        const topicData = await apiCall('/dsa/topic/7/merge-sort');
        setTopic(topicData); setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
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
    router.push('/dsa/binary-search');
  };

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-cyan-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>;
  if (!topic) return <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-cyan-950"><header className="border-b border-red-700/50 bg-red-950/70"><div className="max-w-7xl mx-auto px-6 py-4 flex justify-between"><Link href="/dsa" className="flex items-center gap-2"><ArrowLeft className="w-5 h-5 text-cyan-400" /><span className="text-slate-300">Back</span></Link><button onClick={handleLogout} className="text-red-400"><LogOut className="w-4 h-4" /></button></div></header></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-cyan-950">
      <Celebration isActive={celebrating} onComplete={handleCelebrationComplete} />
      <header className="border-b border-red-700/50 bg-red-950/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dsa" className="flex items-center gap-2 hover:opacity-80"><ArrowLeft className="w-5 h-5 text-cyan-400" /><span className="text-slate-300">Back to DSA</span></Link>
          <button onClick={handleLogout} className="px-4 py-2 text-red-400 hover:text-red-300 flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="px-3 py-1 bg-cyan-400/20 rounded-lg w-fit mb-4"><span className="text-cyan-400 text-sm font-semibold">{topic.difficulty}</span></div>
          <h1 className="text-4xl font-bold text-white mb-2">{topic.name}</h1>
          <p className="text-slate-400 text-lg">{topic.description}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-red-900/40 to-slate-900/40 border border-red-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-red-100 mb-6">⏱️ Complexity Analysis</h2>
            <div className="space-y-4">
              <div className="bg-red-800/30 p-4 rounded border border-red-700/50"><p className="text-red-300 font-semibold mb-2">Time Complexity</p><p className="text-cyan-400 font-mono text-lg">{topic.timeComplexity}</p></div>
              <div className="bg-cyan-800/30 p-4 rounded border border-cyan-700/50"><p className="text-cyan-300 font-semibold mb-2">Space Complexity</p><p className="text-cyan-400 font-mono text-lg">{topic.spaceComplexity}</p></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-cyan-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-cyan-100 mb-6">🎬 Merge Process</h2>
            <svg viewBox="0 0 300 150" className="w-full h-auto">
              <defs>
                <style>{`
                  @keyframes merge { 0% { opacity: 0; y: -20px; } 100% { opacity: 1; y: 0; } }
                  .merge-item { animation: merge 0.5s ease-out forwards; }
                `}</style>
              </defs>
              <text x="150" y="20" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">Merge: Combine Sorted Arrays</text>

              <g className="merge-item">
                <rect x="10" y="35" width="30" height="30" fill="#06b6d4" stroke="#0891b2" strokeWidth="2"/>
                <text x="25" y="55" textAnchor="middle" fill="#fff" fontSize="11">1</text>
              </g>
              <g className="merge-item" style={{animationDelay: '0.1s'}}>
                <rect x="50" y="35" width="30" height="30" fill="#06b6d4" stroke="#0891b2" strokeWidth="2"/>
                <text x="65" y="55" textAnchor="middle" fill="#fff" fontSize="11">3</text>
              </g>

              <g className="merge-item" style={{animationDelay: '0.2s'}}>
                <rect x="130" y="35" width="30" height="30" fill="#06b6d4" stroke="#0891b2" strokeWidth="2"/>
                <text x="145" y="55" textAnchor="middle" fill="#fff" fontSize="11">2</text>
              </g>
              <g className="merge-item" style={{animationDelay: '0.2s'}}>
                <rect x="170" y="35" width="30" height="30" fill="#06b6d4" stroke="#0891b2" strokeWidth="2"/>
                <text x="185" y="55" textAnchor="middle" fill="#fff" fontSize="11">4</text>
              </g>

              <text x="150" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="10">↓ Merge ↓</text>

              <g className="merge-item" style={{animationDelay: '0.4s'}}>
                <rect x="20" y="105" width="25" height="25" fill="#0ea5e9" stroke="#0891b2" strokeWidth="2"/>
                <text x="32" y="122" textAnchor="middle" fill="#fff" fontSize="10">1</text>
              </g>
              <g className="merge-item" style={{animationDelay: '0.5s'}}>
                <rect x="55" y="105" width="25" height="25" fill="#0ea5e9" stroke="#0891b2" strokeWidth="2"/>
                <text x="67" y="122" textAnchor="middle" fill="#fff" fontSize="10">2</text>
              </g>
              <g className="merge-item" style={{animationDelay: '0.6s'}}>
                <rect x="90" y="105" width="25" height="25" fill="#0ea5e9" stroke="#0891b2" strokeWidth="2"/>
                <text x="102" y="122" textAnchor="middle" fill="#fff" fontSize="10">3</text>
              </g>
              <g className="merge-item" style={{animationDelay: '0.7s'}}>
                <rect x="125" y="105" width="25" height="25" fill="#0ea5e9" stroke="#0891b2" strokeWidth="2"/>
                <text x="137" y="122" textAnchor="middle" fill="#fff" fontSize="10">4</text>
              </g>
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border border-emerald-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-emerald-100 mb-4">📊 Phases</h2>
            <div className="space-y-2">
              <div className="bg-emerald-800/30 p-2 rounded text-xs">
                <p className="text-emerald-300 font-semibold">1. Divide</p>
                <p className="text-slate-300">Split array</p>
              </div>
              <div className="bg-cyan-800/30 p-2 rounded text-xs">
                <p className="text-cyan-300 font-semibold">2. Conquer</p>
                <p className="text-slate-300">Sort halves</p>
              </div>
              <div className="bg-indigo-800/30 p-2 rounded text-xs">
                <p className="text-indigo-300 font-semibold">3. Merge</p>
                <p className="text-slate-300">Combine parts</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-slate-900/40 border border-orange-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-orange-100 mb-4">💾 Analysis</h2>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300"><strong>Time:</strong> O(n log n)</p>
              <p className="text-slate-300"><strong>Space:</strong> O(n)</p>
              <p className="text-slate-300"><strong>Stable:</strong> Yes</p>
              <p className="text-slate-300"><strong>In-place:</strong> No</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-900/40 to-slate-900/40 border border-violet-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-violet-100 mb-4">🎯 Best For</h2>
            <ul className="space-y-1 text-xs text-slate-300">
              <li>▸ Linked lists</li>
              <li>▸ External sorting</li>
              <li>▸ Stable sorting</li>
              <li>▸ Guaranteed O(n log n)</li>
            </ul>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-900/40 to-cyan-900/40 border border-red-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-red-100 mb-8">📚 Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4 font-normal text-base">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) return <h3 key={idx} className="text-2xl font-bold text-cyan-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              if (line.startsWith('### ')) return <h4 key={idx} className="text-xl font-bold text-red-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
              if (line.startsWith('- ')) return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
              if (line.trim() === '') return <br key={idx} />;
              return <p key={idx} className="text-slate-300">{line}</p>;
            })}
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-900/40 to-cyan-900/40 border border-red-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-red-100 mb-6">💻 Code Examples</h2>
          <div className="flex gap-4 mb-6 border-b border-slate-700">
            {['java', 'python', 'cpp'].map((lang) => <button key={lang} onClick={() => setSelectedLanguage(lang)} className={`px-4 py-2 font-semibold transition ${selectedLanguage === lang ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400'}`}>{lang.toUpperCase()}</button>)}
          </div>
          <div className="relative">
            <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-slate-700 hover:bg-slate-600 rounded flex items-center gap-2 text-slate-300">{copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}</button>
            <pre className="bg-slate-900 p-6 rounded overflow-x-auto text-slate-300 font-mono text-sm"><code>{topic.codeExamples[selectedLanguage as keyof typeof topic.codeExamples]}</code></pre>
          </div>
        </div>
        <div className="flex justify-between"><Link href="/dsa" className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">← Back</Link><button onClick={handleMarkComplete} className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition font-semibold">Mark as Complete ✓</button></div>
      </div>
    </div>
  );
}
