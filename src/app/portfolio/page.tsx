import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { PageHero } from "../../components/PageHero";
import { ParallaxGallery } from "../../components/ui/parallax-gallery";
import { StickyStack } from "../../components/ui/sticky-stack";
import { COPY } from "../../content/pages/portfolio";
import { pageMeta } from "../../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Portfolio — Vellox Studio",
  description: COPY.lede,
  path: "/portfolio",
});

// Placeholder tiles until project photography is uploaded; add { src, alt }
// entries here (or through the CMS) to replace them.
const GALLERY = Array.from({ length: 12 }, () => ({ alt: "" }));

export default function Portfolio() {
  return (
    <>
      <PageHero eyebrow={COPY.eyebrow} title={COPY.headline} lede={COPY.lede} />

      <section className="bg-[#0a0a0a] pb-24 text-white md:pb-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-16">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                {COPY.caseStudies.eyebrow}
              </p>
              <h2 className="display text-4xl leading-[1.05] md:text-6xl">
                {COPY.caseStudies.caption}
              </h2>
            </div>
          </div>
          <StickyStack
            cards={COPY.projects.map((study, i) => (
              <CaseStudyCard key={study.title} study={study} tone={i} />
            ))}
          />
        </div>
      </section>

      <section className="bg-[#0a0a0a] text-white" aria-labelledby="gallery-heading">
        <div className="mx-auto w-full max-w-6xl px-6 pb-12">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/60">
            {COPY.gallery.eyebrow}
          </p>
          <h2 id="gallery-heading" className="display max-w-[24ch] text-3xl leading-[1.1] md:text-5xl">
            {COPY.gallery.caption}
          </h2>
        </div>
        <ParallaxGallery images={GALLERY} />
      </section>

      <section className="bg-panel py-24 text-center text-white md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 className="display text-4xl leading-[1.05] md:text-6xl">Have a project in mind?</h2>
          <p className="mx-auto mb-12 mt-6 max-w-[56ch] text-base leading-relaxed text-white/75 md:text-lg">
            {COPY.gallery.sub}
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center gap-3 rounded-full bg-white px-7 text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Start a Project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
