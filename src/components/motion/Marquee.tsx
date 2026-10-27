"use client";

import { useState } from "react";
import "./MarqueeStrip.css";

// Looping practice-name strip. Motion that runs longer than five seconds needs
// a pause control (WCAG 2.2.2), so the strip carries its own toggle.
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
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
        className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"
      />
      <button
        type="button"
        onClick={() => setPaused(!paused)}
        aria-pressed={paused}
        className="absolute right-2 top-1/2 inline-flex h-8 -translate-y-1/2 items-center rounded-full border border-white/20 bg-[#0a0a0a] px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {paused ? "Play" : "Pause"}
        <span className="sr-only"> scrolling practice names</span>
      </button>
    </div>
  );
}
