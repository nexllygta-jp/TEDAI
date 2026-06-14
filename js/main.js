/**
 * TED AI Stage — JS v3
 * Split Hero + Live Screen + Filmstrip
 */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ── URL helper ── */
function vidSrc(f) {
  return 'assets/videos/' + f.split('/').map(encodeURIComponent).join('/');
}
function escAttr(s) {
  return String(s).replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ================================================================
   NAV
================================================================ */
function initNav() {
  const nav    = $('#navbar');
  const toggle = $('.nav-toggle');
  const links  = $('.nav-links');
  const anchors = $$('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    highlightCurrent();
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  anchors.forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  function highlightCurrent() {
    let cur = '';
    $$('section[id]').forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) cur = s.id;
    });
    anchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${cur}`));
  }
}

/* ================================================================
   SCROLL REVEAL
================================================================ */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  $$('.reveal').forEach(el => obs.observe(el));
}

/* ================================================================
   HERO — LIVE PREVIEW SCREEN + FILMSTRIP
================================================================ */
function initHero() {
  const videos = SITE_CONFIG.videos;
  if (!videos || !videos.length) return;

  const previewVid  = $('#hero-preview-video');
  const overlay     = $('#hero-screen-overlay');
  const npTitle     = $('#hero-np-title');
  const filmstrip   = $('#hero-filmstrip');

  let currentIdx = 0;

  // Load first video as muted preview
  function loadPreview(idx) {
    const v = videos[idx];
    if (!v) return;
    const iframe = $('#hero-preview-iframe');
    currentIdx = idx;

    if (v.file.startsWith("http")) {
      if (previewVid) { previewVid.pause(); previewVid.style.display = 'none'; }
      if (iframe) { iframe.src = v.file; iframe.style.display = 'block'; }
    } else {
      if (iframe) { iframe.src = ''; iframe.style.display = 'none'; }
      if (previewVid) {
        previewVid.style.display = 'block';
        previewVid.src = vidSrc(v.file);
        previewVid.load();
        previewVid.play().catch(() => {});
      }
    }

    if (npTitle) npTitle.textContent = v.title;

    // Highlight active filmstrip item
    $$('.h-film-item', filmstrip).forEach((el, i) => el.classList.toggle('active', i === idx));
  }

  // Build filmstrip
  if (filmstrip) {
    filmstrip.innerHTML = videos.slice(0, 10).map((v, i) => {
      return `
        <div class="h-film-item${i === 0 ? ' active' : ''}" role="button" tabindex="0" data-idx="${i}" aria-label="معاينة: ${escAttr(v.title)}">
          <div class="h-film-thumb">
            <img src="assets/images/video_banner.png" alt="${escAttr(v.title)}" />
            <div class="h-film-play" aria-hidden="true">
              <div class="h-film-play-icon">
                <svg viewBox="0 0 24 24"><path fill="white" d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
          <div class="h-film-title">${v.title}</div>
        </div>`;
    }).join('');

    // Filmstrip click → switch preview
    filmstrip.addEventListener('click', e => {
      const item = e.target.closest('.h-film-item');
      if (!item) return;
      const idx = parseInt(item.dataset.idx, 10);
      loadPreview(idx);
    });

    filmstrip.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const item = e.target.closest('.h-film-item');
        if (item) { e.preventDefault(); item.click(); }
      }
    });
  }

  // Overlay click → go to theater and play with sound
  if (overlay) {
    overlay.addEventListener('click', () => {
      const v = videos[currentIdx];
      if (!v) return;
      const theater = $('#theater');
      if (theater) theater.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => playInTheater(v.file, v.title, v.category), 650);
    });

    overlay.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); overlay.click(); }
    });
  }

  // Start with first video
  loadPreview(0);

  // Auto-advance preview every 15s
  setInterval(() => {
    const next = (currentIdx + 1) % Math.min(videos.length, 10);
    loadPreview(next);
  }, 15000);
}

/* ================================================================
   THEATER SECTION
================================================================ */
function initTheater() {
  renderFilters();
  renderVideoGrid(SITE_CONFIG.videos);

  const ph = $('#theater-ph');
  if (ph) {
    ph.addEventListener('click', () => {
      const v = SITE_CONFIG.videos[0];
      if (v) playInTheater(v.file, v.title, v.category);
    });
    ph.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') ph.click(); });
  }
}

function playInTheater(file, title, category) {
  const player = $('#theater-video-player');
  const iframe = $('#theater-iframe-player');
  const ph     = $('#theater-ph');
  const tTitle = $('#theater-now-title');
  const tCat   = $('#theater-now-cat');

  if (ph) ph.style.display = 'none';
  if (tTitle) tTitle.textContent = title;
  if (tCat)   tCat.textContent   = category || '—';

  if (file.startsWith("http")) {
    if (player) { player.pause(); player.style.display = 'none'; }
    if (iframe) {
      iframe.src = file;
      iframe.style.display = 'block';
    }
  } else {
    if (iframe) { iframe.src = ''; iframe.style.display = 'none'; }
    if (player) {
      player.style.display = 'block';
      player.src = vidSrc(file);
      player.load();
      player.play().catch(() => {});
    }
  }

  // Scroll to theater
  const sec = $('#theater');
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderFilters() {
  const el = $('#video-filters');
  if (!el) return;

  const cats = ['الكل', ...new Set(SITE_CONFIG.videos.map(v => v.category))];
  el.innerHTML = cats.map((c, i) =>
    `<button class="filter-tab${i === 0 ? ' active' : ''}" data-cat="${escAttr(c)}">${c}</button>`
  ).join('');

  el.addEventListener('click', e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    $$('.filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    renderVideoGrid(cat === 'الكل' ? SITE_CONFIG.videos : SITE_CONFIG.videos.filter(v => v.category === cat));
  });
}

function renderVideoGrid(vids) {
  const grid = $('#video-grid');
  if (!grid) return;

  grid.innerHTML = vids.map((v, i) => {
    return `
      <article class="video-card reveal r${Math.min((i % 4) + 1, 4)}" role="listitem"
               data-file="${escAttr(v.file)}" data-title="${escAttr(v.title)}"
               data-desc="${escAttr(v.desc)}" data-cat="${escAttr(v.category)}">
        <div class="video-thumb">
          <img src="assets/images/video_banner.png" alt="${escAttr(v.title)}" class="video-banner-img" />
          <div class="v-play-ov" aria-hidden="true">
            <button class="v-play-mini" tabindex="-1">
              <svg viewBox="0 0 24 24"><path fill="white" d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <span class="v-cat-badge">${v.category}</span>
        </div>
        <div class="video-card-body">
          <h3 class="video-card-title">${v.title}</h3>
          <p class="video-card-desc">${v.desc}</p>
          <button class="video-card-btn">▶ مشاهدة على المسرح</button>
        </div>
      </article>`;
  }).join('');

  initReveal();
  applyCardTilt($$('.video-card', grid));

  $$('.video-card', grid).forEach(card => {
    // Click → play in theater
    card.addEventListener('click', () => {
      playInTheater(card.dataset.file, card.dataset.title, card.dataset.cat);
    });
  });
}

/* ================================================================
   3D CARD TILT
================================================================ */
function applyCardTilt(cards) {
  cards.forEach(card => {
    let frame;
    card.addEventListener('mousemove', e => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r  = card.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
        const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
        card.style.transform = `perspective(700px) rotateY(${dx * 7}deg) rotateX(${-dy * 4}deg) translateZ(6px)`;
        card.style.transition = 'transform 0.08s ease';
      });
    });
    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(frame);
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease, border-color 0.32s ease, box-shadow 0.32s ease';
    });
  });
}

/* ================================================================
   DOCUMENTS
================================================================ */
function renderDocuments() {
  const grid = $('#docs-grid');
  if (!grid) return;
  grid.innerHTML = SITE_CONFIG.documents.map((d, i) => {
    const enc  = encodeURIComponent(d.file);
    const href = `assets/documents/${enc}`;
    return `
      <article class="doc-card reveal r${Math.min(i + 1, 4)}" role="listitem">
        <div class="doc-icon">📄</div>
        <div class="doc-cat">${d.category} · Word</div>
        <h3 class="doc-title">${d.title}</h3>
        <p class="doc-desc">${d.desc}</p>
        <div class="doc-actions">
          <a href="${href}" target="_blank" rel="noopener noreferrer" class="doc-btn doc-btn-open">🔗 فتح</a>
          <a href="${href}" download="${d.file}" class="doc-btn doc-btn-dl">⬇ تحميل</a>
        </div>
      </article>`;
  }).join('');
}

/* ================================================================
   SKILLS
================================================================ */
function renderSkills() {
  const grid = $('#skills-grid');
  if (!grid) return;
  grid.innerHTML = SITE_CONFIG.skills.map((s, i) => `
    <div class="skill-card reveal r${Math.min((i % 4) + 1, 4)}" role="listitem">
      <span class="skill-icon">${s.icon}</span>
      <h3 class="skill-name">${s.name}</h3>
      <p class="skill-desc">${s.desc}</p>
    </div>`).join('');
}

/* ================================================================
   ABOUT
================================================================ */
function renderAbout() {
  const el = $('#about-tags');
  if (!el) return;
  el.innerHTML = SITE_CONFIG.about.tags.map(t => `<span class="about-tag">${t}</span>`).join('');
}

/* ================================================================
   CONTACT
================================================================ */
function renderContact() {
  const map = {
    '#contact-email':     SITE_CONFIG.contact.email,
    '#contact-phone':     SITE_CONFIG.contact.phone,
    '#contact-instagram': SITE_CONFIG.contact.instagram,
    '#contact-linkedin':  SITE_CONFIG.contact.linkedin,
  };
  Object.entries(map).forEach(([sel, val]) => {
    const el = $(sel);
    if (el) el.textContent = val;
  });
}

function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = $('#form-submit-btn');
    if (btn) {
      btn.textContent = '✓ تم الإرسال!';
      btn.style.background = '#1a7a3a';
      setTimeout(() => { btn.textContent = 'إرسال الرسالة →'; btn.style.background = ''; form.reset(); }, 3000);
    }
  });
}

/* ================================================================
   MODAL
================================================================ */
function initModal() {
  const backdrop = $('#video-modal');
  const player   = $('#modal-video-player');
  const iframe   = $('#modal-iframe-player');
  const closeBtn = $('#modal-close');

  function close() {
    if (player) { player.pause(); player.src = ''; }
    if (iframe) { iframe.src = ''; }
    if (backdrop) { backdrop.classList.remove('open'); backdrop.setAttribute('aria-hidden', 'true'); }
    document.body.style.overflow = '';
  }

  if (closeBtn)  closeBtn.addEventListener('click', close);
  if (backdrop)  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ================================================================
   MOUSE PARALLAX on hero stage
================================================================ */
function initParallax() {
  const frame = $('#hero-screen-frame');
  if (!frame) return;

  document.addEventListener('mousemove', e => {
    if (window.scrollY > window.innerHeight * 0.5) return;
    const x = (e.clientX / window.innerWidth  - 0.5) * 6;
    const y = (e.clientY / window.innerHeight - 0.5) * 3;
    frame.style.transform = `perspective(1200px) rotateY(${-x * 0.6}deg) rotateX(${y * 0.4}deg)`;
    frame.style.transition = 'transform 0.12s ease';
  });
}

/* ================================================================
   INIT
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderAbout();
  renderDocuments();
  renderSkills();
  renderContact();

  initHero();
  initTheater();
  initNav();
  initReveal();
  initModal();
  initContactForm();
  initParallax();

  // Tilt on doc cards
  applyCardTilt($$('.doc-card'));
});
