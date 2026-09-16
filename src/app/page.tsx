import { Hero } from "@/components/hero/Hero";
import { IdentitySection } from "@/components/sections/IdentitySection";
import { NetworkSection } from "@/components/sections/NetworkSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { BuildsSection } from "@/components/sections/BuildsSection";
import { BountySection } from "@/components/sections/BountySection";
import { CurrentBuildsSection } from "@/components/sections/CurrentBuildsSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { IrlSection } from "@/components/sections/IrlSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <IdentitySection />
      <NetworkSection />
      <ProofSection />
      <BuildsSection />
      <BountySection />
      <CurrentBuildsSection />
      <CapabilitiesSection />
      <IrlSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
