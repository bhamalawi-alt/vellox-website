"use client";

// Adapted from Vengeance UI — Stagger Text (MIT).
// https://www.vengenceui.com · github.com/Ashutoshx7/VengeanceUI

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export type StaggerWord = { w: string; em?: boolean };

// The sr-only copy keeps the full sentence in the HTML for crawlers and screen
// readers; the visible words mask-slide in after hydration in about a second.
export function StaggerText({
  words,
  emClassName = "",
  delay = 0.05,
  onView = false,
}: {
  words: StaggerWord[];
  emClassName?: string;
  delay?: number;
  onView?: boolean;
}) {
  const trigger = onView
    ? { whileInView: "show" as const, viewport: { once: true } }
    : { animate: "show" as const };

  return (
    <>
      <span className="sr-only">{words.map((t) => t.w).join(" ")}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        {...trigger}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.03, delayChildren: delay } },
        }}
      >
        {words.map((tok, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden pb-[0.08em] align-top"
          >
            <motion.span
              className={`inline-block will-change-transform ${tok.em ? emClassName : ""}`}
              variants={{
                hidden: { y: "105%" },
                show: { y: "0%", transition: { duration: 0.55, ease: EASE } },
              }}
            >
              {tok.w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </>
  );
}
