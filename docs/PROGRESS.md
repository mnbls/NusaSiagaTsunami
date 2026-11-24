# Progres Nusa Siaga

Perbarui berkas ini setiap selesai satu pekerjaan: isi **Status sekarang**, tambah baris di **Riwayat**, dan rapikan **Berikutnya**.

## Status sekarang (24 November 2026, diperbarui)

- 8 pulau, masing-masing menampilkan 5 misi (40 misi, 120 bintang). 37 misi lain disembunyikan, tidak dihapus. Lihat `docs/LEVELS.md`.
- Pemain wajib membuat akun **username + kata sandi** sebelum masuk peta dan bermain misi. Login Google dimatikan (kodenya disimpan, `AUTH_GOOGLE = false`). Papan peringkat online realtime aktif lewat Firebase.
- Suara Tuti memakai suara bawaan browser: Google Bahasa Indonesia di Chrome, Gadis Natural di Edge. Jalur MP3 suara AI sudah ada tetapi belum diisi.
- Situs: https://mnbls.github.io/NusaSiagaTsunami/

## Fitur yang sudah jadi

| Bagian | Isi |
|---|---|
| Permainan | 8 pulau di peta kepulauan, animasi penjelasan di awal tiap pulau, cerita pembuka 3D, 3 nyawa per misi menjadi bintang. |
| Pulau | Ilmu, Simulasi (5 simulasi tampil, penyebab tsunami), Benteng (struktural), Siaga Warga (non-struktural), Tanggap, Pulih (pascabencana), Sejarah, Juara (ujian akhir). |
| Ramah anak | Tuti bicara otomatis, tombol dengarkan, mode santai tanpa batas waktu, mode usia 9–10, petunjuk setelah 2 kesalahan, catatan penenang. |
| Sertifikat | Per pulau, Jalur Inti, dan Pahlawan Siaga (semua misi tampil tuntas). |
| Pengolahan informasi (SIMB) | Tes Siaga awal (A) dan akhir (B), Laporan Belajar per siswa, Laporan Kelas dengan unduhan CSV, profil banyak siswa di satu perangkat. |
| Online | Firebase Auth (username + kata sandi; Google disimpan tetapi dimatikan), Firestore `users/{uid}` dan `leaderboard/{uid}`, papan peringkat realtime, aturan keamanan terbit. |
| Suara | Mute mematikan musik, efek, dan suara Tuti. Jalur MP3 per kalimat dengan cadangan suara browser; skrip `tools/make-voice.mjs` mendukung Azure dan Google. |

## Keputusan penting

- **Database**: Firebase (Spark, gratis). Proyek `nusa-siaga-bencanusa-siagana`. ID proyek tidak bisa diganti; nama tampilan boleh diganti di Project settings.
- **Suara AI**: dibatalkan pemilik (tidak punya kartu kredit untuk Google Cloud; pendaftaran Azure for Students tidak dilanjutkan). Game tetap memakai suara browser.
- **Aplikasi Android**: dibatalkan pemilik. Tidak ada file Android di repo.
- **Jumlah misi**: 5 per pulau, utamakan game interaktif, kuis dibatasi. Misi lain disembunyikan lewat `HIDDEN_LEVELS`.

## Riwayat

| Tanggal | Perubahan |
|---|---|
| sebelum 18 Nov 2026 | Game dasar, peta pulau, animasi penjelasan, 8 pulau 77 misi, papan peringkat latihan, Pulau Simulasi, profil, laporan, Tes Siaga, sertifikat inti, mode usia 9–10, narasi Tuti. |
| 18 Nov 2026 | Sertifikat per pulau. Login Google/email dan papan peringkat online (Firebase) aktif. Suara Google Bahasa Indonesia dengan nada lebih jelas. |
| 18 Nov 2026 | Tombol mute ikut mematikan suara Tuti. Jalur MP3 suara AI (belum diisi). |
| 24 Nov 2026 | Dokumen progres dan panduan pengembangan dibuat. Tiap pulau menjadi 5 misi; misi lain disembunyikan. Jalur Inti 16 misi. |
| 24 Nov 2026 | Login Google dimatikan (kode disimpan). Akun wajib dengan username + kata sandi sebelum bermain. Daftar pemain tamu di perangkat disembunyikan selama layanan online aktif. |
| 24 Nov 2026 | Tombol **Kembali** dan **Beranda** di bilah atas semua layar (kecuali beranda). Kembali mengikuti riwayat layar (navStack). |

## Berikutnya (usulan)

- Uji daftar dan masuk dengan akun sungguhan di situs (belum dicoba dengan akun asli).
- Laporan Kelas memakai profil di satu perangkat; dengan akun wajib, laporan kelas sebaiknya diambil dari Firestore (perlu akun guru dan aturan baca khusus).
- Tombol **Usia 9–10 tahun** di beranda sekarang tidak berpengaruh: satu-satunya soal yang disaringnya ada di misi b5 (disembunyikan). Putuskan: sembunyikan tombolnya, atau terapkan ke misi yang tampil.
- Tambah game interaktif baru untuk pulau yang masih banyak kartu, misalnya simulasi evakuasi berwaktu di Pulau Pulih.
- Bila suatu saat ada akun Azure atau Google Cloud: jalankan `tools/make-voice.mjs` (langkah di README) untuk suara AI.
- Uji coba dengan anak kelas 4–6 lalu catat misi yang paling sering gagal (lihat Laporan Kelas).
