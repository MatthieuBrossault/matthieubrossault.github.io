import PDFDocument from 'pdfkit';
import { createWriteStream } from 'node:fs';
import { FONT, LAYOUT, THEME, pageWidth, rightColumnWidth, rightColumnX } from './theme.js';
import { registerFonts } from './utils.js';

const PAGE_W = pageWidth();
export const MARGIN = LAYOUT.margin;
export const CONTENT_WIDTH = PAGE_W - LAYOUT.margin * 2;

export function createPdfWriter(outputPath, { singlePage = false } = {}) {
  const doc = new PDFDocument({
    margin: LAYOUT.margin,
    size: 'A4',
    autoFirstPage: true,
    bufferPages: true,
  });
  registerFonts(doc);
  doc._singlePage = singlePage;
  doc.pipe(createWriteStream(outputPath));
  return doc;
}

export function finishPdf(doc) {
  return new Promise((resolve, reject) => {
    doc.on('end', resolve);
    doc.on('error', reject);
    doc.end();
  });
}

function pageBottom(doc) {
  return doc.page.height - LAYOUT.margin;
}

function canFit(doc, height = 12) {
  if (!doc._singlePage) return true;
  return doc.y + height <= pageBottom(doc);
}

function remainingHeight(doc) {
  return Math.max(0, pageBottom(doc) - doc.y);
}

function ensureSpace(doc, height) {
  if (doc._singlePage) return canFit(doc, height);
  if (doc.y + height > pageBottom(doc)) doc.addPage();
}

function textOpts(doc, options, x, w) {
  const base = {
    width: w,
    lineGap: options.lineGap ?? 1,
    align: options.align,
  };
  if (doc._singlePage) {
    base.height = remainingHeight(doc);
    base.ellipsis = true;
  }
  return base;
}

export function drawHeaderBanner(doc, { name, headline, contactLines }) {
  const y0 = LAYOUT.margin - 8;
  const h = LAYOUT.headerHeight;
  const x0 = LAYOUT.margin;
  const w = PAGE_W - LAYOUT.margin * 2;

  doc.save();
  doc.roundedRect(x0, y0, w, h, 4).fill(THEME.primary);
  doc.rect(x0, y0 + h - 4, w, 4).fill(THEME.accent);

  doc.fillColor(THEME.textLight).font('bold').fontSize(FONT.name);
  doc.text(name, x0 + 14, y0 + 14, { width: w - 28 });

  doc.font('regular').fontSize(FONT.headline).fillColor(THEME.accentSoft);
  doc.text(headline, x0 + 14, y0 + 40, { width: w - 28 });

  doc.font('regular').fontSize(FONT.contact).fillColor('#dbeafe');
  doc.text(contactLines.join('  ·  '), x0 + 14, y0 + 58, { width: w - 28 });

  doc.restore();
  doc.y = y0 + h + 10;
  doc.x = LAYOUT.margin;
}

export function writeSectionTitle(doc, text, x = LAYOUT.margin, width = CONTENT_WIDTH) {
  ensureSpace(doc, 22);
  const y = doc.y;
  doc.save();
  doc.rect(x, y, 3, 12).fill(THEME.accent);
  doc.fillColor(THEME.primary).font('bold').fontSize(FONT.section);
  doc.text(text.toUpperCase(), x + 8, y, { width: width - 8 });
  doc.restore();
  doc.y = y + 14;
  doc.moveDown(0.12);
}

export function writeBody(doc, text, options = {}) {
  if (!text || !canFit(doc, 8)) return;
  const x = options.x ?? LAYOUT.margin;
  const w = options.width ?? CONTENT_WIDTH;
  const size = options.size ?? FONT.body;
  const color = options.color ?? THEME.text;
  doc.fillColor(color).font('regular').fontSize(size);
  doc.text(text, x, doc.y, textOpts(doc, options, x, w));
  if (options.afterGap !== 0) doc.moveDown(options.afterGap ?? 0.18);
}

export function writeBullets(doc, items, options = {}) {
  if (!items?.length) return;
  const x = options.x ?? LAYOUT.margin;
  const w = options.width ?? CONTENT_WIDTH;
  const size = options.size ?? FONT.body;
  const max = options.max ?? 99;
  for (const item of items.slice(0, max)) {
    if (!canFit(doc, 9)) break;
    const y = doc.y;
    doc.circle(x + 3, y + 4, 1.5).fill(options.bulletColor ?? THEME.bullet);
    doc.fillColor(THEME.text).font('regular').fontSize(size);
    const opts = textOpts(doc, { lineGap: 0.5 }, x + 10, w - 10);
    doc.text(`• ${item}`, x + 10, y, opts);
    doc.moveDown(0.04);
  }
  doc.moveDown(0.06);
}

export function writeExperienceCard(doc, entry, { x, width, compact = false }) {
  if (!canFit(doc, 20)) return;

  if (compact) {
    doc.save();
    doc.rect(x, doc.y, 3, 22).fill(THEME.accent);
    doc.restore();
    doc.fillColor(THEME.primary).font('bold').fontSize(FONT.small);
    doc.text(`${entry.role} — ${entry.company}`, x + 8, doc.y, { width: width - 12 });
    doc.fillColor(THEME.textMuted).font('regular').fontSize(FONT.tag);
    doc.text(entry.period, x + 8, doc.y, { width: width - 12 });
    if (entry.summary && canFit(doc, 10)) {
      doc.fillColor(THEME.text).font('regular').fontSize(FONT.small);
      doc.text(entry.summary, x + 8, doc.y + 1, { width: width - 12, lineGap: 0.3 });
    }
    doc.moveDown(0.1);
    return;
  }

  const y0 = doc.y;
  doc.save();
  doc.rect(x, y0, width, 3).fill(THEME.primary);
  doc.restore();

  doc.fillColor(THEME.primary).font('bold').fontSize(7.8);
  doc.text(entry.role, x + 6, y0 + 5, { width: width - 12 });
  doc.fillColor(THEME.accent).font('bold').fontSize(7.2);
  doc.text(entry.company, x + 6, doc.y, { width: width - 12 });
  doc.fillColor(THEME.textMuted).font('regular').fontSize(7);
  doc.text(`${entry.period}  |  ${entry.location ?? ''}`, x + 6, doc.y + 1, { width: width - 12 });
  doc.moveDown(0.08);

  if (entry.summary) {
    writeBody(doc, entry.summary, { x: x + 4, width: width - 8, size: 7, afterGap: 0.05, lineGap: 0.3 });
  }
  if (entry.highlights?.length) {
    writeBullets(doc, entry.highlights, { x: x + 4, width: width - 8, size: 7, max: 2 });
  }
  if (entry.stack && canFit(doc, 10)) {
    writeBody(doc, entry.stack, { x: x + 4, width: width - 8, size: 6.5, color: THEME.textMuted, afterGap: 0.04 });
  }
  doc.moveDown(0.06);
}

export function writeKeywordTags(doc, keywords, { x, width }) {
  const tagH = 13;
  let cx = x;
  let cy = doc.y;

  doc.font('regular').fontSize(FONT.tag);
  for (const kw of keywords) {
    const tw = doc.widthOfString(kw) + 10;
    if (cx + tw > x + width) {
      cx = x;
      cy += tagH + 3;
    }
    doc.save();
    doc.roundedRect(cx, cy, tw, tagH, 2).fill(THEME.surfaceAlt);
    doc.fillColor(THEME.primary).text(kw, cx + 5, cy + 2, { lineBreak: false });
    doc.restore();
    cx += tw + 4;
  }
  doc.y = cy + tagH + 4;
}

export function writeDossierExperienceBlock(doc, exp, ext, labels, { x, width }) {
  ensureSpace(doc, 60);
  doc.moveDown(0.2);

  const y0 = doc.y;
  doc.save();
  doc.roundedRect(x, y0, width, 6, 2).fill(THEME.primary);
  doc.restore();
  doc.y = y0 + 10;

  const pad = 8;
  doc.fillColor(THEME.primary).font('bold').fontSize(10);
  doc.text(`${exp.company}  —  ${exp.location}`, x + pad, doc.y, { width: width - pad * 2 });
  doc.fillColor(THEME.textMuted).font('regular').fontSize(FONT.small);
  doc.text(exp.period, x + pad, doc.y + 1, { width: width - pad * 2 });
  doc.fillColor(THEME.accent).font('bold').fontSize(FONT.body);
  doc.text(exp.role, x + pad, doc.y + 2, { width: width - pad * 2 });
  doc.moveDown(0.12);

  writeBody(doc, exp.summary, { x: x + pad, width: width - pad * 2, size: FONT.small, lineGap: 0.5 });

  const sub = (title, items) => {
    if (!items?.length) return;
    doc.fillColor(THEME.primary).font('bold').fontSize(FONT.small);
    doc.text(title, x + pad, doc.y, { width: width - pad * 2 });
    doc.moveDown(0.04);
    writeBullets(doc, items, { x: x + pad, width: width - pad * 2, size: FONT.small, max: 6 });
  };

  sub(labels.teamMethod, ext?.teamAndMethod);
  sub(labels.techEnv, ext?.technicalEnvironment);
  sub(labels.tasks, ext?.tasks);

  if (exp.stack) {
    writeBody(doc, exp.stack, {
      x: x + pad,
      width: width - pad * 2,
      size: FONT.tag,
      color: THEME.textMuted,
      afterGap: 0.08,
    });
  }

  doc.save();
  doc.moveTo(x, doc.y).lineTo(x + width, doc.y).strokeColor(THEME.border).lineWidth(0.5).stroke();
  doc.restore();
  doc.moveDown(0.3);
}

export function writeTitle(doc, text) {
  doc.fillColor(THEME.primary).font('bold').fontSize(16).text(text);
  doc.moveDown(0.3);
}

export function writeSubtitle(doc, text) {
  doc.fillColor(THEME.accent).font('bold').fontSize(9).text(text);
  doc.moveDown(0.12);
}

export function writeHeading(doc, text) {
  writeSectionTitle(doc, text);
}

export { LAYOUT, PAGE_W, THEME, FONT, rightColumnX, rightColumnWidth };
