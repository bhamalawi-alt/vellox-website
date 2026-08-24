import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "og-default.png");
mkdirSync(dirname(out), { recursive: true });

const svg = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <text
    x="600"
    y="330"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Helvetica, Arial, sans-serif"
    font-size="160"
    font-weight="700"
    letter-spacing="8"
    fill="#ffffff">Vellox</text>
  <rect x="560" y="410" width="80" height="6" rx="3" fill="#10b981"/>
</svg>
`);

await sharp(svg)
  .png()
  .toFile(out)
  .then((info) => console.log(`Wrote ${out}`, info));
