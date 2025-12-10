---
layout: default
title: Home
description: Browse curated Minecraft mods, resource packs, datapacks, modpacks and plugins.
---

<section class="hero">
  <div class="hero-card">
    <h1>Showcase: Minecraft Mods & Packs</h1>
    <p class="muted">Mods, resource packs, datapacks, modpacks and plugins — neatly showcased.</p>
    <div class="cta-row">
      <a class="btn primary" href="#modpacks">Browse Modpacks</a>
      <a class="btn ghost" href="/mods/">See Mods</a>
      <button class="btn ghost" id="notify-sample">Show Notification</button>
    </div>
  </div>
</section>

<section id="modpacks" class="section">
  <h2>Featured Projects</h2>
  <p class="muted">Add projects by creating <code>_data/modpacks.json</code> with your content.</p>
  
  {% include modpacks.html %}
</section>

<section class="section">
  <h2>How It Works</h2>
  <div class="grid">
    <div class="card">
      <h3>📦 Static Content</h3>
      <p>All projects are stored as static data. No database needed.</p>
    </div>
    <div class="card">
      <h3>🔄 Auto-Update</h3>
      <p>Daily syncs from Modrinth keep your showcase fresh.</p>
    </div>
    <div class="card">
      <h3>⚡ Lightning Fast</h3>
      <p>Deployed globally on GitHub Pages for instant loading.</p>
    </div>
    <div class="card">
      <h3>🎨 Beautiful</h3>
      <p>Modern design with smooth animations and blur effects.</p>
    </div>
  </div>
</section>
