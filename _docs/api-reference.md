---
layout: doc
title: API Reference
nav_order: 7
category: Developer
tags: [api, modrinth, json, data]
description: Reference for project data structure and API integration.
---

## Project Data Structure

The `data/mods.json` file contains project data pulled from Modrinth. Here's the structure:

```json
{
  "id": "project_id",
  "slug": "project-slug",
  "name": "Project Name",
  "title": "Display Title",
  "description": "Full description...",
  "short_description": "Brief summary",
  "project_type": "mod|plugin|resourcepack|etc",
  "author": "author_name",
  "thumbnail": "https://cdn.modrinth.com/...",
  "icon_url": "https://cdn.modrinth.com/...",
  "download": "https://modrinth.com/mod/...",
  "categories": ["category1", "category2"],
  "loaders": ["fabric", "forge"],
  "game_versions": ["1.20", "1.20.1"],
  "downloads": 12345,
  "followers": 678,
  "published": "2025-01-01T00:00:00Z",
  "updated": "2025-12-10T07:24:19Z",
  "license_id": "MIT",
  "source_url": "https://github.com/..."
}
```

## Accessing Data in Templates

Use Liquid templates to access project data:

```liquid
{% for project in site.data.mods %}
  <h3>{{ project.name }}</h3>
  <p>{{ project.short_description }}</p>
{% endfor %}
```

## Modrinth API

The site uses Modrinth's public API to fetch project data. No authentication required for public projects.

**Endpoint:** `https://api.modrinth.com/v2/organization/{id}/projects`

**Example:**

```bash
curl https://api.modrinth.com/v2/organization/abcxyz/projects
```

---

See [Setup & Configuration](setup) for more about data integration.
