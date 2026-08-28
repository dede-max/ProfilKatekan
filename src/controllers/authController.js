const bcrypt = require('bcryptjs');
const db     = require('../services/supabaseService');

exports.loginPage = (req, res) => {
  res.render('pages/auth/login', { title: 'Login Admin' });
};

exports.login = async (req, res) => {
  const email    = (req.body.email    || '').trim().toLowerCase();
  const password = (req.body.password || '').trim();

  if (!email || !password) {
    req.flash('error', 'Email dan password harus diisi.');
    return res.redirect('/admin/login');
  }

  try {
    const admin = await db.getAdminByEmail(email);
    if (!admin) {
      req.flash('error', 'Email atau password salah.');
      return res.redirect('/admin/login');
    }

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) {
      req.flash('error', 'Email atau password salah.');
      return res.redirect('/admin/login');
    }

    req.session.admin = { id: admin.id, email: admin.email, nama: admin.nama };
    req.flash('success', `Selamat datang, ${admin.nama}!`);
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('[Auth]', err.message);
    req.flash('error', 'Terjadi kesalahan. Coba lagi.');
    res.redirect('/admin/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
};
