// Generates the share image and app icons from the Vellox logos in public/logos.
// Run with: bun scripts/generate-og.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logo = (file) => join(root, "public", "logos", file);
const INK = "#0a0a0a";
const BRAND = "#3730e8";

// Share image: white lockup on ink, brand-blue glow and rule.
const glow = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="50%" cy="115%" r="75%">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${BRAND}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${INK}"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="560" y="430" width="80" height="6" rx="3" fill="${BRAND}"/>
</svg>`);
const lockup = await sharp(logo("logo-06.png")).resize({ width: 760 }).toBuffer();
const lockupMeta = await sharp(lockup).metadata();
await sharp(glow)
  .composite([{ input: lockup, left: Math.round((1200 - 760) / 2), top: Math.round(330 - lockupMeta.height / 2 - 30) }])
  .png()
  .toFile(join(root, "public", "og-default.png"));

// Square icon: white mark centred on ink.
async function icon(size, pad = 0.18) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(logo("logo-12.png")).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
  const m = await sharp(mark).metadata();
  return sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: mark, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2) }])
    .png()
    .toBuffer();
}

writeFileSync(join(root, "src", "app", "icon.png"), await icon(512));
writeFileSync(join(root, "src", "app", "apple-icon.png"), await icon(180, 0.16));
writeFileSync(join(root, "public", "icon-512.png"), await icon(512));

// favicon.ico holding a single 32px PNG (valid ICO since Windows Vista).
const png32 = await icon(32, 0.12);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // planes
header.writeUInt16LE(32, 12); // bpp
header.writeUInt32LE(png32.length, 14); // size
header.writeUInt32LE(22, 18); // offset
writeFileSync(join(root, "src", "app", "favicon.ico"), Buffer.concat([header, png32]));

console.log("Wrote og-default.png, icon.png, apple-icon.png, icon-512.png, favicon.ico");
