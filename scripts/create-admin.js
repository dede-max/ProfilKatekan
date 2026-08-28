require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌  Isi SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY (atau SUPABASE_SECRET_KEY) di file .env terlebih dahulu.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

async function main() {
  console.log('\n🌿  Web Dusun Katekan — Setup Admin\n');

  const nama     = (await ask('  Nama lengkap admin : ')).trim();
  const email    = (await ask('  Email admin        : ')).trim().toLowerCase();
  const password = (await ask('  Password (min 8 karakter): ')).trim();

  if (!nama || !email || password.length < 8) {
    console.error('\n❌  Input tidak valid. Password minimal 8 karakter.\n');
    rl.close(); process.exit(1);
  }

  const password_hash = await bcrypt.hash(password, 12);

  const { data, error } = await supabase
    .from('admin_users')
    .insert({ nama, email, password_hash })
    .select()
    .single();

  if (error) {
    console.error('\n❌  Gagal membuat admin:', error.message, '\n');
  } else {
    console.log(`\n✅  Admin berhasil dibuat!`);
    console.log(`    Nama  : ${data.nama}`);
    console.log(`    Email : ${data.email}`);
    console.log(`    Login : http://localhost:3000/admin/login\n`);
  }

  rl.close();
}

main().catch(err => { console.error(err); rl.close(); });
