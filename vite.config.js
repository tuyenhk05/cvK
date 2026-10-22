import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets work on GitHub Pages (e.g. username.github.io/repo-name/)
  server: {
    port: 5173,
    open: true
  }
})
