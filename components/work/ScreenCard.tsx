import Image from "next/image";
import type { CaseScreen } from "@/data/case-studies";
import { cn } from "@/lib/utils";

function SkeletonBar({ className, width = "w-full" }: { className?: string; width?: string }) {
  return <div className={cn("h-2 rounded-full bg-ink/[0.08]", width, className)} />;
}

function PhoneSketch({ title }: { title: string }) {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-[26px] border-[3px] border-ink/15 bg-white p-2.5 shadow-[0_18px_50px_-30px_rgba(23,23,28,0.45)]">
      <div className="overflow-hidden rounded-[19px] border border-ink/[0.06] bg-white">
        <div className="flex items-center justify-between border-b border-ink/[0.06] px-4 py-3">
          <SkeletonBar width="w-16" className="h-2.5 bg-ink/[0.14]" />
          <div className="h-3 w-6 rounded-full bg-ink/[0.06]" />
        </div>
        <div className="space-y-3 px-4 py-5">
          <SkeletonBar className="h-3 bg-ink/[0.16]" width="w-3/4" />
          <div className="rounded-lg border border-ink/[0.08] bg-ink/[0.03] p-3">
            <SkeletonBar className="bg-ink/[0.1]" width="w-1/2" />
            <div className="mt-2.5 space-y-1.5">
              <SkeletonBar className="bg-ink/[0.07]" />
              <SkeletonBar className="bg-ink/[0.07]" width="w-4/5" />
            </div>
          </div>
          <div className="rounded-lg border border-ink/[0.08] bg-ink/[0.03] p-3">
            <SkeletonBar className="bg-ink/[0.1]" width="w-2/3" />
            <div className="mt-2.5 space-y-1.5">
              <SkeletonBar className="bg-ink/[0.07]" />
              <SkeletonBar className="bg-ink/[0.07]" width="w-3/5" />
            </div>
          </div>
          <div className="pt-1">
            <div className="flex h-9 items-center justify-center rounded-lg bg-ink/85 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Primary action
            </div>
          </div>
        </div>
      </div>
      <p className="px-2 pt-2 text-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/40">
        {title}
      </p>
    </div>
  );
}

function WebSketch({ title }: { title: string }) {
  return (
    <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-xl border border-ink/[0.12] bg-white shadow-[0_18px_50px_-30px_rgba(23,23,28,0.45)]">
      <div className="flex items-center justify-between border-b border-ink/[0.08] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink/[0.12]" />
          <span className="h-2 w-2 rounded-full bg-ink/[0.12]" />
          <span className="h-2 w-2 rounded-full bg-ink/[0.12]" />
        </div>
        <SkeletonBar width="w-40" className="h-2 bg-ink/[0.1]" />
        <SkeletonBar width="w-14" className="h-2 bg-ink/[0.14]" />
      </div>
      <div className="grid grid-cols-[110px_1fr]">
        <div className="space-y-2 border-r border-ink/[0.08] p-3">
          <SkeletonBar className="h-2 bg-ink/[0.14]" />
          <SkeletonBar className="bg-ink/[0.07]" />
          <SkeletonBar className="bg-ink/[0.07]" width="w-4/5" />
          <SkeletonBar className="bg-ink/[0.07]" width="w-3/5" />
        </div>
        <div className="space-y-3 p-4">
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-ink/[0.08] bg-ink/[0.03] p-2">
                <SkeletonBar className="h-2 bg-ink/[0.16]" width="w-1/2" />
                <SkeletonBar className="mt-1.5 bg-ink/[0.07]" />
              </div>
            ))}
          </div>
          <div className="flex h-24 items-end gap-1 rounded-lg border border-ink/[0.08] bg-ink/[0.03] p-2">
            {[35, 60, 45, 75, 50, 85, 65].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-ink/[0.14]" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="space-y-1.5">
            <SkeletonBar className="bg-ink/[0.07]" />
            <SkeletonBar className="bg-ink/[0.07]" width="w-2/3" />
          </div>
        </div>
      </div>
      <p className="border-t border-ink/[0.06] px-4 py-1.5 text-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/40">
        {title}
      </p>
    </div>
  );
}

function FlowSketch({ title }: { title: string }) {
  const steps = title.split("—").map((s) => s.trim()).filter(Boolean);
  const nodes = steps.length >= 3 ? steps.slice(0, 5) : ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
  return (
    <div className="mx-auto w-full max-w-[560px] rounded-xl border border-ink/[0.12] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(23,23,28,0.45)]">
      <div className="flex flex-wrap items-center gap-y-3">
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center">
            <div className="flex h-12 min-w-[92px] flex-col items-center justify-center rounded-lg border border-ink/[0.1] bg-ink/[0.03] px-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/35">
                {i + 1}
              </span>
              <span className="mt-1 text-center text-[10px] font-medium leading-tight text-ink/70">
                {n.length > 22 ? `${n.slice(0, 22)}…` : n}
              </span>
            </div>
            {i < nodes.length - 1 && (
              <svg viewBox="0 0 24 24" className="mx-1 h-4 w-4 text-ink/25" fill="none" aria-hidden="true">
                <path d="M4 12h14m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/40">
        {title}
      </p>
    </div>
  );
}

export function ScreenCard({
  screen,
  dark,
  priority,
}: {
  screen: CaseScreen;
  dark?: boolean;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-ink/15 bg-ink/[0.02] p-5">
        {screen.image ? (
          <div className="w-full">
            <Image
              src={screen.image}
              alt={`${screen.title} — ${screen.caption}`}
              width={1200}
              height={800}
              priority={priority}
              className="w-full rounded-lg border border-ink/10"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
        ) : screen.kind === "phone" ? (
          <PhoneSketch title={screen.title} />
        ) : screen.kind === "web" ? (
          <WebSketch title={screen.title} />
        ) : (
          <FlowSketch title={screen.title} />
        )}
      </div>
      <figcaption className="mt-3">
        <p className={dark ? "text-[13.5px] font-medium text-white" : "text-[13.5px] font-medium text-ink"}>
          {screen.title}
        </p>
        <p className={cn("mt-1 text-[12.5px] leading-relaxed", dark ? "text-dark-muted" : "text-muted")}>
          {screen.caption}
        </p>
        {!screen.image && (
          <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
            Schematic placeholder — add an approved screenshot via data/case-studies.ts
          </p>
        )}
      </figcaption>
    </figure>
  );
}
