// Adapted from Vengeance UI — Image Reveal List (MIT).
// https://www.vengenceui.com · github.com/Ashutoshx7/VengeanceUI

import Link from "next/link";
import { cn } from "../../lib/utils";

export type ImageRevealItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  meta: string;
  image?: string;
  href: string;
};

export function ImageRevealList({
  items,
  className,
}: {
  items: ImageRevealItem[];
  className?: string;
}) {
  return (
    <ul className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <li key={item.id} className="relative border-b border-line">
          <Link
            href={item.href}
            className="group relative grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 gap-y-2 py-7 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ink md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:items-center md:py-9"
          >
            {/* The preview card floats to the right of the row on wide screens,
                on hover only, so it never covers text a keyboard user is reading. */}
            {item.image ? (
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                width={144}
                height={176}
                className="pointer-events-none absolute right-24 top-1/2 z-10 hidden h-44 w-36 -translate-y-1/2 rotate-3 scale-90 rounded-lg object-cover opacity-0 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 lg:block"
              />
            ) : null}
            <span className="font-mono text-xs tabular-nums text-muted">
              {item.number}
            </span>
            <span className="display text-2xl leading-tight transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">
              {item.title}
            </span>
            <span className="col-start-2 text-sm leading-relaxed text-muted md:col-start-3 md:max-w-[38ch]">
              {item.description}
            </span>
            <span className="col-start-3 row-start-1 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:col-start-4">
              <span className="hidden sm:inline">{item.meta}</span>
              <span
                aria-hidden="true"
                className="text-ink transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
