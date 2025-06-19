/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#006FEE',
        'accent': '#006FEE',
        'background': '#0a0d15',
        'surface': '#0a0d15',
        'light-gray': '#F3F4F6',
        'gray': '#CCCCCC',
        'white': '#FFFFFF',
        'mid-gray': '#959595',
        'dark': '#0a0d15',
        'accent-green': '#45C4B0',
        'accent-orange': '#FF6B35',
        'accent-red': '#E63946',
      },
      backgroundImage: {
        'heroDrone': "url('/img/drone.svg')",
        'radial-at-center': 'radial-gradient(circle at center, var(--tw-gradient-stops))'
      },
      fontFamily: {
        'sans': ['"DM Sans"', 'sans-serif'],
        'heading': ['"DM Sans"', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
  safelist: [
    'mix-blend-overlay',
  ],
}; 