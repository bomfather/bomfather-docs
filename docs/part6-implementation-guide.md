# Bomfather Static Frontend: Implementation Guide

## Overview

This guide provides practical steps for implementing the Bomfather static frontend based on the recommendations in the previous documents. It covers setup, development workflow, key implementation considerations, and deployment.

## Prerequisites

Before starting implementation, ensure you have:

- Node.js (v18 or later)
- npm, Yarn, or pnpm package manager
- Git for version control
- A code editor (VS Code recommended)
- Basic knowledge of HTML, CSS, and JavaScript
- Familiarity with Astro and TailwindCSS (helpful but not required)

## Project Setup

### 1. Initialize Astro Project

Create a new Astro project with the following command:

```bash
# Using npm
npm create astro@latest bomfather-website

# Using yarn
yarn create astro bomfather-website

# Using pnpm
pnpm create astro bomfather-website
```

When prompted, choose:
- Empty project
- Install dependencies: Yes
- TypeScript: Yes (strict)
- Initialize git repository: Yes

### 2. Install Key Dependencies

Navigate to the project directory and install required dependencies:

```bash
cd bomfather-website

# Core dependencies
npm install @astrojs/tailwind @astrojs/mdx @astrojs/sitemap gsap d3 

# Development dependencies
npm install -D tailwindcss @tailwindcss/typography postcss autoprefixer prettier prettier-plugin-astro
```

### 3. Configure TailwindCSS

Create or update the following configuration files:

**tailwind.config.mjs**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          500: '#0B5FFF', // Primary blue
          600: '#0A4CCC', // Darker for hover states
        },
        'secondary': {
          500: '#224BC5', // Secondary blue
        },
        'dark-blue': {
          500: '#0A2463', // Dark blue
        },
        'dark': '#121212',
        'mid-gray': '#505050',
        'light-gray': '#F3F4F6',
        'accent-green': '#45C4B0',
        'accent-orange': '#FF6B35',
        'accent-red': '#E63946',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Manrope', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

**astro.config.mjs**
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bomfather.org', // Update with your actual domain
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
});
```

### 4. Set Up Project Structure

Create the following directory structure:

```
bomfather-website/
├── public/
│   ├── favicon.svg
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   ├── docs/
│   │   └── solutions/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── DocLayout.astro
│   │   └── BlogLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── solutions/
│   │   ├── docs/
│   │   ├── blog/
│   │   └── about/
│   ├── content/
│   │   ├── docs/
│   │   └── blog/
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── helpers.js
└── package.json
```

## Key Components Implementation

### 1. Base Layout

Create a base layout component at `src/layouts/BaseLayout.astro`:

```astro
---
// BaseLayout.astro
import '../styles/global.css';

export interface Props {
  title: string;
  description: string;
  image?: string;
}

const { title, description, image = '/images/default-social.jpg' } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <meta name="description" content={description} />
    <title>{title} | Bomfather</title>
    
    <!-- Preload fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-white text-dark">
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <!-- Header implementation will go here -->
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <a href="/" class="text-xl font-bold text-dark-blue-500">Bomfather</a>
        </div>
        <!-- Navigation will go here -->
      </nav>
    </header>
    
    <main>
      <slot />
    </main>
    
    <footer class="bg-dark-blue-500 text-white py-12">
      <!-- Footer implementation will go here -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center">© {new Date().getFullYear()} Bomfather</p>
      </div>
    </footer>
  </body>
</html>
```

### 2. Homepage Implementation

Create the homepage at `src/pages/index.astro`:

```astro
---
// index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout 
  title="Kernel-level Truth in Software Supply Chains"
  description="Bomfather is an eBPF-based kernel-level monitoring framework for accurate dependency tracking in software supply chains."
>
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-dark-blue-500 to-primary-500 text-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl md:text-5xl font-bold font-heading mb-6">
        Kernel-level Truth in Software Supply Chains
      </h1>
      <p class="text-xl md:text-2xl mb-8 max-w-3xl">
        Build tamper-evident software with accurate, kernel-level dependency tracking
      </p>
      <div class="flex flex-wrap gap-4">
        <a href="/docs/getting-started" class="bg-white text-primary-500 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition">
          Get Started
        </a>
        <a href="https://github.com/bitbomdev/bomfather" class="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition">
          View on GitHub
        </a>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-16 bg-light-gray">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold font-heading text-center mb-12">Key Features</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-bold mb-3">Kernel-Level Monitoring</h3>
          <p>Track dependencies directly at the kernel level using eBPF, ensuring complete visibility.</p>
        </div>
        
        <!-- Feature 2 -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-bold mb-3">Tamper-Evident Verification</h3>
          <p>Verify the integrity of your software supply chain with cryptographic merkle trees.</p>
        </div>
        
        <!-- Feature 3 -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-bold mb-3">Seamless Integration</h3>
          <p>Easily integrate with existing CI/CD pipelines and build systems.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold font-heading mb-6">Ready to secure your supply chain?</h2>
      <p class="text-lg mb-8 max-w-2xl mx-auto">Get started with Bomfather today and ensure the integrity of your software dependencies.</p>
      <a href="/docs/getting-started" class="bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition">
        Get Started
      </a>
    </div>
  </section>
</BaseLayout>
```

## Documentation Implementation

### 1. Documentation Layout

Create a documentation-specific layout at `src/layouts/DocLayout.astro`:

```astro
---
// DocLayout.astro
import BaseLayout from './BaseLayout.astro';

export interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="lg:grid lg:grid-cols-12 lg:gap-8">
      <!-- Sidebar -->
      <div class="hidden lg:block lg:col-span-3">
        <nav class="sticky top-24 divide-y divide-gray-200">
          <div class="pb-4">
            <h3 class="font-medium text-gray-900">Getting Started</h3>
            <ul class="mt-2 space-y-2">
              <li>
                <a href="/docs/getting-started" class="text-gray-600 hover:text-gray-900">Introduction</a>
              </li>
              <li>
                <a href="/docs/getting-started/installation" class="text-gray-600 hover:text-gray-900">Installation</a>
              </li>
            </ul>
          </div>
          <div class="pt-4 pb-4">
            <h3 class="font-medium text-gray-900">Concepts</h3>
            <ul class="mt-2 space-y-2">
              <li>
                <a href="/docs/concepts" class="text-gray-600 hover:text-gray-900">Overview</a>
              </li>
              <li>
                <a href="/docs/concepts/ebpf" class="text-gray-600 hover:text-gray-900">eBPF Primer</a>
              </li>
            </ul>
          </div>
          <!-- Add more documentation categories as needed -->
        </nav>
      </div>
      
      <!-- Content -->
      <div class="lg:col-span-9 prose prose-lg max-w-none">
        <h1>{title}</h1>
        <slot />
      </div>
    </div>
  </div>
</BaseLayout>
```

### 2. MDX Content Configuration

To properly handle MDX content, create a configuration at `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    updatedDate: z.date().optional(),
  }),
});

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'docs': docsCollection,
  'blog': blogCollection,
};
```

## Implementing Key Pages

For each of the key pages outlined in the site structure, create corresponding Astro pages in the `src/pages` directory. Use the layouts created earlier and implement components as needed.

## Animations with GSAP

For interactive elements like the Merkle tree visualization, implement GSAP animations:

```astro
---
// Example component: src/components/home/MerkleTreeVisualization.astro
---

<div id="merkle-tree" class="w-full h-96 bg-white rounded-lg shadow-sm p-4">
  <!-- SVG container for the visualization -->
  <svg class="w-full h-full" id="merkle-svg"></svg>
</div>

<script>
  import { gsap } from 'gsap';
  import * as d3 from 'd3';

  // Setup tree data structure
  const treeData = {
    name: "Root Hash",
    children: [
      {
        name: "Hash 1",
        children: [
          { name: "Leaf A" },
          { name: "Leaf B" }
        ]
      },
      {
        name: "Hash 2",
        children: [
          { name: "Leaf C" },
          { name: "Leaf D" }
        ]
      }
    ]
  };

  // Create the tree layout using D3
  const width = document.getElementById('merkle-svg').clientWidth;
  const height = document.getElementById('merkle-svg').clientHeight;
  
  const tree = d3.tree().size([width - 40, height - 40]);
  const root = d3.hierarchy(treeData);
  const nodes = tree(root);
  
  const svg = d3.select('#merkle-svg')
    .append('g')
    .attr('transform', 'translate(20,20)');
  
  // Draw links between nodes
  svg.selectAll('.link')
    .data(nodes.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#0B5FFF')
    .attr('stroke-width', 2)
    .attr('d', d3.linkVertical()
      .x(d => d.x)
      .y(d => d.y)
    );
  
  // Draw nodes
  const node = svg.selectAll('.node')
    .data(nodes.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`);
  
  // Add circles to nodes
  node.append('circle')
    .attr('r', 10)
    .attr('fill', d => d.children ? '#0A2463' : '#45C4B0');
  
  // Add labels to nodes
  node.append('text')
    .attr('dy', '0.35em')
    .attr('y', d => d.children ? -20 : 20)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .text(d => d.data.name);
  
  // Animate with GSAP
  document.addEventListener('DOMContentLoaded', () => {
    // Animate nodes appearing
    gsap.from('#merkle-svg circle', {
      scale: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'back.out',
    });
    
    // Animate links drawing
    gsap.from('#merkle-svg .link', {
      strokeDasharray: 100,
      strokeDashoffset: 100,
      duration: 1,
      stagger: 0.1,
    });
    
    // Animate text appearing
    gsap.from('#merkle-svg text', {
      opacity: 0,
      y: 10,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.5,
    });
  });
</script>
```

## Deployment

### Netlify Deployment

For simple GitHub integration and automated deployments:

1. Create a `netlify.toml` file in the project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404
```

2. Connect your GitHub repository to Netlify:
   - Create a Netlify account
   - Click "New site from Git"
   - Select your GitHub repository
   - Configure build settings (should be auto-detected)
   - Click "Deploy site"

### Custom Domain Setup

In Netlify dashboard:
1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to set up DNS records

## Next Steps and Maintenance

After initial implementation:

1. **Content creation**: Begin populating the site with content based on the content strategy
2. **Testing**: Test the site on various devices and browsers
3. **Performance optimization**: Use Lighthouse to identify and address performance issues
4. **Analytics setup**: Add analytics to track user behavior
5. **Continuous improvement**: Regularly update content and improve the site based on user feedback

## Conclusion

This implementation guide provides a foundation for building the Bomfather static frontend. As the project evolves, continue to refine the design, content, and functionality based on user needs and project goals.

The key to success lies in maintaining a balance between technical excellence, user experience, and content quality. Regular updates and improvements will ensure the site remains effective in communicating Bomfather's value proposition and supporting its community.

## Next Steps

The next document, [Deployment Guide](part7-deployment.md), provides detailed information about deploying the Bomfather static frontend to various platforms, optimizing performance, implementing security measures, and maintaining the site over time. 