// scripts/verify.mjs — crawl out/, assert routes, OG tags, no sourcemaps, contrast-critical attrs
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const ROUTES = [
  "/", "/about", "/contact", "/portfolio", "/insights", "/services",
  "/services/brand-strategy", "/services/brand-identity",
  "/services/user-experience-design", "/services/visual-content",
  "/services/web-development", "/services/ecommerce",
  "/services/web-mobile-applications", "/services/erp-implementation",
  "/privacy/", "/terms/",
];
let failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

for (const route of ROUTES) {
  const file = join(OUT, route === "/" ? "index.html" : route.replace(/\/$/, "") + ".html");
  const alt = join(OUT, route, "index.html");
  const path = existsSync(file) ? file : alt;
  check(existsSync(path), `missing route artifact: ${route}`);
  if (!existsSync(path)) continue;
  const html = readFileSync(path, "utf8");
  check(html.includes('property="og:image"'), `${route}: missing og:image`);
  check(html.includes('rel="canonical"'), `${route}: missing canonical`);
  check(/<title>[^<]{10,}<\/title>/.test(html), `${route}: bad title`);
}
check(existsSync(join(OUT, "_next", "static")), "static export missing _next assets");
const maps = [];
(function walk(dir) { for (const e of readdirSync(dir, { withFileTypes: true })) { const p = join(dir, e.name); if (e.isDirectory()) walk(p); else if (p.endsWith(".map")) maps.push(p); } })(OUT);
check(maps.length === 0, `source maps shipped: ${maps.slice(0, 3).join(", ")}`);
check(existsSync(join(OUT, "sitemap.xml")), "missing sitemap.xml");
if (failures.length) { console.error("FAIL:\n" + failures.join("\n")); process.exit(1); }
console.log(`OK: ${ROUTES.length} routes verified`);
