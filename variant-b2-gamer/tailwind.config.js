/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      gamer: {
        "primary": "#10B981",      // Emerald 500 - Neon Green
        "secondary": "#3B82F6",    // Blue 500 - Electric Blue
        "accent": "#EC4899",       // Pink 500 - Hot Pink
        "neutral": "#1F2937",      // Gray 800
        "base-100": "#0F172A",     // Slate 900 - Deep Dark
        "base-200": "#1E293B",     // Slate 800
        "base-300": "#334155",     // Slate 700
        "info": "#06B6D4",
        "success": "#10B981",
        "warning": "#F59E0B",
        "error": "#EF4444",
      },
    }],
  },
}
