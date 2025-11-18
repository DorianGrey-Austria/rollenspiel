/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#B026FF',
        'neon-cyan': '#00F0FF',
        'neon-pink': '#FF00FF',
        'neon-green': '#39FF14',
        'dark-bg': '#0A0E27',
        'dark-card': '#1A1F3A',
        'dark-border': '#2A2F4A',
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(176, 38, 255, 0.5)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 255, 0.5)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(176, 38, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(176, 38, 255, 1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        neonGamer: {
          "primary": "#B026FF",      // Neon Purple
          "secondary": "#00F0FF",    // Neon Cyan
          "accent": "#FF00FF",       // Neon Pink
          "neutral": "#1A1F3A",      // Dark Card
          "base-100": "#0A0E27",     // Dark BG
          "base-200": "#1A1F3A",     // Dark Card
          "base-300": "#2A2F4A",     // Dark Border
          "info": "#00F0FF",
          "success": "#39FF14",
          "warning": "#FFD700",
          "error": "#FF1744",
        },
      },
    ],
  },
}
