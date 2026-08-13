import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/data/site";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { CompanyContext } from "@/components/home/CompanyContext";
import { Approach } from "@/components/home/Approach";
import { CurrentlyBuilding } from "@/components/home/CurrentBuild";
import { FinalStatement } from "@/components/home/FinalStatement";

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
};

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <Hero />
      <SelectedWork />
      <CompanyContext />
      <Approach />
      <CurrentlyBuilding />
      <FinalStatement />
    </MotionConfig>
  );
}
