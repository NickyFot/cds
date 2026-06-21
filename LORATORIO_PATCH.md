# Reverse reference: LoRAtorio page → CDS

Paste this `Related Work` section into `src/pages/Index.tsx` of the
`loratorio-skill-composer` repo, **just before the existing BibTeX section**
(search for `<h2 className="text-3xl font-bold text-center mb-6">BibTeX</h2>`):

```tsx
<Divider />

{/* Related Work */}
<section className="py-12 px-4">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-6">Related Work</h2>
    <a
      href="https://nickyfot.github.io/cds/"
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
          ECCV<br />2026
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">
            CDS: Concept Distillation Sampling for Training-Free Multi-Concept Image Editing
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Follow-up work that extends LoRAtorio's intrinsic-divergence composition to multi-concept
            image <em>editing</em>, with a schedule-independent regulariser that survives ordered
            denoising timesteps.
          </p>
        </div>
      </div>
    </a>
  </div>
</section>
```

Adjust the `href` once the final CDS page URL is known.
