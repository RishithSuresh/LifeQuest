'use client';

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/store';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Profile</h1>
        <p className="text-slate-400 mt-2">Manage your profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">{user?.username?.charAt(0).toUpperCase()}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{user?.username}</h2>
          <p className="text-slate-400 mb-4">Level {user?.level}</p>
          <Button variant="secondary" className="w-full">
            Change Avatar
          </Button>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Profile Information</h3>
              <Button
                variant="ghost"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" variant="primary" className="flex-1">
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400">Username</p>
                  <p className="text-white font-medium">{formData.username}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="text-white font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Bio</p>
                  <p className="text-white font-medium">{formData.bio || 'No bio set'}</p>
                </div>
              </div>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Tasks Completed</p>
                <p className="text-2xl font-bold text-cyan-400">{user?.total_tasks_completed}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Current Streak</p>
                <p className="text-2xl font-bold text-orange-400">{user?.streak_count}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
