// Tells IndexNow search engines (Bing, Yandex, Seznam and others) that every
// page in the built sitemap has changed, so they re-crawl it. Run after a
// deploy: bun run indexnow. The key file in public/ proves we own the host.
import { readFileSync, readdirSync } from "node:fs";

const HOST = "www.velloxstudio.com";
const keyFile = readdirSync("public").find((name) => /^[0-9a-f]{32}\.txt$/.test(name));
if (!keyFile) throw new Error("No IndexNow key file (32 hex characters + .txt) in public/");
const key = keyFile.slice(0, -4);

const sitemap = readFileSync("out/sitemap.xml", "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URLs → HTTP ${response.status} ${await response.text()}`);
if (!response.ok) process.exit(1);
