"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function FinalStatement() {
  return (
    <section className="dark-band border-b border-line bg-dark">
      <div className="wrap flex flex-col items-center py-28 text-center sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="h-giant text-white">
            Still designing.
            <span className="mt-2 block text-white/35">Still building.</span>
          </h2>
          <p className="mx-auto mt-10 max-w-[420px] text-[13.5px] leading-[1.9] text-white/55">
            My background started with interfaces.
            <br />
            My curiosity took me into systems.
          </p>
          <p className="mt-12 flex items-center justify-center gap-5 font-mono text-[10.5px] uppercase tracking-[0.22em]">
            <span className="text-white/75">UX / Product Design</span>
            <span className="text-accent" aria-hidden="true">✦</span>
            <span className="text-white/40">Engineering / DevOps</span>
          </p>
          <Link
            href="/engineering"
            className="group mt-14 inline-flex items-center gap-2 rounded-md border border-line-strong px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-accent hover:text-accent"
          >
            See the engineering side
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
