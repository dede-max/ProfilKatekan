const db      = require('../services/supabaseService');
const storage = require('../services/storageService');

exports.index = async (req, res, next) => {
  try {
    const perangkat = await db.getPerangkatDesa();
    res.render('admin/perangkat/index', { title: 'Perangkat Dusun', perangkat });
  } catch (err) { next(err); }
};

exports.createPage = (req, res) => {
  res.render('admin/perangkat/create', { title: 'Tambah Perangkat Dusun' });
};

exports.create = async (req, res) => {
  try {
    const { nama, jabatan, urutan } = req.body;
    if (!nama || !jabatan) {
      req.flash('error', 'Nama dan jabatan wajib diisi.');
      return res.redirect('/admin/perangkat/create');
    }

    let foto = null;
    if (req.file) foto = await storage.uploadImage(req.file.buffer, 'perangkat', req.file.originalname);

    await db.createPerangkat({ nama, jabatan, urutan: parseInt(urutan) || 99, foto });
    req.flash('success', 'Perangkat dusun berhasil ditambahkan.');
    res.redirect('/admin/perangkat');
  } catch (err) {
    console.error('[Perangkat]', err.message);
    req.flash('error', 'Gagal menambahkan: ' + err.message);
    res.redirect('/admin/perangkat/create');
  }
};

exports.editPage = async (req, res, next) => {
  try {
    const perangkat = await db.getPerangkatById(req.params.id);
    if (!perangkat) { req.flash('error', 'Data tidak ditemukan.'); return res.redirect('/admin/perangkat'); }
    res.render('admin/perangkat/edit', { title: 'Edit Perangkat', perangkat });
  } catch (err) { next(err); }
};

exports.update = async (req, res) => {
  try {
    const { nama, jabatan, urutan } = req.body;
    const existing = await db.getPerangkatById(req.params.id);
    if (!existing) { req.flash('error', 'Data tidak ditemukan.'); return res.redirect('/admin/perangkat'); }

    let foto = existing.foto;
    if (req.file) {
      if (foto) await storage.deleteImage(foto);
      foto = await storage.uploadImage(req.file.buffer, 'perangkat', req.file.originalname);
    }

    await db.updatePerangkat(req.params.id, {
      nama, jabatan, urutan: parseInt(urutan) || 99, foto,
      updated_at: new Date().toISOString(),
    });

    req.flash('success', 'Perangkat dusun berhasil diperbarui.');
    res.redirect('/admin/perangkat');
  } catch (err) {
    console.error('[Perangkat]', err.message);
    req.flash('error', 'Gagal memperbarui: ' + err.message);
    res.redirect(`/admin/perangkat/${req.params.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    const existing = await db.getPerangkatById(req.params.id);
    if (existing?.foto) await storage.deleteImage(existing.foto);
    await db.deletePerangkat(req.params.id);
    req.flash('success', 'Perangkat dusun berhasil dihapus.');
  } catch (err) {
    req.flash('error', 'Gagal menghapus: ' + err.message);
  }
  res.redirect('/admin/perangkat');
};
