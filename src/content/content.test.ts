import { describe, expect, it } from "bun:test";
import { getServices, SERVICES } from "./services";
import { getSite } from "./site";
import { getUi } from "./ui";

describe("Arabic content mirrors English", () => {
  it("has every service at the same slug and index with its own copy", () => {
    const ar = getServices("ar");
    expect(ar.map((s) => s.slug)).toEqual(SERVICES.map((s) => s.slug));
    ar.forEach((service, i) => {
      expect(service.index).toBe(SERVICES[i].index);
      for (const key of ["title", "tagline", "metaTitle", "metaDescription", "outcome"] as const) {
        expect(service[key].trim().length).toBeGreaterThan(0);
        expect(service[key]).not.toBe(SERVICES[i][key]);
      }
      expect(service.included.length).toBe(SERVICES[i].included.length);
    });
  });

  it("keeps navigation hrefs identical across locales", () => {
    const en = getSite("en");
    const ar = getSite("ar");
    expect(ar.NAV_ITEMS.map((i) => i.href)).toEqual(en.NAV_ITEMS.map((i) => i.href));
    expect(ar.FOOTER_COLUMNS.flatMap((c) => c.links.map((l) => l.href))).toEqual(
      en.FOOTER_COLUMNS.flatMap((c) => c.links.map((l) => l.href)),
    );
    expect(ar.CTA_ITEM.href).toBe(en.CTA_ITEM.href);
    expect(ar.SOCIAL_LINKS.map((s) => s.href)).toEqual(en.SOCIAL_LINKS.map((s) => s.href));
  });

  it("has the same UI string keys in both languages", () => {
    const keys = (o: object): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        v && typeof v === "object" ? keys(v as object).map((s) => `${k}.${s}`) : [k],
      );
    expect(keys(getUi("ar"))).toEqual(keys(getUi("en")));
  });

  it("labels the language switch with the other language's name", () => {
    expect(getUi("en").switchLanguage).toBe("عربي");
    expect(getUi("ar").switchLanguage).toBe("English");
  });
});
