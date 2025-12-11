---
layout: docs
title: SEO Guide
description: Optimize your ABC showcase for search engines and social sharing.
nav_order: 14
category: Developer
tags: [seo, meta-tags, open-graph, search, optimization]
---

# SEO Guide

Optimize your ABC showcase for better search rankings and social media sharing.

## Meta Tags

### Basic SEO Meta Tags

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ page.title }} | {{ site.title }}</title>
  <meta
    name="description"
    content="{{ page.description | default: site.description }}"
  />
  <meta name="keywords" content="{{ page.tags | join: ', ' }}" />
  <meta name="author" content="{{ site.author }}" />
  <link rel="canonical" href="{{ page.url | absolute_url }}" />
</head>
```

### Jekyll SEO Tag Plugin

Install and configure:

```ruby
# Gemfile
gem 'jekyll-seo-tag'
```

```yaml
# _config.yml
plugins:
  - jekyll-seo-tag

title: ABC Showcase
description: Showcase your Minecraft modpacks beautifully
url: https://yoursite.com
author:
  name: Your Name
  twitter: yourusername

social:
  name: ABC Showcase
  links:
    - https://twitter.com/yourusername
    - https://github.com/yourusername
```

Include in layout:

```html
<head>
  {% seo %}
</head>
```

## Open Graph Tags

### For Social Media Sharing

```html
<meta property="og:title" content="{{ page.title }}" />
<meta property="og:description" content="{{ page.description }}" />
<meta
  property="og:image"
  content="{{ page.image | default: site.image | absolute_url }}"
/>
<meta property="og:url" content="{{ page.url | absolute_url }}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="{{ site.title }}" />
```

### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:creator" content="@yourusername" />
<meta name="twitter:title" content="{{ page.title }}" />
<meta name="twitter:description" content="{{ page.description }}" />
<meta name="twitter:image" content="{{ page.image | absolute_url }}" />
```

### Page-Specific OG Images

```yaml
# In page frontmatter
---
title: My Modpack
description: An amazing tech-focused modpack
image: /assets/images/modpack-preview.png
---
```

## Structured Data

### JSON-LD for Projects

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "{{ modpack.name }}",
    "description": "{{ modpack.description }}",
    "url": "{{ modpack.source_url }}",
    "downloadUrl": "{{ modpack.source_url }}",
    "image": "{{ modpack.icon_url }}",
    "applicationCategory": "Game",
    "operatingSystem": "Windows, macOS, Linux",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "{{ modpack.followers }}"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
</script>
```

### Organization Schema

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "{{ site.title }}",
    "url": "{{ site.url }}",
    "logo": "{{ '/assets/images/logo.png' | absolute_url }}",
    "sameAs": [
      "https://twitter.com/yourusername",
      "https://github.com/yourusername"
    ]
  }
</script>
```

### Breadcrumb Schema

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "{{ '/' | absolute_url }}"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "{{ page.category }}",
        "item": "{{ '/docs/category/' | append: page.category | slugify | append: '/' | absolute_url }}"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "{{ page.title }}"
      }
    ]
  }
</script>
```

## Sitemap

### Generate with Jekyll

```ruby
# Gemfile
gem 'jekyll-sitemap'
```

```yaml
# _config.yml
plugins:
  - jekyll-sitemap

url: https://yoursite.com
```

### Custom Sitemap

Create `sitemap.xml`:

```xml
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>{{ '/' | absolute_url }}</loc>
    <lastmod>{{ site.time | date_to_xmlschema }}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  {% for page in site.pages %}
    {% unless page.url contains 'feed' or page.url contains 'sitemap' %}
    <url>
      <loc>{{ page.url | absolute_url }}</loc>
      <lastmod>{{ site.time | date_to_xmlschema }}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    {% endunless %}
  {% endfor %}
  {% for doc in site.docs %}
    <url>
      <loc>{{ doc.url | absolute_url }}</loc>
      <lastmod>{{ doc.date | default: site.time | date_to_xmlschema }}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
  {% endfor %}
</urlset>
```

## Robots.txt

```
# /robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /_site/
Sitemap: https://yoursite.com/sitemap.xml
```

## URL Structure

### SEO-Friendly URLs

```yaml
# _config.yml
permalink: /:categories/:title/

collections:
  docs:
    output: true
    permalink: /docs/:name/
```

**Good URLs:**

- `/docs/getting-started/`
- `/projects/`
- `/docs/category/setup/`

**Bad URLs:**

- `/page.html?id=123`
- `/p/456`
- `/docs/doc1/`

## Content Optimization

### Title Tags

```liquid
<!-- Page titles -->
<title>{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}</title>

<!-- Keep under 60 characters -->
<!-- Include primary keyword -->
<!-- Make descriptive and unique -->
```

### Meta Descriptions

```yaml
---
description: Learn how to set up your ABC showcase in under 5 minutes with this comprehensive guide.
---
```

**Best practices:**

- 150-160 characters
- Include target keyword
- Make compelling and actionable
- Unique for each page

### Heading Structure

```html
<h1>Main Page Title</h1>
<!-- Only one per page -->
<h2>Major Section</h2>
<h3>Subsection</h3>
<h2>Another Section</h2>
```

### Internal Linking

```liquid
<!-- Link to related content -->
<p>See our <a href="{{ '/docs/setup/' | relative_url }}">setup guide</a> for more details.</p>

<!-- Use descriptive anchor text -->
<!-- Avoid "click here" -->
```

## Performance for SEO

### Page Speed

```yaml
# Fast loading = better SEO
# Target metrics:
# - First Contentful Paint: < 1.8s
# - Largest Contentful Paint: < 2.5s
# - Time to Interactive: < 3.8s
```

See [Performance Guide](performance.html) for optimization.

### Mobile-Friendly

```html
<!-- Responsive viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

```css
/* Mobile-first design */
.container {
  padding: 20px;
}

@media (min-width: 768px) {
  .container {
    padding: 40px;
  }
}
```

## Analytics

### Google Analytics 4

```html
<!-- Global site tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");
</script>
```

### Google Search Console

1. Add property at [search.google.com/search-console](https://search.google.com/search-console)
2. Verify ownership via HTML tag or DNS
3. Submit sitemap
4. Monitor performance and issues

### Track Important Metrics

- Organic search traffic
- Click-through rates
- Average position
- Core Web Vitals
- Mobile usability
- Index coverage

## Social Sharing Optimization

### Social Share Buttons

```html
<div class="share-buttons">
  <a
    href="https://twitter.com/intent/tweet?url={{ page.url | absolute_url }}&text={{ page.title }}"
    target="_blank"
    rel="noopener"
    aria-label="Share on Twitter"
  >
    <i class="fab fa-twitter"></i>
  </a>

  <a
    href="https://www.facebook.com/sharer/sharer.php?u={{ page.url | absolute_url }}"
    target="_blank"
    rel="noopener"
    aria-label="Share on Facebook"
  >
    <i class="fab fa-facebook"></i>
  </a>

  <a
    href="https://reddit.com/submit?url={{ page.url | absolute_url }}&title={{ page.title }}"
    target="_blank"
    rel="noopener"
    aria-label="Share on Reddit"
  >
    <i class="fab fa-reddit"></i>
  </a>
</div>
```

### Test Social Cards

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Best Practices Checklist

- [ ] Unique title and description for each page
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] SEO-friendly URLs (descriptive, lowercase, hyphens)
- [ ] Alt text for all images
- [ ] Internal linking between related pages
- [ ] Mobile-responsive design
- [ ] Fast page load times (< 3s)
- [ ] HTTPS enabled
- [ ] Sitemap.xml submitted to search engines
- [ ] Robots.txt configured
- [ ] Structured data (JSON-LD) implemented
- [ ] Open Graph tags for social sharing
- [ ] Canonical URLs set
- [ ] No broken links
- [ ] Google Analytics installed
- [ ] Google Search Console configured

## Common Issues

### Duplicate Content

```html
<!-- Use canonical tags -->
<link rel="canonical" href="{{ page.url | absolute_url }}" />
```

### Broken Links

```bash
# Check with htmlproofer
gem install html-proofer
bundle exec htmlproofer ./_site --assume-extension
```

### Missing Alt Text

```liquid
{% for modpack in site.data.mods.modpacks %}
  <img src="{{ modpack.icon_url }}"
       alt="{{ modpack.name }} icon"
       loading="lazy">
{% endfor %}
```

## Tools

- **Google Search Console**: Monitor search performance
- **Google PageSpeed Insights**: Test page speed
- **Screaming Frog**: Crawl and audit your site
- **Ahrefs/SEMrush**: Keyword research and tracking
- **Lighthouse**: Automated SEO auditing

## Next Steps

- [Performance Guide](performance.html) - Speed optimization
- [Accessibility Guide](accessibility.html) - Inclusive design
- [Deployment Guide](deployment.html) - Launch your site
