"use client";

/**
 * The atmosphere — what sits behind everything. Dark, quiet, and
 * built from the page itself: a fine engineering grid, three faint
 * color glows, soft vignettes. No stars, no orbits, no telemetry.
 */
export function Atmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* fine grid — the page's own structure */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(236,230,218,0.028) 0 1px, transparent 1px 88px)",
        }}
      />

      {/* faint glows — the three accents, drifting slowly */}
      <div
        className="absolute -left-[15%] top-[20%] h-[60vh] w-[60vh] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(194,64,47,0.10) 0%, transparent 65%)",
          animation: "drift-a 52s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -right-[12%] top-[45%] h-[55vh] w-[55vh] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(205,242,73,0.06) 0%, transparent 65%)",
          animation: "drift-b 60s ease-in-out infinite alternate-reverse",
        }}
      />
      <div
        className="absolute left-[30%] top-[70%] h-[50vh] w-[50vh] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(182,171,224,0.07) 0%, transparent 65%)",
          animation: "drift-a 68s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* vignettes — depth at the edges */}
      <div
        className="absolute inset-x-0 top-0 h-[18vh]"
        style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.55) 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[20vh]"
        style={{ background: "linear-gradient(to top, rgba(10,8,6,0.5) 0%, transparent 100%)" }}
      />
    </div>
  );
}