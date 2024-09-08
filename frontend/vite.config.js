// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/projects': {
        target: 'http://localhost:5000',  // バックエンドのポート
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
