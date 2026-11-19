'use client';

import Link from 'next/link';

export default function FullStackPage() {
  const technologies = [
    { id: '1', name: 'MongoDB', desc: 'NoSQL Database', color: 'green' },
    { id: '2', name: 'Express.js', desc: 'Web Framework', color: 'yellow' },
    { id: '3', name: 'Node.js', desc: 'JavaScript Runtime', color: 'blue' },
    { id: '4', name: 'React', desc: 'UI Library', color: 'cyan' },
    { id: '5', name: 'Angular', desc: 'Complete Framework', color: 'red' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">Full Stack Development</h1>
        <p className="text-xl text-slate-300 mb-12">Master 5 essential technologies</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => (
            <div key={tech.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 transition">
              <h2 className="text-2xl font-bold text-white mb-2">{tech.name}</h2>
              <p className="text-slate-400 mb-4">{tech.desc}</p>
              <Link href={`/full-stack/${tech.id}`} className="text-cyan-400 hover:text-cyan-300">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
