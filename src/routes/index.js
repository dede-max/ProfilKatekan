const express        = require('express');
const router         = express.Router();
const publicCtrl     = require('../controllers/publicController');

router.get('/',              publicCtrl.beranda);
router.get('/profil',        publicCtrl.profil);
router.get('/potensi',       publicCtrl.potensiList);
router.get('/potensi/:slug', publicCtrl.potensiDetail);
router.get('/galeri',        publicCtrl.galeri);

module.exports = router;
