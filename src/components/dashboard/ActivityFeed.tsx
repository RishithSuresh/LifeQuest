'use client';

import React from 'react';
import { Card } from '@/components/common/Card';

interface ActivityItem {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  icon: string;
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    action: 'Task Completed',
    description: 'Completed "Finish project proposal"',
    timestamp: '2 hours ago',
    icon: '✓',
  },
  {
    id: '2',
    action: 'Level Up!',
    description: 'Reached Level 5',
    timestamp: '5 hours ago',
    icon: '⬆️',
  },
  {
    id: '3',
    action: 'New Category',
    description: 'Created "Personal Growth" category',
    timestamp: '1 day ago',
    icon: '🏷️',
  },
];

export const ActivityFeed: React.FC = () => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>

      <div className="space-y-3">
        {MOCK_ACTIVITIES.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{item.action}</p>
              <p className="text-xs text-slate-400">{item.description}</p>
              <p className="text-xs text-slate-500 mt-1">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
