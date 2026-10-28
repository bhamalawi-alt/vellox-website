"use client";

import { useState } from "react";
import "./MarqueeStrip.css";

// Looping practice-name strip. Motion that runs longer than five seconds needs
// a pause control (WCAG 2.2.2), so the strip carries its own toggle. It scrolls
// with the reading direction: [dir="rtl"] reverses the animation in globals.css.
export function Marquee({
  items,
  labels,
  className = "",
}: {
  items: string[];
  labels: { pause: string; play: string; aria: string };
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className="marquee" data-paused={paused || undefined}>
        <div className="marquee__track">
          {[0, 1].map((half) => (
            <ul key={half} className="marquee__group">
              {items.map((name) => (
                <li
                  key={name}
                  className="mx-8 font-mono text-xs uppercase tracking-[0.2em] text-white/60"
                >
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 end-0 w-40 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent rtl:bg-gradient-to-r"
      />
      <button
        type="button"
        onClick={() => setPaused(!paused)}
        aria-pressed={paused}
        className="absolute end-2 top-1/2 inline-flex h-8 -translate-y-1/2 items-center rounded-full border border-white/20 bg-[#0a0a0a] px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {paused ? labels.play : labels.pause}
        <span className="sr-only">{labels.aria}</span>
      </button>
    </div>
  );
}
