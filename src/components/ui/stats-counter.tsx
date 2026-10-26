"use client";

// Adapted from Vengeance UI — Stats Counter (MIT).
// https://www.vengenceui.com · github.com/Ashutoshx7/VengeanceUI

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

// Renders the final value on the server so crawlers and link previews never
// see "0"; the count-up only runs in the browser once the number scrolls in.
export function StatsCounter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  // Count up only when the number starts below the fold, so nobody sees the
  // final value snap back to 0.
  const [counts, setCounts] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || el.getBoundingClientRect().top < window.innerHeight) return;
    const raf = requestAnimationFrame(() => {
      setCounts(true);
      setDisplay(0);
    });
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  useEffect(() => {
    if (!inView || !counts) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, counts, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
      {suffix}
    </span>
  );
}
