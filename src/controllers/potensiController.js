const db      = require('../services/supabaseService');
const storage = require('../services/storageService');

const KATEGORI_LIST = ['Pertanian', 'Perikanan', 'UMKM', 'Wisata', 'Budaya', 'Lainnya'];

const toSlug = (str) =>
  str.toLowerCase().trim()
     .replace(/[^a-z0-9\s-]/g, '')
     .replace(/\s+/g, '-')
     .replace(/-+/g, '-');

exports.index = async (req, res, next) => {
  try {
    const potensi = await db.getPotensi();
    res.render('admin/potensi/index', { title: 'Potensi Dusun', potensi });
  } catch (err) { next(err); }
};

exports.createPage = (req, res) => {
  res.render('admin/potensi/create', { title: 'Tambah Potensi', kategoriList: KATEGORI_LIST });
};

exports.create = async (req, res) => {
  try {
    const { judul, kategori, deskripsi_singkat, deskripsi } = req.body;
    if (!judul) { req.flash('error', 'Judul wajib diisi.'); return res.redirect('/admin/potensi/create'); }

    let foto = null;
    if (req.file) foto = await storage.uploadImage(req.file.buffer, 'potensi', req.file.originalname);

    const slug = toSlug(judul) + '-' + Date.now().toString(36);
    await db.createPotensi({ judul, slug, kategori, deskripsi_singkat, deskripsi, foto });

    req.flash('success', 'Potensi berhasil ditambahkan.');
    res.redirect('/admin/potensi');
  } catch (err) {
    console.error('[Potensi]', err.message);
    req.flash('error', 'Gagal menambahkan: ' + err.message);
    res.redirect('/admin/potensi/create');
  }
};

exports.editPage = async (req, res, next) => {
  try {
    const potensi = await db.getPotensiById(req.params.id);
    if (!potensi) { req.flash('error', 'Data tidak ditemukan.'); return res.redirect('/admin/potensi'); }
    res.render('admin/potensi/edit', { title: 'Edit Potensi', potensi, kategoriList: KATEGORI_LIST });
  } catch (err) { next(err); }
};

exports.update = async (req, res) => {
  try {
    const { judul, kategori, deskripsi_singkat, deskripsi } = req.body;
    const existing = await db.getPotensiById(req.params.id);
    if (!existing) { req.flash('error', 'Data tidak ditemukan.'); return res.redirect('/admin/potensi'); }

    let foto = existing.foto;
    if (req.file) {
      if (foto) await storage.deleteImage(foto);
      foto = await storage.uploadImage(req.file.buffer, 'potensi', req.file.originalname);
    }

    const slug = toSlug(judul);
    await db.updatePotensi(req.params.id, {
      judul, slug, kategori, deskripsi_singkat, deskripsi, foto,
      updated_at: new Date().toISOString(),
    });

    req.flash('success', 'Potensi berhasil diperbarui.');
    res.redirect('/admin/potensi');
  } catch (err) {
    console.error('[Potensi]', err.message);
    req.flash('error', 'Gagal memperbarui: ' + err.message);
    res.redirect(`/admin/potensi/${req.params.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    const existing = await db.getPotensiById(req.params.id);
    if (existing?.foto) await storage.deleteImage(existing.foto);
    await db.deletePotensi(req.params.id);
    req.flash('success', 'Potensi berhasil dihapus.');
  } catch (err) {
    req.flash('error', 'Gagal menghapus: ' + err.message);
  }
  res.redirect('/admin/potensi');
};
