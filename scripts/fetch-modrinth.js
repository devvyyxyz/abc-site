#!/usr/bin/env node
/**
 * Fetch Modrinth organization/user projects and save to data/mods.json
 * Requires MODRINTH_API_TOKEN environment variable
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load config
let siteConfig = {};
try {
  const raw = fs.readFileSync(path.join(__dirname, '..', '_config.yml'), 'utf8');
  siteConfig = yaml.load(raw) || {};
} catch (e) {
  console.warn('⚠️ Could not read _config.yml, falling back to defaults');
}

const modrinthCfg = siteConfig.modrinth || {};
const orgSlug = process.env.MODRINTH_ORG_SLUG || modrinthCfg.org_slug || 'abcxyz';
const token = process.env.MODRINTH_API_TOKEN || (modrinthCfg.api_token_env ? process.env[modrinthCfg.api_token_env] : undefined);
const userAgent = modrinthCfg.user_agent || 'ABC-Site (github.com/devvyyxyz/abc-site)';

async function fetchProjects() {
  try {
    console.log('🔄 Fetching Modrinth projects...');

    // Build headers (token is optional)
    const headers = {
      'User-Agent': userAgent
    };
    if (token) {
      headers['Authorization'] = token;
    }

    let projects = [];

    // Fetch organization projects using v3 API (public)
    try {
      const orgRes = await fetch(`https://api.modrinth.com/v3/organization/${orgSlug}/projects`, {
        headers
      });

      if (orgRes.ok) {
        const orgProjects = await orgRes.json();
        console.log(`✓ Found ${orgProjects.length} projects for organization ${orgSlug}`);
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

    // Deduplicate projects by id
    const deduped = Array.from(new Map(projects.map(p => [p.id, p])).values());

    // Fetch detailed metadata for each project (license, loaders, versions, dates)
    const detailedProjects = await Promise.all(deduped.map(async (p) => {
      try {
        const detailRes = await fetch(`https://api.modrinth.com/v2/project/${p.id || p.slug}`, { headers });
        if (!detailRes.ok) throw new Error(`detail HTTP ${detailRes.status}`);
        const detail = await detailRes.json();
        return { base: p, detail };
      } catch (e) {
        console.warn(`⚠️ Detail fetch failed for ${p.slug || p.id}:`, e.message);
        return { base: p, detail: null };
      }
    }));

    // Format projects for display
    const formattedProjects = detailedProjects.map(({ base, detail }) => {
      const merged = { ...base, ...(detail || {}) };
      const projectType = merged.project_type || (merged.project_types && merged.project_types[0]) || 'mod';
      const shortDescription = merged.summary || merged.description || merged.body || '';

      return {
        id: merged.id,
        slug: merged.slug,
        name: merged.name,
        title: merged.title || merged.name,
        description: merged.body || merged.description,
        short_description: shortDescription,
        type: projectType,
        project_type: projectType,
        author: merged.author || (merged.organization ? orgSlug : 'unknown'),
        thumbnail: merged.icon_url,
        icon_url: merged.icon_url,
        download: `https://modrinth.com/${projectType}/${merged.slug}`,
        categories: merged.categories || [],
        display_categories: merged.additional_categories || [],
        tags: merged.categories || [],
        loaders: merged.loaders || [],
        game_versions: merged.game_versions || [],
        client_side: merged.client_side || 'optional',
        server_side: merged.server_side || 'optional',
        license: merged.license || null,
        license_id: merged.license?.id || null,
        license_name: merged.license?.name || null,
        license_url: merged.license?.url || null,
        downloads: merged.downloads || 0,
        followers: merged.followers || 0,
        published: merged.published || null,
        updated: merged.updated || null
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
