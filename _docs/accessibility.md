---
layout: docs
title: Accessibility Guide
description: Build an inclusive ABC showcase that everyone can use.
nav_order: 13
category: Help
tags: [accessibility, a11y, wcag, inclusive, aria]
---

# Accessibility Guide

Make your ABC showcase accessible to all users, including those with disabilities.

## WCAG Compliance

### Target Level: AA

Follow [Web Content Accessibility Guidelines (WCAG) 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/) for:

- **Perceivable**: Content is available to senses
- **Operable**: Interface is usable
- **Understandable**: Content and operation are clear
- **Robust**: Works with assistive technologies

## Semantic HTML

### Use Proper Elements

```html
<!-- Good: Semantic -->
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>

<footer>
  <p>&copy; 2025</p>
</footer>

<!-- Bad: Non-semantic -->
<div class="nav">
  <div class="link">Home</div>
</div>
```

### Heading Hierarchy

```html
<!-- Correct hierarchy -->
<h1>Main Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h2>Another Section</h2>

<!-- Avoid skipping levels -->
<h1>Title</h1>
<h3>Subsection</h3>
<!-- Bad: skipped h2 -->
```

## Keyboard Navigation

### Focusable Elements

Ensure all interactive elements are keyboard accessible:

```html
<button>Click Me</button>
<a href="/page">Link</a>
<input type="text" />
<select>
  <option>Option</option>
</select>
```

### Focus Indicators

```css
/* Always visible focus styles */
:focus {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* Better focus for dark theme */
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* Don't remove outlines */
/* BAD: button:focus { outline: none; } */
```

### Skip Links

```html
<a href="#main-content" class="skip-link"> Skip to main content </a>

<main id="main-content">
  <!-- Content -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent-primary);
  color: white;
  padding: 8px;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}
```

### Tab Order

```html
<!-- Natural tab order (default) -->
<input tabindex="0" />
<button tabindex="0">Submit</button>

<!-- Custom tab order (use sparingly) -->
<input tabindex="1" />
<input tabindex="2" />

<!-- Remove from tab order -->
<div tabindex="-1">Not focusable</div>
```

## ARIA Labels

### Landmarks

```html
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <!-- Nav items -->
  </nav>
</header>

<main role="main">
  <section aria-labelledby="projects-heading">
    <h2 id="projects-heading">Projects</h2>
  </section>
</main>

<aside role="complementary" aria-label="Sidebar">
  <!-- Sidebar content -->
</aside>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>
```

### Button Labels

```html
<!-- Icon buttons need labels -->
<button aria-label="Toggle theme">
  <i class="fa-sun"></i>
</button>

<button aria-label="Close modal">
  <i class="fa-times"></i>
</button>

<!-- Links with icons -->
<a href="https://github.com/user/repo" aria-label="View on GitHub">
  <i class="fab fa-github"></i>
</a>
```

### Live Regions

```html
<!-- Announce dynamic content -->
<div role="status" aria-live="polite" aria-atomic="true">
  <p id="search-results">Found 5 results</p>
</div>

<!-- Alerts -->
<div role="alert" aria-live="assertive">
  <p>Error: Form submission failed</p>
</div>
```

### Form Labels

```html
<!-- Always label inputs -->
<label for="search">Search</label>
<input type="search" id="search" name="search" />

<!-- Or use aria-label -->
<input
  type="search"
  aria-label="Search documentation"
  placeholder="Search..."
/>

<!-- Group related inputs -->
<fieldset>
  <legend>Filter Options</legend>
  <label><input type="checkbox" name="category" value="setup" /> Setup</label>
  <label
    ><input type="checkbox" name="category" value="styling" /> Styling</label
  >
</fieldset>
```

## Color and Contrast

### Contrast Ratios

**WCAG AA Requirements:**

- Normal text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1

```css
/* Good contrast examples */
.dark-theme {
  background: #1a1a1a;
  color: #e0e0e0; /* 12.6:1 ratio */
}

.light-theme {
  background: #ffffff;
  color: #212121; /* 16.1:1 ratio */
}

/* Check with browser DevTools or tools like:
   - WebAIM Contrast Checker
   - Color Contrast Analyzer
*/
```

### Don't Rely on Color Alone

```html
<!-- Bad: Color only -->
<span style="color: red;">Required</span>

<!-- Good: Color + text/icon -->
<span class="required">
  <i class="fa-asterisk" aria-hidden="true"></i>
  Required
</span>
```

## Images and Media

### Alt Text

```html
<!-- Informative images -->
<img src="logo.png" alt="ABC Showcase logo" />

<!-- Decorative images -->
<img src="decoration.svg" alt="" role="presentation" />

<!-- Complex images -->
<figure>
  <img src="chart.png" alt="Sales chart showing 20% growth" />
  <figcaption>
    Detailed description: Sales increased from $100k in Q1 to $120k in Q2,
    representing 20% growth.
  </figcaption>
</figure>
```

### Videos

```html
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track kind="captions" src="captions.vtt" srclang="en" label="English" />
  <track kind="descriptions" src="descriptions.vtt" srclang="en" />
  Your browser doesn't support video.
</video>
```

## Screen Reader Support

### Hidden Content

```css
/* Visually hidden but screen reader accessible */
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

/* Hidden from everyone */
.hidden {
  display: none;
}

/* Use aria-hidden for decorative content */
<i class="fa-icon" aria-hidden="true"></i>
```

### Descriptive Text

```html
<!-- Generic link text is bad -->
<a href="/docs">Click here</a>

<!-- Descriptive link text is good -->
<a href="/docs">Read the documentation</a>

<!-- Or add context -->
<a href="/download">
  Download
  <span class="sr-only"> modpack installer</span>
</a>
```

## Forms

### Error Messages

```html
<form>
  <div class="form-group">
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      aria-describedby="email-error"
      aria-invalid="true"
    />
    <span id="email-error" role="alert">
      Please enter a valid email address
    </span>
  </div>
</form>
```

### Required Fields

```html
<label for="username">
  Username
  <span aria-label="required">*</span>
</label>
<input type="text" id="username" required aria-required="true" />
```

### Help Text

```html
<label for="password">Password</label>
<input type="password" id="password" aria-describedby="password-help" />
<small id="password-help"> Must be at least 8 characters with 1 number </small>
```

## Modals and Overlays

### Focus Management

```javascript
// Trap focus in modal
const modal = document.querySelector(".modal");
const focusableElements = modal.querySelectorAll(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

modal.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }

  if (e.key === "Escape") {
    closeModal();
  }
});
```

### ARIA Modal

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Action</h2>
  <p id="modal-description">Are you sure you want to proceed?</p>
  <button>Confirm</button>
  <button>Cancel</button>
</div>
```

## Testing

### Automated Testing

```bash
# Install pa11y
npm install -g pa11y

# Run accessibility test
pa11y https://yoursite.com

# Test multiple pages
pa11y-ci --sitemap https://yoursite.com/sitemap.xml
```

### Manual Testing

1. **Keyboard only**: Navigate entire site with Tab, Enter, Space, Arrow keys
2. **Screen reader**: Test with NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS)
3. **Zoom**: Test at 200% zoom
4. **Color blind mode**: Use browser extensions
5. **High contrast**: Test with Windows High Contrast mode

### Checklist

- [ ] All images have alt text
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators are visible
- [ ] Form inputs have labels
- [ ] Headings follow logical hierarchy
- [ ] Links have descriptive text
- [ ] ARIA labels for icon buttons
- [ ] Skip links implemented
- [ ] No keyboard traps
- [ ] Error messages are descriptive
- [ ] Live regions for dynamic content
- [ ] Modal focus management
- [ ] Video captions available
- [ ] Works with screen readers

## Common Issues

### Issue: Low Contrast

```css
/* Bad: 2.1:1 ratio */
.link {
  color: #666666;
  background: #ffffff;
}

/* Good: 7.0:1 ratio */
.link {
  color: #333333;
  background: #ffffff;
}
```

### Issue: Missing Labels

```html
<!-- Bad -->
<input type="search" placeholder="Search" />

<!-- Good -->
<label for="search">Search</label>
<input type="search" id="search" placeholder="Search" />
```

### Issue: Click Handlers on Divs

```html
<!-- Bad -->
<div onclick="doSomething()">Click me</div>

<!-- Good -->
<button onclick="doSomething()">Click me</button>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/) - Training and tools
- [A11y Project](https://www.a11yproject.com/) - Community-driven resources
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - Design patterns
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Next Steps

- [Performance Guide](performance.html) - Fast and accessible
- [SEO Guide](seo-guide.html) - Accessible and discoverable
- [Browser Support](browser-support.html) - Cross-browser accessibility
