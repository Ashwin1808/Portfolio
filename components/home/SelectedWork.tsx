"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProject } from "@/data/projects";
import { PhoneMock, WebMock, FlowNodes, StackFlow } from "@/components/home/Sketches";

function VisualIVRComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-14, 20]);

  return (
    <div ref={ref} className="relative mx-auto flex max-w-[560px] items-center justify-center py-8">
      <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-line sm:block" aria-hidden="true" />
      <motion.div style={{ y: y1 }} className="relative z-10 -rotate-2">
        <PhoneMock t="dark" label="Menu — voice + screen" seed={0} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="relative z-20 -mx-6 sm:-mx-8">
        <PhoneMock t="dark" label="Validating…" seed={1} />
      </motion.div>
      <motion.div style={{ y: y1 }} className="relative z-10 rotate-2">
        <PhoneMock t="dark" label="Done — reference no." seed={2} />
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
            <PhoneMock t="dark" label={s.t} seed={s.seed} className="scale-90" />
            {i < steps.length - 1 && <span className="font-mono text-[10px] text-faint">→</span>}
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
        t="dark"
        nodes={["Policy ending", "Understand coverage", "Renew", "Payment", "Confirmation"]}
      />
      <div className="mt-8 flex justify-center">
        <PhoneMock t="dark" label="Renewal — premium up front" seed={1} />
      </div>
    </div>
  );
}

function DashboardComposition() {
  return (
    <div className="mx-auto max-w-[600px]">
      <WebMock t="dark" label="Omni-channel operations — KPI cards, trends, drill-downs" />
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
        Overview → Performance → Conversation → Action
      </p>
    </div>
  );
}

function AIComposition() {
  return (
    <div className="mx-auto max-w-[600px]">
      <StackFlow
        t="dark"
        items={["Conversation", "Context", "AI suggestion", "Human decision", "Action"]}
      />
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
        Suggest. Never decide.
      </p>
    </div>
  );
}

const compositions: Record<string, () => React.ReactNode> = {
  "visual-ivr": VisualIVRComposition,
  "credit-card-onboarding": CreditCardComposition,
  "insurance-renewal": InsuranceComposition,
  "omni-channel-dashboard": DashboardComposition,
  "agent-assist": AIComposition,
};

function Card({
  project,
  number,
}: {
  project: string;
  number: number;
}) {
  const p = getProject(project) ?? null;
  if (!p) return null;
  const Comp = compositions[p.slug];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col"
      data-cursor="view"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[12px] text-faint transition-colors duration-300 group-hover:text-accent">
          {String(number).padStart(2, "0")}
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-faint transition-colors duration-300 group-hover:text-accent">
          {p.category.replace("-", " / ")}
        </span>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-lg border border-line">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface"
        >
          {Comp ? <Comp /> : null}
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      <Link href={`/work/${p.slug}`} className="group/title mt-6 block">
        <h3 className="h-project whitespace-pre-line text-ink transition-colors duration-300 group-hover/title:text-accent">
          {p.wallTitle ?? p.title}
        </h3>
      </Link>
      <p className="mt-3 max-w-[520px] text-[13.5px] leading-[1.75] text-muted">{p.blurb}</p>

      <div className="mt-auto flex items-center gap-6 pt-6">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint">
          {p.industry}
        </span>
        <Link
          href={`/work/${p.slug}`}
          className="group/arrow inline-flex items-center gap-2 text-[12.5px] font-medium text-ink transition-colors hover:text-accent"
        >
          View project
          <span className="transition-transform duration-300 group-hover/arrow:translate-x-1">→</span>
        </Link>
      </div>
    </motion.article>
  );
}

export function SelectedWork() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="wrap py-20 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">01</p>
            <h2 className="h-giant mt-6 text-ink">
              Selected
              <br />
              work
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-[380px] text-[13.5px] leading-[1.8] text-muted lg:col-span-5"
          >
            A selection of projects where design, product thinking and technology come together
            to solve real user problems.
          </motion.p>
        </div>

        {/* asymmetric wall — 12-col editorial grid */}
        <div className="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card project="visual-ivr" number={1} />
          </div>
          <div className="lg:col-span-5 lg:pt-24">
            <Card project="credit-card-onboarding" number={2} />
          </div>
          <div className="lg:col-span-5">
            <Card project="insurance-renewal" number={3} />
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <Card project="omni-channel-dashboard" number={4} />
          </div>
          <div className="lg:col-span-12">
            <Card project="agent-assist" number={5} />
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-ink transition-colors hover:text-accent"
          >
            All work — filters, categories and the rest
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
