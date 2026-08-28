const express          = require('express');
const router           = express.Router();
const upload           = require('../middleware/upload');
const { isAuthenticated, isGuest } = require('../middleware/auth');
const authCtrl         = require('../controllers/authController');
const profilCtrl       = require('../controllers/profilController');
const perangkatCtrl    = require('../controllers/perangkatController');
const potensiCtrl      = require('../controllers/potensiController');
const galeriCtrl       = require('../controllers/galeriController');
const db               = require('../services/supabaseService');

// ── Auth ──────────────────────────────────────────────────────
router.get('/login',  isGuest, authCtrl.loginPage);
router.post('/login', isGuest, authCtrl.login);
router.post('/logout',         authCtrl.logout);

// ── Protected ─────────────────────────────────────────────────
router.use(isAuthenticated);

// Dashboard
router.get('/', (req, res) => res.redirect('/admin/dashboard'));
router.get('/dashboard', async (req, res, next) => {
  try {
    const [stats, recentGaleri] = await Promise.all([
      db.getStats(),
      db.getGaleri(5),
    ]);
    res.render('admin/dashboard', { title: 'Dashboard', stats, recentGaleri });
  } catch (err) { next(err); }
});

// ── Profil Desa ───────────────────────────────────────────────
router.get('/profil',           profilCtrl.index);
router.post('/profil',          upload.fields([
  { name: 'foto_kantor', maxCount: 1 },
  { name: 'video_file',  maxCount: 1 }
]), profilCtrl.update);

// ── Perangkat Desa ────────────────────────────────────────────
router.get('/perangkat',              perangkatCtrl.index);
router.get('/perangkat/create',       perangkatCtrl.createPage);
router.post('/perangkat',             upload.single('foto'), perangkatCtrl.create);
router.get('/perangkat/:id/edit',     perangkatCtrl.editPage);
router.post('/perangkat/:id',         upload.single('foto'), perangkatCtrl.update);
router.post('/perangkat/:id/delete',  perangkatCtrl.delete);

// ── Potensi ───────────────────────────────────────────────────
router.get('/potensi',              potensiCtrl.index);
router.get('/potensi/create',       potensiCtrl.createPage);
router.post('/potensi',             upload.single('foto'), potensiCtrl.create);
router.get('/potensi/:id/edit',     potensiCtrl.editPage);
router.post('/potensi/:id',         upload.single('foto'), potensiCtrl.update);
router.post('/potensi/:id/delete',  potensiCtrl.delete);

// ── Galeri ────────────────────────────────────────────────────
router.get('/galeri',              galeriCtrl.index);
router.get('/galeri/create',       galeriCtrl.createPage);
router.post('/galeri',             upload.single('foto'), galeriCtrl.create);
router.get('/galeri/:id/edit',     galeriCtrl.editPage);
router.post('/galeri/:id',         upload.single('foto'), galeriCtrl.update);
router.post('/galeri/:id/delete',  galeriCtrl.delete);

module.exports = router;
