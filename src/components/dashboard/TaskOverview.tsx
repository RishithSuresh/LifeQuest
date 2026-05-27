'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { useCharacterStore } from '@/store';

export const TaskOverview: React.FC = () => {
  const { level, xp, getProgressToNextLevel, nextLevelXp } = useCharacterStore();

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900">
      <h3 className="text-lg font-semibold text-white mb-6">Your Progress</h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Level {level}</span>
            <span className="text-sm font-semibold text-cyan-400">{Math.round(getProgressToNextLevel())}%</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-300"
              style={{ width: `${getProgressToNextLevel()}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-slate-700/50">
            <p className="text-xs text-slate-400 mb-1">Current XP</p>
            <p className="text-xl font-bold text-white">{xp}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-700/50">
            <p className="text-xs text-slate-400 mb-1">Next Level</p>
            <p className="text-xl font-bold text-white">{nextLevelXp}</p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
          <p className="text-sm text-violet-200">
            Complete tasks to earn XP and level up! Each completed task grants bonus experience.
          </p>
        </div>
      </div>
    </Card>
  );
};
