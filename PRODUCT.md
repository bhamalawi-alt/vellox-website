# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Founders and owner-operators of small companies in wellness, fintech, and food & beverage, across the EU and MENA. They decide alone, usually without a technical or marketing team, and do not know agency or engineering vocabulary. They arrive looking for someone to build a brand, a website or an online store, and later the system that runs the business.

Secondary audience, not the site's target: heads of product, marketing or digital who sometimes do the first research for a founder.

## Product Purpose

Vellox Studio is a business development studio: one team covering brand strategy, brand identity, UX design, visual content, web development, eCommerce, mobile apps, and ERPNext implementation. The website exists to turn a visiting founder into a contact-form enquiry (the only conversion path) and to make the studio look as capable as it is. Success is a qualified enquiry within one visit.

## Positioning

One accountable team from positioning to production: the same people design the brand, build the website or store, and later implement the ERP that runs operations, so nothing is lost between agencies. Vellox is a Frappe Partner (ERPNext), which neighbouring design studios are not.

Commercial priority right now: **brand and web** (brand identity, websites, eCommerce stores) are the entry point and should lead. ERPNext is the differentiator and the upsell, not the headline.

## Operating Context

- Founded 2019. Remote-first team based in Libya; by the owner's decision the site says "remote across the EU and MENA" and does not name the city or country.
- Clients span the EU and MENA. Working hours shown as Mon–Fri, 9:00–18:00 CET.
- Enquiries come through the contact form (Formspree) and email; a short intro call follows.
- Projects run 4–16 weeks depending on service; most web clients stay on a maintenance or conversion retainer.
- Content is edited by the owner through a Git-based CMS at `/admin` (Sveltia): portfolio projects as `src/content/projects/*.json` with image uploads to `public/uploads/projects/`.

## Capabilities and Constraints

- Static site: Next.js 16 App Router with `output: "export"`, React 19, Tailwind CSS 4, served by a Cloudflare Worker (static assets). No server, no database; everything is built at deploy time.
- Bilingual: English at the root URLs, Arabic (Modern Standard, RTL, IBM Plex Sans Arabic) at `/ar/…`, with a language switch and hreflang pairs. Copy lives in `src/content/**` with Arabic twins under `src/content/ar/`; projects are `<slug>.en.json` + `<slug>.ar.json`. `ARABIC_LIVE` in `src/lib/i18n.ts` hides the Arabic site from search and the switch while it is proofread.
- Built with Bun (`bun.lock`); Node is not installed on the owner's machine. Build `bun run build`, checks `bun run verify`, `typecheck`, `lint`.
- Strict Content-Security-Policy in `public/_headers` (`script-src 'self'`); third-party scripts, fonts or embeds need an explicit allowlist change.
- Eight services are defined in `src/content/services.ts`; per-page copy in `src/content/pages/*.ts`. Service names currently vary between nav, footer and titles (open item from the copy review).
- Accessibility baseline already in place: reduced-motion support, keyboard-operable menu and accordion, sr-only copies of animated headlines, AA contrast on body text. Preserve it.
- Performance budget: no three.js; background effects lazy-load after first paint and pause off-screen.
- Undecided: whether "Web & Mobile Applications" is renamed "Mobile Apps" or rewritten to cover web apps; the video-hosting approach for future work samples; the Skiper UI licence/attribution question.

## Brand Commitments

- Name: Vellox Studio. Descriptor: "Business Development Studio".
- Logos are fixed and must not be recoloured or redrawn: lockups `public/logos/logo-06.png` (white), `logo-07.png` (black), `logo-08.png` (brand blue); marks `logo-12.png` (white), `logo-13.png` (black), `logo-14.png` (brand blue).
- Brand accent: `#3730e8`. Display font in use: Optika (Regular only, `public/fonts/`); body Geist, labels Geist Mono.
- Voice confirmed good in the copy review and to be matched elsewhere: plain, concrete, owner-facing, honest about process and risk (the ERPNext page and the About principles are the reference).
- Writing in US English.

## Evidence on Hand

- Testimonials on the About page (six, with names, roles, companies and figures) are real per the owner. Figures: 120+ projects since 2019, 94% client retention, 12-week median time to launch; client references available on request.
- Three case studies exist as entries (Aurelia Wellness, Northwind Coffee, Atlas Fintech) but with one-sentence summaries, no story, no results and no imagery yet. Three testimonial clients (Maison Verre, Polaris Quarterly, Helix Health) have no case study.
- The owner holds a large archive of real work samples offline: logos, brand identities, packaging, web and app designs, photography and videos. None is on the site yet; a type-filtered "Showcase" (logos, packaging, web, apps, photography, video, social) is the agreed future structure, with case studies as the second layer. Videos are deferred.
- Do not fabricate: client logos, press, awards, additional metrics, or project imagery. Placeholders are branded (blue cover with the Vellox mark), never stock photography.
- Insights page has three article topics in progress, no published articles.

## Product Principles

1. **Lead with brand and web, keep ERP as the proof of depth.** The first screen sells the entry service; the "one team all the way to operations" story earns the premium.
2. **Write for a founder, not a CTO.** Name a tool once with a four-word gloss; benefits before stack.
3. **Every claim has a place to land.** A number or testimonial links to the work behind it; no proof floats alone.
4. **Honest about scale and location.** Real figures, real references, branded placeholders until real imagery exists, and no on-site promises the remote team cannot keep.
5. **Fast and quiet by default.** The site must stay a light static export; effects earn their bytes.

## Accessibility & Inclusion

WCAG 2.2 AA is the standard already applied; keep contrast, focus visibility, reduced-motion behaviour and keyboard operation at current level or better. Audience spans EU and MENA; the Arabic version with RTL layout exists (see Capabilities).
