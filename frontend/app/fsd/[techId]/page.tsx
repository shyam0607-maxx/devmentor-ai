'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { apiCall } from '@/lib/api';
import { ArrowLeft, LogOut } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  timeComplexity: string;
  spaceComplexity: string;
  notes: string;
  codeExamples: {
    javascript?: string;
    python?: string;
    node?: string;
  };
}

interface Technology {
  id: string;
  name: string;
  description: string;
  color: string;
  topics: Topic[];
}

export default function TechnologyPage() {
  const router = useRouter();
  const params = useParams();
  const techId = params.techId as string;

  const [technology, setTechnology] = useState<Technology | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTechnology = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const techData = await apiCall(`/fsd/technology/${techId}`);
        setTechnology(techData);
      } catch (err) {
        console.error('Failed to load technology:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTechnology();
  }, [techId, router]);

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

  if (!technology) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Technology Not Found</h1>
            <Link href="/fsd" className="text-cyan-400 hover:text-cyan-300">
              Back to Full Stack Development
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const colorGradient: { [key: string]: string } = {
    green: 'from-green-900/60 to-slate-900/60 border-green-700/50',
    yellow: 'from-yellow-900/60 to-slate-900/60 border-yellow-700/50',
    blue: 'from-blue-900/60 to-slate-900/60 border-blue-700/50',
    cyan: 'from-cyan-900/60 to-slate-900/60 border-cyan-700/50',
    red: 'from-red-900/60 to-slate-900/60 border-red-700/50',
  };

  const difficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-900 text-green-200';
      case 'intermediate':
        return 'bg-yellow-900 text-yellow-200';
      case 'advanced':
        return 'bg-red-900 text-red-200';
      default:
        return 'bg-blue-900 text-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/fsd" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300">Back to Full Stack</span>
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
        {/* Title Section */}
        <div className={`bg-gradient-to-r ${colorGradient[technology.color]} border rounded-xl p-8 mb-12`}>
          <h1 className="text-5xl font-bold text-white mb-4">{technology.name}</h1>
          <p className="text-xl text-slate-300">{technology.description}</p>
        </div>

        {/* Topics Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Learning Topics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {technology.topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/fsd/${techId}/${topic.id}`}
                className="group"
              >
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition h-full cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition flex-1">
                      {topic.name}
                    </h3>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${difficultyColor(topic.difficulty)} ml-2 whitespace-nowrap`}>
                      {topic.difficulty}
                    </span>
                  </div>

                  <p className="text-slate-400 mb-4">{topic.description}</p>

                  <div className="flex gap-4 text-sm text-slate-500 mb-4">
                    <span>⏱️ Time: {topic.timeComplexity}</span>
                    <span>💾 Space: {topic.spaceComplexity}</span>
                  </div>

                  <button className="text-cyan-400 hover:text-cyan-300 transition font-semibold flex items-center gap-2">
                    Start Learning <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Learning Path Info */}
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">What You'll Learn</h3>
          <ul className="grid md:grid-cols-2 gap-4 text-slate-300">
            <li className="flex items-center gap-3">
              <span className="text-cyan-400 text-lg">✓</span>
              Fundamental concepts and best practices
            </li>
            <li className="flex items-center gap-3">
              <span className="text-cyan-400 text-lg">✓</span>
              Practical code examples in multiple languages
            </li>
            <li className="flex items-center gap-3">
              <span className="text-cyan-400 text-lg">✓</span>
              Interactive 3D animations for better understanding
            </li>
            <li className="flex items-center gap-3">
              <span className="text-cyan-400 text-lg">✓</span>
              Real-world use cases and applications
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
