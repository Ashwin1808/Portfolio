import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

function ink(t: Tone, alpha: number) {
  return t === "dark" ? `rgb(255 255 255 / ${alpha})` : `rgb(23 23 28 / ${alpha})`;
}

export function PhoneMock({
  t = "light",
  label,
  seed = 0,
  className,
}: {
  t?: Tone;
  label?: string;
  seed?: number;
  className?: string;
}) {
  const a = (n: number) => ink(t, n);
  return (
    <div
      className={cn(
        "w-[225px] rounded-[26px] border-2 p-2",
        t === "dark" ? "border-white/15 bg-[#0d1016]" : "border-ink/15 bg-white",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[19px] border" style={{ borderColor: ink(t, 0.12) }}>
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="h-2 w-14 rounded-full" style={{ background: a(0.2) }} />
          <div className="h-3 w-6 rounded-full" style={{ background: a(0.08) }} />
        </div>
        <div className="space-y-3 px-4 pb-5">
          <div className="h-3 w-3/4 rounded-full" style={{ background: a(0.26) }} />
          <div
            className="rounded-lg border p-3.5"
            style={{ borderColor: ink(t, 0.14), background: a(0.04) }}
          >
            <div className="h-2 w-1/2 rounded-full" style={{ background: a(0.16) }} />
            <div className="mt-2.5 space-y-1.5">
              <div className="h-2 rounded-full" style={{ background: a(0.09) }} />
              <div className="h-2 w-4/5 rounded-full" style={{ background: a(0.09) }} />
            </div>
          </div>
          <div className="flex items-end gap-2 px-1 pt-1">
            {[38, 62, 48, 78, 55, 88, 64].slice(seed % 5, seed % 5 + 5).map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 0.9}px`, background: a(0.18) }} />
            ))}
          </div>
          <div className="h-8 rounded-lg" style={{ background: a(0.85) }} />
        </div>
      </div>
      {label && (
        <p className="px-2 pt-2 text-center font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: a(0.45) }}>
          {label}
        </p>
      )}
    </div>
  );
}

export function WebMock({
  t = "light",
  label,
  className,
}: {
  t?: Tone;
  label?: string;
  className?: string;
}) {
  const a = (n: number) => ink(t, n);
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border",
        t === "dark" ? "border-white/12 bg-[#0d1016]" : "border-ink/15 bg-white",
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${ink(t, 0.12)}` }}>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: a(0.18) }} />
          <span className="h-2 w-2 rounded-full" style={{ background: a(0.18) }} />
          <span className="h-2 w-2 rounded-full" style={{ background: a(0.18) }} />
        </div>
        <div className="h-2 w-40 rounded-full" style={{ background: a(0.12) }} />
        <div className="h-2 w-12 rounded-full" style={{ background: a(0.2) }} />
      </div>
      <div className="grid grid-cols-[100px_1fr]">
        <div className="space-y-2 p-3.5" style={{ borderRight: `1px solid ${ink(t, 0.12)}` }}>
          <div className="h-2 w-14 rounded-full" style={{ background: a(0.2) }} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-2 w-12 rounded-full" style={{ background: a(0.09) }} />
          ))}
        </div>
        <div className="space-y-3 p-4">
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border p-2.5" style={{ borderColor: ink(t, 0.14), background: a(0.04) }}>
                <div className="h-2 w-1/2 rounded-full" style={{ background: a(0.22) }} />
                <div className="mt-2 h-2 w-3/4 rounded-full" style={{ background: a(0.09) }} />
              </div>
            ))}
          </div>
          <div className="flex h-24 items-end gap-1 rounded-lg border p-2.5" style={{ borderColor: ink(t, 0.14), background: a(0.04) }}>
            {[35, 55, 42, 70, 48, 85, 62, 50].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: a(0.2) }} />
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="h-2 rounded-full" style={{ background: a(0.12) }} />
            <div className="h-2 w-2/3 rounded-full" style={{ background: a(0.12) }} />
          </div>
        </div>
      </div>
      {label && (
        <p className="px-4 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.16em]" style={{ borderTop: `1px solid ${ink(t, 0.12)}`, color: a(0.45) }}>
          {label}
        </p>
      )}
    </div>
  );
}

export function FlowNodes({
  nodes,
  t = "light",
  className,
}: {
  nodes: string[];
  t?: Tone;
  className?: string;
}) {
  const a = (n: number) => ink(t, n);
  return (
    <div className={cn("flex flex-wrap items-center gap-y-3", className)}>
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center">
          <div className="flex h-16 w-[150px] flex-col items-center justify-center rounded-lg border px-3" style={{ borderColor: ink(t, 0.18), background: a(0.04) }}>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: a(0.4) }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-1 text-center text-[11px] font-semibold" style={{ color: a(0.85) }}>
              {n}
            </span>
          </div>
          {i < nodes.length - 1 && (
            <svg viewBox="0 0 24 24" className="mx-1.5 h-4 w-4" fill="none" aria-hidden="true">
              <path d="M4 12h14m0 0-4-4m4 4-4 4" stroke={a(0.4)} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export function StackFlow({
  items,
  t = "light",
  className,
}: {
  items: string[];
  t?: Tone;
  className?: string;
}) {
  const a = (n: number) => ink(t, n);
  return (
    <div className={cn("space-y-0", className)}>
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-3.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border font-mono text-[10px]"
            style={{ borderColor: ink(t, 0.22), background: a(0.05), color: a(0.6) }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className="flex-1 rounded-md border px-3.5 py-2.5 text-[12px] font-medium"
            style={{
              borderColor: i === items.length - 1 ? "rgb(77 141 255 / 0.45)" : ink(t, 0.16),
              background: i === items.length - 1 ? "rgb(77 141 255 / 0.08)" : a(0.03),
              color: i === items.length - 1 ? (t === "dark" ? "#9db9ff" : "#2563eb") : a(0.75),
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

export { ink };
