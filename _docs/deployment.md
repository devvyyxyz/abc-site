---
layout: docs
title: Deployment Guide
description: Deploy your ABC showcase to GitHub Pages, Netlify, or Vercel.
nav_order: 7
category: Developer
tags: [deployment, hosting, github-pages, netlify, vercel]
---

# Deployment Guide

Learn how to deploy your ABC showcase to popular hosting platforms.

## GitHub Pages

### Automatic Deployment

1. **Enable GitHub Pages** in repository settings
2. **Set source** to GitHub Actions
3. **Create workflow** file `.github/workflows/jekyll.yml`:

```yaml
name: Deploy Jekyll site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.1"
          bundler-cache: true
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Configuration

Update `_config.yml` with your repository name:

```yaml
baseurl: "/your-repo-name"
url: "https://username.github.io"
```

## Netlify

### One-Click Deploy

1. **Connect repository** to Netlify
2. **Configure build settings**:
   - Build command: `bundle exec jekyll build`
   - Publish directory: `_site`
3. **Set environment variables**:
   - `JEKYLL_ENV`: `production`

### netlify.toml

Create `netlify.toml` in root:

```toml
[build]
  command = "bundle exec jekyll build"
  publish = "_site"

[build.environment]
  JEKYLL_ENV = "production"
  RUBY_VERSION = "3.1"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

## Vercel

### Deploy with Vercel CLI

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Run**: `vercel`
3. **Follow prompts** to link repository

### vercel.json

Create `vercel.json`:

```json
{
  "buildCommand": "bundle exec jekyll build",
  "outputDirectory": "_site",
  "framework": "jekyll",
  "installCommand": "bundle install"
}
```

## Environment Variables

### Production Settings

Set these for optimal production builds:

- `JEKYLL_ENV=production` - Enables production mode
- `BUNDLE_WITHOUT=development` - Skip dev dependencies

### Custom Variables

Add to `_config.yml`:

```yaml
# Development
development:
  api_url: "http://localhost:4000"

# Production
production:
  api_url: "https://api.yoursite.com"
```

Access in templates:

```liquid
{% if jekyll.environment == "production" %}
  {{ site.production.api_url }}
{% else %}
  {{ site.development.api_url }}
{% endif %}
```

## Performance Optimization

### Build Optimization

1. **Exclude unnecessary files** in `_config.yml`
2. **Enable incremental builds**: `jekyll build --incremental`
3. **Use caching** in CI/CD pipelines

### Asset Optimization

```yaml
# _config.yml
sass:
  style: compressed

exclude:
  - node_modules/
  - src/
  - Gemfile
  - Gemfile.lock
  - README.md
```

## Troubleshooting

### Build Failures

**Missing dependencies:**

```bash
bundle install
bundle update
```

**Path issues:**

- Check `baseurl` in `_config.yml`
- Use `{{ '/path' | relative_url }}` in templates

**Version conflicts:**

```bash
bundle exec jekyll build --verbose
```

### Cache Issues

Clear build cache:

```bash
# Local
rm -rf _site .jekyll-cache

# Netlify: Clear cache in Deploy settings
# Vercel: Redeploy without cache
# GitHub Pages: Re-run workflow
```

## Next Steps

- [GitHub Actions Guide](github-actions.html) - Automate workflows
- [Performance Optimization](performance.html) - Speed up your site
- [SEO Guide](seo-guide.html) - Improve search rankings
