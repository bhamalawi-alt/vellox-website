import type { Metadata } from "next";
import Link from "next/link";
import { ShaderBackground } from "../components/motion/ShaderBackground";
import { Reveal } from "../components/motion/Reveal";
import { MagneticCta } from "../components/motion/MagneticCta";
import { Marquee } from "../components/motion/Marquee";
import { BrandMark } from "../components/BrandLogo";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { HomeProof } from "../components/HomeProof";
import { ArrowLink } from "../components/ui/arrow-link";
import { ImageRevealList } from "../components/ui/image-reveal-list";
import { ProgressiveBlur } from "../components/ui/progressive-blur";
import { ScrollRevealText } from "../components/ui/scroll-reveal-text";
import { StaggerText } from "../components/ui/stagger-text";
import { StatsCounter } from "../components/ui/stats-counter";
import { StickyStack } from "../components/ui/sticky-stack";
import { COPY } from "../content/pages/home";
import { COPY as PORTFOLIO } from "../content/pages/portfolio";
import { coverForService, getProjects } from "../lib/projects";
import { SERVICES } from "../content/services";
import { pageMeta } from "../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Vellox Studio — Brand, Web & ERP Studio for Wellness, Fintech, F&B",
  description: COPY.hero.metaDescription,
  path: "/",
});

// The three industries are the emphasised words; the rest stays white.
const EM_WORDS = new Set(["wellness,", "fintech,", "F&B"]);
const HEADLINE = COPY.hero.headline.split(" ").map((w) => ({ w, em: EM_WORDS.has(w) }));

const primaryCta =
  "inline-flex h-12 items-center gap-3 rounded-full bg-white px-7 text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Home() {
  const projects = getProjects();
  const featured = projects.filter((p) => p.featured);
  // The case-study cards earn their space only once at least one featured
  // project has real imagery; until then the proof block carries the section.
  const showCards = featured.some((p) => p.cover);
  // Real project covers appear beside a service as soon as one is uploaded
  // through the CMS; rows without a match simply show no preview.
  const rowFor = (slug: string) => {
    const service = SERVICES.find((s) => s.slug === slug);
    if (!service) return null;
    return {
      id: service.slug,
      number: String(service.index).padStart(2, "0"),
      title: service.title,
      description: service.tagline,
      meta: service.outcome,
      image: coverForService(service.slug, projects),
      href: `/services/${service.slug}`,
    };
  };
  const stages = COPY.whatWeDo.stages.map((stage) => ({
    heading: stage.heading,
    rows: stage.slugs.map(rowFor).filter((r) => r !== null),
  }));

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0a0a0a] text-white">
        <ShaderBackground src="interface" className="opacity-50" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgba(10,10,10,0.55),transparent)]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 pt-20 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
          <p>{COPY.hero.metaLeft}</p>
          <p className="hidden sm:block">{COPY.hero.eyebrow}</p>
          <p>{COPY.hero.metaRight}</p>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-6 text-center">
          <BrandMark height={44} className="mb-6 h-11 w-auto" />
          <h1 className="display max-w-[20ch] text-balance text-[clamp(2.3rem,5.2vw,4.6rem)] font-light leading-[1.04] tracking-[-0.02em] text-white">
            <StaggerText words={HEADLINE} emClassName="text-brand-light" />
          </h1>
          <p className="mt-6 max-w-[54ch] text-pretty text-base leading-relaxed text-white/75 md:text-lg">
            {COPY.hero.support}
          </p>
          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row">
            <MagneticCta>
              <Link href="/contact" className={primaryCta}>
                {COPY.hero.primaryCta} <span aria-hidden="true">→</span>
              </Link>
            </MagneticCta>
            <ArrowLink href="/portfolio" className="text-sm uppercase tracking-[0.12em] text-white/80 hover:text-white">
              {COPY.hero.secondaryCta}
            </ArrowLink>
          </div>
        </div>

        <ProgressiveBlur position="bottom" color="#0a0a0a" height="220px" className="z-[5]" />

        <Marquee items={COPY.marquee} className="z-20 border-t border-white/10 py-4" />
      </section>

      <section className="bg-bg py-24 text-ink md:py-36" aria-labelledby="services-heading">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal>
            <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
              <h2
                id="services-heading"
                className="display text-4xl leading-[1.05] tracking-[-0.01em] md:col-span-7 md:text-6xl"
              >
                {COPY.whatWeDo.heading}
              </h2>
              <p className="max-w-[46ch] text-base leading-relaxed text-muted md:col-span-5 md:text-lg">
                {COPY.whatWeDo.body}
              </p>
            </div>
          </Reveal>
          <div className="space-y-16">
            {stages.map((stage) => (
              <div key={stage.heading} className="grid gap-4 md:grid-cols-12 md:gap-8">
                <h3 className="display text-xl text-muted md:col-span-2 md:pt-9 md:text-2xl">
                  {stage.heading}
                </h3>
                <ImageRevealList items={stage.rows} className="md:col-span-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0a0a] py-28 text-white md:py-36">
        <ShaderBackground src="connectivity" className="opacity-30" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
          <ScrollRevealText
            text="One accountable team across strategy, design, and engineering."
            className="display text-4xl font-light leading-[1.1] tracking-[-0.01em] md:text-7xl"
          />
          <p className="mx-auto mt-8 max-w-[52ch] text-base leading-relaxed text-white/75 md:text-lg">
            No hand-offs, no translation loss, no surprises at launch.
          </p>
          <p className="mx-auto mt-12 max-w-[60ch] border-t border-white/10 pt-8 text-sm leading-relaxed text-white/70 md:text-base">
            <span className="font-medium text-brand-light">{COPY.erpNote.lead}</span> {COPY.erpNote.body}{" "}
            <ArrowLink href="/services/erp-implementation" className="text-white">
              {COPY.erpNote.link}
            </ArrowLink>
          </p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] pb-24 text-white md:pb-32" aria-labelledby="work-heading">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-16">
            <h2 id="work-heading" className="display text-4xl leading-[1.05] md:text-6xl">
              {COPY.proof.heading}
            </h2>
            <ArrowLink href="/portfolio" className="text-sm uppercase tracking-[0.12em] text-white/80 hover:text-white">
              {COPY.proof.allWork}
            </ArrowLink>
          </div>
          {showCards ? (
            <StickyStack
              cards={featured.map((study, i) => (
                <CaseStudyCard key={study.slug} study={study} index={i} total={featured.length} />
              ))}
            />
          ) : projects.length > 0 ? (
            <div className="mt-10">
              <HomeProof projects={projects} />
            </div>
          ) : (
            <p className="mt-10 max-w-[52ch] text-base leading-relaxed text-white/75 md:text-lg">
              {PORTFOLIO.caseStudies.empty}
            </p>
          )}
        </div>
      </section>

      <section className="bg-bg py-24 text-ink md:py-32" aria-labelledby="numbers-heading">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 id="numbers-heading" className="display text-3xl leading-[1.05] md:text-5xl">
              {COPY.numbers.heading}
            </h2>
            <p className="text-sm text-muted">{COPY.numbers.note}</p>
          </div>
          <ul className="grid grid-cols-2 border-t border-line md:grid-cols-4">
            {COPY.numbers.stats.map((stat) => {
              const body = (
                <>
                  <span className="display text-5xl tracking-[-0.02em] md:text-7xl">
                    <StatsCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-4 text-sm font-medium">{stat.label}</span>
                  <span className="mt-1 text-sm text-muted">{stat.sub}</span>
                </>
              );
              return (
                <li
                  key={stat.label}
                  className="border-b border-line py-8 pr-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
                >
                  {"href" in stat && stat.href ? (
                    <Link
                      href={stat.href}
                      className="group flex flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      {body}
                      <span className="mt-3 text-sm text-ink underline-offset-4 group-hover:underline">
                        Read the references&nbsp;<span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  ) : (
                    <div className="flex flex-col">{body}</div>
                  )}
                </li>
              );
            })}
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
