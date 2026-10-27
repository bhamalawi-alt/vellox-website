# Free / open-source alternatives to GetLayers.ai "3D scene", "background" and "gradient" prompts

Context: Next.js 16 App Router, static export, React 19, Tailwind 4, strict CSP (`script-src 'self'`), custom raw-WebGL backgrounds are already in place, and three.js was removed to save about 124 KB gzip. Research date: 2026-10-27.

Method note: The npm registry was queried directly on 2026-10-27 for the version, licence field, publish date and peer dependencies. Bundlephobia's API was queried for min and gzip sizes. Bundlephobia measures the **whole package entry**, not a tree-shaken import, so the real cost is lower for tree-shakeable libraries (drei, Paper Shaders, three). Registry data: `https://registry.npmjs.org/<pkg>`. Size data: `https://bundlephobia.com/api/size?package=<pkg>`.

## What each tool offers, and its licence / commercial terms

### Takeaway
Most code libraries (three, R3F, drei, OGL, Paper Shaders, ShaderGradient, Vanta, tsParticles, lottie-web, dotLottie, Rive runtime, curtains, Babylon) use permissive licences: MIT, Apache-2.0, Unlicense or Zlib. They allow commercial use with no visible attribution. The commercial restrictions are in the **hosted design tools**: Spline (watermark on Free), Unicorn Studio (Free is non-commercial and branded) and Rive (export needs a paid plan since Oct 2025). The restrictions are also in **Shadertoy code**, whose default licence is CC BY-NC-SA 3.0, and that licence forbids commercial use.

### Cited Findings

**Registry snapshot (version | licence | last publish)**, from the npm registry, 2026-10-27 ([npm registry](https://registry.npmjs.org/)):
- three 0.186.1 | MIT | 2026-09-24
- @react-three/fiber 9.8.2 | MIT | 2026-10-14. Peers: `react >=19 <19.4`, `react-dom >=19 <19.4`, `three >=0.156`
- @react-three/drei 10.7.9 | MIT | 2026-09-25. Peers: `react ^19`, `@react-three/fiber ^9.0.0`, `three >=0.159`
- ogl 1.0.11 | Unlicense | 2025-01-27, zero deps
- @paper-design/shaders and @paper-design/shaders-react 0.0.82 | Apache-2.0 | 2026-10-21. React peer `^18 || ^19`
- @shadergradient/react 2.4.20 | MIT | 2025-12-08. React peer `^18.2 || ^19`
- vanta 0.5.24 | MIT | 2022-09-16
- @splinetool/react-spline 4.1.0 | **no licence field** | 2025-07-15. Peer `next >=14.2.0`
- @splinetool/runtime 2.0.113 | **no licence field** | 2026-10-26
- unicornstudio-react 2.4.0 | MIT (community wrapper by diegopeixoto) | 2026-10-11
- @rive-app/react-canvas 4.37.1 | MIT | 2026-10-22, React peer includes `^19.0`
- @rive-app/canvas 2.47.1 | MIT | 2026-10-24
- lottie-web 5.13.0 | MIT | 2025-05-21
- @lottiefiles/dotlottie-web 0.81.0 | MIT | 2026-10-06
- @lottiefiles/dotlottie-react 0.20.0 | MIT | 2026-10-06, React peer `^17 || ^18 || ^19`
- @tsparticles/engine, slim and react 4.5.0 | MIT | 2026-10-25
- granim 2.0.0 | MIT | 2018-11-11
- @babylonjs/core 9.32.1 | Apache-2.0 | 2026-10-27
- curtainsjs 8.1.6 | MIT | 2024-05-02
- gpu-curtains 0.17.0 (WebGPU successor by the same author) | MIT | 2026-10-26
- regl 2.1.1 | MIT | 2024-11-12
- typegpu 0.12.9 | MIT | 2026-10-23
- postprocessing 6.39.5 | Zlib | 2026-09-09. Peer `three >=0.168 <0.187`

**three.js / R3F / drei**: General 3D (hero scenes, GLTF models, particles, post-processing). MIT. The R3F v9 line is the React 19 line: its peer dependency is pinned to React `>=19 <19.4` ([npm registry](https://registry.npmjs.org/@react-three%2Ffiber)). R3F v10 is in alpha (10.0.0-alpha.6). It makes WebGPURenderer the default and falls back to WebGL2. Node materials and compute shaders work only in the new renderer ([newreleases.io](https://newreleases.io/project/npm/@react-three/fiber/release/10.0.0-alpha.6)).

**OGL**: A minimal WebGL library (Renderer, Program, Mesh, Geometry). It suits a hand-written full-screen shader or a light 3D scene. Unlicense (public domain), zero dependencies ([npm registry](https://registry.npmjs.org/ogl)).

**Paper Shaders**: "Zero-dependency HTML canvas shaders". The React components include MeshGradient and DotOrbit, and the full catalogue is at shaders.paper.design. Apache-2.0. The README says it "can be used in commercial projects without visible attribution". You must keep LICENSE and NOTICE only when you redistribute the code inside another library or tool. Credit is appreciated but not required. The project is pre-1.0 (0.0.x), and the README says to pin the version because breaking changes ship in 0.0.x. Copyright Lost Coast Labs, Inc. The repo has about 3.8k stars and 388 commits ([GitHub paper-design/shaders](https://github.com/paper-design/shaders)).

**ShaderGradient**: Animated 3D mesh gradients (plane, sphere, waterPlane), with a visual configurator at shadergradient.co, plus a Figma plugin and a Framer component. MIT, copyright ruucm & stone-skipper ([GitHub ruucm/shadergradient](https://github.com/ruucm/shadergradient)).

**Vanta.js**: Preset animated backgrounds (Birds, Fog, Clouds, Clouds2, Trunk, Topology, Waves, and more) that run on three.js or p5.js. MIT. 7.3k stars, 67 open issues, no GitHub releases ([GitHub tengbao/vanta](https://github.com/tengbao/vanta)).

**Spline**: A hosted 3D design tool with a web runtime. Plans: Free $0, Hobby $15/mo ($12 yearly), Pro $30/mo ($25 yearly), Max $70/mo ($60 yearly), and Enterprise. The Free plan has "Web exports with watermark" (a Spline logo on published scenes). Hobby removes the watermark from 3D web exports. Pro and above also remove it from 2D web embeds. "Code export" starts at Pro. **Self-hosted export is Enterprise only.** The pricing page does not address commercial-use licensing ([Spline pricing](https://spline.design/pricing)). The npm runtime packages have no licence field, so they are proprietary or unlicensed ([npm registry](https://registry.npmjs.org/@splinetool%2Fruntime)).

**Unicorn Studio**: A hosted no-code WebGL effects and shader-scene tool with 75+ effects. Free plan: "Up to 8 publishes with Unicorn branding", **"Personal and non-commercial use"**, image exports and limited video exports. Legend plan: $168/yr or $20/mo, "Unlimited publishes without logo watermark", **commercial license**, JSON export and hosting ([Unicorn Studio pricing docs](https://www.unicorn.studio/docs/pricing/)). A commercial agency site therefore needs Legend.

**Rive**: Interactive state-machine vector animations (.riv). The runtimes are MIT. From 20 Oct 2025, "creating new exports will move to our paid plans". The entry tier, Cadet, is $9/mo billed annually. Rive says there are no runtime fees, and exported files keep working regardless of plan status ([Rive blog: new $9/mo plan](https://rive.app/blog/rive-s-new-9-mo-plan)). Third-party sources list Voyager at about $32/seat/mo and give conflicting seat limits ([comparetiers](https://comparetiers.com/tools/rive); [vijaytalksai](https://vijaytalksai.com/rive-pricing-explained/)).

**Lottie**: lottie-web is MIT, and its last publish was May 2025. dotLottie-web is MIT, under active development, and renders through WASM (ThorVG) ([npm registry](https://registry.npmjs.org/@lottiefiles%2Fdotlottie-web)).

**tsParticles**: Particle and confetti backgrounds. MIT, v4.5.0 published 2026-10-25, and it has a React wrapper ([npm registry](https://registry.npmjs.org/@tsparticles%2Freact)).

**Granim.js**: Animated 2D canvas gradient transitions. MIT, last release 2018 (v2.0.0) ([npm registry](https://registry.npmjs.org/granim)).

**Neat (@firecms/neat)**: Animated mesh-style gradients that use raw WebGL since v0.7 and no longer need three.js. Its licence is described as a "CC license". It is free for commercial and non-commercial use, but you must keep the licence and credits when you modify or redistribute it ([Neat README](https://cdn.jsdelivr.net/npm/@firecms/neat@0.8.0/README.md)).

**InstantGradient**: This gradient tool says its mesh, liquid and wave styles render with @paper-design/shaders, and its silk and stripe styles render with "gradflow". It calls both MIT ([instantgradient.com](https://instantgradient.com/app/b9a8da-fce2c1)). Note the conflict: Paper Shaders is actually Apache-2.0 according to its repo and npm.

**Shadertoy**: The default template header for a new Shadertoy shader states Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported, and each author can change it ([three.js manual: Three.js and Shadertoy](https://threejs.org/manual/en/shadertoy.html)). Community opinion holds that Shadertoy shaders are non-commercial by default, and that glslsandbox is "probably more permissive" ([Magic Music Visuals forum](https://magicmusicvisuals.com/forums/viewtopic.php?p=9455)). One forum discussion complains that the default licence is not clearly shown on the site ([Vidvox forum](https://discourse.vidvox.net/t/two-weeks-of-isf-shader-conversion/2649)). shadertoy.com/terms returned HTTP 403 to the fetcher, so the official wording could not be checked.

**Babylon.js**: A full 3D engine, Apache-2.0, very active (9.32.1 published on the research date) ([npm registry](https://registry.npmjs.org/@babylonjs%2Fcore)).

**curtains.js**: Maps DOM images/video to WebGL planes, which suits shader hover effects on a gallery. MIT, last release May 2024. Its WebGPU successor, gpu-curtains, is active (0.17.0, Oct 2026) ([npm registry](https://registry.npmjs.org/gpu-curtains)).

**TypeGPU**: A type-safe WebGPU toolkit. MIT, 0.12.9, Oct 2026 ([npm registry](https://registry.npmjs.org/typegpu)).

### Inferences
- With three.js removed, the lowest-risk fit for the site is to **keep the custom raw-WebGL approach** and copy ideas from Paper Shaders, OGL or The Book of Shaders where they are needed. Paper Shaders is the best drop-in for GetLayers-style gradient and background prompts: it is Apache-2.0, needs no attribution, has no dependencies, and is maintained.
- CC BY-NC-SA shaders from Shadertoy should not ship on a commercial agency site without the author's written permission. The ShareAlike term would also apply to derivatives. Use Shadertoy only as a learning reference, or use shaders whose header has a permissive licence.
- Spline Free and Unicorn Studio Free are unsuitable for a commercial client site: Spline Free carries a watermark, and Unicorn Studio Free is non-commercial and branded.

### Gaps
- The licence of whatamesh / Stripe "minigl" was not verified. The Stripe-derived code was reverse-engineered from stripe.com, and I found no primary licence statement. Treat it as unclear.
- The licence of "gradflow" was not checked on its own page.
- I did not fetch the content licence of The Book of Shaders or the default licence of glslSandbox. Check them before you copy code.
- The official Shadertoy terms page was blocked (403).

## React 19 / Next.js App Router / static export compatibility, and SSR

### Takeaway
All candidates are browser-only (canvas, WebGL, WASM). In App Router, put them in a `'use client'` component and load them lazily: use `next/dynamic` with `ssr:false` inside a client component, or use a dynamic `import()` in `useEffect`. All of them work with `output: 'export'` because they need no server. React 19 support is explicit for R3F v9, drei 10, Paper Shaders, ShaderGradient, Rive React and dotLottie React.

### Cited Findings
- R3F 9.x requires React 19 (`>=19 <19.4`), and drei 10 requires R3F ^9 and React ^19 ([npm registry](https://registry.npmjs.org/@react-three%2Fdrei)). The upper bound `<19.4` means a future React 19.4 upgrade may need a newer R3F.
- The ShaderGradient README says that for Next.js 15 App Router "you must use R3F v9 + React 19". With those versions, no `next.config` aliases or `transpilePackages` are needed. Its peer dependencies to install are `three`, `@react-three/fiber`, `three-stdlib` and `camera-controls` ([GitHub ruucm/shadergradient](https://github.com/ruucm/shadergradient)).
- `@splinetool/react-spline` declares the peer `next >=14.2.0` ([npm registry](https://registry.npmjs.org/@splinetool%2Freact-spline)).
- unicornstudio-react exposes `unicornstudio-react/next` for Next.js 13+ (App and Pages Router). Its props include `lazyLoad` (default true), `dpi` (default 1.5), `fps`, `scale`, `paused`, `placeholder` and `jsonFilePath` ([GitHub diegopeixoto/unicornstudio-react](https://github.com/diegopeixoto/unicornstudio-react)).
- Vanta's React usage is through `useEffect`, with cleanup by `effect.destroy()`. It needs `window.THREE`, or THREE passed as an option ([GitHub tengbao/vanta](https://github.com/tengbao/vanta)).
- The Paper Shaders README does not mention SSR or Next.js ([GitHub paper-design/shaders](https://github.com/paper-design/shaders)).

### Inferences
- The site's existing pattern (lazy-load after page load, pause off-screen, cap DPR at 1.5) applies to every library. Paper Shaders and unicornstudio-react have props for speed, DPI and fps. For the others, the wrapper component must handle IntersectionObserver pausing.

### Gaps
- I did not confirm whether Paper Shaders' React components already include `'use client'` directives.

## Bundle / runtime cost and mobile performance

### Takeaway
Measured as the full package entry (min / gzip), from Bundlephobia on 2026-10-27:

| Package | min | gzip |
|---|---|---|
| three | 719 KB | 180.6 KB |
| @react-three/fiber | 178.6 KB | 56.3 KB (plus three) |
| @react-three/drei | 1641 KB | 509 KB (full entry; tree-shaken imports are far smaller) |
| ogl | 128 KB | 33.4 KB (tree-shakeable) |
| @paper-design/shaders | 209 KB | 62.8 KB (full catalogue; one shader is far less) |
| @paper-design/shaders-react | 269 KB | 81.1 KB |
| @shadergradient/react | 263 KB | 48.4 KB (plus three, R3F, three-stdlib and camera-controls peers) |
| vanta | 7.9 KB | 2.6 KB (index only; each effect needs three or p5) |
| @splinetool/runtime | 974 KB | 273 KB (plus WASM and scene file) |
| unicornstudio-react | 893 KB | 231 KB (bundles the SDK) |
| @rive-app/canvas | 310 KB | 76.5 KB (plus rive.wasm) |
| lottie-web | 299 KB | 75 KB |
| @lottiefiles/dotlottie-web | 161 KB | 32.3 KB (plus WASM) |
| @tsparticles/engine | 42.8 KB | 14.5 KB |
| @tsparticles/slim | 112 KB | 32.1 KB |
| granim | 18 KB | 4.9 KB |
| curtainsjs | 104 KB | 23 KB |
| regl | 115 KB | 36.8 KB |
| typegpu | 312 KB | 86.9 KB |
| gpu-curtains | 494 KB | 117 KB |

Source: [Bundlephobia API](https://bundlephobia.com/). Bundlephobia had no result for Babylon.js; its core package is 72.7 MB unpacked ([npm registry](https://registry.npmjs.org/@babylonjs%2Fcore)).

### Cited Findings
- Vanta's README says the total added size is about 120 KB gzipped, mostly three.js. Its CDN example loads three.js **r134**, which is very old compared with the current r186 ([GitHub tengbao/vanta](https://github.com/tengbao/vanta); [npm registry](https://registry.npmjs.org/three)).
- ShaderGradient requires three and R3F as peer dependencies, so adopting it re-adds three.js. By the measurements above, that is about 181 KB gzip for three plus 56 KB for R3F, before tree-shaking ([GitHub ruucm/shadergradient](https://github.com/ruucm/shadergradient); [Bundlephobia](https://bundlephobia.com/)).
- The Spline runtime renders on canvas with WebGPU and a WebGL fallback ([Spline runtime README](https://cdn.jsdelivr.net/npm/@splinetool/runtime@2.0.43/README.md)).
- unicornstudio-react defaults to `dpi` 1.5 and supports `scale` from 0.25 to 1 and an `fps` cap. These settings control cost on mobile ([GitHub diegopeixoto/unicornstudio-react](https://github.com/diegopeixoto/unicornstudio-react)).

### Inferences
- Paper Shaders, OGL, tsParticles engine, Granim and a hand-written shader all cost less than 35 KB gzip for one effect. three plus R3F costs more than 230 KB, and Spline and Unicorn cost more than 230 KB. Because the site removed three.js to save about 124 KB, Spline, Unicorn Studio, ShaderGradient, Vanta and R3F all reverse that saving.

### Gaps
- I did not measure tree-shaken sizes for a single Paper Shaders component, a single OGL import, or drei.

## Third-party CDN / external service at runtime (CSP and static hosting)

### Takeaway
The self-contained options are three, R3F, drei, OGL, Paper Shaders, ShaderGradient (renderer only), tsParticles, Granim, curtains, lottie-web and Vanta (npm import). They work under `script-src 'self'`. **Rive and dotLottie fetch their WASM from unpkg or jsdelivr by default.** You can self-host it with `setWasmUrl`. **Spline** loads scenes from Spline's servers unless you host the `.splinecode` file yourself. **Unicorn Studio** uses a hosted `projectId` unless you use a JSON export, which is a paid Legend feature.

### Cited Findings
- dotLottie loads its WASM from jsdelivr by default, with unpkg as a fallback. `setWasmUrl` must run before rendering. Setting it disables the CDN fallback. LottieFiles publishes a "CSP and WASM Self-Hosting Guide", and the WASM file ships in `@lottiefiles/dotlottie-web/dist/` ([dotlottie-web wiki: CSP and WASM Self-Hosting Guide](https://github.com/LottieFiles/dotlottie-web/wiki/CSP-and-WASM-Self%E2%80%90Hosting-Guide); [LottieFiles API reference](https://docs.lottiefiles.com/en/runtimes/distributions/react/v0.x/api-reference)).
- The Rive web runtimes request `rive.wasm` from unpkg at the pinned `@rive-app/canvas` version by default. To self-host, import the WASM as a URL and pass it to `RuntimeLoader.setWasmUrl`. The WASM version must match the JS package. Serve it as `application/wasm` ([Rive docs: Preloading WASM](https://rive.app/docs/runtimes/react/preloading-wasm)).
- Spline: if you hit CORS problems, you can download the `.splinecode` file and host it yourself. You download it from the code-export panel ([Spline runtime README](https://cdn.jsdelivr.net/npm/@splinetool/runtime@1.7.8/README.md)). A fully self-hosted ZIP export (runtime plus assets) is Enterprise-only ([Spline docs: self-hosted export](https://docs.spline.design/exporting-your-scene/web/exporting-as-self-hosted-project); [Spline pricing](https://spline.design/pricing)).
- unicornstudio-react loads its bundled SDK locally by default, with `sdkUrl` as an override. It supports `jsonFilePath` for self-hosted scenes ([GitHub diegopeixoto/unicornstudio-react](https://github.com/diegopeixoto/unicornstudio-react)). JSON export is in the Legend plan ([Unicorn Studio pricing docs](https://www.unicorn.studio/docs/pricing/)).
- Vanta's quick-start uses a cdnjs script tag for three.js. You can avoid this by importing three from npm ([GitHub tengbao/vanta](https://github.com/tengbao/vanta)).
- The ShaderGradient Framer component is loaded from a framer.com URL. The React package is installed from npm ([GitHub ruucm/shadergradient](https://github.com/ruucm/shadergradient)).

### Inferences
- WASM-based runtimes (Rive, dotLottie, Spline) need `'wasm-unsafe-eval'` in `script-src` under a strict CSP, even when the file is self-hosted. This is general CSP behaviour, not verified in these docs, so test it. They also need `connect-src` for the hosts they fetch from. Hosted Spline or Unicorn scenes need `connect-src` and `img-src` for the vendor's domains.
- iframe embeds (Spline public URL, Unicorn hosted embed) would need `frame-src` for the vendor's domain. Avoid them on this site.

### Gaps
- I did not verify the exact domains that Spline and Unicorn hosted scenes contact. Find them with the browser network panel before you allowlist anything.
- I did not confirm whether Spline's `.splinecode` download is available on the Free or Hobby plan, or only with "Code export" (Pro).

## Maintenance status (late 2026)

### Takeaway
Active (releases in Sep–Oct 2026): three, R3F, drei, Paper Shaders, Spline runtime, unicornstudio-react, Rive, dotLottie, tsParticles, Babylon, gpu-curtains, TypeGPU, postprocessing. Slowing: ShaderGradient (Dec 2025), lottie-web (May 2025), OGL (Jan 2025; it is small and stable). Effectively unmaintained: Vanta (2022, three r134 in its examples), Granim (2018), curtains.js (May 2024, replaced by gpu-curtains).

### Cited Findings
- Publish dates are in the registry snapshot in the first section ([npm registry](https://registry.npmjs.org/)).
- R3F v10 (WebGPU default) is still alpha ([newreleases.io](https://newreleases.io/project/npm/@react-three/fiber/release/10.0.0-alpha.6)). A Jan 2026 guide calls three.js WebGPU production-ready, and another source ties readiness to r171. These are blog sources, not official release notes ([Utsubo migration guide](https://www.utsubo.com/blog/webgpu-threejs-migration-guide); [Utsubo 2026 overview](https://www.utsubo.com/blog/threejs-2026-what-changed)).
- TSL is written in JavaScript and compiles to WGSL (WebGPU) or GLSL (WebGL) ([ics.media](https://ics.media/en/entry/250501/)).
- Paper Shaders is still on 0.0.x, with frequent breaking-change releases. The README says to pin the version ([GitHub paper-design/shaders](https://github.com/paper-design/shaders)).

### Inferences
- WebGPU-only tools (TypeGPU, gpu-curtains, R3F v10) are not needed for 2D gradient backgrounds. WebGL2 still reaches the most devices. WebGPU is optional unless compute-heavy effects are planned.

### Gaps
- I did not check GitHub commit activity for OGL, ShaderGradient or Vanta beyond the npm publish dates.

## Fit for a dark agency site with brand accent #3730e8 (colour control)

### Takeaway
Every code library accepts arbitrary hex colours. Paper Shaders (`colors` array, `colorBack`) and ShaderGradient (`color1` to `color3`) map most directly to a "dark background + indigo accent" look. Hosted tools (Spline, Unicorn) need the colour set in their editor, or at runtime through scene variables.

### Cited Findings
- Paper Shaders MeshGradient takes `colors` (array of hex), `colorBack`, `distortion`, `swirl`, `speed` and `scale` ([GitHub paper-design/shaders](https://github.com/paper-design/shaders)).
- ShaderGradient takes `color1`, `color2` and `color3` hex strings, or a shadergradient.co URL query string through `control="query"` ([GitHub ruucm/shadergradient](https://github.com/ruucm/shadergradient)).
- Vanta effects take hex numbers such as `color: 0x000000` ([GitHub tengbao/vanta](https://github.com/tengbao/vanta)).
- unicornstudio-react exposes `variables` and `preset` for runtime control. These need scenes published with SDK 2.2+ ([GitHub diegopeixoto/unicornstudio-react](https://github.com/diegopeixoto/unicornstudio-react)).

### Inferences
- A suggested palette for a Paper MeshGradient on a dark site: `colorBack` near-black, and `colors` like `#3730e8`, a darker indigo, a near-black, and one desaturated light tint. This keeps the accent from flooding the hero.
- **Recommended short-list for this site:**
  1. Keep the custom raw WebGL backgrounds.
  2. Add Paper Shaders (one component, lazily imported) for mesh, grain or dither gradients.
  3. Use OGL if a light 3D or full-screen shader helper is wanted.
  4. Use tsParticles engine only if particles are needed.
  5. Avoid Spline Free, Unicorn Free, Shadertoy NC code, Vanta (old, re-adds three) and ShaderGradient (re-adds three and R3F) unless the three.js cost is accepted again.

### Gaps
- I did not visually test the libraries with #3730e8.
