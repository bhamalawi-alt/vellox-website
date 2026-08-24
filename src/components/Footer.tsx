import Link from "next/link";
import {
  COPYRIGHT,
  FOOTER_COLUMNS,
  SOCIAL_LINKS,
  TAGLINE,
  WORDMARK,
} from "../content/site";

const linkBase =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Footer() {
  return (
    <footer className="bg-panel text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className={`display text-2xl font-medium tracking-tight ${linkBase}`}
            >
              {WORDMARK}
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-light">
              {TAGLINE}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    {...(social.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`text-sm text-muted-light transition-colors hover:text-white ${linkBase}`}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-light">
                {column.heading}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`text-sm text-white/80 transition-colors hover:text-white ${linkBase}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-light">{COPYRIGHT}</p>
          <nav aria-label="Legal" className="flex gap-6">
            <Link
              href="/privacy/"
              className={`text-sm text-muted-light transition-colors hover:text-white ${linkBase}`}
            >
              Privacy
            </Link>
            <Link
              href="/terms/"
              className={`text-sm text-muted-light transition-colors hover:text-white ${linkBase}`}
            >
              Terms
            </Link>
          </nav>
        </div>

        <div className="mt-8 flex justify-end">
          <a
            href="#"
            className={`text-sm text-muted-light transition-colors hover:text-white ${linkBase}`}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
