import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OLD_SITE = path.resolve(ROOT, "..", "Vellox-website-2026");
const OUT_DIR = path.join(ROOT, "src", "content", "pages");

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  middot: "·",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
  copy: "©",
};

function decodeEntities(s) {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, body) => {
    if (body.startsWith("#x") || body.startsWith("#X")) {
      return String.fromCodePoint(parseInt(body.slice(2), 16));
    }
    if (body.startsWith("#")) {
      return String.fromCodePoint(parseInt(body.slice(1), 10));
    }
    return ENTITIES[body] ?? m;
  });
}

function readPage(relPath) {
  return readFileSync(path.join(OLD_SITE, relPath), "utf8");
}

function extractBlocks(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  let s = main
    .replace(/<(script|style|svg|template|video|source|noscript|canvas|textarea|iframe)[^>]*>[\s\S]*?<\/\1>/g, " ")
    .replace(/<(script|style|svg|template|video|source|noscript|canvas|textarea|iframe|input|img|br)[^>]*\/?>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(
      /<(?!\/?(?:h[1-6]|p|li|dt|dd|blockquote|button|label|span|figcaption|time)\b)[a-zA-Z!/][^>]*>/g,
      " "
    );

  const BLOCK =
    /<(h[1-6]|p|li|dt|dd|blockquote|button|label|span|figcaption|time)(?:\s[^>]*)?>([\s\S]*?)<\/\1\s*>/g;

  const out = [];
  let seen = "";
  for (const m of s.matchAll(BLOCK)) {
    const text = decodeEntities(m[2].replace(/<[^>]+>/g, " "))
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .trim();
    if (!text || /^[←→↑]+$/.test(text) || text === "Menu") continue;
    if (text === seen) continue;
    seen = text;
    out.push({ tag: m[1], text });
  }
  return out;
}

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  const open = Array.isArray(value) ? "[" : "{";
  const close = Array.isArray(value) ? "]" : "}";
  if (value.length === 0) return open + close;
  if (Array.isArray(value)) {
    return (
      open +
      "\n" +
      value.map((v) => padInner + serialize(v, indent + 1)).join(",\n") +
      ",\n" +
      pad +
      close
    );
  }
  return (
    open +
    "\n" +
    Object.entries(value)
      .map(([k, v]) => padInner + JSON.stringify(k) + ": " + serialize(v, indent + 1))
      .join(",\n") +
    ",\n" +
    pad +
    close
  );
}

function writeModule(name, copy) {
  const body = serialize(copy);
  const ts = `export const COPY = ${body};\n`;
  writeFileSync(path.join(OUT_DIR, name), ts);
  console.log(`wrote src/content/pages/${name}`);
}

const ARTIFACT_NUM = /^\d+$/;

function findIndex(blocks, re, from = 0) {
  return blocks.findIndex((b, i) => i >= from && re.test(b.text));
}

function sliceUntil(blocks, from, re) {
  if (from === -1) return [];
  let end = blocks.length;
  for (let i = from + 1; i < blocks.length; i++) {
    if (re.test(blocks[i].text)) {
      end = i;
      break;
    }
  }
  return blocks.slice(from + 1, end);
}

function collectTriples(blocks) {
  const items = [];
  for (let i = 0; i < blocks.length; ) {
    const numBlock = ARTIFACT_NUM.test(blocks[i].text) ? blocks[i++] : null;
    const title = blocks[i];
    if (!title) break;
    const isHeading = /^h[1-6]$/.test(title.tag);
    i++;
    const body = blocks[i] && !ARTIFACT_NUM.test(blocks[i].text) ? blocks[i++] : null;
    items.push({
      num: numBlock ? numBlock.text : String(items.length + 1).padStart(2, "0"),
      title: title.text,
      body: body ? body.text : "",
    });
    if (!isHeading && !numBlock) break;
  }
  return items;
}

const SERVICE_SLUGS = [
  "brand-strategy",
  "brand-identity",
  "user-experience-design",
  "visual-content",
  "web-development",
  "ecommerce",
  "web-mobile-applications",
];

function buildServiceDetail(slug, index) {
  const blocks = extractBlocks(readPage(`services/${slug}/index.html`));
  const h1 = blocks.findIndex((b) => b.tag === "h1");
  const title = blocks[h1].text;
  const tagline = blocks[h1 + 1].text;
  const introStart = h1 + 2;
  const includedIdx = findIndex(blocks, /sub-services covering/);
  const introBlocks = blocks
    .slice(introStart, includedIdx)
    .filter((b) => b.tag === "p" && b.text.length > 80);
  const includedHeading = blocks[includedIdx].text;
  const approachEyebrowIdx = findIndex(blocks, /^Our Approach$/, includedIdx);
  const includedItems = collectTriples(sliceUntil(blocks, includedIdx, /^Our Approach$/));
  const approachHeading = blocks[approachEyebrowIdx + 1].text;
  const relatedIdx = findIndex(blocks, /^Other Services$/, approachEyebrowIdx);
  const approachItems = collectTriples(sliceUntil(blocks, approachEyebrowIdx + 1, /^Other Services$/));
  const ctaIdx = findIndex(blocks, /^Ready to start .+engagement\?$/, relatedIdx);
  const cta = ctaIdx !== -1 ? [blocks[ctaIdx].text, blocks[ctaIdx + 1]?.text ?? ""] : ["", ""];

  return {
    breadcrumbLabel: "Services",
    title,
    index: String(index + 1).padStart(2, "0"),
    tagline,
    intro: introBlocks.map((b) => b.text),
    includedHeading,
    included: includedItems,
    approach: {
      heading: approachHeading,
      steps: approachItems,
    },
    related: {
      heading: "Other Services",
      sub: blocks[findIndex(blocks, /^Explore related practice areas\.$/, relatedIdx)]?.text ?? "",
    },
    cta: {
      heading: cta[0],
      body: cta[1],
    },
  };
}

function chunkData() {
  const chunkFile = "_next/static/chunks/863f9102e56bdc4b.js";
  let raw = "";
  try {
    raw = readFileSync(path.join(OLD_SITE, chunkFile), "utf8");
  } catch {
    return {};
  }
  function seg(key) {
    const i = raw.indexOf(`"${key}"`);
    if (i === -1) return "";
    const nextKeys = ["PRINCIPLES", "PROJECTS", "STATS", "TESTIMONIALS"]
      .map((k) => raw.indexOf(`"${k}"`, i + 1))
      .filter((j) => j > i);
    const end = nextKeys.length ? Math.min(...nextKeys) : Math.min(raw.length, i + 40000);
    return raw.slice(i, end);
  }
  function unescapeJs(s) {
    try {
      return JSON.parse(`"${s}"`);
    } catch {
      return s.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
  }
  const principles = [...seg("PRINCIPLES").matchAll(/\{num:"(\d+)",title:"([^"]+)",body:"((?:[^"\\]|\\.)*)"\}/g)].map(
    (m) => ({ num: m[1], title: m[2], body: unescapeJs(m[3]) })
  );
  const stats = [
    ...seg("STATS").matchAll(/\{value:(\d+),suffix:"([^"]*)",label:"([^"]+)",sub:"((?:[^"\\]|\\.)*)"\}/g),
  ].map((m) => ({ value: Number(m[1]), suffix: m[2], label: m[3], sub: unescapeJs(m[4]) }));
  const testimonials = [
    ...seg("TESTIMONIALS").matchAll(
      /\{quote:"((?:[^"\\]|\\.)*?)",name:"([^"]+)",role:"([^"]*)",company:"([^"]*)",initials:"([^"]*)"\}/g
    ),
  ].map((m) => ({
    quote: unescapeJs(m[1]),
    name: m[2],
    role: m[3],
    company: m[4],
    initials: m[5],
  }));
  const projects = [
    ...seg("PROJECTS").matchAll(
      /\{n:"(\d+ \/ \d+)",tags:\[([^\]]*)\],title:"([^"]+)",desc:"((?:[^"\\]|\\.)*)",location:"([^"]*)",industry:"([^"]*)"\}/g
    ),
  ].map((m) => ({
    n: m[1],
    tags: m[2].split(",").map((t) => t.trim().replace(/^"|"$/g, "")),
    title: m[3],
    desc: unescapeJs(m[4]),
    location: m[5],
    industry: m[6],
  }));
  return { principles, stats, testimonials, projects };
}

function buildHome() {
  const blocks = extractBlocks(readPage("index.html"));
  const marqueeNames = [
    "Brand Strategy",
    "Identity Design",
    "UX / UI",
    "Web Development",
    " eCommerce",
    "Mobile Apps",
    "Visual Content",
  ].map((s) => s.trim());
  const marquee = marqueeNames.filter((n) => blocks.some((b) => b.text === n));
  const whatWeDoIdx = findIndex(blocks, /^What We Do$/);
  const ctaBandIdx = findIndex(blocks, /^Ready to get started\?$/);

  return {
    hero: {
      metaLeft: "Est. 2019 — Remote / On-site",
      metaRight: "2026",
      eyebrow: blocks.find((b) => b.text === "Business Development Studio")?.text ?? "",
      headline: blocks.find((b) =>
        b.text.startsWith("We build brands and platforms for")
      )?.text,
      support: blocks.find((b) =>
        b.text.startsWith("One accountable team across strategy")
      )?.text,
      primaryCta: "Start a Project",
      secondaryCta: "View Work",
    },
    marquee,
    whatWeDo: {
      eyebrow: blocks[whatWeDoIdx]?.text ?? "",
      heading: blocks[whatWeDoIdx + 1]?.text ?? "",
      body: blocks[whatWeDoIdx + 2]?.text ?? "",
    },
    ctaBand: {
      heading: blocks[ctaBandIdx]?.text ?? "",
      body: blocks[ctaBandIdx + 1]?.text ?? "",
    },
  };
}

function buildAbout(data) {
  const blocks = extractBlocks(readPage("about/index.html"));
  const h1 = blocks.findIndex((b) => b.tag === "h1");
  const approachIdx = findIndex(blocks, /^Our Approach & Values$/);
  const statsIdx = findIndex(blocks, /^By the numbers$/);
  const testimonialsIdx = findIndex(blocks, /^Testimonials$/);
  return {
    eyebrow: blocks[h1 - 1]?.text ?? "",
    headline: blocks[h1]?.text,
    lede: blocks[h1 + 1]?.text,
    approach: {
      eyebrow: blocks[approachIdx]?.text ?? "",
      heading: blocks[approachIdx + 1]?.text ?? "",
      sub: blocks[approachIdx + 2]?.text ?? "",
    },
    principles:
      data.principles.length > 0
        ? data.principles
        : collectTriples(sliceUntil(blocks, approachIdx + 2, /^By the numbers$/)),
    numbers: {
      eyebrow: blocks[statsIdx]?.text ?? "",
      note: blocks[findIndex(blocks, /^All figures verified/, statsIdx)]?.text ?? "",
      stats: data.stats,
    },
    testimonialsSection: {
      eyebrow: blocks[testimonialsIdx]?.text ?? "",
      heading: blocks[testimonialsIdx + 1]?.text ?? "",
    },
    testimonials: data.testimonials.length
      ? data.testimonials
      : [
          {
            quote: blocks[findIndex(blocks, /^“$/, testimonialsIdx) + 1]?.text ?? "",
            name: blocks.find((b) => b.text === "Mara Lindqvist")?.text ?? "",
            role: "CEO",
            company: "Atlas Fintech",
            initials: "ML",
          },
        ],
  };
}

function buildContact() {
  const blocks = extractBlocks(readPage("contact/index.html"));
  const h1 = blocks.findIndex((b) => b.tag === "h1");
  const interestsIdx = findIndex(blocks, /^Services you're interested in$/);
  const interestOptions = sliceUntil(
    blocks,
    interestsIdx,
    /^By submitting, you agree/
  ).map((b) => b.text);
  const details = [];
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].tag === "dt") {
      details.push({ term: blocks[i].text, value: blocks[i + 1]?.text ?? "" });
    }
  }
  const fieldLabels = blocks
    .filter((b) => b.tag === "label" && blocks.indexOf(b) < interestsIdx)
    .map((b) => b.text);
  return {
    eyebrow: blocks[h1 - 1]?.text ?? "",
    headline: blocks[h1]?.text,
    lede: blocks[h1 + 1]?.text,
    details,
    form: {
      fields: fieldLabels,
      projectLabel: fieldLabels.find((t) => t.startsWith("Tell us about")) ?? "",
      interestsLabel: blocks[interestsIdx]?.text ?? "",
      interestOptions,
      privacyNote: blocks[findIndex(blocks, /^By submitting, you agree/)]?.text ?? "",
      submitLabel: "Send Message",
    },
  };
}

function buildPortfolio(data) {
  const blocks = extractBlocks(readPage("portfolio/index.html"));
  const h1 = blocks.findIndex((b) => b.tag === "h1");
  const galleryIdx = findIndex(blocks, /^Gallery$/);
  const caseIdx = findIndex(blocks, /^Case Studies$/);
  return {
    eyebrow: blocks[h1 - 1]?.text ?? "",
    headline: blocks[h1]?.text,
    lede: blocks[h1 + 1]?.text,
    gallery: {
      eyebrow: blocks[galleryIdx]?.text ?? "",
      caption: blocks[galleryIdx + 1]?.text ?? "",
      sub: blocks[galleryIdx + 2]?.text ?? "",
    },
    caseStudies: {
      eyebrow: blocks[caseIdx]?.text ?? "",
      caption: blocks[caseIdx + 1]?.text ?? "",
    },
    projects: data.projects,
  };
}

function buildInsights() {
  const blocks = extractBlocks(readPage("insights/index.html"));
  const h1 = blocks.findIndex((b) => b.tag === "h1");
  const articles = [];
  const dateRe = /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/;
  for (let i = 0; i < blocks.length; i++) {
    if (dateRe.test(blocks[i].text)) {
      articles.push({
        date: blocks[i].text,
        category: blocks[i + 1]?.text ?? "",
        title: blocks[i + 2]?.text ?? "",
        excerpt: blocks[i + 3]?.text ?? "",
        linkLabel: "Discuss this topic",
      });
    }
  }
  return {
    eyebrow: blocks[h1 - 1]?.text ?? "",
    headline: blocks[h1]?.text,
    lede: blocks[h1 + 1]?.text,
    articles,
  };
}

function buildServicesIndex() {
  const blocks = extractBlocks(readPage("services/index.html"));
  const h1 = blocks.findIndex((b) => b.tag === "h1");
  return {
    eyebrow: blocks[h1 - 1]?.text ?? "",
    headline: blocks[h1]?.text,
    lede: blocks[h1 + 1]?.text,
    cardCta: "View details",
  };
}

function buildLegal(file, fallbackTitle) {
  const blocks = extractBlocks(readPage(file));
  const h1 = blocks.findIndex((b) => b.tag === "h1");
  return {
    title: blocks[h1]?.text ?? fallbackTitle,
    paragraphs: blocks.slice(h1 + 1).filter((b) => b.tag === "p").map((b) => b.text),
  };
}

mkdirSync(OUT_DIR, { recursive: true });

const data = chunkData();

writeModule("home.ts", buildHome());
writeModule("about.ts", buildAbout(data));
writeModule("contact.ts", buildContact());
writeModule("portfolio.ts", buildPortfolio(data));
writeModule("insights.ts", buildInsights());
writeModule("services-index.ts", buildServicesIndex());
SERVICE_SLUGS.forEach((slug, i) => {
  writeModule(`${slug}.ts`, buildServiceDetail(slug, i));
});
writeModule("privacy.ts", buildLegal("privacy/index.html", "Privacy Policy"));
writeModule("terms.ts", buildLegal("terms/index.html", "Terms of Use"));

console.log("done");
