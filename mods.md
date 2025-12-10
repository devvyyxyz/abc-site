---
layout: default
title: Projects
description: Browse our projects from Modrinth.
permalink: /mods/
---

<section class="section">
  <h1>Projects</h1>
  <p class="muted">Latest projects from ABC organization</p>
  <div id="mods-list" class="modpacks-list"></div>
</section>

<script>
  // Load projects from cached JSON file
  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('mods-list');
    if (!container) return;

    try {
      console.log('Fetching projects from data/mods.json...');
      const res = await fetch('/data/mods.json');
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to load projects`);
      }

      const projects = await res.json();
      console.log(`Found ${projects.length} projects`);

      if (!Array.isArray(projects) || projects.length === 0) {
        container.innerHTML = '<p class="muted">No projects found. Projects will be synced automatically.</p>';
        return;
      }

      // Display all projects (mods, datapacks, resourcepacks)
      if (projects.length === 0) {
        container.innerHTML = '<p class="muted">No projects found.</p>';
        return;
      }
      renderProjects(projects);
    } catch (e) {
      console.error('Failed to load mods:', e);
      container.innerHTML = `<p class="muted">Error: ${e.message}</p>`;
    }

    function renderProjects(items) {
      container.innerHTML = '';
      items.forEach((m, i) => {
        const el = document.createElement('div');
        el.className = 'modpack';
        el.style.animationDelay = (i * 60) + 'ms';

        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        thumb.style.backgroundImage = `url(${m.icon_url || m.thumbnail || '/assets/images/favicon.svg'})`;

        const meta = document.createElement('div');
        meta.className = 'meta';
        const shortDesc = m.short_description || m.summary || m.description || '';
        const desc = shortDesc.length > 140 ? `${shortDesc.substring(0, 140)}...` : shortDesc;
        meta.innerHTML = `<h3>${m.title || m.name}</h3><p>${desc}</p><div class="tags">${(m.display_categories || m.categories || []).slice(0, 4).map(c => `<span>#${c}</span>`).join(' ')}</div>`;

        const action = document.createElement('div');
        action.className = 'actions';
        action.innerHTML = `<a class="btn primary" href="${m.download || `https://modrinth.com/mod/${m.slug}`}" target="_blank" rel="noopener">View</a>`;

        el.appendChild(thumb);
        el.appendChild(meta);
        el.appendChild(action);
        container.appendChild(el);
      });
    }
  });
</script>
