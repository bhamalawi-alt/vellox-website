import { describe, expect, it } from "bun:test";
import { fitDescription, hubGraph, projectTitle } from "./seo";

describe("fitDescription", () => {
  it("keeps the full text when it fits the search snippet", () => {
    expect(fitDescription("Short summary. A Vellox Studio project.", "Short summary.")).toBe(
      "Short summary. A Vellox Studio project.",
    );
  });
  it("falls back to the shorter text when the full one would be cut off", () => {
    const full = "x".repeat(161);
    expect(fitDescription(full, "Short summary.")).toBe("Short summary.");
  });
  it("trims the fallback at a word boundary when it is still too long", () => {
    const fallback = `${"word ".repeat(40)}end`;
    const out = fitDescription(`${fallback} more`, fallback);
    expect(out.length).toBeLessThanOrEqual(160);
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toContain("wor…");
  });
});

describe("projectTitle", () => {
  it("names the service and the sector when they fit a search result", () => {
    expect(projectTitle("en", { title: "CROWD RACING", tags: ["Brand Identity", "Logo Design"], industry: "Motorsport" }, "Vellox Studio Portfolio")).toBe(
      "CROWD RACING: Brand Identity, Motorsport — Vellox Studio",
    );
  });
  it("drops the sector when the title would run past 60 characters", () => {
    const title = projectTitle("en", { title: "AMANK", tags: ["Brand Identity"], industry: "Healthcare & Medical Logistics" }, "Vellox Studio Portfolio");
    expect(title).toBe("AMANK: Brand Identity — Vellox Studio");
  });
  it("falls back to the plain portfolio title when there is no tag", () => {
    expect(projectTitle("en", { title: "X", tags: [], industry: "" }, "Vellox Studio Portfolio")).toBe("X — Vellox Studio Portfolio");
  });
  it("uses the Arabic comma in Arabic", () => {
    expect(projectTitle("ar", { title: "أوريكس", tags: ["الهوية البصرية"], industry: "برمجيات" }, "أعمال Vellox Studio")).toBe(
      "أوريكس: الهوية البصرية، برمجيات — Vellox Studio",
    );
  });
});

describe("hubGraph", () => {
  it("describes a hub page and its place under the home page, per language", () => {
    const graph = hubGraph({ locale: "ar", path: "/contact", name: "تواصل معنا", type: "ContactPage" });
    const [page, crumbs] = graph["@graph"];
    expect(page["@type"]).toBe("ContactPage");
    expect(page.url).toBe("https://www.velloxstudio.com/ar/contact");
    expect(page.inLanguage).toBe("ar");
    expect(crumbs.itemListElement!.map((i) => i.item)).toEqual([
      "https://www.velloxstudio.com/ar",
      "https://www.velloxstudio.com/ar/contact",
    ]);
  });
});
