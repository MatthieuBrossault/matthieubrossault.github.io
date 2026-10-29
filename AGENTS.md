# Contexte pour les agents (portfolio Matthieu Brossault)

## Qui je suis

Ingénieur informatique **français**, carrière professionnelle depuis **juin 2014**, basé à **Nantes**. Parcours **Microsoft .NET** : développeur web → développeur expérimenté → **lead backend** → **team lead / responsable technique**, avec une trajectoire vers **architecte solution**.

**Contexte privé :** si le dépôt privé `life-assistant` est cloné à côté de celui-ci, lire d’abord [../life-assistant/carriere/AGENTS.private.md](../life-assistant/carriere/AGENTS.private.md). Il contient la situation personnelle, les notes carrière et les plans du site. **Ne jamais copier son contenu dans ce dépôt public.**

---

## Rôle de ce dépôt

Site **portfolio professionnel** (CV vivant) : mettre en avant compétences, expérience et projets.

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

Fichiers de référence (CV PDF, dossier DOCX) : dans `../private-data/carriere/sources/` (local, hors dépôt), jamais dans ce dépôt.

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
6. **Infos carrière et plans du site :** dans le dépôt privé (`../life-assistant/carriere/infos/`, `../life-assistant/carriere/plans/`) — hors périmètre du dépôt public.
7. **Données personnelles :** date de naissance, rémunération, situation chez l’employeur, stratégie de carrière → uniquement dans `../life-assistant/carriere/`.

---

## Documentation (3 zones)

| Zone | Rôle | Index |
|------|------|-------|
| **`docs/`** | Site actuel (tech, archi, UI, déploiement) — **maintenir à jour** | [docs/INDEX.md](docs/INDEX.md) |
| **`../life-assistant/carriere/infos/`** | Carrière (veille, formation, certifs, projets, analyse marché) — dépôt privé | [../life-assistant/carriere/infos/INDEX.md](../life-assistant/carriere/infos/INDEX.md) |
| **`../life-assistant/carriere/plans/`** | Évolutions site à planifier / implémenter — dépôt privé | [../life-assistant/carriere/plans/INDEX.md](../life-assistant/carriere/plans/INDEX.md) |
