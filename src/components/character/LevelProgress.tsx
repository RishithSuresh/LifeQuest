'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { useCharacterStore } from '@/store';

export const LevelProgress: React.FC = () => {
  const { level, xp, getProgressToNextLevel, nextLevelXp, addXp } = useCharacterStore();

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">Leveling System</h3>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-3">
            <span className="text-sm font-medium text-slate-300">Level {level}</span>
            <span className="text-sm font-bold text-cyan-400">{Math.round(getProgressToNextLevel())}%</span>
          </div>
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${getProgressToNextLevel()}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {xp} / {nextLevelXp} XP
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-slate-700/50">
            <p className="text-xs text-slate-400 mb-1">Current XP</p>
            <p className="text-2xl font-bold text-cyan-300">{xp}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-700/50">
            <p className="text-xs text-slate-400 mb-1">To Next Level</p>
            <p className="text-2xl font-bold text-violet-300">{nextLevelXp - xp}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-400 mb-3">XP Tips:</p>
          <ul className="space-y-1 text-xs text-slate-300">
            <li>✓ Complete tasks to earn XP</li>
            <li>✓ Higher priority tasks give more XP</li>
            <li>✓ Maintain your streak for bonus XP</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
