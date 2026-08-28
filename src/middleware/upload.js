const multer = require('multer');

const ALLOWED_TYPES = [
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
  'video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska', 'video/mpeg'
];
const MAX_SIZE_MB   = 50;

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype) || file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Format tidak didukung. Gunakan gambar (JPEG, PNG, WebP) atau video (MP4, WebM, MOV).'), false);
  }
};

const upload = multer({
  storage:    multer.memoryStorage(),   // simpan di memory → upload ke Supabase
  fileFilter,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
});

module.exports = upload;

