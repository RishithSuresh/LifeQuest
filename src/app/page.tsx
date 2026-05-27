const sidebarItems = ["Dashboard", "Today", "Upcoming", "Categories", "Analytics", "Settings"];
const focusTasks = [
  { title: "Design review for mobile onboarding", category: "Design", due: "10:30 AM", status: "In Progress" },
  { title: "Finalize Q2 growth experiment brief", category: "Strategy", due: "12:15 PM", status: "Pending" },
  { title: "Refactor task reminder microcopy", category: "Product", due: "3:00 PM", status: "Review" },
  { title: "Prepare sprint retro insights deck", category: "Team Ops", due: "5:30 PM", status: "Done" },
];

const statusClasses: Record<string, string> = {
  "In Progress": "bg-cyan-400/20 text-cyan-200 border-cyan-300/30",
  Pending: "bg-amber-400/20 text-amber-200 border-amber-300/30",
  Review: "bg-violet-400/20 text-violet-200 border-violet-300/30",
  Done: "bg-emerald-400/20 text-emerald-200 border-emerald-300/30",
};

export default function Home() {
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
                key={item}
                type="button"
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                  item === "Dashboard"
                    ? "border-cyan-300/40 bg-cyan-400/15 text-cyan-100"
                    : "border-transparent bg-white/5 text-slate-300 hover:border-white/10 hover:bg-white/10"
                }`}
              >
                <span>{item}</span>
                <span className="text-xs text-slate-400">{item === "Today" ? "8" : "→"}</span>
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
                <p className="text-sm font-medium text-slate-100">Rishith</p>
                <p className="text-xs text-slate-400">Level 12 Explorer</p>
              </div>
            </div>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Today&apos;s Tasks</p>
              <p className="mt-3 text-3xl font-semibold text-white">12</p>
              <p className="mt-1 text-xs text-emerald-300">+3 from yesterday</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Completed</p>
              <p className="mt-3 text-3xl font-semibold text-white">67%</p>
              <p className="mt-1 text-xs text-cyan-300">8 tasks done</p>
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
                <button className="rounded-lg border border-cyan-300/40 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100">
                  + Add Task
                </button>
              </div>
              <div className="space-y-3">
                {focusTasks.map((task) => (
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
                <div className="mt-4 space-y-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-300">Title: Ship onboarding prototype</div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-300">Category: Product Design</div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-300">Priority: High</div>
                  <button className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2.5 font-medium text-slate-950">
                    Save Mission
                  </button>
                </div>
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
