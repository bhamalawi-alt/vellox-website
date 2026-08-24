import Link from "next/link";
import { CTA_ITEM, NAV_ITEMS, WORDMARK } from "../content/site";

const linkBase =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className={`display text-2xl font-medium tracking-tight text-ink ${linkBase}`}
        >
          {WORDMARK}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm text-muted transition-colors hover:text-ink ${linkBase}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={CTA_ITEM.href}
            className={`rounded-full border border-ink px-5 py-2 text-sm text-ink transition-colors hover:bg-ink hover:text-bg ${linkBase}`}
          >
            {CTA_ITEM.label}
          </Link>
        </nav>

        <details className="group relative md:hidden">
          <summary
            className={`flex cursor-pointer list-none items-center rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink [&::-webkit-details-marker]:hidden ${linkBase}`}
          >
            Menu
            <span
              aria-hidden="true"
              className="ml-2 inline-block transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 top-full mt-3 flex w-56 flex-col gap-1 rounded-xl border border-line bg-bg p-3 shadow-lg"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-line/60 hover:text-ink ${linkBase}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={CTA_ITEM.href}
              className={`mt-2 rounded-lg bg-panel px-3 py-2.5 text-center text-sm text-white transition-opacity hover:opacity-90 ${linkBase}`}
            >
              {CTA_ITEM.label}
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
