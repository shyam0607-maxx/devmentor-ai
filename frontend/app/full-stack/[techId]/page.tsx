'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const TECH_DATA: Record<string, any> = {
  '1': {
    name: 'MongoDB',
    desc: 'NoSQL Database for scalable applications',
    color: 'green',
    topics: [
      { id: '1', name: 'MongoDB Basics', desc: 'Introduction to NoSQL databases' },
      { id: '2', name: 'CRUD Operations', desc: 'Create, Read, Update, Delete operations' }
    ]
  },
  '2': {
    name: 'Express.js',
    desc: 'Fast, unopinionated web framework for Node.js',
    color: 'yellow',
    topics: [
      { id: '1', name: 'Express Basics', desc: 'Server setup and routing' }
    ]
  },
  '3': {
    name: 'Node.js',
    desc: 'JavaScript runtime for server-side development',
    color: 'blue',
    topics: [
      { id: '1', name: 'Node.js Basics', desc: 'JavaScript runtime essentials' }
    ]
  },
  '4': {
    name: 'React',
    desc: 'JavaScript library for building user interfaces',
    color: 'cyan',
    topics: [
      { id: '1', name: 'React Basics', desc: 'Components and hooks' }
    ]
  },
  '5': {
    name: 'Angular',
    desc: 'Complete framework for building web applications',
    color: 'red',
    topics: [
      { id: '1', name: 'Angular Basics', desc: 'Components and services' }
    ]
  }
};

export default function TechPage() {
  const params = useParams();
  const techId = params?.techId as string;
  const tech = TECH_DATA[techId];

  if (!tech) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Technology Not Found</h1>
          <Link href="/full-stack" className="text-cyan-400 hover:text-cyan-300">Back to Full Stack</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/full-stack" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold text-white mb-2">{tech.name}</h1>
        <p className="text-xl text-slate-400 mb-12">{tech.desc}</p>

        <h2 className="text-3xl font-bold text-white mb-6">Learning Topics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {tech.topics.map((topic: any) => (
            <Link key={topic.id} href={`/full-stack/${techId}/${topic.id}`}>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition h-full cursor-pointer">
                <h3 className="text-2xl font-bold text-white mb-2 hover:text-cyan-400">{topic.name}</h3>
                <p className="text-slate-400">{topic.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
