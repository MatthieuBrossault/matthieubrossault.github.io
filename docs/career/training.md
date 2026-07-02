# Formation, études & tutoriels

Plan de montée en compétence vers **architecte solution**, en complément du poste **Tech Lead ELA Build**. Priorité : **peu de formations longues**, beaucoup de **preuves concrètes** (notes, POC, articles internes anonymisés).

---

## Lacunes typiques lead → architecte (chez toi)

| Zone | Niveau actuel (indicatif) | Cible architecte |
|------|---------------------------|------------------|
| Microservices & patterns distribués | Fort en pratique ELA | Formaliser (ADR, C4, capacité à pitcher trade-offs) |
| Cloud / K8s | Utilisation prod, peu de certif | Lire + 1 lab hands-on / trimestre |
| Front React | Contexte pro récent | Suffisant pour archi ; approfondir perf/a11y si temps |
| DDD / bounded contexts | Pratique implicite ELA | Vocabulaire et modélisation explicites |
| Soft skills archi | Lead d’équipe | Facilitation, stakeholder, estimation à l’échelle |

---

## Parcours recommandé (6–12 mois)

### Phase 1 — Fondations architecte (2–3 mois)

| Sujet | Ressource | Format | Effort |
|-------|-----------|--------|--------|
| **Modélisation & documentation** | [C4 model](https://c4model.com/) + [Structurizr DSL](https://structurizr.com/help/dsl) ou [IcePanel](https://icepanel.io/) (gratuit limité) | Appliquer sur **ELA Build** (schémas internes, non publics) | 2–3 sessions |
| **ADR** | [adr.github.io](https://adr.github.io/) | Rédiger 3–5 ADR sur décisions ELA (SignalR, multi-tenant, gRPC…) | 1 ADR / 2 semaines |
| **DDD tactique** | *Implementing Domain-Driven Design* (Vernon) — chapitres agrégats, repos, domain events | Lecture ciblée + mapping sur 1 bounded context ELA | ~20 h |
| **Distributed systems** | [MIT 6.5840](https://pdos.csail.mit.edu/6.824/) (labs optionnels) ou cours Martin Kleppmann (*Designing Data-Intensive Applications*) | Chapitres 5–9 (réplication, consensus, streams) | ~15 h lecture |

### Phase 2 — Stack ELA + marché (continu)

| Sujet | Ressource | Notes |
|-------|-----------|-------|
| **.NET 8 / 9** | [Microsoft Learn — ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/) | Minimal APIs, perf, testing integration |
| **PostgreSQL avancé** | [PostgreSQL Tutorial](https://www.postgresqltutorial.com/) + doc `ltree`, FTS, indexing | Aligné ELA Build |
| **Kubernetes** | [Kubernetes pour les développeurs](https://learn.microsoft.com/fr-fr/training/paths/ckad-apps-deploy-maintain/) (parcours MS) ou [Play with Kubernetes](https://labs.play-with-k8s.com/) | Pas besoin de CKA pour viser architecte solution PME |
| **gRPC & contrats** | [gRPC for .NET](https://learn.microsoft.com/en-us/aspnet/core/grpc/) | Versioning, erreurs, perf vs REST |
| **Observabilité** | [OpenTelemetry .NET](https://opentelemetry.io/docs/languages/net/) + Sentry docs | Compléter le chantier observabilité ELA |
| **IA / RAG** | [Microsoft Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/) + [pgvector](https://github.com/pgvector/pgvector) | Cadrage coût/latence — tu es déjà sur la trajectoire |

### Phase 3 — Crédibilité marché FR (optionnel)

Voir le détail diplômes / certifications / ROI : [market-credentials.md](market-credentials.md).

| Sujet | Ressource | ROI |
|-------|-----------|-----|
| **Certification fondation cloud** | [AZ-900](https://learn.microsoft.com/fr-fr/credentials/certifications/azure-fundamentals/) ou [AWS Cloud Practitioner](https://aws.amazon.com/certification/certified-cloud-practitioner/) | Mots-clés ATS ; 1–2 semaines — **P1** |
| **Kubernetes** | [CKAD](https://www.cncf.io/certification/ckad/) (après labs) | Différenciant SaaS / K8s — **P2** |
| **Anglais technique** | CV EN à jour | Suffisant pour la plupart des offres FR |

---

## Tutoriels à **ne pas** refaire (déjà couverts ou faible ROI)

- Cours React/Angular « débutant » (Traversy, HandsOnReact déjà dans le portfolio)
- Encore un tuto CRUD .NET sans angle architecture
- Certifications longues (**AZ-305**, mastère) **avant** 2–3 preuves d’architecture — voir [market-credentials.md](market-credentials.md)

---

## Tutoriels / labs **utiles** comme projets portfolio (voir aussi [projets](portfolio-projects.md))

| Idée | Tutoriel de départ | Angle architecte |
|------|-------------------|------------------|
| Mini SaaS multi-tenant | [.NET Multi-tenant SaaS guidance](https://learn.microsoft.com/en-us/azure/architecture/guide/saas-multitenant-solution-architecture/) | 1 repo public **anonymisé** : schéma C4 + ADR |
| Event-driven | [MassTransit quickstarts](https://masstransit.io/quick-starts) | Outbox + consumer idempotent — note technique |
| RAG minimal | SK + pgvector sample | POC public « search on docs » sans données métier |

---

## Planning réaliste (à côté du travail)

| Mois | Focus formation |
|------|-----------------|
| M1 | C4 + 2 ADR sur sujets ELA |
| M2 | DDIA ch. 5–7 + 1 lab K8s local (kind/minikube) |
| M3 | OpenTelemetry sur un side-project + 1 article LinkedIn (anonymisé) |
| M4+ | 1 sujet / mois selon veille [market-watch.md](market-watch.md) |

**Budget temps cible :** 3–4 h / semaine (dont une partie peut être « apprentissage sur le tas » au travail, documenté en ADR).

---

## Suivi

- Cocher les ressources terminées dans une section « Done » en bas de ce fichier si utile
- Quand une formation produit un livrable public → l’ajouter au portfolio ([portfolio-projects.md](portfolio-projects.md))
