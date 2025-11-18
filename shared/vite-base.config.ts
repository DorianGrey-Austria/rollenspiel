/**
 * Shared Vite Configuration
 * Base config that can be extended by variants
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export const baseViteConfig = defineConfig({
  plugins: [react()],

  // Build optimizations
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['zustand'],
          anthropic: ['@anthropic-ai/sdk'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },

  // Server config
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: true,
  },

  // Preview config
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
  },

  // Optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'zustand'],
  },

  // Environment
  envPrefix: 'VITE_',
})

export default baseViteConfig
