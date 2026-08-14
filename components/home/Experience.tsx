"use client";

import { uxDomains } from "@/data/journey";
import { Orbit } from "@/components/home/Orbit";

/**
 * Part 02 — Experience. "What I've designed."
 * One constellation, ten seconds, no cards.
 */
export function Experience() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-violet">02 — Experience</p>
            <h2 className="h-giant mt-6 text-ink">
              What I&apos;ve
              <br />
              <em className="italic text-violet">designed.</em>
            </h2>
          </div>
          <p className="max-w-[380px] text-[13.5px] leading-[1.8] text-muted lg:col-span-5 lg:justify-self-end">
            Five areas of complex enterprise work, one discipline. Touch a node.
          </p>
        </div>

        <Orbit
          center="UX / Product"
          centerSub="Design"
          nodes={uxDomains}
          accent="text-violet"
          glyphSize="h-[17px] w-[17px]"
          className="mt-16"
        />

        <div className="mt-20 border-t border-line pt-8">
          <p className="mx-auto max-w-[560px] text-center text-[13.5px] leading-[1.85] text-muted">
            I&apos;ve designed complex digital journeys for banking, fintech, insurance and
            enterprise products — often where voice, visual interfaces, business logic and
            human decisions meet.
          </p>
          <p className="mt-5 text-center font-mono text-[9.5px] uppercase tracking-[0.24em] text-faint">
            Experience across banking · fintech · insurance · enterprise · CCaaS · AI
          </p>
        </div>
      </div>
    </section>
  );
}