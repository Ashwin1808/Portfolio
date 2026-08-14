import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/data/site";
import { Hero } from "@/components/home/Hero";
import { Experience } from "@/components/home/Experience";
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
      <Hero />
      <Experience />
      <Transition />
      <DevOpsSystem />
      <FinalStatement />
    </MotionConfig>
  );
}