import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../PageHero";
import { Accordion } from "../ui/accordion";
import { ArrowLink } from "../ui/arrow-link";
import { serviceCopy } from "../../content/pages";
import { getFrappeBadge, getServices, SERVICES } from "../../content/services";
import { getSite } from "../../content/site";
import { getUi } from "../../content/ui";
import { arrow, localePath, type Locale } from "../../lib/i18n";
import { BASE, pageMeta } from "../../lib/seo";
import { breadcrumbLink, jsonLd, primaryCtaSoft, quietLink } from "./shared";

const RELATED_COUNT = 3;

export function serviceParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export function serviceMetadata(locale: Locale, slug: string): Metadata {
  const service = getServices(locale).find((s) => s.slug === slug);
  if (!service) return {};
  return pageMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    locale,
  });
}

export function ServicePage({ locale, slug }: { locale: Locale; slug: string }) {
  const services = getServices(locale);
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const ui = getUi(locale);
  const site = getSite(locale);
  const href = (path: string) => localePath(locale, path);
  const glyph = arrow(locale);
  const copy = serviceCopy(locale, slug);
  const isErp = slug === "erp-implementation";
  const at = services.indexOf(service);
  const related = Array.from(
    { length: RELATED_COUNT },
    (_, i) => services[(at + 1 + i) % services.length],
  );
  const url = BASE + href(`/services/${service.slug}`);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.tagline,
        url,
        inLanguage: locale,
        serviceType: service.title,
        provider: { "@id": `${BASE}/#organization` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.title,
          itemListElement: service.included.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.breadcrumbServices, item: BASE + href("/services") },
          { "@type": "ListItem", position: 2, name: service.title, item: url },
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
            <Link href={href("/services")} className={breadcrumbLink}>
              {ui.breadcrumbServices}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>
        }
        eyebrow={`/ ${String(service.index).padStart(2, "0")} · ${service.count}`}
        title={service.heading}
        lede={service.tagline}
        after={
          isErp ? (
            <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#7c78ff]" />
              {getFrappeBadge(locale)}
            </span>
          ) : null
        }
      />

      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-12">
          <div className="space-y-6 md:col-span-8">
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-lg leading-relaxed md:text-xl">
                {paragraph}
              </p>
            ))}
          </div>
          {service.timeline ? (
            <aside className="md:col-span-4">
              <p className="rounded-2xl border border-line bg-white p-6 text-sm leading-relaxed">
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {ui.timeline}
                </span>
                {service.timeline}
              </p>
            </aside>
          ) : null}
        </div>

        <div className="mx-auto mt-20 w-full max-w-6xl px-6 md:mt-28">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="display text-3xl md:text-5xl">{ui.whatsIncluded}</h2>
          </div>
          {copy ? (
            <Accordion
              items={copy.included.map((item) => ({
                id: item.num,
                label: item.num,
                title: item.title,
                body: item.body,
              }))}
            />
          ) : (
            <ul className="border-t border-line">
              {service.included.map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 border-b border-line py-5 md:gap-8 md:ps-8">
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-lg md:text-2xl">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {copy?.approach ? (
          <div className="mx-auto mt-20 w-full max-w-6xl px-6 md:mt-28">
            <h2 className="display mb-10 max-w-[24ch] text-3xl leading-[1.1] md:text-5xl">
              {copy.approach.heading}
            </h2>
            <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {copy.approach.steps.map((step) => (
                <li key={step.num} className="border-t-2 border-ink pt-6">
                  <span className="mb-4 block font-mono text-xs text-muted">{step.num}</span>
                  <h3 className="display mb-3 text-xl">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <div className="mx-auto mt-20 w-full max-w-6xl px-6 md:mt-28">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="display text-3xl md:text-5xl">{copy?.related?.heading}</h2>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              {copy?.related?.sub}
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((other) => (
              <li key={other.slug}>
                <Link
                  href={href(`/services/${other.slug}`)}
                  className="card-lift group flex h-full flex-col rounded-2xl border border-line bg-white p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  <span className="mb-6 font-mono text-xs tabular-nums text-muted">
                    {String(other.index).padStart(2, "0")}
                  </span>
                  <span className="display mb-3 text-xl md:text-2xl">{other.title}</span>
                  <span className="mb-6 text-sm leading-relaxed text-muted">{other.tagline}</span>
                  <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.14em]">
                    {ui.viewService} <span aria-hidden="true">{glyph}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-panel py-24 text-white md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="display text-4xl leading-[1.05] md:text-6xl">
            {copy?.cta?.heading ?? ui.cta.heading}
          </h2>
          <p className="mx-auto mb-12 mt-6 max-w-[60ch] text-base leading-relaxed text-white/75 md:text-lg">
            {copy?.cta?.body ?? ui.cta.body}
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href={href("/contact")} className={primaryCtaSoft}>
              {site.CTA_ITEM.label} <span aria-hidden="true">{glyph}</span>
            </Link>
            <ArrowLink href={href("/services")} className={quietLink}>
              {ui.allServices}
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
