import { describe, expect, it } from "bun:test";
import { getServices } from "./services";
import { aboutCopy, contactCopy, homeCopy, portfolioCopy, servicesIndexCopy } from "./pages";
import type { Locale } from "../lib/i18n";
import { getFaq } from "./faq";
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
