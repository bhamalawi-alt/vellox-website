import type { Metadata } from "next";
import Link from "next/link";
import { ShaderBackground } from "../components/motion/ShaderBackground";
import "../components/motion/MarqueeStrip.css";
import "../components/motion/SlidingTextCta.css";
import { COPY } from "../content/pages/home";
import { FRAPPE_BADGE, SERVICES } from "../content/services";
import { pageMeta } from "../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Vellox Studio — Business Development Studio",
  description: COPY.hero.support,
  path: "/",
});

const darkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const cardFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-ink";

function StartProjectCta() {
  return (
    <Link href="/contact" className={`sliding-text-cta ${darkFocus}`}>
      <span className="sliding-text-cta__label">
        {COPY.hero.primaryCta} <span aria-hidden="true">→</span>
      </span>
      <span className="sliding-text-cta__label-clone" aria-hidden="true">
        {COPY.hero.primaryCta} <span aria-hidden="true">→</span>
      </span>
      <span className="sliding-text-cta__underline" aria-hidden="true"></span>
      <span className="sliding-text-cta__glow" aria-hidden="true"></span>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[90vh] flex-col overflow-hidden bg-[#0a0a0a] text-bg">
        <ShaderBackground src="emerald" />

        <div className="relative z-10 flex items-center justify-between gap-6 border-b border-white/10 px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
          <p>{COPY.hero.metaLeft}</p>
          <p>{COPY.hero.metaRight}</p>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-28 pt-16 md:pt-20">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/70">
            {COPY.hero.eyebrow}
          </p>
          <h1 className="display max-w-[18ch] text-[clamp(2rem,4.15vw,3.7rem)] font-light leading-[1.05] text-white/60">
            We build brands and platforms for{" "}
            <span className="text-bg">wellness</span>,{" "}
            <span className="text-bg">fintech</span>, and{" "}
            <span className="text-bg">F&B</span> founders — from positioning
            to production.
          </h1>
          <p className="mt-6 max-w-[50ch] text-sm leading-relaxed text-white/70 md:text-base">
            {COPY.hero.support}
          </p>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center md:mt-14">
            <StartProjectCta />
            <Link
              href="/portfolio"
              className={`inline-flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white ${darkFocus}`}
            >
              <span aria-hidden="true" className="inline-block h-px w-8 bg-white/40" />
              {COPY.hero.secondaryCta}
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              />
              {FRAPPE_BADGE}
            </span>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="marquee relative z-20 border-t border-white/10 py-4"
        >
          <div className="marquee__track">
            {[0, 1].map((half) => (
              <ul key={half} className="marquee__group">
                {COPY.marquee.map((name) => (
                  <li
                    key={name}
                    className="mx-6 font-mono text-xs uppercase tracking-[0.2em] text-white/50"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-24 text-ink md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            {COPY.whatWeDo.eyebrow}
          </p>
          <h2 className="display mb-4 max-w-[24ch] text-3xl leading-[1.1] md:text-5xl">
            {COPY.whatWeDo.heading}
          </h2>
          <p className="mb-12 max-w-[68ch] text-base leading-relaxed text-muted md:text-lg">
            {COPY.whatWeDo.body}
          </p>

          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className={`group flex h-full flex-col bg-bg p-6 transition-colors hover:bg-white md:p-8 ${cardFocus}`}
                >
                  <span className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    / {String(service.index).padStart(2, "0")}
                  </span>
                  <h3 className="display mb-3 text-xl underline-offset-4 group-hover:underline md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-muted">
                    {service.tagline}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                      {service.count}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-ink">
                      View details
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0a0a] py-24 text-bg md:py-32">
        <ShaderBackground src="connectivity" className="opacity-40" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="display text-3xl font-light leading-[1.15] md:text-5xl">
            One accountable team across strategy, design, and engineering.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-white/70 md:text-lg">
            No hand-offs, no translation loss, no surprises at launch.
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
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="mt-3 text-sm font-medium">{stat.label}</span>
                <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  {stat.sub}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-panel py-24 text-bg md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="display text-3xl leading-[1.1] md:text-5xl">
            {COPY.ctaBand.heading}
          </h2>
          <p className="mx-auto mb-10 mt-6 max-w-[60ch] text-base leading-relaxed text-white/70 md:text-lg">
            {COPY.ctaBand.body}
          </p>
          <div className="flex justify-center">
            <StartProjectCta />
          </div>
        </div>
      </section>
    </>
  );
}
