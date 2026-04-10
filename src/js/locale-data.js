import enData from '../data/en.json';
import frData from '../data/fr.json';
import enDetail from '../data/profile-detail.en.json';
import frDetail from '../data/profile-detail.fr.json';

export function mergeProfile(base, detail) {
  return {
    ...base,
    education: detail.education ?? base.education,
    experience: detail.experience ?? base.experience,
    skills: {
      ...base.skills,
      ...(detail.skills || {}),
      items: detail.skills?.items?.length ? detail.skills.items : base.skills?.items ?? [],
    },
    resume: {
      ...base.resume,
      ...(detail.resume || {}),
    },
    skillCategories: detail.skillCategories ?? [],
  };
}

export const localeData = {
  en: mergeProfile(enData, enDetail),
  fr: mergeProfile(frData, frDetail),
};

export { enData, frData };
