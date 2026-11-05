'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUserProfile, getUserProgress, getDSATopics, getFSDPaths } from '@/lib/api';
import { Brain, LogOut, BarChart3, Code2, GitBranch } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Progress {
  dsaProgress: { overallProgress: number };
  mernProgress: { overallProgress: number };
  meanProgress: { overallProgress: number };
  mockInterviewHistory: any[];
  learningStreak: { current: number };
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [paths, setPaths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const userStr = localStorage.getItem('user');
        if (userStr) {
          setUser(JSON.parse(userStr));
        }

        const [progressData, topicsData, pathsData] = await Promise.all([
          getUserProgress(),
          getDSATopics(),
          getFSDPaths(),
        ]);

        setProgress(progressData);
        setTopics(topicsData);
        setPaths(pathsData);
      } catch (err) {
        console.error('Failed to load data:', err);
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">DevMentor AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">{user?.name}</span>
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
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-slate-400">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <BarChart3 className="w-6 h-6 text-cyan-400 mb-2" />
            <p className="text-slate-400 text-sm mb-1">DSA Progress</p>
            <p className="text-3xl font-bold text-white">
              {progress?.dsaProgress.overallProgress || 0}%
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Code2 className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-slate-400 text-sm mb-1">MERN Progress</p>
            <p className="text-3xl font-bold text-white">
              {progress?.mernProgress.overallProgress || 0}%
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <GitBranch className="w-6 h-6 text-violet-400 mb-2" />
            <p className="text-slate-400 text-sm mb-1">MEAN Progress</p>
            <p className="text-3xl font-bold text-white">
              {progress?.meanProgress.overallProgress || 0}%
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Brain className="w-6 h-6 text-orange-400 mb-2" />
            <p className="text-slate-400 text-sm mb-1">Learning Streak</p>
            <p className="text-3xl font-bold text-white">
              {progress?.learningStreak.current || 0} days
            </p>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Choose Your Path</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* DSA Path */}
            <Link href="/dsa" className="group">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 rounded-lg p-8 hover:border-cyan-400 transition hover:shadow-lg hover:shadow-cyan-400/20 cursor-pointer">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-cyan-400/20 rounded-lg">
                    <GitBranch className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">DSA Learning</h3>
                    <p className="text-slate-400 text-sm">
                      {progress?.dsaProgress.overallProgress || 0}% Complete
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">
                  Continue mastering Data Structures and Algorithms with interactive visualizations.
                </p>
                <button className="text-cyan-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition">
                  Continue Learning →
                </button>
              </div>
            </Link>

            {/* Full-Stack Path */}
            <Link href="/fullstack" className="group">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 rounded-lg p-8 hover:border-blue-400 transition hover:shadow-lg hover:shadow-blue-400/20 cursor-pointer">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-400/20 rounded-lg">
                    <Code2 className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Full-Stack Path</h3>
                    <p className="text-slate-400 text-sm">
                      MERN & MEAN Stacks
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">
                  Learn modern full-stack development with MERN and MEAN stacks.
                </p>
                <button className="text-blue-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition">
                  Explore Paths →
                </button>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Interviews */}
        {progress?.mockInterviewHistory && progress.mockInterviewHistory.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Recent Interviews</h2>
            <div className="space-y-4">
              {progress.mockInterviewHistory.slice(0, 5).map((interview, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">{interview.topic}</p>
                    <p className="text-slate-400 text-sm">{interview.difficulty} level</p>
                  </div>
                  <p className="text-2xl font-bold text-cyan-400">{interview.score}/100</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
