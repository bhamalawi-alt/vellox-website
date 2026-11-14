import { describe, expect, it } from "bun:test";
import { getServices } from "./services";
import { aboutCopy, contactCopy, homeCopy, portfolioCopy, servicesIndexCopy } from "./pages";
import type { Locale } from "../lib/i18n";
import { getFaq } from "./faq";
import { articleLinks, getArticle, getArticles, getArticlesForService, getRelatedArticles } from "./articles";
import { getUi } from "./ui";

// Search-result limits: Google cuts titles after about 60 characters and
// descriptions after about 160. Below 110 a description wastes the space.
const TITLE_MAX = 60;
const DESC_MIN = 110;
const DESC_MAX = 160;

// The markets the site targets, as searchers write them.
const MARKET = { en: /Libya|Gulf|Saudi|UAE|Oman/, ar: /ليبيا|الخليج|السعودية|الإمارات|عُمان/ };

function pages(locale: Locale) {
  return [
    { name: "home", title: homeCopy(locale).metaTitle, desc: homeCopy(locale).hero.metaDescription },
    { name: "about", title: aboutCopy(locale).metaTitle, desc: aboutCopy(locale).metaDescription },
    { name: "services", title: servicesIndexCopy(locale).metaTitle, desc: servicesIndexCopy(locale).metaDescription },
    { name: "portfolio", title: portfolioCopy(locale).metaTitle, desc: portfolioCopy(locale).metaDescription },
    { name: "contact", title: contactCopy(locale).metaTitle, desc: contactCopy(locale).metaDescription },
  ];
}

for (const locale of ["en", "ar"] as const) {
  describe(`${locale} search snippets`, () => {
    for (const page of pages(locale)) {
      it(`${page.name}: description fits and names the target markets`, () => {
        expect(page.desc.length).toBeGreaterThanOrEqual(DESC_MIN);
        expect(page.desc.length).toBeLessThanOrEqual(DESC_MAX);
        expect(page.desc).toMatch(MARKET[locale]);
      });
      if (locale === "en") {
        it(`${page.name}: title fits`, () => expect(page.title.length).toBeLessThanOrEqual(TITLE_MAX));
      }
    }

    for (const service of getServices(locale)) {
      it(`${service.slug}: has its own H1 heading and a description that fits`, () => {
        expect(service.heading.trim().length).toBeGreaterThan(0);
        expect(service.metaDescription.length).toBeGreaterThanOrEqual(DESC_MIN);
        expect(service.metaDescription.length).toBeLessThanOrEqual(DESC_MAX);
        if (locale === "en") expect(service.metaTitle.length).toBeLessThanOrEqual(TITLE_MAX);
      });
    }
  });
}

describe("service FAQs", () => {
  for (const service of getServices("en")) {
    it(`${service.slug}: has the same number of questions in both languages`, () => {
      const en = getFaq("en", service.slug);
      const ar = getFaq("ar", service.slug);
      expect(en.length).toBeGreaterThanOrEqual(3);
      expect(ar.length).toBe(en.length);
      for (const item of [...en, ...ar]) {
        expect(item.q.trim().length).toBeGreaterThan(0);
        expect(item.a.trim().length).toBeGreaterThan(0);
      }
    });
  }
  it("has a heading for the FAQ section in both languages", () => {
    expect(getUi("en").faqHeading.length).toBeGreaterThan(0);
    expect(getUi("ar").faqHeading).not.toBe(getUi("en").faqHeading);
  });
});

describe("insights articles", () => {
  const services = new Set(getServices("en").map((s) => s.slug));
  it("has every article in both languages under the same slug", () => {
    expect(getArticles("ar").map((a) => a.slug)).toEqual(getArticles("en").map((a) => a.slug));
    expect(getArticles("en").length).toBeGreaterThanOrEqual(4);
  });
  for (const locale of ["en", "ar"] as const) {
    for (const article of getArticles(locale)) {
      it(`${locale} ${article.slug}: fits search results and links to a real service`, () => {
        expect(article.description.length).toBeGreaterThanOrEqual(DESC_MIN);
        expect(article.description.length).toBeLessThanOrEqual(DESC_MAX);
        expect(services.has(article.service)).toBe(true);
        expect(article.sections.length).toBeGreaterThanOrEqual(4);
        expect(getArticle(locale, article.slug)).toBe(article);
      });
    }
  }
  // "erpnext arabic" is the site's closest query to page one (Search Console,
  // Nov 2026), so this guide is the long one and the ERPNext page links to it.
  for (const locale of ["en", "ar"] as const) {
    it(`${locale} erpnext-in-arabic: expanded, dated as updated, and listed on the ERPNext page`, () => {
      const article = getArticle(locale, "erpnext-in-arabic")!;
      expect(article.sections.length).toBeGreaterThanOrEqual(9);
      expect(article.updated! > article.date).toBe(true);
      expect(getArticlesForService(locale, "erp-implementation").map((a) => a.slug)).toContain("erpnext-in-arabic");
    });
  }
  it("lists no guides for a service no article leads to", () => {
    expect(getArticlesForService("en", "visual-content")).toEqual([]);
  });
  // Guides used to link only to one service page, never to each other.
  for (const locale of ["en", "ar"] as const) {
    for (const article of getArticles(locale)) {
      it(`${locale} ${article.slug}: links to other guides on the same subject`, () => {
        const related = getRelatedArticles(locale, article.slug);
        expect(related.length).toBeGreaterThanOrEqual(1);
        expect(related.length).toBeLessThanOrEqual(3);
        expect(related.map((a) => a.slug)).not.toContain(article.slug);
        for (const other of related) expect(other.service).toBe(article.service);
      });
    }
  }
  // Links inside the guide text, written as [words](/path) in a paragraph.
  describe("links inside guide text", () => {
    const targets = new Set([
      ...getArticles("en").map((a) => `/insights/${a.slug}`),
      ...getServices("en").map((s) => `/services/${s.slug}`),
    ]);
    for (const locale of ["en", "ar"] as const) {
      for (const article of getArticles(locale)) {
        it(`${locale} ${article.slug}: at least two links, all to real pages, none to itself`, () => {
          const links = articleLinks(article);
          expect(links.length).toBeGreaterThanOrEqual(2);
          for (const href of links) expect(targets.has(href)).toBe(true);
          expect(links).not.toContain(`/insights/${article.slug}`);
        });
      }
    }
    it("links to the same pages in both languages", () => {
      for (const article of getArticles("en")) {
        expect(articleLinks(getArticle("ar", article.slug)!).sort()).toEqual(articleLinks(article).sort());
      }
    });
    it("leaves no link markup in the plain-text fields", () => {
      for (const locale of ["en", "ar"] as const) {
        for (const a of getArticles(locale)) {
          for (const text of [a.title, a.description, a.intro, a.cta.heading, a.cta.body, ...a.sections.map((x) => x.heading)]) {
            expect(text).not.toMatch(/\]\(/);
          }
        }
      }
    });
  });
  // Market ranges, never the studio's own prices: every table is dated and
  // says where its figures come from.
  describe("price tables", () => {
    const tables = (locale: "en" | "ar", slug: string) =>
      getArticle(locale, slug)!.sections.flatMap((s) => (s.table ? [s.table] : []));
    // Prices only: the first column is the label, which words numbers differently per language.
    const figures = (rows: string[][]) => rows.map((r) => r.slice(1).join("|").match(/\d[\d,]*/g));
    for (const [slug, shape] of [
      ["how-much-does-a-website-cost", [[4, 5], [4, 2]]],
      ["erpnext-cost", [[3, 9]]],
    ] as const) {
      it(`${slug}: the same tables, with the same figures, in both languages`, () => {
        const en = tables("en", slug);
        const ar = tables("ar", slug);
        expect(en.map((t) => [t.head.length, t.rows.length])).toEqual(shape.map((x) => [...x]));
        expect(ar.length).toBe(en.length);
        en.forEach((table, i) => {
          for (const t of [table, ar[i]]) {
            for (const row of t.rows) expect(row.length).toBe(t.head.length);
            expect(t.note!.length).toBeGreaterThan(40);
          }
          expect(figures(ar[i].rows)).toEqual(figures(table.rows));
        });
      });
      it(`${slug}: dated as updated`, () => {
        for (const locale of ["en", "ar"] as const) {
          const article = getArticle(locale, slug)!;
          expect(article.updated! > article.date).toBe(true);
        }
      });
    }
    it("says the ERPNext figures are partner estimates and that the work is priced per business", () => {
      expect(tables("en", "erpnext-cost")[0].note).toMatch(/estimates/);
      expect(tables("en", "erpnext-cost")[0].note).toMatch(/priced for each business/);
      expect(tables("ar", "erpnext-cost")[0].note).toMatch(/تقديرات/);
    });
  });
  it("lists the website guides on the store and UX pages too", () => {
    for (const locale of ["en", "ar"] as const) {
      const store = getArticlesForService(locale, "ecommerce").map((a) => a.slug);
      expect(store).toContain("how-much-does-a-website-cost");
      expect(store).toContain("how-to-choose-a-web-design-company");
      expect(getArticlesForService(locale, "user-experience-design").map((a) => a.slug)).toEqual([
        "how-to-choose-a-web-design-company",
      ]);
    }
  });
  it("has the article UI strings in both languages", () => {
    for (const key of ["articlesHeading", "readArticle", "publishedOn", "updatedOn", "relatedGuides", "moreGuides"] as const) {
      expect(String(getUi("en")[key]).length).toBeGreaterThan(0);
      expect(String(getUi("ar")[key])).not.toBe(String(getUi("en")[key]));
    }
  });
});

// AI answers quote self-contained, answer-first passages of roughly 134–167
// words (geo-seo-claude's citability scorer). Each service page leads with one.
describe("service answer passages", () => {
  const words = (s: string) => s.trim().split(/\s+/).length;
  for (const service of getServices("en")) {
    it(`en ${service.slug}: a question heading and a 120–170 word answer`, () => {
      expect(service.summaryHeading.endsWith("?")).toBe(true);
      expect(words(service.summary)).toBeGreaterThanOrEqual(120);
      expect(words(service.summary)).toBeLessThanOrEqual(170);
    });
  }
  for (const service of getServices("ar")) {
    it(`ar ${service.slug}: a question heading and a full answer`, () => {
      expect(service.summaryHeading.endsWith("؟")).toBe(true);
      expect(words(service.summary)).toBeGreaterThanOrEqual(90);
      expect(words(service.summary)).toBeLessThanOrEqual(170);
    });
  }
});
