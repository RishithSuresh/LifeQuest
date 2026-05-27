"use client";

const navItems = ["Home", "Studio", "About", "Journal", "Reach Us"];
const HEADER_HEIGHT_PX = 104;
const HERO_TOP_ADJUSTMENT_PX = 75;
export default function Home() {

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-transparent text-foreground">

      <div className="relative z-10">
        <header className="px-8 py-6">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
            <div className="font-display text-3xl tracking-tight text-foreground">
              LifeQuest<sup className="ml-0.5 text-xs align-super">®</sup>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`text-sm transition-colors ${
                    item === "Home" ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <button className="rounded-full bg-foreground px-6 py-2.5 text-sm text-background transition-transform duration-200 hover:scale-[1.03]">
              Begin Journey
            </button>
          </div>
        </header>

        <main
          className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pb-40 text-center"
          style={{
            minHeight: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
            paddingTop: `calc(8rem - ${HERO_TOP_ADJUSTMENT_PX}px)`,
          }}
        >
          <h1 className="hero-headline-metrics animate-fade-rise font-display text-5xl font-normal hero-pop sm:text-7xl md:text-8xl">
            Level up <span className="italic hero-subtext-pop">your life,</span> one task at <span className="italic hero-subtext-pop">a time</span>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed hero-subtext-pop sm:text-lg">
            Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows.
          </p>

          <button className="animate-fade-rise-delay-2 mt-12 rounded-full bg-foreground px-14 py-5 text-base text-background transition-transform duration-200 hover:scale-[1.03]">
            Begin Journey
          </button>
        </main>
      </div>
    </div>
  );
}
