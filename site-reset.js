(() => {
  const navigation = performance.getEntriesByType('navigation')[0];
  const reloaded = navigation ? navigation.type === 'reload' : performance.navigation?.type === 1;
  if (!reloaded) return;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  try {
    for (const key of ['rmit.renewal.section-01.email-open', 'rmit.documents.viewed', 'rmit.documents.closed']) {
      sessionStorage.removeItem(key);
    }
  } catch {}
  try { localStorage.removeItem('rmit.language'); } catch {}

  const current = new URL(location.href);
  const isHome = /\/(?:index\.html)?$/i.test(current.pathname) && !current.search && !current.hash;
  if (!isHome) {
    window.RmitResetting = true;
    document.documentElement.style.visibility = 'hidden';
    location.replace(new URL('index.html', current));
    return;
  }
  scrollTo(0, 0);
  addEventListener('pageshow', () => scrollTo(0, 0), { once: true });
})();

