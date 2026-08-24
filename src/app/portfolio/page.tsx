import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COPY } from "../../content/pages/portfolio";
import { pageMeta } from "../../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Portfolio — Vellox Studio",
  description: COPY.lede,
  path: "/portfolio",
});

const GALLERY = [
  {
    src: "/work/work-01.jpg",
    alt: "Couple cooking with red enamel cookware in a bright kitchen",
  },
  {
    src: "/work/work-02.jpg",
    alt: "Matte white coffee bag with a house blend label from a specialty roaster",
  },
  {
    src: "/work/work-03.jpg",
    alt: "Dark product analytics dashboard showing bounce rate and session charts",
  },
  {
    src: "/work/work-04.jpg",
    alt: "Printed brand color palettes beside a tablet with color studies",
  },
  {
    src: "/work/work-05.jpg",
    alt: "Bride and groom walking hand in hand under a palm tree at dusk",
  },
  {
    src: "/work/work-06.jpg",
    alt: "Minimal office interior with black-framed glass partitions and pendant lights",
  },
  {
    src: "/work/work-07.jpg",
    alt: "Hands gesturing during a product workshop beside a laptop with interface drafts",
  },
  {
    src: "/work/work-08.jpg",
    alt: "Engineer carrying a laptop along a glass corridor beside server racks",
  },
  {
    src: "/work/work-09.jpg",
    alt: "Two engineers working at laptops in a bright studio office",
  },
  {
    src: "/work/work-10.jpg",
    alt: "Tablet showing a sketched serif letterform beside an open red typography manual",
  },
  {
    src: "/work/work-11.jpg",
    alt: "Hands typing on a laptop previewing responsive website templates",
  },
  {
    src: "/work/work-12.jpg",
    alt: "White body lotion tube resting on soft linen, minimal wellness packaging",
  },
];

const darkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const CASE_STUDIES = COPY.projects.map((project) => ({
  ...project,
  letter: project.title.charAt(0),
}));

export default function Portfolio() {
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
          <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-white/70 md:text-lg">
            {COPY.lede}
          </p>
        </div>
      </section>

      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-10 border-b border-line pb-8">
            <h2 className="display text-3xl leading-[1.1] md:text-4xl">
              {COPY.gallery.eyebrow}
            </h2>
            <p className="mt-3 text-sm text-muted">{COPY.gallery.caption}</p>
          </div>

          <ul
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
            aria-label={COPY.gallery.eyebrow}
          >
            {GALLERY.map((photo) => (
              <li
                key={photo.src}
                className="group relative aspect-square overflow-hidden rounded-xl bg-line"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={800}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-sm text-muted">
            {COPY.gallery.sub}
          </p>
        </div>
      </section>

      <section className="bg-panel py-20 text-bg md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 border-b border-white/10 pb-8">
            <h2 className="display text-3xl leading-[1.1] md:text-4xl">
              {COPY.caseStudies.eyebrow}
            </h2>
            <p className="mt-3 text-sm text-white/70">
              {COPY.caseStudies.caption}
            </p>
          </div>

          <ul
            className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-3"
            aria-label={COPY.caseStudies.eyebrow}
          >
            {CASE_STUDIES.map((study) => (
              <li key={study.n} className="flex flex-col bg-panel p-6 md:p-8">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className="display text-6xl leading-none font-light text-white/90 md:text-7xl"
                  >
                    {study.letter}
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] text-white/60 tabular-nums">
                    {study.n}
                  </span>
                </div>
                <ul
                  className="mb-6 flex flex-wrap gap-2"
                  aria-label="Services delivered"
                >
                  {study.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/20 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-white/75"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <h3 className="display mb-3 text-2xl leading-tight md:text-3xl">
                  {study.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-white/70 md:text-[15px]">
                  {study.desc}
                </p>
                <dl className="mt-auto border-t border-white/10">
                  <div className="flex items-baseline justify-between gap-6 border-b border-white/10 py-3">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                      Location
                    </dt>
                    <dd className="text-right text-sm font-medium">
                      {study.location}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                      Industry
                    </dt>
                    <dd className="text-right text-sm font-medium">
                      {study.industry}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex justify-center">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white ${darkFocus}`}
            >
              Start a Project
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
