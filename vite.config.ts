import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Production builds are served from the GitHub Pages project sub-path
// (https://jonwillits.github.io/cogmodels/); `vite dev` stays at the root.
// Gate on `mode`, not `command`: Vite passes command 'serve' for BOTH dev and
// preview, so a `command === 'build'` check would make `vite preview` serve the
// sub-path build at the root and the app would never mount.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/cogmodels/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'app-icon.svg'],
      manifest: {
        name: 'cogmodels',
        short_name: 'cogmodels',
        description:
          'Working, interactive implementations of cognitive models, built from their source papers and code.',
        theme_color: '#0e1420',
        background_color: '#0e1420',
        display: 'standalone',
        orientation: 'any',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'app-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Cache the built app shell + assets so a demo keeps working offline
        // in a seminar room once it has been opened once.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
      },
    }),
  ],
}))
