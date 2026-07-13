/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#121212',
        surfaceHover: '#1e1e1e',
        primary: '#06b6d4', // Cyan 500
        textMain: '#f3f4f6', // Gray 100
        textMuted: '#9ca3af', // Gray 400
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
