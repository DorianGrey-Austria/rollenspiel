/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      museum: {
        "primary": "#1E40AF",      // Blue 800 - Museum Navy
        "secondary": "#D97706",    // Amber 600 - Gold Accent
        "accent": "#059669",       // Emerald 600 - Heritage Green
        "neutral": "#374151",      // Gray 700
        "base-100": "#F9FAFB",     // Gray 50 - Light Background
        "base-200": "#F3F4F6",     // Gray 100
        "base-300": "#E5E7EB",     // Gray 200
        "info": "#3B82F6",
        "success": "#10B981",
        "warning": "#F59E0B",
        "error": "#EF4444",
      },
    }],
  },
}
