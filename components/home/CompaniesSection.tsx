"use client";

const CLIENTS = [
  "HDFC ERGO",
  "Tata AIG",
  "HDFC",
  "Axis Bank",
  "Bajaj Finserv",
  "Aditya Birla Capital",
  "Star Health",
  "UnitedHealthcare",
  "Muthoot Finance",
  "IRCTC",
  "Paisabazaar",
  "RuPay",
];

/**
 * 03 — Client experience. One quiet line under the work: real
 * brands, no logos, no games. Typography does the talking.
 */
export function CompaniesSection() {
  return (
    <section
      id="clients"
      className="grain relative overflow-hidden py-14 text-cream sm:py-16"
      style={{ background: "rgba(10,8,6,0.4)" }}
    >
      <div className="wrap relative border-y border-cream/10 py-9">
        <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-cream/45">
            Selected client experience
          </p>
          <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-cream/30">
            UX/UI Designer — Ubona Technologies
          </p>
        </div>

        <p className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2.5">
          {CLIENTS.map((name, i) => (
            <span key={name} className="flex items-baseline gap-5">
              <span className="font-serif text-[clamp(0.95rem,1.8vw,1.15rem)] italic text-cream/40">
                {name}
              </span>
              {i < CLIENTS.length - 1 && (
                <span aria-hidden="true" className="font-mono text-[8px] text-cream/20">
                  ◆
                </span>
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}