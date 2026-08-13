"use client";

import { useState } from "react";
import { ridematch, type Status } from "@/data/engineering";
import { cn } from "@/lib/utils";

const statusStyles: Record<Status, string> = {
  implemented: "bg-ok/15 text-[#3ecb8a]",
  "in-progress": "bg-warn/15 text-warn",
  planned: "bg-white/10 text-dark-muted",
};

const statusLabel: Record<Status, string> = {
  implemented: "Implemented",
  "in-progress": "In progress",
  planned: "Planned",
};

export function ArchitectureDiagram() {
  const [selected, setSelected] = useState<string>("k8s");

  const groups = ridematch.architecture.groups;
  const selectedItem = groups
    .flatMap((g) => g.items)
    .find((i) => i.id === selected);

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.name} className="rounded-2xl border border-dark-line bg-dark-surface p-5">
            <p className="mono-label text-dark-muted">{group.name}</p>
            <div className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item.id)}
                  aria-pressed={selected === item.id}
                  aria-label={`${item.label} — ${item.detail}`}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors",
                    selected === item.id
                      ? "border-cyan/60 bg-cyan/10"
                      : "border-dark-line bg-dark-elevated hover:border-cyan/30",
                  )}
                >
                  <span
                    className={cn(
                      "text-[13px] font-medium",
                      selected === item.id ? "text-white" : "text-dark-muted",
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em]",
                      statusStyles[item.status],
                    )}
                  >
                    {statusLabel[item.status]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-5 min-h-[92px] rounded-2xl border border-cyan/25 bg-cyan/[0.06] p-5"
        aria-live="polite"
      >
        {selectedItem ? (
          <div>
            <p className="flex flex-wrap items-center gap-2 text-[14.5px] font-semibold text-white">
              {selectedItem.label}
              <span className={cn("rounded-full px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em]", statusStyles[selectedItem.status])}>
                {statusLabel[selectedItem.status]}
              </span>
            </p>
            <p className="mt-1.5 max-w-[720px] text-[13px] leading-[1.7] text-dark-muted">
              {selectedItem.detail}
            </p>
          </div>
        ) : (
          <p className="text-[13px] text-dark-muted">Select a component to see what it does.</p>
        )}
      </div>
    </div>
  );
}
