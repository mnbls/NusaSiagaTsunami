/* Nusa Siaga — cerita pembuka dengan dunia 3D kartun (Three.js r128).
   Isi cerita diambil dari materi "Tsunami Awareness: Understanding, Preparing, and Staying Safe". */
(() => {
  'use strict';

  /* ================= Naskah cerita ================= */

  const SCENES = [
    {
      key: 'title', tag: 'Tsunami Awareness', phase: '',
      title: 'Memahami, Bersiap, dan Tetap Aman',
      text: 'Halo! Aku Tuti si Penyu. Sebelum mulai bermain, ikut aku mengenal tsunami dulu, yuk. Kita akan belajar dari pulau kecil ini.'
    },
    {
      key: 'what', tag: 'Definisi', phase: '',
      title: 'Apa itu tsunami?',
      text: 'Tsunami adalah fenomena alam akibat gempa bawah laut atau fenomena lain yang membuat dasar laut terangkat atau turun secara mendadak. Air laut jadi terganggu dan membentuk gelombang besar yang menyapu kawasan pantai.'
    },
    {
      key: 'cause', tag: 'Penyebab', phase: '',
      title: 'Dari mana tsunami datang?',
      chips: [
        { ic: 'tectonic', t: 'Gempa tektonik bawah laut', d: 'Lempeng di dasar laut bergeser vertikal pada kedalaman dangkal (kurang dari 60–70 km) dengan magnitudo besar (lebih dari 7,0).' },
        { ic: 'volcano', t: 'Letusan gunung berapi', d: 'Erupsi atau runtuhnya kaldera gunung api di laut atau dekat pantai mendorong massa air secara masif.' },
        { ic: 'landslide', t: 'Longsor bawah laut', d: 'Sedimen atau lereng dasar laut runtuh mendadak, umumnya dipicu gempa atau erupsi.' },
        { ic: 'meteor', t: 'Hantaman meteor', d: 'Benda luar angkasa berukuran besar jatuh ke laut dan memindahkan volume air seketika.' }
      ]
    },
    {
      key: 'impact', tag: 'Dampak', phase: '',
      title: 'Apa akibatnya?',
      chips: [
        { ic: 'heart-broken', t: 'Korban jiwa', d: 'Waktu evakuasi yang terbatas dapat menyebabkan kematian akibat tenggelam, reruntuhan, dan luka.' },
        { ic: 'crop', t: 'Kerusakan lingkungan', d: 'Air laut menaikkan kadar garam tanah dan sumber air sehingga pertanian terganggu. Air yang tercemar menambah risiko penyakit.' },
        { ic: 'fish', t: 'Pencemaran', d: 'Ekosistem laut dan terumbu karang rusak, serta tercemar limbah dan bahan beracun.' },
        { ic: 'radiation', t: 'Radiasi', d: 'Kerusakan fasilitas nuklir dapat menyebabkan pencemaran radiasi, seperti di Fukushima tahun 2011.' }
      ],
      note: 'Dalam kondisi tertentu ada sisi lain: terbentuk habitat baru, bertambahnya pengetahuan untuk mitigasi, dan pemulihan ekosistem, seperti setelah tsunami Chile tahun 2010.'
    },
    {
      key: 'pre', tag: 'Pra-bencana', phase: 'pre',
      title: 'Pencegahan dan kesiapsiagaan',
      chips: [
        { ic: 'eye', t: 'Pahami tanda alam', d: 'Lindungi diri jika merasakan gempa kuat lebih dari 20 detik, atau melihat air laut surut secara mendadak.' },
        { ic: 'sprout', t: 'Tanam vegetasi pantai', d: 'Bangun benteng alami seperti hutan mangrove untuk memecah energi gelombang di wilayah pesisir.' },
        { ic: 'map', t: 'Petakan jalur evakuasi', d: 'Kenali rute menuju Tempat Evakuasi Sementara (TES) atau dataran tinggi, minimal 20–30 meter di atas permukaan laut.' },
        { ic: 'bag', t: 'Siapkan Tas Siaga Bencana', d: 'Isi dengan dokumen penting, air minum, makanan tahan lama, senter, P3K, dan radio portabel.' }
      ]
    },
    {
      key: 'during', tag: 'Saat bencana', phase: 'now',
      title: 'Tanggap darurat',
      chips: [
        { ic: 'runner', t: 'Evakuasi segera ke tempat tinggi', d: 'Segera lari ke tempat yang lebih tinggi atau gedung bertingkat yang kokoh. Berjalan kakilah untuk menghindari kemacetan.' },
        { ic: 'no-entry', t: 'Jauhi pesisir dan sungai', d: 'Jangan mendekati pantai untuk melihat air laut surut. Gelombang juga bisa merambat naik lewat muara sungai.' },
        { ic: 'wave', t: 'Waspadai gelombang susulan', d: 'Gelombang pertama belum tentu yang terbesar. Tetap di tempat aman sampai ada instruksi resmi dari BMKG atau BPBD.' }
      ]
    },
    {
      key: 'after', tag: 'Pascabencana', phase: 'post',
      title: 'Pemulihan',
      chips: [
        { ic: 'no-entry', t: 'Hindari area terdampak', d: 'Tetap di tempat evakuasi sampai aman dari potensi runtuhan gedung atau bahaya listrik yang terendam.' },
        { ic: 'verified', t: 'Verifikasi informasi resmi', d: 'Hanya percaya info keamanan wilayah dari BMKG, BNPB, atau BPBD agar tidak termakan disinformasi.' },
        { ic: 'firstaid', t: 'Pemeriksaan kesehatan dan P3K', d: 'Berikan pertolongan pertama pada korban luka dan ikuti arahan petugas medis di posko pengungsian.' },
        { ic: 'crane', t: 'Rehabilitasi infrastruktur', d: 'Bersihkan puing, perbaiki jaringan listrik dan air, dan tata ulang ruang pesisir berbasis risiko bencana.' }
      ]
    },
    {
      key: 'mitig', tag: 'Mitigasi', phase: '',
      title: 'Memperkecil risiko tsunami',
      text: 'Mitigasi adalah segala usaha untuk memperkecil risiko dan dampak tsunami. Tujuannya menekan korban jiwa dan kerugian, serta membuat warga lebih siap.',
      groups: [
        { h: 'Struktural', items: [['seawall', 'Tanggul pemecah gelombang'], ['building', 'Bangunan tahan gempa'], ['tower', 'Menara evakuasi vertikal'], ['mangrove', 'Hutan mangrove'], ['breakwater', 'Pemecah gelombang lepas pantai']] },
        { h: 'Non-struktural', items: [['siren', 'Sistem peringatan dini'], ['zoning', 'Tata ruang dan zonasi pesisir'], ['map', 'Peta jalur evakuasi'], ['runner', 'Latihan evakuasi rutin'], ['megaphone', 'Edukasi dan sosialisasi']] }
      ]
    },
    {
      key: 'ready', tag: 'Ayo mulai!', phase: '',
      title: 'Siap jadi Pahlawan Siaga?',
      text: 'Sekarang saatnya mempraktikkan semua yang kamu pelajari. Jelajahi 4 pulau: Pulau Ilmu (mengenal tsunami), Pulau Benteng (mitigasi struktural), Pulau Siaga Warga (mitigasi non-struktural), dan Pulau Tanggap (sebelum, saat, dan sesudah tsunami).',
      credit: 'Sumber materi: presentasi "Tsunami Awareness: Understanding, Preparing, and Staying Safe" (UPN "Veteran" Yogyakarta).'
    }
  ];

  // Posisi kamera dan suasana untuk tiap adegan.
  const CAMS = {
    title:  { pos: [0, 45, 100],   look: [0, 4, 0],     sky: 0x8fd3ff, light: 1,    orbit: 0.35 },
    what:   { pos: [150, 80, 120], look: [0, 4, 48],    sky: 0x8fd3ff, light: 1,    orbit: 0 },
    cause:  { pos: [-28, 24, 16],  look: [-82, 12, -56], sky: 0x9cc4e6, light: 0.9, orbit: 0 },
    impact: { pos: [36, 20, 48],   look: [0, 2, 12],    sky: 0x6f7f9c, light: 0.7,  orbit: 0 },
    pre:    { pos: [-55, 36, 62],  look: [0, 4, 6],     sky: 0x9fe0ff, light: 1.05, orbit: 0 },
    during: { pos: [-105, 55, 80], look: [0, 4, 28],    sky: 0x7f93b5, light: 0.8,  orbit: 0 },
    after:  { pos: [-30, 30, 20],  look: [-4, 10, -9],  sky: 0xaee0ff, light: 1,    orbit: 0 },
    mitig:  { pos: [92, 48, 112],  look: [0, 0, 34],    sky: 0x8fd3ff, light: 1,    orbit: 0 },
    ready:  { pos: [0, 70, 130],   look: [0, 2, 0],     sky: 0xffc48a, light: 1,    orbit: 0.5 }
  };

  const SHOW = {
    mangrove: ['pre', 'during', 'after', 'mitig', 'ready'],
    path: ['pre', 'during'],
    tower: ['mitig', 'ready'],
    seawall: ['mitig', 'ready'],
    breakwater: ['mitig', 'ready'],
    tents: ['after', 'ready'],
    flood: ['impact'],
    smoke: ['cause']
  };

  /* ================= State & DOM ================= */

  let root = null;
  let idx = 0;
  let opts = {};
  let world = null;
  let raf = 0;
  let last = 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ic = (name, cls = '') => (window.SiagaIcons ? window.SiagaIcons.svg(name, cls) : '');

  function build() {
    if (root) return;
    root = document.createElement('div');
    root.className = 'intro';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Cerita pembuka');
    root.innerHTML = `
      <canvas class="intro-canvas" aria-hidden="true"></canvas>
      <div class="intro-top">
        <div class="intro-progress">
          ${SCENES.map((s, i) => `<button class="seg" type="button" data-i="${i}" aria-label="Bagian ${i + 1}: ${esc(s.title)}"><i></i></button>`).join('')}
        </div>
        <button class="btn small ghost intro-skip" type="button">Lewati ${ic('cross')}</button>
      </div>
      <section class="intro-panel card">
        <div class="intro-body" aria-live="polite"></div>
        <div class="intro-nav">
          <button class="btn ghost intro-prev" type="button">${ic('arrow-left')} Kembali</button>
          <span class="intro-count"></span>
          <button class="btn green intro-next" type="button"></button>
        </div>
      </section>`;
    document.body.appendChild(root);

    root.querySelector('.intro-prev').addEventListener('click', () => go(idx - 1));
    root.querySelector('.intro-next').addEventListener('click', () => (idx === SCENES.length - 1 ? close('finish') : go(idx + 1)));
    root.querySelector('.intro-skip').addEventListener('click', () => close('skip'));
    root.querySelectorAll('.seg').forEach(b => b.addEventListener('click', () => go(Number(b.dataset.i))));
    window.addEventListener('keydown', e => {
      if (!root.classList.contains('open')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); root.querySelector('.intro-next').click(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
      else if (e.key === 'Escape') close('skip');
    });
    window.addEventListener('resize', () => { if (world) world.resize(); });
  }

  function open(o) {
    opts = o || {};
    build();
    root.classList.add('open');
    document.body.classList.add('intro-open');
    if (!world) world = createWorld(root.querySelector('.intro-canvas'));
    if (!world) root.classList.add('no3d');
    go(0, true);
    last = 0;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
    root.querySelector('.intro-next').focus();
  }

  function close(reason) {
    cancelAnimationFrame(raf);
    root.classList.remove('open');
    document.body.classList.remove('intro-open');
    if (opts.onClose) opts.onClose(reason);
  }

  function go(i, instant) {
    if (i < 0 || i >= SCENES.length) return;
    idx = i;
    const s = SCENES[i];
    const mascot = opts.mascot ? opts.mascot('happy', 'small') : '';
    const body = root.querySelector('.intro-body');
    body.innerHTML = `
      <div class="ip-head">${mascot}
        <div>${s.tag ? `<span class="phase-tag ${s.phase}">${esc(s.tag)}</span>` : ''}<h2>${esc(s.title)}</h2></div>
      </div>
      ${s.text ? `<p class="ip-text">${esc(s.text)}</p>` : ''}
      ${s.chips ? `<ul class="ip-chips">${s.chips.map((c, n) => `<li style="--d:${n}">
          <span class="ic-emo" aria-hidden="true">${ic(c.ic)}</span><div><b>${esc(c.t)}</b><span>${esc(c.d)}</span></div></li>`).join('')}</ul>` : ''}
      ${s.groups ? `<div class="ip-groups">${s.groups.map((g, n) => `<div class="ip-group" style="--d:${n}"><h3>${esc(g.h)}</h3>
          <ul>${g.items.map(([name, label]) => `<li>${ic(name)}<span>${esc(label)}</span></li>`).join('')}</ul></div>`).join('')}</div>` : ''}
      ${s.note ? `<p class="ip-note">${ic('bulb')}<span>${esc(s.note)}</span></p>` : ''}
      ${s.credit ? `<p class="ip-credit">${esc(s.credit)}</p>` : ''}`;
    body.scrollTop = 0;
    body.classList.remove('swap');
    void body.offsetWidth;
    body.classList.add('swap');

    root.querySelectorAll('.seg').forEach((b, n) => {
      b.classList.toggle('done', n < i);
      b.classList.toggle('active', n === i);
      b.setAttribute('aria-current', n === i ? 'step' : 'false');
    });
    root.querySelector('.intro-count').textContent = `${i + 1} / ${SCENES.length}`;
    root.querySelector('.intro-prev').disabled = i === 0;
    root.querySelector('.intro-next').innerHTML = i === SCENES.length - 1 ? `Mulai main ${ic('play')}` : `Lanjut ${ic('arrow-right')}`;
    root.dataset.scene = s.key;
    if (world) world.setScene(s.key, instant);
  }

  function loop(now) {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    if (world) world.update(dt);
    raf = requestAnimationFrame(loop);
  }

  /* ================= Dunia 3D ================= */

  function createWorld(canvas) {
    const T = window.THREE;
    if (!T) return null;
    let renderer;
    try {
      renderer = new T.WebGLRenderer({ canvas, antialias: true });
    } catch (e) {
      return null;
    }
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    const INK = 0x23263a;
    const scene = new T.Scene();
    const sky = new T.Color(0x8fd3ff);
    scene.background = sky;
    scene.fog = new T.Fog(0x8fd3ff, 200, 560);
    const camera = new T.PerspectiveCamera(45, 1, 0.5, 1200);

    // Toon shading 3 tingkat + garis tepi (inverted hull) untuk kesan kartun.
    const grad = new T.DataTexture(new Uint8Array([95, 175, 255]), 3, 1, T.LuminanceFormat);
    grad.minFilter = T.NearestFilter;
    grad.magFilter = T.NearestFilter;
    grad.needsUpdate = true;
    const toon = (color, extra) => new T.MeshToonMaterial(Object.assign({ color, gradientMap: grad }, extra || {}));
    const outlineMat = new T.MeshBasicMaterial({ color: INK, side: T.BackSide });
    function mk(geo, mat, x = 0, y = 0, z = 0, outline = 1.06) {
      const m = new T.Mesh(geo, mat);
      m.position.set(x, y, z);
      if (outline) {
        const o = new T.Mesh(geo, outlineMat);
        o.scale.setScalar(outline);
        m.add(o);
      }
      return m;
    }

    const hemi = new T.HemisphereLight(0xffffff, 0x8fb3d9, 0.55);
    scene.add(hemi);
    const sunLight = new T.DirectionalLight(0xffffff, 0.6);
    sunLight.position.set(60, 100, 40);
    scene.add(sunLight);

    // --- Laut ---
    const waterGeo = new T.PlaneGeometry(800, 800, 110, 110);
    waterGeo.rotateX(-Math.PI / 2);
    const wPos = waterGeo.attributes.position;
    const wBase = Float32Array.from(wPos.array);
    const water = new T.Mesh(waterGeo, toon(0x2f8ee0));
    scene.add(water);

    // --- Pulau ---
    const island = new T.Group();
    scene.add(island);
    island.add(mk(new T.CylinderGeometry(33, 36, 2.4, 48), toon(0xffd98a), 0, -0.5, 0, 1.015));
    island.add(mk(new T.CylinderGeometry(27, 28.5, 1.6, 48), toon(0x7cd35a), 0, 0.6, 0, 1.02));
    const HILL = { x: -4, z: -10, r: 12, sy: 0.9, y: 1 };
    const hill = mk(new T.SphereGeometry(HILL.r, 32, 20), toon(0x5fbf45), HILL.x, HILL.y, HILL.z, 1.03);
    hill.scale.y = HILL.sy;
    island.add(hill);
    const heightAt = (x, z) => {
      const dx = x - HILL.x, dz = z - HILL.z, d2 = dx * dx + dz * dz;
      const hy = d2 < HILL.r * HILL.r ? HILL.y + Math.sqrt(HILL.r * HILL.r - d2) * HILL.sy : 0;
      return Math.max(1.4, hy);
    };
    const TOP = new T.Vector3(HILL.x, heightAt(HILL.x, HILL.z), HILL.z);

    // Bendera titik kumpul di puncak bukit
    island.add(mk(new T.CylinderGeometry(0.15, 0.15, 5, 6), toon(0xffffff), TOP.x, TOP.y + 2.5, TOP.z, 1.25));
    const flag = mk(new T.BoxGeometry(2.6, 1.5, 0.15), toon(0xff6b6b), TOP.x + 1.35, TOP.y + 4.2, TOP.z, 1.08);
    island.add(flag);

    // Rumah
    const roofColors = [0xff8a65, 0xffc93c, 0x6cc4ff, 0xc084fc, 0xff6b6b, 0x7ee0c3, 0xffa94d];
    const houses = [[8, 18], [15, 12], [0, 21], [-8, 18], [-15, 12], [9, 8], [-9, 8]].map(([x, z], i) => {
      const g = new T.Group();
      g.position.set(x, 1.4, z);
      g.rotation.y = Math.atan2(x, z);
      g.add(mk(new T.BoxGeometry(3.6, 3, 3.6), toon(0xfff3dd), 0, 1.5, 0, 1.05));
      const roof = mk(new T.ConeGeometry(3.3, 2.4, 4), toon(roofColors[i]), 0, 4.2, 0, 1.06);
      roof.rotation.y = Math.PI / 4;
      g.add(roof);
      island.add(g);
      return g;
    });

    // Pohon kelapa
    [[22, 10], [-22, 10], [24, -4], [-24, -2], [18, 19], [-18, 19], [12, -20], [20, -14]].forEach(([x, z]) => {
      const g = new T.Group();
      g.position.set(x, 1.4, z);
      const trunk = mk(new T.CylinderGeometry(0.35, 0.5, 6, 8), toon(0x9a6b45), 0, 3, 0, 1.12);
      trunk.rotation.z = 0.12;
      g.add(trunk);
      g.add(mk(new T.ConeGeometry(3, 1.6, 7), toon(0x3fae4a), 0.4, 6.4, 0, 1.06));
      island.add(g);
    });

    // Hutan mangrove di garis pantai selatan
    const mangroves = [];
    for (let i = 0; i < 13; i++) {
      const a = (25 + i * 10) * Math.PI / 180;
      const g = new T.Group();
      g.position.set(Math.cos(a) * 31, 0.7, Math.sin(a) * 31);
      g.add(mk(new T.SphereGeometry(1.8, 10, 8), toon(0x2e8b3a), 0, 2.4, 0, 1.08));
      g.add(mk(new T.SphereGeometry(1.3, 10, 8), toon(0x3fa84a), 1.2, 2.9, 0.6, 1.08));
      [[0.8, 0.6], [-0.7, 0.5], [0, -0.8]].forEach(([lx, lz]) => {
        const root = mk(new T.CylinderGeometry(0.12, 0.12, 2.2, 5), toon(0x7a5236), lx, 1.1, lz, 0);
        root.rotation.z = lx * 0.3;
        g.add(root);
      });
      g.scale.setScalar(0.001);
      g.userData.delay = i * 0.06;
      island.add(g);
      mangroves.push(g);
    }

    // Jalur evakuasi menuju bukit
    const curve = new T.CatmullRomCurve3([[5, 16], [3, 11], [1, 6], [-1.5, 1], [-3, -3], [-4, -7], [-4, -10]]
      .map(([x, z]) => new T.Vector3(x, heightAt(x, z), z)));
    const pathAt = u => {
      const p = curve.getPointAt(Math.min(1, Math.max(0, u)));
      p.y = heightAt(p.x, p.z);
      return p;
    };
    const markers = [];
    const markerGeo = new T.BoxGeometry(0.9, 0.25, 0.9);
    for (let i = 0; i < 34; i++) {
      const m = new T.Mesh(markerGeo, new T.MeshBasicMaterial({ color: 0x1f9d55 }));
      m.position.copy(pathAt(i / 33));
      m.position.y += 0.25;
      m.scale.setScalar(0.001);
      island.add(m);
      markers.push(m);
    }

    // Menara sirene (sistem peringatan dini)
    const siren = new T.Group();
    siren.position.set(-12, 1.4, 20);
    siren.add(mk(new T.CylinderGeometry(0.25, 0.3, 9, 8), toon(0xb9bccb), 0, 4.5, 0, 1.15));
    siren.add(mk(new T.BoxGeometry(1.8, 1.1, 1.1), toon(0xffc93c), 0, 9.3, 0, 1.08));
    const sirenLightMat = new T.MeshBasicMaterial({ color: 0x7a1f2a });
    const sirenLight = new T.Mesh(new T.SphereGeometry(0.55, 12, 10), sirenLightMat);
    sirenLight.position.set(0, 10.3, 0);
    siren.add(sirenLight);
    island.add(siren);

    // Menara evakuasi vertikal
    const tower = new T.Group();
    tower.position.set(16, 1.4, 2);
    [[-2, -2], [2, -2], [-2, 2], [2, 2]].forEach(([x, z]) => tower.add(mk(new T.BoxGeometry(0.6, 10, 0.6), toon(0xb9bccb), x, 5, z, 1.1)));
    tower.add(mk(new T.BoxGeometry(5.6, 0.6, 5.6), toon(0xffffff), 0, 10, 0, 1.04));
    const tRoof = mk(new T.ConeGeometry(4.2, 2.4, 4), toon(0x1f9d55), 0, 12.2, 0, 1.06);
    tRoof.rotation.y = Math.PI / 4;
    tower.add(tRoof);
    tower.scale.set(1, 0.001, 1);
    island.add(tower);

    // Tanggul pantai
    const seawall = new T.Group();
    for (let a = 15; a <= 165; a += 7.5) {
      const r = a * Math.PI / 180;
      const seg = mk(new T.BoxGeometry(5, 3, 1.2), toon(0xb9bccb), Math.cos(r) * 35.5, 1.2, Math.sin(r) * 35.5, 1.06);
      seg.rotation.y = -r + Math.PI / 2;
      seawall.add(seg);
    }
    seawall.scale.set(1, 0.001, 1);
    scene.add(seawall);

    // Pemecah gelombang lepas pantai
    const breakwater = new T.Group();
    for (let i = 0; i < 9; i++) breakwater.add(mk(new T.BoxGeometry(7, 2.6, 3), toon(0x8c8fa3), -44 + i * 11, 0.8, 62 + (i % 2) * 1.6, 1.05));
    breakwater.scale.set(1, 0.001, 1);
    scene.add(breakwater);

    // Tenda posko pengungsian di bukit
    const tents = [[-9, -12, 0xffffff], [0.5, -13, 0xffa94d], [-6, -4.5, 0xffffff], [1, -7, 0x6cc4ff]].map(([x, z, c]) => {
      const g = new T.Group();
      g.position.set(x, heightAt(x, z), z);
      const cone = mk(new T.ConeGeometry(1.9, 2.6, 4), toon(c), 0, 1.3, 0, 1.07);
      cone.rotation.y = Math.PI / 4;
      g.add(cone);
      g.add(mk(new T.BoxGeometry(0.9, 0.25, 0.08), toon(0xff3b3b), 0, 1.6, 1.0, 0));
      g.add(mk(new T.BoxGeometry(0.25, 0.9, 0.08), toon(0xff3b3b), 0, 1.6, 1.0, 0));
      g.scale.setScalar(0.001);
      island.add(g);
      return g;
    });

    // Warga
    const shirts = [0xff6b6b, 0x6cc4ff, 0xffc93c, 0x7cd35a, 0xc084fc, 0xff8a3d, 0x4fc3c3, 0xff9aa2, 0x8ea6ff];
    const people = shirts.map((c, i) => {
      const g = new T.Group();
      g.add(mk(new T.CylinderGeometry(0.38, 0.48, 1.3, 10), toon(c), 0, 0.65, 0, 1.14));
      g.add(mk(new T.SphereGeometry(0.42, 12, 10), toon(0xffd2a1), 0, 1.65, 0, 1.12));
      const h = houses[i % houses.length].position;
      g.userData.home = new T.Vector3(h.x * 0.86 + (i % 2 ? 1.5 : -1.5), 1.4, h.z * 0.86);
      g.position.copy(g.userData.home);
      island.add(g);
      return g;
    });

    // Banjir dan puing (adegan dampak)
    const floodMat = new T.MeshBasicMaterial({ color: 0x3a8fd6, transparent: true, opacity: 0.78 });
    const flood = new T.Mesh(new T.CircleGeometry(29, 48), floodMat);
    flood.rotation.x = -Math.PI / 2;
    flood.position.y = -1;
    island.add(flood);
    const debris = [];
    for (let i = 0; i < 12; i++) {
      const d = mk(new T.BoxGeometry(1.4, 0.4, 0.9), toon(i % 2 ? 0x9a6b45 : 0xb9bccb), 0, 0, 0, 1.12);
      d.userData.p = new T.Vector3((Math.random() - 0.5) * 34, 0, 4 + Math.random() * 20);
      d.userData.s = Math.random() * 6;
      island.add(d);
      debris.push(d);
    }

    // Gunung berapi di kejauhan
    const volc = new T.Group();
    volc.position.set(-90, 0, -50);
    volc.add(mk(new T.CylinderGeometry(16, 18, 2, 32), toon(0xffd98a), 0, -0.3, 0, 1.02));
    volc.add(mk(new T.CylinderGeometry(3.5, 13, 18, 24), toon(0x8a6a5a), 0, 9, 0, 1.03));
    const lava = new T.Mesh(new T.CylinderGeometry(3.3, 3.3, 0.5, 20), new T.MeshBasicMaterial({ color: 0xff7a2e }));
    lava.position.y = 18.1;
    volc.add(lava);
    scene.add(volc);
    const smokeMat = toon(0xa7adbf);
    const smoke = [];
    for (let i = 0; i < 14; i++) {
      const p = mk(new T.SphereGeometry(2, 10, 8), smokeMat, 0, 18, 0, 1.08);
      p.userData.phase = i / 14;
      p.scale.setScalar(0.001);
      volc.add(p);
      smoke.push(p);
    }

    // Meteor
    const meteor = new T.Group();
    meteor.add(mk(new T.SphereGeometry(2.2, 14, 12), new T.MeshBasicMaterial({ color: 0xffa53d }), 0, 0, 0, 1.15));
    const trail = new T.Mesh(new T.ConeGeometry(1.8, 16, 12), new T.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0.75 }));
    trail.rotation.x = Math.PI / 2;
    trail.position.z = -8;
    meteor.add(trail);
    meteor.visible = false;
    scene.add(meteor);
    const M_START = new T.Vector3(-20, 95, -120);
    const M_END = new T.Vector3(-55, 0, -82);

    // Riak air
    const ripples = [];
    for (let i = 0; i < 8; i++) {
      const r = new T.Mesh(new T.RingGeometry(0.88, 1, 56), new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: T.DoubleSide }));
      r.rotation.x = -Math.PI / 2;
      r.userData.life = 0;
      scene.add(r);
      ripples.push(r);
    }
    function ripple(x, z, size, dur) {
      const r = ripples.find(p => p.userData.life <= 0) || ripples[0];
      r.position.set(x, 0.6, z);
      Object.assign(r.userData, { life: dur, dur, size });
    }

    // Gelombang tsunami (penampang melengkung yang diekstrusi)
    const shape = new T.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(20, 0);
    shape.quadraticCurveTo(11, 2, 6, 8);
    shape.quadraticCurveTo(3, 12.5, -2.5, 10.5);
    shape.quadraticCurveTo(-3.5, 7.8, 0, 7.4);
    shape.quadraticCurveTo(2.6, 4, 0, 0);
    const toWorld = geo => { geo.rotateY(-Math.PI / 2); geo.translate(75, 0, 0); return geo; };
    const waveGeo = toWorld(new T.ExtrudeGeometry(shape, { depth: 150, bevelEnabled: false, curveSegments: 14 }));
    // Garis tepi gelombang: penampang yang sama, digeser keluar sedikit, digambar dari sisi belakang.
    const pts = shape.getPoints(28);
    if (pts[0].equals(pts[pts.length - 1])) pts.pop();
    let area = 0;
    pts.forEach((p, i) => { const q = pts[(i + 1) % pts.length]; area += p.x * q.y - q.x * p.y; });
    const sign = area > 0 ? 1 : -1;
    const grown = pts.map((p, i) => {
      const a = pts[(i - 1 + pts.length) % pts.length], b = pts[(i + 1) % pts.length];
      const nx = (b.y - a.y) * sign, ny = -(b.x - a.x) * sign;
      const len = Math.hypot(nx, ny) || 1;
      return new T.Vector2(p.x + nx / len * 0.45, p.y + ny / len * 0.45);
    });
    const lineGeo = toWorld(new T.ExtrudeGeometry(new T.Shape(grown), { depth: 151, bevelEnabled: false }));
    lineGeo.translate(0.5, 0, 0);
    const wave = new T.Group();
    wave.add(mk(waveGeo, toon(0x1565b8), 0, 0, 0, 0));
    wave.add(new T.Mesh(lineGeo, outlineMat));
    const foam = [];
    for (let i = 0; i < 16; i++) {
      const f = mk(new T.SphereGeometry(1.4, 10, 8), toon(0xffffff), -70 + i * 9.4, 10.6, -1.6, 1.1);
      wave.add(f);
      foam.push(f);
    }
    wave.scale.set(1, 0.001, 1);
    wave.position.z = 160;
    scene.add(wave);

    // Awan & matahari
    const clouds = [];
    [[-60, 52, -60], [40, 58, -90], [90, 48, 10], [-100, 60, 40], [10, 64, 60], [-30, 56, 120]].forEach(([x, y, z]) => {
      const g = new T.Group();
      g.position.set(x, y, z);
      [[0, 0, 0, 5], [5, -1, 1, 3.8], [-5, -1, 0, 3.6], [2, 2.5, -1, 3.4]].forEach(([a, b, c, r]) => g.add(mk(new T.SphereGeometry(r, 12, 10), toon(0xffffff), a, b, c, 1.06)));
      scene.add(g);
      clouds.push(g);
    });
    const sunBall = mk(new T.SphereGeometry(18, 24, 20), new T.MeshBasicMaterial({ color: 0xffd23f }), 160, 150, -360, 1.06);
    scene.add(sunBall);

    /* --- Animasi per adegan --- */
    let key = 'title';
    let st = 0;   // waktu sejak adegan dimulai
    let t = 0;    // waktu total
    let shake = 0;
    const camPos = new T.Vector3(...CAMS.title.pos);
    const camLook = new T.Vector3(...CAMS.title.look);
    const tmpPos = new T.Vector3();
    const tmpLook = new T.Vector3();
    const skyTarget = new T.Color(CAMS.title.sky);
    let lightTarget = 1;
    let rippleClock = 0;
    let meteorSplashed = false;

    const shown = what => SHOW[what].includes(key);
    const approach = (cur, target, rate, dt) => cur + (target - cur) * Math.min(1, rate * dt);

    function setScene(k, instant) {
      key = k;
      st = 0;
      rippleClock = 0;
      meteorSplashed = false;
      const c = CAMS[k];
      skyTarget.set(c.sky);
      lightTarget = c.light;
      if (instant) {
        camPos.set(...c.pos);
        camLook.set(...c.look);
        sky.set(c.sky);
      }
      if (k === 'what' || k === 'cause') shake = 0.9;
    }

    function resize() {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 0.8 ? 62 : 45;
      // Geser pusat pandang menjauhi panel cerita (kiri di desktop, bawah di ponsel).
      const panel = root.querySelector('.intro-panel');
      const pr = panel ? panel.getBoundingClientRect() : null;
      let ox = 0, oy = 0;
      if (pr && w > 760) ox = -(pr.right) / 2.4;
      else if (pr) oy = (h - pr.top) / 2.2;
      camera.setViewOffset(w, h, ox, oy, w, h);
      camera.updateProjectionMatrix();
    }
    resize();

    function waveState() {
      // Mengembalikan posisi z dan tinggi gelombang untuk adegan saat ini.
      if (key === 'what') {
        const c = st % 9;
        if (c < 1.4) return { z: 130, h: 0 };
        const p = (c - 1.4) / 6;
        return { z: 130 - Math.min(p, 1) * 88, h: p < 1 ? Math.min(1, p * 1.7) : Math.max(0, 1 - (p - 1) * 3) };
      }
      if (key === 'during') {
        const c = st % 14;
        const p = c / 11;
        return { z: 150 - Math.min(p, 1) * 116, h: p < 1 ? Math.min(1, 0.4 + p) : Math.max(0, 1 - (p - 1) * 3.5) };
      }
      if (key === 'mitig') {
        const c = st % 10;
        const p = Math.min(1, c / 7.5);
        const z = 150 - p * 112;
        let h = z > 64 ? 1 : z > 40 ? 0.42 : Math.max(0, 0.42 - (40 - z) * 0.2);
        if (c > 7.5) h = 0;
        return { z, h };
      }
      return { z: wave.position.z, h: 0 };
    }

    function update(dt) {
      t += dt;
      st += dt;
      const motion = reduceMotion ? 0 : 1;

      // Langit & cahaya
      sky.lerp(skyTarget, Math.min(1, dt * 2));
      scene.fog.color.copy(sky);
      hemi.intensity = approach(hemi.intensity, 0.55 * lightTarget, 2, dt);
      sunLight.intensity = approach(sunLight.intensity, 0.6 * lightTarget, 2, dt);

      // Laut bergelombang
      const amp = key === 'impact' || key === 'during' ? 1.6 : 1;
      for (let i = 0; i < wPos.count; i++) {
        const x = wBase[i * 3], z = wBase[i * 3 + 2];
        wPos.array[i * 3 + 1] = (Math.sin(x * 0.06 + t * 1.3) + Math.cos(z * 0.07 + t * 1.1)) * 0.32 * amp * (0.3 + 0.7 * motion);
      }
      wPos.needsUpdate = true;
      waterGeo.computeVertexNormals();

      // Objek yang muncul/tenggelam per adegan
      mangroves.forEach(m => {
        const target = shown('mangrove') ? 1 : 0.001;
        m.scale.setScalar(approach(m.scale.x, st > m.userData.delay ? target : m.scale.x, 4, dt));
      });
      markers.forEach((m, i) => {
        const target = shown('path') ? 1 : 0.001;
        m.scale.setScalar(approach(m.scale.x, st > i * 0.035 ? target : m.scale.x, 6, dt));
        const glow = 0.5 + 0.5 * Math.sin(t * 5 - i * 0.45);
        m.material.color.setRGB(0.12 + glow * 0.88, 0.62 + glow * 0.3, 0.33 - glow * 0.1);
      });
      tower.scale.y = approach(tower.scale.y, shown('tower') ? 1 : 0.001, 2.5, dt);
      seawall.scale.y = approach(seawall.scale.y, shown('seawall') ? 1 : 0.001, 2.5, dt);
      breakwater.scale.y = approach(breakwater.scale.y, shown('breakwater') ? 1 : 0.001, 2.5, dt);
      tents.forEach((g, i) => g.scale.setScalar(approach(g.scale.x, shown('tents') && st > i * 0.15 ? 1 : (shown('tents') ? g.scale.x : 0.001), 4, dt)));

      // Banjir, puing, dan rumah miring
      flood.position.y = approach(flood.position.y, shown('flood') ? 1.9 : -1, 1.5, dt);
      debris.forEach((d, i) => {
        const on = shown('flood');
        d.visible = flood.position.y > 0.6;
        d.position.set(d.userData.p.x + Math.sin(t * 0.6 + i) * 1.5, flood.position.y + 0.25 + Math.sin(t * 2 + d.userData.s) * 0.15, d.userData.p.z + Math.cos(t * 0.5 + i) * 1.2);
        d.rotation.y = t * 0.4 + i;
        d.rotation.z = Math.sin(t + i) * 0.2 * (on ? 1 : 0);
      });
      houses.forEach((h, i) => { h.rotation.z = approach(h.rotation.z, key === 'impact' ? (i % 2 ? 0.12 : -0.1) : 0, 2, dt); });

      // Sirene peringatan dini berkedip
      const alarm = (key === 'during' || key === 'mitig') && Math.floor(t * 3.5) % 2 === 0;
      sirenLightMat.color.set(alarm ? 0xff2d3d : 0x7a1f2a);
      flag.rotation.y = Math.sin(t * 3) * 0.25;

      // Warga
      people.forEach((p, i) => {
        let target;
        let bounce = 0;
        if (key === 'during') {
          const u = Math.min(0.97, Math.max(0, (st - 0.6 - i * 0.45) / 10));
          target = pathAt(u);
          target.x += ((i % 3) - 1) * 0.9;
          target.y = heightAt(target.x, target.z);
          if (u > 0 && u < 0.97) bounce = Math.abs(Math.sin(t * 11 + i)) * 0.35;
        } else if (key === 'after' || key === 'ready') {
          const a = i * 0.7;
          target = new T.Vector3(TOP.x + Math.cos(a) * (2 + (i % 3)), 0, TOP.z + Math.sin(a) * (2 + (i % 3)));
          target.y = heightAt(target.x, target.z);
        } else {
          target = p.userData.home.clone();
        }
        p.position.x = approach(p.position.x, target.x, 5, dt);
        p.position.z = approach(p.position.z, target.z, 5, dt);
        p.position.y = heightAt(p.position.x, p.position.z) + bounce;
        if (key === 'impact') p.visible = false;
        else p.visible = true;
      });

      // Gunung berapi & asap
      smoke.forEach(s => {
        const ph = (s.userData.phase + t * 0.12) % 1;
        const on = shown('smoke');
        const size = on ? 0.6 + ph * 2.2 : 0.001;
        s.scale.setScalar(approach(s.scale.x, size, 3, dt));
        s.position.set(Math.sin(ph * 6 + s.userData.phase * 9) * 3 + ph * 8, 19 + ph * 30, Math.cos(ph * 5) * 2);
      });
      lava.material.color.setHSL(0.06, 1, key === 'cause' ? 0.5 + Math.sin(t * 6) * 0.08 : 0.35);

      // Meteor (adegan penyebab)
      if (key === 'cause') {
        const c = (st + 1.5) % 6;
        const p = Math.min(1, c / 2.2);
        meteor.visible = p < 1;
        meteor.position.lerpVectors(M_START, M_END, p);
        meteor.lookAt(M_END);
        if (p >= 1 && !meteorSplashed) {
          meteorSplashed = true;
          ripple(M_END.x, M_END.z, 26, 2.2);
          ripple(M_END.x, M_END.z, 14, 1.6);
          shake = 0.6;
        }
        if (p < 1) meteorSplashed = false;
      } else {
        meteor.visible = false;
      }

      // Riak dari pusat gempa
      if (key === 'what') {
        rippleClock -= dt;
        if (st % 9 < 1.6 && rippleClock <= 0) {
          ripple(0, 135, 40, 2.6);
          rippleClock = 0.5;
          shake = Math.max(shake, 0.35);
        }
      }
      ripples.forEach(r => {
        const u = r.userData;
        if (u.life <= 0) { r.material.opacity = 0; return; }
        u.life -= dt;
        const p = 1 - Math.max(0, u.life) / u.dur;
        r.scale.setScalar(1 + p * u.size);
        r.material.opacity = (1 - p) * 0.9;
      });

      // Gelombang tsunami
      const ws = waveState();
      if (ws.h > 0) wave.position.z = ws.z;
      wave.scale.y = approach(wave.scale.y, Math.max(0.001, ws.h), 6, dt);
      wave.scale.z = 0.6 + 0.4 * wave.scale.y;
      wave.visible = wave.scale.y > 0.02;
      foam.forEach((f, i) => { f.position.y = 10.4 + Math.sin(t * 4 + i) * 0.4; });
      if (key === 'mitig' && ws.z < 66 && ws.z > 62 && rippleClock <= 0) {
        for (let i = -2; i <= 2; i++) ripple(i * 18, 63, 6, 1.2);
        rippleClock = 1.5;
      }
      if (key === 'mitig') rippleClock -= dt;

      // Awan
      clouds.forEach((c, i) => { c.position.x += dt * (1 + i * 0.3) * motion; if (c.position.x > 160) c.position.x = -160; });

      // Kamera
      const c = CAMS[key];
      tmpPos.set(...c.pos);
      if (c.orbit && motion) {
        const ang = Math.sin(t * 0.12) * c.orbit;
        const x = tmpPos.x * Math.cos(ang) + tmpPos.z * Math.sin(ang);
        const z = -tmpPos.x * Math.sin(ang) + tmpPos.z * Math.cos(ang);
        tmpPos.x = x;
        tmpPos.z = z;
      }
      tmpPos.y += Math.sin(t * 0.5) * 1.2 * motion;
      tmpLook.set(...c.look);
      camPos.lerp(tmpPos, Math.min(1, dt * 1.6));
      camLook.lerp(tmpLook, Math.min(1, dt * 1.8));
      camera.position.copy(camPos);
      shake = Math.max(0, shake - dt);
      if (shake > 0 && motion) {
        camera.position.x += (Math.random() - 0.5) * shake * 1.6;
        camera.position.y += (Math.random() - 0.5) * shake * 1.2;
      }
      camera.lookAt(camLook);

      renderer.render(scene, camera);
    }

    return { setScene, update, resize };
  }

  // _step(detik): memajukan animasi secara langsung, dipakai untuk pengujian.
  window.SiagaIntro = {
    open,
    _step(seconds) { if (world) for (let s = 0; s < seconds; s += 1 / 30) world.update(1 / 30); }
  };
})();
