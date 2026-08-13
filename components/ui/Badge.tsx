import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "ok" | "warn" | "danger" | "cyan" | "dark";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-ink/[0.06] text-ink-soft",
    accent: "bg-accent-soft text-accent-deep",
    ok: "bg-ok/10 text-ok",
    warn: "bg-warn/10 text-warn",
    danger: "bg-danger/10 text-danger",
    cyan: "bg-cyan/15 text-cyan",
    dark: "bg-white/[0.08] text-dark-muted",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Tag({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-1 font-mono text-[11px] tracking-[0.06em]",
        dark
          ? "border-dark-line bg-dark-surface text-dark-muted"
          : "border-line bg-paper text-muted",
      )}
    >
      {children}
    </span>
  );
}
