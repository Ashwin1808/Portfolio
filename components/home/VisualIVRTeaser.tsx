import Link from "next/link";
import { visualIvr } from "@/data/case-studies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FlowSteps } from "@/components/shared/FlowSteps";
import { cn } from "@/lib/utils";

export function VisualIVRTeaser() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="wrap py-20 sm:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="01"
            eyebrow="Flagship — Visual IVR"
            title="Voice + screen, one journey"
            intro="Audio guidance combined with a visual interface — so users can read options, provide information and complete tasks without walking a voice menu. One of the strongest differentiators in my work."
          />
          <div className="shrink-0">
            <Button href="/work/visual-ivr" variant="outline">
              Read the flagship case study
              <ArrowIcon />
            </Button>
          </div>
        </div>

        <Reveal className="mt-14">
          <FlowSteps steps={visualIvr.loop} title="Audio prompt → Visual screen → User action → System response → Next conversational state" />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visualIvr.loops.map((loop, i) => (
            <Reveal key={loop.title} delay={Math.min(i * 50, 200)}>
              <div className="flex h-full flex-col rounded-xl border border-line bg-paper p-5 transition-colors hover:border-ink/25">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">
                  Journey {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[14.5px] font-semibold text-ink">{loop.title}</p>
                <div className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
                  {loop.flow.map((step, j) => (
                    <span
                      key={step}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10.5px] text-muted",
                        j < loop.flow.length - 1 ? "border-line bg-surface" : "border-ok/30 bg-ok/10 text-ok",
                      )}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="text-[13px] leading-relaxed text-faint">
            Journey examples from credit card activation and onboarding, insurance renewal, vehicle
            insurance, loans, UPI payments and document upload — the patterns are consistent because
            the state model is consistent.
          </p>
          <p className="mt-4">
            <Link href="/work/visual-ivr" className="text-[13px] font-medium text-accent hover:text-accent-deep">
              How the interaction loop works →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
