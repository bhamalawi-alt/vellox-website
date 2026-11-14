import { describe, expect, it } from "bun:test";
import sitemap from "./sitemap";
import { getArticles } from "../content/articles";
import { BASE } from "../lib/seo";

describe("sitemap", () => {
  const entries = sitemap();
  it("names the English page as x-default on every entry, like the page head does", () => {
    for (const entry of entries) {
      const languages = entry.alternates?.languages as Record<string, string>;
      expect(languages["x-default"]).toBe(languages.en);
    }
  });
  it("dates each guide with its last rewrite, in both languages", () => {
    for (const article of getArticles("en")) {
      const date = article.updated ?? article.date;
      for (const prefix of ["", "/ar"]) {
        const entry = entries.find((e) => e.url === `${BASE}${prefix}/insights/${article.slug}`)!;
        expect(entry.lastModified).toBe(date);
      }
    }
  });
  it("leaves undated pages without a date rather than stamping the build time", () => {
    expect(entries.find((e) => e.url === `${BASE}/about`)!.lastModified).toBeUndefined();
  });
});
