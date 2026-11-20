'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const TECH_DATA: Record<string, any> = {
  '1': {
    name: 'MongoDB',
    icon: '🍃',
    color: 'green',
    modules: [
      { id: '1', name: 'Introduction & Setup', slug: 'intro-setup' },
      { id: '2', name: 'CRUD Operations', slug: 'crud-operations' },
      { id: '3', name: 'Querying & Indexing', slug: 'querying-indexing' },
      { id: '4', name: 'Aggregation Pipeline', slug: 'aggregation' },
      { id: '5', name: 'Replication & Sharding', slug: 'replication-sharding' }
    ]
  },
  '2': {
    name: 'Express.js',
    icon: '⚡',
    color: 'yellow',
    modules: [
      { id: '1', name: 'Getting Started', slug: 'getting-started' },
      { id: '2', name: 'Routing & Handlers', slug: 'routing-handlers' },
      { id: '3', name: 'Middleware', slug: 'middleware' },
      { id: '4', name: 'Error Handling', slug: 'error-handling' },
      { id: '5', name: 'Advanced Patterns', slug: 'advanced-patterns' }
    ]
  },
  '3': {
    name: 'Node.js',
    icon: '🟢',
    color: 'blue',
    modules: [
      { id: '1', name: 'Core Concepts', slug: 'core-concepts' },
      { id: '2', name: 'Async Programming', slug: 'async-programming' },
      { id: '3', name: 'File System', slug: 'file-system' },
      { id: '4', name: 'Streams & Buffers', slug: 'streams-buffers' },
      { id: '5', name: 'Performance', slug: 'performance' }
    ]
  },
  '4': {
    name: 'React',
    icon: '⚛️',
    color: 'cyan',
    modules: [
      { id: '1', name: 'Components & JSX', slug: 'components-jsx' },
      { id: '2', name: 'Hooks & State', slug: 'hooks-state' },
      { id: '3', name: 'Effect & Lifecycle', slug: 'effect-lifecycle' },
      { id: '4', name: 'Context API', slug: 'context-api' },
      { id: '5', name: 'Performance & Optimization', slug: 'performance-optimization' }
    ]
  },
  '5': {
    name: 'Angular',
    icon: '🅰️',
    color: 'red',
    modules: [
      { id: '1', name: 'Setup & Components', slug: 'setup-components' },
      { id: '2', name: 'Templates & Binding', slug: 'templates-binding' },
      { id: '3', name: 'Services & DI', slug: 'services-di' },
      { id: '4', name: 'Routing', slug: 'routing' },
      { id: '5', name: 'RxJS & Observables', slug: 'rxjs-observables' }
    ]
  }
};

export default function TechPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const techId = (params?.techId as string) || '';
  const tech = mounted ? TECH_DATA[techId] : null;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!tech) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Technology Not Found</h1>
          <Link href="/fs-learning" className="text-cyan-400 hover:text-cyan-300">Back to Learning</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/fs-learning" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">← Back to Technologies</Link>

        <div className="mb-12">
          <div className="text-6xl mb-4">{tech.icon}</div>
          <h1 className="text-5xl font-bold text-white mb-2">{tech.name}</h1>
          <p className="text-xl text-slate-400">Master all aspects of {tech.name}</p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Learning Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tech.modules.map((module: any) => (
            <Link key={module.id} href={`/fs-learning/${techId}/${module.id}`}>
              <div className={`bg-gradient-to-br from-${tech.color}-900/40 to-slate-900/40 border border-${tech.color}-700/50 rounded-lg p-6 hover:border-${tech.color}-400 hover:shadow-lg hover:shadow-${tech.color}-400/20 transition h-full cursor-pointer`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white flex-1">{module.name}</h3>
                  <span className="text-cyan-400 text-lg">→</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">Module {module.id} of {tech.modules.length}</p>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">
                  Start Learning
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Module Overview</h2>
          <div className="text-slate-300 space-y-2">
            <p>✓ {tech.modules.length} comprehensive modules</p>
            <p>✓ Detailed notes and explanations</p>
            <p>✓ Real-world code examples with output</p>
            <p>✓ Top 10 interview FAQs per module</p>
            <p>✓ 3D visualizations and animations</p>
            <p>✓ Practice exercises and challenges</p>
          </div>
        </div>
      </div>
    </div>
  );
}
