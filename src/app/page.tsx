'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">LifeQuest</h1>
          <p className="text-slate-400">Level up your productivity</p>
        </div>

        <p className="text-slate-300 mb-8">
          Gamified task management that makes productivity fun. Complete tasks, earn XP, and track your progress.
        </p>

        <div className="space-y-3">
          <Link href="/login" className="block">
            <Button variant="primary" className="w-full">
              Sign In
            </Button>
          </Link>
          <Link href="/register" className="block">
            <Button variant="secondary" className="w-full">
              Create Account
            </Button>
          </Link>
        </div>

        <p className="text-xs text-slate-500 mt-6">
          © 2024 LifeQuest. All rights reserved.
        </p>
      </Card>
    </div>
  );
}
