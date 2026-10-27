# Vellox Studio — Website Copy Review

Independent, read-only review of every user-facing string in `src/content/**`, `src/app/**/page.tsx`, `src/components/*.tsx`, cross-checked against the built pages in `out/`. No files were changed. Date: 2026-10-27.

## Scores

Scale 0–10. "Overall" is a judgement, not an average.

| Page | Clarity | Persuasion / credibility | Tone | Grammar & spelling | Length | SEO (title / description / headings) | Overall |
|---|---|---|---|---|---|---|---|
| Home (`/`) | 8 | 6 | 8 | 9 | 8 | 8 | **7.5** |
| About | 7 | 6 | 8 | 9 | 7 | 6 | **7** |
| Services index | 7 | 6 | 8 | 9 | 8 | 5 | **7** |
| Brand Strategy | 7 | 7 | 8 | 9 | 5 | 6 | **7** |
| Brand Identity | 8 | 7 | 8 | 9 | 6 | 6 | **7.5** |
| User Experience Design | 7 | 6 | 7 | 9 | 5 | 6 | **6.5** |
| Visual Content | 7 | 5 | 8 | 8 | 7 | 6 | **6.5** |
| Web Development | 6 | 7 | 8 | 9 | 5 | 6 | **6.5** |
| eCommerce | 7 | 6 | 8 | 9 | 5 | 6 | **6.5** |
| Web & Mobile Applications | 6 | 6 | 8 | 8 | 5 | 6 | **6.5** |
| ERP Implementation (ERPNext) | 8 | 8 | 8 | 9 | 8 | 8 | **8.5** |
| Portfolio index | 6 | 4 | 7 | 9 | 6 | 6 | **6** |
| Case study pages (×3) | 4 | 3 | 7 | 9 | 2 | 4 | **4** |
| Insights | 6 | 4 | 7 | 9 | 5 | 3 | **5** |
| Contact | 8 | 7 | 8 | 9 | 8 | 5 | **7.5** |
| Privacy Policy | 9 | 8 | 8 | 9 | 9 | 7 | **8.5** |
| Terms of Use | 9 | 8 | 8 | 8 | 9 | 7 | **8.5** |
| 404 | 7 | 5 | 7 | 9 | 8 | n/a | **7** |
| Global (nav, footer, tagline, form states) | 7 | 6 | 8 | 8 | 9 | 7 | **7** |
| **Site overall** | | | | | | | **6.5 / 10** |

**Summary for the owner.** The site has clearly moved on from the 3.5 audit: there are no placeholders, no broken grammar, the legal pages are plain-English and correct, and the ERP page is genuinely good — concrete, honest, written for a business owner. What holds the whole site at 6.5 is one structural credibility gap and two habits:

1. **The proof is disconnected from the work.** The About page carries six detailed testimonials with hard numbers (12 weeks, 28% conversion lift, Lighthouse 42→98, 4.8 store rating), but the three case-study pages for the *same clients* contain one sentence each and nothing else. A visitor who follows a testimonial to the portfolio finds an empty page. Three of the six testimonial companies do not appear in the portfolio at all. This is the single biggest thing to fix, and it is a writing task, not an imagery task.
2. **Repetition.** One CTA paragraph appears 11 times. "No hand-offs / translation loss / same room / under one roof" is said in five places. Inside the service pages, 46 sub-service blurbs follow the identical four-sentence template ("Build X. We handle A, B, C. The deliverable is Y. Closing aphorism."). It reads as generated, and a founder stops reading by the third one.
3. **Jargon and audience drift.** The site says "founders" and names three verticals, but the service catalogue talks to CTOs and enterprise buyers (multi-tenant, headless, dunning, OpenAPI, SLA, PCI, DocTypes). The testimonials are from a VP Product, a Head of Digital and an Editor-in-Chief, not founders. Decide who the site is for and write every page to that person.

---

## Page-by-page notes

### Global: nav, footer, tagline (`src/content/site.ts`, `Header.tsx`, `Footer.tsx`, `layout.tsx`)

- **Tagline is abstract.** `site.ts:23-24` — "A business development studio building brands, products, and the systems that scale them." Says nothing about *who* or *where*. It is also the default meta description (`layout.tsx:15`) and the 404 description. Rewrite: *"Brand, web, eCommerce and ERPNext for wellness, fintech and F&B founders — one remote team across the EU and MENA."*
- **Capitalisation inconsistency.** `site.ts:13` "Start a Project" (header, hero, case-study page) vs `Footer.tsx` ArrowLink "Start a project". Pick one (sentence case "Start a project" matches the rest of the site's lower-key tone).
- **Service names differ by location.** Footer `site.ts:32` "UX Design", `:41` "Mobile Apps", `:42` "ERP Implementation"; home marquee `home.ts:15,18,20` same short forms; contact checkboxes `contact.ts:32,36,37` use the long forms "User Experience Design", "Web & Mobile Applications", "ERP Implementation & Customization"; browser title for ERP is a fourth variant "ERPNext Implementation & Customization" (`services/[slug]/page.tsx:34`). Short forms in nav/marquee are fine, but they should be the *same* short forms everywhere, and the contact form should use them too. See the naming table under Inconsistencies.
- **"Frappe Partner" vs "Frappe partners".** Badge `services.ts:171` is singular proper noun; tagline `services.ts:152` and intro `:155` say "Frappe partners" lowercase plural, which reads as "some partners of Frappe" rather than the official programme. Use "a Frappe Partner" consistently.
- **JSON-LD** `layout.tsx:41` areaServed "Europe" while all copy says "EU". Minor; align to "European Union" or change copy to "Europe".
- **Footer credit** "Interface components adapted from Skiper UI and Vengeance UI" is fine, but it is the last thing a prospect reads on every page. Consider moving it to `/terms` ("Our content" section).
- Form states (`ContactForm.tsx:208, 217`) are good: short, human, give a fallback email. `aria-label="Project enquiry"` (`:70`) uses UK spelling while the site otherwise uses US spelling ("color", "customize", "optimization").

### Home (`src/content/pages/home.ts`, `src/app/page.tsx`) — 7.5

What works: the H1 (`home.ts:6`) is the best sentence on the site — audience, offer and scope in one line. The title tag (`page.tsx:23`) and meta description (`home.ts:8`) are the only SEO-complete pair on the site. The page is lean.

Problems:
- `home.ts:3` **"Est. 2019 — Remote / On-site"** contradicts About (`about/page.tsx:24` "Operating remotely") and Contact (`contact.ts:12` "Remote / EU / MENA"). "On-site" where? The site never says where you are. Rewrite: metaLeft *"Est. 2019 · Remote-first"*, metaRight *"Based in Libya · Clients across EU & MENA"*. Saying Libya is a decision for you, but "where" is one of the four things a first-time visitor needs and right now the answer is "somewhere in two continents".
- `home.ts:46` and `about.ts:52` **"verified via LinkedIn references"** under 94% retention. This undercuts the number: a visitor cannot verify it on LinkedIn, and "verified" invites the question "by whom?". Rewrite: *"client references available on request"* (which About already says at `about.ts:34`).
- `home.ts:51-52` label **"Avg. Time to Launch"**, sub-label **"median across 2024–2025"**. Average and median are different statistics. Rewrite label: *"Median Time to Launch"*, sub: *"across 2024–2025 projects"*.
- `home.ts:39-40` **"8 Industries Served — Wellness · Fintech · F&B · SaaS · more"**. The hero just said you focus on three. Eight industries plus "more" dilutes the niche and "more" is filler. Either drop this stat (three strong stats beat four) or make it *"3 core verticals — Wellness · Fintech · F&B"*.
- `home.ts:24-25` **"Eight practice areas, one accountable team"** + **"Click any practice"**. "Practice area" is law-firm language and is then contradicted by the row labels "6 services", "5 services" (`services.ts:31,50…`), which make it look as if Brand Strategy *is* six of your services. Rewrite body: *"Strategy, design, and engineering under one roof. Open any service to see what's included and how we run it."* and change the `count` strings to *"6 deliverables"* or drop them from the home rows.
- `page.tsx:119,123` the dark band repeats the hero support line almost word for word ("One accountable team… No hand-offs, no translation loss, no surprises at launch."). Use this band for something new, e.g. a one-line proof: *"Brand, store and ERP from the same team — so the thing you launch is the thing you planned."*
- `home.ts:57-58` CTA band is the generic paragraph (see Repetition).

### About (`src/content/pages/about.ts`, `src/app/about/page.tsx`) — 7

What works: the four principles are the best-written prose on the site — specific, opinionated, right length. "Strategy is what stops a beautiful site from being the wrong beautiful site" (`about.ts:19`) is a genuinely good line. The testimonials are specific and credible *as text*.

Problems:
- `about.ts:3` **"We pair the discipline of a strategy consultancy with the craft of a design studio."** This is a third self-definition (home: "Business Development Studio"; services: "full-service studio"). It also omits engineering and ERP, which is half of what you sell. Rewrite: *"One team for the brand, the product, and the system behind it."* and keep "business development studio" as the eyebrow.
- `about.ts:4` lede is a paraphrase of the footer tagline plus the founding year; fine, but it is also the meta description and should carry the differentiator: *"Founded in 2019, Vellox is a remote studio working across the EU and MENA. We help wellness, fintech and F&B founders build the brand, the website or store, and the ERP that runs the business — with one team, not three agencies."*
- `about.ts:24` **"sit in the same room — sometimes literally, always operationally"** on a page whose own sidebar says "Operating remotely". Rewrite: *"Strategy, design, and engineering are the same people from kickoff to launch — no hand-off between agencies, no translation loss between disciplines, and no finger-pointing when something breaks."*
- `about.ts:29` **"choosing tools you can still hire for in 2028"** — it is late 2026; "2028" is 15 months away and will read as stale very soon. Rewrite: *"choosing tools you can still hire for five years from now."*
- **Testimonials vs portfolio** (`about.ts:68-108` vs `src/content/projects/*.json:15-16` where `body` is `""` and `results` is `[]`). Mara Lindqvist says the Atlas rebuild took twelve weeks; the Atlas page says nothing. Idris Karam says nine weeks vs six months quoted elsewhere; Northwind page says nothing. Layla Haddad says packaging drove a "measurable lift in shelf pick-up"; Aurelia page says nothing. Maison Verre, Polaris Quarterly and Helix Health have no portfolio entry at all despite the most quantified claims (28% conversion, Lighthouse 42→98, 60% organic growth, 4.8 rating, 40% fewer support tickets). See Priority rewrite #1.
- Testimonials are from a CEO, Founder, Co-Founder, Head of Digital, Editor-in-Chief, VP Product — half are not founders. Either widen the audience language site-wide ("founders and operators") or lead with the three founder quotes.
- The stats block is duplicated verbatim from the home page (`about.ts:35-60` = `home.ts:29-54`). Fine to show twice, but on About add the note before the numbers, not after.
- `about/page.tsx:19-20` generic CTA again.

### Services index (`src/content/pages/services-index.ts`, `src/app/services/page.tsx`) — 7

- `services-index.ts:3` **"A full-service studio covering brand, product, and engineering — from first sketch to scaled deployment."** "Scaled deployment" is engineering-speak; "full-service" is agency-speak; the audience and region are missing. Rewrite: *"Eight services, one team — from the first positioning workshop to the store, app, or ERP that runs your business."*
- `services-index.ts:4` lede repeats home ("Eight practice areas, one accountable team") and About ("sit in the same room"). Rewrite: *"Pick one service or combine several. Most clients start with brand or web and add eCommerce or ERPNext as they grow."* (Only if true — it also tells a founder *how* to buy from you, which no page currently does.)
- The auto-generated row descriptions (`services/page.tsx:20`, "…Includes Brand Positioning, Competitor & Market Research, Brand Architecture, and more.") are a good idea and read well. Note the ERP row reads "Includes Discovery & process mapping, ERPNext core setup, Custom app development" — lowercase, because `services.ts:158-164` uses sentence case while every other service uses Title Case. Make ERP's `included` Title Case to match.
- SEO: title `services/page.tsx:9` "Services — Vellox Studio" has no keywords. Rewrite: *"Brand, Web, eCommerce & ERPNext Services — Vellox Studio"*.

### Service detail pages — general (applies to all eight)

The rendered page = `services.ts` tagline + intro + timeline, then `pages/<slug>.ts` `included` + `approach` + `cta`.

- **Dead copy.** Every `pages/<slug>.ts` (except ERP) also defines `tagline` and `intro` (e.g. `brand-strategy.ts:5-8`, `user-experience-design.ts:5-8`) that are **never rendered** — `services/[slug]/page.tsx:156` reads `service.intro` from `services.ts`. They have already drifted: `web-mobile-applications.ts:7` has an extra sentence not in `services.ts:135`; `user-experience-design.ts:5` has a different (better) tagline than the one shown. Whoever edits the page file expecting a change will see none. Recommend deleting those two fields from the page files, or wiring them in and deleting from `services.ts`. (One of the UX page taglines is better than the live one — see UX below.)
- **The four-sentence template.** 46 blurbs, every one: imperative verb sentence → "We handle/develop/design A, B, C, D, E" list → "The deliverable/output is …" → closing maxim. Count of "The deliverable is" / "The output is": 30+. Suggest cutting each blurb to two sentences (what it is, what you get) and letting the "How we run…" steps carry the process.
- **Intros are single 5-sentence paragraphs** (`services.ts:20,40,59,79,95,115,135`). Split each after sentence two or three; the timeline sentence is already duplicated in the Timeline sidebar (`services.ts:30,49,69,166`) and can be cut from the intro.
- **SEO titles** are "<Service> — Vellox Studio" with the tagline as description. No audience, no region, no partner credential. See Priority rewrite #10.
- **CTA body** identical on seven of eight pages (`*.ts` `cta.body`). ERP's variant (`erp-implementation.ts:71`) shows how easy it is to tailor: "Tell us how your operations run today…". Do the same for each.

#### Brand Strategy — 7
- `services.ts:18` **"before you spend a dollar"** — EU/MENA audience. Rewrite: *"before you spend a cent on identity or marketing."*
- Triple repetition inside one page: "Define who you are, who you serve, and why you're different" (`services.ts:18` tagline and `brand-strategy.ts:14` first sentence); "articulate a single defensible position in the market" (`services.ts:20` and `brand-strategy.ts:14`); "Without sharp strategy… subjective" (`services.ts:20` and `brand-strategy.ts:14`). Cut the Positioning blurb to: *"We turn research and stakeholder interviews into one positioning statement that every later decision — name, identity, messaging — is checked against."*
- `services.ts:20` "lands or flops" and "operationalize" (used again at `brand-strategy.ts:63` and `insights.ts:10`). Replace "operationalize" with "put to work" / "use from day one".
- `brand-strategy.ts:24` "branded house, house of brands, endorsed brands, or hybrid" — jargon; keep but add "(how your products and sub-brands relate)".
- `brand-strategy.ts:63` "A 20–40 page playbook" and `brand-identity.ts:58` "A 30–60 page PDF" — page counts are an odd thing to promise; "a playbook your team can use from day one" is enough.

#### Brand Identity — 7.5
- Strongest tagline on the site (`services.ts:38`). Intro line "16-pixel favicon and a 16-meter billboard" (`services.ts:40`) is good.
- `brand-identity.ts:24` **"This is what allows a 50-person team to ship on-brand work"** — your clients are founders; a 50-person team is not their world. Rewrite: *"This is what lets your team — and any freelancer you hire — ship on-brand work without asking us."*
- `brand-identity.ts:29` "Rebrands are politically sensitive" — true but a touch cynical for a sales page; *"Rebrands touch every team"* is warmer.
- `brand-identity.ts:67` CTA heading "Ready for an identity that holds up?" is good.

#### User Experience Design — 6.5
- `services.ts:57` live tagline **"…digital products that feel inevitable"** is vague; the unrendered tagline in `user-experience-design.ts:5` **"Products people choose to use, not products they have to use"** is much better — promote it to `services.ts`.
- `services.ts:59` **"We're not pixel-pushers; we're product partners who happen to be very good at design."** Self-congratulatory and mildly insulting to designers; a founder does not know what a pixel-pusher is. Rewrite: *"We design with the business goal in front of us, and we hand engineering everything they need to build it without guessing."*
- `user-experience-design.ts:72` CTA **"Ready to fix the experience?"** assumes the visitor's product is broken. Rewrite: *"Ready to design something people choose to use?"*
- Jargon: "information architecture" (×3), "card sorts", "Human Interface Guidelines, Material Design", "conditional logic", "spacing tokens", "coded component library (React, Vue, or Swift)".
- The "Products people choose…" line appears in the UX/UI blurb (`user-experience-design.ts:14`) — if promoted to tagline, remove it there.

#### Visual Content — 6.5
- **Credibility question for a remote studio.** `services.ts:79` "casting, location scouting, lighting… multi-day campaign productions with full crews" and `visual-content.ts:43` "We work with experienced DPs and photographers". Where do shoots happen for a studio that is remote across EU/MENA? A founder in Dubai or Berlin will ask. Add one honest sentence: *"We art-direct remotely and shoot with partner photographers and crews in [Tripoli / Dubai / your cities], or travel to you."*
- Spelling: `services.ts:77` "e-commerce photography" and `:84` "E-commerce Shoot" vs brand spelling "eCommerce" everywhere else (`services.ts:111`). Standardise on "eCommerce".
- "consideration sets" (`services.ts:79`) is marketing-research jargon; "shortlists" does the job.
- "DPs" (`visual-content.ts:43`) = directors of photography; spell out.
- Singular/plural: "Lifestyle & Campaign Shoot", "E-commerce Shoot" vs "Shopify Stores", "Web Applications". Use plurals: "Lifestyle & Campaign Shoots", "eCommerce Shoots".
- CTA "Ready to plan your next shoot?" (`visual-content.ts:57`) is well tailored.

#### Web Development — 6.5
- Most jargon-dense page: "Next.js, TypeScript, and Prisma", "multi-tenant SaaS", "Core Web Vitals in the green" (×2: `services.ts:95`, `web-development.ts:14`), "Node, Bun, or serverless", "Postgres", "headless CMS (Sanity, Contentful, or Payload)", "feature flags", "DNS cutover", "retry logic", "code splitting", "rendering strategy", "Lighthouse". A CTO loves this; a wellness founder does not. Keep the stack *once* in a sidebar or the Website Development blurb and strip it from the intro: *"We build fast, search-friendly sites your team can edit without us, and we stay on after launch."*
- `services.ts:95` **"easy to hire for"** is a good founder-level benefit — keep.
- Internal contradiction: intro says you build in Next.js "by default", Website Development blurb (`web-development.ts:14`) says "Next.js, Astro, or Webflow depending on the project". Fine, but say "usually Next.js; Webflow when your team wants to edit visually".
- Repetition inside the page: "demoable features every Friday" (`web-development.ts:24` and `:58`); "small monthly feature budget" (`:39` and `:68`); maintenance retainer in intro, blurb 06 and step 04.
- `web-development.ts:63` **"Launches are non-events because the work is done before launch day."** Bold claim; a single bad launch makes it a lie. Soften: *"We aim for launches to be uneventful — the QA, analytics and monitoring are done before launch day."*
- `web-development.ts:39` "a dedicated Slack channel" — fine for EU, but MENA clients often live in WhatsApp (which you mention on the ERP page). *"a dedicated Slack or WhatsApp channel."*
- CTA "Ready for a faster website?" (`web-development.ts:77`) assumes the visitor already has a slow one; many are building their first. *"Ready to build a site that performs?"*

#### eCommerce — 6.5
- **Claim stated twice, unsupported:** `services.ts:115` "most clients stay on a CRO retainer that lifts revenue 15–40% within six months" and `ecommerce.ts:29` "Most CRO clients see 15–40% revenue lift within 6 months." Sofia Reinhart's 28% is the only proof on the site and it is on a different page. Either anchor it (*"Our CRO retainers have lifted revenue 15–40% within six months — Maison Verre saw 28%."*) or soften (*"…a CRO retainer that tests and reports revenue impact every month."*) and say it once.
- `ecommerce.ts:53` **"The wrong platform choice costs years; we get it right on day one."** Over-promise. *"We make the platform call before any code is written, because changing it later is the expensive mistake."*
- `ecommerce.ts:24,58` "zero-downtime cutover" — promise "no downtime" only if you can; *"planned cut-over with the old store live until the new one is verified"* is the ERP page's more honest phrasing and should be reused here.
- `services.ts:115` "Our work has shipped across wellness, F&B, fashion, and B2B verticals" — fashion is new; B2B is not a vertical.
- Jargon: "headless", "CRO" (expand once: "conversion rate optimisation — making the traffic you already have buy more"), "dunning", "Stripe Connect, Mangopay", "Commerce Layer", "POs, multi-tier approvals", "SLA".
- Both "cutover" (`ecommerce.ts:24,58`) and "cut-over" (`erp-implementation.ts:27,56`) are used. Pick one.

#### Web & Mobile Applications — 6.5
- **Name doesn't match content.** Title says "Web & Mobile Applications" but the intro (`services.ts:135`) is 100% mobile, and web apps are already sold under Web Development (`services.ts:99` "Web Applications"). Internal tools appear in both (`web-development.ts:19` "internal tools", `web-mobile-applications.ts:19` "Internal Business Tools"); "API Integrations" (web) vs "API Development" (mobile). Either rename this service "Mobile Apps" (which the footer and marquee already do) and move Internal Tools/API Development to Web Development, or rewrite the intro to actually cover web apps.
- `services.ts:143` and `web-mobile-applications.ts:38` **"Payments Systems"** → "Payment Systems".
- `services.ts:135` "Our work has shipped across consumer, B2B, healthcare, and education verticals" — none of these is wellness, fintech or F&B. Reframe: *"…including booking systems for wellness studios, payment flows for fintechs, and ordering apps for F&B."* (only if true; otherwise cut the sentence).
- `web-mobile-applications.ts:14` duplicates the intro's "Mobile engagements include design, development… post-launch monitoring" sentence (`services.ts:135`) on the same page.
- `web-mobile-applications.ts:19` "replace spreadsheets and Slack DMs" — good, concrete.
- `web-mobile-applications.ts:39` lists seven payment processors incl. "mada, iDEAL, PayTabs, Tap" — the regional ones are a real differentiator for MENA; lead with that: *"including the regional processors your customers already trust (Tap, PayTabs, mada)."*
- `web-mobile-applications.ts:63` "our north stars" — jargon; "what we track".

#### ERP Implementation & Customization — 8.5
Best page on the site. It names the audience in sentence one (`services.ts:154`), says what the product replaces ("spreadsheets and disconnected SaaS tools"), uses the owner's words ("month-end close", "numbers your finance team signs off on", "without calling us for every question"), has a tailored CTA (`erp-implementation.ts:70-71`), and the approach steps are honest about risk ("The old system stays read-only until balances match"). Model the other seven pages on this one.

Small fixes:
- `services.ts:152,155` "Frappe partners" → "a Frappe Partner" (see Global).
- `services.ts:154` "Accounting, Inventory, CRM, and HR" vs `services.ts:159` "Accounting, Stock, Selling/Buying, Manufacturing" — ERPNext calls it Stock; pick one list and use it in both places.
- `services.ts:158-164` sentence case vs Title Case elsewhere (shows on services index).
- Jargon for a founder: "DocTypes", "order-to-cash, procure-to-pay", "BOMs", "Frappe REST API and background jobs". Each is fine with a 3-word gloss, e.g. *"custom DocTypes (your own forms and records)"*.
- Title override `services/[slug]/page.tsx:34` "ERPNext Implementation & Customization — Vellox Studio" is good; add the credential and region: *"ERPNext Implementation & Customization | Frappe Partner, EU & MENA — Vellox Studio"*.

### Portfolio index (`src/content/pages/portfolio.ts`, `src/app/portfolio/page.tsx`) — 6
- Four different labels for the same thing: eyebrow "Latest Work" (`portfolio.ts:2`), H1 "Selected projects" (`:3`), section "Recent engagements in detail" (`:14`), home "Selected engagements" (`page.tsx:~136`), link "All work". Pick "Selected work" and use it everywhere.
- `portfolio.ts:4` **"across wellness, fintech, F&B, and publishing"** — publishing appears nowhere else and there is no publishing case study (Polaris Quarterly is only a testimonial). Remove "publishing" or add the case study.
- `portfolio.ts:4` **"Each project ships with strategy, design, and engineering under one roof"** — Aurelia is Brand Identity · Packaging · Web Design, i.e. no engineering. Rewrite lede: *"Three recent engagements across wellness, F&B and fintech. More, with full galleries, are being added."*
- `portfolio.ts:8` "Project galleries are on their way." is honest, but `portfolio.ts:10` then puts the generic CTA paragraph *under the gallery heading* as a sub-caption, where it makes no sense. Replace with: *"Want to see more before the galleries land? Ask and we'll send a PDF."*
- Case-study cards (`CaseStudyCard.tsx`) show tags, summary, location, industry — fine. "View project →" leads to the thin pages below.

### Case study pages (`src/content/projects/*.json`, `src/app/portfolio/[slug]/page.tsx`) — 4
Rendered content per page: title, tags, one-sentence summary, Industry, Location, "Have a project like this?", next project. `body: ""` and `results: []` in all three JSON files (lines 15-16). This is a copy problem independent of imagery: a visitor who clicks a testimonial name gets nothing. See Priority rewrite #1 for a template. Also:
- Summaries describe the *client*, not the *work*: `aurelia-wellness.json:14` "Premium wellness brand offering cold-pressed botanicals and adaptogenic blends." Rewrite: *"Brand identity, packaging and website for a premium UAE wellness brand — now on shelf and online."*
- Locations: Singapore, Norway, UAE — only one is in your two regions, and Norway is not in the EU. If these are real, fine, but the hero claims "EU · MENA".
- `year` is empty on all three; the Year row is hidden, but a case study without a year reads as evergreen filler. Add years.
- Title `portfolio/[slug]/page.tsx:29` "Atlas Fintech — Vellox Studio Portfolio" is fine; description is the one-sentence summary.

### Insights (`src/content/pages/insights.ts`) — 5
Honest ("Topics we're writing about next", status "In progress") and the excerpts are specific — that is an improvement. But a top-nav item that leads to three unwritten articles still costs trust. Options: (a) hide "Insights" from `NAV_ITEMS` until one article exists, keeping the page reachable from the footer; or (b) keep it and change the CTA labels `insights.ts:11,17,23` "Discuss this topic" to *"Get the draft early"* and promise a date. Meta description (`insights.ts:4` "Articles… are in progress…") is useless to search; set a static one: *"Notes from Vellox Studio on brand strategy, naming, and web engineering for wellness, fintech and F&B founders."* Excerpt `insights.ts:10` uses "operationalize" again.

### Contact (`src/content/pages/contact.ts`) — 7.5
Good: short, honest, privacy note is excellent (`contact.ts:39`), field labels plain. Fixes:
- `contact.ts:12` "Studio: Remote / EU / MENA" — a studio can't be in "EU / MENA". *"Remote-first, based in Libya. Clients across the EU and MENA."*
- `contact.ts:16` "Mon–Fri · 9:00–18:00 CET" — fine if deliberate; for a MENA audience add the offset: *"9:00–18:00 CET (UTC+1)"*. Also note that for Gulf clients Sunday is a working day; consider *"Mon–Fri, replies on Sundays too"* if true.
- `contact.ts:3-4` H1 and lede are the generic CTA paragraph again, and the lede is the meta description — it says nothing about what you do. Set a distinct `metaDescription`: *"Start a brand, web, eCommerce or ERPNext project with Vellox Studio. Remote across the EU and MENA. We reply within 24 hours."*
- "diagnostic call" (used 11 times site-wide) sounds medical. *"a short intro call"*.

### Privacy (`privacy.ts`) — 8.5 and Terms (`terms.ts`) — 8.5
Plain-English, correctly scoped, name the processors, give retention and rights. Praise deserved. Nits: `privacy.ts:9` "controller" is legally necessary — add "(the company responsible for it)". UK spellings `privacy.ts:23` "enquiry", `terms.ts:9` "unauthorised" vs US spelling everywhere else; `terms.ts:27` "as is" is normally written "as is" in quotes or "as-is". Dates "October 26, 2026" match the build; keep them current.

### 404 (`not-found.tsx:14`) — 7
"This page could not be found." + "Back to home" is fine. Slightly warmer and more useful: *"That page isn't here. Try Services or Portfolio, or go back home."*

---

## (1) Repeated sentences across pages

| Text | Where | Count |
|---|---|---|
| "Tell us what you're building. We typically reply within 24 hours with a short diagnostic call to align on scope, timeline, and fit." | `home.ts:58`, `about/page.tsx:20`, `contact.ts:3-4` (split as H1+lede), `portfolio.ts:10`, `brand-strategy.ts:73`, `brand-identity.ts:68`, `user-experience-design.ts:73`, `visual-content.ts:58`, `web-development.ts:78`, `ecommerce.ts:78`, `web-mobile-applications.ts:73`, `services/[slug]/page.tsx:50` (fallback) | 11 rendered + ERP variant |
| "No hand-offs, no translation loss…" / "no hand-off between agencies… translation loss" | `home.ts:7`, `page.tsx:123`, `about.ts:24`, `services-index.ts:4`, `portfolio.ts:4` | 5 |
| "Strategy, design, and engineering under one roof / in the same room / one accountable team" | `home.ts:7,24,25`, `page.tsx:119`, `about.ts:24`, `services-index.ts:4`, `portfolio.ts:4` | 7 |
| "Eight practice areas, one accountable team." | `home.ts:24`, `services-index.ts:4` | 2 |
| Stats block (4 stats + sub-labels) | `home.ts:29-54`, `about.ts:35-60` | 2 (identical) |
| "Define who you are, who you serve, and why you're different" | `services.ts:18`, `brand-strategy.ts:14` | 2 (same page) |
| "articulate a single defensible position in the market" | `services.ts:20`, `brand-strategy.ts:14` | 2 (same page) |
| "Core Web Vitals in the green" | `services.ts:95`, `web-development.ts:14` | 2 (same page) |
| "demoable features every Friday" | `web-development.ts:24,58` | 2 (same page) |
| "small monthly feature budget" / maintenance retainer | `services.ts:95`, `web-development.ts:39,68` | 3 (same page) |
| "15–40% revenue lift within six months" | `services.ts:115`, `ecommerce.ts:29` | 2 (same page) |
| "monthly report on revenue impact" | `ecommerce.ts:29,68` | 2 |
| "30-day post-launch support window" | `ecommerce.ts:63`, `web-mobile-applications.ts:58` | 2 |
| "Mobile engagements include design, development, App Store/Play Store submission, and post-launch monitoring" | `services.ts:135`, `web-mobile-applications.ts:14` | 2 (same page) |
| "earns attention in feeds, on shelves" | `services.ts:79` (+ unrendered `visual-content.ts:5`) | 2 |
| "The deliverable is…" / "The output is…" | all `pages/<service>.ts` `included[].body` | 30+ |
| "operationalize(d)" | `services.ts:20`, `brand-strategy.ts:63`, `insights.ts:10` | 3 |
| Footer tagline ≈ About lede | `site.ts:24`, `about.ts:4` | 2 |

## (2) Jargon a founder would not understand (with plain substitutes)

- **Positioning/brand:** "practice areas" (→ services), "brand architecture — branded house, house of brands, endorsed" (→ how your products and sub-brands relate), "consideration sets" (→ shortlists), "go-to-market", "operationalize" (→ put to use), "messaging hierarchy", "white space", "touchpoints" (→ everywhere customers meet you), "translation loss".
- **UX:** "information architecture" (→ how the product is organised), "card sorts", "Human Interface Guidelines / Material Design", "conditional logic", "spacing tokens", "component library", "UI kit", "pixel-pushers".
- **Web/eCommerce:** "Next.js, TypeScript, Prisma, Postgres, Node, Bun, serverless, Astro, Payload, Sanity, Contentful", "multi-tenant SaaS", "headless storefront", "Core Web Vitals", "Lighthouse score", "CDN", "code splitting", "rendering strategy", "feature flags", "DNS cutover", "retry logic", "CRO", "dunning" (→ chasing failed card payments), "Stripe Connect / Mangopay / Commerce Layer / Chargebee", "SLA", "POs", "permissioning".
- **Mobile:** "Swift/SwiftUI, Kotlin/Jetpack Compose, React Native", "REST and GraphQL", "OpenAPI", "SDK generation", "greenfield", "PCI compliance", "crash-free rate", "north stars", "phased rollout".
- **ERP:** "DocTypes", "order-to-cash", "procure-to-pay", "BOMs", "Frappe REST API and background jobs", "staging site", "BI dashboards".
- **Photo:** "DPs", "dieline", "on-white", "SKU pipeline".
- **Legal:** "controller", "standard contractual clauses" (acceptable in a privacy policy; add a bracketed gloss for the first).

Rule of thumb: name the tool once, in the "What's included" blurb, with a four-word gloss; keep intros and taglines tool-free.

## (3) Claims that need proof or softening

| Claim | Location | Suggestion |
|---|---|---|
| "94% Client Retention — verified via LinkedIn references" | `home.ts:43-46`, `about.ts:49-52` | Drop "verified via LinkedIn"; say "references on request". Define retention (clients who came back / stayed on retainer?) in a tooltip or footnote. |
| "120+ Projects Shipped since 2019" | `home.ts:31-34` | Real per owner; the portfolio shows three. Add "see selected work" link (About already does) and get the case studies written so the number has visible support. |
| "8 Industries Served" | `home.ts:37-40` | Conflicts with 3-vertical focus; cut or reframe. |
| "12wk Avg. Time to Launch — median" | `home.ts:49-52` | Fix avg/median; state what "launch" means (site? brand? ERP go-live?). |
| "most clients stay on a CRO retainer that lifts revenue 15–40% within six months" | `services.ts:115`, `ecommerce.ts:29` | Anchor to a named case or soften; say once. |
| "Every engagement ships with … Core Web Vitals in the green" | `services.ts:95` | "Every" is absolute; "We ship with Core Web Vitals passing and show you the report." |
| "Launches are non-events" | `web-development.ts:63` | Soften (see page notes). |
| "we get it right on day one" | `ecommerce.ts:53` | Soften. |
| "zero-downtime cutover" | `ecommerce.ts:24,58` | "no planned downtime" or use the ERP page's phrasing. |
| "Most clients stay on a maintenance retainer" | `services.ts:95` | Fine if true; consider a number ("most" → "roughly two in three"). |
| "Our work has shipped across consumer, B2B, healthcare, and education" / "wellness, F&B, fashion, and B2B" | `services.ts:135,115` | Either align with the three verticals or show a case study per claimed vertical. |
| "full crews", "casting, location scouting" | `services.ts:79`, `visual-content.ts:38` | State where/how shoots happen for a remote studio. |
| Testimonial figures (28% CVR, Lighthouse 42→98, +60% organic, 4.8 rating, −40% tickets, 12/9/6 weeks) | `about.ts:68-108` | Real per owner — so put them on case-study pages where they can be read in context. Right now they are the only numbers on the site with a name attached and they live on a page with no link to the work. |
| "Frappe partners" (plural, lowercase) | `services.ts:152,155` | "a Frappe Partner"; link the badge to your Frappe partner listing. |
| "sometimes literally" in the same room | `about.ts:24` | Remove; contradicts "remote". |
| "Remote / On-site" | `home.ts:3` | Say where on-site is possible or drop it. |

## (4) Inconsistencies between pages

**Facts / positioning**
- Self-description: "Business Development Studio" (`home.ts:5`, `site.ts:24`) vs "strategy consultancy + design studio" (`about.ts:3`) vs "full-service studio" (`services-index.ts:3`).
- Location/mode: "Remote / On-site" (`home.ts:3`) vs "Operating remotely across the EU and MENA" (`about/page.tsx:24`) vs "Remote / EU / MENA" (`contact.ts:12`) vs JSON-LD "Europe, Middle East, North Africa" (`layout.tsx:41`). Libya is never mentioned.
- Verticals: 3 (hero) vs 8 (stats) vs "publishing" (`portfolio.ts:4`) vs "consumer, B2B, healthcare, education" (`services.ts:135`) vs "fashion" (`services.ts:115`).
- Audience: "founders" (hero, about, portfolio) vs testimonials from VP Product / Head of Digital / Editor-in-Chief vs "50-person team" (`brand-identity.ts:24`) vs "enterprise portals… strict SLA" (`ecommerce.ts:34`).
- Case-study claim "Each project ships with strategy, design, and engineering" (`portfolio.ts:4`) vs Aurelia tags (no engineering).
- Case-study locations (Singapore, Norway, UAE) vs "EU · MENA".
- Stats label "Avg." vs sub-label "median" (`home.ts:51-52`).
- ERP modules "Inventory" (`services.ts:154`) vs "Stock" (`services.ts:159`).
- Web stack "Next.js, TypeScript, Prisma by default" (`services.ts:95`) vs "Next.js, Astro, or Webflow" (`web-development.ts:14`).
- Timeline in intro (`services.ts:20`) duplicated in the Timeline sidebar on the same page.

**Service naming (one row per service, as it appears in each place)**

| services.ts title / H1 / contact checkbox | Footer (`site.ts`) | Home marquee (`home.ts`) | Browser title |
|---|---|---|---|
| User Experience Design | UX Design | UX Design | User Experience Design |
| Web & Mobile Applications | Mobile Apps | Mobile Apps | Web & Mobile Applications |
| ERP Implementation & Customization | ERP Implementation | ERP Implementation | ERPNext Implementation & Customization |
| eCommerce | eCommerce | eCommerce | eCommerce (but "e-commerce"/"E-commerce" in Visual Content) |

Recommendation: H1/title/checkbox use the full name; nav/footer/marquee use *one* agreed short name each; ERP's full name becomes "ERPNext Implementation" everywhere (people search "ERPNext", not "ERP").

**Spelling / style**
- US vs UK: "color", "customize", "optimization" vs "enquiry" (`privacy.ts:23`, `ContactForm.tsx:70`), "unauthorised" (`terms.ts:9`).
- "eCommerce" / "e-commerce" / "E-commerce" (`services.ts:77,84,111`).
- "cutover" (`ecommerce.ts`) / "cut-over" (`erp-implementation.ts`); "hand-off(s)" (`home.ts:7`, `about.ts:24`) / "handoff" (`user-experience-design.ts:62`, `brand-identity.ts:53`).
- "Start a Project" (`site.ts:13`, `portfolio/[slug]/page.tsx`) / "Start a project" (`Footer.tsx`).
- Title Case sub-services everywhere except ERP (`services.ts:158-164`) sentence case.
- Singular "…Shoot" vs plural "…Stores/Apps/Platforms".
- "Payments Systems" (`services.ts:143`).
- "Latest Work" / "Selected projects" / "Selected engagements" / "Recent engagements" / "All work" / "View Work".

**Tone**
- Hero, About, ERP: plain, confident, owner-facing. Web/eCommerce/Mobile sub-services: engineer-facing spec sheets. UX intro: slightly snide ("pixel-pushers"). Legal: calm and clear. Bring the middle group toward the ERP page's register.

---

## (5) The 10 highest-impact rewrites, in priority order

**1. Write the three case studies (and add the three missing ones).**
File: `src/content/projects/aurelia-wellness.json:14-16` (same for `northwind-coffee.json`, `atlas-fintech.json`).
Before: `"summary": "Premium wellness brand offering cold-pressed botanicals and adaptogenic blends.", "body": "", "results": []`
After (template using facts already on the About page; confirm each):
`"summary": "Brand identity, packaging and website for a premium UAE wellness brand."`
`"body": "Aurelia came to us with a product line and no brand. The brief: calm, premium and botanical without the usual wellness clichés. We ran positioning first, then designed the identity, the packaging system and a lightweight site — presented in two rounds, approved on the second."`
`"results": ["Identity, packaging and website delivered as one system", "Measurable lift in shelf pick-up since launch", "Co-founder Layla Haddad: 'Vellox nailed it on the second round.'"]`
Then add entries for Maison Verre (28% conversion lift, six-week Shopify rebuild), Polaris Quarterly (Lighthouse 42→98, +60% organic QoQ), Helix Health (4.8 rating, −40% support tickets) so every testimonial has a page behind it. No imagery needed for this step.

**2. Fix the stats sub-labels.**
File: `home.ts:43-53`, `about.ts:49-59`.
Before: `"label": "Client Retention", "sub": "verified via LinkedIn references"` / `"label": "Avg. Time to Launch", "sub": "median across 2024–2025"`
After: `"label": "Client Retention", "sub": "clients who returned or stayed on retainer"` / `"label": "Median Time to Launch", "sub": "across 2024–2025 projects"`. Keep `about.ts:34` "All figures verified via client references — available on request." and move it above the numbers.

**3. Replace the one CTA paragraph with page-specific ones.**
Before (11×): "Tell us what you're building. We typically reply within 24 hours with a short diagnostic call to align on scope, timeline, and fit."
After, home (`home.ts:58`): *"Tell us what you're building and where it's stuck. We reply within a working day and start with a 30-minute call — no deck, no pitch."*
After, Brand Strategy (`brand-strategy.ts:73`): *"Send us your current positioning — or the three sentences you use when someone asks what you do. We'll tell you what we'd test first."*
After, eCommerce (`ecommerce.ts:78`): *"Send us your store URL and last quarter's conversion rate. We'll come to the call with three things we'd fix."*
After, default fallback (`services/[slug]/page.tsx:50`): *"Tell us what you're building. We reply within 24 hours and start with a short call on scope, timeline, and fit."*

**4. Say where you are.**
File: `home.ts:3-4`, `contact.ts:12`, `about/page.tsx:24,30`.
Before: `"metaLeft": "Est. 2019 — Remote / On-site", "metaRight": "EU · MENA"`; `"value": "Remote / EU / MENA"`
After: `"metaLeft": "Est. 2019 · Remote-first"`, `"metaRight": "Based in Libya · Clients across EU & MENA"`; contact `"Studio": "Remote-first, based in Tripoli, Libya. Clients across the EU and MENA."` (adjust city). Drop "On-site" unless you can name where.

**5. One name per service, everywhere.**
Files: `site.ts:32,41,42`, `home.ts:15,18,20`, `services.ts:55,131,150`, `contact.ts:32,36,37`, `services/[slug]/page.tsx:34`.
Before: "User Experience Design / UX Design", "Web & Mobile Applications / Mobile Apps", "ERP Implementation & Customization / ERP Implementation / ERPNext Implementation & Customization".
After: full names "UX Design", "Mobile Apps" (or rewrite the page to actually cover web apps), "ERPNext Implementation"; use the identical string in title, H1, footer, marquee, contact checkbox. Also `services.ts:143` "Payments Systems" → "Payment Systems", and "E-commerce Shoot" → "eCommerce Shoots".

**6. Anchor or soften the 15–40% revenue claim and say it once.**
File: `services.ts:115` and `ecommerce.ts:29`.
Before: "most clients stay on a CRO retainer that lifts revenue 15–40% within six months." + "Most CRO clients see 15–40% revenue lift within 6 months."
After (intro only): *"Most clients stay on a conversion retainer after launch — Maison Verre's store converted 28% better within six months."* Remove the sentence from `ecommerce.ts:29`.

**7. Make the ERP credential precise and promote it.**
File: `services.ts:150-155`, `services/[slug]/page.tsx:34`.
Before: title "ERP Implementation & Customization"; tagline "…implemented and customized by Frappe partners."; intro "As Frappe partners we implement it…"
After: title "ERPNext Implementation"; tagline *"Open-source ERP that runs your operations — implemented and customized by a Frappe Partner."*; intro *"As a Frappe Partner we implement it around your processes…"*; browser title *"ERPNext Implementation & Customization | Frappe Partner for EU & MENA — Vellox Studio"*. Also align "Inventory" → "Stock" at `services.ts:154`.

**8. Remove the "same room" contradiction and the 2028 date.**
File: `about.ts:24,29`.
Before: "Strategy, design, and engineering sit in the same room — sometimes literally, always operationally." / "choosing tools you can still hire for in 2028."
After: *"Strategy, design, and engineering are the same people from kickoff to launch. There's no hand-off between agencies, no translation loss between disciplines, and no finger-pointing when something breaks."* / *"choosing tools you can still hire for five years from now."*

**9. Fix the UX service's live tagline and intro.**
File: `services.ts:56-59`.
Before: "Research, wireframes, prototypes, and design systems for digital products that feel inevitable." / "…We're not pixel-pushers; we're product partners who happen to be very good at design.…"
After: *"Products people choose to use, not products they have to use."* (already written at `user-experience-design.ts:5`, just not rendered) / *"UX design is where strategy meets the customer. We design websites, web apps, mobile apps and internal tools that balance what the business needs with what users will actually do. We design with the business goal in front of us, and we hand engineering everything they need to build without guessing."* Then delete the unrendered `tagline`/`intro` from all `pages/<service>.ts` so this cannot drift again.

**10. SEO titles and descriptions for the service and index pages.**
Files: `services/[slug]/page.tsx:68-69`, `services/page.tsx:9`, `contact/page.tsx:9`, `insights/page.tsx:9`.
Before: `"${service.title} — Vellox Studio"` with `service.tagline` as description; "Services — Vellox Studio"; contact/insights descriptions = lede.
After: add a `metaTitle`/`metaDescription` per service in `services.ts`, e.g. Brand Strategy: title *"Brand Strategy for Wellness, Fintech & F&B Founders — Vellox Studio"*, description *"Positioning, research, naming and messaging for founders in the EU and MENA. 4–6 week engagements by a remote studio that also builds the brand, store and ERP."*; Services index: *"Brand, Web, eCommerce & ERPNext Services — Vellox Studio"*; Contact: *"Start a brand, web, eCommerce or ERPNext project with Vellox Studio. Remote across the EU and MENA. Reply within 24 hours."*; Insights: a static description (see page notes). Each description should name audience + region + the thing that makes you different (one team, Frappe Partner), which taglines currently do not.

**Runner-up fixes (quick, low effort):** hide Insights from the main nav until one article exists; "before you spend a dollar" → "a cent" (`services.ts:18`); "diagnostic call" → "intro call" site-wide; standardise US spelling ("inquiry", "unauthorized"); cut "The deliverable is…" from every second blurb; move the Skiper/Vengeance credit out of the footer; give each case study a `year`.

---

## What deserves praise

- The home H1 (`home.ts:6`) and the whole ERP page (`services.ts:148-168`, `erp-implementation.ts`) — concrete, owner-facing, honest about process and risk.
- The About principles (`about.ts:14-29`) — specific and quotable.
- The contact privacy note (`contact.ts:39`), form success/error messages (`ContactForm.tsx:208,217`), and both legal pages — plain, correct, no boilerplate.
- Brand Identity's "16-pixel favicon and a 16-meter billboard" (`services.ts:40`) and tailored CTAs like "Ready to replace the spreadsheets?" (`erp-implementation.ts:70`) show the voice the rest of the site should match.
- Auto-generated "Includes A, B, C, and more" rows on the services index (`services/page.tsx:20`) — a good pattern.

Overall: **6.5/10** today; the ten rewrites above (chiefly #1–#3) would move it to roughly 8 without new imagery.
