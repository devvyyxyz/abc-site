---
layout: default
title: User Guide
description: Complete guide for end users and project managers.
permalink: /docs/category/user-guide/
---

<section class="hero">
  <div class="hero-card">
    <h1>User Guide</h1>
    <p class="muted">Everything you need to know as a user or project manager.</p>
  </div>
</section>

<section class="section">
  <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
    {% assign category_docs = site.docs | where: "category", "User Guide" %}
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
