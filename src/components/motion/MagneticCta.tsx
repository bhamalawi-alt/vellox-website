"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function MagneticCta({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return undefined;
    }
    let rect = el.getBoundingClientRect();
    const refresh = () => {
      rect = el.getBoundingClientRect();
    };
    window.addEventListener("scroll", refresh, { passive: true });
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        if (dist < 120) {
          el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
        } else {
          el.style.transform = "";
        }
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame.current);
      el.style.transform = "";
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("scroll", refresh);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <span
      ref={ref}
      className="magnetic inline-flex transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </span>
  );
}
