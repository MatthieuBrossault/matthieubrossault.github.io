# Deploying this site on GitHub Pages

This project is a **Vite** static site: the production output lives in **`dist/`** after `npm run build`. GitHub Pages serves that folder as a static website. This guide walks through configuration, **`base` URL** (critical for Vite), **automation with GitHub Actions**, and how to fix **asset paths** if you publish under a repository URL.

---

## 1. What you need

| Requirement | Notes |
|-------------|--------|
| GitHub repository | Your code pushed to GitHub (e.g. `github.com/your-username/personal-portfolio-web`). |
| Node.js | LTS version; same as used locally for `npm ci` / `npm run build`. |
| Build output | Default `dist/` (see `vite.config.js` → `build.outDir`). |

---

## 2. Choose your public URL (this drives `base`)

GitHub Pages exposes two common URL shapes:

| Type | Example URL | `base` in `vite.config.js` |
|------|-------------|------------------------------|
| **User or organization site** | `https://your-username.github.io/` | `'/'` (default) |
| **Project site** | `https://your-username.github.io/repo-name/` | `'/'` + **`repo-name`** → e.g. `'/personal-portfolio-web/'` |

- **User site:** the repository is usually named **`your-username.github.io`**. The site is served at the **domain root**, so Vite’s `base` stays **`'/'`**. This is the simplest option for this project: **root-relative paths** like `/vcard/logo.svg` work as written.
- **Project site:** the site is served in a **subpath** (`/repo-name/`). Vite must know that subpath via **`base`**, otherwise scripts and hashed assets load from the wrong place.

Set `base` in `vite.config.js`:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  build: { outDir: 'dist' },
  // User/org site at https://username.github.io/
  base: '/',

  // OR project site at https://username.github.io/personal-portfolio-web/
  // base: '/personal-portfolio-web/',
});
```

Rebuild after any change to `base`.

**Official reference:** [Vite — Deploying a Static Site → GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages).

---

## 3. Static assets under `public/` and `/vcard/`

Files in **`public/`** are copied to the root of **`dist/`** as-is (e.g. `public/vcard/logo.svg` → `dist/vcard/logo.svg`).

Vite **does not** rewrite arbitrary **root-absolute** strings you type in HTML or JS (e.g. `src="/vcard/..."`) to include `base`. So:

- With **`base: '/'`** (user site or custom domain on Pages): paths like **`/vcard/...`** match how the site is served. **No change required.**
- With **`base: '/repo-name/'`** (project site): a hard-coded **`/vcard/...`** still points at the **host** root (`https://username.github.io/vcard/...`), which is **wrong**. You should either:
  - **Prefer:** use **`import.meta.env.BASE_URL`** in JavaScript when building paths, e.g. `` `${import.meta.env.BASE_URL}vcard/logo.svg` `` (Vite sets `BASE_URL` from `base`), and adjust **`index.html`** favicon/avatar to **root-relative-to-site** forms such as **`vcard/logo.ico`** (no leading `/`) so they resolve under the repo path, **or**
  - Switch to a **user** `username.github.io` repo so **`base: '/'`** and existing **`/vcard/`** paths keep working.

After changing paths, run `npm run build` and verify icons, avatar, and service icons in the built `dist/` output.

---

## 4. Recommended: deploy with GitHub Actions

GitHub Pages can take its content from a **workflow** that builds Vite and uploads **`dist/`**. That way you never commit built files to your default branch.

### 4.1 Enable Pages and Actions

1. In the repo: **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not “Deploy from a branch” for this flow).
3. **Settings → Actions → General → Workflow permissions:** ensure workflows are allowed to run and (if prompted) that the **GITHUB_TOKEN** can write to **Pages** (read/write for `contents` / `pages` as in the workflow below).

### 4.2 Add the workflow file

Create **`.github/workflows/deploy.yml`** in the repository (name can vary; this matches the [Vite documentation](https://vite.dev/guide/static-deploy.html#github-pages)):

```yaml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  push:
    branches: ['master'] # or ['main'] if that is your default branch
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Notes:**

- This repo’s workflow uses **`master`**; use **`main`** in `branches` if that is your default branch.
- Pin **`actions/*` versions** to whatever your org allows; newer major versions may exist on GitHub Marketplace.
- The workflow must upload **`./dist`** after `npm run build`.

### 4.3 First run

1. Commit and push **`.github/workflows/deploy.yml`** to **`main`**.
2. Open **Actions** and confirm the workflow succeeds.
3. **Settings → Pages** should show the published URL (propagation can take a minute or two).

---

## 5. Optional: `.nojekyll`

GitHub Pages can process sites with **Jekyll**, which ignores paths starting with `_`. This project does not rely on such folders, but if you add tooling that emits them, place an **empty** **`public/.nojekyll`** file so it is copied into **`dist/`** and Jekyll is disabled for the published tree.

---

## 6. Verify the production build locally

Before or after configuring CI:

```bash
npm run build
npm run preview
```

Open the URL shown (default **http://localhost:4173**). For a **project** `base`, preview with the same base:

```bash
npx vite preview --base /your-repo-name/
```

Confirm scripts, CSS, and `/vcard` assets load.

---

## 7. Custom domain (optional)

1. Add your domain in **Settings → Pages → Custom domain** and follow GitHub’s DNS instructions.
2. With a **custom domain** on a user/org Pages site, **`base: '/'`** remains appropriate once DNS and HTTPS are configured.

---

## 8. Checklist summary

| Step | Action |
|------|--------|
| 1 | Decide **user** (`username.github.io`) vs **project** URL. |
| 2 | Set **`base`** in **`vite.config.js`** to **`'/'`** or **`'/repo-name/'`**. |
| 3 | If **`base`** is a subpath, fix **`/vcard/`** references (see §3). |
| 4 | Add **`.github/workflows/deploy.yml`**, enable **Pages → GitHub Actions**. |
| 5 | Push to **`main`**, check **Actions**, then open the **Pages** URL. |

---

## 9. Related docs in this repo

- [Deployment & costs](deployment-costs.md) — high-level hosting and cost table.
- [Website architecture](02-website-architecture.md) — how the site is structured.
