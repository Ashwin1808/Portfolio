"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProject } from "@/data/projects";
import { cn } from "@/lib/utils";
import { PhoneMock, WebMock, FlowNodes, StackFlow } from "@/components/home2/Sketches";

const entrySlugs = [
  "visual-ivr",
  "credit-card-onboarding",
  "insurance-renewal",
  "omni-channel-dashboard",
  "agent-assist",
  "halo-cloud",
];

function Meta({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-3 gap-4 border-t border-ink/10 pt-4">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">{k}</dt>
          <dd className="mt-1.5 text-[11.5px] font-medium leading-snug text-ink-soft">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function VisualIVRComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-16, 22]);

  return (
    <div ref={ref} className="relative mx-auto flex max-w-[560px] items-center justify-center py-8">
      <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-ink/10 sm:block" aria-hidden="true" />
      <motion.div style={{ y: y1 }} className="relative z-10 -rotate-3">
        <PhoneMock label="Menu — voice + screen" seed={0} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="relative z-20 -mx-6 sm:-mx-8">
        <PhoneMock label="Validating…" seed={1} />
      </motion.div>
      <motion.div style={{ y: y1 }} className="relative z-10 rotate-3">
        <PhoneMock label="Done — reference no." seed={2} />
      </motion.div>
    </div>
  );
}

function CreditCardComposition() {
  const steps = [
    { t: "Offer", seed: 3 },
    { t: "Consent", seed: 4 },
    { t: "PIN", seed: 1 },
    { t: "Reward", seed: 2 },
  ];
  return (
    <div className="mx-auto max-w-[600px]">
      <div className="flex justify-center gap-3 overflow-x-auto pb-3 no-scrollbar">
        {steps.map((s, i) => (
          <div key={s.t} className="flex shrink-0 items-center gap-3">
            <PhoneMock label={s.t} seed={s.seed} className="scale-90" />
            {i < steps.length - 1 && (
              <span className="font-mono text-[10px] text-faint">→</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
        One continuous story — offer to activation
      </p>
    </div>
  );
}

function InsuranceComposition() {
  return (
    <div className="mx-auto max-w-[600px] py-4">
      <FlowNodes
        nodes={["Policy ending", "Understand coverage", "Renew", "Payment", "Confirmation"]}
      />
      <div className="mt-8 flex justify-center">
        <PhoneMock label="Renewal — premium up front" seed={1} />
      </div>
    </div>
  );
}

function DashboardComposition() {
  return (
    <div className="mx-auto max-w-[600px]">
      <WebMock label="Omni-channel operations — KPI cards, trends, drill-downs" />
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
        Overview → Performance → Conversation → Action
      </p>
    </div>
  );
}

function AIComposition() {
  return (
    <div className="mx-auto max-w-[600px]">
      <StackFlow items={["Conversation", "Context", "AI suggestion", "Human decision", "Action"]} />
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
        Suggest. Never decide.
      </p>
    </div>
  );
}

function HALOComposition() {
  return (
    <div className="mx-auto flex max-w-[600px] items-center justify-center gap-4 py-4">
      <WebMock label="HALO Cloud — platform surface" className="w-[68%]" />
      <div className="hidden sm:block">
        <PhoneMock label="Agent workspace" seed={4} className="scale-90" />
      </div>
    </div>
  );
}

const compositions: Record<string, () => React.ReactNode> = {
  "visual-ivr": VisualIVRComposition,
  "credit-card-onboarding": CreditCardComposition,
  "insurance-renewal": InsuranceComposition,
  "omni-channel-dashboard": DashboardComposition,
  "agent-assist": AIComposition,
  "halo-cloud": HALOComposition,
};

function ProjectEntry({
  project,
  number,
  flip,
}: {
  project: string;
  number: number;
  flip: boolean;
}) {
  const p = getProject(project) ?? null;
  if (!p) return null;
  const Comp = compositions[p.slug];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t border-ink/10 py-14 sm:py-20"
    >
      <div className={cn("grid gap-10 lg:grid-cols-12 lg:items-center")}>
        <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[13px] text-faint">
              {String(number).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              {p.category.replace("-", " / ")}
            </span>
          </div>
          <Link href={`/work/${p.slug}`} className="group/title block">
            <h3 className="h-project mt-5 text-ink transition-colors duration-300 group-hover/title:text-accent">
              {p.title}
            </h3>
          </Link>
          <p className="mt-5 max-w-[440px] text-[14px] leading-[1.75] text-muted">{p.blurb}</p>
          <div className="mt-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
            <Meta
              rows={[
                ["Role", p.role.split("—")[0] ?? "UX/UI Design"],
                ["Focus", p.focus.join(" · ")],
                ["Industry", p.industry],
              ]}
            />
          </div>
          <Link
            href={`/work/${p.slug}`}
            className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-ink transition-colors hover:text-accent"
          >
            View case study
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
          <Link
            href={`/work/${p.slug}`}
            className="block transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            aria-label={`Open case study: ${p.title}`}
          >
            {Comp ? <Comp /> : null}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectWall() {
  return (
    <section className="bg-paper">
      <div className="wrap py-20 sm:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">
              Selected work
            </p>
            <h2 className="h-giant mt-6 text-ink">
              Worked on systems
              <br />
              most people never see.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-[340px] text-[13.5px] leading-[1.75] text-muted"
          >
            A few things I&apos;ve designed across banking, insurance, fintech, conversational UX
            and enterprise products.
          </motion.p>
        </div>

        <div className="mt-16">
          {entrySlugs.map((slug, i) => (
            <ProjectEntry key={slug} project={slug} number={i + 1} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="border-t border-ink/10 pt-10">
          <Link href="/work" className="group inline-flex items-center gap-2 text-[14px] font-medium text-ink hover:text-accent">
            All work — filters, categories and the rest
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
