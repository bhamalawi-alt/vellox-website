import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShaderBackground } from "../../../components/motion/ShaderBackground";
import "../../../components/motion/SlidingTextCta.css";
import { COPY as brandStrategyCopy } from "../../../content/pages/brand-strategy";
import { COPY as brandIdentityCopy } from "../../../content/pages/brand-identity";
import { COPY as ecommerceCopy } from "../../../content/pages/ecommerce";
import { COPY as uxdCopy } from "../../../content/pages/user-experience-design";
import { COPY as visualContentCopy } from "../../../content/pages/visual-content";
import { COPY as webDevCopy } from "../../../content/pages/web-development";
import { COPY as webMobileCopy } from "../../../content/pages/web-mobile-applications";
import { FRAPPE_BADGE, SERVICES } from "../../../content/services";
import { pageMeta } from "../../../lib/seo";

type IncludedItem = { num: string; title: string; body: string };

type ServiceCopy = {
  includedHeading?: string;
  included: IncludedItem[];
  approach?: {
    heading: string;
    steps: { num: string; title: string; body: string }[];
  };
  cta?: { heading: string; body: string };
};

const PAGE_COPY: Record<string, ServiceCopy> = {
  "brand-strategy": brandStrategyCopy,
  "brand-identity": brandIdentityCopy,
  "user-experience-design": uxdCopy,
  "visual-content": visualContentCopy,
  "web-development": webDevCopy,
  ecommerce: ecommerceCopy,
  "web-mobile-applications": webMobileCopy,
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
    title: `${service.title} — Vellox Studio`,
    description: service.tagline,
    path: `/services/${service.slug}`,
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

  const darkFocus =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
  const lightFocus =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

  return (
    <>
      <section
        className={`relative overflow-hidden ${
          isErp ? "bg-[#0a0a0a] text-bg" : "border-b border-line bg-bg text-ink"
        }`}
      >
        {isErp ? <ShaderBackground src="interface" className="opacity-50" /> : null}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <nav
            aria-label="Breadcrumb"
            className={`mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] ${
              isErp ? "text-white/60" : "text-muted"
            }`}
          >
            <Link
              href="/services"
              className={`underline-offset-4 hover:underline ${
                isErp ? darkFocus : lightFocus
              }`}
            >
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span>{service.title}</span>
          </nav>

          <p
            className={`mb-5 font-mono text-xs uppercase tracking-[0.3em] ${
              isErp ? "text-white/70" : "text-muted"
            }`}
          >
            / {String(service.index).padStart(2, "0")} · {service.count}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <h1 className="display max-w-[20ch] text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.05]">
              {service.title}
            </h1>
            {isErp ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                />
                {FRAPPE_BADGE}
              </span>
            ) : null}
          </div>

          <p
            className={`mt-6 max-w-[56ch] text-base leading-relaxed md:text-lg ${
              isErp ? "text-white/70" : "text-muted"
            }`}
          >
            {service.tagline}
          </p>
        </div>
      </section>

      <section className="bg-bg py-16 text-ink md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-[70ch] space-y-6">
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 md:mt-24">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
              <h2 className="display text-2xl md:text-4xl">What&apos;s Included</h2>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {copy?.includedHeading ?? service.count}
              </span>
            </div>

            {copy ? (
              <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
                {copy.included.map((item) => (
                  <li key={item.num} className="bg-bg p-6 md:p-8">
                    <div className="mb-3 flex items-baseline gap-4">
                      <span className="font-mono text-xs text-muted">{item.num}</span>
                      <h3 className="display text-lg md:text-xl">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="divide-y divide-line rounded-2xl border border-line">
                {service.included.map((item) => (
                  <li key={item} className="flex items-center gap-4 bg-bg p-5 md:p-6">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                    <span className="text-base leading-relaxed md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {service.timeline ? (
              <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-panel px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-bg">
                Timeline — {service.timeline}
              </p>
            ) : null}
          </div>

          {copy?.approach ? (
            <div className="mt-16 md:mt-24">
              <h2 className="display mb-8 max-w-[24ch] text-2xl leading-[1.15] md:text-4xl">
                {copy.approach.heading}
              </h2>
              <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {copy.approach.steps.map((step) => (
                  <li key={step.num} className="bg-bg p-6 md:p-8">
                    <span className="mb-3 block font-mono text-xs text-muted">
                      {step.num}
                    </span>
                    <h3 className="display mb-2 text-lg">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{step.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-panel py-20 text-bg md:py-28">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="display text-3xl leading-[1.1] md:text-5xl">
            {copy?.cta?.heading ?? FALLBACK_CTA.heading}
          </h2>
          <p className="mx-auto mt-6 mb-10 max-w-[60ch] text-base leading-relaxed text-white/70 md:text-lg">
            {copy?.cta?.body ?? FALLBACK_CTA.body}
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/contact"
              className={`sliding-text-cta ${darkFocus}`}
            >
              <span className="sliding-text-cta__label">
                Start a Project <span aria-hidden="true">→</span>
              </span>
              <span className="sliding-text-cta__label-clone" aria-hidden="true">
                Start a Project <span aria-hidden="true">→</span>
              </span>
              <span className="sliding-text-cta__underline" aria-hidden="true"></span>
              <span className="sliding-text-cta__glow" aria-hidden="true"></span>
            </Link>
            <Link
              href="/services"
              className={`inline-flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white ${darkFocus}`}
            >
              <span aria-hidden="true" className="inline-block h-px w-8 bg-white/40" />
              All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
