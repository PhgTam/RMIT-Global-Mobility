(() => {
  if (typeof window !== 'undefined' && window.RmitResetting) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const landing = document.querySelector('#campus');
  const services = document.querySelector('#services');

  function displayServices(moveFocus) {
    if (!landing) return;
    landing.hidden = true;
    services.hidden = false;
    document.body.classList.add('show-services');
    if (moveFocus) services.querySelector('.service-renewal').focus();
  }

  if (landing) {
    if (new URLSearchParams(location.search).has('services')) displayServices(false);
    document.querySelector('#lets-go').addEventListener('click', () => {
      const url = new URL(location.href);
      url.searchParams.set('services', '1');
      try { history.replaceState(null, '', url); } catch {}
      displayServices(true);
    });
    const renewal = services.querySelector('.service-renewal');
    const unavailable = services.querySelector('.service-disabled');
    let transition;

    function resetTransition() {
      if (!transition) return;
      transition.animations.forEach(animation => animation.cancel());
      transition.elements.forEach(element => element.remove());
      renewal.removeAttribute('aria-busy');
      transition = undefined;
    }

    renewal.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (transition) {
        event.preventDefault();
        return;
      }
      const card = event.currentTarget;
      if (reduced.matches || !card.animate) return;
      event.preventDefault();

      const bounds = card.getBoundingClientRect();
      const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom;
      const geometry = `left:${bounds.left}px;top:${bounds.top}px;width:${bounds.width}px;height:${bounds.height}px`;
      const cover = document.createElement('div');
      cover.className = 'service-transition';
      cover.style.cssText = geometry;
      const content = card.cloneNode(true);
      content.classList.add('service-transition-content');
      content.style.cssText = geometry;
      content.setAttribute('aria-hidden', 'true');
      content.inert = true;
      document.body.append(cover, content);
      card.setAttribute('aria-busy', 'true');

      const fade = unavailable.animate([{opacity:1},{opacity:0}], {duration:420,fill:'both'});
      const titleExit = content.animate([
        { opacity:1, offset:0 },
        { opacity:1, offset:.22 },
        { opacity:0, transform:'translateY(-16px)', offset:1 }
      ], {duration:580,easing:'ease-in-out',fill:'both'});
      const expand = cover.animate([
        { transformOrigin:'top left', borderRadius:'6px', transform:'none' },
        { transformOrigin:'top left', borderRadius:0,
          transform:`translate(${-bounds.left}px,${headerBottom - bounds.top}px) scale(${innerWidth / bounds.width},${(innerHeight - headerBottom) / bounds.height})` }
      ], {duration:950,easing:'cubic-bezier(.55,.04,.22,1)',fill:'both'});
      transition = { animations:[fade,titleExit,expand], elements:[cover,content] };
      expand.finished.then(() => location.assign(card.href), () => {});
    });
    addEventListener('pagehide', resetTransition);
  }

  function wireDialog(dialog) {
    let previous;
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => previous?.focus({preventScroll:true}));
    return (trigger, focus = dialog.querySelector('[data-close]')) => {
      previous = trigger;
      dialog.showModal();
      focus.focus({preventScroll:true});
    };
  }
  window.RmitDialog = { wire: wireDialog };
})();
