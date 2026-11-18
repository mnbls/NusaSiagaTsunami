# Mengaktifkan Login dan Database Online (Firebase)

Nusa Siaga memakai **Firebase** dari Google:

- **Firebase Authentication** untuk login dengan **Google** atau **email dan kata sandi**.
- **Cloud Firestore** sebagai database. Papan peringkat memakai pembaruan *realtime*, jadi bintang pemain lain langsung muncul tanpa memuat ulang halaman.

Selama `firebase-config.js` belum diisi, game tetap berjalan dalam **mode tamu**: progres hanya tersimpan di perangkat dan papan peringkat memakai tokoh latihan.

Paket gratis Firebase (Spark) cukup untuk tugas kuliah dan uji coba satu kelas. Cek batas terbarunya di https://firebase.google.com/pricing.

## 1. Buat proyek Firebase

1. Buka https://console.firebase.google.com lalu masuk dengan akun Google.
2. Pilih **Create a project** (Buat proyek), beri nama, misalnya `nusa-siaga`.
3. Google Analytics boleh dimatikan.

## 2. Daftarkan aplikasi web

1. Di halaman proyek, pilih ikon **Web** (`</>`).
2. Isi nama aplikasi, misalnya `Nusa Siaga`. *Firebase Hosting* tidak perlu dicentang karena game ini sudah di GitHub Pages.
3. Firebase menampilkan objek `firebaseConfig`. Salin nilai `apiKey`, `authDomain`, `projectId`, dan `appId`.
4. Buka `firebase-config.js` di folder game, lalu ganti `null` dengan konfigurasi itu:

```js
window.SIAGA_FIREBASE_CONFIG = {
  apiKey: '...',
  authDomain: 'nusa-siaga.firebaseapp.com',
  projectId: 'nusa-siaga',
  appId: '...'
};
```

Konfigurasi web ini memang dirancang untuk dipakai di browser dan boleh ikut di-push ke GitHub. Yang menjaga data adalah aturan keamanan di langkah 4.

## 3. Aktifkan login

1. Menu **Build > Authentication > Get started**.
2. Tab **Sign-in method**:
   - **Google**: aktifkan, pilih email dukungan proyek, simpan.
   - **Email/Password**: aktifkan (bagian *Email link* tidak perlu).
3. Tab **Settings > Authorized domains**: pastikan ada
   - `localhost` (untuk mencoba di laptop)
   - `mnbls.github.io` (alamat GitHub Pages)

## 4. Buat database dan pasang aturan keamanan

1. Menu **Build > Firestore Database > Create database**.
2. Pilih lokasi yang dekat, misalnya `asia-southeast2 (Jakarta)`. Lokasi tidak bisa diubah setelah dibuat.
3. Pilih **Start in production mode**.
4. Buka tab **Rules**, hapus isinya, tempel seluruh isi berkas `firestore.rules` dari folder game, lalu tekan **Publish**.

Aturan itu mengatur:

| Data | Siapa yang boleh membaca | Siapa yang boleh menulis |
|---|---|---|
| `users/{uid}`: progres pribadi (bintang, tes, statistik) | Hanya pemilik akun | Hanya pemilik akun |
| `leaderboard/{uid}`: nama tampilan, kelas, bintang, misi tuntas | Semua orang, termasuk tamu | Hanya pemilik akun, dengan isi yang dibatasi |

## 5. Coba

1. Jalankan game di laptop (`http://localhost:...`) atau push ke GitHub lalu buka GitHub Pages.
2. Di layar **Siapa yang bermain?** akan muncul tombol **Masuk dengan Google** dan formulir email.
3. Masuk, mainkan satu misi, lalu buka **Peta Kepulauan**. Namamu muncul di **Papan Peringkat Online** dengan tanda merah *langsung*.
4. Buka game di perangkat atau browser lain dengan akun lain. Saat salah satu mendapat bintang, papan peringkat di perangkat lain ikut berubah tanpa memuat ulang.

## Catatan penting

- **Anak di bawah 13 tahun.** Akun Google pribadi untuk anak di bawah 13 tahun hanya bisa lewat Family Link orang tua. Untuk kelas, lebih mudah guru membuatkan akun **email dan kata sandi**, atau anak bermain sebagai tamu.
- **Data yang tampil ke publik** hanya nama tampilan, kelas, jumlah bintang, dan jumlah misi tuntas. Email dan progres rinci tidak pernah ditampilkan.
- **Keluar** di perangkat bersama menghapus salinan data akun dari perangkat itu. Datanya tetap aman di database dan kembali saat masuk lagi.
- **Kecurangan.** Bintang dihitung di perangkat pemain, jadi pemain yang paham teknis bisa mengirim angka palsu (dibatasi aturan maksimal 300). Untuk tugas kuliah ini wajar; untuk lomba sungguhan, penilaian perlu dipindah ke server (Cloud Functions).
- **Pop-up login Google diblokir?** Izinkan pop-up untuk situs game di pengaturan browser.
