import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/data/site";
import { HomeHero } from "@/components/home/HomeHero";
import { FrontIndex } from "@/components/home/FrontIndex";
import { SheetFlip } from "@/components/home/SheetFlip";
import { BuildSection } from "@/components/home/BuildSection";
import { EndSection } from "@/components/home/EndSection";

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
};

/**
 * THE TWO-SIDED SHEET.
 * One homepage, one object: the front of the page is the designed
 * surface (cream paper, ink serif, vermilion); scrolling turns the
 * sheet over and the back of the page is the system (ink, chartreuse,
 * ruled grid). The flip is the story.
 */
export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative">
        <HomeHero />
        <FrontIndex />
        <SheetFlip />
        <BuildSection />
        <EndSection />
      </main>
    </MotionConfig>
  );
}