// Makes smaller copies of the project images so phones do not download the
// full-size files, and records every image's sizes in
// src/content/project-image-sizes.json for the pages to build srcset from.
// Run after adding project images: bun scripts/project-images.mjs
// Needs ffmpeg and ffprobe. Images without an entry still work; they are
// simply served at full size.
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const root = new URL("../public", import.meta.url).pathname;
const dir = join(root, "uploads/projects");
const WIDTHS = [960, 1400];
const sized = /-(960|1400)\.webp$/;

const widthOf = (file) =>
  Number(
    execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width", "-of", "csv=p=0", file])
      .toString()
      .trim(),
  );

const manifest = {};
for (const project of readdirSync(dir)) {
  const folder = join(dir, project);
  if (!statSync(folder).isDirectory()) continue;
  for (const name of readdirSync(folder).sort()) {
    if (!name.endsWith(".webp") || sized.test(name)) continue;
    const file = join(folder, name);
    const width = widthOf(file);
    const variants = [];
    for (const w of WIDTHS) {
      if (w >= width) continue;
      const out = file.replace(/\.webp$/, `-${w}.webp`);
      if (!existsSync(out)) {
        execFileSync("ffmpeg", ["-v", "error", "-y", "-i", file, "-vf", `scale=${w}:-2`, "-c:v", "libwebp", "-quality", "80", "-compression_level", "6", out]);
      }
      variants.push(w);
    }
    manifest[`/uploads/projects/${project}/${name}`] = { width, variants };
  }
}
writeFileSync(
  new URL("../src/content/project-image-sizes.json", import.meta.url),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log(`project images: ${Object.keys(manifest).length} recorded`);
