import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'SengenUI',
      formats: ['es', 'umd'],
      fileName: (format) => `sengen-ui.${format === 'umd' ? 'umd.js' : 'es.js'}`
    },
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    sourcemap: true,
    reportCompressedSize: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../..')
    }
  }
});
