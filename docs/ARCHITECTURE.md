# Arsitektur Nusa Siaga

Web statis: HTML, CSS, dan JavaScript biasa tanpa build. Semua logika permainan di `game.js` (satu IIFE).

## File

| File | Isi |
|---|---|
| `index.html` | Kerangka halaman. Urutan skrip: `vendor/three.min.js` (cadangan CDN), `icons.js`, `intro.js`, `explain.js`, `music.js`, `audio/voice/manifest.js`, `firebase-config.js`, `game.js`, lalu `cloud.js` (module). |
| `game.js` | Data pulau dan misi, mesin game, layar, simpanan, suara, tes, laporan, profil, akun online. |
| `style.css` | Seluruh tampilan. |
| `icons.js` | Ikon dan ilustrasi SVG (`window.SiagaIcons`: `svg`, `image`, `art`). |
| `intro.js` | Cerita pembuka 3D (Three.js r128), 9 adegan (`window.SiagaIntro`). |
| `explain.js` | Animasi penjelasan di awal tiap pulau (`window.SiagaExplain`, data di `ISLAND_DATA`). |
| `music.js` | Musik latar Web Audio (`window.SiagaMusic`: `play`, `stop`, `mood`). |
| `cloud.js` | Firebase Auth + Firestore (`window.SiagaCloud`, event `siaga-cloud`). |
| `firebase-config.js` | Konfigurasi web Firebase (publik, bukan rahasia). |
| `firestore.rules` | Aturan keamanan Firestore (sudah diterbitkan di Console). |
| `audio/voice/manifest.js` | Daftar MP3 suara Tuti. Saat ini kosong, jadi game memakai suara browser. |
| `tools/make-voice.mjs` | Pembuat MP3 suara AI (Azure atau Google). Butuh kunci API; belum dipakai. |

## Peta `game.js`

Cari penanda dengan Grep, misalnya `Grep "Mesin simulasi" game.js`.

| Penanda / nama | Isi |
|---|---|
| `Data pulau & level` | `ISLANDS` (8 pulau) dan `*_LEVELS` per pulau. |
| `ALL_LEVELS`, `HIDDEN_LEVELS`, `LEVELS` | Semua misi, misi yang disembunyikan, dan misi yang tampil. |
| `Materi tambahan`, `Pulau Pulih`, `Pulau Sejarah`, `Pulau Juara` | Data soal dan kartu untuk mesin game. |
| `const PLAY = {` | Peta `type` misi ke fungsi mesin game. |
| `Simpanan & suara` | `store`, `save`, `useProfile`, `persist`, efek bunyi `sfx`. |
| `Layar` | `showHome`, `showMap`, `showIsland`, `startLevel`, `winLevel`, `failLevel`, sertifikat (`certInfo`, `showCert`). |
| `Mesin "pasangkan"` dst. | Mesin game. Lihat daftar di bawah. |
| `Pendukung belajar anak` | `CORE` (Jalur Inti), `GENTLE` (catatan penenang). |
| `Narasi suara Tuti` | `SAY` (kalimat Tuti), `speak`, `autoSay`, antrean MP3 dengan cadangan Web Speech, `voiceCorpus`. |
| `Tes Siaga` | `TEST_A` (tes awal), `TEST_B` (tes akhir), `topicScores`. |
| `Laporan Belajar`, `Laporan Kelas` | Pengolahan data untuk guru, unduhan CSV. |
| `Profil siswa` | Banyak pemain di satu perangkat. |
| `Akun online` | Penghubung ke `cloud.js`: `AUTH_GOOGLE`, `REQUIRE_ACCOUNT`, `USER_DOMAIN`, login username, `pushCloud`, `mergeProgress`, papan peringkat online. |
| `Mulai` | Boot: tombol suara, sentuhan pertama, layar awal. |

## Mesin game

| Fungsi | Cara main | Interaktif |
|---|---|---|
| `playSim` | Atur kontrol (magnitudo, kedalaman, dll.), lihat animasi dan hitungan | tinggi |
| `playLab` | Lab gempa: atur gempa sampai memicu tsunami | tinggi |
| `playRunner` | Lari menghindari rintangan (malam: `night: true`) | tinggi |
| `playRoute` | Jalan di peta grid menuju titik aman | tinggi |
| `playMangrove`, `playBuilder`, `playBag` | Tanam mangrove, susun benteng, isi tas siaga | tinggi |
| `playSequence` | Susun urutan langkah (bisa berwaktu) | sedang |
| `playMatch` | Pasangkan kiri dan kanan | sedang |
| `playSort` | Pilah kartu ke dua pilihan | sedang |
| `playPick` | Ketuk semua kartu yang benar | sedang |
| `playQuiz` | Kuis pilihan ganda (bisa berwaktu) | rendah |

## Menambah atau mengubah misi

1. Tambahkan objek misi di daftar `*_LEVELS` pulau yang sesuai: `id`, `type`, `icon`, `title`, `mission`, `how` (langkah), `recap` (3 poin ingatan).
2. Tambahkan `type` baru ke `PLAY` bila perlu, beserta datanya.
3. Kalau misi tidak ingin ditampilkan, masukkan id-nya ke `HIDDEN_LEVELS`. Jangan hapus objeknya.
4. Perbarui `docs/LEVELS.md` dan, bila jumlah berubah, `README.md`.

Jumlah bintang maksimal, nomor misi, kelengkapan pulau, sertifikat, laporan, dan papan peringkat dihitung dari `LEVELS` (misi yang tampil), jadi otomatis menyesuaikan.

## Simpanan

localStorage `siaga-tsunami-v1`:

```
{ v: 2, current, profiles: { id: { name, cls, stars, explained, stats, tests } },
  settings: { sound, relaxed, introSeen, young, talk } }
```

`save` adalah gabungan profil aktif dan pengaturan. Profil berawalan `g_` adalah salinan akun online. Bintang misi yang disembunyikan tetap tersimpan, hanya tidak dihitung.

## Firebase

Proyek `nusa-siaga-bencanusa-siagana` (paket Spark gratis). Auth Email/Password dipakai untuk username: `username@pemain.nusasiaga.id` (alamat buatan, tidak pernah dikirimi email). Google masih aktif di Console tetapi tombolnya disembunyikan (`AUTH_GOOGLE`). Akun wajib diatur `REQUIRE_ACCOUNT`; penjaganya `needAccount()` di `showMap`, `startLevel`, dan tombol Main. Firestore lokasi Jakarta:
`users/{uid}` progres pribadi, `leaderboard/{uid}` nama, kelas, bintang, misi tuntas. Domain yang diizinkan: `localhost`, `mnbls.github.io`.
