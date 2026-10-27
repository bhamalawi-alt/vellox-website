# Open-source JS animation, scroll and motion libraries for cinematic marketing sites (state as of 2026-10-27)

Project context checked locally: `next` 16.3.2, `react` 19.2.8, `framer-motion` ^14.6.0, Tailwind 4, `output: "export"` in next.config. framer-motion is used in src/components (MotionProvider, Header, stats-counter, scroll-reveal-text, parallax-gallery, sticky-stack, text-roll, spotlight-nav).

Version, license and release-date data below come from the npm registry API (`registry.npmjs.org/<pkg>`), fetched 2026-10-27. Sizes come from the bundlephobia API (full package, minified + gzip) unless noted otherwise. Bundlephobia measures the whole entry, so tree-shaken real-world cost is often lower.

| Package | Latest | Released | License (npm field) | Bundlephobia min / gzip |
|---|---|---|---|---|
| gsap | 3.15.0 | 2026-04-13 | "Standard 'no charge' license" | 70.6 kB / 27.4 kB (core) |
| @gsap/react | 2.1.2 | 2025-01-15 | see gsap.com/standard-license | 0.9 kB / 0.55 kB |
| motion | 14.7.0 | 2026-10-27 | MIT | 173 kB / 58.5 kB (whole pkg) |
| framer-motion | 14.7.0 | 2026-10-27 | MIT | (same code as motion) |
| lenis | 1.3.27 | 2026-10-15 | MIT | 18.9 kB / 5.5 kB |
| locomotive-scroll | 5.0.1 | 2026-01-15 | MIT | 34.4 kB / 8.8 kB |
| animejs | 4.5.0 | 2026-06-22 | MIT | 116.8 kB / 40.3 kB (full, tree-shakeable) |
| @theatre/core | 0.7.2 | 2024-05-19 | Apache-2.0 | 100 kB / 31.4 kB |
| splitting | 1.1.0 | 2024-05-31 | MIT | 3.9 kB / 1.8 kB |
| split-type | 0.3.4 | 2023-10-22 | ISC | 11.4 kB / 4.3 kB |
| @formkit/auto-animate | 0.10.0 | 2026-07-10 | MIT | 8.3 kB / 3.2 kB |
| @react-spring/web | 10.1.2 | 2026-06-24 | MIT | 52.4 kB / 20.1 kB |
| popmotion | 11.0.5 | 2022-08-15 | MIT | 15.4 kB / 6.7 kB |
| @barba/core | 2.10.3 | 2024-08-12 | MIT | 31.7 kB / 9.9 kB |

GSAP plugin files (gsap@3.15.0 `dist/*.min.js` from jsDelivr, gzipped locally): gsap core 28.3 kB, ScrollTrigger 18.0 kB, SplitText 3.6 kB.

Sources: [npm registry](https://registry.npmjs.org/gsap), [bundlephobia](https://bundlephobia.com), [jsDelivr gsap 3.15.0](https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/)

## What each library offers and its strengths for cinematic sites

### Takeaway
GSAP (with ScrollTrigger and SplitText) is still the most complete toolkit for timeline-driven scroll storytelling. Lenis is the de facto smooth-scroll layer. Motion (already on the site) covers React-declarative, scroll-linked and layout animation. Native CSS scroll-driven animations and the View Transitions API now cover a lot of simple reveal, parallax and page-transition work with zero JS.

### Cited Findings
**GSAP 3.15 + plugins**
- After the Webflow acquisition, GSAP and all former Club plugins (SplitText, MorphSVG, and others) became free for everyone, Webflow customer or not — [Webflow blog](https://webflow.com/blog/gsap-becomes-free); [GSAP 3.13 release blog](https://gsap.com/blog/3-13/)
- SplitText was rewritten from scratch after the acquisition. The new version is about 50% smaller, adds built-in screen-reader accessibility, adds masking for reveal effects, adds a `deepSlice` option for nested elements that wrap across lines, and is written in TypeScript — [Webflow blog: SplitText rewrite](https://webflow.com/blog/gsap-splittext-rewrite)
- The `gsap-trial` npm package is deprecated. Use the normal `gsap` package, which now contains the bonus plugins — [gsap-trial README](https://cdn.jsdelivr.net/npm/gsap-trial@3.13.0/README.md)
- Codrops published demos built on the now-free plugins (SplitText, MorphSVG, and others) — [Codrops](https://tympanus.net/codrops/?p=93244)

**Motion (motion.dev, formerly Framer Motion)**
- `motion` and `framer-motion` are both at 14.7.0 and were published the same day (2026-10-27), so they are the same library under two package names — [npm registry](https://registry.npmjs.org/motion)
- Motion+ is a paid one-time "lifetime" membership (Personal) with a per-seat/year Business plan. It includes 430+ examples, a premium library, Motion UI, an AI Kit, tutorials, a visual transition editor, and Discord — [motion.dev pricing](https://motion.dev/pricing)
- `splitText` (+0.7 kB) and the React `ScrambleText` are exclusive to Motion+ members. The core open-source library is free — [Motion SplitText docs](https://motion.dev/docs/split-text); [Motion ScrambleText docs](https://motion.dev/docs/react-scramble-text)

**Lenis (darkroom.engineering)**
- Lenis wraps native scroll, so `position: sticky`, anchor links and accessibility features keep working. It has zero runtime dependencies and ships a first-party React package, `lenis/react` — [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- Its known limitations: no CSS scroll-snap support (use `lenis/snap` instead), smoothing is capped at 60 fps on Safari (30 fps in Low Power Mode), smooth scroll stops over iframes, fixed elements can lag on pre-M1 macOS Safari, `syncTouch` on iOS below 16 can behave unexpectedly, and nested scroll containers need configuration — [Lenis GitHub](https://github.com/darkroomengineering/lenis)

**Locomotive Scroll v5**
- v5 is a full rewrite built on top of Lenis (the docs mention Lenis 1.3.17). It adds parallax and viewport-detection data attributes on top of Lenis smooth scroll and is described as 9.4 kB gzipped — [Locomotive Scroll releases](https://github.com/locomotivemtl/locomotive-scroll/releases); [Locomotive docs](https://scroll.locomotive.ca/docs/)

**Anime.js v4**
- v4 is an ES-module, tree-shakeable rewrite with standalone sub-paths (for example `animejs/animation`) and a breaking API change from v3: the global `anime` object is gone, `value` became `to`, and `easing` became `ease`. It includes a ScrollObserver API with sync modes and thresholds — [Anime.js docs mirror (Mintlify)](https://www.mintlify.com/juliangarnier/anime); [animejs best-practices repo](https://github.com/davidosemwegie/animejs-best-practices)

**Theatre.js**
- Theatre.js is a visual motion-design editor (studio) plus a runtime (`@theatre/core`), often used with Three.js. The README says "Theatre.js 1.0 is around the corner" and that development was "temporarily moved ... to a private repo" — [Theatre.js GitHub](https://github.com/theatre-js/theatre)

**View Transitions in Next.js 16 (installed 16.3.2)**
- The locally installed guide (`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`) says view transitions "work in the App Router with no configuration". You import `ViewTransition` from `react`, and route navigations trigger it automatically because they are Transitions. It covers shared-element morphs, Suspense reveals, directional route slides and same-route crossfades — local Next 16.3.2 docs; [Next.js View Transitions guide](https://nextjs.org/docs/app/guides/view-transitions)
- Conflict: Next 16.2.x docs and older articles describe an `experimental.viewTransition: true` flag and say the feature is "not recommended for production". The 16.3.2 guide installed in this repo needs no flag — [Next.js viewTransition config (16.2.7 on unpkg)](https://unpkg.com/next@16.2.7/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/viewTransition.md); [Next 15 docs](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/viewTransition)
- React's integration uses newer View Transitions API features (transition types, `view-transition-class`), available in Chromium 125+ and recent Safari and Firefox. "Some animations may behave differently in Safari." Unsupported browsers navigate normally without animation — local Next 16.3.2 docs

**Native CSS scroll-driven animations (`animation-timeline: scroll()/view()`)**
- caniuse lists support in Chrome/Edge 115+, Opera 101+, Safari and iOS Safari 26.0+, Firefox desktop 159+, Samsung Internet 23+, and Chrome for Android. Firefox for Android shows "not supported" in 158. Global usage is about 87.8% — [caniuse animation-timeline](https://caniuse.com/mdn-css_properties_animation-timeline)
- Safari shipped scroll-driven animations in Safari 26 (September 2025). An earlier German article (pre-Firefox-ship) put Firefox behind a flag and on the Interop 2026 list, and said a Baseline fallback was still needed — [drweb.de](https://www.drweb.de/css-scroll-animationen-ohne-javascript/); [cydstumpel.nl](https://cydstumpel.nl/?p=1170)

### Inferences
- For a "cinematic" layer on this site, the realistic options are: (a) stay on Motion and add Lenis plus native CSS scroll timelines and React `<ViewTransition>`, or (b) add GSAP + ScrollTrigger + SplitText for pinned, scrubbed, multi-step timelines, which Motion's `useScroll` does less ergonomically.
- Barba.js is a non-React, MPA-style transition router that fights Next.js's client router. React `<ViewTransition>` replaces it in a Next 16 App Router app.

### Gaps
- No primary source for Anime.js v4's own size claim. Only bundlephobia's full-package number (40.3 kB gzip) was measured, and tree-shaken imports will be much smaller.
- No primary source found for Firefox's exact release notes for `animation-timeline` (caniuse says 159+). Verify on MDN before relying on it.

## License terms (exact)

### Takeaway
Everything is permissive OSS (MIT / ISC / Apache-2.0) except GSAP, which is proprietary freeware: no charge, commercial use allowed, but it is not OSI open source, it has a non-compete clause against Webflow-like visual animation builders, and Webflow can change or terminate the license. A marketing site is clearly a Permitted Use.

### Cited Findings
- **GSAP:** the license is the Standard "No Charge" GSAP License, effective 2025-04-30 and last modified 2025-05-30. It grants a non-exclusive, worldwide license for Permitted Uses (any website, web app or digital interface). Commercial use is covered — [GSAP Standard License](https://gsap.com/standard-license)
- **GSAP Prohibited Uses:** no-code visual animation-building tools that "compete with Webflow's visual animation building capabilities" need Webflow's prior written consent. Reverse engineering GSAP to build competitive products is prohibited, as is removing proprietary notices or branding. The FAQ says AI-generated GSAP code is not a Prohibited Use, and companies competing with Webflow in other business areas may still use GSAP — [GSAP Standard License](https://gsap.com/standard-license)
- **GSAP terms:** Webflow keeps all IP. Webflow may terminate access for non-compliance (you must then stop use and destroy copies). Webflow may update the license, and continued use means acceptance, but you may keep using versions released before a change. The license is incorporated into Webflow's Terms of Service. No explicit attribution requirement was found — [GSAP Standard License](https://gsap.com/standard-license)
- **npm license fields:** gsap "Standard 'no charge' license"; @gsap/react "SEE LICENSE AT https://gsap.com/standard-license"; motion/framer-motion MIT; lenis MIT; locomotive-scroll MIT; animejs MIT; @theatre/core Apache-2.0; splitting MIT; split-type ISC; @formkit/auto-animate MIT; @react-spring/web MIT; popmotion MIT; @barba/core MIT — [npm registry](https://registry.npmjs.org/)
- **Lenis:** MIT, © darkroom.engineering — [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- **Theatre.js:** `@theatre/core` (the runtime that ships in your bundle) is Apache-2.0. `@theatre/studio` (the editor) is AGPL-3.0, and the README says only `@theatre/core` ends up in the final bundle — [Theatre.js GitHub](https://github.com/theatre-js/theatre)
- **Motion:** the core library is MIT and free. Motion+ is a paid one-time (Personal) or per-seat annual (Business) membership. Some features, such as `splitText` and the React ScrambleText, are Motion+ only — [motion.dev pricing](https://motion.dev/pricing); [Motion SplitText](https://motion.dev/docs/split-text)

### Inferences
- GSAP's terms are fine for the Vellox marketing site. The risk points are that the license is not OSI-approved, is changeable by Webflow (though older versions stay usable), and is restricted if Vellox ever builds a visual animation builder product.

### Gaps
- Motion+ price was not shown in the fetched results.
- GSAP's redistribution terms (for example, vendoring in an open-source template) are not addressed on the license page.

## React 19 / Next.js App Router compatibility and integration patterns

### Takeaway
All of the main candidates work in client components (`"use client"`) under static export. GSAP uses `useGSAP` for Strict-Mode-safe cleanup. Lenis uses `lenis/react` with its loop driven by the GSAP ticker when both are used. View Transitions come from React itself.

### Cited Findings
- `@gsap/react`'s `useGSAP()` is a drop-in for `useEffect`/`useLayoutEffect` that reverts all animations, ScrollTriggers, Draggables and SplitText instances via `gsap.context()` on unmount. It takes `scope` (a ref that limits selector text), `dependencies` and `revertOnUpdate` options. Animations created later (event handlers, timeouts) must be wrapped in `contextSafe()`. Call `gsap.registerPlugin(useGSAP)`. It is SSR-safe (falls back to `useEffect` when `window` is undefined). With the App Router or RSC, add `"use client"` — [GSAP React guide](https://gsap.com/resources/React/)
- Cleanup matters because React 18+ Strict Mode runs effects twice in development, which can duplicate `from()` tweens — [GSAP React guide](https://gsap.com/resources/React/)
- Lenis + ScrollTrigger: call `ScrollTrigger.update` on Lenis `scroll` events, drive `lenis.raf` from `gsap.ticker` (seconds × 1000), and set `gsap.ticker.lagSmoothing(0)` — [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- React `<ViewTransition>` triggers only on Transitions, `<Suspense>` and `useDeferredValue`, not on plain `setState`. Next.js navigations count as transitions. The App Router bundles React canary, so you don't need to install `react@canary` — local Next 16.3.2 docs; [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)
- @react-spring/web v10.1.2 was released 2026-06-24 — [npm registry](https://registry.npmjs.org/@react-spring/web)

### Inferences
- With `output: "export"`, every animation library runs purely client-side, so only RSC boundaries matter. Put each animated section in a small `"use client"` island, as the site already does with MotionProvider.
- Lenis in the root layout (`<ReactLenis root>`) works alongside Motion's `useScroll`, because Lenis keeps native scroll position. This is not explicitly documented by Motion.

### Gaps
- No explicit React 19 compatibility statement was fetched for React Spring, Auto-Animate, Splitting or SplitType. Release dates suggest React Spring and Auto-Animate are current. Splitting and SplitType are DOM-only and React-agnostic.

## Bundle size, performance and reduced-motion support

### Takeaway
Lenis (about 5.5 kB gzip) and native CSS are the cheapest wins. GSAP core + ScrollTrigger + SplitText is about 50 kB gzip on top of Motion. Motion can be cut to about 5 kB initial with `LazyMotion`. Lenis, Motion and GSAP (via matchMedia) all have first-class reduced-motion hooks.

### Cited Findings
- Motion: the `motion` component is about 43 kB and cannot be tree-shaken further. `m` + `LazyMotion` is just over 5 kB initial, plus `domAnimation` (+24 kB) or `domMax` (+38 kB, adds drag and layout). `useAnimate` mini (WAAPI-only) is 3.3 kB and the hybrid version is 23 kB. Sizes are measured with Rollup; webpack output is larger — [Motion: reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size)
- Motion reduced motion: `<MotionConfig reducedMotion="user">` disables transform and layout animations site-wide while keeping opacity and color. `useReducedMotion()` returns a boolean for custom logic, for example to disable parallax — [Motion accessibility](https://motion.dev/docs/react-accessibility)
- Lenis honors `prefers-reduced-motion` by default (`respectReducedMotion: true`): smoothing is disabled and programmatic scrolls jump instantly. The rAF loop keeps running, the preference updates live, and `lenis.prefersReducedMotion` is exposed — [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- GSAP: `gsap.matchMedia()` with a conditions object such as `{isDesktop, isMobile, reduceMotion: "(prefers-reduced-motion: reduce)"}` runs setup per query and auto-reverts animations and ScrollTriggers when the query stops matching. `gsap.matchMediaRefresh()` supports a user override toggle — [GSAP matchMedia docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
- GSAP SplitText's rewrite adds built-in screen-reader accessibility (aria handling) — [Webflow blog: SplitText rewrite](https://webflow.com/blog/gsap-splittext-rewrite)
- Next view transitions: the guide recommends wrapping view-transition CSS in `@media (prefers-reduced-motion: reduce)` to disable the animations, and notes a more refined approach keeps crossfades while removing positional movement — local Next 16.3.2 docs (`view-transitions.md`, "Respecting reduced motion")
- Lenis on Safari is capped at 60 fps, and at 30 fps in Low Power Mode — [Lenis GitHub](https://github.com/darkroomengineering/lenis)

### Inferences
- CSS scroll-driven animations run off the main thread for compositor-friendly properties (transform, opacity), which makes them the best mobile-performance option for simple reveals and parallax. Wrap them in `@supports (animation-timeline: view())` with a static fallback.
- Adding GSAP while keeping Motion would add roughly 50 kB gzip (core 28 + ScrollTrigger 18 + SplitText 3.6). That is acceptable for one hero or storytelling section but is pure duplication if used only for reveals.

### Gaps
- No independent mobile benchmark comparing GSAP ScrollTrigger, Motion `useScroll` and CSS timelines was found.

## Maintenance status as of late 2026

### Takeaway
Actively maintained: Motion, Lenis, GSAP, Anime.js, React Spring, Auto-Animate, and Locomotive (low cadence). Stale or inactive: Theatre.js public repo (last npm release May 2024), Splitting (May 2024), SplitType (Oct 2023), Popmotion (Aug 2022), Barba (Aug 2024).

### Cited Findings
- Latest npm release dates: motion 14.7.0 (2026-10-27), lenis 1.3.27 (2026-10-15), @react-spring/web 10.1.2 (2026-06-24), @formkit/auto-animate 0.10.0 (2026-07-10), animejs 4.5.0 (2026-06-22), gsap 3.15.0 (2026-04-13), locomotive-scroll 5.0.1 (2026-01-15), @barba/core 2.10.3 (2024-08-12), splitting 1.1.0 (2024-05-31), @theatre/core 0.7.2 (2024-05-19), split-type 0.3.4 (2023-10-22), popmotion 11.0.5 (2022-08-15) — [npm registry](https://registry.npmjs.org/)
- Theatre.js: Snyk rates the `theatre` package's maintenance as Inactive, and Gittrend shows the last public push on 2024-08-14. The README says development moved temporarily to a private repo ahead of 1.0. No 2026 release was found — [Snyk advisor](https://snyk.io/advisor/npm-package/theatre); [gittrend](https://gittrend.io/repo/theatre-js/theatre); [Theatre.js GitHub](https://github.com/theatre-js/theatre)
- Lenis has a 2026 copyright notice, about 1,079 commits, 26 open issues and 12 open PRs — [Lenis GitHub](https://github.com/darkroomengineering/lenis)

### Inferences
- Avoid Theatre.js, Popmotion, SplitType and Barba for new work. GSAP SplitText (free) or Motion+ splitText replace Splitting and SplitType. Popmotion's functionality now lives inside Motion (same author), but this was not confirmed with a fetched source.

### Gaps
- No official deprecation notice was fetched for Popmotion or SplitType. Their staleness is inferred only from npm release dates.

## Overlap with framer-motion / Motion already on the site

### Takeaway
Duplicates Motion: React Spring, Popmotion, Auto-Animate, Anime.js, and (mostly) GSAP core tweening. Complements Motion: Lenis (smooth scroll), text splitting (since free Motion lacks splitText), native CSS scroll timelines, and React `<ViewTransition>`. GSAP's distinct value is ScrollTrigger pinning/scrubbing and a free SplitText.

### Cited Findings
- `framer-motion` 14.7.0 and `motion` 14.7.0 are the same release, so migrating imports to `motion/react` is a rename, not a new dependency — [npm registry](https://registry.npmjs.org/motion)
- Free Motion lacks `splitText`, which is Motion+ only, while GSAP SplitText is free under the Standard License — [Motion SplitText](https://motion.dev/docs/split-text); [Webflow blog](https://webflow.com/blog/gsap-becomes-free)
- Motion already offers `useReducedMotion` and `MotionConfig reducedMotion="user"`, so any added library must be wired to reduced motion separately (Lenis does this by default; GSAP needs matchMedia) — [Motion accessibility](https://motion.dev/docs/react-accessibility); [Lenis GitHub](https://github.com/darkroomengineering/lenis); [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
- Lenis is library-agnostic and wraps native scroll, so it complements rather than replaces scroll-linked animation libraries — [Lenis GitHub](https://github.com/darkroomengineering/lenis)

### Inferences
- Lowest-duplication path for Vellox: keep Motion, switch to `LazyMotion`/`m` to cut bundle size, add Lenis (about 5.5 kB), use native CSS `animation-timeline` for simple reveals with `@supports` fallbacks, and use React `<ViewTransition>` for page transitions.
- Add GSAP (ScrollTrigger + SplitText) only if a pinned, scrubbed storytelling section or line/char split reveals are required. In that case, consider moving those sections fully to GSAP rather than mixing both libraries in the same component.
- Locomotive Scroll v5 is redundant if Lenis is adopted directly, because it is Lenis plus data-attribute helpers.

### Gaps
- No source compared Motion `useScroll` with ScrollTrigger head-to-head for pinning features.
