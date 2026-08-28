/**
 * Middleware autentikasi admin
 */

/** Tolak akses jika belum login → redirect ke halaman login */
const isAuthenticated = (req, res, next) => {
  if (req.session?.admin) return next();
  req.flash('error', 'Silakan login untuk mengakses halaman admin.');
  res.redirect('/admin/login');
};

/** Redirect ke dashboard jika sudah login (untuk halaman login) */
const isGuest = (req, res, next) => {
  if (req.session?.admin) return res.redirect('/admin/dashboard');
  next();
};

module.exports = { isAuthenticated, isGuest };
