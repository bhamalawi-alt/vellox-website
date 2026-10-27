// Portfolio projects live as one JSON file each in src/content/projects/,
// edited through the CMS at /admin (public/admin/config.yml). They are read at
// build time, so a CMS save triggers a Cloudflare rebuild and goes live with it.
// The file name is the project's URL slug: aurelia-wellness.json → /portfolio/aurelia-wellness.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type ProjectImage = { image: string; alt: string };
export type ProjectResult = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  order: number;
  published: boolean;
  featured: boolean;
  industry: string;
  location: string;
  year: string;
  tags: string[];
  summary: string;
  body: string;
  results: ProjectResult[];
  cover: string;
  coverAlt: string;
  gallery: ProjectImage[];
  liveUrl: string;
};

const DIR = join(process.cwd(), "src", "content", "projects");

function read(file: string): Project {
  const data = JSON.parse(readFileSync(join(DIR, file), "utf8")) as Partial<Project>;
  // The CMS omits empty optional fields, so every field gets a default here.
  return {
    slug: file.replace(/\.json$/, ""),
    title: data.title ?? "Untitled project",
    order: data.order ?? 999,
    published: data.published ?? true,
    featured: data.featured ?? false,
    industry: data.industry ?? "",
    location: data.location ?? "",
    year: data.year ?? "",
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    body: data.body ?? "",
    results: (data.results ?? []).filter((r) => r.value && r.label),
    cover: data.cover ?? "",
    coverAlt: data.coverAlt ?? "",
    gallery: (data.gallery ?? []).filter((g) => g.image),
    liveUrl: data.liveUrl ?? "",
  };
}

/** Published projects, ordered by their `order` field, then title. */
export function getProjects(): Project[] {
  return readdirSync(DIR)
    .filter((file) => file.endsWith(".json"))
    .map(read)
    .filter((p) => p.published)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/** Projects marked "Show on home page", in the same order. */
export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
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
    (p) => p.cover && p.tags.some((t) => wanted.some((w) => t.toLowerCase().includes(w))),
  );
  return match?.cover;
}
