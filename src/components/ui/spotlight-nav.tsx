"use client";

// Adapted from Vengeance UI — Spotlight Navbar (MIT): Next.js links, active
// state from the current route, dark-glass colours only.
// https://www.vengenceui.com · github.com/Ashutoshx7/VengeanceUI

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate } from "framer-motion";
import { cn } from "../../lib/utils";

export type SpotlightNavItem = { label: string; href: string };

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SpotlightNav({
  items,
  className,
}: {
  items: SpotlightNavItem[];
  className?: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const activeIndex = items.findIndex((item) => isActive(pathname, item.href));
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const centerOf = (index: number) => {
      const el = nav.querySelector<HTMLElement>(`[data-index="${index}"]`);
      if (!el) return null;
      const navRect = nav.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      return rect.left - navRect.left + rect.width / 2;
    };
    const spring = { type: "spring" as const, stiffness: 200, damping: 20 };

    const target = centerOf(activeIndex);
    nav.style.setProperty("--ambience-opacity", target === null ? "0" : "1");
    const ambience =
      target === null
        ? undefined
        : animate(ambienceX.current, target, {
            ...spring,
            onUpdate: (v) => {
              ambienceX.current = v;
              nav.style.setProperty("--ambience-x", `${v}px`);
            },
          });

    const onMove = (e: PointerEvent) => {
      const x = e.clientX - nav.getBoundingClientRect().left;
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
      nav.style.setProperty("--spotlight-opacity", "1");
    };
    const onLeave = () => {
      nav.style.setProperty("--spotlight-opacity", "0");
      const back = centerOf(activeIndex);
      if (back === null) return;
      animate(spotlightX.current, back, {
        ...spring,
        onUpdate: (v) => {
          spotlightX.current = v;
          nav.style.setProperty("--spotlight-x", `${v}px`);
        },
      });
    };
    nav.addEventListener("pointermove", onMove);
    nav.addEventListener("pointerleave", onLeave);
    return () => {
      ambience?.stop();
      nav.removeEventListener("pointermove", onMove);
      nav.removeEventListener("pointerleave", onLeave);
    };
  }, [activeIndex]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={cn(
        "relative h-11 overflow-hidden rounded-full border border-white/10 bg-[#0a0a0a]/75 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md",
        className,
      )}
    >
      <ul className="relative z-10 flex h-full items-center px-1.5">
        {items.map((item, i) => (
          <li key={item.href} className="flex h-full items-center">
            <Link
              href={item.href}
              data-index={i}
              aria-current={i === activeIndex ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white",
                i === activeIndex ? "text-white" : "text-white/70 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background:
            "radial-gradient(120px circle at var(--spotlight-x, 0px) 100%, rgba(255,255,255,0.16) 0%, transparent 50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-[2] h-[2px] w-full"
        style={{
          opacity: "var(--ambience-opacity, 0)",
          background:
            "radial-gradient(60px circle at var(--ambience-x, 0px) 0%, rgba(255,255,255,1) 0%, transparent 100%)",
        }}
      />
    </nav>
  );
}
