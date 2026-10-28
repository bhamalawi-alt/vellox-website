import { describe, expect, it } from "bun:test";
import { join } from "node:path";
import { readProjects } from "./projects";

const DIR = join(import.meta.dir, "__fixtures__", "projects");

describe("readProjects per locale", () => {
  it("lists every English project once, all translated", () => {
    const en = readProjects(DIR, "en");
    expect(en.map((p) => p.slug)).toEqual(["a", "b", "c"]);
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
