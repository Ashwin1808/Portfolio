import { cn } from "@/lib/utils";

export interface FlowStepItem {
  label: string;
  detail?: string;
}

export function FlowSteps({
  steps,
  dark,
  title,
}: {
  steps: FlowStepItem[];
  dark?: boolean;
  title?: string;
}) {
  return (
    <div className={cn("overflow-x-auto pb-2 no-scrollbar", dark ? "dark-band" : "")}>
      <ol className="flex min-w-max items-stretch gap-0">
        {steps.map((s, i) => (
          <li key={i} className="flex items-stretch">
            <div className={cn("w-[190px] rounded-lg border p-4", dark ? "border-dark-line bg-dark-surface" : "border-line bg-surface")}>
              <p className={cn("font-mono text-[10px] uppercase tracking-[0.16em]", dark ? "text-cyan" : "text-accent")}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className={cn("mt-2 text-[13px] font-semibold leading-snug", dark ? "text-white" : "text-ink")}>
                {s.label}
              </p>
              {s.detail && (
                <p className={cn("mt-1.5 text-[11.5px] leading-relaxed", dark ? "text-dark-muted" : "text-muted")}>
                  {s.detail}
                </p>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center px-1.5" aria-hidden="true">
                <svg viewBox="0 0 24 24" className={cn("h-4 w-4 shrink-0", dark ? "text-dark-faint" : "text-faint")} fill="none">
                  <path d="M4 12h14m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ol>
      {title && (
        <p className={cn("mt-3 text-[12px]", dark ? "text-dark-faint" : "text-faint")}>
          {title}
        </p>
      )}
    </div>
  );
}
