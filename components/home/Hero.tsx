import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function SignalChip({ label, tone }: { label: string; tone: "voice" | "visual" | "logic" }) {
  const tones = {
    voice: "border-ink/15 bg-surface text-ink",
    visual: "border-accent/30 bg-accent-soft text-accent-deep",
    logic: "border-ink/15 bg-ink/[0.04] text-ink-soft",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em]",
        tones[tone],
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "voice" && "bg-ink/40",
          tone === "visual" && "bg-accent",
          tone === "logic" && "bg-warn",
        )}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

function StatePill({ label, ok }: { label: string; ok?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-between gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em]",
        ok ? "border-ok/30 bg-ok/10 text-ok" : "border-line bg-surface text-muted",
      )}
    >
      {label}
      <span className={cn("h-1.5 w-1.5 rounded-full", ok ? "bg-ok" : "bg-faint")} aria-hidden="true" />
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent-soft blur-3xl"
      />
      <div className="wrap relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {site.uxRole} · {site.company}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display mt-6 text-ink">
              Designing complex systems
              <br />
              to feel <span className="text-accent">simple</span>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-[540px] text-[15.5px] leading-[1.75] text-muted">
              {site.designSupport}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-3 font-mono text-[12px] leading-relaxed text-faint">
              Currently expanding from product design into frontend, cloud and DevOps engineering.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/work" size="lg">
                Explore My Work
              </Button>
              <Button href="/work/visual-ivr" variant="outline" size="lg">
                View Case Studies
              </Button>
              <Button href="/about" variant="ghost" size="lg">
                About Me
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 font-mono text-[12px] text-muted">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                LinkedIn ↗
              </a>
              <a href={`/engineering`} className="transition-colors hover:text-ink">
                Engineering →
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="mx-auto max-w-[400px] rounded-2xl border border-line bg-surface p-6 shadow-[0_30px_80px_-40px_rgba(23,23,28,0.35)]">
            <p className="mono-label flex items-center justify-between text-faint">
              Visual IVR — interaction model
              <span className="text-accent">live</span>
            </p>

            <div className="mt-5 space-y-2.5">
              <div className="flex flex-wrap gap-2">
                <SignalChip label="Voice" tone="voice" />
                <SignalChip label="Visual UI" tone="visual" />
                <SignalChip label="Conversation" tone="voice" />
              </div>
            </div>

            <div className="mt-5 space-y-1.5 rounded-xl border border-line bg-paper p-4">
              {[
                { l: "Audio prompt", n: "01" },
                { l: "Visual screen", n: "02" },
                { l: "User action", n: "03" },
                { l: "System response", n: "04" },
                { l: "Next conversational state", n: "05" },
              ].map((s, i) => (
                <div key={s.n} className="flex items-center gap-3">
                  <span className="w-5 font-mono text-[10px] text-faint">{s.n}</span>
                  <span
                    className={cn(
                      "flex-1 rounded-md border px-2.5 py-1.5 text-[12px] font-medium",
                      i === 2
                        ? "border-accent/40 bg-accent-soft text-accent-deep"
                        : "border-line bg-surface text-ink-soft",
                    )}
                  >
                    {s.l}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <StatePill label="Validating" />
              <StatePill label="Success" ok />
              <StatePill label="Error" />
              <StatePill label="Retry" />
            </div>

            <p className="mt-5 border-t border-line pt-4 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-faint">
              Systems · journeys · states · edge cases
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
