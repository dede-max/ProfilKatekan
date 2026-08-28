const { supabaseAdmin } = require('../config/supabase');

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'desa-katekan';

/**
 * Upload file (gambar / video) ke Supabase Storage
 * @param {Buffer} buffer - Buffer file dari Multer
 * @param {string} folder - Sub-folder: 'galeri' | 'perangkat' | 'potensi' | 'profil' | 'video'
 * @param {string} originalname - Nama file asli (untuk ekstensi)
 * @returns {Promise<string>} Public URL file
 */
const uploadMedia = async (buffer, folder, originalname) => {
  const ext = originalname.split('.').pop().toLowerCase();
  const safeName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  
  let mimeType = 'application/octet-stream';
  if (['jpg', 'jpeg'].includes(ext)) mimeType = 'image/jpeg';
  else if (ext === 'png') mimeType = 'image/png';
  else if (ext === 'webp') mimeType = 'image/webp';
  else if (ext === 'mp4') mimeType = 'video/mp4';
  else if (ext === 'webm') mimeType = 'video/webm';
  else if (ext === 'mov') mimeType = 'video/quicktime';
  else if (ext === 'mkv') mimeType = 'video/x-matroska';

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(safeName, buffer, { contentType: mimeType, upsert: false });

  if (error) throw new Error(`Upload gagal: ${error.message}`);

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(safeName);
  return data.publicUrl;
};

// Alias untuk backward compatibility
const uploadImage = uploadMedia;

/**
 * Hapus file dari Supabase Storage berdasarkan public URL
 * @param {string} url - Public URL file
 */
const deleteImage = async (url) => {
  if (!url) return;
  try {
    const marker = `/storage/v1/object/public/${BUCKET}/`;
    const idx    = url.indexOf(marker);
    if (idx === -1) return;

    const filePath = decodeURIComponent(url.slice(idx + marker.length));
    const { error } = await supabaseAdmin.storage.from(BUCKET).remove([filePath]);
    if (error) console.warn('[Storage] Gagal hapus file:', error.message);
  } catch (e) {
    console.warn('[Storage] Error hapus file:', e.message);
  }
};

const deleteMedia = deleteImage;

module.exports = { uploadImage, uploadMedia, deleteImage, deleteMedia };
