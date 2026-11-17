'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFSDPaths, apiCall } from '@/lib/api';
import { ArrowLeft, LogOut, BookOpen } from 'lucide-react';

interface Technology {
  id: string;
  name: string;
  description: string;
  color: string;
  topicCount: number;
}

const DEFAULT_TECHNOLOGIES: Technology[] = [
  {
    id: '1',
    name: 'MongoDB',
    description: 'NoSQL Database for scalable applications',
    color: 'green',
    topicCount: 2
  },
  {
    id: '2',
    name: 'Express.js',
    description: 'Fast, unopinionated web framework for Node.js',
    color: 'yellow',
    topicCount: 1
  },
  {
    id: '3',
    name: 'Node.js',
    description: 'JavaScript runtime for server-side development',
    color: 'blue',
    topicCount: 1
  },
  {
    id: '4',
    name: 'React',
    description: 'JavaScript library for building user interfaces',
    color: 'cyan',
    topicCount: 1
  },
  {
    id: '5',
    name: 'Angular',
    description: 'Complete framework for building web applications',
    color: 'red',
    topicCount: 1
  }
];

export default function FSDPage() {
  const router = useRouter();
  const [technologies, setTechnologies] = useState<Technology[]>(DEFAULT_TECHNOLOGIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Try to load from API, but fall back to default if it fails
        try {
          const techData = await apiCall('/fsd/technologies');
          setTechnologies(techData);
        } catch (apiErr) {
          console.warn('API call failed, using default technologies:', apiErr);
          // Keep default technologies
        }
      } finally {
        setLoading(false);
      }
    };

    loadTechnologies();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading technologies...</div>
      </div>
    );
  }

  const colorClasses: { [key: string]: string } = {
    green: 'from-green-900/40 to-slate-900/40 border-green-700/50',
    yellow: 'from-yellow-900/40 to-slate-900/40 border-yellow-700/50',
    blue: 'from-blue-900/40 to-slate-900/40 border-blue-700/50',
    cyan: 'from-cyan-900/40 to-slate-900/40 border-cyan-700/50',
    red: 'from-red-900/40 to-slate-900/40 border-red-700/50',
  };

  const textColorClasses: { [key: string]: string } = {
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
    cyan: 'text-cyan-400',
    red: 'text-red-400',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300">Back to Dashboard</span>
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
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Full Stack Development</h1>
          <p className="text-xl text-slate-300">
            Master the complete web development stack with 5 essential technologies
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech) => {
            const colorClass = colorClasses[tech.color] || colorClasses.blue;
            const textColor = textColorClasses[tech.color] || textColorClasses.blue;

            return (
              <Link
                key={tech.id}
                href={`/fsd/${tech.id}`}
                className="group"
              >
                <div className={`bg-gradient-to-br ${colorClass} border rounded-xl p-8 hover:border-opacity-100 hover:shadow-lg transition transform hover:scale-105 h-full cursor-pointer`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 bg-slate-900/50 rounded-lg`}>
                      <BookOpen className={`w-8 h-8 ${textColor}`} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">{tech.name}</h3>
                      <p className={`text-sm font-semibold ${textColor}`}>
                        {tech.topicCount} Topics
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-6">
                    {tech.description}
                  </p>

                  <div className="flex items-center gap-2 text-slate-400 group-hover:text-white transition">
                    <span>Explore Learning Path</span>
                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Learning Path Info */}
        <div className="mt-16 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Complete Learning Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Frontend Technologies</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">▸</span> React - Interactive UI Library
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">▸</span> Angular - Complete Framework
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Backend Technologies</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">▸</span> Node.js - JavaScript Runtime
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">▸</span> Express - Web Framework
                </li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Database</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">▸</span> MongoDB - NoSQL Database
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
