/* Nusa Siaga — game edukasi mitigasi bencana tsunami (7 pulau, 70 misi). */
(() => {
  'use strict';

  /* ================= Data pulau & level ================= */

  const ISLANDS = [
    {
      id: 'basic', no: 1, name: 'Pulau Ilmu', theme: 'Mengenal Tsunami', tag: 'basic', art: 'island-basic',
      desc: 'Pengetahuan dasar: pengertian tsunami, proses terjadinya, penyebab, syarat gempa pemicu, dan dampaknya.'
    },
    {
      id: 'struct', no: 2, name: 'Pulau Benteng', theme: 'Mitigasi Struktural', tag: 'struct', art: 'island-struct',
      desc: 'Bangunan dan alam yang melindungi pesisir: tanggul, pemecah gelombang, mangrove, bangunan tahan gempa, dan menara evakuasi.'
    },
    {
      id: 'nonstruct', no: 3, name: 'Pulau Siaga Warga', theme: 'Mitigasi Non-Struktural', tag: 'nonstruct', art: 'island-nonstruct',
      desc: 'Upaya tanpa membangun: peringatan dini, tata ruang pesisir, peta jalur evakuasi, latihan rutin, dan edukasi warga.'
    },
    {
      id: 'response', no: 4, name: 'Pulau Tanggap', theme: 'Sebelum, Saat, dan Sesudah', tag: 'pre', art: 'island-response',
      desc: 'Langkah menyelamatkan diri: kenali tanda alam, siapkan tas siaga, evakuasi, dan tetap waspada setelah gelombang.'
    },
    {
      id: 'recovery', no: 5, name: 'Pulau Pulih', theme: 'Pascabencana dan Pemulihan', tag: 'post', art: 'island-recovery',
      desc: 'Bangkit setelah tsunami: posko pengungsian, pertolongan pertama, kesehatan, pemulihan hati, rehabilitasi, dan rekonstruksi.'
    },
    {
      id: 'history', no: 6, name: 'Pulau Sejarah', theme: 'Jejak Tsunami Indonesia', tag: 'hist', art: 'island-history',
      desc: 'Belajar dari peristiwa nyata: Krakatau 1883, Flores 1992, Aceh 2004, Pangandaran 2006, Mentawai 2010, Palu dan Selat Sunda 2018.'
    },
    {
      id: 'final', no: 7, name: 'Pulau Juara', theme: 'Ujian Akhir', tag: 'final', art: 'island-final',
      desc: 'Tantangan penutup yang menggabungkan semua materi sebelum kamu meraih sertifikat Pahlawan Siaga.'
    }
  ];

  const BASIC_LEVELS = [
    {
      id: 'b1', island: 'basic', phaseKey: 'basic', phase: 'Mengenal tsunami', icon: 'book', type: 'truefalse',
      title: 'Apa Itu Tsunami?',
      mission: 'Baca setiap pernyataan tentang tsunami, lalu tentukan benar atau salah.',
      how: ['Baca pernyataan di kartu.', 'Pilih Benar atau Salah. Pilihan yang keliru mengurangi 1 nyawa.', 'Nilai semua pernyataan untuk menang!'],
      recap: [
        'Tsunami adalah gelombang besar yang menyapu kawasan pantai.',
        'Tsunami terjadi karena dasar laut terangkat atau turun mendadak sehingga air laut terganggu.',
        'Ombak biasa disebabkan angin, sedangkan tsunami disebabkan gangguan di dasar laut.'
      ]
    },
    {
      id: 'b2', island: 'basic', phaseKey: 'basic', phase: 'Mengenal tsunami', icon: 'uplift', type: 'formation',
      title: 'Proses Terjadinya Tsunami',
      mission: 'Susun tahapan terjadinya tsunami, dari dasar laut sampai gelombang menyapu pantai.',
      how: ['Ketuk kartu tahapan sesuai urutan, mulai dari yang pertama.', 'Urutan yang salah mengurangi 1 nyawa.', 'Susun keenam tahapan untuk menang!'],
      recap: [
        'Lempeng di dasar laut bergeser tiba-tiba dan memicu gempa bawah laut.',
        'Dasar laut yang terangkat atau turun mendorong massa air dan membentuk gelombang.',
        'Di laut dalam gelombang melaju sangat cepat, lalu melambat dan meninggi saat mendekati pantai yang dangkal.'
      ]
    },
    {
      id: 'b3', island: 'basic', phaseKey: 'basic', phase: 'Mengenal tsunami', icon: 'magnifier', type: 'causes',
      title: 'Detektif Penyebab',
      mission: 'Pasangkan setiap penyebab tsunami dengan penjelasannya.',
      how: ['Ketuk satu penyebab, lalu ketuk penjelasan yang cocok.', 'Pasangan yang salah mengurangi 1 nyawa.', 'Pasangkan keempat penyebab untuk menang!'],
      recap: [
        'Penyebab tsunami: gempa tektonik bawah laut, letusan gunung berapi, longsor bawah laut, dan hantaman meteor.',
        'Gempa bawah laut adalah penyebab yang paling sering terjadi.',
        'Semuanya sama-sama memindahkan massa air laut secara tiba-tiba.'
      ]
    },
    {
      id: 'b4', island: 'basic', phaseKey: 'basic', phase: 'Mengenal tsunami', icon: 'tectonic', type: 'lab',
      title: 'Lab Gempa Pemicu',
      mission: 'Atur lokasi, kekuatan, kedalaman, dan gerakan gempa untuk menyelesaikan 3 tantangan.',
      how: ['Atur lokasi, magnitudo, kedalaman, dan gerakan lempeng.', 'Tekan Picu gempa! lalu lihat hasilnya.', 'Percobaan yang tidak sesuai tantangan mengurangi 1 nyawa.'],
      recap: [
        'Gempa pemicu tsunami umumnya terjadi di laut, dangkal (kurang dari 60–70 km), dan kuat (lebih dari 7,0).',
        'Gerakan lempeng naik-turun (vertikal) mendorong massa air dan membentuk tsunami.',
        'Gempa yang dalam atau bergeser mendatar umumnya tidak memicu tsunami, tetapi tetap waspada dan ikuti info BMKG.'
      ]
    },
    {
      id: 'b5', island: 'basic', phaseKey: 'basic', phase: 'Mengenal tsunami', icon: 'heart-broken', type: 'quizImpact',
      title: 'Kuis Dampak Tsunami',
      mission: 'Jawab pertanyaan tentang dampak tsunami bagi manusia dan lingkungan.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Tsunami dapat menimbulkan korban jiwa karena waktu evakuasi yang terbatas.',
        'Air laut merusak lahan pertanian, mencemari air, dan merusak ekosistem laut.',
        'Dalam kondisi tertentu, tsunami juga membentuk habitat baru dan menjadi bahan penelitian mitigasi.'
      ]
    },
    {
      id: 'b6', island: 'basic', phaseKey: 'basic', phase: 'Mengenal tsunami', icon: 'ripple', type: 'deepshore',
      title: 'Laut Dalam vs Pantai',
      mission: 'Pilah sifat gelombang tsunami: saat masih di laut dalam atau saat mendekati pantai.',
      how: ['Baca kartu sifat gelombang.', 'Pilih Laut dalam atau Dekat pantai. Pilihan keliru mengurangi 1 nyawa.', 'Pilah semua kartu untuk menang!'],
      recap: [
        'Di laut dalam, tsunami melaju sangat cepat tetapi tingginya rendah sehingga hampir tidak terasa oleh kapal.',
        'Saat mendekati pantai yang dangkal, gelombang melambat dan meninggi.',
        'Air laut bisa surut dulu sebelum gelombang besar datang.'
      ]
    },
    {
      id: 'b7', island: 'basic', phaseKey: 'basic', phase: 'Mengenal tsunami', icon: 'gull', type: 'wavetype',
      title: 'Ombak Biasa atau Tsunami?',
      mission: 'Bedakan ciri ombak biasa dengan ciri gelombang tsunami.',
      how: ['Baca kartu ciri gelombang.', 'Pilih Ombak biasa atau Tsunami. Pilihan keliru mengurangi 1 nyawa.', 'Pilah semua kartu untuk menang!'],
      recap: [
        'Ombak biasa dibangkitkan angin dan hanya menggerakkan permukaan air.',
        'Tsunami menggerakkan seluruh air dari dasar laut sampai permukaan.',
        'Gelombang tsunami datang berjarak beberapa menit dan bisa masuk jauh ke daratan.'
      ]
    },
    {
      id: 'b8', island: 'basic', phaseKey: 'basic', phase: 'Mengenal tsunami', icon: 'book', type: 'terms',
      title: 'Kamus Tsunami',
      mission: 'Pasangkan istilah tentang gempa dan tsunami dengan artinya.',
      how: ['Ketuk satu istilah, lalu ketuk artinya.', 'Pasangan yang salah mengurangi 1 nyawa.', 'Pasangkan kelima istilah untuk menang!'],
      recap: [
        'Hiposentrum adalah pusat gempa di dalam bumi, episentrum adalah titik di permukaan tepat di atasnya.',
        'Magnitudo menunjukkan besarnya kekuatan gempa.',
        'Kata tsunami berasal dari bahasa Jepang: tsu (pelabuhan) dan nami (gelombang).'
      ]
    },
    {
      id: 'b9', island: 'basic', phaseKey: 'basic', phase: 'Mengenal tsunami', icon: 'map', type: 'history',
      title: 'Jejak Tsunami di Indonesia',
      mission: 'Pelajari peristiwa tsunami yang pernah terjadi di Indonesia.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Indonesia rawan tsunami karena berada di pertemuan lempeng tektonik dan memiliki banyak gunung api.',
        'Tsunami Aceh 2004 dipicu gempa besar bawah laut, sedangkan tsunami Selat Sunda 2018 dipicu longsoran Gunung Anak Krakatau.',
        'Kearifan lokal smong di Simeulue membantu banyak warga selamat.'
      ]
    },
    {
      id: 'b10', island: 'basic', phaseKey: 'basic', phase: 'Mengenal tsunami', icon: 'timer', type: 'examBasic',
      title: 'Ujian Ilmu Tsunami',
      mission: 'Jawab pertanyaan seputar pengetahuan tsunami sebelum waktunya habis!',
      how: ['Jawab setiap soal sebelum waktunya habis (20 detik).', 'Jawaban salah atau waktu habis mengurangi 1 nyawa.', 'Selesaikan semua soal untuk menang!'],
      recap: [
        'Tsunami terjadi karena air laut terganggu oleh pergerakan mendadak di dasar laut.',
        'Penyebabnya bisa gempa bawah laut, gunung berapi, longsor bawah laut, atau meteor.',
        'Kenali tanda alamnya: gempa kuat, air laut surut tiba-tiba, dan suara gemuruh.'
      ]
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
    },
    {
      id: 's5', island: 'struct', phaseKey: 'struct', phase: 'Mitigasi struktural', icon: 'foundation', type: 'safehouse',
      title: 'Rumah Tahan Gempa',
      mission: 'Pilih semua ciri rumah tahan gempa yang membuat bangunan tidak mudah roboh.',
      how: ['Ketuk kartu yang merupakan ciri rumah tahan gempa.', 'Ciri yang salah mengurangi 1 nyawa.', 'Temukan keempat cirinya untuk menang!'],
      recap: [
        'Rumah tahan gempa memiliki fondasi kuat yang menyatu dengan bangunan.',
        'Kolom dan balok beton bertulang saling terikat kuat.',
        'Atap yang ringan mengurangi beban saat bangunan berguncang.'
      ]
    },
    {
      id: 's6', island: 'struct', phaseKey: 'struct', phase: 'Mitigasi struktural', icon: 'stairs', type: 'towerpick',
      title: 'Menara Evakuasi Ideal',
      mission: 'Pilih semua ciri menara evakuasi yang baik untuk menyelamatkan warga.',
      how: ['Ketuk kartu yang merupakan ciri menara evakuasi yang baik.', 'Ciri yang salah mengurangi 1 nyawa.', 'Temukan keempat cirinya untuk menang!'],
      recap: [
        'Menara evakuasi harus lebih tinggi dari perkiraan ketinggian tsunami dan kuat menahan gempa.',
        'Menara harus dekat permukiman, bisa dicapai berjalan kaki, dan selalu terbuka saat darurat.',
        'Tangga atau ramp yang lebar memudahkan anak, lansia, dan penyandang disabilitas.'
      ]
    },
    {
      id: 's7', island: 'struct', phaseKey: 'struct', phase: 'Mitigasi struktural', icon: 'broom', type: 'care',
      title: 'Rawat Benteng Pantai',
      mission: 'Pilah tindakan warga: merawat atau merusak bangunan pelindung pantai.',
      how: ['Baca kartu tindakan.', 'Pilih Merawat atau Merusak. Pilihan keliru mengurangi 1 nyawa.', 'Pilah semua tindakan untuk menang!'],
      recap: [
        'Bangunan pelindung harus dirawat agar tetap berfungsi saat dibutuhkan.',
        'Menebang mangrove dan mengambil batu pemecah gelombang merusak pertahanan pantai.',
        'Warga ikut menjaga dengan tidak membuang sampah dan melaporkan kerusakan.'
      ]
    },
    {
      id: 's8', island: 'struct', phaseKey: 'struct', phase: 'Mitigasi struktural', icon: 'tower', type: 'routeTower',
      title: 'Lari ke Menara Evakuasi',
      mission: 'Desamu datar dan jauh dari bukit. Bawa dirimu ke menara evakuasi.',
      how: ['Bergerak dengan tombol panah, keyboard, atau ketuk kotak di sebelahmu.', 'Laut, pantai, sungai, dan rumah satu lantai tidak aman (-1 nyawa).', 'Ikuti rambu hijau jalur evakuasi!'],
      recap: [
        'Di desa datar tanpa bukit, menara evakuasi vertikal menjadi tempat berlindung.',
        'Rumah satu lantai tidak cukup tinggi untuk berlindung dari tsunami.',
        'Ikuti rambu jalur evakuasi agar cepat sampai.'
      ]
    },
    {
      id: 's9', island: 'struct', phaseKey: 'struct', phase: 'Mitigasi struktural', icon: 'timer', type: 'quickStruct',
      title: 'Kuis Kilat Benteng',
      mission: 'Jawab cepat pertanyaan tentang bangunan pelindung pantai!',
      how: ['Jawab setiap soal sebelum waktunya habis (15 detik).', 'Jawaban salah atau waktu habis mengurangi 1 nyawa.', 'Selesaikan semua soal untuk menang!'],
      recap: [
        'Pemecah gelombang dipasang di laut lepas, tanggul di garis pantai, dan mangrove di pesisir.',
        'Menara evakuasi untuk desa datar, bangunan tahan gempa untuk rumah dan sekolah.',
        'Semua bangunan pelindung saling melengkapi.'
      ]
    },
    {
      id: 's10', island: 'struct', phaseKey: 'struct', phase: 'Mitigasi struktural', icon: 'crane', type: 'solutions',
      title: 'Masalah dan Solusi',
      mission: 'Pasangkan setiap masalah di pesisir dengan solusi struktural yang tepat.',
      how: ['Ketuk satu masalah, lalu ketuk solusinya.', 'Pasangan yang salah mengurangi 1 nyawa.', 'Pasangkan kelima masalah untuk menang!'],
      recap: [
        'Setiap masalah pesisir punya solusi struktural yang sesuai.',
        'Mitigasi struktural paling efektif jika beberapa bangunan pelindung digabungkan.',
        'Bangunan pelindung tetap harus diiringi kesiapan warga untuk evakuasi.'
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
    },
    {
      id: 'n6', island: 'nonstruct', phaseKey: 'nonstruct', phase: 'Mitigasi non-struktural', icon: 'flag', type: 'signsmatch',
      title: 'Kenali Rambu Evakuasi',
      mission: 'Pasangkan setiap rambu dan tanda evakuasi dengan artinya.',
      how: ['Ketuk satu rambu, lalu ketuk artinya.', 'Pasangan yang salah mengurangi 1 nyawa.', 'Pasangkan kelima rambu untuk menang!'],
      recap: [
        'Rambu jalur evakuasi berwarna hijau dan menunjukkan arah ke tempat aman.',
        'Titik kumpul adalah tempat warga berkumpul dan didata setelah evakuasi.',
        'Zona bahaya harus segera ditinggalkan saat ada peringatan.'
      ]
    },
    {
      id: 'n7', island: 'nonstruct', phaseKey: 'nonstruct', phase: 'Mitigasi non-struktural', icon: 'chat', type: 'hoax',
      title: 'Resmi atau Hoaks?',
      mission: 'Pilah informasi tsunami: berasal dari sumber resmi atau hoaks.',
      how: ['Baca kartu informasi.', 'Pilih Info resmi atau Hoaks. Pilihan keliru mengurangi 1 nyawa.', 'Pilah semua informasi untuk menang!'],
      recap: [
        'Informasi resmi tsunami berasal dari BMKG, BNPB, dan BPBD.',
        'Gempa dan tsunami tidak bisa diramal tanggalnya.',
        'Jangan menyebarkan kabar yang belum jelas sumbernya.'
      ]
    },
    {
      id: 'n8', island: 'nonstruct', phaseKey: 'nonstruct', phase: 'Mitigasi non-struktural', icon: 'family', type: 'familyplan',
      title: 'Rencana Siaga Keluarga',
      mission: 'Pilih semua hal yang perlu ada dalam rencana siaga keluarga.',
      how: ['Ketuk kartu yang termasuk rencana siaga keluarga.', 'Kartu yang salah mengurangi 1 nyawa.', 'Temukan kelima hal penting untuk menang!'],
      recap: [
        'Setiap keluarga perlu titik kumpul yang disepakati bersama.',
        'Simpan nomor darurat dan kontak kerabat di luar daerah.',
        'Tentukan siapa yang membantu anak kecil, lansia, dan anggota keluarga berkebutuhan khusus.'
      ]
    },
    {
      id: 'n9', island: 'nonstruct', phaseKey: 'nonstruct', phase: 'Mitigasi non-struktural', icon: 'school', type: 'routeSchool',
      title: 'Evakuasi dari Sekolah',
      mission: 'Tanda bahaya berbunyi di sekolah. Ikuti jalur evakuasi menuju titik kumpul di bukit.',
      how: ['Bergerak dengan tombol panah, keyboard, atau ketuk kotak di sebelahmu.', 'Laut, pantai, sungai, dan rumah satu lantai tidak aman (-1 nyawa).', 'Ikuti rambu hijau jalur evakuasi!'],
      recap: [
        'Sekolah perlu punya peta jalur evakuasi yang dipasang di tempat umum.',
        'Ikuti rambu dan arahan guru menuju titik kumpul.',
        'Jauhi sungai dan pantai selama evakuasi.'
      ]
    },
    {
      id: 'n10', island: 'nonstruct', phaseKey: 'nonstruct', phase: 'Mitigasi non-struktural', icon: 'timer', type: 'examNonstruct',
      title: 'Ujian Duta Siaga',
      mission: 'Jawab pertanyaan tentang mitigasi non-struktural sebelum waktunya habis!',
      how: ['Jawab setiap soal sebelum waktunya habis (20 detik).', 'Jawaban salah atau waktu habis mengurangi 1 nyawa.', 'Selesaikan semua soal untuk menang!'],
      recap: [
        'Peringatan dini resmi di Indonesia dikeluarkan oleh BMKG.',
        'Latihan rutin, peta evakuasi, tata ruang, dan edukasi termasuk mitigasi non-struktural.',
        'Selalu cek kebenaran informasi sebelum membagikannya.'
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
    },
    {
      id: 'r7', island: 'response', phaseKey: 'pre', phase: 'Sebelum', icon: 'bottle', type: 'familybag',
      title: 'Tas Siaga Keluarga',
      mission: 'Keluargamu punya bayi dan nenek. Pilih semua barang tambahan yang perlu masuk tas siaga.',
      how: ['Ketuk barang yang perlu dibawa.', 'Barang yang tidak perlu mengurangi 1 nyawa.', 'Temukan keenam barang penting untuk menang!'],
      recap: [
        'Sesuaikan isi tas siaga dengan kebutuhan anggota keluarga, seperti bayi dan lansia.',
        'Bawa obat rutin, kacamata cadangan, uang tunai, masker, dan power bank.',
        'Tas siaga tetap harus ringan dan mudah dibawa.'
      ]
    },
    {
      id: 'r8', island: 'response', phaseKey: 'now', phase: 'Saat', icon: 'flashlight', type: 'nightRun',
      title: 'Evakuasi Malam Hari',
      mission: 'Peringatan datang di malam hari. Nyalakan senter dan lari ke bukit!',
      how: ['Tekan tombol Lompat, Spasi, atau ketuk layar untuk melompat.', 'Pandangan terbatas, jadi perhatikan rintangan di dalam cahaya senter.', 'Sampai di bukit untuk menang!'],
      recap: [
        'Tsunami bisa datang kapan saja, termasuk di malam hari.',
        'Simpan senter di dekat tempat tidur dan di dalam tas siaga.',
        'Kenali jalur evakuasi dengan baik agar tetap bisa dilalui dalam gelap.'
      ]
    },
    {
      id: 'r9', island: 'response', phaseKey: 'now', phase: 'Saat', icon: 'family', type: 'helpQuiz',
      title: 'Bantu Sesama',
      mission: 'Pilih cara terbaik membantu orang lain selama evakuasi.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Bantu lansia, anak-anak, ibu hamil, dan penyandang disabilitas selama evakuasi.',
        'Tetap terus bergerak ke tempat tinggi sambil membantu.',
        'Laporkan ke petugas jika ada yang terpisah atau belum terlihat.'
      ]
    },
    {
      id: 'r10', island: 'response', phaseKey: 'now', phase: 'Saat', icon: 'timer', type: 'fullDrill',
      title: 'Ujian Tanggap Darurat',
      mission: 'Susun seluruh langkah tanggap darurat tsunami dengan benar sebelum waktu habis!',
      how: ['Ketuk kartu langkah sesuai urutan yang benar.', 'Waktumu 50 detik. Urutan yang salah mengurangi 1 nyawa.', 'Selesaikan ketujuh langkah untuk menang!'],
      recap: [
        'Lindungi diri saat guncangan, lalu segera evakuasi setelah guncangan berhenti.',
        'Ikuti rambu evakuasi dan tetap di tempat tinggi walau gelombang pertama surut.',
        'Pulang hanya setelah ada pernyataan aman dari petugas.'
      ]
    }
  ];

  // Pulau 5: pascabencana. Istilah rehabilitasi dan rekonstruksi mengikuti UU No. 24 Tahun 2007 Pasal 57–59.
  const RECOVERY_LEVELS = [
    {
      id: 'p1', phase: 'Pemulihan', icon: 'crane', type: 'recoverySteps',
      title: 'Tahapan Pemulihan',
      mission: 'Susun tahapan setelah tsunami, dari menyelamatkan korban sampai membangun kembali.',
      how: ['Ketuk kartu tahapan sesuai urutan, mulai dari yang pertama.', 'Urutan yang salah mengurangi 1 nyawa.', 'Susun kelima tahapan untuk menang!'],
      recap: [
        'Setelah bencana, tanggap darurat dulu: selamatkan korban dan penuhi kebutuhan dasar.',
        'Rehabilitasi memperbaiki dan memulihkan lingkungan, rumah, kesehatan, dan layanan umum.',
        'Rekonstruksi membangun kembali dengan cara yang lebih baik dan tahan bencana.'
      ]
    },
    {
      id: 'p2', phase: 'Pemulihan', icon: 'tent', type: 'shelterPick',
      title: 'Kebutuhan Posko Pengungsian',
      mission: 'Posko pengungsian baru didirikan. Pilih semua kebutuhan utama para pengungsi.',
      how: ['Ketuk kebutuhan yang paling penting di posko.', 'Pilihan yang tidak perlu mengurangi 1 nyawa.', 'Temukan keenam kebutuhan utama untuk menang!'],
      recap: [
        'Pengungsi butuh air bersih, makanan, tempat berteduh, dan pakaian atau selimut.',
        'Obat-obatan dan P3K harus tersedia di posko.',
        'Toilet dan tempat sampah menjaga posko tetap sehat.'
      ]
    },
    {
      id: 'p3', phase: 'Pemulihan', icon: 'firstaid', type: 'firstAidQuiz',
      title: 'Pertolongan Pertama',
      mission: 'Pilih cara menolong yang tepat untuk korban luka ringan.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Luka berdarah ditekan dengan kain bersih, luka kotor dibersihkan dengan air bersih.',
        'Korban yang diduga patah tulang jangan dipindahkan sembarangan.',
        'Kalau ragu, segera panggil orang dewasa atau petugas medis.'
      ]
    },
    {
      id: 'p4', phase: 'Pemulihan', icon: 'no-entry', type: 'afterSort',
      title: 'Aman atau Bahaya?',
      mission: 'Setelah air surut, banyak bahaya tersembunyi. Pilah mana tindakan aman dan mana yang berbahaya.',
      how: ['Baca kartu tindakan.', 'Pilih Aman atau Bahaya. Pilihan keliru mengurangi 1 nyawa.', 'Pilah semua kartu untuk menang!'],
      recap: [
        'Pulang hanya setelah petugas menyatakan daerahmu aman.',
        'Jauhi kabel listrik, bau gas, dan bangunan yang retak.',
        'Pakai sepatu tertutup dan minum air yang sudah direbus.'
      ]
    },
    {
      id: 'p5', phase: 'Pemulihan', icon: 'water', type: 'healthQuiz',
      title: 'Air Bersih, Badan Sehat',
      mission: 'Jaga kesehatan di pengungsian dengan air bersih dan kebiasaan yang sehat.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Air sumur yang tercemar air laut atau lumpur jangan langsung diminum.',
        'Cuci tangan pakai sabun sebelum makan dan setelah dari toilet.',
        'Sampah dan air kotor yang dibiarkan bisa menimbulkan penyakit seperti diare.'
      ]
    },
    {
      id: 'p6', phase: 'Pemulihan', icon: 'heart', type: 'heartMatch',
      title: 'Pulihkan Hati',
      mission: 'Bencana juga melukai perasaan. Pasangkan setiap situasi dengan cara membantu yang tepat.',
      how: ['Ketuk satu situasi, lalu ketuk cara membantunya.', 'Pasangan yang salah mengurangi 1 nyawa.', 'Pasangkan kelima situasi untuk menang!'],
      recap: [
        'Takut, sedih, dan sulit tidur setelah bencana itu wajar.',
        'Dengarkan, temani, dan ajak teman bermain atau belajar bersama.',
        'Ceritakan perasaanmu kepada orang dewasa yang kamu percaya.'
      ]
    },
    {
      id: 'p7', phase: 'Pemulihan', icon: 'broom', type: 'rehabSort',
      title: 'Rehabilitasi atau Rekonstruksi?',
      mission: 'Pilah kegiatan pemulihan: termasuk rehabilitasi atau rekonstruksi?',
      how: ['Baca kartu kegiatan.', 'Pilih Rehabilitasi atau Rekonstruksi. Pilihan keliru mengurangi 1 nyawa.', 'Pilah semua kartu untuk menang!'],
      recap: [
        'Rehabilitasi: memperbaiki lingkungan, membantu perbaikan rumah, memulihkan kesehatan dan perasaan warga.',
        'Rekonstruksi: membangun kembali prasarana dan sarana sosial seperti sekolah.',
        'Rekonstruksi memakai rancang bangun yang lebih baik dan tahan bencana.'
      ]
    },
    {
      id: 'p8', phase: 'Pemulihan', icon: 'gloves', type: 'cleanPick',
      title: 'Bersih-Bersih Aman',
      mission: 'Warga bergotong royong membersihkan puing. Pilih semua cara kerja yang aman.',
      how: ['Ketuk cara kerja yang aman.', 'Pilihan yang berbahaya mengurangi 1 nyawa.', 'Temukan kelima cara aman untuk menang!'],
      recap: [
        'Pakai sarung tangan, sepatu bot, dan masker saat membersihkan puing.',
        'Bekerja berkelompok bersama orang dewasa, jangan sendirian.',
        'Jauhi kabel listrik dan bangunan yang rusak.'
      ]
    },
    {
      id: 'p9', phase: 'Pemulihan', icon: 'foundation', type: 'betterMatch',
      title: 'Bangun Kembali Lebih Aman',
      mission: 'Pasangkan setiap masalah setelah tsunami dengan cara membangun kembali yang lebih aman.',
      how: ['Ketuk satu masalah, lalu ketuk solusinya.', 'Pasangan yang salah mengurangi 1 nyawa.', 'Pasangkan kelima masalah untuk menang!'],
      recap: [
        'Membangun kembali harus lebih aman daripada sebelumnya.',
        'Permukiman dan sekolah ditata di zona aman dengan bangunan tahan gempa.',
        'Mangrove, rambu evakuasi, dan sirene juga dipulihkan.'
      ]
    },
    {
      id: 'p10', phase: 'Pemulihan', icon: 'timer', type: 'examRecovery',
      title: 'Ujian Pemulihan',
      mission: 'Jawab pertanyaan seputar pascabencana sebelum waktunya habis!',
      how: ['Jawab setiap soal sebelum waktunya habis (20 detik).', 'Jawaban salah atau waktu habis mengurangi 1 nyawa.', 'Selesaikan semua soal untuk menang!'],
      recap: [
        'Pascabencana meliputi rehabilitasi dan rekonstruksi.',
        'Jaga kesehatan, kebersihan, dan perasaan sesama di pengungsian.',
        'Bangun kembali dengan lebih aman agar siap menghadapi bencana berikutnya.'
      ]
    }
  ];

  // Pulau 6: sejarah tsunami di Indonesia.
  const HISTORY_LEVELS = [
    {
      id: 'h1', phase: 'Sejarah', icon: 'calendar', type: 'timeline',
      title: 'Garis Waktu Tsunami',
      mission: 'Urutkan peristiwa tsunami di Indonesia dari yang paling lama sampai yang paling baru.',
      how: ['Ketuk kartu peristiwa mulai dari tahun paling lama.', 'Urutan yang salah mengurangi 1 nyawa.', 'Susun keenam peristiwa untuk menang!'],
      recap: [
        'Tsunami sudah berkali-kali melanda Indonesia, dari 1883 sampai 2018.',
        'Peristiwa terjadi di berbagai pulau: Jawa, Sumatra, Nusa Tenggara, dan Sulawesi.',
        'Karena itu, kesiapsiagaan penting di seluruh pesisir Indonesia.'
      ]
    },
    {
      id: 'h2', phase: 'Sejarah', icon: 'magnifier', type: 'triggerMatch',
      title: 'Peristiwa dan Pemicunya',
      mission: 'Pasangkan setiap peristiwa tsunami dengan pemicunya.',
      how: ['Ketuk satu peristiwa, lalu ketuk pemicunya.', 'Pasangan yang salah mengurangi 1 nyawa.', 'Pasangkan kelima peristiwa untuk menang!'],
      recap: [
        'Tsunami Aceh 2004 dipicu gempa bawah laut yang sangat besar.',
        'Krakatau 1883 dan Selat Sunda 2018 berkaitan dengan gunung api.',
        'Pangandaran 2006 mengajarkan: guncangan lemah pun bisa disusul tsunami besar.'
      ]
    },
    {
      id: 'h3', phase: 'Sejarah', icon: 'megaphone', type: 'smongQuiz',
      title: 'Kisah Smong Simeulue',
      mission: 'Kenali kearifan lokal smong yang menyelamatkan warga Pulau Simeulue.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Smong adalah kata warga Simeulue untuk tsunami, sekaligus pesan untuk lari ke bukit.',
        'Pesan smong diwariskan lewat cerita dan syair sejak tsunami 1907.',
        'Berkat smong, sangat sedikit warga Simeulue yang menjadi korban tsunami 2004.'
      ]
    },
    {
      id: 'h4', phase: 'Sejarah', icon: 'shoal', type: 'pangandaranQuiz',
      title: 'Pelajaran Pangandaran 2006',
      mission: 'Belajar dari tsunami Pangandaran yang datang setelah guncangan yang terasa lemah.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Guncangan yang terasa lemah tidak selalu berarti aman dari tsunami.',
        'Perhatikan juga tanda lain: air laut surut dan peringatan resmi.',
        'Pantai wisata perlu rambu dan jalur evakuasi yang jelas.'
      ]
    },
    {
      id: 'h5', phase: 'Sejarah', icon: 'quake', type: 'paluQuiz',
      title: 'Palu 2018: Gempa, Tsunami, Likuefaksi',
      mission: 'Pelajari bencana berlapis di Palu tahun 2018.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Gempa Palu 2018 diikuti tsunami di Teluk Palu dan likuefaksi di beberapa wilayah.',
        'Tsunami bisa tiba hanya beberapa menit setelah gempa.',
        'Begitu gempa kuat terasa di pantai, langsung evakuasi tanpa menunggu sirene.'
      ]
    },
    {
      id: 'h6', phase: 'Sejarah', icon: 'volcano', type: 'sundaSort',
      title: 'Selat Sunda Tanpa Gempa',
      mission: 'Tentukan benar atau salah pernyataan tentang tsunami Selat Sunda 2018.',
      how: ['Baca pernyataan di kartu.', 'Pilih Benar atau Salah. Pilihan yang keliru mengurangi 1 nyawa.', 'Nilai semua pernyataan untuk menang!'],
      recap: [
        'Tsunami Selat Sunda 2018 dipicu longsoran Gunung Anak Krakatau, bukan gempa kuat.',
        'Tsunami datang di malam hari dan melanda pantai Banten dan Lampung.',
        'Tsunami tidak selalu didahului gempa, jadi tetap waspada di pesisir dekat gunung api.'
      ]
    },
    {
      id: 'h7', phase: 'Sejarah', icon: 'monitor', type: 'inatewsQuiz',
      title: 'Lahirnya Peringatan Dini',
      mission: 'Cari tahu bagaimana tsunami 2004 mendorong Indonesia membangun sistem peringatan dini.',
      how: ['Baca situasinya, lalu pilih jawaban terbaik.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Setelah 2004, Indonesia membangun Sistem Peringatan Dini Tsunami (InaTEWS).',
        'BMKG menyebarkan peringatan dini tsunami, BPBD meneruskannya ke warga.',
        'Peringatan hanya berguna jika warga paham dan rutin berlatih evakuasi.'
      ]
    },
    {
      id: 'h8', phase: 'Sejarah', icon: 'question', type: 'mythSort',
      title: 'Fakta atau Mitos?',
      mission: 'Pilah pernyataan tentang tsunami: fakta atau mitos?',
      how: ['Baca pernyataan di kartu.', 'Pilih Fakta atau Mitos. Pilihan keliru mengurangi 1 nyawa.', 'Pilah semua kartu untuk menang!'],
      recap: [
        'Tsunami pernah terjadi di banyak wilayah Indonesia, jadi semua pesisir perlu siaga.',
        'Guncangan lemah dan air laut surut tetap tanda bahaya.',
        'Gelombang bisa datang lebih dari sekali.'
      ]
    },
    {
      id: 'h9', phase: 'Sejarah', icon: 'book', type: 'lessonMatch',
      title: 'Pelajaran Tiap Peristiwa',
      mission: 'Pasangkan setiap peristiwa dengan pelajaran yang kita ambil darinya.',
      how: ['Ketuk satu peristiwa, lalu ketuk pelajarannya.', 'Pasangan yang salah mengurangi 1 nyawa.', 'Pasangkan kelima peristiwa untuk menang!'],
      recap: [
        'Setiap bencana meninggalkan pelajaran agar kita lebih siap.',
        'Pengetahuan lokal, peringatan dini, dan evakuasi cepat saling melengkapi.',
        'Mengingat sejarah membantu kita tidak mengulangi kesalahan yang sama.'
      ]
    },
    {
      id: 'h10', phase: 'Sejarah', icon: 'timer', type: 'examHistory',
      title: 'Ujian Sejarah',
      mission: 'Jawab pertanyaan seputar sejarah tsunami Indonesia sebelum waktunya habis!',
      how: ['Jawab setiap soal sebelum waktunya habis (20 detik).', 'Jawaban salah atau waktu habis mengurangi 1 nyawa.', 'Selesaikan semua soal untuk menang!'],
      recap: [
        'Aceh 2004, Pangandaran 2006, Palu 2018, dan Selat Sunda 2018 punya pemicu dan pelajaran berbeda.',
        'Kearifan lokal smong dan sistem peringatan dini sama-sama menyelamatkan nyawa.',
        'Sejarah mengingatkan bahwa tsunami bisa terjadi lagi.'
      ]
    }
  ];

  // Pulau 7: ujian akhir yang menggabungkan semua materi.
  const FINAL_LEVELS = [
    {
      id: 'f1', phase: 'Ujian akhir', icon: 'verified', type: 'finalTf',
      title: 'Pemanasan Benar-Salah',
      mission: 'Pemanasan! Nilai pernyataan dari semua pulau: benar atau salah?',
      how: ['Baca pernyataan di kartu.', 'Pilih Benar atau Salah. Pilihan yang keliru mengurangi 1 nyawa.', 'Nilai semua pernyataan untuk menang!'],
      recap: [
        'Tsunami dipicu gangguan di dasar laut, bukan angin.',
        'Mangrove dan menara evakuasi termasuk mitigasi struktural.',
        'Setelah gelombang pertama, tetap di tempat aman sampai ada info resmi.'
      ]
    },
    {
      id: 'f2', phase: 'Ujian akhir', icon: 'seawall', type: 'finalKind',
      title: 'Struktural atau Non-Struktural?',
      mission: 'Pilah upaya mitigasi: termasuk struktural atau non-struktural?',
      how: ['Baca kartu upaya mitigasi.', 'Pilih Struktural atau Non-struktural. Pilihan keliru mengurangi 1 nyawa.', 'Pilah semua kartu untuk menang!'],
      recap: [
        'Struktural: membangun atau menanam sesuatu secara fisik, seperti tanggul dan mangrove.',
        'Non-struktural: pengetahuan, aturan, dan kebiasaan, seperti peringatan dini dan latihan.',
        'Keduanya saling melengkapi.'
      ]
    },
    {
      id: 'f3', phase: 'Ujian akhir', icon: 'calendar', type: 'finalWhen',
      title: 'Kapan Dilakukan?',
      mission: 'Tentukan kapan setiap tindakan dilakukan: sebelum, saat, atau sesudah tsunami.',
      how: ['Baca tindakannya, lalu pilih waktunya.', 'Tidak ada batas waktu, jadi pikirkan baik-baik.', 'Jawaban salah mengurangi 1 nyawa.'],
      recap: [
        'Sebelum: siapkan tas siaga, kenali jalur evakuasi, dan berlatih.',
        'Saat: lindungi diri ketika guncangan, lalu segera lari ke tempat tinggi.',
        'Sesudah: tunggu info resmi, bantu sesama, dan jaga kesehatan.'
      ]
    },
    {
      id: 'f4', phase: 'Ujian akhir', icon: 'runner', type: 'finalSteps',
      title: 'Urutan Selamat',
      mission: 'Susun langkah dari gempa terasa sampai kembali ke rumah dengan aman, sebelum waktu habis!',
      how: ['Ketuk kartu langkah sesuai urutan yang benar.', 'Waktumu 45 detik. Urutan yang salah mengurangi 1 nyawa.', 'Selesaikan keenam langkah untuk menang!'],
      recap: [
        'Lindungi diri saat guncangan, lalu segera evakuasi ke tempat tinggi.',
        'Tetap di sana meski gelombang pertama surut.',
        'Pulang hanya setelah dinyatakan aman, lalu bantu pemulihan.'
      ]
    },
    {
      id: 'f5', phase: 'Ujian akhir', icon: 'book', type: 'finalTerms',
      title: 'Kamus Siaga',
      mission: 'Pasangkan istilah penting dari semua pulau dengan artinya.',
      how: ['Ketuk satu istilah, lalu ketuk artinya.', 'Pasangan yang salah mengurangi 1 nyawa.', 'Pasangkan kelima istilah untuk menang!'],
      recap: [
        'TES adalah Tempat Evakuasi Sementara.',
        'BPBD menangani bencana di daerah, BMKG mengeluarkan peringatan dini.',
        'Rekonstruksi berarti membangun kembali dengan lebih baik.'
      ]
    },
    {
      id: 'f6', phase: 'Ujian akhir', icon: 'mountain', type: 'finalRun',
      title: 'Lari ke Bukit: Final',
      mission: 'Jalurnya lebih panjang dan gelombang lebih cepat. Lari ke bukit!',
      how: ['Tekan tombol Lompat, Spasi, atau ketuk layar untuk melompat.', 'Menabrak rintangan membuat gelombang makin dekat dan nyawamu berkurang 1.', 'Sampai di bukit untuk menang!'],
      recap: [
        'Begitu ada tanda bahaya, langsung lari ke tempat tinggi.',
        'Ikuti rambu jalur evakuasi dan jangan berhenti untuk melihat laut.',
        'Berjalan kaki sering lebih cepat daripada kendaraan saat jalan macet.'
      ]
    },
    {
      id: 'f7', phase: 'Ujian akhir', icon: 'map', type: 'finalRoute',
      title: 'Rute Evakuasi Final',
      mission: 'Bawa dirimu dari rumah ke titik kumpul di bukit. Hati-hati, sungainya lebar!',
      how: ['Bergerak dengan tombol panah, keyboard, atau ketuk kotak di sebelahmu.', 'Jauhi laut, pantai, sungai, dan rumah satu lantai. Melangkah ke sana mengurangi 1 nyawa.', 'Ikuti rambu hijau jalur evakuasi!'],
      recap: [
        'Kenali lebih dari satu jalur evakuasi dari rumahmu.',
        'Seberangi sungai hanya lewat jembatan atau jalan yang jauh dari muara.',
        'Rumah satu lantai bukan tempat berlindung dari tsunami.'
      ]
    },
    {
      id: 'f8', phase: 'Ujian akhir', icon: 'star', type: 'finalPick',
      title: 'Pilih Tindakan Terbaik',
      mission: 'Pilih semua tindakan seorang Pahlawan Siaga.',
      how: ['Ketuk tindakan yang tepat.', 'Tindakan yang keliru mengurangi 1 nyawa.', 'Temukan keenam tindakan tepat untuk menang!'],
      recap: [
        'Pahlawan Siaga bersiap sebelum bencana dan bertindak cepat saat bencana.',
        'Ia percaya info resmi dan tidak menyebar hoaks.',
        'Setelah bencana, ia membantu sesama dan ikut membangun kembali.'
      ]
    },
    {
      id: 'f9', phase: 'Ujian akhir', icon: 'timer', type: 'finalQuick',
      title: 'Kuis Kilat',
      mission: 'Jawab cepat! Waktu tiap soal hanya 12 detik.',
      how: ['Jawab setiap soal sebelum waktunya habis (12 detik).', 'Jawaban salah atau waktu habis mengurangi 1 nyawa.', 'Selesaikan semua soal untuk menang!'],
      recap: [
        'Tanda alam tsunami: gempa kuat, air laut surut, dan suara gemuruh.',
        'Lari ke tempat tinggi, bukan ke pantai.',
        'Cek informasi dari BMKG dan BPBD.'
      ]
    },
    {
      id: 'f10', phase: 'Ujian akhir', icon: 'trophy', type: 'finalExam',
      title: 'Ujian Pahlawan Siaga',
      mission: 'Ujian terakhir! Jawab soal dari semua pulau sebelum waktunya habis.',
      how: ['Jawab setiap soal sebelum waktunya habis (20 detik).', 'Jawaban salah atau waktu habis mengurangi 1 nyawa.', 'Selesaikan semua soal untuk meraih gelar Pahlawan Siaga!'],
      recap: [
        'Kenali tsunami, mitigasinya, dan langkah sebelum, saat, serta sesudah bencana.',
        'Belajar dari sejarah agar lebih siap.',
        'Bagikan pengetahuanmu kepada keluarga dan teman.'
      ]
    }
  ];

  RESPONSE_LEVELS.forEach(lv => { lv.island = 'response'; });
  RECOVERY_LEVELS.forEach(lv => { lv.island = 'recovery'; lv.phaseKey = 'post'; });
  HISTORY_LEVELS.forEach(lv => { lv.island = 'history'; lv.phaseKey = 'hist'; });
  FINAL_LEVELS.forEach(lv => { lv.island = 'final'; lv.phaseKey = 'final'; });
  const LEVELS = [...BASIC_LEVELS, ...STRUCT_LEVELS, ...NONSTRUCT_LEVELS, ...RESPONSE_LEVELS, ...RECOVERY_LEVELS, ...HISTORY_LEVELS, ...FINAL_LEVELS];
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

  /* --- Pulau Ilmu (mengenal tsunami) --- */

  const TF_ITEMS = [
    { ic: 'wave', short: 'Gelombang besar', label: 'Tsunami adalah gelombang besar yang menyapu kawasan pantai.', zone: 'true', why: 'Benar! Tsunami adalah gelombang besar yang menyapu kawasan pantai.' },
    { ic: 'uplift', short: 'Dasar laut bergerak', label: 'Tsunami terjadi karena dasar laut terangkat atau turun secara mendadak.', zone: 'true', why: 'Benar! Pergerakan mendadak di dasar laut mengganggu air laut dan membentuk gelombang besar.' },
    { ic: 'gull', short: 'Karena angin', label: 'Tsunami disebabkan oleh angin kencang di permukaan laut.', zone: 'false', why: 'Salah. Ombak biasa disebabkan angin, sedangkan tsunami disebabkan gangguan di dasar laut.' },
    { ic: 'ripple', short: 'Hanya 1 gelombang', label: 'Tsunami hanya terdiri dari satu gelombang.', zone: 'false', why: 'Salah. Tsunami bisa datang berkali-kali, dan gelombang pertama belum tentu yang terbesar.' },
    { ic: 'tectonic', short: 'Paling sering: gempa', label: 'Gempa bawah laut adalah penyebab tsunami yang paling sering terjadi.', zone: 'true', why: 'Benar! Sebagian besar tsunami dipicu oleh gempa tektonik bawah laut.' },
    { ic: 'rain', short: 'Hanya saat badai', label: 'Tsunami hanya bisa terjadi saat cuaca buruk.', zone: 'false', why: 'Salah. Tsunami tidak bergantung pada cuaca dan bisa datang saat langit cerah.' },
    { ic: 'no-entry', short: 'Lewat muara sungai', label: 'Gelombang tsunami bisa merambat naik lewat muara sungai.', zone: 'true', why: 'Benar! Karena itu, jauhi sungai dan muara saat evakuasi.' }
  ];
  const TF_CFG = {
    left: { key: 'true', label: 'Benar', sub: 'pernyataan tepat', ic: 'verified', cls: 'z-safe', btn: 'green' },
    right: { key: 'false', label: 'Salah', sub: 'pernyataan keliru', ic: 'no-entry', cls: 'z-risk', btn: 'red' },
    unit: 'Pernyataan', statement: true
  };

  const FORM_STEPS = [
    { ic: 'plates', text: 'Lempeng di dasar laut saling menekan dan menumpuk tekanan', hint: 'Awalnya, tekanan menumpuk di antara lempeng dasar laut.' },
    { ic: 'tectonic', text: 'Lempeng bergeser tiba-tiba sehingga terjadi gempa bawah laut', hint: 'Tekanan yang menumpuk akhirnya lepas sebagai gempa bawah laut.' },
    { ic: 'uplift', text: 'Dasar laut terangkat atau turun dan mendorong air di atasnya', hint: 'Gempa membuat dasar laut bergerak dan mendorong massa air.' },
    { ic: 'ripple', text: 'Gelombang menyebar ke segala arah dengan sangat cepat di laut dalam', hint: 'Air yang terdorong menyebar sebagai gelombang ke segala arah.' },
    { ic: 'shoal', text: 'Di dekat pantai yang dangkal, gelombang melambat dan makin tinggi', hint: 'Saat laut makin dangkal, gelombang melambat dan meninggi.' },
    { ic: 'house', text: 'Gelombang besar menyapu kawasan pantai', hint: 'Terakhir, gelombang tinggi itu menyapu daratan pantai.' }
  ];

  const CAUSE_PAIRS = [
    { ic: 'tectonic', name: 'Gempa tektonik bawah laut', fn: 'Lempeng bergeser vertikal di kedalaman dangkal (kurang dari 60–70 km) dengan magnitudo besar (lebih dari 7,0).' },
    { ic: 'volcano', name: 'Letusan gunung berapi', fn: 'Erupsi atau runtuhnya kaldera gunung api di laut atau dekat pantai mendesak massa air.' },
    { ic: 'landslide', name: 'Longsor bawah laut', fn: 'Sedimen atau lereng dasar laut runtuh mendadak, umumnya dipicu gempa atau erupsi.' },
    { ic: 'meteor', name: 'Hantaman meteor', fn: 'Benda luar angkasa berukuran besar jatuh ke laut dan memindahkan air seketika.' }
  ];

  // Syarat (disederhanakan) gempa pemicu tsunami, sesuai materi: di laut, dangkal, kuat, vertikal.
  const LAB_GOALS = [
    {
      text: 'Buat gempa yang memicu tsunami.',
      check: r => r.tsunami,
      hint: 'Tsunami butuh gempa di laut, dangkal (kurang dari 70 km), kuat (lebih dari 7,0), dan lempeng bergerak naik-turun.'
    },
    {
      text: 'Buat gempa kuat (lebih dari 7,0) di laut yang TIDAK memicu tsunami karena pusatnya terlalu dalam.',
      check: r => !r.tsunami && r.sea && r.mag > 7 && r.vertical && r.depth >= 70,
      hint: 'Tetap di laut, magnitudo di atas 7,0, dan gerakan vertikal. Lalu geser kedalaman menjadi 70 km atau lebih.'
    },
    {
      text: 'Buat gempa kuat dan dangkal di laut yang TIDAK memicu tsunami karena lempengnya bergeser mendatar.',
      check: r => !r.tsunami && r.sea && r.mag > 7 && r.depth < 70 && !r.vertical,
      hint: 'Tetap di laut, magnitudo di atas 7,0, kedalaman kurang dari 70 km, lalu pilih gerakan mendatar.'
    }
  ];

  const IMPACT_QS = [
    {
      ic: 'heart-broken', text: 'Mengapa tsunami bisa menimbulkan banyak korban jiwa?',
      options: [
        { ok: true, ic: 'timer', text: 'Waktu evakuasi terbatas sehingga banyak orang tidak sempat menyelamatkan diri', why: 'Tepat! Korban bisa tenggelam, tertimpa reruntuhan, atau terluka.' },
        { ic: 'sun', text: 'Karena tsunami selalu datang saat cuaca panas', why: 'Tsunami tidak bergantung pada cuaca.' },
        { ic: 'gull', text: 'Karena gelombangnya kecil dan pelan', why: 'Justru gelombangnya besar dan kuat.' }
      ]
    },
    {
      ic: 'crop', text: 'Air laut masuk ke sawah dan kebun setelah tsunami. Apa akibatnya?',
      options: [
        { ok: true, ic: 'crop', text: 'Kadar garam tanah naik sehingga pertanian terganggu', why: 'Benar! Air laut menaikkan kadar garam pada tanah dan sumber air.' },
        { ic: 'sprout', text: 'Tanah jadi lebih subur', why: 'Garam dari air laut justru merusak tanaman.' },
        { ic: 'check', text: 'Tidak ada pengaruhnya', why: 'Air laut berdampak besar pada lahan pertanian.' }
      ]
    },
    {
      ic: 'water', text: 'Mengapa risiko penyakit meningkat setelah tsunami?',
      options: [
        { ok: true, ic: 'water', text: 'Sumber air bersih tercemar', why: 'Tepat! Pencemaran air meningkatkan risiko penyakit.' },
        { ic: 'rain', text: 'Karena cuaca menjadi dingin', why: 'Penyebab utamanya adalah air yang tercemar.' },
        { ic: 'fish', text: 'Karena banyak ikan terdampar', why: 'Penyebab utamanya adalah sumber air bersih yang tercemar.' }
      ]
    },
    {
      ic: 'radiation', text: 'Apa yang terjadi di Fukushima, Jepang, tahun 2011 akibat tsunami?',
      options: [
        { ok: true, ic: 'radiation', text: 'Fasilitas nuklir rusak sehingga terjadi pencemaran radiasi', why: 'Benar! Kerusakan fasilitas nuklir menyebabkan pencemaran radiasi.' },
        { ic: 'mountain', text: 'Terbentuk gunung baru', why: 'Yang terjadi adalah kerusakan fasilitas nuklir dan pencemaran radiasi.' },
        { ic: 'check', text: 'Tidak ada kerusakan apa pun', why: 'Tsunami 2011 menimbulkan kerusakan besar, termasuk di fasilitas nuklir.' }
      ]
    },
    {
      ic: 'fish', text: 'Apa dampak tsunami bagi ekosistem laut?',
      options: [
        { ok: true, ic: 'fish', text: 'Terumbu karang rusak dan laut tercemar limbah serta bahan beracun', why: 'Tepat! Ekosistem laut ikut rusak dan tercemar.' },
        { ic: 'sprout', text: 'Terumbu karang tumbuh lebih cepat', why: 'Tsunami justru merusak terumbu karang.' },
        { ic: 'boat', text: 'Laut menjadi lebih bersih', why: 'Tsunami membawa limbah dan bahan beracun ke laut.' }
      ]
    },
    {
      ic: 'sprout', text: 'Dalam kondisi tertentu, tsunami juga bisa berdampak positif. Contohnya?',
      options: [
        { ok: true, ic: 'sprout', text: 'Terbentuk habitat baru dan ekosistem pulih, seperti di Chile tahun 2010', why: 'Benar! Perubahan bentuk pantai bisa menciptakan habitat baru, dan peristiwanya menjadi bahan penelitian mitigasi.' },
        { ic: 'house', text: 'Rumah warga menjadi lebih kuat', why: 'Tsunami merusak bangunan. Dampak positifnya hanya pada kondisi tertentu, misalnya bagi ekosistem.' },
        { ic: 'water', text: 'Air bersih menjadi lebih banyak', why: 'Tsunami justru mencemari sumber air bersih.' }
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

  /* --- Materi tambahan (setiap pulau 10 misi) --- */

  const DEEP_ITEMS = [
    { ic: 'boat', short: 'Kapal hampir tak terasa', label: 'Kapal nelayan di tengah laut hampir tidak merasakan gelombangnya.', zone: 'deep', why: 'Di laut dalam, tinggi tsunami biasanya hanya sekitar satu meter atau kurang, jadi kapal hampir tidak merasakannya.' },
    { ic: 'ripple', short: 'Sangat cepat', label: 'Gelombang melaju sangat cepat, hampir secepat pesawat jet.', zone: 'deep', why: 'Di laut dalam, tsunami bisa melaju ratusan kilometer per jam.' },
    { ic: 'wave', short: 'Rendah dan panjang', label: 'Gelombangnya rendah, tetapi jarak antar-puncaknya sangat panjang.', zone: 'deep', why: 'Di laut dalam, gelombang tsunami rendah namun sangat panjang.' },
    { ic: 'shoal', short: 'Melambat dan meninggi', label: 'Gelombang melambat dan makin tinggi.', zone: 'shore', why: 'Saat laut makin dangkal di dekat pantai, gelombang melambat dan meninggi.' },
    { ic: 'recede', short: 'Air surut dulu', label: 'Air laut bisa surut jauh sebelum gelombang besar datang.', zone: 'shore', why: 'Surutnya air laut di pantai terjadi di dekat pantai dan merupakan tanda bahaya.' },
    { ic: 'house', short: 'Menyapu daratan', label: 'Gelombang menghantam dan masuk jauh ke daratan.', zone: 'shore', why: 'Di pantai, tsunami bisa merusak bangunan dan masuk jauh ke daratan.' }
  ];
  const DEEP_CFG = {
    left: { key: 'deep', label: 'Laut dalam', sub: 'jauh dari pantai', ic: 'ripple', cls: 'z-deepsea', btn: 'blue' },
    right: { key: 'shore', label: 'Dekat pantai', sub: 'laut dangkal', ic: 'shoal', cls: 'z-shoresea', btn: '' },
    unit: 'Kartu', statement: true
  };

  const WAVE_ITEMS = [
    { ic: 'gull', short: 'Karena angin', label: 'Dibangkitkan oleh angin yang bertiup di permukaan laut.', zone: 'wind', why: 'Ombak biasa dibangkitkan angin. Tsunami tidak bergantung pada angin.' },
    { ic: 'tectonic', short: 'Karena dasar laut', label: 'Dipicu pergerakan mendadak di dasar laut, misalnya gempa.', zone: 'tsunami', why: 'Tsunami dipicu gangguan di dasar laut seperti gempa, longsor, atau letusan gunung api.' },
    { ic: 'ripple', short: 'Hanya permukaan', label: 'Hanya bagian permukaan air yang bergerak.', zone: 'wind', why: 'Pada ombak biasa, hanya permukaan air yang bergerak.' },
    { ic: 'uplift', short: 'Seluruh kolom air', label: 'Seluruh air dari dasar sampai permukaan ikut bergerak.', zone: 'tsunami', why: 'Tsunami menggerakkan seluruh kolom air, karena itu energinya sangat besar.' },
    { ic: 'timer', short: 'Tiap beberapa detik', label: 'Gelombang datang setiap beberapa detik.', zone: 'wind', why: 'Ombak biasa datang berulang setiap beberapa detik.' },
    { ic: 'rumble', short: 'Berjarak bermenit-menit', label: 'Gelombang berikutnya bisa datang beberapa menit kemudian.', zone: 'tsunami', why: 'Jarak antar-gelombang tsunami bisa bermenit-menit, jadi jangan kembali setelah gelombang pertama.' },
    { ic: 'house', short: 'Masuk jauh ke darat', label: 'Bisa masuk jauh ke daratan dan merusak bangunan.', zone: 'tsunami', why: 'Tsunami bisa menerjang jauh ke daratan, tidak seperti ombak biasa.' }
  ];
  const WAVE_CFG = {
    left: { key: 'wind', label: 'Ombak biasa', sub: 'karena angin', ic: 'gull', cls: 'z-deepsea', btn: 'blue' },
    right: { key: 'tsunami', label: 'Tsunami', sub: 'karena gangguan dasar laut', ic: 'wave', cls: 'z-risk', btn: 'red' },
    unit: 'Kartu', statement: true
  };

  const TERM_PAIRS = [
    { ic: 'tectonic', name: 'Hiposentrum', fn: 'Pusat gempa yang berada di dalam bumi.' },
    { ic: 'flag', name: 'Episentrum', fn: 'Titik di permukaan bumi yang tepat berada di atas pusat gempa.' },
    { ic: 'monitor', name: 'Magnitudo', fn: 'Ukuran besarnya kekuatan atau energi gempa.' },
    { ic: 'plates', name: 'Lempeng tektonik', fn: 'Bongkahan besar kerak bumi yang terus bergerak perlahan.' },
    { ic: 'wave', name: 'Tsunami', fn: 'Kata dari bahasa Jepang: tsu berarti pelabuhan dan nami berarti gelombang.' }
  ];

  const HISTORY_QS = [
    {
      ic: 'plates', text: 'Mengapa Indonesia termasuk negara yang rawan tsunami?',
      options: [
        { ok: true, ic: 'tectonic', text: 'Berada di pertemuan beberapa lempeng tektonik dan memiliki banyak gunung api', why: 'Benar! Pertemuan lempeng dan banyaknya gunung api membuat Indonesia sering mengalami gempa dan berpotensi tsunami.' },
        { ic: 'sun', text: 'Karena Indonesia beriklim tropis', why: 'Iklim tidak menyebabkan tsunami.' },
        { ic: 'rain', text: 'Karena sering turun hujan', why: 'Hujan tidak menyebabkan tsunami.' }
      ]
    },
    {
      ic: 'wave', text: 'Tsunami Aceh pada 26 Desember 2004 dipicu oleh apa?',
      options: [
        { ok: true, ic: 'tectonic', text: 'Gempa bawah laut yang sangat besar di Samudra Hindia', why: 'Benar! Gempa sangat kuat di dasar Samudra Hindia memicu tsunami yang melanda banyak negara.' },
        { ic: 'volcano', text: 'Letusan gunung berapi', why: 'Tsunami Aceh 2004 dipicu gempa bawah laut, bukan letusan gunung.' },
        { ic: 'meteor', text: 'Jatuhnya meteor ke laut', why: 'Tsunami Aceh 2004 dipicu gempa bawah laut yang sangat besar.' }
      ]
    },
    {
      ic: 'volcano', text: 'Tsunami Selat Sunda pada Desember 2018 datang tanpa didahului gempa kuat. Apa pemicunya?',
      options: [
        { ok: true, ic: 'volcano', text: 'Longsoran tubuh Gunung Anak Krakatau ke laut', why: 'Benar! Peristiwa ini menunjukkan tsunami tidak selalu didahului gempa kuat, jadi tetap waspada di pesisir.' },
        { ic: 'tectonic', text: 'Gempa tektonik yang sangat besar', why: 'Saat itu tidak ada gempa tektonik besar. Pemicunya adalah longsoran Gunung Anak Krakatau.' },
        { ic: 'gull', text: 'Angin yang sangat kencang', why: 'Angin tidak menyebabkan tsunami. Pemicunya adalah longsoran Gunung Anak Krakatau.' }
      ]
    },
    {
      ic: 'volcano', text: 'Letusan dahsyat Gunung Krakatau pada tahun 1883 juga menimbulkan apa?',
      options: [
        { ok: true, ic: 'wave', text: 'Tsunami besar di sekitar Selat Sunda', why: 'Benar! Letusan gunung api di laut dapat memicu tsunami.' },
        { ic: 'rain', text: 'Banjir akibat hujan deras', why: 'Letusan Krakatau 1883 memicu tsunami besar, bukan banjir hujan.' },
        { ic: 'sun', text: 'Kemarau panjang', why: 'Letusan Krakatau 1883 memicu tsunami besar di sekitar Selat Sunda.' }
      ]
    },
    {
      ic: 'family', text: 'Pada tsunami 2004, banyak warga Pulau Simeulue selamat. Apa sebabnya?',
      options: [
        { ok: true, ic: 'megaphone', text: 'Kearifan lokal smong: saat gempa kuat dan air laut surut, segera lari ke bukit', why: 'Tepat! Cerita smong diwariskan turun-temurun dan menyelamatkan banyak nyawa.' },
        { ic: 'boat', text: 'Mereka berlayar ke tengah laut', why: 'Warga Simeulue selamat karena mengikuti pesan smong untuk lari ke tempat tinggi.' },
        { ic: 'house', text: 'Mereka bersembunyi di dalam rumah', why: 'Rumah tidak aman dari tsunami. Warga selamat karena lari ke bukit.' }
      ]
    },
    {
      ic: 'quake', text: 'Tsunami di Teluk Palu pada September 2018 terjadi setelah peristiwa apa?',
      options: [
        { ok: true, ic: 'tectonic', text: 'Gempa kuat yang mengguncang Sulawesi Tengah', why: 'Benar! Gempa kuat di sekitar Palu diikuti tsunami yang menerjang Teluk Palu.' },
        { ic: 'meteor', text: 'Jatuhnya meteor', why: 'Tsunami Palu terjadi setelah gempa kuat.' },
        { ic: 'rain', text: 'Hujan deras berhari-hari', why: 'Hujan tidak memicu tsunami. Tsunami Palu terjadi setelah gempa kuat.' }
      ]
    }
  ];

  const EXAM_BASIC_QS = [
    {
      ic: 'wave', text: 'Apa itu tsunami?',
      options: [
        { ok: true, ic: 'uplift', text: 'Gelombang besar akibat air laut terganggu oleh pergerakan mendadak di dasar laut', why: 'Benar! Itulah pengertian tsunami.' },
        { ic: 'rain', text: 'Ombak tinggi karena badai', why: 'Ombak badai disebabkan angin, bukan gangguan di dasar laut.' },
        { ic: 'water', text: 'Banjir karena hujan deras', why: 'Banjir hujan berbeda dengan tsunami.' }
      ]
    },
    {
      ic: 'tectonic', text: 'Penyebab tsunami yang paling sering adalah...',
      options: [
        { ok: true, ic: 'tectonic', text: 'Gempa tektonik bawah laut', why: 'Benar! Sebagian besar tsunami dipicu gempa bawah laut.' },
        { ic: 'gull', text: 'Angin kencang', why: 'Angin membangkitkan ombak biasa, bukan tsunami.' },
        { ic: 'ripple', text: 'Pasang air laut biasa', why: 'Pasang surut biasa tidak menyebabkan tsunami.' }
      ]
    },
    {
      ic: 'recede', text: 'Air laut di pantai tiba-tiba surut jauh. Artinya?',
      options: [
        { ok: true, ic: 'runner', text: 'Gelombang besar mungkin akan datang, segera menjauh ke tempat tinggi', why: 'Tepat! Air laut yang surut tiba-tiba adalah tanda bahaya.' },
        { ic: 'fish', text: 'Waktu yang tepat untuk mencari ikan', why: 'Jangan mendekat! Gelombang besar bisa datang sebentar lagi.' },
        { ic: 'sun', text: 'Laut sedang tenang', why: 'Air laut yang surut tiba-tiba justru tanda bahaya.' }
      ]
    },
    {
      ic: 'shoal', text: 'Mengapa tsunami makin tinggi saat mendekati pantai?',
      options: [
        { ok: true, ic: 'shoal', text: 'Laut makin dangkal sehingga gelombang melambat dan meninggi', why: 'Benar! Di perairan dangkal, gelombang tsunami melambat dan meninggi.' },
        { ic: 'gull', text: 'Angin di pantai lebih kencang', why: 'Angin tidak memengaruhi tinggi tsunami. Penyebabnya laut yang makin dangkal.' },
        { ic: 'rain', text: 'Air hujan menambah tinggi gelombang', why: 'Penyebabnya laut yang makin dangkal, bukan hujan.' }
      ]
    },
    {
      ic: 'ripple', text: 'Gelombang pertama tsunami sudah lewat. Apakah sudah aman?',
      options: [
        { ok: true, ic: 'mountain', text: 'Belum, gelombang berikutnya bisa datang dan lebih besar', why: 'Tepat! Tetap di tempat tinggi sampai ada informasi resmi.' },
        { ic: 'house', text: 'Sudah aman, boleh kembali ke rumah', why: 'Gelombang berikutnya bisa datang dan bahkan lebih besar.' },
        { ic: 'sun', text: 'Aman asalkan cuaca cerah', why: 'Cuaca tidak menentukan keamanan dari tsunami.' }
      ]
    },
    {
      ic: 'tectonic', text: 'Gempa seperti apa yang berpotensi memicu tsunami?',
      options: [
        { ok: true, ic: 'uplift', text: 'Di laut, dangkal, kuat, dan lempeng bergerak naik-turun', why: 'Benar! Itulah syarat umum gempa pemicu tsunami.' },
        { ic: 'house', text: 'Gempa kecil di darat', why: 'Gempa kecil di darat umumnya tidak memicu tsunami.' },
        { ic: 'plates', text: 'Gempa sangat dalam yang bergeser mendatar', why: 'Gempa yang sangat dalam atau bergeser mendatar umumnya tidak memicu tsunami.' }
      ]
    }
  ];

  const SAFEHOUSE_ITEMS = [
    { ok: true, ic: 'foundation', label: 'Fondasi kuat yang menyatu dengan bangunan', why: 'Fondasi yang kuat menahan bangunan agar tidak bergeser saat gempa.' },
    { ok: true, ic: 'rebar', label: 'Kolom dan balok beton bertulang yang saling terikat', why: 'Rangka bertulang yang saling terikat membuat bangunan tetap utuh saat berguncang.' },
    { ok: true, ic: 'roof-light', label: 'Atap yang ringan', why: 'Atap ringan mengurangi beban di bagian atas bangunan saat berguncang.' },
    { ok: true, ic: 'building', label: 'Bentuk bangunan sederhana dan simetris', why: 'Bentuk sederhana dan simetris membuat guncangan tersebar merata.' },
    { ok: false, ic: 'crack', label: 'Dinding bata tanpa kolom dan tulangan', why: 'Dinding tanpa tulangan mudah retak dan runtuh saat gempa.' },
    { ok: false, ic: 'house', label: 'Atap beton yang sangat berat', why: 'Atap yang berat menambah beban dan bisa runtuh menimpa penghuni.' },
    { ok: false, ic: 'log', label: 'Rangka kayu yang sudah lapuk', why: 'Kayu lapuk mudah patah saat bangunan berguncang.' },
    { ok: false, ic: 'landslide', label: 'Dibangun di lereng yang mudah longsor', why: 'Lereng rawan longsor membuat bangunan mudah ambruk saat gempa.' }
  ];

  const TOWER_ITEMS = [
    { ok: true, ic: 'tower', label: 'Lebih tinggi dari perkiraan ketinggian tsunami', why: 'Menara harus cukup tinggi agar warga aman dari gelombang.' },
    { ok: true, ic: 'walker', label: 'Dekat permukiman dan bisa dicapai berjalan kaki', why: 'Saat darurat, warga harus bisa mencapainya dengan cepat tanpa kendaraan.' },
    { ok: true, ic: 'stairs', label: 'Tangga atau ramp lebar untuk anak, lansia, dan difabel', why: 'Akses yang lebar membuat semua orang bisa naik dengan cepat.' },
    { ok: true, ic: 'building', label: 'Strukturnya kuat dan tahan gempa', why: 'Menara harus tetap berdiri setelah gempa dan saat diterjang gelombang.' },
    { ok: false, ic: 'car', label: 'Jauh dari permukiman, harus naik kendaraan', why: 'Saat darurat jalan bisa macet. Menara harus bisa dicapai berjalan kaki.' },
    { ok: false, ic: 'lock', label: 'Pintunya dikunci, kuncinya dibawa satu orang', why: 'Menara evakuasi harus bisa dibuka kapan saja saat darurat.' },
    { ok: false, ic: 'log', label: 'Dibangun dari kayu ringan seadanya', why: 'Menara harus kuat menahan gempa dan hantaman gelombang.' },
    { ok: false, ic: 'person-wait', label: 'Hanya muat beberapa orang', why: 'Menara harus mampu menampung banyak warga di sekitarnya.' }
  ];

  const CARE_ITEMS = [
    { ic: 'mangrove', short: 'Tanam ulang mangrove', label: 'Menanam ulang mangrove yang mati.', zone: 'care', why: 'Menanam ulang mangrove menjaga sabuk hijau tetap rapat.' },
    { ic: 'seawall', short: 'Perbaiki tanggul', label: 'Memperbaiki tanggul yang retak.', zone: 'care', why: 'Tanggul yang retak harus segera diperbaiki agar tetap kuat.' },
    { ic: 'broom', short: 'Bersihkan sampah', label: 'Membersihkan sampah di sekitar hutan mangrove.', zone: 'care', why: 'Sampah bisa merusak dan membunuh bibit mangrove.' },
    { ic: 'tower', short: 'Periksa menara', label: 'Memeriksa menara evakuasi secara rutin.', zone: 'care', why: 'Pemeriksaan rutin memastikan menara siap dipakai saat darurat.' },
    { ic: 'log', short: 'Tebang mangrove', label: 'Menebang mangrove untuk kayu bakar.', zone: 'harm', why: 'Menebang mangrove menghilangkan benteng alami pantai.' },
    { ic: 'rock', short: 'Ambil batu', label: 'Mengambil batu pemecah gelombang untuk bahan bangunan.', zone: 'harm', why: 'Batu pemecah gelombang yang hilang membuat pertahanan pantai melemah.' },
    { ic: 'trash', short: 'Buang sampah', label: 'Membuang sampah ke pantai.', zone: 'harm', why: 'Sampah mencemari pantai dan merusak ekosistem mangrove.' },
    { ic: 'crack', short: 'Biarkan retak', label: 'Membiarkan retakan tanggul tanpa diperbaiki.', zone: 'harm', why: 'Retakan kecil yang dibiarkan bisa membuat tanggul jebol saat dibutuhkan.' }
  ];
  const CARE_CFG = {
    left: { key: 'care', label: 'Merawat', sub: 'menjaga pertahanan pantai', ic: 'verified', cls: 'z-safe', btn: 'green' },
    right: { key: 'harm', label: 'Merusak', sub: 'melemahkan pertahanan', ic: 'no-entry', cls: 'z-risk', btn: 'red' },
    unit: 'Tindakan', statement: true
  };

  // Desa datar tanpa bukit: tujuan T = menara evakuasi, h = rumah satu lantai (tidak aman), d = rambu ke bawah.
  const TOWER_MAP = [
    'SB......',
    'SBh.rrd.',
    'SBPru#d#',
    'SB.h.#T.',
    'SB..#..h',
    'SBh.....'
  ];
  // K = sekolah (titik awal).
  const SCHOOL_MAP = [
    'SB....HG',
    'SB.#.ruH',
    'SBrru#.H',
    'SBK.R...',
    'SB..R#..',
    'SB#.R...'
  ];

  const QUICK_STRUCT_QS = [
    {
      ic: 'breakwater', text: 'Bangunan pelindung yang dipasang di laut lepas adalah...',
      options: [
        { ok: true, ic: 'breakwater', text: 'Pemecah gelombang', why: 'Benar! Pemecah gelombang melemahkan gelombang sebelum mendekati pantai.' },
        { ic: 'tower', text: 'Menara evakuasi', why: 'Menara evakuasi dibangun di permukiman, bukan di laut.' },
        { ic: 'building', text: 'Bangunan tahan gempa', why: 'Bangunan tahan gempa ada di kawasan rumah dan sekolah.' }
      ]
    },
    {
      ic: 'mangrove', text: 'Tanaman pesisir yang akarnya meredam energi gelombang adalah...',
      options: [
        { ok: true, ic: 'mangrove', text: 'Mangrove', why: 'Benar! Akar mangrove membantu meredam energi gelombang.' },
        { ic: 'plant', text: 'Tanaman hias', why: 'Tanaman hias tidak berfungsi sebagai benteng pantai.' },
        { ic: 'crop', text: 'Padi', why: 'Padi tidak tumbuh di pesisir berlumpur dan tidak meredam gelombang.' }
      ]
    },
    {
      ic: 'house', text: 'Di desa datar tanpa bukit, warga berlindung di...',
      options: [
        { ok: true, ic: 'tower', text: 'Menara evakuasi vertikal', why: 'Benar! Menara evakuasi menjadi tempat tinggi pengganti bukit.' },
        { ic: 'house', text: 'Rumah satu lantai', why: 'Rumah satu lantai tidak cukup tinggi.' },
        { ic: 'pier', text: 'Dermaga', why: 'Dermaga berada di tepi laut, tempat paling berbahaya.' }
      ]
    },
    {
      ic: 'roof-light', text: 'Atap seperti apa yang lebih aman saat gempa?',
      options: [
        { ok: true, ic: 'roof-light', text: 'Atap yang ringan', why: 'Benar! Atap ringan mengurangi beban saat bangunan berguncang.' },
        { ic: 'house', text: 'Atap beton yang sangat berat', why: 'Atap berat menambah beban dan bisa runtuh.' },
        { ic: 'crack', text: 'Atap yang sudah retak', why: 'Atap retak mudah runtuh saat gempa.' }
      ]
    },
    {
      ic: 'seawall', text: 'Tanggul pantai berfungsi untuk...',
      options: [
        { ok: true, ic: 'seawall', text: 'Memperlambat dan meredam gelombang', why: 'Benar! Itulah fungsi tanggul pantai.' },
        { ic: 'boat', text: 'Tempat parkir perahu', why: 'Itu fungsi dermaga, bukan tanggul.' },
        { ic: 'eye', text: 'Tempat melihat pemandangan', why: 'Tanggul dibangun untuk melindungi pantai dari gelombang.' }
      ]
    }
  ];

  const SOLUTION_PAIRS = [
    { ic: 'house', name: 'Desa datar dan jauh dari bukit', fn: 'Bangun menara evakuasi vertikal.' },
    { ic: 'ripple', name: 'Gelombang besar datang dari laut lepas', fn: 'Pasang pemecah gelombang lepas pantai.' },
    { ic: 'recede', name: 'Garis pantai langsung berhadapan dengan laut', fn: 'Bangun tanggul pantai.' },
    { ic: 'sprout', name: 'Pesisir berlumpur gundul tanpa pohon', fn: 'Tanam hutan mangrove.' },
    { ic: 'crack', name: 'Rumah dan sekolah retak saat gempa kecil', fn: 'Bangun ulang dengan konstruksi tahan gempa.' }
  ];

  const SIGN_PAIRS = [
    { ic: 'map', name: 'Rambu hijau bergambar orang berlari dan panah', fn: 'Menunjukkan arah jalur evakuasi menuju tempat aman.' },
    { ic: 'flag', name: 'Rambu Titik Kumpul', fn: 'Tempat warga berkumpul dan didata setelah evakuasi.' },
    { ic: 'no-entry', name: 'Rambu Zona Bahaya Tsunami', fn: 'Menandai wilayah rawan yang harus segera ditinggalkan saat ada peringatan.' },
    { ic: 'tower', name: 'Rambu Tempat Evakuasi Sementara (TES)', fn: 'Menunjukkan bangunan tinggi yang aman untuk berlindung.' },
    { ic: 'siren', name: 'Bunyi sirene peringatan', fn: 'Tanda bahaya agar warga segera evakuasi.' }
  ];

  const HOAX_ITEMS = [
    { ic: 'monitor', short: 'Aplikasi BMKG', label: 'Peringatan dini dari aplikasi resmi BMKG.', zone: 'official', why: 'BMKG adalah lembaga resmi yang mengeluarkan peringatan dini tsunami.' },
    { ic: 'siren', short: 'Sirene BPBD', label: 'Sirene dan pengumuman dari BPBD setempat.', zone: 'official', why: 'BPBD adalah lembaga resmi penanggulangan bencana di daerah.' },
    { ic: 'radio', short: 'Radio/TV kutip BMKG', label: 'Siaran radio atau TV yang mengutip BMKG.', zone: 'official', why: 'Siaran yang mengutip lembaga resmi bisa dipercaya.' },
    { ic: 'verified', short: 'Akun resmi BMKG', label: 'Unggahan akun media sosial resmi BMKG.', zone: 'official', why: 'Akun resmi lembaga adalah sumber informasi yang tepercaya.' },
    { ic: 'chat', short: 'Pesan berantai', label: 'Pesan berantai tanpa sumber: "Tsunami 30 meter datang 5 menit lagi!"', zone: 'hoax', why: 'Pesan tanpa sumber jelas bisa membuat panik. Cek dulu ke BMKG atau BPBD.' },
    { ic: 'camera', short: 'Video lama', label: 'Video tsunami lama yang disebar ulang sebagai kejadian hari ini.', zone: 'hoax', why: 'Video lama yang disebar ulang adalah hoaks yang menyesatkan.' },
    { ic: 'question', short: 'Ramalan tanggal', label: 'Ramalan tanggal terjadinya tsunami dari akun tak dikenal.', zone: 'hoax', why: 'Gempa dan tsunami belum bisa diramal tanggalnya. Ramalan seperti ini adalah hoaks.' },
    { ic: 'send', short: 'Katanya dari orang lain', label: 'Kabar dari teman yang katanya mendengar dari orang lain.', zone: 'hoax', why: 'Kabar dari mulut ke mulut belum tentu benar. Cek sumber resminya.' }
  ];
  const HOAX_CFG = {
    left: { key: 'official', label: 'Info resmi', sub: 'boleh dipercaya', ic: 'verified', cls: 'z-safe', btn: 'green' },
    right: { key: 'hoax', label: 'Hoaks', sub: 'belum pasti benar', ic: 'no-entry', cls: 'z-risk', btn: 'red' },
    unit: 'Informasi', statement: true
  };

  const PLAN_ITEMS = [
    { ok: true, ic: 'flag', label: 'Titik kumpul keluarga yang disepakati', why: 'Titik kumpul memudahkan keluarga bertemu kembali setelah evakuasi.' },
    { ok: true, ic: 'phone-call', label: 'Daftar nomor darurat penting', why: 'Nomor darurat memudahkan meminta bantuan dengan cepat.' },
    { ok: true, ic: 'map', label: 'Jalur evakuasi dari rumah, sekolah, dan tempat kerja', why: 'Setiap anggota keluarga perlu tahu jalur evakuasi dari tempatnya berada.' },
    { ok: true, ic: 'family', label: 'Siapa yang membantu anak kecil dan lansia', why: 'Pembagian tugas membuat evakuasi lebih cepat dan tidak ada yang tertinggal.' },
    { ok: true, ic: 'phone', label: 'Kontak kerabat di luar daerah', why: 'Kerabat di luar daerah bisa menjadi penghubung kabar keluarga.' },
    { ok: false, ic: 'tv', label: 'Daftar film favorit', why: 'Daftar film tidak membantu saat keadaan darurat.' },
    { ok: false, ic: 'umbrella', label: 'Jadwal liburan ke pantai', why: 'Jadwal liburan tidak termasuk rencana siaga bencana.' },
    { ok: false, ic: 'gamepad', label: 'Skor game tertinggi', why: 'Skor game tidak berguna saat bencana.' },
    { ok: false, ic: 'lock', label: 'Kata sandi media sosial', why: 'Kata sandi bersifat rahasia dan tidak termasuk rencana siaga.' }
  ];

  const EXAM_NONSTRUCT_QS = [
    {
      ic: 'monitor', text: 'Lembaga yang mengeluarkan peringatan dini tsunami di Indonesia adalah...',
      options: [
        { ok: true, ic: 'monitor', text: 'BMKG', why: 'Benar! BMKG mengeluarkan peringatan dini tsunami.' },
        { ic: 'chat', text: 'Grup chat keluarga', why: 'Grup chat bukan sumber resmi peringatan dini.' },
        { ic: 'tv', text: 'Iklan televisi', why: 'Peringatan resmi berasal dari BMKG.' }
      ]
    },
    {
      ic: 'school', text: 'Mengapa sekolah perlu rutin mengadakan latihan evakuasi?',
      options: [
        { ok: true, ic: 'runner', text: 'Agar siswa terbiasa dan sigap saat darurat sungguhan', why: 'Tepat! Latihan rutin membangun kebiasaan yang menyelamatkan.' },
        { ic: 'sun', text: 'Supaya pelajaran diliburkan', why: 'Latihan evakuasi bertujuan melatih kesiapan.' },
        { ic: 'person-wait', text: 'Cukup sekali seumur hidup', why: 'Latihan perlu diulang agar siswa tidak lupa.' }
      ]
    },
    {
      ic: 'zoning', text: 'Contoh mitigasi non-struktural adalah...',
      options: [
        { ok: true, ic: 'zoning', text: 'Aturan tata ruang pesisir', why: 'Benar! Aturan dan kebijakan termasuk mitigasi non-struktural.' },
        { ic: 'seawall', text: 'Tanggul pantai', why: 'Tanggul adalah bangunan fisik, jadi termasuk mitigasi struktural.' },
        { ic: 'tower', text: 'Menara evakuasi', why: 'Menara adalah bangunan fisik, jadi termasuk mitigasi struktural.' }
      ]
    },
    {
      ic: 'chat', text: 'Ada pesan berantai tentang tsunami tanpa sumber jelas. Apa yang kamu lakukan?',
      options: [
        { ok: true, ic: 'verified', text: 'Cek kebenarannya ke sumber resmi seperti BMKG', why: 'Tepat! Selalu cek informasi ke sumber resmi.' },
        { ic: 'send', text: 'Langsung sebarkan ke semua grup', why: 'Menyebarkan kabar yang belum pasti bisa membuat panik.' },
        { ic: 'eye-off', text: 'Abaikan semua informasi tentang tsunami', why: 'Jangan abaikan semuanya. Cek ke sumber resmi agar tetap waspada.' }
      ]
    },
    {
      ic: 'map', text: 'Rambu hijau bergambar orang berlari dan panah menunjukkan...',
      options: [
        { ok: true, ic: 'map', text: 'Arah jalur evakuasi', why: 'Benar! Ikuti arah panah menuju tempat aman.' },
        { ic: 'runner', text: 'Jalur lari pagi', why: 'Rambu itu menunjukkan jalur evakuasi.' },
        { ic: 'car', text: 'Tempat parkir', why: 'Rambu itu menunjukkan jalur evakuasi.' }
      ]
    },
    {
      ic: 'family', text: 'Apa isi penting rencana siaga keluarga?',
      options: [
        { ok: true, ic: 'flag', text: 'Titik kumpul keluarga dan nomor darurat', why: 'Tepat! Keduanya membantu keluarga tetap terhubung.' },
        { ic: 'tv', text: 'Daftar acara TV', why: 'Daftar acara TV tidak berguna saat darurat.' },
        { ic: 'gamepad', text: 'Jadwal bermain game', why: 'Jadwal bermain tidak termasuk rencana siaga.' }
      ]
    }
  ];

  const FAMILY_BAG_ITEMS = [
    { ok: true, ic: 'bottle', label: 'Susu dan popok bayi', why: 'Bayi membutuhkan susu dan popok selama mengungsi.' },
    { ok: true, ic: 'firstaid', label: 'Obat rutin nenek', why: 'Lansia sering membutuhkan obat yang harus diminum setiap hari.' },
    { ok: true, ic: 'glasses', label: 'Kacamata cadangan', why: 'Kacamata cadangan berguna jika kacamata utama hilang atau rusak.' },
    { ok: true, ic: 'cash', label: 'Uang tunai secukupnya', why: 'Saat listrik padam, pembayaran nontunai bisa tidak berfungsi.' },
    { ok: true, ic: 'mask', label: 'Masker', why: 'Masker melindungi dari debu dan penyakit di tempat pengungsian.' },
    { ok: true, ic: 'battery', label: 'Power bank terisi penuh', why: 'Power bank menjaga HP tetap menyala untuk menerima informasi.' },
    { ok: false, ic: 'suitcase', label: 'Koper besar berisi semua baju', why: 'Koper besar terlalu berat dan memperlambat evakuasi.' },
    { ok: false, ic: 'tv', label: 'Televisi', why: 'Televisi terlalu berat dan tidak berguna saat mengungsi.' },
    { ok: false, ic: 'fish', label: 'Akuarium ikan hias', why: 'Akuarium berat dan mudah pecah. Fokus pada keselamatan keluarga.' },
    { ok: false, ic: 'gamepad', label: 'Konsol game', why: 'Konsol game bukan barang penting.' }
  ];

  const HELP_QS = [
    {
      ic: 'person-wait', text: 'Saat evakuasi, kamu melihat nenek tetangga berjalan sangat pelan.',
      options: [
        { ok: true, ic: 'walker', text: 'Bantu menuntunnya sambil terus bergerak ke tempat tinggi', why: 'Tepat! Lansia perlu bantuan, dan kalian tetap harus terus bergerak menjauh dari pantai.' },
        { ic: 'house', text: 'Ajak dia kembali ke rumahnya', why: 'Kembali ke rumah sangat berbahaya. Terus bergerak ke tempat tinggi.' },
        { ic: 'eye-off', text: 'Pura-pura tidak melihat', why: 'Jika memungkinkan, bantulah. Saling membantu menyelamatkan lebih banyak nyawa.' }
      ]
    },
    {
      ic: 'kid', text: 'Ada anak kecil yang terpisah dari orang tuanya di jalur evakuasi.',
      options: [
        { ok: true, ic: 'flag', text: 'Ajak dia ke titik kumpul dan laporkan ke petugas', why: 'Benar! Petugas di titik kumpul akan membantu mempertemukannya dengan orang tuanya.' },
        { ic: 'person-wait', text: 'Suruh dia menunggu di tempatnya', why: 'Anak kecil tidak boleh ditinggal di jalur yang berbahaya.' },
        { ic: 'boat', text: 'Ajak mencari orang tuanya ke pantai', why: 'Jangan kembali ke pantai. Bawa ke titik kumpul dan lapor petugas.' }
      ]
    },
    {
      ic: 'family', text: 'Temanmu menggunakan kursi roda.',
      options: [
        { ok: true, ic: 'stairs', text: 'Bantu lewat jalur landai atau ramp menuju tempat tinggi', why: 'Tepat! Jalur landai memudahkan pengguna kursi roda.' },
        { ic: 'house', text: 'Suruh dia menunggu di rumah', why: 'Rumah tidak aman dari tsunami.' },
        { ic: 'runner', text: 'Tinggalkan karena terlalu lambat', why: 'Penyandang disabilitas perlu dibantu agar ikut selamat.' }
      ]
    },
    {
      ic: 'bag', text: 'Ibu hamil di sebelahmu kesulitan membawa banyak barang.',
      options: [
        { ok: true, ic: 'bag', text: 'Bantu bawakan barang yang penting saja dan terus bergerak', why: 'Tepat! Bawa yang penting saja supaya evakuasi tetap cepat.' },
        { ic: 'suitcase', text: 'Bawakan semua barangnya walau jadi lambat', why: 'Membawa terlalu banyak barang memperlambat evakuasi.' },
        { ic: 'eye-off', text: 'Biarkan saja', why: 'Jika memungkinkan, bantulah ibu hamil agar ikut selamat.' }
      ]
    },
    {
      ic: 'flag', text: 'Kamu sudah sampai di titik kumpul.',
      options: [
        { ok: true, ic: 'doc', text: 'Lapor ke petugas dan beri tahu jika ada warga yang belum terlihat', why: 'Benar! Pendataan membantu petugas mencari warga yang belum selamat.' },
        { ic: 'house', text: 'Langsung pulang ke rumah', why: 'Tetap di titik kumpul sampai ada pernyataan aman dari petugas.' },
        { ic: 'boat', text: 'Kembali ke pantai mencari teman', why: 'Jangan kembali ke pantai. Laporkan ke petugas.' }
      ]
    }
  ];

  const FULL_DRILL_STEPS = [
    { ic: 'duck-cover', text: 'Gempa kuat terasa: merunduk dan lindungi kepala', hint: 'Saat guncangan terjadi, lindungi diri dulu.' },
    { ic: 'walker', text: 'Setelah guncangan berhenti, segera keluar dengan tertib', hint: 'Setelah guncangan berhenti, segera keluar.' },
    { ic: 'bag', text: 'Ambil tas siaga yang sudah disiapkan', hint: 'Sambil keluar, ambil tas siaga.' },
    { ic: 'map', text: 'Ikuti rambu evakuasi ke tempat tinggi dengan berjalan kaki', hint: 'Lalu ikuti rambu evakuasi menuju tempat tinggi.' },
    { ic: 'mountain', text: 'Tetap di tempat tinggi walau gelombang pertama surut', hint: 'Di tempat tinggi, jangan turun walau gelombang pertama surut.' },
    { ic: 'radio', text: 'Tunggu informasi resmi dari BMKG atau BPBD', hint: 'Tunggu kabar resmi sebelum mengambil langkah berikutnya.' },
    { ic: 'house', text: 'Pulang hanya setelah dinyatakan aman oleh petugas', hint: 'Langkah terakhir adalah pulang setelah dinyatakan aman.' }
  ];

  const ZONE_CFG = {
    left: { key: 'risk', label: 'Zona rawan', sub: 'dekat pantai', ic: 'wave', cls: 'z-risk', btn: 'red' },
    right: { key: 'safe', label: 'Zona aman', sub: 'tinggi / jauh dari pantai', ic: 'mountain', cls: 'z-safe', btn: 'green' },
    unit: 'Bangunan'
  };

  /* ----- Pulau Pulih ----- */

  const RECOVERY_STEPS = [
    { ic: 'lifebuoy', text: 'Tanggap darurat: selamatkan korban dan bawa ke tempat aman', hint: 'Pertama, selamatkan nyawa dulu.' },
    { ic: 'doc', text: 'Data korban, pengungsi, dan kerusakan', hint: 'Setelah korban diselamatkan, petugas mendata siapa yang butuh bantuan dan apa yang rusak.' },
    { ic: 'tent', text: 'Penuhi kebutuhan dasar di posko pengungsian', hint: 'Pengungsi perlu air, makanan, tempat berteduh, dan layanan kesehatan.' },
    { ic: 'broom', text: 'Rehabilitasi: perbaiki lingkungan, rumah, dan layanan umum', hint: 'Rehabilitasi memperbaiki dan memulihkan keadaan agar kehidupan berjalan lagi.' },
    { ic: 'crane', text: 'Rekonstruksi: bangun kembali dengan rancang bangun tahan bencana', hint: 'Terakhir, bangun kembali dengan cara yang lebih baik dan lebih aman.' }
  ];

  const SHELTER_ITEMS = [
    { ok: true, ic: 'water', label: 'Air bersih untuk minum dan memasak', why: 'Air bersih adalah kebutuhan paling dasar di pengungsian.' },
    { ok: true, ic: 'food', label: 'Makanan siap santap', why: 'Pengungsi perlu makanan yang mudah disiapkan.' },
    { ok: true, ic: 'firstaid', label: 'Obat-obatan dan P3K', why: 'Banyak korban luka atau sakit setelah bencana.' },
    { ok: true, ic: 'tent', label: 'Tenda atau tempat berteduh', why: 'Pengungsi butuh tempat berteduh dari panas dan hujan.' },
    { ok: true, ic: 'trash', label: 'Toilet dan tempat sampah', why: 'Sanitasi yang baik mencegah penyakit menyebar di posko.' },
    { ok: true, ic: 'shirt', label: 'Selimut dan pakaian ganti', why: 'Banyak pengungsi kehilangan pakaian dan kedinginan di malam hari.' },
    { ok: false, ic: 'tv', label: 'Televisi layar besar', why: 'Televisi bukan kebutuhan utama di posko pengungsian.' },
    { ok: false, ic: 'gamepad', label: 'Konsol game', why: 'Konsol game tidak termasuk kebutuhan utama pengungsi.' },
    { ok: false, ic: 'umbrella', label: 'Payung pantai', why: 'Payung pantai tidak dibutuhkan di posko.' },
    { ok: false, ic: 'glasses', label: 'Kacamata hitam', why: 'Kacamata hitam bukan kebutuhan utama pengungsi.' }
  ];

  const FIRSTAID_QS = [
    {
      ic: 'bandage', text: 'Kaki temanmu tergores dan berdarah. Apa yang pertama kamu lakukan?',
      options: [
        { ok: true, ic: 'bandage', text: 'Tekan lukanya dengan kain bersih', why: 'Benar! Menekan luka dengan kain bersih membantu menghentikan perdarahan.' },
        { ic: 'rock', text: 'Tutup lukanya dengan pasir', why: 'Pasir kotor bisa membuat luka infeksi.' },
        { ic: 'eye-off', text: 'Biarkan saja sampai berhenti sendiri', why: 'Luka berdarah perlu ditekan dengan kain bersih.' }
      ]
    },
    {
      ic: 'water', text: 'Luka di tangan terkena lumpur. Bagaimana merawatnya?',
      options: [
        { ok: true, ic: 'water', text: 'Bersihkan dengan air bersih mengalir, lalu tutup dengan perban', why: 'Tepat! Luka harus dibersihkan dulu agar tidak infeksi.' },
        { ic: 'bandage', text: 'Langsung tutup perban tanpa dibersihkan', why: 'Lumpur yang tertinggal di dalam luka bisa menyebabkan infeksi.' },
        { ic: 'eye-off', text: 'Diamkan saja, nanti sembuh sendiri', why: 'Luka kotor harus dibersihkan dengan air bersih.' }
      ]
    },
    {
      ic: 'hospital', text: 'Seorang warga tidak bisa menggerakkan kakinya dan diduga patah tulang. Apa yang tepat?',
      options: [
        { ok: true, ic: 'phone-call', text: 'Jangan dipindahkan sembarangan dan segera panggil petugas medis', why: 'Benar! Memindahkan korban patah tulang dengan cara salah bisa memperparah cederanya.' },
        { ic: 'runner', text: 'Paksa dia berjalan ke posko', why: 'Berjalan bisa memperparah patah tulang.' },
        { ic: 'family', text: 'Tarik kakinya supaya lurus', why: 'Menarik kaki bisa memperparah cedera. Tunggu petugas medis.' }
      ]
    },
    {
      ic: 'phone-call', text: 'Kamu menemukan orang yang tidak sadar di dekat puing. Apa yang kamu lakukan?',
      options: [
        { ok: true, ic: 'megaphone', text: 'Segera panggil orang dewasa atau petugas', why: 'Tepat! Korban tidak sadar butuh pertolongan dari orang yang terlatih.' },
        { ic: 'water', text: 'Siram wajahnya dengan air sumur', why: 'Itu tidak menolong. Panggil petugas atau orang dewasa.' },
        { ic: 'arrow-left', text: 'Tinggalkan saja', why: 'Jangan ditinggalkan. Panggil bantuan secepatnya.' }
      ]
    },
    {
      ic: 'question', text: 'Kamu tidak yakin cara menolong korban. Apa yang sebaiknya kamu lakukan?',
      options: [
        { ok: true, ic: 'family', text: 'Minta bantuan orang dewasa atau petugas', why: 'Benar! Menolong dengan cara yang salah bisa membahayakan korban.' },
        { ic: 'question', text: 'Mencoba cara apa saja yang terpikir', why: 'Coba-coba bisa membahayakan korban.' },
        { ic: 'eye-off', text: 'Pura-pura tidak melihat', why: 'Kamu tetap bisa membantu dengan memanggil petugas.' }
      ]
    }
  ];

  const AFTER_SORT_ITEMS = [
    { ic: 'verified', short: 'Tunggu dinyatakan aman', label: 'Menunggu petugas menyatakan daerah aman sebelum pulang.', zone: 'safe', why: 'Gelombang susulan masih mungkin datang. Pulang hanya setelah dinyatakan aman.' },
    { ic: 'boots', short: 'Sepatu tertutup', label: 'Memakai sepatu tertutup saat berjalan di atas puing.', zone: 'safe', why: 'Puing penuh paku, kaca, dan benda tajam.' },
    { ic: 'water', short: 'Rebus air', label: 'Merebus air sampai mendidih sebelum diminum.', zone: 'safe', why: 'Air yang direbus lebih aman dari kuman.' },
    { ic: 'doc', short: 'Lapor ke posko', label: 'Melapor ke posko agar terdata dan mendapat bantuan.', zone: 'safe', why: 'Pendataan membantu petugas menyalurkan bantuan dan mencari yang hilang.' },
    { ic: 'battery', short: 'Kabel terendam', label: 'Menyentuh kabel listrik yang terendam air.', zone: 'danger', why: 'Air bisa menghantarkan listrik dan menyebabkan sengatan.' },
    { ic: 'crack', short: 'Rumah retak besar', label: 'Masuk ke rumah yang dindingnya retak besar.', zone: 'danger', why: 'Bangunan yang rusak bisa runtuh sewaktu-waktu.' },
    { ic: 'flashlight', short: 'Bau gas', label: 'Menyalakan api saat tercium bau gas.', zone: 'danger', why: 'Gas yang bocor bisa meledak. Jauhi dan lapor ke petugas.' },
    { ic: 'swim', short: 'Main di genangan', label: 'Bermain di genangan air bercampur puing.', zone: 'danger', why: 'Genangan bisa berisi benda tajam, kuman, dan arus listrik.' }
  ];
  const AFTER_SORT_CFG = {
    left: { key: 'safe', label: 'Aman', sub: 'boleh dilakukan', ic: 'verified', cls: 'z-safe', btn: 'green' },
    right: { key: 'danger', label: 'Bahaya', sub: 'jangan dilakukan', ic: 'no-entry', cls: 'z-risk', btn: 'red' },
    unit: 'Tindakan', statement: true
  };

  const HEALTH_QS = [
    {
      ic: 'water', text: 'Air sumur di posko menjadi keruh dan asin setelah tsunami. Bagaimana mendapat air minum?',
      options: [
        { ok: true, ic: 'bottle', text: 'Pakai air bersih dari bantuan, atau rebus air bersih sampai mendidih', why: 'Benar! Air sumur yang tercemar air laut dan lumpur tidak aman diminum.' },
        { ic: 'water', text: 'Langsung minum air sumur itu', why: 'Air sumur yang tercemar bisa membuat sakit perut.' },
        { ic: 'rain', text: 'Minum dari genangan air', why: 'Genangan air penuh kuman dan kotoran.' }
      ]
    },
    {
      ic: 'water', text: 'Kapan sebaiknya mencuci tangan pakai sabun di pengungsian?',
      options: [
        { ok: true, ic: 'food', text: 'Sebelum makan dan setelah dari toilet', why: 'Tepat! Cuci tangan pakai sabun mencegah penyakit menular.' },
        { ic: 'sun', text: 'Cukup sekali sehari saat pagi', why: 'Cuci tangan perlu dilakukan sebelum makan dan setelah dari toilet.' },
        { ic: 'eye-off', text: 'Tidak perlu karena airnya terbatas', why: 'Air terbatas tetap harus dipakai untuk cuci tangan karena itu mencegah penyakit.' }
      ]
    },
    {
      ic: 'trash', text: 'Sampah mulai menumpuk di sekitar tenda. Apa yang sebaiknya dilakukan?',
      options: [
        { ok: true, ic: 'trash', text: 'Buang ke tempat sampah dan jaga kebersihan bersama', why: 'Benar! Sampah menumpuk mengundang lalat dan penyakit.' },
        { ic: 'eye-off', text: 'Biarkan saja, nanti petugas yang membersihkan', why: 'Kebersihan posko adalah tanggung jawab bersama.' },
        { ic: 'wave', text: 'Buang ke laut atau sungai', why: 'Membuang sampah ke laut atau sungai mencemari lingkungan.' }
      ]
    },
    {
      ic: 'hospital', text: 'Penyakit apa yang sering muncul jika air dan sanitasi di pengungsian buruk?',
      options: [
        { ok: true, ic: 'hospital', text: 'Diare', why: 'Benar! Air kotor dan sanitasi buruk sering menyebabkan diare.' },
        { ic: 'glasses', text: 'Rabun jauh', why: 'Rabun jauh tidak disebabkan air kotor.' },
        { ic: 'crack', text: 'Patah tulang', why: 'Patah tulang tidak disebabkan air kotor.' }
      ]
    }
  ];

  const HEART_PAIRS = [
    { ic: 'kid', name: 'Adik takut setiap mendengar suara ombak', fn: 'Temani dan katakan dengan lembut bahwa sekarang dia aman.' },
    { ic: 'chat', name: 'Teman ingin bercerita tentang kejadian yang dialaminya', fn: 'Dengarkan dengan sabar tanpa memotong atau mengejek.' },
    { ic: 'gamepad', name: 'Anak-anak bosan dan cemas di pengungsian', fn: 'Ajak bermain, bernyanyi, atau belajar bersama.' },
    { ic: 'family', name: 'Tetangga kehilangan anggota keluarganya', fn: 'Beri dukungan, temani, dan bantu menghubungi petugas pendamping.' },
    { ic: 'teddy', name: 'Kamu sulit tidur karena mimpi buruk', fn: 'Ceritakan perasaanmu kepada orang dewasa yang kamu percaya.' }
  ];

  // Sesuai UU No. 24 Tahun 2007 Pasal 58 (rehabilitasi) dan Pasal 59 (rekonstruksi).
  const REHAB_ITEMS = [
    { ic: 'broom', short: 'Perbaikan lingkungan', label: 'Perbaikan lingkungan daerah bencana.', zone: 'rehab', why: 'Perbaikan lingkungan termasuk kegiatan rehabilitasi.' },
    { ic: 'house', short: 'Bantuan perbaikan rumah', label: 'Pemberian bantuan perbaikan rumah warga.', zone: 'rehab', why: 'Bantuan perbaikan rumah masyarakat termasuk rehabilitasi.' },
    { ic: 'heart', short: 'Pemulihan psikologis', label: 'Pemulihan sosial psikologis warga.', zone: 'rehab', why: 'Memulihkan perasaan dan kehidupan sosial warga termasuk rehabilitasi.' },
    { ic: 'hospital', short: 'Pelayanan kesehatan', label: 'Pelayanan kesehatan bagi korban.', zone: 'rehab', why: 'Pelayanan kesehatan termasuk kegiatan rehabilitasi.' },
    { ic: 'crane', short: 'Bangun prasarana', label: 'Pembangunan kembali prasarana dan sarana, seperti jalan dan jembatan.', zone: 'rekon', why: 'Membangun kembali prasarana dan sarana termasuk rekonstruksi.' },
    { ic: 'school', short: 'Bangun sekolah', label: 'Pembangunan kembali sarana sosial, seperti sekolah dan rumah ibadah.', zone: 'rekon', why: 'Membangun kembali sarana sosial masyarakat termasuk rekonstruksi.' },
    { ic: 'foundation', short: 'Tahan bencana', label: 'Penerapan rancang bangun yang lebih baik dan tahan bencana.', zone: 'rekon', why: 'Rekonstruksi membangun kembali dengan cara yang lebih baik dan tahan bencana.' },
    { ic: 'building', short: 'Layanan publik lebih baik', label: 'Peningkatan fungsi pelayanan publik.', zone: 'rekon', why: 'Meningkatkan fungsi pelayanan publik termasuk rekonstruksi.' }
  ];
  const REHAB_CFG = {
    left: { key: 'rehab', label: 'Rehabilitasi', sub: 'memperbaiki dan memulihkan', ic: 'broom', cls: 'z-safe', btn: 'green' },
    right: { key: 'rekon', label: 'Rekonstruksi', sub: 'membangun kembali lebih baik', ic: 'crane', cls: 'z-deepsea', btn: 'blue' },
    unit: 'Kegiatan', statement: true
  };

  const CLEAN_ITEMS = [
    { ok: true, ic: 'gloves', label: 'Pakai sarung tangan tebal', why: 'Sarung tangan melindungi dari benda tajam dan kotoran.' },
    { ok: true, ic: 'boots', label: 'Pakai sepatu bot', why: 'Sepatu bot melindungi kaki dari paku dan pecahan kaca.' },
    { ok: true, ic: 'mask', label: 'Pakai masker', why: 'Masker melindungi dari debu dan bau lumpur.' },
    { ok: true, ic: 'family', label: 'Bekerja berkelompok bersama orang dewasa', why: 'Bekerja berkelompok lebih aman dan cepat.' },
    { ok: true, ic: 'trash', label: 'Kumpulkan sampah dan puing di tempatnya', why: 'Puing yang terkumpul lebih mudah diangkut dan tidak berserakan.' },
    { ok: false, ic: 'rock', label: 'Berjalan tanpa alas kaki di atas puing', why: 'Kaki bisa tertusuk paku atau pecahan kaca.' },
    { ok: false, ic: 'battery', label: 'Menyentuh kabel listrik yang putus', why: 'Kabel listrik yang putus bisa menyetrum. Laporkan ke petugas.' },
    { ok: false, ic: 'crack', label: 'Masuk sendirian ke bangunan yang rusak', why: 'Bangunan rusak bisa runtuh. Jangan masuk sendirian.' }
  ];

  const BETTER_PAIRS = [
    { ic: 'house', name: 'Rumah dulu berdiri tepat di bibir pantai', fn: 'Tata ulang permukiman di zona yang lebih aman.' },
    { ic: 'school', name: 'Sekolah roboh saat gempa', fn: 'Bangun ulang dengan konstruksi tahan gempa.' },
    { ic: 'mangrove', name: 'Hutan mangrove rusak diterjang gelombang', fn: 'Tanam kembali mangrove bersama warga.' },
    { ic: 'map', name: 'Jalur evakuasi tertutup puing', fn: 'Bersihkan jalurnya dan pasang lagi rambu evakuasi.' },
    { ic: 'siren', name: 'Sirene peringatan rusak', fn: 'Perbaiki dan uji sirene secara rutin.' }
  ];

  const EXAM_RECOVERY_QS = [
    {
      ic: 'doc', text: 'Menurut UU No. 24 Tahun 2007, kegiatan pascabencana meliputi apa?',
      options: [
        { ok: true, ic: 'crane', text: 'Rehabilitasi dan rekonstruksi', why: 'Benar! Pascabencana meliputi rehabilitasi dan rekonstruksi.' },
        { ic: 'siren', text: 'Peringatan dini dan latihan evakuasi', why: 'Itu kegiatan sebelum bencana.' },
        { ic: 'runner', text: 'Lari ke bukit', why: 'Itu tindakan saat bencana.' }
      ]
    },
    {
      ic: 'school', text: 'Membangun kembali sekolah dengan konstruksi tahan gempa termasuk kegiatan apa?',
      options: [
        { ok: true, ic: 'crane', text: 'Rekonstruksi', why: 'Tepat! Rekonstruksi membangun kembali dengan lebih baik dan tahan bencana.' },
        { ic: 'broom', text: 'Tanggap darurat', why: 'Tanggap darurat berfokus menyelamatkan korban dan kebutuhan dasar.' },
        { ic: 'siren', text: 'Peringatan dini', why: 'Peringatan dini dilakukan sebelum bencana.' }
      ]
    },
    {
      ic: 'heart', text: 'Pemulihan sosial psikologis warga termasuk kegiatan apa?',
      options: [
        { ok: true, ic: 'broom', text: 'Rehabilitasi', why: 'Benar! Pemulihan sosial psikologis termasuk rehabilitasi.' },
        { ic: 'crane', text: 'Rekonstruksi', why: 'Rekonstruksi berfokus membangun kembali. Pemulihan psikologis termasuk rehabilitasi.' },
        { ic: 'map', text: 'Mitigasi struktural', why: 'Mitigasi struktural berupa bangunan fisik sebelum bencana.' }
      ]
    },
    {
      ic: 'water', text: 'Air sumur di posko tercemar. Air minum yang paling aman adalah...',
      options: [
        { ok: true, ic: 'bottle', text: 'Air bersih bantuan atau air bersih yang sudah direbus', why: 'Tepat! Air yang tercemar bisa menyebabkan diare.' },
        { ic: 'water', text: 'Air sumur yang tercemar', why: 'Air sumur yang tercemar tidak aman diminum.' },
        { ic: 'rain', text: 'Air genangan', why: 'Air genangan penuh kuman.' }
      ]
    },
    {
      ic: 'battery', text: 'Kamu melihat kabel listrik putus di genangan air. Apa yang kamu lakukan?',
      options: [
        { ok: true, ic: 'megaphone', text: 'Menjauh dan laporkan ke petugas', why: 'Benar! Kabel di genangan air bisa menyetrum.' },
        { ic: 'gloves', text: 'Angkat kabelnya dengan tangan', why: 'Sangat berbahaya! Jangan pernah menyentuh kabel putus.' },
        { ic: 'swim', text: 'Lewati saja genangannya', why: 'Genangan berisi kabel putus sangat berbahaya.' }
      ]
    },
    {
      ic: 'kid', text: 'Temanmu masih sangat takut setelah tsunami. Apa yang bisa kamu lakukan?',
      options: [
        { ok: true, ic: 'chat', text: 'Temani dan dengarkan ceritanya', why: 'Tepat! Ditemani dan didengarkan membantu teman merasa lebih aman.' },
        { ic: 'arrow-left', text: 'Jauhi dia', why: 'Teman yang takut butuh ditemani, bukan dijauhi.' },
        { ic: 'gamepad', text: 'Tertawakan supaya dia berani', why: 'Ditertawakan membuat teman makin sedih.' }
      ]
    }
  ];

  /* ----- Pulau Sejarah ----- */

  const TIMELINE_STEPS = [
    { ic: 'volcano', text: '1883 · Letusan Krakatau memicu tsunami di Selat Sunda', hint: 'Peristiwa paling lama: letusan Krakatau tahun 1883.' },
    { ic: 'tectonic', text: '1992 · Gempa dan tsunami di Flores, Nusa Tenggara Timur', hint: 'Setelah 1883, berikutnya tahun 1992 di Flores.' },
    { ic: 'wave', text: '2004 · Gempa besar dan tsunami Aceh', hint: 'Tsunami Aceh terjadi pada 26 Desember 2004.' },
    { ic: 'shoal', text: '2006 · Tsunami Pangandaran di selatan Jawa', hint: 'Dua tahun setelah Aceh, tsunami melanda Pangandaran pada 2006.' },
    { ic: 'boat', text: '2010 · Tsunami Kepulauan Mentawai, Sumatra Barat', hint: 'Tsunami Mentawai terjadi pada 2010.' },
    { ic: 'quake', text: '2018 · Tsunami Palu (September) dan Selat Sunda (Desember)', hint: 'Paling baru di daftar ini: dua tsunami pada 2018.' }
  ];

  const TRIGGER_PAIRS = [
    { ic: 'volcano', name: 'Krakatau 1883', fn: 'Letusan dahsyat gunung api di tengah laut.' },
    { ic: 'wave', name: 'Aceh 2004', fn: 'Gempa bawah laut sangat besar di Samudra Hindia.' },
    { ic: 'shoal', name: 'Pangandaran 2006', fn: 'Gempa yang guncangannya terasa lemah, tetapi tsunaminya besar.' },
    { ic: 'quake', name: 'Palu 2018', fn: 'Gempa kuat di sekitar Teluk Palu yang sempit.' },
    { ic: 'landslide', name: 'Selat Sunda 2018', fn: 'Longsoran tubuh Gunung Anak Krakatau ke laut, tanpa gempa kuat.' }
  ];

  const SMONG_QS = [
    {
      ic: 'megaphone', text: 'Apa arti smong bagi warga Pulau Simeulue, Aceh?',
      options: [
        { ok: true, ic: 'wave', text: 'Tsunami, sekaligus pesan: jika gempa kuat dan air laut surut, segera lari ke bukit', why: 'Benar! Smong adalah kata lokal untuk tsunami beserta pesan untuk menyelamatkan diri.' },
        { ic: 'fish', text: 'Nama ikan khas Simeulue', why: 'Smong berarti tsunami, bukan nama ikan.' },
        { ic: 'boat', text: 'Lomba perahu tahunan', why: 'Smong berarti tsunami dan pesan untuk lari ke bukit.' }
      ]
    },
    {
      ic: 'book', text: 'Bagaimana pesan smong diwariskan dari generasi ke generasi?',
      options: [
        { ok: true, ic: 'chat', text: 'Lewat cerita dan syair dari orang tua kepada anak', why: 'Tepat! Smong diwariskan lewat cerita dan syair, termasuk nyanyian nandong.' },
        { ic: 'tv', text: 'Lewat siaran televisi', why: 'Smong sudah diwariskan jauh sebelum ada televisi, lewat cerita dan syair.' },
        { ic: 'phone', text: 'Lewat aplikasi di ponsel', why: 'Smong diwariskan secara lisan lewat cerita dan syair.' }
      ]
    },
    {
      ic: 'calendar', text: 'Pesan smong lahir dari pengalaman tsunami di Simeulue pada tahun berapa?',
      options: [
        { ok: true, ic: 'calendar', text: '1907', why: 'Benar! Warga mengingat tsunami 1907 dan mewariskan pesannya lewat smong.' },
        { ic: 'calendar', text: '2004', why: 'Pada 2004 smong justru sudah ada dan menyelamatkan warga. Asalnya dari tsunami 1907.' },
        { ic: 'calendar', text: '2018', why: 'Smong sudah dikenal jauh sebelum 2018, berasal dari tsunami 1907.' }
      ]
    },
    {
      ic: 'family', text: 'Apa pelajaran terpenting dari kisah smong?',
      options: [
        { ok: true, ic: 'family', text: 'Pengetahuan yang terus diceritakan bisa menyelamatkan banyak nyawa', why: 'Tepat! Karena smong, sangat sedikit warga Simeulue yang menjadi korban tsunami 2004.' },
        { ic: 'eye-off', text: 'Cerita orang tua tidak perlu didengarkan', why: 'Justru cerita orang tua tentang smong menyelamatkan warga.' },
        { ic: 'house', text: 'Lebih aman tetap di dalam rumah', why: 'Smong mengajarkan untuk lari ke bukit, bukan tetap di rumah.' }
      ]
    }
  ];

  const PANGANDARAN_QS = [
    {
      ic: 'quake', text: 'Pada 2006 banyak warga pesisir Pangandaran hampir tidak merasakan guncangan, tetapi tsunami tetap datang. Apa pelajarannya?',
      options: [
        { ok: true, ic: 'eye', text: 'Tetap waspada pada tanda lain, seperti air laut surut dan peringatan resmi', why: 'Benar! Guncangan yang lemah tidak selalu berarti aman dari tsunami.' },
        { ic: 'eye-off', text: 'Gempa lemah pasti tidak berbahaya', why: 'Pangandaran 2006 menunjukkan gempa yang terasa lemah pun bisa disusul tsunami besar.' },
        { ic: 'umbrella', text: 'Tetap santai di pantai', why: 'Di pantai, tanda bahaya sekecil apa pun harus ditanggapi dengan evakuasi.' }
      ]
    },
    {
      ic: 'recede', text: 'Kamu berlibur di pantai dan melihat air laut tiba-tiba surut jauh. Apa yang kamu lakukan?',
      options: [
        { ok: true, ic: 'runner', text: 'Segera ajak keluarga lari ke tempat tinggi', why: 'Tepat! Air laut surut tiba-tiba adalah tanda tsunami akan datang.' },
        { ic: 'fish', text: 'Turun ke pantai untuk menangkap ikan', why: 'Berbahaya! Gelombang besar bisa datang beberapa menit kemudian.' },
        { ic: 'camera', text: 'Merekam video dari pinggir pantai', why: 'Jangan berhenti untuk merekam. Segera ke tempat tinggi.' }
      ]
    },
    {
      ic: 'map', text: 'Apa yang perlu ada di pantai wisata agar wisatawan bisa cepat menyelamatkan diri?',
      options: [
        { ok: true, ic: 'map', text: 'Rambu dan jalur evakuasi yang jelas', why: 'Benar! Wisatawan sering tidak mengenal daerah itu, jadi rambu sangat membantu.' },
        { ic: 'umbrella', text: 'Lebih banyak payung pantai', why: 'Payung pantai tidak membantu evakuasi.' },
        { ic: 'tv', text: 'Layar iklan yang besar', why: 'Yang dibutuhkan adalah rambu dan jalur evakuasi.' }
      ]
    }
  ];

  const PALU_QS = [
    {
      ic: 'crack', text: 'Saat gempa Palu 2018, tanah di beberapa wilayah tiba-tiba menjadi seperti bubur dan menelan bangunan. Disebut apa peristiwa ini?',
      options: [
        { ok: true, ic: 'crack', text: 'Likuefaksi', why: 'Benar! Likuefaksi terjadi saat tanah jenuh air kehilangan kekuatannya karena guncangan gempa.' },
        { ic: 'volcano', text: 'Erupsi', why: 'Erupsi adalah letusan gunung api.' },
        { ic: 'rain', text: 'Banjir bandang', why: 'Yang terjadi di Palu adalah likuefaksi.' }
      ]
    },
    {
      ic: 'timer', text: 'Tsunami di Teluk Palu tiba sangat cepat setelah gempa. Mengapa?',
      options: [
        { ok: true, ic: 'quake', text: 'Sumbernya dekat dengan pantai, sehingga waktu evakuasi sangat singkat', why: 'Tepat! Karena sumbernya dekat, gelombang tiba hanya dalam hitungan menit.' },
        { ic: 'gull', text: 'Karena angin bertiup kencang', why: 'Angin tidak menyebabkan tsunami.' },
        { ic: 'sun', text: 'Karena cuaca sedang panas', why: 'Cuaca tidak memengaruhi datangnya tsunami.' }
      ]
    },
    {
      ic: 'siren', text: 'Apa pelajaran dari Palu bagi warga yang tinggal di dekat pantai?',
      options: [
        { ok: true, ic: 'runner', text: 'Begitu gempa kuat terasa, langsung evakuasi tanpa menunggu sirene', why: 'Benar! Gempa kuat di pantai adalah peringatan alami.' },
        { ic: 'tv', text: 'Tunggu berita di televisi dulu', why: 'Menunggu bisa membuang waktu yang sangat berharga.' },
        { ic: 'house', text: 'Kembali ke rumah mengambil barang', why: 'Jangan kembali. Langsung ke tempat tinggi.' }
      ]
    }
  ];

  const SUNDA_ITEMS = [
    { ic: 'volcano', short: 'Longsoran Anak Krakatau', label: 'Tsunami Selat Sunda 2018 dipicu longsoran Gunung Anak Krakatau.', zone: 'true', why: 'Benar! Sebagian tubuh gunung runtuh ke laut dan memicu tsunami.' },
    { ic: 'quake', short: 'Didahului gempa kuat', label: 'Sebelum tsunami, warga merasakan gempa yang sangat kuat.', zone: 'false', why: 'Salah. Tsunami Selat Sunda 2018 datang tanpa didahului gempa kuat.' },
    { ic: 'flashlight', short: 'Malam hari', label: 'Tsunami Selat Sunda 2018 terjadi pada malam hari.', zone: 'true', why: 'Benar! Gelombang datang di malam hari sehingga banyak orang tidak sempat menyadarinya.' },
    { ic: 'map', short: 'Banten dan Lampung', label: 'Pantai di Banten dan Lampung ikut terdampak.', zone: 'true', why: 'Benar! Kedua sisi Selat Sunda terdampak.' },
    { ic: 'no-entry', short: 'Gunung api tidak berbahaya', label: 'Gunung api tidak mungkin memicu tsunami.', zone: 'false', why: 'Salah. Letusan atau longsoran gunung api di laut bisa memicu tsunami.' },
    { ic: 'eye', short: 'Selalu waspada', label: 'Tsunami tidak selalu didahului gempa kuat.', zone: 'true', why: 'Benar! Karena itu, tetap waspada di pesisir dekat gunung api dan ikuti info resmi.' }
  ];

  const INATEWS_QS = [
    {
      ic: 'monitor', text: 'Setelah tsunami Aceh 2004, sistem apa yang dibangun Indonesia?',
      options: [
        { ok: true, ic: 'siren', text: 'Sistem Peringatan Dini Tsunami Indonesia (InaTEWS)', why: 'Benar! InaTEWS dibangun agar peringatan tsunami bisa disebarkan dengan cepat.' },
        { ic: 'tv', text: 'Stasiun televisi baru', why: 'Yang dibangun adalah sistem peringatan dini tsunami.' },
        { ic: 'boat', text: 'Kapal pesiar', why: 'Yang dibangun adalah sistem peringatan dini tsunami.' }
      ]
    },
    {
      ic: 'verified', text: 'Lembaga mana yang mengeluarkan peringatan dini tsunami di Indonesia?',
      options: [
        { ok: true, ic: 'monitor', text: 'BMKG', why: 'Tepat! BMKG memantau gempa dan mengeluarkan peringatan dini tsunami.' },
        { ic: 'chat', text: 'Grup pesan berantai', why: 'Pesan berantai bukan sumber resmi.' },
        { ic: 'question', text: 'Akun tanpa nama di media sosial', why: 'Peringatan resmi datang dari BMKG.' }
      ]
    },
    {
      ic: 'family', text: 'Peringatan dini paling berguna jika...',
      options: [
        { ok: true, ic: 'runner', text: 'Warga paham artinya dan rutin berlatih evakuasi', why: 'Benar! Peringatan secepat apa pun tidak berguna kalau warga tidak tahu harus berbuat apa.' },
        { ic: 'eye-off', text: 'Warga mengabaikannya', why: 'Peringatan yang diabaikan tidak menyelamatkan siapa pun.' },
        { ic: 'send', text: 'Disebar tanpa dicek kebenarannya', why: 'Cek dulu sumbernya. Peringatan resmi datang dari BMKG dan BPBD.' }
      ]
    }
  ];

  const MYTH_ITEMS = [
    { ic: 'calendar', short: 'Jarang, tak perlu siap', label: 'Tsunami sangat jarang, jadi tidak perlu bersiap.', zone: 'myth', why: 'Mitos! Indonesia berkali-kali dilanda tsunami, jadi kesiapsiagaan selalu penting.' },
    { ic: 'map', short: 'Di banyak pulau', label: 'Tsunami pernah terjadi di banyak pulau Indonesia, dari Sumatra sampai Papua.', zone: 'fact', why: 'Fakta! Misalnya Aceh, Pangandaran, Flores, Palu, dan Biak di Papua.' },
    { ic: 'quake', short: 'Guncangan lemah aman', label: 'Kalau gempanya terasa lemah, pasti tidak ada tsunami.', zone: 'myth', why: 'Mitos! Tsunami Pangandaran 2006 datang setelah guncangan yang terasa lemah.' },
    { ic: 'ripple', short: 'Datang berkali-kali', label: 'Gelombang tsunami bisa datang lebih dari satu kali.', zone: 'fact', why: 'Fakta! Gelombang berikutnya bahkan bisa lebih besar.' },
    { ic: 'recede', short: 'Lihat air surut', label: 'Melihat air laut surut dari dekat itu aman.', zone: 'myth', why: 'Mitos! Air surut adalah tanda gelombang besar akan datang.' },
    { ic: 'megaphone', short: 'Kearifan lokal', label: 'Kearifan lokal seperti smong bisa menyelamatkan nyawa.', zone: 'fact', why: 'Fakta! Smong membuat warga Simeulue segera lari ke bukit pada 2004.' }
  ];
  const MYTH_CFG = {
    left: { key: 'fact', label: 'Fakta', sub: 'sesuai kenyataan', ic: 'verified', cls: 'z-safe', btn: 'green' },
    right: { key: 'myth', label: 'Mitos', sub: 'anggapan keliru', ic: 'no-entry', cls: 'z-risk', btn: 'red' },
    unit: 'Pernyataan', statement: true
  };

  const LESSON_PAIRS = [
    { ic: 'megaphone', name: 'Simeulue 2004', fn: 'Cerita turun-temurun membuat warga langsung lari ke bukit.' },
    { ic: 'shoal', name: 'Pangandaran 2006', fn: 'Guncangan lemah pun tetap harus diwaspadai di pantai.' },
    { ic: 'timer', name: 'Palu 2018', fn: 'Tsunami bisa tiba dalam hitungan menit, jadi evakuasi harus segera.' },
    { ic: 'flashlight', name: 'Selat Sunda 2018', fn: 'Tsunami bisa datang tanpa gempa, bahkan di malam hari.' },
    { ic: 'monitor', name: 'Aceh 2004', fn: 'Mendorong lahirnya sistem peringatan dini tsunami Indonesia.' }
  ];

  const EXAM_HISTORY_QS = [
    {
      ic: 'wave', text: 'Tsunami Aceh terjadi pada tanggal berapa?',
      options: [
        { ok: true, ic: 'calendar', text: '26 Desember 2004', why: 'Benar! Tsunami Aceh terjadi pada 26 Desember 2004.' },
        { ic: 'calendar', text: '17 Agustus 2004', why: 'Tsunami Aceh terjadi pada 26 Desember 2004.' },
        { ic: 'calendar', text: '1 Januari 2005', why: 'Tsunami Aceh terjadi pada 26 Desember 2004.' }
      ]
    },
    {
      ic: 'volcano', text: 'Gunung api mana yang berkaitan dengan tsunami Selat Sunda tahun 1883 dan 2018?',
      options: [
        { ok: true, ic: 'volcano', text: 'Krakatau dan Anak Krakatau', why: 'Tepat! Letusan Krakatau 1883 dan longsoran Anak Krakatau 2018 sama-sama memicu tsunami.' },
        { ic: 'mountain', text: 'Gunung Merapi', why: 'Merapi berada di daratan Jawa. Jawabannya Krakatau dan Anak Krakatau.' },
        { ic: 'mountain', text: 'Gunung Bromo', why: 'Bromo berada di daratan Jawa Timur. Jawabannya Krakatau dan Anak Krakatau.' }
      ]
    },
    {
      ic: 'megaphone', text: 'Kearifan lokal smong berasal dari pulau mana?',
      options: [
        { ok: true, ic: 'map', text: 'Simeulue, Aceh', why: 'Benar! Smong dikenal warga Pulau Simeulue.' },
        { ic: 'map', text: 'Bali', why: 'Smong berasal dari Pulau Simeulue, Aceh.' },
        { ic: 'map', text: 'Lombok', why: 'Smong berasal dari Pulau Simeulue, Aceh.' }
      ]
    },
    {
      ic: 'crack', text: 'Bencana apa yang menyertai gempa dan tsunami Palu 2018?',
      options: [
        { ok: true, ic: 'crack', text: 'Likuefaksi', why: 'Tepat! Tanah di beberapa wilayah Palu berubah seperti bubur.' },
        { ic: 'rain', text: 'Badai salju', why: 'Badai salju tidak terjadi di Indonesia.' },
        { ic: 'volcano', text: 'Letusan gunung api', why: 'Yang menyertai gempa Palu adalah likuefaksi.' }
      ]
    },
    {
      ic: 'shoal', text: 'Apa yang istimewa dari tsunami Pangandaran 2006?',
      options: [
        { ok: true, ic: 'quake', text: 'Guncangannya terasa lemah, tetapi tsunaminya besar', why: 'Benar! Karena itu, jangan hanya mengandalkan kuatnya guncangan.' },
        { ic: 'volcano', text: 'Dipicu letusan gunung api', why: 'Tsunami Pangandaran dipicu gempa yang guncangannya terasa lemah.' },
        { ic: 'meteor', text: 'Dipicu meteor', why: 'Tsunami Pangandaran dipicu gempa bawah laut.' }
      ]
    },
    {
      ic: 'monitor', text: 'Sistem peringatan dini tsunami Indonesia disebut apa?',
      options: [
        { ok: true, ic: 'siren', text: 'InaTEWS', why: 'Tepat! InaTEWS adalah Indonesia Tsunami Early Warning System.' },
        { ic: 'question', text: 'GPS', why: 'GPS adalah sistem penentu posisi.' },
        { ic: 'question', text: 'Wi-Fi', why: 'Wi-Fi adalah jaringan internet nirkabel.' }
      ]
    }
  ];

  /* ----- Pulau Juara ----- */

  const FINAL_TF_ITEMS = [
    { ic: 'gull', short: 'Karena angin', label: 'Tsunami dibangkitkan oleh angin kencang.', zone: 'false', why: 'Salah. Tsunami dipicu gangguan di dasar laut, seperti gempa.' },
    { ic: 'mangrove', short: 'Mangrove struktural', label: 'Menanam hutan mangrove termasuk mitigasi struktural.', zone: 'true', why: 'Benar! Mangrove adalah pelindung pantai secara fisik.' },
    { ic: 'ripple', short: 'Gelombang pertama terbesar', label: 'Gelombang pertama pasti yang terbesar.', zone: 'false', why: 'Salah. Gelombang berikutnya bisa lebih besar.' },
    { ic: 'monitor', short: 'BMKG', label: 'BMKG mengeluarkan peringatan dini tsunami.', zone: 'true', why: 'Benar! BMKG adalah sumber resmi peringatan dini tsunami.' },
    { ic: 'car', short: 'Mobil selalu lebih cepat', label: 'Saat evakuasi, naik mobil selalu lebih cepat daripada berjalan kaki.', zone: 'false', why: 'Salah. Jalan bisa macet, sehingga berjalan kaki sering lebih cepat.' },
    { ic: 'crane', short: 'Rekonstruksi', label: 'Rekonstruksi berarti membangun kembali dengan lebih baik dan tahan bencana.', zone: 'true', why: 'Benar! Itu sesuai UU No. 24 Tahun 2007.' }
  ];

  const FINAL_KIND_ITEMS = [
    { ic: 'seawall', short: 'Tanggul pantai', label: 'Membangun tanggul pantai.', zone: 'struct', why: 'Tanggul adalah bangunan fisik, jadi termasuk mitigasi struktural.' },
    { ic: 'mangrove', short: 'Hutan mangrove', label: 'Menanam hutan mangrove di pesisir.', zone: 'struct', why: 'Mangrove adalah pelindung fisik alami, termasuk mitigasi struktural.' },
    { ic: 'tower', short: 'Menara evakuasi', label: 'Membangun menara evakuasi vertikal.', zone: 'struct', why: 'Menara evakuasi adalah bangunan fisik.' },
    { ic: 'building', short: 'Bangunan tahan gempa', label: 'Membangun gedung tahan gempa.', zone: 'struct', why: 'Bangunan tahan gempa termasuk mitigasi struktural.' },
    { ic: 'siren', short: 'Peringatan dini', label: 'Menyebarkan peringatan dini lewat sirene dan ponsel.', zone: 'nonstruct', why: 'Peringatan dini adalah upaya non-fisik, termasuk non-struktural.' },
    { ic: 'map', short: 'Peta evakuasi', label: 'Membuat peta jalur evakuasi.', zone: 'nonstruct', why: 'Peta evakuasi adalah upaya non-struktural.' },
    { ic: 'runner', short: 'Latihan evakuasi', label: 'Latihan evakuasi rutin di sekolah.', zone: 'nonstruct', why: 'Latihan adalah upaya non-struktural.' },
    { ic: 'zoning', short: 'Tata ruang', label: 'Mengatur tata ruang pesisir.', zone: 'nonstruct', why: 'Aturan tata ruang termasuk mitigasi non-struktural.' }
  ];
  const FINAL_KIND_CFG = {
    left: { key: 'struct', label: 'Struktural', sub: 'membangun secara fisik', ic: 'seawall', cls: 'z-deepsea', btn: 'blue' },
    right: { key: 'nonstruct', label: 'Non-struktural', sub: 'pengetahuan dan aturan', ic: 'siren', cls: 'z-safe', btn: 'green' },
    unit: 'Upaya', statement: true
  };

  // Soal "kapan": tiga pilihan yang sama (sebelum, saat, sesudah) untuk setiap tindakan.
  const whenQ = (ic, text, ok, why) => ({
    ic, text,
    options: [
      { ok: ok === 'pre', ic: 'bag', text: 'Sebelum tsunami', why },
      { ok: ok === 'now', ic: 'runner', text: 'Saat tsunami', why },
      { ok: ok === 'post', ic: 'tent', text: 'Sesudah tsunami', why }
    ]
  });
  const FINAL_WHEN_QS = [
    whenQ('bag', 'Menyiapkan tas siaga dan menyimpannya di dekat pintu.', 'pre', 'Tas siaga disiapkan sebelum bencana.'),
    whenQ('duck-cover', 'Merunduk, berlindung, dan melindungi kepala saat guncangan.', 'now', 'Ini dilakukan saat gempa terjadi.'),
    whenQ('verified', 'Menunggu petugas menyatakan daerah aman sebelum pulang.', 'post', 'Ini dilakukan sesudah gelombang datang.'),
    whenQ('map', 'Mempelajari jalur evakuasi dari rumah ke bukit.', 'pre', 'Jalur evakuasi dipelajari sebelum bencana.'),
    whenQ('runner', 'Berjalan cepat ke tempat tinggi mengikuti rambu.', 'now', 'Evakuasi dilakukan saat ada tanda bahaya.'),
    whenQ('broom', 'Bergotong royong membersihkan puing dengan sarung tangan.', 'post', 'Membersihkan puing dilakukan sesudah daerah dinyatakan aman.')
  ];

  const FINAL_STEPS = [
    { ic: 'duck-cover', text: 'Guncangan terasa: merunduk, berlindung, lindungi kepala', hint: 'Pertama, lindungi diri saat guncangan.' },
    { ic: 'bag', text: 'Guncangan berhenti: ambil tas siaga yang sudah siap', hint: 'Setelah guncangan berhenti, ambil tas siaga tanpa membuang waktu.' },
    { ic: 'runner', text: 'Berjalan cepat ke tempat tinggi mengikuti rambu', hint: 'Lalu segera evakuasi ke tempat tinggi.' },
    { ic: 'flag', text: 'Lapor di titik kumpul dan tetap di sana', hint: 'Sampai di titik kumpul, lapor dan jangan turun.' },
    { ic: 'verified', text: 'Tunggu pernyataan aman dari BMKG atau BPBD', hint: 'Tunggu sampai petugas menyatakan aman.' },
    { ic: 'broom', text: 'Pulang dengan hati-hati dan bantu pemulihan', hint: 'Terakhir, pulang dengan hati-hati dan bantu sesama.' }
  ];

  const FINAL_TERM_PAIRS = [
    { ic: 'tower', name: 'TES', fn: 'Tempat Evakuasi Sementara, bangunan tinggi untuk berlindung.' },
    { ic: 'siren', name: 'BPBD', fn: 'Badan penanggulangan bencana di tingkat daerah.' },
    { ic: 'monitor', name: 'InaTEWS', fn: 'Sistem peringatan dini tsunami Indonesia.' },
    { ic: 'crane', name: 'Rekonstruksi', fn: 'Membangun kembali dengan lebih baik dan tahan bencana.' },
    { ic: 'megaphone', name: 'Smong', fn: 'Kearifan lokal Simeulue: gempa kuat dan air surut, lari ke bukit.' }
  ];

  // P = rumah. Dua jalan aman: lewat atas (lebih pendek) atau memutar lewat bawah sungai.
  const FINAL_MAP = [
    'SB..r.HG',
    'SBu#R#.H',
    'SBu.R.h.',
    'SBP#R...',
    'SB......',
    'SB#h.rru'
  ];

  const FINAL_PICK_ITEMS = [
    { ok: true, ic: 'bag', label: 'Menyiapkan tas siaga bersama keluarga', why: 'Bersiap sebelum bencana membuat evakuasi lebih cepat.' },
    { ok: true, ic: 'runner', label: 'Langsung lari ke tempat tinggi saat air laut surut', why: 'Air surut adalah tanda bahaya.' },
    { ok: true, ic: 'verified', label: 'Mengecek kabar ke BMKG atau BPBD sebelum menyebarkan', why: 'Pahlawan Siaga tidak menyebar hoaks.' },
    { ok: true, ic: 'family', label: 'Membantu lansia dan anak kecil saat evakuasi', why: 'Saling membantu membuat lebih banyak orang selamat.' },
    { ok: true, ic: 'heart', label: 'Menemani teman yang masih takut setelah bencana', why: 'Pemulihan hati juga penting.' },
    { ok: true, ic: 'megaphone', label: 'Menceritakan pelajaran siaga kepada keluarga', why: 'Seperti smong, pengetahuan yang dibagikan bisa menyelamatkan nyawa.' },
    { ok: false, ic: 'camera', label: 'Merekam gelombang dari pinggir pantai', why: 'Berbahaya! Segera ke tempat tinggi.' },
    { ok: false, ic: 'send', label: 'Menyebar pesan berantai tanpa dicek', why: 'Pesan tanpa sumber bisa membuat panik.' },
    { ok: false, ic: 'house', label: 'Pulang setelah gelombang pertama surut', why: 'Gelombang berikutnya bisa lebih besar.' }
  ];

  const FINAL_QUICK_QS = [
    {
      ic: 'recede', text: 'Air laut tiba-tiba surut jauh. Kamu...',
      options: [
        { ok: true, ic: 'runner', text: 'Lari ke tempat tinggi', why: 'Benar! Itu tanda tsunami.' },
        { ic: 'fish', text: 'Mencari ikan', why: 'Berbahaya! Segera ke tempat tinggi.' },
        { ic: 'camera', text: 'Merekam video', why: 'Jangan berhenti. Segera ke tempat tinggi.' }
      ]
    },
    {
      ic: 'chat', text: 'Ada pesan berantai: "Tsunami 30 meter datang!" Kamu...',
      options: [
        { ok: true, ic: 'verified', text: 'Cek ke BMKG atau BPBD', why: 'Tepat! Percayai sumber resmi.' },
        { ic: 'send', text: 'Langsung sebarkan', why: 'Cek dulu sebelum menyebarkan.' },
        { ic: 'eye-off', text: 'Abaikan semua informasi', why: 'Jangan abaikan. Cek ke sumber resmi.' }
      ]
    },
    {
      ic: 'ripple', text: 'Gelombang pertama sudah surut. Kamu...',
      options: [
        { ok: true, ic: 'flag', text: 'Tetap di titik kumpul', why: 'Benar! Gelombang berikutnya bisa lebih besar.' },
        { ic: 'house', text: 'Pulang mengambil barang', why: 'Jangan pulang sebelum dinyatakan aman.' },
        { ic: 'umbrella', text: 'Kembali ke pantai', why: 'Pantai masih berbahaya.' }
      ]
    },
    {
      ic: 'quake', text: 'Gempa kuat mengguncang saat kamu di dalam kelas. Pertama kamu...',
      options: [
        { ok: true, ic: 'duck-cover', text: 'Berlindung di bawah meja dan lindungi kepala', why: 'Tepat! Lindungi diri dulu saat guncangan.' },
        { ic: 'stairs', text: 'Berlari menuruni tangga saat masih berguncang', why: 'Berlari saat berguncang bisa membuat jatuh.' },
        { ic: 'phone', text: 'Menelepon teman', why: 'Lindungi diri dulu.' }
      ]
    },
    {
      ic: 'tent', text: 'Di posko, kamu ingin minum tetapi air sumur keruh. Kamu...',
      options: [
        { ok: true, ic: 'bottle', text: 'Minum air bersih bantuan', why: 'Benar! Air keruh bisa menyebabkan diare.' },
        { ic: 'water', text: 'Minum air sumur', why: 'Air sumur yang keruh tidak aman.' },
        { ic: 'rain', text: 'Minum air genangan', why: 'Genangan penuh kuman.' }
      ]
    },
    {
      ic: 'mountain', text: 'Ke mana tujuan evakuasi tsunami?',
      options: [
        { ok: true, ic: 'mountain', text: 'Bukit atau gedung evakuasi yang tinggi', why: 'Tepat! Tempat tinggi aman dari gelombang.' },
        { ic: 'umbrella', text: 'Pantai', why: 'Pantai adalah tempat paling berbahaya.' },
        { ic: 'pier', text: 'Dermaga', why: 'Dermaga berada di tepi laut.' }
      ]
    }
  ];

  const FINAL_EXAM_QS = [
    {
      ic: 'tectonic', text: 'Syarat gempa yang dapat memicu tsunami adalah...',
      options: [
        { ok: true, ic: 'tectonic', text: 'Di laut, dangkal, kuat (lebih dari 7,0), dan bergeser naik-turun', why: 'Benar! Itu syarat umum gempa pemicu tsunami.' },
        { ic: 'mountain', text: 'Di darat dan sangat dalam', why: 'Gempa pemicu tsunami umumnya di laut dan dangkal.' },
        { ic: 'gull', text: 'Disertai angin kencang', why: 'Angin tidak berpengaruh pada tsunami.' }
      ]
    },
    {
      ic: 'shoal', text: 'Saat mendekati pantai yang dangkal, gelombang tsunami...',
      options: [
        { ok: true, ic: 'shoal', text: 'Melambat dan makin tinggi', why: 'Tepat!' },
        { ic: 'ripple', text: 'Makin cepat dan makin rendah', why: 'Justru melambat dan meninggi.' },
        { ic: 'eye-off', text: 'Menghilang', why: 'Gelombang justru meninggi di dekat pantai.' }
      ]
    },
    {
      ic: 'breakwater', text: 'Pemecah gelombang, mangrove, dan tanggul termasuk mitigasi...',
      options: [
        { ok: true, ic: 'seawall', text: 'Struktural', why: 'Benar! Semuanya pelindung fisik.' },
        { ic: 'siren', text: 'Non-struktural', why: 'Non-struktural berupa pengetahuan dan aturan.' },
        { ic: 'tent', text: 'Pascabencana', why: 'Pelindung pantai dibangun sebelum bencana.' }
      ]
    },
    {
      ic: 'siren', text: 'Peringatan dini, peta evakuasi, dan latihan rutin termasuk mitigasi...',
      options: [
        { ok: true, ic: 'siren', text: 'Non-struktural', why: 'Tepat!' },
        { ic: 'seawall', text: 'Struktural', why: 'Struktural berupa bangunan fisik.' },
        { ic: 'crane', text: 'Rekonstruksi', why: 'Rekonstruksi adalah membangun kembali sesudah bencana.' }
      ]
    },
    {
      ic: 'bag', text: 'Isi tas siaga yang paling tepat adalah...',
      options: [
        { ok: true, ic: 'bag', text: 'Dokumen, air, makanan, senter, P3K, dan radio', why: 'Benar!' },
        { ic: 'gamepad', text: 'Konsol game dan camilan', why: 'Tas siaga berisi barang penting untuk bertahan.' },
        { ic: 'tv', text: 'Televisi kecil', why: 'Televisi tidak praktis dibawa.' }
      ]
    },
    {
      ic: 'volcano', text: 'Tsunami Selat Sunda 2018 mengajarkan bahwa tsunami...',
      options: [
        { ok: true, ic: 'eye', text: 'Tidak selalu didahului gempa kuat', why: 'Tepat! Pemicunya longsoran Gunung Anak Krakatau.' },
        { ic: 'sun', text: 'Hanya terjadi siang hari', why: 'Tsunami Selat Sunda justru terjadi malam hari.' },
        { ic: 'quake', text: 'Selalu didahului gempa sangat kuat', why: 'Tsunami Selat Sunda 2018 datang tanpa gempa kuat.' }
      ]
    },
    {
      ic: 'heart', text: 'Membantu teman yang masih takut setelah bencana termasuk...',
      options: [
        { ok: true, ic: 'heart', text: 'Pemulihan sosial psikologis', why: 'Benar! Pemulihan hati termasuk rehabilitasi.' },
        { ic: 'crane', text: 'Pembangunan prasarana', why: 'Itu termasuk rekonstruksi.' },
        { ic: 'siren', text: 'Peringatan dini', why: 'Peringatan dini dilakukan sebelum bencana.' }
      ]
    },
    {
      ic: 'megaphone', text: 'Apa yang bisa kamu lakukan setelah menyelesaikan Nusa Siaga?',
      options: [
        { ok: true, ic: 'megaphone', text: 'Membagikan pengetahuan siaga kepada keluarga dan teman', why: 'Tepat! Seperti smong, pengetahuan yang dibagikan bisa menyelamatkan nyawa.' },
        { ic: 'lock', text: 'Menyimpannya untuk diri sendiri', why: 'Pengetahuan siaga paling berguna jika dibagikan.' },
        { ic: 'eye-off', text: 'Melupakannya', why: 'Ingat terus dan bagikan kepada orang lain.' }
      ]
    }
  ];

  const PLAY = {
    recoverySteps: lv => playSequence(lv, RECOVERY_STEPS, 0),
    shelterPick: lv => playPick(lv, SHELTER_ITEMS, { hint: 'Ketuk semua kebutuhan utama di posko pengungsian.', count: 'Kebutuhan ditemukan', okTitle: 'Betul, itu kebutuhan utama!', badTitle: 'Bukan kebutuhan utama' }),
    firstAidQuiz: lv => playQuiz(lv, FIRSTAID_QS, 0),
    afterSort: lv => playSort(lv, AFTER_SORT_ITEMS, AFTER_SORT_CFG),
    healthQuiz: lv => playQuiz(lv, HEALTH_QS, 0),
    heartMatch: lv => playMatch(lv, HEART_PAIRS, { hint: 'Ketuk satu situasi di kiri, lalu ketuk cara membantunya di kanan.', wrong: 'Cara membantu' }),
    rehabSort: lv => playSort(lv, REHAB_ITEMS, REHAB_CFG),
    cleanPick: lv => playPick(lv, CLEAN_ITEMS, { hint: 'Ketuk semua cara kerja yang aman.', count: 'Cara aman ditemukan', okTitle: 'Betul, itu aman!', badTitle: 'Itu berbahaya' }),
    betterMatch: lv => playMatch(lv, BETTER_PAIRS, { hint: 'Ketuk satu masalah di kiri, lalu ketuk solusinya di kanan.', wrong: 'Solusi untuk' }),
    examRecovery: lv => playQuiz(lv, EXAM_RECOVERY_QS, 20),
    timeline: lv => playSequence(lv, TIMELINE_STEPS, 0),
    triggerMatch: lv => playMatch(lv, TRIGGER_PAIRS, { hint: 'Ketuk satu peristiwa di kiri, lalu ketuk pemicunya di kanan.', wrong: 'Pemicu' }),
    smongQuiz: lv => playQuiz(lv, SMONG_QS, 0),
    pangandaranQuiz: lv => playQuiz(lv, PANGANDARAN_QS, 0),
    paluQuiz: lv => playQuiz(lv, PALU_QS, 0),
    sundaSort: lv => playSort(lv, SUNDA_ITEMS, TF_CFG),
    inatewsQuiz: lv => playQuiz(lv, INATEWS_QS, 0),
    mythSort: lv => playSort(lv, MYTH_ITEMS, MYTH_CFG),
    lessonMatch: lv => playMatch(lv, LESSON_PAIRS, { hint: 'Ketuk satu peristiwa di kiri, lalu ketuk pelajarannya di kanan.', wrong: 'Pelajaran' }),
    examHistory: lv => playQuiz(lv, EXAM_HISTORY_QS, 20),
    finalTf: lv => playSort(lv, FINAL_TF_ITEMS, TF_CFG),
    finalKind: lv => playSort(lv, FINAL_KIND_ITEMS, FINAL_KIND_CFG),
    finalWhen: lv => playQuiz(lv, FINAL_WHEN_QS, 0),
    finalSteps: lv => playSequence(lv, FINAL_STEPS, 45),
    finalTerms: lv => playMatch(lv, FINAL_TERM_PAIRS, { hint: 'Ketuk satu istilah di kiri, lalu ketuk artinya di kanan.', wrong: 'Arti' }),
    finalRun: lv => playRunner(lv, { total: 7000, speed: 340 }),
    finalRoute: lv => playRoute(lv, { map: FINAL_MAP }),
    finalPick: lv => playPick(lv, FINAL_PICK_ITEMS, { hint: 'Ketuk semua tindakan seorang Pahlawan Siaga.', count: 'Tindakan tepat', okTitle: 'Itu baru Pahlawan Siaga!', badTitle: 'Kurang tepat' }),
    finalQuick: lv => playQuiz(lv, FINAL_QUICK_QS, 12),
    finalExam: lv => playQuiz(lv, FINAL_EXAM_QS, 20),
    deepshore: lv => playSort(lv, DEEP_ITEMS, DEEP_CFG),
    wavetype: lv => playSort(lv, WAVE_ITEMS, WAVE_CFG),
    terms: lv => playMatch(lv, TERM_PAIRS, { hint: 'Ketuk satu istilah di kiri, lalu ketuk artinya di kanan.', wrong: 'Arti' }),
    history: lv => playQuiz(lv, HISTORY_QS, 0),
    examBasic: lv => playQuiz(lv, EXAM_BASIC_QS, 20),
    safehouse: lv => playPick(lv, SAFEHOUSE_ITEMS, { hint: 'Ketuk semua kartu yang merupakan ciri rumah tahan gempa.', count: 'Ciri ditemukan', okTitle: 'Betul, itu ciri rumah tahan gempa!', badTitle: 'Bukan ciri rumah tahan gempa' }),
    towerpick: lv => playPick(lv, TOWER_ITEMS, { hint: 'Ketuk semua kartu yang merupakan ciri menara evakuasi yang baik.', count: 'Ciri ditemukan', okTitle: 'Betul, menara yang baik seperti itu!', badTitle: 'Kurang tepat' }),
    care: lv => playSort(lv, CARE_ITEMS, CARE_CFG),
    routeTower: lv => playRoute(lv, { map: TOWER_MAP }),
    quickStruct: lv => playQuiz(lv, QUICK_STRUCT_QS, 15),
    solutions: lv => playMatch(lv, SOLUTION_PAIRS, { hint: 'Ketuk satu masalah di kiri, lalu ketuk solusinya di kanan.', wrong: 'Solusi untuk' }),
    signsmatch: lv => playMatch(lv, SIGN_PAIRS, { hint: 'Ketuk satu rambu di kiri, lalu ketuk artinya di kanan.', wrong: 'Arti' }),
    hoax: lv => playSort(lv, HOAX_ITEMS, HOAX_CFG),
    familyplan: lv => playPick(lv, PLAN_ITEMS, { hint: 'Ketuk semua hal yang perlu ada dalam rencana siaga keluarga.', count: 'Ditemukan', okTitle: 'Betul, itu penting!', badTitle: 'Tidak termasuk rencana siaga' }),
    routeSchool: lv => playRoute(lv, { map: SCHOOL_MAP }),
    examNonstruct: lv => playQuiz(lv, EXAM_NONSTRUCT_QS, 20),
    familybag: lv => playPick(lv, FAMILY_BAG_ITEMS, { hint: 'Ketuk semua barang tambahan yang perlu dibawa.', count: 'Barang dipilih', okTitle: 'Masuk tas siaga!', badTitle: 'Tidak perlu dibawa' }),
    nightRun: lv => playRunner(lv, { night: true, total: 6200, speed: 310 }),
    helpQuiz: lv => playQuiz(lv, HELP_QS, 0),
    fullDrill: lv => playSequence(lv, FULL_DRILL_STEPS, 50),
    truefalse: lv => playSort(lv, TF_ITEMS, TF_CFG),
    formation: lv => playSequence(lv, FORM_STEPS, 0),
    causes: lv => playMatch(lv, CAUSE_PAIRS, { hint: 'Ketuk satu penyebab di kiri, lalu ketuk penjelasannya di kanan.', wrong: 'Penjelasan' }),
    lab: playLab,
    quizImpact: lv => playQuiz(lv, IMPACT_QS, 0),
    match: lv => playMatch(lv, PAIRS, { hint: 'Ketuk satu bangunan di kiri, lalu ketuk fungsinya di kanan.', wrong: 'Fungsi' }),
    mangrove: playMangrove,
    builder: playBuilder,
    quizStruct: lv => playQuiz(lv, STRUCT_QS, 0),
    ews: lv => playSequence(lv, EWS_STEPS, 0),
    sort: lv => playSort(lv, ZONE_ITEMS, ZONE_CFG),
    quizMap: lv => playQuiz(lv, MAP_QS, 0),
    drill: lv => playSequence(lv, DRILL_STEPS, 45),
    quizEdu: lv => playQuiz(lv, EDU_QS, 0),
    signs: lv => playPick(lv, SIGNS, { count: 'Tanda ditemukan', okTitle: 'Betul, itu tanda tsunami!', badTitle: 'Bukan tanda tsunami' }),
    bag: playBag,
    route: lv => playRoute(lv, { map: ROUTE_MAP }),
    quizQuake: lv => playQuiz(lv, QUAKE_QS, 15),
    runner: lv => playRunner(lv),
    quizAfter: lv => playQuiz(lv, AFTER_QS, 0)
  };

  /* ================= Simpanan & suara ================= */

  const SAVE_KEY = 'siaga-tsunami-v1';
  const save = loadSave();

  function loadSave() {
    try {
      const s = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (s && typeof s.stars === 'object') {
        return {
          stars: s.stars, sound: s.sound !== false, name: s.name || '', introSeen: !!s.introSeen,
          explained: s.explained && typeof s.explained === 'object' ? s.explained : {}
        };
      }
    } catch (e) { /* penyimpanan tidak tersedia */ }
    return { stars: {}, sound: true, name: '', introSeen: false, explained: {} };
  }
  function persist() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* abaikan */ }
  }

  let actx = null;
  function tone(freqs, dur = 0.12, type = 'triangle', vol = 0.16) {
    if (!save.sound) return;
    try {
      actx = actx || (window.SiagaMusic && window.SiagaMusic.context()) || new (window.AudioContext || window.webkitAudioContext)();
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
  const music = window.SiagaMusic || { play() {}, stop() {}, mood() {} };
  function render(html) {
    clearScreen();
    music.mood('calm');
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
  const SHORT_TAG = { basic: 'Dasar', struct: 'Struktural', nonstruct: 'Non-struktural', hist: 'Sejarah', final: 'Ujian' };
  const shortTag = lv => SHORT_TAG[lv.phaseKey] || lv.phase;
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
          <p class="lead">Halo, aku <b>Tuti si Penyu</b>! Ayo jelajahi <b>${ISLANDS.length} pulau</b> dan selesaikan
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

  // Animasi penjelasan di awal tiap pulau; tampil otomatis sekali, lalu bisa diputar ulang dari halaman pulau.
  function openExplain(id) {
    if (!window.SiagaExplain || !window.SiagaExplain.has(id)) return;
    window.SiagaExplain.open({
      island: id,
      mascot,
      click: () => sfx.click(),
      onClose: () => {
        save.explained[id] = true;
        persist();
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

  // Peta Kepulauan: pulau-pulau di laut yang langsung diklik.
  // Posisi pulau (persen dari lebar/tinggi peta): peta lebar untuk layar besar, peta tinggi untuk HP.
  const ISLAND_SPOT = {
    basic: { wide: [15, 17], tall: [32, 7] },
    struct: { wide: [50, 16], tall: [68, 20.5] },
    nonstruct: { wide: [85, 19], tall: [32, 34] },
    response: { wide: [82, 50], tall: [68, 47.5] },
    recovery: { wide: [48, 50], tall: [32, 61] },
    history: { wide: [16, 54], tall: [68, 74.5] },
    final: { wide: [50, 84], tall: [50, 89] }
  };
  const MAP_HINT = 'Klik pulau yang ingin kamu jelajahi. Semua pulau bisa dibuka kapan saja.';

  // Papan peringkat bintang dengan lawan rekaan. Peringkat 1 selalu 3 bintang di atas pemain,
  // jadi selalu ada yang dikejar. Lawan lain punya target tetap yang bisa disalip, tapi tidak pernah melewati peringkat 1.
  const RIVALS = [['Bima', 0.55], ['Sari', 0.35], ['Rafi', 0.2], ['Nadia', 0.08]];
  const LEADER_GAP = 3;

  function leaderRows() {
    const me = totalStars();
    const rows = [
      { name: 'Raka', stars: me + LEADER_GAP },
      ...RIVALS.map(([name, share], i) => ({ name, stars: Math.max(0, Math.min(Math.round(share * MAX_STARS), me + LEADER_GAP - 1 - i)) })),
      { name: save.name || 'Kamu', stars: me, me: true }
    ];
    // Kalau seri, pemain ditaruh di atas lawan rekaan.
    return rows.sort((a, b) => b.stars - a.stars || (b.me ? 1 : 0) - (a.me ? 1 : 0));
  }

  function leaderboardHtml() {
    const rows = leaderRows();
    return `<section class="leader card" aria-labelledby="leaderTitle">
      <h3 id="leaderTitle">${ic('trophy')} Papan Peringkat</h3>
      <ol class="leader-list">
        ${rows.map((r, i) => `<li class="${r.me ? 'me' : ''} ${i === 0 ? 'top' : ''}">
          <span class="lb-rank">${i + 1}</span>
          <span class="lb-ava" aria-hidden="true">${esc(r.name.charAt(0).toUpperCase())}</span>
          <span class="lb-name">${esc(r.name)}${r.me && save.name ? ' <small>(kamu)</small>' : ''}</span>
          <span class="lb-stars">${ic('star')} ${r.stars}</span>
        </li>`).join('')}
      </ol>
    </section>`;
  }

  function showMap() {
    const done = allDone();
    render(`<section class="screen">
      <div class="screen-head">
        <h2>Peta Kepulauan</h2>
        <p>Klik pulau yang ingin kamu jelajahi. Setiap pulau berisi misi tentang satu jenis pengetahuan mitigasi.</p>
      </div>
      <div class="sea-map">
        <svg class="sea-route wide" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"><path d="M150 170 C280 80 400 100 500 160 C620 200 740 100 850 190 C960 280 900 420 820 500 C720 600 600 420 480 500 C380 570 280 420 160 540 C60 640 260 760 500 850"/></svg>
        <svg class="sea-route tall" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"><path d="M320 70 C600 80 760 120 680 205 C600 290 180 260 320 340 C460 420 820 390 680 475 C540 560 160 520 320 610 C480 700 840 660 680 745 C520 830 300 820 500 890"/></svg>
        <span class="sea-boat" aria-hidden="true">${ic('boat')}</span>
        <ol class="sea-islands">
          ${ISLANDS.map(is => {
            const list = levelsOf(is.id);
            const got = totalStars(list);
            const max = list.length * 3;
            const finished = list.every(lv => starsOf(lv) > 0);
            const spot = ISLAND_SPOT[is.id];
            return `<li class="${is.tag}" style="--wx:${spot.wide[0]}%;--wy:${spot.wide[1]}%;--tx:${spot.tall[0]}%;--ty:${spot.tall[1]}%">
              <button class="isle" data-island="${is.id}" type="button"
                aria-label="Pulau ${is.no}: ${esc(is.name)}, ${esc(is.theme)}, ${got} dari ${max} bintang${finished ? ', tuntas' : ''}">
                <span class="isle-art" aria-hidden="true">
                  ${art(is.art)}
                  <span class="isle-no">${is.no}</span>
                  ${finished ? `<span class="isle-done">${ic('check')}</span>` : ''}
                </span>
                <span class="isle-plate" aria-hidden="true">
                  <b class="isle-name">${esc(is.name)}</b>
                  <span class="isle-theme">${esc(is.theme)}</span>
                  <span class="isle-stars">${ic('star')} ${got}/${max}</span>
                </span>
              </button></li>`;
          }).join('')}
        </ol>
      </div>
      <div class="map-hint">${mascot('happy', 'mini')}<p id="mapInfo">${MAP_HINT}</p></div>
      ${leaderboardHtml()}
      ${done ? `<div class="row center final-cta"><button class="btn big" id="finalBtn" type="button">${ic('trophy')} Lihat sertifikat</button></div>` : ''}
    </section>`);
    // Penjelasan pulau muncul di bawah peta saat disorot kursor atau fokus keyboard.
    const info = $('#mapInfo');
    $$('.isle').forEach(b => {
      const is = ISLANDS.find(x => x.id === b.dataset.island);
      const show = () => { info.innerHTML = `<b>${esc(is.name)}</b> · ${esc(is.theme)}. ${esc(is.desc)}`; };
      const reset = () => { info.textContent = MAP_HINT; };
      b.addEventListener('mouseenter', show);
      b.addEventListener('focus', show);
      b.addEventListener('mouseleave', reset);
      b.addEventListener('blur', reset);
      b.addEventListener('click', () => { sfx.click(); showIsland(is.id); });
    });
    if (done) $('#finalBtn').onclick = showFinal;
  }

  // Layar satu pulau: daftar misinya.
  function showIsland(id) {
    const is = ISLANDS.find(x => x.id === id);
    const list = levelsOf(id);
    render(`<section class="screen">
      <div class="island-head card ${is.tag}">
        <div class="island-actions">
          <button class="btn ghost small" id="backWorld" type="button">${ic('arrow-left')} Peta Kepulauan</button>
          <button class="btn blue small" id="explainBtn" type="button">${ic('play')} Animasi penjelasan</button>
        </div>
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
    $('#explainBtn').onclick = () => { sfx.click(); openExplain(id); };
    $$('.node').forEach(b => b.addEventListener('click', () => {
      const lv = LEVEL_BY_ID[b.dataset.id];
      if (isUnlocked(lv)) { sfx.click(); startLevel(lv.id); }
      else showFeedback({ good: false, title: 'Masih terkunci', text: 'Selesaikan misi sebelumnya di pulau ini dulu, ya!' });
    }));
    if (!save.explained[id]) openExplain(id);
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
    $('#goBtn').onclick = () => { closeModal(); sfx.click(); music.mood('mission'); PLAY[lv.type](lv); };
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
          <p>yang telah menjelajahi ${ISLANDS.length} pulau, menyelesaikan ${LEVELS.length} misi mitigasi bencana tsunami, dan meraih <b>${total}</b> ${ic('star')}</p>
          <div class="cert-badges">
            <span>${ic('magnifier')} Ilmu tsunami</span><span>${ic('seawall')} Mitigasi struktural</span><span>${ic('siren')} Mitigasi non-struktural</span>
            <span>${ic('lifebuoy')} Tanggap bencana</span><span>${ic('tent')} Pemulihan</span><span>${ic('book')} Sejarah tsunami</span>
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

  /* ================= Mesin "pasangkan": nama di kiri, penjelasan di kanan ================= */

  function playMatch(lv, pairs, opts) {
    const left = shuffle(pairs.map((p, k) => Object.assign({ k }, p)));
    const right = shuffle(pairs.map((p, k) => Object.assign({ k }, p)));
    let selL = null, selR = null, matched = 0, over = false;
    $('#stage').innerHTML = `
      <p class="stage-hint">${esc(opts.hint)}</p>
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
      const p = pairs[Number(a.dataset.k)];
      if (a.dataset.k === b.dataset.k) {
        matched++;
        [a, b].forEach(el => { el.classList.add('matched'); el.disabled = true; $('.m-badge', el).textContent = matched; });
        sfx.good();
        showFeedback({ good: true, title: `${p.name}: cocok!`, text: p.fn });
        if (matched === pairs.length) { over = true; later(() => finishLevel(lv, lives), 1700); }
      } else {
        [a, b].forEach(el => { el.classList.remove('wrong'); void el.offsetWidth; el.classList.add('wrong'); });
        sfx.bad();
        setLives(lives - 1);
        showFeedback({ good: false, title: 'Belum cocok', text: `${opts.wrong} ${p.name.toLowerCase()}: ${p.fn.charAt(0).toLowerCase()}${p.fn.slice(1)}` });
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

  /* ================= Mesin "pilah": satu kartu, dua pilihan ================= */

  function playSort(lv, list, cfg) {
    const items = shuffle(list);
    const sides = [cfg.left, cfg.right];
    let i = 0, over = false;
    const zone = s => `
        <div class="sort-zone ${s.cls}">
          <div class="sz-head">${ic(s.ic)}<div><b>${esc(s.label)}</b><span>${esc(s.sub)}</span></div></div>
          <div class="sz-pile" data-pile="${s.key}"></div>
        </div>`;
    $('#stage').innerHTML = `
      <div class="sort">
        ${zone(cfg.left)}
        <div class="sort-center">
          <p class="q-count" id="sortCount"></p>
          <div class="sort-card card ${cfg.statement ? 'statement' : ''}" id="sortCard" aria-live="polite"></div>
          <div class="sort-btns">
            <button class="btn ${cfg.left.btn} sort-btn" data-zone="${cfg.left.key}" type="button">${ic('arrow-left')} ${esc(cfg.left.label)}</button>
            <button class="btn ${cfg.right.btn} sort-btn" data-zone="${cfg.right.key}" type="button">${esc(cfg.right.label)} ${ic('arrow-right')}</button>
          </div>
        </div>
        ${zone(cfg.right)}
      </div>`;

    function showCard() {
      const it = items[i];
      $('#sortCount').textContent = `${cfg.unit} ${i + 1} dari ${items.length}`;
      const card = $('#sortCard');
      card.innerHTML = `${ic(it.ic)}<b>${esc(it.label)}</b>`;
      card.classList.remove('pop');
      void card.offsetWidth;
      card.classList.add('pop');
    }
    function choose(key) {
      if (over) return;
      const it = items[i];
      const card = $('#sortCard');
      if (key === it.zone) {
        sfx.good();
        $(`[data-pile="${key}"]`).insertAdjacentHTML('beforeend',
          `<span class="pile-item" title="${esc(it.label)}">${ic(it.ic)}<small>${esc(it.short || it.label)}</small></span>`);
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
      if (e.code === 'ArrowLeft') { e.preventDefault(); choose(sides[0].key); }
      if (e.code === 'ArrowRight') { e.preventDefault(); choose(sides[1].key); }
    };
    window.addEventListener('keydown', onKey);
    onCleanup(() => window.removeEventListener('keydown', onKey));
    showCard();
  }

  /* ================= Pulau Ilmu: lab gempa pemicu ================= */

  function playLab(lv) {
    const st = { sea: true, mag: 6.5, depth: 120, vertical: true };
    let goal = 0, busy = false, over = false;
    const fmtMag = m => m.toFixed(1).replace('.', ',');
    const star = 'M0 -11 L3.2 -3.5 L11 -3.4 L5 1.8 L7 9.6 L0 5.2 L-7 9.6 L-5 1.8 L-11 -3.4 L-3.2 -3.5 Z';
    $('#stage').innerHTML = `
      <div class="lab card">
        <div class="lab-goal"><span class="lab-goal-n" id="labGoalN"></span><p id="labGoal"></p></div>
        <div class="lab-scene" id="labScene">
          <svg class="lab-svg" viewBox="0 0 600 260" role="img" aria-label="Penampang laut, dasar laut, dan daratan pantai">
            <rect x="0" y="0" width="600" height="260" fill="#d6efff"/>
            <rect x="0" y="70" width="440" height="112" fill="#2f8ee0"/>
            <g class="lab-bump"><path d="M-70 70 C-36 70 -24 34 0 34 C24 34 36 70 70 70 Z" fill="#1565b8" stroke="#23263a" stroke-width="3"/>
              <path d="M-14 40 C-6 36 4 36 12 40" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></g>
            <path d="M0 70 H440" stroke="#fff" stroke-width="3"/>
            <g class="plate-a"><rect x="-20" y="180" width="272" height="100" fill="#b07a4f" stroke="#23263a" stroke-width="3"/></g>
            <g class="plate-b">
              <path d="M232 180 H420 L444 70 H620 V280 H232 Z" fill="#c9965f" stroke="#23263a" stroke-width="3" stroke-linejoin="round"/>
              <path d="M444 70 H620 V84 H441 Z" fill="#7cd35a" stroke="#23263a" stroke-width="3" stroke-linejoin="round"/>
              <rect x="476" y="50" width="22" height="20" fill="#fffaf0" stroke="#23263a" stroke-width="3"/><path d="M472 52 L487 38 L502 52 Z" fill="#ff6b6b" stroke="#23263a" stroke-width="3" stroke-linejoin="round"/>
              <rect x="536" y="50" width="22" height="20" fill="#fffaf0" stroke="#23263a" stroke-width="3"/><path d="M532 52 L547 38 L562 52 Z" fill="#ffc93c" stroke="#23263a" stroke-width="3" stroke-linejoin="round"/>
            </g>
            <g class="lab-epi" id="labEpi">
              <circle class="lab-ring" r="14" fill="none" stroke="#ff6b6b" stroke-width="3"/>
              <circle class="lab-ring r2" r="14" fill="none" stroke="#ff6b6b" stroke-width="3"/>
              <path d="${star}" fill="#ffc93c" stroke="#23263a" stroke-width="2.5" stroke-linejoin="round"/>
            </g>
            <g font-size="15" font-weight="700" fill="#fff"><text x="24" y="100">LAUT</text><text x="24" y="210">DASAR LAUT</text></g>
            <text x="520" y="150" font-size="15" font-weight="700" fill="#23263a" text-anchor="middle">DARAT</text>
          </svg>
          <p class="lab-result" id="labResult" aria-live="polite"></p>
        </div>
        <div class="lab-controls">
          <div class="lab-ctl"><span class="lab-lbl">Lokasi pusat gempa</span>
            <div class="seg" role="group" aria-label="Lokasi pusat gempa">
              <button type="button" data-k="sea" data-v="1">${ic('wave')} Di laut</button><button type="button" data-k="sea" data-v="0">${ic('house')} Di darat</button>
            </div></div>
          <div class="lab-ctl"><span class="lab-lbl">Gerakan lempeng</span>
            <div class="seg" role="group" aria-label="Gerakan lempeng">
              <button type="button" data-k="vertical" data-v="1">${ic('arrow-up')} Naik-turun</button><button type="button" data-k="vertical" data-v="0">${ic('arrow-right')} Mendatar</button>
            </div></div>
          <label class="lab-ctl"><span class="lab-lbl">Magnitudo: <b id="magV"></b></span>
            <input type="range" id="magIn" min="5" max="9.5" step="0.1" value="${st.mag}"><span class="lab-scale"><span>5,0</span><span>9,5</span></span></label>
          <label class="lab-ctl"><span class="lab-lbl">Kedalaman pusat gempa: <b id="depV"></b></span>
            <input type="range" id="depIn" min="10" max="300" step="10" value="${st.depth}"><span class="lab-scale"><span>10 km</span><span>300 km</span></span></label>
        </div>
        <ul class="lab-checks" id="labChecks" hidden></ul>
        <div class="row center"><button class="btn big" id="quakeBtn" type="button">${ic('tectonic')} Picu gempa!</button></div>
      </div>`;

    const scene = $('#labScene');
    function sync() {
      $('#magV').textContent = fmtMag(st.mag);
      $('#depV').textContent = `${st.depth} km`;
      $$('.seg button').forEach(b => b.setAttribute('aria-pressed', String(st[b.dataset.k] === (b.dataset.v === '1'))));
      const x = st.sea ? 232 : 520;
      const y = st.sea ? 186 + (st.depth - 10) / 290 * 64 : 96 + (st.depth - 10) / 290 * 150;
      $('#labEpi').setAttribute('transform', `translate(${x} ${Math.round(y)})`);
    }
    function showGoal() {
      $('#labGoalN').textContent = `Tantangan ${goal + 1} dari ${LAB_GOALS.length}`;
      $('#labGoal').textContent = LAB_GOALS[goal].text;
    }
    $$('.seg button').forEach(b => b.addEventListener('click', () => {
      if (busy || over) return;
      st[b.dataset.k] = b.dataset.v === '1';
      sfx.click();
      sync();
    }));
    $('#magIn').addEventListener('input', e => { st.mag = Number(e.target.value); sync(); });
    $('#depIn').addEventListener('input', e => { st.depth = Number(e.target.value); sync(); });

    function checks(r) {
      const row = (ok, label, yes, no) => `<li class="${ok ? 'ok' : 'no'}">${ic(ok ? 'check' : 'cross')}<span><b>${label}:</b> ${ok ? yes : no}</span></li>`;
      return [
        row(r.sea, 'Lokasi', 'di laut, sehingga air laut bisa terdorong', 'di darat, sehingga air laut tidak terdorong'),
        row(r.mag > 7, `Magnitudo ${fmtMag(r.mag)}`, 'cukup kuat (lebih dari 7,0)', 'kurang kuat (7,0 atau kurang)'),
        row(r.depth < 70, `Kedalaman ${r.depth} km`, 'dangkal (kurang dari 70 km)', 'terlalu dalam (70 km atau lebih)'),
        row(r.vertical, 'Gerakan', 'naik-turun, mendorong massa air', 'mendatar, air hampir tidak terdorong')
      ].join('');
    }

    $('#quakeBtn').addEventListener('click', () => {
      if (busy || over) return;
      busy = true;
      const r = Object.assign({}, st);
      r.tsunami = r.sea && r.mag > 7 && r.depth < 70 && r.vertical;
      scene.className = 'lab-scene';
      void scene.offsetWidth;
      scene.classList.add('shake', r.vertical ? 'lift' : 'slide');
      if (r.tsunami) scene.classList.add('tsunami');
      $('#labResult').textContent = '';
      $('#labResult').className = 'lab-result';
      $('#labChecks').hidden = true;
      $('#quakeBtn').disabled = true;
      sfx.bad();
      later(() => {
        $('#labResult').textContent = r.tsunami ? 'Tsunami terbentuk!' : 'Tidak terjadi tsunami.';
        $('#labResult').className = 'lab-result ' + (r.tsunami ? 'yes' : 'no');
        $('#labChecks').innerHTML = checks(r);
        $('#labChecks').hidden = false;
        const g = LAB_GOALS[goal];
        if (g.check(r)) {
          sfx.good();
          goal++;
          if (goal === LAB_GOALS.length) {
            over = true;
            showFeedback({ good: true, title: 'Semua tantangan selesai!', text: 'Kamu sudah memahami syarat gempa yang bisa memicu tsunami.' });
            later(() => finishLevel(lv, lives), 2200);
          } else {
            showFeedback({ good: true, title: 'Tantangan berhasil!', text: 'Lihat daftar di bawah untuk tahu alasannya, lalu lanjut ke tantangan berikutnya.' });
            showGoal();
          }
        } else {
          setLives(lives - 1);
          showFeedback({ good: false, title: 'Belum sesuai tantangan', text: g.hint });
          if (lives <= 0) { over = true; later(() => failLevel(lv), 1900); }
        }
        busy = false;
        $('#quakeBtn').disabled = over;
      }, 2300);
    });

    sync();
    showGoal();
  }

  /* ================= Mesin "pilih semua yang benar" (dipakai Tanda Alam dll.) ================= */

  function playPick(lv, list, opts) {
    const cards = shuffle(list);
    const need = list.filter(s => s.ok).length;
    let found = 0;
    let over = false;
    $('#stage').innerHTML = `
      ${opts.hint ? `<p class="stage-hint">${esc(opts.hint)}</p>` : ''}
      <div class="sign-grid">
        ${cards.map((c, i) => `<button class="sign-card card" data-i="${i}" type="button">
          <span class="emo ${c.anim || ''}" aria-hidden="true">${ic(c.ic)}</span>
          <span class="lbl">${esc(c.label)}</span>
          <span class="mark" aria-hidden="true"></span>
        </button>`).join('')}
      </div>
      <p class="progress-line">${esc(opts.count)}: <b id="found">0</b> / ${need}</p>`;

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
        showFeedback({ good: true, title: opts.okTitle, text: c.why });
        if (found === need) { over = true; later(() => finishLevel(lv, lives), 1700); }
      } else {
        btn.classList.add('is-bad');
        $('.mark', btn).innerHTML = ic('cross');
        sfx.bad();
        setLives(lives - 1);
        showFeedback({ good: false, title: opts.badTitle, text: c.why });
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

  function playRoute(lv, cfg) {
    const MAP = cfg.map;
    const rows = MAP.length;
    const cols = MAP[0].length;
    const TILES = {
      S: { cls: 'sea', label: 'Laut', ic: 'wave' },
      B: { cls: 'beach', label: 'Pantai', ic: '' },
      R: { cls: 'river', label: 'Sungai', ic: '' },
      '#': { cls: 'block', label: 'Reruntuhan', ic: 'bricks' },
      '.': { cls: 'road', label: 'Jalan', ic: '' },
      u: { cls: 'road', label: 'Rambu evakuasi ke atas', sign: 'arrow-up' },
      r: { cls: 'road', label: 'Rambu evakuasi ke kanan', sign: 'arrow-right' },
      d: { cls: 'road', label: 'Rambu evakuasi ke bawah', sign: 'arrow-down' },
      h: { cls: 'road', label: 'Rumah satu lantai', ic: 'house' },
      T: { cls: 'goal', label: 'Menara evakuasi', ic: 'tower' },
      K: { cls: 'home', label: 'Sekolahmu', ic: 'school' },
      H: { cls: 'hill', label: 'Bukit', ic: '' },
      G: { cls: 'goal', label: 'Titik kumpul', ic: 'flag' },
      P: { cls: 'home', label: 'Rumahmu', ic: 'house' }
    };
    const DANGER = {
      S: { title: 'Itu laut!', text: 'Saat ada ancaman tsunami, menjauhlah dari laut.' },
      B: { title: 'Jangan ke pantai!', text: 'Pantai adalah tempat paling berbahaya. Bergeraklah menjauh dari laut.' },
      R: { title: 'Jauhi sungai!', text: 'Gelombang tsunami bisa masuk jauh ke daratan lewat sungai. Cari jalan lain.' },
      h: { title: 'Rumah satu lantai tidak cukup tinggi', text: 'Rumah biasa tidak aman untuk berlindung dari tsunami. Terus ke menara evakuasi!' }
    };
    const beachDecor = cfg.decor || { 1: 'umbrella', 4: 'palm' };
    const has = re => re.test(MAP.join(''));
    const LEGEND = [
      [/\./, '<i class="sw t-road"></i>Jalan'],
      [/[urd]/, `<i class="sw sign-sw">${ic('arrow-up')}</i>Rambu jalur evakuasi`],
      [/H/, '<i class="sw t-hill"></i>Bukit (tempat tinggi)'],
      [/G/, '<i class="sw t-goal"></i>Titik kumpul'],
      [/T/, '<i class="sw t-goal"></i>Menara evakuasi'],
      [/h/, '<i class="sw t-road"></i>Rumah satu lantai (tidak aman)'],
      [/#/, '<i class="sw t-block"></i>Reruntuhan'],
      [/S/, '<i class="sw t-sea"></i>Laut (bahaya)'],
      [/B/, '<i class="sw t-beach"></i>Pantai (bahaya)'],
      [/R/, '<i class="sw t-river"></i>Sungai (bahaya)']
    ].filter(([re]) => has(re)).map(([, html]) => `<li>${html}</li>`).join('');

    let pr = 0, pc = 0;
    MAP.forEach((row, r) => { const c = row.search(/[PK]/); if (c >= 0) { pr = r; pc = c; } });
    let over = false, moves = 0, seenSign = false, seenHill = false;

    $('#stage').innerHTML = `
      <div class="route-layout">
        <div class="board card" id="board" style="--cols:${cols}">
          ${MAP.map((row, r) => Array.from(row).map((ch, c) => {
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
          <ul class="legend card">${LEGEND}</ul>
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
      const ch = MAP[nr][nc];
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
      if ('urd'.includes(ch) && !seenSign) {
        seenSign = true;
        showFeedback({ good: true, title: 'Rambu jalur evakuasi!', text: 'Ikuti arah rambu hijau ini menuju tempat tinggi.' });
      } else if (ch === 'H' && !seenHill) {
        seenHill = true;
        showFeedback({ good: true, title: 'Kamu sudah di bukit!', text: 'Tempat tinggi lebih aman. Terus ke bendera titik kumpul.' });
      }
      if (ch === 'G' || ch === 'T') {
        over = true;
        showFeedback({ good: true, title: ch === 'T' ? 'Sampai di menara evakuasi!' : 'Sampai di titik kumpul!', text: `Kamu tiba dengan ${moves} langkah. Hebat!` });
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

  function playRunner(lv, opts = {}) {
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

    const TOTAL = opts.total || 5200, SPEED = opts.speed || 290, GRAV = 2200, JUMP = 800;
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

    // Malam hari: semua gelap kecuali lingkaran cahaya senter di depan pemain.
    function drawNight() {
      const g = ctx.createRadialGradient(px + 70, py - 40, 40, px + 70, py - 40, Math.max(W, H) * 0.55);
      g.addColorStop(0, 'rgba(10, 14, 38, 0)');
      g.addColorStop(0.45, 'rgba(10, 14, 38, 0.35)');
      g.addColorStop(1, 'rgba(10, 14, 38, 0.82)');
      ctx.fillStyle = g;
      ctx.fillRect(-10, 0, W + 20, H);
      // Bulan tetap bersinar di atas kegelapan.
      ctx.fillStyle = '#fff2b0';
      ctx.strokeStyle = INK;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(W - 60, 50, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
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
      sky.addColorStop(0, opts.night ? '#1d2b53' : '#7fcbff');
      sky.addColorStop(1, opts.night ? '#46609c' : '#d8f2ff');
      ctx.fillStyle = sky;
      ctx.fillRect(-10, 0, W + 20, H);

      ctx.lineWidth = 3;
      ctx.strokeStyle = INK;
      ctx.fillStyle = opts.night ? '#fff2b0' : '#ffd23f';
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
      if (opts.night) drawNight();

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
    if (save.sound) music.play(); else music.stop();
  });
  // Browser hanya mengizinkan suara setelah pemain menyentuh layar, jadi musik dimulai di sentuhan pertama.
  const firstTouch = () => {
    window.removeEventListener('pointerdown', firstTouch, true);
    window.removeEventListener('keydown', firstTouch, true);
    if (save.sound) music.play();
  };
  window.addEventListener('pointerdown', firstTouch, true);
  window.addEventListener('keydown', firstTouch, true);
  updateHeader();
  showHome();
  if (!save.introSeen) openIntro();
})();
