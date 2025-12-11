---
layout: docs
title: Adding Modpacks
description: Step-by-step guide to add new modpacks to your showcase.
nav_order: 17
category: User Guide
tags: [modpacks, content, adding, modrinth, tutorial]
---

# Adding Modpacks

Learn how to add new modpacks to your ABC showcase.

## Quick Start

### 1. Locate the Data File

Find `_data/mods.json` in your project root.

### 2. Add Modpack Entry

Add your modpack to the `modpacks` array:

```json
{
  "modpacks": [
    {
      "slug": "your-modpack-slug",
      "name": "Your Modpack Name",
      "description": "A brief description of your modpack",
      "icon_url": "https://cdn.modrinth.com/data/PROJECT_ID/icon.png",
      "downloads": 5000,
      "followers": 150,
      "categories": ["adventure", "technology"],
      "game_versions": ["1.20.1", "1.19.2"],
      "loaders": ["fabric", "forge"],
      "source_url": "https://modrinth.com/modpack/your-modpack-slug",
      "repository": "https://github.com/username/your-modpack",
      "updated_at": "2025-12-10T10:00:00Z"
    }
  ]
}
```

### 3. Rebuild Site

```bash
bundle exec jekyll build
```

## Field Reference

### Required Fields

| Field         | Type   | Description                       | Example                       |
| ------------- | ------ | --------------------------------- | ----------------------------- |
| `slug`        | string | Unique identifier (URL-safe)      | `"awesome-pack"`              |
| `name`        | string | Display name                      | `"Awesome Modpack"`           |
| `description` | string | Brief description (1-2 sentences) | `"A tech-focused modpack..."` |

### Optional Fields

| Field           | Type   | Description            | Example                          |
| --------------- | ------ | ---------------------- | -------------------------------- |
| `icon_url`      | string | URL to 512x512 icon    | `"https://cdn.modrinth.com/..."` |
| `downloads`     | number | Total download count   | `50000`                          |
| `followers`     | number | Follower count         | `1200`                           |
| `categories`    | array  | Category tags          | `["tech", "adventure"]`          |
| `game_versions` | array  | Supported MC versions  | `["1.20.1"]`                     |
| `loaders`       | array  | Mod loaders            | `["fabric", "forge"]`            |
| `source_url`    | string | Modrinth/CF page       | `"https://modrinth.com/..."`     |
| `repository`    | string | GitHub repo URL        | `"https://github.com/..."`       |
| `updated_at`    | string | Last update (ISO 8601) | `"2025-12-10T10:00:00Z"`         |

## From Modrinth

### Manual Method

1. **Find your modpack** on [Modrinth](https://modrinth.com/)
2. **Copy project data** from the page
3. **Add to `_data/mods.json`**

### Automated Method

Create a script to fetch from Modrinth API:

```bash
# Save as scripts/add-modpack.sh
#!/bin/bash

SLUG=$1
API_URL="https://api.modrinth.com/v2/project/$SLUG"

# Fetch data
DATA=$(curl -s "$API_URL")

# Extract fields
NAME=$(echo "$DATA" | jq -r '.title')
DESC=$(echo "$DATA" | jq -r '.description')
ICON=$(echo "$DATA" | jq -r '.icon_url')
DOWNLOADS=$(echo "$DATA" | jq -r '.downloads')
FOLLOWERS=$(echo "$DATA" | jq -r '.followers')

echo "Adding: $NAME"

# TODO: Append to _data/mods.json
# (Implementation left as exercise)
```

Usage:

```bash
chmod +x scripts/add-modpack.sh
./scripts/add-modpack.sh your-modpack-slug
```

### Using Node.js

```javascript
// scripts/add-modpack.js
const fs = require("fs");

async function addModpack(slug) {
  const response = await fetch(`https://api.modrinth.com/v2/project/${slug}`);
  const data = await response.json();

  const modpack = {
    slug: data.slug,
    name: data.title,
    description: data.description,
    icon_url: data.icon_url,
    downloads: data.downloads,
    followers: data.followers,
    categories: data.categories,
    game_versions: data.game_versions,
    loaders: data.loaders,
    source_url: `https://modrinth.com/modpack/${data.slug}`,
    repository: data.source_url,
    updated_at: data.updated,
  };

  // Read existing data
  const modsData = JSON.parse(fs.readFileSync("_data/mods.json", "utf8"));

  // Add new modpack
  modsData.modpacks.push(modpack);

  // Write back
  fs.writeFileSync("_data/mods.json", JSON.stringify(modsData, null, 2));

  console.log(`Added: ${modpack.name}`);
}

// Usage: node scripts/add-modpack.js your-modpack-slug
const slug = process.argv[2];
if (slug) {
  addModpack(slug);
} else {
  console.error("Usage: node add-modpack.js <slug>");
}
```

Run it:

```bash
node scripts/add-modpack.js awesome-pack
```

## Custom Icons

### Upload to Repository

1. **Add icon** to `assets/images/modpacks/`
2. **Reference in JSON**:

```json
{
  "icon_url": "/assets/images/modpacks/my-pack-icon.png"
}
```

### Requirements

- **Format**: PNG or WebP
- **Size**: 512x512px recommended
- **Max file size**: 500KB
- **Transparency**: Supported

### Optimize Icons

```bash
# Resize to 512x512
magick convert original.png -resize 512x512 icon.png

# Optimize PNG
pngquant --quality 65-80 icon.png

# Convert to WebP
magick convert icon.png -quality 80 icon.webp
```

## Categories

### Available Categories

Use these standard categories:

- `adventure` - Adventure & exploration
- `technology` - Tech & automation
- `magic` - Magic & spells
- `decoration` - Building & decoration
- `utility` - Quality of life
- `optimization` - Performance mods
- `cursed` - Experimental/chaotic
- `kitchen-sink` - Everything included
- `lightweight` - Minimal modpacks
- `multiplayer` - Server-friendly

### Custom Categories

Add your own:

```json
{
  "categories": ["custom-category", "another-category"]
}
```

Style them in CSS:

```css
.pill[data-category="custom-category"] {
  --pill-bg: rgba(255, 87, 34, 0.15);
  --pill-text: #ff5722;
  --pill-border: #ff5722;
}
```

## Bulk Import

### From JSON File

```javascript
// scripts/bulk-import.js
const fs = require("fs");

const newModpacks = [
  { slug: "pack-1", name: "Pack One", description: "Description..." },
  { slug: "pack-2", name: "Pack Two", description: "Description..." },
  // ... more modpacks
];

const modsData = JSON.parse(fs.readFileSync("_data/mods.json", "utf8"));
modsData.modpacks.push(...newModpacks);
fs.writeFileSync("_data/mods.json", JSON.stringify(modsData, null, 2));

console.log(`Imported ${newModpacks.length} modpacks`);
```

### From CSV

```javascript
// scripts/import-csv.js
const fs = require("fs");
const csv = require("csv-parser");

const modpacks = [];

fs.createReadStream("modpacks.csv")
  .pipe(csv())
  .on("data", (row) => {
    modpacks.push({
      slug: row.slug,
      name: row.name,
      description: row.description,
      icon_url: row.icon_url,
      downloads: parseInt(row.downloads) || 0,
      categories: row.categories ? row.categories.split(",") : [],
    });
  })
  .on("end", () => {
    const modsData = JSON.parse(fs.readFileSync("_data/mods.json", "utf8"));
    modsData.modpacks.push(...modpacks);
    fs.writeFileSync("_data/mods.json", JSON.stringify(modsData, null, 2));
    console.log(`Imported ${modpacks.length} modpacks`);
  });
```

CSV format:

```csv
slug,name,description,icon_url,downloads,categories
awesome-pack,Awesome Pack,A great modpack,https://...,5000,"tech,adventure"
```

## Sorting & Ordering

### Sort by Downloads

```javascript
// In JavaScript rendering
modpacks.sort((a, b) => b.downloads - a.downloads);
```

### Sort Alphabetically

```javascript
modpacks.sort((a, b) => a.name.localeCompare(b.name));
```

### Sort by Update Date

```javascript
modpacks.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
```

### Custom Order

Add `order` field:

```json
{
  "slug": "featured-pack",
  "name": "Featured Pack",
  "order": 1
}
```

Sort by order:

```javascript
modpacks.sort((a, b) => (a.order || 999) - (b.order || 999));
```

## Validation

### Validate JSON

```bash
# Check JSON is valid
cat _data/mods.json | python -m json.tool

# Or with jq
jq '.' _data/mods.json

# Or with Node.js
node -e "console.log(JSON.parse(require('fs').readFileSync('_data/mods.json', 'utf8')))"
```

### Validate Schema

Create validation script:

```javascript
// scripts/validate-mods.js
const fs = require("fs");

const modsData = JSON.parse(fs.readFileSync("_data/mods.json", "utf8"));

modsData.modpacks.forEach((mod, index) => {
  // Check required fields
  if (!mod.slug) console.error(`Modpack ${index}: Missing slug`);
  if (!mod.name) console.error(`Modpack ${index}: Missing name`);
  if (!mod.description) console.error(`Modpack ${index}: Missing description`);

  // Check slug format
  if (mod.slug && !/^[a-z0-9-]+$/.test(mod.slug)) {
    console.error(`Modpack ${index}: Invalid slug format`);
  }

  // Check downloads type
  if (mod.downloads && typeof mod.downloads !== "number") {
    console.error(`Modpack ${index}: downloads must be a number`);
  }
});

console.log("Validation complete");
```

Run:

```bash
node scripts/validate-mods.js
```

## Auto-Update from Modrinth

Set up automatic updates:

```yaml
# .github/workflows/update-mods.yml
name: Update Modpack Data

on:
  schedule:
    - cron: "0 0 * * *" # Daily at midnight
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "18"

      - name: Update data
        run: node scripts/update-modrinth.js

      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore: update modpack data"
          file_pattern: "_data/mods.json"
```

## Troubleshooting

### Issue: Modpack Not Showing

**Check**:

1. JSON is valid (no syntax errors)
2. Required fields present (`slug`, `name`, `description`)
3. Rebuild site: `bundle exec jekyll build`
4. Check browser console for errors

### Issue: Icon Not Displaying

**Solutions**:

- Verify `icon_url` is correct
- Check image exists and is accessible
- Try full URL instead of relative path
- Ensure image is not too large (< 1MB)

### Issue: Duplicate Slugs

```javascript
// Find duplicates
const slugs = modpacks.map((m) => m.slug);
const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
console.log("Duplicates:", duplicates);
```

## Best Practices

1. **Use descriptive slugs**: `create-tech-pack` not `pack1`
2. **Keep descriptions concise**: 1-2 sentences
3. **Optimize icons**: 512x512px, < 500KB
4. **Include all relevant tags**: Helps with filtering
5. **Update regularly**: Keep download counts fresh
6. **Validate before committing**: Catch errors early
7. **Use semantic versioning**: For game_versions
8. **Link to sources**: Always include `source_url`

## Next Steps

- [Content Guidelines](content-guidelines.html) - Writing standards
- [API Reference](api-reference.html) - Data structure details
- [GitHub Actions](github-actions.html) - Automate updates
