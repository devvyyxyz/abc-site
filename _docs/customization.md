---
layout: doc
title: Customization
nav_order: 3
category: Styling
tags: [theme, colors, css, styling, responsive]
description: Customize colors, layouts, and styling to match your brand.
---

## Theme Colors

Edit `src/styles/root.css` to customize the color scheme:

```css
:root {
  --bg: #0d0d0d; /* Page background */
  --bg-secondary: #1a1a1a; /* Secondary background */
  --card: #1f1f1f; /* Card background */
  --border: #2a2a2a; /* Border color */
  --text: #ffffff; /* Primary text */
  --text-secondary: #b0b0b0; /* Secondary text */
  --muted: #808080; /* Muted text */
  --accent-primary: #1bd96f; /* Primary accent (green) */
  --gradient-primary: linear-gradient(135deg, #1bd96f 0%, #15a853 100%);
}
```

Changes apply instantly with `jekyll serve --livereload`.

## Layout & Spacing

Customize responsive sizing in `src/styles/root.css`:

```css
:root {
  --radius: 6px; /* Border radius */
  --content-max: 1200px; /* Max content width */
  --container-inline: clamp(16px, 5vw, 32px); /* Side padding */
  --nav-height: 76px; /* Navbar height */
}
```

### Responsive Breakpoints

Modify media queries in CSS files (e.g., `src/styles/layout.css`):

```css
@media (max-width: 960px) {
  /* Tablet styles */
}

@media (max-width: 640px) {
  /* Mobile styles */
}
```

## Typography

Google Fonts is configured to M PLUS Rounded 1c. To change:

In `_layouts/default.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap"
  rel="stylesheet"
/>
```

In `src/styles/root.css`:

```css
body {
  font-family: "Your Font", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
}
```

## Component Styling

### Cards

Edit `.card` in `src/styles/components.css`:

```css
.card {
  padding: 24px;
  border-radius: var(--radius);
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
```

### Buttons

Customize `.btn` variants:

```css
.btn.primary {
  background: var(--gradient-primary);
  color: #000000;
}

.btn.ghost {
  background: transparent;
  border: 1px solid var(--border);
}
```

## Navigation Bar

The pill-style navbar is in `src/styles/layout.css`:

```css
.nav-inner {
  background: rgba(31, 31, 31, 0.9);
  border-radius: 999px;
  padding: 10px clamp(16px, 4vw, 28px);
  backdrop-filter: blur(10px);
}
```

Adjust `border-radius`, `padding`, and `backdrop-filter` to change appearance.

## Hero Banner

The hero section background image and overlay in `src/styles/layout.css`:

```css
.hero {
  background-image: url("/abc-site/assets/images/blocks.svg");
  background-size: auto 100%;
  background-position: left center;
}

.hero::before {
  background: linear-gradient(
    135deg,
    rgba(13, 13, 13, 0.85) 0%,
    rgba(13, 13, 13, 0.7) 100%
  );
}
```

Replace the SVG path to use a different banner image.

## Project Card Layout

Project cards are defined in `src/styles/modpacks.css`:

```css
.modpack {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto auto;
  /* ... */
}
```

Modify grid structure to change the layout of thumbnail, title, pills, and buttons.

## Building & Testing

After making changes:

```bash
bundle exec jekyll build
```

Check `_site/` to see compiled output. Rerun `jekyll serve` to test live changes.

---

**Tips:** Use CSS variables for consistent theming. Test on mobile to ensure responsive design works.
