# Projets personnels & mise en avant portfolio

Objectif : compléter le portfolio actuel (surtout **tutos Angular/React**) par des preuves alignées **Tech Lead → architecte solution**, sans exposer le code ou les données **ELA Build**.

Site live : [https://matthieubrossault.github.io](https://matthieubrossault.github.io)

---

## Diagnostic du portfolio actuel

| Projet actuel | Force | Limite pour poste architecte |
|---------------|-------|------------------------------|
| Angular Task Tracker, Tic-Tac-Toe | Montre stack front | Niveau tutoriel, pas de contexte métier |
| Hands-On React, React 18 crash course | À jour sur React | Idem |
| .NET Core + Angular example | Fullstack | Probablement démo courte — manque récit architecture |

**Manque principal :** 0 projet avec **contexte**, **décisions d’architecture**, **trade-offs**, **diagrammes**.

---

## Stratégie en 3 couches

```text
Couche 1 — Ce site (personal-portfolio-web)     → preuve craft front, i18n, déploiement
Couche 2 — 1–2 repos « architecture showcase »  → ADR + C4 + code minimal mais sérieux
Couche 3 — Narratif ELA Build (sans code)       → étude de cas texte + stack sur le site
```

---

## Projets recommandés (par priorité)

### 1. Ce portfolio (déjà en place) — à renforcer

| Action | Effort | Impact |
|--------|--------|--------|
| Ajouter **étude de cas ELA Build** (page ou section Portfolio, texte seul) | Moyen | Très fort |
| Remplacer / compléter les 5 cartes GitHub par **2 featured + 3 secondaires** | Faible | Fort |
| Lien vers **1 repo architecture** (voir #2) en tête de liste | Faible | Fort |

Voir détail contenu : [site-content.md](../plans/site-content.md).

### 2. Repo « architecture lab » (nouveau — priorité haute)

**Nom suggéré :** `saas-architecture-lab` ou `dotnet-distributed-patterns`

**Contenu minimal viable :**

- README : problème, contraintes, diagrammes C4 (niveau 1–2)
- Dossier `docs/adr/` avec 3–5 ADR (multi-tenant, messaging, API gateway)
- Code : 2–3 services .NET 8 + docker-compose (PostgreSQL, Redis, RabbitMQ ou équivalent)
- **Pas** de clone ELA — thème générique (ex. « gestion de devis B2B »)

**Patterns à démontrer (alignés ELA, génériques) :**

- Database-per-tenant ou schema-per-tenant (au choix, documenté)
- CQRS léger + MediatR sur 1 use case
- gRPC ou REST versionné — 1 ADR qui compare
- Outbox ou idempotence sur 1 consumer MassTransit

**Effort :** 2–4 week-ends sur 2 mois. **C’est le meilleur ROI** pour un profil architecte.

### 3. POC « search + RAG » public (priorité moyenne)

- Stack : .NET 8 + PostgreSQL pgvector + Mistral ou modèle local
- Corpus : documentation **publique** (ex. docs .NET, ou tes propres notes Markdown)
- README : coût par requête, latence, limites — montre maturité « archi produit »
- Lien depuis portfolio comme « AI-assisted search POC »

### 4. Améliorer `NetCoreAngularExemple` (priorité moyenne)

Si le repo existe encore et est léger :

- Ajouter `ARCHITECTURE.md`, tests d’intégration, OpenAPI
- Séparer clairement API / front, 1 diagramme de déploiement
- Sinon : **archiver** et pointer vers le lab (#2) pour ne pas diluer le message

### 5. Projets à **déprioriser** sur le site

- Tic-Tac-Toe, petits tutos — garder en « Learning / side projects » ou retirer de la page d’accueil Portfolio
- Ne pas ajouter de nouveaux tutos framework sans angle architecture

---

## Étude de cas ELA Build (sans code propriétaire)

Fiche à rédiger dans `src/data` (nouveau champ ou projet dédié) :

| Section | Contenu |
|---------|---------|
| **Contexte métier** | SaaS MOE BTP, ~120–150 tenants, écosystème Multidoc/Quantiplan |
| **Enjeu technique** | Multi-tenant, microservices, temps réel chantier, génération doc |
| **Ton rôle** | Tech Lead : design reviews, AlphaPlan/AlphaFinancial, recherche/IA |
| **Décisions** | 2–3 exemples (gRPC inter-services, SignalR + Redis, PostgreSQL/tenant) |
| **Résultat** | Releases 1.11–1.13 (compte-rendu chantier, import Schneider, etc.) — facts publics produit |
| **Lien** | [ela-build.app](https://ela-build.app) si autorisé |

---

## Matrice « quoi montrer où »

| Audience | GitHub | Site portfolio | LinkedIn |
|----------|--------|----------------|----------|
| Recruteur ATS | Mots-clés README archi lab | CV JSON + titre hero | Titre + résumé 3 lignes |
| Lead dev / architecte peer | ADR + code lab | Étude de cas + diagrammes | Post 1/mois technique |
| Manager | README synthèse | Section « leadership » services | Expérience ELA détaillée |

---

## Prochaines actions concrètes

1. [ ] Créer repo `saas-architecture-lab` + README + 1er ADR
2. [ ] Ajouter carte **ELA Build** (étude de cas) dans `en.json` / `fr.json`
3. [ ] Réorganiser Portfolio : 2 featured, 3 en retrait
4. [ ] Image dédiée ELA Build dans `src/images/` (capture site floutée ou visuel générique BTP)

---

## Liens

- [Veille](market-watch.md)
- [Formation](training.md)
- [Site & contenu](../plans/site-content.md)
