'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { useAuthStore, useCharacterStore } from '@/store';

export const CharacterCard: React.FC = () => {
  const { user } = useAuthStore();
  const { level, xp, getProgressToNextLevel, nextLevelXp } = useCharacterStore();

  return (
    <Card className="bg-gradient-to-br from-violet-900/40 to-slate-900 border-violet-500/30 text-center">
      <div className="mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/50">
          <span className="text-5xl">✨</span>
        </div>
        <h3 className="text-2xl font-bold text-white">{user?.username}</h3>
        <p className="text-violet-300 text-sm mt-1">Level {level}</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-400">Experience</span>
            <span className="text-sm font-bold text-violet-300">{xp} / {nextLevelXp}</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${getProgressToNextLevel()}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700">
          <div>
            <p className="text-slate-400 text-xs">Level</p>
            <p className="text-2xl font-bold text-violet-300">{level}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Streak</p>
            <p className="text-2xl font-bold text-cyan-300">{user?.streak_count || 0}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Tasks</p>
            <p className="text-2xl font-bold text-green-300">{user?.total_tasks_completed || 0}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
