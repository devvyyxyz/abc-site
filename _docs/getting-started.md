---
layout: doc
title: Getting Started
nav_order: 1
category: Setup
tags: [setup, installation, quickstart]
description: Quick steps to rebrand, fetch projects, and run the site locally.
---

## Rebrand

- Edit `_config.yml` (`site` block) for name, title, description, logo.
- Swap icons: update `meta.favicon`, `meta.apple_touch_icon`, `meta.og_image` and replace files in `assets/images/`.

## Configure Modrinth

- Set `modrinth.org_slug` (and `MODRINTH_API_TOKEN` if you want private projects).
- Run `npm run fetch` to refresh `data/mods.json`.

## Run locally

```bash
bundle exec jekyll serve --livereload
# visit http://localhost:4000/abc-site/
```
