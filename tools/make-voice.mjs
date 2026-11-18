// Pembuat suara Tuti: setiap kalimat dijadikan file MP3 dengan suara AI.
//
// Layanan yang dipakai dipilih otomatis dari berkas kunci yang ada (keduanya diabaikan git, jangan di-commit):
//   tools/azure-speech.txt  Azure AI Speech. Baris 1: KEY 1, baris 2: region (misalnya southeastasia).
//                           Suara bawaan: id-ID-GadisNeural.
//   tools/tts-key.txt       Google Cloud Text-to-Speech. Isi: kunci API. Suara bawaan: id-ID-Chirp3-HD-Leda.
//
// Langkah:
//   1. node tools/make-voice.mjs voices
//        Menampilkan suara bahasa Indonesia yang tersedia.
//   2. node tools/make-voice.mjs sample
//        Membuat contoh MP3 beberapa gaya suara di tools/voice-samples/ supaya bisa dipilih yang paling ceria.
//   3. node tools/make-voice.mjs serve
//        Menjalankan game di http://localhost:5175. Buka alamat itu, lalu di konsol browser jalankan
//        SiagaVoice.exportCorpus()  -> daftar semua kalimat Tuti tersimpan di tools/voice-corpus.json.
//   4. node tools/make-voice.mjs build [--voice NAMA] [--pitch +8%] [--rate +4%] [--prune]
//        Membuat MP3 untuk setiap kalimat yang belum punya file, lalu memperbarui audio/voice/manifest.js.
//        Bisa diulang kapan saja: kalimat yang sudah punya MP3 dilewati, jadi kuota tidak terbuang.
//        Kalau suara, nada, atau tempo diganti, semua MP3 dibuat ulang.

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AZURE_FILE = path.join(ROOT, 'tools', 'azure-speech.txt');
const GOOGLE_FILE = path.join(ROOT, 'tools', 'tts-key.txt');
const CORPUS = path.join(ROOT, 'tools', 'voice-corpus.json');
const OUT_DIR = path.join(ROOT, 'audio', 'voice');
const SAMPLE_DIR = path.join(ROOT, 'tools', 'voice-samples');
const MANIFEST = path.join(OUT_DIR, 'manifest.js');

const args = process.argv.slice(2);
const cmd = args[0] || 'help';
const opt = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 && args[i + 1] ? args[i + 1] : def; };
const flag = name => args.includes('--' + name);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const readLines = f => fs.readFileSync(f, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);

class HttpError extends Error { constructor(msg, status) { super(msg); this.status = status; } }

/* ---------- Azure AI Speech ---------- */
function azure() {
  const [key, region = 'southeastasia'] = readLines(AZURE_FILE);
  if (!key) throw new Error('tools/azure-speech.txt masih kosong. Baris 1: KEY 1, baris 2: region.');
  const base = `https://${region}.tts.speech.microsoft.com/cognitiveservices/`;
  const xml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  return {
    name: 'Azure',
    defaults: { voice: 'id-ID-GadisNeural', pitch: '+8%', rate: '+4%' },
    async voices() {
      const res = await fetch(base + 'voices/list', { headers: { 'Ocp-Apim-Subscription-Key': key } });
      if (!res.ok) throw new HttpError(`${res.status} ${await res.text()}`, res.status);
      return (await res.json()).filter(v => v.Locale === 'id-ID').map(v => `${v.ShortName.padEnd(28)} ${v.Gender}${v.StyleList ? '  gaya: ' + v.StyleList.join(', ') : ''}`);
    },
    async synth(text, { voice, pitch, rate }) {
      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="id-ID">` +
        `<voice name="${voice}"><prosody pitch="${pitch}" rate="${rate}">${xml(text)}</prosody></voice></speak>`;
      const res = await fetch(base + 'v1', {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
          'User-Agent': 'nusa-siaga-voice'
        },
        body: ssml
      });
      if (!res.ok) throw new HttpError(`${res.status} ${res.statusText} ${await res.text()}`.trim(), res.status);
      return Buffer.from(await res.arrayBuffer());
    },
    samples: [
      { name: 'Gadis-biasa', voice: 'id-ID-GadisNeural', pitch: '+0%', rate: '+0%' },
      { name: 'Gadis-ceria', voice: 'id-ID-GadisNeural', pitch: '+8%', rate: '+4%' },
      { name: 'Gadis-sangat-ceria', voice: 'id-ID-GadisNeural', pitch: '+15%', rate: '+8%' },
      { name: 'Ardi-ceria', voice: 'id-ID-ArdiNeural', pitch: '+8%', rate: '+4%' }
    ]
  };
}

/* ---------- Google Cloud Text-to-Speech ---------- */
function google() {
  const [key] = readLines(GOOGLE_FILE);
  if (!key) throw new Error('tools/tts-key.txt masih kosong.');
  const API = 'https://texttospeech.googleapis.com/v1/';
  const call = async (endpoint, body) => {
    const res = await fetch(API + endpoint, {
      method: body ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key },
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new HttpError((data.error && data.error.message) || res.statusText, res.status);
    return data;
  };
  const pct = s => 1 + (parseFloat(s) || 0) / 100;
  return {
    name: 'Google',
    defaults: { voice: 'id-ID-Chirp3-HD-Leda', pitch: '+0%', rate: '+0%' },
    async voices() {
      const { voices: list = [] } = await call('voices?languageCode=id-ID');
      return list.map(v => `${v.name.padEnd(36)} ${v.ssmlGender}`);
    },
    async synth(text, { voice, rate }) {
      const body = { input: { text }, voice: { languageCode: 'id-ID', name: voice }, audioConfig: { audioEncoding: 'MP3' } };
      if (pct(rate) !== 1) body.audioConfig.speakingRate = pct(rate);
      return Buffer.from((await call('text:synthesize', body)).audioContent, 'base64');
    },
    samples: ['Leda', 'Laomedeia', 'Zephyr', 'Autonoe', 'Puck'].map(n => ({ name: n, voice: 'id-ID-Chirp3-HD-' + n, pitch: '+0%', rate: '+0%' }))
  };
}

function provider() {
  if (fs.existsSync(AZURE_FILE)) return azure();
  if (fs.existsSync(GOOGLE_FILE)) return google();
  throw new Error('Kunci belum ada. Simpan kunci Azure di tools/azure-speech.txt (baris 1: KEY 1, baris 2: region).');
}
async function synthRetry(p, text, style) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await p.synth(text, style);
    } catch (e) {
      if ((e.status === 429 || e.status >= 500 || !e.status) && attempt < 6) { await sleep(1500 * 2 ** attempt); continue; }
      throw e;
    }
  }
}

function readManifest() {
  if (!fs.existsSync(MANIFEST)) return { voice: '', files: {} };
  const src = fs.readFileSync(MANIFEST, 'utf8');
  return JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
}
function writeManifest(m) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const files = Object.fromEntries(Object.keys(m.files).sort().map(k => [k, 1]));
  fs.writeFileSync(MANIFEST,
    '/* Dibuat otomatis oleh tools/make-voice.mjs. Daftar kalimat Tuti yang sudah punya file MP3. */\n' +
    'window.SIAGA_VOICE = ' + JSON.stringify({ voice: m.voice, files }) + ';\n');
}

async function voices() {
  const p = provider();
  console.log(`Suara bahasa Indonesia di ${p.name}:`);
  (await p.voices()).forEach(v => console.log('  ' + v));
}

async function sample() {
  const p = provider();
  const text = opt('text', 'Halo! Aku Tuti si Penyu. Ayo jelajahi pulau-pulau dan jadi Pahlawan Siaga Tsunami! Hore, kamu dapat tiga bintang! Kalau gempa kuat, segera lari ke tempat tinggi, ya.');
  fs.mkdirSync(SAMPLE_DIR, { recursive: true });
  for (const s of p.samples) {
    try {
      fs.writeFileSync(path.join(SAMPLE_DIR, s.name + '.mp3'), await synthRetry(p, text, s));
      console.log(`ok     ${s.name.padEnd(20)} ${s.voice} nada ${s.pitch} tempo ${s.rate}`);
    } catch (e) { console.log(`gagal  ${s.name} - ${e.message}`); }
  }
  console.log('\nDengarkan file di', SAMPLE_DIR);
}

async function build() {
  const p = provider();
  if (!fs.existsSync(CORPUS)) throw new Error('tools/voice-corpus.json belum ada. Jalankan langkah 3 (serve) dulu.');
  const corpus = JSON.parse(fs.readFileSync(CORPUS, 'utf8'));
  const style = {
    voice: opt('voice', p.defaults.voice),
    pitch: opt('pitch', p.defaults.pitch),
    rate: opt('rate', p.defaults.rate)
  };
  const id = `${p.name}:${style.voice}|nada ${style.pitch}|tempo ${style.rate}`;
  const m = readManifest();
  if (m.voice && m.voice !== id) {
    console.log(`Suara berubah (${m.voice} -> ${id}): semua MP3 dibuat ulang.`);
    m.files = {};
  }
  m.voice = id;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const todo = corpus.filter(c => !m.files[c.k] || !fs.existsSync(path.join(OUT_DIR, c.k + '.mp3')));
  const chars = todo.reduce((n, c) => n + c.s.length, 0);
  console.log(`${corpus.length} kalimat, ${todo.length} perlu dibuat (${chars} karakter). ${id}`);
  let done = 0, failed = 0, i = 0, fatal = null;
  const worker = async () => {
    while (i < todo.length && !fatal) {
      const c = todo[i++];
      try {
        fs.writeFileSync(path.join(OUT_DIR, c.k + '.mp3'), await synthRetry(p, c.s, style));
        m.files[c.k] = 1;
      } catch (e) {
        failed++;
        console.log(`\ngagal: "${c.s.slice(0, 60)}" - ${e.message}`);
        if (e.status === 400 || e.status === 401 || e.status === 403) fatal = e;
      }
      if (++done % 25 === 0) { writeManifest(m); process.stdout.write(`\r${done}/${todo.length}`); }
    }
  };
  try {
    // Paket gratis Azure membatasi jumlah permintaan bersamaan, jadi cukup 2 sekaligus.
    await Promise.all([worker(), worker()]);
  } finally {
    writeManifest(m);
  }
  if (fatal) throw fatal;
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
    if (!file.startsWith(ROOT) || /tools[\\/].*\.txt$/.test(file)) { res.writeHead(403); res.end(); return; }
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
