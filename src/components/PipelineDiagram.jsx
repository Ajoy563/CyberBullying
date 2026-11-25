import { ArrowDown, ArrowRight, BrainCircuit, Check, FileImage, GitMerge, Image as ImageIcon, Layers, ScanText, Sparkles, Type } from "lucide-react";
import { cn } from "@/utils/cn";
import LoadingSpinner from "./LoadingSpinner";

const LANES = [
  {
    id: "text",
    from: { icon: Type, label: "Text Input", sub: "Comment or caption" },
    to: { icon: BrainCircuit, label: "DistilBERT Analysis", sub: "distilbert-base-uncased" },
  },
  {
    id: "image",
    from: { icon: ImageIcon, label: "Image Input", sub: "JPG · PNG · WEBP" },
    to: { icon: Sparkles, label: "SigLIP 2 Analysis", sub: "siglip2-base-patch16-224" },
  },
  {
    id: "ocr",
    from: { icon: FileImage, label: "Image", sub: "Same uploaded file" },
    to: { icon: ScanText, label: "OCR Text Extraction", sub: "Tesseract / Google Vision" },
  },
];

const FUSION = [
  { icon: GitMerge, label: "Combined Features", sub: "Text + image + OCR vectors" },
  { icon: Layers, label: "Multimodal Classification", sub: "Risk level & categories" },
];

const STATE_STYLES = {
  idle: "border-line bg-elevated/60 text-muted",
  active: "border-aqua/60 bg-aqua/10 text-fg shadow-[0_0_24px_-6px_var(--c-cyan)]",
  done: "border-ok/40 bg-ok/10 text-fg",
  skipped: "border-dashed border-line bg-transparent text-subtle opacity-60",
};

function Node({ icon: Icon, label, sub, state, planned }) {
  return (
    <div className={cn("relative flex min-w-0 flex-1 items-center gap-3 rounded-xl border p-3 transition-all duration-500", STATE_STYLES[state])}>
      <span
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors",
          state === "active" ? "bg-aqua/20 text-aqua" : state === "done" ? "bg-ok/15 text-ok" : "bg-card text-subtle",
        )}
      >
        {state === "active" ? <LoadingSpinner size={18} /> : state === "done" ? <Check size={18} /> : <Icon size={18} />}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold leading-tight">{label}</p>
        <p className="truncate text-[11px] text-subtle">{state === "skipped" ? "Skipped – no input" : sub}</p>
      </div>
      {planned && (
        <span className="absolute -top-2 right-2 rounded-full border border-iris/30 bg-card px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-iris">
          Planned
        </span>
      )}
    </div>
  );
}

const Arrow = ({ active }) => (
  <>
    <ArrowRight size={18} className={cn("hidden shrink-0 sm:block", active ? "text-aqua" : "text-subtle")} aria-hidden />
    <ArrowDown size={18} className={cn("shrink-0 sm:hidden", active ? "text-aqua" : "text-subtle")} aria-hidden />
  </>
);

/**
 * Visual representation of the PLANNED multimodal architecture.
 * `phase`: idle | lanes | fusion | done.  `skipped`: which input lanes had no data.
 * No real model is executed – this is only an explanatory diagram.
 */
export default function PipelineDiagram({ phase = "idle", skipped = { text: false, image: false } }) {
  const laneSkipped = (id) => (id === "text" ? skipped.text : skipped.image) && phase !== "idle";

  const laneState = (id) => {
    if (laneSkipped(id)) return "skipped";
    if (phase === "idle") return "idle";
    if (phase === "lanes") return "active";
    return "done";
  };
  const fusionState = phase === "fusion" ? "active" : phase === "done" ? "done" : "idle";

  return (
    <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.5fr)_auto_minmax(0,0.9fr)]">
      <div className="space-y-3">
        {LANES.map((lane) => {
          const state = laneState(lane.id);
          return (
            <div key={lane.id} className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              <Node {...lane.from} state={state === "active" ? "done" : state === "done" ? "done" : state} />
              <div className="flex justify-center">
                <Arrow active={state === "active"} />
              </div>
              <Node {...lane.to} state={state} planned />
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <ArrowRight size={22} className={cn("hidden lg:block", phase === "fusion" ? "text-aqua" : "text-subtle")} aria-hidden />
        <ArrowDown size={22} className={cn("lg:hidden", phase === "fusion" ? "text-aqua" : "text-subtle")} aria-hidden />
      </div>

      <div className="space-y-3 rounded-2xl border border-line bg-card/60 p-3">
        {FUSION.map((node, i) => (
          <div key={node.label}>
            <Node {...node} state={fusionState} planned />
            {i === 0 && (
              <div className="flex justify-center py-1.5">
                <ArrowDown size={16} className={fusionState === "active" ? "text-aqua" : "text-subtle"} aria-hidden />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
