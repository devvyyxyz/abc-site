---
layout: docs
title: Browser Support
description: Browser compatibility and progressive enhancement strategies.
nav_order: 16
category: Help
tags: [browser, compatibility, support, polyfills]
---

# Browser Support

Ensure your ABC showcase works across different browsers and devices.

## Supported Browsers

### Modern Browsers (Full Support)

| Browser | Minimum Version | Notes                         |
| ------- | --------------- | ----------------------------- |
| Chrome  | 90+             | Full ES6 support              |
| Firefox | 88+             | Full CSS Grid support         |
| Safari  | 14+             | webkit prefixes may be needed |
| Edge    | 90+             | Chromium-based                |
| Opera   | 76+             | Chromium-based                |

### Mobile Browsers

| Browser          | Minimum Version | Notes      |
| ---------------- | --------------- | ---------- |
| Chrome Mobile    | 90+             | Android 5+ |
| Safari Mobile    | 14+             | iOS 14+    |
| Samsung Internet | 14+             | Android 7+ |
| Firefox Mobile   | 88+             | Android 5+ |

### Limited Support

| Browser               | Support Level | Notes                         |
| --------------------- | ------------- | ----------------------------- |
| IE 11                 | Degraded      | Requires polyfills            |
| Safari 13             | Partial       | Some CSS features unsupported |
| Older mobile browsers | Basic         | Fallbacks required            |

## Feature Support

### CSS Features

```css
/* CSS Grid */
@supports (display: grid) {
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

/* Fallback for older browsers */
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Fallback with margin if gap unsupported */
}

/* Custom Properties (CSS Variables) */
:root {
  --accent: #4caf50;
}

/* Fallback */
.button {
  background: #4caf50; /* Fallback */
  background: var(--accent); /* Modern */
}
```

### JavaScript Features

```javascript
// ES6+ Features Detection
if (typeof Symbol !== "undefined") {
  // Symbols supported
}

if (typeof Promise !== "undefined") {
  // Promises supported
} else {
  // Load polyfill
}

// Modern API Detection
if ("IntersectionObserver" in window) {
  // Use IntersectionObserver
} else {
  // Fallback to scroll events
}

if ("serviceWorker" in navigator) {
  // Service Worker supported
}
```

## Progressive Enhancement

### Mobile-First Approach

```css
/* Base styles for mobile */
.container {
  padding: 20px;
  font-size: 16px;
}

/* Enhance for tablets */
@media (min-width: 768px) {
  .container {
    padding: 40px;
    font-size: 18px;
  }
}

/* Enhance for desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Feature Detection

```javascript
// Check for localStorage
function hasLocalStorage() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (e) {
    return false;
  }
}

if (hasLocalStorage()) {
  // Use localStorage
} else {
  // Use cookies or session storage
}
```

## Vendor Prefixes

### Autoprefixer (Recommended)

Install and configure:

```bash
npm install --save-dev autoprefixer postcss-cli
```

Create `postcss.config.js`:

```javascript
module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["last 2 versions", "> 1%", "not dead"],
    }),
  ],
};
```

### Manual Prefixes

```css
/* Flexbox */
.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

/* Transform */
.rotate {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* Transition */
.transition {
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

/* Backdrop Filter */
.blur {
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
```

## Polyfills

### Core Polyfills

```html
<!-- Polyfill.io (automatic) -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=default,IntersectionObserver,fetch"></script>

<!-- Or manual polyfills -->
<script src="/assets/js/polyfills.js"></script>
```

### Custom Polyfill Bundle

```javascript
// polyfills.js

// Array.from (IE 11)
if (!Array.from) {
  Array.from = function (arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };
}

// Object.assign (IE 11)
if (typeof Object.assign !== "function") {
  Object.assign = function (target) {
    if (target == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];
      if (nextSource != null) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

// Fetch API (older browsers)
if (!window.fetch) {
  // Load fetch polyfill
  var script = document.createElement("script");
  script.src = "https://unpkg.com/whatwg-fetch@3.6.2/dist/fetch.umd.js";
  document.head.appendChild(script);
}

// IntersectionObserver (Safari < 12.1)
if (!("IntersectionObserver" in window)) {
  var script = document.createElement("script");
  script.src =
    "https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver";
  document.head.appendChild(script);
}
```

## Testing Across Browsers

### Local Testing

**BrowserStack** (free for open source):

```
https://www.browserstack.com/open-source
```

**Browser DevTools Device Mode**:

- Chrome: F12 > Toggle device toolbar
- Firefox: F12 > Responsive Design Mode
- Safari: Develop > Enter Responsive Design Mode

### Automated Testing

```javascript
// Example with Playwright
const { chromium, firefox, webkit } = require("playwright");

(async () => {
  for (const browserType of [chromium, firefox, webkit]) {
    const browser = await browserType.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:4000");
    await page.screenshot({ path: `screenshot-${browserType.name()}.png` });
    await browser.close();
  }
})();
```

## Graceful Degradation

### No JavaScript Fallback

```html
<noscript>
  <style>
    .js-only {
      display: none;
    }
  </style>
  <div class="no-js-message">
    <p>This site works best with JavaScript enabled.</p>
  </div>
</noscript>

<!-- Progressive enhancement -->
<div class="content">
  <p>Content visible without JS</p>
  <div class="js-only" style="display: none;">
    <p>Enhanced content with JS</p>
  </div>
</div>

<script>
  // Show JS-only content
  document.querySelectorAll(".js-only").forEach((el) => {
    el.style.display = "block";
  });
</script>
```

### CSS Fallbacks

```css
/* Background with fallback */
.element {
  background: #1a1a1a; /* Fallback */
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); /* Modern */
}

/* Custom properties with fallback */
.button {
  color: #4caf50; /* Fallback */
  color: var(--accent-primary, #4caf50); /* Modern with fallback */
}
```

## Common Compatibility Issues

### Issue: CSS Grid Not Working

```css
/* Solution: Provide flexbox fallback */
.grid {
  display: flex;
  flex-wrap: wrap;
}

.grid > * {
  flex: 1 1 280px;
  margin: 8px;
}

@supports (display: grid) {
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .grid > * {
    margin: 0;
  }
}
```

### Issue: backdrop-filter Not Supported

```css
/* Fallback for backdrop-filter */
.navbar {
  background: rgba(31, 31, 31, 0.9); /* Solid fallback */
}

@supports (backdrop-filter: blur(10px)) {
  .navbar {
    background: rgba(31, 31, 31, 0.7); /* More transparent */
    backdrop-filter: blur(10px);
  }
}
```

### Issue: Sticky Positioning

```css
/* Fallback for position: sticky */
.sidebar {
  position: relative; /* Fallback */
}

@supports (position: sticky) {
  .sidebar {
    position: sticky;
    top: 20px;
  }
}
```

## Performance on Older Browsers

### Reduce JavaScript Bundle Size

```html
<!-- Only load for modern browsers -->
<script type="module" src="/assets/js/modern.js"></script>

<!-- Fallback for older browsers -->
<script nomodule src="/assets/js/legacy.js"></script>
```

### Optimize for Mobile

```html
<!-- Responsive images -->
<picture>
  <source
    srcset="
      image-large.webp  1200w,
      image-medium.webp  800w,
      image-small.webp   400w
    "
    type="image/webp"
  />
  <img
    src="image.jpg"
    srcset="image-large.jpg 1200w, image-medium.jpg 800w, image-small.jpg 400w"
    sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
    alt="Description"
  />
</picture>
```

## Browser Detection

### User Agent Detection (Not Recommended)

```javascript
// Avoid this approach
const isIE = /MSIE|Trident/.test(navigator.userAgent);
```

### Feature Detection (Recommended)

```javascript
// Detect features, not browsers
const supportsGrid = CSS.supports("display", "grid");
const supportsCustomProperties = CSS.supports("--custom", "property");

if (supportsGrid) {
  document.body.classList.add("supports-grid");
}
```

## Testing Checklist

- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Test on iOS Safari and Android Chrome
- [ ] Verify responsive design at multiple breakpoints
- [ ] Check with JavaScript disabled
- [ ] Test with screen readers
- [ ] Verify keyboard navigation
- [ ] Check CSS Grid/Flexbox layouts
- [ ] Test custom properties (CSS variables)
- [ ] Verify backdrop-filter fallbacks
- [ ] Check font loading
- [ ] Test lazy loading functionality
- [ ] Verify service worker (if implemented)

## Resources

- [Can I Use](https://caniuse.com/) - Browser feature support tables
- [MDN Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/Guide/Browser_Detection_and_Cross_Browser_Support)
- [Autoprefixer](https://autoprefixer.github.io/) - Automatic vendor prefixes
- [Polyfill.io](https://polyfill.io/) - Automatic polyfills
- [BrowserStack](https://www.browserstack.com/) - Cross-browser testing

## Next Steps

- [Accessibility Guide](accessibility.html) - Inclusive design
- [Performance Guide](performance.html) - Optimization
- [Common Errors](common-errors.html) - Troubleshooting
