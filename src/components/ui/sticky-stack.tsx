"use client";

// Adapted from Skiper UI — Skiper 16 StickyCard_001 (free tier, attribution
// required). Cards carry content instead of a single image.
// https://skiper-ui.com · Author: @gurvinder-singh02

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

function StickyCard({
  index,
  progress,
  range,
  targetScale,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div className="sticky top-0 flex h-[85vh] items-center justify-center md:h-screen">
      <motion.div
        style={{
          scale: reduce ? 1 : scale,
          top: `calc(-6vh + ${index * 28}px)`,
        }}
        className="relative w-full origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StickyStack({ cards }: { cards: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={ref} className="relative">
      {cards.map((card, i) => (
        <StickyCard
          key={i}
          index={i}
          progress={scrollYProgress}
          range={[i / cards.length, 1]}
          targetScale={Math.max(0.8, 1 - (cards.length - i - 1) * 0.05)}
        >
          {card}
        </StickyCard>
      ))}
    </div>
  );
}
