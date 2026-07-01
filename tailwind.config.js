/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
    },
    extend: {
      colors: {
        ink: {
          base: "#0A0A0F",
          surface: "#13131A",
          deep: "#06060A",
          raised: "#1B1B24",
          text: "#F5F3EF",
          muted: "#9A9AA5",
          border: "rgba(255,255,255,0.08)",
        },
        sakura: {
          neon: "#FF2E63",
          DEFAULT: "#FF2E63",
          deep: "#C71F4C",
        },
        cyan: {
          neon: "#00E5FF",
          DEFAULT: "#00E5FF",
          deep: "#00A8BD",
        },
        manga: {
          gold: "#FFD23F",
          DEFAULT: "#FFD23F",
        },
      },
      fontFamily: {
        display: ['Anton', 'Bebas Neue', 'Impact', 'sans-serif'],
        jp: ['"DotGothic16"', 'monospace'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'manga': '6px 6px 0 0 #000000',
        'manga-sm': '3px 3px 0 0 #000000',
        'manga-lg': '10px 10px 0 0 #000000',
        'manga-neon': '6px 6px 0 0 #FF2E63',
        'manga-cyan': '6px 6px 0 0 #00E5FF',
        'neon-pink': '0 0 20px rgba(255,46,99,0.5), 0 0 40px rgba(255,46,99,0.25)',
        'neon-cyan': '0 0 20px rgba(0,229,255,0.5), 0 0 40px rgba(0,229,255,0.25)',
        'neon-gold': '0 0 20px rgba(255,210,63,0.45)',
      },
      keyframes: {
        'speed-lines': {
          '0%': { transform: 'scale(0.6) rotate(0deg)', opacity: '0' },
          '50%': { opacity: '0.7' },
          '100%': { transform: 'scale(1.2) rotate(0deg)', opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        'panel-pop': {
          '0%': { transform: 'scale(0.96) translateY(8px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'badge-burst': {
          '0%': { transform: 'scale(0) rotate(-45deg)' },
          '60%': { transform: 'scale(1.25) rotate(8deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'halftone-shift': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '8px 8px' },
        },
      },
      animation: {
        'speed-lines': 'speed-lines 1.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 2.4s ease-in-out infinite',
        'panel-pop': 'panel-pop 0.35s cubic-bezier(0.22,1,0.36,1) forwards',
        'badge-burst': 'badge-burst 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'marquee': 'marquee 24s linear infinite',
        'halftone-shift': 'halftone-shift 1.2s steps(4) infinite',
      },
      backgroundImage: {
        'halftone': "radial-gradient(circle, rgba(245,243,239,0.18) 1px, transparent 1.4px)",
        'manga-grid': "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        'halftone': '7px 7px',
        'manga-grid': '42px 42px',
      },
    },
  },
  plugins: [],
};
