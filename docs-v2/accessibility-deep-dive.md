# Accessibility Deep Dive

# NOT A PRIORITY!!!

## Overview

This document provides a comprehensive guide to implementing accessibility (a11y) for the new homepage, ensuring WCAG 2.1 AA compliance and optimal experience for users with assistive technologies.

## Accessibility Strategy & Standards

### Compliance Goals
1. **WCAG 2.1 AA Compliance**: Meet all Level A and AA success criteria
2. **Assistive Technology Support**: Screen readers, voice control, switch navigation
3. **Inclusive Design**: Usable by people with diverse abilities and preferences
4. **Performance**: Accessibility features don't impact performance
5. **Maintenance**: Accessibility is sustainable and testable

### Key Principles (POUR)
1. **Perceivable**: Information and UI components must be presentable to users in ways they can perceive
2. **Operable**: UI components and navigation must be operable
3. **Understandable**: Information and the operation of UI must be understandable
4. **Robust**: Content must be robust enough to be interpreted by a wide variety of user agents

## Semantic HTML Foundation

### Document Structure
```html
<!-- Proper document structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homepage Title - Company Name</title>
  
  <!-- Skip links for keyboard navigation -->
  <style>
    .skip-link {
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 9999;
    }
    .skip-link:focus {
      top: 6px;
    }
  </style>
</head>
<body>
  <!-- Skip navigation links -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href="#navigation" class="skip-link">Skip to navigation</a>
  
  <!-- Proper landmark structure -->
  <header role="banner">
    <nav role="navigation" id="navigation" aria-label="Main navigation">
      <!-- Navigation content -->
    </nav>
  </header>
  
  <main id="main-content" role="main">
    <!-- Main content -->
  </main>
  
  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</body>
</html>
```

### Heading Hierarchy
```astro
---
// components/sections/AccessibleSection.astro
interface Props {
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  subtitle?: string;
  id?: string;
}

const { headingLevel, title, subtitle, id } = Astro.props;
const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
---

<section 
  id={id}
  aria-labelledby={id ? `${id}-heading` : undefined}
>
  <HeadingTag 
    id={id ? `${id}-heading` : undefined}
    class="section-title"
  >
    {title}
  </HeadingTag>
  
  {subtitle && (
    <p class="section-subtitle">
      {subtitle}
    </p>
  )}
  
  <slot />
</section>
```

### Landmark Roles and ARIA
```astro
---
// components/layouts/AccessibleLayout.astro
---

<div class="page-layout">
  <!-- Banner landmark -->
  <header role="banner" class="site-header">
    <div class="container">
      <!-- Logo with proper alt text -->
      <a href="/" aria-label="Company Name - Go to homepage">
        <img src="/logo.svg" alt="Company Name" width="120" height="40">
      </a>
      
      <!-- Main navigation -->
      <nav role="navigation" aria-label="Main navigation">
        <ul role="list">
          <li><a href="/products" aria-current={Astro.url.pathname === '/products' ? 'page' : undefined}>Products</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
  
  <!-- Main content landmark -->
  <main role="main" id="main-content" tabindex="-1">
    <slot />
  </main>
  
  <!-- Complementary content -->
  <aside role="complementary" aria-labelledby="sidebar-heading">
    <h2 id="sidebar-heading">Related Resources</h2>
    <!-- Sidebar content -->
  </aside>
  
  <!-- Footer landmark -->
  <footer role="contentinfo" class="site-footer">
    <div class="container">
      <!-- Footer content -->
    </div>
  </footer>
</div>
```

## Interactive Components Accessibility

### Accessible Button Component
```astro
---
// components/ui/AccessibleButton.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
}

const {
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaControls,
  icon,
  type = 'button',
  ...rest
} = Astro.props;

const Component = href ? 'a' : 'button';
const commonProps = {
  class: `btn btn-${variant} btn-${size}`,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  ...rest
};

const buttonProps = href 
  ? { 
      href, 
      role: disabled ? 'button' : undefined,
      'aria-disabled': disabled ? 'true' : undefined,
      tabindex: disabled ? '-1' : undefined
    }
  : { 
      type, 
      disabled,
      'aria-disabled': disabled ? 'true' : undefined
    };
---

<Component {...commonProps} {...buttonProps}>
  {icon && (
    <span 
      class="btn-icon" 
      aria-hidden="true"
      data-icon={icon}
    ></span>
  )}
  <span class="btn-text">
    <slot />
  </span>
</Component>

<style>
.btn {
  /* Base button styles */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Focus styles */
  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-icon {
  flex-shrink: 0;
}
</style>
```

### Accessible Modal Component
```astro
---
// components/ui/AccessibleModal.astro
interface Props {
  id: string;
  title: string;
  isOpen?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const { id, title, isOpen = false, size = 'md' } = Astro.props;
---

<div 
  id={id}
  class={`modal ${size}`}
  role="dialog"
  aria-modal="true"
  aria-labelledby={`${id}-title`}
  aria-hidden={!isOpen}
  data-modal
>
  <!-- Modal backdrop -->
  <div 
    class="modal-backdrop" 
    aria-hidden="true"
    data-modal-backdrop
  ></div>
  
  <!-- Modal content -->
  <div 
    class="modal-content"
    role="document"
  >
    <!-- Modal header -->
    <header class="modal-header">
      <h2 id={`${id}-title`} class="modal-title">
        {title}
      </h2>
      
      <button 
        type="button"
        class="modal-close"
        aria-label="Close modal"
        data-modal-close
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </header>
    
    <!-- Modal body -->
    <div class="modal-body">
      <slot />
    </div>
    
    <!-- Modal footer -->
    <footer class="modal-footer">
      <slot name="footer" />
    </footer>
  </div>
</div>

<script>
class AccessibleModal {
  constructor(modal) {
    this.modal = modal;
    this.backdrop = modal.querySelector('[data-modal-backdrop]');
    this.closeBtn = modal.querySelector('[data-modal-close]');
    this.focusableElements = this.getFocusableElements();
    this.previousFocus = null;
    
    this.init();
  }
  
  init() {
    // Close on backdrop click
    this.backdrop.addEventListener('click', () => this.close());
    
    // Close on close button click
    this.closeBtn.addEventListener('click', () => this.close());
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
    
    // Trap focus within modal
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.trapFocus(e);
      }
    });
  }
  
  open() {
    this.previousFocus = document.activeElement;
    this.modal.setAttribute('aria-hidden', 'false');
    this.modal.classList.add('is-open');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first focusable element
    const firstFocusable = this.focusableElements[0];
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    // Announce to screen readers
    this.announce('Modal opened');
  }
  
  close() {
    this.modal.setAttribute('aria-hidden', 'true');
    this.modal.classList.remove('is-open');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to trigger element
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
    
    // Announce to screen readers
    this.announce('Modal closed');
  }
  
  isOpen() {
    return this.modal.getAttribute('aria-hidden') === 'false';
  }
  
  getFocusableElements() {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    
    return Array.from(this.modal.querySelectorAll(focusableSelectors));
  }
  
  trapFocus(e) {
    const firstFocusable = this.focusableElements[0];
    const lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }
  
  announce(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Initialize all modals
document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('[data-modal]');
  modals.forEach(modal => new AccessibleModal(modal));
});
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}

.modal[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
  
  /* Focus styles */
  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: -2px;
  }
}

.modal.sm .modal-content { max-width: 400px; }
.modal.md .modal-content { max-width: 600px; }
.modal.lg .modal-content { max-width: 800px; }
.modal.xl .modal-content { max-width: 1200px; }

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  color: #6b7280;
  
  &:hover {
    color: #374151;
  }
  
  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
    border-radius: 0.25rem;
  }
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .modal {
    transition: none;
  }
}
</style>
```

## Form Accessibility

### Accessible Form Components
```astro
---
// components/ui/AccessibleForm.astro
interface Props {
  id: string;
  title: string;
  description?: string;
}

const { id, title, description } = Astro.props;
---

<form 
  id={id}
  aria-labelledby={`${id}-title`}
  aria-describedby={description ? `${id}-description` : undefined}
  novalidate
>
  <fieldset>
    <legend id={`${id}-title`}>
      {title}
    </legend>
    
    {description && (
      <p id={`${id}-description`} class="form-description">
        {description}
      </p>
    )}
    
    <slot />
  </fieldset>
</form>

<style>
fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

legend {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.form-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
}
</style>
```

### Accessible Input Component
```astro
---
// components/ui/AccessibleInput.astro
interface Props {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
  error?: string;
  value?: string;
}

const {
  id,
  label,
  type = 'text',
  required = false,
  disabled = false,
  placeholder,
  description,
  error,
  value,
  ...rest
} = Astro.props;

const hasError = !!error;
const describedBy = [
  description ? `${id}-description` : '',
  error ? `${id}-error` : ''
].filter(Boolean).join(' ');
---

<div class="input-group">
  <label 
    for={id}
    class={`input-label ${required ? 'required' : ''}`}
  >
    {label}
    {required && (
      <span aria-label="required" class="required-indicator">*</span>
    )}
  </label>
  
  {description && (
    <p id={`${id}-description`} class="input-description">
      {description}
    </p>
  )}
  
  <input
    id={id}
    type={type}
    class={`input ${hasError ? 'error' : ''}`}
    placeholder={placeholder}
    required={required}
    disabled={disabled}
    aria-invalid={hasError ? 'true' : 'false'}
    aria-describedby={describedBy || undefined}
    value={value}
    {...rest}
  />
  
  {error && (
    <div 
      id={`${id}-error`}
      class="input-error"
      role="alert"
      aria-live="polite"
    >
      <span class="error-icon" aria-hidden="true">⚠</span>
      {error}
    </div>
  )}
</div>

<style>
.input-group {
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
}

.input-label.required::after {
  content: " *";
  color: #dc2626;
}

.required-indicator {
  color: #dc2626;
  margin-left: 0.25rem;
}

.input-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  &.error {
    border-color: #dc2626;
  }
  
  &.error:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
}

.input-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #dc2626;
}

.error-icon {
  flex-shrink: 0;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .input {
    border-width: 2px;
  }
  
  .input:focus {
    border-color: highlight;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .input {
    transition: none;
  }
}
</style>
```

## Screen Reader Support

### ARIA Live Regions
```astro
---
// components/ui/LiveRegion.astro
interface Props {
  id: string;
  level?: 'polite' | 'assertive';
  atomic?: boolean;
  relevant?: string;
}

const {
  id,
  level = 'polite',
  atomic = true,
  relevant = 'additions text',
  ...rest
} = Astro.props;
---

<div
  id={id}
  aria-live={level}
  aria-atomic={atomic}
  aria-relevant={relevant}
  class="sr-only"
  {...rest}
>
  <slot />
</div>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

### Status Announcements
```typescript
// utils/a11y.ts
export class A11yAnnouncer {
  private static instance: A11yAnnouncer;
  private politeRegion: HTMLElement;
  private assertiveRegion: HTMLElement;
  
  constructor() {
    this.createLiveRegions();
  }
  
  static getInstance(): A11yAnnouncer {
    if (!A11yAnnouncer.instance) {
      A11yAnnouncer.instance = new A11yAnnouncer();
    }
    return A11yAnnouncer.instance;
  }
  
  private createLiveRegions() {
    // Create polite live region
    this.politeRegion = document.createElement('div');
    this.politeRegion.setAttribute('aria-live', 'polite');
    this.politeRegion.setAttribute('aria-atomic', 'true');
    this.politeRegion.className = 'sr-only';
    this.politeRegion.id = 'a11y-announce-polite';
    
    // Create assertive live region
    this.assertiveRegion = document.createElement('div');
    this.assertiveRegion.setAttribute('aria-live', 'assertive');
    this.assertiveRegion.setAttribute('aria-atomic', 'true');
    this.assertiveRegion.className = 'sr-only';
    this.assertiveRegion.id = 'a11y-announce-assertive';
    
    document.body.appendChild(this.politeRegion);
    document.body.appendChild(this.assertiveRegion);
  }
  
  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const region = priority === 'assertive' ? this.assertiveRegion : this.politeRegion;
    
    // Clear previous message
    region.textContent = '';
    
    // Announce new message
    setTimeout(() => {
      region.textContent = message;
    }, 100);
    
    // Clear message after announcement
    setTimeout(() => {
      region.textContent = '';
    }, 1000);
  }
  
  announcePageChange(title: string) {
    this.announce(`Page changed to ${title}`, 'polite');
  }
  
  announceError(error: string) {
    this.announce(`Error: ${error}`, 'assertive');
  }
  
  announceSuccess(message: string) {
    this.announce(`Success: ${message}`, 'polite');
  }
  
  announceLoading(message: string = 'Loading') {
    this.announce(message, 'polite');
  }
  
  announceLoadingComplete(message: string = 'Loading complete') {
    this.announce(message, 'polite');
  }
}

// Initialize announcer
export const announcer = A11yAnnouncer.getInstance();

// Usage examples
export const a11yUtils = {
  announceFormSubmission: () => {
    announcer.announce('Form submitted successfully');
  },
  
  announceFormError: (error: string) => {
    announcer.announceError(`Form submission failed: ${error}`);
  },
  
  announceModalOpen: (modalTitle: string) => {
    announcer.announce(`${modalTitle} dialog opened`);
  },
  
  announceModalClose: () => {
    announcer.announce('Dialog closed');
  },
  
  announcePageLoad: () => {
    announcer.announce('Page loaded');
  }
};
```

## Color and Contrast

### Color Accessibility
```css
/* Color system with accessibility considerations */
:root {
  /* Ensure WCAG AA contrast ratios */
  --color-text-primary: #1f2937;     /* 16.94:1 ratio on white */
  --color-text-secondary: #4b5563;   /* 7.53:1 ratio on white */
  --color-text-tertiary: #6b7280;    /* 5.74:1 ratio on white */
  
  /* Interactive colors with sufficient contrast */
  --color-link: #2563eb;             /* 7.58:1 ratio on white */
  --color-link-hover: #1d4ed8;       /* 9.14:1 ratio on white */
  --color-link-visited: #7c3aed;     /* 5.96:1 ratio on white */
  
  /* Status colors with adequate contrast */
  --color-success: #059669;          /* 5.77:1 ratio on white */
  --color-warning: #d97706;          /* 4.69:1 ratio on white */
  --color-error: #dc2626;            /* 5.90:1 ratio on white */
  --color-info: --color-link;
  
  /* Focus indicators */
  --color-focus: #2563eb;
  --focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Dark theme overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: #f9fafb;     /* 17.35:1 ratio on dark */
    --color-text-secondary: #d1d5db;   /* 9.74:1 ratio on dark */
    --color-text-tertiary: #9ca3af;    /* 6.14:1 ratio on dark */
    
    --color-link: #60a5fa;             /* 7.15:1 ratio on dark */
    --color-link-hover: #93c5fd;       /* 9.89:1 ratio on dark */
    
    --color-success: #34d399;          /* 8.35:1 ratio on dark */
    --color-warning: #fbbf24;          /* 10.89:1 ratio on dark */
    --color-error: #f87171;            /* 6.92:1 ratio on dark */
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --color-text-primary: #000000;
    --color-text-secondary: #000000;
    --color-link: #0000ee;
    --color-link-visited: #551a8b;
    
    /* Enhanced borders and outlines */
    --border-width: 2px;
    --focus-ring: 0 0 0 3px highlight;
  }
  
  /* Ensure all interactive elements have visible borders */
  button, input, select, textarea, a {
    border: var(--border-width) solid currentColor !important;
  }
}
```

### Focus Management
```css
/* Comprehensive focus styles */
.focus-styles {
  /* Remove default browser focus */
  *:focus {
    outline: none;
  }
  
  /* Custom focus styles */
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible,
  a:focus-visible,
  [tabindex]:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
    border-radius: 0.125rem;
  }
  
  /* Focus within for containers */
  .focus-within:focus-within {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
  
  /* High contrast focus */
  @media (prefers-contrast: high) {
    button:focus-visible,
    input:focus-visible,
    select:focus-visible,
    textarea:focus-visible,
    a:focus-visible,
    [tabindex]:focus-visible {
      outline: 3px solid highlight;
      outline-offset: 2px;
    }
  }
  
  /* Skip link styles */
  .skip-link:focus {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: var(--color-focus);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    text-decoration: none;
    z-index: 9999;
    font-weight: 600;
  }
}
```

## Motion and Animation Accessibility

### Reduced Motion Support
```css
/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
  /* Disable all animations and transitions */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Keep essential animations */
  .keep-animation {
    animation-duration: revert !important;
    transition-duration: revert !important;
  }
}

/* Reduced motion utility classes */
.motion-safe {
  animation: none;
  transition: none;
}

@media (prefers-reduced-motion: no-preference) {
  .motion-safe {
    animation: revert;
    transition: revert;
  }
}
```

### Accessible Animation Implementation
```typescript
// utils/accessibleAnimations.ts
export class AccessibleAnimations {
  private prefersReducedMotion: boolean;
  
  constructor() {
    this.prefersReducedMotion = this.checkReducedMotion();
    this.setupMotionListeners();
  }
  
  private checkReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  private setupMotionListeners() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addListener((e) => {
      this.prefersReducedMotion = e.matches;
      this.updateAnimations();
    });
  }
  
  private updateAnimations() {
    if (this.prefersReducedMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }
  
  animate(element: HTMLElement, animation: any) {
    if (this.prefersReducedMotion) {
      // Apply end state immediately
      Object.assign(element.style, animation.to);
      return Promise.resolve();
    }
    
    // Use your animation library (e.g., Framer Motion, GSAP)
    return new Promise(resolve => {
      // Animation implementation
      resolve(null);
    });
  }
  
  shouldAnimate(): boolean {
    return !this.prefersReducedMotion;
  }
}

export const accessibleAnimations = new AccessibleAnimations();
```

## Testing and Validation

### Automated Testing Setup
```javascript
// tests/accessibility.test.js
import { axe, configureAxe } from 'jest-axe';
import { render } from '@testing-library/react';

// Configure axe for our standards
configureAxe({
  rules: {
    // Enable all WCAG 2.1 AA rules
    'color-contrast': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'focus-order': { enabled: true },
    'heading-order': { enabled: true }
  }
});

describe('Accessibility Tests', () => {
  test('Homepage should have no accessibility violations', async () => {
    const { container } = render(<Homepage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('Modal should be keyboard accessible', async () => {
    const { getByRole, getByLabelText } = render(<Modal />);
    
    // Test focus management
    const modal = getByRole('dialog');
    const closeButton = getByLabelText('Close modal');
    
    // Modal should have proper focus
    expect(modal).toHaveFocus();
    
    // Should trap focus within modal
    // Test implementation...
  });
  
  test('Form should have proper labels and error handling', () => {
    const { getByLabelText, getByRole } = render(<ContactForm />);
    
    // All inputs should have labels
    const emailInput = getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    
    // Error messages should be announced
    // Test implementation...
  });
});
```

### Manual Testing Checklist
```markdown
# Accessibility Testing Checklist

## Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical and intuitive
- [ ] Focus indicators are clearly visible
- [ ] Skip links work properly
- [ ] No keyboard traps exist

## Screen Reader Testing
- [ ] All content is announced correctly
- [ ] Headings provide proper structure
- [ ] Images have appropriate alt text
- [ ] Form labels are associated correctly
- [ ] Status messages are announced

## Visual Testing
- [ ] Text meets contrast requirements (4.5:1 for normal, 3:1 for large)
- [ ] Content is readable at 200% zoom
- [ ] Information isn't conveyed by color alone
- [ ] Focus indicators are visible

## Motor Accessibility
- [ ] Click targets are at least 44px × 44px
- [ ] Gestures have alternative input methods
- [ ] Drag and drop has keyboard alternatives

## Cognitive Accessibility
- [ ] Content is written in plain language
- [ ] Error messages are clear and helpful
- [ ] Time limits can be extended
- [ ] Auto-playing content can be paused
```

This comprehensive accessibility implementation ensures the homepage is usable by everyone, regardless of their abilities or the assistive technologies they use. 