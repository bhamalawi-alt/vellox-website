"use client";

// Adapted from Skiper UI — Skiper 30 parallax columns (free tier, attribution
// required). Lenis removed; columns drop to two on small screens.
// https://skiper-ui.com · Author: @gurvinder-singh02

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type GalleryImage = { src: string; alt: string };

const COLUMN_OFFSETS = ["-top-[20%]", "-top-[55%]", "-top-[25%]", "-top-[45%]"];

function Column({
  images,
  y,
  offset,
  className = "",
}: {
  images: GalleryImage[];
  y: MotionValue<number> | number;
  offset: string;
  className?: string;
}) {
  return (
    <motion.div
      style={{ y }}
      className={`relative flex h-full w-1/2 min-w-0 flex-col gap-[2vw] md:w-1/4 ${offset} ${className}`}
    >
      {images.map((image) => (
        <div
          key={image.src}
          className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-white/5"
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
}

export function ParallaxGallery({ images }: { images: GalleryImage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 760]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 620]);
  const ys = reduce ? [0, 0, 0, 0] : [y1, y2, y3, y4];

  const columns = [0, 1, 2, 3].map((c) =>
    [0, 1, 2].map((r) => images[(c * 3 + r) % images.length]),
  );

  return (
    <div
      ref={ref}
      className="relative box-border flex h-[120vh] gap-[2vw] overflow-hidden p-[2vw] md:h-[160vh]"
    >
      {columns.map((column, i) => (
        <Column
          key={i}
          images={column}
          y={ys[i]}
          offset={COLUMN_OFFSETS[i]}
          className={i > 1 ? "hidden md:flex" : ""}
        />
      ))}
    </div>
  );
}
