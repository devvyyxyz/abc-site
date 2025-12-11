---
layout: docs
title: CSS Variables Reference
description: Complete reference for all CSS custom properties and theme variables.
nav_order: 11
category: Styling
tags: [css, variables, theming, colors, styling]
---

# CSS Variables Reference

Complete reference for all CSS custom properties used in the ABC showcase.

## Color Variables

### Background Colors

```css
:root {
  --bg-primary: #1a1a1a; /* Main background */
  --bg-secondary: #222222; /* Cards, secondary surfaces */
  --bg-tertiary: #2a2a2a; /* Hover states, elevated surfaces */
  --bg-overlay: rgba(31, 31, 31, 0.9); /* Modal/navbar overlays */
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-tertiary: #e0e0e0;
  --bg-overlay: rgba(255, 255, 255, 0.9);
}
```

### Text Colors

```css
:root {
  --text: #e0e0e0; /* Primary text */
  --text-secondary: #b0b0b0; /* Secondary text */
  --text-muted: #999999; /* Muted/disabled text */
  --text-inverse: #1a1a1a; /* Text on accent backgrounds */
}

[data-theme="light"] {
  --text: #212121;
  --text-secondary: #424242;
  --text-muted: #666666;
  --text-inverse: #ffffff;
}
```

### Accent Colors

```css
:root {
  --accent-primary: #4caf50; /* Primary actions, links */
  --accent-secondary: #2196f3; /* Secondary actions */
  --accent-tertiary: #9c27b0; /* Tertiary highlights */
  --accent-success: #4caf50; /* Success states */
  --accent-warning: #ff9800; /* Warning states */
  --accent-error: #f44336; /* Error states */
  --accent-info: #2196f3; /* Info messages */
}
```

### Border Colors

```css
:root {
  --border: #333333; /* Default borders */
  --border-light: #404040; /* Light borders */
  --border-dark: #2a2a2a; /* Dark borders */
  --border-focus: var(--accent-primary); /* Focus states */
}

[data-theme="light"] {
  --border: #e0e0e0;
  --border-light: #f0f0f0;
  --border-dark: #d0d0d0;
}
```

## Spacing Variables

### Base Spacing

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
}
```

### Container Spacing

```css
:root {
  --container-padding: 20px; /* Mobile padding */
  --container-max-width: 1200px;
  --section-spacing: 80px; /* Between sections */
  --card-gap: 16px; /* Grid gap for cards */
}

@media (min-width: 768px) {
  :root {
    --container-padding: 40px;
  }
}
```

## Typography Variables

### Font Families

```css
:root {
  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  --font-heading: var(--font-body);
  --font-mono: "Monaco", "Courier New", "Courier", monospace;
}
```

### Font Sizes

```css
:root {
  --font-xs: 12px;
  --font-sm: 14px;
  --font-md: 16px;
  --font-lg: 18px;
  --font-xl: 24px;
  --font-2xl: 32px;
  --font-3xl: 48px;
  --font-4xl: 64px;
}
```

### Font Weights

```css
:root {
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Line Heights

```css
:root {
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  --line-height-loose: 2;
}
```

## Layout Variables

### Border Radius

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 999px; /* Pills/circular */
}
```

### Shadows

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.3);
}

[data-theme="light"] {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
}
```

### Z-Index Layers

```css
:root {
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
}
```

## Effects Variables

### Transitions

```css
:root {
  --transition-fast: 0.1s ease;
  --transition-normal: 0.2s ease;
  --transition-slow: 0.3s ease;
  --transition-all: all 0.2s ease;
}
```

### Backdrop Blur

```css
:root {
  --blur-sm: 5px;
  --blur-md: 10px;
  --blur-lg: 20px;
  --blur-xl: 40px;
}
```

### Opacity

```css
:root {
  --opacity-disabled: 0.5;
  --opacity-hover: 0.8;
  --opacity-overlay: 0.9;
}
```

## Component-Specific Variables

### Navbar

```css
:root {
  --navbar-height: 64px;
  --navbar-bg: var(--bg-overlay);
  --navbar-blur: var(--blur-md);
  --navbar-padding: var(--spacing-md);
}
```

### Cards

```css
:root {
  --card-bg: var(--bg-secondary);
  --card-border: var(--border);
  --card-radius: var(--radius-md);
  --card-padding: var(--spacing-lg);
  --card-shadow: var(--shadow-md);
  --card-hover-shadow: var(--shadow-lg);
}
```

### Buttons

```css
:root {
  --button-bg: var(--accent-primary);
  --button-text: var(--text-inverse);
  --button-radius: var(--radius-md);
  --button-padding: var(--spacing-sm) var(--spacing-md);
  --button-hover-opacity: var(--opacity-hover);
}
```

### Pills/Tags

```css
:root {
  --pill-bg: rgba(76, 175, 80, 0.15);
  --pill-text: var(--accent-primary);
  --pill-border: var(--accent-primary);
  --pill-radius: var(--radius-full);
  --pill-padding: 4px 12px;
}
```

### Forms

```css
:root {
  --input-bg: var(--bg-secondary);
  --input-border: var(--border);
  --input-text: var(--text);
  --input-placeholder: var(--text-muted);
  --input-focus-border: var(--accent-primary);
  --input-radius: var(--radius-md);
  --input-padding: var(--spacing-sm) var(--spacing-md);
}
```

## Usage Examples

### Basic Usage

```css
.my-element {
  background: var(--bg-secondary);
  color: var(--text);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: var(--transition-normal);
}
```

### With Fallbacks

```css
.my-element {
  color: var(--text, #e0e0e0);
  font-size: var(--font-md, 16px);
}
```

### Computed Values

```css
.my-element {
  /* Calculate based on variables */
  padding: calc(var(--spacing-md) * 2);
  margin: calc(var(--spacing-lg) + 8px);

  /* Combine variables */
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}
```

### Dynamic Theme Colors

```css
.custom-accent {
  --my-accent: #ff5722;
  background: var(--my-accent);
  border-color: var(--my-accent);
}

.custom-accent:hover {
  background: color-mix(in srgb, var(--my-accent) 80%, white);
}
```

## Responsive Variables

### Breakpoints

Define custom breakpoints:

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

### Responsive Spacing

```css
:root {
  --section-spacing: 40px;
}

@media (min-width: 768px) {
  :root {
    --section-spacing: 80px;
  }
}

@media (min-width: 1024px) {
  :root {
    --section-spacing: 120px;
  }
}
```

## Advanced Techniques

### Scoped Variables

```css
.dark-section {
  --bg-primary: #000000;
  --text: #ffffff;

  background: var(--bg-primary);
  color: var(--text);
}
```

### Color Manipulation

```css
:root {
  --accent-rgb: 76, 175, 80;
}

.element {
  background: rgb(var(--accent-rgb));
  border: 1px solid rgba(var(--accent-rgb), 0.3);
  box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.2);
}
```

### Variable Inheritance

```css
:root {
  --base-size: 16px;
  --heading-multiplier: 2;
  --heading-size: calc(var(--base-size) * var(--heading-multiplier));
}

h1 {
  font-size: var(--heading-size);
}
```

## Best Practices

1. **Use semantic names:**

   ```css
   /* Good */
   --text-primary: #e0e0e0;

   /* Avoid */
   --gray-light: #e0e0e0;
   ```

2. **Group related variables:**

   ```css
   :root {
     /* Colors */
     --bg-primary: #1a1a1a;
     --bg-secondary: #222222;

     /* Spacing */
     --spacing-sm: 8px;
     --spacing-md: 16px;
   }
   ```

3. **Provide fallbacks:**

   ```css
   color: var(--text, #e0e0e0);
   ```

4. **Document complex variables:**
   ```css
   :root {
     /* Used for navbar and modal backdrops */
     --bg-overlay: rgba(31, 31, 31, 0.9);
   }
   ```

## Debugging

### Inspect Variables

Use browser DevTools:

```javascript
// Get computed value
getComputedStyle(document.documentElement).getPropertyValue("--accent-primary");

// Set variable dynamically
document.documentElement.style.setProperty("--accent-primary", "#FF5722");
```

### List All Variables

```javascript
// Get all custom properties
const allVars = Array.from(document.styleSheets)
  .flatMap((sheet) => Array.from(sheet.cssRules))
  .filter((rule) => rule.selectorText === ":root")
  .flatMap((rule) => Array.from(rule.style))
  .filter((prop) => prop.startsWith("--"));

console.log(allVars);
```

## Next Steps

- [Customization Guide](customization.html) - Apply these variables
- [Liquid Templates](liquid-templates.html) - Dynamic styling
- [Performance Guide](performance.html) - Optimize CSS delivery
