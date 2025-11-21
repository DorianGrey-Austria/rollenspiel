/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Explorer Theme
        explorer: {
          primary: '#0F172A',    // Deep Navy
          secondary: '#1E293B',  // Slate
          accent: '#D4AF37',     // Gold
          highlight: '#3B82F6',  // Blue
          success: '#10B981',    // Green
          warning: '#F59E0B',    // Amber
          danger: '#EF4444',     // Red
          glass: 'rgba(255, 255, 255, 0.1)',
          'glass-border': 'rgba(255, 255, 255, 0.2)',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-explorer': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.5)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        explorer: {
          "primary": "#3B82F6",
          "secondary": "#1E293B",
          "accent": "#D4AF37",
          "neutral": "#0F172A",
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
