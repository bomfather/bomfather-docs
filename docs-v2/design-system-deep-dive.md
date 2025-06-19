# Design System Deep Dive

## Overview

This document provides a comprehensive guide to implementing a robust design system for the new homepage, covering design tokens, component architecture, tooling, and maintenance strategies.

## Design System Philosophy

### Core Principles
1. **Consistency**: Every element follows predictable patterns
2. **Scalability**: System grows with product needs
3. **Accessibility**: WCAG 2.1 AA compliance by default
4. **Performance**: Minimal CSS footprint with optimal delivery
5. **Developer Experience**: Easy to use, hard to misuse

### Token-Based Architecture
All design decisions are captured as design tokens that cascade through:
- **Global tokens**: Core brand values (colors, typography)
- **Alias tokens**: Semantic meanings (primary, secondary, error)
- **Component tokens**: Specific component properties

## Design Tokens Implementation

### Color System
```css
:root {
  /* Brand Colors - Global Tokens */
  --color-brand-50: #f0f9ff;
  --color-brand-100: #e0f2fe;
  --color-brand-200: #bae6fd;
  --color-brand-300: #7dd3fc;
  --color-brand-400: #38bdf8;
  --color-brand-500: #0ea5e9;  /* Primary brand */
  --color-brand-600: #0284c7;
  --color-brand-700: #0369a1;
  --color-brand-800: #075985;
  --color-brand-900: #0c4a6e;
  --color-brand-950: #082f49;

  /* Neutral Colors */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f4f4f5;
  --color-neutral-200: #e4e4e7;
  --color-neutral-300: #d4d4d8;
  --color-neutral-400: #a1a1aa;
  --color-neutral-500: #71717a;
  --color-neutral-600: #52525b;
  --color-neutral-700: #3f3f46;
  --color-neutral-800: #27272a;
  --color-neutral-900: #18181b;
  --color-neutral-950: #09090b;

  /* Semantic Alias Tokens */
  --color-primary: var(--color-brand-500);
  --color-primary-hover: var(--color-brand-600);
  --color-primary-active: var(--color-brand-700);
  
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-tertiary: var(--color-neutral-400);
  --color-text-inverse: var(--color-neutral-50);
  
  --color-background-primary: var(--color-neutral-50);
  --color-background-secondary: var(--color-neutral-100);
  --color-background-tertiary: var(--color-neutral-200);
  --color-background-inverse: var(--color-neutral-900);
  
  --color-border-primary: var(--color-neutral-200);
  --color-border-secondary: var(--color-neutral-300);
  --color-border-focus: var(--color-brand-500);
  
  /* State Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: var(--color-brand-500);
}

/* Dark Mode Overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: var(--color-neutral-50);
    --color-text-secondary: var(--color-neutral-400);
    --color-text-tertiary: var(--color-neutral-600);
    --color-text-inverse: var(--color-neutral-900);
    
    --color-background-primary: var(--color-neutral-900);
    --color-background-secondary: var(--color-neutral-800);
    --color-background-tertiary: var(--color-neutral-700);
    --color-background-inverse: var(--color-neutral-50);
    
    --color-border-primary: var(--color-neutral-700);
    --color-border-secondary: var(--color-neutral-600);
  }
}
```

### Typography System
```css
:root {
  /* Font Families */
  --font-family-heading: 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-body: 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: 'JetBrains Mono Variable', 'Fira Code', 'Monaco', monospace;

  /* Font Scales - Mobile First */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  --font-size-6xl: 3.75rem;   /* 60px */
  --font-size-7xl: 4.5rem;    /* 72px */

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Font Weights */
  --font-weight-thin: 100;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  /* Letter Spacing */
  --letter-spacing-tighter: -0.05em;
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}

/* Responsive Typography Scale */
@media (min-width: 640px) {
  :root {
    --font-size-3xl: 2.25rem;   /* 36px */
    --font-size-4xl: 2.875rem;  /* 46px */
    --font-size-5xl: 3.75rem;   /* 60px */
    --font-size-6xl: 4.5rem;    /* 72px */
    --font-size-7xl: 6rem;      /* 96px */
  }
}

@media (min-width: 1024px) {
  :root {
    --font-size-4xl: 3.5rem;    /* 56px */
    --font-size-5xl: 4.5rem;    /* 72px */
    --font-size-6xl: 6rem;      /* 96px */
    --font-size-7xl: 8rem;      /* 128px */
  }
}
```

### Spacing System
```css
:root {
  /* Base Spacing Unit: 0.25rem (4px) */
  --space-0: 0;
  --space-px: 1px;
  --space-0-5: 0.125rem;  /* 2px */
  --space-1: 0.25rem;     /* 4px */
  --space-1-5: 0.375rem;  /* 6px */
  --space-2: 0.5rem;      /* 8px */
  --space-2-5: 0.625rem;  /* 10px */
  --space-3: 0.75rem;     /* 12px */
  --space-3-5: 0.875rem;  /* 14px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-7: 1.75rem;     /* 28px */
  --space-8: 2rem;        /* 32px */
  --space-9: 2.25rem;     /* 36px */
  --space-10: 2.5rem;     /* 40px */
  --space-11: 2.75rem;    /* 44px */
  --space-12: 3rem;       /* 48px */
  --space-14: 3.5rem;     /* 56px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-28: 7rem;       /* 112px */
  --space-32: 8rem;       /* 128px */
  --space-36: 9rem;       /* 144px */
  --space-40: 10rem;      /* 160px */
  --space-44: 11rem;      /* 176px */
  --space-48: 12rem;      /* 192px */
  --space-52: 13rem;      /* 208px */
  --space-56: 14rem;      /* 224px */
  --space-60: 15rem;      /* 240px */
  --space-64: 16rem;      /* 256px */
  --space-72: 18rem;      /* 288px */
  --space-80: 20rem;      /* 320px */
  --space-96: 24rem;      /* 384px */

  /* Semantic Spacing Aliases */
  --space-section-xs: var(--space-12);    /* 48px */
  --space-section-sm: var(--space-16);    /* 64px */
  --space-section-md: var(--space-24);    /* 96px */
  --space-section-lg: var(--space-32);    /* 128px */
  --space-section-xl: var(--space-40);    /* 160px */
  
  --space-component-xs: var(--space-2);   /* 8px */
  --space-component-sm: var(--space-4);   /* 16px */
  --space-component-md: var(--space-6);   /* 24px */
  --space-component-lg: var(--space-8);   /* 32px */
  --space-component-xl: var(--space-12);  /* 48px */
}

/* Responsive Spacing */
@media (min-width: 768px) {
  :root {
    --space-section-xs: var(--space-16);
    --space-section-sm: var(--space-20);
    --space-section-md: var(--space-32);
    --space-section-lg: var(--space-40);
    --space-section-xl: var(--space-48);
  }
}

@media (min-width: 1024px) {
  :root {
    --space-section-xs: var(--space-20);
    --space-section-sm: var(--space-24);
    --space-section-md: var(--space-40);
    --space-section-lg: var(--space-48);
    --space-section-xl: var(--space-64);
  }
}
```

### Border Radius & Shadows
```css
:root {
  /* Border Radius */
  --border-radius-none: 0;
  --border-radius-sm: 0.125rem;   /* 2px */
  --border-radius-base: 0.25rem;  /* 4px */
  --border-radius-md: 0.375rem;   /* 6px */
  --border-radius-lg: 0.5rem;     /* 8px */
  --border-radius-xl: 0.75rem;    /* 12px */
  --border-radius-2xl: 1rem;      /* 16px */
  --border-radius-3xl: 1.5rem;    /* 24px */
  --border-radius-full: 9999px;

  /* Box Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

  /* Focus Shadows */
  --shadow-focus: 0 0 0 3px var(--color-brand-500) / 0.1;
  --shadow-focus-error: 0 0 0 3px var(--color-error) / 0.1;
}
```

## Component Token System

### Button Component Tokens
```css
/* Button Component Tokens */
:root {
  /* Primary Button */
  --button-primary-bg: var(--color-primary);
  --button-primary-bg-hover: var(--color-primary-hover);
  --button-primary-bg-active: var(--color-primary-active);
  --button-primary-text: var(--color-text-inverse);
  --button-primary-border: transparent;
  
  /* Secondary Button */
  --button-secondary-bg: transparent;
  --button-secondary-bg-hover: var(--color-background-secondary);
  --button-secondary-bg-active: var(--color-background-tertiary);
  --button-secondary-text: var(--color-text-primary);
  --button-secondary-border: var(--color-border-primary);
  
  /* Button Sizes */
  --button-height-sm: 2rem;      /* 32px */
  --button-height-md: 2.5rem;    /* 40px */
  --button-height-lg: 3rem;      /* 48px */
  --button-height-xl: 3.5rem;    /* 56px */
  
  --button-padding-x-sm: var(--space-3);
  --button-padding-x-md: var(--space-4);
  --button-padding-x-lg: var(--space-6);
  --button-padding-x-xl: var(--space-8);
  
  --button-font-size-sm: var(--font-size-sm);
  --button-font-size-md: var(--font-size-base);
  --button-font-size-lg: var(--font-size-lg);
  --button-font-size-xl: var(--font-size-xl);
  
  --button-border-radius: var(--border-radius-md);
  --button-font-weight: var(--font-weight-medium);
  --button-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Card Component Tokens
```css
/* Card Component Tokens */
:root {
  --card-bg: var(--color-background-primary);
  --card-border: var(--color-border-primary);
  --card-border-radius: var(--border-radius-lg);
  --card-shadow: var(--shadow-sm);
  --card-shadow-hover: var(--shadow-md);
  --card-padding-sm: var(--space-4);
  --card-padding-md: var(--space-6);
  --card-padding-lg: var(--space-8);
  --card-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Typography Scale Implementation

### Heading Styles
```css
.typography-scale {
  /* Display Headings */
  .text-display-2xl {
    font-size: var(--font-size-7xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--letter-spacing-tighter);
  }
  
  .text-display-xl {
    font-size: var(--font-size-6xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--letter-spacing-tight);
  }
  
  .text-display-lg {
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
  }
  
  /* Traditional Headings */
  .text-h1 {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
  }
  
  .text-h2 {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-snug);
  }
  
  .text-h3 {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-snug);
  }
  
  .text-h4 {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-snug);
  }
  
  .text-h5 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-normal);
  }
  
  .text-h6 {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-normal);
  }
  
  /* Body Text */
  .text-body-xl {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-relaxed);
  }
  
  .text-body-lg {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
  }
  
  .text-body {
    font-size: var(--font-size-base);
    line-height: var(--line-height-normal);
  }
  
  .text-body-sm {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-normal);
  }
  
  /* Code Text */
  .text-code {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-normal);
  }
  
  /* Labels */
  .text-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-normal);
    letter-spacing: var(--letter-spacing-wide);
    text-transform: uppercase;
  }
}
```

## Component Implementation

### Button Component
```astro
---
// components/ui/Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  external?: boolean;
  class?: string;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  external = false,
  class: className = '',
  ...rest
} = Astro.props;

const baseClasses = [
  'btn',
  `btn-${variant}`,
  `btn-${size}`,
  fullWidth && 'btn-full-width',
  disabled && 'btn-disabled',
  className
].filter(Boolean).join(' ');

const Component = href ? 'a' : 'button';
const componentProps = href 
  ? { href, ...(external && { target: '_blank', rel: 'noopener noreferrer' }) }
  : { type, disabled };
---

<Component class={baseClasses} {...componentProps} {...rest}>
  {icon && iconPosition === 'left' && (
    <span class="btn-icon btn-icon-left" data-icon={icon}></span>
  )}
  <slot />
  {icon && iconPosition === 'right' && (
    <span class="btn-icon btn-icon-right" data-icon={icon}></span>
  )}
</Component>

<style>
.btn {
  /* Base Button Styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  
  font-family: var(--font-family-body);
  font-weight: var(--button-font-weight);
  text-decoration: none;
  white-space: nowrap;
  
  border: 1px solid;
  border-radius: var(--button-border-radius);
  
  transition: var(--button-transition);
  cursor: pointer;
  user-select: none;
  
  /* Focus Styles */
  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-focus);
  }
  
  /* Disabled Styles */
  &.btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  /* Full Width */
  &.btn-full-width {
    width: 100%;
  }
}

/* Button Variants */
.btn-primary {
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text);
  border-color: var(--button-primary-border);
  
  &:hover:not(.btn-disabled) {
    background-color: var(--button-primary-bg-hover);
  }
  
  &:active:not(.btn-disabled) {
    background-color: var(--button-primary-bg-active);
  }
}

.btn-secondary {
  background-color: var(--button-secondary-bg);
  color: var(--button-secondary-text);
  border-color: var(--button-secondary-border);
  
  &:hover:not(.btn-disabled) {
    background-color: var(--button-secondary-bg-hover);
  }
  
  &:active:not(.btn-disabled) {
    background-color: var(--button-secondary-bg-active);
  }
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
  
  &:hover:not(.btn-disabled) {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: transparent;
  
  &:hover:not(.btn-disabled) {
    background-color: var(--color-background-secondary);
  }
}

.btn-link {
  background-color: transparent;
  color: var(--color-primary);
  border-color: transparent;
  text-decoration: underline;
  
  &:hover:not(.btn-disabled) {
    color: var(--color-primary-hover);
  }
}

/* Button Sizes */
.btn-sm {
  height: var(--button-height-sm);
  padding: 0 var(--button-padding-x-sm);
  font-size: var(--button-font-size-sm);
}

.btn-md {
  height: var(--button-height-md);
  padding: 0 var(--button-padding-x-md);
  font-size: var(--button-font-size-md);
}

.btn-lg {
  height: var(--button-height-lg);
  padding: 0 var(--button-padding-x-lg);
  font-size: var(--button-font-size-lg);
}

.btn-xl {
  height: var(--button-height-xl);
  padding: 0 var(--button-padding-x-xl);
  font-size: var(--button-font-size-xl);
}

/* Icon Styles */
.btn-icon {
  display: inline-flex;
  align-items: center;
  
  &.btn-icon-left {
    margin-right: calc(var(--space-1) * -1);
  }
  
  &.btn-icon-right {
    margin-left: calc(var(--space-1) * -1);
  }
}
</style>
```

### Card Component
```astro
---
// components/ui/Card.astro
interface Props {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  interactive?: boolean;
  class?: string;
}

const {
  variant = 'default',
  padding = 'md',
  hover = false,
  interactive = false,
  class: className = '',
  ...rest
} = Astro.props;

const cardClasses = [
  'card',
  `card-${variant}`,
  `card-padding-${padding}`,
  hover && 'card-hover',
  interactive && 'card-interactive',
  className
].filter(Boolean).join(' ');
---

<div class={cardClasses} {...rest}>
  <slot />
</div>

<style>
.card {
  background-color: var(--card-bg);
  border-radius: var(--card-border-radius);
  transition: var(--card-transition);
}

/* Card Variants */
.card-default {
  border: 1px solid var(--card-border);
}

.card-elevated {
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
}

.card-outlined {
  border: 2px solid var(--card-border);
}

.card-filled {
  background-color: var(--color-background-secondary);
  border: 1px solid transparent;
}

/* Card Padding */
.card-padding-none {
  padding: 0;
}

.card-padding-sm {
  padding: var(--card-padding-sm);
}

.card-padding-md {
  padding: var(--card-padding-md);
}

.card-padding-lg {
  padding: var(--card-padding-lg);
}

/* Card States */
.card-hover:hover {
  box-shadow: var(--card-shadow-hover);
  transform: translateY(-1px);
}

.card-interactive {
  cursor: pointer;
  
  &:hover {
    box-shadow: var(--card-shadow-hover);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-focus);
  }
}
</style>
```

## Responsive Design System

### Container System
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
```

### Grid System
```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }

/* Responsive Grid */
@media (min-width: 640px) {
  .sm\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sm\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .sm\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (min-width: 768px) {
  .md\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .lg\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
```

## Design Token Tooling

### Token Generation Script
```javascript
// scripts/generateTokens.js
const fs = require('fs');
const path = require('path');

const tokens = {
  color: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      // ... rest of brand colors
    },
    neutral: {
      // ... neutral colors
    }
  },
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',
    // ... rest of spacing
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    // ... rest of font sizes
  }
};

// Generate CSS Custom Properties
function generateCSS(tokens, prefix = '') {
  let css = ':root {\n';
  
  function traverse(obj, path = '') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}-${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        traverse(value, currentPath);
      } else {
        css += `  --${prefix}${currentPath}: ${value};\n`;
      }
    }
  }
  
  traverse(tokens);
  css += '}\n';
  
  return css;
}

// Generate TypeScript Types
function generateTypes(tokens) {
  let types = 'export interface DesignTokens {\n';
  
  function traverseTypes(obj, depth = 1) {
    const indent = '  '.repeat(depth);
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        types += `${indent}${key}: {\n`;
        traverseTypes(value, depth + 1);
        types += `${indent}};\n`;
      } else {
        types += `${indent}${key}: string;\n`;
      }
    }
  }
  
  traverseTypes(tokens);
  types += '}\n';
  
  return types;
}

// Write files
const cssOutput = generateCSS(tokens);
const typesOutput = generateTypes(tokens);

fs.writeFileSync(path.join(__dirname, '../src/styles/tokens.css'), cssOutput);
fs.writeFileSync(path.join(__dirname, '../src/types/tokens.ts'), typesOutput);

console.log('Design tokens generated successfully!');
```

### Token Validation
```javascript
// scripts/validateTokens.js
const tokens = require('../tokens.json');

function validateTokens(tokens) {
  const errors = [];
  
  // Validate color contrast
  function validateColorContrast(colors) {
    // Implementation for color contrast validation
    // using a library like 'color' or 'chroma-js'
  }
  
  // Validate spacing scale
  function validateSpacingScale(spacing) {
    const values = Object.values(spacing).map(parseFloat).sort((a, b) => a - b);
    
    for (let i = 1; i < values.length; i++) {
      const ratio = values[i] / values[i - 1];
      if (ratio > 2) {
        errors.push(`Large gap in spacing scale: ${values[i - 1]} to ${values[i]}`);
      }
    }
  }
  
  // Validate typography scale
  function validateTypographyScale(fontSize) {
    const values = Object.values(fontSize).map(v => parseFloat(v)).sort((a, b) => a - b);
    
    for (let i = 1; i < values.length; i++) {
      const ratio = values[i] / values[i - 1];
      if (ratio < 1.125 || ratio > 1.5) {
        errors.push(`Typography scale ratio outside recommended range: ${ratio}`);
      }
    }
  }
  
  validateSpacingScale(tokens.spacing);
  validateTypographyScale(tokens.fontSize);
  
  return errors;
}

const errors = validateTokens(tokens);
if (errors.length > 0) {
  console.error('Token validation errors:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
} else {
  console.log('All tokens validated successfully!');
}
```

## Performance Considerations

### CSS Optimization
```javascript
// vite.config.js - CSS optimization
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        // Remove unused CSS
        require('@fullhuman/postcss-purgecss')({
          content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        }),
        
        // Optimize custom properties
        require('postcss-custom-properties')({
          preserve: false
        }),
        
        // Minify CSS
        require('cssnano')({
          preset: 'default'
        })
      ]
    }
  }
});
```

### Critical CSS
```javascript
// Critical CSS extraction
const critical = require('critical');

critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  dest: 'index.html',
  width: 1300,
  height: 900,
  css: ['dist/assets/style.css']
});
```

This comprehensive design system provides a solid foundation for consistent, scalable, and maintainable UI development while ensuring optimal performance and accessibility. 