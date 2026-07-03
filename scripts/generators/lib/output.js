import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { getRootDir } from './data.js';

export function slugify(text) {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

export function dateStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

export function ensureOutputDir(subfolder) {
  const dir = join(getRootDir(), 'generated', subfolder);
  mkdirSync(dir, { recursive: true });
  return dir;
}

export function buildFilename({ prefix, parts, locale, ext = 'pdf' }) {
  const slug = parts.filter(Boolean).map(slugify).join('_');
  return `${prefix}_${slug}_${locale.toUpperCase()}_${dateStamp()}.${ext}`;
}
