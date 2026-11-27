# Nusa Siaga

**Petualangan Mitigasi Tsunami.** Jelajahi pulau, kuasai mitigasi, selamatkan diri.

Game edukasi berbasis web tentang **mitigasi bencana tsunami**. Pemain ditemani **Tuti si Penyu**, menjelajahi 8 pulau, dan menyelesaikan 40 misi (5 per pulau, mengutamakan game interaktif): mulai dari mengenal tsunami, cara mengurangi risikonya, cara menyelamatkan diri, pemulihan setelah bencana, sejarah tsunami Indonesia, simulasi penyebab tsunami, sampai ujian akhir.

## Isi game

**Cerita pembuka 3D.** Sembilan adegan animasi tentang definisi, penyebab, dan dampak tsunami, langkah pra-bencana, saat bencana, pascabencana, dan mitigasi.

**Animasi penjelasan di awal tiap pulau.** Sebelum misi pertama dibuka, pemain melihat 3–4 slide beranimasi yang menerangkan topik pulau itu: penyebab dan tanda tsunami (Pulau Ilmu), pelindung pantai, bangunan tahan gempa, dan menara evakuasi (Pulau Benteng), peringatan dini, peta evakuasi, latihan, dan info resmi (Pulau Siaga Warga), tas siaga, lari ke tempat tinggi, dan menunggu kabar resmi (Pulau Tanggap), tahap pemulihan dan posko pengungsian (Pulau Pulih), garis waktu dan pelajaran sejarah (Pulau Sejarah), empat penyebab dan rumus kecepatan gelombang (Pulau Simulasi), serta gambaran ujian akhir dan sertifikat (Pulau Juara). Animasi tampil otomatis sekali per pulau dan bisa diputar ulang lewat tombol **Animasi penjelasan** di halaman pulau.

| Pulau | Tema | Misi |
|---|---|---|
| 1. Pulau Ilmu | Mengenal tsunami | Apa Itu Tsunami?, Proses Terjadinya Tsunami, Detektif Penyebab, Lab Gempa Pemicu, Laut Dalam vs Pantai |
| 2. Pulau Simulasi | Simulasi penyebab tsunami | Simulasi Gempa Tektonik, Simulasi Letusan Gunung Api, Simulasi Longsor Bawah Laut, Simulasi Hantaman Meteor, Simulasi Waktu Tiba dan Evakuasi |
| 3. Pulau Benteng | Mitigasi struktural | Kenali Bangunan Pelindung, Tanam Sabuk Mangrove, Susun Benteng Pantai, Rumah Tahan Gempa, Lari ke Menara Evakuasi |
| 4. Pulau Siaga Warga | Mitigasi non-struktural | Rantai Peringatan Dini, Latihan Evakuasi Rutin, Kenali Rambu Evakuasi, Resmi atau Hoaks?, Evakuasi dari Sekolah |
| 5. Pulau Tanggap | Sebelum, saat, dan sesudah tsunami | Kenali Tanda Alam, Siapkan Tas Siaga, Cari Jalur Evakuasi, Lari ke Bukit, Ujian Tanggap Darurat |
| 6. Pulau Pulih | Pascabencana dan pemulihan | Tahapan Pemulihan, Kebutuhan Posko Pengungsian, Aman atau Bahaya?, Pulihkan Hati, Bersih-Bersih Aman |
| 7. Pulau Sejarah | Jejak tsunami Indonesia | Garis Waktu Tsunami, Peristiwa dan Pemicunya, Kisah Smong Simeulue, Fakta atau Mitos?, Pelajaran Tiap Peristiwa |
| 8. Pulau Juara | Ujian akhir | Struktural atau Non-Struktural?, Urutan Selamat, Lari ke Bukit: Final, Rute Evakuasi Final, Ujian Pahlawan Siaga |

37 misi lain (kebanyakan kuis) disimpan di kode tetapi tidak ditampilkan. Daftar lengkap dan cara menampilkannya lagi ada di [docs/LEVELS.md](docs/LEVELS.md).

- Setiap misi memberi 3 nyawa, dan sisa nyawa menjadi jumlah bintang (maksimal 120 bintang).
- Papan peringkat latihan di Peta Kepulauan menampilkan bintangmu bersama tokoh latihan. Selama misi belum tuntas, peringkat 1 selalu 3 bintang di atasmu. Setelah semua misi tuntas, kamu menjadi juara satu.
- Setiap jawaban disertai penjelasan, dan setiap misi ditutup dengan rangkuman.
- Pulau Simulasi berisi 5 simulasi interaktif: pemain mengatur kontrol (magnitudo, kedalaman, kekuatan letusan, kemiringan lereng, ukuran meteor, jarak) lalu melihat animasi dan perhitungan. Kecepatan gelombang memakai rumus perairan dangkal akar(9,81 × kedalaman), dan tingginya memakai hukum Green yang disederhanakan.
- Setelah semua pulau tuntas, pemain bisa mencetak sertifikat.
- **Jalur Inti**: 16 misi bertanda *Inti* adalah jalur wajib untuk 1–2 kali pelajaran di kelas. Misi lain adalah bonus.
- **Tuti bicara**: Tuti si Penyu membacakan secara otomatis dengan suara Google Bahasa Indonesia yang pelafalannya jelas (tempo sedikit pelan supaya mudah diikuti anak; di browser tanpa suara Google dipakai suara Indonesia lain di perangkat): sambutan, pilih pemain, peta, cara bermain tiap misi, soal dan kartu, umpan balik, petunjuk, hasil menang atau gagal, hasil simulasi, cerita pembuka, animasi penjelasan, dan sertifikat. Suara mulai setelah layar pertama kali disentuh (aturan browser), berhenti saat anak mengetuk, dan bisa dimatikan lewat tombol *Tuti bicara* di beranda.
- **Ramah anak**: tombol speaker kuning membacakan ulang soal dan penjelasan, kuis berwaktu memberi waktu baca 5 detik, dan *Mode santai* di beranda mematikan semua batas waktu. Setelah dua kesalahan, Tuti memberi petunjuk. Misi yang membahas korban atau kehilangan diawali catatan penenang.
- **Medali dan film penutup**: setiap kali satu pulau tuntas, muncul upacara medali dengan nama pemain (tokoh anak di podium, medali jatuh ke lehernya, konfeti). Setelah misi terakhir di Pulau Juara, diputar film cerita 9 adegan "Kisah [nama], Pahlawan Siaga": gempa, air surut, sirene, lari ke bukit, selamat, pemulihan, dan penobatan. Medali dan film bisa diputar ulang dari halaman pulau.
- **Sertifikat per pulau**: setiap pulau yang tuntas langsung memberi sertifikat pulau itu, tanpa harus menunggu semua misi selesai. Koleksi sertifikat (8 pulau, Jalur Inti, dan Pahlawan Siaga) tampil di Peta Kepulauan dan bisa dicetak.
- **Akun wajib (username + kata sandi)**: sebelum masuk peta dan bermain misi, pemain membuat akun dengan username dan kata sandi (lewat Firebase Authentication), jadi levelnya tersimpan di Cloud Firestore dan bisa dilanjutkan di perangkat mana saja. Papan Peringkat Online berubah langsung (realtime). Login Google disimpan di kode tetapi dimatikan (`AUTH_GOOGLE` di `game.js`). Kalau layanan online tidak tersedia, misalnya tanpa internet, game tetap bisa dimainkan sebagai tamu. Lupa kata sandi diatur ulang oleh pengelola di Firebase Console. Panduan Firebase: [SETUP-FIREBASE.md](SETUP-FIREBASE.md).
- **Profil siswa**: beberapa siswa bisa bermain bergantian di satu perangkat. Bintang, tes, dan laporan disimpan per siswa. Simpanan versi lama otomatis menjadi profil pertama.
- **Tes Siaga dan Laporan Belajar** (pengolahan informasi untuk guru): tes awal (paket A) dan tes akhir (paket B) masing-masing 8 soal dengan topik setara, kenaikan skor per topik, rekap penguasaan per pulau, misi yang perlu diulang, kenaikan skor, serta unduhan CSV dan cetak. **Laporan Kelas** merekap semua siswa di perangkat (rata-rata tes awal, tes akhir, kenaikan, dan misi yang paling banyak salah) dengan unduhan CSV kelas. Tes Akhir terbuka setelah Tes Awal dan semua misi Jalur Inti tuntas. Semua data tersimpan di perangkat, tanpa server.
- **Sertifikat Jalur Inti** terbuka setelah 16 misi Inti tuntas. Pulau Juara terbuka setelah semua misi Inti tuntas atau 4 pulau lain tuntas.
- **Mode usia 9–10 tahun** di beranda menyembunyikan soal yang terlalu berat untuk anak kelas 4 (radiasi nuklir).
- Progres tersimpan otomatis di browser.

## Cara menjalankan

**Tanpa internet (opsional):** simpan berkas `three.min.js` (Three.js r128) di folder `vendor/`. Game memakai salinan lokal itu kalau ada, dan mengambil dari CDN kalau tidak ada. Tanpa internet dan tanpa salinan lokal, game tetap jalan dengan font cadangan dan cerita pembuka tanpa 3D.

Tidak perlu instalasi atau proses build.

- **Online:** buka halaman GitHub Pages repo ini.
- **Lokal:** buka `index.html` di browser (Chrome, Edge, atau Firefox).

Pada kunjungan pertama dibutuhkan internet untuk memuat font Fredoka dan Three.js r128 (untuk cerita 3D) dari CDN.

## Untuk pengembang

Mulai dari [CLAUDE.md](CLAUDE.md), lalu [docs/PROGRESS.md](docs/PROGRESS.md) (status dan rencana), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) (peta kode), dan [docs/LEVELS.md](docs/LEVELS.md) (katalog misi).

## Struktur file

| File | Isi |
|---|---|
| `index.html` | Halaman utama |
| `style.css` | Tampilan bergaya kartun dan tata letak responsif |
| `icons.js` | Ikon dan ilustrasi SVG buatan sendiri |
| `intro.js` | Cerita pembuka dengan dunia 3D (Three.js) |
| `explain.js` | Animasi penjelasan di awal tiap pulau (SVG + CSS, tanpa pustaka tambahan) |
| `celebrate.js` | Upacara medali pulau dan film cerita penutup (SVG + animasi CSS) |
| `music.js` | Musik latar yang disusun langsung dengan Web Audio (tanpa file lagu) |
| `game.js` | Data pulau dan misi, serta seluruh logika permainan |
| `cloud.js` | Login (Google/email) dan database online Firebase, termasuk papan peringkat realtime |
| `firebase-config.js` | Konfigurasi proyek Firebase (kosong = mode tamu) |
| `firestore.rules` | Aturan keamanan database untuk ditempel di Firebase Console |
| `audio/voice/` | MP3 suara Tuti (suara AI), satu file per kalimat, dan `manifest.js` daftarnya |
| `tools/make-voice.mjs` | Pembuat MP3 suara Tuti dari Azure AI Speech (atau Google Cloud Text-to-Speech) |

## Suara Tuti (suara AI)

Tuti membacakan teks dari file MP3 suara AI yang lebih manusiawi (Azure AI Speech, suara Gadis Neural dengan nada sedikit dinaikkan supaya ceria). Kalimat yang belum punya MP3 (misalnya yang memuat nama pemain) dibacakan suara bawaan browser.

1. Buat resource **Speech** (tier Free F0) di Azure, lalu simpan di `tools/azure-speech.txt`: baris 1 KEY 1, baris 2 region (misalnya `southeastasia`). Berkas ini diabaikan git. Sebagai alternatif, kunci Google Cloud Text-to-Speech bisa disimpan di `tools/tts-key.txt`.
2. `node tools/make-voice.mjs sample` membuat contoh beberapa gaya suara di `tools/voice-samples/` untuk dipilih.
3. `node tools/make-voice.mjs serve`, buka http://localhost:5175, lalu jalankan `SiagaVoice.exportCorpus()` di konsol browser.
4. `node tools/make-voice.mjs build --pitch +8% --rate +4%` membuat MP3 semua kalimat.

Ulangi langkah 3–4 setiap kali teks game berubah. Kalimat yang sudah punya MP3 dilewati, jadi kuota tidak terbuang.

## Sumber materi

- Presentasi *Tsunami Awareness: Understanding, Preparing, and Staying Safe* (UPN "Veteran" Yogyakarta).
- Panduan umum kesiapsiagaan tsunami dari BMKG dan BNPB.
- UU No. 24 Tahun 2007 tentang Penanggulangan Bencana (Pasal 57–59: rehabilitasi dan rekonstruksi).

Cocokkan kembali materi dengan sumber resmi sebelum dipakai untuk pembelajaran formal.
