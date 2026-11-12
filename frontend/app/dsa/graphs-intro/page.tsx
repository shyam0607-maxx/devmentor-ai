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

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-amber-950 via-slate-900 to-cyan-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>;
  if (!topic) return <div className="min-h-screen bg-gradient-to-br from-amber-950 via-slate-900 to-cyan-950" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-slate-900 to-cyan-950">
      <header className="border-b border-amber-700/50 bg-amber-950/70 backdrop-blur-sm sticky top-0 z-50">
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
          <div className="bg-gradient-to-br from-amber-900/40 to-slate-900/40 border border-amber-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-amber-100 mb-6">⏱️ Complexity</h2>
            <div className="space-y-4">
              <div className="bg-amber-800/30 p-4 rounded border border-amber-700/50"><p className="text-amber-300 font-semibold">Time</p><p className="text-cyan-400 font-mono">{topic.timeComplexity}</p></div>
              <div className="bg-cyan-800/30 p-4 rounded border border-cyan-700/50"><p className="text-cyan-300 font-semibold">Space</p><p className="text-cyan-400 font-mono">{topic.spaceComplexity}</p></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-cyan-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-cyan-100 mb-6">🎯 Fundamentals</h2>
            <ul className="space-y-2 text-slate-300"><li>✓ Vertices & Edges</li><li>✓ Directed/Undirected</li><li>✓ BFS & DFS traversal</li><li>✓ Real-world modeling</li></ul>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-900/40 to-cyan-900/40 border border-amber-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-amber-100 mb-8">📚 Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) return <h3 key={idx} className="text-2xl font-bold text-cyan-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              if (line.startsWith('### ')) return <h4 key={idx} className="text-xl font-bold text-amber-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
              if (line.startsWith('- ')) return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
              if (line.trim()) return <p key={idx} className="text-slate-300">{line}</p>;
              return null;
            })}
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-900/40 to-cyan-900/40 border border-amber-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-amber-100 mb-6">💻 Code</h2>
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
