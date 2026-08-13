import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  index,
  dark,
  className,
}: {
  children: React.ReactNode;
  index?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-2.5",
        dark && "dark-band eyebrow",
        className,
      )}
    >
      {index && (
        <span className={cn("font-mono text-[11px]", dark ? "text-cyan" : "text-accent")}>
          {index}
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  dark,
  align = "left",
  className,
}: {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Eyebrow index={index} dark={dark}>
        {eyebrow}
      </Eyebrow>
      <h2 className={cn("h-section", dark ? "text-white" : "text-ink")}>{title}</h2>
      {intro && (
        <p className={cn("max-w-[560px]", align === "center" && "mx-auto", dark ? "text-dark-muted" : "text-muted", "text-[0.95rem] leading-[1.75]")}>
          {intro}
        </p>
      )}
    </div>
  );
}
