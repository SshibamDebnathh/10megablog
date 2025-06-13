import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          preloadImage: 'https://fra.cloud.appwrite.io/v1/storage/buckets/678e4c8b00093a8f7ed9/files/680f391d00364f0cd0e8/view?project=678e49de000b4ff55106&project=678e49de000b4ff55106', // ✅ actual image path
        },
      },
    }),
    viteCompression({ algorithm: 'brotliCompress' }),
    visualizer({ open: false }),
  ],
  build: {
    sourcemap: true,
    minify: 'terser',
  },
});
