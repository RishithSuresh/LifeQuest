'use client';

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import type { TaskFormData } from '@/types';

interface QuickAddTaskProps {
  onAddTask: (taskData: TaskFormData) => Promise<void>;
}

export const QuickAddTask: React.FC<QuickAddTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await onAddTask({
        title,
        description: '',
        priority_id: 'medium',
        xp_reward: 10,
        due_date: '',
      });
      setTitle('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/30">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Add Task</h3>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="primary" isLoading={isLoading}>
          Add
        </Button>
      </form>
    </Card>
  );
};
