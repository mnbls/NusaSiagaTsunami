# Nusa Siaga

**Petualangan Mitigasi Tsunami.** Jelajahi pulau, kuasai mitigasi, selamatkan diri.

Game edukasi berbasis web tentang **mitigasi bencana tsunami**. Pemain ditemani **Tuti si Penyu**, menjelajahi 7 pulau, dan menyelesaikan 70 misi (10 misi di setiap pulau): mulai dari mengenal tsunami, cara mengurangi risikonya, cara menyelamatkan diri, pemulihan setelah bencana, sejarah tsunami Indonesia, sampai ujian akhir.

## Isi game

**Cerita pembuka 3D.** Sembilan adegan animasi tentang definisi, penyebab, dan dampak tsunami, langkah pra-bencana, saat bencana, pascabencana, dan mitigasi.

**Animasi penjelasan di awal tiap pulau.** Sebelum misi pertama dibuka, pemain melihat 3–4 slide beranimasi yang menerangkan topik pulau itu: penyebab dan tanda tsunami (Pulau Ilmu), pelindung pantai, bangunan tahan gempa, dan menara evakuasi (Pulau Benteng), peringatan dini, peta evakuasi, latihan, dan info resmi (Pulau Siaga Warga), tas siaga, lari ke tempat tinggi, dan menunggu kabar resmi (Pulau Tanggap), tahap pemulihan dan posko pengungsian (Pulau Pulih), garis waktu dan pelajaran sejarah (Pulau Sejarah), serta gambaran ujian akhir dan sertifikat (Pulau Juara). Animasi tampil otomatis sekali per pulau dan bisa diputar ulang lewat tombol **Animasi penjelasan** di halaman pulau.

| Pulau | Tema | Misi |
|---|---|---|
| 1. Pulau Ilmu | Mengenal tsunami | Apa Itu Tsunami?, Proses Terjadinya Tsunami, Detektif Penyebab, Lab Gempa Pemicu, Kuis Dampak Tsunami, Laut Dalam vs Pantai, Ombak Biasa atau Tsunami?, Kamus Tsunami, Jejak Tsunami di Indonesia, Ujian Ilmu Tsunami |
| 2. Pulau Benteng | Mitigasi struktural | Kenali Bangunan Pelindung, Tanam Sabuk Mangrove, Susun Benteng Pantai, Kuis Insinyur Pantai, Rumah Tahan Gempa, Menara Evakuasi Ideal, Rawat Benteng Pantai, Lari ke Menara Evakuasi, Kuis Kilat Benteng, Masalah dan Solusi |
| 3. Pulau Siaga Warga | Mitigasi non-struktural | Rantai Peringatan Dini, Atur Tata Ruang Pesisir, Baca Peta Evakuasi, Latihan Evakuasi Rutin, Kuis Duta Edukasi, Kenali Rambu Evakuasi, Resmi atau Hoaks?, Rencana Siaga Keluarga, Evakuasi dari Sekolah, Ujian Duta Siaga |
| 4. Pulau Tanggap | Sebelum, saat, dan sesudah tsunami | Kenali Tanda Alam, Siapkan Tas Siaga, Cari Jalur Evakuasi, Saat Gempa Terjadi, Lari ke Bukit, Setelah Gelombang, Tas Siaga Keluarga, Evakuasi Malam Hari, Bantu Sesama, Ujian Tanggap Darurat |
| 5. Pulau Pulih | Pascabencana dan pemulihan | Tahapan Pemulihan, Kebutuhan Posko Pengungsian, Pertolongan Pertama, Aman atau Bahaya?, Air Bersih Badan Sehat, Pulihkan Hati, Rehabilitasi atau Rekonstruksi?, Bersih-Bersih Aman, Bangun Kembali Lebih Aman, Ujian Pemulihan |
| 6. Pulau Sejarah | Jejak tsunami Indonesia | Garis Waktu Tsunami, Peristiwa dan Pemicunya, Kisah Smong Simeulue, Pelajaran Pangandaran 2006, Palu 2018, Selat Sunda Tanpa Gempa, Lahirnya Peringatan Dini, Fakta atau Mitos?, Pelajaran Tiap Peristiwa, Ujian Sejarah |
| 7. Pulau Juara | Ujian akhir | Pemanasan Benar-Salah, Struktural atau Non-Struktural?, Kapan Dilakukan?, Urutan Selamat, Kamus Siaga, Lari ke Bukit: Final, Rute Evakuasi Final, Pilih Tindakan Terbaik, Kuis Kilat, Ujian Pahlawan Siaga |

- Setiap misi memberi 3 nyawa, dan sisa nyawa menjadi jumlah bintang (maksimal 210 bintang).
- Papan peringkat di Peta Kepulauan menampilkan bintangmu bersama lawan rekaan. Peringkat 1 selalu 3 bintang di atasmu, jadi selalu ada yang dikejar.
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
| `explain.js` | Animasi penjelasan di awal tiap pulau (SVG + CSS, tanpa pustaka tambahan) |
| `music.js` | Musik latar yang disusun langsung dengan Web Audio (tanpa file lagu) |
| `game.js` | Data pulau dan misi, serta seluruh logika permainan |

## Sumber materi

- Presentasi *Tsunami Awareness: Understanding, Preparing, and Staying Safe* (UPN "Veteran" Yogyakarta).
- Panduan umum kesiapsiagaan tsunami dari BMKG dan BNPB.
- UU No. 24 Tahun 2007 tentang Penanggulangan Bencana (Pasal 57–59: rehabilitasi dan rekonstruksi).

Cocokkan kembali materi dengan sumber resmi sebelum dipakai untuk pembelajaran formal.
