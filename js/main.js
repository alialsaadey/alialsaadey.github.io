(function () {
  'use strict';
  var D = window.SITE_DATA, R = window.SiteRender;
  if (!D || !R) return;

  var app = document.getElementById('app');
  var modal = document.getElementById('modal');
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var lang = 'ar';
  var cleanups = [];
  var lastFocus = null;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'ar' || q === 'en') return q;
    var s = store('lang');
    return s === 'en' || s === 'ar' ? s : 'ar';
  }

  /* ---------------- العرض ---------------- */
  function applyMeta(L) {
    root.lang = L.lang; root.dir = L.dir;
    document.title = L.meta.title;
    var d = document.querySelector('meta[name="description"]'); if (d) d.setAttribute('content', L.meta.description);
    var og = document.querySelector('meta[property="og:title"]'); if (og) og.setAttribute('content', L.meta.title.split(' — ')[0]);
    var skip = document.querySelector('[data-skip]'); if (skip) skip.textContent = L.ui.skip;
  }

  function mount(first) {
    var L = D[lang];
    applyMeta(L);
    var sig = R.sig(D) + lang;
    if (!(first && app.dataset.sig === sig && app.querySelector('main'))) {
      app.innerHTML = R.render(D, lang);
      app.dataset.sig = sig; app.dataset.lang = lang;
    }
    cleanups.forEach(function (f) { f(); }); cleanups = [];
    init();
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l; store('lang', l);
    if (modal.open) modal.close();
    var y = window.scrollY;
    mount(false);
    window.scrollTo(0, y);
    var btn = app.querySelector('.nav__actions .lang-btn'); if (btn && window.innerWidth >= 1024) btn.focus({ preventScroll: true });
  }

  /* ---------------- التهيئة ---------------- */
  function init() {
    initNav();
    initReveal();
    initServices();
    initWorks();
    initNetwork();
    initPortrait();
    var y = app.querySelectorAll('[data-year]'); for (var i = 0; i < y.length; i++) y[i].textContent = new Date().getFullYear();
    app.querySelectorAll('[data-lang-switch]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang-switch')); }); });
  }

  function on(el, ev, fn, opt) { el.addEventListener(ev, fn, opt); cleanups.push(function () { el.removeEventListener(ev, fn, opt); }); }

  /* شريط التنقل */
  function initNav() {
    var nav = app.querySelector('.nav'), toggle = app.querySelector('.nav__toggle'), panel = app.querySelector('#mobile-menu');
    function scrolled() {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
      var max = document.documentElement.scrollHeight - window.innerHeight;
      nav.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
    }
    scrolled(); on(window, 'scroll', scrolled, { passive: true });

    function closeMenu(refocus) {
      if (panel.hidden) return;
      panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', D[lang].ui.menu);
      if (refocus) toggle.focus();
    }
    function openMenu() { panel.hidden = false; toggle.setAttribute('aria-expanded', 'true'); toggle.setAttribute('aria-label', D[lang].ui.closeMenu); }
    on(toggle, 'click', function () { panel.hidden ? openMenu() : closeMenu(); });
    panel.querySelectorAll('a').forEach(function (a) { on(a, 'click', function () { closeMenu(); }); });
    panel.querySelectorAll('[data-lang-switch]').forEach(function (b) { on(b, 'click', function () { closeMenu(); }); });
    on(document, 'keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) closeMenu(true); });
    on(document, 'click', function (e) { if (!panel.hidden && !nav.contains(e.target)) closeMenu(); });
    on(window, 'resize', function () { if (window.innerWidth >= 1024) closeMenu(); });

    // القسم النشط
    var links = {}; app.querySelectorAll('[data-spy]').forEach(function (a) { (links[a.dataset.spy] = links[a.dataset.spy] || []).push(a); });
    function setActive(id) {
      Object.keys(links).forEach(function (k) { links[k].forEach(function (a) { var on_ = k === id; a.classList.toggle('is-active', on_); if (on_) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); });
    }
    if ('IntersectionObserver' in window) {
      var vis = {};
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { vis[e.target.id] = e.isIntersecting; });
        var ids = Object.keys(links), cur = '';
        for (var i = 0; i < ids.length; i++) if (vis[ids[i]]) { cur = ids[i]; break; }
        setActive(cur);
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
      cleanups.push(function () { io.disconnect(); });
    }
  }

  /* ظهور تدريجي */
  function initReveal() {
    var els = app.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
    cleanups.push(function () { io.disconnect(); });
  }

  /* فلترة بانتقال سلس */
  function filterItems(items, test, attr) {
    items.forEach(function (it) {
      var show = test(it);
      if (show && it.hidden) {
        it.hidden = false; it.classList.add('is-out');
        requestAnimationFrame(function () { requestAnimationFrame(function () { it.classList.remove('is-out'); }); });
      } else if (!show && !it.hidden) {
        it.classList.add('is-out');
        setTimeout(function () { if (it.classList.contains('is-out')) it.hidden = true; }, reduce ? 0 : 260);
      }
    });
  }
  function bindFilter(sel, attr, items) {
    var btns = app.querySelectorAll(sel);
    btns.forEach(function (b) {
      on(b, 'click', function () {
        btns.forEach(function (x) { var a = x === b; x.classList.toggle('is-active', a); x.setAttribute('aria-pressed', a ? 'true' : 'false'); });
        var v = b.getAttribute(attr);
        var g = b.closest('.section').querySelector('[data-f]'); if (g) g.dataset.f = v;
        filterItems(items, function (it) { return v === 'all' || it.dataset.cat === v; });
      });
    });
  }

  function initServices() {
    bindFilter('[data-filter]', 'data-filter', Array.prototype.slice.call(app.querySelectorAll('.svc')));
    if (fine && !reduce) {
      app.querySelectorAll('.svc').forEach(function (c) {
        on(c, 'pointermove', function (e) { var r = c.getBoundingClientRect(); c.style.setProperty('--sx', (e.clientX - r.left) + 'px'); c.style.setProperty('--sy', (e.clientY - r.top) + 'px'); });
      });
    }
    app.querySelectorAll('[data-service]').forEach(function (b) {
      on(b, 'click', function () { openModal(R.serviceModal(D, lang, b.dataset.service), false, b); });
    });
  }
  function initWorks() {
    var items = Array.prototype.slice.call(app.querySelectorAll('.work'));
    if (!items.length) return;
    bindFilter('[data-wfilter]', 'data-wfilter', items);
    app.querySelectorAll('[data-work]').forEach(function (b) {
      on(b, 'click', function () { openModal(R.workModal(D, lang, b.dataset.work), true, b); });
    });
  }

  /* ---------------- النوافذ ---------------- */
  function openModal(html, wide, trigger) {
    if (!html) return;
    lastFocus = trigger || document.activeElement;
    modal.innerHTML = html;
    modal.classList.toggle('modal--wide', !!wide);
    modal.dir = D[lang].dir;
    if (!modal.open) { modal.showModal(); document.body.classList.add('is-locked'); }
    modal.scrollTop = 0;
    var x = modal.querySelector('[data-close]'); if (x) x.focus();
    // أعمال مرتبطة داخل نافذة الخدمة
    modal.querySelectorAll('[data-work]').forEach(function (b) {
      b.addEventListener('click', function () { openModal(R.workModal(D, lang, b.dataset.work), true, lastFocus); });
    });
  }
  function stopMedia() { modal.querySelectorAll('video').forEach(function (v) { v.pause(); }); }
  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) { modal.close(); return; }
    var r = modal.getBoundingClientRect();
    if (e.target === modal && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) modal.close();
  });
  modal.addEventListener('close', function () {
    stopMedia(); modal.innerHTML = ''; document.body.classList.remove('is-locked');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  });
  // dialog الأصلي يغلق بـ Escape ويحبس التركيز؛ نضيف احتياطاً لحالة عدم الدعم
  if (typeof modal.showModal !== 'function') {
    modal.showModal = function () { modal.setAttribute('open', ''); };
    modal.close = function () { modal.removeAttribute('open'); modal.dispatchEvent(new Event('close')); };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.hasAttribute('open')) modal.close(); });
  }

  /* ---------------- الشبكة الخلفية ---------------- */
  function initNetwork() {
    var canvases = app.querySelectorAll('canvas.net');
    if (!canvases.length) return;
    canvases.forEach(function (cv) {
      var dark = cv.classList.contains('net--dark'), ctx = cv.getContext('2d');
      if (!ctx) return;
      var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), nodes = [], mouse = { x: -999, y: -999 }, raf = 0, visible = true;
      var line = dark ? '248,193,66' : '6,93,99', dot = dark ? '248,193,66' : '244,175,22';

      function size() {
        var r = cv.getBoundingClientRect(); w = r.width; h = r.height;
        cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = Math.max(18, Math.min(60, Math.round((w * h) / 22000)));
        nodes = [];
        for (var i = 0; i < n; i++) nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, g: Math.random() < .18 });
      }
      function draw(step) {
        ctx.clearRect(0, 0, w, h);
        var i, j, a, b, dx, dy, d, max = 150;
        for (i = 0; i < nodes.length; i++) {
          a = nodes[i];
          if (step) {
            a.x += a.vx; a.y += a.vy;
            if (a.x < 0 || a.x > w) a.vx *= -1; if (a.y < 0 || a.y > h) a.vy *= -1;
            if (fine) { dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy); if (d < 140 && d > 1) { a.x += dx / d * .5; a.y += dy / d * .5; } }
          }
          for (j = i + 1; j < nodes.length; j++) {
            b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
            if (d < max * max) { ctx.strokeStyle = 'rgba(' + line + ',' + ((1 - Math.sqrt(d) / max) * (dark ? .22 : .16)).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
          }
        }
        for (i = 0; i < nodes.length; i++) { a = nodes[i]; ctx.fillStyle = a.g ? 'rgba(' + dot + ',.75)' : 'rgba(' + line + ',.28)'; ctx.beginPath(); ctx.arc(a.x, a.y, a.g ? 2.4 : 1.6, 0, 6.283); ctx.fill(); }
      }
      function loop() { if (visible && !document.hidden) draw(true); raf = requestAnimationFrame(loop); }
      size(); draw(false);
      var animate = !reduce;
      if (animate) raf = requestAnimationFrame(loop);
      var ro = typeof ResizeObserver === 'function' ? new ResizeObserver(function () { size(); if (!animate) draw(false); }) : null;
      if (ro) ro.observe(cv);
      var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }) : null;
      if (io) io.observe(cv);
      var host = cv.parentElement;
      function mv(e) { var r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }
      function lv() { mouse.x = mouse.y = -999; }
      if (fine && animate) { host.addEventListener('pointermove', mv); host.addEventListener('pointerleave', lv); }
      cleanups.push(function () { cancelAnimationFrame(raf); if (ro) ro.disconnect(); if (io) io.disconnect(); host.removeEventListener('pointermove', mv); host.removeEventListener('pointerleave', lv); });
    });
  }

  /* تفاعل الصورة مع المؤشر */
  function initPortrait() {
    var p = app.querySelector('[data-portrait]'), hero = app.querySelector('.hero');
    if (!p || !hero || !fine || reduce) return;
    var raf = 0;
    function mv(e) {
      var r = hero.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        p.style.setProperty('--tx', (nx * -10).toFixed(1) + 'px'); p.style.setProperty('--ty', (ny * -6).toFixed(1) + 'px');
        p.style.setProperty('--mx', (nx * 26).toFixed(1) + 'px'); p.style.setProperty('--my', (ny * 20).toFixed(1) + 'px');
      });
    }
    function lv() { ['--tx', '--ty', '--mx', '--my'].forEach(function (k) { p.style.setProperty(k, '0px'); }); }
    on(hero, 'pointermove', mv); on(hero, 'pointerleave', lv);
  }

  lang = pickLang();
  mount(true);
})();
