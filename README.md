# Personal Portfolio Web

**Live:** [https://matthieubrossault.github.io](https://matthieubrossault.github.io)

Personal portfolio: **Vite** + vanilla JavaScript, content in **JSON** (English / French).

## UI theme

Layout and styles from **vCard – Personal portfolio** by [@codewithsadee](https://github.com/codewithsadee/vcard-personal-portfolio) (MIT). `src/styles/vcard.css` + `src/styles/main.css`. Static assets under `public/vcard/`.

## Scripts

```bash
npm install
npm run dev      # development
npm run build    # production → dist/
npm run preview  # preview production build
```

## Content

- **`src/translations/en.json`** / **`fr.json`** — site copy (meta, hero, about, services, projects, contact, nav).
- **`src/data/profile.en.json`** / **`profile.fr.json`** — professional profile (experience, education, skills, dossier blocks). Merged at runtime via `src/js/locale-data.js`.

## Deployment

GitHub Pages (user site), automated on push to **`master`**. See [docs/deployment.md](docs/deployment.md).

## PDF generators (CV, dossier, cover letter)

Outputs go to `generated/` (not versioned). See [scripts/generators/README.md](scripts/generators/README.md).

```bash
npm run generate:cv
npm run generate:dossier
npm run generate:cover-letter -- --company "Acme" --role "Architecte solution"
npm run generate:all          # CV + dossier (FR + EN)
```

Options: `--locale en`, `--anonymize` (CV/dossier). Profile: `src/data/profile.*.json` ; generator tuning: `scripts/generators/generator-config.json`.

## Documentation

| Zone | Purpose |
|------|---------|
| [docs/INDEX.md](docs/INDEX.md) | Current site (stack, architecture, UI, deployment) |
| [.cursor/infos/INDEX.md](.cursor/infos/INDEX.md) | Career context (watch, training, certs) |
| [.cursor/plans/INDEX.md](.cursor/plans/INDEX.md) | Planned site improvements |
