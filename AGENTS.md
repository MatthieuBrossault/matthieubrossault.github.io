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
- **Hébergement :** [GitHub Pages](https://matthieubrossault.github.io) — déploiement **GitHub Actions** sur **`master`** — voir [docs/deployment.md](docs/deployment.md).
- **Contraintes :** un seul développeur, effort et coût minimaux ; site statique, pas de backend.

Index documentation : [docs/INDEX.md](docs/INDEX.md).

---

## Données — deux zones

### Profil professionnel — `src/data/` (source de vérité carrière)

**Mettre à jour ces fichiers** pour refléter la vie professionnelle (site + générateurs PDF).

| Fichier | Rôle |
|---------|------|
| [`src/data/profile.fr.json`](src/data/profile.fr.json) | Identité, expériences (avec blocs dossier), formation, compétences, métadonnées dossier ESN |
| [`src/data/profile.en.json`](src/data/profile.en.json) | Même structure en anglais |

Fusion site : [`src/js/locale-data.js`](src/js/locale-data.js) combine `src/translations/` + `src/data/profile.*`.

Fichiers de référence (non servis par le site) : CV PDF et dossier DOCX dans `src/data/` — utiles pour enrichir le profil, pas à citer tels quels côté web.

### Textes du site — `src/translations/`

| Fichier | Rôle |
|---------|------|
| [`src/translations/fr.json`](src/translations/fr.json) | Meta, hero, about, services, projets, contact, nav (FR) |
| [`src/translations/en.json`](src/translations/en.json) | Même structure (EN) |

### Générateurs PDF — `scripts/generators/`

| Fichier | Rôle |
|---------|------|
| [`scripts/generators/generator-config.json`](scripts/generators/generator-config.json) | Cible poste, mots-clés ATS, résumés CV/lettre (hors données profil) |

---

## Structure code utile

| Zone | Contenu |
|------|---------|
| `src/main.js` | Point d’entrée, orchestration |
| `src/js/render.js` | Rendu DOM (sidebar, resume, projets, etc.) |
| `src/js/i18n.js` | Locale, `localStorage`, `data-i18n` |
| `public/vcard/` | Assets statiques (avatar, icônes) |
| `.cursor/rules/js-css-line-limits.mdc` | Fichiers JS/CSS projet : max ~300 lignes, découper si besoin |
| `.cursor/rules/docs-sync.mdc` | Synchro `docs/` après changement stack / archi / layout / déploiement |
| `.cursor/rules/profile-sync.mdc` | Synchro `src/data/profile.*.json` quand l’utilisateur donne des infos carrière |
| `scripts/generators/` | Générateurs PDF (CV, dossier de compétences, lettre de motivation) → `generated/` |

---

## Consignes pour les agents

1. **Profil / CV :** modifier `src/data/profile.fr.json` et `profile.en.json` (aligner EN/FR) ; pitch site dans `src/translations/`. **Règle :** [.cursor/rules/profile-sync.mdc](.cursor/rules/profile-sync.mdc) — appliquer dès que l’utilisateur partage des infos ou documents carrière.
2. **Ton :** professionnel, factuel, orienté recruteurs FR ; bilingue EN pour lecteurs internationaux.
3. **Périmètre :** changements minimaux ; pas de sur-ingénierie ; respecter les conventions du repo.
4. **SEO / découvrabilité :** meta dans `src/translations/`, JSON-LD dans `index.html` — garder alignés avec le profil.
5. **Docs site (`docs/`) :** décrit le site **à l’instant T** — voir [docs/INDEX.md](docs/INDEX.md). Obligation de synchro : [.cursor/rules/docs-sync.mdc](.cursor/rules/docs-sync.mdc).
6. **Infos carrière (`.cursor/infos/`) :** veille, formation, certifications, projets perso — hors périmètre du site live.
7. **Plans site (`.cursor/plans/`) :** recommandations et évolutions **futures** du portfolio (contenu, SEO, UI).

---

## Documentation (3 zones)

| Zone | Rôle | Index |
|------|------|-------|
| **`docs/`** | Site actuel (tech, archi, UI, déploiement) — **maintenir à jour** | [docs/INDEX.md](docs/INDEX.md) |
| **`.cursor/infos/`** | Carrière (veille, formation, certifs, projets GitHub) | [.cursor/infos/INDEX.md](.cursor/infos/INDEX.md) |
| **`.cursor/plans/`** | Évolutions site à planifier / implémenter | [.cursor/plans/INDEX.md](.cursor/plans/INDEX.md) |

| Sujet | Fichier |
|-------|---------|
| Veille marché & tech | [.cursor/infos/market-watch.md](.cursor/infos/market-watch.md) |
| Diplômes & certifications (FR) | [.cursor/infos/market-credentials.md](.cursor/infos/market-credentials.md) |
| Formation & études | [.cursor/infos/training.md](.cursor/infos/training.md) |
| Projets portfolio | [.cursor/infos/portfolio-projects.md](.cursor/infos/portfolio-projects.md) |
| Contenu du site (à faire) | [.cursor/plans/site-content.md](.cursor/plans/site-content.md) |
| SEO, ATS & marché (à faire) | [.cursor/plans/market-seo.md](.cursor/plans/market-seo.md) |
