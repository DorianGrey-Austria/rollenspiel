/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',  // Indigo 500
          light: '#818CF8',    // Indigo 400
          dark: '#4F46E5',     // Indigo 600
        },
        secondary: {
          DEFAULT: '#EC4899',  // Pink 500
          light: '#F472B6',    // Pink 400
          dark: '#DB2777',     // Pink 600
        },
        accent: {
          DEFAULT: '#14B8A6',  // Teal 500
          light: '#2DD4BF',    // Teal 400
          dark: '#0D9488',     // Teal 600
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      essential: {
        "primary": "#6366F1",
        "secondary": "#EC4899",
        "accent": "#14B8A6",
        "neutral": "#1E293B",
        "base-100": "#0F172A",
        "base-200": "#1E293B",
        "base-300": "#334155",
        "info": "#3B82F6",
        "success": "#10B981",
        "warning": "#F59E0B",
        "error": "#EF4444",
      },
    }],
  },
}
