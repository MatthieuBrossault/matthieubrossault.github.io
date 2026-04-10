# Personal Portfolio Web

Personal portfolio website: **Vite** + vanilla JavaScript, content in **JSON** (English / French).

## UI theme

The layout and styles are based on the **vCard – Personal portfolio** template by [@codewithsadee](https://github.com/codewithsadee/vcard-personal-portfolio) (MIT). Styles live in `src/styles/vcard.css`; small overrides in `src/styles/main.css`. Static assets (icons, avatar placeholder, favicon) are under `public/vcard/`.

## Scripts

```bash
npm install
npm run dev      # development
npm run build    # production → dist/
npm run preview  # preview production build
```

## Content

- **`src/data/en.json`** / **`fr.json`** — copy, navigation, services, projects, contact, hero.
- **`src/data/profile-detail.en.json`** / **`profile-detail.fr.json`** — detailed education, professional experience (roles, summaries, highlights, stack lines), skill list for progress bars, and grouped **skill map** (soft skills, sectors, tech stacks). Merged at runtime with the base locale file.

To update CV content from a new dossier de compétences, edit the `profile-detail.*.json` files (keep valid JSON).
