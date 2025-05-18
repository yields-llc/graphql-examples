import { defineConfig } from 'vite'
import * as path from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      name: '@app/graphql-client',
      formats: ['es'],
      fileName: (_format) => 'main.mjs',
    },
    rollupOptions: {
      external: ['node:path', 'node:fs'],
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  plugins: [dts({ exclude: ['src/client.ts'] })],
})
