import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../../../../components/PageHero";
import { Accordion } from "../../../../components/ui/accordion";
import { ArrowLink } from "../../../../components/ui/arrow-link";
import { COPY as brandStrategyCopy } from "../../../../content/pages/brand-strategy";
import { COPY as brandIdentityCopy } from "../../../../content/pages/brand-identity";
import { COPY as ecommerceCopy } from "../../../../content/pages/ecommerce";
import { COPY as erpCopy } from "../../../../content/pages/erp-implementation";
import { COPY as uxdCopy } from "../../../../content/pages/user-experience-design";
import { COPY as visualContentCopy } from "../../../../content/pages/visual-content";
import { COPY as webDevCopy } from "../../../../content/pages/web-development";
import { COPY as webMobileCopy } from "../../../../content/pages/web-mobile-applications";
import { FRAPPE_BADGE, SERVICES } from "../../../../content/services";
import { BASE, pageMeta } from "../../../../lib/seo";

type IncludedItem = { num: string; title: string; body: string };

type ServiceCopy = {
  included: IncludedItem[];
  approach?: {
    heading: string;
    steps: { num: string; title: string; body: string }[];
  };
  related?: { heading: string; sub: string };
  cta?: { heading: string; body: string };
};

const RELATED_COUNT = 3;

const PAGE_COPY: Record<string, ServiceCopy> = {
  "brand-strategy": brandStrategyCopy,
  "brand-identity": brandIdentityCopy,
  "user-experience-design": uxdCopy,
  "visual-content": visualContentCopy,
  "web-development": webDevCopy,
  ecommerce: ecommerceCopy,
  "web-mobile-applications": webMobileCopy,
  "erp-implementation": erpCopy,
};

const FALLBACK_CTA = {
  heading: "Ready to start a project?",
  body: "Tell us what you're building. We typically reply within 24 hours with a short diagnostic call to align on scope, timeline, and fit.",
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    locale: "en",
  });
}

export default async function ServiceDetail(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const copy = PAGE_COPY[slug];
  const isErp = slug === "erp-implementation";
  const at = SERVICES.indexOf(service);
  const related = Array.from(
    { length: RELATED_COUNT },
    (_, i) => SERVICES[(at + 1 + i) % SERVICES.length],
  );
  const url = `${BASE}/services/${service.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.tagline,
        url,
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
          { "@type": "ListItem", position: 1, name: "Services", item: `${BASE}/services` },
          { "@type": "ListItem", position: 2, name: service.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        before={
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60"
          >
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>
        }
        eyebrow={`/ ${String(service.index).padStart(2, "0")} · ${service.count}`}
        title={service.title}
        lede={service.tagline}
        after={
          isErp ? (
            <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#7c78ff]" />
              {FRAPPE_BADGE}
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
                  Timeline
                </span>
                {service.timeline}
              </p>
            </aside>
          ) : null}
        </div>

        <div className="mx-auto mt-20 w-full max-w-6xl px-6 md:mt-28">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="display text-3xl md:text-5xl">What&apos;s included</h2>
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
                <li key={item} className="flex items-baseline gap-5 border-b border-line py-5 md:gap-8 md:pl-8">
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
            <h2 className="display text-3xl md:text-5xl">
              {copy?.related?.heading ?? "Other Services"}
            </h2>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              {copy?.related?.sub ?? "Explore related practice areas."}
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="card-lift group flex h-full flex-col rounded-2xl border border-line bg-white p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  <span className="mb-6 font-mono text-xs tabular-nums text-muted">
                    {String(other.index).padStart(2, "0")}
                  </span>
                  <span className="display mb-3 text-xl md:text-2xl">{other.title}</span>
                  <span className="mb-6 text-sm leading-relaxed text-muted">{other.tagline}</span>
                  <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.14em]">
                    View service <span aria-hidden="true">→</span>
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
            {copy?.cta?.heading ?? FALLBACK_CTA.heading}
          </h2>
          <p className="mx-auto mb-12 mt-6 max-w-[60ch] text-base leading-relaxed text-white/75 md:text-lg">
            {copy?.cta?.body ?? FALLBACK_CTA.body}
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-3 rounded-full bg-white px-7 text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start a Project <span aria-hidden="true">→</span>
            </Link>
            <ArrowLink href="/services" className="text-sm uppercase tracking-[0.12em] text-white/80 hover:text-white">
              All services
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
