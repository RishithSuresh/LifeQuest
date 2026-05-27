'use client';

import React, { useState, useEffect } from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { TaskOverview } from '@/components/dashboard/TaskOverview';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickAddTask } from '@/components/dashboard/QuickAddTask';
import { Card } from '@/components/common/Card';
import { useAuthStore, useUserStore } from '@/store';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { stats } = useUserStore();

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {user.username}! 👋
        </h1>
        <p className="text-slate-400">
          Level {user.level} • {user.total_tasks_completed} tasks completed
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="✓"
          label="Total Tasks"
          value={user.total_tasks_completed}
          color="cyan"
        />
        <StatCard
          icon="🔥"
          label="Current Streak"
          value={user.streak_count}
          trend={user.streak_count > 0 ? 5 : 0}
          color="orange"
        />
        <StatCard
          icon="⭐"
          label="XP Points"
          value={user.xp}
          trend={12}
          color="violet"
        />
        <StatCard
          icon="📈"
          label="Current Level"
          value={user.level}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <QuickAddTask
            onAddTask={async (taskData) => {
              console.log('Add task:', taskData);
            }}
          />
          <TaskOverview />
        </div>

        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
