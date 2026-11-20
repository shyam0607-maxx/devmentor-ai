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

  const techId = (params?.techId as string) || '';
  const moduleId = (params?.moduleId as string) || '';

  let module = MODULE_DATA_COMPLETE[techId]?.[moduleId];

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

        {/* 3D Visualization */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="section-title mb-6">🎨 3D Visualization</h2>
          <div className="w-full h-80 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <defs>
                <style>{`
                  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
                  @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                  .cube { animation: float 3s ease-in-out infinite; }
                  .circle { animation: rotate 4s linear infinite; }
                `}</style>
              </defs>
              {/* Animated cube */}
              <g className="cube">
                <rect x="140" y="80" width="120" height="120" fill="none" stroke="#06b6d4" strokeWidth="2"/>
                <line x1="140" y1="80" x2="170" y2="50" stroke="#06b6d4" strokeWidth="2"/>
                <line x1="260" y1="80" x2="290" y2="50" stroke="#06b6d4" strokeWidth="2"/>
                <line x1="260" y1="200" x2="290" y2="230" stroke="#06b6d4" strokeWidth="2"/>
                <line x1="140" y1="200" x2="170" y2="230" stroke="#06b6d4" strokeWidth="2"/>
                <rect x="170" y="50" width="120" height="120" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.7"/>
              </g>
              {/* Rotating circles */}
              <g className="circle" opacity="0.6">
                <circle cx="200" cy="150" r="80" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
                <circle cx="200" cy="150" r="60" fill="none" stroke="#06b6d4" strokeWidth="2"/>
              </g>
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
          <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition font-semibold">
            ✓ Mark as Complete
          </button>
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
