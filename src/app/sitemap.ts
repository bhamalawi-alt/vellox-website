import type { MetadataRoute } from "next";
import { BASE } from "../lib/seo";
import { SERVICES } from "../content/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${BASE}/`, lastModified, priority: 1 },
    {
      url: `${BASE}/services`,
      lastModified,
      priority: 0.9,
    },
    ...SERVICES.map((service) => ({
      url: `${BASE}/services/${service.slug}`,
      lastModified,
      priority: 0.9,
    })),
    ...["/about", "/contact", "/portfolio", "/insights"].map((path) => ({
      url: `${BASE}${path}`,
      lastModified,
      priority: 0.7,
    })),
    ...["/privacy/", "/terms/"].map((path) => ({
      url: `${BASE}${path}`,
      lastModified,
      priority: 0.7,
    })),
  ];
}
