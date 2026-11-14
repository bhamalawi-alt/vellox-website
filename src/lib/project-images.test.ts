import { describe, expect, it } from "bun:test";
import { existsSync } from "node:fs";
import sizes from "../content/project-image-sizes.json";
import { imageSources } from "./project-images";

describe("project image sizes", () => {
  it("offers the smaller copies of a large image, smallest first, then the original", () => {
    expect(imageSources("/uploads/projects/crowd-racing/crowd-racing-01.webp")).toEqual({
      src: "/uploads/projects/crowd-racing/crowd-racing-01.webp",
      srcSet:
        "/uploads/projects/crowd-racing/crowd-racing-01-960.webp 960w, /uploads/projects/crowd-racing/crowd-racing-01-1400.webp 1400w, /uploads/projects/crowd-racing/crowd-racing-01.webp 2800w",
    });
  });
  it("serves an image it has no sizes for as it is", () => {
    expect(imageSources("/uploads/projects/new/photo.webp")).toEqual({ src: "/uploads/projects/new/photo.webp" });
  });
  it("only lists copies that exist on disk", () => {
    for (const [path, entry] of Object.entries(sizes)) {
      for (const w of entry.variants) {
        expect(existsSync(`public${path.replace(/\.webp$/, `-${w}.webp`)}`)).toBe(true);
      }
    }
  });
});
