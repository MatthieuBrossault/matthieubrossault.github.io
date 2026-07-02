# Layout & UI

Structure visuelle et comportement (thème vCard).

---

## Structure page — [`index.html`](../index.html)

```text
<main>
  <aside class="sidebar">          # identité, contacts, réseaux
  <div class="main-content">
    <nav class="navbar">           # onglets + switcher langue
    <article data-page="about">    # actif par défaut
    <article data-page="resume">
    <article data-page="portfolio">
    <article data-page="contact">
```

Un seul `<article>` visible à la fois : `article { display: none }` / `article.active { display: block }` ([`vcard.css`](../src/styles/vcard.css)).

---

## Onglets (navigation)

- Boutons `data-nav-link` + `data-target-page` → bascule `.active` sur l’article correspondant.
- Implémentation : [`ui-bindings.js`](../src/js/ui-bindings.js).
- Scroll remis en haut à chaque changement d’onglet.

---

## Sidebar

| Zone | Comportement |
|------|----------------|
| **Repliée (mobile)** | `max-height` limitée ; bouton `data-sidebar-btn` étend `.sidebar.active` |
| **Identité** | Avatar, H1 nom, sous-titre, email, localisation |
| **Contacts** | Email (JS), adresse, liens sociaux (LinkedIn, GitHub) |

Surcharges : [`main.css`](../src/styles/main.css) — wrap sous-titre/email, tailles texte mobile.

---

## Sections main-content

| Onglet | Rendu |
|--------|--------|
| **About** | `#about-text` (bio), `#service-list` (4 cartes services) |
| **Resume** | Timeline formation/expérience, barres skills, skill map |
| **Portfolio** | Grille `#project-list` (images WebP, lien repo) |
| **Contact** | Intro + liens |

Textes statiques shell : attributs `data-i18n` ; blocs dynamiques : [`render.js`](../src/js/render.js).

---

## Thème & styles

| Fichier | Rôle |
|---------|------|
| [`vcard.css`](../src/styles/vcard.css) | Thème complet (~1900 lignes, vendor) |
| [`main.css`](../src/styles/main.css) | Overrides projet (mobile sidebar/navbar, resume, contact) |

Attribution : [vCard – Personal portfolio](https://github.com/codewithsadee/vcard-personal-portfolio) (MIT).

---

## Responsive (points clés)

| Breakpoint | Comportement |
|------------|----------------|
| **&lt; 580px** | Navbar **fixe en bas** ; sidebar compacte ; overrides typo [`main.css`](../src/styles/main.css) |
| **≥ 580px** | Cartes centrées (~520px), typo augmentée |
| **≥ 1024px** | Sidebar sticky à gauche, navbar en haut à droite du main |
| **≥ 1250px** | Layout deux colonnes `main` flex |

---

## i18n UI

- Switcher `#lang-switcher` (bouton EN/FR) dans la navbar.
- `document.documentElement.lang` mis à `fr` ou `en`.

---

[← Index](INDEX.md) · [Architecture](architecture.md)
