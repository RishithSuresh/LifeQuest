'use client';

import React from 'react';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import type { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const isCompleted = task.status_id === 'completed';

  return (
    <Card className="hover:border-cyan-500/50 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggleComplete(task)}
              className="w-5 h-5 rounded cursor-pointer accent-cyan-500"
            />
            <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
              {task.title}
            </h3>
          </div>
          
          {task.description && (
            <p className="text-sm text-slate-400 mb-3 ml-8">{task.description}</p>
          )}

          <div className="flex flex-wrap gap-2 ml-8">
            {task.priority_id && (
              <Badge variant="warning" size="sm">
                Priority
              </Badge>
            )}
            {task.xp_reward > 0 && (
              <Badge variant="info" size="sm">
                +{task.xp_reward} XP
              </Badge>
            )}
            {task.due_date && (
              <Badge size="sm">
                Due: {new Date(task.due_date).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </Card>
  );
};
