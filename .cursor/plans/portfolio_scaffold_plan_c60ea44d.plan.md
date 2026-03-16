---
name: Portfolio scaffold plan
overview: Scaffold a single-page portfolio with Vite (vanilla JS + CSS), EN/FR i18n from JSON with browser-default and switcher, semantic sections, projects from data, and optional JSON-LD — aligned with specs (minimal effort, static, GitHub Pages–ready).
todos: []
isProject: false
---

# Portfolio solution scaffold plan

## Tech stack choice

**Vite + vanilla HTML/CSS/JS** (no framework).

- **Why:** Matches “minimal effort”: no React/Vue, fast build, one `index.html`, static export. Fits free hosting (GitHub Pages). You already use Vite-era tooling (React/TS in repos); same dev experience.
- **Alternatives considered:** 11ty (better if content grows to many markdown pages); Astro (more structure than needed for a single page).

**Deliverable:** Single-page site (Option A from [02-website-architecture](docs/02-website-architecture.md)): hero → about → skills → experience → projects (cards) → contact. One build → `dist/` with `index.html` + assets, deployable as-is.

---

## Repo structure (after scaffold)

```
personal-portfolio-web/
  docs/                 # existing
  public/               # static assets (favicon, etc.)
  src/
    index.html          # single entry; semantic sections, no app mount
    main.js             # i18n init, locale detection, inject copy, project cards, lang switcher
    data/
      en.json           # copy + projects (EN)
      fr.json           # copy + projects (FR)
    styles/
      main.css          # layout, typography (minimal, dark-leaning per 03-style)
  package.json
  vite.config.js        # build only; base: '/' or GitHub Pages path if needed
  .gitignore            # existing
```

No routing; no `/en`/`/fr` by default — one HTML file, locale chosen at runtime from `navigator.language` + `localStorage` override.

---

## Implementation steps

### 1. Init Vite and base files

- `npm create vite@latest . -- --template vanilla` (or manual: `package.json`, `vite.config.js`, `src/index.html`, `src/main.js`).
- Ensure build output is a static export (`build.outDir: 'dist'`). Set `base` for GitHub Pages if repo is `user.github.io/repo-name` (e.g. `base: '/repo-name/'`).
- Keep [.gitignore](.gitignore) (add `dist/` if missing).

### 2. Data shape and content

- `**src/data/en.json**` and `**src/data/fr.json**`: same structure.
  - Root keys: `meta` (title, description), `hero`, `about`, `skills`, `experience`, `contact`, `projects`.
  - `projects`: array of `{ id, title, description, context?, stack[], highlights?, repoUrl?, demoUrl?, image? }`.
- Seed from [04-profile-data](docs/04-profile-data.md): name, role, location, LinkedIn/GitHub, and the 5 repos as initial project entries (EN/FR strings).

### 3. Single HTML shell (semantic, SEO, JSON-LD)

- [src/index.html](src/index.html): one file with `<section id="hero">`, `#about`, `#skills`, `#experience`, `#projects`, `#contact`.
- Placeholder content or empty; real text injected by JS from `data/{locale}.json`.
- `<title>`, `<meta name="description">` updated by JS after locale load (or static fallback).
- In `<head>` or end of body: one `<script type="application/ld+json">` block for Person (name, jobTitle, address (Nantes), sameAs [LinkedIn, GitHub]). Optional: inject from data so one source of truth.

### 4. i18n (minimal)

- **Detection:** `localStorage.getItem('locale')` else `navigator.language.startsWith('fr') ? 'fr' : 'en'`.
- **Load:** fetch `src/data/${locale}.json` (or import at build time for no runtime fetch).
- **Apply:** one function that replaces text in place (e.g. `data-i18n="hero.title"`) or fills known placeholders; set `document.documentElement.lang`.
- **Switcher:** control in header/footer toggles `en`/`fr`, saves to `localStorage`, reloads copy and re-renders (e.g. projects list).

### 5. Sections and projects UI

- **Hero / About / Skills / Experience / Contact:** fill from loaded JSON into the semantic sections (headings, paragraphs, lists). Skills and experience as lists.
- **Projects:** render from `data.projects` into cards (title, description, stack, links). Option A: no expand; or simple “expand” for context/highlights (accordion or inline toggle). No separate project pages.

### 6. Styles (minimal, on-spec)

- [03-style-and-discoverability](docs/03-style-and-discoverability.md): minimal, readable, fixed-width content, mobile-first. One CSS file: typography (e.g. monospace for labels, sans for body), layout, section spacing, project grid/list. Prefer CSS variables for colors (dark theme). No heavy animation.

### 7. Docs and deploy readiness

- [deployment-costs](docs/deployment-costs.md): add row for GitHub Pages (free), note `base` in Vite if repo is project site.
- [progress](docs/progress.md): move “Choose stack” and “Repo structure + first page” to Done; add “i18n”, “Sections”, “Projects block”, “Contact + footer”, “SEO + JSON-LD” to Backlog/In progress as needed.

---

## Out of scope in scaffold

- Blog, contact form backend, CMS.
- Option B (multi-page, `/projects/:slug`).
- Build-time locale routes (e.g. `/en/`, `/fr/`) — can add later if you want shareable per-locale URLs.

---

## Acceptance (scaffold done when)

- `npm install` and `npm run build` produce a static `dist/` with one `index.html`.
- Visiting `index.html` shows all sections; copy comes from EN or FR by browser/lang preference or switcher.
- Projects section shows at least placeholder or real projects from JSON.
- One JSON-LD Person block present in HTML.
- Layout is responsive; no console errors.
- [docs/progress.md](docs/progress.md) and [docs/deployment-costs.md](docs/deployment-costs.md) updated as above.

