# Open-source animated / "cinematic" React component libraries (alternatives to GetLayers.ai)

Research date: 2026-10-27. GitHub figures (stars, license SPDX id, last push) were read from the public GitHub REST API on this date, e.g. `https://api.github.com/repos/<owner>/<repo>`. Project context checked locally: `package.json` pins next 16.3.2, react 19.2.8, framer-motion ^14.6.0, tailwindcss ^4. There is no `components.json`. `src/components/ui/*` already holds ported components (text-roll, stagger-text, spotlight-nav, sticky-stack, image-reveal-list, stats-counter, scroll-reveal-text). Commit b800ca9 says these came from Skiper UI and Vengeance UI.

## What each library offers (component types, count, notable cinematic pieces)

### Takeaway
The libraries richest in cinematic hero and background pieces are Aceternity UI (free tier), React Bits, and Magic UI. Skiper UI and Vengeance UI add uncommon interaction pieces. Motion Primitives, Animate UI, Cult UI, and Kokonut UI are better for micro-interactions and building blocks than for full-screen effects.

### Cited Findings
- **Aceternity UI**: about 114 free components on the components index (my manual count of entries not tagged "Included with all-access"). Hero items: Hero Highlight, Hero Parallax, Parallax Hero Images. Backgrounds: Aurora, Background Beams (and With Collision), Spotlight / Spotlight New, Lamp Section Header, Vortex, Wavy, Background Lines, Ripple, Cubes Grid, Dotted Glow, Noise, Grid/Dot, Cloud Shader, Dither Shader, Meteors, Shooting Stars. Text: Text Generate Effect, Typewriter, Flip Words, Encrypted Text, Text Hover Effect, Text Flipping Board, Container Text Flip. Cursor: Following Pointer, Pointer Highlight, Lens, Direction Aware Hover — [Aceternity components](https://ui.aceternity.com/components)
- Aceternity's own brand page claims "200+ free components, 100+ premium blocks, 30+ templates". This conflicts with my count of about 114 on the index, possibly because variants and blocks are counted. The claim is the vendor's — [Aceternity brand facts (via search)](https://ui.aceternity.com/brand-facts)
- **Magic UI**: about 77 components in the docs sidebar (my count). Third-party roundups say "150+" — [Magic UI docs](https://magicui.design/docs); [DesignRevision, updated 2026-06-30](https://designrevision.com/alternatives/magic-ui). Categories: Text Animations, Special Effects, Backgrounds. The docs site depends on `cobe` (globe) and `canvas-confetti` — [magicui apps/www/package.json](https://github.com/magicuidesign/magicui)
- **React Bits**: five categories: Text Animations, Animations, Components, Backgrounds, Micro Interactions. Each component ships in four variants: JS-CSS, JS-TW, TS-CSS, TS-TW. Free tools: Background Studio, Texture Lab, Shape Magic, Center Stage, Sound Lab — [React Bits intro](https://reactbits.dev/get-started/introduction). A secondary source says 110+ components — [pkgpulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)
- **Skiper UI** ("Un-common Components for shadcn/ui", by Gxuri): homepage says "106+" components. Notable pieces: Image reveal, Things drag and scroll, Devouring-details sign-in, Dynamic island, Image cursor trail — [skiper-ui.com](https://skiper-ui.com)
- **Vengeance UI** (Ashutoshx7/VengeanceUI): 46 components in 9 families. Includes button kit (glow/press), pixelated-image-trail, flip-text / morph-text, Cursor Card, staggered-grid (bento), animated-rays, Glass Dock, Spotlight Navbar, Folder Preview, Kinetic Loader, tooltip+marquee logo slider — [vengenceui.com](https://www.vengenceui.com). The README tagline is "Modern animated UI components for building beautiful landing pages faster". The project is in the Vercel OSS Program 2026 — [GitHub README](https://github.com/Ashutoshx7/VengeanceUI)
- **Motion Primitives** (ibelick): composable motion building blocks (text effects, transitions, cursor, magnetic, etc.), not finished marketing sections — [DesignRevision](https://designrevision.com/alternatives/magic-ui). The README says "This project is in beta" — [GitHub](https://github.com/ibelick/motion-primitives)
- **Animate UI**: animates the *primitives* under shadcn/ui ("animates the primitives your components are built on, not the components themselves"). Supports Radix UI, Base UI, and React Aria bases. It respects reduced motion by default — [Animate UI docs](https://animate-ui.com/docs)
- **Cult UI**: shadcn registry with categories AI, Form Controls, Buttons, Cards, Backgrounds & Effects — [Cult UI docs](https://www.cult-ui.com/docs)
- **Kokonut UI**: "100+ open-source React components built with Tailwind CSS, Motion and shadcn/ui" — [GitHub README](https://github.com/kokonut-labs/kokonutui)
- **Eldora UI**, **Animata**: the roundup describes Eldora as a Magic UI–style free set and Animata as mostly micro-interaction snippets — [DesignRevision](https://designrevision.com/alternatives/magic-ui)
- **Origin UI**: was acquired by Cal.com. It is now "coss.com/ui (formerly Origin UI)", and the old Origin components remain only "as a legacy snapshot … with limited support and maintenance". New work goes to "Particles" — [cosscom/ui README](https://github.com/cosscom/ui). Mostly app/form components, with few animated effects — [DesignRevision](https://designrevision.com/alternatives/magic-ui)
- **Uiverse.io (galaxy repo)**: community-made HTML/CSS (and Tailwind) elements such as buttons, loaders, cards, toggles — [GitHub uiverse-io/galaxy](https://github.com/uiverse-io/galaxy)

### Inferences
- For a "cinematic" hero, the most relevant free pieces are Aceternity's background and shader pieces, React Bits backgrounds and text (WebGL/OGL), and Magic UI's text and special effects. The site already has a custom WebGL ribbon shader, so a second full-screen WebGL background would probably be redundant. Text animations, cursor effects, marquees, and bento grids add more value.
- Motion Primitives and Animate UI fit refining existing components better than adding new cinematic sections.

### Gaps
- No official component counts for Cult UI, Eldora, Animata, or Motion Primitives (not fetched).
- I could not verify Hover.dev's current free/paid split, and I did not research it. Indie UI and Syntax UI catalogs were not inspected; only repo metadata is below.
- GetLayers.ai itself was not researched (out of scope).

## Distribution model (copy-paste, shadcn CLI registry, npm)

### Takeaway
Almost all of these libraries now ship as shadcn CLI registries that copy source into the project, so there is no runtime npm package. A `components.json` is usually expected, and this project does not have one yet. Animate UI is the exception: it also has an npm package and its own CLI.

### Cited Findings
- React Bits: `npx shadcn@latest add @react-bits/...`. It also offers a shadcn MCP server and llms.txt — [React Bits intro](https://reactbits.dev/get-started/introduction). The repo devDeps include `@jsrepo/shadcn` — [package.json](https://github.com/DavidHDev/react-bits)
- Skiper UI: `npx shadcn add @skiper-ui/skiper40`. Each component is a single file, and the site says "No extra packages" — [skiper-ui.com](https://skiper-ui.com)
- Vengeance UI: `npx shadcn@latest add @vengeanceui/[component]` — [vengenceui.com](https://www.vengenceui.com). The README says "Copy. Paste. Customize. Ship." — [GitHub](https://github.com/Ashutoshx7/VengeanceUI)
- Cult UI: "not an npm package". It is a registry under `@cult-ui`, e.g. `npx shadcn@latest add @cult-ui/halo-button`. The CLI auto-installs deps such as `motion` and `@base-ui/react` and any shadcn base components needed — [Cult UI docs](https://www.cult-ui.com/docs)
- Kokonut UI: shadcn registry with a namespace added in `components.json`. Source is written to `components/kokonutui/`. You can also install straight from the repo — [README](https://github.com/kokonut-labs/kokonutui)
- Animate UI: import from `@animate-ui/react/primitives/radix-ui`, or run `npx @animate-ui/cli@latest animate all` — [Animate UI docs](https://animate-ui.com/docs)
- Aceternity: "copy-paste" and "Shadcn compatible" — [components page](https://ui.aceternity.com/components)
- Magic UI: copy into apps, "heavily inspired by" shadcn/ui. Roundups say it installs with the shadcn CLI — [Magic UI docs](https://magicui.design/docs); [DesignRevision](https://designrevision.com/alternatives/magic-ui)
- Uiverse: copy the HTML/CSS or Tailwind snippet from the site — [GitHub](https://github.com/uiverse-io/galaxy)

### Inferences
- Copy-paste source fits the site's existing pattern of single-file components in `src/components/ui/`. A one-off `npx shadcn add` into a scratch folder, then a manual port, avoids adding shadcn scaffolding (cn util, CSS vars) if it is not wanted.

### Gaps
- I did not confirm Aceternity's and Magic UI's exact registry namespaces from primary docs in this pass.

## License (exact names, commercial use, attribution, free vs paid)

### Takeaway
MIT (commercial use OK; keep the copyright notice in the source): Magic UI, Motion Primitives, Cult UI, Kokonut UI, Animata, Eldora UI, Vengeance UI, Uiverse (attribution appreciated, not required), Syntax UI, Indie UI, and Origin UI's legacy folder. React Bits and Animate UI use "MIT + Commons Clause": commercial use in a website is fine, but you may not resell the components. Aceternity and Skiper UI publish no clear open-source license for their free tiers, so treat them as proprietary-free.

### Cited Findings
- **React Bits**: the license file is titled "MIT + Commons Clause License Condition v1.0" (© 2026 David Haz). It allows use "including for any commercial purpose, so long as you do not sell, sublicense, or redistribute the components themselves". Tool exports are usable commercially but not as standalone packs. The copyright notice must be kept in copies — [LICENSE.md](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md). GitHub reports SPDX "NOASSERTION". There is a paid "React Bits Pro" at pro.reactbits.dev — [pro.reactbits.dev/compare](https://pro.reactbits.dev/compare)
- **Animate UI**: "MIT + Commons Clause License Condition" (© 2025 Elliot Sutton). Commercial use is OK "so long as you do not sell or redistribute the components themselves in their original form" — [LICENSE.md](https://github.com/imskyleen/animate-ui/blob/main/LICENSE.md)
- **Magic UI**: MIT (GitHub SPDX) — [GitHub](https://github.com/magicuidesign/magicui). Magic UI Pro is a one-time $199 purchase: "8 production-ready templates and 50+ premium components" — [Magic UI docs](https://magicui.design/docs)
- **Aceternity UI**: the /licence page is the proprietary "Aceternity License" for Pro items. It allows unlimited end products for yourself or clients. It forbids redistributing source or reselling it as templates or themes ("You cannot create themes, templates, or derivative products to sell on any marketplace"). It states no attribution requirement — [Aceternity licence](https://ui.aceternity.com/licence). I found no official MIT declaration for the free components, and MIT labels on aggregators are not authoritative — [search summary of 21st.dev/agentskills listings](https://ui.aceternity.com/licence). Aceternity's own guide cites $199 lifetime access for premium blocks and templates — [Aceternity guide (via search)](https://ui.aceternity.com/guides/best-react-ui-components-2026)
- **Skiper UI**: the homepage states no license. Paid tiers: Premium $129 one-time (all premium components, lifetime updates). Exclusive $549 "Coming Soon" (Figma + templates) — [skiper-ui.com](https://skiper-ui.com). A third-party listing says "free users must attribute", which I could not confirm on the official site. /license and /docs/license return 404 — [Tailkits listing](https://tailkits.com/components/skiper-ui/). I found no official public GitHub repo; search found only forks such as nischayhq/skiper-ui with no license.
- **Vengeance UI**: "MIT License, Copyright (c) 2025-2026 Ashutoshx7" — [LICENSE](https://github.com/Ashutoshx7/VengeanceUI/blob/main/LICENSE). The site calls every component open source and shows no paid tier — [vengenceui.com](https://www.vengenceui.com)
- **Motion Primitives**: "Licensed under the MIT license" — [README](https://github.com/ibelick/motion-primitives)
- **Cult UI**: MIT (GitHub SPDX) — [GitHub](https://github.com/nolly-studio/cult-ui). The only paid item on the docs is "AI SDK Agents" (one-time purchase, 150+ blocks) — [Cult UI docs](https://www.cult-ui.com/docs)
- **Kokonut UI**: MIT (GitHub SPDX). The README links a paid "Pro" at kokonutui.pro — [GitHub](https://github.com/kokonut-labs/kokonutui)
- **Eldora UI**: "Licensed under the MIT license" — [README](https://github.com/karthikmudunuri/eldoraui)
- **Animata**: MIT (GitHub SPDX) — [GitHub](https://github.com/codse/animata)
- **Origin UI / coss.com/ui**: mixed licensing. The default is AGPLv3, but "The `apps/origin/` and `apps/ui/` directories are licensed under their original MIT license" — [cosscom/ui README](https://github.com/cosscom/ui)
- **Uiverse**: MIT (© 2023 Uiverse.io). The README says "while not mandatory, we deeply value and appreciate attribution" — [galaxy README](https://github.com/uiverse-io/galaxy)
- **Syntax UI** (SyntaxUI/syntaxui) and **Indie UI** (alibey-10/indie-ui): MIT (GitHub SPDX) — [GitHub API search](https://api.github.com/search/repositories?q=syntaxui)

### Inferences
- Commons Clause (React Bits, Animate UI) is not OSI open source, but it does not restrict using components inside a client or agency marketing site. It only blocks reselling the components. Keep the copyright and license notice in ported files.
- Aceternity free and Skiper UI free are "free to use" but have no clear license. For an agency that ships client work, MIT sources (Magic UI, Vengeance, Cult, Motion Primitives, Kokonut, Eldora, Animata) are lower risk. Skiper UI pieces are already in the repo, so the attribution question should be checked with the author (Gxuri).

### Gaps
- No primary-source license text for Aceternity free components or Skiper UI free components.
- Pro pricing for React Bits Pro, Kokonut Pro, and Motion Primitives Pro (if it exists) was not fetched.

## Compatibility: React 19, Next.js App Router / static export, Tailwind v4, dependencies

### Takeaway
The major libraries (Magic UI, React Bits, Vengeance UI, Motion Primitives docs) already build on Tailwind v4, and most on React 19. All are client components (`"use client"`), so they work with static export. The main cost is the dependencies that some components pull in: GSAP, three / R3F, OGL, matter-js, cobe.

### Cited Findings
- React Bits repo deps: react ^19, tailwindcss ^4.0.3, motion ^12, gsap ^3.13, @gsap/react, three ^0.180, @react-three/fiber ^9, drei, postprocessing, @react-three/rapier, ogl ^1.0.11, matter-js, lenis — [package.json](https://github.com/DavidHDev/react-bits). Only the components that need them pull these in; React Bits "doesn't require Framer Motion" and uses CSS, GSAP, Three.js, or Matter.js per component — [pkgpulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)
- Magic UI site: react 19.1.1, tailwindcss ^4.1.13, motion ^12.23, next ^15.5, cobe, canvas-confetti — [apps/www/package.json](https://github.com/magicuidesign/magicui)
- Vengeance UI: next 16.3.6, react ^19.3, tailwindcss ^4.3.3, framer-motion ^13.4, gsap ^3.15, three ^0.186, @react-three/fiber ^9.8, drei, lenis, @paper-design/shaders-react, many Radix primitives — [package.json](https://github.com/Ashutoshx7/VengeanceUI)
- Motion Primitives docs site: tailwindcss ^4, motion ^11.12, but react ^18 and next ^15.5 — [package.json](https://github.com/ibelick/motion-primitives)
- Skiper UI stack: Tailwind, Next.js, Motion.dev. Single-file components, "No extra packages" — [skiper-ui.com](https://skiper-ui.com)
- Cult UI pulls `motion`, `@base-ui/react`, and shadcn base components through the CLI — [Cult UI docs](https://www.cult-ui.com/docs)
- Animate UI uses Motion inside Radix, Base UI, or React Aria primitives — [Animate UI docs](https://animate-ui.com/docs)
- Aceternity: "built with Tailwind CSS and Motion". Some entries reference Framer Motion — [components page](https://ui.aceternity.com/components)

### Inferences
- The project uses `framer-motion` ^14.6. Components written for `motion` (`import { motion } from "motion/react"`) need either the `motion` package added or imports rewritten to `framer-motion`. These are the same library under two package names, so this is a trivial rewrite.
- Motion Primitives' React 18 docs site does not by itself mean the components fail on React 19. It is a flag to test.
- With static export, nothing here needs server features. Guard WebGL/canvas components against SSR (client-only or dynamic import) and pause them offscreen.

### Gaps
- No known documented Tailwind v4 or React 19 breakages were found for any library in this pass. I did not search issue trackers.

## Maintenance status (late 2026)

### Takeaway
Most libraries are actively maintained, with pushes in Sept–Oct 2026. React Bits leads in stars by a wide margin. Uiverse's repo is stale (last push Sept 2024), Origin UI is legacy, and Indie UI and Syntax UI are slowing.

### Cited Findings (GitHub API, 2026-10-27)
| Repo | Stars | License (SPDX) | Last push |
|---|---|---|---|
| [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | 50,379 | NOASSERTION (MIT+Commons Clause) | 2026-10-19 |
| [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | 22,898 | MIT | 2026-10-17 |
| [uiverse-io/galaxy](https://github.com/uiverse-io/galaxy) | 14,037 | MIT | 2024-09-02 (stale) |
| [cosscom/ui](https://github.com/cosscom/ui) (ex-Origin UI) | 10,754 | AGPL-3.0 default; origin/ MIT | 2026-10-25 |
| [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | 6,836 | MIT | 2026-09-28 |
| [nolly-studio/cult-ui](https://github.com/nolly-studio/cult-ui) | 6,774 | MIT | 2026-10-14 |
| [imskyleen/animate-ui](https://github.com/imskyleen/animate-ui) | 4,705 | NOASSERTION (MIT+Commons Clause) | 2026-10-27 (release 2.4.1) |
| [codse/animata](https://github.com/codse/animata) | 2,985 | MIT | 2026-10-26 |
| [kokonut-labs/kokonutui](https://github.com/kokonut-labs/kokonutui) | 2,223 | MIT | 2026-10-26 |
| [karthikmudunuri/eldoraui](https://github.com/karthikmudunuri/eldoraui) | 1,972 | MIT | 2026-09-26 |
| [Ashutoshx7/VengeanceUI](https://github.com/Ashutoshx7/VengeanceUI) | 1,240 | MIT | 2026-10-21 |
| [SyntaxUI/syntaxui](https://github.com/SyntaxUI/syntaxui) | 990 | MIT | 2026-05-18 |
| [alibey-10/indie-ui](https://github.com/alibey-10/indie-ui) | 708 | MIT | 2026-01-07 |
- Aceternity UI and Skiper UI have no official public source repo that I could find, so their activity cannot be measured on GitHub.
- Star counts in blog posts (React Bits "24K to 37K") are out of date compared with the API figure of 50K — [pkgpulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)

### Gaps
- Release cadence and issue backlog were not analysed. These are push dates only.

## Performance / bundle cost

### Takeaway
Components built on Motion or CSS are cheap, and the site already ships framer-motion. The cost comes from WebGL and physics components: three / R3F, OGL, GSAP, matter-js, cobe, Paper shaders. Many Aceternity and React Bits backgrounds are canvas or WebGL loops.

### Cited Findings
- Aceternity effects "can be heavy" and are less suited to repeatable system components — [DesignRevision](https://designrevision.com/alternatives/magic-ui)
- React Bits pulls GSAP, Three.js, or Matter.js only for the components that need them — [pkgpulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)
- Vengeance UI's repo depends on three, R3F, gsap, lenis, and Paper shaders. Individual components may pull these in — [package.json](https://github.com/Ashutoshx7/VengeanceUI)
- Animate UI defaults to transform and opacity animations (not layout), interruptible motion, and reduced-motion support — [Animate UI docs](https://animate-ui.com/docs)

### Inferences
- The site already runs a custom WebGL shader. Adding React Bits or Aceternity WebGL backgrounds would add a second GL context and likely tens to hundreds of kB (three is large; OGL is much lighter). Prefer text, cursor, marquee, and bento components built on Motion or CSS, and lazy-load anything that uses WebGL.

### Gaps
- No measured per-component bundle sizes were found.

## Fit for a dark, minimal agency site with a single #3730e8 accent

### Takeaway
Best fit: Magic UI (MIT, polished marketing text and effects), React Bits text and cursor pieces (license OK for a site, highly configurable colors), Vengeance UI (MIT, already in use, same stack: Next 16 / React 19 / TW4), and Motion Primitives (MIT, subtle primitives). Use Aceternity's dark dramatic backgrounds sparingly, since their license is unclear and they tend toward multicolor gradients.

### Cited Findings
- Aceternity is "focused on dark, dramatic effects", Magic UI is "polished and opinionated", and React Bits "prioritizes customizability" — [pkgpulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)
- Magic UI is a "strong shortcut for marketing pages". Cult UI has "tasteful animations" but a smaller catalog. Motion Primitives offers building blocks, not finished sections — [DesignRevision](https://designrevision.com/alternatives/magic-ui)
- Skiper UI's design is "inspired by Devouring Details by Rauno", a minimal, interaction-focused style — [skiper-ui.com](https://skiper-ui.com)

### Inferences
- All copy-paste sources can be recolored to a single accent through Tailwind classes or CSS variables. React Bits components expose color props. Many Aceternity and Magic UI effects hard-code rainbow or neutral gradients that need manual edits to stay on-brand.
- Uiverse snippets vary in quality and style, and the repo is stale. They are fine for an occasional button or loader, but not as a system.

### Gaps
- No hands-on visual review of each library under the site's palette was done.
