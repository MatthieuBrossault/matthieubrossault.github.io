import { join } from 'node:path';
import { buildCvContent } from '../lib/cv-content.js';
import { loadGeneratorConfig, loadProfile } from '../lib/data.js';
import { buildFilename, ensureOutputDir } from '../lib/output.js';
import {
  LAYOUT,
  PAGE_W,
  createPdfWriter,
  drawHeaderBanner,
  finishPdf,
  rightColumnWidth,
  rightColumnX,
  writeBody,
  writeExperienceCard,
  writeKeywordTags,
  writeSectionTitle,
} from '../lib/pdf.js';
import { displayName } from '../lib/utils.js';

const LABELS = {
  fr: {
    profile: 'Profil',
    skills: 'Compétences',
    keywords: 'Mots-clés',
    experience: 'Expérience',
    education: 'Formation',
    languages: 'Langues',
    earlier: 'Parcours antérieur',
  },
  en: {
    profile: 'Profile',
    skills: 'Skills',
    keywords: 'Keywords',
    experience: 'Experience',
    education: 'Education',
    languages: 'Languages',
    earlier: 'Earlier career',
  },
};

export async function generateCv({ locale = 'fr', anonymize = false } = {}) {
  const config = loadGeneratorConfig();
  const profile = loadProfile(locale);
  const content = buildCvContent(locale);
  const labels = LABELS[locale === 'en' ? 'en' : 'fr'];
  const loc = locale === 'en' ? 'en' : 'fr';
  const name = displayName(profile.identity, anonymize);

  const dir = ensureOutputDir('cv');
  const filename = buildFilename({
    prefix: anonymize ? 'CV' : 'Matthieu_Brossault_CV',
    parts: [config.targetRole[loc]],
    locale: loc,
  });
  const outputPath = join(dir, filename);

  const doc = createPdfWriter(outputPath, { singlePage: true });
  const rx = rightColumnX(LAYOUT);
  const rw = rightColumnWidth(LAYOUT, PAGE_W);
  const lx = LAYOUT.margin;
  const lw = LAYOUT.leftWidth;

  drawHeaderBanner(doc, {
    name,
    headline: config.headline[loc],
    contactLines: [profile.identity.email, content.availability],
  });

  const bodyY = doc.y;

  doc.y = bodyY;
  writeSectionTitle(doc, labels.profile, lx, lw);
  writeBody(doc, content.summary, { x: lx, width: lw, size: 7.2, lineGap: 0.3, afterGap: 0.1 });

  writeSectionTitle(doc, labels.skills, lx, lw);
  writeBody(doc, content.skills.join(' · '), { x: lx, width: lw, size: 7, lineGap: 0.3, afterGap: 0.08 });

  writeSectionTitle(doc, labels.keywords, lx, lw);
  writeKeywordTags(doc, content.keywords, { x: lx, width: lw });

  writeSectionTitle(doc, labels.education, lx, lw);
  if (content.education) {
    writeBody(doc, `${content.education.period} — ${content.education.title}`, {
      x: lx,
      width: lw,
      size: 7,
      afterGap: 0.06,
    });
  }

  writeSectionTitle(doc, labels.languages, lx, lw);
  writeBody(doc, content.languages, { x: lx, width: lw, size: 7, afterGap: 0 });

  doc.y = bodyY;
  writeSectionTitle(doc, labels.experience, rx, rw);

  for (const exp of content.featured) {
    writeExperienceCard(doc, exp, { x: rx, width: rw, compact: false });
  }

  writeSectionTitle(doc, labels.earlier, rx, rw);
  writeBody(doc, content.legacyLine, { x: rx, width: rw, size: 7, color: '#4b5563', afterGap: 0 });

  await finishPdf(doc);
  return outputPath;
}
