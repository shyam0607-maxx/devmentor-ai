'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signup } from '@/lib/api';
import { Brain } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [learningPath, setLearningPath] = useState('dsa');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const result = await signup(formData.name, formData.email, formData.password, learningPath);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <Brain className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">DevMentor AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Start learning with AI-powered tutoring</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Learning Path</label>
            <select
              value={learningPath}
              onChange={(e) => setLearningPath(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition"
            >
              <option value="dsa">Data Structures & Algorithms</option>
              <option value="mern">MERN Stack</option>
              <option value="mean">MEAN Stack</option>
              <option value="both">Both DSA & Full-Stack</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white font-semibold rounded-lg transition"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-slate-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
