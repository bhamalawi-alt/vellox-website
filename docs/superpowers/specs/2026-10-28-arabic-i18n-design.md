# Arabic version of velloxstudio.com — design

Date: 2026-10-28. Owner: Vellox Studio. Status: draft for approval.

## Intent

Founders in Libya, the Gulf and Oman should be able to read the whole site in Arabic and feel it was made for them, not translated at them. The English site is the reference: same pages, same structure, same message, same visual identity. The owner edits project content in both languages through the existing CMS.

Success: an Arabic-reading founder lands on `/ar/`, reads every page in natural Modern Standard Arabic in a fully right-to-left layout, switches to English and back without losing their place, and sends an enquiry through an Arabic contact form. Arabic pages are indexed by Google as Arabic and linked to their English twins.

## Goals

1. Every public page exists in Arabic at `/ar/<same path>`: home, about, services index, 8 service pages, portfolio index, project pages, insights, contact, privacy, terms.
2. Right-to-left layout that is correct in detail: navigation order, arrows and chevrons, text alignment, paddings and margins, the marquee direction, the mobile menu, the form, focus rings.
3. A language switch in the header (desktop and mobile) and footer that keeps the visitor on the equivalent page.
4. Arabic typography that matches the English look: one Arabic typeface for display and body, loaded only on Arabic pages, with the English identity (logo, colours, motion) unchanged.
5. SEO parity: Arabic `<title>`, meta description, Open Graph, JSON-LD, `hreflang` pairs (`en`, `ar`, `x-default`) on every page, both languages in the sitemap, `lang="ar" dir="rtl"` on the document.
6. CMS: each project has Arabic fields beside the English ones (title, industry, location, summary, story, results labels, image descriptions, services delivered); the admin interface itself shows in Arabic for an Arabic-language browser (Sveltia ships an `ar` interface locale) and can be switched in its settings.
7. Arabic copy of professional quality: Modern Standard Arabic in a formal-but-warm business register, consistent terminology (glossary below), no machine-translation tells, numerals and brand names handled consistently.

## Non-goals

- No per-country dialects or per-country pages; one Arabic version for the whole region.
- No automatic language detection or redirect by IP or browser language. English stays the default at the root URLs; nobody is moved to `/ar/` without clicking.
- No change to the English copy, design, or URLs.
- No Arabic for the `/admin` path itself (it stays `/admin`), and no translation of the developer docs.
- No new hosting pieces: still a static export on the existing Cloudflare Worker.

## Anti-goals (what would make this a failure even if it builds)

- A mirrored English layout with Arabic text poured in: Latin-centred letter-spacing on Arabic, display sizes that clip Arabic ascenders/descenders, arrows pointing the wrong way, "→" glyphs left as is.
- Translationese: literal renderings of English idioms ("one accountable team", "where it's stuck"), English sentence order, or marketing filler that Arabic readers find hollow.
- Mixed scripts inside a sentence where Arabic has a standard term; or, the opposite, forced Arabic for product names (ERPNext, Shopify, Frappe stay Latin).
- Any page where Arabic falls back to English silently without the visitor being told.
- Broken SEO twins: an Arabic page whose `hreflang` points to a missing English page or vice versa.

## Constraints

- Next.js 16 App Router, `output: "export"`, React 19, Tailwind 4, Bun. No server; everything is built at deploy time.
- Hosting: Cloudflare Worker `round-math-59b4`, static assets from `out/`; `_headers` and `_redirects` as today. The CSP allows `font-src 'self'` only, so fonts must be self-hosted (next/font does this).
- CMS: Sveltia CMS at `/admin`, GitHub backend, projects as JSON under `src/content/projects/`.
- Accessibility baseline (reduced motion, keyboard menu, AA contrast, sr-only labels) must hold in Arabic too.
- Existing English URLs must not change. Project slugs stay in Latin letters for both languages.

## Decisions taken in the conversation

- Audience: Libya, Gulf, Oman. Register: Modern Standard Arabic, formal business tone.
- Both languages are first-class; English remains the default and the root.
- Arabic pages live under `/ar/…` with the same paths as English.
- Switch control: "عربي" on English pages, "English" on Arabic pages; stays on the equivalent page.
- The owner enters project content in both languages in the CMS; the admin UI is in Arabic where Sveltia supports it.
- The assistant drafts all Arabic copy. Recommendation (not a blocker): a native reader on the owner's side proofreads once before the Arabic site is announced.

## Decisions the designer is making (the owner can overrule any of these)

- **Numerals:** Western Arabic digits (0–9) throughout the Arabic site, as is usual on business sites in Libya and widely accepted in the Gulf. Percent and plus signs follow the digit (`+120`, `%94` rendered via the Unicode bidi algorithm as `94%`). Dates: `2019`.
- **Arabic typeface:** IBM Plex Sans Arabic (SIL Open Font License, Google Fonts), weights 300 for display and 400/500 for body and labels. It is geometric-humanist like Geist, has proper Arabic shaping and tall ascenders that sit well at display sizes, and ships via `next/font/google` with `subsets: ["arabic"]`, so it is self-hosted and CSP-safe. Latin glyphs inside Arabic pages (brand names, digits, "ERPNext") use the same family's Latin set so lines stay even. Optika and Geist are not loaded on Arabic pages. Labels in Geist Mono (`font-mono`, uppercase tracking) have no Arabic equivalent: in Arabic, the same elements use IBM Plex Sans Arabic 500 at the same size, no uppercase, letter-spacing 0.
- **Letter-spacing and line-height:** every `tracking-[…]` negative or positive value is neutralised in Arabic (`[dir=rtl] { letter-spacing: 0 }` for display and labels); Arabic headlines get `leading-[1.25]` or looser instead of `1.04` so marks are not clipped; `text-balance` is kept.
- **Arrows:** the "→" used in links, CTAs and list rows becomes "←" in Arabic. Implemented once in `ArrowLink` and the few inline uses via a locale-aware glyph, not CSS flipping, so screen readers and copy-paste are right.
- **Marquee:** scrolls right-to-left in English today; in Arabic it scrolls left-to-right (the natural reading flow), same speed, same pause control.
- **Motion:** stagger and scroll-reveal word animations already work per word and are direction-agnostic; the mobile menu slides from the end side; magnetic CTA unchanged.
- **Brand mark and lockup:** unchanged, never mirrored. The header keeps the logo at the start edge (right in Arabic) and the menu/CTA at the end edge.
- **Service slugs and project slugs** stay English in URLs (`/ar/services/brand-identity`). Readable, shareable, and standard practice for bilingual Arabic sites.
- **Contact form:** labels, placeholders, interest options, consent note and validation messages in Arabic; `dir="rtl"` on the form; email field stays `dir="ltr"` with start alignment. A hidden `_language=ar` field is added so the owner knows which form the enquiry came from.
- **Insights, privacy, terms:** translated in full. Legal text is translated faithfully, not localised to any jurisdiction; a line at the top states that the English version prevails in case of discrepancy (my call, common practice).
- **Fallback rule for CMS content:** if a project has no Arabic entry, the Arabic site shows the English fields and a small note "هذا المشروع متاح بالإنجليزية فقط" (this project is available in English only) on the project page, and the portfolio list marks it the same way. The Arabic home page and portfolio index still list it.
- **404 page:** one bilingual 404 (English first, Arabic second) because the static export produces a single `404.html`.
- **No Arabic search console or analytics work** in this project.

## How it is built (for the builder)

### Routing and layouts

- Two root layouts via route groups: `src/app/(en)/layout.tsx` (`<html lang="en">`, Optika + Geist) and `src/app/(ar)/layout.tsx` (`<html lang="ar" dir="rtl">`, IBM Plex Sans Arabic + Geist Mono for the rare Latin label). All current English route files move into `(en)/` unchanged in URL. Arabic routes live at `src/app/(ar)/ar/...` and mirror the English tree.
- Route files become thin: each page's markup moves into a page component under `src/components/pages/` (for example `HomePage`, `ServicePage`, `ProjectPage`) that takes `locale: "en" | "ar"`. The English and Arabic route files import it and pass the locale, metadata, and static params. No page markup is duplicated.
- Navigating between languages is a full page load (two root layouts); acceptable for a language switch.
- Multiple root layouts mean Next's root `not-found.tsx` cannot sit above both. Use `global-not-found.tsx` (Next 16, enable `experimental.globalNotFound`) for the bilingual 404 and verify it is emitted as `out/404.html` by the static export; if the export does not honour it, keep `(en)/not-found.tsx` as the exported `404.html` and make its content bilingual.

### Locale plumbing

- `src/lib/i18n.ts`: `type Locale = "en" | "ar"`, `LOCALES`, `DEFAULT_LOCALE = "en"`, `dir(locale)`, `localePath(locale, path)` (`/about` → `/ar/about`), `alternatePath(locale, path)` (the twin in the other language), `arrow(locale)` ("→"/"←").
- Content: every `src/content/pages/*.ts` gets an Arabic twin in `src/content/ar/pages/*.ts` with the identical TypeScript shape, enforced with `satisfies typeof COPY` (or a shared exported type) so a missing key fails `typecheck`. `src/content/services.ts` and `src/content/site.ts` are localised the same way (`services.ar.ts`, `site.ar.ts`); slugs, hrefs and social URLs are shared, labels differ. A `getCopy(locale)` / `getServices(locale)` / `getSite(locale)` helper picks the right module.
- `pageMeta` gains a `locale` parameter and emits: canonical for the page's own language, `alternates.languages` `{ en, ar, "x-default": en }`, `openGraph.locale` (`en_US` / `ar`), and the Arabic title/description. The root layouts keep their own Organization/WebSite JSON-LD with `inLanguage` and an Arabic `description` on the Arabic layout.
- `sitemap.ts` lists both languages; `robots.ts` unchanged. `scripts/verify.mjs` checks the Arabic routes exist, each has `lang="ar" dir="rtl"`, a canonical under `/ar/`, and a reciprocal `hreflang` pair.

### RTL styling

- Replace physical direction utilities with logical ones across components: `ml/mr → ms/me`, `pl/pr → ps/pe`, `left/right → start/end`, `text-left/right → text-start/end`, `rounded-l/r → rounded-s/e`, `border-l/r → border-s/e`, `translate-x` hover nudges → `rtl:-translate-x`/`ltr:translate-x` via Tailwind's `rtl:` variant. The grep for `\b(ml|mr|pl|pr|left|right|text-left|text-right)-` in `src/` must end at zero hits except deliberate ones (`focus:left-4` on the skip link becomes `focus:start-4`).
- `globals.css`: `[dir="rtl"]` overrides for letter-spacing, display line-height, the marquee animation direction, and the font variables (`--font-display` and `--font-sans` point to the Arabic family on the Arabic layout via the `next/font` variable class names, so Tailwind's `display`/`font-sans` classes need no change).
- Icons and glyphs: the ArrowLink and TextRoll components accept the locale (or read it from a small `LocaleProvider` context set by each root layout) so the glyph and any directional animation flip. "Scroll" cues and progress blur are symmetric already.
- Check at 1366×768, 1440×900 and 375×812 in Arabic: hero (headline fits in `max-w-[20ch]` with the looser leading), services stages, statement band, proof block, numbers, CTA, header menu open, contact form, a service page, a project page, privacy.

### Language switch

- Header: a text button "عربي" / "English" next to the CTA on desktop, and at the top of the mobile menu, `hreflang` and `lang` attributes on the link, `aria-label` "Switch to Arabic" / "التبديل إلى الإنجليزية". Footer: a small "English · عربي" pair in the bottom bar. The target is `alternatePath(locale, pathname)`; for project pages without an Arabic entry, it still goes to the Arabic project page (which shows the English-only note).

### CMS

- `public/admin/config.yml`: add top-level `i18n: { structure: multiple_files, locales: [en, ar], default_locale: en, save_all_locales: false }` and on the projects collection `i18n: true`. Text fields get `i18n: true` (title, industry, location, tags, summary, body, results.label, coverAlt, gallery.alt); shared fields get `i18n: duplicate` (published, featured, order, year, cover, gallery.image, results.value, liveUrl). Field labels and hints stay English in the config (Sveltia translates its own chrome; collection labels are ours and can be given in both via a second `label` string "Projects · المشاريع").
- Files become `src/content/projects/<slug>.en.json` and `<slug>.ar.json`. Migration: rename the three existing files to `.en.json` and write their `.ar.json` twins in the same change (title, industry, location, tags and summary in Arabic, using the glossary), so the Arabic site launches without a single "English only" note. From then on the CMS writes `.ar.json` when the owner fills the Arabic tab. (Designer's call: the three entries are placeholders the owner will replace through the CMS, but the launch state must not be a wall of fallback notes.)
- `src/lib/projects.ts`: `getProjects(locale)` reads `<slug>.<locale>.json`, falling back to the English file for missing or empty Arabic fields, and marks the project `translated: false` so pages can show the English-only note. Slug stays the base name. The existing `_none` placeholder logic for zero projects is kept.
- Sveltia UI locale: the interface follows the browser language and can be set to Arabic in the CMS's own Settings. `docs/cms.md` explains the Arabic tab, the fallback rule, and how to switch the interface language.

### Translation

- All Arabic copy is written into the `src/content/ar/**` modules in the same change as the plumbing so `typecheck` guarantees completeness.
- Glossary (fixed terms, used everywhere):
  - Vellox Studio → Vellox Studio (Latin, never transliterated); "Business Development Studio" → استوديو تطوير الأعمال
  - Brand Strategy → استراتيجية العلامة التجارية · Brand Identity → الهوية البصرية · User Experience Design → تصميم تجربة المستخدم · Visual Content → المحتوى البصري · Web Development → تطوير المواقع · eCommerce → المتاجر الإلكترونية · Web and Mobile Apps → تطبيقات الويب والجوال · ERPNext Implementation → تنفيذ نظام ERPNext
  - founder → مؤسِّس / المؤسسون · store (online) → متجر إلكتروني · website → موقع إلكتروني · brand book → دليل الهوية · case study → دراسة حالة · portfolio → الأعمال · insights → رؤى · retainer → عقد متابعة شهري · Frappe Partner → شريك معتمد لـ Frappe · wellness → الصحة والعافية · fintech → التقنية المالية · F&B → الأغذية والمشروبات · EU and MENA → أوروبا والشرق الأوسط وشمال أفريقيا
  - Start a Project → ابدأ مشروعك · Contact → تواصل معنا · About → عن الاستوديو · Services → خدماتنا · Read more → اقرأ المزيد · All work → كل الأعمال
- Style rules: address the reader as a founder with respect (أنتم avoided; use direct second-person singular masculine as standard business Arabic, e.g. "تواصل معنا"); short sentences; no English word order; numbers Western; testimonials translated with the person's name and company kept Latin unless they are Arabic names; statistics labels rewritten naturally ("120+ مشروعًا منذ 2019").
- Quality gate before the Arabic site is linked from the English header: the owner (or a native reader they choose) reads the home, services index, one service page and the contact page and signs off. Until then the Arabic site can ship unannounced behind one flag, `ARABIC_LIVE` in `src/lib/i18n.ts`. With the flag off, the Arabic pages are still built and reachable by URL for the reviewers, but: the header and footer switch is not rendered, `pageMeta` emits no `hreflang` alternates, `sitemap.ts` lists no `/ar/` URLs, the Arabic root layout adds `<meta name="robots" content="noindex">`, and `scripts/verify.mjs` skips the reciprocal-pair check. With the flag on, all of that turns on together. Default in this change: flag on, since the owner asked for the full feature; flipping it off before a deploy is a one-line change. (Designer's call, so that an unproofread Arabic site is never indexed by accident.)

## What's left to the builder

- Exact component split under `src/components/pages/` and the context vs. prop choice for locale.
- Whether `global-not-found` works with the static export (verify; fallback described above).
- Precise Arabic display sizes per breakpoint after seeing the typeface rendered.
- The `rtl:` variant vs. `[dir=rtl]` CSS for each case.
- Order of work: plumbing and layouts first (English must keep building and looking identical at every step), then RTL styling, then content modules, then CMS, then verification.

## Verification

- `bun run typecheck`, `bun run lint`, `bun run build`, `bun run verify` (extended) pass.
- Crawl of `out/` shows every English URL unchanged and an Arabic twin for each, with reciprocal `hreflang`.
- Visual check of the Arabic pages at the three sizes listed; English pages pixel-equal to before (spot check).
- CMS: open `/admin` locally with "Work with Local Repository", confirm the Arabic tab appears on a project, fill it, confirm `<slug>.ar.json` is written and the Arabic project page shows it after a rebuild.
