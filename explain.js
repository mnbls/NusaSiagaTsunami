/* Nusa Siaga — animasi penjelasan di awal tiap pulau.
   Sebelum misi dimulai, pemain melihat beberapa slide beranimasi (SVG + CSS) yang menerangkan topik pulau itu.
   Isi diambil dari materi "Tsunami Awareness: Understanding, Preparing, and Staying Safe". */
(() => {
  'use strict';

  const K = {
    ink: '#23263a', sea: '#2f8ee0', seaD: '#1c64b0', seaL: '#6cc4ff', sky: '#d6efff', sand: '#ffd98a',
    grass: '#7cd35a', grassD: '#4fa83a', sun: '#ffc93c', coral: '#ff6b6b', orange: '#ff8a3d',
    brown: '#b07a4f', brownD: '#8a5a3a', grey: '#c9ccd8', greyD: '#8c8fa3', paper: '#fffaf0',
    skin: '#ffd2a8', purple: '#c084fc', ok: '#1f9d55'
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ic = (name, cls = '') => (window.SiagaIcons ? window.SiagaIcons.svg(name, cls) : '');

  /* ================= Potongan gambar SVG ================= */

  const svg = inner => `<svg class="xp-svg" viewBox="0 0 480 270" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const sky = (c = K.sky) => `<rect width="480" height="270" fill="${c}"/>`;
  const text = (x, y, s, size = 14, fill = K.ink, anchor = 'middle') =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${fill}">${esc(s)}</text>`;
  const pop = (d, inner) => `<g class="xp-pop" style="--d:${d}s">${inner}</g>`;

  // Label bulat kecil; lebar diperkirakan dari panjang teks.
  const chip = (x, y, s, d = 0, bg = '#fff', animate = true) => {
    const w = Math.round(s.length * 8.2 + 24);
    const body = `<g transform="translate(${x} ${y})"><rect class="o" x="${-w / 2}" y="-15" width="${w}" height="30" rx="15" fill="${bg}"/>${text(0, 5.5, s, 16)}</g>`;
    return animate ? pop(d, body) : body;
  };

  // Ikon 64×64 dari icons.js ditempatkan langsung di dalam SVG adegan.
  function icoG(name, x, y, size) {
    const m = ic(name).match(/^<svg[^>]*>([\s\S]*)<\/svg>$/);
    if (!m) return '';
    return `<g transform="translate(${x} ${y}) scale(${size / 64})" fill="none" stroke="${K.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${m[1]}</g>`;
  }

  const cloud = (x, y, s = 1) =>
    `<g class="xp-drift"><g transform="translate(${x} ${y}) scale(${s})"><path class="o" d="M4 24 C-4 24 -4 10 8 10 C10 -2 28 -4 32 8 C44 2 56 14 48 24 Z" fill="#fff"/></g></g>`;
  const waveLine = (y, op = .7) =>
    `<g class="xp-sea"><path d="M-40 ${y} q10 -6 20 0${' t20 0'.repeat(27)}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="${op}"/></g>`;

  const person = (x, y, c = K.coral, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path class="o" d="M-3 0 V-5 M3 0 V-5" fill="none"/><rect class="o" x="-5.5" y="-18" width="11" height="14" rx="4.5" fill="${c}"/><circle class="o" cx="0" cy="-24" r="5.5" fill="${K.skin}"/></g>`;

  // (x, y) = sudut kiri bawah rumah.
  const house = (x, y, roof = K.coral, w = 30) => {
    const h = Math.round(w * 0.7);
    return `<g transform="translate(${x} ${y})"><rect class="o" x="0" y="${-h}" width="${w}" height="${h}" fill="${K.paper}"/><path class="o" d="M-4 ${-h} L${w / 2} ${-h - Math.round(w * 0.45)} L${w + 4} ${-h} Z" fill="${roof}"/><rect class="o" x="${Math.round(w * 0.4)}" y="${-Math.round(h * 0.55)}" width="${Math.round(w * 0.2)}" height="${Math.round(h * 0.55)}" fill="${K.brown}"/></g>`;
  };
  // Garis ombak digambar penuh, jadi dipotong sesuai bentuk laut tiap adegan.
  const clipDef = (id, d) => `<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>`;
  const clipped = (id, inner) => `<g clip-path="url(#${id})">${inner}</g>`;
  const palm = (x, y, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path class="o" d="M0 0 C0 -14 2 -26 6 -36" fill="none" style="stroke-width:5"/><path class="o" d="M6 -36 C-4 -46 -16 -44 -22 -38 C-14 -40 -8 -40 6 -36 Z M6 -36 C14 -48 26 -48 32 -42 C24 -42 16 -40 6 -36 Z" fill="${K.grass}"/></g>`;
  const fish = (x, y, rot = 0) =>
    `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="o" d="M-14 0 C-8 -9 8 -9 14 0 C8 9 -8 9 -14 0 Z" fill="${K.orange}"/><path class="o" d="M13 0 L22 -7 V7 Z" fill="${K.orange}"/><circle cx="-8" cy="-2" r="1.8" fill="${K.ink}"/></g>`;

  // Orang berlari di sepanjang jalur (SMIL). T = lama satu putaran; diam `wait` detik di titik awal, lalu lari `run` detik.
  function walker(path, T, wait, run, color, end) {
    if (reduceMotion) return person(end[0], end[1], color);
    const a = (wait / T).toFixed(3);
    const b = ((wait + run) / T).toFixed(3);
    return `<g>${person(0, 0, color)}<animateMotion path="${path}" dur="${T}s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;${a};${b};1"/></g>`;
  }

  /* ================= Pesisir bersama (mitigasi struktural) ================= */

  const coastEnv = () => `${clipDef('xpc-coast', 'M0 186 H252 V272 H0 Z')}${sky()}${cloud(30, 30)}${cloud(300, 46, .75)}
    <path d="M0 186 H252 V272 H0 Z" fill="${K.sea}"/>
    <path d="M0 186 H252" stroke="${K.seaD}" stroke-width="3" fill="none"/>
    ${clipped('xpc-coast', waveLine(204, .45) + waveLine(226, .3))}
    <path class="o" d="M0 238 H232 V274 H0 Z" fill="${K.sand}"/>
    <path class="o" d="M226 274 V220 C232 200 238 176 252 172 H482 V274 Z" fill="${K.sand}"/>
    <path d="M254 177 H480 V189 H250 Z" fill="${K.grass}"/>`;
  const rock = (cx, cy, rx, ry, fill) => `<ellipse class="o" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>`;
  // Tumpukan batu pemecah gelombang di lepas pantai.
  const breakwater = () =>
    rock(150, 226, 23, 15, K.greyD) + rock(177, 228, 23, 13, K.grey) + rock(204, 226, 23, 15, K.greyD) +
    rock(163, 199, 23, 15, K.grey) + rock(191, 200, 23, 14, K.greyD) +
    rock(177, 173, 23, 15, K.grey);
  const mangroveTree = x =>
    `<g transform="translate(${x} 176)"><path class="o" d="M-3 0 C-10 -2 -12 8 -14 14 M3 0 C10 -2 12 8 14 14 M0 0 V12" fill="none"/><rect class="o" x="-4" y="-5" width="8" height="6" fill="${K.brown}"/><circle class="o" cx="0" cy="-21" r="17" fill="${K.grassD}"/><circle cx="-6" cy="-27" r="3.5" fill="${K.grass}"/><circle cx="6" cy="-15" r="2.5" fill="${K.grass}"/></g>`;
  const mangroves = () => `${mangroveTree(246)}${mangroveTree(270)}`;
  const seawall = () =>
    `<rect class="o" x="296" y="144" width="18" height="30" fill="${K.grey}"/><path d="M296 154 H314 M296 164 H314 M305 144 V154 M300 154 V164 M309 164 V174" stroke="${K.greyD}" stroke-width="2" fill="none"/>`;
  const village = () => `${house(340, 172, K.coral, 30)}${house(386, 172, K.sea, 30)}${palm(446, 172)}`;
  const splash = (x, y, cls) =>
    `<g class="${cls}"><g transform="translate(${x} ${y})"><g fill="#fff" stroke="${K.seaD}" stroke-width="2"><circle cx="-9" cy="-6" r="5"/><circle cx="1" cy="-13" r="6.5"/><circle cx="11" cy="-6" r="4.5"/><circle cx="-1" cy="-2" r="4"/></g></g></g>`;

  /* ================= Adegan: Pulau Ilmu ================= */

  function sceneQuake() {
    return svg(`${sky()}${cloud(40, 26)}${cloud(330, 40, .8)}
      <rect x="0" y="86" width="480" height="140" fill="${K.sea}"/>
      <path d="M0 86 H240" stroke="${K.seaD}" stroke-width="3" fill="none"/>
      ${waveLine(102, .45)}
      <rect x="0" y="206" width="480" height="68" fill="${K.brownD}"/>
      <path class="o" d="M-2 206 H228 V274 H-2 Z" fill="${K.brown}"/>
      <g class="xp-b1-up"><path class="o" d="M240 206 H482 V274 H240 Z" fill="#c9965f"/></g>
      <g class="xp-b1-bulge"><path d="M240 86 Q360 30 482 86 Z" fill="${K.sea}"/><path d="M240 86 Q360 30 482 86" fill="none" stroke="${K.seaD}" stroke-width="3" stroke-linecap="round"/></g>
      <g class="xp-b1-arc" style="--dir:-1"><path d="M236 84 q10 -10 22 -4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>
      <g class="xp-b1-arc" style="--dir:1"><path d="M470 84 q-10 -10 -22 -4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>
      <g class="xp-b1-arrow"><path d="M360 186 V150 M347 164 L360 148 L373 164" stroke="${K.coral}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
      ${[0, .22, .44].map(d => `<circle class="xp-b1-ring" cx="233" cy="238" r="16" fill="none" stroke="${K.coral}" stroke-width="4" style="--d:${d}s"/>`).join('')}
      ${chip(118, 158, 'Gempa di dasar laut', .5)}
      ${chip(364, 238, 'Dasar laut naik mendadak', 1.3)}
      ${chip(346, 24, 'Air di atasnya ikut terangkat', 2.4)}`);
  }

  function sceneTravel() {
    return svg(`${clipDef('xpc-travel', 'M0 112 H440 V274 H0 Z')}${sky()}${cloud(30, 26)}${cloud(250, 40, .7)}
      <path d="M0 112 H440 V274 H0 Z" fill="${K.sea}"/>
      <path d="M0 112 H430" stroke="${K.seaD}" stroke-width="3" fill="none"/>
      ${clipped('xpc-travel', waveLine(132, .45) + waveLine(160, .3))}
      <path class="o" d="M0 212 C150 218 270 214 340 190 C385 172 402 128 424 112 L482 104 V274 H0 Z" fill="${K.sand}"/>
      <path d="M426 118 L482 110 V122 L426 130 Z" fill="${K.grass}"/>
      ${house(438, 110, K.coral, 26)}${palm(472, 106, .8)}
      <g transform="translate(0 112)"><g class="xp-b2-crest">
        <path d="M0 0 Q45 -46 90 0 Z" fill="${K.sea}"/>
        <path d="M0 0 Q45 -46 90 0" fill="none" stroke="${K.seaD}" stroke-width="3"/>
        <path d="M22 -12 Q45 -28 68 -12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>
      </g></g>
      ${splash(414, 104, 'xp-b2-foam')}
      ${chip(122, 158, 'Laut dalam: rendah & cepat', .4)}
      ${chip(328, 32, 'Dekat pantai: melambat, menjulang', 1.2)}`);
  }

  function sceneSigns() {
    return svg(`${clipDef('xpc-signs', 'M250 122 H520 V274 H236 Q258 200 250 122 Z')}<rect width="240" height="270" fill="${K.sky}"/><rect x="240" width="240" height="270" fill="#e4f5ff"/>
      ${cloud(24, 26)}${cloud(310, 22, .8)}
      <path class="o" d="M0 214 H240 V274 H0 Z" fill="${K.grass}"/>
      <g class="xp-b3-house">${house(66, 214, K.coral, 100)}</g>
      ${pop(.7, `<circle class="o" cx="196" cy="62" r="27" fill="#fff"/><circle cx="196" cy="62" r="20" fill="none" stroke="#e3e6ef" stroke-width="6"/>
        <path class="xp-b3-fill" d="M196 42 A20 20 0 1 1 195.99 42" fill="none" stroke="${K.coral}" stroke-width="6" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/>
        ${text(196, 67, '20 dtk', 13)}`)}
      <path class="o" d="M240 122 H480 V274 H240 Z" fill="${K.sand}"/>
      ${palm(266, 122, .9)}
      <g class="xp-b3-sea"><path d="M250 122 H520 V274 H236 Q258 200 250 122 Z" fill="${K.sea}"/><path d="M250 122 H520" stroke="${K.seaD}" stroke-width="3" fill="none"/>${clipped('xpc-signs', waveLine(150, .5) + waveLine(190, .35))}</g>
      <g class="xp-b3-fish" style="--d:0s">${fish(290, 168, -10)}</g>
      <g class="xp-b3-fish" style="--d:.3s">${fish(340, 206, 14)}</g>
      <g class="xp-b3-fish" style="--d:.6s">${fish(300, 244, -6)}</g>
      <path d="M240 0 V270" stroke="${K.ink}" stroke-width="3" stroke-dasharray="6 7" fill="none"/>
      ${chip(120, 248, 'Gempa kuat > 20 detik', .5)}
      ${chip(362, 40, 'Air laut surut mendadak', 1.2)}`);
  }

  /* ================= Adegan: Pulau Benteng ================= */

  function sceneLayers() {
    return svg(`${coastEnv()}
      ${pop(.3, breakwater())}${pop(1.2, mangroves())}${pop(2.1, seawall())}${pop(3, village())}
      ${pop(.9, `<path d="M176 84 V154" class="o" stroke-dasharray="4 5" fill="none"/>`)}
      ${chip(176, 70, 'Pemecah gelombang', .9, '#ffd9b8')}
      ${chip(258, 104, 'Mangrove', 1.8, '#b8f0a0')}
      ${chip(352, 104, 'Tanggul', 2.7, '#ffd9b8')}
      ${chip(360, 232, 'Alami', 3.6, '#b8f0a0')}${chip(434, 232, 'Buatan', 3.7, '#ffd9b8')}`);
  }

  function sceneBreak() {
    return svg(`<defs><clipPath id="xpc-sea"><rect x="0" y="0" width="236" height="274"/></clipPath></defs>${coastEnv()}
      ${breakwater()}${mangroves()}
      <g transform="translate(236 176)"><g class="xp-s2-surge"><path d="M0 0 Q31 -60 62 0 Z" fill="${K.sea}" opacity=".88"/><path d="M0 0 Q31 -60 62 0" fill="none" stroke="${K.seaD}" stroke-width="3"/></g></g>
      ${seawall()}${village()}
      <g clip-path="url(#xpc-sea)"><g transform="translate(0 186)"><g class="xp-s2-crest">
        <path d="M0 0 Q50 -64 100 0 Z" fill="${K.sea}"/>
        <path d="M0 0 Q50 -64 100 0" fill="none" stroke="${K.seaD}" stroke-width="3"/>
        <path d="M24 -14 Q50 -36 76 -14" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>
      </g></g></g>
      ${splash(176, 156, 'xp-s2-sp1')}${splash(258, 150, 'xp-s2-sp2')}${splash(300, 140, 'xp-s2-sp3')}
      <g class="xp-s2-ok">${icoG('verified', 380, 62, 38)}${chip(400, 44, 'Permukiman aman', 0, '#dcf7cf', false)}</g>
      ${chip(176, 70, 'Lapis 1', 0, '#ffd9b8')}${chip(258, 104, 'Lapis 2', 0, '#b8f0a0')}${chip(352, 104, 'Lapis 3', 0, '#ffd9b8')}`);
  }

  function sceneQuakeProof() {
    const win = (x, y) => `<rect class="o" x="${x}" y="${y}" width="22" height="18" fill="#fff" style="stroke-width:2.5"/>`;
    return svg(`${sky()}${cloud(196, 26, .8)}
      <path class="o" d="M0 222 H480 V274 H0 Z" fill="${K.grass}"/>
      <g class="xp-s3-weak">
        <rect class="o" x="50" y="112" width="120" height="110" fill="#e9d6b4"/>
        ${[0, 1, 2].map(i => win(62 + i * 34, 126)).join('')}${[0, 1, 2].map(i => win(62 + i * 34, 168)).join('')}
        <rect class="o" x="42" y="104" width="136" height="12" rx="3" fill="${K.greyD}"/>
        <path class="xp-s3-crack" d="M138 116 L128 142 L140 160 L124 190 L134 222" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g class="xp-s3-dust">${[[60, 218], [96, 224], [140, 220], [166, 224]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#e9e2d2" stroke="${K.greyD}" stroke-width="2"/>`).join('')}</g>
      <path d="M262 222 V242 H398 V222" fill="${K.brownD}" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/>
      ${text(330, 236, 'pondasi dalam', 11.5, '#fff')}
      <g class="xp-s3-strong">
        <rect class="o" x="270" y="112" width="120" height="110" fill="${K.seaL}"/>
        ${win(284, 126)}${win(344, 126)}
        <path d="M270 148 H390 M270 185 H390 M330 112 V222" stroke="${K.seaD}" stroke-width="5" fill="none"/>
        <path d="M274 152 L326 182 M326 152 L274 182 M334 152 L386 182 M386 152 L334 182" stroke="${K.seaD}" stroke-width="3" fill="none"/>
        <rect class="o" x="270" y="188" width="14" height="34" fill="${K.seaD}" style="stroke-width:2.5"/><rect class="o" x="376" y="188" width="14" height="34" fill="${K.seaD}" style="stroke-width:2.5"/>
        <rect class="o" x="262" y="104" width="136" height="12" rx="3" fill="${K.seaD}"/>
      </g>
      <g class="xp-s3-stamp"><circle class="o" cx="110" cy="76" r="22" fill="${K.coral}"/><path d="M100 66 L120 86 M120 66 L100 86" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g>
      <g class="xp-s3-stamp"><circle class="o" cx="330" cy="76" r="22" fill="${K.grass}"/><path d="M319 77 L327 85 L342 67" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
      ${chip(110, 258, 'Tanpa rangka kuat', .4, '#ffe0e0')}${chip(330, 258, 'Rangka & pondasi kuat', .8, '#dcf7cf')}`);
  }

  function sceneTower() {
    return svg(`<defs><clipPath id="xpc-tower"><rect x="184" y="0" width="298" height="206"/></clipPath></defs>${clipDef('xpc-tsea', 'M0 222 H190 V274 H0 Z')}${sky()}${cloud(24, 30)}${cloud(380, 58, .7)}
      <path d="M0 222 H190 V274 H0 Z" fill="${K.sea}"/><path d="M0 222 H190" stroke="${K.seaD}" stroke-width="3" fill="none"/>${clipped('xpc-tsea', waveLine(238, .45) + waveLine(260, .3))}
      <g class="xp-bob">${icoG('boat', 52, 172, 52)}</g>
      <path class="o" d="M150 274 V244 C162 224 178 210 198 206 H482 V274 Z" fill="${K.sand}"/>
      ${house(206, 206, K.coral, 26)}
      <path class="o" d="M376 206 L350 98 L366 98 L398 206 Z" fill="${K.sand}"/>
      <path d="M372 190 L388 188 M368 172 L383 170 M363 154 L378 152 M359 136 L373 134 M355 118 L369 116" stroke="${K.brownD}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path class="o" d="M262 206 L276 98 M338 206 L324 98 M266 172 L336 198 M334 172 L264 198 M272 128 L328 152 M326 128 L270 152" fill="none"/>
      <rect class="o" x="248" y="84" width="104" height="14" rx="3" fill="#fff"/>
      <path class="o" d="M244 84 L300 52 L356 84 Z" fill="${K.coral}"/>
      <path class="o" d="M300 52 V34" fill="none"/><path class="o" d="M301 35 H318 L313 41 L318 47 H301 Z" fill="${K.sun}" style="stroke-width:2.5"/>
      ${walker('M388 206 L358 98', 9, 0, 3.6, K.coral, [358, 98])}
      ${walker('M388 206 L358 98', 9, 1, 3.6, K.sea, [364, 98])}
      ${walker('M388 206 L358 98', 9, 2, 3.6, K.grassD, [352, 98])}
      <g clip-path="url(#xpc-tower)"><g class="xp-s4-flood"><path d="M184 206 C190 164 202 150 224 150 H482 V274 H184 Z" fill="${K.sea}" opacity=".82"/><path d="M184 206 C190 164 202 150 224 150 H482" stroke="${K.seaD}" stroke-width="3" fill="none"/>${waveLine(166, .6)}</g></g>
      <path d="M224 150 H482" stroke="${K.coral}" stroke-width="3" stroke-dasharray="7 6" fill="none"/>
      ${chip(398, 134, 'Tinggi gelombang', 1.4, '#ffe0e0')}
      ${chip(214, 24, 'Lantai atas lebih tinggi dari gelombang', .6, '#fff4c2')}`);
  }

  /* ================= Adegan: Pulau Siaga Warga ================= */

  // Satu pusat dengan empat kartu di sudut, dihubungkan garis yang mengalir ke pusat.
  function orbit({ bg, tone, center, label, cards }) {
    const spots = [[20, 22], [20, 178], [320, 22], [320, 178]];
    const lines = ['M160 57 L204 112', 'M160 213 L204 162', 'M320 57 L276 112', 'M320 213 L276 162'];
    return svg(`${sky(bg)}
      ${lines.map((d, i) => `<path class="xp-dash" d="${d}" fill="none" stroke="${tone}" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round" style="--d:${i * .15}s;--p:12px"/>`).join('')}
      <circle class="xp-ringc" cx="240" cy="136" r="50" fill="none" stroke="${tone}" stroke-width="4"/>
      <circle class="xp-ringc" cx="240" cy="136" r="50" fill="none" stroke="${tone}" stroke-width="4" style="--d:1.3s"/>
      ${pop(.2, `<circle class="o" cx="240" cy="136" r="46" fill="#fff"/>${icoG(center, 208, 104, 64)}`)}
      ${chip(240, 208, label, .6, '#fff4c2')}
      ${cards.map(([name, l1, l2], i) => pop(.7 + i * .5, `<g transform="translate(${spots[i][0]} ${spots[i][1]})"><rect class="o" width="140" height="70" rx="16" fill="#fff"/>${icoG(name, 10, 13, 44)}${text(64, 33, l1, 13.5, K.ink, 'start')}${text(64, 51, l2, 13.5, K.ink, 'start')}</g>`)).join('')}`);
  }

  function sceneOrbit() {
    return orbit({
      bg: '#efe6ff', tone: K.purple, center: 'family', label: 'Warga yang siap',
      cards: [['siren', 'Peringatan', 'dini'], ['zoning', 'Tata ruang', 'pesisir'], ['map', 'Peta & jalur', 'evakuasi'], ['megaphone', 'Edukasi', '& latihan']]
    });
  }

  function sceneChain() {
    const nodes = [['buoy', 60, 'Sensor laut', '1 Deteksi'], ['monitor', 180, 'BMKG', '2 Analisis'], ['siren', 300, 'Sirine, HP, radio', '3 Sebarkan'], ['family', 420, 'Warga', '4 Bertindak']];
    const dot = reduceMotion ? '' :
      `<g><circle r="9" fill="${K.coral}" stroke="${K.ink}" stroke-width="3"/><animateMotion path="M60 130 H420" dur="7.5s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;.8;1"/></g>`;
    return svg(`${sky('#efe6ff')}
      <path d="M0 232 q10 -6 20 0${' t20 0'.repeat(23)} V274 H0 Z" fill="${K.sea}" opacity=".35"/>
      <path d="M98 130 H142 M218 130 H262 M338 130 H382" stroke="${K.ink}" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round" fill="none"/>
      <path d="M136 120 L146 130 L136 140 M256 120 L266 130 L256 140 M376 120 L386 130 L376 140" stroke="${K.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      ${nodes.map(([name, x, label, step], i) => pop(i * .5, `
        <circle class="xp-glow" cx="${x}" cy="130" r="44" fill="none" stroke="${K.coral}" stroke-width="5" style="--d:${i * 2}s"/>
        <circle class="o" cx="${x}" cy="130" r="36" fill="#fff"/>${icoG(name, x - 24, 106, 48)}
        ${text(x, 196, label, 16)}`) + chip(x, 66, step, i * .5 + .2, '#fff')).join('')}
      ${dot}`);
  }

  function sceneMap() {
    const path = 'M122 164 C170 172 210 150 250 138 S340 102 392 90';
    return svg(`<rect width="480" height="270" fill="#d4f5c4"/>
      <rect x="62" width="128" height="270" fill="#ffd0d0"/><rect x="190" width="110" height="270" fill="#fff0b3"/>
      <path d="M0 0 H66 C54 40 74 84 62 124 C52 164 72 208 62 270 H0 Z" fill="${K.sea}"/>
      <path d="M10 60 q10 -6 20 0 t20 0 M6 150 q10 -6 20 0 t20 0 M12 230 q10 -6 20 0 t20 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>
      <path d="M190 0 V270 M300 0 V270" stroke="${K.ink}" stroke-width="2.5" stroke-dasharray="6 7" opacity=".45" fill="none"/>
      ${pop(.2, `${house(84, 96, K.coral, 24)}${house(126, 112, K.sea, 24)}${house(92, 214, K.purple, 24)}${house(140, 232, K.orange, 24)}`)}
      ${pop(.8, `<ellipse class="o" cx="410" cy="82" rx="64" ry="46" fill="${K.grassD}"/><path class="o" d="M410 74 V50" fill="none"/><path class="o" d="M411 51 H428 L423 57 L428 63 H411 Z" fill="${K.coral}" style="stroke-width:2.5"/>`)}
      ${pop(1.6, `${icoG('hospital', 316, 168, 44)}${icoG('school', 372, 184, 44)}`)}
      <path d="${path}" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round" opacity=".85"/>
      <path class="xp-dash" d="${path}" fill="none" stroke="${K.ok}" stroke-width="5" stroke-dasharray="4 9" stroke-linecap="round" style="--d:1.2s;--p:13px"/>
      ${walker(path, 7, 0, 4.2, K.coral, [392, 90])}${walker(path, 7, .7, 4.2, K.sea, [384, 94])}${walker(path, 7, 1.4, 4.2, K.purple, [376, 97])}
      ${chip(126, 24, 'Zona bahaya', .3, '#ffd0d0')}${chip(245, 24, 'Waspada', .6, '#fff0b3')}${chip(392, 24, 'Zona aman', .9, '#b8f0a0')}
      ${chip(240, 200, 'Jalur evakuasi', 2, '#fff')}${chip(370, 250, 'Fasilitas penting', 2.3, '#fff')}`);
  }

  function sceneDrill() {
    const card = (y, ico, head, l1, l2, stamp, color, d) => pop(d, `<g transform="translate(262 ${y})"><rect class="o" width="204" height="92" rx="14" fill="#fff"/>
        ${icoG(ico, 10, 9, 30)}${text(48, 30, head, 14.5, K.ink, 'start')}${text(14, 58, l1, 12.5, '#5d6278', 'start')}${text(14, 76, l2, 12.5, '#5d6278', 'start')}</g>`) +
      pop(d + 1.1, `<g transform="translate(432 ${y + 20}) rotate(-8)"><rect class="o" x="-26" y="-12" width="52" height="24" rx="6" fill="${color}"/>${text(0, 5, stamp, 13, '#fff')}</g>`);
    const paths = [
      ['M30 244 C70 250 110 236 150 222', 6, 0, [150, 222], K.coral],
      ['M24 214 C70 198 120 212 174 224', 6, .5, [174, 224], K.sea],
      ['M60 262 C100 258 150 244 198 226', 6, 1, [198, 226], K.purple],
      ['M120 252 C150 250 190 242 222 226', 6, 1.5, [222, 226], K.orange]
    ];
    return svg(`${sky('#e8f7ff')}${cloud(150, 18, .7)}
      <path class="o" d="M0 196 H240 V274 H0 Z" fill="${K.grass}"/>
      <ellipse cx="184" cy="224" rx="48" ry="13" fill="#fff" stroke="${K.ink}" stroke-width="2.5" stroke-dasharray="5 5"/>
      ${icoG('flag', 152, 124, 64)}
      ${icoG('siren', 18, 20, 46)}
      <circle class="xp-ringc" cx="41" cy="43" r="28" fill="none" stroke="${K.coral}" stroke-width="4"/>
      ${paths.map(([d, T, w, end, c]) => walker(d, T, w, 3.2, c, end)).join('')}
      <path d="M240 0 V270" stroke="${K.ink}" stroke-width="3" stroke-dasharray="6 7" fill="none"/>
      ${chip(88, 172, 'Titik kumpul', .4)}
      ${card(22, 'verified', 'BMKG / BPBD', 'Gempa kuat, potensi tsunami.', 'Segera menjauh dari pantai.', 'RESMI', K.ok, 1.2)}
      ${card(132, 'chat', 'Pesan grup', 'Air laut naik 30 meter lagi!', 'Sebarkan ke semua grup!!', 'HOAKS', K.coral, 2.6)}
      ${chip(362, 252, 'Cek dulu ke sumber resmi', 4.2, '#fff4c2')}`);
  }

  /* ================= Adegan: Pulau Tanggap ================= */

  function sceneBag() {
    const items = [['doc', 34, 18], ['water', 94, 18], ['food', 154, 18], ['flashlight', 64, 68], ['firstaid', 124, 68], ['radio', 184, 68]];
    const rows = ['Dokumen penting', 'Air minum', 'Makanan tahan lama', 'Senter', 'P3K', 'Radio portabel'];
    return svg(`${sky('#fff1d6')}
      <path class="o" d="M0 246 H480 V274 H0 Z" fill="#e9c98f"/>
      <g class="xp-bag">${icoG('bag', 80, 122, 140)}</g>
      ${items.map(([n, x, y], i) => `<g class="xp-fly" style="--tx:${150 - x - 23}px;--ty:${150 - y - 23}px;--d:${i * .8}s">${icoG(n, x, y, 46)}</g>`).join('')}
      ${rows.map((r, i) => pop(1.6 + i * .8, `<g transform="translate(262 ${38 + i * 34})"><circle class="o" cx="12" cy="0" r="12" fill="${K.grass}"/><path d="M6 0 L11 5 L19 -5" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${text(32, 5, r, 15.5, K.ink, 'start')}</g>`)).join('')}`);
  }

  function sceneRun() {
    const path = 'M204 198 H292 C330 198 360 170 392 130 C412 106 432 90 446 80';
    return svg(`${clipDef('xpc-rsea', 'M0 216 H140 V274 H0 Z')}${sky()}${cloud(24, 30)}${cloud(250, 22, .75)}
      <g class="xp-r2-sea"><path d="M0 216 H140 V274 H0 Z" fill="${K.sea}"/><path d="M0 216 H140" stroke="${K.seaD}" stroke-width="3" fill="none"/>${clipped('xpc-rsea', waveLine(232, .5) + waveLine(256, .3))}</g>
      <path class="o" d="M96 274 V238 C108 222 126 204 156 198 H290 C330 198 360 170 395 128 C415 104 440 82 482 76 V274 Z" fill="${K.grass}"/>
      <path d="M100 274 V240 C112 224 128 206 156 201 H250 V274 Z" fill="${K.sand}"/>
      <g class="xp-r2-house">${house(160, 198, K.coral, 36)}</g>
      <path class="o" d="M446 80 V48" fill="none"/><path class="o" d="M447 49 H466 L460 56 L466 63 H447 Z" fill="${K.coral}" style="stroke-width:2.5"/>
      <rect class="o" x="294" y="164" width="28" height="18" rx="3" fill="${K.ok}"/><path d="M299 173 H315 M309 167 L316 173 L309 179" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path class="o" d="M308 182 V198" fill="none"/>
      ${walker(path, 8, 1.8, 4.4, K.coral, [446, 80])}${walker(path, 8, 2.3, 4.4, K.sea, [440, 84])}
      ${chip(112, 40, 'Gempa kuat / air surut?', .3, '#ffe0e0')}${chip(344, 40, 'Lari ke tempat tinggi!', 1.4, '#dcf7cf')}`);
  }

  function sceneSurges() {
    const badge = (n, i) => `<g class="xp-r3-badge" style="--d:${i * 3.6}s;--x:${i * 70}px"><g transform="translate(40 -16)"><circle class="o" r="12" fill="#fff"/>${text(0, 5, n, 14)}</g></g>`;
    const crest = (s, i) => `<g class="xp-r3-crest" style="--s:${s};--d:${i * 3.6}s;--x:${i * 70}px"><path d="M0 0 Q40 -50 80 0 Z" fill="${K.sea}"/><path d="M0 0 Q40 -50 80 0" fill="none" stroke="${K.seaD}" stroke-width="3"/><path d="M18 -12 Q40 -30 62 -12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/></g>`;
    return svg(`${clipDef('xpc-r3', 'M0 204 H240 V274 H0 Z')}${sky()}${cloud(30, 24)}${cloud(280, 20, .7)}
      <path d="M0 204 H240 V274 H0 Z" fill="${K.sea}"/><path d="M0 204 H240" stroke="${K.seaD}" stroke-width="3" fill="none"/>${clipped('xpc-r3', waveLine(222, .45) + waveLine(248, .3))}
      <path class="o" d="M226 274 V236 C234 214 246 194 266 190 H340 C360 190 372 154 392 122 C410 96 450 88 482 88 V274 Z" fill="${K.grass}"/>
      <path d="M230 274 V237 C238 217 250 197 268 193 H340 V274 Z" fill="${K.sand}" opacity=".9"/>
      ${person(292, 190, K.coral)}${person(314, 190, K.sea)}${person(336, 190, K.purple, .85)}
      <g transform="translate(262 156)">${icoG('radio', 0, 0, 34)}</g>
      <g transform="translate(0 204)">${[1, 1.6, 1.15].map((s, i) => crest(s, i)).join('')}${[1, 2, 3].map((n, i) => badge(n, i)).join('')}</g>
      <g class="xp-r3-ok">${icoG('verified', 396, 128, 38)}</g>
      ${chip(160, 30, 'Gelombang bisa datang berkali-kali', .3, '#ffe0e0')}
      <g class="xp-r3-ok">${chip(396, 108, 'Tunggu info resmi', 0, '#dcf7cf', false)}</g>`);
  }

  /* ================= Adegan: Pulau Pulih, Sejarah, Juara ================= */

  // Jalan pemulihan: tiga tahap muncul bergantian, warga berjalan melewatinya.
  function sceneRecover() {
    const nodes = [['lifebuoy', 80, 'Tanggap darurat', '#ffe0e0'], ['broom', 240, 'Rehabilitasi', '#dcf7cf'], ['crane', 400, 'Rekonstruksi', '#cfe9ff']];
    const road = 'M30 178 H450';
    return svg(`${sky('#e4f4ff')}${cloud(30, 20, .8)}${cloud(380, 26, .7)}
      <path class="o" d="M0 196 H480 V274 H0 Z" fill="${K.grass}"/>
      <path d="${road}" stroke="${K.ink}" stroke-width="22" stroke-linecap="round" fill="none"/><path d="${road}" stroke="#d9d3c4" stroke-width="16" stroke-linecap="round" fill="none"/>
      <path d="M40 178 H440" stroke="#fff" stroke-width="3" stroke-dasharray="12 12" fill="none"/>
      ${nodes.map(([name, x, label, bg], i) => pop(.4 + i * .9, `<circle class="o" cx="${x}" cy="104" r="40" fill="${bg}"/>${icoG(name, x - 26, 78, 52)}<path class="o" d="M${x} 144 V166" fill="none"/>`) + chip(x, 232, label, .7 + i * .9, '#fff')).join('')}
      ${pop(1.2, `<path d="M128 104 H186 M178 96 L188 104 L178 112 M288 104 H346 M338 96 L348 104 L338 112" stroke="${K.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`)}
      ${walker(road, 8, 1, 6, K.coral, [440, 178])}
      ${chip(240, 30, 'Pulih bersama, bangun lebih aman', 3.2, '#fff4c2')}`);
  }

  function sceneShelter() {
    return orbit({
      bg: '#e2f2ff', tone: K.sea, center: 'tent', label: 'Posko pengungsian',
      cards: [['water', 'Air bersih', '& makanan'], ['firstaid', 'P3K &', 'kesehatan'], ['trash', 'Kebersihan', '& sanitasi'], ['heart', 'Pulihkan', 'hati']]
    });
  }

  // Garis waktu: penanda tahun muncul satu per satu, titik waktu berjalan dari kiri ke kanan.
  function sceneTimeline() {
    const ev = [['volcano', '1883', 'Krakatau'], ['tectonic', '1992', 'Flores'], ['wave', '2004', 'Aceh'], ['shoal', '2006', 'Pangandaran'], ['boat', '2010', 'Mentawai'], ['quake', '2018', 'Palu &|Selat Sunda']];
    const x = i => 50 + i * 76;
    const dot = reduceMotion ? '' :
      `<g><circle r="8" fill="${K.coral}" stroke="${K.ink}" stroke-width="3"/><animateMotion path="M40 150 H440" dur="7s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;.85;1"/></g>`;
    return svg(`${sky('#fff0f6')}
      <path d="M30 150 H450" stroke="${K.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>
      ${ev.map(([name, year, place], i) => pop(.3 + i * .45, `
        ${icoG(name, x(i) - 20, 62, 40)}
        <circle class="o" cx="${x(i)}" cy="150" r="9" fill="${K.sun}"/>
        <rect class="o" x="${x(i) - 28}" y="168" width="56" height="26" rx="13" fill="#fff"/>${text(x(i), 186, year, 15)}
        ${place.split('|').map((p, k) => text(x(i), 212 + k * 15, p, 12.5, '#5d6278')).join('')}`)).join('')}
      ${dot}
      ${chip(240, 30, 'Tsunami berulang di Indonesia', 3.2, '#ffc8dc')}`);
  }

  function sceneLessons() {
    return orbit({
      bg: '#fff0f6', tone: '#e86aa0', center: 'book', label: 'Belajar dari sejarah',
      cards: [['megaphone', 'Smong:', 'cerita penyelamat'], ['quake', 'Guncangan', 'lemah? Waspada'], ['volcano', 'Tanpa gempa', 'tetap waspada'], ['monitor', 'Lahirnya', 'peringatan dini']]
    });
  }

  function sceneSimLab() {
    return orbit({
      bg: '#f6fde0', tone: '#9cc531', center: 'monitor', label: 'Laboratorium tsunami',
      cards: [['tectonic', 'Gempa', 'tektonik'], ['landslide', 'Longsor', 'bawah laut'], ['volcano', 'Letusan', 'gunung api'], ['meteor', 'Hantaman', 'meteor']]
    });
  }

  // Tujuh pulau sebelumnya mengelilingi piala: semua materi diuji di sini.
  function sceneChampion() {
    const items = [['magnifier', 'Ilmu'], ['seawall', 'Struktural'], ['siren', 'Non-struktural'], ['lifebuoy', 'Tanggap'], ['tent', 'Pemulihan'], ['book', 'Sejarah'], ['monitor', 'Simulasi']];
    const pos = i => { const a = -Math.PI / 2 + i * 2 * Math.PI / items.length; return [240 + Math.cos(a) * 168, 136 + Math.sin(a) * 92]; };
    return svg(`${sky('#e6fbf5')}
      <ellipse cx="240" cy="136" rx="168" ry="92" fill="none" stroke="#5cc9ad" stroke-width="4" stroke-dasharray="3 11" stroke-linecap="round" class="xp-dash" style="--p:14px"/>
      <circle class="xp-ringc" cx="240" cy="136" r="46" fill="none" stroke="${K.sun}" stroke-width="5"/>
      ${pop(.2, `<circle class="o" cx="240" cy="136" r="44" fill="#fff"/>${icoG('trophy', 210, 106, 60)}`)}
      ${items.map(([name, label], i) => { const [cx, cy] = pos(i); return pop(.5 + i * .35, `<circle class="o" cx="${cx}" cy="${cy}" r="27" fill="#fff"/>${icoG(name, cx - 18, cy - 18, 36)}${text(cx, cy + 42, label, 12.5)}`); }).join('')}`);
  }

  // Sertifikat dengan bintang yang muncul satu per satu.
  function sceneCertificate() {
    return svg(`${sky('#e6fbf5')}${cloud(24, 24, .8)}${cloud(390, 30, .7)}
      ${pop(.2, `<rect class="o" x="130" y="40" width="220" height="170" rx="12" fill="${K.paper}"/><rect x="142" y="52" width="196" height="146" rx="8" fill="none" stroke="${K.sun}" stroke-width="4"/>
        ${text(240, 84, 'SERTIFIKAT', 18, K.ink)}${text(240, 108, 'Pahlawan Siaga Tsunami', 14, '#5d6278')}
        <path d="M180 156 H300" stroke="${K.ink}" stroke-width="2.5" stroke-dasharray="4 5"/>${text(240, 150, 'namamu di sini', 13, '#5d6278')}`)}
      ${[0, 1, 2].map(i => pop(1 + i * .4, icoG('star', 196 + i * 30, 166, 28))).join('')}
      ${pop(2.4, icoG('trophy', 330, 150, 56))}
      ${chip(240, 242, 'Tuntaskan semua misi untuk meraihnya', 2.8, '#fff4c2')}`);
  }

  /* ================= Naskah per pulau ================= */

  const ISLAND_DATA = {
    basic: {
      name: 'Pulau Ilmu', theme: 'Mengenal Tsunami',
      slides: [
        {
          tag: 'Penyebab', phase: 'basic', title: 'Dari mana tsunami datang?', scene: sceneQuake,
          alt: 'Dasar laut di satu sisi patahan terangkat mendadak dan mendorong air laut di atasnya naik.',
          text: 'Tsunami paling sering lahir dari gempa bawah laut. Saat dasar laut terangkat atau turun mendadak, seluruh air di atasnya ikut terdorong dan membentuk gelombang besar.',
          chips: [
            { ic: 'tectonic', t: 'Syarat gempa pemicu', d: 'Magnitudo lebih dari 7,0, pusat gempa dangkal (kurang dari 60–70 km), dan dasar laut bergeser vertikal.' }
          ],
          note: 'Penyebab lain: letusan gunung api, longsor bawah laut, dan hantaman meteor.'
        },
        {
          tag: 'Perambatan', phase: 'basic', title: 'Gelombang melaju ke pantai', scene: sceneTravel,
          alt: 'Gelombang melaju dari laut dalam, melambat dan makin tinggi saat mendekati pantai, lalu menghantam daratan.',
          text: 'Di laut dalam gelombangnya rendah tetapi sangat cepat, sehingga sering tidak terasa. Mendekati pantai ia melambat, menjulang, lalu menyapu daratan.',
          chips: [
            { ic: 'ripple', t: 'Bukan ombak biasa', d: 'Ombak biasa hanya menggerakkan permukaan. Tsunami mendorong seluruh kolom air, jadi tenaganya jauh lebih besar.' }
          ]
        },
        {
          tag: 'Tanda alam', phase: 'basic', title: 'Kenali tanda-tandanya', scene: sceneSigns,
          alt: 'Di kiri rumah berguncang lebih dari 20 detik. Di kanan air laut surut mendadak dan ikan tertinggal di pasir.',
          text: 'Alam sering memberi isyarat sebelum gelombang datang. Kenali dua tanda ini dan jangan menunggu sirine.',
          chips: [
            { ic: 'quake', t: 'Gempa kuat', d: 'Terasa lebih dari 20 detik atau membuat sulit berdiri.' },
            { ic: 'recede', t: 'Air laut surut mendadak', d: 'Pantai tiba-tiba melebar dan ikan menggelepar di pasir.' }
          ],
          note: 'Begitu melihat tanda alam, langsung menuju tempat yang lebih tinggi.'
        }
      ]
    },

    struct: {
      name: 'Pulau Benteng', theme: 'Mitigasi Struktural',
      slides: [
        {
          tag: 'Mitigasi struktural', phase: 'struct', title: 'Membangun untuk melindungi', scene: sceneLayers,
          alt: 'Pesisir dengan pemecah gelombang di laut, mangrove di tepi pantai, tanggul, lalu permukiman.',
          text: 'Mitigasi struktural adalah upaya fisik: membangun atau menata sesuatu di lapangan supaya gelombang melemah dan warga punya tempat berlindung.',
          chips: [
            { ic: 'mangrove', t: 'Pelindung alami', d: 'Hutan mangrove dan vegetasi pantai meredam energi gelombang.' },
            { ic: 'seawall', t: 'Pelindung buatan', d: 'Tanggul dan pemecah gelombang menahan dan memecah gelombang sebelum sampai ke permukiman.' }
          ]
        },
        {
          tag: 'Pelindung pantai', phase: 'struct', title: 'Gelombang dipecah selapis demi selapis', scene: sceneBreak,
          alt: 'Gelombang tinggi melemah setelah melewati pemecah gelombang, mangrove, dan tanggul, sehingga permukiman aman.',
          text: 'Pemecah gelombang, mangrove, dan tanggul bekerja berlapis. Tiap lapis mengurangi tinggi dan tenaga gelombang, sampai tak lagi mencapai rumah warga.',
          note: 'Pelindung tidak membuat pantai 100% aman. Gelombang yang sangat besar tetap bisa melewatinya, jadi warga tetap harus evakuasi.'
        },
        {
          tag: 'Bangunan', phase: 'struct', title: 'Bangunan tahan gempa', scene: sceneQuakeProof,
          alt: 'Dua bangunan diguncang gempa. Bangunan tanpa rangka kuat runtuh, bangunan berpondasi dan rangka kuat tetap berdiri.',
          text: 'Tsunami hampir selalu didahului gempa kuat. Bangunan yang tidak runtuh saat gempa memberi warga waktu untuk menyelamatkan diri.',
          chips: [
            { ic: 'foundation', t: 'Pondasi kokoh', d: 'Menjaga bangunan tetap tegak saat tanah bergoyang.' },
            { ic: 'rebar', t: 'Tulangan besi', d: 'Rangka beton bertulang menahan guncangan agar tidak patah.' },
            { ic: 'roof-light', t: 'Atap ringan', d: 'Beban di atas lebih kecil sehingga bangunan tidak mudah ambruk.' }
          ]
        },
        {
          tag: 'Evakuasi vertikal', phase: 'struct', title: 'Menara evakuasi', scene: sceneTower,
          alt: 'Warga menaiki tangga menara evakuasi sementara air naik di bawahnya. Lantai atas tetap di atas tinggi gelombang.',
          text: 'Kalau bukit jauh dan waktu terbatas, menara atau gedung evakuasi menjadi tempat naik. Lantai teratasnya harus lebih tinggi dari perkiraan tinggi gelombang.',
          chips: [
            { ic: 'tower', t: 'Kokoh dan tinggi', d: 'Tahan gempa dan gelombang, dengan lantai atas di atas perkiraan genangan.' },
            { ic: 'stairs', t: 'Akses mudah', d: 'Tangga atau jalur landai yang lebar, mudah dicapai dari permukiman.' }
          ]
        }
      ]
    },

    nonstruct: {
      name: 'Pulau Siaga Warga', theme: 'Mitigasi Non-Struktural',
      slides: [
        {
          tag: 'Mitigasi non-struktural', phase: 'nonstruct', title: 'Siap tanpa membangun', scene: sceneOrbit,
          alt: 'Warga di tengah dikelilingi empat upaya: peringatan dini, tata ruang pesisir, peta evakuasi, dan edukasi serta latihan.',
          text: 'Mitigasi non-struktural adalah upaya non-fisik: pengetahuan, aturan, rencana, dan kebiasaan warga. Tidak ada beton yang dibangun, tetapi justru inilah yang membuat orang bergerak tepat waktu.'
        },
        {
          tag: 'Peringatan dini', phase: 'nonstruct', title: 'Rantai peringatan dini', scene: sceneChain,
          alt: 'Sinyal bergerak dari sensor laut ke BMKG, lalu ke sirine, ponsel, dan radio, hingga sampai ke warga.',
          text: 'Sensor gempa dan muka air laut mengirim data ke BMKG. Setelah dianalisis, peringatan diteruskan lewat sirine, ponsel, radio, dan petugas sampai ke warga.',
          note: 'Peringatan secepat apa pun percuma kalau warga tidak tahu harus berbuat apa.'
        },
        {
          tag: 'Tata ruang dan evakuasi', phase: 'nonstruct', title: 'Peta aman untuk semua', scene: sceneMap,
          alt: 'Peta pesisir dengan zona bahaya, waspada, dan aman. Warga berlari lewat jalur evakuasi menuju bukit.',
          text: 'Tata ruang mengatur agar rumah dan fasilitas penting tidak dibangun terlalu dekat bibir pantai. Peta evakuasi menunjukkan zona bahaya dan jalur menuju tempat aman.',
          chips: [
            { ic: 'zoning', t: 'Zonasi pesisir', d: 'Daerah paling dekat laut dikosongkan atau dijadikan sabuk hijau.' },
            { ic: 'map', t: 'Peta dan rambu evakuasi', d: 'Tiap warga tahu rute menuju TES atau dataran tinggi.' }
          ]
        },
        {
          tag: 'Latihan dan edukasi', phase: 'nonstruct', title: 'Latihan rutin dan info resmi', scene: sceneDrill,
          alt: 'Warga berlatih berkumpul di titik kumpul. Di kanan, pesan resmi BMKG dibandingkan dengan pesan berantai yang hoaks.',
          text: 'Warga yang sering berlatih tahu persis ke mana harus lari. Edukasi juga melatih cek kabar: percaya info dari BMKG, BNPB, atau BPBD dan jangan ikut menyebar hoaks.'
        }
      ]
    },

    response: {
      name: 'Pulau Tanggap', theme: 'Sebelum, Saat, dan Sesudah',
      slides: [
        {
          tag: 'Sebelum', phase: 'pre', title: 'Siapkan tas siaga', scene: sceneBag,
          alt: 'Dokumen, air minum, makanan, senter, P3K, dan radio masuk satu per satu ke dalam tas siaga.',
          text: 'Siapkan sebelum bencana datang, simpan di tempat yang mudah dijangkau, dan pastikan seluruh keluarga tahu letaknya.'
        },
        {
          tag: 'Saat', phase: 'now', title: 'Lari ke tempat tinggi', scene: sceneRun,
          alt: 'Rumah berguncang, lalu warga berlari menuju bukit sementara air laut mulai naik.',
          text: 'Begitu gempa kuat terasa atau air laut surut, jangan menunggu sirine. Segera menuju tempat tinggi atau gedung kokoh dengan berjalan kaki.',
          note: 'Jangan mendekati pantai untuk melihat air surut, dan jauhi muara sungai karena gelombang bisa merambat lewat sana.'
        },
        {
          tag: 'Sesudah', phase: 'post', title: 'Tunggu kabar resmi', scene: sceneSurges,
          alt: 'Tiga gelombang datang bergantian. Warga tetap di bukit dan menunggu informasi resmi.',
          text: 'Gelombang pertama belum tentu yang terbesar. Tetap di tempat aman sampai BMKG atau BPBD menyatakan aman, lalu bantu sesama dan hindari area terdampak.'
        }
      ]
    },

    recovery: {
      name: 'Pulau Pulih', theme: 'Pascabencana dan Pemulihan',
      slides: [
        {
          tag: 'Pascabencana', phase: 'post', title: 'Tahap demi tahap pulih', scene: sceneRecover,
          alt: 'Jalan dengan tiga tahap: tanggap darurat, rehabilitasi, dan rekonstruksi. Seorang warga berjalan melewatinya.',
          text: 'Setelah gelombang berlalu, kehidupan dipulihkan bertahap. Tanggap darurat menyelamatkan korban dan memenuhi kebutuhan dasar. Menurut UU No. 24 Tahun 2007, pascabencana meliputi rehabilitasi dan rekonstruksi.',
          chips: [
            { ic: 'broom', t: 'Rehabilitasi', d: 'Memperbaiki dan memulihkan: lingkungan, rumah warga, kesehatan, dan perasaan.' },
            { ic: 'crane', t: 'Rekonstruksi', d: 'Membangun kembali prasarana dan sarana dengan rancang bangun yang lebih baik dan tahan bencana.' }
          ]
        },
        {
          tag: 'Posko pengungsian', phase: 'post', title: 'Saling jaga di pengungsian', scene: sceneShelter,
          alt: 'Tenda posko di tengah, dikelilingi empat kebutuhan: air dan makanan, P3K, kebersihan, dan pemulihan hati.',
          text: 'Di posko, pengungsi butuh air bersih, makanan, layanan kesehatan, dan tempat yang bersih. Perasaan juga perlu dipulihkan: takut dan sedih setelah bencana itu wajar.',
          note: 'Jauhi kabel listrik, bau gas, dan bangunan retak. Pulang hanya setelah petugas menyatakan aman.'
        }
      ]
    },

    history: {
      name: 'Pulau Sejarah', theme: 'Jejak Tsunami Indonesia',
      slides: [
        {
          tag: 'Sejarah', phase: 'hist', title: 'Tsunami pernah datang berkali-kali', scene: sceneTimeline,
          alt: 'Garis waktu berisi tahun 1883, 1992, 2004, 2006, 2010, dan 2018 beserta tempat terjadinya tsunami.',
          text: 'Indonesia berada di pertemuan lempeng dan punya banyak gunung api, sehingga tsunami terjadi berulang kali: dari Krakatau 1883 sampai Palu dan Selat Sunda 2018.'
        },
        {
          tag: 'Pelajaran', phase: 'hist', title: 'Setiap peristiwa meninggalkan pelajaran', scene: sceneLessons,
          alt: 'Buku di tengah, dikelilingi empat pelajaran: smong, guncangan lemah, tsunami tanpa gempa, dan lahirnya peringatan dini.',
          text: 'Warga Simeulue selamat berkat smong. Pangandaran 2006 datang setelah guncangan yang terasa lemah, Selat Sunda 2018 datang tanpa gempa kuat, dan Aceh 2004 mendorong lahirnya sistem peringatan dini.',
          note: 'Pelajaran ini akan kamu temui lagi di misi Pulau Sejarah.'
        }
      ]
    },

    sim: {
      name: 'Pulau Simulasi', theme: 'Simulasi Penyebab Tsunami',
      slides: [
        {
          tag: 'Simulasi', phase: 'sim', title: 'Empat penyebab, satu laboratorium', scene: sceneSimLab,
          alt: 'Layar laboratorium di tengah, dikelilingi empat penyebab tsunami: gempa tektonik, letusan gunung api, longsor bawah laut, dan meteor.',
          text: 'Di pulau ini kamu jadi peneliti. Atur sendiri gempa, letusan gunung api, longsor bawah laut, dan meteor, lalu lihat kapan tsunami terbentuk dan seberapa besar.',
          chips: [
            { ic: 'tectonic', t: 'Ubah kontrolnya', d: 'Geser angka atau pilih tombol, misalnya magnitudo, kedalaman, atau ukuran meteor.' },
            { ic: 'bulb', t: 'Baca hasilnya', d: 'Setiap simulasi menampilkan alasan dan perhitungan, bukan hanya benar atau salah.' }
          ]
        },
        {
          tag: 'Perhitungan', phase: 'sim', title: 'Hitung sebelum terlambat', scene: sceneTravel,
          alt: 'Gelombang melaju dari laut dalam ke pantai, melambat dan meninggi.',
          text: 'Dua simulasi terakhir memakai angka: kecepatan gelombang = akar(9,81 × kedalaman laut), dan waktu tiba = jarak ÷ kecepatan. Bandingkan dengan waktu yang kamu butuhkan untuk sampai ke tempat aman.',
          note: 'Angka di simulasi ini disederhanakan untuk belajar, bukan untuk peringatan dini sungguhan. Peringatan resmi tetap dari BMKG.'
        }
      ]
    },

    final: {
      name: 'Pulau Juara', theme: 'Ujian Akhir',
      slides: [
        {
          tag: 'Ujian akhir', phase: 'final', title: 'Semua pulau jadi satu', scene: sceneChampion,
          alt: 'Piala di tengah dikelilingi tujuh ikon pulau: ilmu, struktural, non-struktural, tanggap, pemulihan, sejarah, dan simulasi.',
          text: 'Pulau Juara menggabungkan materi dari tujuh pulau sebelumnya. Soalnya campuran, dan beberapa misi punya waktu yang lebih ketat.',
          note: 'Kalau ragu, kunjungi lagi pulau sebelumnya. Animasi penjelasannya bisa diputar ulang kapan saja.'
        },
        {
          tag: 'Sertifikat', phase: 'final', title: 'Raih gelar Pahlawan Siaga', scene: sceneCertificate,
          alt: 'Sertifikat Pahlawan Siaga Tsunami dengan tiga bintang dan sebuah piala.',
          text: 'Selesaikan semua misi di kedelapan pulau untuk membuka sertifikat. Setelah itu, bagikan pengetahuanmu kepada keluarga dan teman.'
        }
      ]
    }
  };

  /* ================= Tampilan ================= */

  let root = null;
  let idx = 0;
  let cur = null;
  let opts = {};
  let lastFocus = null;

  function build() {
    if (root) return;
    root = document.createElement('div');
    root.className = 'xp';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.innerHTML = `
      <div class="xp-top">
        <div class="intro-progress xp-progress"></div>
        <button class="btn small ghost xp-skip" type="button">Lewati ${ic('cross')}</button>
      </div>
      <div class="xp-main">
        <figure class="xp-stage card">
          <div class="xp-scene" role="img"></div>
          <div class="xp-stagebar">
            <span class="xp-hint">Gerakannya berulang sendiri</span>
            <button class="btn small ghost xp-replay" type="button">${ic('retry')} Ulangi dari awal</button>
          </div>
        </figure>
        <section class="xp-panel card">
          <div class="intro-body xp-body" aria-live="polite"></div>
          <div class="intro-nav">
            <button class="btn ghost xp-prev" type="button">${ic('arrow-left')} Kembali</button>
            <span class="intro-count xp-count"></span>
            <button class="btn green xp-next" type="button"></button>
          </div>
        </section>
      </div>`;
    document.body.appendChild(root);

    const $ = s => root.querySelector(s);
    $('.xp-prev').addEventListener('click', () => { click(); go(idx - 1); });
    $('.xp-next').addEventListener('click', () => {
      click();
      if (idx === cur.slides.length - 1) close('finish'); else go(idx + 1);
    });
    $('.xp-skip').addEventListener('click', () => close('skip'));
    $('.xp-replay').addEventListener('click', () => { click(); drawScene(); });
    window.addEventListener('keydown', e => {
      if (!root.classList.contains('open')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); $('.xp-next').click(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); if (idx > 0) $('.xp-prev').click(); }
      else if (e.key === 'Escape') { e.preventDefault(); close('skip'); }
      else if (e.key === 'Tab') trapFocus(e);
    });
  }

  // Selama penjelasan terbuka, fokus keyboard tidak boleh keluar ke halaman di belakangnya.
  function trapFocus(e) {
    const items = Array.from(root.querySelectorAll('button:not([disabled])')).filter(b => b.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (!root.contains(active)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  }

  function click() { if (opts.click) opts.click(); }

  function drawScene() {
    const slide = cur.slides[idx];
    const box = root.querySelector('.xp-scene');
    box.innerHTML = '';
    void box.offsetWidth;
    box.innerHTML = slide.scene();
    box.setAttribute('aria-label', slide.alt || slide.title);
  }

  function go(i) {
    if (!cur || i < 0 || i >= cur.slides.length) return;
    idx = i;
    const s = cur.slides[i];
    // Tuti membacakan setiap slide jika pengaturan suara otomatis menyala.
    if (window.SiagaVoice) window.SiagaVoice.auto(`${s.title}. ${s.text}${s.note ? ' ' + s.note : ''}`);
    const mascot = opts.mascot ? opts.mascot('happy', 'small') : '';
    const body = root.querySelector('.xp-body');
    body.innerHTML = `
      <div class="ip-head">${mascot}
        <div><span class="phase-tag ${s.phase}">${esc(s.tag)}</span><h2>${esc(s.title)}</h2></div>
      </div>
      <p class="ip-text">${esc(s.text)}</p>
      ${'speechSynthesis' in window ? `<button class="say-btn" type="button" data-say="${esc(s.title + '. ' + s.text)}" aria-label="Dengarkan">${ic('sound-on')}<span>Dengarkan</span></button>` : ''}
      ${s.chips ? `<ul class="ip-chips">${s.chips.map((c, n) => `<li style="--d:${n}">
          <span class="ic-emo" aria-hidden="true">${ic(c.ic)}</span><div><b>${esc(c.t)}</b><span>${esc(c.d)}</span></div></li>`).join('')}</ul>` : ''}
      ${s.note ? `<p class="ip-note">${ic('bulb')}<span>${esc(s.note)}</span></p>` : ''}`;
    body.scrollTop = 0;
    body.classList.remove('swap');
    void body.offsetWidth;
    body.classList.add('swap');
    drawScene();

    const segs = root.querySelectorAll('.seg');
    segs.forEach((b, n) => {
      b.classList.toggle('done', n < i);
      b.classList.toggle('active', n === i);
      b.setAttribute('aria-current', n === i ? 'step' : 'false');
    });
    root.querySelector('.xp-count').textContent = `${i + 1} / ${cur.slides.length}`;
    root.querySelector('.xp-prev').disabled = i === 0;
    root.querySelector('.xp-next').innerHTML = i === cur.slides.length - 1 ? `Mulai misi ${ic('play')}` : `Lanjut ${ic('arrow-right')}`;
  }

  function open(o) {
    opts = o || {};
    const data = ISLAND_DATA[opts.island];
    if (!data) { if (opts.onClose) opts.onClose('none'); return; }
    build();
    cur = data;
    lastFocus = document.activeElement;
    root.dataset.island = opts.island;
    root.setAttribute('aria-label', `Penjelasan ${data.name}: ${data.theme}`);
    root.querySelector('.xp-progress').innerHTML = data.slides.map((s, n) =>
      `<button class="seg" type="button" data-i="${n}" aria-label="Bagian ${n + 1}: ${esc(s.title)}"><i></i></button>`).join('');
    root.querySelectorAll('.seg').forEach(b => b.addEventListener('click', () => { click(); go(Number(b.dataset.i)); }));
    root.classList.add('open');
    document.body.classList.add('xp-open');
    go(0);
    root.querySelector('.xp-next').focus({ preventScroll: true });
  }

  function close(reason) {
    if (!root || !root.classList.contains('open')) return;
    if (window.SiagaVoice) window.SiagaVoice.stop();
    root.classList.remove('open');
    document.body.classList.remove('xp-open');
    root.querySelector('.xp-scene').innerHTML = '';
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) { /* abaikan */ } }
    if (opts.onClose) opts.onClose(reason);
  }

  window.SiagaExplain = { open, has: id => !!ISLAND_DATA[id] };
})();
