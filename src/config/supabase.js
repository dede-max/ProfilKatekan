const { createClient } = require('@supabase/supabase-js');

const supabaseUrl     = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
const supabaseSvcKey  = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌  SUPABASE_URL dan SUPABASE_ANON_KEY (atau SUPABASE_PUBLISHABLE_KEY) wajib diisi di .env');
  process.exit(1);
}

/** Client publik (operasi read-only / public) */
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Client admin — melewati RLS, digunakan di server saja */
const supabaseAdmin = createClient(supabaseUrl, supabaseSvcKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

module.exports = { supabase, supabaseAdmin };
