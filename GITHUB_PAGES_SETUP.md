# GitHub Pages Setup Instructions

If you're seeing the "Pages site failed" error, follow these steps:

## Manual GitHub Pages Setup

1. Go to your repository on GitHub: https://github.com/Jes-win-hac-ker/blaze-room-sync

2. Click on **Settings** tab

3. Scroll down to **Pages** section in the left sidebar

4. Under **Source**, select **GitHub Actions**

5. Save the settings

6. Go to **Actions** tab and re-run the failed workflow

## Alternative: Simple Deploy Script

If the automated deployment continues to have issues, you can use this simpler approach:

```bash
# Build for GitHub Pages
npm run build:github

# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Deploy manually
npx gh-pages -d dist
```

## Troubleshooting

- Make sure your repository is public (or you have GitHub Pro for private repo Pages)
- Ensure you have proper permissions on the repository
- Check that the repository name matches the expected GitHub Pages URL path