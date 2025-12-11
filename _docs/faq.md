---
layout: doc
title: FAQ
nav_order: 5
category: Help
tags: [faq, troubleshooting, questions, help]
description: Frequently asked questions about the ABC showcase.
---

## General

**Q: What is ABC?**
A: ABC is a static site showcase for curated Minecraft projects (mods, resource packs, datapacks, modpacks, plugins) from a Modrinth organization.

**Q: Can I fork and customize it?**
A: Yes! The site is open-source. Fork the [GitHub repo]({{ site.social.github }}), configure it for your organization, and deploy.

**Q: Do I need technical knowledge to use it?**
A: Basic familiarity with Git and command line helps, but the setup is straightforward. Check our [Getting Started](getting-started) guide.

## Setup & Configuration

**Q: How do I connect my Modrinth organization?**
A: Set `modrinth.org_slug` in `_config.yml` to your organization slug, then run `npm run fetch` to sync projects.

**Q: Can I customize colors?**
A: Yes! Edit `src/styles/root.css` to change the theme colors, fonts, and spacing.

**Q: How do I add a logo?**
A: Replace `assets/images/logo.svg` with your logo, then update the path in `_config.yml` if needed.

**Q: Where do social links appear?**
A: In the navbar (top right) and footer. Configure them in `_config.yml` under `social`.

## Projects & Data

**Q: How often does the project list update?**
A: Run `npm run fetch` manually, or set up a scheduled GitHub Action to auto-sync daily.

**Q: Can I filter projects by type or version?**
A: Yes! The projects page has built-in filters for type, loader, and Minecraft version.

**Q: What data comes from Modrinth?**
A: Title, description, icon, downloads, versions, loaders, categories, and links. All pulled from the Modrinth API.

**Q: Can I add projects manually?**
A: You can edit `data/mods.json` directly, but it's better to add them to Modrinth and sync via `npm run fetch`.

## Deployment

**Q: How do I deploy to GitHub Pages?**
A: Configure `baseurl` in `_config.yml` to your repo name, then GitHub Actions auto-deploys on push (if enabled).

**Q: Can I host it elsewhere?**
A: Yes! Run `bundle exec jekyll build` and upload the `_site/` folder to any static hosting (Netlify, Vercel, etc.).

**Q: What's the baseurl?**
A: It's the URL path where your site lives. For `github.io/abc-site`, set `baseurl: /abc-site`.

## Performance

**Q: Why is the build slow?**
A: Large `node_modules/` and `src/` folders are excluded by default. Check `_config.yml` to ensure unnecessary folders aren't processed.

**Q: How do I optimize for mobile?**
A: The site is responsive by default using CSS `clamp()`. Test on phone to verify layouts work.

## Troubleshooting

**Q: Site won't build**
A: Check Ruby version (`ruby -v`). We use 2.6+. Run `bundle install` to install dependencies.

**Q: Projects don't show**
A: Verify `data/mods.json` exists and is valid JSON. Run `npm run fetch` to regenerate it.

**Q: Navbar looks broken**
A: Hard refresh (Cmd+Shift+R). Clear browser cache if using `jekyll serve`.

**Q: Styles not updating**
A: Changes to source files (`src/styles/`) need to be compiled. Either build with `bundle exec jekyll build` or ensure `jekyll serve` is watching the files.

## Contributing

**Q: How do I contribute code?**
A: Fork the repo, make changes on a branch, and open a PR. See [Contributing](contributing) for details.

**Q: Can I suggest features?**
A: Yes! Open a GitHub issue or discussion. We'd love to hear your ideas.

---

**Still have questions?** Open an [issue]({{ site.social.github }}/issues) or [reach out on Discord]({{ site.social.discord }}).
