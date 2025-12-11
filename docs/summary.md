---
layout: default
title: Documentation Summary
description: Overview of all documentation pages and resources.
permalink: /docs/summary/
---

<section class="hero">
  <div class="hero-card">
    <h1>Documentation Overview</h1>
    <p class="muted">Complete reference of all available guides and resources.</p>
  </div>
</section>

<section class="section">
  <h2>📚 All Documentation Pages</h2>

  <h3>Setup & Configuration (2 pages)</h3>
  <ul style="list-style: none; padding: 0;">
    <li><strong><a href="{{ '/docs/getting-started/' | relative_url }}">Getting Started</a></strong> — Quick start guide for new users</li>
    <li><strong><a href="{{ '/docs/setup/' | relative_url }}">Setup & Configuration</a></strong> — Detailed setup and Modrinth integration instructions</li>
  </ul>

  <h3>Styling & Customization (1 page)</h3>
  <ul style="list-style: none; padding: 0;">
    <li><strong><a href="{{ '/docs/customization/' | relative_url }}">Customization</a></strong> — Theming, colors, and CSS customization</li>
  </ul>

  <h3>Community & Contributing (1 page)</h3>
  <ul style="list-style: none; padding: 0;">
    <li><strong><a href="{{ '/docs/contributing/' | relative_url }}">Contributing</a></strong> — Guidelines for contributors and pull requests</li>
  </ul>

  <h3>Help & Troubleshooting (2 pages)</h3>
  <ul style="list-style: none; padding: 0;">
    <li><strong><a href="{{ '/docs/faq/' | relative_url }}">FAQ</a></strong> — Frequently asked questions</li>
    <li><strong><a href="{{ '/docs/troubleshooting/' | relative_url }}">Troubleshooting</a></strong> — Common issues and solutions</li>
  </ul>

  <h3>User Guide (1 page)</h3>
  <ul style="list-style: none; padding: 0;">
    <li><strong><a href="{{ '/docs/how-to-install/' | relative_url }}">How to Install</a></strong> — Step-by-step installation guide</li>
  </ul>

  <h3>Developer Resources (3 pages)</h3>
  <ul style="list-style: none; padding: 0;">
    <li><strong><a href="{{ '/docs/api-reference/' | relative_url }}">API Reference</a></strong> — Project data structure and Modrinth API</li>
    <li><strong><a href="{{ '/docs/project-structure/' | relative_url }}">Project Structure</a></strong> — File organization and architecture</li>
    <li><strong><a href="{{ '/docs/troubleshooting/' | relative_url }}">Troubleshooting</a></strong> — Debugging and common errors</li>
  </ul>

</section>

<section class="section">
  <h2>🏷️ Tag Cloud</h2>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
    {% assign all_tags = site.docs | map: "tags" | join: "," | split: "," | uniq | sort %}
    {% for tag in all_tags %}
      {% if tag != "" %}
        <span style="display: inline-block; padding: 6px 12px; background: rgba(27, 217, 111, 0.1); color: var(--accent-primary); border-radius: 999px; border: 1px solid var(--accent-primary); font-size: 13px; cursor: pointer;" onclick="document.location.href='{{ '/docs/' | relative_url }}?filter={{ tag }}'">
          #{{ tag }}
        </span>
      {% endif %}
    {% endfor %}
  </div>
</section>

<section class="section">
  <h2>📂 Browse by Category</h2>
  <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
    <a class="card" href="{{ '/docs/category/setup/' | relative_url }}" style="text-decoration: none;">
      <h3>⚙️ Setup</h3>
      <p class="muted">Installation and configuration guides</p>
    </a>
    <a class="card" href="{{ '/docs/category/styling/' | relative_url }}" style="text-decoration: none;">
      <h3>🎨 Styling</h3>
      <p class="muted">Theming and customization</p>
    </a>
    <a class="card" href="{{ '/docs/category/user-guide/' | relative_url }}" style="text-decoration: none;">
      <h3>📖 User Guide</h3>
      <p class="muted">For end users and managers</p>
    </a>
    <a class="card" href="{{ '/docs/category/community/' | relative_url }}" style="text-decoration: none;">
      <h3>🤝 Community</h3>
      <p class="muted">Contributing and support</p>
    </a>
    <a class="card" href="{{ '/docs/category/developer/' | relative_url }}" style="text-decoration: none;">
      <h3>💻 Developer</h3>
      <p class="muted">Technical reference</p>
    </a>
    <a class="card" href="{{ '/docs/category/help/' | relative_url }}" style="text-decoration: none;">
      <h3>❓ Help</h3>
      <p class="muted">FAQ and troubleshooting</p>
    </a>
  </div>
</section>

<section class="section">
  <h2>🔍 Quick Search</h2>
  <p class="muted">Use the <a href="{{ '/docs/' | relative_url }}">main documentation page</a> to search and filter all guides by keyword or category.</p>
</section>
