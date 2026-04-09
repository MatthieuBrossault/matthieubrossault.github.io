import './styles/vcard.css';
import './styles/main.css';
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
    if (value != null && value !== '') el.textContent = value;
  });
  document.title = d.meta?.title ?? document.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && d.meta?.description) metaDesc.setAttribute('content', d.meta.description);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function iconPath(name) {
  const map = { design: 'icon-design', dev: 'icon-dev', app: 'icon-app', photo: 'icon-photo' };
  const file = map[name] ?? 'icon-dev';
  return `/vcard/${file}.svg`;
}

function skillWidth(label) {
  let c = 0;
  for (let i = 0; i < label.length; i++) c += label.charCodeAt(i);
  return 55 + (c % 38);
}

function socialIonName(label) {
  const l = label.toLowerCase();
  if (l.includes('linkedin')) return 'logo-linkedin';
  if (l.includes('github')) return 'logo-github';
  if (l.includes('twitter') || l === 'x') return 'logo-twitter';
  return 'link-outline';
}

function renderAboutText(d) {
  const el = document.getElementById('about-text');
  if (!el) return;
  const bio = d.about?.bio ?? '';
  const parts = bio.split(/\n\n+/).filter(Boolean);
  el.innerHTML = (parts.length ? parts : [bio])
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('');
}

function renderServices(d) {
  const ul = document.getElementById('service-list');
  if (!ul || !Array.isArray(d.services?.items)) return;
  ul.innerHTML = d.services.items
    .map(
      (s) => `
    <li class="service-item">
      <div class="service-icon-box">
        <img src="${iconPath(s.icon)}" alt="" width="40">
      </div>
      <div class="service-content-box">
        <h4 class="h4 service-item-title">${escapeHtml(s.title ?? '')}</h4>
        <p class="service-item-text">${escapeHtml(s.text ?? '')}</p>
      </div>
    </li>`
    )
    .join('');
}

function renderEducation(d) {
  const block = document.getElementById('resume-education-block');
  const list = document.getElementById('resume-education-list');
  const items = d.education?.items ?? [];
  if (!block || !list) return;
  if (!items.length) {
    block.hidden = true;
    return;
  }
  block.hidden = false;
  list.innerHTML = items
    .map(
      (e) => `
    <li class="timeline-item">
      <h4 class="h4 timeline-item-title">${escapeHtml(e.title ?? '')}</h4>
      <span>${escapeHtml(e.period ?? '')}</span>
      <p class="timeline-text">${escapeHtml(e.summary ?? '')}</p>
    </li>`
    )
    .join('');
}

function renderExperienceTimeline(d) {
  const list = document.getElementById('resume-experience-list');
  if (!list) return;
  const items = d.experience?.items ?? [];
  list.innerHTML = items
    .map((e) => {
      const role = escapeHtml(e.role ?? '');
      const company = e.company && e.company !== '—' ? escapeHtml(e.company) : '';
      const titleHtml = company ? `${role} — ${company}` : role;
      const period = e.period?.trim() ? escapeHtml(e.period) : '—';
      return `
    <li class="timeline-item">
      <h4 class="h4 timeline-item-title">${titleHtml}</h4>
      <span>${period}</span>
      <p class="timeline-text">${escapeHtml(e.summary ?? '')}</p>
    </li>`;
    })
    .join('');
}

function renderResumeSkills(d) {
  const ul = document.getElementById('resume-skills-list');
  if (!ul) return;
  const skills = d.skills?.items ?? d.skills ?? [];
  if (!Array.isArray(skills)) return;
  ul.innerHTML = skills
    .map((s) => {
      const w = skillWidth(s);
      return `
    <li class="skills-item">
      <div class="title-wrapper">
        <h5 class="h5">${escapeHtml(s)}</h5>
        <data value="${w}">${w}%</data>
      </div>
      <div class="skill-progress-bg">
        <div class="skill-progress-fill" style="width: ${w}%;"></div>
      </div>
    </li>`;
    })
    .join('');
}

function renderProjects(d) {
  const ul = document.getElementById('project-list');
  if (!ul) return;
  const projects = d.projects?.items ?? d.projects ?? [];
  if (!Array.isArray(projects)) return;
  ul.innerHTML = projects
    .map((p) => {
      const category = p.stack?.length ? escapeHtml(p.stack[0]) : 'Project';
      const href = escapeHtml(p.repoUrl ?? '#');
      return `
    <li class="project-item active">
      <a href="${href}" target="_blank" rel="noopener noreferrer">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="open-outline"></ion-icon>
          </div>
          <img src="/vcard/logo.svg" alt="" loading="lazy">
        </figure>
        <h3 class="project-title">${escapeHtml(p.title ?? '')}</h3>
        <p class="project-category">${category}</p>
      </a>
    </li>`;
    })
    .join('');
}

function renderContactLists(d) {
  const links = d.contact?.links ?? [];
  const html = links
    .map(
      (l) =>
        `<li><a href="${escapeHtml(l.url)}" rel="noopener noreferrer">${escapeHtml(l.label)}</a></li>`
    )
    .join('');
  const pageUl = document.getElementById('contact-page-links');
  if (pageUl) pageUl.innerHTML = html;
}

function renderSidebar(d) {
  const avatar = document.getElementById('sidebar-avatar');
  if (avatar && d.hero?.title) avatar.alt = d.hero.title;

  const email = d.contact?.email?.trim();
  const emailRow = document.getElementById('sidebar-email-row');
  const emailLink = document.getElementById('sidebar-email-link');
  if (emailRow && emailLink) {
    if (email) {
      emailRow.hidden = false;
      emailLink.href = `mailto:${email}`;
      emailLink.textContent = email;
    } else {
      emailRow.hidden = true;
    }
  }

  const social = document.getElementById('sidebar-social');
  if (!social) return;
  const links = d.contact?.links ?? [];
  social.innerHTML = links
    .map(
      (l) => `
    <li class="social-item">
      <a href="${escapeHtml(l.url)}" class="social-link" rel="noopener noreferrer" aria-label="${escapeHtml(l.label)}">
        <ion-icon name="${socialIonName(l.label)}"></ion-icon>
      </a>
    </li>`
    )
    .join('');
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

function initSidebarToggle() {
  const sidebar = document.querySelector('[data-sidebar]');
  const btn = document.querySelector('[data-sidebar-btn]');
  btn?.addEventListener('click', () => sidebar?.classList.toggle('active'));
}

function initPageNav() {
  const navLinks = document.querySelectorAll('[data-nav-link][data-target-page]');
  const pages = document.querySelectorAll('[data-page]');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-target-page');
      navLinks.forEach((l) => l.classList.toggle('active', l === link));
      pages.forEach((p) => p.classList.toggle('active', p.dataset.page === target));
      window.scrollTo(0, 0);
    });
  });
}

let interactionsInited = false;

async function run() {
  try {
    data = await loadData(currentLocale);
  } catch (e) {
    console.error(e);
    data = currentLocale === 'fr' ? frData : enData;
  }
  setLocale(currentLocale);
  applyCopy(data);
  renderAboutText(data);
  renderServices(data);
  renderEducation(data);
  renderExperienceTimeline(data);
  renderResumeSkills(data);
  renderProjects(data);
  renderContactLists(data);
  renderSidebar(data);
  renderLangSwitcher();

  if (!interactionsInited) {
    initSidebarToggle();
    initPageNav();
    interactionsInited = true;
  }
}

run();
