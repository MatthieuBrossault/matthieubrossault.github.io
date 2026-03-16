import enData from './data/en.json';
import frData from './data/fr.json';

const LOCALE_KEY = 'locale';
const localeData = { en: enData, fr: frData };

function getLocale() {
  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved === 'en' || saved === 'fr') return saved;
  return navigator.language.startsWith('fr') ? 'fr' : 'en';
}

let currentLocale = getLocale();
let data = null;

function loadData(locale) {
  return Promise.resolve(localeData[locale] ?? localeData.en);
}

function setLocale(newLocale) {
  currentLocale = newLocale;
  localStorage.setItem(LOCALE_KEY, newLocale);
  document.documentElement.lang = newLocale === 'fr' ? 'fr' : 'en';
}

function applyCopy(d) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = key.split('.').reduce((o, k) => o?.[k], d);
    if (value != null) el.textContent = value;
  });
  document.title = d.meta?.title ?? document.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && d.meta?.description) metaDesc.setAttribute('content', d.meta.description);
}

function renderSkills(skills) {
  const ul = document.getElementById('skills-list');
  if (!ul || !Array.isArray(skills)) return;
  ul.innerHTML = skills.map((s) => `<li>${escapeHtml(s)}</li>`).join('');
}

function renderExperience(experience) {
  const ul = document.getElementById('experience-list');
  if (!ul || !Array.isArray(experience)) return;
  ul.innerHTML = experience
    .map(
      (e) =>
        `<li><strong>${escapeHtml(e.role ?? '')}</strong> — ${escapeHtml(e.company ?? '')}${e.period ? ` (${escapeHtml(e.period)})` : ''}${e.summary ? `<br><span>${escapeHtml(e.summary)}</span>` : ''}</li>`
    )
    .join('');
}

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid || !Array.isArray(projects)) return;
  grid.innerHTML = projects
    .map(
      (p) => `
    <article class="project-card">
      <h3>${escapeHtml(p.title ?? '')}</h3>
      <p>${escapeHtml(p.description ?? '')}</p>
      ${p.stack?.length ? `<ul class="project-stack">${p.stack.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>` : ''}
      <div class="project-links">
        ${p.repoUrl ? `<a href="${escapeHtml(p.repoUrl)}" rel="noopener noreferrer">GitHub</a>` : ''}
        ${p.demoUrl ? `<a href="${escapeHtml(p.demoUrl)}" rel="noopener noreferrer">Demo</a>` : ''}
      </div>
    </article>`
    )
    .join('');
}

function renderContact(contact) {
  const ul = document.getElementById('contact-links');
  const footer = document.getElementById('footer-links');
  if (!ul || !contact) return;
  const links = contact.links ?? [];
  const html = links
    .map((l) => `<li><a href="${escapeHtml(l.url)}" rel="noopener noreferrer">${escapeHtml(l.label)}</a></li>`)
    .join('');
  ul.innerHTML = html;
  if (footer) footer.innerHTML = html;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderLangSwitcher() {
  const el = document.getElementById('lang-switcher');
  if (!el) return;
  const other = currentLocale === 'fr' ? 'en' : 'fr';
  el.innerHTML = `<button type="button" id="lang-btn" aria-label="Switch to ${other}">${other.toUpperCase()}</button>`;
  document.getElementById('lang-btn')?.addEventListener('click', () => {
    setLocale(other);
    run();
  });
}

async function run() {
  try {
    data = await loadData(currentLocale);
  } catch (e) {
    console.error(e);
    data = currentLocale === 'fr' ? frData : enData;
  }
  setLocale(currentLocale);
  applyCopy(data);
  renderSkills(data.skills?.items ?? data.skills ?? []);
  renderExperience(data.experience?.items ?? data.experience ?? []);
  renderProjects(data.projects?.items ?? data.projects ?? []);
  renderContact(data.contact);
  renderLangSwitcher();
}

run();
