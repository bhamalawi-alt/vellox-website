import type { Metadata } from "next";
import { Fragment } from "react";
import type React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../PageHero";
import { ArrowLink } from "../ui/arrow-link";
import { ARTICLE_LINK, ARTICLE_SLUGS, getArticle, getRelatedArticles } from "../../content/articles";
import { getSite } from "../../content/site";
import { getUi } from "../../content/ui";
import { arrow, localePath, type Locale } from "../../lib/i18n";
import { BASE, pageMeta } from "../../lib/seo";
import { CtaArt } from "../CtaArt";
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
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: article.date,
      ...(article.updated ? { modifiedTime: article.updated } : {}),
    },
  };
}

function formatDate(locale: Locale, iso: string) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Guide text with its [words](/path) links turned into real links. */
function RichText({ text, locale }: { text: string; locale: Locale }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(ARTICLE_LINK)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const className =
      "text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
    parts.push(
      match[2].startsWith("/") ? (
        <Link key={match.index} href={localePath(locale, match[2])} className={className}>
          {match[1]}
        </Link>
      ) : (
        // A source on another site.
        <a key={match.index} href={match[2]} rel="noopener" className={className}>
          {match[1]}
        </a>
      ),
    );
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

/**
 * A table cell with its number ranges kept left to right. In Arabic text a
 * range such as 900–1,500 would otherwise be drawn back to front.
 */
function Figures({ text }: { text: string }) {
  const parts = text.split(/(\d[\d,.]*(?:–\d[\d,.]*)+)/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <bdi key={i} dir="ltr">
            {part}
          </bdi>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function ArticlePage({ locale, slug }: { locale: Locale; slug: string }) {
  const article = getArticle(locale, slug);
  if (!article) notFound();

  const ui = getUi(locale);
  const site = getSite(locale);
  const href = (path: string) => localePath(locale, path);
  const glyph = arrow(locale);
  const url = BASE + href(`/insights/${article.slug}`);
  const related = getRelatedArticles(locale, article.slug);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        inLanguage: locale,
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
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
        eyebrow={
          article.updated
            ? ui.updatedOn(formatDate(locale, article.updated))
            : ui.publishedOn(formatDate(locale, article.date))
        }
        art={article.service}
        title={article.title}
        lede={article.description}
        cta={{ href: href("/contact"), label: site.CTA_ITEM.label, glyph }}
      />

      <article className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-[68ch]">
            <p className="mb-14 text-lg leading-relaxed md:text-xl">{article.intro}</p>
            {article.sections.map((section) => {
              // A list follows the paragraph that introduces it (the last one
              // ending in a colon), or the last paragraph when none does.
              const lead = section.paragraphs.findLastIndex((p) => /[:：]\s*$/.test(p));
              const listAfter = lead === -1 ? section.paragraphs.length - 1 : lead;
              return (
              <section key={section.heading} className="mb-12 border-t border-line pt-8">
                <h2 className="display mb-5 text-2xl md:text-3xl">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, i) => (
                    // Index keys: the text can hold link markup, and the lists never reorder.
                    <Fragment key={i}>
                      <p className="text-base leading-relaxed text-muted md:text-lg">
                        <RichText text={paragraph} locale={locale} />
                      </p>
                        {section.list && listAfter === i ? (
                          <ul className="my-5 space-y-3 border-s-2 border-line ps-5">
                            {section.list.map((item, j) => (
                              <li key={j} className="text-base leading-relaxed md:text-lg">
                                <RichText text={item} locale={locale} />
                              </li>
                            ))}
                          </ul>
                        ) : null}
                    </Fragment>
                  ))}
                </div>
                {section.table ? (
                  <figure className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[34rem] border-collapse text-start text-sm md:text-base">
                        <thead>
                          <tr className="border-b border-ink">
                            {section.table.head.map((cell) => (
                              <th key={cell} scope="col" className="px-3 py-3 text-start font-medium first:ps-0">
                                {cell}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row[0]} className="border-b border-line align-top">
                              {row.map((cell, i) =>
                                i === 0 ? (
                                  <th key={i} scope="row" className="py-3 pe-3 text-start font-normal">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={i} className="px-3 py-3 tabular-nums text-muted">
                                    <Figures text={cell} />
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {section.table.note ? (
                      <figcaption className="mt-3 text-sm leading-relaxed text-muted">{section.table.note}</figcaption>
                    ) : null}
                  </figure>
                ) : null}
              </section>
              );
            })}
            <ArrowLink href={href(`/services/${article.service}`)} className="text-sm uppercase tracking-[0.12em] text-ink">
              {article.cta.label}
            </ArrowLink>

            {related.length ? (
              <nav aria-label={ui.moreGuides} className="mt-16">
                <h2 className="display mb-6 text-2xl md:text-3xl">{ui.moreGuides}</h2>
                <ul className="border-t border-line">
                  {related.map((guide) => (
                    <li key={guide.slug} className="border-b border-line">
                      <Link
                        href={href(`/insights/${guide.slug}`)}
                        className="group flex flex-col gap-2 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                      >
                        <span className="display text-lg md:text-xl">{guide.title}</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted group-hover:text-ink">
                          {ui.readArticle} <span aria-hidden="true">{glyph}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>
      </article>

      <section className="relative overflow-hidden bg-panel py-24 text-white md:py-32">
        <CtaArt />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
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
