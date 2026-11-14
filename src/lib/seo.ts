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

// Google cuts descriptions at about 160 characters. Use the full text when it
// fits, otherwise the shorter fallback, trimmed at a word if it still runs over.
const DESCRIPTION_MAX = 160;

export function fitDescription(full: string, fallback: string): string {
  if (full.length <= DESCRIPTION_MAX) return full;
  if (fallback.length <= DESCRIPTION_MAX) return fallback;
  const cut = fallback.slice(0, DESCRIPTION_MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).trimEnd()}…`;
}

// Google cuts titles at about 60 characters.
const TITLE_MAX = 60;

/**
 * A project page title that says what the work was and for which sector, e.g.
 * "CROWD RACING: Brand Identity, Motorsport — Vellox Studio". The sector is
 * dropped when the title would be cut off, and a project with no tags keeps
 * the plain portfolio title.
 */
export function projectTitle(
  locale: Locale,
  project: { title: string; tags: string[]; industry: string },
  fallbackSuffix: string,
): string {
  const [tag] = project.tags;
  if (!tag) return `${project.title} — ${fallbackSuffix}`;
  const comma = locale === "ar" ? "، " : ", ";
  const short = `${project.title}: ${tag} — Vellox Studio`;
  const full = `${project.title}: ${tag}${comma}${project.industry} — Vellox Studio`;
  return project.industry && full.length <= TITLE_MAX ? full : short;
}

/**
 * Structured data for a top-level page (About, Services, Portfolio, Insights,
 * Contact): what kind of page it is, and its place under the home page.
 */
export function hubGraph(o: {
  locale: Locale;
  path: string;
  name: string;
  type: "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  const home = BASE + (o.locale === "ar" ? "/ar" : "/");
  const url = BASE + localePath(o.locale, o.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": o.type,
        name: o.name,
        url,
        inLanguage: o.locale,
        isPartOf: { "@id": `${home}#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Vellox Studio", item: o.locale === "ar" ? home : BASE },
          { "@type": "ListItem", position: 2, name: o.name, item: url },
        ],
      },
    ],
  };
}
