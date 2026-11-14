import { describe, expect, it } from "bun:test";
import { getKeywords, SERVICE_KEYWORDS } from "./keywords";
import { getServices } from "./services";

describe("service keywords", () => {
  it("covers every service, in both languages, with the same number of terms", () => {
    for (const service of getServices("en")) {
      const terms = SERVICE_KEYWORDS[service.slug];
      expect(terms).toBeDefined();
      expect(terms.en.length).toBeGreaterThanOrEqual(4);
      expect(terms.ar.length).toBe(terms.en.length);
    }
    expect(Object.keys(SERVICE_KEYWORDS).sort()).toEqual(getServices("en").map((s) => s.slug).sort());
  });
  for (const locale of ["en", "ar"] as const) {
    it(`${locale}: a flat list with no repeats and no empty terms`, () => {
      const all = getKeywords(locale);
      expect(all.length).toBe(51);
      expect(new Set(all).size).toBe(all.length);
      for (const term of all) expect(term.trim()).toBe(term);
    });
  }
  it("writes the Arabic list in Arabic", () => {
    for (const term of getKeywords("ar")) expect(term).toMatch(/[؀-ۿ]/);
  });
});
