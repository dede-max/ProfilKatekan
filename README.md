# 🌿 Web Desa Katekan

Website resmi Desa Katekan, Kecamatan Ngadirojo, Kabupaten Wonogiri, Jawa Tengah.

**Stack**: Node.js · Express.js · EJS · Tailwind CSS · Vite · Supabase PostgreSQL · Supabase Storage

---

## 🚀 Setup Cepat

### 1. Clone & Install
```bash
cd ProfilKatekan
npm install
```

### 2. Konfigurasi Environment
```bash
# Salin template environment
copy .env.example .env
```

Isi file `.env` dengan kredensial Supabase Anda:
```env
PORT=3000
SESSION_SECRET=ganti-dengan-string-acak-panjang

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...
SUPABASE_STORAGE_BUCKET=desa-katekan
```

> **Dapatkan kredensial**: [app.supabase.com](https://app.supabase.com) → Project → Settings → API

### 3. Setup Database Supabase

Di **Supabase SQL Editor**, jalankan secara berurutan:

```
1. database/schema.sql   — Membuat semua tabel
2. database/seed.sql     — Mengisi data awal
```

### 4. Buat Bucket Storage

Di **Supabase Storage**:
1. Klik **New bucket**
2. Nama: `desa-katekan`
3. Centang **Public bucket**
4. Klik **Create bucket**

### 5. Buat Akun Admin Pertama
```bash
npm run create-admin
```
Ikuti instruksi di terminal (isi nama, email, dan password).

### 6. Build Assets & Jalankan
```bash
npm run dev
```

Buka: **http://localhost:3000**
Admin: **http://localhost:3000/admin/login**

---

## 📁 Struktur Proyek

```
ProfilKatekan/
├── src/
│   ├── config/          # Konfigurasi Supabase & session
│   ├── controllers/     # Logic tiap fitur
│   ├── middleware/      # Auth & upload middleware
│   ├── routes/          # Routing publik & admin
│   ├── services/        # Database & storage service
│   └── views/           # Template EJS
│       ├── layouts/     # Layout utama & admin
│       ├── partials/    # Navbar, footer, flash
│       ├── pages/       # Halaman publik
│       └── admin/       # Halaman admin
├── public/dist/         # Compiled CSS & JS (auto-generated)
├── database/
│   ├── schema.sql       # DDL semua tabel
│   └── seed.sql         # Data awal
├── scripts/
│   └── create-admin.js  # Setup akun admin
├── app.js               # Express app
├── server.js            # Entry point
├── vite.config.js
└── tailwind.config.js
```

---

## 🎯 Fitur

### Halaman Publik
| Halaman | URL | Deskripsi |
|---------|-----|-----------|
| Beranda | `/` | Hero, statistik, profil, potensi, perangkat, galeri |
| Profil Desa | `/profil` | Sejarah, visi-misi, info desa, perangkat |
| Potensi Desa | `/potensi` | Daftar potensi dengan filter kategori |
| Detail Potensi | `/potensi/:slug` | Halaman detail + potensi terkait |
| Galeri Foto | `/galeri` | Grid foto dengan lightbox (GLightbox) |

### Panel Admin (`/admin`)
| Modul | Fitur |
|-------|-------|
| Login/Logout | Session-based authentication |
| Dashboard | Statistik + aksi cepat |
| Profil Desa | Edit semua info desa + upload foto kantor |
| Perangkat Desa | CRUD + upload foto |
| Potensi | CRUD + upload foto + slug otomatis |
| Galeri | Upload/edit/hapus foto |

---

## 🔧 NPM Scripts

| Perintah | Keterangan |
|----------|------------|
| `npm run dev` | Server + Vite watch (development) |
| `npm run build` | Build assets untuk production |
| `npm start` | Jalankan server (production) |
| `npm run create-admin` | Buat akun admin baru |

---

## 📸 Upload Gambar

- Semua gambar disimpan di **Supabase Storage** (bucket `desa-katekan`)
- Folder: `galeri/`, `perangkat/`, `potensi/`, `profil/`
- Format didukung: **JPEG, PNG, WebP**
- Ukuran maksimum: **5 MB**
- File lama otomatis dihapus saat diganti/dihapus

---

## 🔐 Keamanan

- Password admin di-hash dengan **bcrypt** (salt rounds: 12)
- Session menggunakan **express-session** + MemoryStore
- Upload divalidasi tipe file dan ukuran via **Multer**
- Admin routes dilindungi middleware `isAuthenticated`
- Supabase akses via **Service Role Key** (server-side only)

---

## 🌐 Deployment

Untuk production, pastikan:
1. Set `NODE_ENV=production` di environment
2. Jalankan `npm run build` untuk compile assets
3. Set `SESSION_SECRET` dengan string acak yang kuat
4. Gunakan process manager seperti **PM2**: `pm2 start server.js`

---

© 2024 Desa Katekan, Kecamatan Ngadirojo, Kabupaten Wonogiri, Jawa Tengah
