'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { MODULE_DATA_COMPLETE } from '../modulesData.ts';

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

        <h1 className="text-5xl font-bold text-white mb-2">{module.title}</h1>
        <p className="text-xl text-slate-400 mb-8">{module.description}</p>

        {/* 3D Visualization */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">3D Visualization</h2>
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
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📖 Detailed Notes</h2>
          <div className="text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {module.notes}
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">💻 Code Examples</h2>
          <div className="space-y-6">
            {module.examples && module.examples.map((example: any, idx: number) => (
              <div key={idx} className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                <h3 className="text-cyan-400 font-bold mb-3">{example.title}</h3>
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
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎯 Top 10 Interview FAQs</h2>
          <div className="space-y-4">
            {module.faqs && module.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="border border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full bg-slate-700 hover:bg-slate-600 p-4 flex justify-between items-center transition"
                >
                  <span className="text-white font-semibold text-left">{faq.q}</span>
                  {expandedFAQ === idx ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-cyan-400" />
                  )}
                </button>
                {expandedFAQ === idx && (
                  <div className="bg-slate-800 p-4 text-slate-300">
                    {faq.a}
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
