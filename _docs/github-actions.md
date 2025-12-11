---
layout: docs
title: GitHub Actions
description: Automated workflows for building, testing, and deploying your site.
nav_order: 8
category: Developer
tags: [github-actions, ci-cd, automation, workflows]
---

# GitHub Actions Guide

Automate your ABC showcase with GitHub Actions workflows.

## Basic Build Workflow

### Jekyll Build & Deploy

Create `.github/workflows/build.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.1"
          bundler-cache: true

      - name: Build site
        run: bundle exec jekyll build
        env:
          JEKYLL_ENV: production

      - name: Test HTML
        run: |
          bundle exec htmlproofer ./_site \
            --disable-external \
            --allow-hash-href
```

## Advanced Workflows

### Link Checker

Check for broken links:

```yaml
name: Link Check

on:
  schedule:
    - cron: "0 0 * * 0" # Weekly
  workflow_dispatch:

jobs:
  link-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.1"
          bundler-cache: true

      - name: Build site
        run: bundle exec jekyll build

      - name: Check links
        uses: lycheeverse/lychee-action@v1
        with:
          args: --verbose --no-progress './_site/**/*.html'
```

### Auto-Update Dependencies

Keep gems updated:

```yaml
name: Update Dependencies

on:
  schedule:
    - cron: "0 0 * * 1" # Weekly on Monday
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.1"

      - name: Update gems
        run: bundle update

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: "chore: update dependencies"
          title: "Update Ruby dependencies"
          body: "Automated dependency updates"
          branch: update-dependencies
```

### Lighthouse CI

Performance testing:

```yaml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.1"
          bundler-cache: true

      - name: Build site
        run: bundle exec jekyll build

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:4000
            http://localhost:4000/projects/
            http://localhost:4000/docs/
          uploadArtifacts: true
```

## Modrinth Data Sync

### Auto-Fetch Latest Mods

Keep mod data fresh:

```yaml
name: Sync Modrinth Data

on:
  schedule:
    - cron: "0 */6 * * *" # Every 6 hours
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "18"

      - name: Fetch Modrinth data
        run: |
          # Your script to fetch from Modrinth API
          node scripts/fetch-modrinth.js

      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore: update Modrinth data"
          file_pattern: "_data/mods.json"
```

## Caching Strategies

### Bundle Cache

Speed up builds with caching:

{% raw %}

```yaml
- name: Setup Ruby
  uses: ruby/setup-ruby@v1
  with:
    ruby-version: "3.1"
    bundler-cache: true # Automatic bundler caching

- name: Cache Jekyll build
  uses: actions/cache@v3
  with:
    path: |
      .jekyll-cache
      _site
    key: ${{ runner.os }}-jekyll-${{ hashFiles('**/*.md', '**/*.html') }}
    restore-keys: |
      ${{ runner.os }}-jekyll-
```

{% endraw %}

## Notifications

### Slack Integration

Get notified on deployment:

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: "Deployment completed!"
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

### Discord Webhook

```yaml
- name: Discord notification
  uses: Ilshidur/action-discord@master
  env:
    DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}
  with:
    args: "Site deployed successfully! 🚀"
```

## Security Scanning

### Dependency Scanning

```yaml
name: Security Scan

on:
  push:
    branches: [main]
  schedule:
    - cron: "0 0 * * 0"

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run bundle audit
        run: |
          gem install bundler-audit
          bundle audit --update
```

## Secrets Management

### Required Secrets

Add in Settings > Secrets and variables > Actions:

- `GITHUB_TOKEN` - Automatically provided
- `SLACK_WEBHOOK` - For Slack notifications
- `DISCORD_WEBHOOK` - For Discord notifications
- Custom API keys for integrations

### Using Secrets

```yaml
- name: Deploy to custom server
  env:
    API_KEY: ${{ secrets.API_KEY }}
    SERVER_URL: ${{ secrets.SERVER_URL }}
  run: |
    curl -X POST "$SERVER_URL" \
      -H "Authorization: Bearer $API_KEY"
```

## Workflow Triggers

### Available Triggers

```yaml
on:
  push:
    branches: [main]
    paths:
      - "**.md"
      - "**.html"
  pull_request:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
  release:
    types: [published]
```

## Best Practices

1. **Use caching** to speed up builds
2. **Run tests on PRs** before merging
3. **Schedule maintenance tasks** (link checks, updates)
4. **Secure secrets** properly
5. **Monitor workflow costs** and runtime
6. **Use matrix builds** for testing multiple versions

## Troubleshooting

### Failed Builds

Check logs:

1. Click on failed workflow
2. Expand failed step
3. Review error messages

Common fixes:

- Update action versions
- Clear cache
- Check secrets configuration

### Timeout Issues

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 30 # Increase if needed
```

## Next Steps

- [Deployment Guide](deployment.html) - Deploy to hosting platforms
- [Performance Guide](performance.html) - Optimize build times
- [API Reference](api-reference.html) - Data structure documentation
