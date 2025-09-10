/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Turbopuffer-inspired palette (exact hexes provided)
        'primary': '#0F172A', // deep navy for CTAs and headings
        'accent': '#64748B',  // muted slate for hovers/secondary
        'background': '#F9FAFC',
        'surface': '#FFFFFF',
        'surface-secondary': '#F9FAFC',
        'surface-tertiary': '#FFFFFF',
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
        'text-tertiary': '#64748B',
        'text-muted': '#64748B',
        'border-light': '#E8ECF4',
        'border-medium': '#E8ECF4',
        'border-strong': '#64748B',
        'light-gray': '#F1F5F9',
        'white': '#FFFFFF',
        'mid-gray': '#64748B',
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
        // Slate scale proxies
        'slatebrand': {
          50: '#F9FAFC',
          100: '#F1F5F9',
          200: '#E8ECF4',
          300: '#E8ECF4',
          400: '#64748B',
          500: '#64748B',
          700: '#0F172A',
          900: '#0F172A',
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