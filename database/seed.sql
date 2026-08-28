-- ============================================================
-- Web Desa Katekan — Seed Data
-- Jalankan SETELAH schema.sql
-- ============================================================

-- ── Profil Desa ─────────────────────────────────────────────
INSERT INTO profil_desa (
  nama_desa, kecamatan, kabupaten, provinsi, kode_pos,
  sejarah, visi, misi,
  alamat_kantor, telepon, email_desa,
  luas_wilayah, jumlah_penduduk, jumlah_kk,
  video_url
) VALUES (
  'Desa Katekan',
  'Ngadirojo',
  'Wonogiri',
  'Jawa Tengah',
  '57671',
  'Desa Katekan adalah sebuah desa yang terletak di Kecamatan Ngadirojo, Kabupaten Wonogiri, Provinsi Jawa Tengah. Desa ini memiliki sejarah panjang yang erat kaitannya dengan perkembangan kebudayaan dan pertanian di wilayah tersebut. Pada masa lampau, Desa Katekan merupakan pusat kegiatan pertanian dan perdagangan kecil yang ramai dikunjungi warga sekitar. Seiring berjalannya waktu, desa ini terus berkembang dengan mempertahankan kearifan lokal sekaligus mengadopsi kemajuan teknologi modern untuk meningkatkan kesejahteraan warganya.',
  'Terwujudnya Desa Katekan yang Mandiri, Sejahtera, dan Berbudaya Berlandaskan Gotong Royong',
  '1. Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan keterampilan.
2. Mengembangkan potensi ekonomi lokal berbasis pertanian, UMKM, dan wisata alam.
3. Meningkatkan infrastruktur desa yang memadai, merata, dan berkelanjutan.
4. Melestarikan budaya lokal dan kearifan tradisional sebagai identitas desa.
5. Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, dan partisipatif.',
  'Jl. Raya Katekan No. 1, Kecamatan Ngadirojo, Kabupaten Wonogiri, Jawa Tengah 57671',
  '(0273) 321456',
  'admin@desakatekan.id',
  1250.50,
  4823,
  1245,
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
) ON CONFLICT DO NOTHING;

-- ── Perangkat Desa ──────────────────────────────────────────
INSERT INTO perangkat_desa (nama, jabatan, urutan) VALUES
  ('Budi Santoso, S.Sos',       'Kepala Desa',          1),
  ('Siti Rahayu, A.Md',         'Sekretaris Desa',      2),
  ('Ahmad Fauzi',               'Kaur Keuangan',        3),
  ('Dewi Lestari',              'Kaur Umum',            4),
  ('Sukarman, S.Pd',            'Kaur Perencanaan',     5),
  ('Rini Wulandari',            'Kasi Pemerintahan',    6),
  ('Joko Purnomo',              'Kasi Kesejahteraan',   7),
  ('Sri Wahyuni, A.Md',         'Kasi Pelayanan',       8)
ON CONFLICT DO NOTHING;

-- ── Potensi Desa ────────────────────────────────────────────
INSERT INTO potensi (judul, slug, kategori, deskripsi_singkat, deskripsi) VALUES
  (
    'Pertanian Padi Sawah',
    'pertanian-padi-sawah',
    'Pertanian',
    'Lahan persawahan seluas ±450 ha yang subur menjadi tulang punggung perekonomian Desa Katekan.',
    'Desa Katekan memiliki lahan persawahan yang luas dan subur seluas ±450 hektar. Mayoritas penduduk berprofesi sebagai petani padi. Dengan sistem irigasi teknis yang baik, petani mampu panen 2–3 kali dalam setahun. Varietas unggulan yang ditanam antara lain Ciherang, IR64, dan varietas lokal adaptif. Kelompok Tani "Maju Bersama" aktif membimbing para petani dalam mendapatkan akses pupuk bersubsidi dan adopsi teknologi pertanian modern seperti mesin tanam dan pemanen padi.'
  ),
  (
    'Kerajinan Anyaman Bambu',
    'kerajinan-anyaman-bambu',
    'UMKM',
    'Kerajinan anyaman bambu khas Katekan yang dipasarkan hingga ke luar Jawa.',
    'Anyaman bambu merupakan warisan leluhur yang masih dilestarikan secara turun-temurun oleh warga Desa Katekan. Terdapat lebih dari 50 pengrajin aktif yang menghasilkan berbagai produk berkualitas seperti keranjang, besek, tampah, tikar, dan aneka kerajinan dekoratif modern. Produk-produk ini dipasarkan ke pasar lokal, kota-kota besar di Jawa, hingga diekspor ke beberapa negara ASEAN. Pelatihan anyaman secara rutin diselenggarakan untuk regenerasi pengrajin muda berbakat.'
  ),
  (
    'Wisata Alam Bukit Hijau',
    'wisata-alam-bukit-hijau',
    'Wisata',
    'Destinasi wisata alam dengan panorama perbukitan hijau dan udara sejuk yang memukau.',
    'Bukit Hijau adalah destinasi wisata alam unggulan Desa Katekan yang menawarkan panorama indah perbukitan hijau dan lembah asri. Pengunjung dapat menikmati sunrise dan sunset yang memukau, trekking di jalur alam yang tertata, serta berfoto di berbagai spot foto instagramable yang terus dikembangkan. Fasilitas lengkap tersedia: area parkir luas, warung makan dengan menu lokal, toilet bersih, mushola, dan gazebo teduh. Tiket masuk sangat terjangkau, cocok untuk wisata keluarga, komunitas, dan edukasi alam.'
  ),
  (
    'Budidaya Ikan Lele Kolam Terpal',
    'budidaya-ikan-lele',
    'Perikanan',
    'Usaha budidaya ikan lele kolam terpal yang berkembang pesat dan menjadi sumber penghasilan tambahan warga.',
    'Budidaya ikan lele dengan sistem kolam terpal menjadi salah satu usaha ekonomi produktif yang berkembang pesat di Desa Katekan. Saat ini terdapat sekitar 30 unit kolam budidaya yang tersebar di berbagai dusun. Produksi rata-rata mencapai 2 ton per bulan, yang dipasarkan ke pasar tradisional lokal dan mitra pengepul. Kelompok Budidaya Ikan "Katekan Makmur" aktif membimbing anggota dalam teknik budidaya modern, manajemen pakan efisien, dan pemanfaatan limbah kolam sebagai pupuk organik.'
  ),
  (
    'Tradisi Sedekah Bumi',
    'tradisi-sedekah-bumi',
    'Budaya',
    'Tradisi Sedekah Bumi tahunan sebagai ungkapan syukur atas berkah hasil bumi yang melimpah.',
    'Sedekah Bumi adalah tradisi tahunan yang secara turun-temurun diselenggarakan oleh warga Desa Katekan sebagai bentuk rasa syukur kepada Tuhan Yang Maha Esa atas berkah hasil bumi yang melimpah. Acara ini biasanya diselenggarakan setelah musim panen raya, dihadiri oleh seluruh warga desa dan tamu undangan. Rangkaian acara meliputi doa bersama lintas agama, kenduri rakyat, pertunjukan wayang kulit semalam suntuk, kirab budaya, dan pameran produk lokal. Tradisi ini menjadi daya tarik wisata budaya yang semakin dikenal oleh wisatawan dari luar daerah.'
  )
ON CONFLICT DO NOTHING;

-- ── Galeri ──────────────────────────────────────────────────
INSERT INTO galeri (judul, keterangan, foto) VALUES
  ('Hamparan Sawah Desa',        'Pemandangan indah hamparan sawah menghijau di musim tanam',       'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'),
  ('Kerajinan Anyaman Bambu',    'Pengrajin anyaman bambu sedang mengerjakan pesanan',               'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'),
  ('Gotong Royong Warga',        'Warga bergotong royong memperbaiki jalan desa',                   'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'),
  ('Festival Budaya Desa',       'Penampilan seni budaya pada festival tahunan desa',               'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80'),
  ('Pemandangan Bukit',          'Panorama bukit hijau dari ketinggian saat pagi hari',             'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'),
  ('Budidaya Ikan Lele',         'Kolam budidaya ikan lele milik warga Dusun Makmur',              'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80'),
  ('Produk UMKM Lokal',          'Berbagai produk UMKM unggulan Desa Katekan siap dipasarkan',     'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'),
  ('Sedekah Bumi',               'Prosesi kirab budaya dalam rangkaian Sedekah Bumi',               'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800&q=80')
ON CONFLICT DO NOTHING;

-- ── CATATAN ──────────────────────────────────────────────────
-- Untuk membuat akun admin pertama, jalankan:
--   npm run create-admin
-- ─────────────────────────────────────────────────────────────
