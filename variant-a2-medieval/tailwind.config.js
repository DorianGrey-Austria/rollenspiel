/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Crimson Text', 'serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        medieval: {
          "primary": "#7C3AED",      // Purple 600 - Royal
          "secondary": "#F59E0B",    // Amber 500 - Gold
          "accent": "#DC2626",       // Red 600 - Crimson
          "neutral": "#1F2937",      // Gray 800 - Dark Stone
          "base-100": "#111827",     // Gray 900 - Deep Dark
          "base-200": "#1F2937",     // Gray 800
          "base-300": "#374151",     // Gray 700
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#DC2626",
        },
      },
    ],
  },
}
