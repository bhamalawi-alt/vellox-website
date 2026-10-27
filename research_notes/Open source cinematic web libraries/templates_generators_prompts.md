# Free / open-source alternatives to GetLayers.ai: templates, effect galleries, background generators, 3D assets, AI-prompt and design-system libraries

Context: Next.js 16 (App Router, static export), React 19, Tailwind CSS 4, dark agency site, accent #3730e8, built with Claude Code. Research date: 2026-10-27. I had about 20 tool calls. Many pages blocked fetches (Codrops licence page 403, haikei.app failed, Tailwind Plus licence page needs login). Items not verified this session are in Gaps.

## 1. Open-source templates and full-page starters (what they offer, licence, fit)

### Takeaway
"Free and open" does not always mean "free for commercial use." Once UI core is MIT, but its well-known Magic Portfolio template is CC BY-NC 4.0, so you cannot use it on a commercial agency site without buying Pro. shadcnblocks is mostly paid (one-time fee). The status of Tailwind Plus in late 2026 is disputed. Codrops demos are MIT by default, which makes them the safest source of "cinematic" effects to port.

### Cited Findings
- **Once UI (design system / Next.js starter):** MIT licence for the Next.js starter and Once UI Core — [GitHub nextjs-starter](https://github.com/once-ui-system/nextjs-starter); [Once UI Core](https://once-ui.com/products/once-ui-core). Also published as a Vercel template — [Vercel](https://vercel.com/new/templates/next.js/once-ui-design-for-nextjs).
- **Once UI Magic Portfolio:** "Distributed under the CC BY-NC 4.0 License." The README states "Commercial usage is not allowed" and requires attribution. Commercial use needs a Once UI Pro licence (which extends it to "Dopler CC"). Requires Node 20.9+. Includes MDX content, next/og, RSS and TypeScript. About 1.4k stars, 936 forks, 224 commits — [GitHub magic-portfolio](https://github.com/once-ui-system/magic-portfolio). **Flag: NON-COMMERCIAL. Do not use it for an agency marketing site without Pro.**
- **shadcnblocks.com:** paid one-time lifetime tiers: Pro $149, Premium $299, Elite $399. Payblocks / Sanityblocks CMS boilerplates cost $379 each. The site lists "2331+ Pro Blocks" (the menu says 2500). It reports 22,162 free users and 5,420 Pro customers. The licence allows "unlimited end products" for your company and clients, but bans reselling or building competing products. Pro blocks are searchable via the official shadcn MCP and installable via the shadcn CLI — [shadcnblocks pricing](https://www.shadcnblocks.com/pricing). The pricing page does not say how many blocks are free.
- **Tailwind Plus (formerly Tailwind UI):** one-time purchase. Third parties report Personal $299 and Team (up to 25) $979 — [tailkits](https://tailkits.com/blog/tailwind-plus-replaced-tailwind-ui/); official product pages — [tailwindcss.com/plus](https://tailwindcss.com/plus). Tailwind CSS itself stays free under MIT. Free component sources usually named instead: HyperUI (400+ copy-paste components), DaisyUI, shadcn/ui — [Untitled UI blog](https://www.untitledui.com/blog/tailwind-plus-alternatives); [21st.dev blog](https://21st.dev/blog/free-tailwind-component-libraries).
- **Disputed claim:** a competitor blog (Untitled UI) says Shopify acquired Tailwind Labs on 9 Sep 2026 and that Tailwind Plus stopped taking new customers that day. Official Tailwind pages in the search results still describe purchasing — [Untitled UI blog](https://www.untitledui.com/blog/tailwind-plus-alternatives) vs [tailwindcss.com/plus](https://tailwindcss.com/plus). **Unverified. I found no official Tailwind or Shopify announcement.**
- **Codrops (tympanus.net) demos:** the licence page says downloadable demos are MIT "if not specifically mentioned otherwise." Design freebies can be used in personal or commercial projects, but you cannot redistribute, resell or republish them. Articles cannot be republished in full — [Codrops licensing, via search summary](https://tympanus.net/codrops/?p=7319). The direct licence page returned 403 to my fetch, so this comes from a search-engine summary of that page (copyright 2024).
- **v0 community templates:** official v0 docs say only that published templates can be forked. They say nothing on licensing — [v0 docs](https://action.v0.build/docs/templates). Claims that commercial use is unrestricted come from a third-party agency, not from Vercel — [RapidDev](https://www.rapidevelopers.com/md/v0-template/fermy-landing-page). **Flag: terms unclear.**

### Inferences
- For a Next.js 16 + Tailwind 4 agency site, the cleanest legal base is MIT starters: Once UI core, shadcn/ui, HyperUI, plus MIT Codrops effects ported into React components. Avoid Magic Portfolio unless you buy Pro.
- Codrops demos are usually vanilla JS / Three.js / GSAP. They need porting to React client components (`"use client"`, `useEffect` setup and teardown). This is compatible with static export because they run client-side only.
- Before you reuse a Codrops demo, read its own README / licence note and check for bundled photos or fonts. The MIT default covers code, not necessarily third-party images.

### Gaps
- Exact count and content of the shadcnblocks free tier: not shown on the pricing page.
- Vercel template gallery licences: each template has its own repo licence. Not checked one by one.
- Awwwards-style open-source agency sites on GitHub: no specific repos verified this session.
- Tailwind Plus status after Sept 2026: unconfirmed (see above). Its licence text sits behind a login and was not readable.
- Whether Once UI / Magic Portfolio already target Next.js 16: not confirmed (check `package.json`).

## 2. Effect / code galleries (CodePen, Uiverse, 21st.dev, Codrops)

### Takeaway
Public CodePen pens are MIT by default, and Uiverse is MIT with no attribution required. Both are safe to copy, provided you keep the MIT notice for pens. 21st.dev is a marketplace, not an open licence. Its terms limit redistribution, and each component's author licence applies, so check each one.

### Cited Findings
- **CodePen:** "Public pens are automatically MIT licensed." Private pens get no licence ("It belongs entirely to you"), so reuse needs the owner's permission. The MIT template needs YEAR, NAME and URL TO ORIGINAL filled in — [CodePen licensing docs](https://blog.codepen.io/documentation/licensing/).
- **Uiverse.io (repo uiverse-io/galaxy):** "over 3000 unique UI elements," all under MIT. Attribution is appreciated but not required. Built with CSS or Tailwind (no React wrappers). Categories include buttons, cards, forms, inputs, loaders and tooltips. 3,977 commits — [GitHub uiverse-io/galaxy](https://github.com/uiverse-io/galaxy).
- **21st.dev:** marketplace content is "the sole and exclusive property of their respective authors and 21st Labs Inc." The terms ban redistributing, selling or licensing marketplace content without authorisation, and ban using it to train AI models without consent. For components derived from open source, the original author's licence applies and must be kept. Paid plans unlock features across Web, MCP and CLI, with monthly AI credits — [21st.dev terms](https://21st.dev/terms). **Flag: no blanket open licence. Check each component's source and licence before you use it.**

### Inferences
- CodePen: when you port a public pen into the repo, add an MIT header comment with the author and pen URL. That satisfies the licence.
- Uiverse Tailwind snippets drop straight into React/TSX. Change `class` to `className`. Check that Tailwind v3 utilities still exist under v4.
- 21st.dev's ban on "train AI models" is about training. Using a component in a site through Magic MCP is a separate matter. Still, the terms are more restrictive than MIT galleries.

### Gaps
- CSS-Tricks and Smashing demo licences: not checked this session.
- Uiverse latest commit date: not shown on the fetched page.
- Magic MCP free-tier limits and prices for late 2026: not stated on the terms page.

## 3. Gradient / background / pattern generators: licence of generated output

### Takeaway
Few generators publish a clear licence for their output. Hero Patterns is CC BY 4.0, so attribution is required. The Pattern Monster source code is MIT, but no output licence is stated. Haikei and fffuel terms could not be retrieved. The safest route for a brand gradient is to write it yourself in CSS or SVG, or to use an MIT generator's code locally.

### Cited Findings
- **Hero Patterns (Steve Schoger):** the site shows a CC BY 4.0 badge — [heropatterns.com](https://heropatterns.com/). Third-party users credit it as CC BY 4.0 — [CSS-Tricks](https://css-tricks.com/?p=250451). One comparison site says no attribution is needed, which contradicts CC BY — [SaaSHub](https://www.saashub.com/compare-hero-patterns-vs-patternizer). **Flag: attribution required under CC BY 4.0.**
- **Pattern Monster:** source repo `catchspider2002/svelte-svg-patterns` is MIT ("Copyright (c) 2020 - 2023 pattern.monster"). Exports tileable SVG or high-res PNG. **No licence stated for generated patterns** — [GitHub](https://github.com/catchspider2002/svelte-svg-patterns).
- **Haikei:** described by third parties as free, no sign-up, with SVG and PNG export — [Sitejet community](https://community.sitejet.io/t/haikei-app-generate-unique-svg-design-assets/82); [topbestalternatives](https://www.topbestalternatives.com/haikei/). **I could not retrieve an official output licence** (haikei.app fetch failed).
- **fffuel:** the FAQ URL returned 404. Output licence not verified.

### Inferences
- Without an explicit output licence, generated SVG from a parameter tool is usually treated as the user's own asset in practice. This is not legal certainty. For a brand site, record which tool made which asset.
- Grainy / mesh gradients in #3730e8 can be made with pure CSS (`radial-gradient` layers plus an SVG `feTurbulence` noise filter). No third-party licence is involved, and it suits Tailwind 4 `@theme` tokens.

### Gaps
- Licences for BGJar, csshero mesh, meshgradient.com, Grainy Gradients (CSS-Tricks / fffuel), Haikei and fffuel output: not verified this session.

## 4. Free 3D / visual asset sources

### Takeaway
Poly Haven and Kenney are CC0: commercial use allowed, no attribution needed. They are the lowest-risk 3D and texture sources for a Three.js / R3F hero.

### Cited Findings
- **Poly Haven:** all HDRIs, textures and 3D models are CC0, usable for any purpose including commercial work. No attribution required. Redistribution is allowed. Site logos, renders and text are not CC0. Scraping without permission is banned (use their API under the API terms) — [Poly Haven licence](https://polyhaven.com/license).
- **Kenney:** "all game assets on the asset pages are public domain licensed (CC0)." Commercial use is allowed and credit is optional. Do not use the Kenney logo — [Kenney support](https://kenney.nl/support).

### Inferences
- Poly Haven HDRIs suit drei `<Environment files=...>` for cinematic lighting. Self-host the files in `/public` for static export.
- Kenney assets are game-styled (low-poly). They fit playful sites better than a premium dark agency look.

### Gaps
- Sketchfab: CC licences vary per model (CC BY, CC BY-NC and others). Not verified this session. Check each model and avoid NC.
- Spline community files: remix and licence terms not verified.

## 5. AI prompt / design-system libraries for coding agents (Claude Code skills, MCP servers)

### Takeaway
Anthropic's official `frontend-design` skill is Apache-2.0 and free to use and change. The shadcn MCP server installs into Claude Code with one command and works with any third-party registry that follows the shadcn registry spec. Pairing it with a free MIT registry plus your own brand tokens covers most of what a paid prompt library offers.

### Cited Findings
- **Anthropic `frontend-design` skill:** lives at `anthropics/skills/skills/frontend-design` (`SKILL.md` + `LICENSE.txt`) — [GitHub](https://github.com/anthropics/skills/tree/main/skills/frontend-design). The `LICENSE.txt` is Apache License 2.0 — [raw LICENSE.txt](https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/LICENSE.txt). Licences may differ per skill in that repo.
- **shadcn MCP:** lets agents browse, search and install components from registries using plain-language requests. Claude Code setup: `pnpm dlx shadcn@latest mcp init --client claude`, or a manual `.mcp.json` entry running `npx shadcn@latest mcp`. Supports any registry that follows the shadcn registry spec, configured in `components.json` — [shadcn MCP docs](https://ui.shadcn.com/docs/mcp).
- shadcnblocks Pro blocks are available through the same official shadcn MCP / CLI (paid) — [shadcnblocks pricing](https://www.shadcnblocks.com/pricing).
- **21st.dev MCP/CLI:** paid plans unlock MCP features with monthly AI credits, and marketplace terms apply — [21st.dev terms](https://21st.dev/terms).

### Inferences
- Suggested setup: shadcn MCP + free MIT registries (shadcn/ui, plus other spec-compliant community registries) + the Apache-2.0 frontend-design skill + a project skill or CLAUDE.md that encodes brand tokens (#3730e8, dark surfaces, type scale). This replicates the "prompt library" value of paid kits.
- Under Apache-2.0 you may fork and change the skill. Keep the LICENSE and note your changes.

### Gaps
- Lovable community template licences and community "awesome Claude Code skills" lists: not verified this session.
- Licences of shadcn/ui itself and of specific community registries (e.g. Magic UI, Aceternity, React Bits): not fetched here. They are probably covered by a parallel researcher.

## 6. "Awesome" lists for creative coding and web animation

### Takeaway
The main web-animation awesome list is CC0 but stale (last pushed July 2023). Use it for discovery, and check current maintenance of anything it links to.

### Cited Findings
- **awesome-web-animation (sergey-pimenov):** curated libraries, books and apps. About 1,429 stars. CC0. Last pushed July 2023 — [ecosyste.ms](https://awesome.ecosyste.ms/projects/github.com%2Fsergey-pimenov%2Fawesome-web-animation). **Flag: older data.**
- **Creative coding lists (e.g. djangify/creative-coding; "fucking-awesome-creative-coding" mirror):** cover generative art and interaction, and list libraries such as Paper.js and Pixi.js — [ecosyste.ms](https://awesome.ecosyste.ms/projects/github.com%2Fdjangify%2Fcreative-coding).
- GitHub topic page `web-animation` is a live index of active repos — [GitHub topics](https://github.com/topics/web-animation).
- WebAnimationWorkshops resources have not been updated since 2018 — [ecosyste.ms](https://awesome.ecosyste.ms/projects/github.com%2FWebAnimationWorkshops%2Fworkshop-resources).

### Inferences
- An awesome list's own licence (often CC0) covers only the list. Each linked library keeps its own licence.

### Gaps
- Star counts and dates come from the ecosyste.ms index and may lag GitHub.
- The original terkelg/awesome-creative-coding repo was not checked directly.
