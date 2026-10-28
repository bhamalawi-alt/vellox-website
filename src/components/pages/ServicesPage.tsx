import type { Metadata } from "next";
import { PageHero } from "../PageHero";
import { ImageRevealList } from "../ui/image-reveal-list";
import { servicesIndexCopy } from "../../content/pages";
import { getServices } from "../../content/services";
import { getUi } from "../../content/ui";
import { arrow, localePath, type Locale } from "../../lib/i18n";
import { pageMeta } from "../../lib/seo";

const SUB_SERVICE_PREVIEW = 3;

export function servicesMetadata(locale: Locale): Metadata {
  const copy = servicesIndexCopy(locale);
  return pageMeta({ title: copy.metaTitle, description: copy.lede, path: "/services", locale });
}

export function ServicesPage({ locale }: { locale: Locale }) {
  const COPY = servicesIndexCopy(locale);
  const ui = getUi(locale);
  const rows = getServices(locale).map((service) => {
    const preview = service.included
      .slice(0, SUB_SERVICE_PREVIEW)
      .map((item) => item.split(" — ")[0].split(": ")[0])
      .join(locale === "ar" ? "، " : ", ");
    return {
      id: service.slug,
      number: String(service.index).padStart(2, "0"),
      title: service.title,
      description: `${service.tagline}${ui.includes(preview, service.included.length > SUB_SERVICE_PREVIEW)}`,
      meta: service.count,
      href: localePath(locale, `/services/${service.slug}`),
    };
  });
  return (
    <>
      <PageHero eyebrow={COPY.eyebrow} title={COPY.headline} lede={COPY.lede} shader="interface" />
      <section className="bg-bg py-20 text-ink md:py-28" aria-labelledby="services-list">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 id="services-list" className="sr-only">
            {ui.allPracticeAreas}
          </h2>
          <ImageRevealList items={rows} arrow={arrow(locale)} />
        </div>
      </section>
    </>
  );
}
