# Katalog misi

Setiap pulau menampilkan **5 misi**: 8 pulau × 5 = **40 misi**, maksimal **120 bintang**.
Misi lain tetap ada di `game.js` tetapi disembunyikan lewat `HIDDEN_LEVELS`. Untuk menampilkannya lagi, hapus id-nya dari set itu.

Pemilihan mengutamakan game interaktif. Kuis hanya dua: Kisah Smong (Pulau Sejarah) dan ujian penutup di Pulau Juara.

Keterangan: **Tampil** = muncul di game, **Inti** = Jalur Inti (wajib untuk kelas), mesin lihat `docs/ARCHITECTURE.md`.

## 1. Pulau Ilmu (`basic`)

| id | Misi | type | Mesin | Status |
|---|---|---|---|---|
| b1 | Apa Itu Tsunami? | truefalse | sort | Tampil, Inti |
| b2 | Proses Terjadinya Tsunami | formation | sequence | Tampil |
| b3 | Detektif Penyebab | causes | match | Tampil, Inti |
| b4 | Lab Gempa Pemicu | lab | lab | Tampil |
| b6 | Laut Dalam vs Pantai | deepshore | sort | Tampil, Inti |
| b5 | Kuis Dampak Tsunami | quizImpact | quiz | Disembunyikan |
| b7 | Ombak Biasa atau Tsunami? | wavetype | sort | Disembunyikan |
| b8 | Kamus Tsunami | terms | match | Disembunyikan |
| b9 | Jejak Tsunami di Indonesia | history | quiz | Disembunyikan |
| b10 | Ujian Ilmu Tsunami | examBasic | quiz | Disembunyikan |

## 2. Pulau Simulasi (`sim`)

| id | Misi | type | Mesin | Status |
|---|---|---|---|---|
| m1 | Simulasi Gempa Tektonik | simQuake | sim | Tampil, Inti |
| m2 | Simulasi Letusan Gunung Api | simVolcano | sim | Tampil |
| m3 | Simulasi Longsor Bawah Laut | simSlide | sim | Tampil |
| m4 | Simulasi Hantaman Meteor | simMeteor | sim | Tampil |
| m6 | Simulasi Waktu Tiba dan Evakuasi | simArrival | sim | Tampil, Inti |
| m5 | Simulasi Perambatan Gelombang | simSpeed | sim | Disembunyikan |

## 3. Pulau Benteng (`struct`)

| id | Misi | type | Mesin | Status |
|---|---|---|---|---|
| s1 | Kenali Bangunan Pelindung | match | match | Tampil, Inti |
| s2 | Tanam Sabuk Mangrove | mangrove | mangrove | Tampil, Inti |
| s3 | Susun Benteng Pantai | builder | builder | Tampil |
| s5 | Rumah Tahan Gempa | safehouse | pick | Tampil |
| s8 | Lari ke Menara Evakuasi | routeTower | route | Tampil |
| s4 | Kuis Insinyur Pantai | quizStruct | quiz | Disembunyikan |
| s6 | Menara Evakuasi Ideal | towerpick | pick | Disembunyikan |
| s7 | Rawat Benteng Pantai | care | sort | Disembunyikan |
| s9 | Kuis Kilat Benteng | quickStruct | quiz | Disembunyikan |
| s10 | Masalah dan Solusi | solutions | match | Disembunyikan |

## 4. Pulau Siaga Warga (`nonstruct`)

| id | Misi | type | Mesin | Status |
|---|---|---|---|---|
| n1 | Rantai Peringatan Dini | ews | sequence | Tampil, Inti |
| n4 | Latihan Evakuasi Rutin | drill | sequence (berwaktu) | Tampil |
| n6 | Kenali Rambu Evakuasi | signsmatch | match | Tampil, Inti |
| n7 | Resmi atau Hoaks? | hoax | sort | Tampil, Inti |
| n9 | Evakuasi dari Sekolah | routeSchool | route | Tampil |
| n2 | Atur Tata Ruang Pesisir | sort | sort | Disembunyikan |
| n3 | Baca Peta Evakuasi | quizMap | quiz | Disembunyikan |
| n5 | Kuis Duta Edukasi | quizEdu | quiz | Disembunyikan |
| n8 | Rencana Siaga Keluarga | familyplan | pick | Disembunyikan |
| n11 | Baca Peringatan BMKG | warnRead | quiz | Disembunyikan |
| n10 | Ujian Duta Siaga | examNonstruct | quiz | Disembunyikan |

## 5. Pulau Tanggap (`response`)

| id | Misi | type | Mesin | Status |
|---|---|---|---|---|
| 1 | Kenali Tanda Alam | signs | pick | Tampil, Inti |
| 2 | Siapkan Tas Siaga | bag | bag | Tampil, Inti |
| 3 | Cari Jalur Evakuasi | route | route | Tampil, Inti |
| 5 | Lari ke Bukit | runner | runner | Tampil, Inti |
| r10 | Ujian Tanggap Darurat | fullDrill | sequence (berwaktu) | Tampil |
| 4 | Saat Gempa Terjadi | quizQuake | quiz | Disembunyikan |
| 6 | Setelah Gelombang | quizAfter | quiz | Disembunyikan |
| r7 | Tas Siaga Keluarga | familybag | pick | Disembunyikan |
| r8 | Evakuasi Malam Hari | nightRun | runner | Disembunyikan |
| r9 | Bantu Sesama | helpQuiz | quiz | Disembunyikan |

## 6. Pulau Pulih (`recovery`)

| id | Misi | type | Mesin | Status |
|---|---|---|---|---|
| p1 | Tahapan Pemulihan | recoverySteps | sequence | Tampil |
| p2 | Kebutuhan Posko Pengungsian | shelterPick | pick | Tampil |
| p4 | Aman atau Bahaya? | afterSort | sort | Tampil, Inti |
| p6 | Pulihkan Hati | heartMatch | match | Tampil |
| p8 | Bersih-Bersih Aman | cleanPick | pick | Tampil |
| p3 | Pertolongan Pertama | firstAidQuiz | quiz | Disembunyikan |
| p5 | Air Bersih Badan Sehat | healthQuiz | quiz | Disembunyikan |
| p7 | Rehabilitasi atau Rekonstruksi? | rehabSort | sort | Disembunyikan |
| p9 | Bangun Kembali Lebih Aman | betterMatch | match | Disembunyikan |
| p10 | Ujian Pemulihan | examRecovery | quiz | Disembunyikan |

## 7. Pulau Sejarah (`history`)

| id | Misi | type | Mesin | Status |
|---|---|---|---|---|
| h1 | Garis Waktu Tsunami | timeline | sequence | Tampil |
| h2 | Peristiwa dan Pemicunya | triggerMatch | match | Tampil |
| h3 | Kisah Smong Simeulue | smongQuiz | quiz | Tampil, Inti |
| h8 | Fakta atau Mitos? | mythSort | sort | Tampil |
| h9 | Pelajaran Tiap Peristiwa | lessonMatch | match | Tampil |
| h4 | Pelajaran Pangandaran 2006 | pangandaranQuiz | quiz | Disembunyikan |
| h5 | Palu 2018 | paluQuiz | quiz | Disembunyikan |
| h6 | Selat Sunda Tanpa Gempa | sundaSort | sort | Disembunyikan |
| h7 | Lahirnya Peringatan Dini | inatewsQuiz | quiz | Disembunyikan |
| h10 | Ujian Sejarah | examHistory | quiz | Disembunyikan |

## 8. Pulau Juara (`final`)

| id | Misi | type | Mesin | Status |
|---|---|---|---|---|
| f2 | Struktural atau Non-Struktural? | finalKind | sort | Tampil |
| f4 | Urutan Selamat | finalSteps | sequence | Tampil |
| f6 | Lari ke Bukit: Final | finalRun | runner | Tampil |
| f7 | Rute Evakuasi Final | finalRoute | route | Tampil |
| f10 | Ujian Pahlawan Siaga | finalExam | quiz | Tampil |
| f1 | Pemanasan Benar-Salah | finalTf | sort | Disembunyikan |
| f3 | Kapan Dilakukan? | finalWhen | quiz | Disembunyikan |
| f5 | Kamus Siaga | finalTerms | match | Disembunyikan |
| f8 | Pilih Tindakan Terbaik | finalPick | pick | Disembunyikan |
| f9 | Kuis Kilat | finalQuick | quiz | Disembunyikan |

## Jalur Inti

16 misi: b1, b3, b6, m1, m6, s1, s2, n1, n6, n7, 1, 2, 3, 5, p4, h3.
Sebelumnya 17 misi; misi 4 dan 6 (kuis) diganti misi 5 (Lari ke Bukit) karena disembunyikan.
