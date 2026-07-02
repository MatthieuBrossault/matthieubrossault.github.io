# Déploiement

**URL :** [https://matthieubrossault.github.io](https://matthieubrossault.github.io)

Site statique Vite ; GitHub Pages sert le dossier **`dist/`**.

---

## Configuration actuelle

| Item | Valeur |
|------|--------|
| **Hébergeur** | [GitHub Pages](https://pages.github.com/) |
| **Type** | Site **utilisateur** (`matthieubrossault.github.io`) |
| **Publication** | [GitHub Actions](../.github/workflows/deploy.yml) — `npm ci`, `npm run build`, upload `dist/` |
| **Branche déclencheuse** | `master` |
| **Vite `base`** | `'/'` dans [`vite.config.js`](../vite.config.js) |
| **Coût** | €0 / mois |

---

## Workflow

1. Push sur **`master`**.
2. Action **Deploy static content to Pages**.
3. Propagation ~1–2 min.

Relance manuelle : onglet **Actions** → **Run workflow**.

---

## Local

```bash
npm run build
npm run preview   # http://localhost:4173
```

---

## Domaine personnalisé

Non configuré. Option : Settings → Pages → Custom domain + DNS chez le registrar.

---

[← Index](INDEX.md)
