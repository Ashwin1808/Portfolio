"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StickyNav({
  items,
  dark,
}: {
  items: { id: string; label: string }[];
  dark?: boolean;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <div
      className={cn(
        "sticky top-16 z-30 border-b no-print",
        dark ? "border-dark-line bg-dark/95 backdrop-blur" : "border-line bg-paper/95 backdrop-blur",
      )}
    >
      <div className="wrap flex gap-1 overflow-x-auto no-scrollbar py-2.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors",
              active === item.id
                ? dark
                  ? "border-cyan bg-cyan text-[#1a1008]"
                  : "border-accent bg-accent/10 text-accent"
                : dark
                  ? "border-dark-line text-dark-muted hover:text-white"
                  : "border-line-strong text-muted hover:text-ink",
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
