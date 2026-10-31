import type { Metadata } from "next";
import { PageHero } from "../PageHero";
import { ArrowLink } from "../ui/arrow-link";
import { getArticles } from "../../content/articles";
import { insightsCopy } from "../../content/pages";
import { getUi } from "../../content/ui";
import Link from "next/link";
import { arrow, localePath, type Locale } from "../../lib/i18n";
import { pageMeta } from "../../lib/seo";

export function insightsMetadata(locale: Locale): Metadata {
  const copy = insightsCopy(locale);
  return pageMeta({ title: copy.metaTitle, description: copy.lede, path: "/insights", locale });
}

export function InsightsPage({ locale }: { locale: Locale }) {
  const COPY = insightsCopy(locale);
  const ui = getUi(locale);
  const articles = getArticles(locale);
  return (
    <>
      <PageHero eyebrow={COPY.eyebrow} title={COPY.headline} lede={COPY.lede} />

      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="display mb-8 text-3xl md:text-5xl">{ui.articlesHeading}</h2>
          <ul className="mb-24 grid grid-cols-1 gap-4 md:mb-32 md:grid-cols-2">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={localePath(locale, `/insights/${article.slug}`)}
                  className="card-lift group flex h-full flex-col rounded-2xl border border-line bg-white p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:p-8"
                >
                  <span className="mb-6 w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                    {article.category}
                  </span>
                  <span className="display mb-3 text-2xl leading-[1.15] md:text-3xl">{article.title}</span>
                  <span className="mb-8 text-sm leading-relaxed text-muted md:text-base">{article.description}</span>
                  <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.14em]">
                    {ui.readArticle} <span aria-hidden="true">{arrow(locale)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="display mb-8 text-3xl md:text-5xl">{ui.upcomingHeading}</h2>
          <ul aria-label={ui.upcomingHeading} className="border-t border-line">
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
                    <h3 className="display mb-5 max-w-[24ch] text-3xl leading-[1.1] md:text-5xl">
                      {article.title}
                    </h3>
                    <p className="mb-8 max-w-[64ch] text-base leading-relaxed text-muted md:text-lg">
                      {article.excerpt}
                    </p>
                    <ArrowLink
                      href={localePath(locale, "/contact")}
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
