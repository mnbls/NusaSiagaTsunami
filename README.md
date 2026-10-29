# Nusa Siaga

**Petualangan Mitigasi Tsunami.** Jelajahi pulau, kuasai mitigasi, selamatkan diri.

Game edukasi berbasis web tentang **mitigasi bencana tsunami**. Pemain ditemani **Tuti si Penyu**, menjelajahi 4 pulau, dan menyelesaikan 40 misi (10 misi di setiap pulau): mulai dari mengenal tsunami, cara mengurangi risikonya, sampai cara menyelamatkan diri.

## Isi game

**Cerita pembuka 3D.** Sembilan adegan animasi tentang definisi, penyebab, dan dampak tsunami, langkah pra-bencana, saat bencana, pascabencana, dan mitigasi.

| Pulau | Tema | Misi |
|---|---|---|
| 1. Pulau Ilmu | Mengenal tsunami | Apa Itu Tsunami?, Proses Terjadinya Tsunami, Detektif Penyebab, Lab Gempa Pemicu, Kuis Dampak Tsunami, Laut Dalam vs Pantai, Ombak Biasa atau Tsunami?, Kamus Tsunami, Jejak Tsunami di Indonesia, Ujian Ilmu Tsunami |
| 2. Pulau Benteng | Mitigasi struktural | Kenali Bangunan Pelindung, Tanam Sabuk Mangrove, Susun Benteng Pantai, Kuis Insinyur Pantai, Rumah Tahan Gempa, Menara Evakuasi Ideal, Rawat Benteng Pantai, Lari ke Menara Evakuasi, Kuis Kilat Benteng, Masalah dan Solusi |
| 3. Pulau Siaga Warga | Mitigasi non-struktural | Rantai Peringatan Dini, Atur Tata Ruang Pesisir, Baca Peta Evakuasi, Latihan Evakuasi Rutin, Kuis Duta Edukasi, Kenali Rambu Evakuasi, Resmi atau Hoaks?, Rencana Siaga Keluarga, Evakuasi dari Sekolah, Ujian Duta Siaga |
| 4. Pulau Tanggap | Sebelum, saat, dan sesudah tsunami | Kenali Tanda Alam, Siapkan Tas Siaga, Cari Jalur Evakuasi, Saat Gempa Terjadi, Lari ke Bukit, Setelah Gelombang, Tas Siaga Keluarga, Evakuasi Malam Hari, Bantu Sesama, Ujian Tanggap Darurat |

- Setiap misi memberi 3 nyawa, dan sisa nyawa menjadi jumlah bintang (maksimal 120 bintang).
- Setiap jawaban disertai penjelasan, dan setiap misi ditutup dengan rangkuman.
- Setelah semua pulau tuntas, pemain bisa mencetak sertifikat.
- Progres tersimpan otomatis di browser.

## Cara menjalankan

Tidak perlu instalasi atau proses build.

- **Online:** buka halaman GitHub Pages repo ini.
- **Lokal:** buka `index.html` di browser (Chrome, Edge, atau Firefox).

Pada kunjungan pertama dibutuhkan internet untuk memuat font Fredoka dan Three.js r128 (untuk cerita 3D) dari CDN.

## Struktur file

| File | Isi |
|---|---|
| `index.html` | Halaman utama |
| `style.css` | Tampilan bergaya kartun dan tata letak responsif |
| `icons.js` | Ikon dan ilustrasi SVG buatan sendiri |
| `intro.js` | Cerita pembuka dengan dunia 3D (Three.js) |
| `music.js` | Musik latar yang disusun langsung dengan Web Audio (tanpa file lagu) |
| `game.js` | Data pulau dan misi, serta seluruh logika permainan |

## Sumber materi

- Presentasi *Tsunami Awareness: Understanding, Preparing, and Staying Safe* (UPN "Veteran" Yogyakarta).
- Panduan umum kesiapsiagaan tsunami dari BMKG dan BNPB.

Cocokkan kembali materi dengan sumber resmi sebelum dipakai untuk pembelajaran formal.
