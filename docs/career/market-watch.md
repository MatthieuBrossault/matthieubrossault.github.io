# Veille marché & technique

Recommandations alignées sur l’objectif **architecte solution** (.NET / SaaS B2B), la recherche d’emploi **France full remote**, et le contexte actuel **Tech Lead ELA Build**.

---

## Priorités de veille (quoi surveiller)

| Priorité | Sujet | Pourquoi pour toi |
|----------|--------|-------------------|
| **Haute** | Évolution **.NET** (LTS, Aspire, minimal APIs, perf) | Cœur de ton stack pro et crédibilité architecte .NET |
| **Haute** | **Architecture distribuée** : microservices, sagas, idempotence, outbox, CQRS/ES en prod | Tu vis ça au quotidien — savoir nommer les patterns et leurs limites |
| **Haute** | **Multi-tenant SaaS** (isolation données, coût, compliance RGPD France) | Différenciant sur ELA Build ; sujet fréquent en entretien architecte |
| **Haute** | **Kubernetes & observabilité** (SLO, traces, coût cluster) | Stack prod ELA ; gap classique lead → architecte |
| **Moyenne** | **IA appliquée** (RAG, vector DB, coût/latence, gouvernance) | Trajectoire ELA Build (FTS, pgvector) — savoir cadrer sans hype |
| **Moyenne** | **Marché emploi FR** remote senior/lead/archi .NET | Adapter pitch et mots-clés CV |
| **Moyenne** | **React / écosystème front** (TanStack, perf, accessibilité) | Crédibilité fullstack sur postes lead/archi |
| **Basse** | Hype cycles (nouveaux LLM, frameworks JS éphémères) | Lecture légère ; ne pas y investir du temps formation |

---

## Sources utiles (curées, peu de bruit)

### .NET & architecture

- [Microsoft .NET Blog](https://devblogs.microsoft.com/dotnet/) — releases, perf, guidance officielle
- [Architecture Weekly](https://www.architecture-weekly.com/) (newsletter) — patterns distribués, études de cas
- [.NET Rocks!](https://www.dotnetrocks.com/) / [The Azure DevOps Podcast](https://azuredevopspodcast.dev/) — en podcast, faible effort
- Livres de référence à (re)parcourir : *Building Microservices* (Newman), *Software Architecture: The Hard Parts* (Ford et al.), *Fundamentals of Software Architecture* (Richards & Ford)

### SaaS, cloud, K8s

- [CNCF blog](https://www.cncf.io/blog/) — tendances K8s (filtrer ce qui touche PME/SaaS)
- [The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/) — org, scaling, culture tech (utile pour rôle architecte)
- Documentation ciblée : [Kubernetes patterns](https://kubernetes.io/docs/concepts/), [PostgreSQL release notes](https://www.postgresql.org/docs/release/)

### IA pragmatique (pas recherche)

- [OpenAI / Mistral docs](https://docs.mistral.ai/) — APIs, limites, pricing
- Articles Microsoft sur **Semantic Kernel** + **RAG** (tu as déjà un POC métier proche)
- Veille « produit » : comment d’autres SaaS B2B intègrent l’IA sans casser la marge

### Marché emploi France

- LinkedIn : alertes **Architecte solution**, **Lead technique .NET**, **Staff Engineer** — filtres remote France
- [Welcome to the Jungle](https://www.welcometothejungle.com/), [LesJeudis](https://www.lesjeudis.com/), [Malt](https://www.malt.fr/) — tendances offres et fourchettes (indicatif)
- Groupes / conférences : **Nantes Tech**, **DotNet Nantes**, meetups **Cloud Native** — réseau local même en remote

---

## Rituel veille (réaliste, ~2 h / semaine)

| Fréquence | Action | Durée |
|-----------|--------|-------|
| **Hebdo** | Parcourir .NET Blog + 1 article architecture (newsletter ou blog) | 45 min |
| **Hebdo** | 5 offres cibles (LinkedIn) : noter stacks, titres, mots-clés récurrents | 30 min |
| **Bi-mensuel** | 1 deep-dive doc (K8s, PostgreSQL, pattern distribué lié à un sujet ELA) | 1 h |
| **Mensuel** | Mettre à jour une note dans ce repo ou `src/data` si un mot-clé marché manque au CV | 15 min |

---

## Mots-clés à faire apparaître (CV + site) si la veille les confirme

À utiliser **seulement** si tu les maîtrises en contexte réel :

- Architecte solution, lead technique, **SaaS multi-tenant**, **microservices**, **event-driven**
- **.NET 8**, **PostgreSQL**, **Kubernetes**, **gRPC**, **OIDC**, **observabilité**
- Cadrage produit, **design review**, **trade-offs**, **coût cloud**, **RGPD**

---

## Liens avec les autres docs

- [Formation & études](training.md) — approfondir les sujets repérés en veille
- [Projets portfolio](portfolio-projects.md) — matérialiser la veille en preuves publiques
- [Contenu & présentation du site](site-content.md) — refléter le positionnement sur le site live
