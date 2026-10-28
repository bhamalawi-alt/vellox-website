import type { Metadata } from "next";
import { ARABIC_LIVE, localePath, type Locale } from "./i18n";

export const BASE = "https://www.velloxstudio.com";

/**
 * Per-page metadata. `path` is the locale-less path (`/about`); the canonical
 * and og:url are built for the page's own language, and while ARABIC_LIVE is
 * on every page names its twin in the other language through hreflang.
 */
export function pageMeta(o: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
}): Metadata {
  const url = BASE + localePath(o.locale, o.path);
  const en = BASE + o.path;
  const ar = BASE + localePath("ar", o.path);
  return {
    title: o.title,
    description: o.description,
    alternates: {
      canonical: url,
      ...(ARABIC_LIVE ? { languages: { en, ar, "x-default": en } } : {}),
    },
    ...(o.locale === "ar" && !ARABIC_LIVE ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: o.title,
      description: o.description,
      url,
      siteName: "Vellox Studio",
      locale: o.locale === "ar" ? "ar" : "en_US",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Vellox Studio" }],
    },
    twitter: { card: "summary_large_image" },
  };
}
