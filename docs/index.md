---
layout: default
title: Documentation
description: Complete guides for using and customizing the ABC showcase.
permalink: /docs/
---

<section class="hero">
  <div class="hero-card">
    <h1>Documentation</h1>
    <p class="muted">Complete guides for setting up, customizing, and contributing to the ABC showcase.</p>
  </div>
</section>

<section class="section">
  <h2 style="margin-bottom: 16px;">Search & Filter</h2>
  <div style="display: flex; gap: 16px; margin-bottom: 32px; flex-wrap: wrap;">
    <input id="docs-search" type="search" placeholder="Search documentation..." style="flex: 1; min-width: 200px; padding: 10px 12px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text); border-radius: 6px; font-size: 14px;">
    <select id="docs-category" style="padding: 10px 12px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text); border-radius: 6px; font-size: 14px;">
      <option value="">All Categories</option>
      <option value="Setup">Setup</option>
      <option value="Styling">Styling</option>
      <option value="Community">Community</option>
      <option value="Help">Help</option>
      <option value="User Guide">User Guide</option>
      <option value="Developer">Developer</option>
    </select>
  </div>

  <h3 style="margin-bottom: 16px;">Browse by Category</h3>
  <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 32px;">
    <a class="card" href="{{ '/docs/category/setup/' | relative_url }}" style="text-decoration: none; display: flex; align-items: center; gap: 12px;">
      <i class="fa-solid fa-gear" style="font-size: 24px; color: var(--accent-primary);"></i>
      <div>
        <h3 style="margin: 0;">Setup</h3>
        <p class="muted" style="margin: 0; font-size: 13px;">Installation & configuration</p>
      </div>
    </a>
    <a class="card" href="{{ '/docs/category/styling/' | relative_url }}" style="text-decoration: none; display: flex; align-items: center; gap: 12px;">
      <i class="fa-solid fa-palette" style="font-size: 24px; color: var(--accent-primary);"></i>
      <div>
        <h3 style="margin: 0;">Styling</h3>
        <p class="muted" style="margin: 0; font-size: 13px;">Themes & customization</p>
      </div>
    </a>
    <a class="card" href="{{ '/docs/category/user-guide/' | relative_url }}" style="text-decoration: none; display: flex; align-items: center; gap: 12px;">
      <i class="fa-solid fa-book-open" style="font-size: 24px; color: var(--accent-primary);"></i>
      <div>
        <h3 style="margin: 0;">User Guide</h3>
        <p class="muted" style="margin: 0; font-size: 13px;">For end users</p>
      </div>
    </a>
    <a class="card" href="{{ '/docs/category/community/' | relative_url }}" style="text-decoration: none; display: flex; align-items: center; gap: 12px;">
      <i class="fa-solid fa-users" style="font-size: 24px; color: var(--accent-primary);"></i>
      <div>
        <h3 style="margin: 0;">Community</h3>
        <p class="muted" style="margin: 0; font-size: 13px;">Contributing & support</p>
      </div>
    </a>
    <a class="card" href="{{ '/docs/category/developer/' | relative_url }}" style="text-decoration: none; display: flex; align-items: center; gap: 12px;">
      <i class="fa-solid fa-code" style="font-size: 24px; color: var(--accent-primary);"></i>
      <div>
        <h3 style="margin: 0;">Developer</h3>
        <p class="muted" style="margin: 0; font-size: 13px;">Technical reference</p>
      </div>
    </a>
    <a class="card" href="{{ '/docs/category/help/' | relative_url }}" style="text-decoration: none; display: flex; align-items: center; gap: 12px;">
      <i class="fa-solid fa-circle-question" style="font-size: 24px; color: var(--accent-primary);"></i>
      <div>
        <h3 style="margin: 0;">Help</h3>
        <p class="muted" style="margin: 0; font-size: 13px;">FAQ & troubleshooting</p>
      </div>
    </a>
  </div>

  <h3 style="margin-bottom: 16px;">All Documentation</h3>
  <div id="docs-results" class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
    <!-- Results will be populated by JavaScript -->
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const docs = [
      {% assign sorted_docs = site.docs | sort: 'nav_order' %}
      {% for doc in sorted_docs %}
        {
          title: "{{ doc.title }}",
          description: "{{ doc.description }}",
          url: "{{ doc.url | relative_url }}",
          category: "{{ doc.category | default: 'Other' }}",
          tags: [{% for tag in doc.tags %}"{{ tag }}"{% unless forloop.last %}, {% endunless %}{% endfor %}],
          content: "{{ doc.content | strip_html | truncatewords: 20 }}"
        }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ];

    const searchEl = document.getElementById('docs-search');
    const categoryEl = document.getElementById('docs-category');
    const resultsEl = document.getElementById('docs-results');

    function renderDocs(filtered) {
      resultsEl.innerHTML = filtered.length 
        ? filtered.map(doc => `
          <div class="card">
            <h3>${doc.title}</h3>
            <p class="muted" style="font-size: 13px; margin-bottom: 12px;">${doc.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
              <span style="display: inline-block; padding: 4px 8px; background: var(--bg-secondary); color: var(--text-secondary); border-radius: 4px; font-size: 12px;">${doc.category}</span>
              ${doc.tags.map(tag => `<span style="display: inline-block; padding: 4px 8px; background: rgba(27, 217, 111, 0.1); color: var(--accent-primary); border-radius: 4px; font-size: 12px;">#${tag}</span>`).join('')}
            </div>
            <a class="btn primary" href="${doc.url}" style="width: 100%; display: block; text-align: center;">Read More</a>
          </div>
        `).join('')
        : '<p class="muted" style="grid-column: 1 / -1; text-align: center;">No documentation found.</p>';
    }

    function filterDocs() {
      const query = searchEl.value.toLowerCase();
      const category = categoryEl.value;

      const filtered = docs.filter(doc => {
        const matchesSearch = !query || 
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query) ||
          doc.tags.some(tag => tag.toLowerCase().includes(query));
        
        const matchesCategory = !category || doc.category === category;
        
        return matchesSearch && matchesCategory;
      });

      renderDocs(filtered);
    }

    searchEl.addEventListener('input', filterDocs);
    categoryEl.addEventListener('change', filterDocs);

    // Initial render
    renderDocs(docs);
  });
</script>
