'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getDSATopics } from '@/lib/api';
import { Brain, LogOut, ArrowRight } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  module: number;
}

export default function DSAPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const topicsData = await getDSATopics();
        setTopics(topicsData);
      } catch (err) {
        console.error('Failed to load topics:', err);
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const groupedTopics = topics.reduce((acc, topic) => {
    if (!acc[topic.module]) acc[topic.module] = [];
    acc[topic.module].push(topic);
    return acc;
  }, {} as Record<number, Topic[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading DSA Topics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">DevMentor AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-400 hover:text-red-300 flex items-center gap-2 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Data Structures & Algorithms</h1>
          <p className="text-slate-400 text-lg">
            Master all major DSA topics through interactive visualizations and coding examples
          </p>
        </div>

        {/* Topics by Module */}
        <div className="space-y-12">
          {Object.entries(groupedTopics).map(([moduleNum, moduleTopics]) => (
            <div key={moduleNum}>
              <h2 className="text-2xl font-bold text-white mb-6">Module {moduleNum}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moduleTopics.map((topic) => (
                  <Link key={topic.id} href={`/dsa/${topic.id}`}>
                    <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 rounded-lg p-6 hover:border-cyan-400 transition hover:shadow-lg hover:shadow-cyan-400/20 cursor-pointer h-full">
                      <h3 className="text-lg font-bold text-white mb-3">{topic.name}</h3>
                      <p className="text-slate-400 text-sm mb-4">
                        Learn concepts, visualizations, code examples, and practice problems
                      </p>
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                        Explore <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Features */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-4">💻 Interactive Coding Practice</h3>
            <p className="text-slate-400 mb-4">
              Practice DSA problems with code execution in Java, C++, and Python.
            </p>
            <p className="text-cyan-400 font-semibold">Coming in Phase 2</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-4">🎤 Mock Interviews</h3>
            <p className="text-slate-400 mb-4">
              Test your knowledge with AI-powered topic-wise mock interviews.
            </p>
            <p className="text-cyan-400 font-semibold">Coming in Phase 5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// Build trigger: Mon Nov  9 16:36:12 IST 2026
