import { create } from 'zustand';
import type { Profile, Task, Category, Priority } from '@/types';

// Auth Store
interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: Profile | null) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

// Task Store
interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  selectedTask: Task | null;
  filterStatus: string | null;
  filterPriority: string | null;
  filterCategory: string | null;
  sortBy: 'dueDate' | 'priority' | 'created';
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  setSelectedTask: (task: Task | null) => void;
  setFilterStatus: (status: string | null) => void;
  setFilterPriority: (priority: string | null) => void;
  setFilterCategory: (category: string | null) => void;
  setSortBy: (sort: 'dueDate' | 'priority' | 'created') => void;
  applyFilters: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filteredTasks: [],
  selectedTask: null,
  filterStatus: null,
  filterPriority: null,
  filterCategory: null,
  sortBy: 'dueDate',
  setTasks: (tasks) => {
    set({ tasks });
    get().applyFilters();
  },
  addTask: (task) => {
    set((state) => {
      const newTasks = [...state.tasks, task];
      return { tasks: newTasks };
    });
    get().applyFilters();
  },
  updateTask: (task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    }));
    get().applyFilters();
  },
  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    }));
    get().applyFilters();
  },
  setSelectedTask: (task) => set({ selectedTask: task }),
  setFilterStatus: (status) => {
    set({ filterStatus: status });
    get().applyFilters();
  },
  setFilterPriority: (priority) => {
    set({ filterPriority: priority });
    get().applyFilters();
  },
  setFilterCategory: (category) => {
    set({ filterCategory: category });
    get().applyFilters();
  },
  setSortBy: (sort) => {
    set({ sortBy: sort });
    get().applyFilters();
  },
  applyFilters: () => {
    const state = get();
    let filtered = [...state.tasks];

    if (state.filterStatus) {
      filtered = filtered.filter((t) => t.status_id === state.filterStatus);
    }
    if (state.filterPriority) {
      filtered = filtered.filter((t) => t.priority_id === state.filterPriority);
    }
    if (state.filterCategory) {
      filtered = filtered.filter((t) => t.category_id === state.filterCategory);
    }

    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case 'dueDate':
          return new Date(a.due_date || 0).getTime() - new Date(b.due_date || 0).getTime();
        case 'priority':
          return (b.priority_id?.localeCompare(a.priority_id) || 0);
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    set({ filteredTasks: filtered });
  },
}));

// User Store
interface UserState {
  profile: Profile | null;
  stats: {
    totalTasks: number;
    completedTasks: number;
    currentStreak: number;
  };
  setProfile: (profile: Profile | null) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  setStats: (stats: UserState['stats']) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  stats: {
    totalTasks: 0,
    completedTasks: 0,
    currentStreak: 0,
  },
  setProfile: (profile) => set({ profile }),
  updateProfile: (updates) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    })),
  setStats: (stats) => set({ stats }),
}));

// UI Store
interface UIState {
  isSidebarOpen: boolean;
  activeView: string;
  isTaskModalOpen: boolean;
  isSettingsModalOpen: boolean;
  toggleSidebar: () => void;
  setActiveView: (view: string) => void;
  setIsTaskModalOpen: (open: boolean) => void;
  setIsSettingsModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  activeView: 'dashboard',
  isTaskModalOpen: false,
  isSettingsModalOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActiveView: (view) => set({ activeView: view }),
  setIsTaskModalOpen: (open) => set({ isTaskModalOpen: open }),
  setIsSettingsModalOpen: (open) => set({ isSettingsModalOpen: open }),
}));

// Character Store
interface CharacterState {
  xp: number;
  level: number;
  nextLevelXp: number;
  addXp: (amount: number) => void;
  setLevel: (level: number) => void;
  getXpForLevel: (level: number) => number;
  getProgressToNextLevel: () => number;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  xp: 0,
  level: 1,
  nextLevelXp: 100,
  addXp: (amount) => {
    set((state) => {
      let newXp = state.xp + amount;
      let newLevel = state.level;
      let nextLevelXp = get().getXpForLevel(newLevel + 1);

      while (newXp >= nextLevelXp && newLevel < 100) {
        newXp -= nextLevelXp;
        newLevel += 1;
        nextLevelXp = get().getXpForLevel(newLevel + 1);
      }

      return { xp: newXp, level: newLevel, nextLevelXp };
    });
  },
  setLevel: (level) => set({ level }),
  getXpForLevel: (level) => {
    return Math.floor(100 * Math.pow(1.1, level - 1));
  },
  getProgressToNextLevel: () => {
    const state = get();
    return (state.xp / state.nextLevelXp) * 100;
  },
}));
