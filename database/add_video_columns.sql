-- ============================================================
-- Tambah kolom video ke tabel profil_desa
-- Jalankan di Supabase SQL Editor
-- ============================================================

ALTER TABLE profil_desa
  ADD COLUMN IF NOT EXISTS video_url  TEXT,   -- YouTube link / URL video eksternal
  ADD COLUMN IF NOT EXISTS video_file TEXT;   -- URL video yang diupload ke Supabase Storage
