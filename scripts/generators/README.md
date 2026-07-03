# PDF generators

Outputs are written to **`generated/`** (gitignored at repo root). Not deployed to GitHub Pages.

| Subfolder | Generator | Command |
|-----------|-----------|---------|
| `generated/cv/` | CV (**1 page**, layout 2 colonnes, filtré pour architecte solution) | `npm run generate:cv` |
| `generated/dossier/` | Dossier de compétences (ESN-style, bandeau couleur) | `npm run generate:dossier` |
| `generated/cover-letter/` | Lettre de motivation | `npm run generate:cover-letter -- --company … --role …` |

## Locale

Default: **French** (`--locale fr`). English: `--locale en`.

Generate both CV + dossier: `npm run generate:all` (add `--locale en` for English only).

## Data sources

| Fichier | Rôle |
|---------|------|
| `src/data/profile.fr.json` / `profile.en.json` | **Profil professionnel** (source de vérité carrière) |
| `scripts/generators/generator-config.json` | Cible poste, mots-clés ATS, résumés CV/lettre |

## CV (1 page)

Le CV n’affiche que les expériences **pertinentes pour architecte solution** (ELA, Aviv, Onepoint) ; le reste est résumé en une ligne « parcours antérieur ». Liste modifiable dans `scripts/generators/lib/cv-content.js`.

## Style

Thème navy (`#1a365d`) + accent doré (`#d4a012`) : bandeau d’en-tête, titres de section, cartes d’expérience, tags mots-clés.

## Options

- `--anonymize` — CV and dossier only (initials instead of full name)
- Cover letter: `--recruiter`, `--notes`, `--job-url`
