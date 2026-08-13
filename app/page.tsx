import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/data/site";
import { Hero } from "@/components/home2/Hero";
import { ProjectWall } from "@/components/home2/ProjectWall";
import { CompanyWall } from "@/components/home2/CompanyWall";
import { Transition } from "@/components/home2/Transition";
import { CurrentlyBuilding, StackMarquee, FinalStatement } from "@/components/home2/CurrentlyBuilding";

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
};

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <Hero />
      <ProjectWall />
      <CompanyWall />
      <Transition />
      <CurrentlyBuilding />
      <StackMarquee />
      <FinalStatement />
    </MotionConfig>
  );
}
