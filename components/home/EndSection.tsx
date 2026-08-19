"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/** 07 — The close. Still designing, still building, four doors. */
export function EndSection() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [submittedName, setSubmittedName] = useState("");

  const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setStatus("sending");
    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          message: data.message,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmittedName(data.name);
      setStatus("ok");
      window.setTimeout(() => {
        setStatus("idle");
        setOpen(false);
      }, 3200);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden text-cream"
      style={{ background: "rgba(10,8,6,0.45)" }}
    >
      <div className="wrap relative flex min-h-[70svh] flex-col items-center justify-center py-28 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/40">
          07 — The close
        </p>

        <h2 className="mt-6 font-serif text-[clamp(2.8rem,7vw,5.6rem)] leading-[1.0] tracking-[-0.02em]">
          <motion.span
            className="block"
            initial={reduced ? { opacity: 0 } : { x: -220, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
          >
            Still designing,
          </motion.span>
          <motion.span
            className="block"
            initial={reduced ? { opacity: 0 } : { x: 220, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease, delay: 0.18 }}
          >
            <em className="text-shimmer bg-gradient-to-r from-lacquer via-cyan to-accent bg-clip-text italic text-transparent">
              Still building.
            </em>
          </motion.span>
        </h2>

        <motion.p
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.26em]"
        >
          <span className="text-lacquer">UX/UI Designer</span>
          <span aria-hidden="true" className="text-cream/40">→</span>
          <span className="text-cream/70">DevOps / Cloud Engineer</span>
        </motion.p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/resume"
            className="group inline-flex items-center gap-2.5 border border-accent bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-sheet transition-colors duration-300 hover:bg-transparent hover:text-accent"
          >
            Resume
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 border border-cream/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            GitHub
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 border border-cream/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            LinkedIn
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-2.5 border border-cream/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Let&apos;s Connect
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        <p className="mt-16 font-serif text-[13px] italic text-cream/35">
          {site.name} — {site.footer.line}
        </p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Connect"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease }}
              className="relative w-full max-w-[440px] border border-cream/15 bg-[#14100c] p-8 sm:p-10"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-cream"
              >
                Close ×
              </button>

<p className="font-mono text-[9px] uppercase tracking-[0.26em] text-accent">
                Let&apos;s connect
              </p>
              <h3 className="mt-3 font-serif text-[clamp(1.8rem,4vw,2.4rem)] leading-tight tracking-[-0.015em]">
                Let&apos;s talk.
              </h3>
              <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-cream/40">
                Drop your details — Ashwin will reach out to you.
              </p>

              <form onSubmit={handleConnect} className="mt-8 space-y-4 text-left">
                <label className="block">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cream/45">Name</span>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="mt-2 w-full border-b border-cream/20 bg-transparent py-2.5 font-serif text-[15px] text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cream/45">Phone <span className="text-cream/30">(for a call or WhatsApp)</span></span>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full border-b border-cream/20 bg-transparent py-2.5 font-serif text-[14px] text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cream/45">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@site.com"
                    className="mt-2 w-full border-b border-cream/20 bg-transparent py-2.5 font-serif text-[14px] text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cream/45">Message</span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="What's on your mind?"
                    className="mt-2 w-full resize-none border-b border-cream/20 bg-transparent py-2.5 font-serif text-[14px] text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none"
                  />
                </label>

                {status === "ok" && (
                  <p className="border border-accent/30 bg-accent/10 px-4 py-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-accent">
                    Thanks {submittedName} — Ashwin will call or WhatsApp you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="border border-lacquer/40 bg-lacquer/10 px-4 py-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-lacquer">
                    Send failed — please try again in a moment.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 w-full border border-accent bg-accent px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-sheet transition-colors duration-300 hover:bg-transparent hover:text-accent disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Send & connect"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}