import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'lib',
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
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
