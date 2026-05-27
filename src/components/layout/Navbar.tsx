'use client';

import { useAuthStore } from '@/store';
import { Card } from '@/components/common/Card';

export const Navbar: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <nav className="bg-slate-950/50 border-b border-slate-800 backdrop-blur-sm sticky top-0 z-30">
      <div className="ml-0 lg:ml-64 px-4 py-4">
        <div className="flex items-center justify-between">
          <div />
          
          {user && (
            <div className="flex items-center gap-4">
              <Card variant="ghost" className="px-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">{user.username}</p>
                    <p className="text-xs text-slate-400">Level {user.level}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
