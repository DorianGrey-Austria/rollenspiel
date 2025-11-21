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
      explorer: {
        "primary": "#06B6D4",      // Cyan 500 - Time Travel Blue
        "secondary": "#A855F7",    // Purple 500 - Sci-Fi Purple
        "accent": "#F59E0B",       // Amber 500 - Time Gold
        "neutral": "#1E293B",      // Slate 800
        "base-100": "#0F172A",     // Slate 900 - Deep Space
        "base-200": "#1E293B",     // Slate 800
        "base-300": "#334155",     // Slate 700
        "info": "#3B82F6",
        "success": "#10B981",
        "warning": "#F59E0B",
        "error": "#EF4444",
      },
    }],
  },
}
