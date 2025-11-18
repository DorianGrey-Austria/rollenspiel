/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F4E8D0',
        'parchment-dark': '#D4C5A9',
        'ink-dark': '#2C1810',
        'ink-medium': '#5C3A1A',
        'gold': '#D4AF37',
        'burgundy': '#800020',
        'forest': '#2D5016',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Crimson Text', 'serif'],
        gothic: ['UnifrakturMaguntia', 'cursive'],
      },
      backgroundImage: {
        'parchment-texture': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" /%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.05\" /%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        medieval: {
          "primary": "#800020",      // Burgundy
          "secondary": "#D4AF37",    // Gold
          "accent": "#2D5016",       // Forest
          "neutral": "#2C1810",      // Ink Dark
          "base-100": "#F4E8D0",     // Parchment
          "base-200": "#D4C5A9",     // Parchment Dark
          "info": "#5C3A1A",
          "success": "#2D5016",
          "warning": "#D4AF37",
          "error": "#800020",
        },
      },
    ],
  },
}
