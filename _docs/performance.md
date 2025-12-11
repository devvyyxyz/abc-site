---
layout: docs
title: Performance Optimization
description: Speed up your ABC showcase with proven optimization techniques.
nav_order: 12
category: Developer
tags: [performance, optimization, speed, caching]
---

# Performance Optimization

Optimize your ABC showcase for blazing-fast load times and smooth interactions.

## Build Performance

### Jekyll Build Optimization

**Exclude unnecessary files:**

```yaml
# _config.yml
exclude:
  - node_modules/
  - src/
  - vendor/
  - .git/
  - .github/
  - README.md
  - Gemfile
  - Gemfile.lock
  - package.json
  - package-lock.json
```

**Use incremental builds:**

```bash
bundle exec jekyll build --incremental
```

**Profile build time:**

```bash
bundle exec jekyll build --profile
```

### Optimize Data Files

**Reduce `_data/mods.json` size:**

```json
{
  "modpacks": [
    {
      "slug": "abc",
      "name": "ABC Pack",
      "desc": "Brief description",
      "icon": "/path/to/icon.png",
      "dl": 50000,
      "cat": ["tech"]
    }
  ]
}
```

Use abbreviated keys and remove unnecessary fields.

**Compress JSON:**

```bash
# Install jq
brew install jq

# Minify JSON
jq -c . _data/mods.json > _data/mods.min.json
```

## Asset Optimization

### Images

**Use WebP format:**

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.png" alt="Description" />
</picture>
```

**Convert images:**

```bash
# Install ImageMagick
brew install imagemagick

# Convert to WebP
magick convert input.png -quality 80 output.webp
```

**Optimize existing images:**

```bash
# PNG optimization
pngquant --quality 65-80 image.png

# JPG optimization
jpegoptim --max=85 image.jpg
```

**Lazy loading:**

```html
<img src="image.jpg" loading="lazy" alt="Description" />
```

### CSS Optimization

**Minify CSS:**

```yaml
# _config.yml
sass:
  style: compressed
```

**Critical CSS:**

Extract above-the-fold styles:

```html
<head>
  <style>
    /* Critical CSS inline */
    body {
      margin: 0;
      font-family: sans-serif;
    }
    .hero {
      min-height: 100vh;
    }
  </style>

  <!-- Defer non-critical CSS -->
  <link
    rel="preload"
    href="/assets/css/main.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
  <noscript><link rel="stylesheet" href="/assets/css/main.css" /></noscript>
</head>
```

**Remove unused CSS:**

```bash
npm install -g purgecss

purgecss --css assets/css/*.css \
         --content _site/**/*.html \
         --output assets/css/
```

### JavaScript Optimization

**Defer non-critical scripts:**

```html
<script src="/assets/js/main.js" defer></script>
```

**Async for independent scripts:**

```html
<script src="/assets/js/analytics.js" async></script>
```

**Minify JavaScript:**

```bash
npm install -g terser

terser input.js -o output.min.js -c -m
```

**Code splitting:**

```html
<!-- Load only what's needed -->
{% if page.layout == 'docs' %}
<script src="/assets/js/docs.js" defer></script>
{% endif %}
```

## Caching Strategies

### HTTP Caching

**Add cache headers:**

```html
<!-- Netlify: _headers file -->
/assets/* Cache-Control: public, max-age=31536000, immutable /css/*
Cache-Control: public, max-age=31536000, immutable /js/* Cache-Control: public,
max-age=31536000, immutable /*.html Cache-Control: public, max-age=0,
must-revalidate
```

**Versioning assets:**

```liquid
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}?v={{ site.time | date: '%s' }}">
```

### Service Worker

**Basic service worker:**

```javascript
// sw.js
const CACHE_NAME = "abc-site-v1";
const urlsToCache = [
  "/",
  "/assets/css/main.css",
  "/assets/js/main.js",
  "/assets/images/logo.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

**Register service worker:**

```html
<script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
</script>
```

## Loading Optimization

### Resource Hints

**Preconnect to external domains:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://cdn.modrinth.com" />
```

**Prefetch next page:**

```html
<link rel="prefetch" href="{{ next_page.url | relative_url }}" />
```

**Preload critical resources:**

```html
<link
  rel="preload"
  href="/assets/fonts/main.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link rel="preload" href="/assets/images/hero.webp" as="image" />
```

### Font Optimization

**Use system fonts:**

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
}
```

**Or optimize web fonts:**

```css
/* Only load needed weights and styles */
@font-face {
  font-family: "CustomFont";
  src: url("/fonts/custom-regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
```

**Subset fonts:**

```bash
# Install glyphhanger
npm install -g glyphhanger

# Generate subset
glyphhanger --subset=font.ttf \
            --formats=woff2 \
            --whitelist="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
```

## Runtime Performance

### Efficient JavaScript

**Debounce expensive operations:**

```javascript
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Usage
const search = debounce((query) => {
  // Expensive search operation
}, 300);

input.addEventListener("input", (e) => search(e.target.value));
```

**Use requestAnimationFrame:**

```javascript
function updateAnimation() {
  // Animation logic
  requestAnimationFrame(updateAnimation);
}

requestAnimationFrame(updateAnimation);
```

**Lazy load images:**

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  observer.observe(img);
});
```

### CSS Performance

**Avoid expensive selectors:**

```css
/* Slow */
div > div > div > p {
}

/* Fast */
.paragraph {
}
```

**Use transforms over position:**

```css
/* Slow */
.element {
  left: 100px;
  top: 100px;
}

/* Fast */
.element {
  transform: translate(100px, 100px);
}
```

**Enable GPU acceleration:**

```css
.animated {
  transform: translateZ(0);
  will-change: transform;
}
```

## Monitoring

### Lighthouse

```bash
npm install -g lighthouse

lighthouse https://yoursite.com \
  --output html \
  --output-path ./report.html
```

### Web Vitals

**Measure Core Web Vitals:**

```html
<script type="module">
  import {
    getCLS,
    getFID,
    getFCP,
    getLCP,
    getTTFB,
  } from "https://unpkg.com/web-vitals@3/dist/web-vitals.js";

  function sendToAnalytics(metric) {
    console.log(metric);
    // Send to analytics service
  }

  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
</script>
```

### Performance API

```javascript
// Measure page load time
window.addEventListener("load", () => {
  const perfData = performance.getEntriesByType("navigation")[0];
  console.log("Page load time:", perfData.loadEventEnd - perfData.fetchStart);
});

// Custom timing
performance.mark("search-start");
// ... search operation
performance.mark("search-end");
performance.measure("search", "search-start", "search-end");
```

## Checklist

- [ ] Enable SASS compression
- [ ] Exclude unnecessary files from build
- [ ] Optimize and compress images
- [ ] Minify CSS and JavaScript
- [ ] Add lazy loading for images
- [ ] Implement resource hints (preconnect, prefetch)
- [ ] Configure HTTP caching headers
- [ ] Use system fonts or subset web fonts
- [ ] Defer non-critical JavaScript
- [ ] Enable gzip/brotli compression
- [ ] Remove unused CSS
- [ ] Optimize data file sizes
- [ ] Test with Lighthouse
- [ ] Monitor Core Web Vitals
- [ ] Set up service worker for offline support

## Benchmarking

### Before Optimization

```
Lighthouse Score: 65
First Contentful Paint: 2.5s
Largest Contentful Paint: 4.2s
Total Bundle Size: 850KB
```

### After Optimization

```
Lighthouse Score: 95
First Contentful Paint: 0.8s
Largest Contentful Paint: 1.2s
Total Bundle Size: 220KB
```

## Next Steps

- [Deployment Guide](deployment.html) - Deploy optimized site
- [Accessibility Guide](accessibility.html) - Performance + accessibility
- [SEO Guide](seo-guide.html) - Performance + SEO
