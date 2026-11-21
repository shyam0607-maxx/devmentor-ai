'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { MODULE_DATA_COMPLETE } from '@/app/fs-learning/modulesData';
import { renderMindMapAnimation } from '@/app/fs-learning/animations/mindMapAnimations';

function ModuleContent() {
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const techId = (params?.techId as string) || '';
  const moduleId = (params?.moduleId as string) || '';

  let module = MODULE_DATA_COMPLETE[techId]?.[moduleId];

  // Calculate next module for navigation
  const getNextModule = () => {
    const currentModuleNum = parseInt(moduleId);
    const nextModuleNum = currentModuleNum + 1;

    // If next module exists in same tech (max 5 modules)
    if (nextModuleNum <= 5) {
      return `/fs-learning/${techId}/${nextModuleNum}`;
    }
    // If at last module, go to next tech first module
    const nextTechNum = parseInt(techId) + 1;
    if (nextTechNum <= 5) {
      return `/fs-learning/${nextTechNum}/1`;
    }
    // If at end, go back to main
    return '/fs-learning';
  };

  // Determine animation type based on tech AND module
  const getAnimationType = () => {
    // MongoDB animations
    if (techId === '1' && moduleId === '1') return 'mongodb-intro';
    if (techId === '1' && moduleId === '2') return 'crud';
    if (techId === '1' && moduleId === '3') return 'indexing';
    if (techId === '1' && moduleId === '4') return 'pipeline';
    if (techId === '1' && moduleId === '5') return 'replication';

    // Express animations
    if (techId === '2' && moduleId === '1') return 'express-setup';
    if (techId === '2' && moduleId === '2') return 'routing';
    if (techId === '2' && moduleId === '3') return 'middleware-chain';
    if (techId === '2' && moduleId === '4') return 'error-flow';
    if (techId === '2' && moduleId === '5') return 'mvc';

    // Node.js animations
    if (techId === '3' && moduleId === '1') return 'nodejs-runtime';
    if (techId === '3' && moduleId === '2') return 'async-flow';
    if (techId === '3' && moduleId === '3') return 'file-io';
    if (techId === '3' && moduleId === '4') return 'streams';
    if (techId === '3' && moduleId === '5') return 'performance';

    // React animations
    if (techId === '4' && moduleId === '1') return 'jsx-structure';
    if (techId === '4' && moduleId === '2') return 'hooks-state';
    if (techId === '4' && moduleId === '3') return 'effect-lifecycle';
    if (techId === '4' && moduleId === '4') return 'context-flow';
    if (techId === '4' && moduleId === '5') return 'optimization';

    // Angular animations
    if (techId === '5' && moduleId === '1') return 'ng-structure';
    if (techId === '5' && moduleId === '2') return 'binding-flow';
    if (techId === '5' && moduleId === '3') return 'dependency-inject';
    if (techId === '5' && moduleId === '4') return 'ng-routing';
    if (techId === '5' && moduleId === '5') return 'rxjs-flow';

    return 'generic';
  };

  // Fallback for missing modules
  if (!module) {
    module = {
      title: `Module ${moduleId} - Coming Soon`,
      description: 'Comprehensive learning content coming soon',
      notes: `# Module Content\n\n## Coming Soon\n\nThis module is being prepared with detailed explanations, code examples, and interview questions.`,
      examples: [{
        title: 'Example',
        code: `console.log('Learning in progress');`,
        output: `Learning in progress`
      }],
      faqs: [
        { q: 'When ready?', a: 'Soon with full content' },
        { q: 'What includes?', a: 'Notes, code, FAQs' },
        { q: 'Is free?', a: 'Yes' },
        { q: 'Mobile friendly?', a: 'Yes' },
        { q: 'Updates?', a: 'Regular content' },
        { q: 'Examples?', a: 'Interactive code' },
        { q: 'Download?', a: 'Available' },
        { q: 'Certificates?', a: 'Yes' },
        { q: 'Help?', a: 'Community support' },
        { q: 'Contribute?', a: 'Help build content' }
      ]
    };
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href={`/fs-learning/${techId}`} className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">← Back to Modules</Link>

        <style>{`
          .module-title {
            font-size: 3rem;
            font-weight: bold;
            background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #f59e0b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 4px 6px rgba(6, 182, 212, 0.3));
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 10px rgba(6, 182, 212, 0.2);
            animation: shimmer 3s ease-in-out infinite;
          }
          @keyframes shimmer {
            0%, 100% { filter: drop-shadow(0 4px 6px rgba(6, 182, 212, 0.3)); }
            50% { filter: drop-shadow(0 6px 12px rgba(139, 92, 246, 0.4)); }
          }
          .section-title {
            font-size: 1.5rem;
            font-weight: bold;
            background: linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3));
            position: relative;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid;
            border-image: linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%) 1;
          }
        `}</style>
        <h1 className="module-title">{module.title}</h1>
        <p className="text-xl text-slate-300 mb-8 font-light">{module.description}</p>

        {/* Advanced Mind-Map Visualization */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-750 to-slate-900 border-3 border-gradient rounded-xl p-8 mb-8 shadow-2xl">
          <h2 className="section-title mb-2">🧠 Interactive Mind-Map Learning Structure</h2>
          <p className="text-slate-400 text-sm mb-6">Topic breakdown and concept relationships for deep understanding</p>
          <div className="w-full bg-gradient-to-b from-slate-800 to-slate-950 rounded-lg flex items-center justify-center overflow-hidden" style={{height: '700px', minHeight: '700px', borderTop: '2px solid rgba(6,182,212,0.3)'}}>
            <svg viewBox="0 0 1000 700" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <style>{`
                  @keyframes pulse { 0%, 100% { r: 8px; opacity: 0.7; } 50% { r: 12px; opacity: 1; } }
                  @keyframes glow { 0%, 100% { filter: drop-shadow(0 0 3px); } 50% { filter: drop-shadow(0 0 15px); } }
                  @keyframes fadeInScale { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
                  @keyframes drawLine { 0% { stroke-dashoffset: 1000; } 100% { stroke-dashoffset: 0; } }
                  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
                  @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                  .mindmap-node { animation: glow 3s ease-in-out infinite; }
                  .mindmap-pulse { animation: pulse 2s ease-in-out infinite; }
                  .mindmap-line { animation: drawLine 2s ease-in-out forwards; stroke-dasharray: 1000; }
                  .mindmap-center { animation: float 3s ease-in-out infinite; }
                `}</style>
                <linearGradient id="primary" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#06b6d4', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#0891b2', stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="secondary" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
                </linearGradient>
                <filter id="mindmapGlow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Universal Mind-Map Animation Renderer */}
              {renderMindMapAnimation(getAnimationType())}

              {/* React: Components & JSX */}
              {getAnimationType() === 'jsx-structure' && (
                <>
                  <text x="200" y="90" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">&lt;Component /&gt;</text>
                  <rect x="150" y="100" width="100" height="40" fill="none" stroke="#8b5cf6" strokeWidth="2" rx="4"/>
                  <line x1="200" y1="140" x2="200" y2="160" stroke="#34d399" strokeWidth="2"/>
                  <text x="200" y="175" textAnchor="middle" fill="#06b6d4" fontSize="11">Renders HTML</text>
                  <rect x="130" y="185" width="140" height="30" fill="none" stroke="#06b6d4" strokeWidth="1.5" rx="3"/>
                  <text x="200" y="205" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="bold">&lt;div&gt; ... &lt;/div&gt;</text>
                </>
              )}

              {/* React: Hooks & State */}
              {getAnimationType() === 'hooks-state' && (
                <>
                  <circle cx="200" cy="100" r="20" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
                  <text x="200" y="105" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">State</text>

                  <line x1="220" y1="100" x2="260" y2="100" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowgr)"/>
                  <circle cx="280" cy="100" r="12" fill="#34d399"/>

                  <line x1="200" y1="120" x2="200" y2="150" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowgr)"/>
                  <rect x="160" y="150" width="80" height="40" fill="none" stroke="#06b6d4" strokeWidth="2" rx="4"/>
                  <text x="200" y="175" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="bold">Re-render</text>

                  <defs>
                    <marker id="arrowgr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#34d399" />
                    </marker>
                  </defs>
                </>
              )}

              {/* React: Effects & Lifecycle */}
              {getAnimationType() === 'effect-lifecycle' && (
                <>
                  <circle cx="80" cy="80" r="15" fill="none" stroke="#f97316" strokeWidth="2"/>
                  <text x="80" y="85" textAnchor="middle" fill="#f97316" fontSize="10" fontWeight="bold">Mount</text>

                  <circle cx="200" cy="150" r="15" fill="none" stroke="#06b6d4" strokeWidth="2" className="pulse"/>
                  <text x="200" y="155" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="bold">Update</text>

                  <circle cx="320" cy="80" r="15" fill="none" stroke="#f87171" strokeWidth="2"/>
                  <text x="320" y="85" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Unmount</text>

                  <line x1="95" y1="80" x2="185" y2="150" stroke="#34d399" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="215" y1="150" x2="305" y2="80" stroke="#34d399" strokeWidth="1.5" opacity="0.7"/>
                </>
              )}

              {/* React: Context API */}
              {getAnimationType() === 'context-flow' && (
                <>
                  <circle cx="200" cy="80" r="30" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
                  <text x="200" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">Context</text>

                  <rect x="100" y="130" width="50" height="40" fill="none" stroke="#06b6d4" strokeWidth="2" rx="3"/>
                  <text x="125" y="155" textAnchor="middle" fill="#06b6d4" fontSize="9">Component</text>

                  <rect x="250" y="130" width="50" height="40" fill="none" stroke="#06b6d4" strokeWidth="2" rx="3"/>
                  <text x="275" y="155" textAnchor="middle" fill="#06b6d4" fontSize="9">Component</text>

                  <line x1="175" y1="110" x2="125" y2="130" stroke="#34d399" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="225" y1="110" x2="275" y2="130" stroke="#34d399" strokeWidth="1.5" opacity="0.7"/>
                </>
              )}

              {/* React: Performance Optimization */}
              {getAnimationType() === 'optimization' && (
                <>
                  <text x="80" y="100" fill="#f59e0b" fontSize="11" fontWeight="bold">With Memoization:</text>
                  <line x1="80" y1="120" x2="80" y2="170" stroke="#10b981" strokeWidth="3" className="pulse"/>
                  <text x="80" y="190" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">FAST ⚡</text>

                  <text x="320" y="100" fill="#f59e0b" fontSize="11" fontWeight="bold">Without:</text>
                  <line x1="320" y1="120" x2="320" y2="170" stroke="#f87171" strokeWidth="1" opacity="0.4"/>
                  <circle cx="320" cy="130" r="2" fill="#f87171" opacity="0.5"/>
                  <circle cx="320" cy="145" r="2" fill="#f87171" opacity="0.5"/>
                  <circle cx="320" cy="160" r="2" fill="#f87171" opacity="0.5"/>
                  <text x="320" y="190" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">SLOW 🐌</text>
                </>
              )}

              {/* Angular: Setup & Components */}
              {getAnimationType() === 'ng-structure' && (
                <>
                  <rect x="110" y="70" width="180" height="140" fill="none" stroke="#f97316" strokeWidth="2" rx="8"/>
                  <text x="120" y="90" fill="#f97316" fontSize="13" fontWeight="bold">AppModule</text>

                  <rect x="125" y="105" width="50" height="35" fill="none" stroke="#06b6d4" strokeWidth="1.5" rx="3"/>
                  <text x="130" y="122" fill="#06b6d4" fontSize="10">Component</text>

                  <rect x="190" y="105" width="50" height="35" fill="none" stroke="#06b6d4" strokeWidth="1.5" rx="3"/>
                  <text x="200" y="122" fill="#06b6d4" fontSize="10">Service</text>

                  <rect x="157" y="155" width="86" height="30" fill="none" stroke="#34d399" strokeWidth="1.5" rx="3"/>
                  <text x="162" y="173" fill="#34d399" fontSize="10">Module Config</text>
                </>
              )}

              {/* Angular: Templates & Binding */}
              {getAnimationType() === 'binding-flow' && (
                <>
                  <text x="200" y="90" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Template</text>
                  <rect x="150" y="100" width="100" height="40" fill="none" stroke="#f97316" strokeWidth="2" rx="4"/>

                  <line x1="200" y1="140" x2="200" y2="160" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowang1)"/>

                  <text x="130" y="180" fill="#06b6d4" fontSize="10">Data Binding</text>
                  <line x1="150" y1="190" x2="250" y2="190" stroke="#06b6d4" strokeWidth="1.5" opacity="0.6"/>
                  <circle cx="140" cy="190" r="4" fill="#06b6d4"/>
                  <circle cx="260" cy="190" r="4" fill="#06b6d4"/>

                  <defs>
                    <marker id="arrowang1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#34d399" />
                    </marker>
                  </defs>
                </>
              )}

              {/* Angular: Services & DI */}
              {getAnimationType() === 'dependency-inject' && (
                <>
                  <circle cx="200" cy="100" r="40" fill="none" stroke="#f97316" strokeWidth="2"/>
                  <text x="200" y="105" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Injector</text>

                  <rect x="80" y="160" width="50" height="40" fill="none" stroke="#06b6d4" strokeWidth="2" rx="3"/>
                  <text x="105" y="185" textAnchor="middle" fill="#06b6d4" fontSize="9">Component</text>

                  <rect x="270" y="160" width="50" height="40" fill="none" stroke="#06b6d4" strokeWidth="2" rx="3"/>
                  <text x="295" y="185" textAnchor="middle" fill="#06b6d4" fontSize="9">Service</text>

                  <line x1="175" y1="135" x2="110" y2="160" stroke="#34d399" strokeWidth="2" strokeDasharray="5,5" className="pulse"/>
                  <line x1="225" y1="135" x2="290" y2="160" stroke="#34d399" strokeWidth="2" strokeDasharray="5,5" className="pulse"/>
                </>
              )}

              {/* Angular: Routing */}
              {getAnimationType() === 'ng-routing' && (
                <>
                  <circle cx="200" cy="100" r="30" fill="none" stroke="#f97316" strokeWidth="2"/>
                  <text x="200" y="105" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Router</text>

                  <rect x="80" y="160" width="50" height="40" fill="none" stroke="#06b6d4" strokeWidth="2" rx="3"/>
                  <text x="105" y="180" textAnchor="middle" fill="#06b6d4" fontSize="9">/home</text>

                  <rect x="175" y="160" width="50" height="40" fill="none" stroke="#06b6d4" strokeWidth="2" rx="3"/>
                  <text x="200" y="180" textAnchor="middle" fill="#06b6d4" fontSize="9">/about</text>

                  <rect x="270" y="160" width="50" height="40" fill="none" stroke="#06b6d4" strokeWidth="2" rx="3"/>
                  <text x="295" y="180" textAnchor="middle" fill="#06b6d4" fontSize="9">/user/:id</text>

                  <line x1="175" y1="130" x2="105" y2="160" stroke="#34d399" strokeWidth="1.5" opacity="0.6"/>
                  <line x1="200" y1="130" x2="200" y2="160" stroke="#34d399" strokeWidth="1.5" opacity="0.6"/>
                  <line x1="225" y1="130" x2="295" y2="160" stroke="#34d399" strokeWidth="1.5" opacity="0.6"/>
                </>
              )}

              {/* Angular: RxJS & Observables */}
              {getAnimationType() === 'rxjs-flow' && (
                <>
                  <text x="200" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Observable Stream</text>
                  <line x1="50" y1="110" x2="350" y2="110" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5"/>

                  <circle cx="80" cy="110" r="8" fill="#34d399" className="pulse"/>
                  <circle cx="140" cy="110" r="8" fill="#34d399" className="pulse" style={{animationDelay: '0.3s'}}/>
                  <circle cx="200" cy="110" r="8" fill="#34d399" className="pulse" style={{animationDelay: '0.6s'}}/>
                  <circle cx="260" cy="110" r="8" fill="#34d399" className="pulse" style={{animationDelay: '0.9s'}}/>
                  <circle cx="320" cy="110" r="8" fill="#34d399" className="pulse" style={{animationDelay: '1.2s'}}/>

                  <text x="200" y="175" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Multiple Events Over Time</text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Learning Notes */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 mb-8 shadow-xl">
          <style>{`
            .note-content h1 {
              font-size: 1.75rem;
              font-weight: bold;
              margin: 1.5rem 0 1rem 0;
              background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              text-shadow: 0 2px 10px rgba(6, 182, 212, 0.3);
              filter: drop-shadow(0 2px 4px rgba(6, 182, 212, 0.2));
            }
            .note-content h2 {
              font-size: 1.3rem;
              font-weight: bold;
              margin: 1.2rem 0 0.8rem 0;
              background: linear-gradient(90deg, #10b981 0%, #06b6d4 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              filter: drop-shadow(0 2px 4px rgba(16, 185, 129, 0.2));
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .note-content h3 {
              font-size: 1.1rem;
              font-weight: 600;
              margin: 1rem 0 0.6rem 0;
              color: #fbbf24;
              text-shadow: 0 2px 4px rgba(251, 191, 36, 0.2);
            }
            .note-content strong {
              color: #f87171;
              font-weight: 600;
              text-shadow: 0 1px 2px rgba(248, 113, 113, 0.2);
            }
            .note-content code {
              background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1));
              color: #22d3ee;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: 'Courier New', monospace;
              font-size: 0.9em;
            }
            .note-content li {
              margin: 0.5rem 0 0.5rem 1.5rem;
              color: #cbd5e1;
            }
            .note-content p {
              margin: 0.8rem 0;
              color: #e2e8f0;
              line-height: 1.6;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
          `}</style>
          <h2 className="text-2xl font-bold text-white mb-6">📖 Detailed Notes</h2>
          <div className="note-content text-slate-300 leading-relaxed">
            {module.notes.split('\n').map((line: string, idx: number) => {
              if (line.startsWith('# ')) {
                return <h1 key={idx} className="text-cyan-300">{line.substring(2)}</h1>;
              }
              if (line.startsWith('## ')) {
                return <h2 key={idx}>{line.substring(3)}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={idx}>{line.substring(4)}</h3>;
              }
              if (line.startsWith('- ')) {
                return <li key={idx} className="text-slate-200">{line.substring(2)}</li>;
              }
              if (line.startsWith('`') && line.endsWith('`')) {
                return <div key={idx} className="my-2"><code>{line.substring(1, line.length - 1)}</code></div>;
              }
              if (line.trim() === '') {
                return <div key={idx} className="h-2"></div>;
              }
              return <p key={idx} className="text-slate-200">{line}</p>;
            })}
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="section-title mb-6">💻 Code Examples</h2>
          <div className="space-y-6">
            {module.examples && module.examples.map((example: any, idx: number) => (
              <div key={idx} className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-6 border border-slate-700 hover:border-cyan-500/50 transition shadow-lg">
                <h3 className="text-lg font-bold mb-3" style={{background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>{example.title}</h3>
                <div className="bg-slate-950 rounded p-4 mb-4 relative group">
                  <pre className="text-slate-300 text-sm overflow-x-auto">{example.code}</pre>
                  <button
                    onClick={() => handleCopy(example.code)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-slate-700 hover:bg-slate-600 p-2 rounded"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                  </button>
                </div>
                <div className="bg-slate-950 rounded p-4 text-slate-400 text-sm">
                  <p className="font-semibold text-slate-300 mb-2">Expected Output:</p>
                  <pre>{example.output}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interview FAQs */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="section-title mb-6">🎯 Top 10 Interview FAQs</h2>
          <div className="space-y-4">
            {module.faqs && module.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-500/50 transition shadow-md">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 p-4 flex justify-between items-center transition"
                >
                  <span className="text-left" style={{background: 'linear-gradient(90deg, #60a5fa 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 'bold', fontSize: '0.95rem'}}>{faq.q}</span>
                  {expandedFAQ === idx ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-cyan-400" />
                  )}
                </button>
                {expandedFAQ === idx && (
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 text-slate-200 border-t border-slate-700" style={{lineHeight: '1.8'}}>
                    <p style={{color: '#e2e8f0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Link href={`/fs-learning/${techId}`} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-semibold">
            ← Back to Modules
          </Link>
          <Link href={getNextModule()} className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white rounded-lg transition font-semibold">
            ✓ Mark as Complete & Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ModulePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading module...</div>
      </div>
    }>
      <ModuleContent />
    </Suspense>
  );
}
