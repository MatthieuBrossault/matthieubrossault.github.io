import { loadGeneratorConfig, loadProfile } from './data.js';

const FEATURED_COMPANIES = ['ELA Software', 'Aviv Group', 'Onepoint (Bolloré)'];

const LEGACY_LINE = {
  fr: '2019–2025 — Rayonnance, Showroomprivé : .NET / MAUI, marketplace. 2014–2018 — Siemens, ISILOG, Intellia, Accenture.',
  en: '2019–2025 — Rayonnance, Showroomprivé: .NET / MAUI, marketplace. 2014–2018 — Siemens, ISILOG, Intellia, Accenture.',
};

function firstSentence(text) {
  const m = text.match(/^[^.]+\./);
  return m ? m[0] : text;
}

export function buildCvContent(locale) {
  const config = loadGeneratorConfig();
  const profile = loadProfile(locale);
  const loc = locale === 'en' ? 'en' : 'fr';

  const byCompany = new Map(profile.experience.items.map((e) => [e.company, e]));

  const featured = FEATURED_COMPANIES.map((c) => byCompany.get(c)).filter(Boolean);

  const summary = config.cvSummary?.[loc] ?? config.professionalSummary[loc];

  const skills = [
    'C# / .NET 8',
    'Microservices',
    'React / TypeScript',
    'PostgreSQL',
    'Kubernetes',
    'gRPC / CQRS',
    'Azure / AWS',
    'Architecture SaaS',
    'Agile / Scrum',
  ];

  return {
    summary,
    keywords: config.atsKeywords[loc].slice(0, 10),
    featured: featured.map((exp, i) => ({
      ...exp,
      summary: i === 0 ? firstSentence(exp.summary) : '',
      highlights: (exp.highlights ?? []).slice(0, i === 0 ? 2 : 1),
      stack: i === 0 ? exp.stack : undefined,
    })),
    legacyLine: LEGACY_LINE[loc],
    education: profile.education.items[0],
    skills,
    languages: profile.languagesSpoken,
    availability: config.availability[loc],
  };
}
