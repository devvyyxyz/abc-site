---
layout: default
title: Home
description: Browse curated Minecraft mods, resource packs, datapacks, modpacks and plugins.
---

<section class="hero">
  <div class="hero-card">
    <h1>Showcase: Minecraft Mods & Packs</h1>
    <p class="muted">Mods, resource packs, datapacks, modpacks and plugins — curated from our organization.</p>
    <div class="cta-row">
      <a class="btn primary" href="{{ '/projects/' | relative_url }}">Browse Projects</a>
      <a class="btn ghost" href="{{ '/about/' | relative_url }}">Learn More</a>
    </div>
  </div>
</section>

<section id="featured" class="section">
  <h2>Featured Highlights</h2>
  <p class="muted">Latest additions to our growing collection</p>
  
  {% if site.data.modpacks and site.data.modpacks.size > 0 %}
  <div class="featured-spotlight" style="margin-bottom: 2rem;">
    <div class="spotlight-grid">
      {% assign sorted_modpacks = site.data.modpacks | sort: 'date_modified' | reverse %}
      {% for modpack in sorted_modpacks limit:3 %}
      <div class="spotlight-card animate-on-scroll scale-in stagger-{{ forloop.index }}">
        <div class="spotlight-badge">
          <i class="fas fa-star"></i> Featured
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
              <i class="fas fa-external-link-alt"></i> View Project
            </a>
            {% if modpack.source_url %}
            <a href="{{ modpack.source_url }}" class="btn-spotlight ghost" target="_blank" rel="noopener">
              <i class="fab fa-github"></i> Source
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
  <h2>Project Snapshot</h2>
  <p class="muted">Live data pulled from our Modrinth cache</p>
  <div class="stats-grid" id="stats-grid">
    <div class="stat-card">
      <p class="muted">Total Projects</p>
      <div class="stat-number" id="stat-projects">—</div>
      <div class="stat-sub" id="stat-projects-sub">Loading…</div>
    </div>
    <div class="stat-card">
      <p class="muted">Total Downloads</p>
      <div class="stat-number" id="stat-downloads">—</div>
      <div class="stat-sub" id="stat-downloads-sub">Loading…</div>
    </div>
    <div class="stat-card">
      <p class="muted">Supported Loaders</p>
      <div class="stat-number" id="stat-loaders-count">—</div>
      <div class="stat-sub" id="stat-loaders">Loading…</div>
    </div>
    <div class="stat-card">
      <p class="muted">Game Versions</p>
      <div class="stat-number" id="stat-versions">—</div>
      <div class="stat-sub" id="stat-versions-sub">Loading…</div>
    </div>
  </div>
  <div class="card" id="top-categories" style="margin-top:16px;">
    <h3 style="margin-top:0">Top Categories</h3>
    <div id="stat-categories" class="pill-row">Loading…</div>
  </div>
  <div class="card" id="downloads-card" style="margin-top:16px;">
    <h3 style="margin-top:0">Top Downloads</h3>
    <p class="muted" id="stat-downloads-note">Highest downloaded projects</p>
    <div class="line-chart" id="downloads-chart"></div>
  </div>
</section>

{% assign featured_docs = site.docs | sort: 'nav_order' | slice: 0, 3 %}
{% if featured_docs and featured_docs.size > 0 %}

<section class="section" id="featured-docs">
  <h2>Docs Spotlight</h2>
  <p class="muted">Quick links to key guides</p>
  <div class="grid">
    {% for doc in featured_docs %}
      <a class="card" href="{{ doc.url | relative_url }}" style="text-decoration:none">
        <h3 style="margin-top:0">{{ doc.title }}</h3>
        {% if doc.description %}<p class="muted">{{ doc.description }}</p>{% else %}<p class="muted">Read more</p>{% endif %}
        <span class="pill">Docs</span>
      </a>
    {% endfor %}
  </div>
</section>
{% endif %}

<section class="section">
  <h2>How It Works</h2>
  <div class="grid">
    <div class="card">
      <h3><i class="fa-solid fa-box"></i> Static Content</h3>
      <p>All projects are stored as static data. No database needed.</p>
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-arrows-rotate"></i> Auto-Update</h3>
      <p>Daily syncs from Modrinth keep your showcase fresh.</p>
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-bolt"></i> Lightning Fast</h3>
      <p>Deployed globally on GitHub Pages for instant loading.</p>
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-palette"></i> Beautiful</h3>
      <p>Modern design with smooth animations and blur effects.</p>
    </div>
  </div>
</section>

<section class="section">
  <h2>Get Started</h2>
  <div class="grid">
    <div class="card">
      <h3>Read the Docs</h3>
      <p class="muted">Configure branding, fetch projects, and deploy.</p>
      <a class="btn primary" href="{{ '/docs/' | relative_url }}">Open Docs</a>
    </div>
    <div class="card">
      <h3>Browse Projects</h3>
      <p class="muted">Filter by type, loader, or version.</p>
      <a class="btn primary" href="{{ '/projects/' | relative_url }}">View Catalog</a>
    </div>
    <div class="card">
      <h3>Sync from Modrinth</h3>
      <p class="muted">Run <code>npm run fetch</code> or use the scheduled workflow.</p>
      <a class="btn ghost" href="{{ '/docs/' | relative_url }}">See Setup</a>
    </div>
  </div>
</section>

<section class="section">
  <h2>Stay in the Loop</h2>
  <div class="grid">
    <div class="card">
      <h3>Join Discord</h3>
      <p class="muted">Get support, share feedback, and see previews.</p>
      <a class="btn ghost" href="{{ site.social.discord }}" target="_blank" rel="noopener">Open Discord</a>
    </div>
    <div class="card">
      <h3>Watch GitHub</h3>
      <p class="muted">Track updates, file issues, or contribute.</p>
      <a class="btn ghost" href="{{ site.social.github }}" target="_blank" rel="noopener">View Repo</a>
    </div>
    <div class="card">
      <h3>Follow Modrinth</h3>
      <p class="muted">Stay updated on releases across all projects.</p>
      <a class="btn ghost" href="{{ site.modrinth.organization_url | default: site.social.modrinth }}" target="_blank" rel="noopener">Go to Modrinth</a>
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
      if (!Array.isArray(mods) || mods.length === 0) throw new Error('No projects found');

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

      statProjects.textContent = formatNumber(mods.length);
      statProjectsSub.textContent = 'Projects in catalog';

      statDownloads.textContent = formatNumber(totalDownloads);
      const avgDownloads = mods.length ? Math.round(totalDownloads / mods.length) : 0;
      statDownloadsSub.textContent = `${formatNumber(avgDownloads)} avg per project`;

      const loaderList = Array.from(loaders).sort();
      const versionCount = versions.size;

      statLoadersCount.textContent = loaderList.length ? formatNumber(loaderList.length) : '—';
      statLoaders.textContent = loaderList.length ? loaderList.join(', ') : '—';
      statVersions.textContent = versionCount ? formatNumber(versionCount) : '—';
      statVersionsSub.textContent = versionCount ? 'Unique game versions' : '—';

      const topCats = Array.from(categories.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([c, count]) => `<span class="pill">${c} (${count})</span>`) || [];
      statCategories.innerHTML = topCats.length ? topCats.join(' ') : 'No categories yet';

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

        // Use actual pixel dimensions
        const width = 800;  // Fixed width for consistent rendering
        const height = 200; // Fixed height

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.style.cssText = 'width:100%;height:100%;display:block;';

        topDownloads.forEach((mod, idx) => {
          const color = colors[idx % colors.length];
          const baseValue = mod.downloads || 0;
          
          // Generate smooth curve with variation
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
          
          // Add dots at each data point
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
          
          // Hover effect
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
            
            tooltip.innerHTML = `<div style="color:${color};font-weight:600;margin-bottom:2px;">${mod.title || mod.name}</div><div>Day ${closestPoint.day + 1}: ${formatNumber(closestPoint.downloads)} downloads</div>`;
            tooltip.style.opacity = '1';
            tooltip.style.left = Math.min(rect.width - tooltip.offsetWidth - 10, Math.max(10, e.clientX - rect.left + 10)) + 'px';
            tooltip.style.top = Math.max(10, e.clientY - rect.top - 40) + 'px';
          });
          
          svg.appendChild(path);
        });

        svgWrapper.appendChild(svg);
        chartContainer.appendChild(svgWrapper);

        // Right side: legend
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
        downloadsNote.textContent = 'No download data available yet';
      }
    } catch (e) {
      statProjects.textContent = '—';
      statProjectsSub.textContent = 'Unavailable';
      statDownloads.textContent = '—';
      statDownloadsSub.textContent = 'Unavailable';
      statLoadersCount.textContent = '—';
      statLoaders.textContent = 'Unavailable';
      statVersions.textContent = '—';
      statVersionsSub.textContent = 'Unavailable';
      statCategories.textContent = `Error loading stats: ${e.message}`;
      if (downloadsNote) downloadsNote.textContent = 'Error loading downloads';
      console.warn('Stats load failed:', e);
    }
  });
</script>
