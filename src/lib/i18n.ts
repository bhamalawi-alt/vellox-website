// Locale plumbing for the bilingual site. English lives at the root URLs and
// Arabic at /ar + the same path, so every helper here works on locale-less
// paths and adds or strips that one prefix. No React: used from server
// components, client components, scripts and metadata alike.

export type Locale = "en" | "ar";

export const LOCALES: readonly Locale[] = ["en", "ar"];
export const DEFAULT_LOCALE: Locale = "en";

// Turning this off keeps the Arabic pages built and reachable by URL but
// unannounced: no language switch, no hreflang, no sitemap entries, and a
// noindex on the Arabic layout. Flip it back on once the copy is proofread.
export const ARABIC_LIVE = true;

const PREFIX = "/ar";

export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

export function arrow(locale: Locale): "→" | "←" {
  return locale === "ar" ? "←" : "→";
}

export function pick<T>(locale: Locale, en: T, ar: T): T {
  return locale === "ar" ? ar : en;
}

/** `/about` → `/ar/about` for Arabic; English and non-path hrefs unchanged. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en" || !path.startsWith("/")) return path;
  if (path === PREFIX || path.startsWith(`${PREFIX}/`)) return path;
  return path === "/" ? PREFIX : `${PREFIX}${path}`;
}

/** Splits a pathname into its locale and the locale-less path. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  if (pathname === PREFIX || pathname === `${PREFIX}/`) return { locale: "ar", path: "/" };
  if (pathname.startsWith(`${PREFIX}/`)) return { locale: "ar", path: pathname.slice(PREFIX.length) };
  return { locale: "en", path: pathname };
}

/** The same page in the other language, for the language switch. */
export function alternatePath(pathname: string): { locale: Locale; href: string } {
  const { locale, path } = stripLocale(pathname);
  const target = otherLocale(locale);
  return { locale: target, href: localePath(target, path) };
}
