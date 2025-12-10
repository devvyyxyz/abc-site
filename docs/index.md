---
layout: default
title: Documentation
description: Guides for configuring and maintaining the site.
permalink: /docs/
---

<section class="section">
  <h1>Documentation</h1>
  <p class="muted">Setup, configuration, and maintenance guides.</p>
  <div class="grid">
    {% assign sorted_docs = site.docs | sort: 'nav_order' %}
    {% for doc in sorted_docs %}
      <a class="card" href="{{ doc.url | relative_url }}" style="text-decoration:none">
        <h3 style="margin-top:0">{{ doc.title }}</h3>
        {% if doc.description %}<p class="muted">{{ doc.description }}</p>{% endif %}
      </a>
    {% endfor %}
  </div>
</section>
