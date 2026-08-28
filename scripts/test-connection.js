require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
const bucketName  = process.env.SUPABASE_STORAGE_BUCKET || 'desa-katekan';

async function testConnection() {
  console.log('\n======================================================');
  console.log('🔍 CEK KONEKSI SUPABASE — WEB DUSUN KATEKAN');
  console.log('======================================================\n');

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ URL atau KEY Supabase belum diset di .env!');
    console.log('   Pastikan SUPABASE_URL dan API key sudah terisi.\n');
    process.exit(1);
  }

  console.log(`📡 URL Supabase : ${supabaseUrl}`);
  console.log(`🔑 Key Terdeteksi: ${supabaseKey.substring(0, 15)}...`);
  console.log(`🪣 Target Bucket : ${bucketName}\n`);

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Cek Tabel Database
  console.log('--- [1] Memeriksa Tabel Database ---');
  const tables = ['profil_desa', 'perangkat_desa', 'potensi', 'galeri', 'admin_users'];
  let allTablesOk = true;

  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        allTablesOk = false;
        console.log(`❌ Tabel '${table}': GAGAL (${error.message})`);
      } else {
        console.log(`✅ Tabel '${table}': TERHUBUNG (${count ?? 0} data)`);
      }
    } catch (e) {
      allTablesOk = false;
      console.log(`❌ Tabel '${table}': ERROR (${e.message})`);
    }
  }

  // 2. Cek Supabase Storage Bucket
  console.log('\n--- [2] Memeriksa Storage Bucket ---');
  try {
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      console.log(`⚠️ Tidak dapat membaca daftar bucket: ${bucketError.message}`);
    } else {
      const found = buckets.find(b => b.name === bucketName);
      if (found) {
        console.log(`✅ Storage Bucket '${bucketName}': DITEMUKAN (Public: ${found.public ? 'Ya' : 'Tidak'})`);
      } else {
        console.log(`⚠️ Storage Bucket '${bucketName}': BELUM DIBUAT di menu Storage Supabase.`);
        console.log(`   Daftar bucket yang ada: ${buckets.map(b => b.name).join(', ') || 'Belum ada bucket'}`);
      }
    }
  } catch (e) {
    console.log(`⚠️ Cek storage error: ${e.message}`);
  }

  console.log('\n======================================================');
  if (allTablesOk) {
    console.log('🎉 STATUS: SUDAH TERHUBUNG KE SUPABASE DENGAN BAIK!');
    console.log('   Anda bisa langsung menjalankan:');
    console.log('   👉 npm run create-admin   (untuk buat akun admin)');
    console.log('   👉 npm run dev            (untuk menjalankan web)');
  } else {
    console.log('⚠️ STATUS: KONEKSI BERHASIL TETAPI TABEL BELUM LENGKAP.');
    console.log('   Silakan buka Supabase SQL Editor dan jalankan:');
    console.log('   1. database/schema.sql');
    console.log('   2. database/seed.sql');
  }
  console.log('======================================================\n');
}

testConnection();
