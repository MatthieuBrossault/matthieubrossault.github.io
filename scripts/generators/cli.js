#!/usr/bin/env node
import { generateCoverLetter } from './cover-letter/generate.js';
import { generateCv } from './cv/generate.js';
import { generateDossier } from './dossier/generate.js';
import { parseArgs } from './lib/utils.js';

const USAGE = `Usage:
  node scripts/generators/cli.js cv [--locale fr|en] [--anonymize]
  node scripts/generators/cli.js dossier [--locale fr|en] [--anonymize]
  node scripts/generators/cli.js cover-letter --company <name> --role <title> [--locale fr|en] [--recruiter "..."] [--notes "..."] [--job-url <url>]
  node scripts/generators/cli.js all [--locale fr|en]

npm scripts:
  npm run generate:cv
  npm run generate:dossier
  npm run generate:cover-letter -- --company Acme --role "Architecte solution"
  npm run generate:all
`;

async function runLocalePair(fn, opts) {
  const paths = [];
  for (const locale of ['fr', 'en']) {
    if (opts.singleLocale && locale !== opts.locale) continue;
    paths.push(await fn({ ...opts, locale }));
  }
  return paths;
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);

  if (!command || command === 'help' || command === '--help') {
    console.log(USAGE);
    process.exit(0);
  }

  const baseOpts = {
    locale: args.locale,
    anonymize: args.anonymize,
    singleLocale: true,
  };

  try {
    let paths = [];

    switch (command) {
      case 'cv':
        paths = await runLocalePair(generateCv, baseOpts);
        break;
      case 'dossier':
        paths = await runLocalePair(generateDossier, baseOpts);
        break;
      case 'cover-letter':
        paths = await runLocalePair(generateCoverLetter, {
          ...baseOpts,
          input: {
            company: args.company,
            role: args.role,
            recruiter: args.recruiter,
            notes: args.notes,
            jobUrl: args.jobUrl,
          },
        });
        break;
      case 'all': {
        const locales = args.localeExplicit ? [args.locale] : ['fr', 'en'];
        for (const locale of locales) {
          paths.push(await generateCv({ locale, anonymize: args.anonymize }));
          paths.push(await generateDossier({ locale, anonymize: args.anonymize }));
        }
        console.log('Note: cover-letter requires --company and --role; skipped in "all".');
        break;
      }
      default:
        console.error(`Unknown command: ${command}\n\n${USAGE}`);
        process.exit(1);
    }

    for (const p of paths) {
      console.log(`Generated: ${p}`);
    }
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
}

main();
