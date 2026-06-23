# Deploying GymGenie to Bitbucket Pages

GymGenie is a static site (Vite build + HashRouter), so deploying is just
publishing the contents of `dist/` to the **root** of a specially-named
Bitbucket repository.

## How Bitbucket Pages works

- The repository **must be named exactly** `<username>.bitbucket.io`
  (e.g. `peterhit226.bitbucket.io`).
- Bitbucket Pages serves the files at the **root** of that repo's main branch,
  at `https://<username>.bitbucket.io`.
- There is no server-side build — the built files themselves must live at the
  repo root.

## Manual deploy (recommended — simplest, most reliable)

```bash
# 1. Build the app
cd gymgenie
npm install
npm run build          # outputs static files to dist/

# 2. Create a Bitbucket repo named exactly:  <username>.bitbucket.io
#    and clone it somewhere, e.g. ~/<username>.bitbucket.io

# 3. Copy the BUILD OUTPUT into the repo ROOT (not the dist folder itself)
cp -R dist/* ~/<username>.bitbucket.io/

# 4. Commit and push
cd ~/<username>.bitbucket.io
git add -A
git commit -m "Deploy GymGenie"
git push origin main   # or master, depending on your repo

# Bitbucket Pages can take a few minutes to publish.
# Then open:  https://<username>.bitbucket.io
```

## Why this works without extra config

- `vite.config.js` sets `base: './'`, so all asset paths are relative and load
  correctly from the site root.
- The app uses **HashRouter**, so deep links and refreshes (e.g.
  `…/#/exercise/plank`) never hit a 404 on static hosting.
- Everything the app needs is inside `dist/` — the JS/CSS bundle and all 40
  exercise demonstration images. The only runtime CDN dependencies are Tailwind
  and Google Fonts (loaded from their CDNs), which is standard and fine for this
  assignment.

## After deploying

Update the two links at the top of `README.md` with your real repository URL and
live `https://<username>.bitbucket.io` URL.
