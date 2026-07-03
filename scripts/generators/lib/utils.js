import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const FONTS_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../../node_modules/dejavu-fonts-ttf/ttf'
);

export const FONTS = {
  regular: join(FONTS_DIR, 'DejaVuSans.ttf'),
  bold: join(FONTS_DIR, 'DejaVuSans-Bold.ttf'),
};

export function registerFonts(doc) {
  doc.registerFont('regular', FONTS.regular);
  doc.registerFont('bold', FONTS.bold);
}

export function formatKeywords(keywords, max = 18) {
  return keywords.slice(0, max).join(' · ');
}

export function displayName(identity, anonymize = false) {
  if (anonymize) {
    return `${identity.firstName.charAt(0)}. ${identity.lastName.charAt(0)}.`;
  }
  return `${identity.firstName} ${identity.lastName}`;
}

export function parseArgs(argv) {
  const args = { locale: 'fr', anonymize: false };
  const positional = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--locale' || arg === '-l') {
      args.locale = argv[++i] === 'en' ? 'en' : 'fr';
      args.localeExplicit = true;
    } else if (arg === '--anonymize' || arg === '-a') {
      args.anonymize = true;
    } else if (arg === '--company' || arg === '-c') {
      args.company = argv[++i];
    } else if (arg === '--role' || arg === '-r') {
      args.role = argv[++i];
    } else if (arg === '--recruiter') {
      args.recruiter = argv[++i];
    } else if (arg === '--notes' || arg === '-n') {
      args.notes = argv[++i];
    } else if (arg === '--job-url') {
      args.jobUrl = argv[++i];
    } else if (!arg.startsWith('-')) {
      positional.push(arg);
    }
  }

  args.positional = positional;
  return args;
}
