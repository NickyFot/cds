import React, { useState } from "react";
import { FileText, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// TODO: drop these assets into src/assets/ from your paper figures.
//   methodOverview ← Fig. 2 in the paper
//   timestepOrdering ← Fig. 3
//   qualitativeAnime ← Fig. 9
//   qualitativeRealistic ← Fig. 10
//   sdxlPreview ← rebuttal/sdxl preview (for the backbone-generalisation section)
import methodOverview from "@/assets/method-overview.jpg";
import timestepOrdering from "@/assets/timestep-ordering.jpg";
import qualitativeAnime from "@/assets/qualitative-anime.jpg";
import qualitativeRealistic from "@/assets/qualitative-realistic.jpg";
import sdxlPreview from "@/assets/sdxl-preview.jpg";

// --- GPT-4V Reality-subset quality scores (Tab. 8, averaged columns) ---
const qualityData = [
  {
    metric: "Image Quality",
    CDS: 8.81,
    Composite: 8.72,
    Switch: 8.48,
  },
  {
    metric: "Composition Quality",
    CDS: 8.41,
    Composite: 8.25,
    Switch: 7.69,
  },
];

// --- Human evaluation win rate (Tab. 3) ---
const winRateData = [
  { method: "CDS", WinRate: 38 },
  { method: "Composite", WinRate: 31 },
  { method: "Switch", WinRate: 25 },
  { method: "Merge", WinRate: 5 },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      src: qualitativeAnime,
      caption:
        "Multi-concept edits on the anime subset of ComposLoRA. CDS preserves source structure as N grows while baselines drop or entangle concepts.",
    },
    {
      src: qualitativeRealistic,
      caption:
        "Multi-concept edits on the reality subset of ComposLoRA across different numbers of LoRA adapters (N = 2..5).",
    },
    {
      src: sdxlPreview,
      caption:
        "Backbone generalisation: CDS applied on SDXL for an N=2 character + style edit (Source / Merge / CDS).",
    },
  ];

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % carouselSlides.length);
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero */}
      <section className="pt-16 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            CDS: Concept Distillation Sampling for Training-Free Multi-Concept Image Editing
          </h1>
          <div className="text-lg mb-1 space-x-1">
            <AuthorLink name="Niki Foteinopoulou" sup="1" />
            <AuthorLink name="Ignas Budvytis" sup="2" />
            <AuthorLink name="Stephan Liwicki" sup="1" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            <sup>1</sup>Cambridge Research Laboratory, Toshiba Europe &nbsp;
            <sup>2</sup>Independent Researcher
          </p>
          <p className="text-sm text-muted-foreground mb-8">ECCV 2026 (Accepted)</p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {/* TODO: replace with the camera-ready PDF / arXiv URL once available */}
            <LinkButton href="#" icon={<FileText className="w-4 h-4" />} label="Paper" />
            <LinkButton href="#" icon={<ExternalLink className="w-4 h-4" />} label="arXiv" />
            <LinkButton href="#" icon={<Github className="w-4 h-4" />} label="Code (coming soon)" />
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Abstract</h2>
          <div className="text-foreground/85 leading-relaxed text-justify space-y-4">
            <p>
              Training-free image editing with diffusion models is highly desirable, yet remains a
              significant challenge. While recent optimisation-based methods achieve strong zero-shot edits
              from text, they struggle to preserve identity and capture intricate details — facial structure,
              surface texture, or object-specific geometry — that live below the level of linguistic abstraction.
            </p>
            <p>
              We propose <strong>Concept Distillation Sampling (CDS)</strong>, the first unified, training-free
              framework for target-less, multi-concept image editing. CDS overcomes this linguistic bottleneck
              by anchoring the editing process in the certainty of pretrained LoRA adapters, integrating a
              highly stable distillation backbone (ordered timesteps, schedule-independent regularisation, and
              negative-prompt guidance) with a novel <strong>dynamic per-patch weighting</strong> mechanism that
              composes multiple visual concepts without concept clash.
            </p>
            <p>
              CDS preserves instance identity without requiring reference samples of the desired edit, and
              establishes a new state of the art over existing training-free editing and multi-LoRA composition
              methods on the InstructPix2Pix and ComposLoRA benchmarks.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* Contributions */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Contributions</h2>
          <div className="space-y-4">
            <ContributionCard
              number="1"
              description={
                <span>
                  We <strong>formalise a new task</strong> — zero-shot, reference-free, multi-concept image
                  editing — and propose the first unified, training-free framework that addresses it.
                </span>
              }
            />
            <ContributionCard
              number="2"
              description={
                <span>
                  We introduce a <strong>schedule-independent regulariser</strong> with ordered timesteps and
                  negative-prompt guidance, yielding a distillation backbone that is stable under sequential
                  denoising where prior score-distillation regularisers vanish.
                </span>
              }
            />
            <ContributionCard
              number="3"
              description={
                <span>
                  We propose a <strong>divergence-based per-patch weighting</strong> mechanism that composes
                  multiple LoRA adapters spatially at inference time, preventing concept clash and erasure as
                  the number of concepts grows.
                </span>
              }
            />
            <ContributionCard
              number="4"
              description={
                <span>
                  Extensive evaluation on InstructPix2Pix and ComposLoRA (up to <em>N = 5</em> concepts),
                  including human studies and GPT-4V pairwise comparisons, where CDS sets a new state of the
                  art.
                </span>
              }
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* Method Overview */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Method Overview</h2>

          <div className="mb-10">
            <img src={methodOverview} alt="CDS method overview" className="w-full rounded-lg" />
            <p className="text-sm text-muted-foreground text-center mt-3 max-w-3xl mx-auto">
              Overview of the CDS framework. A regularised distillation objective with ordered timesteps drives
              the edit, while a per-patch divergence between each LoRA and the base model produces a SoftMin
              weighting that composes concepts spatially — without clashing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10 text-foreground/85 leading-relaxed">
            {/* Point 1: Schedule-independent regulariser */}
            <div className="pl-4 border-l-2 border-primary/40">
              <h3 className="text-lg font-semibold mb-2">1. Schedule-Independent Regulariser</h3>
              <p className="mb-4">
                Score-distillation regularisers used by DDS- and PDS-style methods inherit the base model's
                variance schedule, and their gradient term collapses to zero under descending-timestep
                schedules. CDS instead applies an <em>L₁</em> regulariser on the latent residual{" "}
                <strong>|x₀ᵗᵍᵗ − x₀ˢʳᶜ|</strong> with a constant coefficient <em>η</em>.
              </p>
              <p>
                The gradient magnitude is driven purely by the source–target difference, so optimisation
                pressure is maintained until convergence; the <em>L₁</em> form also encourages sparse, localised
                edits.
              </p>
            </div>

            {/* Point 2: Ordered timesteps (with image next to it) */}
            <div className="pl-4 border-l-2 border-primary/40">
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3">
                  <h3 className="text-lg font-semibold mb-2">2. Ordered Timesteps</h3>
                  <p className="mb-4">
                    Standard distillation samples timesteps uniformly at random, which scrambles the
                    coarse-to-fine structure of the denoising trajectory. CDS instead traverses timesteps in
                    descending order, yielding a stable coarse-to-fine editing trajectory.
                  </p>
                  <p>
                    Combined with the schedule-independent regulariser above, this prevents the destabilising
                    gradients that ordered timesteps would otherwise introduce.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <img
                    src={timestepOrdering}
                    alt="Timestep-ordered denoising visualisation"
                    className="w-full max-w-xs mx-auto rounded-lg shadow-sm bg-white"
                  />
                  <p className="text-xs text-muted-foreground text-center mt-2 leading-tight">
                    Visualisation of the timestep-ordered denoising trajectory.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 3: Divergence-based per-patch weighting */}
            <div className="pl-4 border-l-2 border-primary/40">
              <h3 className="text-lg font-semibold mb-2">3. Divergence-Based Per-Patch Weighting</h3>
              <p className="mb-4">
                At each denoising step we partition every LoRA's predicted noise into <em>P</em> spatial
                patches and compute cosine similarity with the corresponding patch from the frozen base model.
                A SoftMin over these similarities yields a spatial weight matrix <strong>Ωᵢ</strong> that
                up-weights patches where each LoRA diverges most from the base — i.e., where it is actively
                injecting its concept.
              </p>
              <p>
                The intrinsic-divergence proxy is adapted from our earlier work,{" "}
                <a
                  href="https://nickyfot.github.io/loratorio/"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LoRAtorio
                </a>
                , which used it to <em>compose</em> LoRAs at generation time. CDS extends it to the
                substantially harder editing setting, where source preservation and ordered timesteps create
                new failure modes that weight-merging and timestep-switching cannot handle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Results */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Results</h2>

          {/* GPT-4V + Human Eval Charts */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-4 text-center">
              GPT-4V & Human Evaluation
            </h3>
            <p className="text-foreground/85 mb-8 text-center max-w-3xl mx-auto">
              CDS leads on every compositional quality metric, with a 38% win rate and the lowest average rank
              in a 3-rater human study (Kendall's <em>W</em> = 0.68) on the ComposLoRA testbed.
            </p>
            <div className="grid md:grid-cols-2 gap-12">
              {/* GPT-4V quality scores */}
              <div className="flex flex-col items-center w-full">
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={qualityData}
                      margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis
                        dataKey="metric"
                        tick={{ fill: "currentColor" }}
                        tickLine={false}
                        axisLine={{ stroke: "#e5e7eb" }}
                      />
                      <YAxis
                        domain={[6, 10]}
                        tick={{ fill: "currentColor" }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: "20px" }} />
                      <Bar dataKey="CDS" fill="#b5e48c" radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="CDS" position="top" fill="currentColor" fontSize={12} />
                      </Bar>
                      <Bar dataKey="Composite" fill="#a2d2ff" radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="Composite" position="top" fill="currentColor" fontSize={12} />
                      </Bar>
                      <Bar dataKey="Switch" fill="#ffc8dd" radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="Switch" position="top" fill="currentColor" fontSize={12} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  GPT-4V image and composition quality scores (Reality subset, averaged over N = 2..5).
                </p>
              </div>

              {/* Human evaluation win rate */}
              <div className="flex flex-col items-center w-full">
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={winRateData}
                      margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis
                        dataKey="method"
                        tick={{ fill: "currentColor" }}
                        tickLine={false}
                        axisLine={{ stroke: "#e5e7eb" }}
                      />
                      <YAxis
                        domain={[0, 50]}
                        tick={{ fill: "currentColor" }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(t) => `${t}%`}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                        formatter={(v) => `${v}%`}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar dataKey="WinRate" fill="#b5e48c" radius={[4, 4, 0, 0]}>
                        <LabelList
                          dataKey="WinRate"
                          position="top"
                          fill="currentColor"
                          fontSize={12}
                          formatter={(v: number) => `${v}%`}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Human-rater win rate from a 3-rater study on the ComposLoRA testbed (Tab. 3).
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* CLIPScore Tables */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 mt-16">
            {/* InstructPix2Pix */}
            <div>
              <h3 className="text-lg font-semibold mb-3">CLIPScore (InstructPix2Pix)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left py-2 px-3 font-semibold">Method</th>
                      <th className="text-center py-2 px-3 font-semibold">CLIP ↑</th>
                      <th className="text-center py-2 px-3 font-semibold">LPIPS ↓</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ResultRow method="InstructPix2Pix" values={["0.219", "0.322"]} />
                    <ResultRow method="DiffusionCLIP" values={["0.251", "0.572"]} />
                    <ResultRow method="DDS" values={["0.225", "0.104"]} />
                    <ResultRow method="PDS" values={["0.298", "0.096"]} />
                    <ResultRow method="CDS" values={["0.308", "0.100"]} bold best={[true, false]} />
                  </tbody>
                </table>
              </div>
            </div>

            {/* ComposLoRA */}
            <div>
              <h3 className="text-lg font-semibold mb-3">CLIPScore (ComposLoRA total)</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left py-2 px-3 font-semibold">Reality</th>
                      <th className="text-center py-2 px-3 font-semibold">CLIP ↑</th>
                      <th className="text-center py-2 px-3 font-semibold">LPIPS ↓</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ResultRow method="Merge" values={["0.349", "0.610"]} />
                    <ResultRow method="Composite" values={["0.365", "0.615"]} />
                    <ResultRow method="Switch" values={["0.360", "0.473"]} />
                    <ResultRow method="CDS" values={["0.359", "0.474"]} bold best={[false, false]} />
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left py-2 px-3 font-semibold">Anime</th>
                      <th className="text-center py-2 px-3 font-semibold">CLIP ↑</th>
                      <th className="text-center py-2 px-3 font-semibold">LPIPS ↓</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ResultRow method="Merge" values={["0.338", "0.447"]} />
                    <ResultRow method="Composite" values={["0.320", "0.665"]} />
                    <ResultRow method="Switch" values={["0.334", "0.345"]} />
                    <ResultRow method="CDS" values={["0.325", "0.314"]} bold best={[false, true]} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Divider />

          {/* Qualitative Comparisons Carousel */}
          <div className="mb-12 mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Qualitative Comparisons</h3>

            <div className="relative max-w-4xl mx-auto group">
              <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm flex items-center justify-center min-h-[400px]">
                <img
                  src={carouselSlides[currentSlide].src}
                  alt={`Qualitative comparison slide ${currentSlide + 1}`}
                  className="w-full object-contain max-h-[800px] transition-opacity duration-300"
                />
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-md text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-md text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="mt-4 text-center px-8">
                <p className="text-sm text-foreground/90">{carouselSlides[currentSlide].caption}</p>

                <div className="flex justify-center gap-2 mt-4">
                  {carouselSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        idx === currentSlide ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Related Work */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Related Work</h2>
          <a
            href="https://nickyfot.github.io/loratorio/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                arXiv<br />2025
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  LoRAtorio: An Intrinsic Approach to LoRA Skill Composition
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Our earlier work introducing the intrinsic-divergence proxy used by CDS, applied to
                  multi-LoRA composition in image <em>generation</em>. CDS extends this idea to the
                  multi-concept image <em>editing</em> setting.
                </p>
              </div>
            </div>
          </a>
        </div>
      </section>

      <Divider />

      {/* Citation */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">BibTeX</h2>
          <pre className="bg-secondary/50 rounded-lg p-5 text-sm overflow-x-auto font-mono text-foreground/80 border border-border">
            {`@inproceedings{foteinopoulou2026cds,
  title     = {Concept Distillation Sampling for Training-Free Multi-Concept Image Editing},
  author    = {Foteinopoulou, Niki and Budvytis, Ignas and Liwicki, Stephan},
  booktitle = {European Conference on Computer Vision (ECCV)},
  year      = {2026},
}`}
          </pre>
        </div>
      </section>

      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>
          This website template is borrowed from{" "}
          <a
            href="https://nerfies.github.io"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nerfies
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

/* --- Helper components (same as the LoRAtorio page) --- */

const AuthorLink = ({ name, sup }: { name: string; sup: string }) => (
  <span className="text-primary font-medium">
    {name}
    <sup>{sup}</sup>
  </span>
);

const ContributionCard = ({
  number,
  description,
}: {
  number: string;
  description: React.ReactNode;
}) => (
  <div className="p-4 rounded-lg border border-border bg-secondary/30 flex items-start gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mt-0.5">
      {number}
    </div>
    <div className="text-foreground/90 leading-relaxed pt-1">{description}</div>
  </div>
);

const LinkButton = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity shadow-sm"
  >
    {icon}
    {label}
  </a>
);

const Divider = () => (
  <div className="max-w-4xl mx-auto px-4">
    <hr className="border-border/60" />
  </div>
);

const ResultRow = ({
  method,
  values,
  bold,
  best,
  underline,
}: {
  method: string;
  values: string[];
  bold?: boolean;
  best?: boolean[];
  underline?: boolean;
}) => (
  <tr className={`border-t border-border ${bold ? "bg-primary/5" : ""}`}>
    <td
      className={`py-2 px-3 font-medium ${
        bold
          ? "font-bold text-primary"
          : underline
            ? "text-foreground underline"
            : "text-foreground"
      }`}
    >
      {method}
    </td>
    {values.map((v, i) => (
      <td
        key={i}
        className={`py-2 px-3 text-center ${
          bold && best?.[i]
            ? "font-bold text-primary"
            : bold
              ? "text-foreground"
              : underline
                ? "text-muted-foreground underline decoration-muted-foreground/40"
                : "text-muted-foreground"
        }`}
      >
        {v}
      </td>
    ))}
  </tr>
);

export default Index;
