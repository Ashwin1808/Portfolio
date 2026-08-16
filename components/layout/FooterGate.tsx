"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

/** No footer on the homepage — the sheet closes itself. */
export function FooterGate() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Footer />;
}