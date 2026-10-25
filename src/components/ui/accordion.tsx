"use client";

// Adapted from Vengeance UI — FAQ Accordion (MIT).
// https://www.vengenceui.com · github.com/Ashutoshx7/VengeanceUI

import { useId, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";

export type AccordionItem = { id: string; label: string; title: string; body: ReactNode };

export function Accordion({
  items,
  defaultOpen = 0,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <ul className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li key={item.id} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "group relative flex min-h-16 w-full items-baseline gap-5 border-l-4 py-5 pl-5 pr-12 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ink md:gap-8 md:pl-8",
                  isOpen
                    ? "border-l-ink bg-white"
                    : "border-l-transparent hover:border-l-line hover:bg-white/60",
                )}
              >
                <span className="font-mono text-xs tabular-nums text-muted">{item.label}</span>
                <span className="display text-lg leading-snug md:text-2xl">{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute right-5 top-1/2 -translate-y-1/2 text-2xl font-light leading-none text-muted transition-transform duration-300",
                    isOpen && "rotate-45 text-ink",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid border-l-4 transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] border-l-ink bg-white" : "grid-rows-[0fr] border-l-transparent",
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="max-w-[68ch] pb-7 pl-5 pr-6 text-base leading-relaxed text-muted md:pl-[calc(2rem+3.25rem)]">
                  {item.body}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
