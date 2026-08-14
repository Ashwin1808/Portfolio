import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/data/site";
import { EnvironmentCanvas } from "@/components/home/EnvironmentCanvas";
import { SectorReadout } from "@/components/home/SectorReadout";
import { Hero } from "@/components/home/Hero";
import { UXTimeline } from "@/components/home/UXTimeline";
import { Transition } from "@/components/home/Transition";
import { DevOpsSystem } from "@/components/home/DevOpsSystem";
import { FinalStatement } from "@/components/home/FinalStatement";

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
};

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative">
        <EnvironmentCanvas />
        <SectorReadout />
        <div className="relative z-10">
          <Hero />
          <UXTimeline />
          <Transition />
          <DevOpsSystem />
          <FinalStatement />
        </div>
      </main>
    </MotionConfig>
  );
}