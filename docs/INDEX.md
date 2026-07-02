# Documentation

Index du dépôt **personal-portfolio-web**. Contenu du site : [`src/data/`](../src/data/). Contexte agents : [AGENTS.md](../AGENTS.md).

---

## Nomenclature

| Règle | Convention | Exemple |
|-------|------------|---------|
| **Dossiers** | anglais, kebab-case, thème au singulier | `deployment/`, `career/` |
| **Fichiers** | anglais, kebab-case, sujet descriptif | `market-watch.md`, `hosting-and-costs.md` |
| **Index de section** | `INDEX.md` dans chaque dossier | `career/INDEX.md` |
| **Liens** | relatifs au fichier courant | `../INDEX.md`, `market-seo.md` |

Pas de préfixe redondant sur les fichiers : le dossier parent porte le thème (`career/market-watch.md`, pas `career-career-watch.md`).

---

## Sections

| Section | Description |
|---------|-------------|
| [Déploiement](deployment/INDEX.md) | GitHub Pages, Actions, coûts |
| [Carrière & portfolio](career/INDEX.md) | Veille, formation, projets, site, SEO/ATS |

### Déploiement

| Document | Description |
|----------|-------------|
| [Hébergement & coûts](deployment/hosting-and-costs.md) | [matthieubrossault.github.io](https://matthieubrossault.github.io), branche `master`, €0 |

### Carrière & portfolio

| Document | Description |
|----------|-------------|
| [Veille marché & tech](career/market-watch.md) | Objectif architecte solution — sources et rituel |
| [Diplômes & certifications (FR)](career/market-credentials.md) | AZ-900, CKAD, TOGAF, RNCP, ROI marché |
| [Formation & études](career/training.md) | Parcours 6–12 mois |
| [Projets portfolio](career/portfolio-projects.md) | Lab archi, ELA Build, GitHub |
| [Contenu du site](career/site-content.md) | Présentation et `src/data` |
| [SEO, ATS & marché](career/market-seo.md) | Efficacité recruteurs, moteurs, IA |

---

## Hors `docs/`

| Ressource | Rôle |
|-----------|------|
| [README.md](../README.md) | Setup dev, scripts npm |
| [AGENTS.md](../AGENTS.md) | Contexte pour les agents Cursor |
