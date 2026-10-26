// Serves the static export in out/ the way Cloudflare Pages does: /about
// resolves to about.html, and unknown paths get 404.html.
// Run with: bun run start (after bun run build)
const root = new URL("../out", import.meta.url).pathname;
const port = Number(process.env.PORT ?? 4173);

Bun.serve({
  port,
  async fetch(req) {
    const path = decodeURIComponent(new URL(req.url).pathname);
    const candidates = path.endsWith("/") ? [`${path}index.html`] : [path, `${path}.html`, `${path}/index.html`];
    for (const candidate of candidates) {
      const file = Bun.file(root + candidate);
      if (await file.exists()) return new Response(file);
    }
    return new Response(Bun.file(`${root}/404.html`), { status: 404, headers: { "content-type": "text/html" } });
  },
});
console.log(`Serving out/ on http://localhost:${port}`);
