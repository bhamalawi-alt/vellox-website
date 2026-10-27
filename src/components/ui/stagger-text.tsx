// Adapted from Vengeance UI — Stagger Text (MIT).
// https://www.vengenceui.com · github.com/Ashutoshx7/VengeanceUI

import type { CSSProperties } from "react";

export type StaggerWord = { w: string; em?: boolean };

// The words are real text (one span each, space included), so crawlers and
// screen readers get the sentence once; an sr-only copy would make Google read
// the heading twice. The words mask-slide in with a CSS animation (globals.css,
// .stagger-word), so they show from first paint without waiting for hydration.
// onView ties the slide to the element entering the viewport where the browser
// supports scroll-driven animations; elsewhere it plays on load.
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
  return (
    <>
      <span className={onView ? "stagger stagger--view" : "stagger"}>
        {words.map((tok, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden pb-[0.08em] align-top"
          >
            <span
              className={`stagger-word ${tok.em ? emClassName : ""}`}
              style={{ "--stagger-delay": `${delay + i * 0.03}s` } as CSSProperties}
            >
              {tok.w}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
