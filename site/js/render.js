/* يولّد HTML الموقع من data/content.js — يُستخدم في المتصفح وفي scripts/build.mjs */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SiteRender = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* مجموعة أيقونات موحّدة: شبكة 24px، خط 1.7، أطراف دائرية */
  var ICONS = {
    camera: '<path d="M4 8h3l1.6-2.2h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.6"/>',
    film: '<rect x="3" y="9" width="18" height="11" rx="2"/><path d="M3 9l2.2-4.5 4 .9L7 9M9.2 9l2.2-4.5 4 .9L13.2 9M15.4 9l2.2-4.5 3 .7L19.4 9"/><path d="M10.5 13.2l3.5 2.3-3.5 2.3z"/>',
    motion: '<path d="M4 19c6.5 0 4.5-14 10-14h4"/><rect x="2.4" y="17.4" width="3.2" height="3.2" rx=".8" transform="rotate(45 4 19)"/><rect x="17.4" y="3.4" width="3.2" height="3.2" rx=".8" transform="rotate(45 19 5)"/><circle cx="11" cy="12.5" r="1.4"/>',
    sparkles: '<path d="M10.5 3.5l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1-5.1-1.9 5.1-1.9z"/><path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    megaphone: '<path d="M4 10v4a1 1 0 0 0 1 1h3l8 4V5L8 9H5a1 1 0 0 0-1 1z"/><path d="M19.5 9.5a4 4 0 0 1 0 5M8 15l1.2 4.2a1 1 0 0 0 1 .8h1"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4M9 15.2l2 2 4-4"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>',
    phone: '<path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    whatsapp: '<path d="M3.5 20.5l1.4-4.6A8.6 8.6 0 1 1 8.3 19L3.5 20.5z"/><path d="M9 8.6c.2 2.6 2.6 5.3 5.9 6.2l1.3-1.3-1.9-1.2-.9.7c-.9-.4-1.8-1.3-2.2-2.2l.7-.9-1.2-1.9L9 8.6z"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17" cy="7" r=".6" fill="currentColor"/>',
    tiktok: '<path d="M14.5 3v11a3.8 3.8 0 1 1-3.8-3.8"/><path d="M14.5 3c.3 2.6 2 4.4 5 4.7"/>',
    facebook: '<path d="M14 21v-8h2.7l.5-3.3H14V7.6c0-1 .5-1.8 1.9-1.8h1.5V3a17 17 0 0 0-2.3-.2c-2.4 0-4.1 1.5-4.1 4.2v2.7H8.3V13H11v8"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.2 9.4v5.2l4.6-2.6z"/>',
    telegram: '<path d="M21 4L3 11.2l5.4 2L10 19l3-3.6 4.6 3.4z"/><path d="M8.4 13.2L21 4"/>',
    linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5V16M8 7.6v.1M11.5 16v-3.2c0-1.4 1-2.3 2.2-2.3s2 .9 2 2.3V16M11.5 10.5V16"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    play: '<path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor"/>',
    download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
    up: '<path d="M12 19V6M6 11.5L12 5.5l6 6"/>',
    diamond: '<path d="M12 3l7 9-7 9-7-9 7-9z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M13.3 7.2v6.6"/><circle cx="11.5" cy="14.3" r="1.8"/><path d="M13.3 7.2c1 .9 2 1.4 3.1 1.6"/>',
    code: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M3 9h18M9.5 12.5L7.5 14.5l2 2M14.5 12.5l2 2-2 2"/>',
    live: '<circle cx="12" cy="12" r="2.2"/><path d="M7.9 7.9a5.8 5.8 0 0 0 0 8.2M16.1 7.9a5.8 5.8 0 0 1 0 8.2M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2"/>'
  };
  var PLATFORM_ICON = { tiktok: 'tiktok', instagram: 'instagram', facebook: 'facebook', youtube: 'youtube', telegram: 'telegram', linkedin: 'linkedin', website: 'globe' };

  function ic(name, cls) {
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || '') + '</svg>';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* نص مع تمييز الكلمات المهمة:  {{كلمة}} = تيل   [[كلمة]] = عنبري */
  function rich(s) {
    return esc(s).replace(/\{\{([\s\S]+?)\}\}/g, '<mark class="hl">$1</mark>').replace(/\[\[([\s\S]+?)\]\]/g, '<mark class="hl hl--a">$1</mark>');
  }
  function plain(s) { return String(s == null ? '' : s).replace(/\{\{|\}\}|\[\[|\]\]/g, ''); }

  function sig(D) {
    var s = JSON.stringify(D), h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return String(h >>> 0);
  }

  function waLink(D, text) { return 'https://wa.me/' + D.contact.phoneIntl + '?text=' + encodeURIComponent(text); }
  function catLabel(D, list, id, lang) {
    var c = D[list].filter(function (x) { return x.id === id; })[0];
    return c ? c[lang] : '';
  }
  function handle(url, fallback) {
    var m = /\/@([^\/?#]+)/.exec(url || '');
    if (m) return '@' + m[1];
    m = /(?:instagram|facebook|t)\.(?:com|me)\/([^\/?#]+)/.exec(url || '');
    return m ? '@' + m[1] : fallback;
  }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function fill(tpl, o) { return String(tpl).replace(/\{(\w+)\}/g, function (m, k) { return o[k] == null ? m : o[k]; }); }
  function minPrice(s) {
    var p = s.pricing; if (!p) return 0;
    var list = (p.rows || p.tiers || []).map(function (x) { return x.price; });
    return list.length ? Math.min.apply(null, list) : 0;
  }
  function cleanUrl(u) { return String(u || '').split('?')[0]; }
  function svcImage(s) { return s.image || 'assets/services/' + s.id + '.svg'; }

  function sectionHead(eyebrow, title, sub, light, id) {
    return '<header class="sec-head reveal' + (light ? ' sec-head--light' : '') + '">' +
      '<span class="eyebrow">' + esc(eyebrow) + '</span>' +
      '<h2 class="sec-title"' + (id ? ' id="' + id + '"' : '') + '>' + rich(title) + '</h2>' +
      '<span class="gold-rule" aria-hidden="true"></span>' +
      (sub ? '<p class="sec-sub">' + rich(sub) + '</p>' : '') +
      '</header>';
  }

  /* ترتيب الأقسام: الخدمات أولاً (هدف الزائر)، ثم الأعمال، ثم التعريف والمهارات، ثم التواصل */
  function sectionsList(D) {
    var s = [{ id: 'services' }];
    if (D.works.length) s.push({ id: 'works' });
    s.push({ id: 'about' }, { id: 'skills' });
    if (D.experience.length) s.push({ id: 'experience' });
    if (D.courses.length) s.push({ id: 'courses' });
    if (D.education.length) s.push({ id: 'education' });
    s.push({ id: 'contact' });
    return s;
  }

  function nav(D, L) {
    var u = L.ui;
    var links = sectionsList(D).map(function (s) {
      return '<a class="nav__link" href="#' + s.id + '" data-spy="' + s.id + '">' + esc(u.nav[s.id]) + '</a>';
    }).join('');
    var cv = D.contact.cv ? '<a class="btn btn--ghost btn--sm" href="' + esc(D.contact.cv) + '" download>' + ic('download') + '<span>' + esc(u.cv) + '</span></a>' : '';
    return '<header class="nav" id="top-nav">' +
      '<div class="container nav__inner">' +
      '<a class="nav__brand" href="#hero" aria-label="' + esc(L.name) + '"><span class="nav__mark" aria-hidden="true">' + ic('diamond') + '</span><span>' + esc(L.brand) + '</span></a>' +
      '<nav class="nav__links" aria-label="' + esc(u.mainNav) + '">' + links + '</nav>' +
      '<div class="nav__actions">' +
      '<button class="btn btn--ghost btn--sm lang-btn" type="button" data-lang-switch="' + L.switchTo + '" lang="' + L.switchTo + '">' + ic('globe') + '<span>' + esc(L.switchLabel) + '</span></button>' +
      cv +
      '<a class="btn btn--primary btn--sm nav__cta" href="#contact"><span>' + esc(u.heroContact) + '</span></a>' +
      '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="' + esc(u.menu) + '">' + ic('menu', 'ic--menu') + ic('close', 'ic--x') + '</button>' +
      '</div></div><span class="nav__progress" aria-hidden="true"></span>' +
      '<div class="nav__panel" id="mobile-menu" hidden><div class="container">' + links.replace(/nav__link/g, 'nav__link nav__link--m') +
      '<div class="nav__panel-actions">' +
      '<button class="btn btn--ghost lang-btn" type="button" data-lang-switch="' + L.switchTo + '" lang="' + L.switchTo + '">' + ic('globe') + '<span>' + esc(L.switchLabel) + '</span></button>' +
      (D.contact.cv ? '<a class="btn btn--ghost" href="' + esc(D.contact.cv) + '" download>' + ic('download') + '<span>' + esc(u.cv) + '</span></a>' : '') +
      '</div></div></div></header>';
  }

  function socialLinks(D, L, cls) {
    var u = L.ui, c = D.contact, out = '';
    out += '<a class="' + cls + '" href="' + waLink(D, u.waGeneral) + '" target="_blank" rel="noopener" aria-label="' + esc(u.whatsapp) + '">' + ic('whatsapp') + '</a>';
    if (c.tiktok) out += '<a class="' + cls + '" href="' + esc(cleanUrl(c.tiktok)) + '" target="_blank" rel="noopener" aria-label="' + esc(u.tiktok) + '">' + ic('tiktok') + '</a>';
    if (c.instagram) out += '<a class="' + cls + '" href="' + esc(cleanUrl(c.instagram)) + '" target="_blank" rel="noopener" aria-label="' + esc(u.instagram) + '">' + ic('instagram') + '</a>';
    if (c.facebook) out += '<a class="' + cls + '" href="' + esc(c.facebook) + '" target="_blank" rel="noopener" aria-label="' + esc(u.facebook) + '">' + ic('facebook') + '</a>';
    out += '<a class="' + cls + '" href="mailto:' + esc(c.email) + '" aria-label="' + esc(u.email) + '">' + ic('mail') + '</a>';
    return out;
  }

  function orbitSvg() {
    var dots = '', i, a, x, y;
    for (i = 0; i < 8; i++) {
      a = (Math.PI * 2 * i) / 8; x = 50 + 48.6 * Math.cos(a); y = 50 + 48.6 * Math.sin(a);
      dots += '<circle cx="' + x.toFixed(2) + '" cy="' + y.toFixed(2) + '" r="' + (i % 2 ? 0.7 : 1.1) + '" class="o-dot"/>';
    }
    var hex = '';
    for (i = 0; i < 6; i++) {
      a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
      hex += (i ? ' ' : '') + (50 + 46 * Math.cos(a)).toFixed(2) + ',' + (50 + 46 * Math.sin(a)).toFixed(2);
    }
    return '<svg class="orbit orbit--a" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48.6" class="o-ring"/>' + dots + '</svg>' +
      '<svg class="orbit orbit--b" viewBox="0 0 100 100" aria-hidden="true"><polygon points="' + hex + '" class="o-hex"/><circle cx="50" cy="50" r="46" class="o-ring o-ring--dash"/></svg>';
  }

  function hero(D, L) {
    var u = L.ui;
    var tags = L.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    var words = L.name.split(' ').map(function (w, i) { return '<span class="w"><span style="--k:' + i + '">' + esc(w) + '</span></span>'; }).join(' ');
    var role = L.role.split(' · ').map(function (r, i) { return '<span class="role__i">' + (i ? '<i class="dot" aria-hidden="true"></i>' : '') + esc(r) + '</span>'; }).join('');
    var primary = D.works.length
      ? '<a class="btn btn--primary" href="#works"><span>' + esc(u.heroWorks) + '</span>' + ic('arrow', 'ic--dir') + '</a>'
      : '<a class="btn btn--primary" href="#services"><span>' + esc(u.heroServices) + '</span>' + ic('arrow', 'ic--dir') + '</a>';
    var chipIcons = ['camera', 'film', 'sparkles'];
    var chips = u.floatChips.map(function (t, i) {
      return '<span class="fchip fchip--' + (i + 1) + '" aria-hidden="true"><span class="fchip__ic">' + ic(chipIcons[i]) + '</span>' + esc(t) + '</span>';
    }).join('');
    return '<section class="hero" id="hero" aria-labelledby="hero-name">' +
      '<canvas class="net" aria-hidden="true"></canvas>' +
      '<div class="hero__glow hero__glow--1" aria-hidden="true"></div><div class="hero__glow hero__glow--2" aria-hidden="true"></div>' +
      '<div class="container hero__grid">' +
      '<div class="hero__text">' +
      '<span class="hero__eyebrow rise" style="--i:0">' + ic('pin') + '<span>' + esc(L.eyebrow) + '</span></span>' +
      '<h1 class="hero__name" id="hero-name" aria-label="' + esc(L.name) + '">' + words + '</h1>' +
      '<p class="hero__name-alt rise" style="--i:3" lang="' + (L.lang === 'ar' ? 'en' : 'ar') + '">' + esc(L.nameEn) + '</p>' +
      '<p class="hero__role rise" style="--i:4">' + role + '</p>' +
      '<p class="hero__bio rise" style="--i:5">' + rich(L.tagline) + '</p>' +
      '<ul class="chips rise" style="--i:6">' + tags + '</ul>' +
      '<div class="hero__cta rise" style="--i:7">' + primary +
      '<a class="btn btn--outline" href="#contact"><span>' + esc(u.heroContact) + '</span></a></div>' +
      '<div class="hero__meta rise" style="--i:8"><div class="social">' + socialLinks(D, L, 'social__a') + '</div>' +
      '<span class="loc">' + ic('pin') + '<span>' + esc(L.location) + '</span></span></div>' +
      '</div>' +
      '<div class="hero__visual rise" style="--i:3"><div class="portrait" data-portrait>' +
      '<div class="portrait__aura" aria-hidden="true"></div>' + orbitSvg() +
      '<div class="portrait__disc" aria-hidden="true"></div>' +
      '<div class="portrait__clip"><img class="portrait__img" src="assets/img/portrait.webp" width="720" height="1037" fetchpriority="high" decoding="async" alt="' + esc(L.name) + '"></div>' +
      chips + '</div></div>' +
      '</div></section>' + ticker(D, L);
  }

  function ticker(D, L) {
    var item = function (s) { return '<li><span>' + esc(plain(s[L.lang].title)) + '</span>' + ic('diamond', 'ic--tick') + '</li>'; };
    var one = D.services.map(item).join('');
    return '<div class="ticker" dir="ltr" aria-hidden="true"><ul class="ticker__track">' + one + one + one + one + '</ul></div>';
  }

  function about(D, L) {
    var u = L.ui;
    var diff = u.diff.map(function (t) { return '<li>' + ic('diamond', 'ic--bullet') + '<span>' + rich(t) + '</span></li>'; }).join('');
    var focus = u.focus.map(function (t) { return '<li>' + ic('check') + '<span>' + esc(t) + '</span></li>'; }).join('');
    return '<section class="section" id="about" aria-labelledby="about-t"><div class="container">' +
      sectionHead(u.aboutEyebrow, u.aboutTitle, '', false, 'about-t') +
      '<div class="about__grid">' +
      '<article class="card card--main reveal"><p class="lead">' + rich(u.aboutP1) + '</p><p>' + rich(u.aboutP2) + '</p>' +
      '<h3 class="card__h">' + esc(u.diffTitle) + '</h3><ul class="diff">' + diff + '</ul></article>' +
      '<aside class="card card--navy reveal" style="--d:.1s">' +
      '<div class="center-badge"><img src="assets/img/logo.png" width="52" height="52" alt="" loading="lazy" decoding="async"><div><small>' + esc(u.centerLabel) + '</small><strong>' + esc(L.center) + '</strong></div></div>' +
      '<h3 class="card__h">' + esc(u.focusTitle) + '</h3><ul class="focus">' + focus + '</ul></aside>' +
      '</div></div></section>';
  }

  function services(D, L, lang) {
    var u = L.ui;
    var filters = '<div class="filters reveal" role="group" aria-label="' + esc(u.servicesTitle) + '">' +
      '<button type="button" class="chip-btn is-active" data-filter="all" aria-pressed="true">' + esc(u.all) + '</button>' +
      D.serviceCats.map(function (c) { return '<button type="button" class="chip-btn" data-filter="' + c.id + '" aria-pressed="false">' + esc(c[lang]) + '</button>'; }).join('') + '</div>';
    var cards = D.services.map(function (s, i) {
      var t = s[lang];
      var wide = (i === D.services.length - 1 && D.services.length % 3 === 1) ? ' svc--wide' : '';
      var mp = minPrice(s);
      var tag = mp ? '<span class="svc__tag"><small>' + esc(u.fromPrice) + '</small><b>' + fmt(mp) + '</b><small>' + esc(u.currency) + '</small></span>' : '';
      return '<article class="svc reveal' + wide + (mp ? ' svc--priced' : '') + '" style="--d:' + (i % 3) * 0.07 + 's" data-cat="' + s.cat + '">' +
        '<div class="svc__media"><img src="' + esc(svcImage(s)) + '" width="640" height="400" alt="" loading="lazy" decoding="async">' + tag + '</div>' +
        '<div class="svc__body"><span class="svc__ic">' + ic(s.icon) + '</span>' +
        '<div class="svc__wrap"><h3 class="svc__t">' + esc(plain(t.title)) + '</h3><p class="svc__d">' + rich(t.desc) + '</p></div>' +
        '<div class="svc__actions"><a class="btn btn--primary btn--sm svc__order" target="_blank" rel="noopener" href="' + waLink(D, u.waOrder + plain(t.title)) + '">' + ic('whatsapp') + '<span>' + esc(u.order) + '</span></a>' +
        '<button type="button" class="svc__btn" data-service="' + s.id + '" aria-haspopup="dialog"><span>' + esc(mp || D.works.length ? u.details : u.detailsOnly) + '</span>' + ic('arrow', 'ic--dir') + '</button></div></div></article>';
    }).join('');
    return '<section class="section section--tint" id="services" aria-labelledby="services-t"><div class="container">' +
      sectionHead(u.servicesEyebrow, u.servicesTitle, u.servicesSub, false, 'services-t') +
      filters + '<div class="svc-grid" data-f="all">' + cards + '</div></div></section>';
  }

  function workCard(D, L, w, lang) {
    var t = w[lang], thumb = w.thumb || w.poster || (w.type === 'image' ? w.src : '');
    return '<li class="work" data-cat="' + w.cat + '"><button type="button" class="work__btn" data-work="' + esc(w.id) + '" aria-haspopup="dialog" aria-label="' + esc(t.title) + '">' +
      '<span class="work__media" style="aspect-ratio:' + esc(w.ratio || '4/5') + '">' +
      (thumb ? '<img src="' + esc(thumb) + '" alt="' + esc(t.title) + '" loading="lazy" decoding="async">' : '<span class="work__ph"></span>') +
      (w.type === 'video' ? '<span class="work__play" aria-hidden="true">' + ic('play') + '</span>' : '') +
      '</span><span class="work__cap"><strong>' + esc(t.title) + '</strong><small>' + esc(catLabel(D, 'workCats', w.cat, lang)) + '</small></span></button></li>';
  }

  function works(D, L, lang) {
    if (!D.works.length) return '';
    var u = L.ui;
    var used = {}; D.works.forEach(function (w) { used[w.cat] = 1; });
    var filters = '<div class="filters reveal" role="group" aria-label="' + esc(u.worksTitle) + '">' +
      '<button type="button" class="chip-btn is-active" data-wfilter="all" aria-pressed="true">' + esc(u.all) + '</button>' +
      D.workCats.filter(function (c) { return used[c.id]; }).map(function (c) { return '<button type="button" class="chip-btn" data-wfilter="' + c.id + '" aria-pressed="false">' + esc(c[lang]) + '</button>'; }).join('') + '</div>';
    return '<section class="section" id="works" aria-labelledby="works-t"><div class="container">' +
      sectionHead(u.worksEyebrow, u.worksTitle, u.worksSub, false, 'works-t') +
      filters + '<ul class="works">' + D.works.map(function (w) { return workCard(D, L, w, lang); }).join('') + '</ul></div></section>';
  }

  function skills(D, L, lang) {
    var u = L.ui;
    var groups = D.skills.map(function (g, i) {
      var t = g[lang];
      return '<div class="card skill reveal" style="--d:' + i * 0.06 + 's"><h3 class="card__h">' + esc(t.title) + '</h3><ul class="tags">' +
        t.items.map(function (x) { return '<li' + (g.latin ? ' class="tag--latin" dir="ltr"' : '') + '>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
    return '<section class="section section--tint" id="skills" aria-labelledby="skills-t"><div class="container">' +
      sectionHead(u.skillsEyebrow, u.skillsTitle, u.skillsSub, false, 'skills-t') +
      '<div class="skills-grid">' + groups + '</div></div></section>';
  }

  function experience(D, L, lang) {
    if (!D.experience.length) return '';
    var u = L.ui;
    var items = D.experience.map(function (e, i) {
      var t = e[lang];
      return '<li class="tl__item reveal" style="--d:' + i * 0.05 + 's"><span class="tl__dot" aria-hidden="true"></span><div class="card"><span class="tl__period">' + esc(t.period) + '</span><h3>' + esc(t.role) + '</h3>' +
        (t.org ? '<p class="tl__org">' + esc(t.org) + '</p>' : '') + (t.desc ? '<p>' + esc(t.desc) + '</p>' : '') + '</div></li>';
    }).join('');
    return '<section class="section" id="experience" aria-labelledby="exp-t"><div class="container">' +
      sectionHead(u.experienceEyebrow, u.experienceTitle, '', false, 'exp-t') + '<ol class="tl">' + items + '</ol></div></section>';
  }

  function courses(D, L, lang) {
    if (!D.courses.length) return '';
    var u = L.ui;
    var items = D.courses.map(function (c, i) {
      var t = c[lang];
      return '<article class="card course reveal" style="--d:' + i * 0.05 + 's"><h3>' + esc(t.title) + '</h3>' +
        (t.audience ? '<p><strong>' + esc(u.courseAudience) + ':</strong> ' + esc(t.audience) + '</p>' : '') +
        (t.topics && t.topics.length ? '<p><strong>' + esc(u.courseTopics) + ':</strong></p><ul class="diff">' + t.topics.map(function (x) { return '<li>' + ic('diamond', 'ic--bullet') + '<span>' + esc(x) + '</span></li>'; }).join('') + '</ul>' : '') +
        (t.mode ? '<p><strong>' + esc(u.courseMode) + ':</strong> ' + esc(t.mode) + '</p>' : '') +
        '<a class="btn btn--outline btn--sm" target="_blank" rel="noopener" href="' + waLink(D, u.waCourse + t.title) + '">' + esc(u.courseInquire) + '</a></article>';
    }).join('');
    return '<section class="section section--tint" id="courses" aria-labelledby="courses-t"><div class="container">' +
      sectionHead(u.coursesEyebrow, u.coursesTitle, '', false, 'courses-t') + '<div class="course-grid">' + items + '</div></div></section>';
  }

  function education(D, L, lang) {
    if (!D.education.length) return '';
    var u = L.ui;
    var items = D.education.map(function (e, i) {
      var t = e[lang];
      return '<article class="card reveal" style="--d:' + i * 0.05 + 's"><h3>' + esc(t.title) + '</h3><p>' + esc([t.org, t.year].filter(Boolean).join(' · ')) + '</p></article>';
    }).join('');
    return '<section class="section" id="education" aria-labelledby="edu-t"><div class="container">' +
      sectionHead(u.educationEyebrow, u.educationTitle, '', false, 'edu-t') + '<div class="course-grid">' + items + '</div></div></section>';
  }

  function contactCard(href, icon, label, value, ext) {
    return '<a class="ccard reveal" href="' + href + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '><span class="ccard__ic">' + ic(icon) + '</span><span class="ccard__t"><small>' + esc(label) + '</small><strong>' + value + '</strong></span>' + ic('arrow', 'ic--dir ccard__go') + '</a>';
  }

  function contact(D, L, lang) {
    var u = L.ui, c = D.contact;
    var cards = contactCard(waLink(D, u.waGeneral), 'whatsapp', u.whatsapp, '<bdi dir="ltr">' + esc(c.phoneDisplay) + '</bdi>', true) +
      contactCard('tel:+' + c.phoneIntl, 'phone', u.call, '<bdi dir="ltr">' + esc(c.phoneDisplay) + '</bdi>') +
      contactCard('mailto:' + esc(c.email), 'mail', u.email, '<bdi dir="ltr">' + esc(c.email) + '</bdi>');
    var personal = '';
    if (c.tiktok) personal += contactCard(esc(cleanUrl(c.tiktok)), 'tiktok', u.tiktok + ' · ' + u.personal, '<bdi dir="ltr">' + esc(handle(c.tiktok, 'TikTok')) + '</bdi>', true);
    if (c.instagram) personal += contactCard(esc(cleanUrl(c.instagram)), 'instagram', u.instagram + ' · ' + u.personal, '<bdi dir="ltr">' + esc(handle(c.instagram, 'Instagram')) + '</bdi>', true);
    if (c.facebook) personal += contactCard(esc(c.facebook), 'facebook', u.facebook + ' · ' + u.personal, '<bdi dir="ltr">Facebook</bdi>', true);
    var work = (c.accounts || []).filter(function (a) { return a && a.url; }).map(function (a) {
      var lab = (a[lang] && a[lang].label) || u[a.platform] || a.platform;
      return contactCard(esc(cleanUrl(a.url)), PLATFORM_ICON[a.platform] || 'globe', lab, '<bdi dir="ltr">' + esc(handle(a.url, u[a.platform] || a.platform)) + '</bdi>', true);
    }).join('');
    return '<section class="section section--dark" id="contact" aria-labelledby="contact-t"><canvas class="net net--dark" aria-hidden="true"></canvas><div class="container contact">' +
      sectionHead(u.contactEyebrow, u.contactTitle, u.contactSub, true, 'contact-t') +
      '<div class="contact__grid">' + cards + '</div>' +
      (personal ? '<h3 class="contact__sub reveal">' + esc(u.personalAccounts) + '</h3><div class="contact__grid">' + personal + '</div>' : '') +
      (work ? '<h3 class="contact__sub reveal">' + esc(u.workAccounts) + '</h3><div class="contact__grid">' + work + '</div>' : '') +
      '<p class="contact__loc reveal">' + ic('pin') + '<span>' + esc(L.location) + '</span></p>' +
      '<a class="btn btn--amber reveal" target="_blank" rel="noopener" href="' + waLink(D, u.waGeneral) + '">' + ic('whatsapp') + '<span>' + esc(u.startProject) + '</span></a>' +
      '</div></section>';
  }

  function footer(D, L, year) {
    var u = L.ui;
    var links = sectionsList(D).map(function (s) { return '<a href="#' + s.id + '">' + esc(u.nav[s.id]) + '</a>'; }).join('');
    return '<footer class="footer"><div class="container footer__in">' +
      '<div class="footer__brand"><span class="footer__mark" aria-hidden="true">' + ic('diamond') + '</span><div><strong>' + esc(L.name) + '</strong>' +
      '<small>© <span data-year>' + year + '</span> ' + esc(L.name) + ' · ' + esc(u.rights) + '</small></div></div>' +
      '<nav class="footer__links" aria-label="' + esc(u.footerLinks) + '">' + links + '</nav>' +
      '<a class="to-top" href="#hero" aria-label="' + esc(u.top) + '" title="' + esc(u.top) + '">' + ic('up') + '</a>' +
      '</div></footer>';
  }

  function render(D, lang, year) {
    var L = D[lang];
    year = year || new Date().getFullYear();
    return nav(D, L) + '<main id="main">' + hero(D, L) + services(D, L, lang) + works(D, L, lang) + about(D, L) + skills(D, L, lang) +
      experience(D, L, lang) + courses(D, L, lang) + education(D, L, lang) + contact(D, L, lang) + '</main>' + footer(D, L, year);
  }

  /* ----------------------------- النوافذ ----------------------------- */

  function pricingHtml(D, lang, s) {
    var u = D[lang].ui, p = s.pricing, t = s[lang];
    if (!p) return '';
    var rows = '', head = p.type === 'coins' ? u.coinsPricing : u.tiersPricing;
    if (p.type === 'coins') {
      rows = '<ul class="plist plist--coins">' + p.rows.map(function (r) {
        var msg = fill(u.waCoins, { n: fmt(r.amount), p: fmt(r.price) });
        return '<li><span class="plist__ic">' + ic('coin') + '</span><span class="plist__n"><b>' + fmt(r.amount) + '</b> ' + esc(u.coinUnit) + '</span>' +
          '<span class="plist__p"><b>' + fmt(r.price) + '</b> <small>' + esc(u.currency) + '</small></span>' +
          '<a class="plist__go" target="_blank" rel="noopener" href="' + waLink(D, msg) + '" aria-label="' + esc(u.orderShort + ' ' + fmt(r.amount) + ' ' + u.coinUnit) + '">' + ic('whatsapp') + '<span>' + esc(u.orderShort) + '</span></a></li>';
      }).join('') + '</ul>';
    } else {
      rows = '<ul class="plist plist--tiers">' + p.tiers.map(function (r) {
        var x = r[lang], msg = fill(u.waTier, { n: x.name, p: fmt(r.price) });
        return '<li class="tier' + (r.tone ? ' tier--' + r.tone : '') + '"><div class="tier__t"><strong>' + esc(x.name) + '</strong><span class="tier__note">' + esc(x.note) + '</span></div>' +
          '<div class="tier__p"><b>' + fmt(r.price) + '</b> <small>' + esc(u.currency) + '</small></div>' +
          '<a class="plist__go" target="_blank" rel="noopener" href="' + waLink(D, msg) + '" aria-label="' + esc(u.orderShort + ' ' + x.name) + '">' + ic('whatsapp') + '<span>' + esc(u.orderShort) + '</span></a></li>';
      }).join('') + '</ul>';
    }
    var extras = (t.extras && t.extras.length) ? '<h3 class="card__h">' + esc(t.extrasTitle || '') + '</h3><ul class="xtra">' + t.extras.map(function (e) {
      return '<li><a target="_blank" rel="noopener" href="' + waLink(D, u.waOrder + e) + '">' + ic('check') + '<span>' + esc(e) + '</span></a></li>';
    }).join('') + '</ul>' : '';
    return '<h3 class="card__h">' + esc(head) + '</h3>' + rows + '<p class="plist__note">' + esc(u.pricingNote) + '</p>' + extras;
  }

  function serviceModal(D, lang, id) {
    var L = D[lang], u = L.ui;
    var s = D.services.filter(function (x) { return x.id === id; })[0];
    if (!s) return '';
    var t = s[lang];
    var rel = D.works.filter(function (w) { return w.service === id; });
    var relHtml = rel.length ? '<h3 class="card__h">' + esc(u.relatedWorks) + '</h3><ul class="rel">' + rel.map(function (w) {
      var th = w.thumb || w.poster || (w.type === 'image' ? w.src : '');
      return '<li><button type="button" data-work="' + esc(w.id) + '" aria-label="' + esc(w[lang].title) + '"><span style="aspect-ratio:' + esc(w.ratio || '4/5') + '">' + (th ? '<img src="' + esc(th) + '" alt="" loading="lazy">' : '') + '</span></button></li>';
    }).join('') + '</ul>' : '';
    return '<button class="modal__x" type="button" data-close aria-label="' + esc(u.close) + '">' + ic('close') + '</button>' +
      '<div class="modal__media"><img src="' + esc(svcImage(s)) + '" width="640" height="400" alt=""></div>' +
      '<div class="modal__body"><span class="svc__ic">' + ic(s.icon) + '</span><h2 id="modal-title">' + esc(plain(t.title)) + '</h2><p class="modal__lead">' + rich(t.desc) + '</p><p>' + rich(t.long) + '</p>' +
      '<h3 class="card__h">' + esc(u.whatIncluded) + '</h3><ul class="diff">' + t.points.map(function (p) { return '<li>' + ic('diamond', 'ic--bullet') + '<span>' + rich(p) + '</span></li>'; }).join('') + '</ul>' +
      pricingHtml(D, lang, s) + relHtml +
      '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + waLink(D, u.waOrder + plain(t.title)) + '">' + ic('whatsapp') + '<span>' + esc(u.order) + '</span></a></div>';
  }

  function workModal(D, lang, id) {
    var L = D[lang], u = L.ui;
    var w = D.works.filter(function (x) { return x.id === id; })[0];
    if (!w) return '';
    var t = w[lang];
    var media = w.type === 'video'
      ? '<video class="lb__media" controls playsinline preload="metadata" ' + (w.poster ? 'poster="' + esc(w.poster) + '" ' : '') + 'src="' + esc(w.src) + '"></video>'
      : '<img class="lb__media" src="' + esc(w.src) + '" alt="' + esc(t.title) + '" decoding="async">';
    return '<button class="modal__x" type="button" data-close aria-label="' + esc(u.close) + '">' + ic('close') + '</button>' +
      '<div class="lb"><div class="lb__stage" style="--r:' + esc(w.ratio || '4/5') + '">' + media + '</div>' +
      '<div class="lb__info"><h2 id="modal-title">' + esc(t.title) + '</h2>' +
      (t.service ? '<p class="lb__svc"><small>' + esc(u.workService) + '</small><strong>' + esc(t.service) + '</strong></p>' : '') +
      (t.desc ? '<p>' + esc(t.desc) + '</p>' : '') +
      '<a class="btn btn--primary btn--sm" target="_blank" rel="noopener" href="' + waLink(D, u.waService + (t.service || t.title)) + '">' + ic('whatsapp') + '<span>' + esc(u.inquire) + '</span></a></div></div>';
  }

  function jsonLd(D) {
    var A = D.ar, c = D.contact;
    var same = [c.tiktok, c.instagram, c.facebook].concat((c.accounts || []).map(function (a) { return a && a.url; })).filter(Boolean).map(cleanUrl);
    var o = {
      '@context': 'https://schema.org', '@type': 'Person',
      name: A.name, alternateName: A.nameEn, jobTitle: A.role.replace(/ · /g, ' / '),
      image: 'assets/img/portrait.png', email: 'mailto:' + c.email, telephone: '+' + c.phoneIntl,
      address: { '@type': 'PostalAddress', addressLocality: 'Baghdad', addressCountry: 'IQ' },
      affiliation: { '@type': 'Organization', name: A.center },
      knowsAbout: A.tags,
      makesOffer: D.services.map(function (x) { return { '@type': 'Offer', itemOffered: { '@type': 'Service', name: plain(x.ar.title) } }; })
    };
    if (same.length) o.sameAs = same;
    return JSON.stringify(o, null, 2);
  }

  return { render: render, serviceModal: serviceModal, workModal: workModal, sig: sig, jsonLd: jsonLd, esc: esc };
});
