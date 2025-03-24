# Bomfather Static Frontend Implementation Guide

This guide provides step-by-step instructions for implementing the Bomfather static frontend website.

## Overview

Based on our evaluation, we recommend using **[Astro](https://astro.build/)** as the static site generator for the Bomfather website. Astro offers excellent performance, a great developer experience, and built-in support for markdown content, making it ideal for a documentation-heavy technical project.

## Quick Start

Follow these steps to get the Bomfather website up and running:

1. **Set up the project**

```bash
# Create a new Astro project
npm create astro@latest bomfather-website

# Navigate to the project directory
cd bomfather-website

# Install dependencies
npm install @astrojs/mdx @astrojs/image @astrojs/sitemap @astrojs/tailwind tailwindcss gsap
```

2. **Configure Astro**

Create or update `astro.config.mjs` with:

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://bomfather.bitbomdev.org', // Replace with actual domain
  integrations: [
    mdx(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    sitemap(),
    tailwind()
  ]
});
```

3. **Set up TailwindCSS**

Create a `tailwind.config.cjs` file:

```javascript
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
```

## Project Structure

Organize your project using this structure:

```
bomfather-website/
├── src/
│   ├── components/     # UI components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Page components
│   ├── content/        # Markdown content
│   └── styles/         # Global styles
├── public/             # Static assets
├── astro.config.mjs    # Astro configuration
└── package.json        # Dependencies
```

## Key Implementation Steps

### 1. Create Base Layout

Create a base layout in `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';

export interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <header class="bg-dark-blue text-white">
      <!-- Header content -->
    </header>
    
    <main>
      <slot />
    </main>
    
    <footer class="bg-dark-blue text-white">
      <!-- Footer content -->
    </footer>
  </body>
</html>
```

### 2. Create Homepage

Create the homepage in `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Features from '../components/Features.astro';
import HowItWorks from '../components/HowItWorks.astro';
import UseCases from '../components/UseCases.astro';
import CTA from '../components/CTA.astro';
---

<BaseLayout 
  title="Bomfather - Kernel-level dependency monitoring for software supply chains"
  description="Bomfather is an eBPF-based kernel-level monitoring framework for accurate identification of unknown, unused, and dynamically loaded dependencies in modern software supply chains."
>
  <Hero />
  <Features />
  <HowItWorks />
  <UseCases />
  <CTA />
</BaseLayout>
```

### 3. Create Required Components

Create key components like:

- `src/components/Hero.astro` - Main homepage hero section
- `src/components/Features.astro` - Feature cards section
- `src/components/HowItWorks.astro` - Process explanation
- `src/components/Button.astro` - Reusable button component
- `src/components/Header.astro` - Site navigation
- `src/components/Footer.astro` - Site footer

### 4. Set up Documentation

Create a documentation layout in `src/layouts/DocsLayout.astro` that includes a sidebar navigation.

Create documentation pages in `src/pages/docs/`:
- `index.astro` - Documentation home
- `getting-started.astro` - Getting started guide
- `configuration.astro` - Configuration guide
- Additional pages as needed

### 5. Set up Blog

Create a blog layout in `src/layouts/BlogLayout.astro`.

Set up blog pages:
- `src/pages/blog/index.astro` - Blog index
- `src/pages/blog/[slug].astro` - Dynamic blog post template

### 6. Implement Animations

Add GSAP animations to enhance user experience:

```javascript
// src/scripts/animations.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize animations
export function initAnimations() {
  // Merkle tree visualization animation
  gsap.timeline({
    scrollTrigger: {
      trigger: '.merkle-visualization',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
    }
  })
  .from('.node', { 
    opacity: 0, 
    y: 20, 
    stagger: 0.1 
  })
  .from('.connection', { 
    drawSVG: 0, 
    stagger: 0.05 
  });
}
```

## Deployment Steps

### 1. Build the site

```bash
npm run build
```

This will create a `dist` directory with the static site.

### 2. Deploy to Netlify

1. Push your code to a GitHub repository
2. Create a new site on Netlify
3. Connect to your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy the site

## Content Creation Checklist

Ensure you've created the following content:

- [ ] Homepage content
- [ ] Feature descriptions
- [ ] "How it works" explanation
- [ ] Documentation pages
- [ ] Blog posts (at least 2-3 initial posts)
- [ ] Solutions pages

## Testing Checklist

Before launching:

- [ ] Test responsive design on mobile, tablet, and desktop
- [ ] Check accessibility (contrast, keyboard navigation, alt text)
- [ ] Verify all links work correctly
- [ ] Test animations and interactive elements
- [ ] Run performance tests (Lighthouse)
- [ ] Verify SEO elements (meta tags, sitemap)

## Post-Launch Tasks

- Set up analytics to track website performance
- Create a content calendar for blog posts
- Establish a process for documentation updates
- Gather user feedback to improve the site

## Resources

- [Astro Documentation](https://docs.astro.build/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Netlify Documentation](https://docs.netlify.com/)

For detailed guidelines on design and content strategy, refer to:
- [Design System](design-system.md)
- [Content Strategy](content-strategy.md) 