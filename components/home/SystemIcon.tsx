const common = {
  className: "h-[18px] w-[18px]",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SystemIcon({ id, className }: { id: string; className?: string }) {
  const c = { ...common, className: className ?? common.className };
  switch (id) {
    case "user":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" />
        </svg>
      );
    case "design":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="m14.5 5.5 4 4L7 21H3v-4L14.5 5.5Zm3-3 1.5 1.5a2 2 0 0 1 0 2.8l-1 1-4-4 1-1a2 2 0 0 1 2.5 0Z" />
        </svg>
      );
    case "code":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12" />
        </svg>
      );
    case "container":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
          <path d="M12 11v10M4 7l8 4 8-4" />
        </svg>
      );
    case "kubernetes":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <circle cx="12" cy="12" r="2.2" />
          <circle cx="5" cy="6" r="1.8" />
          <circle cx="19" cy="6" r="1.8" />
          <circle cx="5" cy="18" r="1.8" />
          <circle cx="19" cy="18" r="1.8" />
          <path d="m6.6 7 3.7 3.6M17.4 7l-3.7 3.6m-7.1 6.8 3.7-3.6m10.8 3.6-3.7-3.6" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M7 18a4.5 4.5 0 0 1-.6-8.96 5.5 5.5 0 0 1 10.6 1.36A3.8 3.8 0 0 1 17 18H7Z" />
        </svg>
      );
    case "observability":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M4 20V10m5.3 10V4m5.4 16v-8m5.3 8V8" />
        </svg>
      );
    case "visual-ivr":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path d="M9 7h6M9 10.5h6M9 14h3" />
        </svg>
      );
    case "fintech":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18M7 15h3" />
        </svg>
      );
    case "insurance":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
          <path d="m9 11.5 2 2 4-4" />
        </svg>
      );
    case "enterprise":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 14h16M9 4v10m6-10v10" />
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case "ccaas":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M7 18a4.5 4.5 0 0 1-.6-8.96 5.5 5.5 0 0 1 10.6 1.36A3.8 3.8 0 0 1 17 18H7Z" />
          <path d="M9 21h6" />
        </svg>
      );
    case "linux":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M4 17c0 1.7 3.6 3 8 3s8-1.3 8-3" />
          <path d="M6 17V9a6 6 0 0 1 12 0v8" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M8 10V7m0 3H5m3 0h3m-3 3v-3m0 0h6a3 3 0 0 0 2.4-4.8A3.6 3.6 0 0 1 21 8.4c.6 1.9-1 2.6-3 2.6H8m3 3v-3M5 13h3v3H5z" />
        </svg>
      );
    case "terraform":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M12 3 20 8v8l-8 5-8-5V8l8-5Z" />
          <path d="M12 8v8" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M7 18a4.5 4.5 0 0 1-.6-8.96 5.5 5.5 0 0 1 10.6 1.36A3.8 3.8 0 0 1 17 18H7Z" />
        </svg>
      );
    case "ci-cd":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <circle cx="5" cy="12" r="2.5" />
          <circle cx="19" cy="5" r="2.5" />
          <circle cx="19" cy="19" r="2.5" />
          <path d="M7.5 12h4l2-5h3m0 10h-5l-1-5" />
        </svg>
      );
    case "prometheus":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M4 20V10m5.3 10V4m5.4 16v-8m5.3 8V8" />
        </svg>
      );
    case "grafana":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M4 19a8 8 0 0 1 16 0" />
          <path d="M4 19h16" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M9 18.5c-3 1-3-2-4.5-2.5m13.5 4v-3.2c0-1-.3-1.7-.8-2.3 2.8-.3 5.8-1.4 5.8-6.3a4.9 4.9 0 0 0-1.3-3.4 4.6 4.6 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C7.3 2.6 6.2 2.9 6.2 2.9a4.6 4.6 0 0 0-.1 3.4A4.9 4.9 0 0 0 4.8 9.7c0 4.9 3 6 5.8 6.3-.3.3-.6.8-.7 1.5-.6.3-2.1.7-3-.8" />
        </svg>
      );
    case "monitoring":
      return (
        <svg viewBox="0 0 24 24" {...c} aria-hidden="true">
          <path d="M4 20V10m5.3 10V4m5.4 16v-8m5.3 8V8" />
          <circle cx="4" cy="6" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="9.3" cy="2" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="14.7" cy="8" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="20" cy="4" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}