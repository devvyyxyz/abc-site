# Contributing Guide

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/devvyyxyz/abc-site.git
   cd abc-site
   ```

2. **Install dependencies**
   ```bash
   bundle install  # Ruby/Jekyll dependencies
   ```

3. **Start development server**
   ```bash
   bundle exec jekyll serve
   ```
   Visit `http://localhost:4000` in your browser

## Making Changes

### Editing Content
- Page content: Edit `.md` files in root (`index.md`, `about.md`, etc.)
- Navigation/partials: Edit files in `_includes/`
- Site config: Edit `_config.yml`

### Editing Styles
- Add/modify CSS in `src/styles/`
- Changes are served automatically during development
- Files are compiled to `assets/css/` for production

### Editing JavaScript
- Add/modify JS in `src/scripts/`
- Main app logic in `main.js`
- Modrinth integration in `modrinth.js`
- Search functionality in `search.js`

### Adding Features
1. Create feature branch: `git checkout -b feature/description`
2. Make changes following the guidelines above
3. Test locally with `bundle exec jekyll serve`
4. Commit with clear messages: `git commit -m "feat: description"`
5. Push to your fork and create a pull request

## Best Practices

### CSS
- Use CSS variables defined in `root.css`
- Keep specificity low
- Use semantic class names
- Add comments for complex styles

### JavaScript
- Keep modules focused and single-purpose
- Use descriptive function names
- Add JSDoc comments for public functions
- Handle errors gracefully with try-catch

### Git Commits
- Use conventional commit format: `type: description`
  - `feat:` New feature
  - `fix:` Bug fix
  - `docs:` Documentation
  - `style:` Formatting
  - `refactor:` Code restructuring
  - `perf:` Performance improvement

## Testing

1. Build locally and check all pages render correctly
2. Test on different screen sizes (mobile, tablet, desktop)
3. Verify all links and buttons work
4. Check browser console for errors

## Deployment

Changes pushed to `main` branch are automatically deployed via GitHub Actions.
- See `.github/workflows/` for deployment configuration
- Production site: https://devvyyxyz.github.io/abc-site/

## Issues & Questions

- Open issues on GitHub for bugs or feature requests
- Discuss in GitHub discussions for questions
