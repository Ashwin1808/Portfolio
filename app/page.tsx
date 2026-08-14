import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/data/site";
import { SpaceCanvas } from "@/components/home/SpaceCanvas";
import { SectorReadout } from "@/components/home/SectorReadout";
import { HeroOrbit } from "@/components/home/HeroOrbit";
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
        <SpaceCanvas />
        <SectorReadout />
        <div className="relative z-10">
          <HeroOrbit />
          <UXTimeline />
          <Transition />
          <DevOpsSystem />
          <FinalStatement />
        </div>
      </main>
    </MotionConfig>
  );
}
