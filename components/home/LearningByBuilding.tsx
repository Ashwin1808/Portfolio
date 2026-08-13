"use client";

import { motion } from "framer-motion";
import { learningItems } from "@/data/journey";

/**
 * Scroll 07 — short statements, no cards.
 */
export function LearningByBuilding() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">07 — Learn by building</p>
            <h2 className="h-giant mt-6 text-ink">
              Things I&apos;m learning
              <br />
              <em className="italic text-accent">by building.</em>
            </h2>
          </div>
          <p className="max-w-[380px] text-[13.5px] leading-[1.8] text-muted lg:col-span-5 lg:justify-self-end">
            No certificates in sight — each one of these is exercised in a running system.
          </p>
        </div>

        <div className="mt-16 border-t border-line">
          {learningItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group grid gap-2 border-b border-line py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6"
            >
              <span className="font-mono text-[10px] text-faint transition-colors duration-300 group-hover:text-accent sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent sm:col-span-3">
                {item.term}
              </h3>
              <p className="max-w-[560px] text-[13px] leading-[1.75] text-muted sm:col-span-8">
                {item.line}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}