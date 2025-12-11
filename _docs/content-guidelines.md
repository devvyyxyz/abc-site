---
layout: docs
title: Content Guidelines
description: Writing style guide and content standards for the ABC showcase.
nav_order: 18
category: Community
tags: [guidelines, writing, style, standards, content]
---

# Content Guidelines

Maintain consistent, high-quality content across your ABC showcase.

## Writing Style

### Voice & Tone

**Be Clear and Concise:**

```markdown
<!-- Good -->

Install dependencies with `bundle install`.

<!-- Avoid -->

You should probably install the dependencies using the bundle install command.
```

**Be Helpful:**

```markdown
<!-- Good -->

If the build fails, check your Ruby version with `ruby -v`.

<!-- Avoid -->

The build might fail for various reasons.
```

**Be Friendly:**

```markdown
<!-- Good -->

Great! Your site is now live.

<!-- Avoid -->

The deployment process has completed successfully.
```

### Grammar & Formatting

**Use Active Voice:**

```markdown
<!-- Good -->

Run `jekyll build` to compile your site.

<!-- Avoid -->

Your site can be compiled by running `jekyll build`.
```

**Use Present Tense:**

```markdown
<!-- Good -->

The theme toggle changes between light and dark mode.

<!-- Avoid -->

The theme toggle will change between light and dark mode.
```

**Use Second Person:**

```markdown
<!-- Good -->

You can customize colors in `src/styles/variables.css`.

<!-- Avoid -->

Users can customize colors in `src/styles/variables.css`.
```

## Documentation Structure

### Page Template

```yaml
---
layout: docs
title: Clear, Descriptive Title
description: One-sentence summary of what this page covers.
nav_order: 5
category: Setup
tags: [relevant, searchable, tags]
---

# Page Title

Brief introduction explaining what users will learn.

## Section 1

Content with examples...

## Section 2

More content...

## Next Steps

- [Related Page 1](link1.html)
- [Related Page 2](link2.html)
```

### Headings

Use hierarchical structure:

```markdown
# H1 - Page Title (only one per page)

## H2 - Major Section

### H3 - Subsection

#### H4 - Minor Point

##### H5 - Rarely Used

###### H6 - Avoid
```

**Good Heading Structure:**

```markdown
# Deployment Guide

## Prerequisites

## GitHub Pages

### Configuration

### Deployment

## Netlify

### Configuration
```

## Code Examples

### Format Code Blocks

Use language-specific syntax highlighting:

````markdown
```bash
# Bash commands
bundle exec jekyll build
```

```yaml
# YAML configuration
title: My Site
baseurl: /my-site
```

```javascript
// JavaScript code
function toggleTheme() {
  // ...
}
```

```liquid
<!-- Liquid templates -->
{% for item in array %}
  {{ item }}
{% endfor %}
```
````

### Inline Code

Use backticks for:

- Commands: `bundle install`
- File names: `_config.yml`
- Code variables: `site.title`
- Short code: `npm start`

```markdown
Edit the `_config.yml` file and set `baseurl` to your repository name.
```

### Example Comments

```javascript
// Good: Explain WHY, not WHAT
// Cache the theme value to avoid repeated lookups
const theme = localStorage.getItem("theme");

// Avoid: Explaining obvious code
// Get theme from localStorage
const theme = localStorage.getItem("theme");
```

## Links & References

### Internal Links

```liquid
<!-- Use relative_url filter -->
See the [setup guide]({{ '/docs/setup/' | relative_url }}).

<!-- Or for same section -->
See [Configuration](#configuration) below.
```

### External Links

```markdown
<!-- Open in new tab with security -->

Visit [Modrinth](https://modrinth.com/){:target="\_blank" rel="noopener"}.

<!-- Or in HTML -->

<a href="https://modrinth.com/" target="_blank" rel="noopener">Modrinth</a>
```

### Link Text

```markdown
<!-- Good: Descriptive -->

Read the [deployment guide](deployment.html) for more details.

<!-- Avoid: Generic -->

Click [here](deployment.html) to learn more.
```

## Lists

### Unordered Lists

```markdown
- First item
- Second item
  - Nested item
  - Another nested item
- Third item
```

### Ordered Lists

```markdown
1. First step
2. Second step
   1. Substep
   2. Another substep
3. Third step
```

### Task Lists

```markdown
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task
```

## Tables

### Simple Tables

```markdown
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Alignment

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| L1   |   C1   |    R1 |
| L2   |   C2   |    R2 |
```

### Complex Tables

```markdown
| Field       | Type   | Required | Description       |
| ----------- | ------ | -------- | ----------------- |
| `slug`      | string | Yes      | Unique identifier |
| `name`      | string | Yes      | Display name      |
| `downloads` | number | No       | Download count    |
```

## Admonitions & Callouts

### Info Boxes

```markdown
> **Note:** This feature requires Jekyll 3.9 or higher.

> **Tip:** Use incremental builds during development for faster rebuilds.

> **Warning:** Clearing the cache will remove all saved preferences.

> **Important:** Always backup your data before making major changes.
```

### Code with Explanations

````markdown
Run the following command:

```bash
bundle exec jekyll build --verbose
```
````

This will:

- Build your site
- Show detailed output
- Help identify errors

````

## Images

### Inline Images

```markdown
![Alt text description](/assets/images/screenshot.png)
````

### Images with Captions

```html
<figure>
  <img src="/assets/images/demo.png" alt="Demo screenshot" />
  <figcaption>The project card layout showing icons and badges</figcaption>
</figure>
```

### Responsive Images

```html
<picture>
  <source srcset="/assets/images/hero-large.webp" media="(min-width: 1024px)" />
  <source srcset="/assets/images/hero-medium.webp" media="(min-width: 768px)" />
  <img src="/assets/images/hero-small.webp" alt="Hero banner" />
</picture>
```

## File & Path References

### Consistent Formatting

```markdown
<!-- Files -->

Edit `_config.yml`
Open `src/styles/layout.css`
Check `_data/mods.json`

<!-- Directories -->

Navigate to `_docs/`
Create `assets/images/`

<!-- Paths -->

`/docs/setup/`
`https://yoursite.com/projects/`
```

### File Trees

```
project/
├── _config.yml
├── _data/
│   └── mods.json
├── _docs/
│   ├── getting-started.md
│   └── setup.md
├── assets/
│   ├── css/
│   └── images/
└── index.md
```

## Command Line Examples

### Format

```bash
# Comment explaining what this does
command --flag argument

# Example output (optional)
# > Success message
```

### Multiple Commands

```bash
# Install dependencies
bundle install

# Build the site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve
```

### Interactive Sessions

```bash
$ git status
On branch main
Your branch is up to date with 'origin/main'.

$ git add .
$ git commit -m "Update documentation"
[main abc1234] Update documentation
 1 file changed, 10 insertions(+)
```

## Modpack Descriptions

### Structure

```markdown
**Name**: Clear, memorable name
**Description**: 1-2 sentences summarizing the pack
**Key Features**:

- Feature 1
- Feature 2
- Feature 3

**Recommended For**: Target audience
```

### Example

```markdown
**Name**: Create: Engineering Adventures

**Description**: A technology-focused modpack centered around the Create mod, offering complex automation challenges and engineering puzzles suitable for both solo and multiplayer gameplay.

**Key Features**:

- 150+ mods focused on automation and engineering
- Custom quests guiding progression
- Balanced for survival gameplay
- Multiplayer-optimized

**Recommended For**: Players who enjoy technical challenges and building complex machines
```

### Writing Tips

**Be Specific:**

```markdown
<!-- Good -->

Includes 50+ magic mods with custom spell progression

<!-- Avoid -->

Has magic stuff
```

**Highlight Unique Features:**

```markdown
<!-- Good -->

Features a unique progression system that unlocks mods as you complete challenges

<!-- Avoid -->

Has progression
```

**Mention Prerequisites:**

```markdown
<!-- Good -->

Requires 8GB+ RAM. Best with 16GB.

<!-- Avoid -->

Needs memory
```

## Version Numbers

### Format

```markdown
<!-- Semantic versioning -->

v1.2.3
Version 2.0.0

<!-- Minecraft versions -->

1.20.1
1.19.2-1.20.1

<!-- Mod loader versions -->

Fabric 0.14.21
Forge 47.1.0
```

## Dates & Times

### Format

```markdown
<!-- ISO 8601 for data -->

2025-12-10T10:30:00Z

<!-- Human-readable for display -->

December 10, 2025
Dec 10, 2025
2025-12-10
```

## Accessibility

### Alt Text

```markdown
<!-- Descriptive alt text -->

![Project card showing Create Adventures modpack with green icon and 50K downloads](/path/to/image.png)

<!-- Not just the file name -->

![screenshot-1.png](/path/to/image.png)
```

### Link Descriptions

```markdown
<!-- Good -->

Read the [accessibility guide](accessibility.html) for WCAG compliance details

<!-- Avoid -->

[Click here](accessibility.html) for more
```

## SEO Best Practices

### Meta Descriptions

```yaml
---
title: Setup Guide
description: Learn how to set up your ABC showcase in under 5 minutes with this step-by-step guide.
---
```

**Requirements:**

- 150-160 characters
- Include target keyword
- Be compelling
- Unique per page

### Keywords in Content

```markdown
<!-- Natural keyword usage -->

This **deployment guide** shows you how to **deploy your Jekyll site** to GitHub Pages, Netlify, or Vercel.

<!-- Avoid keyword stuffing -->

Deploy deployment deploying Jekyll Jekyll site site deploy...
```

## Review Checklist

Before publishing content:

- [ ] Spelling and grammar checked
- [ ] Code examples tested and working
- [ ] Links verified (no 404s)
- [ ] Images optimized and have alt text
- [ ] Headings follow hierarchy (H1 → H2 → H3)
- [ ] Consistent formatting throughout
- [ ] Meta description written (150-160 chars)
- [ ] Tags relevant and useful
- [ ] Category assigned correctly
- [ ] Mobile-friendly formatting
- [ ] Accessible to screen readers
- [ ] Next steps / related links included

## Style Guide Summary

| Element     | Format                              |
| ----------- | ----------------------------------- |
| Commands    | `backticks`                         |
| Files       | `_config.yml`                       |
| Directories | `_docs/`                            |
| Variables   | `site.title`                        |
| Links       | `[text](url)`                       |
| Emphasis    | **bold** for UI, _italic_ for terms |
| Code blocks | Use language syntax highlighting    |
| Lists       | Parallel structure                  |
| Headings    | Title case                          |

## Common Mistakes

### Inconsistent Terminology

```markdown
<!-- Pick one and stick with it -->

modpack / mod pack
setup / set up (noun vs verb)
GitHub / Github
```

### Overcomplicating

```markdown
<!-- Good -->

Click the theme toggle to switch between light and dark mode.

<!-- Too complex -->

In order to facilitate the modification of the visual appearance schema, one must engage with the theme selection mechanism located in the navigation component.
```

### Missing Context

````markdown
<!-- Bad: No context -->

Run this command:

```bash
npm install
```
````

<!-- Good: With context -->

Install Node dependencies:

```bash
npm install
```

```

## Next Steps

- [Adding Modpacks](add-modpack.html) - Content creation
- [Contributing Guide](contributing.html) - Submission process
- [SEO Guide](seo-guide.html) - Optimize content
```
