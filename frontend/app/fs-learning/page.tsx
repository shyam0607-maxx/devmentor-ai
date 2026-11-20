'use client';

import Link from 'next/link';

const TECHNOLOGIES = [
  {
    id: '1',
    name: 'MongoDB',
    icon: '🍃',
    color: 'green',
    description: 'NoSQL Database for scalable applications',
    modules: [
      { id: '1', name: 'Introduction & Setup', slug: 'intro-setup' },
      { id: '2', name: 'CRUD Operations', slug: 'crud-operations' },
      { id: '3', name: 'Querying & Indexing', slug: 'querying-indexing' },
      { id: '4', name: 'Aggregation Pipeline', slug: 'aggregation' },
      { id: '5', name: 'Replication & Sharding', slug: 'replication-sharding' }
    ]
  },
  {
    id: '2',
    name: 'Express.js',
    icon: '⚡',
    color: 'yellow',
    description: 'Fast, unopinionated web framework',
    modules: [
      { id: '1', name: 'Getting Started', slug: 'getting-started' },
      { id: '2', name: 'Routing & Handlers', slug: 'routing-handlers' },
      { id: '3', name: 'Middleware', slug: 'middleware' },
      { id: '4', name: 'Error Handling', slug: 'error-handling' },
      { id: '5', name: 'Advanced Patterns', slug: 'advanced-patterns' }
    ]
  },
  {
    id: '3',
    name: 'Node.js',
    icon: '🟢',
    color: 'blue',
    description: 'JavaScript runtime for backend',
    modules: [
      { id: '1', name: 'Core Concepts', slug: 'core-concepts' },
      { id: '2', name: 'Async Programming', slug: 'async-programming' },
      { id: '3', name: 'File System', slug: 'file-system' },
      { id: '4', name: 'Streams & Buffers', slug: 'streams-buffers' },
      { id: '5', name: 'Performance', slug: 'performance' }
    ]
  },
  {
    id: '4',
    name: 'React',
    icon: '⚛️',
    color: 'cyan',
    description: 'UI library for interactive interfaces',
    modules: [
      { id: '1', name: 'Components & JSX', slug: 'components-jsx' },
      { id: '2', name: 'Hooks & State', slug: 'hooks-state' },
      { id: '3', name: 'Effect & Lifecycle', slug: 'effect-lifecycle' },
      { id: '4', name: 'Context API', slug: 'context-api' },
      { id: '5', name: 'Performance & Optimization', slug: 'performance-optimization' }
    ]
  },
  {
    id: '5',
    name: 'Angular',
    icon: '🅰️',
    color: 'red',
    description: 'Complete framework for web apps',
    modules: [
      { id: '1', name: 'Setup & Components', slug: 'setup-components' },
      { id: '2', name: 'Templates & Binding', slug: 'templates-binding' },
      { id: '3', name: 'Services & DI', slug: 'services-di' },
      { id: '4', name: 'Routing', slug: 'routing' },
      { id: '5', name: 'RxJS & Observables', slug: 'rxjs-observables' }
    ]
  }
];

export default function FSLearningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-2">Full Stack Development</h1>
        <p className="text-xl text-slate-400 mb-12">
          Master 5 technologies with detailed modules, examples, and 3D visualizations
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECHNOLOGIES.map((tech) => (
            <Link key={tech.id} href={`/fs-learning/${tech.id}`}>
              <div className={`bg-gradient-to-br from-${tech.color}-900/40 to-slate-900/40 border border-${tech.color}-700/50 rounded-lg p-6 hover:border-${tech.color}-400 hover:shadow-lg transition cursor-pointer h-full`}>
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-2">{tech.name}</h2>
                <p className="text-slate-400 mb-4">{tech.description}</p>
                <div className="text-sm text-slate-300">
                  <p>📚 {tech.modules.length} comprehensive modules</p>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 font-semibold mt-4 inline-block">
                  Start Learning →
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">What's Included</h2>
          <div className="grid md:grid-cols-3 gap-6 text-slate-300">
            <div>
              <p className="font-bold text-cyan-400 mb-2">📖 Detailed Modules</p>
              <p className="text-sm">5+ in-depth modules per technology with step-by-step explanations</p>
            </div>
            <div>
              <p className="font-bold text-cyan-400 mb-2">💻 Code Examples</p>
              <p className="text-sm">Real-world examples with runnable code and expected output</p>
            </div>
            <div>
              <p className="font-bold text-cyan-400 mb-2">🎯 Interview FAQs</p>
              <p className="text-sm">Top 10 frequently asked interview questions per module</p>
            </div>
            <div>
              <p className="font-bold text-cyan-400 mb-2">🎨 3D Visualizations</p>
              <p className="text-sm">Interactive 3D animations showing concepts visually</p>
            </div>
            <div>
              <p className="font-bold text-cyan-400 mb-2">📊 Rendering Examples</p>
              <p className="text-sm">Output and results for every code example</p>
            </div>
            <div>
              <p className="font-bold text-cyan-400 mb-2">📱 Easy Navigation</p>
              <p className="text-sm">Tabs to switch between modules within each technology</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
