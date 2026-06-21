# Setting up GitHub Pages for this repo

Everything in this repo is pre-configured for Pages, so the only steps left are
on GitHub itself.

## 1. Enable Pages with the GitHub Actions source

1. Push this repo to `git@github.com:NickyFot/cds.git` (see top-level `README.md`).
2. Open `https://github.com/NickyFot/cds/settings/pages`.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
   (Do *not* pick "Deploy from a branch" — the workflow handles that itself.)

That's the only manual step. The workflow in `.github/workflows/deploy.yaml`
already:

- Triggers on every push to `main`
- Runs `npm install` + `npm run build` on Node 20
- Uploads `dist/` as the Pages artifact
- Calls `actions/deploy-pages@v4` to publish it

## 2. Watch the first deploy

After your first push to `main`:

- Visit `https://github.com/NickyFot/cds/actions` and confirm the "Deploy to
  GitHub Pages" workflow turns green (~1–2 min).
- The "github-pages" environment URL printed by the workflow will be
  `https://nickyfot.github.io/cds/`.

The first deploy can take a couple of minutes after Pages is enabled — if you
see a 404, give it 60 seconds and refresh.

## 3. Verify the base path is right

This repo is published under the `/cds/` subpath, so:

- `vite.config.ts` has `base: "/cds/"`
- `src/App.tsx` has `BrowserRouter basename="/cds/"`

If you ever rename the repo, update both lines (single source of truth: the
repo name in the URL).

## 4. Optional: custom domain

If you want a custom domain (e.g. `cds.foteinopoulou.com`):

1. Create a `public/CNAME` file containing just your domain.
2. Configure the DNS `CNAME` record at your registrar to point at
   `nickyfot.github.io`.
3. Set `base: "/"` in `vite.config.ts` and `basename="/"` in `App.tsx`.
4. In GitHub → Settings → Pages, add the custom domain and enable
   "Enforce HTTPS" once the cert is issued.

## 5. Common gotchas

- **404 on first visit**: Pages takes ~1 minute to provision after the workflow
  finishes. Retry.
- **Assets 404**: usually means `base:` in `vite.config.ts` doesn't match the
  actual subpath. Both halves of the URL must agree
  (`https://nickyfot.github.io/<repo>/`).
- **Old content**: Cloudflare CDN sometimes serves stale assets for a few
  minutes after deploy. Hard-refresh (⌘+Shift+R) or wait it out.
- **Workflow doesn't run**: in Settings → Actions → General, "Allow all
  actions and reusable workflows" must be enabled.
- **`Resource not accessible by integration`**: Settings → Actions → General →
  "Workflow permissions" must be set to "Read and write permissions"
  (the workflow needs `pages: write` and `id-token: write`, which it declares
  in the YAML, but the repo-level setting can override that).
