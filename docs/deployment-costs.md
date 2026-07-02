# Deployment

**Live site:** [https://matthieubrossault.github.io](https://matthieubrossault.github.io)

Static portfolio built with Vite; GitHub Pages serves the **`dist/`** output.

---

## Current setup

| Item | Value |
|------|--------|
| **Host** | [GitHub Pages](https://pages.github.com/) |
| **URL** | `https://matthieubrossault.github.io` (user site) |
| **Publish** | [GitHub Actions](../.github/workflows/deploy.yml) — `npm ci`, `npm run build`, upload `dist/` |
| **Branch** | `master` (push triggers deploy) |
| **Vite `base`** | `'/'` in [`vite.config.js`](../vite.config.js) |

---

## Costs

| | Monthly | Yearly |
|---|--------|--------|
| GitHub Pages | €0 | €0 |
| **Total** | €0 | €0 |

Optional custom domain later (registrar ~€12–24/year).

---

## Redeploy

1. Push commits to **`master`**.
2. Check **Actions** → workflow **Deploy static content to Pages**.
3. Site updates within a few minutes.

Manual run: **Actions** → workflow → **Run workflow**.

---

## Local preview

```bash
npm run build
npm run preview
```

Default preview URL: http://localhost:4173
