import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/layr-room-card.ts'),
      name: 'LayrCards',
      formats: ['es'],
      fileName: () => 'layr.js',
    },
    rollupOptions: {
      // Bundle everything (including lit + custom-card-helpers) into a single file
      external: [],
      output: {
        inlineDynamicImports: true,
      },
    },
    target: 'es2022',
    outDir: 'dist',
    emptyOutDir: true,
    minify: mode === 'production' ? 'esbuild' : false,
    sourcemap: true,
    cssCodeSplit: false,
  },
  esbuild: {
    target: 'es2022',
    // Strip console.info calls from production builds (the boot banner stays via direct console call)
    drop: mode === 'production' ? [] : [],
    legalComments: 'none',
  },
}));
