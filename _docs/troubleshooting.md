---
layout: doc
title: Troubleshooting
nav_order: 8
category: Help
tags: [troubleshooting, errors, debugging, help]
description: Common issues and how to fix them.
---

## Build Fails

**Issue:** `bundle exec jekyll build` fails with an error

**Solutions:**

1. Check Ruby version: `ruby -v` (need 2.6+)
2. Update gems: `bundle update`
3. Clear cache: `rm -rf .bundle _site`
4. Check for syntax errors in YAML files

## Projects Not Showing

**Issue:** Project cards are empty or don't display

**Solutions:**

1. Verify `data/mods.json` exists and is valid JSON
2. Run `npm run fetch` to regenerate data
3. Check Modrinth organization slug in `_config.yml`
4. Ensure API token is set if fetching private projects: `export MODRINTH_API_TOKEN=your_token`

## Styles Not Updating

**Issue:** CSS changes don't appear after editing

**Solutions:**

1. Hard refresh browser: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
2. Restart Jekyll: `bundle exec jekyll serve --livereload`
3. Clear `_site/` folder: `rm -rf _site`
4. Ensure you're editing `src/styles/` (will compile to `assets/css/`)

## Navigation Links Broken

**Issue:** Links show 404 or lead to wrong pages

**Solutions:**

1. Check `baseurl` in `_config.yml` matches your deploy path
2. Verify file exists and permalink is correct in front matter
3. Use `relative_url` filter: `{{ '/docs/' | relative_url }}`

## Navbar Not Full Width

**Issue:** Header/footer doesn't span the full page

**Solutions:**

1. Check header CSS has `width: 100vw` and `box-sizing: border-box`
2. Ensure no parent element constrains the width
3. Verify `padding` isn't adding extra width

## Performance Issues

**Issue:** Site builds slowly

**Solutions:**

1. Check `_config.yml` excludes large folders: `node_modules`, `src/`
2. Reduce image sizes in `assets/images/`
3. Remove unused CSS/JS files
4. Consider using incremental builds: `bundle exec jekyll serve -I`

## Search Not Working

**Issue:** Search bar doesn't filter results

**Solutions:**

1. Ensure `search.js` is loaded in layout
2. Check that project data is loaded: open DevTools Console
3. Verify JSON file path is correct

---

**Still stuck?** [Open an issue]({{ site.social.github }}/issues) or check the [FAQ](faq).
