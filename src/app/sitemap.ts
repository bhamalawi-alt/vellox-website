import type { MetadataRoute } from "next";
import { BASE } from "../lib/seo";
import { ARABIC_LIVE, localePath } from "../lib/i18n";
import { SERVICES } from "../content/services";
import { ARTICLE_SLUGS } from "../content/articles";
import { getProjects } from "../lib/projects";

export const dynamic = "force-static";

type Entry = { path: string; priority: number };

// No lastModified: a build timestamp on every URL tells crawlers nothing.
// While the Arabic site is live every English URL lists its Arabic twin as an
// alternate and the Arabic URLs are listed too; otherwise only English.
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...SERVICES.map((service) => ({ path: `/services/${service.slug}`, priority: 0.9 })),
    ...getProjects("en").map((project) => ({ path: `/portfolio/${project.slug}`, priority: 0.8 })),
    ...["/about", "/contact", "/portfolio", "/insights"].map((path) => ({ path, priority: 0.7 })),
    ...ARTICLE_SLUGS.map((slug) => ({ path: `/insights/${slug}`, priority: 0.7 })),
    ...["/privacy", "/terms"].map((path) => ({ path, priority: 0.3 })),
  ];

  const alternates = (path: string) =>
    ARABIC_LIVE
      ? { languages: { en: BASE + path, ar: BASE + localePath("ar", path) } }
      : undefined;

  const en = entries.map((e) => ({
    url: BASE + e.path,
    priority: e.priority,
    alternates: alternates(e.path),
  }));
  if (!ARABIC_LIVE) return en;
  const ar = entries.map((e) => ({
    url: BASE + localePath("ar", e.path),
    priority: e.priority,
    alternates: alternates(e.path),
  }));
  return [...en, ...ar];
}
