// Core database types for LifeQuest
export interface Profile {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  xp: number;
  level: number;
  streak_count: number;
  total_tasks_completed: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon?: string;
  description?: string;
  created_at: string;
}

export interface Priority {
  id: string;
  user_id: string;
  name: string;
  level: number;
  color: string;
  created_at: string;
}

export interface Status {
  id: string;
  name: string;
  color: string;
  is_completed: boolean;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status_id: string;
  priority_id: string;
  category_id?: string;
  due_date?: string;
  completed_at?: string;
  xp_reward: number;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface TaskTag {
  id: string;
  user_id: string;
  task_id: string;
  tag: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  name: string;
  description: string;
  icon_url?: string;
  earned_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  description: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// Response types
export interface AuthResponse {
  user?: Profile;
  session?: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
  error?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
