import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteCmsApi } from './scripts/vite-cms-api.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteCmsApi()],
  server: {
    proxy: {
      // Only forward API calls the local Vite CMS middleware does not handle.
      '/api/auth': 'http://localhost:5000',
      '/api/public/content': 'http://localhost:5000',
      '/api/public/settings': 'http://localhost:5000',
      '/api/public/staff': 'http://localhost:5000',
      '/api/public/contact': 'http://localhost:5000',
      '/api/admin/dashboard-stats': 'http://localhost:5000',
      '/api/health': 'http://localhost:5000',
    },
  },
})
