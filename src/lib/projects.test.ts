import { describe, expect, it } from "bun:test";
import { join } from "node:path";
import { interleaveGalleries, readProjects } from "./projects";

const DIR = join(import.meta.dir, "__fixtures__", "projects");

describe("readProjects per locale", () => {
  it("lists every English project once, all translated", () => {
    const en = readProjects(DIR, "en");
    expect(en.map((p) => p.slug)).toEqual(["a", "b", "c", "d"]);
    expect(en.every((p) => p.translated)).toBe(true);
    expect(en[0].title).toBe("Alpha");
    expect(en[0].locale).toBe("en");
  });

  it("overlays a full Arabic file and marks it translated", () => {
    const a = readProjects(DIR, "ar").find((p) => p.slug === "a")!;
    expect(a.translated).toBe(true);
    expect(a.title).toBe("ألفا");
    expect(a.industry).toBe("الصحة والعافية");
    expect(a.tags).toEqual(["الهوية البصرية", "التغليف"]);
    expect(a.summary).toBe("ملخص عربي.");
    // Shared fields come from the English file.
    expect(a.order).toBe(1);
    expect(a.year).toBe("2025");
  });

  it("falls back to English when no Arabic file exists", () => {
    const b = readProjects(DIR, "ar").find((p) => p.slug === "b")!;
    expect(b.translated).toBe(false);
    expect(b.title).toBe("Beta");
    expect(b.summary).toBe("Beta in English.");
  });

  it("falls back to English when the Arabic summary is blank", () => {
    const c = readProjects(DIR, "ar").find((p) => p.slug === "c")!;
    expect(c.translated).toBe(false);
    expect(c.title).toBe("Gamma");
    expect(c.summary).toBe("Gamma in English.");
  });

  it("keeps the English tags for service matching in every locale", () => {
    const ar = readProjects(DIR, "ar");
    expect(ar.find((p) => p.slug === "a")!.serviceTags).toEqual(["Brand Identity", "Packaging"]);
    expect(ar.find((p) => p.slug === "b")!.serviceTags).toEqual(["Web app"]);
  });
});

describe("per-field fallback tracking", () => {
  it("names the fields that fell back to English and withholds 'translated'", () => {
    const d = readProjects(DIR, "ar").find((p) => p.slug === "d")!;
    expect(d.summary).toBe("دلتا بالعربية.");
    expect(d.body).toBe("An English story.");
    expect(d.fallbackFields).toEqual(["body", "results"]);
    expect(d.translated).toBe(false);
  });
  it("reports no fallback for a fully translated entry or for English", () => {
    expect(readProjects(DIR, "ar").find((p) => p.slug === "a")!.fallbackFields).toEqual([]);
    expect(readProjects(DIR, "en").every((p) => p.fallbackFields.length === 0)).toBe(true);
  });
  it("lists every text field when no Arabic file exists", () => {
    const b = readProjects(DIR, "ar").find((p) => p.slug === "b")!;
    expect(b.fallbackFields).toEqual(["title", "industry", "tags", "summary"]);
  });
});

describe("interleaveGalleries", () => {
  const project = (title: string, images: string[]) =>
    ({ title, gallery: images.map((image) => ({ image, alt: "" })) }) as Parameters<typeof interleaveGalleries>[0][number];

  it("takes one image from each project in turn, so a large gallery cannot crowd out the rest", () => {
    const images = interleaveGalleries([project("A", ["a1", "a2", "a3"]), project("B", ["b1"]), project("C", ["c1", "c2"])]);
    expect(images.map((i) => i.src)).toEqual(["a1", "b1", "c1", "a2", "c2", "a3"]);
  });

  it("uses the project title when an image has no alt text", () => {
    expect(interleaveGalleries([project("A", ["a1"])])[0].alt).toBe("A");
  });
});
