'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FSDRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the comprehensive learning platform
    router.replace('/fs-learning');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-white text-lg">Redirecting to Full Stack Development...</div>
    </div>
  );
}
