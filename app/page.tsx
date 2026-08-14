import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/data/site";
import { SpaceCanvas } from "@/components/home/SpaceCanvas";
import { SectorReadout } from "@/components/home/SectorReadout";
import { HeroOrbit } from "@/components/home/HeroOrbit";
import { Origin } from "@/components/home/Origin";
import { MissionControl } from "@/components/home/MissionControl";
import { Stack } from "@/components/home/Stack";
import { DesignLab } from "@/components/home/DesignLab";
import { LabPlayground } from "@/components/home/LabPlayground";
import { MissionLog } from "@/components/home/MissionLog";
import { Transmission } from "@/components/home/Transmission";

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
          <Origin />
          <MissionControl />
          <Stack />
          <DesignLab />
          <LabPlayground />
          <MissionLog />
          <Transmission />
        </div>
      </main>
    </MotionConfig>
  );
}