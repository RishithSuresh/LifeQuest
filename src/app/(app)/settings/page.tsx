'use client';

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const { signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    achievementNotifications: true,
    dailyDigest: false,
  });

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-2">Manage your preferences and account</p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/30 transition-colors">
            <div>
              <p className="font-medium text-white">Dark Mode</p>
              <p className="text-sm text-slate-400">Currently enabled</p>
            </div>
            <label className="relative inline-block w-12 h-6 bg-slate-700 rounded-full cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                className="sr-only"
              />
              <span
                className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${
                  isDarkMode ? 'bg-cyan-500 translate-x-6' : 'bg-slate-400'
                }`}
              />
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/30 transition-colors">
              <div>
                <p className="font-medium text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
              <label className="relative inline-block w-12 h-6 bg-slate-700 rounded-full cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setNotifications({ ...notifications, [key]: e.target.checked })
                  }
                  className="sr-only"
                />
                <span
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${
                    value ? 'bg-cyan-500 translate-x-6' : 'bg-slate-400'
                  }`}
                />
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
        <div className="space-y-3">
          <Button variant="secondary" className="w-full">
            Change Password
          </Button>
          <Button variant="danger" className="w-full" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </Card>

      <Card className="bg-red-900/20 border border-red-500/30">
        <h3 className="text-lg font-semibold text-red-300 mb-4">Danger Zone</h3>
        <p className="text-sm text-slate-300 mb-4">
          Deleting your account is permanent and cannot be undone. All your data will be deleted.
        </p>
        <Button variant="danger" className="w-full">
          Delete Account
        </Button>
      </Card>
    </div>
  );
}
