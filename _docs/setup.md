---
layout: doc
title: Setup & Configuration
nav_order: 2
category: Setup
tags: [configuration, branding, modrinth, deployment]
description: Configure branding, Modrinth integration, and deployment.
---

## Rebranding

Edit `_config.yml` to customize your showcase:

```yaml
site:
  name: Your Site Name
  title: Your Site Title
  description: A brief description
  logo: /assets/images/your-logo.svg
  color: "#1bd96f"
```

Replace images in `assets/images/`:

- `logo.svg` - Navbar logo
- `favicon.svg` - Browser tab icon
- `favicon.ico` - Fallback favicon

Update SEO metadata:

```yaml
meta:
  og_image: /assets/images/og-image.png
  apple_touch_icon: /assets/images/apple-touch.png
```

## Modrinth Integration

### Set Organization

In `_config.yml`:

```yaml
modrinth:
  org_slug: your-org-slug
```

### Fetch Projects

Automatically pull your projects from Modrinth:

```bash
npm run fetch
```

This updates `data/mods.json` with live project data including downloads, versions, and metadata.

### API Token (Optional)

For private projects, set the environment variable:

```bash
export MODRINTH_API_TOKEN=your_token_here
npm run fetch
```

Get your token from [Modrinth Settings](https://modrinth.com/dashboard/settings).

## Social Links

Configure social links in `_config.yml`:

```yaml
social:
  github: https://github.com/your-org/your-repo
  discord: https://discord.gg/your-invite
  twitter: https://twitter.com/your-handle
  modrinth: https://modrinth.com/organization/your-org
```

These appear in the navigation and footer.

## Running Locally

### Development

```bash
bundle install
npm install
bundle exec jekyll serve --livereload
```

Visit `http://localhost:4000/abc-site/` (adjust baseurl if needed)

### Production Build

```bash
bundle exec jekyll build
```

Output goes to `_site/` ready for deployment.

## Deployment

### GitHub Pages

The site auto-deploys on push to `main` via GitHub Actions (if configured).

**Manual deployment:**

```bash
bundle exec jekyll build
git add _site/
git commit -m "Update site"
git push origin main
```

### Custom Hosting

Build the site:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

Upload `_site/` contents to your hosting provider.

---

**Questions?** Check the [Getting Started](getting-started) guide or open an [issue]({{ site.social.github }}/issues).
