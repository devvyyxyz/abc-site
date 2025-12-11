---
layout: default
title: Compare Modpacks
description: Compare different modpacks side-by-side to find the perfect one for your needs
permalink: /compare/
---

<div class="hero" style="background-image: url('{{ '/assets/images/blocks.svg' | relative_url }}'); background-size: cover; background-position: center; min-height: 120px; padding: 0.5rem 0 !important;">
  <div class="hero-content">
    <h1 class="hero-title fade-in">Compare Modpacks</h1>
    <p class="hero-description fade-in-up">Compare features, performance, and content across modpacks</p>
  </div>
</div>

<div class="comparison-container">
  <div class="comparison-header">
    <h2>Select Modpacks to Compare</h2>
    <p>Choose up to 3 modpacks to compare side-by-side</p>
  </div>

  <div class="comparison-selector">
    <div class="selector-box">
      <label for="compare-1">Modpack 1</label>
      <select id="compare-1" class="modpack-select">
        <option value="">Select a modpack...</option>
      </select>
    </div>
    <div class="selector-box">
      <label for="compare-2">Modpack 2</label>
      <select id="compare-2" class="modpack-select">
        <option value="">Select a modpack...</option>
      </select>
    </div>
    <div class="selector-box">
      <label for="compare-3">Modpack 3</label>
      <select id="compare-3" class="modpack-select">
        <option value="">Select a modpack...</option>
      </select>
    </div>
  </div>

  <div class="comparison-actions">
    <button id="compare-btn" class="btn btn-primary" disabled>
      <i class="fas fa-balance-scale"></i> Compare Selected
    </button>
    <button id="clear-btn" class="btn btn-secondary">
      <i class="fas fa-times"></i> Clear All
    </button>
  </div>

  <div id="comparison-results" class="comparison-results hidden">
    <div class="comparison-table-wrapper">
      <table class="comparison-table">
        <thead>
          <tr>
            <th class="feature-col">Feature</th>
            <th class="modpack-col" id="header-1"></th>
            <th class="modpack-col" id="header-2"></th>
            <th class="modpack-col" id="header-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="feature-name"><i class="fas fa-image"></i> Icon</td>
            <td id="icon-1"></td>
            <td id="icon-2"></td>
            <td id="icon-3"></td>
          </tr>
          <tr>
            <td class="feature-name"><i class="fas fa-layer-group"></i> Type</td>
            <td id="type-1"></td>
            <td id="type-2"></td>
            <td id="type-3"></td>
          </tr>
          <tr>
            <td class="feature-name"><i class="fas fa-info-circle"></i> Description</td>
            <td id="description-1"></td>
            <td id="description-2"></td>
            <td id="description-3"></td>
          </tr>
          <tr>
            <td class="feature-name"><i class="fas fa-gamepad"></i> Supported MC Versions</td>
            <td id="version-1"></td>
            <td id="version-2"></td>
            <td id="version-3"></td>
          </tr>
          <tr>
            <td class="feature-name"><i class="fas fa-download"></i> Downloads</td>
            <td id="downloads-1"></td>
            <td id="downloads-2"></td>
            <td id="downloads-3"></td>
          </tr>
          <tr>
            <td class="feature-name"><i class="fas fa-users"></i> Followers</td>
            <td id="followers-1"></td>
            <td id="followers-2"></td>
            <td id="followers-3"></td>
          </tr>
          <tr>
            <td class="feature-name"><i class="fas fa-calendar"></i> Last Updated</td>
            <td id="updated-1"></td>
            <td id="updated-2"></td>
            <td id="updated-3"></td>
          </tr>
          <tr>
            <td class="feature-name"><i class="fas fa-tag"></i> Categories</td>
            <td id="categories-1"></td>
            <td id="categories-2"></td>
            <td id="categories-3"></td>
          </tr>
          <tr>
            <td class="feature-name"><i class="fas fa-link"></i> Links</td>
            <td id="links-1"></td>
            <td id="links-2"></td>
            <td id="links-3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
.comparison-container {
  max-width: 1400px;
  margin: 3rem auto;
  padding: 0 1rem;
}

.comparison-header {
  text-align: center;
  margin-bottom: 2rem;
}

.comparison-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.comparison-header p {
  color: var(--text-muted);
}

.comparison-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.selector-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.selector-box label {
  font-weight: 600;
  color: var(--text);
}

.modpack-select {
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.modpack-select:hover {
  border-color: var(--accent);
}

.modpack-select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 255, 157, 0.1);
}

.comparison-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--accent);
  color: var(--bg);
}

.btn-primary:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 255, 157, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text);
  border: 2px solid var(--border);
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
  border-color: var(--text-muted);
}

.comparison-results {
  opacity: 1;
  transition: opacity 0.3s;
}

.comparison-results.hidden {
  display: none;
  opacity: 0;
}

.comparison-table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  border: 2px solid var(--border);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg);
}

.comparison-table thead {
  background: var(--bg-secondary);
  position: sticky;
  top: 0;
  z-index: 10;
}

.comparison-table th,
.comparison-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.comparison-table th {
  font-weight: 700;
  color: var(--text);
}

.feature-col {
  width: 200px;
  font-weight: 600;
  background: var(--bg-secondary);
  position: sticky;
  left: 0;
  z-index: 5;
}

.feature-name {
  font-weight: 600;
  background: var(--bg-secondary);
  position: sticky;
  left: 0;
  z-index: 5;
}

.feature-name i {
  margin-right: 0.5rem;
  color: var(--accent);
}

.modpack-col {
  min-width: 250px;
}

.comparison-table tbody tr:hover {
  background: var(--bg-tertiary);
}

.modpack-icon {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
}

.category-pill {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--accent);
  color: var(--bg);
  border-radius: 999px;
  font-size: 0.875rem;
  margin: 0.25rem;
}

.link-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--accent);
  color: var(--bg);
  text-decoration: none;
  border-radius: 8px;
  margin: 0.25rem;
  transition: all 0.2s;
}

.link-button:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .comparison-selector {
    grid-template-columns: 1fr;
  }
  
  .comparison-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .feature-col,
  .feature-name {
    position: static;
  }
}
</style>

<script>
// Populate selects with any content type
const modpacksData = {{ site.data.modpacks | default: "[]" | jsonify }};
const modsData = {{ site.data.mods | default: "[]" | jsonify }};

// Normalize datasets and merge
function parseData(raw, fallbackType) {
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw || [];
  return Array.isArray(parsed)
    ? parsed.map((item) => ({
        ...item,
        content_type: item.type || item.project_type || fallbackType,
      }))
    : [];
}

const items = [
  ...parseData(modpacksData, 'modpack'),
  ...parseData(modsData, 'mod'),
];

const selects = ['compare-1', 'compare-2', 'compare-3'];

if (Array.isArray(items) && items.length > 0) {
  selects.forEach((selectId) => {
    const select = document.getElementById(selectId);
    items.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      const typeLabel = (item.content_type || 'modpack').replace(/_/g, ' ');
      option.textContent = `${item.name} (${typeLabel})`;
      select.appendChild(option);
    });
  });
} else {
  // Show message if no content available
  document.querySelector('.comparison-selector').innerHTML =
    '<p style="text-align:center;color:var(--text-muted);padding:2rem;">No content available for comparison. Add data to _data/modpacks.json or _data/mods.json to enable this feature.</p>';
  document.querySelector('.comparison-actions').style.display = 'none';
}

// Enable/disable compare button (guard if DOM missing)
function updateCompareButton() {
  const compareBtn = document.getElementById('compare-btn');
  if (!compareBtn) return;
  const selected = selects
    .map(id => document.getElementById(id))
    .filter(Boolean)
    .map(el => el.value)
    .filter(Boolean);
  compareBtn.disabled = selected.length < 2;
}

selects.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', updateCompareButton);
});

const compareBtnEl = document.getElementById('compare-btn');
const clearBtnEl = document.getElementById('clear-btn');

// Compare functionality
compareBtnEl?.addEventListener('click', () => {
  const selectedIds = selects
    .map(id => document.getElementById(id))
    .filter(Boolean)
    .map(el => el.value)
    .filter(Boolean);
  const selectedItems = selectedIds
    .map(id => items.find(m => m.id === id))
    .filter(Boolean);
  
  // Populate table
  selectedItems.forEach((item, index) => {
    const col = index + 1;
    const typeLabel = (item.content_type || 'modpack').replace(/_/g, ' ');
    
    // Header
    document.getElementById(`header-${col}`).innerHTML = `<strong>${item.name}</strong>`;
    
    // Icon
    document.getElementById(`icon-${col}`).innerHTML = 
      item.icon_url ? `<img src="${item.icon_url}" alt="${item.name}" class="modpack-icon">` : 'N/A';

    // Type
    document.getElementById(`type-${col}`).textContent = typeLabel;
    
    // Description
    document.getElementById(`description-${col}`).textContent = item.short_description || item.description || 'N/A';
    
    // Versions
    const versionBadges = (item.game_versions || []).slice(0, 4).map(v => `<span class="version-badge">${v}</span>`).join('');
    document.getElementById(`version-${col}`).innerHTML = versionBadges || 'N/A';
    
    // Downloads
    document.getElementById(`downloads-${col}`).innerHTML = 
      `<strong>${(item.downloads || 0).toLocaleString()}</strong>`;
    
    // Followers
    document.getElementById(`followers-${col}`).innerHTML = 
      `<strong>${(item.followers || 0).toLocaleString()}</strong>`;
    
    // Updated
    const date = item.date_modified || item.updated;
    const dateText = date ? new Date(date).toLocaleDateString() : 'N/A';
    document.getElementById(`updated-${col}`).textContent = dateText;
    
    // Categories
    const categories = (item.categories || []).map(cat => 
      `<span class="category-pill">${cat}</span>`
    ).join('');
    document.getElementById(`categories-${col}`).innerHTML = categories || 'N/A';
    
    // Links
    const links = [
      item.project_url || item.download ? `<a href="${item.project_url || item.download}" class="link-button" target="_blank"><i class="fas fa-external-link-alt"></i> View Project</a>` : '',
      item.source_url ? `<a href="${item.source_url}" class="link-button" target="_blank"><i class="fab fa-github"></i> Source</a>` : ''
    ].filter(l => l).join('');
    document.getElementById(`links-${col}`).innerHTML = links || 'N/A';
  });
  
  // Clear remaining columns
  for (let i = selectedItems.length + 1; i <= 3; i++) {
    document.getElementById(`header-${i}`).innerHTML = '';
    ['icon', 'description', 'version', 'downloads', 'followers', 'updated', 'categories', 'links'].forEach(field => {
      document.getElementById(`${field}-${i}`).innerHTML = '';
    });
  }
  
  // Show results with animation
  const results = document.getElementById('comparison-results');
  results.classList.remove('hidden');
  setTimeout(() => results.style.opacity = '1', 10);
  
  // Scroll to results
  results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
document.getElementById('clear-btn').addEventListener('click', () => {
});

// Clear functionality
clearBtnEl?.addEventListener('click', () => {
  selects.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  updateCompareButton();
  const results = document.getElementById('comparison-results');
  if (results) results.classList.add('hidden');
});
</script>
