# Publishing to npm

This guide explains how to publish the AffectiveSliderVue package to npm.

## Prerequisites

1. **npm account**: You need an npm account. Create one at https://www.npmjs.com/signup if you don't have one.

2. **npm login**: Log in to npm from your command line:
   ```bash
   pnpm login
   ```
   You'll be prompted to enter your username, password, and email.

3. **Verify login**:
   ```bash
   pnpm whoami
   ```

## Pre-publishing Checklist

Before publishing, ensure:

- [ ] All changes are committed to git
- [ ] Version number is updated in `package.json`
- [ ] `CHANGELOG.md` is updated with the new version changes
- [ ] All tests pass (if applicable)
- [ ] Build is successful: `pnpm build`
- [ ] Images are included in the dist folder

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **Patch release** (1.0.0 → 1.0.1): Bug fixes, minor changes
  ```bash
  pnpm version patch
  ```

- **Minor release** (1.0.0 → 1.1.0): New features, backward compatible
  ```bash
  pnpm version minor
  ```

- **Major release** (1.0.0 → 2.0.0): Breaking changes
  ```bash
  pnpm version major
  ```

These commands will automatically:
- Update the version in `package.json`
- Create a git commit
- Create a git tag

## Publishing Process

### 1. Update the version

```bash
# For a patch release (bug fixes)
pnpm version patch

# For a minor release (new features)
pnpm version minor

# For a major release (breaking changes)
pnpm version major
```

### 2. Build the package

The `prepublishOnly` script in `package.json` will automatically run `pnpm build` before publishing, but you can run it manually to verify:

```bash
pnpm build
```

### 3. Test the package locally (optional)

Before publishing, you can test the package locally:

```bash
# Create a tarball
pnpm pack

# This creates a file like: affectiveslidervue-1.0.0.tgz
# You can install it in another project to test:
# pnpm add /path/to/affectiveslidervue-1.0.0.tgz
```

### 4. Publish to npm

```bash
# Publish to npm
pnpm publish

# For scoped packages or first-time publishing
pnpm publish --access public
```

### 5. Push to GitHub

Don't forget to push the version tag to GitHub:

```bash
git push origin main --tags
```

## Post-publishing

After publishing:

1. Verify the package on npm: https://www.npmjs.com/package/affectiveslidervue
2. Check that the images are included in the package
3. Update the GitHub release with release notes
4. Announce the new version (if applicable)

## What Gets Published

The following files and directories are included in the npm package (defined in `package.json` "files" field):

- `dist/` - Built JavaScript files and CSS
- `dist/images/` - PNG image files for the sliders
- `src/` - Source code (for debugging and reference)
- `README.md` - Documentation
- `CHANGELOG.md` - Version history
- `package.json` - Package metadata

## Verifying Package Contents

Before publishing, you can check what files will be included:

```bash
pnpm pack --dry-run
```

Or after creating a tarball:

```bash
tar -tzf affectiveslidervue-1.0.0.tgz
```
```

## Unpublishing (Emergency Only)

If you need to unpublish a version (within 72 hours):

```bash
pnpm unpublish affectiveslidervue@1.0.0
```

**Note**: Unpublishing is discouraged. It's better to publish a new patch version with fixes.

## Troubleshooting

### "You do not have permission to publish"

- Make sure you're logged in: `pnpm whoami`
- Check if the package name is available: `pnpm view affectiveslidervue`
- If the package exists and you're not the owner, you need to use a different name or get permission from the owner

### "Package name too similar to existing package"

npm may reject names too similar to existing packages. Choose a unique name or add a scope:

```json
{
  "name": "@yourusername/affectiveslidervue"
}
```

### Build fails before publishing

The `prepublishOnly` script runs `pnpm build` automatically. If it fails:

1. Check the error message
2. Fix any issues in the code or build configuration
3. Test the build manually: `pnpm build`
4. Try publishing again

## Automation (Optional)

For automated publishing with GitHub Actions, create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm publish --access public --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Then add your npm token to GitHub repository secrets as `NPM_TOKEN`.

## Support

For issues with publishing, see:
- npm documentation: https://docs.npmjs.com/
- npm support: https://www.npmjs.com/support
