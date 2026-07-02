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
| Format | JSON dans [`src/data/`](../src/data/) |
| Locales | **EN** + **FR** |
| Détection | `navigator.language` + `localStorage` (`locale`) |
| Fusion CV | `en.json`/`fr.json` + `profile-detail.*.json` via [`locale-data.js`](../src/js/locale-data.js) |

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

[← Index](INDEX.md)
