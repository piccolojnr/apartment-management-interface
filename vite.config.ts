import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    open: true,
    proxy: {
      '/apt': {
        target: 'http://198.7.119.145:9080',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Sending Request to the Target:', req.method, req.url);

          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
          proxy.on('error', (err) => {
            console.error(err.message);
          });
        }
      }
    }
  },
});
