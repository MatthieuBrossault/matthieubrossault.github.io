import { escapeHtml, iconPath, skillWidth, socialIonName } from './dom-utils.js';

export function renderAboutText(d) {
  const el = document.getElementById('about-text');
  if (!el) return;
  const bio = d.about?.bio ?? '';
  const parts = bio.split(/\n\n+/).filter(Boolean);
  el.innerHTML = (parts.length ? parts : [bio]).map((p) => `<p>${escapeHtml(p)}</p>`).join('');
}

export function renderServices(d) {
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

export function renderEducation(d) {
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

export function renderExperienceTimeline(d) {
  const list = document.getElementById('resume-experience-list');
  if (!list) return;
  const items = d.experience?.items ?? [];
  list.innerHTML = items
    .map((e) => {
      const role = escapeHtml(e.role ?? '');
      const company = e.company && e.company !== '—' ? escapeHtml(e.company) : '';
      const loc = e.location ? escapeHtml(e.location) : '';
      const titleParts = [role, company].filter(Boolean);
      let titleHtml = titleParts.join(' — ');
      if (loc) titleHtml += ` · ${loc}`;
      const period = e.period?.trim() ? escapeHtml(e.period) : '—';
      const highlights = Array.isArray(e.highlights)
        ? e.highlights
            .filter(Boolean)
            .map((h) => `<li>${escapeHtml(h)}</li>`)
            .join('')
        : '';
      const highlightsBlock = highlights ? `<ul class="timeline-highlights">${highlights}</ul>` : '';
      const stack = e.stack ? `<p class="timeline-stack">${escapeHtml(e.stack)}</p>` : '';
      return `
    <li class="timeline-item">
      <h4 class="h4 timeline-item-title">${titleHtml}</h4>
      <span>${period}</span>
      <p class="timeline-text">${escapeHtml(e.summary ?? '')}</p>
      ${highlightsBlock}
      ${stack}
    </li>`;
    })
    .join('');
}

export function renderResumeSkills(d) {
  const ul = document.getElementById('resume-skills-list');
  if (!ul) return;
  const skills = d.skills?.items ?? d.skills ?? [];
  if (!Array.isArray(skills)) return;
  ul.innerHTML = skills
    .map((s) => {
      const w = skillWidth(typeof s === 'string' ? s : String(s));
      const label = typeof s === 'string' ? s : String(s);
      return `
    <li class="skills-item">
      <div class="title-wrapper">
        <h5 class="h5">${escapeHtml(label)}</h5>
        <data value="${w}">${w}%</data>
      </div>
      <div class="skill-progress-bg">
        <div class="skill-progress-fill" style="width: ${w}%;"></div>
      </div>
    </li>`;
    })
    .join('');
}

export function renderSkillCategories(d) {
  const container = document.getElementById('resume-skill-categories');
  const section = document.getElementById('resume-skill-categories-section');
  if (!container || !section) return;
  const cats = d.skillCategories ?? [];
  if (!cats.length) {
    section.hidden = true;
    return;
  }
  section.hidden = false;
  container.innerHTML = cats
    .map(
      (cat) => `
    <div class="skill-category-block">
      <h4 class="h4 skill-category-title">${escapeHtml(cat.title ?? '')}</h4>
      <ul class="skill-category-list">
        ${(cat.items ?? []).map((i) => `<li>${escapeHtml(i)}</li>`).join('')}
      </ul>
    </div>`
    )
    .join('');
}

export function renderProjects(d) {
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

export function renderContactLists(d) {
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

export function renderSidebar(d) {
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

export function renderLangSwitcher(currentLocale, onSelectLocale) {
  const el = document.getElementById('lang-switcher');
  if (!el) return;
  const other = currentLocale === 'fr' ? 'en' : 'fr';
  el.innerHTML = `<button type="button" id="lang-btn" aria-label="Switch to ${other}">${other.toUpperCase()}</button>`;
  document.getElementById('lang-btn')?.addEventListener('click', () => onSelectLocale(other));
}
