import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  publicDir: false, // Express serves static files, not Vite
  build: {
    outDir: 'public/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/assets/main.js'),
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) return 'main.css';
          return '[name][extname]';
        },
      },
    },
  },
});
