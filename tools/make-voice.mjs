// Pembuat suara Tuti dari Google Cloud Text-to-Speech (suara Chirp 3 HD).
//
// Kunci API disimpan di tools/tts-key.txt (sudah diabaikan git, jangan pernah di-commit).
//
// Langkah:
//   1. node tools/make-voice.mjs voices
//        Menampilkan suara Chirp 3 HD bahasa Indonesia yang tersedia.
//   2. node tools/make-voice.mjs sample
//        Membuat contoh MP3 untuk beberapa suara di tools/voice-samples/ supaya bisa dipilih yang paling ceria.
//   3. node tools/make-voice.mjs serve
//        Menjalankan game di http://localhost:5175. Buka alamat itu, lalu di konsol browser jalankan
//        SiagaVoice.exportCorpus()  -> daftar semua kalimat Tuti tersimpan di tools/voice-corpus.json.
//   4. node tools/make-voice.mjs build [--voice id-ID-Chirp3-HD-Leda] [--rate 1.0] [--prune]
//        Membuat MP3 untuk setiap kalimat yang belum punya file, lalu memperbarui audio/voice/manifest.js.
//        Bisa diulang kapan saja: kalimat yang sudah punya MP3 dilewati, jadi kuota tidak terbuang.

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KEY_FILE = path.join(ROOT, 'tools', 'tts-key.txt');
const CORPUS = path.join(ROOT, 'tools', 'voice-corpus.json');
const OUT_DIR = path.join(ROOT, 'audio', 'voice');
const MANIFEST = path.join(OUT_DIR, 'manifest.js');
const API = 'https://texttospeech.googleapis.com/v1/';

const args = process.argv.slice(2);
const cmd = args[0] || 'help';
const opt = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 && args[i + 1] ? args[i + 1] : def; };
const flag = name => args.includes('--' + name);

function apiKey() {
  if (!fs.existsSync(KEY_FILE)) throw new Error('Kunci belum ada. Simpan kunci API di tools/tts-key.txt');
  const k = fs.readFileSync(KEY_FILE, 'utf8').trim();
  if (!k) throw new Error('tools/tts-key.txt masih kosong.');
  return k;
}
async function call(endpoint, body) {
  const res = await fetch(API + endpoint, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': apiKey() },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error((data.error && data.error.message) || res.statusText);
    err.status = res.status;
    throw err;
  }
  return data;
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function synth(text, voice, rate) {
  const body = { input: { text }, voice: { languageCode: 'id-ID', name: voice }, audioConfig: { audioEncoding: 'MP3' } };
  if (rate && rate !== 1) body.audioConfig.speakingRate = rate;
  for (let attempt = 0; ; attempt++) {
    try {
      return Buffer.from((await call('text:synthesize', body)).audioContent, 'base64');
    } catch (e) {
      if ((e.status === 429 || e.status >= 500) && attempt < 5) { await sleep(1000 * 2 ** attempt); continue; }
      throw e;
    }
  }
}
function readManifest() {
  if (!fs.existsSync(MANIFEST)) return { voice: '', files: {} };
  const src = fs.readFileSync(MANIFEST, 'utf8');
  const json = src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1);
  return JSON.parse(json);
}
function writeManifest(m) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const sorted = Object.fromEntries(Object.keys(m.files).sort().map(k => [k, 1]));
  fs.writeFileSync(MANIFEST,
    '/* Dibuat otomatis oleh tools/make-voice.mjs. Daftar kalimat Tuti yang sudah punya file MP3. */\n' +
    'window.SIAGA_VOICE = ' + JSON.stringify({ voice: m.voice, rate: m.rate || 1, files: sorted }) + ';\n');
}

async function voices() {
  const { voices: list = [] } = await call('voices?languageCode=id-ID');
  list.filter(v => /Chirp3-HD/.test(v.name)).forEach(v => console.log(v.name.padEnd(36), v.ssmlGender));
  console.log('\nSuara lain:', list.filter(v => !/Chirp3-HD/.test(v.name)).map(v => v.name).join(', '));
}

async function sample() {
  const text = 'Halo! Aku Tuti si Penyu. Ayo jelajahi pulau-pulau dan jadi Pahlawan Siaga Tsunami! Hore, kamu dapat tiga bintang!';
  const names = (opt('voices', '') || 'Leda,Laomedeia,Zephyr,Autonoe,Aoede,Kore,Puck').split(',');
  const dir = path.join(ROOT, 'tools', 'voice-samples');
  fs.mkdirSync(dir, { recursive: true });
  for (const n of names) {
    const voice = n.includes('-') ? n : 'id-ID-Chirp3-HD-' + n;
    try {
      fs.writeFileSync(path.join(dir, voice + '.mp3'), await synth(text, voice, Number(opt('rate', 1))));
      console.log('ok   ', voice);
    } catch (e) { console.log('gagal', voice, '-', e.message); }
  }
  console.log('\nDengarkan file di', dir);
}

async function build() {
  if (!fs.existsSync(CORPUS)) throw new Error('tools/voice-corpus.json belum ada. Jalankan langkah 3 (serve) dulu.');
  apiKey();
  const corpus = JSON.parse(fs.readFileSync(CORPUS, 'utf8'));
  const m = readManifest();
  const voice = opt('voice', m.voice || 'id-ID-Chirp3-HD-Leda');
  const rate = Number(opt('rate', m.rate || 1));
  if ((m.voice && m.voice !== voice) || (m.rate || 1) !== rate) {
    console.log(`Suara atau tempo berubah (${m.voice} ${m.rate || 1} -> ${voice} ${rate}): semua MP3 dibuat ulang.`);
    m.files = {};
  }
  m.voice = voice;
  m.rate = rate;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const todo = corpus.filter(c => !m.files[c.k] || !fs.existsSync(path.join(OUT_DIR, c.k + '.mp3')));
  const chars = todo.reduce((n, c) => n + c.s.length, 0);
  console.log(`${corpus.length} kalimat, ${todo.length} perlu dibuat (${chars} karakter). Suara ${voice}, tempo ${rate}.`);
  let done = 0, failed = 0, i = 0;
  const worker = async () => {
    while (i < todo.length) {
      const c = todo[i++];
      try {
        fs.writeFileSync(path.join(OUT_DIR, c.k + '.mp3'), await synth(c.s, voice, rate));
        m.files[c.k] = 1;
      } catch (e) {
        failed++;
        console.log('\ngagal:', c.s.slice(0, 60), '-', e.message);
        if (e.status === 400 && /speaking/i.test(e.message)) throw e;
        if (e.status === 403) throw e;
      }
      if (++done % 25 === 0) { writeManifest(m); process.stdout.write(`\r${done}/${todo.length}`); }
    }
  };
  try {
    await Promise.all([worker(), worker(), worker(), worker()]);
  } finally {
    writeManifest(m);
  }
  if (flag('prune')) {
    const keep = new Set(corpus.map(c => c.k));
    let removed = 0;
    for (const f of fs.readdirSync(OUT_DIR)) {
      const k = f.replace(/\.mp3$/, '');
      if (f.endsWith('.mp3') && !keep.has(k)) { fs.unlinkSync(path.join(OUT_DIR, f)); delete m.files[k]; removed++; }
    }
    writeManifest(m);
    console.log(`\n${removed} MP3 lama dihapus.`);
  }
  console.log(`\nSelesai: ${done - failed} dibuat, ${failed} gagal. Manifest: audio/voice/manifest.js`);
}

function serve() {
  const port = Number(opt('port', 5175));
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.mp3': 'audio/mpeg' };
  http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/__voice-corpus') {
      let body = '';
      req.on('data', d => { body += d; if (body.length > 20e6) req.destroy(); });
      req.on('end', () => {
        try {
          const list = JSON.parse(body);
          if (!Array.isArray(list) || !list.every(c => typeof c.k === 'string' && /^[0-9a-f]{16}$/.test(c.k) && typeof c.s === 'string')) throw new Error('format');
          fs.writeFileSync(CORPUS, JSON.stringify(list, null, 1));
          console.log(`Tersimpan ${list.length} kalimat di tools/voice-corpus.json`);
          res.writeHead(200); res.end('ok');
        } catch (e) { res.writeHead(400); res.end('format salah'); }
      });
      return;
    }
    const url = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(ROOT, url === '/' ? 'index.html' : url);
    if (!file.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); res.end('not found'); return; }
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(data);
    });
  }).listen(port, () => console.log(`Game: http://localhost:${port}  (lalu jalankan SiagaVoice.exportCorpus() di konsol browser)`));
}

const run = { voices, sample, build, serve }[cmd];
if (!run) {
  console.log('Pakai: node tools/make-voice.mjs voices | sample | serve | build   (penjelasan di awal berkas ini)');
} else {
  Promise.resolve(run()).catch(e => { console.error('\nGagal:', e.message); process.exit(1); });
}
