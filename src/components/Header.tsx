"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CTA_ITEM, NAV_ITEMS, SOCIAL_LINKS } from "../content/site";
import { BrandLockup } from "./BrandLogo";
import { SpotlightNav } from "./ui/spotlight-nav";
import { TextRoll } from "./ui/text-roll";

const pill =
  "rounded-full border border-white/10 bg-[#0a0a0a]/75 text-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white";

export default function Header() {
  const pathname = usePathname();
  // The menu is open only for the route it was opened on, so it closes on
  // navigation. Link taps and history moves also clear it, so it never
  // reopens when the visitor comes Back to that route.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);
  const close = () => setOpenOn(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // Everything behind the menu is inert, so focus and screen readers stay
    // inside the toggle and the menu.
    const behind = [document.getElementById("main"), document.querySelector("footer")];
    behind.forEach((el) => el?.setAttribute("inert", ""));
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        toggleRef.current?.focus();
      }
    };
    const onPop = () => setOpenOn(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    return () => {
      document.body.style.overflow = overflow;
      behind.forEach((el) => el?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link
          href="/"
          aria-label="Vellox Studio — home"
          className={`pointer-events-auto relative z-[60] flex h-11 items-center px-4 ${pill}`}
        >
          <BrandLockup height={26} className="h-[26px] w-auto" />
        </Link>

        <SpotlightNav items={NAV_ITEMS} className="pointer-events-auto hidden lg:block" />

        <Link
          href={CTA_ITEM.href}
          className={`pointer-events-auto hidden h-11 items-center px-5 text-sm transition-colors hover:border-brand hover:bg-brand lg:inline-flex ${pill}`}
        >
          {CTA_ITEM.label} <span aria-hidden="true" className="ml-1.5">→</span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          className={`pointer-events-auto relative z-[60] inline-flex h-11 items-center gap-2 px-5 font-mono text-xs uppercase tracking-[0.2em] lg:hidden ${pill}`}
        >
          {open ? "Close" : "Menu"}
          <span
            aria-hidden="true"
            className={`inline-block transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            +
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto fixed inset-0 z-[55] flex flex-col overflow-y-auto overscroll-contain bg-[#0a0a0a] px-6 pb-10 pt-28 text-white lg:hidden"
          >
            <nav aria-label="Mobile" className="flex-1 pb-8">
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                      className="flex min-h-14 items-baseline gap-4 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      <span className="font-mono text-xs text-white/50">
                        [{i + 1}]
                      </span>
                      <TextRoll className="display whitespace-nowrap text-[clamp(2rem,11vw,3rem)] font-light uppercase tracking-[-0.02em]">
                        {item.label}
                      </TextRoll>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href={CTA_ITEM.href}
              onClick={close}
              className="mb-8 inline-flex h-14 items-center justify-center rounded-full bg-white text-sm uppercase tracking-[0.12em] text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {CTA_ITEM.label} <span aria-hidden="true" className="ml-1.5">→</span>
            </Link>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(social.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {social.label}
                    {social.href.startsWith("http") ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
