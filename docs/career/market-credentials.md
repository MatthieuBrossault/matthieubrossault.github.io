# Diplômes, titres & certifications (marché français)

Recommandations pour **augmenter la valeur perçue** sur le marché **France** (ESN, éditeurs/SaaS, grands comptes, startups), en visant **Tech Lead → architecte solution** (.NET, SaaS B2B, cloud, K8s).

Complète [formation & études](training.md) (compétences) et [veille marché](market-watch.md) (mots-clés offres).

---

## Point de départ (profil actuel)

| Élément | Détail | Poids marché FR |
|---------|--------|-----------------|
| **Diplôme** | ENI Nantes — Concepteur développeur informatique (BAC+4), 2016 | Solide pour lead/dev senior ; en dessous du « titre ingénieur » pour certains grands groupes |
| **Expérience** | ~10 ans, parcours .NET, lead / team lead / tech lead | **Principal levier** pour architecte solution en produit |
| **Stack actuelle** | .NET 8, microservices, PostgreSQL, K8s, React, AWS (historique Aviv) | Alignée offres « architecte .NET » / « lead technique SaaS » |
| **Anglais** | Site bilingue, expérience internationale (Aviv) | Atout sur ESN et scale-ups |

**En France :** au-delà de **7–10 ans d’expérience**, les recruteurs produit/tech privilégient **réalisations et entretien technique** ; les **certifications** servent surtout de **filtre ATS**, de **crédibilité cloud** et de **signal ESN/grand compte**.

---

## Comment le marché FR utilise les titres

| Type d’employeur | Ce qu’il regarde en priorité | Titres / certifs qui aident |
|------------------|------------------------------|-----------------------------|
| **Éditeur / SaaS** (ex. contexte ELA) | Expérience, archi réelle, delivery | Peu de certifs exigées ; C4/ADR + stack parlent plus |
| **ESN / intégrateur** | CV « vendable », mots-clés client | Azure/AWS associate-expert, TOGAF, Scrum, parfois ITIL |
| **Grand compte / banque / industrie** | Diplôme + cadre + conformité | Titre ingénieur ou équivalent, cloud cert, sécurité/RGPD |
| **Startup / scale-up** | Portfolio, GitHub, culture fit | Certifs optionnelles ; lead/archi prouvé en entretien |

**Remote France :** mêmes critères ; le **titre LinkedIn + CV PDF** compte plus que le portfolio web pour l’ATS.

---

## Certifications cloud & plateforme (ROI élevé pour toi)

Alignement **.NET** → **Azure** en priorité ; **AWS** en second (déjà sur ton CV Aviv).

### Niveau 1 — Fondations (1–3 semaines, faible coût)

| Certification | Éditeur | Intérêt marché FR | Quand la passer |
|---------------|---------|-------------------|-----------------|
| **AZ-900** — Azure Fundamentals | Microsoft | Très reconnu ; filtre ATS « Azure » | **Court terme** — CPF possible |
| **AWS Cloud Practitioner** | Amazon | Utile si tu cibles offres AWS / multi-cloud | Alternative ou complément AZ-900 |
| **SC-900** — Security, Compliance, Identity Fundamentals | Microsoft | Banque, assurance, SaaS B2B (RGPD) | Si secteurs régulés visés |

### Niveau 2 — Associate / rôle intermédiaire (1–2 mois)

| Certification | Éditeur | Intérêt marché FR | Quand la passer |
|---------------|---------|-------------------|-----------------|
| **AZ-204** — Azure Developer Associate | Microsoft | Crédible « lead .NET cloud » avant archi | Après AZ-900, si tu pousses Azure |
| **AWS Solutions Architect – Associate** | Amazon | Standard ESN ; cohérent avec ton passé AWS | Si offres AWS dominent ta veille |
| **CKAD** — Certified Kubernetes Application Developer | CNCF | Plus léger que CKA ; colle à **K8s prod ELA** | **Moyen terme** — différenciant PME/éditeur |

### Niveau 3 — Expert / architecte (2–4 mois, gros investissement)

| Certification | Éditeur | Intérêt marché FR | Quand la passer |
|---------------|---------|-------------------|-----------------|
| **AZ-305** — Azure Solutions Architect Expert | Microsoft | **Référence** pour intitulé « architecte solution » côté Microsoft | Après AZ-204 + expérience archi documentée (ADR, étude de cas) |
| **AWS Solutions Architect – Professional** | Amazon | Équivalent AWS ; moins prioritaire si stack Azure/.NET | Si pivot offres AWS |
| **CKA** — Certified Kubernetes Administrator | CNCF | ESN DevOps / plateforme ; moins utile que CKAD pour **architecte applicatif** | Seulement si tu vises rôle plateforme/SRE |

**Recommandation séquencée :** `AZ-900` → (travail + ADR/C4) → `CKAD` ou `AZ-204` → plus tard `AZ-305` si tu vises ESN ou clients Azure exigeants.

---

## Certifications architecture & méthodes

| Certification / titre | Durée / coût typique | Valeur FR pour « architecte solution » | Commentaire |
|----------------------|----------------------|----------------------------------------|-------------|
| **TOGAF® Foundation** (The Open Group) | ~1 semaine prep + examen | **Moyenne–haute** en ESN, banque, industrie | Vocabulaire entreprise ; peu demandé en startup produit |
| **TOGAF® Certified** | Plus long | Idem, niveau supérieur | ROI seulement si tu cibles grands comptes |
| **ArchiMate® Foundation** | Court | Faible–moyenne | Souvent couplé TOGAF ; rare en offres pure tech |
| **Documented architecture** (C4, ADR, portfolio) | Temps perso | **Haute** partout | Non certifiant mais souvent **plus convaincant** qu’un TOGAF seul en entretien produit |

**Pragmatique :** pour ton profil **Tech Lead SaaS**, investir d’abord dans **C4 + ADR publics** ([training.md](training.md)) ; ajouter **TOGAF Foundation** si >30 % des offres visées le mentionnent (veille LinkedIn).

---

## Certifications agilité & encadrement

| Certification | Intérêt | Priorité |
|---------------|---------|----------|
| **PSM I** (Professional Scrum Master) | Scrum.org — très cité en FR, pas cher | **Moyenne** — crédibilise le côté lead |
| **PSPO I** (Product Owner) | Moins central pour profil technique | Basse |
| **SAFe®** (SA, SPC…) | Grands groupes / industrie | Basse sauf ciblage explicite |
| **ITIL® 4 Foundation** | ESN, run / infra | Basse pour architecte applicatif |
| **Management 3.0 / Facilitation** | Soft skills lead | Optionnel, non ATS |

**PSM I** : bon ratio coût/bénéfice si tu manques de « labels » méthode sur le CV.

---

## Sécurité & conformité (niche mais différenciante)

| Certification | Contexte FR | Priorité |
|---------------|-------------|----------|
| **AZ-500** — Azure Security Engineer | SaaS multi-tenant, données clients | Moyenne si tu assumes la sécu chez ELA |
| **Certificat CNIL / DPO** (formation, pas toujours certif) | RGPD, SaaS B2B France | Lecture + formation courte ; rarement obligatoire pour archi dev |
| **ISO 27001** lead implementer | Grands comptes | Faible ROI sauf secteur régulé |

Utile en **entretien** de cadrer RGPD / hébergement France (OVH) sans certif lourde.

---

## Diplômes & titres RNCP (long terme)

Pour combler l’écart **BAC+4 concepteur** vs **titre ingénieur** exigé par certains RH :

| Parcours | Durée | Coût | ROI marché FR |
|----------|-------|------|----------------|
| **VAE** vers titre ingénieur informatique | 6–18 mois (montage dossier) | Frais modérés | **Variable** — débloque filtres RH stricts ; lourd administrativement |
| **Mastère spécialisé** « Architecte logiciel » / « Manager de projets IT » (CESI, ENI continue, écoles d’ingénieurs…) | 12–24 mois | Élevé (CPF + reste à charge) | **Moyen** en recherche active ; mieux en transition longue |
| **DU / MSc** Architecte d’entreprise ou cloud (université, 6–12 mois) | 6–12 mois | Moyen | Complément TOGAF ; peu de filtre ATS automatique |
| **Titre professionnel RNCP** niveau 6–7 (ex. administrateur système, chef de projet SI) | Plusieurs mois | CPF | **Faible** pour ton niveau d’expérience actuel |

**Avis pour ton profil :** à **10 ans d’XP** et en poste **Tech Lead**, un **mastère long** a un ROI faible vs **certifs cloud + preuves d’architecture**. Réserver la **VAE ingénieur** si tu constates des **refus systématiques** sur le seul critère diplôme (grands groupes, fonction publique).

---

## Certifications .NET / Microsoft (développement)

| Certification | Statut | Intérêt |
|---------------|--------|---------|
| **AZ-204**, **AZ-305** | Actives | Voir cloud ci-dessus |
| Anciens **MCSD / MCSA** | Retirés | Ne plus viser |
| **Microsoft Certified: DevOps Engineer Expert (AZ-400)** | Active | Pertinent si tu pousses CI/CD + GitLab/K8s ; secondaire vs AZ-305 |

Pas de certif Microsoft « .NET developer » moderne équivalente au MCSA ; la crédibilité .NET passe par **l’expérience + GitHub + entretien**.

---

## Matrice priorité (pour toi)

| Priorité | Action | Effort | Impact ATS / entretien |
|----------|--------|--------|------------------------|
| **P0** | Aligner CV LinkedIn + PDF sur mots-clés (sans certif) | Faible | Très haut |
| **P1** | **AZ-900** ou **AWS Cloud Practitioner** | 1–2 sem. | Haut (mots-clés cloud) |
| **P1** | **C4 + 3 ADR** (portfolio / lab) | 1–2 mois | Très haut (archi produit) |
| **P2** | **CKAD** | 1–2 mois | Moyen–haut (K8s, SaaS) |
| **P2** | **PSM I** | 1 sem. | Moyen (lead / agile) |
| **P3** | **AZ-204** puis **AZ-305** | 3–6 mois | Haut en ESN / Azure shops |
| **P3** | **TOGAF Foundation** | 2–4 sem. | Moyen ESN / banque |
| **P4** | Mastère / VAE ingénieur | Long | Situatif |

---

## À éviter (faible ROI pour ton objectif)

- Certifications **trop généralistes** ou datées (ITIL seul, anciens MS cert dev)
- **Multiples certifs fondation** en parallèle (AWS CP + AZ-900 + GCP Digital Leader…) — une suffit
- **CKA** avant besoin plateforme réel
- **Mastère payant** en pleine recherche d’emploi sans ciblage employeur précis
- Certifs **IA génériques** (« prompt engineer ») — peu crédibles pour architecte ; préférer POC RAG documenté ([portfolio-projects.md](portfolio-projects.md))

---

## Financement (France)

- **CPF** : AZ-900, AWS CP, PSM I, TOGAF, CKAD souvent éligibles via organismes (Vérifier sur [Mon Compte Formation](https://www.moncompteformation.gouv.fr/)).
- **OPCO / employeur** : si ELA Software finance la montée en compétence cloud/archi — à demander en entretien annuel.
- **Coût examens** : prévoir 100–300 € par cert Microsoft/AWS ; TOGAF plus cher.

---

## Où l’afficher

| Support | Quoi mettre |
|---------|-------------|
| **LinkedIn** section « Licences et certifications » | Certifs passées avec ID ; pas les « en cours » trop longtemps |
| **CV PDF** | Ligne « Certifications » sous compétences ; diplôme ENI + certifs cloud |
| **Site portfolio** | Optionnel : pas obligatoire ; diplôme déjà dans Resume |
| **Entretien** | Certif = vocabulaire ; détailler **ELA Build** et **trade-offs** en priorité |

---

## Veille offres (mots-clés à tracker)

Lors de la veille hebdo ([market-watch.md](market-watch.md)), compter la fréquence de :

- `certification Azure` / `AZ-305` / `AZ-900`
- `certification AWS`
- `Kubernetes` / `CKA` / `CKAD`
- `TOGAF`
- `Scrum` / `PSM`
- `titre ingénieur` / `bac+5`
- `architecte solution` vs `architecte technique` vs `lead technique`

Ajuster la roadmap certifs selon **tes offres cibles**, pas selon le catalogue complet éditeurs.

---

## Liens

- [Formation & études](training.md) — parcours compétences 6–12 mois
- [Veille marché](market-watch.md) — sources et rituel
- [SEO & ATS](market-seo.md) — mots-clés CV / site
- [Projets portfolio](portfolio-projects.md) — preuves complémentaires aux certifs

---

*Revue : marché FR tech 2025–2026, profil Tech Lead .NET SaaS, objectif architecte solution. À mettre à jour si la veille montre un éditeur cloud dominant dans tes offres.*
