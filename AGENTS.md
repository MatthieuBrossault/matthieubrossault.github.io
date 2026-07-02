# Contexte pour les agents (portfolio Matthieu Brossault)

## Qui je suis

Ingénieur informatique **français**, né le **20/12/1991** en France. Carrière professionnelle depuis **juin 2014**, basée à **Nantes**.

**Parcours technique :** départ sur l’écosystème **Microsoft .NET** (développeur web), puis évolution vers des rôles à responsabilité croissante :

développeur expérimenté → **lead backend** → **team lead / responsable technique**.

**Objectif actuel :** poursuivre cette progression vers un poste d’**architecte solution**.

**Recherche d’emploi :** marché **français**, **full remote** de préférence ; **Nantes** acceptable en présentiel. Ouvert à **tous secteurs métier** — l’appétence porte surtout sur la **dimension technique**.

**Objectif secondaire du repo :** maintenir les connaissances à jour et alignées avec le marché (veille pertinente, formation ponctuelle quand nécessaire).

---

## Rôle de ce dépôt

Site **portfolio professionnel** (CV vivant) : mettre en avant compétences, expérience et projets pour la recherche d’emploi.

- **Stack :** Vite, JavaScript vanilla, CSS (thème vCard + surcouche `main.css`), contenu i18n **EN / FR**.
- **Hébergement :** [GitHub Pages](https://matthieubrossault.github.io) — déploiement **GitHub Actions** sur **`master`** — voir [docs/deployment/hosting-and-costs.md](docs/deployment/hosting-and-costs.md).
- **Contraintes :** un seul développeur, effort et coût minimaux ; site statique, pas de backend.

Index documentation : [docs/INDEX.md](docs/INDEX.md).

---

## Données profil — source de vérité : `src/data/`

**Les informations affichées sur le site et à utiliser pour toute mise à jour de contenu sont dans `src/data/`.** Ne pas inventer de parcours ou de compétences : s’appuyer sur ces fichiers (et les aligner EN/FR).

| Fichier | Rôle |
|---------|------|
| [`src/data/en.json`](src/data/en.json) | Copy courte EN : meta, hero, about, services, skills résumés, projets, contact, nav |
| [`src/data/fr.json`](src/data/fr.json) | Même structure en français |
| [`src/data/profile-detail.en.json`](src/data/profile-detail.en.json) | CV détaillé EN : expériences, formations, catégories de compétences |
| [`src/data/profile-detail.fr.json`](src/data/profile-detail.fr.json) | CV détaillé FR |

Fusion au runtime dans [`src/js/locale-data.js`](src/js/locale-data.js) (`mergeProfile` : base + détail par locale).

Fichiers de référence (non servis par le site) : CV PDF et dossier compétences dans le même dossier — utiles pour enrichir les JSON, pas pour les citer tels quels côté web sans extraction.

---

## Structure code utile

| Zone | Contenu |
|------|---------|
| `src/main.js` | Point d’entrée, orchestration |
| `src/js/render.js` | Rendu DOM (sidebar, resume, projets, etc.) |
| `src/js/i18n.js` | Locale, `localStorage`, `data-i18n` |
| `public/vcard/` | Assets statiques (avatar, icônes) |
| `.cursor/rules/js-css-line-limits.mdc` | Fichiers JS/CSS projet : max ~300 lignes, découper si besoin |

---

## Consignes pour les agents

1. **Contenu CV / pitch :** modifier `src/data/*.json` (les **deux** langues si le champ existe dans les deux) ; vérifier cohérence avec l’objectif **architecte solution** sans sur-vendre.
2. **Ton :** professionnel, factuel, orienté recruteurs FR ; bilingue EN pour lecteurs internationaux.
3. **Périmètre :** changements minimaux ; pas de sur-ingénierie ; respecter les conventions du repo.
4. **SEO / découvrabilité :** meta dans JSON, JSON-LD dans `index.html` — garder alignés avec `src/data`.
5. **Docs :** mettre à jour [docs/deployment/hosting-and-costs.md](docs/deployment/hosting-and-costs.md) si le déploiement change ; recommandations carrière dans [docs/career/](docs/career/INDEX.md).

---

## Recommandations (docs)

| Sujet | Fichier |
|-------|---------|
| Veille marché & tech | [career/market-watch.md](docs/career/market-watch.md) |
| Diplômes & certifications (FR) | [career/market-credentials.md](docs/career/market-credentials.md) |
| Formation & études | [career/training.md](docs/career/training.md) |
| Projets portfolio | [career/portfolio-projects.md](docs/career/portfolio-projects.md) |
| Contenu du site | [career/site-content.md](docs/career/site-content.md) |
| SEO, ATS & marché | [career/market-seo.md](docs/career/market-seo.md) |
