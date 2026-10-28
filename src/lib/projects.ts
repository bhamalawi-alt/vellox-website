// Portfolio projects live as JSON files in src/content/projects/, one per
// project and language, edited through the CMS at /admin
// (public/admin/config.yml). They are read at build time, so a CMS save
// triggers a rebuild and goes live with it. The file name is the project's URL
// slug plus the locale: aurelia-wellness.en.json → /portfolio/aurelia-wellness,
// aurelia-wellness.ar.json → /ar/portfolio/aurelia-wellness.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { type Locale } from "./i18n";

export type ProjectImage = { image: string; alt: string };
export type ProjectResult = { value: string; label: string };

export type Project = {
  slug: string;
  locale: Locale;
  /** False when any visible text on an Arabic page fell back to English.
   *  Always true for English. */
  translated: boolean;
  /** Which text fields came from the English file (empty for English). Pages
   *  mark those spans lang="en" dir="ltr" and show the English-only note. */
  fallbackFields: FallbackField[];
  title: string;
  order: number;
  published: boolean;
  featured: boolean;
  industry: string;
  location: string;
  year: string;
  tags: string[];
  /** The English tags, whatever the locale: coverForService matches on them. */
  serviceTags: string[];
  summary: string;
  body: string;
  results: ProjectResult[];
  cover: string;
  coverAlt: string;
  gallery: ProjectImage[];
  liveUrl: string;
};

export type FallbackField =
  | "title" | "industry" | "location" | "tags" | "summary" | "body" | "results" | "coverAlt" | "gallery";

type Raw = Partial<Omit<Project, "slug" | "locale" | "translated" | "serviceTags" | "fallbackFields">>;

const DIR = join(process.cwd(), "src", "content", "projects");

const SUFFIX = /\.(en|ar)\.json$/;

function readJson(dir: string, file: string): Raw | undefined {
  const path = join(dir, file);
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as Raw) : undefined;
}

const filled = (s: unknown): s is string => typeof s === "string" && s.trim().length > 0;

// Text fields come from the locale file when it has them; everything else
// (flags, order, images, URLs) is shared and read from the English file. The
// CMS writes shared fields into both files, so either source is fine. Every
// text field that had English content but no translation is recorded.
function merge(en: Raw, loc: Raw | undefined): { data: Raw; fallback: FallbackField[] } {
  const fallback: FallbackField[] = [];
  const text = (field: FallbackField, enValue: string | undefined, locValue: string | undefined) => {
    if (filled(locValue)) return locValue;
    if (filled(enValue)) fallback.push(field);
    return enValue;
  };
  const tags = loc?.tags?.some(filled) ? loc.tags.filter(filled) : en.tags;
  if (!loc?.tags?.some(filled) && en.tags?.length) fallback.push("tags");
  const data: Raw = {
    ...en,
    title: text("title", en.title, loc?.title),
    industry: text("industry", en.industry, loc?.industry),
    location: text("location", en.location, loc?.location),
    tags,
    summary: text("summary", en.summary, loc?.summary),
    body: text("body", en.body, loc?.body),
    results: (en.results ?? []).map((r, i) => {
      const label = loc?.results?.[i]?.label;
      return filled(label) ? { ...r, label } : r;
    }),
    coverAlt: text("coverAlt", en.coverAlt, loc?.coverAlt),
    gallery: (en.gallery ?? []).map((g, i) => {
      const alt = loc?.gallery?.[i]?.alt;
      return filled(alt) ? { ...g, alt } : g;
    }),
  };
  if ((en.results ?? []).some((r, i) => filled(r.label) && !filled(loc?.results?.[i]?.label))) fallback.push("results");
  if ((en.gallery ?? []).some((g, i) => filled(g.alt) && !filled(loc?.gallery?.[i]?.alt))) fallback.push("gallery");
  const order: FallbackField[] = ["title", "industry", "location", "tags", "summary", "body", "results", "coverAlt", "gallery"];
  return { data, fallback: order.filter((f) => fallback.includes(f)) };
}

function build(slug: string, locale: Locale, en: Raw, loc: Raw | undefined): Project {
  const { data, fallback } = locale === "en" ? { data: en, fallback: [] } : merge(en, loc);
  // The CMS omits empty optional fields, so every field gets a default here.
  return {
    slug,
    locale,
    translated: fallback.length === 0,
    fallbackFields: fallback,
    title: data.title ?? "Untitled project",
    order: data.order ?? 999,
    published: en.published ?? true,
    featured: en.featured ?? false,
    industry: data.industry ?? "",
    location: data.location ?? "",
    year: en.year ?? "",
    tags: data.tags ?? [],
    serviceTags: en.tags ?? [],
    summary: data.summary ?? "",
    body: data.body ?? "",
    results: (data.results ?? []).filter((r) => r.value && r.label),
    cover: en.cover ?? "",
    coverAlt: data.coverAlt ?? "",
    gallery: (data.gallery ?? []).filter((g) => g.image),
    liveUrl: en.liveUrl ?? "",
  };
}

/** Published projects in `dir` for a locale, ordered by `order`, then title. */
export function readProjects(dir: string, locale: Locale): Project[] {
  return readdirSync(dir)
    .filter((file) => file.endsWith(".en.json"))
    .map((file) => {
      const slug = file.replace(SUFFIX, "");
      const en = readJson(dir, file) ?? {};
      const loc = locale === "en" ? undefined : readJson(dir, `${slug}.${locale}.json`);
      return build(slug, locale, en, loc);
    })
    .filter((p) => p.published)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getProjects(locale: Locale = "en"): Project[] {
  return readProjects(DIR, locale);
}

/** Projects marked "Show on home page", in the same order. */
export function getFeaturedProjects(locale: Locale = "en"): Project[] {
  return getProjects(locale).filter((p) => p.featured);
}

export function getProject(slug: string, locale: Locale = "en"): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}

/** Body text split into paragraphs on blank lines. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// Which CMS tags count as a sample of each service. The home page uses this to
// show a real project cover next to a service row as soon as one is uploaded.
const SERVICE_TAGS: Record<string, string[]> = {
  "brand-strategy": ["brand strategy", "positioning", "naming"],
  "brand-identity": ["brand identity", "logo", "identity", "packaging"],
  "user-experience-design": ["ux", "ui", "design system", "product design"],
  "visual-content": ["photography", "photo", "video", "packaging", "social"],
  "web-development": ["web design", "website", "web development", "web app"],
  ecommerce: ["ecommerce", "e-commerce", "shopify", "store"],
  "web-mobile-applications": ["mobile", "app", "ios", "android", "web app"],
  "erp-implementation": ["erp", "erpnext", "frappe"],
};

/** The cover of the first published project tagged with the service, if any. */
export function coverForService(slug: string, projects: Project[]): string | undefined {
  const wanted = SERVICE_TAGS[slug] ?? [];
  const match = projects.find(
    (p) => p.cover && p.serviceTags.some((t) => wanted.some((w) => t.toLowerCase().includes(w))),
  );
  return match?.cover;
}

/** `lang`/`dir` for a text field that fell back to English on an Arabic page,
 *  so the browser shapes and aligns it as English and screen readers switch voice. */
export function englishAttrs(project: Project, field: FallbackField): { lang?: string; dir?: "ltr" } {
  return project.fallbackFields.includes(field) ? { lang: "en", dir: "ltr" } : {};
}
