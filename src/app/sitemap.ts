import type { MetadataRoute } from "next";
import { BASE } from "../lib/seo";
import { SERVICES } from "../content/services";

export const dynamic = "force-static";

// No lastModified: a build timestamp on every URL tells crawlers nothing.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/services`, priority: 0.9 },
    ...SERVICES.map((service) => ({
      url: `${BASE}/services/${service.slug}`,
      priority: 0.9,
    })),
    ...["/about", "/contact", "/portfolio", "/insights"].map((path) => ({
      url: `${BASE}${path}`,
      priority: 0.7,
    })),
    ...["/privacy", "/terms"].map((path) => ({
      url: `${BASE}${path}`,
      priority: 0.3,
    })),
  ];
}
