# Architecture applicative

Flux et modules du site (client-only).

---

## Vue d’ensemble

```text
index.html
    └── src/main.js          # entrée : CSS, orchestration run()
            ├── locale-data.js   # merge JSON par locale
            ├── i18n.js            # locale, data-i18n, meta title/description
            ├── render.js          # DOM : about, resume, portfolio, sidebar…
            ├── ui-bindings.js     # sidebar toggle, navigation onglets
            └── project-images.js  # mapping id projet → asset Vite
```

Build Vite : bundling JS/CSS, images importées depuis `src/images/`, copie `public/` → `dist/`.

---

## Point d’entrée — [`main.js`](../src/main.js)

1. Charge locale (`getLocale()`).
2. `loadData(locale)` → objet fusionné.
3. `applyCopy` — textes `data-i18n`, `<title>`, meta description.
4. Appels `render*` (about, services, education, experience, skills, projects, contact, sidebar).
5. `renderLangSwitcher` — bascule EN/FR puis re-`run()`.
6. Une fois : `initSidebarToggle`, `initPageNav`.

Pas de router URL : navigation par **onglets** (`data-page` + classe `active`).

---

## Données — [`src/data/`](../src/data/)

| Fichier | Contenu |
|---------|---------|
| `en.json` / `fr.json` | Meta, hero, about, services, projects, contact, nav |
| `profile-detail.en.json` / `profile-detail.fr.json` | Expériences, formation, skills détaillés, skill map |

[`mergeProfile`](../src/js/locale-data.js) : le détail écrase/complète la base (education, experience, skills, skillCategories).

---

## Modules JS

| Module | Responsabilité |
|--------|----------------|
| [`i18n.js`](../src/js/i18n.js) | `LOCALE_KEY`, `getLocale`, `loadData`, `setLocaleStorage`, `applyCopy` |
| [`render.js`](../src/js/render.js) | Tout le HTML injecté (timeline, projets, skills, etc.) |
| [`dom-utils.js`](../src/js/dom-utils.js) | `escapeHtml`, `iconPath`, `skillWidth`, `socialIonName` |
| [`project-images.js`](../src/js/project-images.js) | `projectImageById` — URLs bundlées |
| [`ui-bindings.js`](../src/js/ui-bindings.js) | Clic sidebar « Show contacts », nav `data-target-page` |

---

## SEO côté client

- Meta et title : mis à jour depuis JSON ([`i18n.js`](../src/js/i18n.js)).
- JSON-LD `Person` : statique dans [`index.html`](../index.html) (non synchronisé au switch FR).

---

## CI / déploiement

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) : `npm ci` → `npm run build` → artifact `dist/` → GitHub Pages.

[`vite.config.js`](../vite.config.js) : `base: '/'` (site utilisateur).

---

[← Index](INDEX.md) · [Layout](layout-and-ui.md) · [Stack](tech-stack.md)
