'use client';

import React from 'react';
import { CharacterCard } from '@/components/character/CharacterCard';
import { LevelProgress } from '@/components/character/LevelProgress';
import { Card } from '@/components/common/Card';

export default function CharacterPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Your Character</h1>
        <p className="text-slate-400 mt-2">Track your progress and achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CharacterCard />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <LevelProgress />

          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { emoji: '🎯', label: 'First Task' },
                { emoji: '🔥', label: '7-Day Streak' },
                { emoji: '⭐', label: 'Level 5' },
                { emoji: '💯', label: '100 Tasks' },
                { emoji: '🚀', label: 'Level 10' },
                { emoji: '👑', label: 'All Achievements' },
              ].map((achievement, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer text-center"
                >
                  <p className="text-3xl mb-2">{achievement.emoji}</p>
                  <p className="text-xs text-slate-400">{achievement.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
