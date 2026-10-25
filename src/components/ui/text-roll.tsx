"use client";

// Adapted from Skiper UI — Skiper 58 TextRoll (free tier, attribution required).
// https://skiper-ui.com · Author: @gurvinder-singh02

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const STAGGER = 0.03;

export function TextRoll({
  children,
  className,
  center = false,
}: {
  children: string;
  className?: string;
  center?: boolean;
}) {
  const letters = children.split("");
  const delay = (i: number) =>
    center ? STAGGER * Math.abs(i - (letters.length - 1) / 2) : STAGGER * i;

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      whileFocus="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{ lineHeight: 0.85 }}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="block">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ ease: "easeInOut", delay: delay(i) }}
            className="inline-block whitespace-pre"
          >
            {l}
          </motion.span>
        ))}
      </span>
      <span aria-hidden="true" className="absolute inset-0 block">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ ease: "easeInOut", delay: delay(i) }}
            className="inline-block whitespace-pre"
          >
            {l}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
