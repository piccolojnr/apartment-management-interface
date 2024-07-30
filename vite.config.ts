import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    open: true,
    proxy: {
      '/v1/api': {
        target: 'http://198.7.119.145:9080/apt',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1\/api/, '/v1/api'),
      }
    }
  },
});
