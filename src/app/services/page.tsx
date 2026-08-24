import type { Metadata } from "next";
import Link from "next/link";
import { COPY } from "../../content/pages/services-index";
import { SERVICES } from "../../content/services";
import { pageMeta } from "../../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Services — Vellox Studio",
  description: COPY.lede,
  path: "/services",
});

const cardFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-ink";

const SUB_SERVICE_PREVIEW = 3;

export default function ServicesIndex() {
  return (
    <section className="bg-bg py-20 text-ink md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          {COPY.eyebrow}
        </p>
        <h1 className="display mb-4 max-w-[26ch] text-3xl leading-[1.1] md:text-5xl">
          {COPY.headline}
        </h1>
        <p className="mb-14 max-w-[68ch] text-base leading-relaxed text-muted md:text-lg">
          {COPY.lede}
        </p>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className={`group flex h-full flex-col bg-bg p-6 transition-colors hover:bg-white md:p-8 ${cardFocus}`}
              >
                <span className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  / {String(service.index).padStart(2, "0")} ·{" "}
                  {service.count}
                </span>
                <h2 className="display mb-3 text-xl underline-offset-4 group-hover:underline md:text-2xl">
                  {service.title}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  {service.tagline}
                </p>
                <p className="mb-8 flex-1 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-muted">
                  {service.included.slice(0, SUB_SERVICE_PREVIEW).join(" · ")}
                </p>
                <span className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.12em] text-ink">
                  {COPY.cardCta}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
