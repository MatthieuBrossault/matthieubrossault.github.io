export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function iconPath(name) {
  const map = { design: 'icon-design', dev: 'icon-dev', app: 'icon-app', photo: 'icon-photo' };
  const file = map[name] ?? 'icon-dev';
  return `/vcard/${file}.svg`;
}

export function skillWidth(label) {
  let c = 0;
  for (let i = 0; i < label.length; i++) c += label.charCodeAt(i);
  return 55 + (c % 38);
}

export function socialIonName(label) {
  const l = label.toLowerCase();
  if (l.includes('linkedin')) return 'logo-linkedin';
  if (l.includes('github')) return 'logo-github';
  if (l.includes('portfolio') || l.includes('site perso') || l.includes('site')) return 'globe-outline';
  if (l.includes('twitter') || l === 'x') return 'logo-twitter';
  return 'link-outline';
}
