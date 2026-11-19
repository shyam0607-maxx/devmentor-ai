'use client';

import Link from 'next/link';

export default function FullStackDevPage() {
  const technologies = [
    { id: '1', name: 'MongoDB', desc: 'NoSQL Database' },
    { id: '2', name: 'Express.js', desc: 'Web Framework' },
    { id: '3', name: 'Node.js', desc: 'JavaScript Runtime' },
    { id: '4', name: 'React', desc: 'UI Library' },
    { id: '5', name: 'Angular', desc: 'Complete Framework' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">Full Stack Development</h1>
        <p className="text-xl text-slate-300 mb-12">Master 5 essential technologies for complete web development</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => (
            <div key={tech.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition">
              <h2 className="text-2xl font-bold text-white mb-2">{tech.name}</h2>
              <p className="text-slate-400 mb-4">{tech.desc}</p>
              <button className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Complete Learning Path</h2>
          <p className="text-slate-300 mb-4">
            Learn how to build full-stack web applications with:
          </p>
          <ul className="text-slate-300 space-y-2">
            <li>✓ <strong>MongoDB</strong> - NoSQL Database for data storage</li>
            <li>✓ <strong>Express.js</strong> - Web framework for routing and middleware</li>
            <li>✓ <strong>Node.js</strong> - JavaScript runtime for backend</li>
            <li>✓ <strong>React</strong> - Frontend UI library</li>
            <li>✓ <strong>Angular</strong> - Alternative frontend framework</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
