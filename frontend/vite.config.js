import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),],
  server: {
    proxy: {
      '/auth': {
        target: 'https://task-backend-h6qy.onrender.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
