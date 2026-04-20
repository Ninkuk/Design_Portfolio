# Portfolio 2026 — Open TODOs

Everything left after the initial redesign ships. Nothing is blocking the site from being live — these are content and polish passes. Each checkbox maps to one specific file edit.

Workflow for each item: edit → `git add <file> && git commit -m "..." && git push`. GitHub Pages rebuilds in ~30 seconds.

---

## `about.html`

- [ ] Replace the **bio** placeholder (line ~25, marked `<!-- TODO during execution: replace with final bio. -->`) with your real ~60-word bio
- [ ] Replace the **achievements** `<li>[additional entries]</li>` with real entries. The 2020 version is still in git history: `git show 71ea857:achievements.html` dumps the HTML if you want to salvage specific items
- [ ] **Trim the skills list** to 6–10 items that matter in 2026. Drop generic "knows Photoshop"-style entries.

## `case-study/drive-insight.html`

- [ ] **60-word hook** under the `<h1>` (replaces the TODO-marked placeholder summary)
- [ ] **Year range** in the `<dl class="cs-meta">` — replace `[year range]` with actual dates
- [ ] **Hero image** (16:9) — replace the full-bleed placeholder at the top of the body
- [ ] **Context** section (~100 words)
- [ ] **Brand System** section (~150 words) + 2 images (logo/mark, type+color) in the `.cs-grid-2` below
- [ ] **Product UI** section (~150 words) + 3 images (one hero 3:2, two in the grid)
- [ ] **Marketing** section (~100 words) + 1 image (3:2)
- [ ] **Reflection** (~80 words)

## `case-study/app-redesign.html` — Blue Voice

- [ ] **60-word hook**
- [ ] **Before/after hero** image (16:9) — the full-bleed placeholder
- [ ] **Problem** section (~120 words)
- [ ] **Key Decisions** — intro (~60 words) + replace "Decision 1/2/3" with the actual decision names and ~80-word rationale each
- [ ] **Final Screens** — 4 images in the 2×2 grid
- [ ] **Outcome** (~80 words) — measurable if you have it; qualitative otherwise
- [ ] **Reflection** (~80 words)

## `asu-hub.html`

- [ ] **80-word intro** to replace the placeholder summary
- [ ] **Year range** in the `<dl class="cs-meta">`
- [ ] Create `images/ASU/` folder (doesn't exist yet)
- [ ] Drop 15–25 curated pieces into `images/ASU/`
- [ ] Add a matching tile for each image inside the `<div class="gallery-grid" id="asu-gallery">`:
  ```html
  <div class="gallery-tile" data-full="./images/ASU/piece-01.jpg">
    <img src="./images/ASU/piece-01.jpg" alt="Piece title" loading="lazy">
  </div>
  ```
  The lightbox picks them up automatically — no JS changes needed.

## `data/work.json`

- [ ] Fix years on ~70 entries currently defaulted to `2019`. Search the file for `"year": 2019` and update the ones you recognize as other years. Not blocking — the archive summary correctly shows the range "2018–2019".

## New file — social preview image

- [ ] Create **`images/og-preview.jpg`** — 1200×630 PNG/JPG. OG meta on every page already points at this path and 404s until it exists. Suggested: cream background + serif "Ninad Kulkarni" + one strong work thumbnail.

---

## Deploy-side (not file edits)

- [ ] Once **`design.ninkuk.com`** DNS propagates and the Let's Encrypt cert lands, toggle **Enforce HTTPS** in repo Settings → Pages

## Optional polish

- [ ] **Analytics** — drop a one-line Plausible or GoatCounter script into each page's `<head>` (cookieless, privacy-friendly)
- [ ] **Firebase sweep** — `.gitignore` still lists `.firebaserc` / `firebase.json` from the 2020 era. Harmless, but remove the entries if you want a fully Firebase-free repo
- [ ] **Old portfolio media cleanup** — `images/Card_*.jpg` and root-level artifacts like `AdobeSkillz.jpg`, `WebDesignSkillz.jpg`, `bruh.jpg`, `SplashScreen*.*` are unused by the new site. They're preserved per your "don't delete media" rule; move to an `images/_archive/` subfolder if you want them out of the root view without deleting

---

**Status at time of writing:** live at https://ninkuk.github.io/Design_Portfolio/ (and soon `design.ninkuk.com`). 20 commits on `main`. All structural work done; content is you.
