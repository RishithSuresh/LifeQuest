// Database types for Supabase
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
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
        };
        Insert: {
          id: string;
          username: string;
          email: string;
          avatar_url?: string;
          bio?: string;
          xp?: number;
          level?: number;
          streak_count?: number;
          total_tasks_completed?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          username?: string;
          email?: string;
          avatar_url?: string;
          bio?: string;
          xp?: number;
          level?: number;
          streak_count?: number;
          total_tasks_completed?: number;
          updated_at?: string;
        };
      };
      tasks: {
        Row: {
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string;
          status_id: string;
          priority_id: string;
          category_id?: string;
          due_date?: string;
          completed_at?: string;
          xp_reward?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          status_id?: string;
          priority_id?: string;
          category_id?: string;
          due_date?: string;
          completed_at?: string;
          xp_reward?: number;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          color: string;
          icon?: string;
          description?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          color: string;
          icon?: string;
          description?: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          color?: string;
          icon?: string;
          description?: string;
        };
      };
      priorities: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          level: number;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          level: number;
          color: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          level?: number;
          color?: string;
        };
      };
      statuses: {
        Row: {
          id: string;
          name: string;
          color: string;
          is_completed: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          color: string;
          is_completed: boolean;
        };
        Update: {
          name?: string;
          color?: string;
          is_completed?: boolean;
        };
      };
      task_tags: {
        Row: {
          id: string;
          user_id: string;
          task_id: string;
          tag: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          task_id: string;
          tag: string;
          created_at?: string;
        };
        Update: {
          tag?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string;
          icon_url?: string;
          earned_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description: string;
          icon_url?: string;
          earned_at?: string;
        };
        Update: {
          name?: string;
          description?: string;
          icon_url?: string;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          description: string;
          metadata?: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          description: string;
          metadata?: Record<string, unknown>;
          created_at?: string;
        };
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
