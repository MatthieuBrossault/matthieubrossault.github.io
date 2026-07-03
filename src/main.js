import './styles/vcard.css';
import './styles/main.css';
import { localeData } from './js/locale-data.js';
import { getLocale, loadData, setLocaleStorage, applyCopy } from './js/i18n.js';
import {
  renderAboutText,
  renderServices,
  renderEducation,
  renderExperienceTimeline,
  renderResumeSkills,
  renderSkillCategories,
  renderProjects,
  renderContactLists,
  renderSidebar,
  renderLangSwitcher,
  renderCvDownload,
} from './js/render.js';
import { initSidebarToggle, initPageNav } from './js/ui-bindings.js';

let currentLocale = getLocale();
let data = null;

let interactionsInited = false;

async function loadCvManifest() {
  try {
    const res = await fetch('/cv/manifest.json');
    if (res.ok) return res.json();
  } catch {
    /* no generated CV on disk */
  }
  return null;
}

async function run() {
  try {
    data = await loadData(currentLocale);
  } catch (e) {
    console.error(e);
    data = localeData[currentLocale] ?? localeData.en;
  }
  setLocaleStorage(currentLocale);
  applyCopy(data);
  renderAboutText(data);
  renderServices(data);
  renderEducation(data);
  renderExperienceTimeline(data);
  renderResumeSkills(data);
  renderSkillCategories(data);
  renderProjects(data);
  renderContactLists(data);
  renderSidebar(data);
  renderCvDownload(currentLocale, await loadCvManifest());
  renderLangSwitcher(currentLocale, (nextLocale) => {
    currentLocale = nextLocale;
    setLocaleStorage(nextLocale);
    run();
  });

  if (!interactionsInited) {
    initSidebarToggle();
    initPageNav();
    interactionsInited = true;
  }
}

run();
