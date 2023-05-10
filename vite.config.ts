import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'lib',
    lib: {
      entry: 'packages/index.ts',
      name: 'vue3-drag-resize-rotate',
      fileName: 'vue3-drag-resize-rotate',
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      input: 'packages/index.ts',
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
