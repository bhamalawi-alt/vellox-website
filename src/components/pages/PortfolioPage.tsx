import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyCard } from "../CaseStudyCard";
import { PageHero } from "../PageHero";
import { ParallaxGallery } from "../ui/parallax-gallery";
import { StickyStack } from "../ui/sticky-stack";
import { portfolioCopy } from "../../content/pages";
import { getSite } from "../../content/site";
import { getUi } from "../../content/ui";
import { getProjects } from "../../lib/projects";
import { arrow, localePath, type Locale } from "../../lib/i18n";
import { pageMeta } from "../../lib/seo";
import { primaryCtaSoft } from "./shared";

const GALLERY_TILES = 12;

export function portfolioMetadata(locale: Locale): Metadata {
  const copy = portfolioCopy(locale);
  return pageMeta({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: "/portfolio",
    locale,
  });
}

// Gallery images come from every project's gallery in the CMS. Until there
// are enough, the rest of the 12 tiles are branded placeholders.
function galleryImages(projects: ReturnType<typeof getProjects>) {
  const images = projects.flatMap((p) =>
    p.gallery.map((g) => ({ src: g.image, alt: g.alt || p.title })),
  );
  if (images.length >= GALLERY_TILES) return images;
  return [
    ...images,
    ...Array.from({ length: GALLERY_TILES - images.length }, () => ({ alt: "" })),
  ];
}

export function PortfolioPage({ locale }: { locale: Locale }) {
  const COPY = portfolioCopy(locale);
  const ui = getUi(locale);
  const site = getSite(locale);
  const projects = getProjects(locale);
  const gallery = galleryImages(projects);
  const hasPhotos = projects.some((p) => p.gallery.length > 0);
  return (
    <>
      <PageHero eyebrow={COPY.eyebrow} title={COPY.headline} lede={COPY.lede} />

      {projects.length > 0 ? (
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
              cards={projects.map((study, i) => (
                <CaseStudyCard key={study.slug} study={study} index={i} total={projects.length} locale={locale} />
              ))}
            />
          </div>
        </section>
      ) : null}

      <section className="bg-[#0a0a0a] text-white" aria-labelledby="gallery-heading">
        <div className="mx-auto w-full max-w-6xl px-6 pb-12">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/60">
            {COPY.gallery.eyebrow}
          </p>
          <h2 id="gallery-heading" className="display max-w-[24ch] text-3xl leading-[1.1] md:text-5xl">
            {hasPhotos ? COPY.gallery.captionWithPhotos : COPY.gallery.caption}
          </h2>
        </div>
        <ParallaxGallery images={gallery} />
      </section>

      <section className="bg-panel py-24 text-center text-white md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 className="display text-4xl leading-[1.05] md:text-6xl">{ui.haveProjectInMind}</h2>
          <p className="mx-auto mb-12 mt-6 max-w-[56ch] text-base leading-relaxed text-white/75 md:text-lg">
            {COPY.gallery.sub}
          </p>
          <Link href={localePath(locale, "/contact")} className={primaryCtaSoft}>
            {site.CTA_ITEM.label} <span aria-hidden="true">{arrow(locale)}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
