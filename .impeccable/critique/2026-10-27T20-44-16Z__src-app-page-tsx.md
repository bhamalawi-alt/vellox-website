---
target: home page
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
target_identity: "file:/Users/alaamac/code/vellox-website/src/app/page.tsx"
target_fingerprint: "sha256:f3078d56fa40948c95338257d22b81b5433ff8f28dac4ff110dfd0614e977bcb"
target_path: /Users/alaamac/code/vellox-website/src/app/page.tsx
timestamp: 2026-10-27T20-44-16Z
slug: src-app-page-tsx
---
# Critique — home page (src/app/page.tsx)

Method: dual-agent (A: design review · B: detector + browser overlay)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Stats flash wrong mid-count numbers; no cue what "Start a Project" leads to |
| 2 | Match System / Real World | 1 | Agency/engineering vocabulary for a founder audience |
| 3 | User Control and Freedom | 3 | Sticky stack takes ~3 screens of scroll |
| 4 | Consistency and Standards | 2 | Service names differ across nav/footer/marquee/list; three arrow glyphs; CTA case varies |
| 5 | Error Prevention | 3 | Empty featured list silently removes the proof section |
| 6 | Recognition Rather Than Recall | 2 | No imagery; eight abstract services, no "start here" |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 3 | "One roof / no hand-offs" line appears three times |
| 9 | Error Recovery | 3 | n/a-ish on page |
| 10 | Help and Documentation | n/a | Marketing page |
| Total | | 19/32 (59%) | Acceptable |

## Design Specificity Verdict
Interchangeable: a stock dark-agency template assembled from Skiper UI / Vengeance UI components; brand blue #3730e8 appears only as a 6px dot (wrong value #7c78ff, page.tsx:83); no real imagery; the studio's own mark and Optika face under-used.
Detector: CLI side-tab x2 (accordion.tsx:39,63, not on home), bounce-easing (image-reveal-list.tsx:43). Runtime: undersized-ui-text (10px Pause button), kicker-above-heading x2, overused-font (Geist Mono 39% at mobile width), low-contrast x4 and buried-raster x1 on decorative aria-hidden elements (false positives).

## Priority Issues
- [P0] Hero sells ERPNext instead of brand+web and buries the CTA below the fold at 1366x768 and 375x812; headline 5 lines at 75% opacity (home.ts:7, page.tsx:67, :82-85). Fix: ≤3-line white headline about brands/websites/stores, ERP as second beat, drop hero Frappe badge, trim padding. → clarify, layout
- [P0] Zero real evidence: placeholder case cards (CaseStudyCard.tsx), empty service-row image slots, no testimonial/client/face; "8 Industries" stat contradicts headline and isn't in evidence; "verified via LinkedIn references" has no link (home.ts:36-46). Fix: 6-9 real archive items into row previews + a "Recent work" strip; replace Industries stat with references link; drop/link LinkedIn line. → harden, delight
- [P1] CTO vocabulary ("platforms", "positioning to production", "practice areas", "engagements", "diagnostic call", "headless commerce"). Fix: founder nouns; "Recent work"; "a 20-minute call"; group rows Brand/Digital/Operations. → clarify
- [P1] Template, not brand: stock components, kit attribution in footer, brand blue absent, two meaningless shaders. Fix: one signature brand-blue device from hero mark through services to CTA; keep one shader; move attribution if licence allows. → bolder, colorize
- [P2] Duplicated content and overlapping motion: sentence x3; sticky stack clips card headers at 900px tall (sticky-stack.tsx:44); count-up shows false numbers; everything animates at once; 10px Pause button. → distill, animate

## Persona Red Flags
Jordan: can't find "website"; can't tell which service builds the shop; "diagnostic call" hesitation. Riley: 3 vs 8 industries; unlinked 94%/120+; empty hover previews; footer attribution; placeholder portfolio. Casey: CTA at bottom edge, ~2,500px services list, "Click any practice" on touch, unpinned 1,000px cards. Nadia (wellness founder, Dubai): letter-on-gradient instead of packaging; "On-site" read as travel promise; Frappe emphasis reads as software house.

## Minor Observations
Badge dot #7c78ff; "ON-/SITE" wrap at 375px; 10px Pause; kicker-above-heading x2; mono 39%; bounce easing; three Start-a-Project affordances in first viewport; per-row service counts; marquee duplicates services list; hard-coded "Selected engagements"; stats heading is an eyebrow.

## Questions to Consider
Could a visitor tell a brand studio made this? Why is none of the archive on the home page? Would three doors (brand / website or store / run the business) convert better than eight categories?
