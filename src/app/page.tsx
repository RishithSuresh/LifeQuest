"use client";

import { useEffect, useRef } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

const navItems = ["Home", "Studio", "About", "Journal", "Reach Us"];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number | null = null;
    const fadeDuration = 0.5;
    const loopDelay = 100;
    let isResetting = false;

    const updateOpacity = () => {
      const { currentTime, duration } = video;

      if (duration > 0) {
        if (currentTime <= fadeDuration) {
          video.style.opacity = String(currentTime / fadeDuration);
        } else if (duration - currentTime <= fadeDuration) {
          video.style.opacity = String(Math.max((duration - currentTime) / fadeDuration, 0));
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

      window.setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
        isResetting = false;
      }, loopDelay);
    };

    video.style.opacity = "0";
    frameId = requestAnimationFrame(updateOpacity);
    video.addEventListener("ended", restartPlayback);
    void video.play().catch(() => undefined);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      video.removeEventListener("ended", restartPlayback);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <div className="absolute inset-auto top-[300px] right-0 bottom-0 left-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover transition-opacity duration-300"
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative z-10">
        <header className="px-8 py-6">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
            <div className="font-display text-3xl tracking-tight text-[#000000]">
              Aethera<sup className="ml-0.5 text-xs align-super">®</sup>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-sm transition-colors ${
                    item === "Home" ? "text-[#000000]" : "text-[#6F6F6F] hover:text-[#000000]"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <button className="rounded-full bg-[#000000] px-6 py-2.5 text-sm text-[#FFFFFF] transition-transform duration-200 hover:scale-[1.03]">
              Begin Journey
            </button>
          </div>
        </header>

        <main className="mx-auto flex min-h-[calc(100vh-104px)] max-w-7xl flex-col items-center justify-center px-6 pb-40 text-center pt-[calc(8rem-75px)]">
          <h1
            className="animate-fade-rise font-display text-5xl font-normal text-[#000000] sm:text-7xl md:text-8xl"
            style={{ lineHeight: 0.95, letterSpacing: "-2.46px", maxWidth: "80rem" }}
          >
            Beyond <span className="italic text-[#6F6F6F]">silence,</span> we build <span className="italic text-[#6F6F6F]">the eternal.</span>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg">
            Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows.
          </p>

          <button className="animate-fade-rise-delay-2 mt-12 rounded-full bg-[#000000] px-14 py-5 text-base text-[#FFFFFF] transition-transform duration-200 hover:scale-[1.03]">
            Begin Journey
          </button>
        </main>
      </div>
    </div>
  );
}
