#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const generatedDir = join(root, 'generated', 'cv');
const publicDir = join(root, 'public', 'cv');

function findLatestPdf(locale) {
  if (!existsSync(generatedDir)) return null;
  const tag = `_${locale.toUpperCase()}_`;
  const matches = readdirSync(generatedDir)
    .filter((f) => f.endsWith('.pdf') && f.includes(tag))
    .sort()
    .reverse();
  return matches[0] ?? null;
}

function syncLocale(locale) {
  const source = findLatestPdf(locale);
  if (!source) return null;

  const stableName = `latest-${locale}.pdf`;
  copyFileSync(join(generatedDir, source), join(publicDir, stableName));
  return { href: `/cv/${stableName}`, download: source };
}

mkdirSync(publicDir, { recursive: true });

const manifest = {};
for (const locale of ['fr', 'en']) {
  const entry = syncLocale(locale);
  if (entry) manifest[locale] = entry;
}

writeFileSync(join(publicDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

if (Object.keys(manifest).length) {
  console.log('Synced CVs to public/cv/:', Object.keys(manifest).join(', '));
} else {
  console.warn('No CV PDF found in generated/cv/ — run npm run generate:cv:all first.');
}
