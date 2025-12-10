---
layout: default
title: Projects
description: Browse our projects from Modrinth.
permalink: /projects/
---

<section class="section">
  <h1>Projects</h1>
  <p class="muted">Latest projects from ABC organization</p>

  <div class="filters" id="projects-filters">
    <input id="filter-search" type="search" placeholder="Search projects..." aria-label="Search projects">
    <select id="filter-type" aria-label="Filter by type">
      <option value="all">All types</option>
    </select>
    <select id="filter-loader" aria-label="Filter by loader">
      <option value="all">All loaders</option>
    </select>
    <select id="filter-version" aria-label="Filter by version">
      <option value="all">All versions</option>
    </select>
  </div>

  <div id="projects-count" class="muted" style="margin-top:10px"></div>
  <div id="mods-list" class="modpacks-list"></div>
</section>

<script>
  // Load projects from cached JSON file with filtering and rich metadata
  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('mods-list');
    const countEl = document.getElementById('projects-count');
    const searchEl = document.getElementById('filter-search');
    const typeEl = document.getElementById('filter-type');
    const loaderEl = document.getElementById('filter-loader');
    const versionEl = document.getElementById('filter-version');

    const state = {
      projects: [],
      filters: { search: '', type: 'all', loader: 'all', version: 'all' }
    };

    // Base options so filters always have choices even if data is missing them
    const baseTypes = ['mod', 'modpack', 'datapack', 'resourcepack', 'plugin', 'shader', 'world', 'library'];
    const baseLoaders = ['fabric', 'forge', 'quilt', 'neoforge', 'liteloader', 'rift', 'bukkit', 'paper', 'purpur', 'datapack', 'minecraft', 'resourcepack', 'shaders'];
    const baseVersions = ['1.16', '1.16.5', '1.17.1', '1.18.2', '1.19.4', '1.20', '1.20.1', '1.20.2', '1.20.4', '1.20.6', '1.21', '1.21.1', '1.21.2', '1.21.3', '1.21.4', '1.21.5'];

    function formatDate(value) {
      if (!value) return 'Unknown';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return 'Unknown';
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }

    function populateFilters(items) {
      const types = new Set(baseTypes);
      const loaders = new Set(baseLoaders);
      const versions = new Set(baseVersions);

      items.forEach(p => {
        if (p.project_type) types.add(p.project_type);
        (p.loaders || []).forEach(l => loaders.add(l));
        (p.game_versions || []).forEach(v => versions.add(v));
      });

      typeEl.innerHTML = '<option value="all">All types</option>' +
        Array.from(types).sort().map(t => `<option value="${t}">${t}</option>`).join('');
      loaderEl.innerHTML = '<option value="all">All loaders</option>' +
        Array.from(loaders).sort().map(l => `<option value="${l}">${l}</option>`).join('');
      versionEl.innerHTML = '<option value="all">All versions</option>' +
        Array.from(versions).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })).map(v => `<option value="${v}">${v}</option>`).join('');
    }

    function applyFilters() {
      let items = [...state.projects];
      const { search, type, loader, version } = state.filters;

      if (search) {
        const q = search.toLowerCase();
        items = items.filter(p => (
          (p.title || p.name || '').toLowerCase().includes(q) ||
          (p.short_description || '').toLowerCase().includes(q)
        ));
      }

      if (type !== 'all') {
        items = items.filter(p => (p.project_type || p.type) === type);
      }

      if (loader !== 'all') {
        items = items.filter(p => (p.loaders || []).includes(loader));
      }

      if (version !== 'all') {
        items = items.filter(p => (p.game_versions || []).includes(version));
      }

      renderProjects(items);
    }

    function renderProjects(items) {
      if (!items.length) {
        container.innerHTML = '<p class="muted">No projects found for this filter.</p>';
        countEl.textContent = '0 projects';
        return;
      }

      container.innerHTML = '';
      countEl.textContent = `${items.length} project${items.length === 1 ? '' : 's'}`;

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
        const desc = shortDesc.length > 160 ? `${shortDesc.substring(0, 160)}...` : shortDesc;
        const versions = (m.game_versions || []).slice(-3).reverse();
        const loaders = (m.loaders || []).slice(0, 3);

        const pill = (label, icon) => `<span class="pill">${icon ? `<i class="fa-solid fa-${icon}"></i>` : ''}${label}</span>`;
        const metaInfo = [
          m.updated || m.published ? pill(`Updated ${formatDate(m.updated || m.published)}`, 'clock') : '',
          versions.length ? pill(`MC ${versions.join(', ')}`, 'cube') : '',
          loaders.length ? pill(`Loaders: ${loaders.join(', ')}`, 'cogs') : '',
          m.license_id ? pill(`License: ${m.license_id}`, 'file-alt') : ''
        ].filter(Boolean).join('');

        meta.innerHTML = `
          <h3>${m.title || m.name}</h3>
          <p>${desc}</p>
          <div class="meta-info">${metaInfo}</div>
          <div class="tags">${(m.display_categories || m.categories || []).slice(0, 4).map(c => `<span class="pill">#${c}</span>`).join(' ')}</div>
        `;

        const action = document.createElement('div');
        action.className = 'actions';
        action.innerHTML = `<a class="btn primary" href="${m.download || `https://modrinth.com/mod/${m.slug}`}" target="_blank" rel="noopener">View</a>`;

        el.appendChild(thumb);
        el.appendChild(meta);
        el.appendChild(action);
        container.appendChild(el);
      });
    }

    function handleFilterChange() {
      state.filters = {
        search: searchEl.value.trim(),
        type: typeEl.value,
        loader: loaderEl.value,
        version: versionEl.value
      };
      applyFilters();
    }

    // Wire up filters
    searchEl.addEventListener('input', () => {
      state.filters.search = searchEl.value.trim();
      applyFilters();
    });
    [typeEl, loaderEl, versionEl].forEach(el => el.addEventListener('change', handleFilterChange));

    try {
      const res = await fetch('/data/mods.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load projects`);
      const projects = await res.json();

      if (!Array.isArray(projects) || projects.length === 0) {
        container.innerHTML = '<p class="muted">No projects found. Projects will be synced automatically.</p>';
        return;
      }

      // Sort newest updated first
      state.projects = projects.sort((a, b) => new Date(b.updated || b.published || 0) - new Date(a.updated || a.published || 0));
      populateFilters(state.projects);
      applyFilters();
    } catch (e) {
      console.error('Failed to load projects:', e);
      container.innerHTML = `<p class="muted">Error: ${e.message}</p>`;
    }
  });
</script>
