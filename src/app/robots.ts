import type { MetadataRoute } from "next";
import { BASE } from "../lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
