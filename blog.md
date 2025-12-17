---
layout: default
title: Blog
description: Latest updates, releases, and behind-the-scenes notes.
permalink: /blog/
---

<section class="section">
  <h1>Blog</h1>
  <p class="muted">Updates from the team — releases, dev logs, and tips.</p>

  <div class="filters" style="margin: 12px 0 20px; display:flex; gap:8px; flex-wrap:wrap;">
    {% assign all_tags = site.tags %}
    {% for tag in all_tags %}
      <a href="{{ '/blog/#' | append: tag[0] | relative_url }}" style="padding:6px 10px; border:1px solid var(--border); border-radius:999px; text-decoration:none; color:var(--text-secondary);">#{{ tag[0] }}</a>
    {% endfor %}
  </div>

  <div class="filters" style="margin: 0 0 24px; display:flex; gap:8px; flex-wrap:wrap;">
    {% assign all_categories = site.categories %}
    {% for category in all_categories %}
      <a href="{{ '/blog/#' | append: category[0] | relative_url }}" style="padding:6px 10px; border:1px solid var(--border); border-radius:999px; text-decoration:none; color:var(--text-secondary);">{{ category[0] }}</a>
    {% endfor %}
  </div>

  <div class="post-list" style="display: grid; gap: 16px;">
    {% assign posts = site.posts | where_exp: 'p', 'p.published != false' %}
    {% for post in posts %}
    <article style="border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; background: var(--bg-primary);">
      <h2 style="margin: 0;">
        <a href="{{ post.url | relative_url }}" style="color: var(--text); text-decoration: none;">{{ post.title }}</a>
      </h2>
      <p class="muted" style="margin: 6px 0 12px;">{{ post.date | date: "%B %d, %Y" }} • {{ post.author | default: site.site.name }}</p>
      {% if post.excerpt %}
        <p style="margin: 0 0 8px;">{{ post.excerpt }}</p>
      {% endif %}
      {% if post.tags %}
        <div style="margin:8px 0;">
          {% for tag in post.tags %}
            <span style="display:inline-block; padding: 4px 8px; border: 1px solid var(--border); border-radius: 999px; margin-right: 6px; font-size: 12px;">#{{ tag }}</span>
          {% endfor %}
        </div>
      {% endif %}
      <a href="{{ post.url | relative_url }}" class="button" style="display:inline-block; padding: 8px 12px; background: var(--accent-primary); color: #000; border-radius: var(--radius); text-decoration: none;">Read More</a>
    </article>
    {% endfor %}

    {% if posts.size == 0 %}
      <p class="muted">No posts yet. Stay tuned!</p>
    {% endif %}

  </div>
</section>
