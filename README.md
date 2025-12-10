# Minecraft Showcase (static)

This is a minimal static website to showcase Minecraft mods, resource packs, datapacks, modpacks, and plugins.

Quick features:
- Floating, blurred navbar and footer
- Partial includes using `<div data-include="./partials/xxx.html"></div>`
- Dynamic modpack list from `data/modpacks.json`
- Small animations and notifications

How to run locally

1. From the project root run a static server, for example using Python (macOS):

```bash
cd /Users/kaispife/Documents/VSC/abc-site
python3 -m http.server 8000
# then open http://localhost:8000
```

Adding content

- Partials: Add or edit files in `partials/`. Any element with `data-include` will be fetched and inserted. Example: `<div data-include="./partials/nav.html"></div>`.
-- Modpacks: Edit `data/modpacks.json` — each object should include `id`, `name`, `description`, `thumbnail` (URL), `download`, and optional `tags` array.
- Modrinth integration: Projects are fetched at build time via GitHub Actions. The token is stored securely in GitHub Secrets.

How Modrinth loading works (build-time)
- A GitHub Actions workflow runs `scripts/fetch-modrinth.js` daily (and on push) using the `MODRINTH_TOKEN` secret.
- Projects are written to `data/modpacks.json` and committed automatically.
- The static site loads from this file at runtime (no API calls in the browser).

Manual fetch (local development)
```bash
export MODRINTH_ORG=abcxyz
export MODRINTH_TOKEN=your_token_here
node scripts/fetch-modrinth.js
```If you prefer purely static entries, open `partials/modpacks.html` and add HTML cards directly.

Customization ideas
- Replace thumbnails with your own images under `assets/img/` and update `data/modpacks.json`.
- Tweak `assets/css/styles.css` for colors, radii, and animation timing.
