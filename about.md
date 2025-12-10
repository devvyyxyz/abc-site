---
layout: default
title: About
description: Learn about our Minecraft showcase.
permalink: /about/
---

<section class="hero">
  <div class="hero-card">
    <h1>About Us</h1>
    <p class="muted">A community-driven showcase for the best Minecraft mods, resource packs, datapacks, modpacks, and plugins.</p>
  </div>
</section>

<section class="section">
  <h2>Our Mission</h2>
  <p class="muted">To provide an organized, beautiful, and accessible platform for discovering and showcasing high-quality Minecraft content.</p>
  
  <div class="grid">
    <div class="card">
      <h3><i class="fa-solid fa-bullseye"></i> Curated Collection</h3>
      <p>We handpick projects from the Modrinth ecosystem, ensuring quality and relevance for our community.</p>
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-users"></i> Community Focused</h3>
      <p>Built by and for the Minecraft community. Your feedback and contributions shape our platform.</p>
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-code"></i> Open Source</h3>
      <p>Completely open-source and transparent. Fork, modify, and contribute on GitHub.</p>
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-bolt"></i> Fast & Reliable</h3>
      <p>Static site hosted on GitHub Pages. Zero downtime, global CDN, instant loading.</p>
    </div>
  </div>
</section>

<section class="section">
  <h2>How It Works</h2>
  <div class="grid">
    <div class="card">
      <h3><i class="fa-solid fa-database"></i> Live Data</h3>
      <p>We sync project data daily from Modrinth, keeping our showcase fresh and up-to-date with the latest versions and downloads.</p>
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-filter"></i> Smart Filtering</h3>
      <p>Filter projects by type, loader, and game version. Find exactly what you're looking for in seconds.</p>
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-chart-line"></i> Statistics</h3>
      <p>Real-time statistics show total downloads, supported versions, popular categories, and trending projects.</p>
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-link"></i> Direct Links</h3>
      <p>Every project links directly to Modrinth, ensuring you always download from the official source.</p>
    </div>
  </div>
</section>

<section class="section">
  <h2>Get Involved</h2>
  <div class="grid">
    <div class="card">
      <h3><i class="fa-brands fa-discord"></i> Join Discord</h3>
      <p class="muted">Chat with our community, get support, and suggest improvements.</p>
      {% if site.social.discord %}
        <a class="btn primary" href="{{ site.social.discord }}" target="_blank" rel="noopener">Open Discord</a>
      {% endif %}
    </div>
    <div class="card">
      <h3><i class="fa-brands fa-github"></i> Contribute</h3>
      <p class="muted">Found a bug? Have an idea? Star and contribute to our repository.</p>
      {% if site.social.github %}
        <a class="btn ghost" href="{{ site.social.github }}" target="_blank" rel="noopener">View on GitHub</a>
      {% endif %}
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-heart"></i> Support</h3>
      <p class="muted">Enjoying the platform? Follow our socials and spread the word!</p>
      {% if site.social.twitter %}
        <a class="btn ghost" href="{{ site.social.twitter }}" target="_blank" rel="noopener">Follow Twitter</a>
      {% endif %}
    </div>
  </div>
</section>

<section class="section">
  <h2>Our Values</h2>
  <div class="grid">
    <div class="card">
      <h3>Accessibility</h3>
      <p>We believe everyone should have access to quality Minecraft content, regardless of technical skill or platform.</p>
    </div>
    <div class="card">
      <h3>Transparency</h3>
      <p>Open source code, public data, and clear communication. We have nothing to hide.</p>
    </div>
    <div class="card">
      <h3>Community</h3>
      <p>Built together, not for profit. We prioritize creator and player needs over monetization.</p>
    </div>
    <div class="card">
      <h3>Quality</h3>
      <p>Every project showcased meets our standards for functionality, documentation, and community support.</p>
    </div>
  </div>
</section>

<section class="section">
  <h2>Contact & Support</h2>
  <div class="grid">
    <div class="card">
      <h3><i class="fa-solid fa-envelope"></i> Need Help?</h3>
      <p class="muted">Have questions? Check our documentation or reach out on Discord.</p>
      <a class="btn primary" href="{{ '/docs/' | relative_url }}">Read Docs</a>
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-bug"></i> Found a Bug?</h3>
      <p class="muted">Report issues and suggest features on our GitHub repository.</p>
      {% if site.social.github %}
        <a class="btn primary" href="{{ site.social.github }}/issues" target="_blank" rel="noopener">Report Issue</a>
      {% endif %}
    </div>
    <div class="card">
      <h3><i class="fa-solid fa-handshake"></i> Let's Collaborate</h3>
      <p class="muted">Interested in partnering or featuring your project? Let's talk!</p>
      {% if site.social.discord %}
        <a class="btn ghost" href="{{ site.social.discord }}" target="_blank" rel="noopener">Chat with Us</a>
      {% endif %}
    </div>
  </div>
</section>
