/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      elegant: {
        "primary": "#8B5CF6",     // Violet 500
        "secondary": "#EC4899",   // Pink 500
        "accent": "#06B6D4",      // Cyan 500
        "neutral": "#1F2937",     // Gray 800
        "base-100": "#111827",    // Gray 900
        "base-200": "#1F2937",    // Gray 800
        "base-300": "#374151",    // Gray 700
        "info": "#3B82F6",
        "success": "#10B981",
        "warning": "#F59E0B",
        "error": "#EF4444",
      },
    }],
  },
}
