import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        404 — state not found
      </p>
      <h1 className="h-display mt-5 text-ink">This page does not exist.</h1>
      <p className="mt-4 max-w-[440px] text-[14.5px] leading-[1.75] text-muted">
        Even the best-designed flows have empty states. This one offers recovery.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back home</Button>
        <Button href="/work" variant="outline">
          All work
        </Button>
        <Button href="/engineering" variant="ghost">
          Engineering
        </Button>
      </div>
      <p className="mt-8 font-mono text-[11px] text-faint">
        <Link href="/contact" className="hover:text-ink">
          Report a broken link →
        </Link>
      </p>
    </div>
  );
}
