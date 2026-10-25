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

// Replace these with real project photography as it becomes available.
const GALLERY = [
  { src: "/work/work-01.jpg", alt: "Couple cooking with red enamel cookware in a bright kitchen" },
  { src: "/work/work-02.jpg", alt: "Matte white coffee bag with a house blend label from a specialty roaster" },
  { src: "/work/work-03.jpg", alt: "Dark product analytics dashboard showing bounce rate and session charts" },
  { src: "/work/work-04.jpg", alt: "Printed brand color palettes beside a tablet with color studies" },
  { src: "/work/work-05.jpg", alt: "Bride and groom walking hand in hand under a palm tree at dusk" },
  { src: "/work/work-06.jpg", alt: "Minimal office interior with black-framed glass partitions and pendant lights" },
  { src: "/work/work-07.jpg", alt: "Hands gesturing during a product workshop beside a laptop with interface drafts" },
  { src: "/work/work-08.jpg", alt: "Engineer carrying a laptop along a glass corridor beside server racks" },
  { src: "/work/work-09.jpg", alt: "Two engineers working at laptops in a bright studio office" },
  { src: "/work/work-10.jpg", alt: "Tablet showing a sketched serif letterform beside an open red typography manual" },
  { src: "/work/work-11.jpg", alt: "Hands typing on a laptop previewing responsive website templates" },
  { src: "/work/work-12.jpg", alt: "White body lotion tube resting on soft linen, minimal wellness packaging" },
];

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
