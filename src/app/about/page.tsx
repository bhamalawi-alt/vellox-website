import type { Metadata } from "next";
import Link from "next/link";
import { CountUp } from "../../components/motion/CountUp";
import { Reveal } from "../../components/motion/Reveal";
import { ShaderBackground } from "../../components/motion/ShaderBackground";
import "../../components/motion/SlidingTextCta.css";
import { COPY } from "../../content/pages/about";
import { pageMeta } from "../../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About — Vellox Studio",
  description: COPY.lede,
  path: "/about",
});

const CTA = {
  heading: "Ready to start a project?",
  body: "Tell us what you're building. We typically reply within 24 hours with a short diagnostic call to align on scope, timeline, and fit.",
};

const GLOBE_BAND = {
  heading: "Operating remotely across the EU and MENA.",
  body: "Wellness, fintech, and F&B founders — from positioning to production.",
};

const darkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function StartProjectCta() {
  return (
    <Link href="/contact" className={`sliding-text-cta ${darkFocus}`}>
      <span className="sliding-text-cta__label">
        Start a Project <span aria-hidden="true">→</span>
      </span>
      <span className="sliding-text-cta__label-clone" aria-hidden="true">
        Start a Project <span aria-hidden="true">→</span>
      </span>
      <span className="sliding-text-cta__underline" aria-hidden="true"></span>
      <span className="sliding-text-cta__glow" aria-hidden="true"></span>
    </Link>
  );
}

const FACTS = [
  { term: "Founded", detail: "2019" },
  { term: "Operating", detail: "Remote · EU · MENA" },
  { term: "Focus", detail: "Wellness · Fintech · F&B" },
];

export default function About() {
  return (
    <>
      <section className="bg-[#0a0a0a] py-24 text-bg md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/70">
            {COPY.eyebrow}
          </p>
          <h1 className="display max-w-[22ch] text-[clamp(2rem,4.15vw,3.7rem)] font-light leading-[1.05] text-white/60">
            {COPY.headline}
          </h1>
        </div>
      </section>

      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <h2 className="display mb-6 max-w-[20ch] text-3xl leading-[1.1] md:text-4xl">
              About Vellox Studio
            </h2>
            <p className="max-w-[68ch] text-base leading-relaxed text-muted md:text-lg">
              {COPY.lede}
            </p>
          </div>
          <dl className="md:col-span-5">
            {FACTS.map((fact) => (
              <div
                key={fact.term}
                className="flex items-baseline justify-between gap-6 border-b border-line py-4 first:border-t"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {fact.term}
                </dt>
                <dd className="text-right text-sm font-medium">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-line bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
                {COPY.approach.eyebrow}
              </p>
              <h2 className="display max-w-[24ch] text-3xl leading-[1.1] md:text-5xl">
                {COPY.approach.heading}
              </h2>
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
                {COPY.approach.sub}
              </p>
            </div>
            <p
              aria-hidden="true"
              className="font-mono text-xs uppercase tabular-nums tracking-[0.2em] text-muted"
            >
              {COPY.principles[0].num} /{" "}
              {String(COPY.principles.length).padStart(2, "0")}
            </p>
          </div>

          <ul
            className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
            aria-label={COPY.approach.eyebrow}
          >
            {COPY.principles.map((principle, i) => (
              <Reveal key={principle.num} delay={i * 90}>
              <li className="flex h-full flex-col bg-bg p-6 md:p-8">
                <span className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {principle.num} /{" "}
                  {String(COPY.principles.length).padStart(2, "0")}
                </span>
                <h3 className="display mb-3 text-xl underline-offset-4 md:text-2xl">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {principle.body}
                </p>
              </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0a0a] py-24 text-bg md:py-32">
        <ShaderBackground src="globe" className="opacity-40" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="display text-3xl font-light leading-[1.15] md:text-5xl">
            {GLOBE_BAND.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-white/70 md:text-lg">
            {GLOBE_BAND.body}
          </p>
        </div>
      </section>

      <section className="bg-bg py-24 text-ink md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="mb-12 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted">
            {COPY.numbers.eyebrow}
          </h2>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {COPY.numbers.stats.map((stat) => (
              <li
                key={stat.label}
                className="flex flex-col items-center justify-center bg-bg p-6 text-center md:p-8"
              >
                <span className="display text-4xl md:text-6xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-3 text-sm font-medium">{stat.label}</span>
                <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  {stat.sub}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {COPY.numbers.note}
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            {COPY.testimonialsSection.eyebrow}
          </p>
          <h2 className="display mb-12 max-w-[24ch] text-3xl leading-[1.1] md:text-5xl">
            {COPY.testimonialsSection.heading}
          </h2>
          <ul
            className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
            aria-label={COPY.testimonialsSection.eyebrow}
          >
            {COPY.testimonials.map((testimonial) => (
              <li
                key={testimonial.name}
                className="flex flex-col bg-bg p-6 md:p-8"
              >
                <figure className="flex h-full flex-col">
                  <blockquote className="text-sm leading-relaxed md:text-[15px]">
                    <p>&ldquo;{testimonial.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-4 pt-8">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs tracking-[0.08em] text-white"
                    >
                      {testimonial.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-medium">
                        {testimonial.name}
                      </span>
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

      <section className="bg-panel py-24 text-bg md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="display text-3xl leading-[1.1] md:text-5xl">
            {CTA.heading}
          </h2>
          <p className="mx-auto mb-10 mt-6 max-w-[60ch] text-base leading-relaxed text-white/70 md:text-lg">
            {CTA.body}
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <StartProjectCta />
            <Link
              href="/portfolio"
              className={`inline-flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white ${darkFocus}`}
            >
              <span aria-hidden="true" className="inline-block h-px w-8 bg-white/40" />
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
