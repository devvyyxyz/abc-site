---
layout: doc
title: Contributing
nav_order: 4
category: Community
tags: [contributing, github, issues, pull-requests]
description: Help improve the ABC showcase. Report issues, suggest features, or contribute code.
---

## How to Contribute

We welcome contributions from the community! Whether it's bug reports, feature suggestions, or code improvements, your help is valuable.

## Reporting Issues

Found a bug or have a suggestion? Open an issue on [GitHub]({{ site.social.github }}/issues):

1. **Check existing issues** to avoid duplicates
2. **Be clear and descriptive** - include steps to reproduce for bugs
3. **Include screenshots** if relevant
4. **Mention your environment** - browser, OS, etc.

## Suggesting Features

Have an idea to improve the showcase?

1. **Open a GitHub discussion** or issue with the `enhancement` label
2. **Explain the use case** - why would this be useful?
3. **Show examples** - mockups or references are helpful
4. **Get feedback** - discuss with maintainers before starting work

## Contributing Code

### Setup

```bash
git clone {{ site.social.github }}.git
cd abc-site
bundle install
npm install
bundle exec jekyll serve --livereload
```

### Making Changes

1. **Create a branch** - `git checkout -b feature/your-feature-name`
2. **Make your changes** - keep commits focused and descriptive
3. **Test locally** - verify the site builds and works correctly
4. **Follow conventions** - match existing code style and patterns
5. **Push and create a PR** - describe what you changed and why

### Code Style

- **CSS**: Use existing variables and patterns; keep it minimal
- **JavaScript**: Vanilla JS, no frameworks; add comments for complex logic
- **Markdown**: Use consistent formatting; check Jekyll renders correctly
- **Naming**: Use kebab-case for files, camelCase for variables

### PR Guidelines

- Link related issues in the PR description
- Provide before/after screenshots for UI changes
- Ensure all checks pass (if applicable)
- Be open to feedback and revisions

## Documentation

Help improve the docs:

1. **Fix typos** - spot a mistake? Let us know
2. **Clarify sections** - is something unclear?
3. **Add examples** - show how to use features
4. **Translate** - help reach more developers

## Community

- **GitHub Discussions** - Ask questions, share ideas
- **Discord** - Join our community server (if available)
- **Twitter** - Follow for updates and announcements

## Code of Conduct

Please be respectful and constructive. We're all here to learn and build together.

---

Thank you for contributing! 🎉
