# CI/CD: GitHub source → auto-deploy to Bitbucket Pages

Yes, this works. The source lives on **GitHub**; a **GitHub Actions** workflow
builds the app and pushes the static output to a **Bitbucket** repo named
`<username>.bitbucket.io`, which Bitbucket Pages serves at
`https://<username>.bitbucket.io`.

> Why not GitHub Pages? The assignment requires the live URL to end in
> `.bitbucket.io`. GitHub Pages would be `*.github.io`, which is not compliant —
> so we host the source on GitHub but publish to Bitbucket Pages.

```
 GitHub (source) ──push──> GitHub Actions ──build──> dist/ ──force push──> Bitbucket <user>.bitbucket.io repo ──> Pages
```

The workflow is already in `.github/workflows/deploy.yml`. You only need to do
the one-time setup below.

## One-time setup (you must do these — they need your accounts)

### 1. Put the source on GitHub
Make the **`gymgenie/` folder the repository root** (so `package.json` is at the
top), then push it to a GitHub repo with a `main` branch.

```bash
cd gymgenie
git init -b main
git add -A
git commit -m "GymGenie"
git remote add origin git@github.com:<your-gh-user>/gymgenie.git
git push -u origin main
```

### 2. Create the Bitbucket Pages repo
On Bitbucket, create an **empty** repository named **exactly**
`<your-bb-username>.bitbucket.io`. (The workflow force-pushes the built site
into it; Pages serves it.)

### 3. Create a Bitbucket App Password
Bitbucket → Personal settings → **App passwords** → Create. Grant
**Repositories: Write**. Copy the generated password.

### 4. Add GitHub repository secrets
GitHub repo → Settings → Secrets and variables → **Actions** → New repository
secret, add three:

| Secret name | Value |
|---|---|
| `BITBUCKET_USER` | your Bitbucket username |
| `BITBUCKET_APP_PASSWORD` | the app password from step 3 |
| `BITBUCKET_PAGES_REPO` | `<your-bb-username>/<your-bb-username>.bitbucket.io` |

### 5. Trigger it
Push any commit to `main` (or run the workflow manually from the GitHub
**Actions** tab via "Run workflow"). The build runs, the site is pushed to
Bitbucket, and Bitbucket Pages publishes it within a few minutes at
`https://<your-bb-username>.bitbucket.io`.

## Notes

- **Branch name**: the workflow pushes to the Bitbucket repo's `main` branch. If
  your Bitbucket Pages repo serves from `master`, change the two `main`
  references in `deploy.yml` to `master`.
- `--force` is intentional: the Bitbucket repo only holds the generated site, so
  each deploy replaces it cleanly.
- No app config needed for routing: `vite.config.js` uses `base: './'` and the
  app uses HashRouter, so assets load and refreshes never 404 at the site root.
- After the first successful deploy, update the two links at the top of
  `README.md` with your real GitHub repo URL and live `*.bitbucket.io` URL.

## Alternative (no GitHub): Bitbucket Pipelines

If you ever want to keep everything on Bitbucket instead, you can host the source
on Bitbucket and use Bitbucket Pipelines to build and deploy in the same way.
That removes the cross-host app-password step but isn't needed for the
GitHub-based flow above.
