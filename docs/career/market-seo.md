# Efficacité du site sur le marché (SEO, moteurs, IA, ATS)

**Site :** [https://matthieubrossault.github.io](https://matthieubrossault.github.io)  
**Objectif :** recherche d’emploi **France**, **full remote**, progression **Tech Lead → architecte solution** (.NET, SaaS B2B).

Ce document évalue comment le portfolio est **lu, indexé et matché** par les recruteurs, les moteurs de recherche et les outils d’analyse (ATS, IA). Il s’appuie sur l’état actuel du code (`index.html`, `src/data/`, `src/js/render.js`, `i18n.js`).

---

## Synthèse (score indicatif)

| Canal | Efficacité | Commentaire court |
|-------|------------|-------------------|
| **Humain (recruteur)** | Bonne | Parcours détaillé, ELA Software visible, bilingue — navigation par onglets moins immédiate qu’un PDF |
| **Google / Bing** | Moyenne | SPA légère : beaucoup de texte injecté en JS ; pas de `sitemap`, `canonical`, Open Graph |
| **ATS (parsage URL)** | Faible | Contenu CV chargé dynamiquement ; pas de PDF téléchargeable ; onglets masqués en CSS |
| **IA (LLM, résumé profil)** | Moyenne | Texte riche une fois rendu, mais JSON-LD minimal et non synchronisé avec la locale |
| **Match mots-clés offres FR** | Moyenne+ | Bon sur .NET / microservices / SaaS ; faible sur « architecte solution », remote, Kubernetes en tête de page |

**Priorité globale :** renforcer la **lisibilité machine** (HTML statique ou PDF) sans sacrifier la simplicité du site.

---

## 1. Objectif marché → critères de succès

| Critère | Cible |
|---------|--------|
| Être trouvé | Requêtes du type *Tech Lead .NET Nantes remote*, *architecte solution SaaS France* |
| Être compris en 30 s | Titre, poste actuel, stack, disponibilité remote |
| Matcher une offre | Mots-clés alignés LinkedIn + CV PDF + site |
| Passer un filtre ATS | Texte extractible, sections standard (expérience, compétences, formation) |
| Convaincre un pair / architecte | Preuves techniques (ELA Build, pas seulement tutos) |

---

## 2. État actuel — ce qui fonctionne

### HTML sémantique

- `<main>`, `<article>`, `<section>`, `<header>`, `<nav>`, `<address>` — bonne base pour crawlers et lecteurs d’écran.
- **H1** : nom (`hero.title`) ; **H2** : titres d’onglets (About, Resume, Portfolio, Contact).
- Contenu **expérience / compétences / projets** structuré en listes (`<ol>`, `<ul>`, titres `<h4>`) après rendu JS.

### Données riches (CV)

- [`profile-detail.*.json`](../../src/data/) : expériences détaillées (ELA Software, stack, highlights) — **matière première solide** pour le matching.
- Fusion EN/FR via [`locale-data.js`](../../src/js/locale-data.js).

### SEO de base

- `<title>` et `<meta name="description">` mis à jour par [`i18n.js`](../../src/js/i18n.js) depuis `meta` dans les JSON.
- **JSON-LD** `Person` dans [`index.html`](../../index.html) : nom, `jobTitle`, `worksFor`, localisation, `sameAs` (LinkedIn, GitHub).

### Performance & hébergement

- Site statique, GitHub Pages, HTTPS — favorable au référencement technique (vitesse, disponibilité).
- Images portfolio en WebP — bon pour le LCP.

### Bilinguisme

- FR/EN + `document.documentElement.lang` mis à jour — utile pour Google et lecteurs humains.

---

## 3. Limites actuelles (impact marché)

### 3.1 Rendu JavaScript (SEO & ATS)

| Élément | Problème |
|---------|----------|
| Bio About, timeline expérience, skills, projets | Injectés par `render.js` **après** chargement du module |
| **Google** | Exécute en général le JS — indexation possible avec délai |
| **Bing / autres** | Moins fiables sur JS-heavy |
| **ATS** (Greenhouse, Lever, etc.) | Souvent **pas** de rendu JS sur l’URL du portfolio — voient une page quasi vide |
| **Copier-coller URL** dans un outil RH | Même risque |

**Conséquence :** le site sert surtout le **lien humain** et **Google** ; pour les ATS, un **PDF ou HTML statique** reste indispensable.

### 3.2 Onglets masqués (`article { display: none }`)

- Seul l’onglet `.active` est visible ; le **DOM contient tout** (Resume, Portfolio, Contact).
- Les crawlers reçoivent le HTML complet si le JS a tourné — **OK pour Google** en théorie.
- Certains outils IA ne pondèrent pas le contenu `display:none` — **risque faible à moyen**.

### 3.3 Pas de fichiers SEO standards

| Manquant | Impact |
|----------|--------|
| `robots.txt` | Mineur sur GitHub Pages (souvent indexé par défaut) |
| `sitemap.xml` | Découverte plus lente, une seule URL quand même |
| `<link rel="canonical">` | Duplicata potentiel si plusieurs URLs pointent vers le site |
| **Open Graph** / **Twitter Card** | Partage LinkedIn/Twitter peu optimisé (pas d’aperçu riche) |
| **`hreflang`** | Une URL, locale en JS — Google voit surtout la langue initiale du HTML (`lang="en"`) |

### 3.4 JSON-LD incomplet

Actuellement : `Person` minimal, **statique en anglais**, non mis à jour au switch FR.

**Manque pour l’IA et Google :**

- `knowsAbout` (compétences)
- `hasOccupation` / description
- `url` du site
- `alumniOf` / `worksFor` détaillé
- Pas de `ProfilePage` lié au `Person`

### 3.5 Mots-clés — écarts avec les offres cibles

Mots-clés **présents** (bio, ELA, profile-detail) :

- Tech Lead, .NET 8, microservices, SaaS, PostgreSQL, React, Kubernetes, gRPC, CQRS, remote implicite (Nantes)

Mots-clés **sous-représentés** en tête de page / meta :

| Mot-clé marché (offres FR) | Présence site |
|----------------------------|---------------|
| Architecte solution | Mention objectif dans docs, pas dans `meta` / hero |
| Lead technique | Partiel (Tech Lead EN) |
| Full remote / télétravail | Absent du `contact.intro` |
| Azure / AWS | Historique CV, peu visible About |
| DDD, event-driven, multi-tenant | Dans ELA (detail), pas dans meta |
| Anglais / bilingue | Site bilingue mais pas annoncé |

Mots-clés **sur-représentés** (Portfolio) :

- Tutos Angular/React — **dilue** le positionnement architecte si mis en avant à égalité avec ELA.

### 3.6 Incohérences internes

- `fr.json` / `en.json` : bloc `skills` / `experience` **legacy** (peu utilisé) vs `profile-detail.*` (source réelle du Resume) — risque de confusion si un jour du contenu est dupliqué.
- Avatar : `alt=""` vide — accessibilité et contexte image pour l’IA.

### 3.7 Découvrabilité hors site

- Le portfolio **dépend** de LinkedIn/GitHub pour le trafic — normal, mais le site n’est pas encore une « landing » optimisée partage social.

---

## 4. Match par type d’« lecteur »

### 4.1 Moteurs de recherche (Google)

```text
Requête utilisateur → crawl HTML → (exécution JS) → index title, meta, texte visible
```

**Forces :** URL stable, HTTPS, contenu textuel dense (expériences) une fois rendu.  
**Faiblesses :** une seule page, pas de blog, pas de backlinks intégrés au repo, meta description courte.

**Requêtes réalistes où tu peux apparaître (à moyen terme) :**

- `Matthieu Brossault` + Nantes / .NET
- Nom + Tech Lead / ELA (si indexé)

**Requêtes difficiles sans contenu additionnel :**

- *architecte solution .NET remote France* (concurrence forte, pas de pages dédiées)

### 4.2 ATS & parseurs CV

Les ATS cherchent : **sections nommées**, **dates**, **employeur**, **compétences en liste**, **texte brut**.

| Section ATS | Site actuel |
|-------------|-------------|
| Identité | OK (H1, sidebar) |
| Résumé | OK après JS (about) |
| Expérience | OK après JS (timeline) |
| Compétences | OK (barres + listes) |
| Formation | OK |
| **Extraction sans JS** | **Non** |

**Recommandation marché :** toujours joindre un **PDF** (ou Word) sur LinkedIn et en candidature ; le site = **complément**, pas remplacement.

### 4.3 Analyse IA (ChatGPT, Claude, Perplexity, outils RH)

Ces outils :

1. Récupèrent le HTML (parfois sans JS complet)
2. Ou s’appuient sur **LinkedIn / GitHub** en priorité
3. Extraient entités : rôle, stack, séniorité, secteur

**Ce qu’ils retiendront bien aujourd’hui :** JSON-LD `Person`, H1, meta description, texte ELA si JS exécuté.  
**Ce qu’ils peuvent manquer :** détail des 10 ans d’expérience, skill map, mots-clés en français si page servie en EN.

**Levier :** enrichir JSON-LD + texte **above the fold** (subtitle, bio) avec les 10–15 termes cibles.

### 4.4 Recruteur humain (30 secondes)

| Signal | État |
|--------|------|
| Titre clair | Oui — Tech Lead .NET |
| Poste actuel | Oui — ELA (dans Resume, pas dans hero) |
| Séniorité | Oui — timeline |
| Projets « sérieux » | Faible — tutos en Portfolio |
| Contact | LinkedIn/GitHub — OK |
| Remote | Non explicite |

---

## 5. Grille de mots-clés (alignement offres)

Utiliser comme checklist dans `meta`, `hero`, `about.bio`, `profile-detail` (ELA), LinkedIn.

### Tier 1 — à avoir partout (site + LinkedIn + PDF)

`Tech Lead`, `Lead technique`, `.NET`, `C#`, `microservices`, `SaaS`, `architecture`, `PostgreSQL`, `React`, `TypeScript`, `Kubernetes`, `Docker`, `API REST`, `gRPC`, `agile`, `Nantes`, `France`, `télétravail` / `remote`

### Tier 2 — différenciation architecte

`architecte solution`, `multi-tenant`, `CQRS`, `event-driven`, `DDD`, `design review`, `OIDC`, `observabilité`, `Redis`, `CI/CD`, `GitLab`

### Tier 3 — secteur & contexte actuel

`B2B`, `BTP`, `maîtrise d'œuvre`, `documentaire`, `ELA Build` (marque produit si autorisé)

### Tier 4 — à ne pas sur-promettre

Certifications cloud non passées, `Azure Architect Expert`, stacks non pratiquées récemment (Angular seul en tête de liste).

---

## 6. Recommandations par priorité

### P0 — Impact marché immédiat (contenu `src/data` uniquement)

| Action | Fichier | Effet |
|--------|---------|-------|
| Ajouter **remote France** dans l’intro contact | `fr.json` / `en.json` | Match offres + IA |
| Renforcer **meta.description** (155 car. max) avec Tier 1 + 2 | `meta` | Snippet Google, IA |
| Aligner **hero.subtitle** sur SaaS + architecture distribuée | `hero` | Scan humain + IA |
| Carte **ELA Build** en tête Portfolio | `projects` | Match seniorité |
| Réduire visibilité tutos (ou libellé « apprentissage ») | `projects` | Ne pas diluer le profil |

### P1 — SEO technique (petits ajouts code)

| Action | Effort |
|--------|--------|
| `<link rel="canonical" href="https://matthieubrossault.github.io/">` | Faible |
| `public/robots.txt` + `sitemap.xml` (1 URL) | Faible |
| Balises **Open Graph** (`og:title`, `og:description`, `og:url`, `og:image`) | Faible |
| Enrichir **JSON-LD** : `knowsAbout`, `url`, description, sync locale | Moyen |
| `alt` descriptif sur avatar | Faible |

### P2 — ATS & candidatures

| Action | Effet |
|--------|-------|
| Lien **Télécharger CV (PDF)** sur Contact (`public/cv.pdf`) | Fort pour ATS |
| Garder **PDF aligné mot pour mot** avec `profile-detail` | Cohérence matching |
| Sur formulaires : coller le **PDF**, pas seulement l’URL du site | Standard marché FR |

### P3 — Rendu sans JS (optionnel, plus lourd)

| Option | Trade-off |
|--------|-----------|
| **SSG / prerender** du HTML au build (vite-plugin-ssr ou snapshot) | Meilleur SEO/ATS, plus de complexité |
| Section `<noscript>` avec résumé texte + lien PDF | Filet minimal |
| Pages séparées `/fr/`, `/en/` statiques | Meilleur hreflang, plus de maintenance |

Pour l’objectif **effort minimal** du repo : **P0 + P1 + PDF (P2)** suffisent.

---

## 7. Checklist de vérification (avant candidature)

- [ ] `meta.title` / `meta.description` FR et EN contiennent 5+ mots-clés Tier 1
- [ ] LinkedIn headline ≈ hero subtitle ≈ première ligne PDF
- [ ] Expérience ELA = première entrée timeline, dates à jour
- [ ] `contact.intro` mentionne remote France
- [ ] JSON-LD `jobTitle` = titre affiché publiquement
- [ ] Tester : [Google Rich Results Test](https://search.google.com/test/rich-results) sur l’URL live
- [ ] Tester : « View Page Source » sans JS vs onglet chargé — évaluer le vide perçu
- [ ] Soumettre l’URL dans [Google Search Console](https://search.google.com/search-console) (propriété `matthieubrossault.github.io`)

---

## 8. Mesure dans le temps

| Indicateur | Outil | Fréquence |
|------------|-------|-----------|
| Impressions / clics nom | Google Search Console | Mensuel |
| Position requêtes brand | Search Console | Mensuel |
| Trafic referrers (LinkedIn) | Analytics (optionnel, respect RGPD) | Mensuel |
| Taux de réponse candidatures | Tableau perso | Continu |
| Cohérence mots-clés vs offres visées | [market-watch.md](market-watch.md) | Hebdo |

---

## 9. Liens

- [Contenu & présentation du site](site-content.md)
- [Veille & mots-clés marché](market-watch.md)
- [Projets portfolio](portfolio-projects.md)
- [AGENTS.md](../../AGENTS.md) — objectifs carrière

---

*Dernière revue : alignée sur la structure du site (Vite, onglets vCard, données `src/data/`, déploiement GitHub Pages).*
