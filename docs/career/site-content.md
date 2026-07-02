# Recommandations — contenu & présentation du site

Site : [https://matthieubrossault.github.io](https://matthieubrossault.github.io)  
Données : [`src/data/`](../../src/data/) (source de vérité)

Objectif : passer la perception **« développeur fullstack »** à **« lead / architecte solution .NET, SaaS B2B »**, tout en restant **ATS-friendly** et **bilingue EN/FR**.

---

## Positionnement cible (pitch)

| Aujourd’hui (partiel) | Cible |
|----------------------|--------|
| Tech Lead .NET | **Tech Lead .NET → Architecte solution** (trajectoire explicite) |
| Liste de tutos GitHub | **1 mission phare (ELA Build) + 1–2 preuves techniques** |
| CV chronologique dense | Même CV + **3 bullets « impact »** en tête d’expérience ELA |
| About générique | About orienté **SaaS, multi-tenant, leadership technique** |

**Sous-titre hero suggéré (FR) :**  
« Tech Lead .NET — SaaS B2B, microservices & architecture distribuée »

**Sous-titre hero suggéré (EN) :**  
« .NET Tech Lead — B2B SaaS, microservices & distributed systems »

*(À ajuster dans `fr.json` / `en.json` → `hero.subtitle` et `meta`.)*

---

## Modifications par section

### Sidebar & identité

| Élément | Recommandation |
|---------|----------------|
| **Titre / meta** | Inclure « Tech Lead » ou « Lead technique » + « architecture » ; garder Nantes + remote implicite dans About |
| **Avatar** | Photo pro si possible (le placeholder vCard affaiblit le sérieux recruteur) |
| **Email** | Déjà présent — vérifier cohérence avec CV PDF LinkedIn |

### About (`about.bio`)

Structure en **3 phrases** :

1. Qui + années d’expérience + Nantes / remote France  
2. Spécialité : .NET, SaaS, microservices, équipes agile  
3. Objectif : contributions architecture sur produits à fort enjeu technique (sans sur-promettre « architecte » si le titre officiel est encore Tech Lead)

**Exemple FR (base de travail) :**

> Tech Lead .NET avec plus de 10 ans d’expérience, basé à Nantes (open remote France). J’accompagne la conception et la delivery de produits SaaS B2B — microservices .NET, PostgreSQL, React, Kubernetes. Aujourd’hui sur ELA Build (BTP / maîtrise d’œuvre) ; je vise des rôles d’**architecte solution** où structurer le technique au service du produit.

### « Ce que je fais » (`services`)

Renommer le 4e bloc « Qualité » en quelque chose de plus **lead** si le texte reste générique :

- **Encadrement & delivery** (déjà bien)
- Ajouter mention **documentation d’architecture (C4, ADR)** quand tu auras le lab public

### Resume — expérience ELA

Déjà enrichie. Affiner pour **recruteurs qui scannent en 10 s** :

- **summary** : 2 lignes max en tête — produit + stack + ton rôle  
- **highlights** : commencer par **impact / périmètre** (tenants, équipe, modules), puis technique  
- Éviter listes de 15 technos dans un seul bullet — garder la ligne `stack` pour ça

### Resume — expériences anciennes

- Condenser les postes **2014–2018** si la page Resume devient longue (option : garder en JSON mais afficher « Voir détail » plus tard — hors scope minimal)
- Pour l’instant : OK si tout tient sans scroll infini sur mobile

### Portfolio

| Priorité | Action |
|----------|--------|
| **P0** | Carte **ELA Build** en première position : titre, 2 lignes contexte, stack tags, lien produit ou étude de cas interne |
| **P1** | Carte **Architecture lab** (futur repo) en 2e position |
| **P2** | Regrouper les 5 tutos sous libellé « Projets d’apprentissage » ou ne garder que 2 visibles |
| **P3** | Pour chaque projet featured : champ `description` enrichi (problème → solution → stack), pas seulement une phrase |

**Extension JSON suggérée** (quand tu implémenteras) :

```json
{
  "id": "ela-build",
  "title": "ELA Build",
  "featured": true,
  "description": "SaaS multi-tenant pour maîtres d'œuvre (BTP). Tech Lead : microservices .NET 8, React, K8s.",
  "stack": [".NET 8", "React", "PostgreSQL", "Kubernetes"],
  "repoUrl": "https://ela-build.app",
  "caseStudy": true
}
```

*(Adapter `render.js` seulement quand tu ajoutes les champs — doc d’intention ici.)*

### Contact

- Ajouter une phrase **disponibilité** : « Open to full-remote roles in France » / « Ouvert aux missions full remote en France »
- LinkedIn : s’assurer que le profil reprend les mêmes titres que le site

---

## SEO, ATS & accessibilité

| Sujet | Action |
|-------|--------|
| **Mots-clés** | Aligner `meta.description`, JSON-LD `jobTitle`, titres H1/H2 avec LinkedIn et CV PDF |
| **SEO / ATS / IA** | Voir [market-seo.md](market-seo.md) |
| **JSON-LD** | Envisager `knowsAbout` : .NET, Microservices, PostgreSQL, Kubernetes, SaaS |
| **HTML sémantique** | Déjà correct (articles, sections) — conserver |
| **PDF CV** | Lien téléchargement optionnel depuis Contact (fichier dans `src/data/` — à servir via `public/` si tu l’exposes) |
| **Performance** | Images portfolio déjà en WebP — bon ; vérifier LCP hero/avatar |
| **i18n** | Toujours mettre à jour **EN + FR** à chaque changement de pitch |

---

## Évolutions UI (optionnelles, par effort)

| Effort | Idée | Intérêt |
|--------|------|---------|
| Faible | Lien « Télécharger le CV (PDF) » | ATS + recruteurs pressés |
| Faible | Badge « Remote France » dans About | Clarifie la cible |
| Moyen | Section **« Études de cas »** (1 page, ancrage Portfolio) | Différenciation architecte |
| Moyen | Timeline visuelle expérience (sans casser vCard) | Lisibilité |
| Élevé | Refonte partielle vCard (moins « template ») | Branding — seulement si le reste du contenu est prêt |

**Principe :** le contenu (ELA + lab archi) apporte 80 % de la valeur ; la refonte graphique peut attendre.

---

## Checklist de mise en œuvre (dans `src/data`)

- [ ] `hero.subtitle` + `meta` : positionnement SaaS / architecture
- [ ] `about.bio` : structure 3 phrases + objectif architecte
- [ ] `contact.intro` : remote France
- [ ] Projet `ela-build` en tête de `projects.items`
- [ ] Descriptions projets : problème / rôle / stack
- [ ] `profile-detail.*` : bullets ELA orientés impact
- [ ] `index.html` JSON-LD : `knowsAbout`, titre aligné
- [ ] Photo avatar pro dans `public/vcard/`

---

## Liens

- [Veille](market-watch.md)
- [Formation](training.md)
- [Projets](portfolio-projects.md)
- [AGENTS.md](../../AGENTS.md) — contexte agent
