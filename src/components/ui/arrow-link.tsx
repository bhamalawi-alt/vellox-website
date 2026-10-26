// Adapted from Skiper UI — Skiper 40 Link001 (free tier, attribution required).
// https://skiper-ui.com · Author: @gurvinder-singh02

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  const classes = cn(
    "group relative inline-flex min-h-11 items-center",
    "before:pointer-events-none before:absolute before:left-0 before:top-[calc(50%+0.7em)] before:h-px before:w-full before:bg-current before:content-['']",
    "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "hover:before:origin-left hover:before:scale-x-100 focus-visible:before:origin-left focus-visible:before:scale-x-100",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
    className,
  );
  const arrow = (
    <svg
      className="ml-[0.35em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
      fill="none"
      viewBox="0 0 10 10"
      aria-hidden="true"
    >
      <path
        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
