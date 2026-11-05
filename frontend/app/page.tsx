'use client';

import Link from 'next/link';
import { ArrowRight, Code2, GitBranch, Brain, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">DevMentor AI</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-slate-300 hover:text-white transition">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Learn. Visualize. Practice.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Master DSA & Full-Stack
          </span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Your AI-powered personal tutor for Data Structures, Algorithms and Full-Stack Development.
          Learn through interactive visualizations and AI-driven mock interviews.
        </p>
        <div className="flex gap-4 justify-center mb-16">
          <Link
            href="/signup"
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold flex items-center gap-2 transition"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="px-8 py-3 border border-slate-500 text-white rounded-lg hover:bg-slate-800 transition">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Choose Your Learning Path</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* DSA Card */}
          <Link href="/signup?path=dsa" className="group">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 rounded-lg p-8 hover:border-cyan-400 transition cursor-pointer hover:shadow-lg hover:shadow-cyan-400/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-cyan-400/20 rounded-lg">
                  <GitBranch className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Data Structures & Algorithms</h3>
              </div>
              <p className="text-slate-300 mb-6">
                Master DSA through interactive animations, algorithm visualizations, and coding exercises. 11 comprehensive modules.
              </p>
              <ul className="text-slate-400 space-y-2 text-sm mb-6">
                <li>✓ Interactive visualizations for 60+ topics</li>
                <li>✓ Multi-language code examples (Java, C++, Python)</li>
                <li>✓ Topic-wise mock interviews</li>
                <li>✓ Real-time complexity analysis</li>
              </ul>
              <button className="text-cyan-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition">
                Explore DSA <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Link>

          {/* Full-Stack Card */}
          <div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 rounded-lg p-8 hover:border-blue-400 transition hover:shadow-lg hover:shadow-blue-400/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-400/20 rounded-lg">
                  <Code2 className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Full-Stack Development</h3>
              </div>
              <p className="text-slate-300 mb-6">
                Learn modern full-stack development with MERN and MEAN stacks. Hands-on projects and real-world architecture.
              </p>
              <ul className="text-slate-400 space-y-2 text-sm mb-6">
                <li>✓ MERN Stack (MongoDB, Express, React, Node.js)</li>
                <li>✓ MEAN Stack (MongoDB, Express, Angular, Node.js)</li>
                <li>✓ Architecture visualizations</li>
                <li>✓ Real-world project walkthroughs</li>
              </ul>
              <span className="text-slate-500 font-semibold flex items-center gap-2">
                Coming Soon <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Learn with DevMentor AI?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Brain className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">AI-Powered Tutoring</h3>
            <p className="text-slate-400">Get personalized explanations and context-aware help from our Claude AI tutor.</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <BarChart3 className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Progress Tracking</h3>
            <p className="text-slate-400">Track your learning journey with detailed analytics and performance insights.</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Code2 className="w-10 h-10 text-violet-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Interactive Coding</h3>
            <p className="text-slate-400">Write and execute code directly in your browser with instant feedback.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Master DSA and Full-Stack?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students learning effectively with DevMentor AI. Start your free journey today.
          </p>
          <Link
            href="/signup"
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold inline-flex items-center gap-2 transition"
          >
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-slate-400">
          <p>&copy; 2024 DevMentor AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
