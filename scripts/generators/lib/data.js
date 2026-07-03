import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const PROFILE_DIR = join(ROOT, 'src/data');
const GENERATORS_DIR = join(ROOT, 'scripts/generators');

export function getRootDir() {
  return ROOT;
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

export function loadGeneratorConfig() {
  return readJson(join(GENERATORS_DIR, 'generator-config.json'));
}

export function loadProfile(locale) {
  const loc = locale === 'en' ? 'en' : 'fr';
  return readJson(join(PROFILE_DIR, `profile.${loc}.json`));
}

/** Site-shaped profile: experience items without nested dossier blocks in timeline fields. */
export function loadSiteProfile(locale) {
  const profile = loadProfile(locale);
  return {
    ...profile,
    experience: {
      items: profile.experience.items.map(({ dossier: _d, ...exp }) => exp),
    },
  };
}

export function getDossierMeta(profile) {
  return profile.dossier;
}

export function getExperienceWithDossier(profile, company) {
  return profile.experience.items.find((e) => e.company === company);
}
