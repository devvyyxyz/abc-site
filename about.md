---
layout: default
title: About
description: Learn about our Minecraft showcase.
permalink: /about/
---

<h1>About Us</h1>
<p class="muted">We showcase Minecraft mods, resource packs, datapacks, modpacks and plugins.</p>

<section class="section">
  <div class="grid">
    <div class="card">
      <h3>Our Mission</h3>
      <p class="muted">Provide a clean, browsable showcase for curated Minecraft projects.</p>
    </div>
    <div class="card">
      <h3>Contact</h3>
      <p class="muted">Reach out to us via:</p>
      <ul>
        {% if site.social.discord %}
          <li><a href="{{ site.social.discord }}" target="_blank">Discord</a></li>
        {% endif %}
        {% if site.social.twitter %}
          <li><a href="{{ site.social.twitter }}" target="_blank">Twitter</a></li>
        {% endif %}
        {% if site.social.github %}
          <li><a href="{{ site.social.github }}" target="_blank">GitHub</a></li>
        {% endif %}
      </ul>
    </div>
  </div>
</section>
