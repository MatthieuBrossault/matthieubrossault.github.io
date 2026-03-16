# Website architecture (proposal)

The portfolio site has two roles: (1) present the developer as the main product, (2) present other projects as proof of tech skills and business impact.

---

## Site-level structure

| Section | Purpose |
|--------|--------|
| **Hero / intro** | First impression: who, role, one-line value. Optional CTA (e.g. contact, CV). |
| **About** | Short bio, location, what you do. Reinforce positioning (web engineer / architect). |
| **Skills & tech** | Technologies, frameworks, practices. Can be grouped (frontend, backend, DevOps, etc.). |
| **Experience** | Timeline or list of roles, companies, main outcomes. CV-style but scannable. |
| **Projects** | Showcase of selected projects (see below). Each project = proof of skills + business context. |
| **Contact** | How to reach (LinkedIn, GitHub, email, form). Optional: availability / open to work. |

*Skip for minimal effort:* blog, testimonials, contact forms with backend — add only if worth the extra maintenance.

---

## Projects section

Each **project** is a sub-showcase: it demonstrates both technical range and business sense.

Suggested content per project:

- **Title & one-line description** — what it is and for whom.
- **Business / context** — problem, client or use case, impact (short).
- **Tech stack** — technologies used (aligned with Skills).
- **Highlights** — architecture decisions, challenges solved, outcomes (metrics if possible).
- **Links** — live demo, repo (GitHub), case study or write-up if any.
- **Media** — screenshot, short video, or diagram.

Structure (minimal effort):

- **Option A (simplest):** single Projects page with expandable cards or accordions — no routing, no extra pages. Edit one file to add a project.
- **Option B:** projects index + one page per project (`/projects/:slug`) — better SEO and shareable links; more pages to maintain.

Recommendation: start with **Option A**; move to Option B only if you need per-project URLs or more content per project.

---

## Information architecture (IA) sketch

**Minimal (Option A):** single-page site — one scroll: hero → about → skills/experience → projects (cards) → contact (links only). No routing.

**With project pages (Option B):**
```
/                    → Home (hero + short about + featured projects + CTA)
/about               → About (bio, skills, experience)
/projects            → Projects index
/projects/:slug      → Project detail
/contact             → Contact (links only — e.g. mailto:, LinkedIn, GitHub)
```

Footer on every page: LinkedIn, GitHub, contact. No contact form unless you add a serverless function (extra effort).

---

## Languages (i18n)

- **Supported:** English, French. Same structure and sections in both; only copy and project descriptions differ.
- **Default:** Use browser language (`navigator.language` / `Accept-Language`) or geo when available; fallback e.g. French for France, English otherwise (or configurable default).
- **Override:** Optional language switcher (e.g. in header/footer) so users can force EN or FR. Persist in `localStorage` to avoid reset on reload.
- **Implementation (minimal):** Static: build two versions (e.g. `index-en.html` / `index-fr.html` or `/en/`, `/fr/`) and redirect or serve by locale. Or single page with JS that loads the right copy (JSON/JS dict) and toggles content. No server required for static deploy.

---

## Technical architecture (site only) — minimal effort/cost

- **Content** — static only: markdown or JSON in the repo for projects and copy. No CMS (no cost, no backend, you edit files).
- **Stack** — one simple stack: static HTML/CSS/JS, or a lightweight SSG (e.g. 11ty, Astro, Vite + static export). Avoid backend, DB, auth.
- **Hosting** — free static hosting: **GitHub Pages** (free, deploys from repo), or Netlify/Vercel free tier. Custom domain optional (low cost).
- **Deploy** — push to main (or trigger on push). No CI complexity unless you want it; many hosts build from repo automatically.

The site itself can double as a first “project” (stack, performance, accessibility) to show craft — without adding moving parts.

---

## Summary

| Layer | Role |
|-------|------|
| **Site** | Showcase the developer: who, what, how to contact. |
| **Projects** | Showcase range: tech skills + business cases via concrete examples. |
| **IA** | Home → About → Projects (index + detail) → Contact. |
