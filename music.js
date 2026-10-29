/* Musik latar Nusa Siaga — disusun langsung dengan Web Audio, tanpa file lagu.
   Dua suasana:
   - 'calm'    : lagu pulau yang ceria dan santai (menu, peta, pulau) + suara ombak.
   - 'mission' : lagu siaga yang lebih cepat untuk menemani misi, tetap pelan agar tidak mengganggu. */
(function () {
  'use strict';

  const AC = window.AudioContext || window.webkitAudioContext;
  const VOLUME = 0.35;
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);

  // Melodi pentatonik (C D E G A) supaya terdengar seperti lagu pulau tropis.
  const A = [
    72, 0, 76, 0, 74, 72, 69, 0,
    69, 0, 72, 0, 69, 67, 64, 0,
    69, 0, 67, 69, 72, 0, 69, 0,
    67, 0, 0, 64, 67, 0, 0, 0
  ];
  const A2 = A.slice(0, 24).concat([67, 0, 69, 0, 71, 0, 74, 0]);
  const B = [
    76, 0, 79, 0, 76, 74, 72, 0,
    74, 0, 72, 0, 69, 0, 72, 0,
    69, 72, 74, 0, 72, 69, 67, 0,
    74, 0, 0, 72, 71, 0, 67, 0
  ];
  const HOOK = [
    76, 0, 0, 76, 74, 0, 72, 0,
    72, 0, 0, 72, 69, 0, 67, 0,
    67, 0, 69, 0, 72, 0, 74, 0,
    74, 0, 0, 0, 71, 0, 0, 0
  ];

  // Akor per birama: [nada bas, nada-nada pad].
  const SONGS = {
    calm: {
      bpm: 92,
      chords: [[48, [60, 64, 67]], [45, [57, 60, 64]], [41, [57, 60, 65]], [43, [55, 59, 62]]],
      melody: A.concat(A2, B, A),
      bass: { 0: 0, 3: 0, 4: 7 },
      sea: 1
    },
    mission: {
      bpm: 116,
      chords: [[45, [57, 60, 64]], [41, [57, 60, 65]], [48, [55, 60, 64]], [43, [55, 59, 62]]],
      melody: new Array(32).fill(0).concat(HOOK),
      bass: { 0: 0, 1: 12, 2: 0, 3: 12, 4: 0, 5: 12, 6: 0, 7: 12 },
      arp: [0, 1, 2, 3, 2, 1, 2, 1],
      kick: [0, 4],
      sea: 0.25
    }
  };

  let ctx = null, bus = null, echo = null, seaGain = null, noise = null;
  let playing = false, mood = 'calm', step = 0, nextTime = 0, timer = 0, swap = 0, switching = false;

  function ensure() {
    if (ctx || !AC) return ctx;
    ctx = new AC();
    bus = ctx.createGain();
    bus.gain.value = 0;
    bus.connect(ctx.destination);

    // Gema lembut untuk melodi.
    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.33;
    const fb = ctx.createGain();
    fb.gain.value = 0.28;
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 1800;
    echo = ctx.createGain();
    echo.gain.value = 0.35;
    echo.connect(delay);
    delay.connect(tone).connect(fb).connect(delay);
    tone.connect(bus);

    noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

    // Suara ombak: derau rendah yang naik-turun pelan.
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 420;
    const swell = ctx.createGain();
    swell.gain.value = 0.05;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.13;
    const lfoAmt = ctx.createGain();
    lfoAmt.gain.value = 0.04;
    lfo.connect(lfoAmt).connect(swell.gain);
    seaGain = ctx.createGain();
    seaGain.gain.value = 0;
    src.connect(lp).connect(swell).connect(seaGain).connect(bus);
    src.start();
    lfo.start();

    document.addEventListener('visibilitychange', () => {
      if (!playing) return;
      if (document.hidden) ctx.suspend();
      else ctx.resume().then(() => { nextTime = Math.max(nextTime, ctx.currentTime + 0.05); });
    });
    return ctx;
  }

  function env(node, t, vol, attack, decay) {
    node.gain.setValueAtTime(0.0001, t);
    node.gain.exponentialRampToValueAtTime(vol, t + attack);
    node.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  // Bunyi kayu seperti marimba/kolintang: sinus + nada atas yang cepat hilang.
  function marimba(m, t, vol) {
    [[1, vol, 0.55], [4, vol * 0.25, 0.08]].forEach(([mul, v, dec]) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = hz(m) * mul;
      env(g, t, v, 0.005, dec);
      o.connect(g);
      g.connect(bus);
      if (mul === 1) g.connect(echo);
      o.start(t);
      o.stop(t + dec + 0.05);
    });
  }

  function pluck(m, t, vol, dec) {
    const o = ctx.createOscillator();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = hz(m);
    f.type = 'lowpass';
    f.frequency.value = 1500;
    env(g, t, vol, 0.006, dec);
    o.connect(f).connect(g).connect(bus);
    o.start(t);
    o.stop(t + dec + 0.05);
  }

  function pad(notes, t, len) {
    notes.forEach(m => [-5, 5].forEach(cents => {
      const o = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.value = hz(m);
      o.detune.value = cents;
      f.type = 'lowpass';
      f.frequency.value = 900;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.022, t + 0.5);
      g.gain.setValueAtTime(0.022, t + len - 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len + 0.2);
      o.connect(f).connect(g).connect(bus);
      o.start(t);
      o.stop(t + len + 0.3);
    }));
  }

  function shaker(t, vol) {
    const s = ctx.createBufferSource();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    s.buffer = noise;
    f.type = 'highpass';
    f.frequency.value = 6000;
    env(g, t, vol, 0.004, 0.05);
    s.connect(f).connect(g).connect(bus);
    s.start(t, Math.random() * 1.5, 0.08);
  }

  function kick(t) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(130, t);
    o.frequency.exponentialRampToValueAtTime(45, t + 0.15);
    env(g, t, 0.32, 0.004, 0.18);
    o.connect(g).connect(bus);
    o.start(t);
    o.stop(t + 0.25);
  }

  function playStep(song, i, t, dur) {
    const s = i % 8;
    const bar = Math.floor(i / 8);
    const [root, notes] = song.chords[bar % song.chords.length];
    if (s === 0) pad(notes, t, dur * 8);
    if (s in song.bass) pluck(root + song.bass[s], t, song === SONGS.mission ? 0.16 : 0.26, song === SONGS.mission ? 0.14 : 0.35);
    if (song.arp) {
      const tones = notes.concat(notes[0] + 12);
      pluck(tones[song.arp[s]] + 12, t, 0.06, 0.18);
    }
    if (song.kick && song.kick.includes(s)) kick(t);
    shaker(t, s % 2 ? 0.05 : 0.02);
    const m = song.melody[i % song.melody.length];
    if (m) marimba(m, t, song === SONGS.mission ? 0.13 : 0.2);
  }

  function tick() {
    // Saat berganti suasana, berhenti menjadwalkan sampai lagu lama selesai memudar.
    if (switching) return;
    const song = SONGS[mood];
    const dur = 60 / song.bpm / 2;
    while (nextTime < ctx.currentTime + 0.3) {
      playStep(song, step, nextTime, dur);
      step = (step + 1) % song.melody.length;
      nextTime += dur;
    }
  }

  function fadeTo(param, v, sec) {
    const now = ctx.currentTime;
    param.cancelScheduledValues(now);
    param.setValueAtTime(param.value, now);
    param.linearRampToValueAtTime(v, now + sec);
  }

  const api = {
    // Konteks audio dibagi dengan efek suara game supaya hanya ada satu.
    context: ensure,
    get playing() { return playing; },
    play() {
      if (playing || !ensure()) return;
      playing = true;
      ctx.resume();
      step = 0;
      nextTime = ctx.currentTime + 0.1;
      fadeTo(bus.gain, VOLUME, 1.5);
      fadeTo(seaGain.gain, SONGS[mood].sea, 2);
      timer = setInterval(tick, 80);
      tick();
    },
    stop() {
      if (!playing) return;
      playing = false;
      clearInterval(timer);
      clearTimeout(swap);
      switching = false;
      fadeTo(bus.gain, 0, 0.4);
    },
    // Ganti suasana dengan memudarkan lagu lama lalu memulai lagu baru dari awal.
    mood(next) {
      if (!SONGS[next] || next === mood) return;
      mood = next;
      if (!playing) return;
      clearTimeout(swap);
      switching = true;
      fadeTo(bus.gain, 0, 0.35);
      fadeTo(seaGain.gain, SONGS[next].sea, 1.5);
      swap = setTimeout(() => {
        switching = false;
        if (!playing) return;
        step = 0;
        nextTime = ctx.currentTime + 0.05;
        fadeTo(bus.gain, VOLUME, 0.8);
      }, 400);
    }
  };

  window.SiagaMusic = api;
})();
