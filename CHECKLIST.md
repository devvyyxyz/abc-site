# Pre-Deployment Checklist

## ✅ Code Setup Complete

- [x] Project restructured to `src/` layout
- [x] Old root files cleaned up
- [x] `src/pages/`, `src/partials/`, `src/styles/`, `src/scripts/` organized
- [x] `.nojekyll` created (disables Jekyll)
- [x] `.github/workflows/deploy.yml` created
- [x] `.github/workflows/fetch-projects.yml` created
- [x] `package.json` with build dependencies
- [x] `fetch-modrinth.js` converted to ESM
- [x] Documentation created

## 📋 Before You Push

- [ ] Test site locally: `cd src/pages && python3 -m http.server 8000`
  - [ ] index.html loads without FOUC
  - [ ] All pages accessible (index, about, mods)
  - [ ] Search filtering works
  - [ ] Navigation and footer render correctly
  - [ ] Social links appear
  - [ ] Config injection works (site name in navbar)

- [ ] Verify no broken links
  - [ ] All partials include with correct relative paths
  - [ ] All CSS files load (check Network tab in DevTools)
  - [ ] All JS files load (check Console for errors)

- [ ] Check config.json
  - [ ] `site.name`, `site.title`, `site.description` set correctly
  - [ ] `site.logo` URL is valid
  - [ ] `social` links point to correct places
  - [ ] `org.name` and `org.slug` match your Modrinth org

- [ ] Check data/modpacks.json
  - [ ] File exists and has valid JSON
  - [ ] Each entry has: `id`, `name`, `description`, `thumbnail`, `download`

## 🚀 Deployment Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Repository → Settings → Pages
   - Source: GitHub Actions (auto-detected)
   - Click Save

3. **Set up Modrinth** (optional but recommended)
   - Settings → Secrets and variables → Actions
   - New secret: `MODRINTH_ORG` = your org slug
   - New secret: `MODRINTH_TOKEN` = your API token
   - [Get token here](https://modrinth.com/settings/account)

4. **Wait for deployment**
   - Go to Actions tab
   - Watch "Deploy to GitHub Pages" workflow
   - Should complete in ~1-2 minutes
   - Your site is now live at: `https://<username>.github.io/<repo-name>/`

## ✨ After Deployment

### Site is live! Test it:
- [ ] Visit your GitHub Pages URL
- [ ] Verify all pages load
- [ ] Test search functionality
- [ ] Check that modpacks display correctly
- [ ] Verify social links in navbar/footer

### Make future changes:
- Edit files in `src/pages/`, `src/partials/`, `src/styles/`, `src/scripts/`
- Commit and push
- Workflow automatically deploys (1-2 minutes)

### Add Modrinth projects:
- Workflow fetches automatically daily at 2 AM UTC
- Or manually trigger: Actions → Fetch Workflow → Run

## 🔧 Local Development Commands

```bash
# Start dev server
npm run dev
# or manually:
cd src/pages && python3 -m http.server 8000

# Fetch Modrinth projects locally
export MODRINTH_ORG=your-slug
export MODRINTH_TOKEN=your-token
npm run fetch

# Install dependencies
npm install
```

## 📞 Need Help?

- **README.md** — Quick start and features
- **DEPLOY.md** — Comprehensive deployment guide
- **GITHUB_PAGES_SETUP.md** — Setup overview
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Modrinth Docs](https://docs.modrinth.com/)

## 🎯 What Happens When You Push

```
You push to main
    ↓
GitHub Actions trigger deploy.yml
    ↓
Workflow downloads repo
    ↓
Installs Node.js
    ↓
Runs fetch-modrinth.js (if secrets set)
    ↓
Uploads src/pages/ as artifact
    ↓
GitHub Pages deploys it
    ↓
Site live at https://<username>.github.io/<repo-name>/
```

---

**Everything is ready! Just push and you're live.** 🎉
