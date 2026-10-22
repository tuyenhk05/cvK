import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets work on GitHub Pages
  build: {
    outDir: 'docs', // Output compiled build to docs/ for native GitHub Pages support
  },
  server: {
    port: 5173,
    open: true
  }
})
