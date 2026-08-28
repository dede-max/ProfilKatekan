const db      = require('../services/supabaseService');
const storage = require('../services/storageService');

exports.index = async (req, res, next) => {
  try {
    const profil = await db.getProfilDesa();
    res.render('admin/profil/index', { title: 'Profil Dusun', profil });
  } catch (err) { next(err); }
};

exports.update = async (req, res) => {
  try {
    const {
      nama_desa, kecamatan, kabupaten, provinsi, kode_pos,
      sejarah, visi, misi, alamat_kantor, telepon, email_desa,
      luas_wilayah, jumlah_penduduk, jumlah_kk,
      video_url, hapus_video_file, hapus_video_url
    } = req.body;

    const existing   = await db.getProfilDesa();
    let foto_kantor  = existing?.foto_kantor || null;
    let video_file   = existing?.video_file || null;
    let final_video_url = (video_url !== undefined) ? (video_url.trim() || null) : (existing?.video_url || null);

    // Hapus video URL jika diminta
    if (hapus_video_url === '1') {
      final_video_url = null;
    }

    // Handle foto_kantor
    const fotoFile = req.files?.['foto_kantor']?.[0];
    if (fotoFile) {
      if (foto_kantor) await storage.deleteMedia(foto_kantor);
      foto_kantor = await storage.uploadMedia(fotoFile.buffer, 'profil', fotoFile.originalname);
    }

    // Hapus file video lama jika diminta atau diganti
    if (hapus_video_file === '1' && video_file) {
      await storage.deleteMedia(video_file);
      video_file = null;
    }

    // Handle upload video_file
    const vidFile = req.files?.['video_file']?.[0];
    if (vidFile) {
      if (video_file) await storage.deleteMedia(video_file);
      video_file = await storage.uploadMedia(vidFile.buffer, 'video', vidFile.originalname);
    }

    await db.upsertProfilDesa({
      nama_desa, kecamatan, kabupaten, provinsi, kode_pos,
      sejarah, visi, misi, alamat_kantor, telepon, email_desa,
      luas_wilayah:     luas_wilayah     ? parseFloat(luas_wilayah)     : null,
      jumlah_penduduk:  jumlah_penduduk  ? parseInt(jumlah_penduduk)    : null,
      jumlah_kk:        jumlah_kk        ? parseInt(jumlah_kk)          : null,
      foto_kantor,
      video_url:        final_video_url,
      video_file,
      updated_at: new Date().toISOString(),
    });

    req.flash('success', 'Profil dan video dusun berhasil diperbarui.');
    res.redirect('/admin/profil');
  } catch (err) {
    console.error('[Profil]', err.message);
    req.flash('error', 'Gagal memperbarui profil: ' + err.message);
    res.redirect('/admin/profil');
  }
};
