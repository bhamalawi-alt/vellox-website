// scripts/verify.mjs — crawl out/, assert routes in both languages, OG tags,
// hreflang pairs, no sourcemaps, and the Formspree endpoint warning.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const BASE = "https://www.velloxstudio.com";
const PROJECTS = readdirSync("src/content/projects")
  .filter((f) => f.endsWith(".en.json"))
  .map((f) => `/portfolio/${f.replace(/\.en\.json$/, "")}`);
const ROUTES = [
  "/", "/about", "/contact", "/portfolio", "/insights", "/services",
  "/services/brand-strategy", "/services/brand-identity",
  "/services/user-experience-design", "/services/visual-content",
  "/services/web-development", "/services/ecommerce",
  "/services/web-mobile-applications", "/services/erp-implementation",
  "/privacy", "/terms",
  ...PROJECTS,
];
// Mirrors ARABIC_LIVE in src/lib/i18n.ts without importing TypeScript.
const ARABIC_LIVE = /export const ARABIC_LIVE = true/.test(readFileSync("src/lib/i18n.ts", "utf8"));
const arPath = (r) => (r === "/" ? "/ar" : `/ar${r}`);
const AR_ROUTES = ROUTES.map(arPath);

let failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };
const htmlFor = (route) => {
  const file = join(OUT, route === "/" ? "index.html" : route.replace(/\/$/, "") + ".html");
  const alt = join(OUT, route, "index.html");
  const path = existsSync(file) ? file : alt;
  return existsSync(path) ? readFileSync(path, "utf8") : null;
};
// Next drops the trailing slash from the root URL, so compare without it.
const norm = (u) => (u ? u.replace(/\/$/, "") : u);
const hreflang = (html, lang) => {
  const m = html.match(new RegExp(`<link rel="alternate" hrefLang="${lang}" href="([^"]+)"`));
  return m ? norm(m[1]) : null;
};

for (const route of ROUTES) {
  const html = htmlFor(route);
  check(html !== null, `missing route artifact: ${route}`);
  if (html === null) continue;
  check(html.includes('property="og:image"'), `${route}: missing og:image`);
  check(html.includes('rel="canonical"'), `${route}: missing canonical`);
  check(/<title>[^<]{10,}<\/title>/.test(html), `${route}: bad title`);
  check(/<html[^>]*lang="en"/.test(html), `${route}: html lang is not en`);
  if (ARABIC_LIVE) {
    check(hreflang(html, "ar") === norm(BASE + arPath(route)), `${route}: hreflang ar should point at ${arPath(route)}`);
    check(hreflang(html, "x-default") === norm(BASE + route), `${route}: hreflang x-default should point at itself`);
    check(html.includes('lang="ar" hrefLang="ar"'), `${route}: language switch missing`);
  } else {
    check(hreflang(html, "ar") === null, `${route}: hreflang present while ARABIC_LIVE is off`);
    check(!html.includes('lang="ar" hrefLang="ar"'), `${route}: language switch present while ARABIC_LIVE is off`);
  }
}

for (const route of AR_ROUTES) {
  const html = htmlFor(route);
  check(html !== null, `missing Arabic route artifact: ${route}`);
  if (html === null) continue;
  check(/<html[^>]*lang="ar"[^>]*dir="rtl"/.test(html), `${route}: html must be lang="ar" dir="rtl"`);
  check(html.includes(`rel="canonical" href="${BASE}${route}"`), `${route}: canonical should be ${route}`);
  check(/<title>[^<]*[؀-ۿ][^<]*<\/title>/.test(html), `${route}: title has no Arabic`);
  const en = route === "/ar" ? "/" : route.slice(3);
  if (ARABIC_LIVE) {
    check(hreflang(html, "en") === norm(BASE + en), `${route}: hreflang en should point at ${en}`);
    check(!/<meta name="robots" content="noindex/.test(html), `${route}: noindex while ARABIC_LIVE is on`);
  } else {
    check(/<meta name="robots" content="noindex/.test(html), `${route}: should be noindex while ARABIC_LIVE is off`);
  }
}

check(existsSync(join(OUT, "_next", "static")), "static export missing _next assets");
const maps = [];
(function walk(dir) { for (const e of readdirSync(dir, { withFileTypes: true })) { const p = join(dir, e.name); if (e.isDirectory()) walk(p); else if (p.endsWith(".map")) maps.push(p); } })(OUT);
check(maps.length === 0, `source maps shipped: ${maps.slice(0, 3).join(", ")}`);

check(existsSync(join(OUT, "sitemap.xml")), "missing sitemap.xml");
if (existsSync(join(OUT, "sitemap.xml"))) {
  const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  for (const route of AR_ROUTES) {
    const listed = sitemap.includes(`<loc>${BASE}${route}</loc>`);
    check(listed === ARABIC_LIVE, `sitemap: ${route} ${ARABIC_LIVE ? "missing" : "listed while ARABIC_LIVE is off"}`);
  }
}

check(existsSync(join(OUT, "404.html")) && readFileSync(join(OUT, "404.html"), "utf8").includes('dir="rtl"'), "404.html is not bilingual");

// The contact form is the only conversion path; warn loudly when the build has
// no Formspree endpoint (set NEXT_PUBLIC_FORMSPREE_ID in the hosting env).
const chunks = join(OUT, "_next", "static", "chunks");
const formWired = readdirSync(chunks).some((f) => f.endsWith(".js") && /formspree\.io\/f\/[A-Za-z0-9]+/.test(readFileSync(join(chunks, f), "utf8")));
if (!formWired) console.warn("WARNING: contact form has no Formspree endpoint — set NEXT_PUBLIC_FORMSPREE_ID before deploying.");
if (failures.length) { console.error("FAIL:\n" + failures.join("\n")); process.exit(1); }
console.log(`OK: ${ROUTES.length + AR_ROUTES.length} routes verified (en+ar, ARABIC_LIVE=${ARABIC_LIVE})`);
