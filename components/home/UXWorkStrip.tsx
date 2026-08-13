"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProject } from "@/data/projects";
import { companyGroups } from "@/data/companies";
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
      <FlowNodes t="dark" nodes={["Policy ending", "Understand coverage", "Renew", "Payment", "Confirmation"]} />
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
      <StackFlow t="dark" items={["Conversation", "Context", "AI suggestion", "Human decision", "Action"]} />
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

const strip = [
  { slug: "visual-ivr", number: 1, wide: true },
  { slug: "credit-card-onboarding", number: 2, wide: false },
  { slug: "insurance-renewal", number: 3, wide: false },
  { slug: "omni-channel-dashboard", number: 4, wide: true },
  { slug: "agent-assist", number: 5, wide: false },
];

export function UXWorkStrip() {
  const names = companyGroups.flatMap((g) => g.items.map((i) => i.name)).filter((n) => !n.includes("Enterprise"));
  const industries = "Banking · Fintech · Insurance · CCaaS · Enterprise · AI".split(" · ");

  return (
    <section className="border-b border-line bg-surface">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-violet">03 — UX background</p>
            <h2 className="h-giant mt-6 text-ink">
              Before infrastructure,
              <br />
              I designed the
              <br />
              <em className="italic text-violet">interface.</em>
            </h2>
          </div>
          <p className="max-w-[380px] text-[13.5px] leading-[1.8] text-muted lg:col-span-5 lg:justify-self-end">
            Five years of designing complex enterprise experiences — visual IVR, card journeys,
            insurance renewal, operations dashboards and AI-assisted workflows.
          </p>
        </div>

        {/* art-directed gallery strip — horizontal on small screens, editorial grid after */}
        <div className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 no-scrollbar lg:grid lg:grid-cols-12 lg:gap-8 lg:overflow-visible lg:pb-0">
          {strip.map((item) => {
            const p = getProject(item.slug);
            if (!p) return null;
            const Comp = compositions[p.slug];
            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex w-[78vw] shrink-0 snap-start flex-col sm:w-[420px] lg:w-auto lg:snap-none ${item.wide ? "lg:col-span-7" : "lg:col-span-5"}`}
                data-cursor="view"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-faint transition-colors duration-300 group-hover:text-violet">
                    {String(item.number).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-faint transition-colors duration-300 group-hover:text-violet">
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
                </div>

                <Link href={`/work/${p.slug}`} className="group/title mt-6 block">
                  <h3 className="h-project whitespace-pre-line text-ink transition-colors duration-300 group-hover/title:text-violet">
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
                    className="group/arrow inline-flex items-center gap-2 text-[12.5px] font-medium text-ink transition-colors hover:text-violet"
                  >
                    View project
                    <span className="transition-transform duration-300 group-hover/arrow:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* company line — tiny, one breath */}
        <div className="mt-16 border-t border-line pt-6">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-faint">
            Experience across {industries.join("  ·  ")}
          </p>
          <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.24em] text-faint">
            {names.join("  ·  ")}  ·  Ubona Technologies
          </p>
        </div>
      </div>
    </section>
  );
}