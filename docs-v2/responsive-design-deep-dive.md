# Responsive Design Deep Dive

## Overview

This document provides a comprehensive guide to implementing responsive design for the new homepage, covering breakpoint strategies, fluid layouts, typography scaling, and device-specific optimizations.

## Responsive Strategy & Philosophy

### Core Principles
1. **Mobile-First Design**: Design for the smallest screen first, then enhance
2. **Content-First**: Structure content hierarchy independent of device
3. **Performance-Conscious**: Optimize for varying network conditions
4. **Touch-Friendly**: Ensure all interactions work well on touch devices
5. **Progressive Enhancement**: Core functionality works everywhere

### Breakpoint Strategy
```css
/* Mobile-first breakpoint system */
:root {
  /* Breakpoint values */
  --breakpoint-sm: 640px;   /* Small tablets */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Desktop */
  --breakpoint-xl: 1280px;  /* Large desktop */
  --breakpoint-2xl: 1536px; /* Extra large desktop */
}

/* Media query mixins */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

## Fluid Layout System

### Container Strategy
```css
/* Fluid container system */
.container {
  width: 100%;
  margin: 0 auto;
  padding-left: 1rem;   /* 16px base padding */
  padding-right: 1rem;
}

/* Responsive container max-widths */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: 1.5rem;  /* 24px */
    padding-right: 1.5rem;
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
    padding-left: 2rem;    /* 32px */
    padding-right: 2rem;
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
    padding-left: 3rem;    /* 48px */
    padding-right: 3rem;
  }
}

/* Container variants */
.container-fluid {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.container-narrow {
  max-width: 65ch; /* Optimal reading width */
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
```

### Grid System Implementation
```astro
---
// components/layouts/ResponsiveGrid.astro
interface Props {
  cols?: number | Record<string, number>;
  gap?: string | Record<string, string>;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  class?: string;
}

const {
  cols = 1,
  gap = '1.5rem',
  alignItems = 'start',
  justifyContent = 'start',
  class: className = '',
  ...rest
} = Astro.props;

// Handle responsive cols
const getGridCols = (cols: number | Record<string, number>) => {
  if (typeof cols === 'number') {
    return `repeat(${cols}, minmax(0, 1fr))`;
  }
  
  let styles = '';
  if (cols.base) styles += `grid-template-columns: repeat(${cols.base}, minmax(0, 1fr));`;
  if (cols.sm) styles += `@media (min-width: 640px) { grid-template-columns: repeat(${cols.sm}, minmax(0, 1fr)); }`;
  if (cols.md) styles += `@media (min-width: 768px) { grid-template-columns: repeat(${cols.md}, minmax(0, 1fr)); }`;
  if (cols.lg) styles += `@media (min-width: 1024px) { grid-template-columns: repeat(${cols.lg}, minmax(0, 1fr)); }`;
  if (cols.xl) styles += `@media (min-width: 1280px) { grid-template-columns: repeat(${cols.xl}, minmax(0, 1fr)); }`;
  
  return styles;
};

// Handle responsive gap
const getGridGap = (gap: string | Record<string, string>) => {
  if (typeof gap === 'string') {
    return gap;
  }
  
  let styles = '';
  if (gap.base) styles += `gap: ${gap.base};`;
  if (gap.sm) styles += `@media (min-width: 640px) { gap: ${gap.sm}; }`;
  if (gap.md) styles += `@media (min-width: 768px) { gap: ${gap.md}; }`;
  if (gap.lg) styles += `@media (min-width: 1024px) { gap: ${gap.lg}; }`;
  if (gap.xl) styles += `@media (min-width: 1280px) { gap: ${gap.xl}; }`;
  
  return styles;
};
---

<div 
  class={`responsive-grid ${className}`}
  style={{
    display: 'grid',
    gridTemplateColumns: typeof cols === 'number' ? getGridCols(cols) : undefined,
    gap: typeof gap === 'string' ? gap : undefined,
    alignItems,
    justifyContent
  }}
  {...rest}
>
  <slot />
</div>

{typeof cols === 'object' && (
  <style define:vars={{ gridCols: getGridCols(cols) }}>
    .responsive-grid {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  </style>
)}

{typeof gap === 'object' && (
  <style define:vars={{ gridGap: getGridGap(gap) }}>
    .responsive-grid {
      gap: 1rem;
    }
  </style>
)}

<style>
.responsive-grid {
  /* Base grid styles */
}

/* Responsive grid columns */
@media (min-width: 640px) {
  .grid-sm-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .grid-sm-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-sm-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid-sm-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (min-width: 768px) {
  .grid-md-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .grid-md-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-md-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid-md-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .grid-lg-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .grid-lg-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-lg-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid-lg-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
</style>
```

### Flexible Component Layouts
```astro
---
// components/sections/ResponsiveSection.astro
interface Props {
  layout?: 'stack' | 'split' | 'grid' | 'masonry';
  reverse?: boolean;
  alignItems?: 'start' | 'center' | 'end';
  spacing?: 'tight' | 'normal' | 'loose';
  background?: string;
  id?: string;
  class?: string;
}

const {
  layout = 'stack',
  reverse = false,
  alignItems = 'start',
  spacing = 'normal',
  background,
  id,
  class: className = '',
  ...rest
} = Astro.props;

const spacingMap = {
  tight: 'var(--space-8)',
  normal: 'var(--space-16)',
  loose: 'var(--space-24)'
};

const layoutClasses = {
  stack: 'layout-stack',
  split: 'layout-split',
  grid: 'layout-grid',
  masonry: 'layout-masonry'
};
---

<section 
  id={id}
  class={`responsive-section ${layoutClasses[layout]} ${reverse ? 'reverse' : ''} ${className}`}
  style={{
    paddingTop: spacingMap[spacing],
    paddingBottom: spacingMap[spacing],
    backgroundColor: background
  }}
  {...rest}
>
  <div class="container">
    <slot />
  </div>
</section>

<style>
.responsive-section {
  width: 100%;
}

/* Stack layout - default mobile */
.layout-stack {
  .container > * + * {
    margin-top: var(--space-6);
  }
}

/* Split layout - side by side on larger screens */
.layout-split .container {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  align-items: var(--align-items, start);
}

@media (min-width: 768px) {
  .layout-split .container {
    flex-direction: row;
    gap: var(--space-8);
    align-items: center;
  }
  
  .layout-split.reverse .container {
    flex-direction: row-reverse;
  }
  
  .layout-split .container > * {
    flex: 1;
  }
}

/* Grid layout */
.layout-grid .container {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .layout-grid .container {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .layout-grid .container {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-10);
  }
}

/* Masonry layout */
.layout-masonry .container {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .layout-masonry .container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: masonry;
  }
}

@media (min-width: 1024px) {
  .layout-masonry .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
```

## Typography Scaling

### Fluid Typography System
```css
/* Fluid typography using clamp() */
:root {
  /* Base font size scaling */
  --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 1.3rem + 1vw, 1.875rem);
  --font-size-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.25rem);
  --font-size-4xl: clamp(2.25rem, 1.8rem + 2.25vw, 3rem);
  --font-size-5xl: clamp(3rem, 2.2rem + 4vw, 4rem);
  --font-size-6xl: clamp(4rem, 2.8rem + 6vw, 5.5rem);
  --font-size-7xl: clamp(5.5rem, 4rem + 7.5vw, 8rem);
  
  /* Line height scaling */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
  
  /* Letter spacing */
  --letter-spacing-tighter: -0.05em;
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}

/* Responsive typography classes */
.text-fluid-xs { font-size: var(--font-size-xs); }
.text-fluid-sm { font-size: var(--font-size-sm); }
.text-fluid-base { font-size: var(--font-size-base); }
.text-fluid-lg { font-size: var(--font-size-lg); }
.text-fluid-xl { font-size: var(--font-size-xl); }
.text-fluid-2xl { font-size: var(--font-size-2xl); }
.text-fluid-3xl { font-size: var(--font-size-3xl); }
.text-fluid-4xl { font-size: var(--font-size-4xl); }
.text-fluid-5xl { font-size: var(--font-size-5xl); }
.text-fluid-6xl { font-size: var(--font-size-6xl); }
.text-fluid-7xl { font-size: var(--font-size-7xl); }
```

### Responsive Typography Component
```astro
---
// components/ui/ResponsiveText.astro
interface Props {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  lineHeight?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  responsive?: boolean;
  class?: string;
}

const {
  as: Tag = 'p',
  size = 'base',
  weight = 'normal',
  lineHeight = 'normal',
  letterSpacing = 'normal',
  color,
  align = 'left',
  responsive = true,
  class: className = '',
  ...rest
} = Astro.props;

const sizeClass = responsive ? `text-fluid-${size}` : `text-${size}`;
const classes = [
  sizeClass,
  `font-${weight}`,
  `leading-${lineHeight}`,
  `tracking-${letterSpacing}`,
  `text-${align}`,
  className
].filter(Boolean).join(' ');
---

<Tag 
  class={classes}
  style={color ? { color } : undefined}
  {...rest}
>
  <slot />
</Tag>

<style>
/* Font weights */
.font-thin { font-weight: 100; }
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-black { font-weight: 900; }

/* Line heights */
.leading-tight { line-height: var(--line-height-tight); }
.leading-snug { line-height: var(--line-height-snug); }
.leading-normal { line-height: var(--line-height-normal); }
.leading-relaxed { line-height: var(--line-height-relaxed); }
.leading-loose { line-height: var(--line-height-loose); }

/* Letter spacing */
.tracking-tighter { letter-spacing: var(--letter-spacing-tighter); }
.tracking-tight { letter-spacing: var(--letter-spacing-tight); }
.tracking-normal { letter-spacing: var(--letter-spacing-normal); }
.tracking-wide { letter-spacing: var(--letter-spacing-wide); }
.tracking-wider { letter-spacing: var(--letter-spacing-wider); }
.tracking-widest { letter-spacing: var(--letter-spacing-widest); }

/* Text alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }
</style>
```

## Touch and Mobile Optimization

### Touch-Friendly Interactions
```css
/* Touch target optimization */
:root {
  --touch-target-min: 44px; /* WCAG minimum */
  --touch-target-comfortable: 48px;
  --touch-target-large: 56px;
}

/* Ensure all interactive elements meet touch targets */
button,
input,
select,
textarea,
a,
[role="button"],
[tabindex] {
  min-height: var(--touch-target-min);
  min-width: var(--touch-target-min);
}

/* Comfortable touch targets for primary actions */
.btn-primary,
.btn-large {
  min-height: var(--touch-target-comfortable);
  padding: 0.75rem 1.5rem;
}

/* Large touch targets for important actions */
.btn-hero,
.btn-cta {
  min-height: var(--touch-target-large);
  padding: 1rem 2rem;
}

/* Touch-specific styles */
@media (hover: none) and (pointer: coarse) {
  /* Increase spacing on touch devices */
  .btn + .btn {
    margin-top: 0.5rem;
  }
  
  /* Remove hover effects on touch devices */
  .hover-effects:hover {
    transform: none;
  }
  
  /* Increase tap target areas */
  nav a {
    padding: 0.75rem 1rem;
  }
}
```

### Mobile-Specific Components
```astro
---
// components/ui/MobileOptimized.astro
interface Props {
  component: 'navigation' | 'hero' | 'form' | 'card';
  class?: string;
}

const { component, class: className = '' } = Astro.props;
---

{component === 'navigation' && (
  <nav class={`mobile-nav ${className}`}>
    <!-- Mobile-optimized navigation -->
    <div class="mobile-nav-toggle" aria-label="Toggle navigation">
      <span></span>
      <span></span>
      <span></span>
    </div>
    
    <div class="mobile-nav-menu">
      <slot />
    </div>
  </nav>
)}

{component === 'hero' && (
  <section class={`mobile-hero ${className}`}>
    <div class="mobile-hero-content">
      <slot />
    </div>
  </section>
)}

{component === 'form' && (
  <form class={`mobile-form ${className}`}>
    <slot />
  </form>
)}

{component === 'card' && (
  <div class={`mobile-card ${className}`}>
    <slot />
  </div>
)}

<style>
/* Mobile Navigation */
.mobile-nav {
  position: relative;
}

.mobile-nav-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
}

.mobile-nav-toggle span {
  width: 100%;
  height: 2px;
  background: currentColor;
  transition: all 0.3s ease;
}

.mobile-nav-toggle.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-nav-toggle.open span:nth-child(2) {
  opacity: 0;
}

.mobile-nav-toggle.open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.mobile-nav-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  transform: translateY(-1rem);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-nav-menu.open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

@media (min-width: 768px) {
  .mobile-nav-toggle {
    display: none;
  }
  
  .mobile-nav-menu {
    position: static;
    transform: none;
    opacity: 1;
    visibility: visible;
    background: transparent;
    box-shadow: none;
    padding: 0;
  }
}

/* Mobile Hero */
.mobile-hero {
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

@media (min-width: 768px) {
  .mobile-hero {
    padding: 4rem 2rem;
    text-align: left;
  }
}

/* Mobile Form */
.mobile-form {
  padding: 1rem;
}

.mobile-form .form-group {
  margin-bottom: 1.5rem;
}

.mobile-form input,
.mobile-form textarea,
.mobile-form select {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

@media (min-width: 768px) {
  .mobile-form {
    padding: 2rem;
  }
  
  .mobile-form .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

/* Mobile Card */
.mobile-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .mobile-card {
    padding: 2rem;
    margin-bottom: 1.5rem;
  }
}
</style>
```

## Performance Optimization

### Responsive Images
```astro
---
// components/ui/ResponsiveImage.astro
interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  aspectRatio?: string;
  class?: string;
}

const {
  src,
  alt,
  width,
  height,
  sizes = '(min-width: 1024px) 50vw, (min-width: 768px) 75vw, 100vw',
  loading = 'lazy',
  priority = false,
  objectFit = 'cover',
  aspectRatio,
  class: className = '',
  ...rest
} = Astro.props;

// Generate responsive srcset
const generateSrcSet = (baseSrc: string, baseWidth: number) => {
  const widths = [320, 640, 768, 1024, 1280, 1536, 1920];
  return widths
    .filter(w => w <= baseWidth * 2) // Don't upscale too much
    .map(w => `${baseSrc}?w=${w}&q=80 ${w}w`)
    .join(', ');
};

const srcSet = generateSrcSet(src, width);
const optimizedSrc = `${src}?w=${width}&q=80`;
---

<picture class={`responsive-image ${className}`}>
  <!-- WebP format for modern browsers -->
  <source 
    srcset={srcSet.replace(/\.(jpg|jpeg|png)/g, '.webp')}
    sizes={sizes}
    type="image/webp"
  />
  
  <!-- Original format fallback -->
  <img
    src={optimizedSrc}
    srcset={srcSet}
    sizes={sizes}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? 'eager' : loading}
    decoding={priority ? 'sync' : 'async'}
    style={{
      objectFit,
      aspectRatio: aspectRatio || `${width} / ${height}`,
      width: '100%',
      height: 'auto'
    }}
    {...rest}
  />
</picture>

{priority && (
  <link rel="preload" as="image" href={optimizedSrc.replace(/\.(jpg|jpeg|png)/g, '.webp')} />
)}

<style>
.responsive-image {
  display: block;
  width: 100%;
  height: auto;
}

.responsive-image img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
```

### Conditional Loading
```typescript
// utils/conditionalLoading.ts
export class ConditionalLoader {
  private static instance: ConditionalLoader;
  private connectionType: string;
  private saveData: boolean;
  
  constructor() {
    this.checkConnection();
    this.setupListeners();
  }
  
  static getInstance(): ConditionalLoader {
    if (!ConditionalLoader.instance) {
      ConditionalLoader.instance = new ConditionalLoader();
    }
    return ConditionalLoader.instance;
  }
  
  private checkConnection() {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    this.connectionType = connection?.effectiveType || '4g';
    this.saveData = connection?.saveData || false;
  }
  
  private setupListeners() {
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', () => {
        this.checkConnection();
        this.adjustContent();
      });
    }
  }
  
  shouldLoadHiRes(): boolean {
    if (this.saveData) return false;
    return this.connectionType === '4g' || this.connectionType === '5g';
  }
  
  shouldLoadVideo(): boolean {
    if (this.saveData) return false;
    return this.connectionType !== 'slow-2g' && this.connectionType !== '2g';
  }
  
  shouldLoadAnimations(): boolean {
    if (this.saveData) return false;
    return this.connectionType !== 'slow-2g';
  }
  
  getImageQuality(): number {
    if (this.saveData) return 50;
    
    switch (this.connectionType) {
      case 'slow-2g':
      case '2g':
        return 60;
      case '3g':
        return 75;
      case '4g':
      case '5g':
      default:
        return 85;
    }
  }
  
  private adjustContent() {
    // Adjust existing content based on connection
    const images = document.querySelectorAll('img[data-adaptive]');
    images.forEach(img => this.adjustImage(img as HTMLImageElement));
    
    const videos = document.querySelectorAll('video[data-adaptive]');
    videos.forEach(video => this.adjustVideo(video as HTMLVideoElement));
  }
  
  private adjustImage(img: HTMLImageElement) {
    const baseSrc = img.dataset.src;
    if (!baseSrc) return;
    
    const quality = this.getImageQuality();
    const newSrc = `${baseSrc}?q=${quality}`;
    
    if (img.src !== newSrc) {
      img.src = newSrc;
    }
  }
  
  private adjustVideo(video: HTMLVideoElement) {
    if (!this.shouldLoadVideo()) {
      video.pause();
      video.style.display = 'none';
      
      // Show poster image instead
      const poster = video.poster;
      if (poster) {
        const img = document.createElement('img');
        img.src = poster;
        img.alt = 'Video thumbnail';
        video.parentNode?.insertBefore(img, video);
      }
    }
  }
}

export const conditionalLoader = ConditionalLoader.getInstance();
```

## Device-Specific Optimizations

### iOS Safari Fixes
```css
/* iOS Safari specific fixes */
@supports (-webkit-touch-callout: none) {
  /* iOS Safari viewport height fix */
  .min-h-screen {
    min-height: -webkit-fill-available;
  }
  
  /* Fix for iOS Safari bottom bar */
  .full-height {
    height: 100vh;
    height: -webkit-fill-available;
  }
  
  /* Fix for iOS Safari zoom on input focus */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="password"],
  textarea,
  select {
    font-size: 16px; /* Prevents zoom */
  }
  
  /* Fix for iOS Safari button styling */
  button,
  input[type="submit"],
  input[type="button"] {
    -webkit-appearance: none;
    border-radius: 0;
  }
  
  /* Fix for iOS Safari momentum scrolling */
  .scrollable {
    -webkit-overflow-scrolling: touch;
  }
}

/* Android Chrome fixes */
@media screen and (min-color-index: 0) and(-webkit-min-device-pixel-ratio: 0) {
  /* Android Chrome specific styles */
  .android-fix {
    /* Android-specific optimizations */
  }
}
```

### High DPI Display Support
```css
/* High DPI display optimizations */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  /* High DPI styles */
  .icon {
    background-image: url('icon@2x.png');
    background-size: 24px 24px;
  }
  
  /* Crisp borders on high DPI */
  .border-crisp {
    border-width: 0.5px;
  }
}

@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
  /* Very high DPI styles */
  .icon {
    background-image: url('icon@3x.png');
  }
}
```

## Testing Strategy

### Responsive Testing Tools
```javascript
// scripts/responsiveTest.js
const puppeteer = require('puppeteer');

const viewports = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'iPad', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
  { name: 'Desktop', width: 1280, height: 720 },
  { name: 'Large Desktop', width: 1920, height: 1080 }
];

async function testResponsiveDesign(url) {
  const browser = await puppeteer.launch();
  const results = [];
  
  for (const viewport of viewports) {
    const page = await browser.newPage();
    await page.setViewport(viewport);
    
    console.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
    
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Test layout shifts
    const layoutShifts = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
          resolve(cls);
        }).observe({ entryTypes: ['layout-shift'] });
        
        setTimeout(() => resolve(cls), 5000);
      });
    });
    
    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    // Check touch target sizes
    const touchTargets = await page.evaluate(() => {
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
      const smallTargets = [];
      
      interactiveElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          smallTargets.push({
            tag: el.tagName,
            width: rect.width,
            height: rect.height
          });
        }
      });
      
      return smallTargets;
    });
    
    // Take screenshot
    await page.screenshot({
      path: `screenshots/${viewport.name.replace(' ', '_')}.png`,
      fullPage: true
    });
    
    results.push({
      viewport: viewport.name,
      layoutShifts,
      hasHorizontalScroll,
      touchTargets,
      issues: [
        ...(layoutShifts > 0.1 ? ['High layout shift'] : []),
        ...(hasHorizontalScroll ? ['Horizontal scroll detected'] : []),
        ...(touchTargets.length > 0 ? [`${touchTargets.length} small touch targets`] : [])
      ]
    });
    
    await page.close();
  }
  
  await browser.close();
  
  // Generate report
  console.log('\n=== Responsive Design Test Results ===');
  results.forEach(result => {
    console.log(`\n${result.viewport}:`);
    console.log(`  Layout Shifts: ${result.layoutShifts.toFixed(3)}`);
    console.log(`  Horizontal Scroll: ${result.hasHorizontalScroll ? 'Yes' : 'No'}`);
    console.log(`  Touch Target Issues: ${result.touchTargets.length}`);
    
    if (result.issues.length > 0) {
      console.log(`  Issues: ${result.issues.join(', ')}`);
    } else {
      console.log('  ✓ No issues found');
    }
  });
  
  return results;
}

// Run tests
testResponsiveDesign('http://localhost:3000')
  .then(results => {
    const hasIssues = results.some(r => r.issues.length > 0);
    process.exit(hasIssues ? 1 : 0);
  })
  .catch(console.error);
```

### Cross-Device Testing Checklist
```markdown
# Responsive Design Testing Checklist

## Layout Testing
- [ ] All content is readable on smallest supported screen (320px)
- [ ] No horizontal scrolling on any breakpoint
- [ ] Content hierarchy makes sense at all sizes
- [ ] Navigation is accessible on all devices
- [ ] Images scale properly

## Touch Interface Testing
- [ ] All interactive elements are at least 44px × 44px
- [ ] Touch targets have adequate spacing (8px minimum)
- [ ] Gestures work as expected
- [ ] No hover-dependent functionality

## Typography Testing
- [ ] Text is readable at all sizes
- [ ] Font sizes scale appropriately
- [ ] Line heights remain optimal
- [ ] No text overflow or cutting

## Performance Testing
- [ ] Fast loading on 3G networks
- [ ] Appropriate image sizes served
- [ ] No unnecessary assets loaded on mobile
- [ ] Smooth scrolling and interactions

## Device-Specific Testing
- [ ] iOS Safari (iPhone and iPad)
- [ ] Android Chrome
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] High DPI displays
- [ ] Landscape and portrait orientations
```

This comprehensive responsive design system ensures the homepage works optimally across all devices and screen sizes while maintaining performance and usability. 