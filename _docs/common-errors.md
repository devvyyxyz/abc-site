---
layout: docs
title: Common Errors & Troubleshooting
description: Solutions to common issues when building and deploying your ABC showcase.
nav_order: 15
category: Help
tags: [troubleshooting, errors, debugging, help, fixes]
---

# Common Errors & Troubleshooting

Quick solutions to common issues you might encounter.

## Build Errors

### Jekyll Build Fails

**Error**: `jekyll 3.9.0 | Error:  Permission denied`

**Solution**:

```bash
# Fix permissions
chmod -R 755 _site

# Or clean and rebuild
bundle exec jekyll clean
bundle exec jekyll build
```

**Error**: `Dependency Error: Yikes! It looks like you don't have bundler`

**Solution**:

```bash
gem install bundler
bundle install
```

**Error**: `Could not find gem 'jekyll'`

**Solution**:

```bash
bundle install
# Or
gem install jekyll
```

### Liquid Syntax Errors

**Error**: `Liquid Exception: Liquid syntax error`

**Solution**:

```liquid
<!-- Bad: Unclosed tag -->
{% for item in array

<!-- Good: Properly closed -->
{% for item in array %}
  {{ item }}
{% endfor %}
```

**Error**: `undefined method 'map' for nil:NilClass`

**Solution**:

```liquid
<!-- Check if variable exists first -->
{% if site.data.mods.modpacks %}
  {% assign names = site.data.mods.modpacks | map: "name" %}
{% endif %}
```

### YAML Frontmatter Issues

**Error**: `YAML Exception reading file`

**Solution**:

```yaml
# Bad: Missing closing quotes
---
title: "My Title
---

# Good: Properly quoted
---
title: "My Title"
description: "My description"
---

# Or use literal block for multiline
---
title: My Title
description: |
  This is a longer
  description text
---
```

## Styling Issues

### Styles Not Loading

**Problem**: CSS changes not appearing

**Solutions**:

```bash
# 1. Clear cache
bundle exec jekyll clean
bundle exec jekyll build

# 2. Hard refresh browser
# Mac: Cmd + Shift + R
# Windows/Linux: Ctrl + Shift + R

# 3. Check file path
# Should be: {{ '/assets/css/main.css' | relative_url }}
# Not: /assets/css/main.css (without filter)
```

### CSS Not Compiling

**Error**: `Sass Error: Invalid CSS`

**Solution**:

```scss
// Bad: Missing semicolon
.element {
  color: red
  background: blue;
}

// Good:
.element {
  color: red;
  background: blue;
}
```

### Theme Toggle Not Working

**Problem**: Theme switch doesn't persist

**Solution**:

```javascript
// Check localStorage is working
if (typeof Storage !== "undefined") {
  localStorage.setItem("theme", "dark");
  console.log(localStorage.getItem("theme"));
} else {
  console.error("LocalStorage not supported");
}

// Ensure theme is set on page load
document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", theme);
});
```

## Asset Loading Issues

### Images Not Displaying

**Problem**: Broken image icons

**Solutions**:

```liquid
<!-- Bad: Absolute path without baseurl -->
<img src="/assets/images/logo.png">

<!-- Good: Use relative_url filter -->
<img src="{{ '/assets/images/logo.png' | relative_url }}">

<!-- For external URLs -->
<img src="https://cdn.modrinth.com/data/abc/icon.png">
```

**Check file exists**:

```bash
# List image directory
ls -la assets/images/

# Check file permissions
chmod 644 assets/images/logo.png
```

### Font Awesome Icons Not Showing

**Problem**: Boxes or missing icons

**Solutions**:

```html
<!-- 1. Verify CDN link is correct -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>

<!-- 2. Check icon class syntax -->
<!-- Bad -->
<i class="fa-gear"></i>

<!-- Good -->
<i class="fa-solid fa-gear"></i>
```

**Test icon loading**:

```javascript
// Check if Font Awesome loaded
if (window.FontAwesome) {
  console.log("Font Awesome loaded");
} else {
  console.error("Font Awesome not loaded");
}
```

## Data Issues

### Modpack Data Not Rendering

**Problem**: Projects page is empty

**Solutions**:

```bash
# 1. Check JSON is valid
cat _data/mods.json | jq .

# 2. Verify file location
ls -la _data/mods.json

# 3. Check YAML config
grep -A 5 "data_dir" _config.yml
```

**Debug in template**:

```liquid
<!-- Check if data exists -->
{% if site.data.mods %}
  <p>Data loaded: {{ site.data.mods.modpacks | size }} modpacks</p>
{% else %}
  <p>No data found</p>
{% endif %}

<!-- Inspect data structure -->
<pre>{{ site.data.mods | jsonify }}</pre>
```

### JSON Parsing Errors

**Error**: `Unexpected token in JSON`

**Solution**:

```bash
# Validate JSON
cat _data/mods.json | python -m json.tool

# Or use jq
jq '.' _data/mods.json
```

Common JSON mistakes:

```json
// Bad: Trailing comma
{
  "modpacks": [
    {"name": "Pack 1"},
  ]
}

// Good: No trailing comma
{
  "modpacks": [
    {"name": "Pack 1"}
  ]
}

// Bad: Single quotes
{'name': 'value'}

// Good: Double quotes
{"name": "value"}
```

## Deployment Issues

### GitHub Pages 404 Error

**Problem**: Pages work locally but 404 on GitHub Pages

**Solutions**:

```yaml
# 1. Check baseurl in _config.yml
baseurl: "/your-repo-name" # Must match repo name
url: "https://username.github.io"
# 2. Ensure GitHub Pages is enabled
# Settings > Pages > Source: GitHub Actions or main branch
```

```liquid
<!-- Use relative_url in all links -->
<a href="{{ '/docs/' | relative_url }}">Docs</a>
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
```

### Build Succeeds But Site Not Updating

**Solutions**:

```bash
# 1. Clear GitHub Actions cache
# Go to Actions > Select workflow > Re-run jobs > Clear cache

# 2. Check deployment status
# Actions tab > View latest workflow run

# 3. Verify _config.yml excludes
exclude:
  - node_modules/
  - vendor/
  - .git/
```

### Netlify Build Fails

**Error**: `Command failed with exit code 127`

**Solution**:

```toml
# netlify.toml
[build.environment]
  RUBY_VERSION = "3.1"

[build]
  command = "bundle install && bundle exec jekyll build"
  publish = "_site"
```

## Performance Issues

### Slow Build Times

**Problem**: Build takes 30+ seconds

**Solutions**:

```yaml
# 1. Exclude unnecessary files
exclude:
  - node_modules/
  - src/
  - vendor/
  - .git/
  - README.md

# 2. Use incremental builds (dev only)
# bundle exec jekyll serve --incremental

# 3. Limit collection size
collections:
  docs:
    output: true
```

### Slow Page Load

**Problem**: Pages take 5+ seconds to load

**Solutions**:

```html
<!-- 1. Defer non-critical CSS -->
<link
  rel="preload"
  href="/assets/css/main.css"
  as="style"
  onload="this.rel='stylesheet'"
/>

<!-- 2. Lazy load images -->
<img src="image.jpg" loading="lazy" />

<!-- 3. Defer JavaScript -->
<script src="/assets/js/main.js" defer></script>
```

See [Performance Guide](performance.html) for more.

## Search & Filter Issues

### Search Not Working

**Problem**: Typing in search input doesn't filter results

**Debug**:

```javascript
// Check if docs are loaded
console.log("Total docs:", allDocs.length);

// Test search function
const results = searchDocs("setup");
console.log("Search results:", results);

// Verify event listener
document.getElementById("docs-search").addEventListener("input", (e) => {
  console.log("Search query:", e.target.value);
});
```

**Common fixes**:

```javascript
// Ensure correct element IDs
const searchInput = document.getElementById("docs-search");
const categorySelect = document.getElementById("docs-category");

// Case-insensitive search
const query = searchInput.value.toLowerCase();
const matches = allDocs.filter((doc) =>
  doc.title.toLowerCase().includes(query)
);
```

## Browser Compatibility

### Site Broken in Safari

**Problem**: CSS Grid not working

**Solution**:

```css
/* Add fallback for older browsers */
.grid {
  display: flex;
  flex-wrap: wrap;
}

@supports (display: grid) {
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
```

### JavaScript Errors in IE11

**Problem**: `Unexpected token` errors

**Solution**:

```javascript
// Don't use arrow functions in IE11
// Bad:
const myFunc = () => {};

// Good:
var myFunc = function () {};

// Or add polyfills
// <script src="https://polyfill.io/v3/polyfill.min.js"></script>
```

## Git Issues

### Large Files Rejected

**Error**: `remote: error: File too large`

**Solution**:

```bash
# Remove large file from history
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/large-file' \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin --force --all

# Add to .gitignore
echo "path/to/large-files/" >> .gitignore
```

### Merge Conflicts

**Problem**: `CONFLICT (content): Merge conflict in file`

**Solution**:

```bash
# View conflicted files
git status

# Edit file to resolve conflicts
# Look for:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# Choose one or combine, then:
git add resolved-file.txt
git commit -m "Resolved merge conflict"
```

## Debugging Tips

### Enable Verbose Output

```bash
# Jekyll
bundle exec jekyll build --verbose

# Show full error traces
bundle exec jekyll build --trace

# Profile build time
bundle exec jekyll build --profile
```

### Browser DevTools

```javascript
// Check for JavaScript errors
// Open DevTools > Console

// Inspect element styles
// Right-click > Inspect

// Network tab for asset loading
// DevTools > Network > Reload page
```

### Liquid Debugging

```liquid
<!-- Print variable contents -->
{{ variable | inspect }}

<!-- Check variable type -->
{% if variable == nil %}
  Variable is nil
{% elsif variable == blank %}
  Variable is blank
{% else %}
  Variable exists: {{ variable }}
{% endif %}

<!-- Debug entire site data -->
<pre>{{ site | jsonify }}</pre>
```

## Getting Help

### Before Asking

1. **Search existing issues** on GitHub
2. **Check documentation** thoroughly
3. **Test in fresh browser** (incognito mode)
4. **Try latest version** of dependencies
5. **Create minimal reproduction** of the issue

### Where to Ask

- [Jekyll Talk Forum](https://talk.jekyllrb.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/jekyll) - Tag with `jekyll`
- [GitHub Issues](https://github.com/jekyll/jekyll/issues)
- Project-specific Discord/community

### Provide Details

When reporting issues, include:

```markdown
**Environment:**

- OS: macOS 13.0
- Ruby: 3.1.2
- Jekyll: 3.9.0
- Browser: Chrome 120

**Steps to reproduce:**

1. Run `bundle exec jekyll serve`
2. Navigate to /projects/
3. Click on first project

**Expected:** Project page loads
**Actual:** 404 error

**Logs:**
```

[error log here]

```

```

## Next Steps

- [FAQ](faq.html) - Frequently asked questions
- [Contributing](contributing.html) - Report bugs and contribute
- [GitHub Actions](github-actions.html) - Automate testing
