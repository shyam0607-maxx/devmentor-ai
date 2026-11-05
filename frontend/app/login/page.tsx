'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/api';
import { Brain } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
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
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to continue learning</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white font-semibold rounded-lg transition"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold">
            Create one
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300">
          <p className="font-semibold text-white mb-2">Demo Credentials:</p>
          <p>Email: demo@example.com</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  );
}
