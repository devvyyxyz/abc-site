---
layout: default
title: Releases & Changelog
description: Latest updates across ABC mods, packs, and resources.
permalink: /changelog/
---

<section class="hero">
  <div class="hero-card">
    <p class="muted" style="margin-bottom: 6px; letter-spacing: 0.5px; text-transform: uppercase; font-size: 12px;">Releases</p>
    <h1>Changelog</h1>
    <p class="muted">Track the freshest updates across ABC mods, modpacks, resource packs, and datapacks.</p>
  </div>
</section>

<section class="section">
  <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;">
    <div style="display: flex; gap: 10px; align-items: center;">
      <i class="fa-solid fa-rocket" style="color: var(--accent-primary);"></i>
      <p class="muted" style="margin: 0;">Sorted by latest update time</p>
    </div>
    <div id="changelog-count" class="muted" style="font-size: 14px;"></div>
  </div>

  <div id="changelog-list" class="grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;"></div>
  <div id="changelog-empty" class="muted" style="display: none; text-align: center; margin: 24px 0;">No releases found yet. Add entries to <code>data/mods.json</code> or <code>data/modpacks.json</code>.</div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const listEl = document.getElementById('changelog-list');
    const countEl = document.getElementById('changelog-count');
    const emptyEl = document.getElementById('changelog-empty');

    function formatDate(value) {
      if (!value) return 'N/A';
      const date = new Date(value);
      return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
    }

    function renderCard(item) {
      const versions = (item.game_versions || []).slice(0, 4).map(v => `<span class="version-badge">${v}</span>`).join('');
      const categories = (item.categories || []).slice(0, 3).map(cat => `<span class="category-pill">${cat}</span>`).join('');
      const updated = formatDate(item.updated || item.date_modified || item.published);
      const typeLabel = (item.project_type || item.type || 'mod').replace(/_/g, ' ');

      return `
        <article class="card">
          <div style="display:flex;align-items:center;gap:12px;">
            ${item.icon_url ? `<img src="${item.icon_url}" alt="${item.name}" style="width:48px;height:48px;border-radius:12px;border:1px solid var(--border);object-fit:cover;" />` : '<div style="width:48px;height:48px;border-radius:12px;border:1px dashed var(--border);"></div>'}
            <div>
              <p class="muted" style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.6px;">${typeLabel}</p>
              <h3 style="margin:4px 0 0;">${item.title || item.name}</h3>
            </div>
          </div>
          <p class="muted" style="margin: 4px 0 0;">${item.short_description || item.description || 'No description available.'}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            ${versions || '<span class="version-badge">All versions</span>'}
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
            ${categories}
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:13px;color:var(--text-muted);">
            <span><i class="fa-regular fa-clock"></i> Updated ${updated}</span>
            <span><i class="fa-solid fa-download"></i> ${(item.downloads || 0).toLocaleString()} downloads</span>
            <span><i class="fa-solid fa-users"></i> ${(item.followers || 0).toLocaleString()} followers</span>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${item.download ? `<a class="btn ghost" href="${item.download}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> View Project</a>` : ''}
            ${item.source_url ? `<a class="btn ghost" href="${item.source_url}" target="_blank"><i class="fa-brands fa-github"></i> Source</a>` : ''}
          </div>
        </article>
      `;
    }

    async function fetchJson(url) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn('Changelog fetch failed', err);
        return [];
      }
    }

    async function loadChangelog() {
      const [mods, modpacks] = await Promise.all([
        fetchJson('{{ '/data/mods.json' | relative_url }}'),
        fetchJson('{{ '/data/modpacks.json' | relative_url }}')
      ]);

      const items = [...mods, ...modpacks].map(item => ({
        ...item,
        updated: item.updated || item.date_modified || item.published || null,
      })).filter(item => item);

      if (!items.length) {
        emptyEl.style.display = 'block';
        countEl.textContent = '';
        return;
      }

      items.sort((a, b) => {
        const dateA = new Date(a.updated || 0).getTime();
        const dateB = new Date(b.updated || 0).getTime();
        return dateB - dateA;
      });

      listEl.innerHTML = items.map(renderCard).join('');
      countEl.textContent = `${items.length} releases`;
    }

    loadChangelog();
  });
</script>
