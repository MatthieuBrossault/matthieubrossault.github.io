import { join } from 'node:path';
import { loadGeneratorConfig, loadProfile } from '../lib/data.js';
import { buildFilename, ensureOutputDir } from '../lib/output.js';
import {
  CONTENT_WIDTH,
  LAYOUT,
  createPdfWriter,
  drawHeaderBanner,
  finishPdf,
  writeBody,
  writeBullets,
  writeDossierExperienceBlock,
  writeKeywordTags,
  writeSectionTitle,
  writeSubtitle,
} from '../lib/pdf.js';
import { THEME } from '../lib/theme.js';
import { displayName } from '../lib/utils.js';

function writeSavoirFaireBlock(doc, labels, savoirFaire, x, width) {
  const blocks = [
    ['conception', labels.conception],
    ['developpement', labels.developpement],
    ['communication', labels.communication],
    ['deploiement', labels.deploiement],
    ['maintenance', labels.maintenance],
  ];
  for (const [key, title] of blocks) {
    doc.fillColor(THEME.primary).font('bold').fontSize(8.5);
    doc.text(title, x, doc.y, { width });
    doc.moveDown(0.05);
    writeBullets(doc, savoirFaire[key], { x, width, size: 8, max: 8 });
  }
}

function writeTechnicalGrid(doc, categories, x, width) {
  for (const cat of categories) {
    const y0 = doc.y;
    doc.save();
    doc.rect(x, y0, 3, 11).fill(THEME.accent);
    doc.restore();
    doc.fillColor(THEME.primary).font('bold').fontSize(8);
    doc.text(cat.title, x + 8, y0, { width: width - 12 });
    doc.fillColor(THEME.text).font('regular').fontSize(7.5);
    doc.text(cat.items, x + 8, doc.y + 1, { width: width - 12, lineGap: 0.3 });
    doc.moveDown(0.12);
  }
}

export async function generateDossier({ locale = 'fr', anonymize = false } = {}) {
  const config = loadGeneratorConfig();
  const profile = loadProfile(locale);
  const dossier = profile.dossier;
  const labels = dossier.labels;
  const loc = locale === 'en' ? 'en' : 'fr';
  const name = displayName(profile.identity, anonymize);

  const dir = ensureOutputDir('dossier');
  const filename = buildFilename({
    prefix: anonymize ? 'Dossier_competences' : 'Matthieu_Brossault_Dossier_competences',
    parts: anonymize ? ['anonyme'] : [config.targetRole[loc]],
    locale: loc,
  });
  const outputPath = join(dir, filename);

  const doc = createPdfWriter(outputPath);
  const x = LAYOUT.margin;
  const w = CONTENT_WIDTH;

  drawHeaderBanner(doc, {
    name,
    headline: `${profile.identity.yearsExperience} ${dossier.headerYears} — ${config.targetRole[loc]}`,
    contactLines: [
      profile.identity.email,
      profile.identity.location,
      config.availability[loc],
    ],
  });

  writeSectionTitle(doc, labels.formations, x, w);
  for (const edu of profile.education.items) {
    writeBody(doc, `${edu.period} — ${edu.title}`, { x, width: w, size: 9, afterGap: 0.08 });
  }

  writeSectionTitle(doc, labels.competencesMetier, x, w);
  writeSubtitle(doc, labels.savoirEtre);
  doc.save();
  doc.roundedRect(x, doc.y, w, 22, 2).fill(THEME.surfaceAlt);
  doc.restore();
  writeBody(doc, dossier.savoirEtre.join(', '), { x: x + 8, width: w - 16, size: 8.5, afterGap: 0.15 });

  writeSubtitle(doc, labels.savoirFaire);
  writeSavoirFaireBlock(doc, labels, dossier.savoirFaire, x, w);

  writeSubtitle(doc, labels.secteurs);
  writeBullets(doc, dossier.secteurs, { x, width: w, size: 8, max: 12 });

  writeSubtitle(doc, labels.langues);
  writeBody(doc, profile.languagesSpoken, { x, width: w, size: 8.5, afterGap: 0.15 });

  writeSectionTitle(doc, labels.competencesTechniques, x, w);
  writeTechnicalGrid(doc, dossier.technicalCategories, x, w);

  writeKeywordTags(doc, config.atsKeywords[loc].slice(0, 12), { x, width: w });
  doc.moveDown(0.2);

  for (const exp of profile.experience.items) {
    writeDossierExperienceBlock(doc, exp, exp.dossier, labels, { x, width: w });
  }

  await finishPdf(doc);
  return outputPath;
}
