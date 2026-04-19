# Portfolio 2026 — Design Spec

**Date:** 2026-04-19
**Owner:** Ninad Kulkarni
**Purpose:** Modernize the 2020 graphic design portfolio for a 2026 internal pitch (graphic designer role at current startup, in addition to existing SWE role), while remaining a general design portfolio for future use over 2–3 years.

## 1. Overview

### Positioning

**Designer who codes.** Design leads every surface. The SWE identity is already established with the internal audience, so the portfolio does not work to prove engineering competence — it works to prove Ninad is a genuinely productive designer *right now*, not just in 2020. Engineering appears only as a subtle footer line and as context inside the App Redesign case study.

### Audience

- **Primary:** internal decision-makers at current startup evaluating Ninad for a graphic designer role alongside existing SWE responsibilities.
- **Secondary:** general portfolio use for the next 2–3 years. Ninad is highly unlikely to pursue a design-primary job, so the site is a maintained credibility asset, not a job-hunting tool.

### Guiding principles

1. **Low maintenance.** Adding a new piece in 2027 must be a single, trivial change — not a page rebuild. Tech stack must be something the owner won't resent in 2 years.
2. **Age well.** No time-stamped copy ("currently applying for X role"). No trend-chasing visual choices that date quickly.
3. **Curation ≠ completeness.** Homepage + case studies are ruthlessly curated. Archive is exhaustive. These are decoupled.
4. **Preserve history.** All media and assets from the 2020 site are retained. Old HTML pages are replaced by new surfaces, but images and animations remain.

## 2. Information Architecture

Six total surfaces:

| URL | File | Purpose |
|---|---|---|
| `/` | `index.html` | Hero + 2 featured case studies + ASU Hub preview + link to archive |
| `/case-study/own-startup.html` | `case-study/own-startup.html` | Founding brand + product narrative (end-to-end, solo ownership) |
| `/case-study/app-redesign.html` | `case-study/app-redesign.html` | Before/after UX case study, current role |
| `/asu-hub.html` | `asu-hub.html` | Curated gallery of ASU Alumni + Athletics work, print and digital |
| `/work.html` | `work.html` | Filterable archive of every other piece, including the 2020 catalog |
| `/about.html` | `about.html` | Bio, design-relevant CV content (Achievements, Skills), contact details inline |

URLs use `.html` extensions rather than clean folder URLs, because GitHub Pages does not rewrite `/about/` → `about.html` by default and the extra `folder/index.html` pattern is unnecessary overhead for this number of pages. If clean URLs are desired later, they can be added via per-folder `index.html` files without changing other code.

The 2020 site's 12 peer category pages are gone as navigation; their content lives in `/work` as filterable tags.

### Archive filter chips (on `/work`)

`All · Brand · Logo · Print · Editorial · Social · Photography · Motion · Product UI · Image Manipulation · T-Shirts · Restorations · Web & App`

Every 2020 category is preserved as a tag. Pieces can carry multiple tags.

### About page sections

- Bio (rewritten — no longer "CS major at ASU"; reflects current full-stack SWE + designer identity)
- Achievements & Honors (moved from 2020 category page, preserved as a quiet list — not a peer navigation surface)
- Skills (moved from 2020 category page, updated for 2026, trimmed aggressively)
- Contact (email, LinkedIn, Behance, Instagram — removed: Play Store link unless still active)

## 3. Content Strategy

### Case Study 1 — Own Startup (anchor piece)

Solo end-to-end design: brand, logo, product UI, marketing. Startup is on ice but publishable without restriction.

**Structure:**
- Hero: logo + one strong product shot
- Context (~100 words)
- Brand system: logo, typography, color, usage
- Product UI: key screens
- Marketing surfaces: landing page, social, print if any
- Reflection (~80 words)
- ~800 words total, image-heavy

**Why this is the anchor:** solo ownership of brand → product → marketing is the hardest layered skill to demonstrate in a portfolio. Most designers only ever touch one layer.

### Case Study 2 — App Redesign at current startup

Publishable before/after screens. UX-led, revamped entire app last year.

**Structure:**
- Hero: before/after side-by-side
- Problem framing
- 2–3 key UX decisions with rationale
- Final screens
- Measurable outcome if any
- ~500 words, fewer images, more process

### ASU Enterprise Marketing Hub — gallery (not case study)

Alumni and Athletics design, print and digital, single job. Good selection of publishable work.

**Treatment:** short intro (~80 words) + 15–25 pieces in a curated sequence (chronological or by campaign). No long narrative — the breadth is the point.

### `/work` archive content

Populated from a `data/work.json` manifest. All 2020 pieces that don't appear on case study or gallery pages live here with appropriate tags. New archive-worthy pieces added over time join here.

## 4. Visual System

### Palette

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F4F1EA` | Page background (warm off-white / cream) |
| `--text` | `#1A1A1A` | Primary text (near-black) |
| `--text-muted` | `#5A5A5A` | Secondary text, captions |
| `--rule` | `#E6E2D8` | Hairlines, dividers, placeholder surfaces |
| `--accent` | `#00796B` | Links, small rules, display accents. Used sparingly. |

Accent rationale: preserves the teal identity carried from the 2020 site (`#00E676`, `#00BFA5`) while shifting to an editorial-weight hue. Color continuity as a personal signature across portfolio eras.

### Typography

- **Display:** Instrument Serif (Google Fonts, free) — headlines, case study titles, section labels in display contexts. One weight.
- **Body / UI:** Inter (Google Fonts, free) — body copy, navigation, labels, tile captions, everything non-display.
- **Fallbacks:** system serif for Instrument Serif; system sans for Inter.
- Display faces set tight (letter-spacing ≈ -0.5px on large sizes). Body at line-height 1.55.

### Layout

- 12-column grid, generous margins
- Editorial-weight whitespace (case study pages have wide outer margins on desktop, ~8–10% each side)
- Responsive: grid collapses cleanly at ≤ 768px

### Motion

Minimal. Subtle hover states on tiles (slight lift or opacity shift). Page-load fade ≤ 200ms. No parallax, no scroll-linked animation, no flashy transitions.

### Imagery

- Cream-toned paper textures acceptable in editorial contexts; avoid on product UI shots
- Drop shadows OK on print work mockups; no drop shadows on flat graphic pieces
- Photography in original treatment (no added filters or framing)

## 5. Tech & Architecture

### Stack decisions

- **Static HTML + CSS + vanilla JS.** No build step, no package manager, no framework.
- **Hosting: GitHub Pages** (not Firebase). Firebase references removed from repo.
- **Paths: all relative** (e.g., `./favicon.jpg`, `./images/...`). Works on project pages (`username.github.io/repo/`), user sites (`username.github.io`), and custom domains without reconfiguration.
- **Bootstrap: removed.** Replaced with ~300 lines of custom CSS. The current site uses Bootstrap for grid and utility classes that are trivial in modern CSS.
- **No jQuery, no CDN frameworks.** Google Fonts CDN remains (fonts only).

### File architecture

```
/
├── index.html                     # homepage
├── about.html                     # about + CV sections + contact
├── case-study/
│   ├── own-startup.html
│   └── app-redesign.html
├── asu-hub.html                   # gallery
├── work.html                      # filterable archive
├── 404.html                       # updated for new visual system
├── css/
│   ├── tokens.css                 # colors, type scale, spacing (CSS custom properties)
│   ├── base.css                   # reset, typography, layout primitives
│   ├── components.css             # case-study header, work tile, filter chips, lightbox
│   └── responsive.css             # media query overrides (loaded last)
├── js/
│   ├── archive.js                 # reads work.json, renders tiles, handles filter chips
│   └── lightbox.js                # image overlay on tile click (shared by /work and /asu-hub)
├── data/
│   └── work.json                  # archive manifest
├── images/                        # preserved as-is from 2020 site + new additions
├── animations/                    # preserved as-is
└── favicon.jpg                    # preserved
```

**Deleted from 2020 site:**
- `achievements.html`, `skills.html`, `logos.html`, `image-manipulation.html`, `webapp.html`, `social-media.html`, `posters.html`, `tshirts.html`, `photography.html`, `animations.html`, `restorations.html`
- `js/modal.js` (functionality replaced by `lightbox.js`)
- `css/home.css`, `css/page.css`, `css/responsive_home.css` (replaced by new CSS layer)
- Firebase config references in documentation / commands

**Preserved:**
- Everything under `images/` and `animations/`
- `favicon.jpg`, `404.html` (visual refresh only)
- `.gitignore` (with `.superpowers/` already added)
- `CLAUDE.md` (updated to reflect new stack in a later task)

### Data-driven archive pattern

`data/work.json` structure:

```json
[
  {
    "id": "fbla-logo-2019",
    "title": "FBLA National Conference Logo",
    "tags": ["logo", "brand"],
    "year": 2019,
    "thumb": "./images/logos/fbla-thumb.jpg",
    "full": "./images/logos/fbla-full.jpg",
    "caption": "..."
  }
]
```

`js/archive.js` on load:
1. Fetch `data/work.json`
2. Render tiles into `#archive-grid`
3. Wire filter chips: each chip toggles visibility by tag via `data-tag` attribute matching
4. Count chips update to reflect filtered total

**Adding a new piece = one JSON entry + images.** No HTML edit, no layout work.

### Shared `<head>` handling

Accept the duplication. Each HTML page includes the same ~15-line `<head>` (meta tags, fonts, CSS links, favicon). Justification:
- Bootstrap is gone, so no SRI hashes to sync across pages
- 7 HTML files total — not the 12 the 2020 site had
- Avoids introducing a build step the owner would have to maintain

### Browser support

Modern evergreen browsers (last 2 versions of Chrome, Firefox, Safari, Edge). No IE, no legacy polyfills. This matches typical 2026 portfolio expectations and keeps CSS/JS modern.

### Preview command

```bash
python3 -m http.server 8000
```

From repo root, then visit `http://localhost:8000/`. Preserved from the 2020 workflow.

### Deploy

GitHub Pages from `main` branch root. No custom build. Specific configuration (Pages settings, optional custom domain) handled at implementation time.

## 6. Phased Rollout

### Phase 1 — Foundations

- Strip Bootstrap references from the repo
- Write `css/tokens.css`, `css/base.css` with the editorial system
- Load Instrument Serif + Inter from Google Fonts
- Rebuild `about.html` first as the validation page for the new visual system
- Rebuild `index.html` homepage in skeleton state (no real case study images yet, placeholder tiles)
- Convert all asset paths to relative

### Phase 2 — Case studies

- Build `/case-study/own-startup.html` with real copy and images
- Build `/case-study/app-redesign.html` with real copy and images
- Build shared case-study layout components in `css/components.css`

### Phase 3 — Galleries

- Build `/asu-hub.html` with curated sequence
- Build `/work.html` with filter chip infrastructure
- Write `js/archive.js` and populate `data/work.json` with all archive pieces (2020 pieces + anything new that isn't already a case study or ASU piece)
- Write `js/lightbox.js` for tile click behavior

### Phase 4 — Polish and cleanup

- Update `404.html` to new visual system
- Add meta tags, Open Graph tags, social preview image
- Lighthouse pass (performance, a11y, SEO)
- Cross-browser check (Chrome, Safari, Firefox)
- Delete obsolete HTML files and CSS from 2020 site
- Update `CLAUDE.md` to reflect new stack, commands, deploy target
- Configure GitHub Pages in repo settings

## 7. Out of Scope

- CMS, admin UI, any dynamic backend
- Contact form (mailto link is sufficient)
- Dark mode toggle (the editorial cream palette is the deliberate choice)
- Analytics (can be added later as an opt-in, e.g., GoatCounter or Plausible)
- Blog or writing section (can be added later if ever desired)
- Firebase Hosting setup (moved to GitHub Pages)
- Automated testing
- Build tooling of any kind (including bundlers, minifiers, PostCSS)

## 8. Open Questions Deferred to Implementation

- Exact list of 2020 pieces to include in `/work` and their tag mappings (requires asset review during Phase 3)
- Case study photography for physical print pieces (whether to photograph new or use existing shots)
- Custom domain decision (if/when the owner wants one — not required for launch)
- Whether to preserve `play.google.com/store/apps/developer` link on the About page (depends on whether the published apps are still live)
