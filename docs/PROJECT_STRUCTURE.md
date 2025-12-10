# Project Structure

## Overview
ABC Site is a Jekyll-based static site for showcasing Minecraft mods, resource packs, datapacks, modpacks, and plugins.

## Directory Layout

```
abc-site/
├── _config.yml              # Jekyll configuration
├── _data/                   # Jekyll data files (site configuration)
├── _includes/               # Jekyll template partials (header, footer, etc)
├── _layouts/                # Jekyll page layouts
├── _sass/                   # DEPRECATED - use src/styles instead
├── src/                     # Source files (before build)
│   ├── scripts/             # JavaScript source files
│   │   ├── main.js          # Main app logic & includes loader
│   │   ├── modrinth.js      # Modrinth API integration
│   │   ├── search.js        # Search functionality
│   │   ├── social-links.js  # Social media links renderer
│   │   └── config.js        # Configuration
│   └── styles/              # CSS stylesheets
│       ├── root.css         # CSS variables & global styles
│       ├── layout.css       # Navigation, footer, grid layouts
│       ├── components.css   # Reusable component styles
│       ├── modpacks.css     # Modpack card styles
│       └── loading.css      # Loading overlay & body visibility
├── assets/                  # Compiled output (generated from src/)
│   ├── css/                 # Processed CSS files
│   ├── js/                  # Processed JavaScript files
│   └── img/                 # Images
├── data/                    # Runtime data files
│   └── modrinth.json        # Modrinth org configuration
├── public/                  # Public static assets
├── pages/                   # DEPRECATED - use root .md files instead
├── _site/                   # GENERATED - Jekyll build output
├── vendor/                  # GENERATED - Ruby gems
├── .github/                 # GitHub configuration
│   └── workflows/           # GitHub Actions workflows
├── package.json             # Node.js configuration & scripts
└── docs/                    # Development documentation

## Key Files

### Configuration
- `_config.yml` - Main Jekyll settings (title, description, social links, etc)
- `_data/` - Dynamic site data that can be referenced in layouts
- `data/modrinth.json` - Modrinth organization settings

### Source Code
- `src/scripts/` - All JavaScript source
- `src/styles/` - All CSS source
- `assets/` - Compiled/output files (do NOT edit directly)

### Content
- `index.md` - Home page
- `about.md` - About page
- `mods.md` - Mods listing page

## Development Workflow

### Local Development
```bash
# Install dependencies
bundle install

# Build and serve locally
bundle exec jekyll serve

# Watch for changes
bundle exec jekyll serve --watch
```

### Build Process
1. Modify source files in `src/`
2. Run build command to compile to `assets/`
3. Jekyll processes `*.md` files and uses files from `assets/`
4. Output is generated in `_site/`

## Important Notes

- **Do NOT edit** `assets/` directly - it's generated from `src/`
- **Do NOT edit** `_site/` - it's regenerated on every build
- **Do NOT use** `pages/` or `_sass/` - legacy directories, use `src/` instead
- Update `_config.yml` for site-wide settings
- Use Jekyll Liquid syntax in `.md` and `.html` files

## Adding New Pages

1. Create a `.md` file in the root with Jekyll front matter:
```yaml
---
layout: default
title: Page Title
description: Page description
permalink: /page-path/
---

Page content here...
```

2. Reference in navigation by editing `_includes/nav.html`

## Customizing Styles

1. Edit CSS files in `src/styles/`
2. CSS is automatically served from `assets/css/` in development
3. For production, run build process to compile to `assets/`

## Scripts & Assets

- JavaScript files in `src/scripts/` are referenced from `assets/js/`
- Images go in `assets/img/`
- Keep scripts modular and documented
