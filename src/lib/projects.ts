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
  /** False when an Arabic reader is seeing English text because no Arabic
   *  entry (or none with a summary) exists yet. Always true for English. */
  translated: boolean;
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

type Raw = Partial<Omit<Project, "slug" | "locale" | "translated" | "serviceTags">>;

const DIR = join(process.cwd(), "src", "content", "projects");

const SUFFIX = /\.(en|ar)\.json$/;

function readJson(dir: string, file: string): Raw | undefined {
  const path = join(dir, file);
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as Raw) : undefined;
}

const filled = (s: unknown): s is string => typeof s === "string" && s.trim().length > 0;

// Text fields come from the locale file when it has them; everything else
// (flags, order, images, URLs) is shared and read from the English file. The
// CMS writes shared fields into both files, so either source is fine.
function merge(en: Raw, loc: Raw | undefined): Raw {
  if (!loc) return en;
  return {
    ...en,
    title: filled(loc.title) ? loc.title : en.title,
    industry: filled(loc.industry) ? loc.industry : en.industry,
    location: filled(loc.location) ? loc.location : en.location,
    tags: loc.tags?.some(filled) ? loc.tags.filter(filled) : en.tags,
    summary: filled(loc.summary) ? loc.summary : en.summary,
    body: filled(loc.body) ? loc.body : en.body,
    coverAlt: filled(loc.coverAlt) ? loc.coverAlt : en.coverAlt,
    results: (en.results ?? []).map((r, i) => {
      const label = loc.results?.[i]?.label;
      return filled(label) ? { ...r, label } : r;
    }),
    gallery: (en.gallery ?? []).map((g, i) => {
      const alt = loc.gallery?.[i]?.alt;
      return filled(alt) ? { ...g, alt } : g;
    }),
  };
}

function build(slug: string, locale: Locale, en: Raw, loc: Raw | undefined): Project {
  const data = locale === "en" ? en : merge(en, loc);
  // The CMS omits empty optional fields, so every field gets a default here.
  return {
    slug,
    locale,
    translated: locale === "en" || filled(loc?.summary),
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
