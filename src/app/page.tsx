"use client";

import { useEffect, useRef } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260422_191657_800d4e1f-7ab3-41af-90b6-9bd3039eb294.mp4";

const navItems = ["Home", "Studio", "About", "Journal", "Reach Us"];
const VIDEO_TOP_OFFSET_PX = 300;
const HEADER_HEIGHT_PX = 104;
const HERO_TOP_ADJUSTMENT_PX = 75;
const FADE_DURATION_SECONDS = 0.5;
const LOOP_DELAY_MS = 100;

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number | null = null;
    let resetTimeout: number | null = null;
    let isResetting = false;

    const updateOpacity = () => {
      const { currentTime, duration } = video;

      if (duration > 0) {
        if (currentTime <= FADE_DURATION_SECONDS) {
          video.style.opacity = String(currentTime / FADE_DURATION_SECONDS);
        } else if (duration - currentTime <= FADE_DURATION_SECONDS) {
          video.style.opacity = String(Math.max((duration - currentTime) / FADE_DURATION_SECONDS, 0));
        } else {
          video.style.opacity = "1";
        }
      }

      frameId = requestAnimationFrame(updateOpacity);
    };

    const restartPlayback = () => {
      if (isResetting) return;
      isResetting = true;
      video.style.opacity = "0";

      resetTimeout = window.setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
        isResetting = false;
      }, LOOP_DELAY_MS);
    };

    video.style.opacity = "0";
    frameId = requestAnimationFrame(updateOpacity);
    video.addEventListener("ended", restartPlayback);
    void video.play().catch(() => undefined);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (resetTimeout !== null) window.clearTimeout(resetTimeout);
      video.removeEventListener("ended", restartPlayback);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-transparent text-foreground">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-opacity duration-300"
          src={VIDEO_URL}
          aria-hidden="true"
          muted
          playsInline
          preload="auto"
        />
      </div>

      <div className="relative z-10">
        <header className="px-8 py-6">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
            <div className="font-display text-3xl tracking-tight text-foreground">
              Aethera<sup className="ml-0.5 text-xs align-super">®</sup>
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
          <h1 className="hero-headline-metrics animate-fade-rise font-display text-5xl font-normal text-foreground sm:text-7xl md:text-8xl">
            Beyond <span className="italic text-muted">silence,</span> we build <span className="italic text-muted">the eternal.</span>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
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
