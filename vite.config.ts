import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain elyrii.com is served from the site root, not /website/.
export default defineConfig(() => ({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
}));
