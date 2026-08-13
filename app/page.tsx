import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/data/site";
import { Hero } from "@/components/home/Hero";
import { Transition } from "@/components/home/Transition";
import { UXWorkStrip } from "@/components/home/UXWorkStrip";
import { Pivot } from "@/components/home/Pivot";
import { EngineeringStack } from "@/components/home/EngineeringStack";
import { RideMatch } from "@/components/home/RideMatch";
import { LearningByBuilding } from "@/components/home/LearningByBuilding";
import { FailureAdvantage } from "@/components/home/FailureAdvantage";
import { FinalStatement } from "@/components/home/FinalStatement";

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
};

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <Hero />
      <Transition />
      <UXWorkStrip />
      <Pivot />
      <EngineeringStack />
      <RideMatch />
      <LearningByBuilding />
      <FailureAdvantage />
      <FinalStatement />
    </MotionConfig>
  );
}