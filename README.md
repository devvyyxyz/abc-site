# ABC Site - Minecraft Showcase

A Jekyll-based static site for showcasing Minecraft mods, resource packs, datapacks, modpacks, and plugins.

## Quick Start

### Prerequisites
- Ruby 2.6+ with Bundler
- Node.js (optional, for fetching Modrinth data)

### Setup
```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# Visit http://localhost:4000
```

## Project Structure

See [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) for detailed directory layout.

**Key directories:**
- `src/` - Source code (scripts, styles)
- `assets/` - Compiled output
- `_includes/` - Template partials
- `_layouts/` - Page layouts
- `docs/` - Developer documentation

## Contributing

See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) for development guidelines.

## Features

- 🎨 Clean, responsive design
- 🔍 Built-in search functionality
- 🌐 Modrinth API integration for auto-fetching projects
- 📱 Mobile-friendly
- ⚡ Static site (no backend required)
- 🎯 SEO-optimized

## Configuration

Edit `_config.yml` to customize:
- Site title and description
- Social media links
- Theme color
- Organization logo

## Deployment

Automatically deployed to GitHub Pages on push to `main` branch.

See `.github/workflows/` for CI/CD configuration.
