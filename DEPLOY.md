# GitHub Pages Deployment Guide

## Quick Start

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Set up GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: "GitHub Actions" (should be auto-detected)
   - Your site will deploy automatically

3. **Set up Modrinth integration** (optional):
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add `MODRINTH_ORG` with your org slug (e.g., `abcxyz`)
   - Add `MODRINTH_TOKEN` with your Modrinth API token [get one here](https://modrinth.com/settings/account)

4. **Done!** Your site is now live at `https://<username>.github.io/<repo-name>/`

## How It Works

### Deploy Workflow (`deploy.yml`)
- **Trigger:** Push to main branch
- **Steps:**
  1. Checks out your repository
  2. Installs Node.js
  3. Runs Modrinth fetch script (if secrets are set)
  4. Uploads `src/pages/` directory as artifact
  5. Deploys to GitHub Pages

### Fetch Workflow (`fetch-projects.yml`)
- **Trigger:** Daily at 2 AM UTC, on push to main, or manually
- **Steps:**
  1. Fetches your Modrinth organization projects
  2. Writes to `data/modpacks.json`
  3. Commits changes automatically
  4. Pushes back to repository
  5. Automatically triggers deploy workflow

## Manual Deployment

To manually re-deploy without making changes:
1. Go to Actions tab in GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Site deploys in ~1 minute

## Troubleshooting

### Site not showing up after push
- Wait 30-60 seconds for GitHub Actions to complete
- Check Actions tab → workflows → View details for errors
- Verify Settings → Pages shows "GitHub Actions" as source

### Modrinth projects not updating
- Check if secrets are set: Settings → Secrets and variables
- Verify `MODRINTH_ORG` and `MODRINTH_TOKEN` are correct
- Check Actions → fetch-projects workflow for errors
- Look at the log output for specific API errors

### 404 errors for assets
- Ensure all paths in HTML use relative paths: `../styles/`, `../scripts/`
- Check that `src/pages/index.html` includes partials correctly
- Test locally first: `cd src/pages && python3 -m http.server 8000`

### Partial content not loading
- Verify `include.js` is being served (check browser console for errors)
- Ensure partials are at `src/partials/` (not in old `partials/` directory)
- Test relative path resolution locally before pushing

## Custom Domain

To use a custom domain (e.g., `minecraft.yourdomain.com`):

1. **DNS Setup:**
   - Go to your domain registrar (Godaddy, Namecheap, etc.)
   - Add a CNAME record pointing to `<username>.github.io`

2. **GitHub Settings:**
   - Repository → Settings → Pages
   - Custom domain: `minecraft.yourdomain.com`
   - GitHub will automatically create a CNAME file

3. **Enable HTTPS:**
   - After 24 hours, GitHub automatically provisions SSL certificate
   - Check "Enforce HTTPS" in Pages settings

## Testing Before Deploy

Always test locally first:

```bash
# 1. Install dependencies
npm install

# 2. Start local server
npm run dev
# or manually: cd src/pages && python3 -m http.server 8000

# 3. Open http://localhost:8000 in browser
# 4. Verify all pages load, search works, etc.

# 5. Test Modrinth fetch locally
export MODRINTH_ORG=abcxyz
export MODRINTH_TOKEN=your_token
npm run fetch
# Then check that data/modpacks.json was updated
```

## Updating Content

### Add/edit pages
1. Modify files in `src/pages/`
2. Commit and push
3. Deploy workflow automatically runs
4. Changes live in ~1 minute

### Add/edit partials
1. Modify files in `src/partials/`
2. Commit and push
3. Deploy workflow automatically runs

### Add/edit styles
1. Modify files in `src/styles/`
2. Commit and push
3. Deploy workflow automatically runs

### Add static modpack entries
1. Edit `data/modpacks.json` manually
2. Commit and push
3. Deploy workflow automatically runs

### Fetch from Modrinth
- Happens daily automatically
- Or manually: Settings → Secrets, verify `MODRINTH_TOKEN` set, then go to Actions → Fetch Workflow → Run workflow

## Environment Variables

These are set in GitHub Settings → Secrets and variables → Actions:

- `MODRINTH_ORG` — Your Modrinth organization slug (e.g., `abcxyz`)
- `MODRINTH_TOKEN` — Your Modrinth API token (keep this secret!)

Leave blank to skip Modrinth integration.

## Debugging

**To see detailed build logs:**
1. Push a commit to main
2. Go to Actions tab
3. Click on the workflow run
4. Click "Deploy to GitHub Pages" job
5. Expand each step to see detailed output

**Common errors:**
- `ENOENT: no such file or directory` — Check file paths in workflows
- `404 Not Found` — Check GitHub Actions artifact upload path
- `fetch failed` — Check Modrinth secrets and API token validity

## Support

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Modrinth API Documentation](https://docs.modrinth.com/)
