(() => {
  if (typeof window !== 'undefined' && window.RmitResetting) return;
  const qs = (s, root = document) => root.querySelector(s);
  const all = (s, root = document) => [...root.querySelectorAll(s)];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (n) => Math.max(0,Math.min(1,n));
  const ramp = (n,a,b) => {
    const t = clamp((n-a)/(b-a));
    return t*t*(3-2*t);
  };
  const lerp = (a,b,t) => a+(b-a)*t;
  const css = (element, values) => Object.entries(values).forEach(([key,value]) =>
    element.style.setProperty('--'+key, value));
  const sections = all('.section-tracker a').map(link => [link,qs(link.getAttribute('href'))]);
  const header = qs('.site-header');
  const folder = qs('.folder-scene');
  const contactHandoff = qs('.closing-stage');
  const completed = qs('.complete-stage');
  const folderDialog = qs('#document-dialog');
  const showDocument = RmitDialog.wire(folderDialog);
  const organizer = qs('.organizer');
  const arms = all('.handover',folder);
  const reopen = qs('#reopen-documents');
  const skip = qs('#skip-documents');
  const continued = qs('#folder-continue');
  const names = ['passport','trc','photo','health','address','police','family'];
  const getStorage = (name,fallback) => {
    try { return JSON.parse(sessionStorage.getItem(name)) ?? fallback; }
    catch { return fallback; }
  };
  const save = (name,value) => {
    try { sessionStorage.setItem(name,JSON.stringify(value)); } catch {}
  };
  const viewed = new Set(getStorage('rmit.documents.viewed',[]).filter(name => names.includes(name)));
  let closed = getStorage('rmit.documents.closed',viewed.size === 7);
  let selected;
  let frame = 0;
  const trackProgress = track => {
    const top = track.getBoundingClientRect().top;
    const pin = qs('.new-pin',track);
    return clamp((header.offsetHeight-top)/Math.max(1,track.offsetHeight-pin.offsetHeight));
  };
  const navigate = target => target.scrollIntoView({behavior:motion.matches?'instant':'smooth',block:'start'});
  sections.forEach(([link,section]) => link.addEventListener('click',event => {
    event.preventDefault();
    navigate(section);
  }));

  qs('#revisit-email')?.addEventListener('click',() => {
    const section=qs('#section-01');
    const start=scrollY+section.getBoundingClientRect().top-header.offsetHeight;
    const range=section.offsetHeight-qs('.rv-pin',section).offsetHeight;
    scrollTo({top:start+range*.85,behavior:motion.matches?'instant':'smooth'});
  });

  function previewMarkup(name) {
    const portrait = '<img src="assets/shared/employee-portrait.png" alt="">';
    if (name === 'passport') return '<div class="doc-passport"><i></i><strong data-t="passport"></strong></div>';
    if (name === 'trc') return qs('.issued-trc').outerHTML.replace(' issued-trc','');
    if (name === 'photo') return '<img src="assets/shared/employee-portrait.png" class="doc-photo" data-alt="photoDesc" alt="">';
    const info = '<div class="paper-lines"></div><div class="paper-grid"></div>';
    return `<div class="doc-sheet"><strong data-t="${name}"></strong>${name === 'health' ? portrait : ''}${info}</div>`;
  }
  function paintChecklist() {
    qs('progress',folder).value=viewed.size;
    qs('#reviewed-count').textContent = viewed.size + ' / 7';
    all('[data-item]',folder).forEach(item => item.toggleAttribute('data-viewed',viewed.has(item.dataset.item)));
  }
  function setClosed(value) {
    closed = value;
    save('rmit.documents.closed',value);
    folder.toggleAttribute('data-closed',value);
    skip.hidden = value;
    reopen.hidden = !value;
    continued.hidden = !value;
    schedule();
  }
  all('[data-doc]',folder).forEach(button => button.addEventListener('click',() => {
    selected = button.dataset.doc;
    viewed.add(selected);
    save('rmit.documents.viewed',[...viewed]);
    paintChecklist();
    all('.folder-tabs button', organizer).forEach(tab => tab.toggleAttribute('data-selected',tab.dataset.doc === selected));
    qs('#document-title').dataset.t=selected;
    qs('#document-description').dataset.t=selected+'Desc';
    qs('#document-preview').innerHTML=previewMarkup(selected);
    RmitText.apply(folderDialog);
    showDocument(button);
  }));
  folderDialog.addEventListener('close', () => {
    if (viewed.size === 7) {
      setClosed(true);
      reopen.focus({preventScroll:true});
    }
  });
  reopen.addEventListener('click',() => {
    setClosed(false);
    const stage = folder.parentElement;
    const top = scrollY + stage.getBoundingClientRect().top - header.offsetHeight;
    const range = stage.offsetHeight - folder.offsetHeight;
    scrollTo({top: top + range*.52, behavior: motion.matches ? 'instant' : 'smooth'});
  });
  skip.addEventListener('click',() => {
    setClosed(true);
    const stage = folder.parentElement;
    const top = scrollY + stage.getBoundingClientRect().top - header.offsetHeight;
    const range = stage.offsetHeight - folder.offsetHeight;
    scrollTo({top: top + range*.83, behavior: motion.matches ? 'instant' : 'smooth'});
    reopen.focus({preventScroll:true});
  });
  paintChecklist();
  setClosed(closed);

  function drawFolder(p, simple) {
    const opening = simple ? +(p >= .26) : ramp(p,.11,.37);
    const handover = simple ? +(p >= .75) : ramp(p,.65,.91);
    const unfolded = closed ? 0 : opening;
    css(folder, {
      'folder-angle': unfolded*86+'deg',
      'tab-rise': lerp(20,-3,unfolded)+'%',
      'tab-scale': lerp(.3,1,unfolded),
      'tab-visibility': unfolded > .55 ? 'visible' : 'hidden',
      'check-opacity': opening,
      'check-visibility': opening > .55 ? 'visible' : 'hidden',
      'hands-opacity': closed ? handover : 0,
      'hands-y': lerp(110,0,handover)+'%'
    });
    if (closed) {
      const target = organizer.getBoundingClientRect();
      const scene = folder.getBoundingClientRect();
      const width = Math.min(172, Math.max(72, target.width * .27));
      const grip = target.bottom - Math.min(40, target.height * .19) - scene.top;
      const edges = [target.left - width * .74, target.right - width * .26];
      arms.forEach((arm, index) => css(arm, {
        'arm-x': Math.max(-width * .32, Math.min(scene.width - width * .68, edges[index] - scene.left))+'px',
        'arm-top': Math.round(grip)+'px',
        'arm-width': width+'px'
      }));
    }
    qs('.checklist',folder).inert = opening <= .55 || closed;
  }
  function drawCompletion(p, simple) {
    const phase = (a,b) => simple ? +(p >= (a+b)/2) : ramp(p,a,b);
    const center = phase(0,.17);
    const spread = phase(.19,.39);
    const morph = phase(.43,.62);
    const receive = phase(.69,.87);
    const stage = qs('.complete-art',completed);
    const ground = Math.max(0, (stage.parentElement.clientHeight - stage.clientHeight) / 2);
    qs('.forms',stage).style.visibility = morph === 1 ? 'hidden' : '';
    css(stage, {
      'ground-offset': ground + 'px', 'document-offset': ground * receive + 'px',
      'center-y': lerp(14,0,center)+'%', 'center-opacity': center,
      'left-x': lerp(-205,-69,spread)+'%', 'right-x': lerp(205,69,spread)+'%',
      'sides-opacity': spread, 'forms-opacity': 1-morph,
      'center-scale':lerp(1,.54,morph), 'side-scale':lerp(1,.65,morph),
      'issued-opacity': morph, 'employee-opacity':receive,
      'employee-y': lerp(9,0,receive)+'%',
      'arm-left': lerp(4,0,receive)+'deg', 'arm-right': lerp(-4,0,receive)+'deg',
      'trc-x':lerp(24,35,receive)+'%', 'trc-y':lerp(50,45,receive)+'%',
      'trc-scale':lerp(1.5,.60,receive),
      'wp-x':lerp(66,72,receive)+'%', 'wp-y':lerp(50,73,receive)+'%',
      'wp-scale':lerp(1.5,.79,receive)
    });
    qs('.issued-documents',stage).setAttribute('aria-hidden',String(morph < .2));
  }
  function drawClosing(p, simple, onscreen) {
    const phase = (a,b) => simple ? +(p >= (a+b)/2) : ramp(p,a,b);
    const rise=phase(.29,.52);
    const message=phase(.66,.85);
    css(contactHandoff,{
      'logo-y':lerp(0,-1,rise)* Math.min(contactHandoff.clientHeight*.34,260)+'px',
      'farewell-opacity':rise,'farewell-wash':message*.91,'message-opacity':message,
      'message-visibility':message>.15?'visible':'hidden'
    });
    contactHandoff.toggleAttribute('data-wave',!simple && onscreen && !document.hidden && p>.45 && p<.84);
  }
  const openings = all('.story-opening');
  function schedule() {
    if (!frame) frame = requestAnimationFrame(render);
  }
  function render() {
    frame = 0;
    const offset=header.offsetHeight;
    let current=sections[0];
    for (const pair of sections) {
      if (pair[1].getBoundingClientRect().top <= offset + innerHeight*.2) current=pair;
    }
    for (const pair of sections) {
      pair[0].toggleAttribute('data-completed', sections.indexOf(pair) < sections.indexOf(current));
      if (pair === current) pair[0].setAttribute('aria-current','step');
      else pair[0].removeAttribute('aria-current');
    }
    openings.forEach(node => {
      if (node.getBoundingClientRect().top < innerHeight*.85) node.setAttribute('data-visible','');
    });
    drawFolder(trackProgress(folder.parentElement),motion.matches);
    drawCompletion(trackProgress(completed.parentElement),motion.matches);
    const closingTrack=contactHandoff.parentElement;
    const bounds=closingTrack.getBoundingClientRect();
    drawClosing(trackProgress(closingTrack),motion.matches,bounds.top<innerHeight && bounds.bottom>offset);
  }
  let listeners;
  function mount() {
    if (listeners) return;
    listeners = new AbortController();
    const {signal}=listeners;
    addEventListener('scroll',schedule,{signal,passive:true});
    addEventListener('resize',schedule,{signal,passive:true});
    addEventListener('rmit-language',schedule,{signal});
    document.addEventListener('visibilitychange',schedule,{signal});
    motion.addEventListener('change',schedule,{signal});
    schedule();
  }
  addEventListener('pagehide',() => {
    listeners?.abort();
    listeners = null;
    cancelAnimationFrame(frame);
    frame = 0;
    contactHandoff.removeAttribute('data-wave');
  });
  addEventListener('pageshow',mount);
  mount();
})();

