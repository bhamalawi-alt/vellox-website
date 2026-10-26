import Link from "next/link";
import {
  COPYRIGHT,
  FOOTER_COLUMNS,
  SOCIAL_LINKS,
  TAGLINE,
} from "../content/site";
import { BrandLockup, BrandMark } from "./BrandLogo";
import { ArrowLink } from "./ui/arrow-link";

const linkBase =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 pt-20 md:pt-28">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-b border-white/10 pb-16 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <BrandLockup height={32} className="mb-6 h-8 w-auto" />
            <p className="max-w-xs text-base leading-relaxed text-white/70">
              {TAGLINE}
            </p>
            <ArrowLink
              href="/contact"
              className="display mt-8 text-2xl text-white md:text-3xl"
            >
              Start a project
            </ArrowLink>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="lg:col-span-2"
            >
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                {column.heading}
              </h2>
              <ul className="mt-4 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <ArrowLink href={link.href} className="text-sm text-white/85 hover:text-white">
                      {link.label}
                    </ArrowLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Social" className="lg:col-span-2">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              Follow
            </h2>
            <ul className="mt-4 flex flex-col">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <ArrowLink href={social.href} className="text-sm text-white/85 hover:text-white">
                    {social.label}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>{COPYRIGHT}</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6">
            <Link href="/privacy" className={`inline-flex min-h-11 items-center hover:text-white ${linkBase}`}>
              Privacy
            </Link>
            <Link href="/terms" className={`inline-flex min-h-11 items-center hover:text-white ${linkBase}`}>
              Terms
            </Link>
            <a href="#top" className={`inline-flex min-h-11 items-center hover:text-white ${linkBase}`}>
              Back to top ↑
            </a>
          </nav>
        </div>
        <p className="pb-6 text-xs text-white/50">
          Interface components adapted from{" "}
          <a href="https://skiper-ui.com" className={`underline underline-offset-2 hover:text-white ${linkBase}`}>
            Skiper UI
          </a>{" "}
          and{" "}
          <a href="https://www.vengenceui.com" className={`underline underline-offset-2 hover:text-white ${linkBase}`}>
            Vengeance UI
          </a>
          .
        </p>
      </div>

      <div aria-hidden="true" className="pointer-events-none flex justify-center pt-4">
        <BrandMark height={420} className="h-[42vw] max-h-[420px] w-auto translate-y-[18%] opacity-[0.07]" />
      </div>
    </footer>
  );
}
