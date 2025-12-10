#!/usr/bin/env node
/**
 * Fetch Modrinth organization/user projects and save to data/mods.json
 * Requires MODRINTH_API_TOKEN environment variable
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const token = process.env.MODRINTH_API_TOKEN;

async function fetchProjects() {
  try {
    console.log('🔄 Fetching Modrinth projects...');

    // Build headers (token is optional)
    const headers = {
      'User-Agent': 'ABC-Site (github.com/devvyyxyz/abc-site)'
    };
    if (token) {
      headers['Authorization'] = token;
    }

    let projects = [];

    // Fetch abcxyz organization projects using v3 API (public)
    try {
      const orgRes = await fetch('https://api.modrinth.com/v3/organization/abcxyz/projects', {
        headers
      });

      if (orgRes.ok) {
        const orgProjects = await orgRes.json();
        console.log(`✓ Found ${orgProjects.length} projects for organization abcxyz`);
        projects = orgProjects;
      }
    } catch (e) {
      console.error('❌ Failed to fetch organization projects:', e.message);
    }

    // If authenticated, also fetch user's personal projects
    if (token) {
      try {
        const meRes = await fetch('https://api.modrinth.com/v2/user', {
          headers
        });

        if (meRes.ok) {
          const user = await meRes.json();
          console.log(`✓ Authenticated as: ${user.username}`);

          const projectsRes = await fetch(`https://api.modrinth.com/v2/user/${user.id}/projects`, {
            headers
          });

          if (projectsRes.ok) {
            const userProjects = await projectsRes.json();
            console.log(`✓ Found ${userProjects.length} projects for ${user.username}`);
            // Merge, avoiding duplicates
            const existingIds = new Set(projects.map(p => p.id));
            const newProjects = userProjects.filter(p => !existingIds.has(p.id));
            projects = [...projects, ...newProjects];
          }
        }
      } catch (e) {
        console.log('ℹ Could not fetch authenticated user projects:', e.message);
      }
    }

    // Format projects for display
    const formattedProjects = projects.map(p => {
      // Handle both v2 (project_type) and v3 (project_types array) formats
      const projectType = p.project_type || (p.project_types && p.project_types[0]) || 'mod';
      const shortDescription = p.summary || p.description || '';

      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        title: p.name,
        description: p.description,
        short_description: shortDescription,
        type: projectType,
        project_type: projectType,
        author: p.author || (p.organization ? 'abcxyz' : 'unknown'),
        thumbnail: p.icon_url,
        icon_url: p.icon_url,
        download: `https://modrinth.com/${projectType}/${p.slug}`,
        categories: p.categories || [],
        display_categories: p.additional_categories || [],
        tags: p.categories || []
      };
    });

    // Save to data/mods.json
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.join(dataDir, 'mods.json');
    fs.writeFileSync(outputPath, JSON.stringify(formattedProjects, null, 2));

    console.log(`✅ Saved ${formattedProjects.length} projects to data/mods.json`);
    console.log(`Last updated: ${new Date().toISOString()}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fetchProjects();

fetchProjects();
