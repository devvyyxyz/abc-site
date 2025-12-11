---
layout: default
title: Home
description: Parcourir les mods, packs de ressources, datapacks, modpacks et plugins Minecraft sélectionnés.
lang: fr
---

{% assign t = site.data[page.lang] %}

<section class="hero">
  <div class="hero-card">
    <h1>{{ t.hero_title }}</h1>
    <p class="muted">{{ t.hero_subtitle }}</p>
    <div class="cta-row">
      <a class="btn primary" href="{{ '/fr/projects/' | relative_url }}">{{ t.browse_projects }}</a>
      <a class="btn ghost" href="{{ '/fr/about/' | relative_url }}">{{ t.learn_more }}</a>
    </div>
  </div>
</section>

<section id="featured" class="section">
  <h2>{{ t.featured_title }}</h2>
  <p class="muted">{{ t.featured_subtitle }}</p>
  
  {% if site.data.modpacks and site.data.modpacks.size > 0 %}
  <div class="featured-spotlight" style="margin-bottom: 2rem;">
    <div class="spotlight-grid">
      {% assign sorted_modpacks = site.data.modpacks | sort: 'date_modified' | reverse %}
      {% for modpack in sorted_modpacks limit:3 %}
      <div class="spotlight-card animate-on-scroll scale-in stagger-{{ forloop.index }}">
        <div class="spotlight-badge">
          <i class="fas fa-star"></i> {{ t.featured_badge }}
        </div>
        <div class="spotlight-image" style="background-image: url('{{ modpack.icon_url }}')"></div>
        <div class="spotlight-content">
          <h3>{{ modpack.name }}</h3>
          <p class="muted">{{ modpack.description | truncate: 100 }}</p>
          <div class="spotlight-meta">
            <span class="meta-item">
              <i class="fas fa-download"></i> {{ modpack.downloads | default: 0 | divided_by: 1000 }}K
            </span>
            <span class="meta-item">
              <i class="fas fa-heart"></i> {{ modpack.followers | default: 0 }}
            </span>
            {% if modpack.game_versions and modpack.game_versions.size > 0 %}
            <span class="meta-item">
              <i class="fas fa-gamepad"></i> {{ modpack.game_versions[0] }}
            </span>
            {% endif %}
          </div>
          <div class="spotlight-actions">
            <a href="{{ modpack.project_url }}" class="btn-spotlight primary" target="_blank" rel="noopener">
              <i class="fas fa-external-link-alt"></i> {{ t.view_project }}
            </a>
            {% if modpack.source_url %}
            <a href="{{ modpack.source_url }}" class="btn-spotlight ghost" target="_blank" rel="noopener">
              <i class="fab fa-github"></i> {{ t.source }}
            </a>
            {% endif %}
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
  {% endif %}
  
  {% include modpacks.html %}
</section>

<section class="section" id="project-stats">
  <h2>{{ t.stats_title }}</h2>
  <p class="muted">{{ t.stats_subtitle }}</p>
  <div class="stats-grid" id="stats-grid">
    <div class="stat-card">
      <p class="muted">{{ t.stat_total_projects }}</p>
      <div class="stat-number" id="stat-projects">—</div>
      <div class="stat-sub" id="stat-projects-sub">{{ t.stat_loading }}</div>
    </div>
    <div class="stat-card">
      <p class="muted">{{ t.stat_total_downloads }}</p>
      <div class="stat-number" id="stat-downloads">—</div>
      <div class="stat-sub" id="stat-downloads-sub">{{ t.stat_loading }}</div>
    </div>
    <div class="stat-card">
      <p class="muted">{{ t.stat_supported_loaders }}</p>
      <div class="stat-number" id="stat-loaders-count">—</div>
      <div class="stat-sub" id="stat-loaders">{{ t.stat_loading }}</div>
    </div>
    <div class="stat-card">
      <p class="muted">{{ t.stat_game_versions }}</p>
      <div class="stat-number" id="stat-versions">—</div>
      <div class="stat-sub" id="stat-versions-sub">{{ t.stat_loading }}</div>
    </div>
  </div>
  <div class="card" id="top-categories" style="margin-top:16px;">
    <h3 style="margin-top:0">{{ t.stat_top_categories }}</h3>
    <div id="stat-categories" class="pill-row">{{ t.stat_loading }}</div>
  </div>
  <div class="card" id="downloads-card" style="margin-top:16px;">
    <h3 style="margin-top:0">{{ t.stat_top_downloads }}</h3>
    <p class="muted" id="stat-downloads-note">{{ t.stat_downloads_note }}</p>
    <div class="line-chart" id="downloads-chart"></div>
  </div>
</section>

<section class="section">
  <div class="card">
    <h2 style="margin-top: 0">🚀 Modrinth Organization</h2>
    <div style="display: grid; gap: 16px">
      <p class="muted">Tous nos projets sont publiés et maintenus via Modrinth.</p>
      <a class="btn ghost" href="{{ site.modrinth.organization_url | default: site.social.modrinth }}" target="_blank" rel="noopener">Aller sur Modrinth</a>
    </div>
  </div>
</section>

<script>
  // Load stats from cached mods.json and populate snapshot cards
  document.addEventListener('DOMContentLoaded', async () => {
    const modsUrl = '{{ '/data/mods.json' | relative_url }}';
    const statProjects = document.getElementById('stat-projects');
    const statProjectsSub = document.getElementById('stat-projects-sub');
    const statDownloads = document.getElementById('stat-downloads');
    const statDownloadsSub = document.getElementById('stat-downloads-sub');
    const statLoaders = document.getElementById('stat-loaders');
    const statLoadersCount = document.getElementById('stat-loaders-count');
    const statVersions = document.getElementById('stat-versions');
    const statVersionsSub = document.getElementById('stat-versions-sub');
    const statCategories = document.getElementById('stat-categories');
    const downloadsChart = document.getElementById('downloads-chart');
    const downloadsNote = document.getElementById('stat-downloads-note');

    try {
      const res = await fetch(modsUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const mods = await res.json();
      if (!Array.isArray(mods) || mods.length === 0) throw new Error('{{ t.no_projects_found }}');

      const loaders = new Set();
      const versions = new Set();
      const categories = new Map();
      let totalDownloads = 0;

      mods.forEach(m => {
        (m.loaders || []).forEach(l => loaders.add(l));
        (m.game_versions || []).forEach(v => versions.add(v));
        totalDownloads += Number(m.downloads || 0);
        (m.categories || []).forEach(c => {
          categories.set(c, (categories.get(c) || 0) + 1);
        });
        (m.display_categories || []).forEach(c => {
          categories.set(c, (categories.get(c) || 0) + 1);
        });
      });

      const formatNumber = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });
      
      const t = {
        projects_catalog: '{{ t.stat_projects_catalog }}',
        avg_per_project: '{{ t.stat_avg_per_project }}',
        unique_versions: '{{ t.stat_unique_versions }}',
        no_categories: '{{ t.stat_no_categories }}',
        no_data: '{{ t.stat_no_data }}',
        unavailable: '{{ t.stat_unavailable }}'
      };

      statProjects.textContent = formatNumber(mods.length);
      statProjectsSub.textContent = t.projects_catalog;

      statDownloads.textContent = formatNumber(totalDownloads);
      const avgDownloads = mods.length ? Math.round(totalDownloads / mods.length) : 0;
      statDownloadsSub.textContent = `${formatNumber(avgDownloads)} ${t.avg_per_project}`;

      const loaderList = Array.from(loaders).sort();
      const versionCount = versions.size;

      statLoadersCount.textContent = loaderList.length ? formatNumber(loaderList.length) : '—';
      statLoaders.textContent = loaderList.length ? loaderList.join(', ') : '—';
      statVersions.textContent = versionCount ? formatNumber(versionCount) : '—';
      statVersionsSub.textContent = versionCount ? t.unique_versions : '—';

      const topCats = Array.from(categories.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([c, count]) => `<span class="pill">${c} (${count})</span>`) || [];
      statCategories.innerHTML = topCats.length ? topCats.join(' ') : t.no_categories;

      // Top downloads multi-line chart (simulated week data)
      const topDownloads = [...mods]
        .filter(m => typeof m.downloads === 'number')
        .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
        .slice(0, 11);

      if (topDownloads.length && downloadsChart) {
        downloadsChart.innerHTML = '';
        
        const colors = [
          '#1bd96f', '#10a8e0', '#22d3ee', '#a78bfa', '#f472b6',
          '#fb923c', '#fbbf24', '#4ade80', '#60a5fa', '#c084fc', '#f87171'
        ];

        // Simulate week data with realistic curves (7 days)
        const days = 7;
        const maxValue = Math.max(...topDownloads.map(m => m.downloads || 0));
        
        const chartWrapper = document.createElement('div');
        chartWrapper.style.cssText = 'display:flex;gap:20px;align-items:stretch;margin-bottom:12px;';

        // Left side: chart
        const chartContainer = document.createElement('div');
        chartContainer.style.cssText = 'flex:1;background:var(--bg-primary);border:1px solid var(--border);padding:16px;box-sizing:border-box;position:relative;';

        const svgWrapper = document.createElement('div');
        svgWrapper.style.cssText = 'width:100%;height:240px;position:relative;';
        
        // Tooltip
        const tooltip = document.createElement('div');
        tooltip.style.cssText = 'position:absolute;background:rgba(0,0,0,0.8);color:white;border:1px solid var(--border);padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;opacity:0;transition:opacity 0.2s;z-index:10;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,0.4);';
        chartContainer.appendChild(tooltip);

        const width = 800;
        const height = 200;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.style.cssText = 'width:100%;height:100%;display:block;';

        topDownloads.forEach((mod, idx) => {
          const color = colors[idx % colors.length];
          const baseValue = mod.downloads || 0;
          
          const points = [];
          
          for (let day = 0; day < days; day++) {
            const x = (day / (days - 1)) * width;
            const variance = Math.sin(day * 0.8 + idx) * 0.3 + Math.cos(day * 1.2 - idx) * 0.2;
            const normalizedValue = (baseValue / maxValue) * (0.4 + variance * 0.6);
            const y = height - Math.max(4, Math.min(height - 4, normalizedValue * (height * 0.9)));
            const simulatedDownloads = Math.round(baseValue * normalizedValue);
            points.push({ x, y, downloads: simulatedDownloads, day });
          }

          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
          path.setAttribute('d', d);
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', color);
          path.setAttribute('stroke-width', '2');
          path.setAttribute('opacity', '0.85');
          path.style.cursor = 'pointer';
          
          points.forEach(p => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', p.x);
            circle.setAttribute('cy', p.y);
            circle.setAttribute('r', '4.5');
            circle.setAttribute('fill', color);
            circle.setAttribute('opacity', '0.9');
            circle.style.cursor = 'pointer';
            svg.appendChild(circle);
          });
          
          path.addEventListener('mouseenter', () => {
            path.setAttribute('stroke-width', '3');
            path.setAttribute('opacity', '1');
          });
          path.addEventListener('mouseleave', () => {
            path.setAttribute('stroke-width', '2');
            path.setAttribute('opacity', '0.85');
            tooltip.style.opacity = '0';
          });
          path.addEventListener('mousemove', (e) => {
            const rect = chartContainer.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();
            const relX = ((e.clientX - svgRect.left) / svgRect.width) * width;
            const closestPoint = points.reduce((prev, curr) => 
              Math.abs(curr.x - relX) < Math.abs(prev.x - relX) ? curr : prev
            );
            
            tooltip.innerHTML = `<div style="color:${color};font-weight:600;margin-bottom:2px;">${mod.title || mod.name}</div><div>Jour ${closestPoint.day + 1}: ${formatNumber(closestPoint.downloads)} téléchargements</div>`;
            tooltip.style.opacity = '1';
            tooltip.style.left = Math.min(rect.width - tooltip.offsetWidth - 10, Math.max(10, e.clientX - rect.left + 10)) + 'px';
            tooltip.style.top = Math.max(10, e.clientY - rect.top - 40) + 'px';
          });
          
          svg.appendChild(path);
        });

        svgWrapper.appendChild(svg);
        chartContainer.appendChild(svgWrapper);

        const legendContainer = document.createElement('div');
        legendContainer.style.cssText = 'width:200px;display:flex;flex-direction:column;gap:8px;overflow-y:auto;max-height:240px;padding-right:8px;';
        legendContainer.className = 'line-legend';
        legendContainer.innerHTML = topDownloads.map((m, idx) => {
          const color = colors[idx % colors.length];
          return `<div class="legend-item" style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary);"><span style="width:8px;height:8px;border-radius:50%;background:${color};display:inline-block;flex-shrink:0;"></span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${m.title || m.name}</span></div>`;
        }).join('');

        chartWrapper.appendChild(chartContainer);
        chartWrapper.appendChild(legendContainer);
        downloadsChart.appendChild(chartWrapper);
      } else if (downloadsNote) {
        downloadsNote.textContent = t.no_data;
      }
    } catch (e) {
      statProjects.textContent = '—';
      statProjectsSub.textContent = t.unavailable;
      statDownloads.textContent = '—';
      statDownloadsSub.textContent = t.unavailable;
      statLoadersCount.textContent = '—';
      statLoaders.textContent = t.unavailable;
      statVersions.textContent = '—';
      statVersionsSub.textContent = t.unavailable;
      statCategories.textContent = `{{ t.error_loading }} ${e.message}`;
      if (downloadsNote) downloadsNote.textContent = `{{ t.error_loading }}`;
      console.warn('{{ t.failed_to_load }}:', e);
    }
  });
</script>
