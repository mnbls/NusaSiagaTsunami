/* Nusa Siaga — perayaan.
   1. medal(): upacara medali saat satu pulau tuntas. Tokoh anak berdiri di podium, medali jatuh ke lehernya,
      nama pemain muncul huruf demi huruf, dan konfeti turun.
   2. movie(): film cerita penutup setelah misi terakhir (Pulau Juara tuntas). 9 adegan SVG beranimasi:
      gempa, air surut, sirene, lari ke bukit, selamat, pemulihan, dan penobatan Pahlawan Siaga.
   Tanpa pustaka tambahan: SVG + animasi CSS (gaya di style.css, awalan .cel- dan .cm-).
   game.js memanggil lewat window.SiagaCelebrate. */
(function () {
  'use strict';

  const C = {
    ink: '#23263a', sea: '#2f8ee0', seaL: '#6cc4ff', sand: '#ffd98a', grass: '#7cd35a', grassD: '#4fa83a',
    sun: '#ffc93c', coral: '#ff6b6b', orange: '#ff8a3d', purple: '#c084fc', white: '#ffffff', skin: '#ffd2a1',
    hair: '#4a3224', red: '#e94b5a', brown: '#b07a4f', grey: '#c9ccd8', gold: '#ffc93c', goldL: '#ffe27a'
  };
  const ISLAND_LOOK = {
    basic: { color: '#ffe39a', icon: 'book' },
    sim: { color: '#dff59a', icon: 'monitor' },
    struct: { color: '#ffc9a8', icon: 'seawall' },
    nonstruct: { color: '#dccbff', icon: 'megaphone' },
    response: { color: '#ffd08a', icon: 'runner' },
    recovery: { color: '#a9dcff', icon: 'tent' },
    history: { color: '#ffc8dc', icon: 'calendar' },
    final: { color: '#9ff0dc', icon: 'trophy' }
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const voice = t => { if (window.SiagaVoice) window.SiagaVoice.auto(t); };
  const hush = () => { if (window.SiagaVoice) window.SiagaVoice.stop(); };
  // Ikon dari icons.js disisipkan ke dalam SVG lain dengan posisi dan ukuran tertentu.
  const icon = (name, x, y, size) => {
    const s = window.SiagaIcons ? window.SiagaIcons.svg(name) : '';
    return s.replace('<svg ', `<svg x="${x}" y="${y}" width="${size}" height="${size}" `);
  };
  const nest = (svg, x, y, w, h) => String(svg).replace('<svg ', `<svg x="${x}" y="${y}" width="${w}" height="${h}" `);

  /* ---------- Tokoh ---------- */
  // Orang: titik (x, y) adalah telapak kaki. pose: '' | 'run' | 'cheer' | 'duck' | 'bob'.
  function person(x, y, o = {}) {
    const s = o.s || 1, shirt = o.shirt || C.orange, pants = o.pants || C.sea, hair = o.hair || C.hair;
    const letter = o.letter ? `<text x="0" y="-52" text-anchor="middle" font-size="18" font-weight="700" fill="#fff" stroke="${C.ink}" stroke-width="0.8">${esc(o.letter)}</text>` : '';
    const cape = o.cape ? `<path class="cape" d="M-15 -76 L-26 -30 Q0 -22 26 -30 L15 -76 Z" fill="${C.red}" stroke="${C.ink}" stroke-width="3"/>` : '';
    const bag = o.bag ? `<rect x="-24" y="-74" width="14" height="22" rx="4" fill="${C.purple}" stroke="${C.ink}" stroke-width="3"/>` : '';
    const mouth = o.worried
      ? '<ellipse cx="0" cy="-88" rx="4" ry="5" fill="#23263a"/>'
      : '<path d="M-6 -90 Q0 -83 6 -90" fill="none" stroke="#23263a" stroke-width="2.5" stroke-linecap="round"/>';
    const duck = o.pose === 'duck';
    // Merunduk: lutut ditekuk, badan lebih rendah, kedua tangan menutup kepala (digambar di atas kepala).
    const legL = duck ? 'M-7 -40 L-20 -22 L-10 -2' : 'M-7 -40 L-10 -2';
    const legR = duck ? 'M7 -40 L20 -22 L10 -2' : 'M7 -40 L10 -2';
    const armL = duck ? 'M-15 -72 C-34 -92 -26 -116 -6 -118' : 'M-15 -72 L-30 -48';
    const armR = duck ? 'M15 -72 C34 -92 26 -116 6 -118' : 'M15 -72 L30 -48';
    const arms = `<path class="arm l" d="${armL}" stroke="${C.ink}" stroke-width="11" stroke-linecap="round" fill="none"/>
      <path class="arm r" d="${armR}" stroke="${C.ink}" stroke-width="11" stroke-linecap="round" fill="none"/>
      <path class="arm l" d="${armL}" stroke="${C.skin}" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path class="arm r" d="${armR}" stroke="${C.skin}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})"><g class="cm-kid ${o.pose || ''}">
      ${cape}
      <path class="leg l" d="${legL}" stroke="${C.ink}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path class="leg r" d="${legR}" stroke="${C.ink}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path class="leg l" d="${legL}" stroke="${pants}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path class="leg r" d="${legR}" stroke="${pants}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      ${bag}
      <path d="M-17 -76 Q0 -84 17 -76 L15 -36 L-15 -36 Z" fill="${shirt}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
      ${letter}
      ${duck ? '' : arms}
      <circle cx="0" cy="-97" r="18" fill="${C.skin}" stroke="${C.ink}" stroke-width="3"/>
      <path d="M-18 -100 C-17 -122 17 -122 18 -100 C10 -108 -6 -110 -18 -100 Z" fill="${hair}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="-6" cy="-98" r="2.6" fill="#23263a"/><circle cx="6" cy="-98" r="2.6" fill="#23263a"/>
      <ellipse cx="-11" cy="-91" rx="3.5" ry="2" fill="#ff9aa2" opacity=".8"/><ellipse cx="11" cy="-91" rx="3.5" ry="2" fill="#ff9aa2" opacity=".8"/>
      ${mouth}
      ${duck ? arms : ''}
    </g></g>`;
  }

  function medalSvg(cx, cy, r, island, cls = '') {
    const look = ISLAND_LOOK[island] || ISLAND_LOOK.final;
    return `<g class="${cls}">
      <path d="M${cx - 16} ${cy - r - 46} L${cx - 4} ${cy - r + 2} M${cx + 16} ${cy - r - 46} L${cx + 4} ${cy - r + 2}" stroke="${C.ink}" stroke-width="13" stroke-linecap="round"/>
      <path d="M${cx - 16} ${cy - r - 46} L${cx - 4} ${cy - r + 2} M${cx + 16} ${cy - r - 46} L${cx + 4} ${cy - r + 2}" stroke="${look.color}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.74}" fill="${C.goldL}" stroke="#d99a1e" stroke-width="2.5"/>
      ${icon(look.icon, cx - r * 0.55, cy - r * 0.55, r * 1.1)}
      <path class="cel-glint" d="M${cx - r * 0.5} ${cy - r * 0.2} l${r * 0.25} -${r * 0.35}" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    </g>`;
  }

  function confettiHtml(n = 46) {
    const colors = [C.coral, C.sun, '#4fc3f7', C.grass, C.purple, C.orange];
    let out = '';
    for (let i = 0; i < n; i++) {
      const left = Math.round(Math.random() * 100), delay = (Math.random() * 2.4).toFixed(2), dur = (2.6 + Math.random() * 2).toFixed(2);
      const rot = Math.round(Math.random() * 360), w = 7 + Math.round(Math.random() * 6);
      out += `<i style="left:${left}%;background:${colors[i % colors.length]};width:${w}px;animation-delay:${delay}s;animation-duration:${dur}s;transform:rotate(${rot}deg)"></i>`;
    }
    return `<div class="cel-confetti" aria-hidden="true">${out}</div>`;
  }

  /* ---------- Overlay umum ---------- */
  let current = null;
  function openOverlay(cls, label, html) {
    closeOverlay(true);
    const el = document.createElement('div');
    el.className = cls;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', label);
    el.innerHTML = html;
    document.body.appendChild(el);
    document.body.classList.add('cel-open');
    const onKey = e => { if (e.key === 'Escape' && current && current.onEsc) current.onEsc(); else if (current && current.onKey) current.onKey(e); };
    document.addEventListener('keydown', onKey);
    current = { el, onKey, timers: [] };
    return current;
  }
  function closeOverlay(silent) {
    if (!current) return;
    const cur = current;
    current = null;
    cur.timers.forEach(clearTimeout);
    document.removeEventListener('keydown', cur.onKey);
    cur.el.remove();
    document.body.classList.remove('cel-open');
    hush();
    if (!silent && cur.onClose) cur.onClose();
  }

  /* ---------- 1. Upacara medali pulau ---------- */
  // opts: { name, island: { id, no, name, theme }, allDone, sound, onCert, onClose }
  function medal(opts) {
    const is = opts.island, look = ISLAND_LOOK[is.id] || ISLAND_LOOK.final;
    const name = (opts.name || 'Pahlawan Siaga').trim();
    const letters = [...name].map((ch, i) => `<span style="--i:${i}">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
    const isFinal = is.id === 'final';
    const title = isFinal ? 'Medali Juara' : `Medali ${is.name}`;
    const extra = opts.allDone ? ' Semua pulau sudah tuntas. Kamu resmi Pahlawan Siaga Tsunami!' : '';
    const svg = `<svg class="cel-svg" viewBox="0 0 400 420" aria-hidden="true">
      <ellipse cx="200" cy="404" rx="150" ry="12" fill="${C.ink}" opacity=".15"/>
      <rect x="110" y="330" width="180" height="74" rx="8" fill="${look.color}" stroke="${C.ink}" stroke-width="4"/>
      <rect x="40" y="356" width="76" height="48" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
      <rect x="284" y="366" width="76" height="38" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
      <text x="200" y="384" text-anchor="middle" font-size="40" font-weight="700" fill="${C.ink}">${isFinal ? '★' : is.no}</text>
      <g class="cel-jump">${person(200, 330, { s: 1.55, pose: 'cheer', shirt: C.orange, letter: name.charAt(0).toUpperCase(), cape: opts.allDone })}</g>
      ${medalSvg(200, 252, 27, is.id, 'cel-medal')}
      <g class="cel-spark s1">${icon('star', 70, 150, 34)}</g>
      <g class="cel-spark s2">${icon('star', 300, 120, 40)}</g>
      <g class="cel-spark s3">${icon('star', 320, 250, 28)}</g>
      <g class="cel-spark s4">${icon('star', 52, 260, 26)}</g>
    </svg>`;
    const cur = openOverlay('cel', `${title} untuk ${name}`, `
      <div class="cel-rays" aria-hidden="true"></div>
      ${confettiHtml()}
      <div class="cel-card">
        <p class="cel-kicker">${isFinal ? 'Pulau Juara tuntas!' : `Pulau ${is.no} tuntas!`}</p>
        ${svg}
        <h2 class="cel-name">Selamat, <span class="cel-letters">${letters}</span>!</h2>
        <p class="cel-text">Kamu meraih <b>${esc(title)}</b> karena menuntaskan semua misi ${esc(is.name)}: <i>${esc(is.theme)}</i>.${esc(extra)}</p>
        <div class="cel-btns">
          <button class="btn ghost" type="button" data-cel="again">Putar lagi</button>
          ${opts.onCert ? '<button class="btn" type="button" data-cel="cert">Lihat sertifikat</button>' : ''}
          <button class="btn green" type="button" data-cel="close">Lanjut</button>
        </div>
      </div>`);
    cur.onClose = opts.onClose;
    cur.onEsc = () => closeOverlay();
    cur.el.querySelector('[data-cel="again"]').onclick = () => medal(opts);
    cur.el.querySelector('[data-cel="close"]').onclick = () => closeOverlay();
    const certBtn = cur.el.querySelector('[data-cel="cert"]');
    if (certBtn) certBtn.onclick = () => { closeOverlay(true); opts.onCert(); };
    cur.el.querySelector('[data-cel="close"]').focus({ preventScroll: true });
    if (opts.sound) opts.sound();
    cur.timers.push(setTimeout(() => voice(`Hore! Selamat, ${name}! Kamu meraih ${title}.${extra}`), 900));
  }

  /* ---------- 2. Film cerita penutup ---------- */
  const SKY = `<defs>
      <linearGradient id="cmSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#e6f6ff"/></linearGradient>
      <linearGradient id="cmDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb37a"/><stop offset="1" stop-color="#ffe3b8"/></linearGradient>
      <linearGradient id="cmNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2a5c"/><stop offset="1" stop-color="#3b4f9a"/></linearGradient>
    </defs>`;
  const hill = `<path d="M470 450 C520 300 600 196 700 180 C750 172 790 176 820 182 L820 450 Z" fill="${C.grass}" stroke="${C.ink}" stroke-width="4"/>
    <path d="M560 300 C600 280 640 290 660 270 M610 380 C650 360 700 370 730 350" stroke="${C.grassD}" stroke-width="4" stroke-linecap="round"/>`;
  const sand = `<path d="M-20 328 C150 316 300 320 540 332 L540 460 L-20 460 Z" fill="${C.sand}" stroke="${C.ink}" stroke-width="4"/>`;
  const sea = (cls = '') => `<g class="cm-sea ${cls}">
      <path d="M-260 338 C-200 328 -150 328 -100 338 S0 348 60 338 S160 328 220 338 C250 344 272 352 288 372 C300 392 306 420 310 460 L-260 460 Z" fill="${C.sea}" stroke="${C.ink}" stroke-width="4"/>
      <path class="cm-foam" d="M-220 352 C-180 346 -140 346 -100 352 M0 356 C40 350 80 350 120 356 M180 352 C210 348 240 348 266 352" stroke="#bfe6ff" stroke-width="4" stroke-linecap="round"/>
    </g>`;
  const sun = (x = 120, y = 80) => `<g class="cm-sunspin"><circle cx="${x}" cy="${y}" r="34" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/></g>`;
  const cloud = (x, y, cls = '') => `<g class="cm-cloud ${cls}"><path d="M${x} ${y} c0-16 22-22 30-10 c8-16 34-12 36 6 c14 0 18 18 4 20 h-66 c-12 0-14-16-4-16 z" fill="#fff" stroke="${C.ink}" stroke-width="3"/></g>`;
  const house = (x, y, wall, roof, cls = '') => `<g class="cm-house ${cls}" transform="translate(${x} ${y})">
      <rect x="-32" y="-52" width="64" height="52" fill="${wall}" stroke="${C.ink}" stroke-width="4"/>
      <path d="M-42 -50 L0 -86 L42 -50 Z" fill="${roof}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
      <rect x="-9" y="-28" width="18" height="28" fill="${C.brown}" stroke="${C.ink}" stroke-width="3"/>
      <rect x="-26" y="-42" width="14" height="12" fill="#bfe6ff" stroke="${C.ink}" stroke-width="3"/>
    </g>`;
  const palm = (x, y) => `<g class="cm-palm" transform="translate(${x} ${y})">
      <path d="M0 0 C4 -40 2 -70 10 -100" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>
      <path d="M0 0 C4 -40 2 -70 10 -100" stroke="${C.brown}" stroke-width="7" stroke-linecap="round"/>
      <g class="cm-leaves"><path d="M10 -100 C-20 -110 -40 -96 -48 -84 C-28 -96 -10 -98 10 -100 Z M10 -100 C40 -116 60 -104 66 -90 C46 -100 28 -102 10 -100 Z M10 -100 C0 -126 16 -140 30 -138 C20 -128 14 -116 10 -100 Z" fill="${C.grass}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/></g>
    </g>`;
  const evacSign = (x, y) => `<g transform="translate(${x} ${y})">
      <path d="M0 0 V-74" stroke="${C.ink}" stroke-width="6"/>
      <rect x="-30" y="-110" width="64" height="40" rx="6" fill="#2fbf71" stroke="${C.ink}" stroke-width="4"/>
      <path d="M-18 -82 L6 -100 M-2 -102 L8 -100 L6 -90" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="2" y="-114" text-anchor="middle" font-size="13" font-weight="700" fill="${C.ink}">EVAKUASI</text>
    </g>`;
  const fish = (x, y, d = 0) => `<g class="cm-fish" style="animation-delay:${d}s" transform="translate(${x} ${y})">
      <path d="M-14 0 C-6 -10 8 -10 14 0 C8 10 -6 10 -14 0 Z M14 0 L24 -8 L24 8 Z" fill="${C.orange}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="-6" cy="-2" r="2" fill="${C.ink}"/></g>`;
  const bubble = (x, y, text, cls = '') => {
    const w = Math.max(90, text.length * 10 + 26);
    return `<g class="cm-bubble ${cls}" transform="translate(${x} ${y})">
      <rect x="${-w / 2}" y="-44" width="${w}" height="38" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
      <path d="M-8 -7 L0 8 L8 -7" fill="#fff" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M-9 -8 H9" stroke="#fff" stroke-width="4"/>
      <text x="0" y="-18" text-anchor="middle" font-size="18" font-weight="700" fill="${C.ink}">${esc(text)}</text></g>`;
  };
  const wave = (cls) => `<g class="cm-wave ${cls}">
      <path d="M-640 460 L-640 210 C-460 160 -250 150 -120 200 C-60 222 -30 260 -60 290 C-90 312 -130 290 -116 266 C-100 246 -70 262 -80 280 C-50 290 -20 320 0 346 L0 460 Z" fill="${C.sea}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M-600 250 C-460 210 -300 200 -170 228" stroke="#bfe6ff" stroke-width="6" stroke-linecap="round"/>
    </g>`;
  const siren = (x, y) => `<g transform="translate(${x} ${y})">
      <path d="M0 0 V-120" stroke="${C.ink}" stroke-width="7"/>
      <rect x="-20" y="-150" width="40" height="30" rx="6" fill="${C.grey}" stroke="${C.ink}" stroke-width="4"/>
      <circle class="cm-siren-light" cx="0" cy="-160" r="11" fill="${C.red}" stroke="${C.ink}" stroke-width="3"/>
      <g class="cm-siren-waves"><path d="M28 -150 q14 15 0 30 M42 -160 q24 25 0 50 M-28 -150 q-14 15 0 30 M-42 -160 q-24 25 0 50" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/></g>
    </g>`;
  const village = `${house(360, 332, '#fff1d6', C.coral)}${house(448, 336, '#e3f3ff', C.purple)}`;

  function scenes(name, tuti) {
    const first = name.charAt(0).toUpperCase();
    const kid = (x, y, o = {}) => person(x, y, { s: 0.95, letter: first, ...o });
    const mom = (x, y, o = {}) => person(x, y, { s: 1.15, shirt: C.purple, pants: '#5b6b8c', hair: '#2b1d16', ...o });
    const dad = (x, y, o = {}) => person(x, y, { s: 1.2, shirt: '#4fc3f7', pants: '#4a4f6b', hair: '#2b1d16', ...o });
    const tutiAt = (x, y, w, cls = '') => `<g class="${cls}">${nest(tuti, x, y, w, w * 112 / 120)}</g>`;
    return [
      {
        cls: 'title', dur: 6000,
        text: `Nusa Siaga mempersembahkan: Kisah ${name}, Pahlawan Siaga Tsunami.`,
        svg: `<rect width="800" height="450" fill="url(#cmNight)"/>
          ${[[80, 60], [200, 120], [330, 50], [520, 90], [650, 40], [730, 140], [140, 220], [690, 250]].map(([x, y], i) => `<circle class="cm-twinkle" style="animation-delay:${i * 0.3}s" cx="${x}" cy="${y}" r="3" fill="#fff"/>`).join('')}
          <text class="cm-title-1" x="400" y="170" text-anchor="middle" font-size="30" font-weight="700" fill="#ffe27a">Nusa Siaga mempersembahkan</text>
          <text class="cm-title-2" x="400" y="236" text-anchor="middle" font-size="52" font-weight="700" fill="#fff" stroke="${C.ink}" stroke-width="2">Kisah ${esc(name)}</text>
          <text class="cm-title-3" x="400" y="284" text-anchor="middle" font-size="26" font-weight="700" fill="#bfe6ff">Pahlawan Siaga Tsunami</text>
          ${tutiAt(330, 318, 140, 'cm-peek')}`
      },
      {
        cls: 'morning', dur: 7500,
        text: `Pagi yang cerah di Desa Nusa. ${name} bermain di pantai bersama Tuti si Penyu.`,
        svg: `<rect width="800" height="450" fill="url(#cmSky)"/>${sun()}${cloud(300, 70)}${cloud(560, 110, 'slow')}
          ${hill}${sand}${village}${palm(268, 336)}${sea()}
          ${tutiAt(110, 300, 92, 'cm-bob')}
          ${kid(218, 360, { pose: 'bob' })}
          <path class="cm-gull" d="M420 120 q12 -12 24 0 q12 -12 24 0" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`
      },
      {
        cls: 'quake shake', dur: 8000,
        text: `Tiba-tiba tanah berguncang kuat dan lama. ${name} langsung merunduk, berlindung, dan melindungi kepala.`,
        svg: `<rect width="800" height="450" fill="url(#cmSky)"/>${cloud(300, 70)}
          ${hill}${sand}${house(360, 332, '#fff1d6', C.coral, 'wobble')}${house(448, 336, '#e3f3ff', C.purple, 'wobble d2')}${palm(268, 336)}${sea()}
          <path class="cm-crack" d="M120 400 L150 380 L140 362 L180 346 L172 330" stroke="${C.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          ${kid(218, 360, { pose: 'duck', worried: true })}
          ${tutiAt(96, 304, 86)}
          ${bubble(218, 236, 'Merunduk! Lindungi kepala!', 'pop')}`
      },
      {
        cls: 'recede', dur: 8500,
        text: 'Guncangan berhenti. Lihat! Air laut surut jauh dan ikan menggelepar di pasir. Itu tanda alam tsunami!',
        svg: `<rect width="800" height="450" fill="url(#cmSky)"/>${cloud(300, 70)}
          ${hill}${sand}${village}${palm(268, 336)}${sea('out')}
          ${fish(120, 396, 0)}${fish(190, 416, 0.3)}${fish(60, 420, 0.6)}
          ${kid(300, 372, { worried: true })}
          ${bubble(300, 244, 'Air surut! Tanda tsunami!', 'pop')}`
      },
      {
        cls: 'siren', dur: 8500,
        text: `Sirene berbunyi. ${name} mengajak keluarga mengambil tas siaga, lalu mengikuti rambu jalur evakuasi.`,
        svg: `<rect width="800" height="450" fill="url(#cmDusk)"/>
          ${hill}${sand}${village}${sea('out')}${siren(280, 336)}${evacSign(540, 338)}
          ${mom(395, 372, { bag: true })}${dad(452, 376, { bag: true })}${kid(500, 372, { bag: true, pose: 'point' })}
          ${bubble(500, 230, 'Ayo ke bukit!', 'pop')}`
      },
      {
        cls: 'run', dur: 8500,
        text: 'Semua berlari ke bukit, menjauhi pantai. Jangan menonton ombak. Terus naik ke tempat yang tinggi!',
        svg: `<rect width="800" height="450" fill="url(#cmDusk)"/>
          ${hill}${sand}${village}${wave('rise')}${evacSign(540, 338)}
          <g class="cm-runners">${mom(400, 372, { pose: 'run', bag: true })}${dad(445, 376, { pose: 'run', bag: true })}${kid(490, 372, { pose: 'run', bag: true })}</g>
          ${tutiAt(560, 310, 70, 'cm-runners slow')}`
      },
      {
        cls: 'safe', dur: 8500,
        text: 'Gelombang datang, tetapi semua sudah aman di bukit. Mereka menunggu kabar resmi dari BMKG sebelum turun.',
        svg: `<rect width="800" height="450" fill="url(#cmDusk)"/>
          ${hill}${sand}${village}${wave('hit')}
          ${mom(660, 186)}${dad(706, 190)}${kid(752, 188, { pose: 'cheer' })}
          ${icon('radio', 600, 120, 46)}
          ${bubble(668, 92, 'Tunggu info resmi BMKG', 'pop')}`
      },
      {
        cls: 'rebuild', dur: 9000,
        text: 'Setelah aman, warga bergotong royong: membangun kembali, menanam mangrove, dan berlatih evakuasi bersama.',
        svg: `<rect width="800" height="450" fill="url(#cmSky)"/>${sun(680, 80)}${cloud(260, 70)}
          ${hill}${sand}${sea()}
          ${house(360, 332, '#fff1d6', '#2fbf71', 'grow')}${house(448, 336, '#e3f3ff', C.coral, 'grow d2')}
          ${[40, 100, 160, 220].map((x, i) => `<g class="cm-sprout" style="animation-delay:${0.6 + i * 0.4}s">${icon('mangrove', x - 20, 300, 44)}</g>`).join('')}
          ${kid(250, 370, { pose: 'bob' })}${tutiAt(150, 312, 74, 'cm-bob')}
          ${evacSign(540, 338)}`
      },
      {
        cls: 'hero', dur: 11000, last: true,
        text: `${name}, kamu sudah menjelajahi 8 pulau dan kini menjadi Pahlawan Siaga Tsunami! Ingat: gempa kuat atau air laut surut, segera lari ke tempat tinggi.`,
        svg: `<rect width="800" height="450" fill="url(#cmSky)"/>
          <g class="cm-rainbow">${['#ff6b6b', '#ffb04a', '#ffe27a', '#7cd35a', '#4fc3f7', '#c084fc'].map((c, i) => `<path d="M${130 + i * 14} 420 A${270 - i * 14} ${270 - i * 14} 0 0 1 ${670 - i * 14} 420" stroke="${c}" stroke-width="14" fill="none"/>`).join('')}</g>
          <rect x="300" y="336" width="200" height="84" rx="10" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>
          <text x="400" y="392" text-anchor="middle" font-size="40" font-weight="700" fill="${C.ink}">★</text>
          <g class="cel-jump">${person(400, 336, { s: 1.45, pose: 'cheer', letter: first, cape: true })}</g>
          ${medalSvg(400, 262, 24, 'final', 'cel-medal')}
          ${tutiAt(150, 318, 110, 'cm-bob')}
          <g class="cm-banner"><rect x="190" y="40" width="420" height="62" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
            <text x="400" y="82" text-anchor="middle" font-size="30" font-weight="700" fill="${C.ink}">${esc(name)}, Pahlawan Siaga!</text></g>`
      }
    ];
  }

  // opts: { name, mascot: svgString, sound, onClose }
  function movie(opts) {
    const name = (opts.name || 'Pahlawan Siaga').trim();
    const list = scenes(name, opts.mascot || '');
    let idx = 0, paused = false, timer = 0;
    const cur = openOverlay('cm', `Film Kisah ${name}`, `
      <div class="cm-frame">
        <div class="cm-screen"><svg class="cm-svg" viewBox="0 0 800 450" aria-hidden="true"></svg>${''}</div>
        <p class="cm-cap" aria-live="polite"></p>
        <div class="cm-ctrl">
          <button class="btn ghost small" type="button" data-cm="prev" aria-label="Adegan sebelumnya">◀</button>
          <button class="btn small" type="button" data-cm="pause" aria-label="Jeda">Jeda</button>
          <div class="cm-dots" aria-hidden="true">${list.map(() => '<i></i>').join('')}</div>
          <button class="btn ghost small" type="button" data-cm="next" aria-label="Adegan berikutnya">▶</button>
          <button class="btn ghost small" type="button" data-cm="close">Lewati</button>
        </div>
      </div>`);
    cur.onClose = opts.onClose;
    cur.onEsc = () => closeOverlay();
    const svgEl = cur.el.querySelector('.cm-svg');
    const cap = cur.el.querySelector('.cm-cap');
    const dots = [...cur.el.querySelectorAll('.cm-dots i')];
    const pauseBtn = cur.el.querySelector('[data-cm="pause"]');
    const closeBtn = cur.el.querySelector('[data-cm="close"]');
    const schedule = () => {
      clearTimeout(timer);
      if (paused || list[idx].last) return;
      timer = setTimeout(() => show(idx + 1), list[idx].dur);
      cur.timers.push(timer);
    };
    function show(i) {
      if (!current || current !== cur) return;
      idx = Math.max(0, Math.min(list.length - 1, i));
      const sc = list[idx];
      svgEl.setAttribute('class', `cm-svg ${sc.cls}`);
      svgEl.innerHTML = SKY + sc.svg;
      cap.textContent = sc.text;
      dots.forEach((d, n) => d.classList.toggle('on', n <= idx));
      closeBtn.textContent = sc.last ? 'Selesai' : 'Lewati';
      cur.el.querySelector('.cel-confetti')?.remove();
      if (sc.last) {
        cur.el.querySelector('.cm-screen').insertAdjacentHTML('beforeend', confettiHtml(40));
        if (opts.sound) opts.sound();
      }
      voice(sc.text);
      schedule();
    }
    const setPaused = p => {
      paused = p;
      cur.el.classList.toggle('paused', paused);
      pauseBtn.textContent = paused ? 'Putar' : 'Jeda';
      pauseBtn.setAttribute('aria-label', paused ? 'Putar' : 'Jeda');
    };
    // Pindah adegan selalu melanjutkan film, supaya adegan baru tidak membeku di awal.
    const go = i => { setPaused(false); show(i); };
    cur.onKey = e => {
      if (e.key === 'ArrowRight') go(idx + 1);
      else if (e.key === 'ArrowLeft') go(idx - 1);
      else if (e.key === ' ') { e.preventDefault(); pauseBtn.click(); }
    };
    cur.el.querySelector('[data-cm="prev"]').onclick = () => go(idx - 1);
    cur.el.querySelector('[data-cm="next"]').onclick = () => go(idx + 1);
    closeBtn.onclick = () => closeOverlay();
    pauseBtn.onclick = () => {
      setPaused(!paused);
      if (paused) { clearTimeout(timer); hush(); } else schedule();
    };
    closeBtn.focus({ preventScroll: true });
    show(0);
  }

  window.SiagaCelebrate = { medal, movie, close: silent => closeOverlay(silent), get open() { return !!current; } };
})();
