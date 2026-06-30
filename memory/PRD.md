# PRD — Data Center Impact Tracker & Community Blueprint

## Latest Reconfigure (2026-06-30, evening)
User asked to **reconfigure the app totally** — drop the Johnson City Observer newspaper framing and the heritage/culture sections; build a focused, single-page civic dashboard for the Data Center Impact Tracker only.

## Current Architecture
Pure static site served by the existing CRA dev server (`App.js` returns `null` so React does not interfere).
- `/app/frontend/public/index.html` — single-page app with sticky left module rail + hero + 12 modules + footer.
- `/app/frontend/public/styles.css` — clean civic-dashboard stylesheet (warm bone `#f7f5ef`, stewardship green `#2d5d3d`, caution amber `#b8693a`, Manrope + Inter + JetBrains Mono).
- `/app/frontend/public/app.js` — all interactive logic (5 calculators, 4 downloads, comment drafter, survey CSV, scrollspy).
- Removed files: `data-center.html`, `data-center.js`, `main.js` (no longer needed in the new structure).

## Modules (1 – 12)
1. **Electrical Burden & Rate Calculator** — sliders compute % baseline increase, infra cost, illustrative monthly redistribution.
2. **Water Impact Module** — daily evaporative + indirect cooling + comparison bars (household / farm / municipal / data center).
3. **Sound Footprint & Propagation Map** — SVG with concentric rings, live dB-at-home estimate, biological-impact note.
4. **Post-Construction Timeline** — three colored phase cards (1–6 mo / 6–18 mo / Year 2+).
5. **"Turned Away" Case Studies Archive** — 5-row table with reason tags + framework column.
6. **NDA Transparency Tracker** — Right-to-Know citizen checklist (8 items) + .txt download.
7. **Emergency Generator Air Quality Monitor** — diesel-burn / NOx / PM2.5 estimator.
8. **Legal Defense Repository** — model ordinance .txt + RTK .txt downloads + drafting principles.
9. **Stranded Asset / Digital Blight Risk Model** — compute-doubling time + obsolescence % + risk-class label.
10. **Community Action & Civic Engagement Hub** — town-hall calendar reflecting 1st/3rd Thursday at 6 p.m. at the Municipal & Safety Building, 60-second Comment Drafter (.txt download), Acoustic & Noise Survey Logger (.csv download), johnsoncitytn.org link.
11. **Scriptural Reference & Stewardship Guide** — four expandable cards: Exodus 32, Job 38-42, 1 Thess 4:11, Galatians 6:2.
12. **Civic Election Tracker** — August Primary (Aug 6 2026; reg deadline Jul 7; early voting Jul 17 – Aug 1) and November General/Municipal (Nov 3 2026; reg deadline Oct 5; early voting Oct 14 – Oct 29) + GoVoteTN.gov lookup CTA.

## Test Status
Iteration 2 — **100% pass** (27/27 functional checks) — see `/app/test_reports/iteration_2.json`.

## Backlog / Next Action Items
- P1: Replace illustrative "Turned Away" jurisdictions with verified, source-cited real-world rejections.
- P1: Wire Module 10 Town Hall calendar to johnsoncitytn.org agendas (RSS/ICS) when available.
- P1: Add an `acoustic-survey` upload form that emails completed CSVs to a community organizer (mailto: link, no backend needed).
- P2: Print stylesheet for a one-page "leave-behind" handout for council members.
- P2: Spanish translation pass for Washington County readers.
- P3: Optional backend persistence of acoustic surveys for neighborhood-level aggregation.
