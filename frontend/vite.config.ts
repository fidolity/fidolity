import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { Connect } from 'vite';

// SPA fallback plugin for client-side routing
function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    configureServer(server: any) {
      server.middlewares.use((req: Connect.IncomingMessage, res: any, next: () => void) => {
        // Skip Vite internal requests, API requests, and static assets
        if (req.url?.startsWith('/@') ||
            req.url?.startsWith('/api') || 
            req.url?.startsWith('/node_modules') ||
            req.url?.startsWith('/src') ||
            req.url?.match(/\.(js|jsx|ts|tsx|css|png|jpg|jpeg|svg|ico|json|woff|woff2|ttf|eot)$/)) {
          return next();
        }
        
        // For all other routes, serve index.html (SPA fallback)
        if (req.url && !req.url.includes('.')) {
          req.url = '/';
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'minimal-migrate.preview.emergentagent.com',
      '.emergentagent.com',
      'localhost',
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
});
