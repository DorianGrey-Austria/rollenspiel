/**
 * Vite PWA Configuration
 * Use with vite-plugin-pwa
 *
 * Install: npm install -D vite-plugin-pwa
 */

import { VitePWA } from 'vite-plugin-pwa'

export function getPWAConfig(variant: 'medieval' | 'gamer' | 'museum') {
  const configs = {
    medieval: {
      name: 'Medieval Scholar - rollenspiel.ai',
      short_name: 'Medieval RPG',
      theme_color: '#800020',
      background_color: '#F4E8D0',
    },
    gamer: {
      name: 'Neon Gamer - rollenspiel.ai',
      short_name: 'Neon RPG',
      theme_color: '#B026FF',
      background_color: '#0A0E27',
    },
    museum: {
      name: 'Museum Guide - rollenspiel.ai',
      short_name: 'Museum RPG',
      theme_color: '#1A2332',
      background_color: '#FFFFFF',
    },
  }

  const config = configs[variant]

  return VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: config.name,
      short_name: config.short_name,
      description: 'Location-based AI storytelling platform',
      theme_color: config.theme_color,
      background_color: config.background_color,
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'geocoding-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
            },
          },
        },
      ],
    },
  })
}
