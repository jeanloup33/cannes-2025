/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.html"
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        night: '#0b0b0d',
        noir: '#111114',
        gold: '#e8c77d',
        goldSoft: '#f0dfb0',
        ruby: '#b80f2f',
        champagne: '#f5efe1',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 2px rgba(232,199,125,0.35), 0 20px 60px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        glam: 'radial-gradient(1000px 600px at 80% -10%, rgba(232,199,125,0.14), transparent 60%), linear-gradient(180deg, #0b0b0d 0%, #111114 70%, #0b0b0d 100%)',
        redcarpet: 'linear-gradient(180deg, rgba(184,15,47,0.85), rgba(184,15,47,0.92))',
      },
    },
  },
  plugins: [],
}