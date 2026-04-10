# Deployment setup & costs

Where the site runs and what it costs (monthly / yearly). Update when something changes.

---

## Chosen setup (this project)

| Decision | Choice |
|----------|--------|
| **Host** | [GitHub Pages](https://pages.github.com/) |
| **URL type** | **User site** — `https://<username>.github.io/` (repo named `<username>.github.io`) |
| **Build & publish** | **GitHub Actions** — workflow [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) runs `npm ci`, `npm run build`, uploads **`dist/`** |
| **Branch** | **`master`** (pushes trigger deploy) |
| **Vite `base`** | **`'/'`** — matches site root; `/vcard/` assets work as-is |

Step-by-step instructions and alternatives (e.g. project URL, asset caveats): [github-pages-deployment.md](github-pages-deployment.md).

---

## Hosting

| Service | Role | Setup notes | Monthly | Yearly |
|---------|------|-------------|---------|--------|
| GitHub Pages | Static site | **This repo:** Actions → `dist/`. Not “Deploy from a branch” with `/docs`. If you ever use a **project** URL (`user.github.io/repo-name/`), set `base: '/repo-name/'` in `vite.config.js` before build. | €0 | €0 |

---

## Domain (optional)

| Item | Registrar / DNS | Setup notes | Monthly | Yearly |
|------|----------------|-------------|---------|--------|
| *e.g. yourname.com* | | | ~€1–2 | ~€12–24 |

---

## Other (email, forms, etc.)

| Service | Purpose | Monthly | Yearly |
|---------|---------|---------|--------|
| *—* | | | |

---

## Total

| | Monthly | Yearly |
|---|--------|--------|
| **Total** | €0 | €0 |

**Hosting:** GitHub Pages (€0). **Domain:** optional paid registrar if you add a custom domain later.
