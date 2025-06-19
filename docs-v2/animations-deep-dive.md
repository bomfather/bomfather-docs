# Animation Implementation Deep Dive

## Overview

This document provides a comprehensive guide to implementing animations for the new homepage, covering tool selection, animation types, performance considerations, and detailed implementation strategies.

## Animation Strategy & Philosophy

### Core Principles
1. **Performance First**: All animations must maintain 60fps
2. **Purposeful Motion**: Every animation serves a functional purpose
3. **Accessibility**: Respect `prefers-reduced-motion` settings
4. **Progressive Enhancement**: Core functionality works without animations
5. **Brand Consistency**: Motion design aligns with brand personality

### Animation Hierarchy
1. **Micro-interactions**: Button hovers, form feedback, loading states
2. **Transitions**: Page sections, content reveals, state changes
3. **Scroll-triggered**: Elements appearing as user scrolls
4. **Hero animations**: Main focal point animations
5. **Background motion**: Subtle ambient animations

## Technology Stack

### Primary Animation Library: Framer Motion
**Why Framer Motion:**
- Declarative API perfect for React/Astro components
- Excellent performance with hardware acceleration
- Built-in scroll triggers and viewport detection
- Gesture support for interactive elements
- Server-side rendering compatibility
- Small bundle size when tree-shaken

**Installation:**
```bash
npm install framer-motion
```

### Secondary: CSS Animations
**For simple animations:**
- Transform-based animations
- Loading spinners
- Simple hover effects
- Keyframe animations

### Utility: GSAP (if needed)
**For complex scenarios:**
- Complex timeline sequences
- SVG path animations
- Advanced scroll-triggered animations
- Physics-based animations

## Animation Types & Implementation

### 1. Entrance Animations

#### Fade In Up
```typescript
// components/animations/FadeInUp.tsx
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

export const FadeInUp = ({ children, delay = 0 }) => (
  <motion.div
    initial="initial"
    animate="animate"
    variants={fadeInUp}
    transition={{ ...fadeInUp.transition, delay }}
  >
    {children}
  </motion.div>
);
```

#### Stagger Children
```typescript
// For feature grids and lists
const container = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 }
};

export const StaggerGrid = ({ children }) => (
  <motion.div
    variants={container}
    initial="initial"
    animate="animate"
  >
    {children.map((child, index) => (
      <motion.div key={index} variants={item}>
        {child}
      </motion.div>
    ))}
  </motion.div>
);
```

### 2. Scroll-Triggered Animations

#### Intersection Observer + Framer Motion
```typescript
// hooks/useScrollAnimation.ts
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimation = (threshold = 0.1, triggerOnce = true) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: triggerOnce });
  
  return { ref, isInView };
};

// Usage in component
const ScrollReveal = ({ children }) => {
  const { ref, isInView } = useScrollAnimation();
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
```

#### Parallax Scrolling
```typescript
// components/animations/ParallaxSection.tsx
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxSection = ({ children, speed = 0.5 }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);
  
  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
};
```

### 3. Interactive Animations

#### Button Hover Effects
```css
/* CSS for simple hover effects */
.btn-primary {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
```

#### Card Interactions
```typescript
// components/ui/InteractiveCard.tsx
const cardVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -10 },
  tap: { scale: 0.95 }
};

export const InteractiveCard = ({ children }) => (
  <motion.div
    variants={cardVariants}
    initial="rest"
    whileHover="hover"
    whileTap="tap"
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.div>
);
```

### 4. Code Block Animations

#### Typing Effect
```typescript
// components/animations/TypeWriter.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TypeWriter = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);
  
  return (
    <div className="font-mono">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 h-5 bg-current ml-1"
      />
    </div>
  );
};
```

#### Syntax Highlighting Animation
```typescript
// Animate code appearing line by line
const codeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

export const AnimatedCodeBlock = ({ lines }) => (
  <pre className="code-block">
    {lines.map((line, index) => (
      <motion.div
        key={index}
        custom={index}
        variants={codeVariants}
        initial="hidden"
        animate="visible"
      >
        <code>{line}</code>
      </motion.div>
    ))}
  </pre>
);
```

### 5. Hero Section Animations

#### Floating Elements
```typescript
// components/animations/FloatingElement.tsx
const floating = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={floating}
    transition={{ ...floating.transition, delay }}
  >
    {children}
  </motion.div>
);
```

#### Gradient Animation
```css
/* Animated gradient backgrounds */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}
```

## Performance Optimization

### Hardware Acceleration
```css
/* Force GPU acceleration */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform, opacity;
}

/* Remove will-change after animation */
.animation-complete {
  will-change: auto;
}
```

### Efficient Animation Properties
**Prefer animating:**
- `transform` (translate, scale, rotate)
- `opacity`
- `filter`

**Avoid animating:**
- `width`, `height` (use `transform: scale()`)
- `top`, `left` (use `transform: translate()`)
- `background-position` (use `transform`)

### Animation Performance Monitor
```typescript
// utils/animationMonitor.ts
export const monitorAnimationPerformance = () => {
  let startTime = performance.now();
  let frameCount = 0;
  
  function countFrames() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - startTime >= 1000) {
      const fps = frameCount;
      console.log(`Animation FPS: ${fps}`);
      
      if (fps < 55) {
        console.warn('Animation performance below 55fps');
      }
      
      frameCount = 0;
      startTime = currentTime;
    }
    
    requestAnimationFrame(countFrames);
  }
  
  requestAnimationFrame(countFrames);
};
```

## Accessibility Implementation

### Reduced Motion Support
```typescript
// hooks/useReducedMotion.ts
import { useState, useEffect } from 'react';

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addListener(handleChange);
    
    return () => mediaQuery.removeListener(handleChange);
  }, []);
  
  return prefersReducedMotion;
};

// Usage in components
const ResponsiveAnimation = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  
  const animationProps = prefersReducedMotion 
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } };
  
  return (
    <motion.div {...animationProps}>
      {children}
    </motion.div>
  );
};
```

### Focus Management
```typescript
// Ensure animations don't interfere with focus
const AccessibleAnimation = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0 } : {}}
      animate={{ opacity: 1 }}
      transition={!prefersReducedMotion ? { duration: 0.5 } : { duration: 0 }}
      onAnimationComplete={() => {
        // Ensure focus is visible after animation
        const focusedElement = document.activeElement;
        if (focusedElement) {
          focusedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }}
    >
      {children}
    </motion.div>
  );
};
```

## Specific Section Animations

### Hero Section
```typescript
const heroAnimations = {
  title: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.2 }
  },
  subtitle: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.4 }
  },
  cta: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, delay: 0.6 }
  },
  metrics: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, delay: 0.8, staggerChildren: 0.1 }
  }
};
```

### Features Grid
```typescript
const featuresAnimations = {
  container: {
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  },
  item: {
    initial: { opacity: 0, y: 60, scale: 0.8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  }
};
```

### Code Demonstration
```typescript
const codeAnimations = {
  container: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  },
  lines: {
    initial: { opacity: 0, x: -20 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  }
};
```

## Animation Testing & Debugging

### Performance Testing
```typescript
// Test animation performance
const testAnimationPerformance = async (animationElement) => {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.entryType === 'measure') {
        console.log(`Animation duration: ${entry.duration}ms`);
      }
    });
  });
  
  observer.observe({ entryTypes: ['measure'] });
  
  performance.mark('animation-start');
  // Trigger animation
  await new Promise(resolve => setTimeout(resolve, 1000));
  performance.mark('animation-end');
  performance.measure('animation-duration', 'animation-start', 'animation-end');
};
```

### Visual Debugging
```css
/* Debug animation bounds */
.debug-animations * {
  outline: 1px solid rgba(255, 0, 0, 0.3) !important;
}

.debug-animations [data-animated] {
  outline: 2px solid rgba(0, 255, 0, 0.5) !important;
}
```

## Implementation Timeline

### Phase 1: Foundation (Days 1-2)
- Set up Framer Motion
- Create base animation components
- Implement reduced motion support
- Set up performance monitoring

### Phase 2: Core Animations (Days 3-5)
- Hero section animations
- Scroll-triggered reveals
- Button interactions
- Basic transitions

### Phase 3: Advanced Effects (Days 6-7)
- Code block animations
- Parallax effects
- Complex hover states
- Loading animations

### Phase 4: Optimization (Days 8-9)
- Performance testing
- Accessibility testing
- Cross-browser testing
- Animation refinement

## Bundle Size Considerations

### Tree Shaking Configuration
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      external: ['framer-motion'],
      output: {
        manualChunks: {
          'animations': ['framer-motion']
        }
      }
    }
  }
};
```

### Lazy Loading Animations
```typescript
// Lazy load complex animations
const ComplexAnimation = lazy(() => import('./ComplexAnimation'));

const ConditionalAnimation = ({ shouldAnimate, children }) => {
  if (!shouldAnimate) return children;
  
  return (
    <Suspense fallback={children}>
      <ComplexAnimation>
        {children}
      </ComplexAnimation>
    </Suspense>
  );
};
```

This comprehensive animation strategy ensures smooth, purposeful, and accessible motion design that enhances the user experience without compromising performance. 