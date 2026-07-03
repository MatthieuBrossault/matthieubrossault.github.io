/** Visual theme aligned with portfolio (professional navy + gold accent). */
export const THEME = {
  primary: '#1a365d',
  primaryDark: '#0f2744',
  accent: '#d4a012',
  accentSoft: '#f5e6b8',
  text: '#1f2937',
  textMuted: '#4b5563',
  textLight: '#ffffff',
  border: '#cbd5e1',
  surface: '#f8fafc',
  surfaceAlt: '#eef2f7',
  bullet: '#2563eb',
};

export const FONT = {
  name: 22,
  headline: 11,
  contact: 8,
  section: 9.5,
  body: 8.5,
  small: 7.5,
  tag: 7,
};

export const LAYOUT = {
  margin: 36,
  headerHeight: 68,
  columnGap: 12,
  leftWidth: 150,
};

export function pageWidth() {
  return 595.28;
}

export function contentRight(layout, pageW) {
  return pageW - layout.margin;
}

export function rightColumnX(layout) {
  return layout.margin + layout.leftWidth + layout.columnGap;
}

export function rightColumnWidth(layout, pageW) {
  return contentRight(layout, pageW) - rightColumnX(layout);
}
