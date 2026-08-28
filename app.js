const express    = require('express');
const path       = require('path');
const ejsMate    = require('ejs-mate');
const session    = require('express-session');
const MemStore   = require('memorystore')(session);
const flash      = require('connect-flash');

const publicRoutes = require('./src/routes/index');
const adminRoutes  = require('./src/routes/admin');

const app = express();

// ── View Engine ──────────────────────────────────────────
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// ── Static Files ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'public/dist')));

// ── Body Parsing ─────────────────────────────────────────
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// ── Session ───────────────────────────────────────────────
app.use(session({
  secret:            process.env.SESSION_SECRET || 'katekan-dev-secret',
  resave:            false,
  saveUninitialized: false,
  cookie:            { maxAge: 86_400_000, httpOnly: true }, // 24 jam
  store: new MemStore({ checkPeriod: 86_400_000 }),
}));

// ── Flash Messages ────────────────────────────────────────
app.use(flash());

// ── Global Template Locals ────────────────────────────────
app.use((req, res, next) => {
  res.locals.success      = req.flash('success');
  res.locals.error        = req.flash('error');
  res.locals.currentUser  = req.session.admin || null;
  res.locals.currentPath  = req.path;
  next();
});

// ── Routes ────────────────────────────────────────────────
app.use('/',       publicRoutes);
app.use('/admin',  adminRoutes);

// ── 404 ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Halaman Tidak Ditemukan' });
});

// ── Error Handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).render('pages/500', { title: 'Server Error', message: err.message });
});

module.exports = app;
