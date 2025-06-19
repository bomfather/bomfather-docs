# Performance Optimization Deep Dive

## Overview

This document provides a comprehensive guide to optimizing performance for the new homepage, covering loading strategies, bundle optimization, image handling, caching strategies, and performance monitoring.

## Performance Strategy & Goals

### Core Performance Metrics
1. **First Contentful Paint (FCP)**: < 1.5 seconds
2. **Largest Contentful Paint (LCP)**: < 2.5 seconds
3. **First Input Delay (FID)**: < 100 milliseconds
4. **Cumulative Layout Shift (CLS)**: < 0.1
5. **Time to Interactive (TTI)**: < 3.5 seconds
6. **Total Blocking Time (TBT)**: < 300 milliseconds

### Performance Budget
- **JavaScript Bundle**: < 200KB (compressed)
- **CSS Bundle**: < 50KB (compressed)
- **Images**: WebP format, < 100KB each
- **Fonts**: < 100KB total
- **Third-party Scripts**: < 50KB

## Critical Path Optimization

### Critical CSS Strategy
```javascript
// vite.config.js - Critical CSS extraction
import { defineConfig } from 'vite';
import critical from 'critical';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/[name].[hash].css';
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  },
  plugins: [
    {
      name: 'critical-css',
      closeBundle: async () => {
        await critical.generate({
          inline: true,
          base: 'dist/',
          src: 'index.html',
          dest: 'index.html',
          width: 1300,
          height: 900,
          css: ['dist/assets/*.css'],
          ignore: {
            atrule: ['@font-face'],
            rule: [/\.non-critical/]
          }
        });
      }
    }
  ]
});
```

### Above-the-Fold CSS Inlining
```astro
---
// components/layouts/BaseLayout.astro
const criticalCSS = `
  /* Critical styles for above-the-fold content */
  :root {
    --color-primary: #0ea5e9;
    --color-text: #18181b;
    --font-family: 'Inter Variable', sans-serif;
  }
  
  body {
    font-family: var(--font-family);
    color: var(--color-text);
    margin: 0;
    line-height: 1.6;
  }
  
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hero-title {
    font-size: clamp(2rem, 4vw, 4rem);
    font-weight: 700;
    margin: 0 0 1rem 0;
  }
  
  .btn-primary {
    background: var(--color-primary);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s;
  }
`;
---

<html>
<head>
  <!-- Inline critical CSS -->
  <style set:html={criticalCSS}></style>
  
  <!-- Preload critical fonts -->
  <link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Load non-critical CSS asynchronously -->
  <link rel="preload" href="/assets/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/assets/main.css"></noscript>
  
  <!-- DNS prefetch for external resources -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//analytics.google.com">
</head>
<body>
  <slot />
</body>
</html>
```

## Bundle Optimization

### Code Splitting Strategy
```javascript
// vite.config.js - Advanced code splitting
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for stable dependencies
          vendor: ['astro', 'framer-motion'],
          
          // UI components chunk
          ui: [
            './src/components/ui/Button.astro',
            './src/components/ui/Card.astro',
            './src/components/ui/Modal.astro'
          ],
          
          // Animation-specific chunk
          animations: [
            './src/components/animations/FadeIn.tsx',
            './src/components/animations/SlideIn.tsx'
          ],
          
          // Utils chunk
          utils: [
            './src/utils/helpers.ts',
            './src/utils/analytics.ts'
          ]
        }
      }
    },
    
    // Optimize chunk loading
    chunkSizeWarningLimit: 1000,
    
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      }
    }
  }
});
```

### Dynamic Imports for Components
```typescript
// utils/lazyLoad.ts
export const lazyLoadComponent = async <T>(
  importFn: () => Promise<T>,
  fallback?: React.ComponentType
): Promise<T> => {
  try {
    return await importFn();
  } catch (error) {
    console.error('Failed to load component:', error);
    if (fallback) {
      return fallback as unknown as T;
    }
    throw error;
  }
};

// Usage in components
const LazyCodeBlock = lazy(() => lazyLoadComponent(
  () => import('./CodeBlock'),
  () => ({ default: () => <div>Loading code...</div> })
));

const ConditionalCodeBlock = ({ showCode, children }) => {
  if (!showCode) return children;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyCodeBlock>
        {children}
      </LazyCodeBlock>
    </Suspense>
  );
};
```

### Tree Shaking Optimization
```javascript
// Ensure proper tree shaking
// package.json
{
  "sideEffects": [
    "*.css",
    "*.scss",
    "./src/polyfills.ts"
  ]
}

// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    }
  }
});
```

## Image Optimization

### Responsive Image Implementation
```astro
---
// components/ui/OptimizedImage.astro
interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  class?: string;
}

const {
  src,
  alt,
  width,
  height,
  sizes = '(min-width: 768px) 50vw, 100vw',
  loading = 'lazy',
  priority = false,
  class: className = ''
} = Astro.props;

// Generate responsive image variants
const generateSrcSet = (baseSrc: string, baseWidth: number) => {
  const variants = [0.5, 0.75, 1, 1.5, 2];
  return variants
    .map(ratio => {
      const scaledWidth = Math.round(baseWidth * ratio);
      return `${baseSrc}?w=${scaledWidth}&q=80&f=webp ${scaledWidth}w`;
    })
    .join(', ');
};

const srcSet = generateSrcSet(src, width);
const fallbackSrc = `${src}?w=${width}&q=80&f=webp`;
---

<picture>
  <!-- WebP format for modern browsers -->
  <source 
    srcset={srcSet}
    sizes={sizes}
    type="image/webp"
  >
  
  <!-- Fallback JPEG for older browsers -->
  <source 
    srcset={generateSrcSet(src.replace(/\.(webp|png)$/, '.jpg'), width)}
    sizes={sizes}
    type="image/jpeg"
  >
  
  <!-- Main image element -->
  <img
    src={fallbackSrc}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? 'eager' : loading}
    decoding={priority ? 'sync' : 'async'}
    class={className}
    style={{ aspectRatio: `${width} / ${height}` }}
  />
</picture>

{priority && (
  <link rel="preload" href={fallbackSrc} as="image" type="image/webp">
)}
```

### Image Processing Pipeline
```javascript
// scripts/optimizeImages.js
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages(inputDir, outputDir) {
  const files = await fs.readdir(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const name = path.parse(file).name;
    const outputPath = path.join(outputDir, name);
    
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate multiple formats and sizes
    const variants = [
      { width: 480, suffix: '-sm' },
      { width: 768, suffix: '-md' },
      { width: 1024, suffix: '-lg' },
      { width: 1920, suffix: '-xl' }
    ];
    
    for (const variant of variants) {
      if (metadata.width >= variant.width) {
        // WebP format
        await image
          .resize(variant.width)
          .webp({ quality: 80 })
          .toFile(`${outputPath}${variant.suffix}.webp`);
        
        // JPEG fallback
        await image
          .resize(variant.width)
          .jpeg({ quality: 85 })
          .toFile(`${outputPath}${variant.suffix}.jpg`);
      }
    }
    
    console.log(`Optimized: ${file}`);
  }
}

// Run optimization
optimizeImages('./src/assets/images', './public/images')
  .then(() => console.log('Image optimization complete'))
  .catch(console.error);
```

### Lazy Loading with Intersection Observer
```typescript
// utils/lazyImages.ts
class LazyImageLoader {
  private observer: IntersectionObserver;
  private images: Set<HTMLImageElement> = new Set();
  
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );
  }
  
  observe(img: HTMLImageElement) {
    this.images.add(img);
    this.observer.observe(img);
  }
  
  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        this.loadImage(img);
        this.observer.unobserve(img);
        this.images.delete(img);
      }
    });
  }
  
  private async loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;
    
    if (!src) return;
    
    // Create a new image to preload
    const imageLoader = new Image();
    
    return new Promise((resolve, reject) => {
      imageLoader.onload = () => {
        // Apply loaded image attributes
        img.src = src;
        if (srcset) img.srcset = srcset;
        img.classList.remove('loading');
        img.classList.add('loaded');
        resolve(img);
      };
      
      imageLoader.onerror = reject;
      
      // Start loading
      if (srcset) imageLoader.srcset = srcset;
      imageLoader.src = src;
    });
  }
  
  disconnect() {
    this.observer.disconnect();
    this.images.clear();
  }
}

// Initialize lazy loading
export const lazyLoader = new LazyImageLoader();

// Auto-initialize for images with data-src
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => lazyLoader.observe(img as HTMLImageElement));
});
```

## Font Optimization

### Font Loading Strategy
```css
/* Optimized font loading */
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/inter-variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Fallback fonts with matching metrics */
.font-inter {
  font-family: 'Inter Variable', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Font loading optimization */
.font-loading {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Font Subsetting
```javascript
// scripts/subsetFonts.js
const fontkit = require('fontkit');
const fs = require('fs');

async function subsetFont(inputPath, outputPath, characters) {
  const font = fontkit.openSync(inputPath);
  const subset = font.createSubset();
  
  // Add characters used on the homepage
  for (const char of characters) {
    subset.includeGlyph(font.glyphForCodePoint(char.codePointAt(0)));
  }
  
  const buffer = subset.encode();
  fs.writeFileSync(outputPath, buffer);
}

// Characters commonly used on the homepage
const commonCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?;:()[]{}@#$%^&*-+=<>/"\'`~| ';

subsetFont(
  './src/assets/fonts/inter-variable.woff2',
  './public/fonts/inter-variable-subset.woff2',
  commonCharacters
);
```

## Caching Strategy

### Service Worker Implementation
```javascript
// public/sw.js
const CACHE_NAME = 'homepage-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

const STATIC_ASSETS = [
  '/',
  '/assets/main.css',
  '/assets/main.js',
  '/fonts/inter-variable.woff2',
  '/images/hero-bg.webp'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => 
            cacheName !== STATIC_CACHE && 
            cacheName !== DYNAMIC_CACHE
          )
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request)
          .then(response => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE)
                .then(cache => cache.put(request, responseClone));
            }
            
            return response;
          })
          .catch(() => {
            // Offline fallback
            if (request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});
```

### HTTP Caching Headers
```javascript
// netlify.toml or similar server configuration
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    Access-Control-Allow-Origin = "*"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/"
  [headers.values]
    Cache-Control = "public, max-age=300"
```

## Performance Monitoring

### Real User Monitoring (RUM)
```typescript
// utils/performanceMonitoring.ts
interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observer: PerformanceObserver;
  
  constructor() {
    this.setupObservers();
    this.measureTTFB();
  }
  
  private setupObservers() {
    // Observe paint metrics
    this.observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime;
            }
            break;
            
          case 'largest-contentful-paint':
            this.metrics.lcp = entry.startTime;
            break;
            
          case 'first-input':
            this.metrics.fid = entry.processingStart - entry.startTime;
            break;
            
          case 'layout-shift':
            if (!entry.hadRecentInput) {
              this.metrics.cls = (this.metrics.cls || 0) + entry.value;
            }
            break;
        }
      });
    });
    
    // Start observing
    try {
      this.observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance observer not supported:', error);
    }
  }
  
  private measureTTFB() {
    if ('navigation' in performance) {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
    }
  }
  
  public reportMetrics() {
    // Send metrics to analytics service
    if (typeof gtag !== 'undefined') {
      Object.entries(this.metrics).forEach(([metric, value]) => {
        gtag('event', 'performance_metric', {
          metric_name: metric,
          metric_value: Math.round(value),
          custom_map: { metric_id: metric }
        });
      });
    }
    
    // Send to custom analytics endpoint
    this.sendToAnalytics(this.metrics);
  }
  
  private async sendToAnalytics(metrics: Partial<PerformanceMetrics>) {
    try {
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent
        })
      });
    } catch (error) {
      console.warn('Failed to send performance metrics:', error);
    }
  }
  
  public disconnect() {
    this.observer?.disconnect();
  }
}

// Initialize monitoring
const performanceMonitor = new PerformanceMonitor();

// Report metrics when page is ready to be discarded
window.addEventListener('beforeunload', () => {
  performanceMonitor.reportMetrics();
});

// Report metrics after page is fully loaded
window.addEventListener('load', () => {
  setTimeout(() => performanceMonitor.reportMetrics(), 5000);
});
```

### Bundle Size Analysis
```javascript
// scripts/analyzeBundles.js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const fs = require('fs');

// Analyze bundle composition
function analyzeBundles(statsFile) {
  const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
  
  const analysis = {
    totalSize: 0,
    chunks: [],
    largestChunks: [],
    duplicatedModules: []
  };
  
  stats.chunks.forEach(chunk => {
    const chunkSize = chunk.size;
    analysis.totalSize += chunkSize;
    
    analysis.chunks.push({
      name: chunk.names[0] || chunk.id,
      size: chunkSize,
      modules: chunk.modules.length
    });
  });
  
  // Find largest chunks
  analysis.largestChunks = analysis.chunks
    .sort((a, b) => b.size - a.size)
    .slice(0, 5);
  
  // Find duplicated modules
  const moduleMap = new Map();
  stats.modules.forEach(module => {
    const name = module.name;
    if (moduleMap.has(name)) {
      analysis.duplicatedModules.push(name);
    } else {
      moduleMap.set(name, true);
    }
  });
  
  return analysis;
}

// Generate performance report
function generateReport(analysis) {
  console.log('=== Bundle Analysis Report ===');
  console.log(`Total bundle size: ${(analysis.totalSize / 1024).toFixed(2)} KB`);
  console.log('\nLargest chunks:');
  analysis.largestChunks.forEach(chunk => {
    console.log(`  ${chunk.name}: ${(chunk.size / 1024).toFixed(2)} KB`);
  });
  
  if (analysis.duplicatedModules.length > 0) {
    console.log('\nDuplicated modules:');
    analysis.duplicatedModules.forEach(module => {
      console.log(`  ${module}`);
    });
  }
  
  // Performance recommendations
  console.log('\n=== Recommendations ===');
  if (analysis.totalSize > 200 * 1024) {
    console.log('⚠️  Bundle size exceeds 200KB threshold');
  }
  
  if (analysis.duplicatedModules.length > 0) {
    console.log('⚠️  Found duplicated modules - consider code splitting');
  }
  
  analysis.largestChunks.forEach(chunk => {
    if (chunk.size > 100 * 1024) {
      console.log(`⚠️  Large chunk detected: ${chunk.name} (${(chunk.size / 1024).toFixed(2)} KB)`);
    }
  });
}

// Run analysis
if (process.argv[2]) {
  const analysis = analyzeBundles(process.argv[2]);
  generateReport(analysis);
} else {
  console.error('Please provide path to webpack stats file');
}
```

## Performance Testing Automation

### Lighthouse CI Configuration
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'npm run preview',
      numberOfRuns: 5
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

### Performance Testing Script
```javascript
// scripts/performanceTest.js
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

async function runPerformanceTest(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set network conditions
    await page.emulateNetworkConditions({
      offline: false,
      downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
      uploadThroughput: 750 * 1024 / 8, // 750 Kbps
      latency: 40 // 40ms
    });
    
    // Set CPU throttling
    await page.evaluateOnNewDocument(() => {
      // Simulate slower CPU
      const slowDownFactor = 4;
      const originalSetTimeout = window.setTimeout;
      window.setTimeout = function(fn, delay) {
        return originalSetTimeout(fn, delay * slowDownFactor);
      };
    });
    
    // Navigate and measure
    const startTime = Date.now();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const loadTime = Date.now() - startTime;
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
      };
    });
    
    // Run Lighthouse audit
    const { lhr } = await lighthouse(url, {
      port: new URL(browser.wsEndpoint()).port,
      output: 'json',
      logLevel: 'info'
    });
    
    return {
      loadTime,
      metrics,
      lighthouse: {
        performance: lhr.categories.performance.score * 100,
        fcp: lhr.audits['first-contentful-paint'].numericValue,
        lcp: lhr.audits['largest-contentful-paint'].numericValue,
        cls: lhr.audits['cumulative-layout-shift'].numericValue,
        tbt: lhr.audits['total-blocking-time'].numericValue
      }
    };
  } finally {
    await browser.close();
  }
}

// Run test and generate report
async function main() {
  const url = process.argv[2] || 'http://localhost:3000';
  console.log(`Running performance test for: ${url}`);
  
  try {
    const results = await runPerformanceTest(url);
    
    console.log('\n=== Performance Test Results ===');
    console.log(`Load Time: ${results.loadTime}ms`);
    console.log(`First Contentful Paint: ${results.metrics.firstContentfulPaint.toFixed(2)}ms`);
    console.log(`DOM Content Loaded: ${results.metrics.domContentLoaded.toFixed(2)}ms`);
    console.log(`Lighthouse Performance Score: ${results.lighthouse.performance}`);
    console.log(`Largest Contentful Paint: ${results.lighthouse.lcp.toFixed(2)}ms`);
    console.log(`Cumulative Layout Shift: ${results.lighthouse.cls.toFixed(3)}`);
    console.log(`Total Blocking Time: ${results.lighthouse.tbt.toFixed(2)}ms`);
    
    // Check if metrics meet targets
    const passed = 
      results.lighthouse.performance >= 90 &&
      results.lighthouse.fcp <= 1500 &&
      results.lighthouse.lcp <= 2500 &&
      results.lighthouse.cls <= 0.1 &&
      results.lighthouse.tbt <= 300;
    
    console.log(`\n=== Test ${passed ? 'PASSED' : 'FAILED'} ===`);
    
    if (!passed) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Performance test failed:', error);
    process.exit(1);
  }
}

main();
```

This comprehensive performance optimization strategy ensures the homepage loads quickly and provides an excellent user experience across all devices and network conditions. 