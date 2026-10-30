/* Nusa Siaga — pustaka ikon SVG kartun buatan sendiri (pengganti emoji).
   Semua ikon memakai kanvas 64×64, garis tepi tinta tebal, dan warna rata dari palet game. */
(() => {
  'use strict';

  const C = {
    ink: '#23263a', sea: '#2f8ee0', seaL: '#6cc4ff', sky: '#d6efff', sand: '#ffd98a',
    grass: '#7cd35a', grassD: '#4fa83a', sun: '#ffc93c', coral: '#ff6b6b', orange: '#ff8a3d',
    purple: '#c084fc', white: '#ffffff', grey: '#c9ccd8', greyD: '#8c8fa3', brown: '#b07a4f',
    brownD: '#7a5236', skin: '#ffd2a1', paper: '#fffaf0', hair: '#4a3224', red: '#e94b5a'
  };

  // Anggota tubuh/garis bertepi: garis tinta tebal lalu garis warna di atasnya.
  const limb = (d, color, w = 5) => `<path d="${d}" stroke="${C.ink}" stroke-width="${w + 4}"/><path d="${d}" stroke="${color}" stroke-width="${w}"/>`;
  const head = (cx, cy, r = 6.5) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.skin}"/>
    <path d="M${cx - r} ${cy - 1} C${cx - r + 0.5} ${cy - r - 1} ${cx + r - 0.5} ${cy - r - 1} ${cx + r} ${cy - 1} C${cx + 2} ${cy - 3.5} ${cx - 2} ${cy - 3.5} ${cx - r} ${cy - 1} Z" fill="${C.hair}"/>`;
  const seaBand = (y, fill = C.sea) => `<path d="M2 ${y} C8 ${y - 4} 13 ${y - 4} 18 ${y} S28 ${y + 4} 34 ${y} S44 ${y - 4} 50 ${y} S59 ${y + 3} 62 ${y} V62 H2 Z" fill="${fill}"/>`;

  const runnerBody = (shirt = C.orange, pants = C.sea) =>
    limb('M30 36 L22 44 L13 43', pants) +
    limb('M32 23 L23 27 L19 21', C.skin) +
    limb('M33 21 L29 37', shirt, 8) +
    limb('M30 36 L38 45 L35 56', pants) +
    limb('M32 23 L42 28 L48 23', C.skin) +
    head(37, 13);

  const ICONS = {
    /* ---------- Antarmuka (glyph mengikuti warna teks) ---------- */
    'arrow-right': { glyph: true, body: '<path d="M12 32 H50 M36 17 L51 32 L36 47"/>' },
    'arrow-left': { glyph: true, body: '<path d="M52 32 H14 M28 17 L13 32 L28 47"/>' },
    'arrow-up': { glyph: true, body: '<path d="M32 52 V14 M17 28 L32 13 L47 28"/>' },
    'arrow-down': { glyph: true, body: '<path d="M32 12 V50 M17 36 L32 51 L47 36"/>' },
    'play': { glyph: true, body: '<path d="M20 12 L52 32 L20 52 Z" fill="currentColor"/>' },
    'check': { glyph: true, body: '<path d="M12 34 L26 48 L52 18"/>' },
    'cross': { glyph: true, body: '<path d="M17 17 L47 47 M47 17 L17 47"/>' },
    'retry': { glyph: true, body: '<path d="M50 34 A18 18 0 1 1 44 18"/><path d="M46 6 L45 19 L32 19"/>' },

    /* ---------- Ikon berwarna ---------- */
    'wave': { body: `<path d="M5 50 C10 50 12 40 16 32 C22 20 32 13 42 15 C51 17 56 24 54 31 C53 36 47 37 45 33 C44 30 46 28 48 28 C46 23 40 22 35 26 C29 31 29 42 36 46 C40 49 48 50 59 50 V58 H5 Z" fill="${C.sea}"/>
      <path d="M21 31 C25 24 31 20 38 19" stroke="${C.white}" stroke-width="3.5"/>` },
    'star': { body: `<path d="M32 5 L39.8 22 L58.3 24.2 L44.6 36.8 L48.4 55 L32 45.8 L15.6 55 L19.4 36.8 L5.7 24.2 L24.2 22 Z" fill="${C.sun}"/>
      <path d="M22 27 L27 26" stroke="${C.white}" stroke-width="3"/>` },
    'star-empty': { body: `<path d="M32 5 L39.8 22 L58.3 24.2 L44.6 36.8 L48.4 55 L32 45.8 L15.6 55 L19.4 36.8 L5.7 24.2 L24.2 22 Z" fill="#ebecf2" stroke="#b9bccb"/>` },
    'heart': { body: `<path d="M32 55 C14 43 6 33 8 22 C10 12 23 8 32 19 C41 8 54 12 56 22 C58 33 50 43 32 55 Z" fill="${C.coral}"/>
      <path d="M16 21 C17 17 20 15 24 16" stroke="${C.white}" stroke-width="3.5"/>` },
    'heart-empty': { body: `<path d="M32 55 C14 43 6 33 8 22 C10 12 23 8 32 19 C41 8 54 12 56 22 C58 33 50 43 32 55 Z" fill="#ebecf2" stroke="#b9bccb"/>` },
    'sound-on': { body: `<path d="M8 25 H19 L32 14 V50 L19 39 H8 Z" fill="${C.white}"/><path d="M40 24 C44 28 44 36 40 40 M46 17 C53 24 53 40 46 47"/>` },
    'sound-off': { body: `<path d="M8 25 H19 L32 14 V50 L19 39 H8 Z" fill="${C.white}"/><path d="M41 25 L54 38 M54 25 L41 38" stroke="${C.coral}" stroke-width="4"/>` },
    'question': { body: `<circle cx="32" cy="32" r="25" fill="${C.sun}"/><path d="M24 25 C24 16 40 16 40 25 C40 32 32 31 32 38" stroke-width="5"/><circle cx="32" cy="47" r="3" fill="${C.ink}" stroke="none"/>` },
    'book': { body: `<path d="M32 16 C24 10 14 10 7 12 V51 C14 49 24 49 32 55 C40 49 50 49 57 51 V12 C50 10 40 10 32 16 Z" fill="${C.white}"/>
      <path d="M32 16 V55"/><path d="M13 22 C18 21 23 21 27 23 M13 30 C18 29 23 29 27 31 M37 23 C41 21 46 21 51 22 M37 31 C41 29 46 29 51 30" stroke="${C.seaL}"/>
      <path d="M7 12 V51" stroke="${C.coral}" stroke-width="4"/>` },
    'print': { body: `<rect x="18" y="8" width="28" height="16" rx="2" fill="${C.white}"/><rect x="7" y="22" width="50" height="24" rx="6" fill="${C.grey}"/>
      <circle cx="47" cy="30" r="2.5" fill="${C.grass}"/><rect x="18" y="38" width="28" height="18" rx="2" fill="${C.white}"/><path d="M23 45 H41 M23 50 H35" stroke="${C.greyD}"/>` },
    'trophy': { body: `<path d="M20 16 H11 C11 27 15 31 22 31 M44 16 H53 C53 27 49 31 42 31" stroke-width="4"/>
      <path d="M19 8 H45 V24 C45 34 39 41 32 41 C25 41 19 34 19 24 Z" fill="${C.sun}"/>
      <rect x="28" y="40" width="8" height="8" fill="${C.sun}"/><rect x="17" y="48" width="30" height="9" rx="3" fill="${C.orange}"/>
      <path d="M32 16 L34.4 21 L39.8 21.6 L35.8 25.2 L36.9 30.6 L32 27.9 L27.1 30.6 L28.2 25.2 L24.2 21.6 L29.6 21 Z" fill="${C.white}" stroke-width="2"/>` },
    'bulb': { body: `<path d="M32 7 C21 7 14 15 14 25 C14 32 18 36 22 40 C24 42 24 45 24 47 H40 C40 45 40 42 42 40 C46 36 50 32 50 25 C50 15 43 7 32 7 Z" fill="${C.sun}"/>
      <path d="M24 47 H40 V53 C40 56 37 58 32 58 C27 58 24 56 24 53 Z" fill="${C.grey}"/><path d="M24 23 C25 18 28 15 32 14" stroke="${C.white}" stroke-width="3.5"/>` },
    'lock': { body: `<path d="M21 29 V21 C21 9 43 9 43 21 V29" stroke-width="5"/><rect x="13" y="28" width="38" height="29" rx="7" fill="${C.sun}"/>
      <circle cx="32" cy="40" r="4" fill="${C.ink}" stroke="none"/><path d="M32 42 V49" stroke-width="4"/>` },
    'house': { body: `<rect x="14" y="29" width="36" height="27" fill="${C.paper}"/><path d="M6 32 L32 8 L58 32 Z" fill="${C.coral}"/>
      <rect x="27" y="40" width="10" height="16" fill="${C.orange}"/><rect x="18" y="36" width="7" height="7" fill="${C.sky}"/><rect x="40" y="36" width="7" height="7" fill="${C.sky}"/>` },
    'flag': { body: `<path d="M18 6 V58" stroke-width="5"/><path d="M19 8 H51 L43 18 L51 28 H19 Z" fill="${C.coral}"/><path d="M10 58 H28" stroke-width="4"/>` },
    'map': { body: `<path d="M7 14 L23 8 L41 14 L57 8 V50 L41 56 L23 50 L7 56 Z" fill="${C.paper}"/><path d="M23 8 V50 M41 14 V56" stroke="${C.greyD}"/>
      <path d="M13 44 C19 37 28 41 32 31 S45 22 50 17" stroke="${C.coral}" stroke-width="3.5" stroke-dasharray="4 5"/>
      <path d="M50 11 C46 11 44 14 44 17 C44 21 50 27 50 27 C50 27 56 21 56 17 C56 14 54 11 50 11 Z" fill="${C.grass}" stroke-width="2.5"/>` },
    'eye': { body: `<path d="M4 32 C12 18 22 12 32 12 C42 12 52 18 60 32 C52 46 42 52 32 52 C22 52 12 46 4 32 Z" fill="${C.white}"/>
      <circle cx="32" cy="32" r="11" fill="${C.sea}"/><circle cx="32" cy="32" r="5" fill="${C.ink}" stroke="none"/><circle cx="36" cy="28" r="2.5" fill="${C.white}" stroke="none"/>` },
    'eye-off': { body: `<path d="M6 30 C14 40 23 44 32 44 C41 44 50 40 58 30" fill="none"/><path d="M14 38 L10 44 M24 43 L22 50 M40 43 L42 50 M50 38 L54 44"/>
      <circle cx="32" cy="32" r="26" stroke="${C.coral}" stroke-width="4"/><path d="M14 14 L50 50" stroke="${C.coral}" stroke-width="4"/>` },
    'timer': { body: `<rect x="26" y="4" width="12" height="7" rx="2" fill="${C.coral}"/><path d="M32 11 V15"/><circle cx="32" cy="37" r="22" fill="${C.white}"/>
      <path d="M32 37 L32 15 A22 22 0 0 1 53 31 Z" fill="${C.sun}" stroke-width="2.5"/><path d="M32 37 V24 M32 37 L41 42" stroke-width="4"/><circle cx="32" cy="37" r="2.5" fill="${C.ink}"/>` },
    'runner': { body: runnerBody() },
    'walker': { body: limb('M30 38 L26 56', C.sea) + limb('M31 24 L25 35', C.skin) + limb('M32 22 L30 38', C.grass, 8) + limb('M30 38 L37 56', C.sea) + limb('M32 24 L38 35', C.skin) + head(33, 13) },
    'person-wait': { body: limb('M28 40 V56', C.sea) + limb('M36 40 V56', C.sea) + limb('M25 26 L21 38', C.skin) + limb('M39 26 L43 38', C.skin) +
      `<rect x="23" y="21" width="18" height="21" rx="7" fill="${C.purple}"/>` + head(32, 13, 7) },
    'duck-cover': { body: `<path d="M4 57 H60" stroke="${C.greyD}"/><path d="M11 27 V56 M53 27 V56" stroke-width="4"/><rect x="5" y="19" width="54" height="8" rx="3" fill="${C.brown}"/>
      <ellipse cx="32" cy="49" rx="13" ry="8" fill="${C.orange}"/>` + head(32, 39, 7) + limb('M22 41 C23 31 41 31 42 41', C.skin, 4) },
    'family': { body: `<path d="M7 58 V39 C7 32 11 29 17 29 C23 29 27 32 27 39 V58" fill="${C.coral}"/><path d="M37 58 V39 C37 32 41 29 47 29 C53 29 57 32 57 39 V58" fill="${C.sea}"/>
      <path d="M24 58 V47 C24 43 27 41 32 41 C37 41 40 43 40 47 V58" fill="${C.sun}"/>` + head(17, 19, 7) + head(47, 19, 7) + head(32, 33, 5.5) },
    'kid': { body: `<circle cx="32" cy="35" r="21" fill="${C.skin}"/><path d="M11 32 C11 17 21 11 32 11 C44 11 53 18 53 31 C47 24 39 22 31 25 C24 27 18 27 11 32 Z" fill="${C.hair}"/>
      <circle cx="25" cy="38" r="2.6" fill="${C.ink}" stroke="none"/><circle cx="39" cy="38" r="2.6" fill="${C.ink}" stroke="none"/>
      <ellipse cx="20" cy="44" rx="3.5" ry="2.2" fill="#ff9aa2" stroke="none"/><ellipse cx="44" cy="44" rx="3.5" ry="2.2" fill="#ff9aa2" stroke="none"/><path d="M27 46 Q32 51 37 46"/>` },
    'mountain': { body: `<path d="M3 56 L24 18 L34 32 L42 22 L61 56 Z" fill="${C.grass}"/><path d="M24 18 L30 28 L26 27 L21 30 Z" fill="${C.white}" stroke-width="2"/>
      <path d="M42 22 V6" stroke-width="3"/><path d="M43 7 H53 L50 11 L53 15 H43 Z" fill="${C.coral}" stroke-width="2.5"/>` },
    'phone': { body: `<rect x="17" y="5" width="30" height="54" rx="7" fill="#4b4f68"/><rect x="21" y="12" width="22" height="36" rx="3" fill="${C.sky}"/>
      <circle cx="32" cy="53" r="2.5" fill="${C.white}" stroke="none"/><path d="M26 22 H38 M26 29 H38 M26 36 H33" stroke="${C.seaL}"/>` },
    'phone-call': { body: `<rect x="9" y="9" width="28" height="48" rx="7" fill="#4b4f68"/><rect x="13" y="15" width="20" height="32" rx="3" fill="${C.sky}"/>
      <circle cx="23" cy="52" r="2.3" fill="${C.white}" stroke="none"/><path d="M44 22 C48 26 48 32 44 36 M50 16 C57 23 57 35 50 42" stroke="${C.grassD}" stroke-width="4"/>
      <path d="M17 31 L21 35 L29 26" stroke="${C.grassD}" stroke-width="3.5"/>` },
    'car': { body: `<path d="M5 42 V32 L14 29 L20 18 H42 L50 29 L59 32 V42 Z" fill="${C.sea}"/><path d="M22 22 H30 V29 H18 Z M34 22 H40 L45 29 H34 Z" fill="${C.sky}" stroke-width="2.5"/>
      <circle cx="18" cy="43" r="7" fill="${C.ink}"/><circle cx="18" cy="43" r="2.5" fill="${C.grey}" stroke="none"/><circle cx="46" cy="43" r="7" fill="${C.ink}"/><circle cx="46" cy="43" r="2.5" fill="${C.grey}" stroke="none"/>
      <path d="M4 56 H60" stroke="${C.greyD}"/>` },
    'megaphone': { body: `<path d="M18 37 L22 52 H29 L26 37" fill="${C.grey}"/><path d="M8 25 H19 L44 11 V53 L19 39 H8 Z" fill="${C.sun}"/><ellipse cx="44" cy="32" rx="4" ry="21" fill="${C.orange}"/>
      <path d="M53 22 L58 19 M54 32 H60 M53 42 L58 45" stroke="${C.coral}" stroke-width="3.5"/>` },
    'tv': { body: `<path d="M24 4 L32 13 L40 4" stroke-width="3"/><rect x="5" y="13" width="54" height="36" rx="6" fill="${C.grey}"/><rect x="11" y="19" width="42" height="24" rx="3" fill="${C.sky}"/>
      <path d="M17 26 L25 34 M21 23 L31 33" stroke="${C.white}" stroke-width="3"/><path d="M20 49 L16 58 M44 49 L48 58" stroke-width="4"/>` },
    'gamepad': { body: `<path d="M15 20 H49 C56 20 60 27 60 36 C60 47 53 51 48 46 L43 40 H21 L16 46 C11 51 4 47 4 36 C4 27 8 20 15 20 Z" fill="${C.purple}"/>
      <path d="M18 27 V37 M13 32 H23" stroke-width="4"/><circle cx="44" cy="29" r="3.2" fill="${C.coral}" stroke-width="2.5"/><circle cx="50" cy="35" r="3.2" fill="${C.sun}" stroke-width="2.5"/>` },
    'teddy': { body: `<circle cx="17" cy="14" r="7" fill="#c08a5b"/><circle cx="47" cy="14" r="7" fill="#c08a5b"/><ellipse cx="32" cy="50" rx="15" ry="11" fill="#c08a5b"/>
      <circle cx="32" cy="27" r="16" fill="#c08a5b"/><ellipse cx="32" cy="33" rx="7" ry="5" fill="${C.sand}"/><circle cx="32" cy="31" r="2" fill="${C.ink}" stroke="none"/>
      <circle cx="25" cy="24" r="2.3" fill="${C.ink}" stroke="none"/><circle cx="39" cy="24" r="2.3" fill="${C.ink}" stroke="none"/><path d="M29 36 Q32 38 35 36" stroke-width="2.5"/>` },
    'pan': { body: `<path d="M41 23 L56 9 L60 13 L45 27 Z" fill="${C.brownD}"/><circle cx="26" cy="36" r="20" fill="${C.greyD}"/><circle cx="26" cy="36" r="13" fill="#6b6f80" stroke-width="2.5"/>
      <path d="M17 32 C18 28 21 26 24 25" stroke="${C.grey}" stroke-width="3"/>` },
    'plant': { body: `<path d="M32 37 C32 26 26 18 15 16 C15 27 21 35 32 37 Z" fill="${C.grass}"/><path d="M32 33 C32 22 39 13 51 11 C51 23 44 31 32 33 Z" fill="${C.grassD}"/>
      <path d="M32 37 V30"/><path d="M17 36 H47 L43 58 H21 Z" fill="${C.orange}"/><path d="M17 36 H47 V41 H17 Z" fill="${C.coral}"/>` },
    'doc': { body: `<path d="M15 6 H39 L50 17 V58 H15 Z" fill="${C.white}"/><path d="M39 6 V17 H50" fill="${C.grey}"/>
      <path d="M21 27 H44 M21 35 H44 M21 43 H35" stroke="${C.greyD}"/><circle cx="41" cy="48" r="6" fill="${C.coral}" stroke-width="2.5"/>` },
    'flashlight': { body: `<path d="M22 14 L10 2 H54 L42 14 Z" fill="#fff3b0" stroke="none"/><path d="M19 12 H45 L41 24 H23 Z" fill="${C.sun}"/>
      <rect x="24" y="24" width="16" height="34" rx="4" fill="${C.greyD}"/><rect x="29" y="32" width="6" height="9" rx="2" fill="${C.coral}" stroke-width="2.5"/>` },
    'firstaid': { body: `<path d="M24 18 V11 H40 V18" stroke-width="4"/><rect x="7" y="18" width="50" height="38" rx="7" fill="${C.white}"/>
      <path d="M28 26 H36 V33 H43 V41 H36 V48 H28 V41 H21 V33 H28 Z" fill="${C.coral}" stroke-width="2.5"/>` },
    'water': { body: `<rect x="25" y="5" width="14" height="8" rx="2" fill="${C.sea}"/><path d="M23 13 H41 L45 22 V54 C45 57 43 59 40 59 H24 C21 59 19 57 19 54 V22 Z" fill="#cdeeff"/>
      <rect x="19" y="30" width="26" height="13" fill="${C.sea}" stroke-width="2.5"/><path d="M25 50 V53" stroke="${C.white}" stroke-width="3"/>` },
    'food': { body: `<rect x="8" y="15" width="28" height="40" rx="3" fill="${C.coral}"/><ellipse cx="22" cy="15" rx="14" ry="4.5" fill="${C.grey}"/>
      <rect x="8" y="27" width="28" height="14" fill="${C.white}" stroke-width="2.5"/><rect x="34" y="33" width="24" height="24" rx="5" fill="${C.sand}"/>
      <circle cx="41" cy="40" r="1.6" fill="${C.brownD}" stroke="none"/><circle cx="51" cy="40" r="1.6" fill="${C.brownD}" stroke="none"/><circle cx="46" cy="46" r="1.6" fill="${C.brownD}" stroke="none"/><circle cx="41" cy="51" r="1.6" fill="${C.brownD}" stroke="none"/><circle cx="51" cy="51" r="1.6" fill="${C.brownD}" stroke="none"/>` },
    'radio': { body: `<path d="M17 21 L11 5" stroke-width="3.5"/><circle cx="11" cy="5" r="2.5" fill="${C.ink}"/><rect x="6" y="21" width="52" height="34" rx="7" fill="${C.orange}"/>
      <circle cx="22" cy="38" r="10" fill="${C.white}"/><circle cx="22" cy="38" r="3" fill="${C.ink}" stroke="none"/><rect x="36" y="29" width="15" height="8" rx="2" fill="${C.sky}" stroke-width="2.5"/>
      <circle cx="40" cy="46" r="3" fill="${C.ink}" stroke="none"/><circle cx="48" cy="46" r="3" fill="${C.ink}" stroke="none"/>` },
    'shirt': { body: `<path d="M22 8 L10 14 L4 26 L14 30 L16 26 V56 H48 V26 L50 30 L60 26 L54 14 L42 8 C40 13 36 15 32 15 C28 15 24 13 22 8 Z" fill="${C.seaL}"/>
      <path d="M22 8 C24 13 28 15 32 15 C36 15 40 13 42 8" stroke-width="3"/><rect x="38" y="30" width="7" height="7" rx="1.5" fill="${C.sea}" stroke-width="2.5"/>` },
    'bag': { body: `<path d="M26 10 C26 4 38 4 38 10" stroke-width="4"/><path d="M14 22 C14 14 20 10 32 10 C44 10 50 14 50 22 V54 C50 57 48 58 46 58 H18 C16 58 14 57 14 54 Z" fill="${C.coral}"/>
      <path d="M14 26 C24 31 40 31 50 26" stroke-width="3"/><rect x="20" y="37" width="24" height="15" rx="4" fill="${C.orange}"/><rect x="29" y="31" width="6" height="7" rx="1.5" fill="${C.sun}" stroke-width="2.5"/>` },
    'lifebuoy': { body: `<circle cx="32" cy="32" r="17.5" stroke="${C.white}" stroke-width="13"/><circle cx="32" cy="32" r="17.5" stroke="${C.coral}" stroke-width="13" stroke-dasharray="13.74 13.74" stroke-linecap="butt"/>
      <circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="11"/>` },
    'camera': { body: `<rect x="20" y="11" width="14" height="9" rx="2" fill="${C.grey}"/><rect x="6" y="18" width="52" height="36" rx="7" fill="${C.greyD}"/>
      <circle cx="32" cy="36" r="12" fill="${C.sky}"/><circle cx="32" cy="36" r="5.5" fill="${C.sea}"/><rect x="46" y="23" width="7" height="5" rx="1" fill="${C.sun}" stroke-width="2.5"/>` },
    'chat': { body: `<path d="M8 14 C8 10 11 8 15 8 H49 C53 8 56 10 56 14 V38 C56 42 53 44 49 44 H26 L14 55 V44 C10 44 8 42 8 38 Z" fill="${C.white}"/>
      <circle cx="21" cy="26" r="3" fill="${C.ink}" stroke="none"/><circle cx="32" cy="26" r="3" fill="${C.ink}" stroke="none"/><circle cx="43" cy="26" r="3" fill="${C.ink}" stroke="none"/>` },
    'send': { body: `<path d="M6 30 L58 8 L44 56 L30 38 Z" fill="${C.white}"/><path d="M30 38 L58 8"/><path d="M30 38 L29 50 L37 44 Z" fill="${C.grey}" stroke-width="2.5"/>` },
    'bandage': { body: `<g transform="rotate(-35 32 32)"><rect x="5" y="21" width="54" height="22" rx="11" fill="${C.sand}"/><rect x="23" y="21" width="18" height="22" fill="#ffe7c2"/>
      <circle cx="28" cy="28" r="1.6" fill="${C.brown}" stroke="none"/><circle cx="36" cy="28" r="1.6" fill="${C.brown}" stroke="none"/><circle cx="28" cy="36" r="1.6" fill="${C.brown}" stroke="none"/><circle cx="36" cy="36" r="1.6" fill="${C.brown}" stroke="none"/></g>` },
    'broom': { body: `<path d="M46 5 L30 35" stroke-width="9"/><path d="M46 5 L30 35" stroke="${C.brown}" stroke-width="5"/>
      <path d="M24 33 L38 39 L33 58 C24 58 15 54 12 47 Z" fill="${C.sun}"/><path d="M24 33 L38 39" stroke-width="5"/><path d="M20 45 L18 52 M27 48 L25 56" stroke="${C.orange}"/>` },
    'swim': { body: `${seaBand(42)}<circle cx="22" cy="34" r="7" fill="${C.skin}"/><path d="M15 33 C16 27 28 27 29 33 Z" fill="${C.sun}"/>` + limb('M30 38 C36 26 46 25 52 33', C.skin) + seaBand(48, C.seaL) },

    /* ---------- Tanda alam & suasana ---------- */
    'quake': { body: `<path d="M5 58 H22 L26 53 L30 60 L34 53 L38 58 H59" stroke-width="3.5"/>
      <g transform="rotate(-8 32 40)"><rect x="16" y="28" width="32" height="24" fill="${C.paper}"/><path d="M10 31 L32 11 L54 31 Z" fill="${C.coral}"/><rect x="28" y="39" width="9" height="13" fill="${C.orange}"/><rect x="19" y="34" width="6" height="6" fill="${C.sky}" stroke-width="2.5"/></g>
      <path d="M4 20 L10 26 M3 33 L9 37 M55 25 L61 19 M55 39 L61 35" stroke="${C.coral}" stroke-width="3.5"/>` },
    'recede': { body: `<path d="M2 46 C14 40 26 40 38 44 H62 V62 H2 Z" fill="${C.sand}"/><path d="M42 40 C48 37 55 37 62 37 V44 H42 Z" fill="${C.sea}"/>
      <path d="M12 28 H46 M38 20 L47 28 L38 36" stroke="${C.coral}" stroke-width="4"/>
      <path d="M14 50 C17 46 22 46 25 50 C22 54 17 54 14 50 Z M25 50 L29 47 V53 Z" fill="${C.orange}" stroke-width="2.5"/><path d="M33 53 C34 51 36 51 37 53" stroke-width="2.5"/>` },
    'rumble': { body: `${seaBand(46)}<path d="M26 37 C29 33 35 33 38 37 M20 30 C26 22 38 22 44 30 M14 23 C22 12 42 12 50 23" stroke="${C.coral}" stroke-width="4"/>` },
    'rain': { body: `<circle cx="44" cy="17" r="9" fill="${C.sun}"/><path d="M18 38 H46 C53 38 56 33 56 28 C56 22 51 18 45 19 C43 12 37 8 30 9 C23 10 19 15 19 21 C13 21 9 25 9 30 C9 35 13 38 18 38 Z" fill="${C.white}"/>
      <path d="M21 46 L18 54 M33 46 L30 54 M45 46 L42 54" stroke="${C.sea}" stroke-width="4"/>` },
    'gull': { body: `<path d="M5 30 C13 21 24 21 32 31 C40 21 51 21 59 30 C51 28 42 30 34 38 H30 C22 30 13 28 5 30 Z" fill="${C.white}"/><path d="M30 37 H35 L38 41 Z" fill="${C.orange}" stroke-width="2.5"/>
      <path d="M44 46 C47 44 50 44 53 46 M12 48 C15 46 18 46 21 48" stroke="${C.seaL}"/>` },
    'rainbow': { body: `<path d="M8 50 A24 24 0 0 1 56 50" stroke="${C.coral}" stroke-width="6" stroke-linecap="butt"/><path d="M14 50 A18 18 0 0 1 50 50" stroke="${C.sun}" stroke-width="6" stroke-linecap="butt"/>
      <path d="M20 50 A12 12 0 0 1 44 50" stroke="${C.seaL}" stroke-width="6" stroke-linecap="butt"/><path d="M5 50 A27 27 0 0 1 59 50 M23 50 A9 9 0 0 1 41 50" stroke-width="2.5"/>
      <ellipse cx="10" cy="51" rx="8" ry="5" fill="${C.white}"/><ellipse cx="54" cy="51" rx="8" ry="5" fill="${C.white}"/>` },
    'sun': { body: `<path d="M32 4 V12 M32 52 V60 M4 32 H12 M52 32 H60 M12 12 L18 18 M46 46 L52 52 M52 12 L46 18 M18 46 L12 52" stroke="${C.orange}" stroke-width="4"/><circle cx="32" cy="32" r="14" fill="${C.sun}"/>
      <path d="M25 28 C26 25 28 23 31 22" stroke="${C.white}" stroke-width="3"/>` },
    'boat': { body: `<path d="M32 8 V44" stroke-width="3"/><path d="M35 10 L53 40 H35 Z" fill="${C.white}"/><path d="M29 17 L13 40 H29 Z" fill="${C.sun}"/>
      <path d="M8 44 H56 L49 54 H15 Z" fill="${C.coral}"/><path d="M3 59 C9 56 14 56 20 59 S31 62 37 59 S48 56 54 59 S61 61 62 59" stroke="${C.sea}"/>` },

    /* ---------- Peta & level lari ---------- */
    'umbrella': { body: `<path d="M32 30 V58" stroke-width="3.5"/><path d="M7 30 C9 16 19 8 32 8 C45 8 55 16 57 30 Z" fill="${C.coral}"/>
      <path d="M32 8 C27 14 25 22 25 30 H39 C39 22 37 14 32 8 Z" fill="${C.white}" stroke-width="2.5"/><path d="M20 58 H44" stroke-width="3"/>` },
    'palm': { body: limb('M30 59 C30 47 32 35 36 25', C.brown, 6) +
      `<path d="M36 25 C28 14 16 14 7 20 C18 18 28 20 36 25 Z M36 25 C44 12 54 12 60 19 C50 16 42 20 36 25 Z M36 25 C29 23 19 29 15 38 C23 31 30 28 36 25 Z M36 25 C44 25 52 31 54 40 C48 33 42 29 36 25 Z" fill="${C.grass}"/>
      <circle cx="33" cy="28" r="3.5" fill="${C.brownD}"/><circle cx="39" cy="28" r="3.5" fill="${C.brownD}"/>` },
    'bricks': { body: `<rect x="6" y="44" width="24" height="12" rx="2" fill="#e08a5f"/><rect x="34" y="44" width="24" height="12" rx="2" fill="#e08a5f"/>
      <rect x="18" y="31" width="24" height="12" rx="2" fill="#f0a57a"/><rect x="25" y="18" width="24" height="12" rx="2" fill="#e08a5f" transform="rotate(14 37 24)"/>
      <path d="M10 22 L14 26 M52 12 L56 16" stroke="${C.greyD}" stroke-width="3"/>` },
    'rock': { body: `<path d="M7 54 L13 31 L28 18 L45 22 L57 36 L59 54 Z" fill="${C.grey}"/><path d="M28 18 L31 34 L13 31 M31 34 L45 22 M31 34 L42 54" stroke="${C.greyD}" stroke-width="2.5"/>
      <path d="M4 56 H62" stroke-width="3"/>` },
    'log': { body: `<path d="M38 32 L44 22" stroke-width="5"/><rect x="5" y="31" width="48" height="20" rx="10" fill="${C.brown}"/><ellipse cx="51" cy="41" rx="7" ry="10" fill="${C.sand}"/>
      <ellipse cx="51" cy="41" rx="3" ry="5" stroke="${C.brown}" stroke-width="2.5"/><path d="M14 38 H32 M18 44 H40" stroke="${C.brownD}" stroke-width="2.5"/>` },
    'barrier': { body: `<path d="M14 34 V58 M50 34 V58" stroke-width="4"/><rect x="5" y="22" width="54" height="14" rx="3" fill="${C.white}"/>
      <path d="M14 23 H22 L16 35 H8 Z M30 23 H38 L32 35 H24 Z M46 23 H54 L48 35 H40 Z" fill="${C.coral}" stroke="none"/><rect x="5" y="22" width="54" height="14" rx="3"/>
      <circle cx="14" cy="15" r="4.5" fill="${C.sun}"/><circle cx="50" cy="15" r="4.5" fill="${C.sun}"/><path d="M14 19.5 V22 M50 19.5 V22" stroke-width="3"/>` },

    /* ---------- Materi cerita pembuka ---------- */
    'tectonic': { body: `<path d="M4 8 C20 8 34 2 60 9 V30 H4 Z" fill="${C.seaL}"/><path d="M4 36 H30 V58 H4 Z" fill="${C.brown}"/><path d="M34 28 H60 V58 H34 Z" fill="#c9965f"/>
      <path d="M8 46 H26 M38 40 H56" stroke="${C.brownD}" stroke-width="2.5"/><path d="M47 24 V12 M41 17 L47 11 L53 17" stroke="${C.coral}" stroke-width="4"/>` },
    'volcano': { body: `<circle cx="27" cy="12" r="6" fill="${C.grey}"/><circle cx="38" cy="8" r="5" fill="${C.grey}"/><circle cx="34" cy="16" r="4" fill="${C.grey}"/>
      <path d="M5 58 L23 23 H41 L59 58 Z" fill="#8a6a5a"/><path d="M23 23 C25 30 29 28 31 35 C33 28 37 30 41 23 Z" fill="${C.orange}"/><path d="M5 58 H59"/>` },
    'landslide': { body: `<path d="M2 6 H62 V58 H2 Z" fill="${C.sky}" stroke="none"/><path d="M4 58 V16 H22 L52 58 Z" fill="${C.sand}"/>
      <circle cx="36" cy="38" r="4" fill="${C.brown}"/><circle cx="44" cy="47" r="3.5" fill="${C.brown}"/><circle cx="30" cy="29" r="3" fill="${C.brown}"/>
      <path d="M46 26 L56 38 M56 30 V38 H48" stroke="${C.coral}" stroke-width="4"/><path d="M2 58 H62"/>` },
    'meteor': { body: `<path d="M33 11 C22 22 12 36 5 58 C26 50 41 42 53 31 Z" fill="${C.sun}"/><path d="M33 22 C24 32 17 42 12 51 C22 46 31 40 41 32 Z" fill="${C.white}" stroke="none"/>
      <circle cx="42" cy="22" r="13" fill="${C.orange}"/><circle cx="38" cy="19" r="3" fill="${C.coral}" stroke-width="2.5"/><circle cx="47" cy="27" r="2.5" fill="${C.coral}" stroke-width="2.5"/>` },
    'heart-broken': { body: `<path d="M32 55 C14 43 6 33 8 22 C10 12 23 8 32 19 C41 8 54 12 56 22 C58 33 50 43 32 55 Z" fill="${C.coral}"/>
      <path d="M32 19 L27 30 L36 36 L29 47" stroke="${C.paper}" stroke-width="4"/>` },
    'crop': { body: `<path d="M4 56 H60" stroke="${C.brown}" stroke-width="5"/><path d="M20 56 V24 M32 56 V18 M44 56 V26" stroke="${C.grassD}" stroke-width="3"/>
      <ellipse cx="20" cy="20" rx="4" ry="8" fill="${C.sun}"/><ellipse cx="32" cy="14" rx="4" ry="8" fill="${C.sun}"/><ellipse cx="44" cy="22" rx="4" ry="8" fill="#d9c37a"/>
      <path d="M50 38 C52 34 56 34 58 38 C56 42 52 42 50 38" fill="${C.white}" stroke-width="2.5"/>` },
    'fish': { body: `<path d="M46 32 L59 21 V43 Z" fill="${C.orange}"/><path d="M8 32 C16 19 33 17 46 32 C33 47 16 45 8 32 Z" fill="${C.orange}"/>
      <path d="M26 21 C24 27 24 37 26 43" stroke="${C.white}" stroke-width="4"/><circle cx="17" cy="29" r="2.6" fill="${C.ink}" stroke="none"/>
      <circle cx="40" cy="52" r="4" fill="#7a7f62"/><circle cx="50" cy="50" r="2.5" fill="#7a7f62"/>` },
    'radiation': { body: `<circle cx="32" cy="32" r="27" fill="${C.sun}"/>
      <path d="M28.5 25.9 L22 14.7 A20 20 0 0 1 42 14.7 L35.5 25.9 A7 7 0 0 0 28.5 25.9 Z M39 32 L52 32 A20 20 0 0 1 42 49.3 L35.5 38.1 A7 7 0 0 0 39 32 Z M28.5 38.1 L22 49.3 A20 20 0 0 1 12 32 L25 32 A7 7 0 0 0 28.5 38.1 Z" fill="${C.ink}" stroke="none"/>
      <circle cx="32" cy="32" r="4" fill="${C.ink}" stroke="none"/>` },
    'sprout': { body: `<path d="M7 56 C15 46 49 46 57 56 Z" fill="${C.brown}"/><path d="M32 50 V30" stroke-width="3.5"/>
      <path d="M32 35 C22 35 15 29 15 20 C25 20 32 26 32 35 Z" fill="${C.grass}"/><path d="M32 31 C32 21 40 14 51 14 C51 24 43 31 32 31 Z" fill="${C.grassD}"/>` },
    'no-entry': { body: `<circle cx="32" cy="32" r="26" fill="${C.coral}"/><rect x="13" y="27" width="38" height="10" rx="3" fill="${C.white}"/>` },
    'verified': { body: `<path d="M32 4 L39 10 L48 9 L50 18 L58 23 L54 32 L58 41 L50 46 L48 55 L39 54 L32 60 L25 54 L16 55 L14 46 L6 41 L10 32 L6 23 L14 18 L16 9 L25 10 Z" fill="${C.grass}"/>
      <path d="M21 33 L29 41 L44 24" stroke="${C.white}" stroke-width="5"/>` },
    'crane': { body: `<path d="M8 58 H34"/><path d="M14 58 V10 M22 58 V10 M14 18 L22 26 M22 26 L14 34 M14 34 L22 42 M22 42 L14 50" stroke-width="3"/>
      <path d="M8 10 H58" stroke-width="5"/><path d="M8 10 H58" stroke="${C.sun}" stroke-width="2"/><path d="M48 10 V28" stroke-width="2.5"/>
      <rect x="39" y="28" width="18" height="13" rx="2" fill="${C.sun}"/><rect x="38" y="44" width="20" height="14" rx="2" fill="${C.seaL}"/>` },
    'seawall': { body: `${seaBand(40)}<rect x="6" y="20" width="18" height="11" rx="2" fill="${C.grey}"/><rect x="26" y="20" width="18" height="11" rx="2" fill="${C.grey}"/><rect x="46" y="20" width="12" height="11" rx="2" fill="${C.grey}"/>
      <rect x="6" y="31" width="10" height="11" rx="2" fill="${C.greyD}"/><rect x="18" y="31" width="18" height="11" rx="2" fill="${C.greyD}"/><rect x="38" y="31" width="20" height="11" rx="2" fill="${C.greyD}"/>` },
    'building': { body: `<rect x="15" y="8" width="34" height="50" rx="2" fill="${C.seaL}"/>
      <path d="M21 16 H27 M37 16 H43 M21 25 H27 M37 25 H43 M21 34 H27 M37 34 H43" stroke="${C.white}" stroke-width="4"/><rect x="27" y="44" width="10" height="14" fill="${C.sun}"/>
      <path d="M8 58 H56"/><path d="M9 22 L14 26 M55 22 L50 26" stroke="${C.coral}" stroke-width="3"/>` },
    'tower': { body: `<path d="M20 58 L25 24 M44 58 L39 24 M22 46 L42 34 M42 46 L22 34" stroke-width="3.5"/><rect x="15" y="18" width="34" height="7" rx="2" fill="${C.white}"/>
      <path d="M12 18 L32 5 L52 18 Z" fill="${C.grass}"/><path d="M14 58 H50"/>` },
    'mangrove': { body: `<path d="M32 40 C32 48 26 54 18 58 M32 40 C32 48 38 54 46 58 M32 40 V58" stroke="${C.brownD}" stroke-width="3.5"/>
      <circle cx="21" cy="26" r="12" fill="${C.grassD}"/><circle cx="43" cy="26" r="12" fill="${C.grassD}"/><circle cx="32" cy="18" r="13" fill="${C.grass}"/>
      <path d="M4 52 C10 49 14 49 20 52 S32 55 38 52 S50 49 60 52" stroke="${C.sea}"/>` },
    'breakwater': { body: `${seaBand(38)}<path d="M5 44 L11 30 L22 28 L27 44 Z" fill="${C.grey}"/><path d="M25 44 L30 26 L42 24 L47 44 Z" fill="${C.greyD}"/><path d="M45 44 L49 31 L58 30 L61 44 Z" fill="${C.grey}"/>
      <path d="M8 18 C14 14 20 14 26 18" stroke="${C.white}" stroke-width="3"/>` },
    'siren': { body: `<path d="M32 58 V30" stroke-width="5"/><path d="M24 58 H40" stroke-width="4"/><rect x="21" y="16" width="22" height="14" rx="4" fill="${C.sun}"/>
      <path d="M26 16 C26 9 38 9 38 16 Z" fill="${C.coral}"/><path d="M14 14 C10 18 10 26 14 30 M50 14 C54 18 54 26 50 30 M8 9 C2 16 2 28 8 35 M56 9 C62 16 62 28 56 35" stroke="${C.coral}" stroke-width="3.5"/>` },
    'zoning': { body: `<rect x="7" y="7" width="50" height="50" rx="5" fill="${C.white}"/><path d="M7 40 H57 V52 C57 55 55 57 52 57 H12 C9 57 7 55 7 52 Z" fill="#ffc2c2" stroke="none"/>
      <path d="M7 27 H57 V40 H7 Z" fill="#fff0b3" stroke="none"/><rect x="7" y="7" width="50" height="50" rx="5"/><path d="M7 27 H57 M7 40 H57" stroke-dasharray="4 4"/>
      <path d="M14 21 L20 15 L26 21 V24 H14 Z M38 21 L44 15 L50 21 V24 H38 Z" fill="${C.grass}" stroke-width="2.5"/>` },

    /* ---------- Pulau struktural & non-struktural ---------- */
    'buoy': { body: `<path d="M32 22 V9" stroke-width="3"/><circle cx="32" cy="8" r="3.5" fill="${C.coral}"/>
      <path d="M39 6 C42 8 42 12 39 14 M44 2 C49 6 49 14 44 18" stroke="${C.coral}" stroke-width="3"/>
      <path d="M23 46 L27 22 H37 L41 46 Z" fill="${C.sun}"/><path d="M25 34 H39" stroke-width="3"/>${seaBand(46)}` },
    'monitor': { body: `<path d="M27 46 L25 55 H39 L37 46" fill="${C.grey}"/><path d="M20 56 H44" stroke-width="3.5"/>
      <rect x="5" y="8" width="54" height="38" rx="5" fill="#4b4f68"/><rect x="10" y="13" width="44" height="28" rx="2" fill="${C.sky}"/>
      <path d="M13 32 H20 L24 20 L30 37 L34 25 L38 31 H51" stroke="${C.coral}" stroke-width="3"/>` },
    'school': { body: `<path d="M32 12 V3" stroke-width="2.5"/><path d="M33 3 H41 L39 6 L41 9 H33 Z" fill="${C.coral}" stroke-width="2"/>
      <rect x="8" y="27" width="48" height="29" fill="#ffe7a8"/><path d="M4 29 L32 12 L60 29 Z" fill="${C.coral}"/>
      <rect x="27" y="40" width="10" height="16" fill="${C.brown}"/><rect x="13" y="34" width="9" height="8" fill="${C.sky}" stroke-width="2.5"/><rect x="42" y="34" width="9" height="8" fill="${C.sky}" stroke-width="2.5"/>
      <circle cx="32" cy="23" r="3.5" fill="${C.white}" stroke-width="2.5"/>` },
    'hospital': { body: `<rect x="9" y="14" width="46" height="42" rx="3" fill="${C.white}"/><path d="M28 19 H36 V25 H42 V33 H36 V39 H28 V33 H22 V25 H28 Z" fill="${C.coral}" stroke-width="2.5"/>
      <rect x="14" y="43" width="8" height="7" fill="${C.sky}" stroke-width="2.5"/><rect x="42" y="43" width="8" height="7" fill="${C.sky}" stroke-width="2.5"/>
      <rect x="27" y="44" width="10" height="12" fill="${C.seaL}" stroke-width="2.5"/><path d="M4 56 H60"/>` },
    'pier': { body: `${seaBand(48)}<path d="M10 40 V56 M24 40 V56 M38 40 V56" stroke-width="3.5"/><rect x="4" y="33" width="40" height="7" rx="1.5" fill="${C.brown}"/>
      <path d="M40 38 H61 L56 47 H45 Z" fill="${C.coral}"/><path d="M50 38 V24" stroke-width="2.5"/><path d="M51 25 L59 35 H51 Z" fill="${C.white}" stroke-width="2.5"/>` },
    'park': { body: `<rect x="17" y="34" width="6" height="22" fill="${C.brown}"/><circle cx="20" cy="24" r="14" fill="${C.grass}"/><circle cx="14" cy="20" r="3" fill="${C.grassD}" stroke="none"/>
      <path d="M34 42 H60 M36 49 H58" stroke="${C.brown}" stroke-width="4"/><path d="M38 49 V57 M56 49 V57" stroke-width="3"/><path d="M4 57 H62" stroke="${C.grassD}"/>` },

    /* ---------- Pulau Ilmu: proses terjadinya tsunami ---------- */
    'plates': { body: `<rect x="4" y="6" width="56" height="20" rx="3" fill="${C.seaL}"/>
      <rect x="4" y="30" width="27" height="26" rx="2" fill="${C.brown}"/><rect x="33" y="30" width="27" height="26" rx="2" fill="#c9965f"/>
      <path d="M8 43 H22 M17 38 L22 43 L17 48 M56 43 H42 M47 38 L42 43 L47 48" stroke="${C.white}" stroke-width="3.5"/>
      <path d="M32 28 L27 20 M32 28 L37 20 M32 28 V18" stroke="${C.sun}" stroke-width="3"/>` },
    'uplift': { body: `<path d="M4 34 C16 34 22 15 32 15 C42 15 48 34 60 34 V46 H4 Z" fill="${C.sea}"/><path d="M22 22 C25 18 29 17 33 17" stroke="${C.white}" stroke-width="3"/>
      <rect x="4" y="46" width="28" height="12" rx="2" fill="${C.brown}"/><rect x="32" y="40" width="28" height="18" rx="2" fill="#c9965f"/>
      <path d="M46 55 V45 M42 49 L46 45 L50 49" stroke="${C.white}" stroke-width="3"/>` },
    'ripple': { body: `<rect x="3" y="14" width="58" height="40" rx="9" fill="${C.seaL}"/>
      <ellipse cx="32" cy="34" rx="26" ry="15" stroke="${C.white}" stroke-width="3"/><ellipse cx="32" cy="34" rx="17" ry="10" stroke="${C.white}" stroke-width="3"/><ellipse cx="32" cy="34" rx="8" ry="5" stroke="${C.white}" stroke-width="3"/>
      <rect x="3" y="14" width="58" height="40" rx="9"/><circle cx="32" cy="34" r="3.5" fill="${C.coral}" stroke-width="2"/>` },
    'shoal': { body: `<path d="M2 58 H62 V30 C46 38 26 50 2 54 Z" fill="${C.sand}"/>
      <path d="M2 42 C8 40 12 40 16 42 C21 44 25 37 31 32 C37 22 46 16 54 20 C60 23 58 30 54 30 C52 27 48 27 47 30 C46 34 46 39 48 41 C34 46 18 50 2 52 Z" fill="${C.sea}"/>
      <path d="M36 27 C39 22 43 20 47 20" stroke="${C.white}" stroke-width="3"/>` },
    'magnifier': { body: `<path d="M40 40 L56 56" stroke-width="11"/><path d="M40 40 L56 56" stroke="${C.brown}" stroke-width="6"/>
      <circle cx="27" cy="27" r="19" fill="${C.sky}"/><circle cx="27" cy="27" r="12" stroke="${C.seaL}" stroke-width="3"/><path d="M18 22 C19 18 22 16 26 15" stroke="${C.white}" stroke-width="3.5"/>` },

    /* ---------- Bangunan & benda untuk misi tambahan ---------- */
    'rebar': { body: `<path d="M10 58 H54" stroke-width="3.5"/><rect x="21" y="6" width="22" height="52" rx="2" fill="${C.grey}"/>
      <path d="M27 9 V55 M37 9 V55" stroke="${C.coral}" stroke-width="3"/><path d="M23 18 H41 M23 30 H41 M23 42 H41" stroke="${C.greyD}" stroke-width="2.5"/>` },
    'foundation': { body: `<rect x="16" y="22" width="32" height="20" fill="${C.paper}"/><path d="M10 24 L32 8 L54 24 Z" fill="${C.sea}"/><rect x="28" y="30" width="8" height="12" fill="${C.orange}" stroke-width="2.5"/>
      <rect x="10" y="42" width="44" height="9" rx="1.5" fill="${C.greyD}"/><path d="M4 56 H60" stroke="${C.brown}"/><rect x="14" y="51" width="8" height="8" fill="${C.grey}" stroke-width="2.5"/><rect x="42" y="51" width="8" height="8" fill="${C.grey}" stroke-width="2.5"/>` },
    'roof-light': { body: `<rect x="14" y="31" width="36" height="25" fill="${C.paper}"/><path d="M8 33 L32 12 L56 33 Z" fill="${C.seaL}"/>
      <path d="M20 26 L22 33 M32 16 V33 M44 26 L42 33" stroke="${C.white}" stroke-width="2.5"/><rect x="27" y="41" width="10" height="15" fill="${C.orange}" stroke-width="2.5"/>
      <path d="M50 8 C54 8 56 11 56 14" stroke="${C.grassD}" stroke-width="3"/><path d="M55 8 L50 6" stroke="${C.grassD}" stroke-width="3"/>` },
    'crack': { body: `<rect x="8" y="10" width="48" height="44" rx="2" fill="#f0a57a"/>
      <path d="M8 21 H56 M8 32 H56 M8 43 H56 M20 10 V21 M44 10 V21 M14 21 V32 M38 21 V32 M20 32 V43 M48 32 V43 M30 43 V54" stroke="#c97a52" stroke-width="2.5"/>
      <path d="M33 10 L27 22 L36 30 L28 42 L34 54" stroke-width="4"/>` },
    'stairs': { body: `<path d="M8 56 V46 H20 V36 H32 V26 H44 V16 H56 V56 Z" fill="${C.sand}"/><path d="M8 38 L52 6" stroke-width="3"/><path d="M14 34 V44 M26 25 V34 M38 16 V24" stroke-width="2.5"/>` },
    'trash': { body: `<path d="M27 12 V7 H37 V12" stroke-width="3"/><rect x="13" y="12" width="38" height="7" rx="2" fill="${C.greyD}"/>
      <path d="M17 19 H47 L44 57 H20 Z" fill="${C.grey}"/><path d="M26 27 V49 M32 27 V49 M38 27 V49" stroke="${C.greyD}" stroke-width="2.5"/>` },
    'bottle': { body: `<path d="M27 11 C27 3 37 3 37 11 Z" fill="${C.sun}"/><rect x="23" y="11" width="18" height="7" rx="2" fill="${C.seaL}"/>
      <rect x="21" y="18" width="22" height="40" rx="7" fill="${C.white}"/><path d="M21.5 34 H42.5 V51 C42.5 55 40 57 36 57 H28 C24 57 21.5 55 21.5 51 Z" fill="#fff1d6" stroke="none"/>
      <rect x="21" y="18" width="22" height="40" rx="7"/><path d="M36 26 H41 M36 33 H41 M36 40 H41" stroke="${C.seaL}" stroke-width="2.5"/>` },
    'glasses': { body: `<path d="M9 31 L4 24 M55 31 L60 24" stroke-width="3"/><circle cx="20" cy="35" r="11" fill="${C.sky}"/><circle cx="44" cy="35" r="11" fill="${C.sky}"/>
      <path d="M31 33 C31 30 33 30 33 33" stroke-width="3"/><path d="M14 31 C15 28 17 27 20 27 M38 31 C39 28 41 27 44 27" stroke="${C.white}" stroke-width="2.5"/>` },
    'cash': { body: `<rect x="14" y="14" width="44" height="26" rx="3" fill="#a6e38a"/><rect x="6" y="22" width="44" height="26" rx="3" fill="${C.grass}"/>
      <circle cx="28" cy="35" r="6.5" fill="${C.grassD}" stroke-width="2.5"/><circle cx="50" cy="50" r="9" fill="${C.sun}"/><path d="M50 46 V54" stroke-width="2.5"/>` },
    'mask': { body: `<path d="M12 26 C4 26 4 40 12 40 M52 26 C60 26 60 40 52 40" stroke-width="2.5"/>
      <path d="M12 24 C22 19 42 19 52 24 V40 C42 48 22 48 12 40 Z" fill="${C.white}"/><path d="M16 30 H48 M16 36 H48" stroke="${C.seaL}" stroke-width="2.5"/>` },
    'battery': { body: `<rect x="27" y="5" width="10" height="6" rx="1.5" fill="${C.grey}" stroke-width="2.5"/><rect x="14" y="10" width="36" height="48" rx="7" fill="#4b4f68"/>
      <path d="M35 18 L24 35 H32 L28 50 L41 31 H33 Z" fill="${C.sun}" stroke-width="2.5"/>` },
    'suitcase': { body: `<path d="M24 15 V9 H40 V15" stroke-width="3.5"/><path d="M14 15 C14 8 22 7 24 12 M40 12 C44 6 52 9 50 15" fill="${C.seaL}" stroke-width="2.5"/>
      <rect x="8" y="15" width="48" height="40" rx="5" fill="${C.purple}"/><path d="M20 15 V55 M44 15 V55" stroke-width="3"/><circle cx="16" cy="57" r="2.5" fill="${C.ink}"/><circle cx="48" cy="57" r="2.5" fill="${C.ink}"/>` },
    'tent': { body: `<path d="M4 56 H60" stroke="${C.greyD}"/><path d="M6 54 L32 10 L58 54 Z" fill="${C.orange}"/><path d="M32 10 L20 54 M32 10 L44 54" stroke-width="2.5"/>
      <path d="M32 26 L24 54 H40 Z" fill="${C.sand}"/><path d="M32 10 V4" stroke-width="3"/><path d="M33 4 H42 L39 7 L42 10 H33 Z" fill="${C.coral}" stroke-width="2"/>` },
    'gloves': { body: `<path d="M20 58 V34 C20 30 25 30 25 34 V16 C25 12 31 12 31 16 V30 V12 C31 8 37 8 37 12 V30 V15 C37 11 43 11 43 15 V32 V22 C43 18 49 18 49 22 V44 C49 52 43 58 35 58 Z" fill="${C.sun}"/>
      <path d="M20 50 H48" stroke-width="2.5"/><path d="M25 34 C17 30 12 36 17 41 L22 46" fill="${C.sun}" stroke-width="3"/>` },
    'boots': { body: `<path d="M16 6 H34 V38 L52 42 C57 43 59 47 59 51 V57 H16 Z" fill="${C.coral}"/><path d="M16 14 H34" stroke-width="2.5"/>
      <path d="M16 50 H59" stroke-width="2.5"/><path d="M16 57 H59" stroke-width="5"/>` },
    'calendar': { body: `<rect x="7" y="12" width="50" height="45" rx="6" fill="${C.white}"/><path d="M7 18 C7 14 10 12 13 12 H51 C54 12 57 14 57 18 V24 H7 Z" fill="${C.coral}"/>
      <path d="M20 6 V16 M44 6 V16" stroke-width="4"/>
      <g fill="${C.ink}" stroke="none"><circle cx="18" cy="33" r="2.6"/><circle cx="28" cy="33" r="2.6"/><circle cx="38" cy="33" r="2.6"/><circle cx="48" cy="33" r="2.6"/><circle cx="18" cy="43" r="2.6"/><circle cx="28" cy="43" r="2.6"/><circle cx="48" cy="43" r="2.6"/></g>
      <circle cx="38" cy="43" r="5" fill="${C.sun}" stroke-width="2.5"/>` }
  };

  /* Ilustrasi besar (bukan ikon 64×64): pulau-pulau di peta dan peta jalur evakuasi. */
  const isle = inner => `
    <path d="M8 118 C16 113 24 113 32 118 S48 123 56 118 M140 122 C148 117 156 117 164 122 S180 127 188 122" stroke="${C.seaL}" stroke-width="3"/>
    <ellipse cx="100" cy="100" rx="88" ry="22" fill="${C.sand}"/><ellipse cx="100" cy="92" rx="72" ry="17" fill="${C.grass}"/>${inner}`;
  const tinyHouse = (x, y, roof) => `<rect x="${x}" y="${y}" width="16" height="13" fill="${C.paper}"/><path d="M${x - 3} ${y + 1} L${x + 8} ${y - 9} L${x + 19} ${y + 1} Z" fill="${roof}"/>`;
  const ART = {
    'island-basic': { vb: '0 0 200 130', body: isle(`
      <circle cx="46" cy="46" r="6" fill="${C.grey}"/><circle cx="56" cy="38" r="5" fill="${C.grey}"/><circle cx="52" cy="50" r="4" fill="${C.grey}"/>
      <path d="M26 94 L44 58 H58 L76 94 Z" fill="#8a6a5a"/><path d="M44 58 C46 64 49 62 51 68 C53 62 56 64 58 58 Z" fill="${C.orange}"/>
      <rect x="98" y="72" width="38" height="20" fill="${C.white}"/><path d="M98 72 C98 52 136 52 136 72 Z" fill="${C.seaL}"/><path d="M117 56 V45" stroke-width="3"/><circle cx="117" cy="43" r="3.5" fill="${C.coral}"/>
      <rect x="111" y="80" width="12" height="12" fill="${C.sun}"/>
      <path d="M174 58 L190 74" stroke-width="10"/><path d="M174 58 L190 74" stroke="${C.brown}" stroke-width="5"/>
      <circle cx="162" cy="46" r="17" fill="${C.sky}"/><path d="M152 44 C155 39 160 37 165 37" stroke="${C.white}" stroke-width="3"/>
      <path d="M154 50 C158 46 162 46 166 50 S174 54 172 48" stroke="${C.sea}" stroke-width="3"/>`) },
    'island-struct': { vb: '0 0 200 130', body: isle(`
      <rect x="44" y="121" width="18" height="7" rx="2" fill="${C.greyD}"/><rect x="92" y="124" width="18" height="7" rx="2" fill="${C.greyD}"/><rect x="140" y="121" width="18" height="7" rx="2" fill="${C.greyD}"/>
      <path d="M26 104 Q100 128 174 104" stroke="${C.ink}" stroke-width="11"/><path d="M26 104 Q100 128 174 104" stroke="${C.grey}" stroke-width="6"/>
      <circle cx="40" cy="92" r="9" fill="${C.grassD}"/><circle cx="54" cy="97" r="8" fill="${C.grassD}"/><path d="M38 100 V106 M54 104 V110" stroke="${C.brownD}"/>
      ${tinyHouse(64, 80, C.coral)}
      <rect x="86" y="50" width="28" height="42" rx="2" fill="${C.seaL}"/><path d="M93 58 H98 M103 58 H108 M93 67 H98 M103 67 H108 M93 76 H98 M103 76 H108" stroke="${C.white}" stroke-width="3.5"/>
      <path d="M140 94 L144 62 M162 94 L158 62 M142 84 L160 72 M160 84 L142 72" stroke-width="3"/><rect x="137" y="56" width="28" height="7" rx="2" fill="${C.white}"/><path d="M134 56 L151 44 L168 56 Z" fill="${C.grass}"/>`) },
    'island-nonstruct': { vb: '0 0 200 130', body: isle(`
      <path d="M44 96 V52" stroke-width="4"/><rect x="36" y="42" width="16" height="11" rx="3" fill="${C.sun}"/><path d="M28 40 C24 44 24 52 28 56 M60 40 C64 44 64 52 60 56" stroke="${C.coral}" stroke-width="3"/>
      ${tinyHouse(62, 84, C.purple)}${tinyHouse(124, 86, C.sea)}
      <rect x="84" y="66" width="34" height="26" fill="#ffe7a8"/><path d="M80 68 L101 52 L122 68 Z" fill="${C.coral}"/><rect x="97" y="78" width="8" height="14" fill="${C.brown}"/>
      <path d="M160 98 V70" stroke-width="3.5"/><rect x="146" y="50" width="30" height="22" rx="3" fill="${C.white}"/>
      <path d="M150 66 C156 60 162 64 172 54" stroke="#1f9d55" stroke-width="3" stroke-dasharray="3 4"/><circle cx="172" cy="55" r="2.5" fill="${C.coral}"/>`) },
    'island-response': { vb: '0 0 200 130', body: isle(`
      <path d="M78 92 C84 42 132 38 142 92 Z" fill="${C.grassD}"/><path d="M109 50 V30" stroke-width="3"/><path d="M110 31 H124 L120 36 L124 41 H110 Z" fill="${C.coral}" stroke-width="2.5"/>
      <path d="M48 96 C62 88 78 80 92 70 S104 56 108 52" stroke="${C.sun}" stroke-width="3.5" stroke-dasharray="4 5"/>
      ${tinyHouse(36, 86, C.coral)}${tinyHouse(150, 84, C.orange)}
      <path d="M170 98 C170 88 172 80 175 74" stroke="${C.brown}" stroke-width="4"/><path d="M175 74 C168 66 160 67 155 71 C162 70 168 72 175 74 Z M175 74 C181 65 189 66 193 70 C186 69 180 71 175 74 Z" fill="${C.grass}" stroke-width="2.5"/>`) },
    // Posko pengungsian, tenda kesehatan, dan derek yang membangun kembali rumah.
    'island-recovery': { vb: '0 0 200 130', body: isle(`
      <path d="M30 96 L50 64 L70 96 Z" fill="${C.orange}"/><path d="M50 74 L44 96 H56 Z" fill="${C.sand}" stroke-width="2.5"/>
      <path d="M62 98 L80 70 L98 98 Z" fill="${C.seaL}"/><path d="M80 79 L75 98 H85 Z" fill="${C.sand}" stroke-width="2.5"/>
      <path d="M100 96 V74 L118 64 L136 74 V96 Z" fill="${C.white}"/><path d="M114 76 H122 V81 H127 V88 H122 V93 H114 V88 H109 V81 H114 Z" fill="${C.coral}" stroke-width="2"/>
      <path d="M160 96 V38 M160 40 H186 M160 50 L172 40" stroke-width="3.5"/><path d="M182 40 V56" stroke-width="2"/><path d="M178 56 H186" stroke-width="3"/>
      <path d="M146 96 V80 L162 70 L178 80 V96" stroke="${C.brown}" stroke-width="3.5"/><path d="M150 84 H174" stroke="${C.brown}" stroke-width="2.5"/>`) },
    // Museum peringatan, kapal yang terdampar di daratan, dan gunung api di laut.
    'island-history': { vb: '0 0 200 130', body: isle(`
      <path d="M18 92 L24 80 H70 L64 92 Z" fill="${C.coral}"/><rect x="34" y="66" width="22" height="14" rx="2" fill="${C.white}"/><path d="M45 66 V54" stroke-width="3"/><path d="M38 72 H42 M48 72 H52" stroke-width="2.5"/>
      <path d="M80 60 L104 46 L128 60 Z" fill="${C.sun}"/><rect x="82" y="60" width="44" height="6" fill="${C.white}"/>
      <path d="M88 66 V90 M98 66 V90 M110 66 V90 M120 66 V90" stroke-width="4"/><rect x="78" y="90" width="52" height="7" rx="2" fill="${C.grey}"/>
      <path d="M150 92 L164 64 L172 72 L180 60 L192 92 Z" fill="#8a6a5a"/><path d="M164 64 C166 70 169 68 171 72 L172 72 L180 60 C178 66 176 66 174 70" fill="${C.orange}" stroke-width="2"/>
      <circle cx="176" cy="48" r="5" fill="${C.grey}"/><circle cx="184" cy="42" r="4" fill="${C.grey}"/>`) },
    // Podium juara dengan piala dan bendera.
    'island-final': { vb: '0 0 200 130', body: isle(`
      <rect x="62" y="74" width="26" height="20" fill="${C.seaL}"/><rect x="88" y="62" width="26" height="32" fill="${C.sun}"/><rect x="114" y="80" width="26" height="14" fill="${C.coral}"/>
      <path d="M96 76 H106 M101 70 V82" stroke-width="3"/>
      <path d="M91 30 H111 C111 44 106 50 101 50 C96 50 91 44 91 30 Z" fill="${C.sun}"/><path d="M91 34 H85 C85 42 89 44 93 44 M111 34 H117 C117 42 113 44 109 44" stroke-width="3"/>
      <path d="M101 50 V56" stroke-width="3.5"/><rect x="94" y="56" width="14" height="6" rx="2" fill="${C.brown}"/>
      <path d="M38 96 V58" stroke-width="3"/><path d="M39 59 H56 L51 65 L56 71 H39 Z" fill="${C.grass}" stroke-width="2.5"/>
      <path d="M164 96 V58" stroke-width="3"/><path d="M163 59 H146 L151 65 L146 71 H163 Z" fill="${C.purple}" stroke-width="2.5"/>
      <path d="M150 34 L153 41 L160 42 L155 47 L156 54 L150 50 L144 54 L145 47 L140 42 L147 41 Z" fill="${C.sun}" stroke-width="2.5"/>`) },
    // Laboratorium simulasi: layar grafik gelombang, gunung api kecil, dan meteor.
    'island-sim': { vb: '0 0 200 130', body: isle(`
      <path d="M28 94 L46 62 H54 L72 94 Z" fill="#8a6a5a"/><path d="M46 62 C48 67 51 65 50 70 C51 65 54 67 54 62 Z" fill="${C.orange}" stroke-width="2"/>
      <circle cx="48" cy="50" r="5" fill="${C.grey}"/><circle cx="56" cy="44" r="4" fill="${C.grey}"/>
      <path d="M100 96 V84" stroke-width="4"/><path d="M88 96 H112" stroke-width="3.5"/>
      <rect x="74" y="44" width="52" height="40" rx="5" fill="#4b4f68"/><rect x="79" y="49" width="42" height="30" rx="3" fill="${C.sky}"/>
      <path d="M82 70 H90 L94 58 L98 76 L102 64 H118" stroke="${C.coral}" stroke-width="2.5"/>
      <path d="M140 94 C150 74 166 70 178 70 V94 Z" fill="#c9965f"/><path d="M150 82 C152 78 156 77 158 79" stroke-width="2.5"/>
      <path d="M178 22 L156 40" stroke="${C.sun}" stroke-width="7"/><path d="M174 26 L160 37" stroke="${C.white}" stroke-width="2.5"/><circle cx="154" cy="42" r="6" fill="#8a6a5a"/>`) },
    'evac-map': { vb: '0 0 360 220', body: `
      <rect x="1.5" y="1.5" width="357" height="217" rx="14" fill="#d4f5c4"/>
      <rect x="40" y="2" width="112" height="216" fill="#ffd0d0" stroke="none"/><rect x="152" y="2" width="80" height="216" fill="#fff0b3" stroke="none"/>
      <path d="M2 14 C2 6 7 2 14 2 H44 C36 30 50 60 40 90 C32 120 48 150 40 180 C35 200 44 210 42 218 H14 C7 218 2 214 2 206 Z" fill="${C.sea}"/>
      <path d="M40 165 C90 158 122 176 172 166 S262 140 358 150" stroke="${C.ink}" stroke-width="17"/><path d="M40 165 C90 158 122 176 172 166 S262 140 358 150" stroke="${C.seaL}" stroke-width="11"/>
      <rect x="78" y="150" width="16" height="26" rx="2" fill="${C.brown}"/>
      <path d="M100 70 H300 M150 70 V140 M150 190 V218 M150 190 H250" stroke="#b9bccb" stroke-width="7"/>
      <ellipse cx="302" cy="62" rx="50" ry="38" fill="${C.grass}"/>
      <path d="M112 70 C160 70 220 68 266 60" stroke="#1f9d55" stroke-width="4" stroke-dasharray="7 6"/><path d="M258 52 L270 59 L259 68" stroke="#1f9d55" stroke-width="4"/>
      <rect x="282" y="46" width="40" height="22" rx="6" fill="#1f9d55"/><text x="302" y="62" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" stroke="none">TES</text>
      <rect x="200" y="182" width="56" height="26" rx="4" fill="${C.sand}"/><text x="228" y="199" text-anchor="middle" font-size="11" font-weight="600" fill="${C.ink}" stroke="none">Lapangan</text>
      <path d="M100 56 L104 66 L115 67 L107 74 L110 85 L100 79 L90 85 L93 74 L85 67 L96 66 Z" fill="${C.sun}" stroke-width="2.5"/>
      <g font-size="11" font-weight="700" fill="${C.ink}" stroke="none">
        <text x="21" y="114" text-anchor="middle" fill="#fff">LAUT</text><text x="96" y="22" text-anchor="middle">ZONA BAHAYA</text>
        <text x="192" y="22" text-anchor="middle">WASPADA</text><text x="296" y="122" text-anchor="middle">ZONA AMAN</text>
        <text x="302" y="36" text-anchor="middle">Bukit</text><text x="86" y="196" text-anchor="middle">Jembatan muara</text><text x="100" y="102" text-anchor="middle">Rumahmu</text>
      </g>` }
  };
  function art(name, cls = '') {
    const def = ART[name];
    if (!def) return '';
    return `<svg class="art ${cls}" viewBox="${def.vb}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${def.body}</svg>`;
  }

  function wrap(name, cls = '', size) {
    const def = ICONS[name];
    if (!def) return '';
    const dims = size ? ` width="${size}" height="${size}"` : '';
    const stroke = def.glyph
      ? 'stroke="currentColor" stroke-width="7"'
      : `stroke="${C.ink}" stroke-width="3"`;
    return `<svg class="ico ${cls}" viewBox="0 0 64 64"${dims} fill="none" ${stroke} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${def.body}</svg>`;
  }

  // Gambar untuk kanvas (level lari): SVG yang sama dimuat sebagai Image.
  const imgCache = {};
  function image(name) {
    if (!imgCache[name]) {
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(wrap(name, '', 128));
      imgCache[name] = img;
    }
    return imgCache[name];
  }

  window.SiagaIcons = { svg: wrap, image, art, names: Object.keys(ICONS) };
})();
