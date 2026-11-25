import { BrainCircuit, ScanText, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "./RiskBadge";

function FloatingChip({ icon: Icon, label, className, delay }) {
  return (
    <div
      className={`absolute z-10 hidden animate-float items-center gap-2 rounded-xl border border-line bg-card/95 px-3 py-2 text-xs font-semibold text-fg shadow-xl shadow-black/20 backdrop-blur sm:flex ${className}`}
      style={{ animationDelay: delay }}
    >
      <Icon size={14} className="text-aqua" aria-hidden />
      {label}
      <span className="rounded bg-iris/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-iris">Planned</span>
    </div>
  );
}

/** Illustrative hero graphic: a stylised scan of a comment + meme. Purely decorative. */
export default function ScannerVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]" aria-hidden>
      <div className="absolute -inset-10 rounded-full bg-iris/20 blur-3xl" />
      <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-aqua/20 blur-3xl" />

      {/* concentric rings */}
      <div className="absolute left-1/2 top-1/2 -z-0 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-azure/25" />
        <div className="absolute inset-[9%] animate-spin-slow rounded-full border border-aqua/15 [animation-direction:reverse]" />
      </div>

      <FloatingChip icon={BrainCircuit} label="DistilBERT" className="-top-5 left-10" delay="0s" />
      <FloatingChip icon={Sparkles} label="SigLIP 2" className="-right-3 top-[55%] lg:-right-8" delay="1.5s" />
      <FloatingChip icon={ScanText} label="OCR" className="-bottom-4 left-8" delay="3s" />

      <div className="glass relative rounded-3xl border border-line p-4 shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between px-1.5 pb-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-ok/70" />
          </div>
          <span className="flex items-center gap-2 text-xs text-subtle">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ok" />
            Illustrative scan preview
          </span>
        </div>

        {/* comment card */}
        <div className="rounded-2xl border border-line bg-card/80 p-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-9 w-9 rounded-full bg-gradient-to-br from-iris to-azure" />
            <div className="space-y-1.5">
              <div className="h-2.5 w-24 rounded bg-line" />
              <div className="h-2 w-14 rounded bg-line/70" />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-fg">
            “You're such a{" "}
            <mark className="rounded bg-danger/15 px-1 font-semibold text-danger underline decoration-wavy decoration-danger/60 underline-offset-4">
              loser
            </mark>
            , nobody wants you here.”
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="warn">Insult</Badge>
            <Badge tone="danger">Toxic language</Badge>
          </div>
        </div>

        {/* image card with scan line */}
        <div className="relative mt-3 h-44 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-azure/30 via-iris/25 to-aqua/20">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute inset-x-6 top-5 rounded-lg bg-black/35 px-3 py-1.5 text-center font-display text-sm font-bold uppercase tracking-wide text-white">
            when you think you're funny
          </div>
          <div className="absolute inset-x-6 bottom-10 rounded-lg bg-black/35 px-3 py-1.5 text-center font-display text-sm font-bold uppercase tracking-wide text-white">
            nobody asked
          </div>
          {["left-3 top-3 border-l-2 border-t-2", "right-3 top-3 border-r-2 border-t-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map(
            (c) => (
              <span key={c} className={`absolute h-5 w-5 border-aqua ${c}`} />
            ),
          )}
          <div className="absolute inset-x-0 h-0.5 animate-scan bg-aqua shadow-[0_0_20px_4px_var(--c-cyan)]" />
          <span className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 rounded-md bg-card/90 px-2 py-1 text-[10px] font-semibold text-aqua sm:block">
            OCR · text regions found
          </span>
        </div>

        {/* summary */}
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-line bg-card/80 p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-warn/10 text-warn">
              <ShieldCheck size={20} />
            </span>
            <div>
              <p className="text-xs text-subtle">Combined risk (simulated)</p>
              <p className="font-display text-lg font-semibold text-warn">Medium</p>
            </div>
          </div>
          <div className="w-24 space-y-1.5">
            <div className="flex gap-1">
              <span className="h-1.5 flex-1 rounded-full bg-ok" />
              <span className="h-1.5 flex-1 rounded-full bg-warn" />
              <span className="h-1.5 flex-1 rounded-full bg-line" />
            </div>
            <p className="text-right text-[11px] text-subtle">Review advised</p>
          </div>
        </div>
      </div>
    </div>
  );
}
