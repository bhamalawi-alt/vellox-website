import type { Metadata } from "next";
import Link from "next/link";
import { ShaderBackground } from "../components/motion/ShaderBackground";
import { Reveal } from "../components/motion/Reveal";
import { MagneticCta } from "../components/motion/MagneticCta";
import { Marquee } from "../components/motion/Marquee";
import { BrandMark } from "../components/BrandLogo";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { ArrowLink } from "../components/ui/arrow-link";
import { ImageRevealList } from "../components/ui/image-reveal-list";
import { ProgressiveBlur } from "../components/ui/progressive-blur";
import { ScrollRevealText } from "../components/ui/scroll-reveal-text";
import { StaggerText } from "../components/ui/stagger-text";
import { StatsCounter } from "../components/ui/stats-counter";
import { StickyStack } from "../components/ui/sticky-stack";
import { COPY } from "../content/pages/home";
import { COPY as PORTFOLIO } from "../content/pages/portfolio";
import { getFeaturedProjects } from "../lib/projects";
import { FRAPPE_BADGE, SERVICES } from "../content/services";
import { pageMeta } from "../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Vellox Studio — Brand, Web & ERP Studio for Wellness, Fintech, F&B",
  description: COPY.hero.metaDescription,
  path: "/",
});

const HEADLINE = [
  { w: "We" }, { w: "build" }, { w: "brands" }, { w: "and" },
  { w: "platforms" }, { w: "for" }, { w: "wellness,", em: true },
  { w: "fintech,", em: true }, { w: "and" }, { w: "F&B", em: true },
  { w: "founders" }, { w: "—" }, { w: "from" }, { w: "positioning" },
  { w: "to" }, { w: "production." },
];

const SERVICE_ROWS = SERVICES.map((service) => ({
  id: service.slug,
  number: String(service.index).padStart(2, "0"),
  title: service.title,
  description: service.tagline,
  meta: service.count,
  href: `/services/${service.slug}`,
}));

const primaryCta =
  "inline-flex h-12 items-center gap-3 rounded-full bg-white px-7 text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Home() {
  const featured = getFeaturedProjects();
  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0a0a0a] text-white">
        <ShaderBackground src="interface" className="opacity-50" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgba(10,10,10,0.55),transparent)]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 pt-24 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
          <p>{COPY.hero.metaLeft}</p>
          <p className="hidden sm:block">{COPY.hero.eyebrow}</p>
          <p>{COPY.hero.metaRight}</p>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-36 pt-10 text-center">
          <BrandMark height={48} className="mb-8 h-12 w-auto" />
          <h1 className="display max-w-[18ch] text-[clamp(2.4rem,6vw,5.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-white/75">
            <StaggerText words={HEADLINE} emClassName="text-white" />
          </h1>
          <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-white/75 md:text-lg">
            {COPY.hero.support}
          </p>
          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
            <MagneticCta>
              <Link href="/contact" className={primaryCta}>
                {COPY.hero.primaryCta} <span aria-hidden="true">→</span>
              </Link>
            </MagneticCta>
            <ArrowLink href="/portfolio" className="text-sm uppercase tracking-[0.12em] text-white/80 hover:text-white">
              {COPY.hero.secondaryCta}
            </ArrowLink>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#7c78ff]" />
              {FRAPPE_BADGE}
            </span>
          </div>
        </div>

        <ProgressiveBlur position="bottom" color="#0a0a0a" height="220px" className="z-[5]" />

        <Marquee items={COPY.marquee} className="z-20 border-t border-white/10 py-4" />
      </section>

      <section className="bg-bg py-24 text-ink md:py-36">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal>
            <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  {COPY.whatWeDo.eyebrow}
                </p>
                <h2 className="display text-4xl leading-[1.05] tracking-[-0.01em] md:text-6xl">
                  {COPY.whatWeDo.heading}
                </h2>
              </div>
              <p className="max-w-[46ch] text-base leading-relaxed text-muted md:col-span-5 md:text-lg">
                {COPY.whatWeDo.body}
              </p>
            </div>
          </Reveal>
          <ImageRevealList items={SERVICE_ROWS} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0a0a] py-32 text-white md:py-48">
        <ShaderBackground src="connectivity" className="opacity-30" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
          <ScrollRevealText
            text="One accountable team across strategy, design, and engineering."
            className="display text-4xl font-light leading-[1.1] tracking-[-0.01em] md:text-7xl"
          />
          <p className="mx-auto mt-8 max-w-[52ch] text-base leading-relaxed text-white/75 md:text-lg">
            No hand-offs, no translation loss, no surprises at launch.
          </p>
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="bg-[#0a0a0a] pb-24 text-white md:pb-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-16">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                  {PORTFOLIO.caseStudies.eyebrow}
                </p>
                <h2 className="display text-4xl leading-[1.05] md:text-6xl">
                  Selected engagements
                </h2>
              </div>
              <ArrowLink href="/portfolio" className="text-sm uppercase tracking-[0.12em] text-white/80 hover:text-white">
                All work
              </ArrowLink>
            </div>
            <StickyStack
              cards={featured.map((study, i) => (
                <CaseStudyCard key={study.slug} study={study} index={i} total={featured.length} />
              ))}
            />
          </div>
        </section>
      ) : null}

      <section className="bg-bg py-24 text-ink md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="mb-12 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            {COPY.numbers.eyebrow}
          </h2>
          <ul className="grid grid-cols-2 border-t border-line md:grid-cols-4">
            {COPY.numbers.stats.map((stat) => (
              <li
                key={stat.label}
                className="flex flex-col border-b border-line py-8 pr-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
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
        </div>
      </section>

      <section className="relative overflow-hidden bg-panel py-28 text-white md:py-40">
        <div className="mx-auto w-full max-w-5xl px-6 text-center">
          <h2 className="display text-4xl leading-[1.05] md:text-7xl">
            <StaggerText
              words={COPY.ctaBand.heading.split(" ").map((w) => ({ w }))}
              onView
            />
          </h2>
          <p className="mx-auto mb-12 mt-8 max-w-[56ch] text-base leading-relaxed text-white/75 md:text-lg">
            {COPY.ctaBand.body}
          </p>
          <div className="flex justify-center">
            <MagneticCta>
              <Link href="/contact" className={primaryCta}>
                {COPY.hero.primaryCta} <span aria-hidden="true">→</span>
              </Link>
            </MagneticCta>
          </div>
        </div>
      </section>
    </>
  );
}
