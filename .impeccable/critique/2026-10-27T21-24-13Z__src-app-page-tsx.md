---
target: home page
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/Users/alaamac/code/vellox-website/src/app/page.tsx"
target_fingerprint: "sha256:229ca2d3cdc922864879512efb2547ff2cf60eef731ac5472fbc771169bc8bcf"
target_path: /Users/alaamac/code/vellox-website/src/app/page.tsx
timestamp: 2026-10-27T21-24-13Z
slug: src-app-page-tsx
---
# Critique — home page (src/app/page.tsx), run 2

Method: dual-agent (A: design review · B: detector + browser overlay at 1440x900 and 375x812)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | No sense of position on a ~7,000px page |
| 2 | Match System / Real World | 2 | "Deliverables", "UX/UI", "Design System", Frappe pill with no gloss |
| 3 | User Control and Freedom | 3 | Scroll-linked word slide can't be skipped |
| 4 | Consistency and Standards | 2 | Service names differ list/marquee/footer; CTA in three treatments; fallback "&" glyph |
| 5 | Error Prevention | 3 | — |
| 6 | Recognition Rather Than Recall | 3 | References claim defers to About; hover slot empty until covers exist |
| 7 | Flexibility and Efficiency | n/a | Persuade |
| 8 | Aesthetic and Minimalist Design | 3 | Marquee repeats list; statement band repeats hero line |
| 9 | Error Recovery | 3 | No empty-state for "projects without imagery" |
| 10 | Help and Documentation | n/a | Persuade |
| Total | | 22/32 (69%) | Acceptable (top of band); up from 19/32 |

## Design Specificity Verdict
Interchangeable shell, specific copy. Headline/support/CTA copy is now Vellox's; the shell (shader hero, marquee, numbered list, statement band, sticky cards, stat row, CTA band) is still kit-assembled and the footer credits the kits. The brand → web/store → operations story is told but never drawn.
Detector: CLI side-tab x2 (accordion.tsx, not on home). Runtime real: oversized-h1 (74px/37vh at 1440x900), text-occlusion (Pause button over marquee text), overused-font (Geist 38%), em-dash-overuse (8), straggler x2 (advisory). False positives: low-contrast x4 on aria-hidden decorative elements, buried-raster on footer watermark. Previous kicker-above-heading and undersized-ui-text are resolved. CTA bottom at 87% of viewport (1366x768) and 76% (375x812).

## Priority Issues
- [P0] Proof section amplifies absence of proof: three 460px placeholder cards (page.tsx:137-158) while six real testimonials sit on About. Fix: compact "Recent clients" list + 2–3 testimonials on home until covers arrive via CMS; card stack returns per project with a cover. → distill, harden
- [P1] Layout says eight equal services; positioning is brand → web/store → operations. Fix: three stage groups, lead with first two, replace "N deliverables" with outcomes, unify names. → clarify, layout
- [P1] Kit-generic visual language; footer credits kits; shaders read dev-tools. Fix: one motif from the script mark, retire one shader, move attribution to /colophon if licence allows. Parked: owner chose to keep the look. → bolder
- [P2] ScrollRevealText clips on mobile (scroll-reveal-text.tsx:25, ±140px offset inside overflow-hidden). Fix: scale offset by viewport. → animate
- [P2] Jargon at decision moments: Frappe pill, "N DELIVERABLES", tag chips. → clarify
- [P3] Polish: Optika has no "&" (fallback glyph), Pause pill overlaps marquee at 375px, orphans ("Read the references →", menu "Mail"), statement band ~1.4 empty viewports at 1366x768, single-digit count-up. → polish, typeset

## Persona Red Flags
Jordan: can't pick among 8 rows; "deliverables" reads like a hidden price list; Frappe pill unknown words; project page one sentence. Riley: empty hover reveals; stats vs three thin case studies; footer kit credit; empty statement screens. Casey: Pause pill over text; clipped statement headline; three full-screen placeholders; orphans. Nadia: finds no wellness packaging/storefront; no price band, hours or faces.

## Minor Observations
Three CTA affordances in first viewport; "EU & MENA" only at 11px in a corner; case-card dl duplicates tags, year empty; whatWeDo.body is an instruction; footer watermark is the best use of the mark.

## Questions to Consider
Would Vellox hire an agency whose footer credits two UI kits? Why three empty cards instead of six real testimonials? Which layout element draws "first logo → store → system"?
