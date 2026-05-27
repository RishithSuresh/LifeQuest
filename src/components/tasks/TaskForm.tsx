'use client';

import React from 'react';
import { useTaskStore } from '@/store';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';

interface TaskFormProps {
  onSubmit: (taskData: any) => Promise<void>;
  isLoading?: boolean;
  initialData?: any;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, isLoading = false, initialData }) => {
  const [formData, setFormData] = React.useState(initialData || {
    title: '',
    description: '',
    priority_id: 'medium',
    xp_reward: 10,
    due_date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        name="title"
        placeholder="What do you need to do?"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block text-sm font-medium text-white mb-2">Description</label>
        <textarea
          name="description"
          placeholder="Add details about this task..."
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Priority</label>
          <select
            name="priority_id"
            value={formData.priority_id}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">XP Reward</label>
          <input
            type="number"
            name="xp_reward"
            min="0"
            max="1000"
            value={formData.xp_reward}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200"
          />
        </div>
      </div>

      <Input
        label="Due Date"
        name="due_date"
        type="datetime-local"
        value={formData.due_date}
        onChange={handleChange}
      />

      <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
        {initialData ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
};
