# ABC Site - Minecraft Showcase

Minimal steps to run and update the site.

## Prerequisites
- Ruby 3.x with Bundler
- Node.js 20+

## One-time setup
```bash
bundle install
npm install
```

## Configure
Edit `_config.yml`:
- `url` / `baseurl` for GitHub Pages
- `site` block (name, title, description, logo)
- `branding` colors and `meta` icons
- `social` links
- `modrinth.org_slug`, `modrinth.organization_url`, optional `modrinth.api_token_env`

## Fetch projects (Modrinth cache)
```bash
npm run fetch   # writes data/mods.json using config + MODRINTH_API_TOKEN
```

## Develop
```bash
bundle exec jekyll serve --livereload
# Visit http://localhost:4000/abc-site/
```

## Deploy
GitHub Actions build/deploy on push to `main` (see `.github/workflows/`).

## Extras / optional setup
- Rebrand: swap `site` text in `_config.yml` and replace `assets/images/logo.svg`, `meta.favicon`, `meta.apple_touch_icon`.
- Socials: keep `social` URLs; you can extend with `contact.email` or a `social_links` map for new platforms.
- SEO: add `meta.og_title`, `meta.og_description`, `meta.twitter_card` if you need overrides.
- Analytics: optional `analytics.google_tag` or `analytics.plausible_domain` keys; include scripts conditionally if set.
- Modrinth fetch: set `MODRINTH_API_TOKEN` (or `modrinth.api_token_env`) and run `npm run fetch`; in CI use the `fetch-modrinth` workflow/schedule.
- Smoke test: `bundle exec jekyll build` to verify before pushing.
- Assets tip: keep icons small; update `favicon`/`apple_touch_icon` paths when swapping.
- Deployment note: for custom domains set `url` to `https://yourdomain` and `baseurl` to blank, then update DNS/CNAME.
