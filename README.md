# CDS project page

Static React site for the ECCV 2026 paper *Concept Distillation Sampling for
Training-Free Multi-Concept Image Editing*. Deployed to GitHub Pages at
`https://nickyfot.github.io/cds/`.

Same Vite + React + TypeScript + Tailwind + shadcn stack as the
[LoRAtorio page](https://github.com/NickyFot/loratorio-skill-composer).

## Local development

```bash
npm install
npm run dev          # localhost:8080
npm run build        # outputs to dist/
npm run preview      # serve the production build locally
```

## Deployment

Pushes to `main` trigger the workflow in `.github/workflows/deploy.yaml`, which
builds with Vite and publishes `dist/` to GitHub Pages.

One-time setup steps live in `SETUP_GITHUB_PAGES.md`.

## Updating content

- The whole page lives in [`src/pages/Index.tsx`](src/pages/Index.tsx).
- Chart data (GPT-4V quality scores, human win rates) is defined at the top of
  that file — edit `qualityData` and `winRateData`.
- Figures live in [`src/assets/`](src/assets/) — see that folder's README for the
  mapping from paper figures.
- BibTeX entry is hardcoded in the BibTeX section — swap when Springer assigns
  the final proceedings entry.
- Related-work card links to LoRAtorio; see `LORATORIO_PATCH.md` for the
  reverse-link snippet to paste into the LoRAtorio repo.
