/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Essential Theme - Clean & Reliable
        primary: {
          DEFAULT: '#6366F1',  // Indigo
          light: '#818CF8',
          dark: '#4F46E5',
        },
        secondary: {
          DEFAULT: '#EC4899',  // Pink
          light: '#F472B6',
          dark: '#DB2777',
        },
        accent: {
          DEFAULT: '#14B8A6',  // Teal
          light: '#2DD4BF',
          dark: '#0D9488',
        },
        dark: {
          DEFAULT: '#0F172A',  // Slate 900
          lighter: '#1E293B', // Slate 800
          light: '#334155',   // Slate 700
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
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
      },
    ],
  },
}
