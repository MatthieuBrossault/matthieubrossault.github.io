const FEATURED_COMPANIES = ['ELA Software', 'Aviv Group', 'Onepoint (Bolloré)'];

function firstSentence(text) {
  const m = String(text).match(/^[^.]+\./);
  return m ? m[0] : text;
}

export function shapeWebsiteExperience(items, legacyLine, locale) {
  const byCompany = new Map(items.map((e) => [e.company, e]));

  const featured = FEATURED_COMPANIES.map((c) => byCompany.get(c))
    .filter(Boolean)
    .map((exp, i) => {
      const { dossier: _d, stack: _s, ...rest } = exp;
      return {
        ...rest,
        summary: i === 0 ? exp.summary : firstSentence(exp.summary),
        highlights: (exp.highlights ?? []).slice(0, i === 0 ? 2 : 1),
      };
    });

  if (legacyLine) {
    featured.push({
      role: locale === 'fr' ? 'Parcours antérieur' : 'Earlier career',
      company: '—',
      location: '',
      period: '',
      summary: legacyLine,
      highlights: [],
      legacy: true,
    });
  }

  return featured;
}
