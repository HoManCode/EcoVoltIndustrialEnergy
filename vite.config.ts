import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
