import type { Metadata } from "next";

export const BASE = "https://www.velloxstudio.com";

export function pageMeta(o: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = BASE + o.path;
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url },
    openGraph: {
      title: o.title,
      description: o.description,
      url,
      siteName: "Vellox Studio",
      locale: "en_US",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Vellox Studio" }],
    },
    twitter: { card: "summary_large_image" },
  };
}
