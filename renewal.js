(() => {
  if (typeof window !== 'undefined' && window.RmitResetting) return;
  const clamp = (value, low = 0, high = 1) => Math.max(low, Math.min(value, high));
  const linear = (value, start, end) => clamp((value - start) / (end - start));
  const ease = (value, start, end) => {
    const t = linear(value, start, end);
    return t * t * (3 - 2 * t);
  };
  const lerp = (from, to, t) => from + (to - from) * t;
  const move = (el, x = 0, y = 0, scale = 1) =>
    el.setAttribute('transform', `translate(${x} ${y}) scale(${scale})`);
  const opacity = (el, value) => el.style.opacity = value;
  const layer = (container, name) => container.querySelector(`[data-layer="${name}"]`);
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const emailStateKey = 'rmit.renewal.section-01.email-open';
  let emailOpened = false;
  try { emailOpened = sessionStorage.getItem(emailStateKey) === 'true'; } catch {}

  function bind(section, makeRender) {
    let frame = 0;
    let controller;
    let stop;
    function mount() {
      if (controller) return;
      controller = new AbortController();
      const { signal } = controller;
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(render);
      };
      const pin = section.querySelector('.rv-pin');
      const story = makeRender(section, signal, schedule);
      stop = story.stop;
      function render() {
        frame = 0;
        const bounds = section.getBoundingClientRect();
        const pinTop = Number.parseFloat(getComputedStyle(pin).top) || 0;
        const range = Math.max(1, bounds.height - pin.offsetHeight);
        story.render(clamp((pinTop - bounds.top) / range), preference.matches,
          bounds.bottom > 0 && bounds.top < innerHeight && !document.hidden);
      }
      function setMotion() {
        section.dataset.motion = preference.matches ? 'reduced' : 'full';
        schedule();
      }
      addEventListener('scroll', schedule, { passive: true, signal });
      addEventListener('resize', schedule, { passive: true, signal });
      document.addEventListener('visibilitychange', schedule, { signal });
      preference.addEventListener('change', setMotion, { signal });
      addEventListener('rmit-language', schedule, { signal });
      setMotion();
      render();
    }
    addEventListener('pagehide', () => {
      controller?.abort();
      controller = null;
      cancelAnimationFrame(frame);
      frame = 0;
      stop?.();
    });
    addEventListener('pageshow', mount);
    mount();
  }

  function introduction(section, signal, schedule) {
    const intro = section.querySelector('.rv-intro');
    const stage = section.querySelector('.rv-office-art');
    const art = stage.querySelector('svg');
    const monitor = stage.querySelector('.rv-monitor-email');
    const pin = section.querySelector('.rv-pin');
    const office = layer(stage, 'office');
    const camera = layer(stage, 'office-camera');
    const employee = layer(stage, 'employee-group');
    const computer = layer(stage, 'computer-group');
    const screen = layer(stage, 'screen-interface');
    const email = layer(stage, 'email-icon');
    const travel = layer(stage, 'email-travel');
    const area = section.querySelector('.rv-envelope-area');
    const envelope = section.querySelector('.rv-envelope');
    const flap = section.querySelector('.rv-flap');
    const button = section.querySelector('.rv-open');
    const alternative = section.querySelector('.rv-text-alternative');
    const dateText = section.querySelector('.rv-date-text');
    const calendar = section.querySelector('.rv-calendar');
    const highlight = layer(calendar, 'renewal-mark');
    const envelopePieces = [...envelope.querySelectorAll(':scope > img, .rv-sender')];
    let animations = [];
    let revealFocus;
    let openFromMonitor = false;
    let lastWidth = 0;
    let lastHeight = 0;

    function scrollToScene(progress) {
      const start = scrollY + section.getBoundingClientRect().top - (Number.parseFloat(getComputedStyle(pin).top) || 0);
      const range = section.offsetHeight - pin.offsetHeight;
      scrollTo({ top: start + range * progress, behavior: preference.matches ? 'instant' : 'smooth' });
      schedule();
    }

    function finish() {
      area.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      button.hidden = true;
      alternative.hidden = true;
      calendar.hidden = false;
      dateText.hidden = false;
      for (const animation of animations) animation.cancel();
      animations = [];
      revealFocus?.focus({ preventScroll: true });
      revealFocus = undefined;
    }

    function open(textOnly) {
      if (button.getAttribute('aria-expanded') === 'true') return;
      emailOpened = true;
      try { sessionStorage.setItem(emailStateKey, 'true'); } catch {}
      button.setAttribute('aria-expanded', 'true');
      button.disabled = true;
      alternative.hidden = true;
      dateText.hidden = false;
      revealFocus = textOnly ? dateText : calendar;
      if (textOnly || preference.matches || !flap.animate) {
        finish();
        return;
      }
      calendar.hidden = false;
      const initialWidth = calendar.offsetWidth;
      area.classList.add('is-open');
      const finalWidth = calendar.offsetWidth;
      area.classList.remove('is-open');
      const travelY = Math.min(100, envelope.offsetHeight * .62);
      flap.style.removeProperty('z-index');
      const animate = (target, frames, options) => {
        const animation = target.animate(frames, { fill: 'both', ...options });
        animations.push(animation);
        return animation;
      };
      animate(flap, [
        { transform: 'rotateX(0deg)', zIndex: 4 },
        { transform: 'rotateX(90deg)', zIndex: 1, offset: .50 },
        { transform: 'rotateX(180deg)', zIndex: 1 }
      ], { duration: 420, easing: 'ease-in-out' });
      animate(calendar, [
        { top: '12%', width: initialWidth+'px', transform: 'translate(-50%, 0)', opacity: 0, zIndex: 2 },
        { top: '-16%', width: initialWidth+'px', transform: 'translate(-50%, 0)', opacity: 1, zIndex: 2, offset: .22 },
        { top: '-32%', width: initialWidth+'px', transform: 'translate(-50%, 0)', opacity: 1, zIndex: 5, offset: .34 },
        { top: '50%', width: finalWidth+'px', transform: 'translate(-50%, -50%)', opacity: 1, zIndex: 5 }
      ], { delay: 245, duration: 1030, easing: 'ease-in-out' });
      for (const part of envelopePieces) {
        const keyframes = part === flap ? [
          { opacity: 1 }, { opacity: 0 }
        ] : [
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: `translateY(${travelY}px)` }
        ];
        animate(part, keyframes, { delay: 520, duration: 630, easing: 'ease-in-out' });
      }
      // The reference's day and label become legible once the card reaches the foreground.
      const reveal = animate(highlight, [
        { opacity: 0, transform: 'scale(.93)' },
        { opacity: 1, transform: 'scale(1.045)', offset: .7 },
        { opacity: 1, transform: 'scale(1)' }
      ], { delay: 1035, duration: 440, easing: 'ease-out' });
      highlight.style.transformOrigin = '392px 214px';
      button.hidden = true;
      reveal.finished.then(finish, () => {});
    }

    button.addEventListener('click', () => open(false), { signal });
    alternative.addEventListener('click', () => open(true), { signal });
    monitor.addEventListener('click', () => {
      if (openFromMonitor) return;
      openFromMonitor = true;
      scrollToScene(.81);
    }, { signal });
    preference.addEventListener('change', () => {
      if (preference.matches && animations.length) finish();
    }, { signal });
    if (emailOpened) finish();

    intro.querySelector('button').addEventListener('click', () => scrollToScene(.42), { signal });

    return {
      stop() {
        if (animations.length) finish();
      },
      render(p, reduced) {
        const { clientWidth: width, clientHeight: height } = pin;
        if (width && height && (width !== lastWidth || height !== lastHeight)) {
          const fit = Math.min(width / 900, height / 637);
          const viewWidth = width / fit;
          const viewHeight = height / fit;
          art.setAttribute('viewBox', `${(900-viewWidth)/2} ${(637-viewHeight)/2} ${viewWidth} ${viewHeight}`);
          lastWidth = width;
          lastHeight = height;
        }
        const introExit = reduced ? +(p >= .18) : ease(p, .018, .19);
        intro.hidden = introExit >= 1;
        opacity(intro, 1 - introExit);
        intro.style.transform = `translateY(${-introExit * 54}px)`;

        const entered = reduced ? 1 : ease(p, .16, .37);
        move(employee, lerp(-860, 0, entered));
        move(computer, lerp(900, 0, entered));
        opacity(screen, reduced ? 1 : ease(p, .31, .38));
        const notification = reduced ? 1 : ease(p, .37, .42);
        const pulse = Math.sin(Math.PI * linear(p, .42, .48)) * .045;
        move(email, -609 * pulse, -318 * pulse, 1 + pulse);

        const zoom = reduced ? 0 : ease(p, .49, .77);
        const handoff = reduced ? 0 : ease(p, .62, .76);
        const scale = lerp(1, 5.32, zoom);
        const x = lerp(0, 450 - 609 * 5.32, zoom);
        const y = lerp(0, 318.5 - 318 * 5.32, zoom);
        move(camera, x, y, scale);
        opacity(office, 1 - handoff);
        opacity(email, notification * (1 - handoff));
        const background = [179, 179, 204].map((value, i) =>
          Math.round(lerp(value, [255, 255, 255][i], handoff)));
        stage.style.backgroundColor = `rgb(${background.join(' ')})`;
        const envelopeScale = lerp(83 / 440, 1 / scale, handoff) * scale;
        const centerX = 609 * scale + x;
        const centerY = 318 * scale + y;
        move(travel, centerX - 220 * envelopeScale, centerY - 140 * envelopeScale, envelopeScale);
        opacity(travel, handoff);
        const envelopeVisible = p >= (reduced ? .58 : .77);
        area.hidden = !envelopeVisible;
        stage.hidden = envelopeVisible;
        monitor.hidden = !(!emailOpened && !openFromMonitor && p >= .385 && p < (reduced ? .58 : .61));
        if (!monitor.hidden) {
          const matrix = email.getScreenCTM();
          if (matrix) {
            const point = new DOMPoint(609,318).matrixTransform(matrix);
            const bounds = stage.getBoundingClientRect();
            monitor.style.left = (point.x - bounds.left) + 'px';
            monitor.style.top = (point.y - bounds.top) + 'px';
            monitor.style.width = Math.max(44, 95 * matrix.a) + 'px';
            monitor.style.height = Math.max(44, 70 * matrix.d) + 'px';
          }
        }
        if (envelopeVisible && openFromMonitor) {
          openFromMonitor = false;
          open(false);
        }
      }
    };
  }

  function processing(section, signal, schedule) {
    const panels = ['received', 'prepared', 'submitted', 'approval'].map(n => layer(section, n));
    const tracker = section.querySelector('.rv-tracker');
    const list = tracker.querySelector('ol');
    const items = [...list.children];
    const reception = tracker.querySelector('.rv-reception');
    const hands = [layer(section,'left-entry'), layer(section,'right-entry')];
    const camera = layer(section,'clipboard-camera');
    const scene = section.querySelector('.rv-scenes');
    const art = scene.querySelector('.rv-art');
    const canvas = art.viewBox.baseVal;
    const submission = camera.querySelector('image');
    const inProgress = layer(section,'in-progress-document');
    const approved = layer(section,'approved-document-group');
    const stamp = layer(section,'approval-stamp');
    let current = null;
    let entrance;
    const observer = new IntersectionObserver(([entry], observer) => {
      if (!entry.isIntersecting) return;
      if (!preference.matches && tracker.animate) {
        entrance = tracker.animate([{ transform: 'translateX(-35px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }],
          { duration: 500, easing: 'ease-out' });
      }
      observer.disconnect();
    }, { threshold: .15 });
    observer.observe(tracker);

    return {
      stop() {
        observer.disconnect();
        entrance?.cancel();
        section.removeAttribute('data-typing');
      },
      render(p, reduced, visible) {
        // Convert the safe area's edges to SVG coordinates, including the letterbox below the viewBox.
        const width = art.clientWidth;
        const height = art.clientHeight;
        const unit = Math.min(width / canvas.width, height / canvas.height);
        if (!unit) return;
        const leftEdge = (canvas.width - width / unit) / 2;
        const bottom = (canvas.height + height / unit) / 2;
        const safeArea = art.getBoundingClientRect();
        const sceneArea = scene.getBoundingClientRect();
        const pageCentre = leftEdge + (sceneArea.left + sceneArea.width / 2 - safeArea.left) / unit;
        const fitAtBottom = (assetWidth, assetHeight, maxScale) => {
          const scale = Math.min(maxScale, width * .96 / (assetWidth * unit), height * .94 / (assetHeight * unit));
          const halfWidth = assetWidth * scale / 2;
          const centre = clamp(pageCentre, leftEdge + halfWidth, leftEdge + width / unit - halfWidth);
          return { x: centre - halfWidth, y: bottom - assetHeight * scale, scale };
        };
        const typingFit = fitAtBottom(canvas.width, canvas.height, 1.05);
        move(panels[1], typingFit.x, typingFit.y, typingFit.scale);
        const handover = fitAtBottom(submission.width.baseVal.value, submission.height.baseVal.value, .93);
        move(panels[2], handover.x, handover.y, handover.scale);
        const first = ease(p, .18, .29);
        const second = ease(p, .45, .55);
        const intoPaper = ease(p, .68, .79);
        const compare = ease(p, .755, .82);
        const final = ease(p, .865, .965);
        const active = p >= .89 ? 3 : p >= .79 ? 2 : p >= .50 ? 1 : p >= .235 ? 0 : -1;
        if (current !== active) {
          reception.setAttribute('aria-hidden', String(active !== -1));
          items.forEach((item, index) => {
            item.toggleAttribute('data-completed', index < active);
            if (index === active) item.setAttribute('aria-current', 'step');
            else item.removeAttribute('aria-current');
          });
          current = active;
        }
        const fill = reduced ? Math.max(0, active) : second + compare + ease(p, .865, .92);
        list.style.setProperty('--rv-line', (fill * 25) + '%');
        const p0 = reduced ? +(active === -1) : 1 - first;
        const p1 = reduced ? +(active === 0) : first * (1 - second);
        const p2 = reduced ? +(active === 1) : second * (1 - compare);
        const p3 = reduced ? +(p >= .79) : compare;
        [p0,p1,p2,p3].forEach((value, index) => opacity(panels[index], value));

        ['background-shape','laptop','keyboard','main-document','left-document','right-document']
          .forEach((name, index) => opacity(layer(panels[1], name),
            reduced ? 1 : ease(p, .19 + index * .012, .28 + index * .01)));
        const left = reduced ? 1 : ease(p, .30, .386);
        const right = reduced ? 1 : ease(p, .315, .40);
        hands.forEach((hand, index) => move(hand, 0, lerp(180, 0, index ? right : left)));
        section.toggleAttribute('data-typing', visible && !reduced && p >= .4 && p < .47);

        const zoom = reduced ? 0 : intoPaper;
        const scale = lerp(1, 5.25, zoom);
        const focusX = submission.width.baseVal.value * .515;
        const focusY = submission.height.baseVal.value * .405;
        const targetX = lerp(handover.x + focusX * handover.scale, canvas.width / 2, zoom);
        const targetY = lerp(handover.y + focusY * handover.scale, canvas.height / 2, zoom);
        move(camera, (targetX - handover.x) / handover.scale - focusX * scale,
          (targetY - handover.y) / handover.scale - focusY * scale, scale);
        const emphasis = reduced ? +(active === 3) : final;
        opacity(inProgress, 1 - emphasis);
        move(inProgress, -185 * emphasis);
        const size = lerp(1, 1.46, emphasis);
        move(approved, lerp(606,435,emphasis) - 606*size, 312.5 - 312.5*size, size);
        opacity(stamp, lerp(.7,1,emphasis));
      }
    };
  }

  const start = document.querySelector('#section-01');
  const process = document.querySelector('#section-03-engine');
  if (start) bind(start, introduction);
  if (process) bind(process, processing);
})();

