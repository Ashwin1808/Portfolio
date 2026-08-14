"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { uxTimeline } from "@/data/journey";
import { SystemIcon } from "@/components/home/SystemIcon";

const iconFor: Record<string, string> = {
  "visual-ivr": "mic",
  banking: "banking",
  insurance: "insurance",
  fintech: "currency",
  enterprise: "enterprise",
  ai: "ai",
  ccaas: "headset",
  mobile: "mobile",
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * [04] DESIGN LAB — the space disappears. A bright, editorial
 * laboratory for the product-design background.
 */
export function DesignLab() {
  const reduced = useReducedMotion();

  return (
    <section
      id="designlab"
      className="relative overflow-hidden border-b border-line"
      style={{ background: "#f1ece1" }}
    >
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8a8272]">
              04 — Design lab
            </p>
            <h2 className="h-giant mt-6 text-[#14120f]">
              Designing the
              <br />
              <em className="italic text-[#7a6fd0]">human layer</em> of
              <br />
              technology.
            </h2>
          </div>
          <div className="max-w-[360px] lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <p className="text-[13.5px] leading-[1.85] text-[#4a453c]">
              3+ years designing across banking, fintech, insurance,
              conversational UX, enterprise products and AI-assisted workflows
              — the interface side of this orbit.
            </p>
            <Link
              href="/work"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#14120f] transition-colors hover:text-[#7a6fd0]"
            >
              The design archive
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* the domains — editorial rows */}
        <div className="mt-16">
          {uxTimeline.map((item, i) => (
            <motion.div
              key={item.id}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease, delay: i * 0.05 }}
              className="group grid grid-cols-12 items-baseline gap-3 border-t-2 border-[#14120f]/15 py-5 transition-colors hover:bg-[#14120f]/[0.03] sm:gap-4"
            >
              <span className="col-span-2 font-serif text-[1.4rem] leading-none text-[#14120f]/35 transition-colors group-hover:text-[#7a6fd0] sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-10 font-serif text-[1.6rem] leading-[1.05] tracking-[-0.01em] text-[#14120f] transition-transform duration-300 group-hover:translate-x-1 sm:col-span-5 sm:text-[2.2rem]">
                {item.name}
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[#6b6456] sm:col-span-3 sm:block">
                {item.sub}
              </span>
              <span className="hidden text-[12.5px] text-[#4a453c] sm:col-span-2 sm:block">
                {item.line}
              </span>
              <span className="hidden justify-self-end text-[#7a6fd0] sm:col-span-1 sm:block">
                <SystemIcon id={iconFor[item.id] ?? item.id} className="h-[20px] w-[20px]" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}