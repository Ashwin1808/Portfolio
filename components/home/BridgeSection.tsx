import { Button, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const chain = [
  { label: "Design", detail: "Journeys, states, systems" },
  { label: "Component", detail: "Reusable primitives with defined states" },
  { label: "Frontend", detail: "React / Next.js implementation" },
  { label: "API", detail: "Data shapes, validation, loading and errors" },
  { label: "Application", detail: "The product end-to-end" },
  { label: "Infrastructure", detail: "Containers, orchestration, cloud, monitoring" },
];

export function BridgeSection() {
  return (
    <section className="dark-band relative overflow-hidden bg-dark" id="engineering">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-cyan/[0.06] blur-3xl"
      />
      <div className="wrap relative py-24 sm:py-32">
        <Reveal>
          <p className="eyebrow flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
            Where Design Meets Engineering
          </p>
        </Reveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Reveal delay={80}>
              <h2 className="h-section text-white">
                From interfaces
                <br />
                to infrastructure.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="prose-sm-copy mt-6 max-w-[520px]">
                My design background taught me to think about the user&apos;s journey. Learning
                development and DevOps has pushed that thinking deeper — into how the systems
                supporting those journeys actually work, get deployed and stay reliable.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-4 font-mono text-[12px] leading-relaxed text-dark-faint">
                Screen → Component → Frontend → API → Application → Infrastructure
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/engineering" variant="cyan" size="lg">
                  Explore my engineering journey
                  <ArrowIcon />
                </Button>
                <Button href="/engineering/ridematch" variant="dark" size="lg">
                  RideMatch case study
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-dark-line bg-dark-surface p-6">
              <p className="mono-label text-dark-muted">Design → Infrastructure</p>
              <ol className="mt-5 space-y-0">
                {chain.map((c, i) => (
                  <li key={c.label}>
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-dark-line bg-dark-elevated font-mono text-[10px] text-cyan">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {i < chain.length - 1 && (
                          <span className="h-4 w-px bg-dark-line" aria-hidden="true" />
                        )}
                      </div>
                      <div className={cn("pb-4", i === chain.length - 1 && "pb-0")}>
                        <p className="text-[14px] font-semibold text-white">{c.label}</p>
                        <p className="mt-0.5 text-[12px] text-dark-muted">{c.detail}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-2 border-t border-dark-line pt-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dark-faint">
                  The same thinking — systems, states, edge cases — applies at every layer
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
