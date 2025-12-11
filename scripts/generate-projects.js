#!/usr/bin/env node
/**
 * Generate project markdown files from mods.json
 * Run: node scripts/generate-projects.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsDir = path.join(__dirname, '..', '_projects');
const modsFile = path.join(__dirname, '..', 'data', 'mods.json');

// Ensure _projects directory exists
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// Read mods.json
const modsData = JSON.parse(fs.readFileSync(modsFile, 'utf-8'));

// Generate markdown file for each project
modsData.forEach(mod => {
  const slug = mod.slug || mod.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const filename = path.join(projectsDir, `${slug}.md`);
  
  const frontmatter = {
    layout: 'project',
    title: mod.title,
    slug: slug,
    description: mod.description,
    icon_url: mod.icon_url,
    project_url: mod.project_url,
    source_url: mod.source_url,
    downloads: mod.downloads,
    followers: mod.followers,
    updated: mod.updated,
    game_versions: mod.game_versions || [],
    loaders: mod.loaders || [],
    categories: mod.categories || [],
    display_categories: mod.display_categories || [],
  };

  const frontmatterStr = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
      } else if (typeof value === 'string' && value.includes('\n')) {
        return `${key}: |\n  ${value.split('\n').join('\n  ')}`;
      } else if (typeof value === 'string') {
        return `${key}: "${value}"`;
      } else {
        return `${key}: ${value}`;
      }
    })
    .join('\n');

  const markdown = `---
${frontmatterStr}
---

{{ content }}
`;

  fs.writeFileSync(filename, markdown);
  console.log(`✓ Generated: ${slug}.md`);
});

console.log(`\n✓ Generated ${modsData.length} project pages`);
