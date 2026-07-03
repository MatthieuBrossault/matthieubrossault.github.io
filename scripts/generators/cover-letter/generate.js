import { join } from 'node:path';
import { loadGeneratorConfig, loadProfile } from '../lib/data.js';
import { buildFilename, ensureOutputDir } from '../lib/output.js';
import {
  createPdfWriter,
  finishPdf,
  writeBody,
  writeBullets,
  writeHeading,
  writeTitle,
} from '../lib/pdf.js';
import { displayName } from '../lib/utils.js';

function buildCoverLetterBody({ locale, config, profile, input }) {
  const loc = locale === 'en' ? 'en' : 'fr';
  const { company, role, notes, jobUrl } = input;
  const topExp = profile.experience.items[0];
  const keywords = config.atsKeywords[loc].slice(0, 8).join(', ');

  if (loc === 'fr') {
    const paragraphs = [
      `Je me permets de vous adresser ma candidature pour le poste de **${role}** au sein de **${company}**.`,
      `${config.professionalSummary[loc]}`,
      `Actuellement ${topExp.role} chez ${topExp.company}, j'interviens sur ${topExp.summary.split('.')[0].toLowerCase()}. Mon expérience couvre l'architecture microservices, le SaaS multi-tenant, le cloud (Azure/AWS, Kubernetes) et l'encadrement technique en contexte agile.`,
      `Compétences alignées avec votre recherche : ${keywords}. ${config.availability[loc]}.`,
    ];
    if (notes) paragraphs.push(notes);
    if (jobUrl) paragraphs.push(`Référence offre : ${jobUrl}`);
    return paragraphs.map((p) => p.replace(/\*\*/g, ''));
  }

  const paragraphs = [
    `I am writing to apply for the **${role}** position at **${company}**.`,
    config.professionalSummary.en,
    `As ${topExp.role} at ${topExp.company}, I work on ${topExp.summary.split('.')[0].toLowerCase()}. My background spans microservices architecture, multi-tenant SaaS, cloud platforms (Azure/AWS, Kubernetes), and technical leadership in agile teams.`,
    `Skills relevant to your role: ${keywords}. ${config.availability.en}.`,
  ];
  if (notes) paragraphs.push(notes);
  if (jobUrl) paragraphs.push(`Job reference: ${jobUrl}`);
  return paragraphs.map((p) => p.replace(/\*\*/g, ''));
}

const LABELS = {
  fr: { subject: 'Objet', place: 'Nantes', datePrefix: 'Nantes, le' },
  en: { subject: 'Subject', place: 'Nantes', datePrefix: 'Nantes,' },
};

function formatDate(locale) {
  const d = new Date();
  if (locale === 'en') {
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function generateCoverLetter({ locale = 'fr', input = {} } = {}) {
  const config = loadGeneratorConfig();
  const profile = loadProfile(locale);
  const loc = locale === 'en' ? 'en' : 'fr';
  const labels = LABELS[loc];

  const company = input.company?.trim();
  const role = input.role?.trim();
  if (!company || !role) {
    throw new Error(
      loc === 'fr'
        ? 'Arguments requis : --company et --role (ex. npm run generate:cover-letter -- --company Acme --role "Architecte solution")'
        : 'Required: --company and --role (e.g. npm run generate:cover-letter -- --company Acme --role "Solution Architect")'
    );
  }

  const name = displayName(profile.identity, false);
  const recipient = input.recruiter?.trim() || config.coverLetter.defaultRecipient[loc];
  const subject =
    loc === 'fr'
      ? `Candidature — ${role} — ${company}`
      : `Application — ${role} — ${company}`;

  const dir = ensureOutputDir('cover-letter');
  const filename = buildFilename({
    prefix: 'Lettre_motivation',
    parts: [company, role],
    locale: loc,
  });
  const outputPath = join(dir, filename);

  const doc = createPdfWriter(outputPath);

  writeBody(doc, `${labels.datePrefix} ${formatDate(loc)}`, { align: 'right' });
  doc.moveDown(0.5);
  writeTitle(doc, name);
  writeBody(doc, `${profile.identity.email} | ${profile.identity.location}`);
  doc.moveDown(0.8);
  writeBody(doc, recipient);
  writeBody(doc, company);
  doc.moveDown(0.5);
  writeHeading(doc, labels.subject);
  writeBody(doc, subject);
  doc.moveDown(0.4);

  const paragraphs = buildCoverLetterBody({ locale: loc, config, profile, input: { company, role, notes: input.notes, jobUrl: input.jobUrl } });
  for (const p of paragraphs) {
    writeBody(doc, p);
    doc.moveDown(0.2);
  }

  doc.moveDown(0.5);
  writeBody(doc, config.coverLetter.signature[loc]);
  writeBody(doc, name);

  const fitBullets =
    loc === 'fr'
      ? [
          `${config.headline.fr}`,
          `Expérience actuelle : ${profile.experience.items[0].role}, ${profile.experience.items[0].company}`,
          config.availability.fr,
        ]
      : [
          config.headline.en,
          `Current role: ${profile.experience.items[0].role}, ${profile.experience.items[0].company}`,
          config.availability.en,
        ];
  doc.moveDown(0.3);
  writeBullets(doc, fitBullets);

  await finishPdf(doc);
  return outputPath;
}
