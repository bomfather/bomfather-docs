/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#0B5FFF',
        'accent': '#0B5FFF',
        'background': '#f9f8f4',
        'surface': '#FFFFFF',
        'surface-secondary': '#f9f8f4',
        'surface-tertiary': '#FFFFFF',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        'text-tertiary': '#64748B',
        'text-muted': '#94A3B8',
        'border-light': '#E2E8F0',
        'border-medium': '#CBD5E1',
        'border-strong': '#94A3B8',
        'light-gray': '#F1F5F9',
        'white': '#FFFFFF',
        'mid-gray': '#475569',
        'dark': '#0F172A',
        'accent-green': '#059669',
        'accent-orange': '#EA580C',
        'accent-red': '#DC2626',
        // Gray palette for professional styling
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Additional color palettes
        'blue': {
          100: '#DBEAFE',
          500: '#3B82F6',
          800: '#1E40AF',
        },
        'green': {
          100: '#D1FAE5',
          500: '#10B981',
          800: '#065F46',
        },
        'yellow': {
          100: '#FEF3C7',
          500: '#F59E0B',
          800: '#92400E',
        },
        'red': {
          100: '#FEE2E2',
          500: '#EF4444',
          800: '#991B1B',
        },
      },
      backgroundImage: {
        'heroDrone': "url('/img/drone.svg')",
        'radial-at-center': 'radial-gradient(circle at center, var(--tw-gradient-stops))'
      },
      fontFamily: {
        'sans': ['Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
        'heading': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mono': ['Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
  safelist: [
    'mix-blend-overlay',
  ],
}; 