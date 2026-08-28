const db = require('../services/supabaseService');

/**
 * Konversi URL YouTube / video streaming menjadi embed URL yang aman untuk iframe
 */
const formatVideoEmbedUrl = (url) => {
  if (!url) return null;
  const str = url.trim();

  // YouTube standard / short / embed
  const ytMatch = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
  }

  // Vimeo
  const vimeoMatch = str.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return str;
};

exports.beranda = async (req, res, next) => {
  try {
    const [profil, perangkat, potensi, galeri] = await Promise.all([
      db.getProfilDesa(),
      db.getPerangkatDesa(),
      db.getPotensi(),
      db.getGaleri(8),
    ]);

    if (profil) {
      profil.video_embed_url = formatVideoEmbedUrl(profil.video_url);
    }

    res.render('pages/index', {
      title: 'Beranda',
      description: 'Website resmi Dusun Katekan, Kecamatan Gantiwarno, Kabupaten Klaten. Informasi profil, potensi, dan galeri dusun.',
      profil,
      perangkat: perangkat.slice(0, 8),
      potensiList: potensi.slice(0, 6),
      galeriList: galeri.slice(0, 8),
    });
  } catch (err) { next(err); }
};

exports.profil = async (req, res, next) => {
  try {
    const [profil, perangkat] = await Promise.all([
      db.getProfilDesa(),
      db.getPerangkatDesa(),
    ]);

    res.render('pages/profil', {
      title: 'Profil Dusun',
      description: 'Sejarah, visi misi, dan struktur pemerintahan Dusun Katekan.',
      profil,
      perangkat,
    });
  } catch (err) { next(err); }
};

exports.potensiList = async (req, res, next) => {
  try {
    const { kategori } = req.query;
    const [potensi, allPotensi] = await Promise.all([
      db.getPotensi(kategori || null),
      db.getPotensi(),
    ]);

    const kategoriList = [...new Set(allPotensi.map(p => p.kategori).filter(Boolean))];

    res.render('pages/potensi', {
      title: 'Potensi Dusun',
      description: 'Potensi unggulan Dusun Katekan meliputi pertanian, UMKM, wisata, perikanan, dan budaya.',
      potensi,
      kategoriList,
      activeKategori: kategori || null,
    });
  } catch (err) { next(err); }
};

exports.potensiDetail = async (req, res, next) => {
  try {
    const potensi = await db.getPotensiBySlug(req.params.slug);
    if (!potensi) return res.status(404).render('pages/404', { title: 'Tidak Ditemukan' });

    const related = (await db.getPotensi(potensi.kategori))
      .filter(p => p.id !== potensi.id)
      .slice(0, 3);

    res.render('pages/potensi-detail', {
      title: potensi.judul,
      description: potensi.deskripsi_singkat || potensi.judul,
      potensi,
      related,
    });
  } catch (err) { next(err); }
};

exports.galeri = async (req, res, next) => {
  try {
    const galeri = await db.getGaleri();
    res.render('pages/galeri', {
      title: 'Galeri Foto',
      description: 'Kumpulan foto kegiatan, pemandangan, dan kehidupan Dusun Katekan.',
      galeri,
    });
  } catch (err) { next(err); }
};
