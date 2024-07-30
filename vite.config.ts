import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    open: true,
    proxy: {
      'apt/v1/api': {
        target: 'http://198.7.119.145:9080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1\/api/, 'apt/v1/api'),
      }
    }
  },
});
