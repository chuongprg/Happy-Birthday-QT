import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const isAdmin = process.env.VITE_APP_TARGET === 'admin';

export default defineConfig({
  plugins: [
    react(),
    // The admin dashboard must always see fresh data, so it skips the
    // offline-caching service worker entirely.
    !isAdmin &&
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Happy Birthday',
          short_name: 'Birthday',
          theme_color: '#F8C8DC',
          background_color: '#FFFDF9',
        },
        workbox: {
          // Audio tracks are multi-MB — precaching them would block install/activation,
          // so they're cached on first play instead via runtimeCaching below.
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
          runtimeCaching: [
            {
              urlPattern: /\.mp3$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'audio-cache',
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },
      }),
  ].filter(Boolean),
});
