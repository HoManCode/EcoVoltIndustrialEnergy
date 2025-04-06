import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/readings': {
        target: 'http://localhost:8080', // your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
