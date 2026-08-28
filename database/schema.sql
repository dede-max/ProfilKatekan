-- ============================================================
-- Web Desa Katekan — Database Schema
-- Jalankan di Supabase SQL Editor
-- ============================================================

-- Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. Profil Desa (single-row)
-- ============================================================
CREATE TABLE IF NOT EXISTS profil_desa (
  id                UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama_desa         VARCHAR(100) NOT NULL DEFAULT 'Desa Katekan',
  kecamatan         VARCHAR(100),
  kabupaten         VARCHAR(100),
  provinsi          VARCHAR(100),
  kode_pos          VARCHAR(10),
  sejarah           TEXT,
  visi              TEXT,
  misi              TEXT,
  alamat_kantor     TEXT,
  telepon           VARCHAR(30),
  email_desa        VARCHAR(100),
  luas_wilayah      DECIMAL(10,2),
  jumlah_penduduk   INTEGER,
  jumlah_kk         INTEGER,
  foto_kantor       TEXT,
  video_url         TEXT,
  video_file        TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. Perangkat Desa
-- ============================================================
CREATE TABLE IF NOT EXISTS perangkat_desa (
  id          UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama        VARCHAR(100) NOT NULL,
  jabatan     VARCHAR(100) NOT NULL,
  foto        TEXT,
  urutan      INTEGER      DEFAULT 99,
  created_at  TIMESTAMPTZ  DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  DEFAULT NOW()
);

-- ============================================================
-- 3. Potensi Desa
-- ============================================================
CREATE TABLE IF NOT EXISTS potensi (
  id                UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  judul             VARCHAR(200) NOT NULL,
  slug              VARCHAR(200) UNIQUE NOT NULL,
  kategori          VARCHAR(50),
  deskripsi_singkat TEXT,
  deskripsi         TEXT,
  foto              TEXT,
  created_at        TIMESTAMPTZ  DEFAULT NOW(),
  updated_at        TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_potensi_slug     ON potensi(slug);
CREATE INDEX IF NOT EXISTS idx_potensi_kategori ON potensi(kategori);

-- ============================================================
-- 4. Galeri
-- ============================================================
CREATE TABLE IF NOT EXISTS galeri (
  id          UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  judul       VARCHAR(200),
  keterangan  TEXT,
  foto        TEXT         NOT NULL,
  created_at  TIMESTAMPTZ  DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  DEFAULT NOW()
);

-- ============================================================
-- 5. Admin Users
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id             UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama           VARCHAR(100) NOT NULL,
  email          VARCHAR(100) UNIQUE NOT NULL,
  password_hash  TEXT         NOT NULL,
  created_at     TIMESTAMPTZ  DEFAULT NOW(),
  updated_at     TIMESTAMPTZ  DEFAULT NOW()
);

-- ============================================================
-- Disable Row Level Security (akses via service role key)
-- ============================================================
ALTER TABLE profil_desa    DISABLE ROW LEVEL SECURITY;
ALTER TABLE perangkat_desa DISABLE ROW LEVEL SECURITY;
ALTER TABLE potensi        DISABLE ROW LEVEL SECURITY;
ALTER TABLE galeri         DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users    DISABLE ROW LEVEL SECURITY;
