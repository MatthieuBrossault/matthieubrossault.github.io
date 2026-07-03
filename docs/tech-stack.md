# Stack technique

État au **T** du dépôt `personal-portfolio-web`.

---

## Runtime & build

| Outil | Version / rôle |
|-------|----------------|
| [Vite](https://vite.dev/) | ^5.4 — dev server, bundling production → `dist/` |
| Node.js | LTS (CI et local) |
| npm | `package-lock.json` — `npm ci` en CI |

Scripts : `npm run dev` | `build` | `preview` ([README.md](../README.md)).

---

## Front

| Couche | Choix |
|--------|--------|
| Langage | **JavaScript** (ES modules), pas de TypeScript |
| HTML | [`index.html`](../index.html) — shell statique |
| CSS | [`src/styles/vcard.css`](../src/styles/vcard.css) (thème MIT codewithsadee) + [`src/styles/main.css`](../src/styles/main.css) (surcharges) |
| Police | [Poppins](https://fonts.google.com/) (Google Fonts) |
| Icônes | [Ion Icons](https://ionicons.com/) 5.5.2 (CDN) |

---

## Contenu & i18n

| Élément | Détail |
|---------|--------|
| Format | JSON : [`src/translations/`](../src/translations/) (UI) + [`src/data/profile.*.json`](../src/data/) (profil) |
| Locales | **EN** + **FR** |
| Détection | `navigator.language` + `localStorage` (`locale`) |
| Fusion site | [`locale-data.js`](../src/js/locale-data.js) — `mergeSiteData(translations, profile)` |

---

## Assets

| Chemin | Rôle |
|--------|------|
| [`public/vcard/`](../public/vcard/) | Favicon, avatar, icônes services (copiés tels quels dans `dist/`) |
| [`src/images/`](../src/images/) | Images portfolio (import Vite → hash en prod, WebP) |

---

## Hébergement

GitHub Pages (site utilisateur), build GitHub Actions — voir [deployment.md](deployment.md).

---

## Contraintes projet

- Site **100 % statique** (pas de backend)
- Un mainteneur — effort minimal
- Règle Cursor : JS/CSS projet ≤ ~300 lignes par fichier ([`.cursor/rules/js-css-line-limits.mdc`](../.cursor/rules/js-css-line-limits.mdc))

---

## Générateurs PDF (hors site)

Scripts Node dans [`scripts/generators/`](../scripts/generators/) — **PDFKit** + polices DejaVu (UTF-8 FR/EN).

| Commande | Sortie |
|----------|--------|
| `npm run generate:cv` | `generated/cv/` |
| `npm run generate:dossier` | `generated/dossier/` |
| `npm run generate:cover-letter` | `generated/cover-letter/` |

Config cible poste : [`scripts/generators/generator-config.json`](../scripts/generators/generator-config.json). Données profil : `src/data/profile.{fr,en}.json`.

---

[← Index](INDEX.md)
