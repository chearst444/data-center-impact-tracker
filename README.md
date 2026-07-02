# Data Center Impact Tracker & Community Blueprint

An interactive, data-driven civic toolkit for residents, municipal leaders, and
pastors evaluating the long-term physical and economic impact of industrial data
centers on local municipalities.

## What's inside

This is a **pure static site** — three editable files, no build step, no backend:

```
frontend/public/
├── index.html     # The whole single-page app (14 modules)
├── styles.css     # Civic-dashboard stylesheet
└── app.js         # Calculators, downloads, scrollspy
```

Everything else in this repo is leftover scaffolding (React/FastAPI/Mongo)
from the Emergent template and is **not used** by the deployed site.

---

## Deploy to Vercel — easiest path

The repo already includes a `vercel.json` at the root that points Vercel
straight at `frontend/public`, so the deploy is one click:

1. **Push to GitHub.** From inside Emergent, use **Save to GitHub** in the
   chat interface (connect your GitHub account first). Or download the
   project from the VS Code view and `git push` it yourself.
2. **Import the repo on Vercel.**
   - Go to <https://vercel.com/new>
   - Pick the GitHub repo you just pushed.
   - Framework Preset: **Other** (or "Static").
   - Root Directory: **leave as `.`** — `vercel.json` will route output to
     `frontend/public` automatically.
   - Build Command: **leave blank.**
   - Output Directory: **leave blank** (`vercel.json` sets it).
3. **Click Deploy.** Done. Your site will be live at a `*.vercel.app` URL
   in under a minute.

> **Don't want to use `vercel.json`?**  In Vercel's project settings, just
> set **Root Directory** to `frontend/public` and leave Build Command empty.
> That works too.

---

## Edit the content

Everything visible to readers lives in three files:

- `frontend/public/index.html` — all 12 modules, copy, sample meeting calendar,
  election dates, scripture cards.
- `frontend/public/styles.css` — colors, fonts, layout.
- `frontend/public/app.js` — calculator math, downloadable text/CSV templates.

Edit, commit, push. Vercel will redeploy automatically on every push to `main`.

---

## Local preview (optional)

You don't need anything fancy. From the repo root:

```bash
cd frontend/public
python3 -m http.server 8000
# open http://localhost:8000
```

Or use any static-file server (`npx serve .`, `caddy file-server`, etc.).

---

## Modules at a glance

1. Electrical Burden & Rate Calculator
2. Water Impact Module
3. Sound Footprint & Propagation Map
4. Employment Illusion Analysis
5. Post-Construction Moratorium Timeline
6. "Turned Away" Case Studies Archive
7. "Secret Deals" Transparency & NDA Tracker
8. Emergency Generator Air Quality Monitor
9. "Bullying Lawsuit" Legal Defense Repository
10. "Stranded Asset" / Digital Blight Risk Model
11. Community Action & Civic Engagement Hub
12. Siting Logic Matrix
13. Scriptural Reference & Stewardship Guide
14. Civic Election Tracker

Calculators are illustrative and use industry-typical figures. Verify with
independent local counsel, professional engineers, and your municipal staff
before any official action.
