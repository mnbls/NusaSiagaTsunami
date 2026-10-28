# Nusa Siaga

**Petualangan Mitigasi Tsunami.** Jelajahi pulau, kuasai mitigasi, selamatkan diri.

Game edukasi berbasis web tentang **mitigasi bencana tsunami**. Pemain ditemani **Tuti si Penyu**, menjelajahi 3 pulau, dan menyelesaikan 15 misi tentang cara mengurangi risiko tsunami serta menyelamatkan diri.

## Isi game

**Cerita pembuka 3D.** Sembilan adegan animasi tentang definisi, penyebab, dan dampak tsunami, langkah pra-bencana, saat bencana, pascabencana, dan mitigasi.

| Pulau | Tema | Misi |
|---|---|---|
| 1. Pulau Benteng | Mitigasi struktural | Kenali Bangunan Pelindung, Tanam Sabuk Mangrove, Susun Benteng Pantai, Kuis Insinyur Pantai |
| 2. Pulau Siaga Warga | Mitigasi non-struktural | Rantai Peringatan Dini, Atur Tata Ruang Pesisir, Baca Peta Evakuasi, Latihan Evakuasi Rutin, Kuis Duta Edukasi |
| 3. Pulau Tanggap | Sebelum, saat, dan sesudah tsunami | Kenali Tanda Alam, Siapkan Tas Siaga, Cari Jalur Evakuasi, Saat Gempa Terjadi, Lari ke Bukit, Setelah Gelombang |

- Setiap misi memberi 3 nyawa, dan sisa nyawa menjadi jumlah bintang (maksimal 45 bintang).
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
| `game.js` | Data pulau dan misi, serta seluruh logika permainan |

## Sumber materi

- Presentasi *Tsunami Awareness: Understanding, Preparing, and Staying Safe* (UPN "Veteran" Yogyakarta).
- Panduan umum kesiapsiagaan tsunami dari BMKG dan BNPB.

Cocokkan kembali materi dengan sumber resmi sebelum dipakai untuk pembelajaran formal.
