# Vellox Studio website

Marketing site for Vellox Studio: Next.js 16 (App Router) + Tailwind CSS 4, exported as a static site and hosted on Cloudflare Pages.

## Develop

This project uses [Bun](https://bun.sh) (`bun.lock` is the lockfile).

```bash
bun install
bun --bun next dev        # http://localhost:3000
```

## Build and check

```bash
bun run build             # static export to out/
bun run verify            # routes, OG tags, canonicals, sitemap, form endpoint
bun run start             # serve out/ locally like Cloudflare Pages
bun run lint
bun run typecheck
```

## Deploy (Cloudflare Pages)

- Build command: `bun run build`
- Build output directory: `out`
- Environment variable: `NEXT_PUBLIC_FORMSPREE_ID` (see `.env.example`); without it the contact form is disabled.
- `public/_headers` sets security and cache headers; `public/_redirects` holds path redirects.
- In the Cloudflare dashboard, turn on **SSL/TLS → Always Use HTTPS** and add a **Redirect Rule** from `velloxstudio.com` to `www.velloxstudio.com` (the canonical host in `src/lib/seo.ts`).

## Where things live

- `src/content/` — all copy. `services.ts` drives the service list; `pages/*.ts` hold per-page copy.
- `src/content/projects/*.json` — portfolio projects, one file each, edited through the CMS at `/admin`. Setup and usage: [docs/cms.md](docs/cms.md).
- `src/components/ui/` — UI components adapted from Skiper UI and Vengeance UI (attribution in the footer is a Skiper UI licence condition).
- `scripts/generate-og.mjs` — regenerates the share image and icons from `public/logos/` (`bun run icons`).
