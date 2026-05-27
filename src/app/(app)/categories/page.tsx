'use client';

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Modal } from '@/components/common/Modal';

const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Work', color: '#3b82f6', icon: '💼' },
  { id: '2', name: 'Personal', color: '#8b5cf6', icon: '👤' },
  { id: '3', name: 'Health', color: '#10b981', icon: '💪' },
  { id: '4', name: 'Learning', color: '#f59e0b', icon: '📚' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', color: '#3b82f6' });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      setCategories([
        ...categories,
        {
          id: Math.random().toString(36).substring(7),
          name: formData.name,
          color: formData.color,
          icon: '🏷️',
        },
      ]);
      setFormData({ name: '', color: '#3b82f6' });
      setIsFormOpen(false);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Delete this category?')) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Categories</h1>
          <p className="text-slate-400 mt-2">Organize your tasks with categories</p>
        </div>
        <Button variant="primary" onClick={() => setIsFormOpen(true)}>
          + New Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: category.color + '20', borderColor: category.color, borderWidth: 2 }}
              >
                <span className="text-lg">{category.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-white">{category.name}</p>
                <p className="text-xs text-slate-400">0 tasks</p>
              </div>
            </div>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="text-red-400 hover:text-red-300 transition-colors text-sm"
            >
              Delete
            </button>
          </Card>
        ))}
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Create Category">
        <form onSubmit={handleAddCategory} className="space-y-4">
          <Input
            label="Category Name"
            placeholder="e.g., Work, Personal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-white mb-2">Color</label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
}
