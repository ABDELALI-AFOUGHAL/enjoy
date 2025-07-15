# 🚀 Deployment Guide

## GitHub Pages Deployment

### Automatic Deployment

1. **Build and Deploy**
   ```bash
   npm run deploy
   ```

2. **Configure GitHub Pages** (First time only)
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`
   - Save settings

3. **Access Your Site**
   - Your site will be available at: `https://ABDELALI-AFOUGHAL.github.io/enjoy`
   - Allow 5-10 minutes for initial deployment

### Manual Deployment Steps

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install gh-pages** (if not already installed)
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy to gh-pages branch**
   ```bash
   npx gh-pages -d dist
   ```

### Custom Domain (Optional)

1. **Add CNAME file** to `public/` folder:
   ```
   yourdomain.com
   ```

2. **Configure DNS** with your domain provider:
   - Add CNAME record pointing to `ABDELALI-AFOUGHAL.github.io`

3. **Update Vite config** for custom domain:
   ```javascript
   export default defineConfig({
     base: '/', // Change from '/enjoy/' to '/'
   })
   ```

### Troubleshooting

**404 Error on Game Routes:**
- The `public/404.html` file handles SPA routing
- Ensure it's included in your build

**Assets Not Loading:**
- Check the `base` path in `vite.config.js`
- Should match your repository name

**Build Fails:**
- Run `npm run lint` to check for errors
- Ensure all dependencies are installed with `npm install`

### Environment-Specific Builds

**Development:**
```bash
npm run dev      # Local development server
```

**Production Preview:**
```bash
npm run build    # Build for production
npm run preview  # Preview production build locally
```

**GitHub Pages:**
```bash
npm run deploy   # Build and deploy to GitHub Pages
```
