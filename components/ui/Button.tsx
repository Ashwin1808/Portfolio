"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "dark" | "cyan";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-[-0.01em] transition-all duration-150 select-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-deep shadow-[0_1px_2px_rgba(0,0,0,0.12)]",
  outline:
    "border border-line-strong bg-surface text-ink hover:border-ink/40 hover:bg-paper",
  ghost: "text-ink-soft hover:text-ink hover:bg-ink/5",
  dark: "bg-ink text-paper hover:bg-ink-soft",
  cyan: "bg-cyan text-[#04161c] hover:bg-[#5ad3ef]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  children: React.ReactNode;
}

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  external,
  ariaLabel,
  children,
}: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={cls}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn("h-3.5 w-3.5", className)}
      fill="none"
    >
      <path
        d="M3 8h10m0 0L9 4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn("h-3.5 w-3.5", className)}
      fill="none"
    >
      <path
        d="M6 3H3v10h10v-3M8 8l5-5m0 0h-3m3 0v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
