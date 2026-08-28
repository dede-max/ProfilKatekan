const db      = require('../services/supabaseService');
const storage = require('../services/storageService');

exports.index = async (req, res, next) => {
  try {
    const galeri = await db.getGaleri();
    res.render('admin/galeri/index', { title: 'Galeri Foto', galeri });
  } catch (err) { next(err); }
};

exports.createPage = (req, res) => {
  res.render('admin/galeri/create', { title: 'Tambah Foto' });
};

exports.create = async (req, res) => {
  try {
    const { judul, keterangan } = req.body;
    if (!req.file) { req.flash('error', 'Foto harus diunggah.'); return res.redirect('/admin/galeri/create'); }

    const foto = await storage.uploadImage(req.file.buffer, 'galeri', req.file.originalname);
    await db.createGaleri({ judul, keterangan, foto });

    req.flash('success', 'Foto berhasil ditambahkan ke galeri.');
    res.redirect('/admin/galeri');
  } catch (err) {
    console.error('[Galeri]', err.message);
    req.flash('error', 'Gagal menambahkan: ' + err.message);
    res.redirect('/admin/galeri/create');
  }
};

exports.editPage = async (req, res, next) => {
  try {
    const galeri = await db.getGaleriById(req.params.id);
    if (!galeri) { req.flash('error', 'Data tidak ditemukan.'); return res.redirect('/admin/galeri'); }
    res.render('admin/galeri/edit', { title: 'Edit Foto', galeri });
  } catch (err) { next(err); }
};

exports.update = async (req, res) => {
  try {
    const { judul, keterangan } = req.body;
    const existing = await db.getGaleriById(req.params.id);
    if (!existing) { req.flash('error', 'Data tidak ditemukan.'); return res.redirect('/admin/galeri'); }

    let foto = existing.foto;
    if (req.file) {
      if (foto) await storage.deleteImage(foto);
      foto = await storage.uploadImage(req.file.buffer, 'galeri', req.file.originalname);
    }

    await db.updateGaleri(req.params.id, { judul, keterangan, foto, updated_at: new Date().toISOString() });

    req.flash('success', 'Foto berhasil diperbarui.');
    res.redirect('/admin/galeri');
  } catch (err) {
    console.error('[Galeri]', err.message);
    req.flash('error', 'Gagal memperbarui: ' + err.message);
    res.redirect(`/admin/galeri/${req.params.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    const existing = await db.getGaleriById(req.params.id);
    if (existing?.foto) await storage.deleteImage(existing.foto);
    await db.deleteGaleri(req.params.id);
    req.flash('success', 'Foto berhasil dihapus.');
  } catch (err) {
    req.flash('error', 'Gagal menghapus: ' + err.message);
  }
  res.redirect('/admin/galeri');
};
