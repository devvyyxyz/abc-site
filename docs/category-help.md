---
layout: default
title: Help & Troubleshooting
description: Find answers to common questions and issues.
permalink: /docs/category/help/
---

<section class="hero">
  <div class="hero-card">
    <h1>Help & Troubleshooting</h1>
    <p class="muted">Find answers to common questions and fix issues quickly.</p>
  </div>
</section>

<section class="section">
  <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
    {% assign category_docs = site.docs | where: "category", "Help" %}
    {% for doc in category_docs %}
      <div class="card">
        <h3>{{ doc.title }}</h3>
        <p class="muted" style="font-size: 13px; margin-bottom: 12px;">{{ doc.description }}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
          {% for tag in doc.tags %}
            <span style="display: inline-block; padding: 4px 8px; background: rgba(27, 217, 111, 0.1); color: var(--accent-primary); border-radius: 4px; font-size: 12px;">#{{ tag }}</span>
          {% endfor %}
        </div>
        <a class="btn primary" href="{{ doc.url | relative_url }}" style="width: 100%; display: block; text-align: center;">Read More</a>
      </div>
    {% endfor %}
  </div>
</section>

<section class="section">
  <div style="text-align: center;">
    <p><a href="{{ '/docs/' | relative_url }}">← Back to all documentation</a></p>
  </div>
</section>
