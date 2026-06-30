# PRD — Greater Johnson City Community Stewardship Hub

## Original Problem Statement
Build the Johnson City Community Stewardship Hub as simple, editable static files:
- **Main page** "The Johnson City Observer" / "Community Stewardship Dashboard" with three sections (Heritage & Architecture, Culture & Major Happenings, Searchable City Commission Meeting Tracker).
- **Subsection** "Data Center Impact Tracker" with eleven explicitly enumerated modules (Electric, Water, Sound, Timeline, Turned Away, NDA/Transparency, Air, Lawsuits, Stranded Asset, Community Action, Scriptural Reference) — each with its full paragraph content written out.

## User Choices (verbatim)
- Tech: Pure static HTML/CSS/JS (no backend).
- Meeting Tracker data: Seeded with realistic sample council findings.
- Module depth: Functional interactive demos with sliders/inputs and computed estimates.
- Visual tone: Newspaper / editorial (Johnson City Observer masthead feel).
- Submissions: Downloadable .txt / .csv (no server persistence).

## Architecture
Pure static delivery via the existing CRA dev server (no FastAPI / Mongo used).
- `/app/frontend/public/index.html` — main page markup.
- `/app/frontend/public/data-center.html` — subsection.
- `/app/frontend/public/styles.css` — newspaper editorial stylesheet (Playfair Display + Spectral, cream paper, drop-caps, filter buttons, sliders, SVG propagation, calendar grid, scripture accordions).
- `/app/frontend/public/main.js` — Meeting Tracker live filter + search.
- `/app/frontend/public/data-center.js` — Modules 1/2/3/7/9 calculators; downloads for RTK, model ordinance, comment, survey CSV.
- `/app/frontend/src/App.js` — returns `null` so React does not overwrite the static markup.

## What's Been Implemented (2026-06-30)
- Masthead, dateline (auto-updating), top nav, footer.
- Section I — Heritage: full Train Station + Sevier Building articles with drop-caps.
- Section II — Culture: Local Music, ETSU Hub, General News (no crime/gossip).
- Section III — Meeting Tracker: 15 seeded findings across Zoning / Utilities / Budgets, with live text search and instant category filter buttons.
- Data Center Impact Tracker page with sticky module nav.
- Module 1 — Electrical Rate Calculator (3 sliders, $/month redistribution readout).
- Module 2 — Water Footprint (slider + season select, indirect-water math, animated comparison bars).
- Module 3 — Sound Propagation simulator (SVG ring map + house marker translates by distance, dB + health-impact readout).
- Module 4 — Three-phase timeline.
- Module 5 — Turned-away case studies (four illustrative compositions) + framework list.
- Module 6 — NDA tracker + "Right to Know" interactive checklist + downloadable .txt.
- Module 7 — Diesel-generator weekly emissions estimator (NOx, PM2.5, fuel).
- Module 8 — Lawsuit defense repository + downloadable model ordinance .txt.
- Module 9 — Stranded-asset / digital-blight risk model (combined chip+AI efficiency curves, blight risk class).
- Module 10 — Town Hall calendar, 60-second Comment Drafter (.txt download), Acoustic & Noise Survey Logger (.csv download).
- Module 11 — Four expandable scriptural reference cards (Exodus 32, Job 38-42, 1 Thess 4:11, Galatians 6:2) with full devotional text.

## Test Status
Iteration 1 — 100% pass on all 19 scenarios (see /app/test_reports/iteration_1.json).

## Backlog / Next Action Items
- P1: Replace illustrative "Turned Away" composite case studies with verified, source-cited real-world rejections once sources are confirmed by editor.
- P1: Plug in real planning-commission meeting feed (ICS / RSS) into Module 10 Town Hall Tracker.
- P2: Add print-friendly stylesheet so each section prints as a single broadsheet page.
- P2: Add a simple email-share button that opens `mailto:` pre-filled with the generated 60-second comment.
- P2: i18n pass for the Spanish-speaking neighborhoods in Washington County.
- P3: Server-side persistence of acoustic survey logs (optional; only if community organizer requests aggregation).
