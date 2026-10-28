import type { Metadata } from "next";
import { PageHero } from "../../../components/PageHero";
import { ArrowLink } from "../../../components/ui/arrow-link";
import { COPY } from "../../../content/pages/insights";
import { pageMeta } from "../../../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Insights — Vellox Studio",
  description: COPY.lede,
  path: "/insights",
    locale: "en",
});

export default function Insights() {
  return (
    <>
      <PageHero eyebrow={COPY.eyebrow} title={COPY.headline} lede={COPY.lede} />

      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <ul aria-label={COPY.eyebrow} className="border-t border-line">
            {COPY.articles.map((article, i) => (
              <li key={article.title} className="border-b border-line">
                <article className="grid gap-6 py-12 md:grid-cols-12 md:py-16">
                  <div className="flex items-start gap-4 md:col-span-3 md:flex-col">
                    <span className="font-mono text-xs tabular-nums text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                      {article.category}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                      {COPY.status}
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="display mb-5 max-w-[24ch] text-3xl leading-[1.1] md:text-5xl">
                      {article.title}
                    </h2>
                    <p className="mb-8 max-w-[64ch] text-base leading-relaxed text-muted md:text-lg">
                      {article.excerpt}
                    </p>
                    <ArrowLink
                      href="/contact"
                      className="text-sm uppercase tracking-[0.12em] text-ink"
                    >
                      {article.linkLabel}
                      <span className="sr-only">: {article.title}</span>
                    </ArrowLink>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
