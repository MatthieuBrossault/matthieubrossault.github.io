# Documentation du site (état actuel)

Documentation **à jour avec le code** : stack, architecture, UI, déploiement.  
**Mettre à jour ces fichiers** lors de tout changement technique ou structurel du site — règle [.cursor/rules/docs-sync.mdc](../.cursor/rules/docs-sync.mdc) (contexte : [AGENTS.md](../AGENTS.md)).

**Live :** [https://matthieubrossault.github.io](https://matthieubrossault.github.io)

| Document | Description |
|----------|-------------|
| [Stack technique](tech-stack.md) | Vite, JS, CSS, dépendances, outils |
| [Architecture](architecture.md) | Modules JS, données, flux de rendu |
| [Layout & UI](layout-and-ui.md) | Structure HTML, thème vCard, responsive |
| [Déploiement](deployment.md) | GitHub Pages, Actions, coûts |

---

## Hors `docs/`

| Emplacement | Rôle |
|-------------|------|
| [README.md](../README.md) | Démarrage rapide (dev, contenu) |
| [AGENTS.md](../AGENTS.md) | Contexte agents + règle de maintenance `docs/` |
| `../life-assistant/carriere/` | Dossier du dépôt **privé** voisin `life-assistant` : carrière (`infos/`), évolutions du site (`plans/`). Documents sources : `../private-data/carriere/sources/` (local) |

---

## Nomenclature

| Zone | Convention |
|------|------------|
| **`docs/`** | Site à l’instant T — kebab-case (`tech-stack.md`) |
| **`../life-assistant/carriere/infos/`** | Carrière — `market-*.md`, `training.md`, etc. (dépôt privé) |
| **`../life-assistant/carriere/plans/`** | Évolutions site à faire — `site-content.md`, `market-seo.md` (dépôt privé) |
