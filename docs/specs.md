# Solution specs

Single reference for what this solution must do and how it is constrained. Details live in the linked docs.

---

## Purpose

- **Product:** Portfolio website for a web developer (web engineer / architect).
- **Use:** Recruitment and job search; sell the developer; site acts as CV.
- **Audience:** Recruiters and hiring managers, primarily in **France**. Content in **English and French**, default from browser/location.
- **Proof:** The site showcases the developer; linked **projects** showcase tech skills and business impact.

Ref: [01-overview](01-overview.md)

---

## Constraints

- Single developer; minimal effort and cost (build, maintain, deploy, host).
- Prefer static, free-tier hosting, no backend/CMS.

Ref: [01-overview](01-overview.md#constraints)

---

## Scope

| Area | Spec |
|------|------|
| **Site structure** | vCard-style layout: sidebar (identity + contacts + socials) + main tabs: About, Resume (experience + skills), Portfolio, Contact. Language switcher in navbar. |
| **Projects** | List/cards with context, stack, highlights, links. Start: single page (Option A); optional detail pages later. |
| **Languages** | EN + FR; default from `Accept-Language` or location; optional switcher + localStorage. |
| **Style** | vCard template CSS (MIT, codewithsadee) + small overrides; Poppins + Ion Icons; optional JSON-LD. |
| **Discoverability** | SEO basics; structure and keywords for algorithm/ATS parsing; optional structured data. |

Ref: [02-website-architecture](02-website-architecture.md), [03-style-and-discoverability](03-style-and-discoverability.md)

---

## Content source

- Copy and project data: static (markdown/JSON in repo). Profile data: [04-profile-data](04-profile-data.md).

---

## Out of scope (for now)

- Blog, testimonials, contact form with backend.
- CMS, database, auth, paid hosting (unless explicitly added later).

---

## Acceptance (high level)

- [ ] Site is live at chosen URL.
- [ ] Content in EN and FR; default follows browser/location.
- [ ] Core sections present (hero, about, skills, experience, projects, contact).
- [ ] At least profile + GitHub projects reflected; LinkedIn filled where applicable.
- [ ] Fast load; semantic structure; optional JSON-LD.
- [x] Deployment and costs documented in [deployment-costs](deployment-costs.md) (chosen: GitHub Pages user site, Actions on `master`); progress in [progress](progress.md).
