import type { Metadata } from "next";
import Link from "next/link";
import { ShaderBackground } from "../motion/ShaderBackground";
import { PageHero } from "../PageHero";
import { ArrowLink } from "../ui/arrow-link";
import { ScrollRevealText } from "../ui/scroll-reveal-text";
import { StatsCounter } from "../ui/stats-counter";
import { StickyStack } from "../ui/sticky-stack";
import { aboutCopy } from "../../content/pages";
import { getSite } from "../../content/site";
import { getUi } from "../../content/ui";
import { arrow, localePath, type Locale } from "../../lib/i18n";
import { pageMeta } from "../../lib/seo";
import { primaryCtaSoft, quietLink } from "./shared";

export function aboutMetadata(locale: Locale): Metadata {
  const copy = aboutCopy(locale);
  return pageMeta({ title: copy.metaTitle, description: copy.metaDescription, path: "/about", locale });
}

export function AboutPage({ locale }: { locale: Locale }) {
  const COPY = aboutCopy(locale);
  const ui = getUi(locale);
  const site = getSite(locale);
  const href = (path: string) => localePath(locale, path);
  const total = String(COPY.principles.length).padStart(2, "0");
  const facts = [
    { term: ui.facts.operating, detail: ui.facts.operatingValue },
    { term: ui.facts.focus, detail: ui.facts.focusValue },
  ];
  return (
    <>
      <PageHero eyebrow={COPY.eyebrow} title={COPY.headline} />

      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16">
          <p className="display text-2xl leading-[1.3] md:col-span-7 md:text-3xl">
            {COPY.lede}
          </p>
          <dl className="md:col-span-4 md:col-start-9">
            {facts.map((fact) => (
              <div
                key={fact.term}
                className="flex items-baseline justify-between gap-6 border-b border-line py-4 first:border-t"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {fact.term}
                </dt>
                <dd className="text-end text-sm font-medium">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-bg pb-24 text-ink md:pb-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="border-t border-line pt-16">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              {COPY.approach.eyebrow}
            </p>
            <h2 className="display max-w-[22ch] text-4xl leading-[1.05] md:text-6xl">
              {COPY.approach.heading}
            </h2>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
              {COPY.approach.sub}
            </p>
          </div>
          <StickyStack
            cards={COPY.principles.map((principle) => (
              <article
                key={principle.num}
                className="grid gap-8 rounded-3xl border border-line bg-white p-8 shadow-[0_30px_80px_-50px_rgba(10,10,10,0.45)] md:grid-cols-[1fr_1.4fr] md:p-14"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {principle.num} / {total}
                  </span>
                  <h3 className="display mt-6 text-4xl leading-[1.05] md:text-6xl">
                    {principle.title}
                  </h3>
                </div>
                <p className="self-end text-base leading-relaxed text-muted md:text-lg">
                  {principle.body}
                </p>
              </article>
            ))}
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0a0a] py-32 text-white md:py-44">
        <ShaderBackground src="globe" className="opacity-40" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
          <ScrollRevealText
            text={ui.globeBand.heading}
            className="display text-4xl font-light leading-[1.1] md:text-7xl"
          />
          <p className="mx-auto mt-8 max-w-[52ch] text-base leading-relaxed text-white/75 md:text-lg">
            {ui.globeBand.body}
          </p>
        </div>
      </section>

      {/* Shown once real figures are filled in. */}
      {COPY.numbers.stats.length > 0 ? (
        <section className="bg-bg py-24 text-ink md:py-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="mb-12 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              {COPY.numbers.eyebrow}
            </h2>
            <ul className="grid grid-cols-2 border-t border-line md:grid-cols-4">
              {COPY.numbers.stats.map((stat) => (
                <li
                  key={stat.label}
                  className="flex flex-col border-b border-line py-8 pe-6 md:border-b-0 md:border-e md:px-6 md:first:ps-0 md:last:border-e-0"
                >
                  <span className="display text-5xl tracking-[-0.02em] md:text-7xl">
                    <StatsCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-4 text-sm font-medium">{stat.label}</span>
                  <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    {stat.sub}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              {COPY.numbers.note}
            </p>
          </div>
        </section>
      ) : null}

      {/* Shown once real client quotes are added. */}
      {COPY.testimonials.length > 0 ? (
        <section id="testimonials" className="scroll-mt-24 border-t border-line bg-bg py-24 text-ink md:py-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              {COPY.testimonialsSection.eyebrow}
            </p>
            <h2 className="display mb-14 max-w-[22ch] text-4xl leading-[1.05] md:text-6xl">
              {COPY.testimonialsSection.heading}
            </h2>
            {/* A swipeable row on small screens (focusable so keyboards can scroll
                it), a full grid from lg so no testimonial is hidden off-screen. */}
            <ul
              tabIndex={0}
              className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0"
              aria-label={COPY.testimonialsSection.eyebrow}
            >
              {COPY.testimonials.map((testimonial) => (
                <li
                  key={testimonial.name}
                  className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-auto"
                >
                  <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-8">
                    <span aria-hidden="true" className="display text-6xl leading-none text-ink/20">
                      &ldquo;
                    </span>
                    <blockquote className="mt-2 text-base leading-relaxed md:text-lg">
                      <p>{testimonial.quote}</p>
                    </blockquote>
                    <figcaption className="mt-auto flex items-center gap-4 pt-10">
                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs tracking-[0.08em] text-white"
                      >
                        {testimonial.initials}
                      </span>
                      <span>
                        <span className="block text-sm font-medium">{testimonial.name}</span>
                        <span className="mt-0.5 block text-sm text-muted">
                          {testimonial.role} · {testimonial.company}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-panel py-24 text-white md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="display text-4xl leading-[1.05] md:text-6xl">{ui.cta.heading}</h2>
          <p className="mx-auto mb-12 mt-6 max-w-[60ch] text-base leading-relaxed text-white/75 md:text-lg">
            {ui.cta.body}
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href={href("/contact")} className={primaryCtaSoft}>
              {site.CTA_ITEM.label} <span aria-hidden="true">{arrow(locale)}</span>
            </Link>
            <ArrowLink href={href("/portfolio")} className={quietLink}>
              {ui.viewPortfolio}
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
