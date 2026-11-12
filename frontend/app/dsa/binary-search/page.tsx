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

export default function BinarySearchPage() {
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
        const topicData = await apiCall('/dsa/topic/7/binary-search');
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

  if (loading) return <Celebration isActive={celebrating} onComplete={handleCelebrationComplete} />
      <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-slate-900 to-cyan-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>;
  if (!topic) return <Celebration isActive={celebrating} onComplete={handleCelebrationComplete} />
      <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-slate-900 to-cyan-950"><header className="border-b border-yellow-700/50 bg-yellow-950/70"><div className="max-w-7xl mx-auto px-6 py-4"><Link href="/dsa"><span className="text-slate-300">Back</span></Link></div></header></div>;

  return (
    <Celebration isActive={celebrating} onComplete={handleCelebrationComplete} />
      <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-slate-900 to-cyan-950">
      <header className="border-b border-yellow-700/50 bg-yellow-950/70 backdrop-blur-sm sticky top-0 z-50">
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
          <div className="bg-gradient-to-br from-yellow-900/40 to-slate-900/40 border border-yellow-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-yellow-100 mb-6">⏱️ Complexity</h2>
            <div className="space-y-4">
              <div className="bg-yellow-800/30 p-4 rounded border border-yellow-700/50"><p className="text-yellow-300 font-semibold">Time</p><p className="text-cyan-400 font-mono">{topic.timeComplexity}</p></div>
              <div className="bg-cyan-800/30 p-4 rounded border border-cyan-700/50"><p className="text-cyan-300 font-semibold">Space</p><p className="text-cyan-400 font-mono">{topic.spaceComplexity}</p></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-cyan-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-cyan-100 mb-6">🔍 Search Visualization</h2>
            <svg viewBox="0 0 300 150" className="w-full h-auto">
              <defs>
                <style>{`
                  @keyframes pulse { 0%, 100% { r: 18; } 50% { r: 22; } }
                  .mid-marker { animation: pulse 1s ease-in-out infinite; }
                `}</style>
              </defs>
              <text x="150" y="15" textAnchor="middle" fill="#cbd5e1" fontSize="11">Binary Search: Find 35</text>
              <rect x="20" y="30" width="30" height="25" fill="#1e40af" stroke="#3b82f6" strokeWidth="1"/><text x="35" y="48" textAnchor="middle" fill="#fff" fontSize="10">10</text>
              <rect x="60" y="30" width="30" height="25" fill="#1e40af" stroke="#3b82f6" strokeWidth="1"/><text x="75" y="48" textAnchor="middle" fill="#fff" fontSize="10">20</text>
              <circle cx="115" cy="42" r="18" fill="none" stroke="#0ea5e9" strokeWidth="2" className="mid-marker"/><rect x="100" y="30" width="30" height="25" fill="#1e40af" stroke="#3b82f6" strokeWidth="1"/><text x="115" y="48" textAnchor="middle" fill="#fff" fontSize="10">30</text>
              <rect x="140" y="30" width="30" height="25" fill="#1e40af" stroke="#3b82f6" strokeWidth="1"/><text x="155" y="48" textAnchor="middle" fill="#fff" fontSize="10">40</text>
              <rect x="180" y="30" width="30" height="25" fill="#06b6d4" stroke="#0891b2" strokeWidth="2"/><text x="195" y="48" textAnchor="middle" fill="#fff" fontSize="10">50</text>
              <text x="150" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Compare: 30 {`<`} 35</text>
              <text x="150" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="10">↓ Search Right Half</text>
              <text x="150" y="115" textAnchor="middle" fill="#0ea5e9" fontSize="11" fontWeight="bold">Found 35 at index 4</text>
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-blue-100 mb-4">⚙️ Steps</h2>
            <ol className="space-y-1 text-xs text-slate-300 list-decimal list-inside">
              <li>Set boundaries</li>
              <li>Find middle</li>
              <li>Compare target</li>
              <li>Eliminate half</li>
              <li>Repeat/Found</li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/40 to-slate-900/40 border border-yellow-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-yellow-100 mb-4">📊 Iterations</h2>
            <div className="space-y-1 text-xs">
              <p className="text-slate-300"><strong className="text-yellow-300">n = 1,000:</strong> ~10 steps</p>
              <p className="text-slate-300"><strong className="text-yellow-300">n = 1,000,000:</strong> ~20 steps</p>
              <p className="text-slate-300"><strong className="text-yellow-300">n = 1 billion:</strong> ~30 steps</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border border-emerald-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-emerald-100 mb-4">✅ Pros & Cons</h2>
            <div className="space-y-1 text-xs">
              <p className="text-emerald-300"><strong>+</strong> Very fast O(log n)</p>
              <p className="text-emerald-300"><strong>+</strong> Simple code</p>
              <p className="text-red-400"><strong>-</strong> Array must be sorted</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-900/40 to-cyan-900/40 border border-yellow-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-yellow-100 mb-8">📚 Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) return <h3 key={idx} className="text-2xl font-bold text-cyan-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              if (line.startsWith('### ')) return <h4 key={idx} className="text-xl font-bold text-yellow-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
              if (line.startsWith('- ')) return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
              if (line.trim()) return <p key={idx} className="text-slate-300">{line}</p>;
              return null;
            })}
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-900/40 to-cyan-900/40 border border-yellow-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-yellow-100 mb-6">💻 Code</h2>
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
