'use client';

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Modal } from '@/components/common/Modal';
import { useTaskStore } from '@/store';
import type { Task } from '@/types';

export default function TasksPage() {
  const { filteredTasks, addTask, updateTask, deleteTask } = useTaskStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (taskData: any) => {
    setIsLoading(true);
    try {
      const newTask: Task = {
        id: selectedTask?.id || Math.random().toString(36).substring(7),
        user_id: 'current-user',
        ...taskData,
        created_at: selectedTask?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status_id: 'todo',
      };

      if (selectedTask) {
        updateTask(newTask);
      } else {
        addTask(newTask);
      }

      setIsFormOpen(false);
      setSelectedTask(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const handleToggleComplete = (task: Task) => {
    updateTask({
      ...task,
      status_id: task.status_id === 'completed' ? 'todo' : 'completed',
      completed_at: task.status_id === 'completed' ? undefined : new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">My Tasks</h1>
          <p className="text-slate-400 mt-2">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedTask(null);
            setIsFormOpen(true);
          }}
        >
          + New Task
        </Button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedTask(null);
        }}
        title={selectedTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          initialData={
            selectedTask
              ? {
                  title: selectedTask.title,
                  description: selectedTask.description,
                  priority_id: selectedTask.priority_id,
                  xp_reward: selectedTask.xp_reward,
                  due_date: selectedTask.due_date,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
}
