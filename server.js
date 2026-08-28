require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🌿 ================================`);
  console.log(`   Web Dusun Katekan`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   Admin: http://localhost:${PORT}/admin/login`);
  console.log(`   Mode : ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌿 ================================\n`);
});
