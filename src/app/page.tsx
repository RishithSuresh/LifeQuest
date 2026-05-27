"use client";

import { useState, type FormEvent } from "react";

const sidebarItems = [
  { label: "Dashboard", badge: "→" },
  { label: "Today", badge: "0" },
  { label: "Upcoming", badge: "→" },
  { label: "Categories", badge: "→" },
  { label: "Analytics", badge: "→" },
  { label: "Settings", badge: "→" },
] as const;
type TaskStatus = "In Progress" | "Pending" | "Review" | "Done";

type Task = {
  title: string;
  category: string;
  due: string;
  status: TaskStatus;
};

const defaultTasks: Task[] = [
  { title: "Design review for mobile onboarding", category: "Design", due: "10:30 AM", status: "In Progress" },
  { title: "Finalize Q2 growth experiment brief", category: "Strategy", due: "12:15 PM", status: "Pending" },
  { title: "Refactor task reminder microcopy", category: "Product", due: "3:00 PM", status: "Review" },
  { title: "Prepare sprint retro insights deck", category: "Team Ops", due: "5:30 PM", status: "Done" },
];

const priorityToStatus = {
  high: "In Progress",
  medium: "Pending",
  low: "Review",
} as const;

const statusClasses: Record<TaskStatus, string> = {
  "In Progress": "bg-cyan-400/20 text-cyan-200 border-cyan-300/30",
  Pending: "bg-amber-400/20 text-amber-200 border-amber-300/30",
  Review: "bg-violet-400/20 text-violet-200 border-violet-300/30",
  Done: "bg-emerald-400/20 text-emerald-200 border-emerald-300/30",
};

const formatCategoryName = (value: string) =>
  value
    .split("-")
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(" ");

export default function Home() {
  const [activeNavItem, setActiveNavItem] = useState("Dashboard");
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("product-design");
  const [selectedPriority, setSelectedPriority] = useState<keyof typeof priorityToStatus>("high");

  const completedTasksCount = tasks.filter((task) => task.status === "Done").length;
  const createdTasksCount = tasks.length - defaultTasks.length;

  const handleCreateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;

    setTasks((previous) => [
      {
        title: title.trim(),
        category: formatCategoryName(category),
        due: "Tomorrow",
        status: priorityToStatus[selectedPriority],
      },
      ...previous,
    ]);
    setTitle("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-5 sm:px-8 sm:py-8">
      <div className="pointer-events-none absolute -left-32 top-8 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-36 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="glass-panel relative z-10 mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl grid-cols-1 overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-white/10 bg-slate-950/80 p-6 lg:border-b-0 lg:border-r">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">LifeQuest</p>
              <h1 className="mt-2 text-2xl font-semibold text-white">Task Orbit</h1>
            </div>
            <span className="rounded-xl border border-white/15 bg-white/10 px-2 py-1 text-xs text-slate-100">Pro</span>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveNavItem(item.label)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                  item.label === activeNavItem
                    ? "border-cyan-300/40 bg-cyan-400/15 text-cyan-100"
                    : "border-transparent bg-white/5 text-slate-300 hover:border-white/10 hover:bg-white/10"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-slate-400">{item.label === "Today" ? tasks.length : item.badge}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 p-4">
            <p className="text-sm font-semibold text-violet-100">Weekly Goal</p>
            <p className="mt-2 text-xs leading-relaxed text-violet-100/80">Complete 18 priority tasks to unlock your focus streak reward.</p>
            <div className="mt-4 h-2 rounded-full bg-black/30">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-200 to-cyan-200" />
            </div>
          </div>
        </aside>

        <main className="space-y-6 bg-slate-950/50 p-6 sm:p-8">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-slate-300">Thursday, May 27</p>
              <h2 className="mt-1 text-3xl font-semibold text-white sm:text-4xl">Your Focus Dashboard</h2>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-300 to-violet-400" />
              <div>
                <p className="text-sm font-medium text-slate-100">Focus Pilot</p>
                <p className="text-xs text-slate-400">Level 12 Explorer</p>
              </div>
            </div>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Today&apos;s Tasks</p>
              <p className="mt-3 text-3xl font-semibold text-white">{tasks.length}</p>
              <p className="mt-1 text-xs text-emerald-300">
                {createdTasksCount >= 0 ? "+" : ""}
                {createdTasksCount} created today
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Completed</p>
              <p className="mt-3 text-3xl font-semibold text-white">67%</p>
              <p className="mt-1 text-xs text-cyan-300">{completedTasksCount} tasks done</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Streak</p>
              <p className="mt-3 text-3xl font-semibold text-white">19 days</p>
              <p className="mt-1 text-xs text-fuchsia-300">Personal best</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Focus Score</p>
              <p className="mt-3 text-3xl font-semibold text-white">92</p>
              <p className="mt-1 text-xs text-violet-300">Top 8% this week</p>
            </article>
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <section className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Today&apos;s Missions</h3>
                <button
                  className="rounded-lg border border-cyan-300/40 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100"
                  aria-label="Add new task to today's missions"
                >
                  + Add Task
                </button>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <article key={task.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{task.title}</p>
                        <p className="mt-1 text-xs text-slate-400">{task.category} • Due {task.due}</p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs ${statusClasses[task.status]}`}>
                        {task.status}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <article className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <h3 className="text-lg font-semibold text-white">Create Task</h3>
                <form className="mt-4 space-y-3 text-sm" onSubmit={handleCreateTask}>
                  <label className="block" htmlFor="task-title">
                    <span className="mb-1 block text-xs text-slate-400">Title</span>
                    <input
                      id="task-title"
                      type="text"
                      value={title}
                      placeholder="Ship onboarding prototype"
                      onChange={(event) => setTitle(event.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-300/50 focus:bg-white/10"
                    />
                  </label>
                  <label className="block" htmlFor="task-category">
                    <span className="mb-1 block text-xs text-slate-400">Category</span>
                    <select
                      id="task-category"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-300/50 focus:bg-white/10"
                    >
                      <option value="product-design">Product Design</option>
                      <option value="engineering">Engineering</option>
                      <option value="marketing">Marketing</option>
                      <option value="operations">Operations</option>
                    </select>
                  </label>
                  <label className="block" htmlFor="task-priority">
                    <span className="mb-1 block text-xs text-slate-400">Priority</span>
                    <select
                      id="task-priority"
                      value={selectedPriority}
                      onChange={(event) => setSelectedPriority(event.target.value as keyof typeof priorityToStatus)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-300/50 focus:bg-white/10"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </label>
                  <button
                    type="submit"
                    aria-label="Save new task"
                    className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2.5 font-medium text-slate-950"
                  >
                    Save Mission
                  </button>
                </form>
              </article>

              <article className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <h3 className="text-lg font-semibold text-white">Activity Feed</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">✅ Sprint review notes uploaded</li>
                  <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">⚡ 4 tasks completed before noon</li>
                  <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">🎯 New milestone unlocked: Deep Work</li>
                </ul>
              </article>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
