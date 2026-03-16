# Style & algorithm-friendly discoverability

Two audiences: **humans** (recruiters, hiring managers) and **systems** (ATS, recruiter AI, search). The site should work for both.

---

## Style — inspiration from current portfolios

References and trends from developer portfolios (e.g. [Max Kruijs Voorberge](https://maxkruijsvoorberge.dev/projects/portfolio-website), [Jawon Winbush](https://jmwinbush.com/), [Shaun Milosevich](https://shaunmilo.com/)):

| Aspect | Common choices (minimal effort) |
|--------|---------------------------------|
| **Aesthetic** | Minimal, often dark; clear hierarchy, little decoration. |
| **Typography** | Monospace for labels/metadata, clean sans for body (e.g. JetBrains Mono + Inter). Avoid generic “AI” font stacks. |
| **Layout** | Fixed-width or constrained content; readable line length. Mobile-first. |
| **Motion** | Optional: light scroll or hover; skip heavy animation to keep build simple. |
| **Performance** | Fast load, good Core Web Vitals — also helps SEO and perceived quality. |

**Takeaway:** Simple, readable, fast. The site can be a first “project” that demonstrates front-end craft without extra complexity.

---

## Recruitment is algorithm-first

Applications are often **parsed, scored, and filtered by ATS or recruiter AI** before a human sees them ([ATS in 2026](https://www.atscvchecker.pro/blog/how-ats-systems-work-2026/), [ranking logic](https://www.resumly.ai/blog/how-hiring-algorithms-decide-candidate-ranking-a-deep-dive)). Even when rejection is manual, systems still **parse and rank** candidates; high volume makes “who gets reviewed” depend on that pipeline.

Implications for the portfolio:

1. **Content may be scraped or imported** — LinkedIn, job boards, or direct URLs. Parsers expect clear structure: roles, dates, skills, outcomes.
2. **Keywords and phrasing** matter for semantic matching (e.g. “web engineer”, “.NET”, “Angular”, “architecture”).
3. **Structured data** helps both search engines and parsing tools; it can improve parsing accuracy and speed ([Resumly on structured data](https://www.resumly.ai/blog/embedding-structured-data-markup-in-online-resumes-for-seo), [implementing schema](https://www.resumly.ai/blog/implementing-structured-data-tags-to-improve-resume-parsing)).

---

## Making the site “parseable” and findable

Without adding backend or heavy tooling:

- **Semantic HTML** — use headings, lists, sections (`<section>`, `<h2>`, `<ul>`) so roles, skills, and projects are easy to identify.
- **Explicit sections** — e.g. “Experience”, “Skills”, “Projects” with consistent labels; avoid vague or purely visual grouping.
- **Structured data (JSON-LD)** — embed schema.org in the page (e.g. `Person`, job title, `sameAs` for LinkedIn/GitHub, skills, `WorkExperience`, `Project`). One block per page or one for the whole single-page site. [JSON Resume](https://jsonresume.org/) is an option if you want a standard CV schema; can be embedded or linked.
- **SEO basics** — unique `<title>`, `<meta name="description">`, sensible headings. Helps Google and any tool that indexes the URL.
- **Clear, scannable copy** — role names, tech names, and outcomes in plain text (not only in images or complex layouts).

**Minimal implementation:** semantic HTML + one JSON-LD block (Person + main facts). Add more schema (e.g. per project) only if you want better richness in search or parsing.

---

## Summary

| Audience | What to do |
|----------|------------|
| **Human** | Clear layout, fast load, readable typography, obvious sections. |
| **Algorithm / ATS** | Semantic HTML, clear section labels, keywords, optional JSON-LD (Person, experience, skills). |

Style = minimal, professional, performant. Discoverability = structure + keywords + optional structured data so the site can be parsed and ranked, not only viewed.
