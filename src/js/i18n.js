import { localeData } from './locale-data.js';

export const LOCALE_KEY = 'locale';

export function getLocale() {
  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved === 'en' || saved === 'fr') return saved;
  return navigator.language.startsWith('fr') ? 'fr' : 'en';
}

export function loadData(locale) {
  return Promise.resolve(localeData[locale] ?? localeData.en);
}

export function setLocaleStorage(newLocale) {
  localStorage.setItem(LOCALE_KEY, newLocale);
  document.documentElement.lang = newLocale === 'fr' ? 'fr' : 'en';
}

export function applyCopy(d) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = key.split('.').reduce((o, k) => o?.[k], d);
    if (value != null && value !== '') el.textContent = value;
  });
  document.title = d.meta?.title ?? document.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && d.meta?.description) metaDesc.setAttribute('content', d.meta.description);
}
