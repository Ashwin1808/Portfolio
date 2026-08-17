import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/data/site";
import { Atmosphere } from "@/components/home/Atmosphere";
import { HomeHero } from "@/components/home/HomeHero";
import { WorkScroller } from "@/components/home/WorkScroller";
import { TransitionSection } from "@/components/home/TransitionSection";
import { BuildSection } from "@/components/home/BuildSection";
import { EndSection } from "@/components/home/EndSection";

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
};

/**
 * ASHWIN K — UX/UI Designer → DevOps / Cloud Engineering.
 * One quiet page: the work, the transition, the build, the close.
 */
export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative">
        <Atmosphere />
        <div className="relative z-10">
          <HomeHero />
          <WorkScroller />
          <TransitionSection />
          <BuildSection />
          <EndSection />
        </div>
      </main>
    </MotionConfig>
  );
}