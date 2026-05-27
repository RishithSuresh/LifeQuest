'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import type { Profile } from '@/types';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: number;
  color?: 'cyan' | 'violet' | 'green' | 'orange';
}

const colorMap = {
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',
  violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/30',
  green: 'from-green-500/20 to-green-500/5 border-green-500/30',
  orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/30',
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  trend,
  color = 'cyan',
}) => {
  return (
    <Card className={`bg-gradient-to-br ${colorMap[color]} border`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs mt-2 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </Card>
  );
};
