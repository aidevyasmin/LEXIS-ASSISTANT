import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      '/api': {
        target: '/api',
        changeOrigin: true,
      },
      '/auth': {
        target: '/api',
        changeOrigin: true,
      },
      '/uploads': {
        target: '/api',
        changeOrigin: true,
      }
    }
  }
})
