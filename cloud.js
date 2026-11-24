/* Nusa Siaga — login dan database online.
   Login: Firebase Authentication (Google atau email + kata sandi).
   Database: Cloud Firestore.
     users/{uid}        progres pribadi (bintang, statistik, tes); hanya pemiliknya yang bisa membaca dan menulis.
     leaderboard/{uid}  nama tampilan, kelas, bintang, misi tuntas; semua orang bisa membaca (papan peringkat).
   Papan peringkat memakai onSnapshot, jadi berubah langsung (realtime) saat pemain lain mendapat bintang.
   game.js berkomunikasi lewat window.SiagaCloud dan event 'siaga-cloud'. */

const SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
const cfg = window.SIAGA_FIREBASE_CONFIG;

const state = { enabled: false, ready: false, user: null, board: [], error: '', saving: false, lastSaved: 0 };
const emit = type => window.dispatchEvent(new CustomEvent('siaga-cloud', { detail: { type } }));
const off = () => Promise.reject(new Error('Login online belum diaktifkan.'));

const api = {
  state,
  get enabled() { return state.enabled; },
  get user() { return state.user; },
  get board() { return state.board; },
  signInGoogle: off,
  signInEmail: off,
  signUpEmail: off,
  resetPassword: off,
  signOut: off,
  loadProgress: async () => null,
  saveProgress: () => {}
};
window.SiagaCloud = api;

// Pesan kesalahan Firebase yang sering muncul, dalam bahasa yang mudah dipahami.
const ERRORS = {
  'auth/invalid-email': 'Username tidak valid. Pakai huruf kecil, angka, titik, atau garis bawah.',
  'auth/missing-password': 'Kata sandi belum diisi.',
  'auth/weak-password': 'Kata sandi minimal 6 karakter.',
  'auth/email-already-in-use': 'Username ini sudah dipakai. Pilih username lain, atau pilih Masuk kalau itu akunmu.',
  'auth/invalid-credential': 'Username atau kata sandi salah.',
  'auth/wrong-password': 'Username atau kata sandi salah.',
  'auth/user-not-found': 'Username belum terdaftar. Pilih Daftar untuk membuat akun.',
  'auth/too-many-requests': 'Terlalu banyak percobaan. Tunggu sebentar, lalu coba lagi.',
  'auth/popup-closed-by-user': 'Jendela login ditutup sebelum selesai.',
  'auth/popup-blocked': 'Jendela login diblokir browser. Izinkan pop-up untuk situs ini.',
  'auth/unauthorized-domain': 'Domain ini belum diizinkan di Firebase (Authentication > Settings > Authorized domains).',
  'auth/network-request-failed': 'Tidak ada koneksi internet.',
  'permission-denied': 'Data ditolak oleh aturan keamanan database.'
};
api.errorText = e => {
  const code = (e && e.code) || '';
  if (code.startsWith('auth/api-key-not-valid') || code === 'auth/invalid-api-key') return 'Konfigurasi Firebase belum benar. Periksa apiKey di firebase-config.js.';
  if (code === 'auth/operation-not-allowed') return 'Cara login ini belum diaktifkan di Firebase (Authentication > Sign-in method).';
  return ERRORS[code] || (e && e.message) || 'Terjadi kesalahan.';
};

if (cfg && cfg.apiKey && cfg.projectId) {
  try {
    const [{ initializeApp }, A, F] = await Promise.all([
      import(SDK + 'firebase-app.js'),
      import(SDK + 'firebase-auth.js'),
      import(SDK + 'firebase-firestore.js')
    ]);
    const app = initializeApp(cfg);
    const auth = A.getAuth(app);
    const db = F.getFirestore(app);
    state.enabled = true;

    A.onAuthStateChanged(auth, u => {
      state.user = u ? { uid: u.uid, name: u.displayName || (u.email || '').split('@')[0], email: u.email || '' } : null;
      state.ready = true;
      emit('auth');
    });

    // Papan peringkat realtime: 20 pemain dengan bintang terbanyak.
    F.onSnapshot(
      F.query(F.collection(db, 'leaderboard'), F.orderBy('stars', 'desc'), F.limit(20)),
      snap => { state.board = snap.docs.map(d => ({ uid: d.id, ...d.data() })); emit('board'); },
      err => { state.error = api.errorText(err); emit('error'); }
    );

    api.signInGoogle = () => A.signInWithPopup(auth, new A.GoogleAuthProvider());
    api.signInEmail = (email, pass) => A.signInWithEmailAndPassword(auth, email, pass);
    api.signUpEmail = async (email, pass, name) => {
      const cred = await A.createUserWithEmailAndPassword(auth, email, pass);
      if (name) {
        await A.updateProfile(cred.user, { displayName: name });
        state.user = { uid: cred.user.uid, name, email };
        emit('auth');
      }
      return cred;
    };
    api.resetPassword = email => A.sendPasswordResetEmail(auth, email);
    api.signOut = async () => { await flush(); return A.signOut(auth); };

    api.loadProgress = async () => {
      if (!auth.currentUser) return null;
      const snap = await F.getDoc(F.doc(db, 'users', auth.currentUser.uid));
      return snap.exists() ? snap.data() : null;
    };

    // Simpan tidak setiap ketukan: ditunda 1,5 detik supaya hemat kuota.
    let timer = 0, pending = null;
    api.saveProgress = data => {
      pending = data;
      clearTimeout(timer);
      timer = setTimeout(flush, 1500);
    };
    async function flush() {
      clearTimeout(timer);
      const u = auth.currentUser;
      if (!u || !pending) return;
      const d = pending;
      pending = null;
      state.saving = true;
      emit('saving');
      try {
        await F.setDoc(F.doc(db, 'users', u.uid), { ...d.progress, updatedAt: F.serverTimestamp() });
        await F.setDoc(F.doc(db, 'leaderboard', u.uid), {
          name: d.name, cls: d.cls, stars: d.stars, done: d.done, updatedAt: F.serverTimestamp()
        });
        state.lastSaved = Date.now();
        state.error = '';
        emit('saved');
      } catch (e) {
        state.error = api.errorText(e);
        emit('error');
      } finally {
        state.saving = false;
      }
    }
    // Saat tab ditutup atau disembunyikan, coba kirim simpanan yang masih tertunda.
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
  } catch (e) {
    state.error = 'Gagal memuat layanan online. Periksa koneksi internet.';
    console.warn('[Nusa Siaga] Firebase:', e);
  }
}
state.ready = state.ready || !state.enabled;
emit('init');
