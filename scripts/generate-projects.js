#!/usr/bin/env node
/**
 * Generate project markdown files from mods.json
 * Run: node scripts/generate-projects.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsDir = path.join(__dirname, "..", "_projects");
const modsFile = path.join(__dirname, "..", "data", "mods.json");

// Ensure _projects directory exists
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// Read mods.json
const modsData = JSON.parse(fs.readFileSync(modsFile, "utf-8"));

// Helper function to extract first paragraph or sentence
function extractShortDescription(text) {
  if (!text) return "";
  // Remove markdown images and links, get first sentence/paragraph
  const cleaned = text
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove markdown images
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1") // Convert links to text
    .split("\n")[0] // First line
    .split("##")[0] // Before first header
    .trim();

  // Get first sentence (up to period, exclamation, or question mark)
  const firstSentence = cleaned.match(/^[^.!?]*[.!?]/);
  return firstSentence ? firstSentence[0] : cleaned.substring(0, 160);
}

// Generate markdown file for each project
modsData.forEach((mod) => {
  const slug =
    mod.slug ||
    mod.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  const filename = path.join(projectsDir, `${slug}.md`);

  // Extract short description (for hero section)
  const shortDesc = extractShortDescription(
    mod.description || mod.short_description || ""
  );

  // Use full description as long_description for About section
  const longDesc = (mod.description || "").trim();

  const frontmatter = {
    layout: "project",
    title: mod.title,
    slug: slug,
    description: shortDesc || "A Minecraft project",
    long_description: longDesc,
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
        return `${key}: [${value.map((v) => `"${v}"`).join(", ")}]`;
      } else if (typeof value === "string" && value.includes("\n")) {
        return `${key}: |\n  ${value.split("\n").join("\n  ")}`;
      } else if (typeof value === "string") {
        // Escape quotes in strings
        const escaped = value.replace(/"/g, '\\"');
        return `${key}: "${escaped}"`;
      } else {
        return `${key}: ${value}`;
      }
    })
    .join("\n");

  const markdown = `---
${frontmatterStr}
---

<!-- Project page generated from mods.json -->
`;

  fs.writeFileSync(filename, markdown);
  console.log(`✓ Generated: ${slug}.md`);
});

console.log(`\n✓ Generated ${modsData.length} project pages`);
