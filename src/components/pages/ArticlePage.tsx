import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../PageHero";
import { ArrowLink } from "../ui/arrow-link";
import { ARTICLE_SLUGS, getArticle } from "../../content/articles";
import { getSite } from "../../content/site";
import { getUi } from "../../content/ui";
import { arrow, localePath, type Locale } from "../../lib/i18n";
import { BASE, pageMeta } from "../../lib/seo";
import { breadcrumbLink, jsonLd, primaryCtaSoft, quietLink } from "./shared";

export function articleParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export function articleMetadata(locale: Locale, slug: string): Metadata {
  const article = getArticle(locale, slug);
  if (!article) return {};
  const meta = pageMeta({
    // No " — Vellox Studio" suffix: article titles are long, and Google shows
    // the site name above the result anyway.
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    locale,
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: article.date } };
}

function formatDate(locale: Locale, iso: string) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function ArticlePage({ locale, slug }: { locale: Locale; slug: string }) {
  const article = getArticle(locale, slug);
  if (!article) notFound();

  const ui = getUi(locale);
  const site = getSite(locale);
  const href = (path: string) => localePath(locale, path);
  const glyph = arrow(locale);
  const url = BASE + href(`/insights/${article.slug}`);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        inLanguage: locale,
        datePublished: article.date,
        dateModified: article.date,
        url,
        mainEntityOfPage: url,
        author: { "@id": `${BASE}/#organization` },
        publisher: { "@id": `${BASE}/#organization` },
        image: `${BASE}/og-default.png`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.articlesHeading, item: BASE + href("/insights") },
          { "@type": "ListItem", position: 2, name: article.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      <PageHero
        before={
          <nav
            aria-label={ui.breadcrumbAria}
            className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60"
          >
            <Link href={href("/insights")} className={breadcrumbLink}>
              {ui.articlesHeading}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{article.category}</span>
          </nav>
        }
        eyebrow={ui.publishedOn(formatDate(locale, article.date))}
        title={article.title}
        lede={article.description}
      />

      <article className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-[68ch]">
            <p className="mb-14 text-lg leading-relaxed md:text-xl">{article.intro}</p>
            {article.sections.map((section) => (
              <section key={section.heading} className="mb-12 border-t border-line pt-8">
                <h2 className="display mb-5 text-2xl md:text-3xl">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-muted md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list ? (
                  <ul className="mt-5 space-y-3 border-s-2 border-line ps-5">
                    {section.list.map((item) => (
                      <li key={item} className="text-base leading-relaxed md:text-lg">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <ArrowLink href={href(`/services/${article.service}`)} className="text-sm uppercase tracking-[0.12em] text-ink">
              {article.cta.label}
            </ArrowLink>
          </div>
        </div>
      </article>

      <section className="bg-panel py-24 text-white md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="display text-4xl leading-[1.05] md:text-6xl">{article.cta.heading}</h2>
          <p className="mx-auto mb-12 mt-6 max-w-[60ch] text-base leading-relaxed text-white/75 md:text-lg">
            {article.cta.body}
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href={href("/contact")} className={primaryCtaSoft}>
              {site.CTA_ITEM.label} <span aria-hidden="true">{glyph}</span>
            </Link>
            <ArrowLink href={href("/insights")} className={quietLink}>
              {ui.articlesHeading}
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
