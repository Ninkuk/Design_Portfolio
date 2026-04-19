# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static HTML/CSS/JS design portfolio for Ninad Kulkarni. No build system, no package manager, no tests. Pages are plain `.html` files at the repo root, linked via relative hrefs and inline `onclick="location.href='...'"` handlers on cards.

## Commands

There is no build, lint, or test pipeline. To work on the site:

- **Preview locally**: open `index.html` in a browser, or run a throwaway static server from the repo root (e.g. `python3 -m http.server 8000`). Do not use file:// for testing — the absolute paths (`/images/favicon.png`) require an HTTP root.
- **Deploy**: `firebase deploy` (hosting). Project alias is `ninad-kulkarni-portfolio` (see `.firebaserc`). `firebase.json` is gitignored — expect to recreate or pull it locally before deploying. The `.gitignore` comment says this is intentional so each collaborator can target their own Firebase project.

## Architecture

**Page model.** `index.html` is the hub. Each category (about, achievements, skills, logos, image-manipulation, webapp, social-media, posters, tshirts, photography, animations, restorations) is a sibling HTML page at the root. There is no router and no shared layout — every page re-includes the same CDN scripts and stylesheets. If you change a global header/footer pattern, you must edit every page.

**Styling layers** (`css/`):
- `home.css` — base styles, masthead, card grid; used by every page.
- `page.css` — subpage-specific styles (title bars, close button, modals); included by subpages but not by `index.html`.
- `responsive_home.css` — media-query overrides; included last.

The cascade order (`home.css` → `page.css` → `responsive_home.css`) is assumed by the existing selectors; keep it when adding pages.

**CDN dependencies (pinned, loaded per-page).** Bootstrap Material Design 4.1.1, jQuery 3.2.1 slim, Popper 1.12.6. Each page ends with `$('body').bootstrapMaterialDesign()` to initialize components — required for modals, ripples, etc.

**No backend.** There is no Firebase JS SDK on any page and no runtime data layer. If you need to wire up Firestore/Storage/Auth later, add initialization alongside the config — do not re-introduce the old `<script src="...firebasejs/7.4.0/...">` tags without also calling `firebase.initializeApp(...)`.

**JavaScript.** The only project JS is `js/modal.js`, used by `achievements.html`. It exposes `setModalContent(cardIndex)` which reads from two parallel hardcoded arrays (`modalTitles`, `modalTexts`) indexed by the card's position on the page. When adding/removing/reordering achievement cards, update both arrays in lockstep — the indexes in the `onclick="setModalContent(N)"` attributes must stay aligned.

**Image conventions.** Card thumbnails live in `images/Card_*.jpg`; category assets are nested (e.g. `images/Manip/Naruto/*.jpg`, `images/logos/`, `images/Photography/`). Animations/videos live in `animations/` (mp4 + poster JPGs). The favicon is referenced as `/images/favicon.png` with a leading slash, so local preview must be served from the repo root.

## Repo state note

The `.git` directory has been removed — this is an uninitialized working tree. Before making the first commit, run `git init` and decide on a remote. The old history (three commits ending in "Removed Cached Config Files") is gone.

The site is mid-modernization: the user plans to refresh the visual design and copy. Dead code (Firebase SDK script tags, orphaned `loadCards()` onload) has been removed from all pages as the first cleanup step.
