"use client";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { AnimatedScene } from "@/components/animated-scene";

const sidebarItems = [
  "Dashboard",
  "Tasks",
  "Planner",
  "Schedule",
  "Habits",
  "Focus Mode",
  "Character",
  "Achievements",
  "Analytics",
  "Inventory",
  "Settings",
];

const dashboardCards = [
  { title: "Today’s Tasks", value: "14", detail: "9 completed", tone: "from-[#65b2ff] to-[#8f7bff]" },
  { title: "Daily Progress", value: "78%", detail: "Ahead of yesterday", tone: "from-[#7dc4ff] to-[#0fd6ff]" },
  { title: "XP Progress", value: "2,420 / 3,000", detail: "+180 today", tone: "from-[#7f7fff] to-[#b877ff]" },
  { title: "Current Level", value: "27", detail: "Strategist Rank", tone: "from-[#ffb86c] to-[#ffa270]" },
  { title: "Active Goals", value: "5", detail: "2 near completion", tone: "from-[#7ad4ff] to-[#5c9eff]" },
  { title: "Habit Streaks", value: "31 days", detail: "Peak consistency", tone: "from-[#8b9fff] to-[#63c7ff]" },
  { title: "Focus Timer", value: "46:18", detail: "Deep session active", tone: "from-[#87d4ff] to-[#4fa4ff]" },
  { title: "Upcoming Schedule", value: "4 blocks", detail: "Next in 22 mins", tone: "from-[#8f7bff] to-[#7cb2ff]" },
  { title: "Quest Missions", value: "3 / 5", detail: "Rare loot possible", tone: "from-[#bf88ff] to-[#75a0ff]" },
  { title: "Heatmap", value: "S-Tier", detail: "7 day combo", tone: "from-[#ffcc78] to-[#9a7eff]" },
];

const quests = [
  "Complete 3 high-priority tasks (+220 XP)",
  "Finish a 50-minute focus sprint (+1 combo)",
  "Protect all habit streaks for the day (+rare token)",
];

export default function Home() {
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dashboardRef.current) return;

    const cards = dashboardRef.current.querySelectorAll("[data-card]");

    gsap.fromTo(
      cards,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.05,
      },
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06080f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(111,157,255,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(170,122,255,0.2),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(253,183,102,0.12),transparent_30%)]" />
      <div className="ambient-grid" />
      <div className="pointer-events-none absolute inset-0 noise-layer" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] gap-5 p-5 lg:p-8">
        <aside className="glass-panel hidden w-72 flex-col p-5 lg:flex">
          <h1 className="text-2xl font-semibold tracking-[0.22em] text-white/95">LIFEQUEST</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">Ascendant Protocol</p>
          <nav className="mt-8 space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.button
                key={item}
                whileHover={{ x: 4, scale: 1.02 }}
                className={`group flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition ${
                  index === 0
                    ? "border-[#77adff]/70 bg-[#75a8ff]/10 text-white shadow-[0_0_24px_rgba(103,163,255,0.35)]"
                    : "border-white/5 bg-white/[0.02] text-white/70 hover:border-white/20"
                }`}
              >
                <span className="text-sm">{item}</span>
                <span className="h-2 w-2 rounded-full bg-white/20 transition group-hover:bg-[#7ac0ff]" />
              </motion.button>
            ))}
          </nav>
        </aside>

        <section className="flex-1 space-y-5" ref={dashboardRef}>
          <div data-card className="glass-panel relative overflow-hidden p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Live Dashboard</p>
                <h2 className="mt-2 text-3xl font-semibold text-white/95">Your world reacts to your productivity</h2>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80">
                Consistency Score <span className="font-semibold text-[#82c8ff]">92</span>
              </div>
            </div>
            <div className="mt-5 h-3 rounded-full bg-white/8 p-[2px]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "81%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full bg-[linear-gradient(90deg,#6eb2ff,#9b7dff,#ffc174)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dashboardCards.map((card) => (
              <motion.article
                data-card
                whileHover={{ scale: 1.015, rotateX: 1.5, rotateY: -1.5 }}
                transition={{ type: "spring", stiffness: 150, damping: 16 }}
                key={card.title}
                className="glass-panel group p-4"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">{card.title}</p>
                <p className="mt-3 text-2xl font-semibold">{card.value}</p>
                <p className="mt-1 text-sm text-white/60">{card.detail}</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div className={`h-full w-4/5 bg-gradient-to-r ${card.tone}`} />
                </div>
              </motion.article>
            ))}
          </div>

          <div data-card className="glass-panel p-5">
            <h3 className="text-lg font-semibold">Daily Quest Missions</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {quests.map((quest) => (
                <li key={quest} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#89c4ff]" />
                  {quest}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="glass-panel hidden w-96 shrink-0 flex-col gap-4 p-5 xl:flex">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Character Evolution</p>
            <h3 className="mt-2 text-xl font-semibold">Astra // Elite Cyber Guardian</h3>
            <p className="mt-1 text-sm text-white/65">Mood: Energized • Gear Sync: 94% • Aura: Violet Flux</p>
            <div className="mt-4 h-72">
              <AnimatedScene />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-4 text-sm text-white/75">
            <p>Pet Companion: <span className="text-white">Nova Wisp</span></p>
            <p className="mt-2">Rank: <span className="text-[#8ec8ff]">Strategist</span> → <span className="text-[#f7bc7f]">Elite</span></p>
            <p className="mt-2">Combo Multiplier: <span className="text-white">x2.4</span></p>
          </div>
        </aside>
      </main>
    </div>
  );
}
