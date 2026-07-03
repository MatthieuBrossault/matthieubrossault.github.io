import enTranslations from '../translations/en.json';
import frTranslations from '../translations/fr.json';
import enProfile from '../data/profile.en.json';
import frProfile from '../data/profile.fr.json';

export function mergeSiteData(translations, profile, locale) {
  const { firstName, lastName, email, location, linkedin, github, personalSite } = profile.identity;
  const siteLabel = locale === 'fr' ? 'Site perso' : 'Portfolio';

  return {
    ...translations,
    hero: {
      ...translations.hero,
      title: `${firstName} ${lastName}`,
    },
    about: {
      ...translations.about,
      location,
    },
    contact: {
      ...translations.contact,
      email,
      links: [
        { label: 'LinkedIn', url: linkedin },
        { label: 'GitHub', url: github },
        { label: siteLabel, url: personalSite },
      ],
    },
    education: profile.education,
    experience: {
      items: profile.experience.items.map(({ dossier: _d, ...exp }) => exp),
    },
    skills: {
      items: profile.skills?.items ?? [],
    },
    resume: {
      ...translations.resume,
      ...profile.resume,
    },
    skillCategories: profile.skillCategories ?? [],
  };
}

export const localeData = {
  en: mergeSiteData(enTranslations, enProfile, 'en'),
  fr: mergeSiteData(frTranslations, frProfile, 'fr'),
};

export { enTranslations, frTranslations, enProfile, frProfile };
