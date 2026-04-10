export function initSidebarToggle() {
  const sidebar = document.querySelector('[data-sidebar]');
  const btn = document.querySelector('[data-sidebar-btn]');
  btn?.addEventListener('click', () => sidebar?.classList.toggle('active'));
}

export function initPageNav() {
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
