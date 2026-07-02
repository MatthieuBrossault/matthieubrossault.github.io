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

- **`src/data/en.json`** / **`fr.json`** — copy, navigation, services, projects, contact, hero.
- **`src/data/profile-detail.en.json`** / **`profile-detail.fr.json`** — education, experience, skills, skill map. Merged at runtime via `src/js/locale-data.js`.

## Deployment

GitHub Pages (user site), automated on push to **`master`**. See [docs/deployment-costs.md](docs/deployment-costs.md).
