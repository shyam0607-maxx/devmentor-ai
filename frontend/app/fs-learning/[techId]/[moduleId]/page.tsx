'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { MODULE_DATA_COMPLETE } from '@/app/fs-learning/modulesData';

function ModuleContent() {
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const router = require('next/navigation').useRouter();

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

  // Determine animation type based on tech/module
  const getAnimationType = () => {
    if (techId === '1') return 'database'; // MongoDB
    if (techId === '2') return 'server'; // Express
    if (techId === '3') return 'node'; // Node.js
    if (techId === '4') return 'react'; // React
    if (techId === '5') return 'angular'; // Angular
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

        {/* 3D Visualization - Topic Specific */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="section-title mb-6">🎨 Visual Concept</h2>
          <div className="w-full h-80 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <defs>
                <style>{`
                  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
                  @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                  @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
                  @keyframes flowData { 0% { offset-distance: 0%; } 100% { offset-distance: 100%; } }
                  .cube { animation: float 3s ease-in-out infinite; }
                  .circle { animation: rotate 4s linear infinite; }
                  .pulse { animation: pulse 2s ease-in-out infinite; }
                `}</style>
              </defs>

              {/* Database Animation (MongoDB - tech 1) */}
              {techId === '1' && (
                <>
                  {/* Database cylinder */}
                  <ellipse cx="200" cy="80" rx="60" ry="20" fill="none" stroke="#10b981" strokeWidth="2"/>
                  <line x1="140" y1="80" x2="140" y2="180" stroke="#10b981" strokeWidth="2"/>
                  <line x1="260" y1="80" x2="260" y2="180" stroke="#10b981" strokeWidth="2"/>
                  <ellipse cx="200" cy="180" rx="60" ry="20" fill="none" stroke="#10b981" strokeWidth="2"/>
                  <rect x="140" y="80" width="120" height="100" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.3"/>

                  {/* Data points */}
                  <circle cx="170" cy="110" r="4" fill="#34d399" className="pulse"/>
                  <circle cx="200" cy="130" r="4" fill="#34d399" className="pulse" style={{animationDelay: '0.3s'}}/>
                  <circle cx="230" cy="150" r="4" fill="#34d399" className="pulse" style={{animationDelay: '0.6s'}}/>

                  {/* Label */}
                  <text x="200" y="250" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">NoSQL Database</text>
                </>
              )}

              {/* Server Animation (Express - tech 2) */}
              {techId === '2' && (
                <>
                  {/* Server box */}
                  <rect x="120" y="80" width="160" height="120" fill="none" stroke="#f59e0b" strokeWidth="2" rx="8"/>
                  <line x1="130" y1="100" x2="270" y2="100" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
                  <line x1="130" y1="120" x2="270" y2="120" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
                  <line x1="130" y1="140" x2="270" y2="140" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>

                  {/* Incoming requests */}
                  <circle cx="80" cy="140" r="8" fill="#06b6d4" className="pulse"/>
                  <line x1="88" y1="140" x2="120" y2="140" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" opacity="0.7"/>

                  {/* Outgoing response */}
                  <line x1="280" y1="140" x2="320" y2="140" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" opacity="0.7"/>
                  <circle cx="328" cy="140" r="8" fill="#10b981" className="pulse"/>

                  <text x="200" y="250" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Request-Response Server</text>
                </>
              )}

              {/* Node.js Runtime (tech 3) */}
              {techId === '3' && (
                <>
                  {/* Event loop representation */}
                  <circle cx="200" cy="150" r="70" fill="none" stroke="#6ee7b7" strokeWidth="2" className="rotate"/>

                  {/* Event queue items */}
                  <circle cx="270" cy="150" r="12" fill="#6ee7b7" className="pulse"/>
                  <circle cx="265" cy="90" r="12" fill="#6ee7b7" className="pulse" style={{animationDelay: '0.4s'}}/>
                  <circle cx="200" cy="50" r="12" fill="#6ee7b7" className="pulse" style={{animationDelay: '0.8s'}}/>
                  <circle cx="130" cy="90" r="12" fill="#6ee7b7" className="pulse" style={{animationDelay: '1.2s'}}/>

                  {/* Center */}
                  <circle cx="200" cy="150" r="20" fill="none" stroke="#06b6d4" strokeWidth="2"/>
                  <text x="200" y="155" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="bold">Loop</text>

                  <text x="200" y="250" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Event Loop</text>
                </>
              )}

              {/* React Component (tech 4) */}
              {techId === '4' && (
                <>
                  {/* Parent component */}
                  <rect x="100" y="60" width="200" height="160" fill="none" stroke="#8b5cf6" strokeWidth="2" rx="4"/>
                  <text x="110" y="80" fill="#8b5cf6" fontSize="12" fontWeight="bold">Parent</text>

                  {/* Child components */}
                  <rect x="120" y="100" width="60" height="50" fill="none" stroke="#06b6d4" strokeWidth="2" rx="2"/>
                  <text x="130" y="120" fill="#06b6d4" fontSize="11">Child 1</text>

                  <rect x="220" y="100" width="60" height="50" fill="none" stroke="#06b6d4" strokeWidth="2" rx="2"/>
                  <text x="230" y="120" fill="#06b6d4" fontSize="11">Child 2</text>

                  {/* Props flow */}
                  <line x1="150" y1="100" x2="150" y2="85" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <line x1="250" y1="100" x2="250" y2="85" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowhead)"/>

                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#34d399" />
                    </marker>
                  </defs>

                  <text x="200" y="250" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Component Hierarchy</text>
                </>
              )}

              {/* Angular Modules (tech 5) */}
              {techId === '5' && (
                <>
                  {/* AppModule */}
                  <rect x="110" y="70" width="180" height="140" fill="none" stroke="#f97316" strokeWidth="2" rx="8"/>
                  <text x="120" y="90" fill="#f97316" fontSize="13" fontWeight="bold">AppModule</text>

                  {/* Child modules */}
                  <rect x="125" y="105" width="50" height="35" fill="none" stroke="#06b6d4" strokeWidth="1.5" rx="3"/>
                  <text x="130" y="122" fill="#06b6d4" fontSize="10">Component</text>

                  <rect x="190" y="105" width="50" height="35" fill="none" stroke="#06b6d4" strokeWidth="1.5" rx="3"/>
                  <text x="200" y="122" fill="#06b6d4" fontSize="10">Service</text>

                  <rect x="157" y="155" width="86" height="30" fill="none" stroke="#34d399" strokeWidth="1.5" rx="3"/>
                  <text x="162" y="173" fill="#34d399" fontSize="10">Providers & Declarations</text>

                  <text x="200" y="250" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Module Architecture</text>
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
