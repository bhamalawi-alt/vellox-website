import { describe, expect, it } from "bun:test";
import {
  alternatePath,
  arrow,
  DEFAULT_LOCALE,
  dir,
  LOCALES,
  localePath,
  otherLocale,
  pick,
  stripLocale,
} from "./i18n";

describe("locale basics", () => {
  it("lists en then ar with en as default", () => {
    expect(LOCALES).toEqual(["en", "ar"]);
    expect(DEFAULT_LOCALE).toBe("en");
  });
  it("gives rtl only for Arabic", () => {
    expect(dir("ar")).toBe("rtl");
    expect(dir("en")).toBe("ltr");
  });
  it("swaps locales", () => {
    expect(otherLocale("en")).toBe("ar");
    expect(otherLocale("ar")).toBe("en");
  });
  it("points arrows with the reading direction", () => {
    expect(arrow("en")).toBe("→");
    expect(arrow("ar")).toBe("←");
  });
  it("picks the value for the locale", () => {
    expect(pick("en", "a", "b")).toBe("a");
    expect(pick("ar", "a", "b")).toBe("b");
  });
});

describe("localePath", () => {
  it("prefixes Arabic paths and leaves English alone", () => {
    expect(localePath("ar", "/")).toBe("/ar");
    expect(localePath("ar", "/about")).toBe("/ar/about");
    expect(localePath("en", "/about")).toBe("/about");
    expect(localePath("en", "/")).toBe("/");
  });
  it("does not double an existing prefix", () => {
    expect(localePath("ar", "/ar/about")).toBe("/ar/about");
    expect(localePath("ar", "/ar")).toBe("/ar");
  });
  it("leaves hashes and external links untouched", () => {
    expect(localePath("ar", "#top")).toBe("#top");
    expect(localePath("ar", "https://x.test/a")).toBe("https://x.test/a");
    expect(localePath("ar", "mailto:a@b.c")).toBe("mailto:a@b.c");
  });
});

describe("stripLocale", () => {
  it("recognises the Arabic prefix", () => {
    expect(stripLocale("/ar/about")).toEqual({ locale: "ar", path: "/about" });
    expect(stripLocale("/ar")).toEqual({ locale: "ar", path: "/" });
    expect(stripLocale("/ar/")).toEqual({ locale: "ar", path: "/" });
  });
  it("treats everything else as English", () => {
    expect(stripLocale("/about")).toEqual({ locale: "en", path: "/about" });
    expect(stripLocale("/")).toEqual({ locale: "en", path: "/" });
    expect(stripLocale("/arabic")).toEqual({ locale: "en", path: "/arabic" });
  });
});

describe("alternatePath", () => {
  it("finds the twin page in the other language", () => {
    expect(alternatePath("/ar/portfolio/x")).toEqual({ locale: "en", href: "/portfolio/x" });
    expect(alternatePath("/portfolio/x")).toEqual({ locale: "ar", href: "/ar/portfolio/x" });
    expect(alternatePath("/")).toEqual({ locale: "ar", href: "/ar" });
    expect(alternatePath("/ar")).toEqual({ locale: "en", href: "/" });
  });
});
