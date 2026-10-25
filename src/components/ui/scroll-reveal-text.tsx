"use client";

// Adapted from Skiper UI — Skiper 31 ScrollAnimation_002, CharacterV1
// (free tier, attribution required). Word-level instead of per-letter so
// long lines stay readable. https://skiper-ui.com · Author: @gurvinder-singh02

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

function Word({
  word,
  offset,
  progress,
}: {
  word: string;
  offset: number;
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 0.55], [offset * 40, 0]);
  const rotateX = useTransform(progress, [0, 0.55], [offset * 22, 0]);
  const opacity = useTransform(progress, [0, 0.45], [0.15, 1]);
  return (
    <motion.span className="inline-block" style={{ x, rotateX, opacity }}>
      {word}
      {" "}
    </motion.span>
  );
}

export function ScrollRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const words = text.split(" ");
  const center = (words.length - 1) / 2;

  return (
    <div ref={ref} style={{ perspective: "600px" }}>
      {reduce ? (
        <p className={className}>{text}</p>
      ) : (
        <p className={className}>
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {words.map((word, i) => (
              <Word
                key={i}
                word={word}
                offset={i - center}
                progress={scrollYProgress}
              />
            ))}
          </span>
        </p>
      )}
    </div>
  );
}
