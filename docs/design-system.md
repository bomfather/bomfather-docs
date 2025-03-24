# Bomfather Design System

This document outlines the design system for the Bomfather static website, ensuring a consistent, professional, and recognizable visual identity across all pages.

## Brand Identity

### Project Name

- Full name: **Bomfather**
- Stylization: "Bomfather" (with capital B, no spaces or special characters)
- Description: An eBPF-based kernel-level monitoring framework for accurate dependency tracking in software supply chains

### Brand Messaging

- **Tagline**: "Kernel-level truth in software supply chains"
- **Value proposition**: "Build tamper-evident software with accurate, kernel-level dependency tracking"
- **Brand values**: Accuracy, Security, Transparency, Innovation

## Visual Identity

### Logo

The Bomfather logo should reflect the technical nature of the project while also conveying trust and security. Suggested logo concepts:

1. **Abstract Merkle Tree**: A stylized representation of a Merkle tree with nodes and connections
2. **Shield with Hash**: A shield-like shape containing a visual representation of a hash
3. **Kernel Monitoring**: An abstract visualization of kernel-level monitoring

Logo variations:
- Full logo (with text)
- Icon only (for favicon and small applications)
- Monochrome version

### Color Palette

#### Primary Colors

| Color Name     | Hex Code  | RGB            | Usage                           |
|----------------|-----------|----------------|----------------------------------|
| Primary Blue   | `#0B5FFF` | rgb(11,95,255) | Primary buttons, links, CTAs     |
| Secondary Blue | `#224BC5` | rgb(34,75,197) | Secondary actions, accents       |
| Dark Blue      | `#0A2463` | rgb(10,36,99)  | Headers, footers                 |

#### Neutral Colors

| Color Name     | Hex Code  | RGB            | Usage                           |
|----------------|-----------|----------------|----------------------------------|
| Dark           | `#121212` | rgb(18,18,18)  | Primary text, dark backgrounds   |
| Mid Gray       | `#505050` | rgb(80,80,80)  | Secondary text                   |
| Light Gray     | `#F3F4F6` | rgb(243,244,246)| Light backgrounds, cards         |
| White          | `#FFFFFF` | rgb(255,255,255)| Text on dark backgrounds         |

#### Accent Colors

| Color Name     | Hex Code  | RGB            | Usage                           |
|----------------|-----------|----------------|----------------------------------|
| Accent Green   | `#45C4B0` | rgb(69,196,176)| Success states, security indicators |
| Accent Orange  | `#FF6B35` | rgb(255,107,53)| Warnings, highlights             |
| Accent Red     | `#E63946` | rgb(230,57,70) | Errors, critical information     |

#### Gradient

For hero sections and feature backgrounds, consider using a gradient:

- **Primary gradient**: Linear gradient from `#0A2463` to `#0B5FFF`

### Typography

#### Font Families

- **Primary Font**: [Inter](https://fonts.google.com/specimen/Inter)
  - Clean, modern sans-serif for body text and UI elements
  - Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

- **Secondary Font**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
  - Monospace font for code snippets and technical examples
  - Weights: 400 (Regular), 700 (Bold)

- **Header Font**: [Manrope](https://fonts.google.com/specimen/Manrope)
  - Modern geometric sans-serif for headings
  - Weights: 700 (Bold), 800 (ExtraBold)

#### Type Scale

| Element        | Size (px/rem) | Weight      | Line Height | Usage                   |
|----------------|---------------|-------------|-------------|-------------------------|
| h1             | 36px/2.25rem  | 800         | 1.2         | Page titles             |
| h2             | 30px/1.875rem | 700         | 1.2         | Section headers         |
| h3             | 24px/1.5rem   | 700         | 1.3         | Subsection headers      |
| h4             | 20px/1.25rem  | 600         | 1.3         | Card titles             |
| Body           | 16px/1rem     | 400         | 1.5         | Main content            |
| Body Large     | 18px/1.125rem | 400         | 1.5         | Featured content        |
| Body Small     | 14px/0.875rem | 400         | 1.5         | Secondary content       |
| Caption        | 12px/0.75rem  | 400         | 1.5         | Captions, metadata      |
| Code           | 14px/0.875rem | 400         | 1.6         | Code snippets           |

## Components

### Buttons

| Button Type   | Background        | Text Color | Border      | Hover State            |
|---------------|-------------------|------------|-------------|------------------------|
| Primary       | `#0B5FFF`         | `#FFFFFF`  | None        | Darken by 10%          |
| Secondary     | `#FFFFFF`         | `#0B5FFF`  | `#0B5FFF`   | `#0B5FFF` bg, white text |
| Tertiary      | Transparent       | `#0B5FFF`  | None        | Light background       |
| Danger        | `#E63946`         | `#FFFFFF`  | None        | Darken by 10%          |

Button sizes:
- Small: 32px height, 12px padding
- Medium (default): 40px height, 16px padding
- Large: 48px height, 20px padding

Button states:
- Default
- Hover
- Active
- Focus
- Disabled

### Cards

Card types:
- **Feature card**: Used for highlighting features
- **Blog post card**: Used for blog list pages
- **Solution card**: Used for solution offerings
- **Documentation card**: Used for documentation sections

Card structure:
- Padding: 24px
- Border radius: 8px
- Shadow: 0 4px 6px rgba(0, 0, 0, 0.05)
- Background: White or light gray

### Navigation

#### Header

- Fixed position at top
- Logo on left
- Main navigation in center
- CTA button on right
- Mobile: Hamburger menu

#### Footer

- Logo and brief description
- Navigation sections
- Social media links
- Copyright information
- Newsletter signup

### Code Blocks

- Background: Dark (`#121212`)
- Text color: Light gray and syntax highlighting
- Border radius: 8px
- Padding: 16px
- Font: JetBrains Mono
- Line numbers: Muted color
- Copy button in top right

### Icons

Use a consistent icon set throughout the site. Recommended:
- [Heroicons](https://heroicons.com/)
- [Feather Icons](https://feathericons.com/)

Icon sizes:
- Small: 16x16px
- Medium: 24x24px
- Large: 32x32px

## Layout Guidelines

### Grid System

Use a 12-column grid system for layout:
- Container width: Max 1200px
- Gutter: 24px
- Responsive breakpoints:
  - Mobile: 0-639px
  - Tablet: 640px-1023px
  - Desktop: 1024px+

### Spacing System

Use a consistent spacing scale:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px

## UI Patterns

### Animations

General animation guidelines:
- Duration: 200-300ms for small elements, 400-500ms for larger transitions
- Easing: Ease-out for entering elements, ease-in-out for transitions
- Avoid excessive animation that might distract users

Animation types:
- Hover effects on interactive elements
- Page transitions
- Loading states
- Scrolling animations for diagrams and visualizations

### Illustrations

Illustration style:
- Clean, minimal line illustrations with accent colors
- Technical diagrams with clear explanations
- Isometric illustrations for complex concepts

Illustration contexts:
- Hero sections
- Feature explanations
- Empty states
- Error pages

## Accessibility Guidelines

- Maintain a minimum contrast ratio of 4.5:1 for normal text
- Ensure all interactive elements are keyboard accessible
- Provide alternative text for images
- Use semantic HTML elements
- Support screen readers with proper ARIA attributes
- Ensure the site is usable at 200% zoom

## Implementation Notes

### CSS Variables

Implement the design system using CSS variables for easy theming:

```css
:root {
  /* Primary colors */
  --color-primary: #0B5FFF;
  --color-secondary: #224BC5;
  --color-dark-blue: #0A2463;
  
  /* Neutral colors */
  --color-dark: #121212;
  --color-mid-gray: #505050;
  --color-light-gray: #F3F4F6;
  --color-white: #FFFFFF;
  
  /* Accent colors */
  --color-green: #45C4B0;
  --color-orange: #FF6B35;
  --color-red: #E63946;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-secondary: 'JetBrains Mono', monospace;
  --font-heading: 'Manrope', sans-serif;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.05);
}
```

### Dark Mode

Consider implementing a dark mode option with revised color palette:

```css
[data-theme="dark"] {
  --color-dark: #F3F4F6;
  --color-mid-gray: #A0A0A0;
  --color-light-gray: #222222;
  --color-white: #121212;
  
  /* Adjust other colors as needed */
}
```

## Design Assets

Maintain a repository of design assets including:
- Logo files (SVG, PNG)
- Illustration components
- Icon set
- Sample layouts
- UI component library

## Version Control

Keep track of design system changes with semantic versioning:
- Major version: Breaking changes
- Minor version: New features, no breaking changes
- Patch version: Bug fixes and minor updates

## Documentation

Document all design system elements with:
- Visual examples
- Usage guidelines
- Code examples
- Accessibility considerations

By adhering to this design system, the Bomfather website will maintain a consistent, professional appearance that reinforces the brand identity and ensures a positive user experience. 