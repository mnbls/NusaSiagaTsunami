/* Nusa Siaga — game edukasi mitigasi bencana tsunami (3 pulau, 15 misi). */
(() => {
  'use strict';

  /* ================= Data pulau & level ================= */

  const ISLANDS = [
    {
      id: 'struct', no: 1, name: 'Pulau Benteng', theme: 'Mitigasi Struktural', tag: 'struct', art: 'island-struct',
      desc: 'Bangunan dan alam yang melindungi pesisir: tanggul, pemecah gelombang, mangrove, bangunan tahan gempa, dan menara evakuasi.'
    },
    {
      id: 'nonstruct', no: 2, name: 'Pulau Siaga Warga', theme: 'Mitigasi Non-Struktural', tag: 'nonstruct', art: 'island-nonstruct',
      desc: 'Upaya tanpa membangun: peringatan dini, tata ruang pesisir, peta jalur evakuasi, latihan rutin, dan edukasi warga.'
    },
    {
      id: 'response', no: 3, name: 'Pulau Tanggap', theme: 'Sebelum, Saat, dan Sesudah', tag: 'pre', art: 'island-response',
      desc: 'Langkah menyelamatkan diri: kenali tanda alam, siapkan tas siaga, evakuasi, dan tetap waspada setelah gelombang.'
    }
  ];

  const STRUCT_LEVELS = [
    {
      id: 's1', island: 'struct', phaseKey: 'struct', phase: 'Mitigasi struktural', icon: 'seawall', type: 'match',
      title: 'Kenali Bangunan Pelindung',
      mission: 'Pasangkan setiap bangunan pelindung dengan fungsinya.',
      how: ['Ketuk satu bangunan, lalu ketuk fungsi yang cocok.', 'Pasangan yang salah mengurangi 1 nyawa.', 'Pasangkan kelima bangunan untuk menang!'],
      recap: [
        'Tanggul pantai memperlambat dan meredam energi gelombang.',
        'Pemecah gelombang lepas pantai memecah kekuatan gelombang sebelum mendekati pantai.',
        'Menara evakuasi vertikal menjadi tempat berlindung di wilayah yang minim dataran tinggi.'
      ]
    },
    {
      id: 's2', island: 'struct', phaseKey: 'struct', phase: 'Mitigasi struktural', icon: 'mangrove', type: 'mangrove',
      title: 'Tanam Sabuk Mangrove',
      mission: 'Tanam bibit mangrove di tempat yang tepat sampai membentuk sabuk hijau di sepanjang pesisir.',
      how: ['Ketuk kotak untuk menanam bibit mangrove.', 'Mangrove tumbuh di pesisir berlumpur yang terkena pasang-surut. Salah tempat mengurangi 1 nyawa.', 'Isi setiap kolom dengan minimal satu mangrove.'],
      recap: [
        'Hutan mangrove adalah benteng alami di wilayah pesisir.',
        'Akar mangrove membantu meredam sebagian energi gelombang.',
        'Mangrove ditanam di pesisir berlumpur yang terkena pasang-surut, bukan di laut dalam atau permukiman.'
      ]
    },
    {
      id: 's3', island: 'struct', phaseKey: 'struct', phase: 'Mitigasi struktural', icon: 'tower', type: 'builder',
      title: 'Susun Benteng Pantai',
      mission: 'Letakkan setiap bangunan pelindung di lokasi yang tepat, lalu uji dengan gelombang.',
      how: ['Pilih bangunan di bawah, lalu ketuk lokasi yang cocok.', 'Lokasi yang salah mengurangi 1 nyawa.', 'Setelah semua terpasang, tekan Uji gelombang!'],
      recap: [
        'Pemecah gelombang dipasang di laut lepas, tanggul di garis pantai.',
        'Mangrove ditanam di pesisir, bangunan tahan gempa dibangun di kawasan rumah dan sekolah.',
        'Menara evakuasi dibangun di desa datar yang jauh dari bukit.'
      ]
    },
    {
      id: 's4', island: 'struct', phaseKey: 'struct', phase: 'Mitigasi struktural', icon: 'building', type: 'quizStruct',
      title: 'Kuis Insinyur Pantai',
      mission: 'Jawab pertanyaan tentang bangunan pelindung tsunami.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Mitigasi struktural adalah upaya fisik berupa pembangunan sarana pelindung.',
        'Bangunan pesisir harus tahan gempa agar tidak roboh sebelum tsunami datang.',
        'Walau ada tanggul, warga tetap harus evakuasi saat ada tanda tsunami.'
      ]
    }
  ];

  const NONSTRUCT_LEVELS = [
    {
      id: 'n1', island: 'nonstruct', phaseKey: 'nonstruct', phase: 'Mitigasi non-struktural', icon: 'siren', type: 'ews',
      title: 'Rantai Peringatan Dini',
      mission: 'Susun urutan sistem peringatan dini tsunami, dari gempa sampai warga mengungsi.',
      how: ['Ketuk kartu sesuai urutan kejadian, mulai dari yang pertama.', 'Urutan yang salah mengurangi 1 nyawa.', 'Susun kelima langkah untuk menang!'],
      recap: [
        'Sistem peringatan dini mendeteksi potensi tsunami.',
        'Peringatan disebarkan lewat sirine, SMS, atau radio.',
        'Saat menerima peringatan, warga harus segera evakuasi.'
      ]
    },
    {
      id: 'n2', island: 'nonstruct', phaseKey: 'nonstruct', phase: 'Mitigasi non-struktural', icon: 'zoning', type: 'sort',
      title: 'Atur Tata Ruang Pesisir',
      mission: 'Bantu pemerintah desa menempatkan setiap bangunan di zona yang tepat.',
      how: ['Lihat kartu bangunan, lalu pilih Zona rawan atau Zona aman.', 'Pilihan yang salah mengurangi 1 nyawa.', 'Tempatkan semua bangunan untuk menang!'],
      recap: [
        'Permukiman padat dibatasi atau dilarang di zona rawan tsunami.',
        'Sekolah, rumah sakit, dan pusat komando sebaiknya berada di zona aman.',
        'Zona rawan cocok untuk sabuk hijau seperti mangrove dan ruang terbuka.'
      ]
    },
    {
      id: 'n3', island: 'nonstruct', phaseKey: 'nonstruct', phase: 'Mitigasi non-struktural', icon: 'map', type: 'quizMap',
      title: 'Baca Peta Evakuasi',
      mission: 'Baca peta jalur evakuasi desa, lalu jawab pertanyaannya.',
      how: ['Perhatikan warna zona, panah jalur evakuasi, dan simbol TES di peta.', 'Pilih jawaban terbaik untuk setiap pertanyaan.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Zona merah di peta adalah daerah rawan tsunami.',
        'Ikuti panah jalur evakuasi menuju Tempat Evakuasi Sementara (TES).',
        'Hindari muara dan jembatan sungai saat evakuasi.'
      ]
    },
    {
      id: 'n4', island: 'nonstruct', phaseKey: 'nonstruct', phase: 'Mitigasi non-struktural', icon: 'runner', type: 'drill',
      title: 'Latihan Evakuasi Rutin',
      mission: 'Sirene latihan berbunyi! Susun langkah evakuasi dengan benar sebelum waktu habis.',
      how: ['Ketuk kartu langkah sesuai urutan yang benar.', 'Waktumu 45 detik. Urutan yang salah mengurangi 1 nyawa.', 'Selesaikan semua langkah sebelum waktu habis!'],
      recap: [
        'Latihan berkala membuat warga siap dan sigap saat darurat sungguhan.',
        'Keluar dengan tertib dan ikuti rambu jalur evakuasi.',
        'Sesampainya di titik kumpul, lapor ke petugas agar semua warga terdata.'
      ]
    },
    {
      id: 'n5', island: 'nonstruct', phaseKey: 'nonstruct', phase: 'Mitigasi non-struktural', icon: 'megaphone', type: 'quizEdu',
      title: 'Kuis Duta Edukasi',
      mission: 'Jadilah duta siaga yang paham mitigasi non-struktural.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Mitigasi non-struktural berupa aturan, peringatan dini, peta, latihan, dan edukasi.',
        'Edukasi membuat warga paham tanda alam tsunami dan langkah yang harus diambil.',
        'Bagikan pengetahuan siaga kepada keluarga dan teman.'
      ]
    }
  ];

  const RESPONSE_LEVELS = [
    {
      id: 1, phaseKey: 'pre', phase: 'Sebelum', icon: 'eye', type: 'signs',
      title: 'Kenali Tanda Alam',
      mission: 'Temukan 3 tanda alam bahwa tsunami mungkin akan datang!',
      how: ['Ketuk kartu yang menurutmu tanda tsunami.', 'Salah pilih membuatmu kehilangan 1 nyawa.', 'Temukan ketiga tandanya untuk menang!'],
      recap: [
        'Gempa yang kuat atau lama di dekat pantai adalah tanda bahaya.',
        'Air laut yang surut tiba-tiba berarti gelombang besar akan datang.',
        'Suara gemuruh dari arah laut juga tanda untuk segera pergi.'
      ]
    },
    {
      id: 2, phaseKey: 'pre', phase: 'Sebelum', icon: 'bag', type: 'bag',
      title: 'Siapkan Tas Siaga',
      mission: 'Isi tas siaga dengan 7 barang penting untuk mengungsi.',
      how: ['Seret barang ke tas, atau cukup ketuk barangnya.', 'Barang yang tidak penting akan ditolak dan nyawamu berkurang 1.', 'Isi ketujuh slot untuk menang!'],
      recap: [
        'Siapkan tas siaga sebelum bencana dan simpan di tempat yang mudah diambil.',
        'Isi dengan dokumen, obat, air, makanan, senter, radio, dan pakaian ganti.',
        'Tas siaga harus ringan supaya kamu bisa bergerak cepat.'
      ]
    },
    {
      id: 3, phaseKey: 'pre', phase: 'Sebelum', icon: 'map', type: 'route',
      title: 'Cari Jalur Evakuasi',
      mission: 'Bawa dirimu dari rumah ke titik kumpul di atas bukit.',
      how: ['Bergerak dengan tombol panah, keyboard, atau ketuk kotak di sebelahmu.', 'Jauhi laut, pantai, dan sungai. Melangkah ke sana mengurangi 1 nyawa.', 'Ikuti rambu hijau jalur evakuasi!'],
      recap: [
        'Kenali jalur evakuasi dan titik kumpul di sekitar rumah dan sekolahmu.',
        'Pergilah ke tempat tinggi, menjauh dari pantai.',
        'Jauhi sungai, karena gelombang tsunami bisa masuk lewat sungai.'
      ]
    },
    {
      id: 4, phaseKey: 'now', phase: 'Saat', icon: 'timer', type: 'quizQuake',
      title: 'Saat Gempa Terjadi',
      mission: 'Pilih tindakan yang tepat sebelum waktunya habis!',
      how: ['Baca situasinya, lalu pilih tindakan terbaik.', 'Setiap situasi punya batas waktu.', 'Jawaban salah atau waktu habis mengurangi 1 nyawa.'],
      recap: [
        'Saat guncangan: merunduk, berlindung, dan lindungi kepala.',
        'Gempa kuat atau lama di dekat pantai: langsung evakuasi, jangan tunggu sirene.',
        'Jangan kembali untuk mengambil barang.'
      ]
    },
    {
      id: 5, phaseKey: 'now', phase: 'Saat', icon: 'runner', type: 'runner',
      title: 'Lari ke Bukit',
      mission: 'Lari ke titik kumpul di bukit dan lompati rintangan di jalan!',
      how: ['Tekan tombol Lompat, Spasi, atau ketuk layar untuk melompat.', 'Menabrak rintangan membuat gelombang makin dekat dan nyawamu berkurang 1.', 'Sampai di bukit untuk menang!'],
      recap: [
        'Ikuti rambu jalur evakuasi menuju tempat tinggi.',
        'Saat jalan macet, berjalan kaki sering lebih cepat daripada kendaraan.',
        'Tetap tenang dan perhatikan jalan supaya tidak jatuh.'
      ]
    },
    {
      id: 6, phaseKey: 'post', phase: 'Sesudah', icon: 'lifebuoy', type: 'quizAfter',
      title: 'Setelah Gelombang',
      mission: 'Tetap aman setelah gelombang pertama datang.',
      how: ['Baca situasinya, lalu pilih tindakan terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Tetap di tempat tinggi, karena gelombang berikutnya bisa lebih besar.',
        'Percayai informasi resmi dari BMKG atau BPBD, bukan pesan berantai.',
        'Bantu yang terluka dan ikuti arahan petugas.'
      ]
    }
  ];

  RESPONSE_LEVELS.forEach(lv => { lv.island = 'response'; });
  const LEVELS = [...STRUCT_LEVELS, ...NONSTRUCT_LEVELS, ...RESPONSE_LEVELS];
  const LEVEL_BY_ID = Object.fromEntries(LEVELS.map(lv => [String(lv.id), lv]));
  const MAX_STARS = LEVELS.length * 3;
  const islandOf = lv => ISLANDS.find(is => is.id === lv.island);
  const levelsOf = islandId => LEVELS.filter(lv => lv.island === islandId);
  const levelNo = lv => levelsOf(lv.island).indexOf(lv) + 1;
  const tagLabel = lv => (lv.island === 'response' ? `${lv.phase} tsunami` : lv.phase);

  const SIGNS = [
    { ok: true, ic: 'quake', anim: 'anim-shake', label: 'Gempa kuat dan lama', why: 'Kalau gempa terasa kuat sampai sulit berdiri atau berlangsung lama, segera menjauh dari pantai.' },
    { ok: true, ic: 'recede', anim: 'anim-recede', label: 'Air laut surut tiba-tiba', why: 'Air laut yang tiba-tiba surut jauh adalah tanda gelombang besar akan datang. Jangan mendekat!' },
    { ok: true, ic: 'rumble', anim: 'anim-rumble', label: 'Suara gemuruh dari laut', why: 'Suara gemuruh seperti kereta atau pesawat dari arah laut bisa menandakan tsunami.' },
    { ok: false, ic: 'rain', label: 'Hujan gerimis', why: 'Hujan biasa bukan tanda tsunami.' },
    { ok: false, ic: 'gull', label: 'Burung camar terbang', why: 'Burung terbang di pantai adalah pemandangan biasa.' },
    { ok: false, ic: 'rainbow', label: 'Muncul pelangi', why: 'Pelangi muncul setelah hujan dan tidak berhubungan dengan tsunami.' },
    { ok: false, ic: 'sun', label: 'Cuaca cerah dan panas', why: 'Tsunami bisa datang saat cuaca cerah. Cuaca bukan petunjuknya.' },
    { ok: false, ic: 'boat', label: 'Perahu nelayan berlayar', why: 'Perahu yang berlayar adalah pemandangan biasa di laut.' }
  ];

  const ITEMS = [
    { ok: true, ic: 'doc', label: 'Dokumen penting', why: 'Akta, kartu keluarga, dan ijazah. Simpan dalam plastik kedap air.' },
    { ok: true, ic: 'flashlight', label: 'Senter', why: 'Listrik bisa padam. Senter membantumu melihat di malam hari.' },
    { ok: true, ic: 'firstaid', label: 'Obat & P3K', why: 'Untuk merawat luka ringan dan obat rutin keluarga.' },
    { ok: true, ic: 'water', label: 'Air minum', why: 'Air bersih bisa sulit didapat setelah bencana.' },
    { ok: true, ic: 'food', label: 'Makanan tahan lama', why: 'Biskuit atau makanan kaleng yang tidak cepat basi.' },
    { ok: true, ic: 'radio', label: 'Radio & baterai', why: 'Untuk mendengar informasi resmi saat sinyal HP hilang.' },
    { ok: true, ic: 'shirt', label: 'Pakaian ganti', why: 'Pakaian kering membuatmu tetap hangat dan sehat.' },
    { ok: false, ic: 'tv', label: 'Televisi', why: 'Terlalu berat dan tidak berguna saat mengungsi.' },
    { ok: false, ic: 'gamepad', label: 'Konsol game', why: 'Bukan barang penting. Tas siaga harus ringan.' },
    { ok: false, ic: 'teddy', label: 'Boneka besar', why: 'Memakan tempat. Bawa yang benar-benar penting saja.' },
    { ok: false, ic: 'pan', label: 'Wajan', why: 'Berat dan tidak diperlukan di tas siaga.' },
    { ok: false, ic: 'plant', label: 'Tanaman hias', why: 'Tidak membantumu tetap selamat.' }
  ];

  // S laut, B pantai, R sungai, # reruntuhan, . jalan, u/r rambu evakuasi, H bukit, G titik kumpul, P rumah
  const ROUTE_MAP = [
    'SB.r..HG',
    'SBu#..HH',
    'SBu.R..H',
    'SBP.R#.H',
    'SB..R...',
    'SB#.R...'
  ];

  const QUAKE_QS = [
    {
      ic: 'quake', text: 'Lantai bergoyang kuat! Kamu sedang di dalam rumah.',
      options: [
        { ok: true, ic: 'duck-cover', text: 'Merunduk, berlindung di bawah meja yang kuat, dan lindungi kepala', why: 'Tepat! Lindungi diri dulu dari benda yang jatuh sampai guncangan berhenti.' },
        { ic: 'runner', text: 'Langsung lari keluar saat lantai masih bergoyang', why: 'Saat masih bergoyang, kamu bisa jatuh atau tertimpa benda. Lindungi diri dulu.' },
        { ic: 'phone', text: 'Merekam video untuk dibagikan ke media sosial', why: 'Keselamatanmu lebih penting daripada video.' }
      ]
    },
    {
      ic: 'wave', text: 'Guncangan berhenti. Gempanya tadi kuat dan lama, dan rumahmu dekat pantai.',
      options: [
        { ok: true, ic: 'mountain', text: 'Segera pergi ke tempat tinggi tanpa menunggu sirene', why: 'Benar! Gempa kuat atau lama di dekat pantai adalah tanda untuk langsung evakuasi.' },
        { ic: 'tv', text: 'Menunggu pengumuman di TV dulu', why: 'Tsunami bisa datang dalam hitungan menit. Jangan menunggu.' },
        { ic: 'eye', text: 'Pergi ke pantai untuk melihat air laut', why: 'Jangan pernah mendekat ke pantai. Justru menjauhlah ke tempat tinggi.' }
      ]
    },
    {
      ic: 'phone', text: 'Di tengah jalan, kamu sadar HP-mu tertinggal di rumah.',
      options: [
        { ok: true, ic: 'runner', text: 'Tetap lanjut ke tempat tinggi', why: 'Betul! Barang bisa diganti, nyawa tidak.' },
        { ic: 'house', text: 'Kembali sebentar untuk mengambil HP', why: 'Kembali ke rumah membuang waktu berharga dan sangat berbahaya.' },
        { ic: 'person-wait', text: 'Berhenti dan menunggu ada yang mengantar', why: 'Jangan berhenti. Terus bergerak ke tempat tinggi.' }
      ]
    },
    {
      ic: 'car', text: 'Jalan raya macet total oleh kendaraan yang mau mengungsi.',
      options: [
        { ok: true, ic: 'walker', text: 'Berjalan kaki atau berlari lewat jalur evakuasi', why: 'Tepat! Saat jalan macet, berjalan kaki ke tempat tinggi sering lebih cepat.' },
        { ic: 'car', text: 'Tetap menunggu di dalam mobil sampai jalan lancar', why: 'Menunggu di mobil yang terjebak macet sangat berbahaya.' },
        { ic: 'megaphone', text: 'Membunyikan klakson terus-menerus', why: 'Klakson tidak membuat jalan lancar. Lebih baik berjalan kaki lewat jalur evakuasi.' }
      ]
    }
  ];

  const AFTER_QS = [
    {
      ic: 'wave', text: 'Gelombang pertama sudah surut. Pantai terlihat tenang lagi.',
      options: [
        { ok: true, ic: 'mountain', text: 'Tetap di tempat tinggi', why: 'Benar! Tsunami bisa datang berkali-kali, dan gelombang berikutnya bisa lebih besar.' },
        { ic: 'camera', text: 'Turun ke pantai untuk melihat kerusakan', why: 'Bahaya! Gelombang susulan bisa datang kapan saja.' },
        { ic: 'house', text: 'Pulang untuk mengambil barang berharga', why: 'Jangan pulang dulu sampai petugas menyatakan aman.' }
      ]
    },
    {
      ic: 'chat', text: 'Ada pesan berantai di grup chat: "Sudah aman, ayo pulang!"',
      options: [
        { ok: true, ic: 'radio', text: 'Cek dulu informasi resmi dari BMKG atau BPBD', why: 'Tepat! Hanya percayai informasi dari lembaga resmi.' },
        { ic: 'runner', text: 'Langsung percaya dan pulang', why: 'Pesan berantai belum tentu benar. Tunggu informasi resmi.' },
        { ic: 'send', text: 'Sebarkan ke semua grup', why: 'Menyebarkan kabar yang belum pasti bisa membahayakan orang lain.' }
      ]
    },
    {
      ic: 'bandage', text: 'Temanmu di titik kumpul terluka ringan di kakinya.',
      options: [
        { ok: true, ic: 'firstaid', text: 'Beri pertolongan pertama dan lapor ke petugas', why: 'Bagus! Bersihkan dan tutup lukanya, lalu minta bantuan petugas.' },
        { ic: 'eye-off', text: 'Biarkan saja, nanti juga sembuh', why: 'Luka yang dibiarkan bisa infeksi, apalagi kalau terkena air kotor.' },
        { ic: 'walker', text: 'Mengajaknya ke pantai mencari bantuan', why: 'Jangan ke pantai. Cari petugas di titik kumpul.' }
      ]
    },
    {
      ic: 'family', text: 'Kamu sudah aman bersama keluargamu di titik kumpul.',
      options: [
        { ok: true, ic: 'phone-call', text: 'Kabari kerabat bahwa kalian selamat, lalu ikuti arahan petugas', why: 'Hebat! Keluarga jadi tenang, dan petugas tahu langkah selanjutnya.' },
        { ic: 'broom', text: 'Langsung pulang dan membersihkan rumah sendirian', why: 'Tunggu sampai daerahmu dinyatakan aman oleh petugas.' },
        { ic: 'swim', text: 'Bermain di genangan air', why: 'Genangan setelah tsunami bisa berisi puing tajam dan kotoran. Jauhi!' }
      ]
    }
  ];

  /* --- Pulau Benteng (struktural) --- */

  const PAIRS = [
    { ic: 'seawall', name: 'Tanggul pantai', fn: 'Memperlambat dan meredam energi gelombang di garis pantai.' },
    { ic: 'building', name: 'Bangunan tahan gempa', fn: 'Dirancang tahan guncangan agar tidak roboh saat gempa awal.' },
    { ic: 'tower', name: 'Menara evakuasi vertikal', fn: 'Tempat berlindung yang tinggi di wilayah yang minim dataran tinggi.' },
    { ic: 'mangrove', name: 'Hutan mangrove', fn: 'Akar vegetasinya membantu meredam sebagian energi gelombang.' },
    { ic: 'breakwater', name: 'Pemecah gelombang lepas pantai', fn: 'Memecah kekuatan gelombang di laut sebelum mendekati garis pantai.' }
  ];

  // Lokasi dari laut (kiri) ke darat (kanan); setiap lokasi cocok untuk satu bangunan.
  const BUILD_SLOTS = [
    { id: 'offshore', label: 'Laut lepas', cls: 'z-deep', piece: 'breakwater' },
    { id: 'shore', label: 'Garis pantai', cls: 'z-shore', piece: 'seawall' },
    { id: 'mud', label: 'Pesisir berlumpur', cls: 'z-mud', piece: 'mangrove' },
    { id: 'town', label: 'Kawasan rumah & sekolah', cls: 'z-town', piece: 'building' },
    { id: 'flat', label: 'Desa datar tanpa bukit', cls: 'z-flat', piece: 'tower' }
  ];
  const BUILD_PIECES = {
    breakwater: { name: 'Pemecah gelombang', hint: 'Pemecah gelombang dipasang di laut lepas, supaya gelombang sudah pecah sebelum mendekati pantai.', test: 'Gelombang pecah di laut lepas.' },
    seawall: { name: 'Tanggul pantai', hint: 'Tanggul dibangun tepat di garis pantai untuk memperlambat gelombang yang datang.', test: 'Tanggul memperlambat gelombang di garis pantai.' },
    mangrove: { name: 'Hutan mangrove', hint: 'Mangrove tumbuh di pesisir berlumpur yang terkena pasang-surut.', test: 'Akar mangrove meredam sisa energi gelombang.' },
    building: { name: 'Bangunan tahan gempa', hint: 'Bangunan tahan gempa dibutuhkan di kawasan rumah dan sekolah agar tidak roboh saat gempa awal.', test: 'Rumah dan sekolah tetap berdiri setelah gempa.' },
    tower: { name: 'Menara evakuasi', hint: 'Menara evakuasi vertikal dibangun di desa datar yang jauh dari bukit, sebagai tempat berlindung yang tinggi.', test: 'Warga desa datar naik ke menara evakuasi.' }
  };

  const STRUCT_QS = [
    {
      ic: 'tower', text: 'Desa nelayanmu datar dan jauh dari bukit. Ke mana warga berlindung saat ada ancaman tsunami?',
      options: [
        { ok: true, ic: 'tower', text: 'Naik ke menara evakuasi vertikal', why: 'Tepat! Menara evakuasi vertikal dibangun untuk wilayah yang minim dataran tinggi.' },
        { ic: 'house', text: 'Bersembunyi di dalam rumah satu lantai', why: 'Rumah satu lantai tidak cukup tinggi untuk berlindung dari gelombang.' },
        { ic: 'boat', text: 'Berlindung di dalam perahu di dermaga', why: 'Dermaga dan perahu justru berada di zona paling berbahaya.' }
      ]
    },
    {
      ic: 'building', text: 'Tsunami biasanya datang setelah gempa. Mengapa bangunan di pesisir harus tahan gempa?',
      options: [
        { ok: true, ic: 'building', text: 'Agar tidak roboh saat gempa awal dan tetap bisa dipakai berlindung', why: 'Benar! Bangunan yang roboh saat gempa membuat warga celaka sebelum tsunami datang.' },
        { ic: 'eye', text: 'Supaya terlihat lebih bagus', why: 'Tujuan utamanya keselamatan, bukan penampilan.' },
        { ic: 'wave', text: 'Supaya air tsunami sama sekali tidak bisa masuk', why: 'Tidak ada bangunan yang bisa menahan tsunami sepenuhnya. Yang penting bangunan tidak roboh saat gempa.' }
      ]
    },
    {
      ic: 'mangrove', text: 'Hutan mangrove di pesisir akan ditebang untuk dijadikan tempat wisata. Apa akibatnya?',
      options: [
        { ok: true, ic: 'wave', text: 'Perlindungan alami berkurang, gelombang lebih mudah mencapai daratan', why: 'Tepat! Akar mangrove membantu meredam sebagian energi gelombang.' },
        { ic: 'check', text: 'Tidak ada pengaruhnya', why: 'Mangrove adalah benteng alami, jadi menebangnya mengurangi perlindungan pesisir.' },
        { ic: 'sun', text: 'Gelombang tsunami jadi berhenti total', why: 'Justru sebaliknya, gelombang jadi lebih mudah masuk ke daratan.' }
      ]
    },
    {
      ic: 'breakwater', text: 'Apa fungsi pemecah gelombang yang dibangun di lepas pantai?',
      options: [
        { ok: true, ic: 'breakwater', text: 'Memecah kekuatan gelombang sebelum mendekati garis pantai', why: 'Benar! Struktur di lepas pantai melemahkan gelombang lebih awal.' },
        { ic: 'pier', text: 'Tempat menambatkan kapal nelayan', why: 'Itu fungsi dermaga, bukan pemecah gelombang.' },
        { ic: 'rumble', text: 'Membuat gelombang menjadi lebih tinggi', why: 'Pemecah gelombang justru melemahkan gelombang.' }
      ]
    },
    {
      ic: 'seawall', text: 'Desamu sudah punya tanggul pantai. Tiba-tiba terasa gempa kuat dan lama. Apa yang kamu lakukan?',
      options: [
        { ok: true, ic: 'runner', text: 'Tetap evakuasi ke tempat tinggi', why: 'Tepat! Tanggul hanya memperlambat dan meredam gelombang, bukan menghentikannya. Tetap evakuasi.' },
        { ic: 'house', text: 'Tetap di rumah karena sudah ada tanggul', why: 'Tanggul tidak menjamin aman 100%. Saat ada tanda tsunami, tetap evakuasi.' },
        { ic: 'eye', text: 'Naik ke atas tanggul untuk melihat laut', why: 'Tanggul berada di garis pantai, tempat yang paling berbahaya.' }
      ]
    },
    {
      ic: 'crane', text: 'Mana yang termasuk mitigasi struktural?',
      options: [
        { ok: true, ic: 'crane', text: 'Membangun tanggul, menara evakuasi, dan menanam mangrove', why: 'Benar! Mitigasi struktural adalah upaya fisik berupa pembangunan sarana pelindung.' },
        { ic: 'megaphone', text: 'Sosialisasi dan latihan evakuasi warga', why: 'Itu termasuk mitigasi non-struktural.' },
        { ic: 'person-wait', text: 'Menunggu bantuan setelah bencana', why: 'Itu bukan mitigasi. Mitigasi dilakukan sebelum bencana untuk mengurangi dampaknya.' }
      ]
    }
  ];

  /* --- Pulau Siaga Warga (non-struktural) --- */

  const EWS_STEPS = [
    { ic: 'tectonic', text: 'Gempa besar terjadi di dasar laut', hint: 'Semuanya berawal dari gempa di dasar laut.' },
    { ic: 'buoy', text: 'Sensor dan alat pemantau mendeteksi potensi tsunami', hint: 'Setelah gempa, alat pemantau mendeteksi tanda-tanda tsunami.' },
    { ic: 'monitor', text: 'BMKG menganalisis data dan mengeluarkan peringatan dini', hint: 'Data dari alat pemantau dianalisis dulu sebelum peringatan dikeluarkan.' },
    { ic: 'siren', text: 'Peringatan disebarkan lewat sirine, SMS, dan radio', hint: 'Peringatan harus disebarkan dulu agar sampai ke warga.' },
    { ic: 'runner', text: 'Warga menerima peringatan dan segera evakuasi', hint: 'Evakuasi adalah langkah terakhir setelah warga menerima peringatan.' }
  ];

  const DRILL_STEPS = [
    { ic: 'siren', text: 'Dengarkan sirene dan arahan petugas', hint: 'Latihan dimulai saat sirene berbunyi.' },
    { ic: 'bag', text: 'Ambil tas siaga yang sudah disiapkan', hint: 'Sebelum keluar, ambil tas siaga yang sudah siap.' },
    { ic: 'walker', text: 'Keluar dengan tertib, tidak berdesakan', hint: 'Keluar dengan tertib dulu sebelum menuju jalur evakuasi.' },
    { ic: 'map', text: 'Ikuti rambu jalur evakuasi', hint: 'Di luar, ikuti rambu jalur evakuasi.' },
    { ic: 'flag', text: 'Berkumpul di titik kumpul', hint: 'Rambu evakuasi membawamu ke titik kumpul.' },
    { ic: 'doc', text: 'Lapor ke petugas agar semua warga terdata', hint: 'Terakhir, lapor ke petugas di titik kumpul.' }
  ];

  const ZONE_ITEMS = [
    { ic: 'house', label: 'Permukiman padat', zone: 'safe', why: 'Kebijakan tata ruang membatasi atau melarang permukiman padat di zona rawan tsunami.' },
    { ic: 'school', label: 'Sekolah', zone: 'safe', why: 'Sekolah berisi banyak anak, jadi sebaiknya dibangun di zona aman.' },
    { ic: 'hospital', label: 'Rumah sakit', zone: 'safe', why: 'Rumah sakit harus tetap berfungsi saat bencana, jadi dibangun di zona aman.' },
    { ic: 'mangrove', label: 'Hutan mangrove', zone: 'risk', why: 'Mangrove ditanam di pesisir sebagai sabuk hijau peredam gelombang.' },
    { ic: 'pier', label: 'Dermaga nelayan', zone: 'risk', why: 'Dermaga memang harus di tepi laut, tapi perlu dilengkapi jalur evakuasi.' },
    { ic: 'park', label: 'Taman dan ruang terbuka hijau', zone: 'risk', why: 'Ruang terbuka di zona rawan mengurangi jumlah bangunan dan orang di dekat pantai.' },
    { ic: 'building', label: 'Kantor posko bencana', zone: 'safe', why: 'Pusat komando bencana harus aman agar bisa mengatur evakuasi dan bantuan.' }
  ];

  const MAP_QS = [
    {
      art: 'evac-map', text: 'Di peta, warna merah di dekat pantai menandakan apa?',
      options: [
        { ok: true, ic: 'no-entry', text: 'Zona bahaya yang rawan terkena tsunami', why: 'Benar! Zona merah adalah daerah yang paling rawan terkena tsunami.' },
        { ic: 'flag', text: 'Tempat berkumpul yang paling aman', why: 'Tempat berkumpul yang aman ditandai TES di zona hijau.' },
        { ic: 'umbrella', text: 'Kawasan wisata pantai', why: 'Warna zona di peta evakuasi menunjukkan tingkat bahaya, bukan tempat wisata.' }
      ]
    },
    {
      art: 'evac-map', text: 'Rumahmu bertanda bintang. Ke mana kamu mengungsi?',
      options: [
        { ok: true, ic: 'mountain', text: 'Ke TES di bukit, mengikuti panah hijau', why: 'Tepat! Ikuti panah jalur evakuasi menuju Tempat Evakuasi Sementara di zona aman.' },
        { ic: 'park', text: 'Ke lapangan di seberang sungai lewat jembatan muara', why: 'Jalur itu melewati muara sungai, tempat gelombang bisa merambat masuk.' },
        { ic: 'boat', text: 'Ke pantai untuk naik perahu', why: 'Pantai adalah zona paling berbahaya. Menjauhlah dari laut.' }
      ]
    },
    {
      art: 'evac-map', text: 'Bagian peta mana yang sebaiknya dihindari saat evakuasi?',
      options: [
        { ok: true, ic: 'no-entry', text: 'Jembatan dan jalan di dekat muara sungai', why: 'Benar! Gelombang tsunami bisa merambat naik lewat muara sungai.' },
        { ic: 'mountain', text: 'Jalan menuju bukit', why: 'Jalan menuju bukit justru jalur evakuasi yang aman.' },
        { ic: 'map', text: 'Jalan yang dilengkapi rambu evakuasi', why: 'Rambu evakuasi menunjukkan jalan yang harus diikuti.' }
      ]
    },
    {
      art: 'evac-map', text: 'Mengapa peta jalur evakuasi perlu dipasang di tempat umum?',
      options: [
        { ok: true, ic: 'family', text: 'Supaya setiap warga pesisir tahu rute dan titik kumpul yang aman', why: 'Tepat! Peta jalur evakuasi harus diketahui setiap warga pesisir.' },
        { ic: 'eye', text: 'Hanya sebagai hiasan desa', why: 'Peta jalur evakuasi adalah alat keselamatan, bukan hiasan.' },
        { ic: 'person-wait', text: 'Supaya warga tidak perlu ikut latihan evakuasi', why: 'Peta dan latihan saling melengkapi. Keduanya tetap penting.' }
      ]
    }
  ];

  const EDU_QS = [
    {
      ic: 'siren', text: 'Lewat apa saja peringatan dini tsunami bisa disebarkan?',
      options: [
        { ok: true, ic: 'radio', text: 'Sirine, SMS, dan radio', why: 'Benar! Peringatan dini disebarkan lewat sirine, SMS, atau radio agar cepat sampai ke warga.' },
        { ic: 'doc', text: 'Hanya lewat koran besok pagi', why: 'Koran terlalu lambat. Peringatan harus sampai dalam hitungan menit.' },
        { ic: 'cross', text: 'Tidak perlu disebarkan', why: 'Peringatan yang tidak disebarkan tidak bisa menyelamatkan warga.' }
      ]
    },
    {
      ic: 'runner', text: 'Mengapa latihan evakuasi perlu dilakukan secara berkala?',
      options: [
        { ok: true, ic: 'check', text: 'Agar warga siap dan sigap saat darurat sungguhan', why: 'Tepat! Latihan rutin membuat warga terbiasa dengan langkah evakuasi.' },
        { ic: 'school', text: 'Supaya sekolah diliburkan', why: 'Latihan evakuasi bertujuan melatih kesiapan, bukan untuk libur.' },
        { ic: 'person-wait', text: 'Cukup sekali seumur hidup', why: 'Latihan perlu diulang supaya warga tidak lupa dan tetap sigap.' }
      ]
    },
    {
      ic: 'chat', text: 'Temanmu belum tahu tanda-tanda alam tsunami. Apa yang kamu lakukan?',
      options: [
        { ok: true, ic: 'megaphone', text: 'Jelaskan tanda alam tsunami dan langkah evakuasinya', why: 'Hebat! Edukasi dan sosialisasi membuat lebih banyak orang siap.' },
        { ic: 'eye-off', text: 'Biarkan saja, itu urusannya', why: 'Pengetahuan siaga sebaiknya dibagikan supaya semua orang selamat.' },
        { ic: 'send', text: 'Kirim kabar menakutkan yang belum pasti benar', why: 'Kabar yang belum pasti benar bisa membuat panik. Bagikan informasi yang benar.' }
      ]
    },
    {
      ic: 'zoning', text: 'Pemerintah melarang permukiman padat dibangun di zona rawan tsunami. Ini termasuk mitigasi apa?',
      options: [
        { ok: true, ic: 'zoning', text: 'Non-struktural: aturan tata ruang dan zonasi pesisir', why: 'Benar! Aturan dan kebijakan termasuk mitigasi non-struktural.' },
        { ic: 'seawall', text: 'Struktural: membangun tanggul', why: 'Aturan tata ruang tidak membangun apa pun secara fisik, jadi bukan struktural.' },
        { ic: 'cross', text: 'Bukan termasuk mitigasi', why: 'Aturan tata ruang termasuk mitigasi karena mengurangi risiko bencana.' }
      ]
    },
    {
      ic: 'megaphone', text: 'Mana contoh mitigasi non-struktural?',
      options: [
        { ok: true, ic: 'map', text: 'Peta jalur evakuasi dan sosialisasi warga', why: 'Tepat! Keduanya tidak membangun sarana fisik pelindung.' },
        { ic: 'breakwater', text: 'Membangun pemecah gelombang', why: 'Itu mitigasi struktural karena berupa bangunan fisik.' },
        { ic: 'tower', text: 'Membangun menara evakuasi', why: 'Itu mitigasi struktural karena berupa bangunan fisik.' }
      ]
    }
  ];

  const PLAY = {
    match: playMatch,
    mangrove: playMangrove,
    builder: playBuilder,
    quizStruct: lv => playQuiz(lv, STRUCT_QS, 0),
    ews: lv => playSequence(lv, EWS_STEPS, 0),
    sort: playSort,
    quizMap: lv => playQuiz(lv, MAP_QS, 0),
    drill: lv => playSequence(lv, DRILL_STEPS, 45),
    quizEdu: lv => playQuiz(lv, EDU_QS, 0),
    signs: playSigns,
    bag: playBag,
    route: playRoute,
    quizQuake: lv => playQuiz(lv, QUAKE_QS, 15),
    runner: playRunner,
    quizAfter: lv => playQuiz(lv, AFTER_QS, 0)
  };

  /* ================= Simpanan & suara ================= */

  const SAVE_KEY = 'siaga-tsunami-v1';
  const save = loadSave();

  function loadSave() {
    try {
      const s = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (s && typeof s.stars === 'object') return { stars: s.stars, sound: s.sound !== false, name: s.name || '', introSeen: !!s.introSeen };
    } catch (e) { /* penyimpanan tidak tersedia */ }
    return { stars: {}, sound: true, name: '', introSeen: false };
  }
  function persist() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* abaikan */ }
  }

  let actx = null;
  function tone(freqs, dur = 0.12, type = 'triangle', vol = 0.16) {
    if (!save.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      freqs.forEach((f, i) => {
        const o = actx.createOscillator();
        const g = actx.createGain();
        const t = actx.currentTime + i * dur;
        o.type = type;
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(actx.destination);
        o.start(t);
        o.stop(t + dur + 0.02);
      });
    } catch (e) { /* audio tidak didukung */ }
  }
  const sfx = {
    good: () => tone([660, 880]),
    bad: () => tone([260, 190], 0.16, 'sawtooth', 0.08),
    win: () => tone([523, 659, 784, 1046], 0.13),
    click: () => tone([520], 0.05, 'triangle', 0.08),
    jump: () => tone([380, 600], 0.06, 'square', 0.05)
  };

  /* ================= Utilitas ================= */

  const app = document.getElementById('app');
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const INK = '#23263a';
  const ic = (name, cls = '') => (window.SiagaIcons ? window.SiagaIcons.svg(name, cls) : '');
  const art = (name, cls = '') => (window.SiagaIcons ? window.SiagaIcons.art(name, cls) : '');

  function esc(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Semua timer/listener per layar didaftarkan di sini supaya bersih saat pindah layar.
  let cleanups = [];
  function onCleanup(fn) { cleanups.push(fn); }
  function later(fn, ms) {
    const id = setTimeout(fn, ms);
    onCleanup(() => clearTimeout(id));
  }
  function clearScreen() {
    cleanups.forEach(fn => { try { fn(); } catch (e) { /* abaikan */ } });
    cleanups = [];
    hideFeedback();
  }
  function render(html) {
    clearScreen();
    closeModal();
    app.innerHTML = html;
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  /* ================= Komponen ================= */

  function mascot(mood = 'happy', cls = '') {
    const mouth = mood === 'sad'
      ? '<path d="M52 60 Q60 53 68 60" fill="none" stroke="#23263a" stroke-width="3.5" stroke-linecap="round"/>'
      : '<path d="M51 54 Q60 63 69 54" fill="none" stroke="#23263a" stroke-width="3.5" stroke-linecap="round"/>';
    const brows = mood === 'sad'
      ? '<path d="M44 38 L54 41 M76 38 L66 41" stroke="#23263a" stroke-width="3" stroke-linecap="round"/>'
      : '';
    return `<svg class="mascot ${cls}" viewBox="0 0 120 112" aria-hidden="true">
      <ellipse cx="60" cy="105" rx="40" ry="6" fill="#23263a" opacity=".15"/>
      <ellipse cx="32" cy="94" rx="13" ry="9" fill="#8ee06a" stroke="#23263a" stroke-width="3"/>
      <ellipse cx="88" cy="94" rx="13" ry="9" fill="#8ee06a" stroke="#23263a" stroke-width="3"/>
      <ellipse cx="104" cy="66" rx="8" ry="13" transform="rotate(35 104 66)" fill="#8ee06a" stroke="#23263a" stroke-width="3"/>
      <path d="M12 94 C12 54 108 54 108 94 Z" fill="#4fa83a" stroke="#23263a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M30 76 L46 68 L60 72 L74 68 L90 76 M46 68 L44 92 M74 68 L76 92 M60 72 L60 92" fill="none" stroke="#2f7a2a" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="42" r="27" fill="#8ee06a" stroke="#23263a" stroke-width="3"/>
      <path d="M33 36 C33 6 87 6 87 36 Z" fill="#ffc93c" stroke="#23263a" stroke-width="3" stroke-linejoin="round"/>
      <rect x="28" y="32" width="64" height="8" rx="4" fill="#ffc93c" stroke="#23263a" stroke-width="3"/>
      <path d="M56 18 h8 M60 14 v8" stroke="#ff6b6b" stroke-width="3.5" stroke-linecap="round"/>
      ${brows}
      <circle cx="50" cy="48" r="5" fill="#23263a"/><circle cx="51.8" cy="46.2" r="1.7" fill="#fff"/>
      <circle cx="70" cy="48" r="5" fill="#23263a"/><circle cx="71.8" cy="46.2" r="1.7" fill="#fff"/>
      <ellipse cx="41" cy="56" rx="5" ry="3" fill="#ff9aa2" opacity=".85"/>
      <ellipse cx="79" cy="56" rx="5" ry="3" fill="#ff9aa2" opacity=".85"/>
      ${mouth}
    </svg>`;
  }

  function starRow(n) {
    return [1, 2, 3].map(i => (i <= n ? ic('star', 'on') : ic('star-empty', 'off'))).join('');
  }
  const starsOf = lv => save.stars[lv.id] || 0;
  function totalStars(list = LEVELS) {
    return list.reduce((sum, lv) => sum + starsOf(lv), 0);
  }
  // Semua pulau terbuka sejak awal; misi di dalam satu pulau terbuka berurutan.
  function isUnlocked(lv) {
    const list = levelsOf(lv.island);
    const i = list.indexOf(lv);
    return i === 0 || starsOf(list[i - 1]) > 0;
  }
  const allDone = () => LEVELS.every(lv => starsOf(lv) > 0);
  const shortTag = lv => (lv.island === 'response' ? lv.phase : lv.phaseKey === 'struct' ? 'Struktural' : 'Non-struktural');
  function updateHeader() {
    $('#starTotal').textContent = totalStars();
    $('#starMax').textContent = MAX_STARS;
    const sb = $('#soundBtn');
    sb.innerHTML = ic(save.sound ? 'sound-on' : 'sound-off');
    sb.setAttribute('aria-pressed', String(save.sound));
    sb.setAttribute('aria-label', save.sound ? 'Matikan suara' : 'Nyalakan suara');
  }

  let fbTimer = 0;
  function showFeedback({ good = true, title, text, next = null, nextLabel = 'Lanjut', nextIcon = 'arrow-right', autoHide = 2800 }) {
    const fb = $('#feedback');
    clearTimeout(fbTimer);
    fb.className = 'feedback show ' + (good ? 'good' : 'bad');
    fb.innerHTML = `${mascot(good ? 'happy' : 'sad', 'mini')}
      <div class="fb-body"><strong>${esc(title)}</strong><p>${esc(text)}</p>
      ${next ? `<button class="btn small green" id="fbNext" type="button">${esc(nextLabel)} ${ic(nextIcon)}</button>` : ''}</div>`;
    if (next) {
      const b = $('#fbNext');
      b.addEventListener('click', () => { hideFeedback(); next(); });
      b.focus({ preventScroll: true });
    } else {
      fbTimer = setTimeout(hideFeedback, autoHide);
    }
  }
  function hideFeedback() {
    clearTimeout(fbTimer);
    $('#feedback').classList.remove('show');
  }

  function openModal(html) {
    const m = $('#modal');
    m.innerHTML = `<div class="modal-card card" role="dialog" aria-modal="true">${html}</div>`;
    m.classList.add('open');
    const first = m.querySelector('button, input');
    if (first) first.focus();
  }
  function closeModal() {
    const m = $('#modal');
    m.classList.remove('open');
    m.innerHTML = '';
  }

  function confetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#ff6b6b', '#ffc93c', '#7cd35a', '#6cc4ff', '#c084fc'];
    for (let i = 0; i < 44; i++) {
      const p = document.createElement('i');
      p.className = 'confetti';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = (1.8 + Math.random() * 1.6) + 's';
      p.style.animationDelay = (Math.random() * 0.5) + 's';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4400);
    }
  }

  /* ================= Layar ================= */

  function showHome() {
    render(`<section class="screen home">
      <div class="hero card">
        <div class="hero-art">${mascot('happy', 'big bob')}</div>
        <div class="hero-text">
          <p class="kicker">Petualangan mitigasi tsunami</p>
          <h1>Nusa Siaga</h1>
          <p class="lead">Halo, aku <b>Tuti si Penyu</b>! Ayo jelajahi <b>3 pulau</b> dan selesaikan
            <b>${LEVELS.length} misi</b> tentang mitigasi bencana tsunami.</p>
          <div class="row">
            <button class="btn big" id="playBtn" type="button">${ic('play')} Main sekarang</button>
            <button class="btn ghost" id="howBtn" type="button">${ic('question')} Cara main</button>
            <button class="btn blue" id="storyBtn" type="button">${ic('book')} Cerita pembuka</button>
          </div>
        </div>
      </div>
      <ul class="phase-row">
        ${ISLANDS.map(is => `<li class="card ${is.tag}"><span class="ph-art">${art(is.art)}</span>
          <b>Pulau ${is.no}: ${esc(is.name)}</b><span>${esc(is.theme)}</span></li>`).join('')}
      </ul>
    </section>`);
    $('#playBtn').onclick = () => { sfx.click(); showMap(); };
    $('#howBtn').onclick = showHowTo;
    $('#storyBtn').onclick = openIntro;
  }

  function openIntro() {
    if (!window.SiagaIntro) return;
    window.SiagaIntro.open({
      mascot,
      onClose: reason => {
        save.introSeen = true;
        persist();
        if (reason === 'finish') showMap();
      }
    });
  }

  function showHowTo() {
    openModal(`<h2>Cara main</h2>
      <ul class="how icon-list">
        <li>${ic('map')}<span>Pilih pulau di <b>Peta Kepulauan</b>. Semua pulau bisa dijelajahi kapan saja.</span></li>
        <li>${ic('lock')}<span>Di dalam pulau, misi berikutnya terbuka setelah misi sebelumnya selesai.</span></li>
        <li>${ic('heart')}<span>Di setiap misi kamu punya 3 nyawa. Pilihan yang salah mengurangi 1 nyawa.</span></li>
        <li>${ic('star')}<span>Sisa nyawa saat menang = jumlah bintang yang kamu dapat.</span></li>
        <li>${ic('bulb')}<span>Baca penjelasan Tuti setiap kali kamu memilih, supaya tahu alasannya.</span></li>
      </ul>
      <button class="btn green" id="okHow" type="button">Mengerti! ${ic('check')}</button>`);
    $('#okHow').onclick = closeModal;
  }

  // Peta Kepulauan: daftar pulau beserta progresnya.
  function showMap() {
    const done = allDone();
    render(`<section class="screen">
      <div class="screen-head">
        <h2>Peta Kepulauan</h2>
        <p>Pilih pulau yang ingin kamu jelajahi. Setiap pulau berisi misi tentang satu jenis pengetahuan mitigasi.</p>
      </div>
      <ol class="island-map">
        ${ISLANDS.map(is => {
          const list = levelsOf(is.id);
          const got = totalStars(list);
          const max = list.length * 3;
          const finished = list.every(lv => starsOf(lv) > 0);
          return `<li><button class="island card ${is.tag}" data-island="${is.id}" type="button"
              aria-label="Pulau ${is.no}: ${esc(is.name)}, ${esc(is.theme)}, ${got} dari ${max} bintang">
            <span class="island-no">Pulau ${is.no}</span>
            ${finished ? `<span class="island-done">${ic('check')} Tuntas</span>` : ''}
            <span class="island-art" aria-hidden="true">${art(is.art)}</span>
            <span class="island-name">${esc(is.name)}</span>
            <span class="phase-tag ${is.tag}">${esc(is.theme)}</span>
            <span class="island-desc">${esc(is.desc)}</span>
            <span class="island-progress" aria-hidden="true">
              <span class="meter"><i style="width:${(got / max) * 100}%"></i></span>
              <span class="island-stars">${ic('star')} ${got}/${max}</span>
            </span>
            <span class="island-count">${list.length} misi ${ic('arrow-right')}</span>
          </button></li>`;
        }).join('')}
      </ol>
      ${done ? `<div class="row center final-cta"><button class="btn big" id="finalBtn" type="button">${ic('trophy')} Lihat sertifikat</button></div>` : ''}
    </section>`);
    $$('.island').forEach(b => b.addEventListener('click', () => { sfx.click(); showIsland(b.dataset.island); }));
    if (done) $('#finalBtn').onclick = showFinal;
  }

  // Layar satu pulau: daftar misinya.
  function showIsland(id) {
    const is = ISLANDS.find(x => x.id === id);
    const list = levelsOf(id);
    render(`<section class="screen">
      <div class="island-head card ${is.tag}">
        <button class="btn ghost small" id="backWorld" type="button">${ic('arrow-left')} Peta Kepulauan</button>
        <div class="island-head-main">
          <span class="island-head-art" aria-hidden="true">${art(is.art)}</span>
          <div>
            <p class="kicker">Pulau ${is.no}</p>
            <h2>${esc(is.name)}</h2>
            <span class="phase-tag ${is.tag}">${esc(is.theme)}</span>
            <p>${esc(is.desc)}</p>
          </div>
        </div>
      </div>
      <ol class="level-map">
        ${list.map((lv, i) => {
          const open = isUnlocked(lv);
          const st = starsOf(lv);
          return `<li><button class="node card ${lv.phaseKey} ${open ? '' : 'locked'}" data-id="${lv.id}" type="button"
              aria-label="Misi ${i + 1}: ${esc(lv.title)}${open ? `, ${st} bintang` : ', terkunci'}">
            <span class="node-num">${i + 1}</span>
            <span class="node-icon" aria-hidden="true">${ic(open ? lv.icon : 'lock')}</span>
            <span class="node-title">${esc(lv.title)}</span>
            <span class="phase-tag ${lv.phaseKey}">${esc(shortTag(lv))}</span>
            <span class="node-stars" aria-hidden="true">${starRow(st)}</span>
          </button></li>`;
        }).join('')}
      </ol>
    </section>`);
    $('#backWorld').onclick = showMap;
    $$('.node').forEach(b => b.addEventListener('click', () => {
      const lv = LEVEL_BY_ID[b.dataset.id];
      if (isUnlocked(lv)) { sfx.click(); startLevel(lv.id); }
      else showFeedback({ good: false, title: 'Masih terkunci', text: 'Selesaikan misi sebelumnya di pulau ini dulu, ya!' });
    }));
  }

  let lives = 3;
  function setLives(n) {
    const lost = n < lives;
    lives = Math.max(0, n);
    const el = $('#hearts');
    if (!el) return;
    el.innerHTML = [0, 1, 2].map(i => {
      const alive = i < lives;
      const cls = alive ? '' : (lost && i === lives ? ' lost just-lost' : ' lost');
      return `<span class="heart${cls}">${ic(alive ? 'heart' : 'heart-empty')}</span>`;
    }).join('');
    el.setAttribute('aria-label', `Nyawa: ${lives} dari 3`);
  }

  function startLevel(id) {
    const lv = LEVEL_BY_ID[String(id)];
    if (!lv || !isUnlocked(lv)) return;
    render(`<section class="screen level">
      <div class="hud card">
        <button class="btn ghost small" id="backMap" type="button">${ic('arrow-left')} Pulau</button>
        <div class="hud-title">
          <span class="phase-tag ${lv.phaseKey}">${esc(tagLabel(lv))}</span>
          <h2>Misi ${levelNo(lv)}: ${esc(lv.title)}</h2>
        </div>
        <div class="hearts" id="hearts" role="img"></div>
      </div>
      <div class="mission">${mascot('happy', 'small')}<p class="bubble">${esc(lv.mission)}</p></div>
      <div id="stage"></div>
    </section>`);
    lives = 3;
    setLives(3);
    $('#backMap').onclick = () => showIsland(lv.island);
    openModal(`<div class="intro-head">${mascot('happy', 'small')}
        <div><span class="phase-tag ${lv.phaseKey}">${esc(islandOf(lv).name)} · ${esc(tagLabel(lv))}</span><h2>Misi ${levelNo(lv)}: ${esc(lv.title)}</h2></div>
      </div>
      <p class="intro-mission"><b>Misi:</b> ${esc(lv.mission)}</p>
      <ol class="how">${lv.how.map(h => `<li>${esc(h)}</li>`).join('')}</ol>
      <button class="btn big green" id="goBtn" type="button">Ayo mulai! ${ic('play')}</button>`);
    $('#goBtn').onclick = () => { closeModal(); sfx.click(); PLAY[lv.type](lv); };
  }

  function finishLevel(lv, stars) {
    stars = Math.max(1, Math.min(3, stars));
    save.stars[lv.id] = Math.max(stars, starsOf(lv));
    persist();
    updateHeader();
    const list = levelsOf(lv.island);
    const nextLv = list[list.indexOf(lv) + 1];
    const is = islandOf(lv);
    const msg = stars === 3 ? 'Sempurna! Kamu benar-benar siaga.'
      : stars === 2 ? 'Bagus sekali! Sedikit lagi sempurna.'
      : 'Kamu berhasil! Main lagi untuk dapat bintang lebih banyak.';
    render(`<section class="screen result">
      <div class="card result-card">
        ${mascot('happy', 'big bob')}
        <p class="kicker">${esc(is.name)} · Misi ${levelNo(lv)} selesai</p>
        <h2>${esc(lv.title)}</h2>
        <div class="stars-big" role="img" aria-label="${stars} dari 3 bintang">
          ${[1, 2, 3].map(i => `<span style="animation-delay:${i * 0.18}s">${ic(i <= stars ? 'star' : 'star-empty')}</span>`).join('')}
        </div>
        <p class="lead">${msg}</p>
        <div class="recap">
          <h3>${ic('bulb')} 3 hal yang perlu kamu ingat</h3>
          <ol>${lv.recap.map(r => `<li>${esc(r)}</li>`).join('')}</ol>
        </div>
        ${!nextLv ? `<p class="island-cleared">${ic('check')} ${esc(is.name)} tuntas! ${allDone() ? 'Semua pulau sudah kamu jelajahi.' : 'Jelajahi pulau lain di Peta Kepulauan.'}</p>` : ''}
        <div class="row center">
          <button class="btn ghost" id="retryBtn" type="button">${ic('retry')} Ulangi</button>
          <button class="btn ghost" id="mapBtn" type="button">${ic('map')} Pulau</button>
          <button class="btn green" id="nextBtn" type="button">${nextLv
            ? `Lanjut ke misi ${levelNo(nextLv)} ${ic('arrow-right')}`
            : allDone() ? `${ic('trophy')} Lihat sertifikat` : `${ic('map')} Peta Kepulauan`}</button>
        </div>
      </div>
    </section>`);
    sfx.win();
    if (stars === 3 || !nextLv) confetti();
    $('#retryBtn').onclick = () => startLevel(lv.id);
    $('#mapBtn').onclick = () => showIsland(lv.island);
    $('#nextBtn').onclick = () => (nextLv ? startLevel(nextLv.id) : allDone() ? showFinal() : showMap());
    $('#nextBtn').focus({ preventScroll: true });
  }

  function failLevel(lv, title = 'Nyawamu habis', text = 'Tidak apa-apa! Baca lagi penjelasan Tuti, lalu coba sekali lagi.') {
    render(`<section class="screen result">
      <div class="card result-card">
        ${mascot('sad', 'big')}
        <p class="kicker">Misi ${levelNo(lv)}: ${esc(lv.title)}</p>
        <h2>${esc(title)}</h2>
        <p class="lead">${esc(text)}</p>
        <div class="recap">
          <h3>${ic('bulb')} Petunjuk</h3>
          <ol>${lv.recap.map(r => `<li>${esc(r)}</li>`).join('')}</ol>
        </div>
        <div class="row center">
          <button class="btn ghost" id="mapBtn" type="button">${ic('map')} Pulau</button>
          <button class="btn green" id="retryBtn" type="button">${ic('retry')} Coba lagi</button>
        </div>
      </div>
    </section>`);
    $('#retryBtn').onclick = () => startLevel(lv.id);
    $('#mapBtn').onclick = () => showIsland(lv.island);
    $('#retryBtn').focus({ preventScroll: true });
  }

  function showFinal() {
    const total = totalStars();
    const name = () => save.name || 'Pahlawan Siaga';
    render(`<section class="screen final">
      <div class="card final-card">
        <div class="final-top">
          ${mascot('happy', 'big bob')}
          <p class="kicker">Semua misi selesai</p>
          <h2>Kamu Siaga Tsunami! ${ic('trophy')}</h2>
          <p class="lead">Kamu mengumpulkan <b>${total}</b> dari ${MAX_STARS} bintang.</p>
        </div>
        <label class="name-field" for="nameIn">Tulis namamu untuk sertifikat</label>
        <input id="nameIn" class="name-input" maxlength="40" placeholder="Nama kamu" value="${esc(save.name)}" autocomplete="off">
        <div class="cert" id="cert">
          <p class="cert-k">Sertifikat</p>
          <h3>Pahlawan Siaga Tsunami</h3>
          <p>diberikan kepada</p>
          <p class="cert-name" id="certName">${esc(name())}</p>
          <p>yang telah menjelajahi 3 pulau, menyelesaikan ${LEVELS.length} misi mitigasi bencana tsunami, dan meraih <b>${total}</b> ${ic('star')}</p>
          <div class="cert-badges">
            <span>${ic('seawall')} Mitigasi struktural</span><span>${ic('siren')} Mitigasi non-struktural</span>
            <span>${ic('lifebuoy')} Tanggap bencana</span>
          </div>
        </div>
        <div class="row center">
          <button class="btn" id="printBtn" type="button">${ic('print')} Cetak sertifikat</button>
          <button class="btn ghost" id="mapBtn" type="button">${ic('map')} Peta</button>
        </div>
      </div>
    </section>`);
    confetti();
    sfx.win();
    const inp = $('#nameIn');
    inp.addEventListener('input', () => {
      save.name = inp.value.trim();
      $('#certName').textContent = name();
      persist();
    });
    $('#printBtn').onclick = () => window.print();
    $('#mapBtn').onclick = showMap;
  }

  /* ================= Pulau Benteng: pasangkan bangunan & fungsi ================= */

  function playMatch(lv) {
    const left = shuffle(PAIRS.map((p, k) => Object.assign({ k }, p)));
    const right = shuffle(PAIRS.map((p, k) => Object.assign({ k }, p)));
    let selL = null, selR = null, matched = 0, over = false;
    $('#stage').innerHTML = `
      <p class="stage-hint">Ketuk satu bangunan di kiri, lalu ketuk fungsinya di kanan.</p>
      <div class="match">
        <div class="match-col">
          ${left.map(p => `<button class="match-card m-left card" data-k="${p.k}" type="button">
            <span class="m-ico" aria-hidden="true">${ic(p.ic)}</span><b>${esc(p.name)}</b><span class="m-badge" aria-hidden="true"></span></button>`).join('')}
        </div>
        <div class="match-col">
          ${right.map(p => `<button class="match-card m-right card" data-k="${p.k}" type="button">
            <span>${esc(p.fn)}</span><span class="m-badge" aria-hidden="true"></span></button>`).join('')}
        </div>
      </div>`;

    function check() {
      if (!selL || !selR) return;
      const a = selL, b = selR;
      selL = selR = null;
      a.classList.remove('selected');
      b.classList.remove('selected');
      const p = PAIRS[Number(a.dataset.k)];
      if (a.dataset.k === b.dataset.k) {
        matched++;
        [a, b].forEach(el => { el.classList.add('matched'); el.disabled = true; $('.m-badge', el).textContent = matched; });
        sfx.good();
        showFeedback({ good: true, title: `${p.name}: cocok!`, text: p.fn });
        if (matched === PAIRS.length) { over = true; later(() => finishLevel(lv, lives), 1700); }
      } else {
        [a, b].forEach(el => { el.classList.remove('wrong'); void el.offsetWidth; el.classList.add('wrong'); });
        sfx.bad();
        setLives(lives - 1);
        showFeedback({ good: false, title: 'Belum cocok', text: `Fungsi ${p.name.toLowerCase()}: ${p.fn.charAt(0).toLowerCase()}${p.fn.slice(1)}` });
        if (lives <= 0) { over = true; later(() => failLevel(lv), 1700); }
      }
    }

    $$('.match-card').forEach(btn => btn.addEventListener('click', () => {
      if (over || btn.disabled) return;
      const isLeft = btn.classList.contains('m-left');
      const cur = isLeft ? selL : selR;
      if (cur) cur.classList.remove('selected');
      const pick = cur === btn ? null : btn;
      if (pick) pick.classList.add('selected');
      if (isLeft) selL = pick; else selR = pick;
      sfx.click();
      check();
    }));
  }

  /* ================= Pulau Benteng: tanam sabuk mangrove ================= */

  function playMangrove(lv) {
    const COLS = 8;
    const ROWS = ['deep', 'deep', 'mud', 'mud', 'village'];
    const ZONE = {
      deep: { label: 'Laut dalam', why: 'Laut dalam terlalu dalam. Bibit mangrove tidak bisa tumbuh di sini.' },
      mud: { label: 'Pesisir berlumpur' },
      village: { label: 'Permukiman', why: 'Mangrove tumbuh di pesisir berlumpur yang terkena pasang-surut, bukan di permukiman.' }
    };
    const covered = new Array(COLS).fill(false);
    let over = false, planted = 0;
    $('#stage').innerHTML = `
      <div class="mangrove-wrap card">
        <div class="zone-legend">
          <span><i class="sw m-deep"></i>Laut dalam</span>
          <span><i class="sw m-mud"></i>Pesisir berlumpur (pasang-surut)</span>
          <span><i class="sw m-village"></i>Permukiman</span>
        </div>
        <div class="mgrid" id="mgrid" style="--cols:${COLS}">
          ${ROWS.map((z, r) => Array.from({ length: COLS }, (_, c) => {
            const deco = z === 'village' && c % 2 === 0 ? ic('house') : z === 'deep' && r === 0 && c % 3 === 1 ? ic('wave') : '';
            return `<button class="mtile m-${z}" data-r="${r}" data-c="${c}" type="button" aria-label="${ZONE[z].label}, kolom ${c + 1}">${deco}</button>`;
          }).join('')).join('')}
          <div class="wave-sweep" aria-hidden="true"></div>
        </div>
        <div class="belt" aria-hidden="true">${covered.map((_, c) => `<span class="belt-dot" data-c="${c}"></span>`).join('')}</div>
        <p class="belt-text">Sabuk mangrove: <b id="beltN">0</b> / ${COLS} kolom</p>
      </div>`;

    $$('.mtile').forEach(t => t.addEventListener('click', () => {
      if (over || t.classList.contains('planted')) return;
      const z = ROWS[Number(t.dataset.r)];
      const c = Number(t.dataset.c);
      if (z !== 'mud') {
        t.classList.remove('hit');
        void t.offsetWidth;
        t.classList.add('hit');
        sfx.bad();
        setLives(lives - 1);
        showFeedback({ good: false, title: 'Bukan tempat yang tepat', text: ZONE[z].why });
        if (lives <= 0) { over = true; later(() => failLevel(lv), 1700); }
        return;
      }
      t.classList.add('planted');
      t.innerHTML = ic('mangrove');
      planted++;
      sfx.good();
      if (!covered[c]) {
        covered[c] = true;
        $(`.belt-dot[data-c="${c}"]`).classList.add('on');
      }
      const n = covered.filter(Boolean).length;
      $('#beltN').textContent = n;
      if (n === COLS) {
        over = true;
        showFeedback({ good: true, title: 'Sabuk mangrove terbentuk!', text: 'Sekarang kita uji dengan gelombang...' });
        later(() => $('#mgrid').classList.add('testing'), 900);
        later(() => showFeedback({ good: true, title: 'Gelombang melemah!', text: 'Akar mangrove meredam sebagian energi gelombang sebelum mencapai permukiman.' }), 2700);
        later(() => finishLevel(lv, lives), 4800);
      } else if (planted === 1) {
        showFeedback({ good: true, title: 'Tumbuh dengan baik!', text: 'Mangrove cocok di pesisir berlumpur. Isi setiap kolom supaya sabuknya tidak berlubang.' });
      }
    }));
  }

  /* ================= Pulau Benteng: susun benteng pantai ================= */

  function playBuilder(lv) {
    const pieces = shuffle(BUILD_SLOTS.map(s => s.piece));
    let selected = null, placed = 0, over = false;
    $('#stage').innerHTML = `
      <p class="stage-hint">Dari kiri ke kanan: laut lepas sampai desa. Pilih bangunan, lalu ketuk lokasinya.</p>
      <div class="coast card" id="coast">
        ${BUILD_SLOTS.map(s => `<button class="coast-col ${s.cls}" data-slot="${s.id}" type="button" aria-label="Lokasi: ${esc(s.label)}">
          <span class="slot-box" aria-hidden="true">?</span>
          <span class="coast-label">${esc(s.label)}</span>
        </button>`).join('')}
        <div class="coast-wave" aria-hidden="true">${ic('wave')}</div>
      </div>
      <div class="wave-meter" id="waveMeter" hidden><span>Kekuatan gelombang</span><span class="meter"><i id="wpow"></i></span></div>
      <p class="test-status" id="testStatus" aria-live="polite"></p>
      <div class="tray" id="tray">
        ${pieces.map(p => `<button class="piece card" data-piece="${p}" type="button">${ic(p)}<span>${esc(BUILD_PIECES[p].name)}</span></button>`).join('')}
      </div>
      <div class="row center"><button class="btn big green" id="testBtn" type="button" hidden>${ic('wave')} Uji gelombang</button></div>`;

    const coast = $('#coast');
    $$('.piece').forEach(b => b.addEventListener('click', () => {
      if (over || b.disabled) return;
      $$('.piece').forEach(x => x.classList.remove('selected'));
      selected = selected === b ? null : b;
      if (selected) selected.classList.add('selected');
      coast.classList.toggle('choosing', !!selected);
      sfx.click();
    }));

    $$('.coast-col').forEach(col => col.addEventListener('click', () => {
      if (over || col.classList.contains('filled')) return;
      if (!selected) {
        showFeedback({ good: false, title: 'Pilih bangunan dulu', text: 'Ketuk salah satu bangunan di bawah, lalu ketuk lokasinya.', autoHide: 2000 });
        return;
      }
      const slot = BUILD_SLOTS.find(s => s.id === col.dataset.slot);
      const p = selected.dataset.piece;
      if (slot.piece === p) {
        col.classList.add('filled');
        $('.slot-box', col).innerHTML = ic(p);
        selected.disabled = true;
        selected.classList.remove('selected');
        selected.classList.add('used');
        selected = null;
        coast.classList.remove('choosing');
        placed++;
        sfx.good();
        showFeedback({ good: true, title: `${BUILD_PIECES[p].name} terpasang!`, text: BUILD_PIECES[p].hint });
        if (placed === BUILD_SLOTS.length) {
          $('#tray').hidden = true;
          $('#testBtn').hidden = false;
          $('#testBtn').focus({ preventScroll: true });
        }
      } else {
        col.classList.remove('hit');
        void col.offsetWidth;
        col.classList.add('hit');
        sfx.bad();
        setLives(lives - 1);
        showFeedback({ good: false, title: 'Lokasinya kurang tepat', text: BUILD_PIECES[p].hint });
        if (lives <= 0) { over = true; later(() => failLevel(lv), 1700); }
      }
    }));

    // Simulasi sederhana: gelombang melemah setiap melewati lapisan pertahanan.
    $('#testBtn').addEventListener('click', () => {
      if (over) return;
      over = true;
      $('#testBtn').hidden = true;
      $('#waveMeter').hidden = false;
      const power = [100, 62, 42, 28, 28, 28];
      const cols = $$('.coast-col');
      const pw = $('#wpow');
      pw.style.width = '100%';
      coast.classList.add('testing');
      const STEP = 1200;
      BUILD_SLOTS.forEach((s, i) => later(() => {
        cols.forEach(c => c.classList.remove('active'));
        cols[i].classList.add('active');
        coast.style.setProperty('--wx', i);
        coast.style.setProperty('--ws', (0.45 + 0.55 * power[i + 1] / 100).toFixed(2));
        pw.style.width = power[i + 1] + '%';
        $('#testStatus').textContent = BUILD_PIECES[s.piece].test;
        sfx.click();
      }, 500 + i * STEP));
      later(() => {
        cols.forEach(c => c.classList.remove('active'));
        showFeedback({ good: true, title: 'Desa terlindungi!', text: 'Pertahanan berlapis melemahkan gelombang, dan warga punya tempat berlindung yang tinggi.' });
      }, 500 + BUILD_SLOTS.length * STEP);
      later(() => finishLevel(lv, lives), 500 + BUILD_SLOTS.length * STEP + 2400);
    });
  }

  /* ================= Pulau Siaga Warga: susun urutan ================= */

  function playSequence(lv, steps, seconds) {
    const cards = shuffle(steps.map((s, k) => Object.assign({ k }, s)));
    let next = 0, over = false, timerId = 0;
    onCleanup(() => clearInterval(timerId));
    $('#stage').innerHTML = `
      ${seconds ? '<div class="timer" aria-hidden="true"><i id="tbar"></i></div>' : ''}
      <ol class="seq-slots">
        ${steps.map((_, i) => `<li class="seq-slot"><span class="seq-n">${i + 1}</span><span class="seq-fill">...</span></li>`).join('')}
      </ol>
      <p class="stage-hint">Ketuk langkah berikutnya dari kartu-kartu di bawah.</p>
      <div class="seq-pool">
        ${cards.map(c => `<button class="seq-card card" data-k="${c.k}" type="button">${ic(c.ic)}<span>${esc(c.text)}</span></button>`).join('')}
      </div>`;
    const slots = $$('.seq-slot');

    $$('.seq-card').forEach(b => b.addEventListener('click', () => {
      if (over || b.disabled) return;
      const k = Number(b.dataset.k);
      if (k === next) {
        b.disabled = true;
        b.classList.add('used');
        $('.seq-fill', slots[next]).innerHTML = `${ic(steps[k].ic)}<span>${esc(steps[k].text)}</span>`;
        slots[next].classList.add('filled');
        next++;
        sfx.good();
        if (next === steps.length) {
          over = true;
          clearInterval(timerId);
          showFeedback({ good: true, title: 'Urutannya tepat!', text: 'Kamu menyusun semua langkah dengan benar.' });
          later(() => finishLevel(lv, lives), 1700);
        }
      } else {
        b.classList.remove('wrong');
        void b.offsetWidth;
        b.classList.add('wrong');
        sfx.bad();
        setLives(lives - 1);
        showFeedback({ good: false, title: 'Belum tepat', text: steps[next].hint });
        if (lives <= 0) { over = true; clearInterval(timerId); later(() => failLevel(lv), 1700); }
      }
    }));

    if (seconds) {
      const start = performance.now();
      const bar = $('#tbar');
      timerId = setInterval(() => {
        const left = Math.max(0, 1 - (performance.now() - start) / (seconds * 1000));
        bar.style.width = (left * 100) + '%';
        bar.classList.toggle('low', left < 0.3);
        if (left <= 0 && !over) {
          over = true;
          clearInterval(timerId);
          sfx.bad();
          failLevel(lv, 'Waktu habis!', 'Saat latihan, langkah evakuasi harus cepat dan tertib. Coba lagi!');
        }
      }, 100);
    }
  }

  /* ================= Pulau Siaga Warga: tata ruang pesisir ================= */

  function playSort(lv) {
    const items = shuffle(ZONE_ITEMS);
    let i = 0, over = false;
    $('#stage').innerHTML = `
      <div class="sort">
        <div class="sort-zone z-risk">
          <div class="sz-head">${ic('wave')}<div><b>Zona rawan</b><span>dekat pantai</span></div></div>
          <div class="sz-pile" id="pileRisk"></div>
        </div>
        <div class="sort-center">
          <p class="q-count" id="sortCount"></p>
          <div class="sort-card card" id="sortCard" aria-live="polite"></div>
          <div class="sort-btns">
            <button class="btn sort-btn" data-zone="risk" type="button">${ic('arrow-left')} Zona rawan</button>
            <button class="btn green sort-btn" data-zone="safe" type="button">Zona aman ${ic('arrow-right')}</button>
          </div>
        </div>
        <div class="sort-zone z-safe">
          <div class="sz-head">${ic('mountain')}<div><b>Zona aman</b><span>tinggi / jauh dari pantai</span></div></div>
          <div class="sz-pile" id="pileSafe"></div>
        </div>
      </div>`;

    function showCard() {
      const it = items[i];
      $('#sortCount').textContent = `Bangunan ${i + 1} dari ${items.length}`;
      const card = $('#sortCard');
      card.innerHTML = `${ic(it.ic)}<b>${esc(it.label)}</b>`;
      card.classList.remove('pop');
      void card.offsetWidth;
      card.classList.add('pop');
    }
    function choose(zone) {
      if (over) return;
      const it = items[i];
      const card = $('#sortCard');
      if (zone === it.zone) {
        sfx.good();
        $(zone === 'risk' ? '#pileRisk' : '#pileSafe').insertAdjacentHTML('beforeend',
          `<span class="pile-item" title="${esc(it.label)}">${ic(it.ic)}<small>${esc(it.label)}</small></span>`);
        showFeedback({ good: true, title: 'Tepat!', text: it.why });
        i++;
        if (i === items.length) { over = true; card.innerHTML = ic('check', 'done'); later(() => finishLevel(lv, lives), 1700); }
        else showCard();
      } else {
        sfx.bad();
        setLives(lives - 1);
        card.classList.remove('wrong');
        void card.offsetWidth;
        card.classList.add('wrong');
        showFeedback({ good: false, title: 'Kurang tepat', text: it.why });
        if (lives <= 0) { over = true; later(() => failLevel(lv), 1700); }
      }
    }
    $$('.sort-btn').forEach(b => b.addEventListener('click', () => choose(b.dataset.zone)));
    const onKey = e => {
      if ($('#modal').classList.contains('open')) return;
      if (e.code === 'ArrowLeft') { e.preventDefault(); choose('risk'); }
      if (e.code === 'ArrowRight') { e.preventDefault(); choose('safe'); }
    };
    window.addEventListener('keydown', onKey);
    onCleanup(() => window.removeEventListener('keydown', onKey));
    showCard();
  }

  /* ================= Level 1: Tanda alam ================= */

  function playSigns(lv) {
    const cards = shuffle(SIGNS);
    const need = SIGNS.filter(s => s.ok).length;
    let found = 0;
    let over = false;
    $('#stage').innerHTML = `
      <div class="sign-grid">
        ${cards.map((c, i) => `<button class="sign-card card" data-i="${i}" type="button">
          <span class="emo ${c.anim || ''}" aria-hidden="true">${ic(c.ic)}</span>
          <span class="lbl">${esc(c.label)}</span>
          <span class="mark" aria-hidden="true"></span>
        </button>`).join('')}
      </div>
      <p class="progress-line">Tanda ditemukan: <b id="found">0</b> / ${need}</p>`;

    $$('.sign-card').forEach(btn => btn.addEventListener('click', () => {
      if (over || btn.disabled) return;
      const c = cards[Number(btn.dataset.i)];
      btn.disabled = true;
      if (c.ok) {
        found++;
        btn.classList.add('is-good');
        $('.mark', btn).innerHTML = ic('check');
        $('#found').textContent = found;
        sfx.good();
        showFeedback({ good: true, title: 'Betul, itu tanda tsunami!', text: c.why });
        if (found === need) { over = true; later(() => finishLevel(lv, lives), 1700); }
      } else {
        btn.classList.add('is-bad');
        $('.mark', btn).innerHTML = ic('cross');
        sfx.bad();
        setLives(lives - 1);
        showFeedback({ good: false, title: 'Bukan tanda tsunami', text: c.why });
        if (lives <= 0) { over = true; later(() => failLevel(lv), 1700); }
      }
    }));
  }

  /* ================= Level 2: Tas siaga ================= */

  function playBag(lv) {
    const items = shuffle(ITEMS);
    const need = ITEMS.filter(it => it.ok).length;
    let got = 0;
    let over = false;
    $('#stage').innerHTML = `
      <div class="bag-layout">
        <div class="shelf card">
          <h3>${ic('house')} Barang di rumah</h3>
          <div class="shelf-grid">
            ${items.map((it, i) => `<button class="item" data-i="${i}" type="button" aria-label="Masukkan ${esc(it.label)}">
              <span class="emo" aria-hidden="true">${ic(it.ic)}</span><span class="lbl">${esc(it.label)}</span>
            </button>`).join('')}
          </div>
        </div>
        <div class="bag card" id="bag">
          <h3>Tas Siaga</h3>
          <div class="bag-emo" aria-hidden="true">${ic('bag')}</div>
          <p class="bag-count"><b id="got">0</b> / ${need} barang</p>
          <div class="slots">${Array.from({ length: need }, () => '<span class="slot"></span>').join('')}</div>
          <p class="hint">Seret barang ke sini atau ketuk barangnya</p>
        </div>
      </div>`;

    const bag = $('#bag');
    const overBag = ev => {
      const r = bag.getBoundingClientRect();
      return ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
    };

    function drop(btn) {
      if (over || btn.disabled) return;
      const it = items[Number(btn.dataset.i)];
      btn.disabled = true;
      if (it.ok) {
        btn.classList.add('used');
        const slot = $$('.slot')[got];
        slot.innerHTML = ic(it.ic);
        slot.classList.add('filled');
        got++;
        $('#got').textContent = got;
        bag.classList.remove('gulp');
        void bag.offsetWidth;
        bag.classList.add('gulp');
        sfx.good();
        showFeedback({ good: true, title: `${it.label} masuk tas!`, text: it.why });
        if (got === need) { over = true; later(() => finishLevel(lv, lives), 1700); }
      } else {
        btn.classList.add('rejected');
        sfx.bad();
        setLives(lives - 1);
        showFeedback({ good: false, title: `${it.label}? Tidak perlu!`, text: it.why });
        if (lives <= 0) { over = true; later(() => failLevel(lv), 1700); }
      }
    }

    $$('.item').forEach(btn => {
      btn.addEventListener('pointerdown', e => {
        if (over || btn.disabled || e.button > 0) return;
        e.preventDefault();
        const sx = e.clientX, sy = e.clientY;
        let ghost = null;
        const move = ev => {
          if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
            ghost = btn.cloneNode(true);
            ghost.className = 'drag-ghost';
            document.body.appendChild(ghost);
            btn.classList.add('lifting');
          }
          if (ghost) {
            ghost.style.left = ev.clientX + 'px';
            ghost.style.top = ev.clientY + 'px';
            bag.classList.toggle('hover', overBag(ev));
          }
        };
        const up = ev => {
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
          window.removeEventListener('pointercancel', up);
          if (ghost) {
            ghost.remove();
            btn.classList.remove('lifting');
            bag.classList.remove('hover');
            if (ev.type === 'pointerup' && overBag(ev)) drop(btn);
          } else if (ev.type === 'pointerup') {
            drop(btn); // ketukan biasa
          }
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
        onCleanup(() => {
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
          window.removeEventListener('pointercancel', up);
          if (ghost) ghost.remove();
        });
      });
      // Enter/Spasi dari keyboard
      btn.addEventListener('click', e => { if (e.detail === 0) drop(btn); });
    });
  }

  /* ================= Level 3: Jalur evakuasi ================= */

  function playRoute(lv) {
    const rows = ROUTE_MAP.length;
    const cols = ROUTE_MAP[0].length;
    const TILES = {
      S: { cls: 'sea', label: 'Laut', ic: 'wave' },
      B: { cls: 'beach', label: 'Pantai', ic: '' },
      R: { cls: 'river', label: 'Sungai', ic: '' },
      '#': { cls: 'block', label: 'Reruntuhan', ic: 'bricks' },
      '.': { cls: 'road', label: 'Jalan', ic: '' },
      u: { cls: 'road', label: 'Rambu evakuasi ke atas', sign: 'arrow-up' },
      r: { cls: 'road', label: 'Rambu evakuasi ke kanan', sign: 'arrow-right' },
      H: { cls: 'hill', label: 'Bukit', ic: '' },
      G: { cls: 'goal', label: 'Titik kumpul', ic: 'flag' },
      P: { cls: 'home', label: 'Rumahmu', ic: 'house' }
    };
    const DANGER = {
      S: { title: 'Itu laut!', text: 'Saat ada ancaman tsunami, menjauhlah dari laut.' },
      B: { title: 'Jangan ke pantai!', text: 'Pantai adalah tempat paling berbahaya. Bergeraklah menjauh dari laut.' },
      R: { title: 'Jauhi sungai!', text: 'Gelombang tsunami bisa masuk jauh ke daratan lewat sungai. Cari jalan lain.' }
    };
    const beachDecor = { 1: 'umbrella', 4: 'palm' };

    let pr = 0, pc = 0;
    ROUTE_MAP.forEach((row, r) => { const c = row.indexOf('P'); if (c >= 0) { pr = r; pc = c; } });
    let over = false, moves = 0, seenSign = false, seenHill = false;

    $('#stage').innerHTML = `
      <div class="route-layout">
        <div class="board card" id="board" style="--cols:${cols}">
          ${ROUTE_MAP.map((row, r) => Array.from(row).map((ch, c) => {
            const t = TILES[ch];
            const art = ch === 'B' ? (beachDecor[r] || '') : (t.ic || '');
            return `<button class="tile t-${t.cls}" data-r="${r}" data-c="${c}" type="button" tabindex="-1" aria-label="${t.label}">
              ${t.sign ? `<span class="sign">${ic(t.sign)}</span>` : ''}${art ? ic(art) : ''}</button>`;
          }).join('')).join('')}
        </div>
        <div class="route-side">
          <div class="dpad" role="group" aria-label="Tombol arah">
            <button class="up" data-d="-1,0" type="button" aria-label="Atas">${ic('arrow-up')}</button>
            <button class="left" data-d="0,-1" type="button" aria-label="Kiri">${ic('arrow-left')}</button>
            <span class="mid" aria-hidden="true">${ic('kid')}</span>
            <button class="right" data-d="0,1" type="button" aria-label="Kanan">${ic('arrow-right')}</button>
            <button class="down" data-d="1,0" type="button" aria-label="Bawah">${ic('arrow-down')}</button>
          </div>
          <p class="moves">Langkah: <b id="moves">0</b></p>
          <ul class="legend card">
            <li><i class="sw t-road"></i>Jalan</li>
            <li><i class="sw sign-sw">${ic('arrow-up')}</i>Rambu jalur evakuasi</li>
            <li><i class="sw t-hill"></i>Bukit (tempat tinggi)</li>
            <li><i class="sw t-goal"></i>Titik kumpul</li>
            <li><i class="sw t-block"></i>Reruntuhan</li>
            <li><i class="sw t-sea"></i>Laut (bahaya)</li>
            <li><i class="sw t-beach"></i>Pantai (bahaya)</li>
            <li><i class="sw t-river"></i>Sungai (bahaya)</li>
          </ul>
        </div>
      </div>`;

    const board = $('#board');
    const tileAt = (r, c) => board.children[r * cols + c];
    const player = document.createElement('span');
    player.className = 'player';
    player.setAttribute('aria-label', 'Kamu');
    player.innerHTML = ic('kid');
    const place = () => {
      const t = tileAt(pr, pc);
      player.remove();
      void player.offsetWidth;
      t.appendChild(player);
    };
    place();

    function bump(el, bad) {
      el.classList.remove('bump', 'hit');
      void el.offsetWidth;
      el.classList.add(bad ? 'hit' : 'bump');
    }

    function tryMove(dr, dc) {
      if (over) return;
      const nr = pr + dr, nc = pc + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) { bump(tileAt(pr, pc)); return; }
      const ch = ROUTE_MAP[nr][nc];
      const el = tileAt(nr, nc);
      if (DANGER[ch]) {
        bump(el, true);
        sfx.bad();
        setLives(lives - 1);
        showFeedback({ good: false, title: DANGER[ch].title, text: DANGER[ch].text });
        if (lives <= 0) { over = true; later(() => failLevel(lv), 1700); }
        return;
      }
      if (ch === '#') {
        bump(el);
        showFeedback({ good: false, title: 'Jalan tertutup', text: 'Ada reruntuhan di sini. Cari jalan lain, ya!', autoHide: 2000 });
        return;
      }
      pr = nr; pc = nc;
      moves++;
      $('#moves').textContent = moves;
      place();
      sfx.click();
      if ((ch === 'u' || ch === 'r') && !seenSign) {
        seenSign = true;
        showFeedback({ good: true, title: 'Rambu jalur evakuasi!', text: 'Ikuti arah rambu hijau ini menuju tempat tinggi.' });
      } else if (ch === 'H' && !seenHill) {
        seenHill = true;
        showFeedback({ good: true, title: 'Kamu sudah di bukit!', text: 'Tempat tinggi lebih aman. Terus ke bendera titik kumpul.' });
      }
      if (ch === 'G') {
        over = true;
        showFeedback({ good: true, title: 'Sampai di titik kumpul!', text: `Kamu tiba dengan ${moves} langkah. Hebat!` });
        later(() => finishLevel(lv, lives), 1600);
      }
    }

    $$('.dpad button').forEach(b => b.addEventListener('click', () => {
      const [dr, dc] = b.dataset.d.split(',').map(Number);
      tryMove(dr, dc);
    }));
    $$('.tile', board).forEach(t => t.addEventListener('click', () => {
      const dr = Number(t.dataset.r) - pr;
      const dc = Number(t.dataset.c) - pc;
      if (Math.abs(dr) + Math.abs(dc) === 1) tryMove(dr, dc);
    }));
    const KEYS = { ArrowUp: [-1, 0], KeyW: [-1, 0], ArrowDown: [1, 0], KeyS: [1, 0], ArrowLeft: [0, -1], KeyA: [0, -1], ArrowRight: [0, 1], KeyD: [0, 1] };
    const onKey = e => {
      if ($('#modal').classList.contains('open')) return;
      const d = KEYS[e.code];
      if (!d) return;
      e.preventDefault();
      tryMove(d[0], d[1]);
    };
    window.addEventListener('keydown', onKey);
    onCleanup(() => window.removeEventListener('keydown', onKey));
  }

  /* ================= Level 4 & 6: Kuis situasi ================= */

  function playQuiz(lv, questions, seconds) {
    let qi = 0;
    let locked = false;
    let timerId = 0;
    onCleanup(() => clearInterval(timerId));

    function show() {
      const q = questions[qi];
      const opts = shuffle(q.options);
      locked = false;
      $('#stage').innerHTML = `
        <div class="quiz">
          <p class="q-count">Situasi ${qi + 1} dari ${questions.length}</p>
          ${q.art
            ? `<div class="scene card map-scene"><div class="map-art">${art(q.art)}</div><p>${esc(q.text)}</p></div>`
            : `<div class="scene card"><span class="scene-emo" aria-hidden="true">${ic(q.ic)}</span><p>${esc(q.text)}</p></div>`}
          ${seconds ? '<div class="timer" aria-hidden="true"><i id="tbar"></i></div>' : ''}
          <div class="options">
            ${opts.map((o, i) => `<button class="opt card" data-i="${i}" type="button">
              <span class="opt-emo" aria-hidden="true">${ic(o.ic)}</span><span>${esc(o.text)}</span></button>`).join('')}
          </div>
        </div>`;
      $$('.opt').forEach(b => b.addEventListener('click', () => answer(opts, opts[Number(b.dataset.i)], b)));
      // Pastikan situasi dan pilihan terlihat tanpa perlu scroll saat waktu berjalan.
      $('.quiz').scrollIntoView({ block: 'start', behavior: qi ? 'smooth' : 'auto' });
      if (seconds) {
        const start = performance.now();
        const bar = $('#tbar');
        timerId = setInterval(() => {
          const left = Math.max(0, 1 - (performance.now() - start) / (seconds * 1000));
          bar.style.width = (left * 100) + '%';
          bar.classList.toggle('low', left < 0.3);
          if (left <= 0) answer(opts, null, null);
        }, 100);
      }
    }

    function answer(opts, chosen, btn) {
      if (locked) return;
      locked = true;
      clearInterval(timerId);
      const buttons = $$('.opt');
      buttons.forEach(b => { b.disabled = true; });
      const okIdx = opts.findIndex(o => o.ok);
      const okOpt = opts[okIdx];
      buttons[okIdx].classList.add('correct');
      const right = !!(chosen && chosen.ok);
      if (right) {
        sfx.good();
      } else {
        sfx.bad();
        if (btn) btn.classList.add('wrong');
        setLives(lives - 1);
      }
      const title = right ? 'Tepat sekali!' : chosen ? 'Kurang tepat' : 'Waktu habis!';
      const text = right ? okOpt.why
        : chosen ? `${chosen.why} Jawaban yang tepat: ${okOpt.text}.`
        : `Saat bencana, keputusan harus cepat. Jawaban yang tepat: ${okOpt.text}.`;
      const lastQ = qi === questions.length - 1;
      showFeedback({
        good: right, title, text,
        nextLabel: lives <= 0 ? 'Lihat hasil' : lastQ ? 'Selesai' : 'Situasi berikutnya',
        nextIcon: lastQ && lives > 0 ? 'check' : 'arrow-right',
        next: () => {
          if (lives <= 0) return failLevel(lv);
          if (lastQ) return finishLevel(lv, lives);
          qi++;
          show();
        }
      });
    }

    show();
  }

  /* ================= Level 5: Lari ke bukit ================= */

  function playRunner(lv) {
    $('#stage').innerHTML = `
      <div class="runner card">
        <div class="runner-top">
          ${ic('house')}
          <div class="meter" role="progressbar" aria-label="Jarak ke bukit" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="dist"></i></div>
          ${ic('mountain')}
        </div>
        <canvas id="cv" aria-label="Lari ke bukit. Tekan spasi atau ketuk untuk melompat."></canvas>
        <div class="runner-help">
          <button class="btn big" id="jumpBtn" type="button">${ic('arrow-up')} Lompat</button>
          <span>atau tekan <kbd>Spasi</kbd> / ketuk layar</span>
        </div>
      </div>`;

    $('.runner').scrollIntoView({ block: 'start' });
    const cv = $('#cv');
    const ctx = cv.getContext('2d');
    const meter = $('#dist');
    const meterWrap = meter.parentElement;
    const img = name => window.SiagaIcons.image(name);
    // Gambar ikon dengan dasar ikon (base = posisi y dasar di kanvas 64) tepat di garis y.
    function drawIcon(name, cx, bottomY, size, base = 58) {
      const im = img(name);
      if (!im.complete || !im.naturalWidth) return;
      ctx.drawImage(im, cx - size / 2, bottomY - size * (base / 64), size, size);
    }

    const TOTAL = 5200, SPEED = 290, GRAV = 2200, JUMP = 800;
    const OBS = [
      { name: 'rock', w: 34, h: 28, size: 48, base: 56 },
      { name: 'log', w: 40, h: 22, size: 54, base: 51 },
      { name: 'barrier', w: 38, h: 34, size: 50, base: 58 }
    ];

    let W = 0, H = 0, gy = 0, px = 0;
    let dist = 0, py = 0, vy = 0, onGround = true;
    let obstacles = [], nextSpawn = 650;
    let invuln = 0, shake = 0, waveX = 0;
    let state = 'count', count = 3, runT = 0, t = 0;
    let raf = 0, last = 0;

    function resize() {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gy = H - 48;
      px = Math.max(120, W * 0.32);
      if (onGround) py = gy;
    }
    const waveTarget = () => (state === 'win' ? 0 : px * [1, 0.72, 0.46, 0.2][lives]);

    resize();
    waveX = waveTarget();
    window.addEventListener('resize', resize);
    onCleanup(() => window.removeEventListener('resize', resize));

    function jump() {
      if (state === 'run' && onGround) {
        vy = -JUMP;
        onGround = false;
        sfx.jump();
      }
    }
    const onKey = e => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', onKey);
    onCleanup(() => window.removeEventListener('keydown', onKey));
    cv.addEventListener('pointerdown', e => { e.preventDefault(); jump(); });
    const jumpBtn = $('#jumpBtn');
    jumpBtn.addEventListener('pointerdown', e => { e.preventDefault(); jump(); });
    jumpBtn.addEventListener('click', e => { if (e.detail === 0) jump(); });

    function hit() {
      setLives(lives - 1);
      invuln = 1.1;
      shake = 0.35;
      sfx.bad();
      if (lives <= 0) {
        state = 'caught';
        later(() => failLevel(lv, 'Gelombang menyusul!', 'Kamu tersandung terlalu sering. Lompati rintangan tepat waktu, lalu coba lagi!'), 1300);
      } else {
        showFeedback({ good: false, title: 'Aduh, tersandung!', text: 'Hati-hati melangkah. Jatuh saat evakuasi membuatmu lambat.', autoHide: 1600 });
      }
    }

    function update(dt) {
      t += dt;
      shake = Math.max(0, shake - dt);
      waveX += (waveTarget() - waveX) * Math.min(1, dt * 3);
      if (state === 'count') {
        count -= dt;
        if (count <= 0) state = 'run';
        return;
      }
      if (state !== 'run') return;

      runT += dt;
      dist += SPEED * dt;
      while (nextSpawn < dist + W && nextSpawn < TOTAL - 450) {
        obstacles.push(Object.assign({ x: nextSpawn, hit: false }, OBS[Math.floor(Math.random() * OBS.length)]));
        nextSpawn += 380 + Math.random() * 360;
      }
      obstacles = obstacles.filter(o => o.x - dist > -px - 80);

      vy += GRAV * dt;
      py += vy * dt;
      if (py >= gy) { py = gy; vy = 0; onGround = true; }
      invuln = Math.max(0, invuln - dt);

      for (const o of obstacles) {
        if (o.hit) continue;
        const sx = px + (o.x - dist);
        const overlapX = px + 14 > sx - o.w / 2 + 4 && px - 14 < sx + o.w / 2 - 4;
        const overlapY = py > gy - o.h + 4;
        if (overlapX && overlapY) {
          o.hit = true;
          if (invuln <= 0) hit();
          if (state !== 'run') return;
        }
      }

      if (dist >= TOTAL) {
        dist = TOTAL;
        state = 'win';
        showFeedback({ good: true, title: 'Sampai di titik kumpul!', text: 'Kamu berhasil mengikuti jalur evakuasi ke tempat tinggi.' });
        later(() => finishLevel(lv, lives), 1600);
      }
      const pct = Math.round(dist / TOTAL * 100);
      meter.style.width = pct + '%';
      meterWrap.setAttribute('aria-valuenow', pct);
    }

    function rrect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function bigText(text, y, size = 52) {
      ctx.font = `700 ${size}px Fredoka, "Comic Sans MS", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 7;
      ctx.strokeStyle = INK;
      ctx.lineJoin = 'round';
      ctx.strokeText(text, W / 2, y);
      ctx.fillStyle = '#fff';
      ctx.fillText(text, W / 2, y);
    }

    // Anak kartun yang berlari ke kanan; kaki di (x, y).
    function limb(x1, y1, x2, y2, color) {
      ctx.lineCap = 'round';
      ctx.strokeStyle = INK;
      ctx.lineWidth = 11;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
    function drawKid(x, y) {
      const running = state === 'run' && onGround;
      const cheer = state === 'win';
      const ph = running ? t * 16 : 0;
      ctx.save();
      ctx.translate(x, y);
      // kaki
      const legA = running ? Math.sin(ph) * 0.8 : (onGround ? 0.25 : 0.9);
      const legB = running ? -Math.sin(ph) * 0.8 : (onGround ? -0.25 : -0.3);
      limb(0, -22, Math.sin(legB) * 18, -22 + Math.cos(legB) * 20, '#3d5a98');
      limb(0, -22, Math.sin(legA) * 18, -22 + Math.cos(legA) * 20, '#4a6fb5');
      // lengan belakang
      const armA = running ? -Math.sin(ph) * 0.9 : 0.6;
      if (cheer) limb(-2, -40, -14, -62, '#ffd2a1');
      else limb(-2, -40, Math.sin(armA) * 16 - 2, -40 + Math.cos(armA) * 16, '#ffd2a1');
      // badan
      rrect(-11, -48, 22, 30, 8);
      ctx.fillStyle = '#ff8a3d';
      ctx.lineWidth = 3;
      ctx.strokeStyle = INK;
      ctx.fill();
      ctx.stroke();
      // lengan depan
      if (cheer) limb(2, -40, 16, -62, '#ffd2a1');
      else limb(2, -40, Math.sin(-armA) * 16 + 2, -40 + Math.cos(-armA) * 16, '#ffd2a1');
      // kepala
      ctx.lineWidth = 3;
      ctx.strokeStyle = INK;
      ctx.fillStyle = '#ffd2a1';
      ctx.beginPath(); ctx.arc(3, -61, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#4a3224';
      ctx.beginPath(); ctx.arc(3, -61, 13, Math.PI * 1.05, Math.PI * 1.95); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = INK;
      ctx.beginPath(); ctx.arc(9, -61, 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(8, -56, 4, 0.2, Math.PI * 0.8); ctx.stroke();
      ctx.restore();
    }

    function drawWave() {
      const top = gy - 130;
      const x = waveX;
      ctx.lineWidth = 3;
      ctx.strokeStyle = INK;
      ctx.fillStyle = '#2f8ee0';
      ctx.beginPath();
      ctx.moveTo(-20, H + 5);
      ctx.lineTo(-20, top + 20);
      ctx.quadraticCurveTo(x * 0.45, top - 28 + Math.sin(t * 3) * 6, x + 14, top + 22);
      ctx.quadraticCurveTo(x - 20, top + 30, x - 6, top + 58);
      for (let y = top + 58; y <= H + 5; y += 10) ctx.lineTo(x + Math.sin(y * 0.07 + t * 8) * 6, y);
      ctx.lineTo(-20, H + 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.22)';
      ctx.fillRect(-20, top + 70, Math.max(0, x - 20), 10);
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 6; i++) {
        const fx = x * 0.12 + i * x * 0.16;
        const fy = top + 4 + Math.sin(t * 4 + i) * 4 - i * 2;
        ctx.beginPath();
        ctx.arc(fx, fy, 7 + (i % 3) * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawSign(x) {
      ctx.fillStyle = '#8a6a4a';
      ctx.strokeStyle = INK;
      ctx.lineWidth = 3;
      ctx.fillRect(x - 3, gy - 70, 6, 70);
      ctx.strokeRect(x - 3, gy - 70, 6, 70);
      rrect(x - 66, gy - 106, 132, 38, 9);
      ctx.fillStyle = '#1f9d55';
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = '700 15px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('EVAKUASI', x - 10, gy - 87);
      // panah ke kanan
      ctx.beginPath();
      ctx.moveTo(x + 38, gy - 95);
      ctx.lineTo(x + 54, gy - 87);
      ctx.lineTo(x + 38, gy - 79);
      ctx.closePath();
      ctx.fill();
    }

    function draw() {
      ctx.save();
      ctx.clearRect(0, 0, W, H);
      if (shake > 0) ctx.translate((Math.random() - 0.5) * 8, 0);

      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#7fcbff');
      sky.addColorStop(1, '#d8f2ff');
      ctx.fillStyle = sky;
      ctx.fillRect(-10, 0, W + 20, H);

      ctx.lineWidth = 3;
      ctx.strokeStyle = INK;
      ctx.fillStyle = '#ffd23f';
      ctx.beginPath();
      ctx.arc(W - 60, 50, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // bukit jauh (parallax)
      const hs = 320, hOff = dist * 0.15;
      ctx.fillStyle = '#a6dd8a';
      for (let k = Math.floor(hOff / hs) - 1; k * hs - hOff < W + hs; k++) {
        const x = k * hs - hOff;
        ctx.beginPath();
        ctx.ellipse(x + 160, gy, 190, 70, 0, Math.PI, 0);
        ctx.fill();
        ctx.stroke();
      }

      // rumah & pohon (parallax)
      const ps = 210, pOff = dist * 0.5;
      for (let k = Math.floor(pOff / ps) - 1; k * ps - pOff < W + ps; k++) {
        const x = k * ps - pOff + 40;
        if (((k % 2) + 2) % 2) drawIcon('palm', x, gy + 2, 64, 59);
        else drawIcon('house', x, gy + 2, 50, 56);
      }

      // rambu jalur evakuasi
      for (let s = 300; s < TOTAL - 300; s += 900) {
        const x = px + (s - dist);
        if (x > -80 && x < W + 80) drawSign(x);
      }

      // bukit tujuan
      const hx = px + (TOTAL - dist) + 60;
      if (hx < W + 260) {
        ctx.fillStyle = '#6cc24a';
        ctx.strokeStyle = INK;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(hx + 150, gy + 4, 230, 150, 0, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        drawIcon('flag', hx + 150, gy - 143, 56, 58);
        ctx.font = '700 16px Fredoka, sans-serif';
        ctx.fillStyle = INK;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('TITIK KUMPUL', hx + 150, gy - 110);
      }

      // jalan
      ctx.fillStyle = '#8c8fa3';
      ctx.strokeStyle = INK;
      ctx.lineWidth = 3;
      ctx.fillRect(-10, gy, W + 20, H - gy + 10);
      ctx.beginPath();
      ctx.moveTo(-10, gy);
      ctx.lineTo(W + 10, gy);
      ctx.stroke();
      ctx.fillStyle = '#fff';
      const ds = 60;
      for (let k = Math.floor(dist / ds) - 1; k * ds - dist < W + ds; k++) ctx.fillRect(k * ds - dist, gy + 22, 30, 5);

      // rintangan
      for (const o of obstacles) {
        const sx = px + (o.x - dist);
        if (sx < -60 || sx > W + 60) continue;
        ctx.globalAlpha = o.hit ? 0.45 : 1;
        drawIcon(o.name, sx, gy + 3, o.size, o.base);
      }
      ctx.globalAlpha = 1;

      // pemain
      ctx.fillStyle = 'rgba(35,38,58,.2)';
      ctx.beginPath();
      ctx.ellipse(px, gy + 3, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      if (!(invuln > 0 && Math.floor(t * 12) % 2 === 0)) {
        const bob = onGround && state === 'run' ? -Math.abs(Math.sin(t * 14)) * 4 : 0;
        drawKid(px, py + bob);
      }

      drawWave();

      if (state === 'count') bigText(String(Math.max(1, Math.ceil(count))), H / 2 - 20, 72);
      else if (state === 'run' && runT < 0.8) bigText('LARI!', H / 2 - 20, 64);
      else if (state === 'win') bigText('Sampai!', H / 2 - 30);
      else if (state === 'caught') bigText('Gelombang menyusul!', H / 2 - 30, 40);
      ctx.restore();
    }

    function frame(now) {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    onCleanup(() => cancelAnimationFrame(raf));
    jumpBtn.focus({ preventScroll: true });
  }

  /* ================= Mulai ================= */

  $$('[data-ico]').forEach(el => { el.innerHTML = ic(el.dataset.ico); });
  // Muat gambar ikon kanvas lebih awal supaya level lari langsung siap.
  if (window.SiagaIcons) ['rock', 'log', 'barrier', 'palm', 'house', 'flag'].forEach(n => window.SiagaIcons.image(n));
  $('#logoBtn').addEventListener('click', showHome);
  $('#soundBtn').addEventListener('click', () => {
    save.sound = !save.sound;
    persist();
    updateHeader();
    sfx.click();
  });
  updateHeader();
  showHome();
  if (!save.introSeen) openIntro();
})();
