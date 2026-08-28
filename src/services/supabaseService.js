/**
 * Supabase database service — semua query terpusat di sini
 */
const { supabaseAdmin: db } = require('../config/supabase');

// ═══════════════════════════════════════════════
// PROFIL DESA
// ═══════════════════════════════════════════════
const getProfilDesa = async () => {
  const { data } = await db.from('profil_desa').select('*').single();
  return data || null;
};

const upsertProfilDesa = async (payload) => {
  const { data: existing } = await db.from('profil_desa').select('id').single();

  if (existing) {
    const { data, error } = await db
      .from('profil_desa').update(payload).eq('id', existing.id).select().single();
    if (error) throw error;
    return data;
  }

  const { data, error } = await db
    .from('profil_desa').insert(payload).select().single();
  if (error) throw error;
  return data;
};

// ═══════════════════════════════════════════════
// PERANGKAT DESA
// ═══════════════════════════════════════════════
const getPerangkatDesa = async () => {
  const { data, error } = await db
    .from('perangkat_desa').select('*').order('urutan', { ascending: true });
  if (error) return [];
  return data;
};

const getPerangkatById = async (id) => {
  const { data } = await db.from('perangkat_desa').select('*').eq('id', id).single();
  return data || null;
};

const createPerangkat = async (payload) => {
  const { data, error } = await db.from('perangkat_desa').insert(payload).select().single();
  if (error) throw error;
  return data;
};

const updatePerangkat = async (id, payload) => {
  const { data, error } = await db
    .from('perangkat_desa').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

const deletePerangkat = async (id) => {
  const { error } = await db.from('perangkat_desa').delete().eq('id', id);
  if (error) throw error;
};

// ═══════════════════════════════════════════════
// POTENSI
// ═══════════════════════════════════════════════
const getPotensi = async (kategori = null) => {
  let q = db.from('potensi').select('*').order('created_at', { ascending: false });
  if (kategori) q = q.eq('kategori', kategori);
  const { data, error } = await q;
  if (error) return [];
  return data;
};

const getPotensiById = async (id) => {
  const { data } = await db.from('potensi').select('*').eq('id', id).single();
  return data || null;
};

const getPotensiBySlug = async (slug) => {
  const { data } = await db.from('potensi').select('*').eq('slug', slug).single();
  return data || null;
};

const createPotensi = async (payload) => {
  const { data, error } = await db.from('potensi').insert(payload).select().single();
  if (error) throw error;
  return data;
};

const updatePotensi = async (id, payload) => {
  const { data, error } = await db
    .from('potensi').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

const deletePotensi = async (id) => {
  const { error } = await db.from('potensi').delete().eq('id', id);
  if (error) throw error;
};

// ═══════════════════════════════════════════════
// GALERI
// ═══════════════════════════════════════════════
const getGaleri = async (limit = null) => {
  let q = db.from('galeri').select('*').order('created_at', { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error) return [];
  return data;
};

const getGaleriById = async (id) => {
  const { data } = await db.from('galeri').select('*').eq('id', id).single();
  return data || null;
};

const createGaleri = async (payload) => {
  const { data, error } = await db.from('galeri').insert(payload).select().single();
  if (error) throw error;
  return data;
};

const updateGaleri = async (id, payload) => {
  const { data, error } = await db
    .from('galeri').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

const deleteGaleri = async (id) => {
  const { error } = await db.from('galeri').delete().eq('id', id);
  if (error) throw error;
};

// ═══════════════════════════════════════════════
// ADMIN USERS
// ═══════════════════════════════════════════════
const getAdminByEmail = async (email) => {
  const { data } = await db
    .from('admin_users').select('*').eq('email', email).single();
  return data || null;
};

// ═══════════════════════════════════════════════
// STATS (untuk dashboard)
// ═══════════════════════════════════════════════
const getStats = async () => {
  const [r1, r2, r3] = await Promise.all([
    db.from('perangkat_desa').select('id', { count: 'exact', head: true }),
    db.from('potensi').select('id',        { count: 'exact', head: true }),
    db.from('galeri').select('id',         { count: 'exact', head: true }),
  ]);
  return {
    perangkat: r1.count ?? 0,
    potensi:   r2.count ?? 0,
    galeri:    r3.count ?? 0,
  };
};

module.exports = {
  getProfilDesa, upsertProfilDesa,
  getPerangkatDesa, getPerangkatById, createPerangkat, updatePerangkat, deletePerangkat,
  getPotensi, getPotensiById, getPotensiBySlug, createPotensi, updatePotensi, deletePotensi,
  getGaleri, getGaleriById, createGaleri, updateGaleri, deleteGaleri,
  getAdminByEmail,
  getStats,
};
