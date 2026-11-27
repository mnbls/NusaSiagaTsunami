// Pakai: node tools/bump-version.js   (jalankan sebelum commit yang akan di-push)
// Menambah penanda versi (?v=...) pada css/js di index.html supaya browser mengambil file terbaru setelah update.
const fs = require('fs');
const file = require('path').join(__dirname, '..', 'index.html');
const V = process.argv[2] || new Date().toISOString().slice(0, 16).replace(/[-T:]/g, '');
let h = fs.readFileSync(file, 'utf8');
let n = 0;
h = h.replace(/(href|src)="((?:style\.css|[\w/-]+\.js))(\?v=[^"]*)?"/g, (m, attr, path) => {
  if (/^https?:/.test(path) || path.startsWith('vendor/')) return m;
  n++;
  return `${attr}="${path}?v=${V}"`;
});
fs.writeFileSync(file, h);
console.log('updated', n);
