#!/usr/bin/env node
/**
 * Fetch projects for a Modrinth organization and write to data/modpacks.json
 * Usage: node scripts/fetch-modrinth.js
 * Expects environment variables: MODRINTH_ORG (abcxyz) and MODRINTH_TOKEN (optional but recommended)
 */
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function fetchProjects(org, token){
  const headers = token? { 'Authorization': `Bearer ${token}` } : {};
  const urls = [
    `https://api.modrinth.com/v2/organization/${encodeURIComponent(org)}/projects`,
    `https://api.modrinth.com/v2/team/${encodeURIComponent(org)}/projects`,
    `https://api.modrinth.com/v2/projects?organization=${encodeURIComponent(org)}`,
    `https://api.modrinth.com/v2/projects?team_id=${encodeURIComponent(org)}`,
  ];

  for(const url of urls){
    try{
      const res = await fetch(url, { headers });
      if(!res.ok){
        console.warn('modrinth fetch non-ok', url, res.status);
        continue;
      }
      const json = await res.json();
      // find project array
      if(Array.isArray(json)) return json;
      if(json.projects && Array.isArray(json.projects)) return json.projects;
      for(const k of Object.keys(json||{})) if(Array.isArray(json[k])) return json[k];
    }catch(e){ console.warn('fetch error', url, e.message); }
  }
  return null;
}

function mapProjectToCard(p){
  return {
    id: p.project_id || p.id || p.slug || p.title,
    name: p.title || p.name || p.project_id,
    description: (p.description || '').replace(/(<([^>]+)>)/gi, '').slice(0,240),
    thumbnail: (p.icon || p.logo_url) || (p.gallery && p.gallery[0]) || '',
    download: `https://modrinth.com/project/${p.slug || p.project_id}`,
    type: p.project_type || (p.categories && p.categories[0]) || 'other',
    tags: p.tags || []
  };
}

async function main(){
  const org = process.env.MODRINTH_ORG || 'abcxyz';
  const token = process.env.MODRINTH_TOKEN || '';
  console.log('Fetching Modrinth projects for', org);
  const projects = await fetchProjects(org, token);
  if(!projects) { console.error('No projects found'); process.exit(1); }
  const out = projects.map(mapProjectToCard);
  const outPath = path.join(__dirname, '..', 'data', 'modpacks.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('Wrote', outPath, 'with', out.length, 'items');
}

main().catch(e=>{ console.error(e); process.exit(2); });
