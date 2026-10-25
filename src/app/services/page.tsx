import type { Metadata } from "next";
import { PageHero } from "../../components/PageHero";
import { ImageRevealList } from "../../components/ui/image-reveal-list";
import { COPY } from "../../content/pages/services-index";
import { SERVICES } from "../../content/services";
import { pageMeta } from "../../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Services — Vellox Studio",
  description: COPY.lede,
  path: "/services",
});

const SUB_SERVICE_PREVIEW = 3;

const ROWS = SERVICES.map((service, i) => ({
  id: service.slug,
  number: String(service.index).padStart(2, "0"),
  title: service.title,
  description: `${service.tagline} Includes ${service.included
    .slice(0, SUB_SERVICE_PREVIEW)
    .join(", ")}, and more.`,
  meta: service.count,
  image: `/work/work-${String((i % 12) + 1).padStart(2, "0")}.jpg`,
  href: `/services/${service.slug}`,
}));

export default function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow={COPY.eyebrow}
        title={COPY.headline}
        lede={COPY.lede}
        shader="interface"
      />
      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <ImageRevealList items={ROWS} />
        </div>
      </section>
    </>
  );
}
