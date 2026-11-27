/* Nusa Siaga — perayaan.
   1. medal(): upacara medali saat satu pulau tuntas, dengan latar sesuai tema pulau. Tokoh anak di podium, medali jatuh ke lehernya,
      nama pemain muncul huruf demi huruf, dan konfeti turun.
   2. movie(): film kartun bersambung setelah misi terakhir (Pulau Juara tuntas). Kamera mengikuti tokoh dari
      pantai ke desa lalu ke bukit (gempa, air surut, sirene, lari, ombak, pemulihan), ditutup rekap hasil main pemain.
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

  /* ---------- Latar medali sesuai tema pulau (viewBox 400×420, tokoh di tengah x 200) ---------- */
  const THEMES = {
    basic: () => ({
      lesson: 'Kamu kini paham apa itu tsunami, penyebabnya, dan tanda-tandanya.',
      bg: `<g transform="translate(14 228)">
          <path d="M0 10 Q42 -6 84 10 V86 Q42 70 0 86 Z" fill="#fff" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"/>
          <path d="M84 10 V86" stroke="${C.ink}" stroke-width="3"/>
          <path d="M10 28 H70 M10 42 H62 M10 56 H70" stroke="${C.grey}" stroke-width="3" stroke-linecap="round"/>
          <path class="th-page" d="M42 2 Q63 -6 84 10 V86 Q63 70 42 78 Z" fill="#fff6dd" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
        </g>
        <g class="th-glow">${icon('bulb', 296, 34, 72)}</g>
        <text class="th-float f1" x="64" y="120" font-size="40" font-weight="700" fill="${C.sea}">?</text>
        <text class="th-float f2" x="330" y="200" font-size="40" font-weight="700" fill="${C.coral}">!</text>`
    }),
    sim: () => ({
      lesson: 'Kamu sudah mencoba sendiri gempa, letusan gunung api, longsor, dan meteor di laboratorium.',
      bg: `<rect x="12" y="160" width="112" height="84" rx="10" fill="#1d2a5c" stroke="${C.ink}" stroke-width="4"/>
        <path d="M60 244 V262 M40 266 H80" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
        <path class="th-draw" d="M20 204 H40 L48 184 L56 226 L64 176 L72 230 L80 196 L88 210 H116" stroke="#7cd35a" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>
        <path d="M306 190 H346 V236 L374 300 H278 L306 236 Z" fill="#e3f3ff" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M296 262 H356 L372 296 H282 Z" fill="${C.seaL}" opacity=".85"/>
        ${[0, 1, 2, 3].map(i => `<circle class="th-bubble" style="animation-delay:${i * 0.45}s" cx="${314 + i * 10}" cy="276" r="${5 + (i % 2) * 3}" fill="#fff" stroke="${C.ink}" stroke-width="2"/>`).join('')}`
    }),
    struct: () => ({
      lesson: 'Kamu tahu cara melindungi pantai: tanggul, mangrove, dan bangunan tahan gempa.',
      bg: `<g class="th-rise">
          <rect x="24" y="236" width="70" height="96" fill="${C.grey}" stroke="${C.ink}" stroke-width="4"/>
          <path d="M24 264 H94 M24 296 H94 M58 236 V264 M42 264 V296 M76 264 V296 M58 296 V332" stroke="${C.ink}" stroke-width="2.5"/>
        </g>
        <g class="th-splash"><path d="M-60 332 V250 C-30 236 0 244 14 262 C22 272 14 284 4 280 C14 300 18 318 20 332 Z" fill="${C.sea}" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"/>
          <circle cx="28" cy="230" r="5" fill="${C.seaL}" stroke="${C.ink}" stroke-width="2"/><circle cx="40" cy="214" r="4" fill="${C.seaL}" stroke="${C.ink}" stroke-width="2"/></g>
        ${[0, 1].map(i => `<g class="th-grow" style="animation-delay:${0.8 + i * 0.5}s">${icon('mangrove', 292 + i * 52, 244, 64)}</g>`).join('')}`
    }),
    nonstruct: () => ({
      lesson: 'Kamu siap menyebarkan peringatan dini dan mengenali rambu jalur evakuasi.',
      bg: `<g transform="translate(336 334) scale(1.1)">${sirenTower()}</g>
        <g class="th-pop">${evacSignAt(54, 332)}</g>
        <g class="th-pulse">${icon('megaphone', 26, 60, 64)}</g>
        <path class="th-arcs" d="M98 78 q14 14 0 28 M112 68 q26 24 0 48" stroke="${C.coral}" stroke-width="4" stroke-linecap="round"/>`
    }),
    response: () => ({
      lesson: 'Kamu tahu langkah selamat: kenali tanda alam, bawa tas siaga, dan lari ke tempat tinggi.',
      bg: `<path d="M250 334 C290 250 330 200 410 190 V334 Z" fill="${C.grass}" stroke="${C.ink}" stroke-width="4"/>
        <path d="M352 196 V140" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
        <path class="th-flag" d="M354 142 Q374 136 392 146 Q374 154 354 160 Z" fill="${C.red}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
        <path class="th-draw" d="M268 318 L290 290 L312 262 L334 232" stroke="${C.ink}" stroke-width="4" stroke-dasharray="4 10" stroke-linecap="round"/>
        <g class="th-bounce">${icon('bag', 22, 250, 70)}</g>`
    }),
    recovery: () => ({
      lesson: 'Kamu tahu cara bangkit setelah bencana: posko, kebersihan, dan saling menguatkan.',
      bg: `<g class="th-rainbow">${['#ff6b6b', '#ffb04a', '#ffe27a', '#7cd35a', '#4fc3f7', '#c084fc'].map((c, i) => `<path d="M${20 + i * 10} 330 A${180 - i * 10} ${180 - i * 10} 0 0 1 ${380 - i * 10} 330" stroke="${c}" stroke-width="10" fill="none"/>`).join('')}</g>
        <g class="th-grow" style="animation-delay:.6s">${houseAt(52, 334, '#fff1d6', '#2fbf71')}</g>
        <g class="th-grow" style="animation-delay:1.1s">${houseAt(348, 334, '#e3f3ff', C.coral)}</g>
        <g class="th-float f1">${icon('heart', 300, 60, 46)}</g>`
    }),
    history: () => ({
      lesson: 'Kamu belajar dari kisah nyata tsunami di Indonesia, seperti kisah Smong di Simeulue.',
      bg: `<g class="th-unroll"><rect x="22" y="40" width="356" height="56" rx="10" fill="#fff6dd" stroke="${C.ink}" stroke-width="4"/></g>
        <circle cx="22" cy="68" r="14" fill="${C.brown}" stroke="${C.ink}" stroke-width="3.5"/><circle cx="378" cy="68" r="14" fill="${C.brown}" stroke="${C.ink}" stroke-width="3.5"/>
        ${['1883', '1992', '2004', '2006', '2018'].map((y, i) => `<text class="th-pop" style="animation-delay:${0.9 + i * 0.35}s" x="${68 + i * 66}" y="76" text-anchor="middle" font-size="19" font-weight="700" fill="${C.ink}">${y}</text>`).join('')}
        <g class="th-bounce">${icon('calendar', 22, 240, 66)}</g>
        <g class="th-bounce d2">${icon('book', 314, 240, 66)}</g>`
    }),
    final: () => ({
      lesson: 'Kamu lulus ujian akhir. Semua ilmu siaga tsunami sudah kamu kuasai!',
      bg: `${[[70, 80, C.coral, 0], [330, 64, '#4fc3f7', 0.6], [200, 40, C.sun, 1.2], [110, 180, C.purple, 1.8], [300, 170, C.grass, 0.9]].map(([x, y, c, d]) => `<g class="th-burst" style="animation-delay:${d}s" transform="translate(${x} ${y})">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M0 0 L0 -30" transform="rotate(${a})" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`).join('')}<circle r="6" fill="${c}"/></g>`).join('')}
        <g class="th-bounce">${icon('trophy', 18, 252, 72)}</g>
        <g class="th-bounce d2">${icon('trophy', 310, 252, 72)}</g>`
    })
  };

  /* ---------- 1. Upacara medali pulau ---------- */
  // opts: { name, island: { id, no, name, theme }, allDone, sound, onCert, onClose }
  function medal(opts) {
    const is = opts.island, look = ISLAND_LOOK[is.id] || ISLAND_LOOK.final;
    const name = (opts.name || 'Pahlawan Siaga').trim();
    const letters = [...name].map((ch, i) => `<span style="--i:${i}">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
    const isFinal = is.id === 'final';
    const title = isFinal ? 'Medali Juara' : `Medali ${is.name}`;
    const extra = opts.allDone ? ' Semua pulau sudah tuntas. Kamu resmi Pahlawan Siaga Tsunami!' : '';
    const theme = (THEMES[is.id] || THEMES.final)();
    const svg = `<svg class="cel-svg" viewBox="0 0 400 420" aria-hidden="true">
      <g class="cel-theme">${theme.bg}</g>
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
        <p class="cel-text">Kamu meraih <b>${esc(title)}</b> karena menuntaskan semua misi ${esc(is.name)}. ${esc(theme.lesson)}${esc(extra)}</p>
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
    cur.timers.push(setTimeout(() => voice(`Hore! Selamat, ${name}! Kamu meraih ${title}. ${theme.lesson}${extra}`), 900));
  }

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
  const bubble = (x, y, text, cls = '') => {
    const w = Math.max(90, text.length * 10 + 26);
    return `<g class="cm-bubble ${cls}" transform="translate(${x} ${y})">
      <rect x="${-w / 2}" y="-44" width="${w}" height="38" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
      <path d="M-8 -7 L0 8 L8 -7" fill="#fff" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M-9 -8 H9" stroke="#fff" stroke-width="4"/>
      <text x="0" y="-18" text-anchor="middle" font-size="18" font-weight="700" fill="${C.ink}">${esc(text)}</text></g>`;
  };
  const wave = (cls) => `<g class="cm-wave ${cls}">
      <path d="M-640 900 L-640 210 C-460 160 -250 150 -120 200 C-60 222 -30 260 -60 290 C-90 312 -130 290 -116 266 C-100 246 -70 262 -80 280 C-50 290 -20 320 0 346 L0 900 Z" fill="${C.sea}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M-600 250 C-460 210 -300 200 -170 228" stroke="#bfe6ff" stroke-width="6" stroke-linecap="round"/>
    </g>`;
  const siren = (x, y) => `<g transform="translate(${x} ${y})">
      <path d="M0 0 V-120" stroke="${C.ink}" stroke-width="7"/>
      <rect x="-20" y="-150" width="40" height="30" rx="6" fill="${C.grey}" stroke="${C.ink}" stroke-width="4"/>
      <circle class="cm-siren-light" cx="0" cy="-160" r="11" fill="${C.red}" stroke="${C.ink}" stroke-width="3"/>
      <g class="cm-siren-waves"><path d="M28 -150 q14 15 0 30 M42 -160 q24 25 0 50 M-28 -150 q-14 15 0 30 M-42 -160 q-24 25 0 50" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/></g>
    </g>`;

  /* ---------- 2. Film kartun bersambung ---------- */
  // Satu dunia panjang (pantai → desa → bukit, x 0..2800). Kamera, tokoh, langit, laut, dan ombak dihitung
  // setiap frame dari satu garis waktu, jadi film mengalir tanpa slide. Di akhir: rekap hasil main pemain.
  const SKY_DEFS = `<defs>
      <linearGradient id="cmSkyG" x1="0" y1="0" x2="0" y2="1"><stop id="cmSkyTop" offset="0" stop-color="#8fd3ff"/><stop id="cmSkyBot" offset="1" stop-color="#e6f6ff"/></linearGradient>
      <linearGradient id="cmRecapG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#fff6dd"/></linearGradient>
    </defs>`;
  const hillPath = `<path d="M1630 342 C1760 330 1900 226 2250 178 C2420 166 2620 172 2900 182 L2900 900 L1630 900 Z" fill="${C.grass}" stroke="${C.ink}" stroke-width="4"/>
    <path d="M1900 300 C1960 280 2020 290 2060 268 M2200 260 C2260 240 2320 250 2380 236 M2500 300 C2560 280 2640 290 2700 276" stroke="${C.grassD}" stroke-width="4" stroke-linecap="round"/>`;
  const sandPath = `<path d="M-900 334 C-200 324 600 326 1700 336 L1700 900 L-900 900 Z" fill="${C.sand}" stroke="${C.ink}" stroke-width="4"/>`;
  const seaPath = `<path d="M-1400 340 C-1300 330 -1200 330 -1100 340 S-900 350 -800 340 S-600 330 -500 340 S-300 350 -200 340 S0 330 100 340 S300 350 400 340 S560 332 620 342 C660 350 690 380 700 470 L700 900 L-1400 900 Z" fill="${C.sea}" stroke="${C.ink}" stroke-width="4"/>
    <path class="cm-foam" d="M-300 356 C-260 350 -220 350 -180 356 M100 358 C140 352 180 352 220 358 M420 356 C460 350 500 350 540 356" stroke="#bfe6ff" stroke-width="4" stroke-linecap="round"/>`;
  const sirenTower = () => siren(0, 0);
  const evacSignAt = (x, y) => evacSign(x, y);
  const houseAt = (x, y, wall, roof) => house(x, y, wall, roof);
  // Permukaan tanah (untuk menaruh kaki tokoh): pasir datar lalu lereng bukit.
  const GROUND = [[-2000, 340], [1640, 340], [1760, 320], [1880, 272], [2000, 230], [2120, 202], [2250, 180], [2450, 172], [2900, 180]];
  const groundY = x => {
    for (let i = 1; i < GROUND.length; i++) {
      const [x1, y1] = GROUND[i];
      if (x <= x1) { const [x0, y0] = GROUND[i - 1]; return y0 + (y1 - y0) * (x - x0) / (x1 - x0); }
    }
    return GROUND[GROUND.length - 1][1];
  };
  const ease = k => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
  const clamp01 = k => Math.max(0, Math.min(1, k));
  // keys: [[detik, nilai], ...] diurutkan; di antara dua kunci nilainya dihaluskan.
  function track(keys, t) {
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        const [t0, v0] = keys[i - 1], [t1, v1] = keys[i];
        return v0 + (v1 - v0) * ease((t - t0) / (t1 - t0 || 1));
      }
    }
    return keys[keys.length - 1][1];
  }
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, k) => { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
  const SKY_KEYS = [[0, '#8fd3ff', '#e6f6ff'], [25, '#8fd3ff', '#e6f6ff'], [28, '#ff9f6b', '#ffe3b8'], [45, '#ff9f6b', '#ffe3b8'], [48, '#7d89b0', '#d5dbe8'], [52.6, '#7d89b0', '#d5dbe8'], [53, '#8fd3ff', '#e6f6ff']];
  function skyAt(t) {
    for (let i = 1; i < SKY_KEYS.length; i++) {
      if (t <= SKY_KEYS[i][0]) {
        const k = clamp01((t - SKY_KEYS[i - 1][0]) / (SKY_KEYS[i][0] - SKY_KEYS[i - 1][0]));
        return [mix(SKY_KEYS[i - 1][1], SKY_KEYS[i][1], k), mix(SKY_KEYS[i - 1][2], SKY_KEYS[i][2], k)];
      }
    }
    return [SKY_KEYS[SKY_KEYS.length - 1][1], SKY_KEYS[SKY_KEYS.length - 1][2]];
  }

  const T_RECAP = 60, T_END = 82;

  // Garis waktu tokoh: posisi x di dunia dan pose pada tiap rentang waktu.
  const KID_X = [[0, 860], [26, 860], [31, 1310], [36, 1310], [46, 2390], [53, 2390]];
  const MOM_X = [[29, 1215], [36, 1215], [46, 2320]];
  const DAD_X = [[29, 1400], [36, 1400], [46, 2460]];
  const pick = (segs, t) => { for (const [until, v] of segs) if (t < until) return v; return segs[segs.length - 1][1]; };
  const KID_POSE = [[12, 'bob'], [17, 'duck'], [26, 'worried'], [31, 'run'], [36, 'point'], [46, 'run'], [53, 'cheer'], [999, 'bob']];
  const FAM_POSE = [[36, ''], [46, 'run'], [53, ''], [999, 'bob']];

  function captionsFor(name, sum) {
    const list = [
      [0, `Kisah ${name}, Pahlawan Siaga Tsunami.`],
      [5, `Pagi yang cerah di Desa Nusa. ${name} bermain di pantai bersama Tuti si Penyu.`],
      [12, `Tiba-tiba tanah berguncang kuat dan lama! ${name} merunduk, berlindung, dan melindungi kepala.`],
      [19, 'Guncangan berhenti. Air laut surut jauh dan ikan menggelepar di pasir. Itu tanda alam tsunami!'],
      [26, `${name} berlari ke desa. Sirene berbunyi tanda bahaya.`],
      [31, `${name} mengajak keluarga membawa tas siaga, lalu mengikuti rambu jalur evakuasi.`],
      [36, 'Semua berlari ke bukit. Jangan menonton ombak, terus naik ke tempat tinggi!'],
      [46, 'Gelombang datang, tetapi semua sudah aman di bukit. Mereka menunggu kabar resmi dari BMKG.'],
      [53, 'Setelah aman, warga bergotong royong membangun kembali rumah dan menanam mangrove.']
    ];
    const medals = sum.islands.filter(i => i.done).length;
    list.push([T_RECAP, `${name}, kamu mengumpulkan ${medals} dari 8 medali pulau dan ${sum.stars} dari ${sum.max} bintang!`]);
    const facts = [];
    if (sum.best) facts.push(`Pulau terbaikmu adalah ${sum.best}.`);
    if (sum.hard) facts.push(`Misi tersulit yang berhasil kamu taklukkan: ${sum.hard}.`);
    if (sum.testGain != null && sum.testGain > 0) facts.push(`Nilai Tes Siagamu naik ${sum.testGain} poin.`);
    list.push([T_RECAP + 7, facts.length ? facts.join(' ') : 'Setiap misi kamu selesaikan dengan semangat pantang menyerah.']);
    list.push([T_RECAP + 14, `Kamu resmi Pahlawan Siaga Tsunami! Ingat: gempa kuat atau air laut surut, segera lari ke tempat tinggi.`]);
    return list;
  }

  function recapSvg(name, sum) {
    const first = name.charAt(0).toUpperCase();
    const medalRow = sum.islands.map((is, i) => {
      const x = 104 + i * 85, look = ISLAND_LOOK[is.id] || ISLAND_LOOK.final;
      const disk = is.done
        ? `<circle cx="${x}" cy="128" r="27" fill="${C.gold}" stroke="${C.ink}" stroke-width="3.5"/><circle cx="${x}" cy="128" r="20" fill="${C.goldL}" stroke="#d99a1e" stroke-width="2"/>${icon(look.icon, x - 15, 113, 30)}`
        : `<circle cx="${x}" cy="128" r="27" fill="#e9ebf2" stroke="${C.greyD || '#8c8fa3'}" stroke-width="3" stroke-dasharray="6 5"/>${icon('lock', x - 12, 116, 24)}`;
      return `<g class="cm-rc-medal" style="animation-delay:${0.5 + i * 0.35}s">
        <path d="M${x - 10} 82 L${x - 4} 104 M${x + 10} 82 L${x + 4} 104" stroke="${is.done ? look.color : '#d5d8e2'}" stroke-width="7" stroke-linecap="round"/>
        ${disk}
        <text x="${x}" y="176" text-anchor="middle" font-size="15" font-weight="700" fill="${C.ink}">★ ${is.stars}/${is.max}</text></g>`;
    }).join('');
    const lines = [
      ['Bintang', `${sum.stars} / ${sum.max}`],
      ['Misi tuntas', `${sum.done} / ${sum.count}`],
      ['Pulau terbaik', sum.best || '-'],
      ['Misi tersulit', sum.hard || '-'],
      sum.testGain != null ? ['Tes Siaga', `${sum.testGain >= 0 ? 'naik' : 'turun'} ${Math.abs(sum.testGain)} poin`] : ['Kelas', sum.cls || '-']
    ];
    const short = s => (String(s).length > 22 ? String(s).slice(0, 21) + '…' : String(s));
    return `<rect width="800" height="450" fill="url(#cmRecapG)"/>
      <g class="cm-rc-rainbow">${['#ff6b6b', '#ffb04a', '#ffe27a', '#7cd35a', '#4fc3f7', '#c084fc'].map((c, i) => `<path d="M${30 + i * 12} 470 A${250 - i * 12} ${250 - i * 12} 0 0 1 ${530 - i * 12} 470" stroke="${c}" stroke-width="12" fill="none" opacity=".75"/>`).join('')}</g>
      <g class="cm-rc-banner"><rect x="170" y="14" width="460" height="54" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
        <text x="400" y="51" text-anchor="middle" font-size="27" font-weight="700" fill="${C.ink}">${esc(short(name))}, Pahlawan Siaga!</text></g>
      ${medalRow}
      <rect x="170" y="372" width="160" height="70" rx="10" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>
      <text x="250" y="420" text-anchor="middle" font-size="34" font-weight="700" fill="${C.ink}">★</text>
      <g class="cel-jump">${person(250, 372, { s: 1.15, pose: 'cheer', letter: first, cape: true })}</g>
      ${medalSvg(250, 312, 18, 'final', 'cm-rc-pop')}
      <g class="cm-rc-card"><rect x="392" y="200" width="388" height="236" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
        <text x="414" y="236" font-size="21" font-weight="700" fill="#d9480f">Hasil petualanganmu</text>
        ${lines.map(([k, v], i) => `<g class="cm-rc-line" style="animation-delay:${2.4 + i * 0.5}s"><text x="414" y="${276 + i * 36}" font-size="18" fill="${C.ink}" opacity=".75">${esc(k)}</text>
          <text x="758" y="${276 + i * 36}" text-anchor="end" font-size="19" font-weight="700" fill="${C.ink}">${esc(short(v))}</text></g>`).join('')}</g>`;
  }

  // opts: { name, mascot: svgString, summary, sound, onClose }
  function movie(opts) {
    const name = (opts.name || 'Pahlawan Siaga').trim();
    const sum = opts.summary || { islands: [], stars: 0, max: 0, done: 0, count: 0 };
    const caps = captionsFor(name, sum);
    const first = name.charAt(0).toUpperCase();
    const tuti = opts.mascot || '';
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const world = `${sandPath}<g id="cmSea">${seaPath}</g>
      ${[0, 1, 2].map(i => `<g class="cm-fish-w" id="cmFish${i}" transform="translate(${360 + i * 120} ${392 + (i % 2) * 18})"><g class="cm-fish">
        <path d="M-14 0 C-6 -10 8 -10 14 0 C8 10 -6 10 -14 0 Z M14 0 L24 -8 L24 8 Z" fill="${C.orange}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="-6" cy="-2" r="2" fill="${C.ink}"/></g></g>`).join('')}
      ${palm(980, 338)}${palm(1520, 338)}
      ${hillPath}
      <g id="cmOldHouses">${house(1160, 338, '#fff1d6', C.coral)}${house(1260, 338, '#e3f3ff', C.purple)}${house(1380, 338, '#fff1d6', '#4fc3f7')}</g>
      <g id="cmNewHouses">${[[1160, '#2fbf71'], [1260, C.coral], [1380, C.sun]].map(([x, r], i) => `<g id="cmNH${i}" transform="translate(${x} 338)"><g class="cmNHs">${house(0, 0, '#ffffff', r)}</g></g>`).join('')}</g>
      <g id="cmSiren" transform="translate(1470 338)">${siren(0, 0)}</g>
      ${evacSign(1620, 338)}
      ${[0, 1, 2, 3].map(i => `<g id="cmSprout${i}" transform="translate(${760 + i * 70} 340)"><g class="cmSp">${icon('mangrove', -22, -46, 46)}</g></g>`).join('')}
      <g id="cmTuti"><g id="cmTutiIn">${nest(tuti, -40, -74, 80, 75)}</g></g>
      <g id="cmMom"></g><g id="cmDad"></g><g id="cmKid"></g>
      <g id="cmBubble"></g>
      <g id="cmWave"><g transform="scale(2.4 1)">${wave('')}</g></g>`;
    const cur = openOverlay('cm', `Film Kisah ${name}`, `
      <div class="cm-frame">
        <div class="cm-screen">
          <svg class="cm-svg" viewBox="0 0 800 450" aria-hidden="true">${SKY_DEFS}
            <rect width="800" height="450" fill="url(#cmSkyG)"/>
            <g id="cmSun"><circle cx="660" cy="84" r="36" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/></g>
            ${cloud(140, 70)}${cloud(470, 110, 'slow')}
            <g id="cmCam">${world}</g>
            <rect id="cmFlash" width="800" height="450" fill="#fff" opacity="0"/>
            <g id="cmTitle"><rect width="800" height="450" fill="#1d2a5c" opacity=".72"/>
              <text x="400" y="176" text-anchor="middle" font-size="28" font-weight="700" fill="#ffe27a">Nusa Siaga mempersembahkan</text>
              <text x="400" y="240" text-anchor="middle" font-size="50" font-weight="700" fill="#fff" stroke="${C.ink}" stroke-width="2">Kisah ${esc(name.length > 18 ? name.slice(0, 17) + '…' : name)}</text>
              <text x="400" y="290" text-anchor="middle" font-size="26" font-weight="700" fill="#bfe6ff">Pahlawan Siaga Tsunami</text></g>
            <g id="cmRecap" opacity="0">${recapSvg(name, sum)}</g>
          </svg>
        </div>
        <p class="cm-cap" aria-live="polite"></p>
        <div class="cm-ctrl">
          <button class="btn small" type="button" data-cm="pause">Jeda</button>
          <div class="cm-bar" aria-hidden="true"><i></i></div>
          <button class="btn ghost small" type="button" data-cm="again" hidden>Tonton lagi</button>
          <button class="btn ghost small" type="button" data-cm="close">Lewati</button>
        </div>
      </div>`);
    cur.onClose = opts.onClose;
    cur.onEsc = () => closeOverlay();
    const $ = sel => cur.el.querySelector(sel);
    const el = id => cur.el.querySelector('#' + id);
    const cam = el('cmCam'), skyTop = el('cmSkyTop'), skyBot = el('cmSkyBot'), sea = el('cmSea'), wv = el('cmWave');
    const kidG = el('cmKid'), momG = el('cmMom'), dadG = el('cmDad'), tutiG = el('cmTuti'), bubbleG = el('cmBubble');
    const oldH = el('cmOldHouses'), sirenG = el('cmSiren'), flash = el('cmFlash'), title = el('cmTitle'), recap = el('cmRecap');
    const newH = [0, 1, 2].map(i => el('cmNH' + i).firstElementChild), sprouts = [0, 1, 2, 3].map(i => el('cmSprout' + i).firstElementChild);
    const fish = [0, 1, 2].map(i => el('cmFish' + i));
    const cap = $('.cm-cap'), bar = $('.cm-bar i'), pauseBtn = $('[data-cm="pause"]'), closeBtn = $('[data-cm="close"]'), againBtn = $('[data-cm="again"]');

    // Tokoh digambar ulang hanya saat posenya berubah; posisinya diperbarui tiap frame.
    const drawn = new Map();
    const setChar = (g, key, html) => { if (drawn.get(g) !== key) { drawn.set(g, key); g.innerHTML = html; } };
    let bubbleKey = '';
    const setBubble = (text, x, y) => {
      const key = text ? `${text}` : '';
      if (key !== bubbleKey) { bubbleKey = key; bubbleG.innerHTML = text ? bubble(0, 0, text) : ''; }
      if (text) bubbleG.setAttribute('transform', `translate(${x} ${y})`);
    };

    function camAt(t, kx) {
      const follow = { x: kx, y: groundY(kx) - 110, s: 1 };
      const A = { x: 820, y: 250, s: 1.2 }, B = { x: 560, y: 256, s: 0.85 }, Z = { x: 1800, y: 252, s: 0.56 }, R = { x: 1080, y: 250, s: 0.82 };
      const blend = (p, q, k) => ({ x: p.x + (q.x - p.x) * k, y: p.y + (q.y - p.y) * k, s: p.s + (q.s - p.s) * k });
      if (t < 19) return A;
      if (t < 25) return blend(A, B, ease(clamp01((t - 19) / 4)));
      if (t < 27.5) return blend(B, follow, ease(clamp01((t - 25) / 2.5)));
      if (t < 46) return follow;
      if (t < 53) return blend(follow, Z, ease(clamp01((t - 46) / 3.5)));
      return R;
    }

    function frame(t) {
      const kx = t < 53 ? track(KID_X, t) : 1010;
      const c = camAt(t, kx);
      let sx = 0, sy = 0;
      if (t > 12.3 && t < 17) { const a = 7 * (1 - (t - 12.3) / 4.7) + 2; sx = Math.sin(t * 61) * a; sy = Math.cos(t * 47) * a * 0.6; }
      cam.setAttribute('transform', `translate(${400 - c.x * c.s + sx} ${262 - c.y * c.s + sy}) scale(${c.s})`);
      const [top, bot] = skyAt(t);
      skyTop.setAttribute('stop-color', top);
      skyBot.setAttribute('stop-color', bot);

      // Laut surut, ombak datang, desa rusak lalu dibangun kembali.
      const seaOff = t < 53 ? track([[19, 0], [24, -470]], t) : 0;
      sea.setAttribute('transform', `translate(${seaOff} 0)`);
      fish.forEach((f, i) => { f.style.display = t > 20.5 + i * 0.4 && t < 36 ? '' : 'none'; });
      const wx = t >= 38 && t < 53 ? track([[38, -760], [50, 1590]], t) : -3000;
      wv.setAttribute('transform', `translate(${wx} ${t > 50 ? Math.sin(t * 3) * 4 : 0})`);
      const ruined = t >= 50 && t < 53;
      oldH.style.display = t < 53 ? '' : 'none';
      oldH.style.opacity = ruined ? 0.35 : 1;
      newH.forEach((h, i) => { const k = t < 53 ? 0 : clamp01((t - 54 - i * 0.6) / 1.1); h.setAttribute('transform', `scale(1 ${k.toFixed(3)})`); h.style.display = k > 0 ? '' : 'none'; });
      sprouts.forEach((s, i) => { const k = t < 53 ? 0 : clamp01((t - 55.5 - i * 0.5) / 0.9); s.setAttribute('transform', `scale(${k.toFixed(3)})`); s.style.display = k > 0 ? '' : 'none'; });
      sirenG.classList.toggle('on', t >= 27 && t < 46);

      // Tokoh.
      const kPose = pick(KID_POSE, t);
      setChar(kidG, 'k' + kPose + (t >= 31 && t < 53 ? 'b' : ''), person(0, 0, { s: 0.95, letter: first, pose: kPose === 'worried' ? '' : kPose, worried: kPose === 'worried' || kPose === 'duck', bag: t >= 31 && t < 53 }));
      kidG.setAttribute('transform', `translate(${kx} ${groundY(kx)})`);
      const famOn = t >= 29;
      momG.style.display = dadG.style.display = famOn ? '' : 'none';
      if (famOn) {
        const fp = pick(FAM_POSE, t), bag = t < 53;
        const mx = t < 53 ? track(MOM_X, t) : 930, dx = t < 53 ? track(DAD_X, t) : 1080;
        setChar(momG, 'm' + fp + bag, person(0, 0, { s: 1.12, shirt: C.purple, pants: '#5b6b8c', hair: '#2b1d16', pose: fp, bag }));
        setChar(dadG, 'd' + fp + bag, person(0, 0, { s: 1.18, shirt: '#4fc3f7', pants: '#4a4f6b', hair: '#2b1d16', pose: fp, bag }));
        momG.setAttribute('transform', `translate(${mx} ${groundY(mx)})`);
        dadG.setAttribute('transform', `translate(${dx} ${groundY(dx)})`);
        momG.style.opacity = dadG.style.opacity = clamp01((t - 29) / 0.8);
      }
      let tx, ty, tv = true;
      if (t < 24) { tx = track([[0, 690], [19, 690], [24, 250]], t); ty = 360; }
      else if (t >= 46 && t < 53) { tx = 2560; ty = groundY(2560); }
      else if (t >= 53) { tx = 690; ty = 362; }
      else tv = false;
      tutiG.style.display = tv ? '' : 'none';
      if (tv) tutiG.setAttribute('transform', `translate(${tx} ${ty})`);

      // Gelembung bicara.
      const gy = y => y - 140;
      if (t > 12.6 && t < 18) setBubble('Merunduk! Lindungi kepala!', kx, gy(groundY(kx)));
      else if (t > 20 && t < 26) setBubble('Air surut! Tanda tsunami!', kx, gy(groundY(kx)));
      else if (t > 31.5 && t < 36) setBubble('Ayo ke bukit!', kx, gy(groundY(kx)));
      else if (t > 47 && t < 53) setBubble('Tunggu info resmi BMKG', 2380, 40);
      else setBubble('', 0, 0);

      // Lapisan layar: judul, kilat cahaya, rekap.
      title.style.opacity = t < 4 ? 1 : clamp01(1 - (t - 4));
      title.style.display = t < 5 ? '' : 'none';
      flash.setAttribute('opacity', clamp01(1 - Math.abs(t - 53) / 0.6).toFixed(2));
      const ro = clamp01((t - (T_RECAP - 1)) / 1.2);
      recap.setAttribute('opacity', ro.toFixed(2));
      recap.classList.toggle('go', t >= T_RECAP - 0.5);
      cam.style.display = ro >= 1 ? 'none' : '';
      bar.style.width = (100 * Math.min(1, t / T_END)).toFixed(1) + '%';
    }

    // Waktu film mengikuti jam (bukan jumlah frame), jadi tetap tepat walau perangkat lambat.
    let t = reduce ? T_RECAP : 0, raf = 0, paused = false, capIdx = -1, ended = false;
    let base = t, baseWall = performance.now();
    const seek = to => { t = base = to; baseWall = performance.now(); };
    function updateCaption() {
      let i = 0;
      for (let k = 0; k < caps.length; k++) if (t >= caps[k][0]) i = k;
      if (i !== capIdx) { capIdx = i; cap.textContent = caps[i][1]; voice(caps[i][1]); }
    }
    function endState(on) {
      ended = on;
      againBtn.hidden = !on && t < T_RECAP;
      closeBtn.textContent = t >= T_RECAP ? 'Selesai' : 'Lewati';
    }
    let confettiOn = false;
    function loop(now) {
      if (!current || current !== cur) return;
      if (!paused && !ended) t = Math.min(T_END, base + (now - baseWall) / 1000);
      frame(t);
      updateCaption();
      if (t >= T_RECAP && !confettiOn) {
        confettiOn = true;
        $('.cm-screen').insertAdjacentHTML('beforeend', confettiHtml(40));
        if (opts.sound) opts.sound();
        endState(false);
      }
      if (t >= T_END && !ended) endState(true);
      raf = requestAnimationFrame(loop);
    }
    const stopLoop = () => cancelAnimationFrame(raf);
    // Hentikan animasi saat film ditutup.
    cur.onCleanup = stopLoop;

    const setPaused = p => {
      if (p === paused) return;
      if (p) base = t; else baseWall = performance.now();
      paused = p;
      cur.el.classList.toggle('paused', p);
      pauseBtn.textContent = p ? 'Putar' : 'Jeda';
      if (p) hush();
    };
    pauseBtn.onclick = () => setPaused(!paused);
    closeBtn.onclick = () => {
      if (t < T_RECAP) { seek(T_RECAP); capIdx = -1; setPaused(false); }
      else closeOverlay();
    };
    againBtn.onclick = () => {
      seek(0); capIdx = -1; confettiOn = false; ended = false;
      cur.el.querySelector('.cm-screen .cel-confetti')?.remove();
      againBtn.hidden = true; closeBtn.textContent = 'Lewati';
      recap.classList.remove('go');
      setPaused(false);
    };
    cur.onKey = e => { if (e.key === ' ') { e.preventDefault(); pauseBtn.click(); } };
    closeBtn.focus({ preventScroll: true });
    frame(t);
    raf = requestAnimationFrame(loop);
  }

  window.SiagaCelebrate = { medal, movie, close: silent => closeOverlay(silent), get open() { return !!current; } };
})();
