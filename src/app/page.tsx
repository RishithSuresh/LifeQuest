"use client";

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import DashboardPage from '@/app/(app)/page';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  // If still loading auth state, show loading UI
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
    // Render the dashboard when authenticated so the user sees the app
    return <DashboardPage />;
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
