/* Nusa Siaga — konfigurasi Firebase untuk login dan database online.
   Isi dengan konfigurasi dari Firebase Console > Project settings > Your apps > Web app.
   Konfigurasi web Firebase memang dipakai di browser dan bukan kata sandi rahasia;
   yang menjaga data adalah aturan keamanan di firestore.rules.
   Selama nilainya null, game tetap berjalan tanpa login (mode tamu, data di perangkat saja).
   Panduan lengkap: SETUP-FIREBASE.md */
window.SIAGA_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyArTuDgT4HTVQ2DviMZKCAAWdygygZ9Pl0',
  authDomain: 'nusa-siaga-bencanusa-siagana.firebaseapp.com',
  projectId: 'nusa-siaga-bencanusa-siagana',
  storageBucket: 'nusa-siaga-bencanusa-siagana.firebasestorage.app',
  messagingSenderId: '503942247131',
  appId: '1:503942247131:web:05e7d584b48c5baa5452fe'
};

/* Contoh bentuknya (ganti dengan milikmu, jangan pakai nilai contoh ini):
window.SIAGA_FIREBASE_CONFIG = {
  apiKey: 'AIza...',
  authDomain: 'nama-proyek.firebaseapp.com',
  projectId: 'nama-proyek',
  appId: '1:1234567890:web:abcdef'
};
*/
