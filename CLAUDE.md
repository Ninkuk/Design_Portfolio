# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static HTML/CSS/JS design portfolio for Ninad Kulkarni. No build system, no package manager, no tests, no bundler. Pages are plain `.html` files linked via relative (`./…`) hrefs.

Editorial visual system: cream background, near-black text, modernized teal `#00796B` accent, Instrument Serif for display + Inter for UI. Content strategy: **2 case studies** (Drive Insight, Blue Voice), **1 curated gallery** (ASU Hub), **1 filterable archive** (`work.html`) covering every 2020 piece via `data/work.json`. Git-initialized on branch `main`.

## Commands

There is no build, lint, or test pipeline.

- **Preview locally**: `python3 -m http.server 8000` from the repo root, then browse `http://localhost:8000/`. All asset paths are relative (`./…`), so the site also works on GitHub project-page URLs, user-page URLs, and custom domains without rewrites. `file://` will resolve the HTML but not `fetch('./data/work.json')` — use the HTTP server when testing the archive.
- **Deploy**: GitHub Pages. Enable via repo settings → Pages → Source: **Deploy from branch**, branch `main`, folder `/` (root). No build step, no workflow file needed. `404.html` is the Pages fallback. (No `firebase deploy` — the 2020 Firebase Hosting setup is gone.)

## Architecture

**Page model.** 7 HTML files, no router, no shared layout partial — every page re-inlines the same `<head>` (fonts, favicon, CSS links) and footer. If you change a global pattern, touch every page.

- `index.html` — hero + 2 case study tiles + ASU Hub preview + archive link + footer
- `about.html` — bio, achievements, skills (CV content that used to be their own 2020 pages), contact
- `case-study/drive-insight.html` — founding-designer case study (brand + product UI + marketing)
- `case-study/app-redesign.html` — Blue Voice UX redesign case study
- `asu-hub.html` — curated gallery for ASU Alumni + Athletics work
- `work.html` — filterable archive of everything else, data-driven from `data/work.json`
- `404.html` — GitHub Pages fallback

**CSS layers** (`css/`, cascade-order sensitive):

- `tokens.css` — CSS custom properties (colors, type scale, spacing, layout)
- `base.css` — reset, typography, layout primitives (`.container`, `.label`, `.muted`, `.rule`, etc.)
- `components.css` — case study tiles, case study layout, gallery grid, filter chips, lightbox
- `responsive.css` — media-query overrides; MUST load last

Every page links these four in order — **except `about.html`**, which omits `components.css` (it was built before components existed and doesn't use any component-level styles). If you add a page, preserve the order.

**JavaScript** (`js/`):

- `archive.js` — loaded on `work.html`. Fetches `data/work.json`, renders filter chips + gallery tiles, handles chip clicks → filter + re-render. DOM methods only (no `innerHTML`) for XSS safety. `TAG_LABELS` is the canonical tag vocabulary.
- `lightbox.js` — loaded on `work.html` and `asu-hub.html`. Builds a reusable full-screen image overlay once, then uses document-level event delegation on `.gallery-tile` clicks — so it works for both dynamically rendered archive tiles and static ASU Hub tiles with no rebinding. Close via ✕ button, backdrop click, or Escape.

**Data** (`data/`):

- `work.json` — array of archive entries with schema `{ id, title, tags, year, thumb, full, caption }`. **Adding a new archive piece = one JSON entry + one image.** No HTML edits.
- Tag vocabulary (12 allowed): `brand`, `logo`, `print`, `editorial`, `social`, `photography`, `motion`, `product-ui`, `image-manipulation`, `tshirt`, `restoration`, `web-app`. Chip UI and counts are generated from this list inside `archive.js`.

**No framework, no CDN JS.** Bootstrap, jQuery, Popper — all gone. Google Fonts is the only external dependency. No SRI hashes to maintain, no `$(...).bootstrapMaterialDesign()` init call, no package manager. The 2020 "Bootstrap 5 security migration" is history; the current repo has zero CDN JS.

**No backend.** No Firebase JS SDK on any page, no runtime data layer beyond `fetch('./data/work.json')`. If Firestore/Storage/Auth is ever added, call `initializeApp(...)` properly — don't re-introduce bare `<script src="…firebasejs/…">` tags without initialization (that was the dead code removed during the 2020 security migration).

**Image conventions.** Archive thumbs and full-size images live under `images/<category>/<file>.{jpg,png,gif}`; `thumb` and `full` paths in `work.json` may point to the same file. Animations/videos live in `animations/` as `.mp4` + poster `.jpg`. Favicon is `./favicon.jpg` (relative). **Never delete media files** — user policy. Renames are fine via `git mv`.

**Ignored artifacts.** `.playwright-mcp/` (Playwright MCP scratch), `.superpowers/` (brainstorm scratch), `.worktrees/` (isolated feature workspaces), `.firebase/` (legacy Firebase CLI cache — safe to delete later), plus `.firebaserc` / `firebase.json` (leftover from Firebase era; can be un-ignored if Firebase Hosting is ever reintroduced).
