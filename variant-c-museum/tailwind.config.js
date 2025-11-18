/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'museum-navy': '#1A2332',
        'museum-blue': '#2C3E50',
        'museum-gold': '#C9A961',
        'museum-cream': '#F8F6F1',
        'museum-gray': '#7F8C8D',
        'museum-border': '#BDC3C7',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'museum': '0 2px 8px rgba(0,0,0,0.08)',
        'museum-lg': '0 4px 16px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        museum: {
          "primary": "#1A2332",      // Museum Navy
          "secondary": "#C9A961",    // Museum Gold
          "accent": "#2C3E50",       // Museum Blue
          "neutral": "#7F8C8D",      // Museum Gray
          "base-100": "#FFFFFF",     // White
          "base-200": "#F8F6F1",     // Cream
          "base-300": "#BDC3C7",     // Border
          "info": "#3498DB",
          "success": "#27AE60",
          "warning": "#F39C12",
          "error": "#E74C3C",
        },
      },
    ],
  },
}
