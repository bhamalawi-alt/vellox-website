"use client";
import { useEffect, useState } from "react";

/**
 * Silent looping video that fades in over the still hero artwork (HeroArt).
 * The still is the first paint; the video is only requested after the page
 * has loaded and the browser is idle, so the headline never waits on it.
 * Skipped for reduced motion and data-saver, where the still simply stays.
 * Files live in /public/art as <name>.webm and <name>.mp4.
 */
export function HeroLoop({ name, className = "" }: { name: string; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => setMounted(true));
      } else {
        timer = setTimeout(() => setMounted(true), 200);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  if (!mounted) return null;
  return (
    <video
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      disablePictureInPicture
      onPlaying={() => setPlaying(true)}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        playing ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <source src={`/art/${name}.webm`} type="video/webm" />
      <source src={`/art/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
