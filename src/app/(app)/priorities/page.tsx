'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

const DEFAULT_PRIORITIES = [
  { id: '1', name: 'Low', level: 1, color: '#10b981', description: 'Can wait, low impact' },
  { id: '2', name: 'Medium', level: 2, color: '#f59e0b', description: 'Important but flexible' },
  { id: '3', name: 'High', level: 3, color: '#ef4444', description: 'Important and urgent' },
  { id: '4', name: 'Urgent', level: 4, color: '#7c3aed', description: 'Must do today' },
];

export default function PrioritiesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Priorities</h1>
        <p className="text-slate-400 mt-2">Manage task priorities to stay focused</p>
      </div>

      <div className="space-y-4">
        {DEFAULT_PRIORITIES.map((priority) => (
          <Card key={priority.id} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: priority.color }}
                />
                <h3 className="text-lg font-semibold text-white">{priority.name}</h3>
              </div>
              <p className="text-sm text-slate-400 ml-7">{priority.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <Badge>{priority.level === 1 ? 'Low' : priority.level === 2 ? 'Medium' : priority.level === 3 ? 'High' : 'Urgent'}</Badge>
              <button className="text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-700/50">
                Edit
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-800/50">
        <h3 className="text-sm font-semibold text-white mb-3">Priority Tips</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>✓ Use Urgent for tasks that must be done today</li>
          <li>✓ High priority tasks should be completed within 1-2 days</li>
          <li>✓ Medium priority tasks can be scheduled for later in the week</li>
          <li>✓ Low priority tasks are nice-to-haves</li>
        </ul>
      </Card>
    </div>
  );
}
