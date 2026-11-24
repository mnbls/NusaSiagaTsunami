# Nusa Siaga: panduan singkat untuk sesi pengembangan

Game edukasi mitigasi tsunami untuk anak kelas 4–6 SD. Tugas mata kuliah Sistem Informasi Manajemen Bencana (SIMB).
Web statis tanpa build, di-host di GitHub Pages: https://mnbls.github.io/NusaSiagaTsunami/ (repo `mnbls/NusaSiagaTsunami`, branch `main`).

## Baca ini dulu (hemat token)

1. `docs/PROGRESS.md`: status terakhir, keputusan, dan daftar pekerjaan berikutnya.
2. `docs/ARCHITECTURE.md`: peta file dan bagian `game.js` (cari penanda bagian dengan Grep, jangan baca seluruh file).
3. `docs/LEVELS.md`: katalog semua misi, mesin game, dan mana yang tampil atau disembunyikan.

`game.js` sekitar 5.700 baris. Jangan dibaca utuh. Grep penanda bagian (`/* =====`) atau nama fungsi, lalu baca potongannya saja.

## Aturan kerja (dari pemilik proyek)

- Jangan push ke GitHub kecuali diminta. Commit lokal boleh.
- Commit tanpa atribusi Claude: tanpa trailer `Co-Authored-By` dan tanpa menyebut Claude.
- Jangan menghapus misi. Misi yang tidak dipakai disembunyikan lewat `HIDDEN_LEVELS` di `game.js`.
- Utamakan game interaktif (simulasi, lari, rute, susun, pasangkan). Kuis dibatasi, paling banyak 1 per pulau.
- Bahasa di game: Indonesia yang mudah dipahami anak. Kalimat pendek, tanpa istilah sulit tanpa penjelasan.
- Setelah mengubah alur atau jumlah misi, perbarui `README.md` dan dokumen di `docs/`.

## Menjalankan dan menguji

- Server lokal: `node <scratchpad>/serve.js "D:/semester 3/game-mitigasi-tsunami" 5174`, atau konfigurasi `nusa-siaga` di `D:/semester 3/.claude/launch.json`.
- Untuk uji terpisah dari data pemain, buka `http://127.0.0.1:5174` (localStorage berbeda dengan `localhost`).
- Cek sintaks cepat: `node --check game.js`.
- Simpanan pemain: localStorage `siaga-tsunami-v1` (lihat ARCHITECTURE.md).
