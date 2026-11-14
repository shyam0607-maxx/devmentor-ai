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

export default function TriePage() {
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
        const topicData = await apiCall('/dsa/topic/9/trie');
        setTopic(topicData);
      } catch (err) { setTopic(null); } finally { setLoading(false); }
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

  const handleMarkComplete = async () => {
    try {
      await apiCall('/user/complete-topic', 'POST', { topicId: 'trie', moduleNumber: 9 });
      setCelebrating(true);
    } catch (err) {
      console.error('Error marking topic complete:', err);
    }
  };
  const handleCelebrationComplete = () => { setCelebrating(false); router.push('/dsa/union-find'); };

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>;
  if (!topic) return <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900">
      <Celebration isActive={celebrating} onComplete={handleCelebrationComplete} />
      <header className="border-b border-blue-700/50 bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dsa" className="flex items-center gap-2"><ArrowLeft className="w-5 h-5 text-blue-400" /><span className="text-slate-300">Back to DSA</span></Link>
          <button onClick={handleLogout} className="px-4 py-2 text-red-400 flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="px-3 py-1 bg-blue-400/20 rounded-lg w-fit mb-4"><span className="text-blue-400 text-sm font-semibold">{topic.difficulty}</span></div>
          <h1 className="text-4xl font-bold text-white mb-2">{topic.name}</h1>
          <p className="text-slate-400 text-lg">{topic.description}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-blue-100 mb-6">⏱️ Complexity</h2>
            <div className="space-y-4">
              <div className="bg-blue-800/30 p-4 rounded border border-blue-700/50"><p className="text-blue-300 font-semibold">Time</p><p className="text-blue-400 font-mono">{topic.timeComplexity}</p></div>
              <div className="bg-slate-800/30 p-4 rounded border border-slate-700/50"><p className="text-slate-300 font-semibold">Space</p><p className="text-slate-400 font-mono">{topic.spaceComplexity}</p></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/40 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-extrabold text-slate-100 mb-6">🌳 Trie Structure</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <p>• Tree-based for string storage</p>
              <p>• Fast prefix searches</p>
              <p>• Autocomplete applications</p>
              <p>• Each node has 26 children</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-blue-100 mb-8">📚 Notes</h2>
          <div className="text-slate-200 leading-relaxed space-y-4">
            {topic.notes.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) return <h3 key={idx} className="text-2xl font-bold text-blue-300 mt-6 mb-4">{line.replace(/^## /, '')}</h3>;
              if (line.startsWith('### ')) return <h4 key={idx} className="text-xl font-bold text-blue-200 mt-4 mb-3">{line.replace(/^### /, '')}</h4>;
              if (line.startsWith('- ')) return <li key={idx} className="ml-6 text-slate-300">{line.replace(/^- /, '')}</li>;
              if (line.trim()) return <p key={idx} className="text-slate-300">{line}</p>;
              return null;
            })}
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-blue-100 mb-6">💻 Code</h2>
          <div className="flex gap-4 mb-6 border-b border-slate-700">
            {['java', 'python', 'cpp'].map((lang) => <button key={lang} onClick={() => setSelectedLanguage(lang)} className={`px-4 py-2 font-semibold ${selectedLanguage === lang ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400'}`}>{lang.toUpperCase()}</button>)}
          </div>
          <div className="relative">
            <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-slate-700 rounded">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>
            <pre className="bg-slate-900 p-6 rounded overflow-x-auto text-slate-300 font-mono text-sm"><code>{topic.codeExamples[selectedLanguage as keyof typeof topic.codeExamples]}</code></pre>
          </div>
        </div>
        <div className="flex justify-between"><Link href="/dsa" className="px-6 py-3 bg-slate-700 text-white rounded-lg">← Back</Link><button onClick={handleMarkComplete} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition font-semibold">Complete ✓</button></div>
      </div>
    </div>
  );
}
