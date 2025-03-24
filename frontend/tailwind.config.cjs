/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#0B5FFF',
        'secondary': '#224BC5',
        'dark-blue': '#0A2463',
        'dark': '#121212',
        'mid-gray': '#505050',
        'light-gray': '#F3F4F6',
        'accent-green': '#45C4B0',
        'accent-orange': '#FF6B35',
        'accent-red': '#E63946',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Manrope', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}; 