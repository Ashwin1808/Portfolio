import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/data/site";
import { LayersEnvironment } from "@/components/home/LayersEnvironment";
import { Hero } from "@/components/home/Hero";
import { DesignRail } from "@/components/home/DesignRail";
import { TransitionSection } from "@/components/home/TransitionSection";
import { BuildingSection } from "@/components/home/BuildingSection";
import { RideMatchSection } from "@/components/home/RideMatchSection";
import { FinalSection } from "@/components/home/FinalSection";

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
};

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative">
        <LayersEnvironment />
        <div className="relative z-10">
          <Hero />
          <DesignRail />
          <TransitionSection />
          <BuildingSection />
          <RideMatchSection />
          <FinalSection />
        </div>
      </main>
    </MotionConfig>
  );
}