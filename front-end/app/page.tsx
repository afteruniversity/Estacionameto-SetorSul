import { Footer } from "@/components/landing/footer";
import {
  AboutSection,
  DevelopersSection,
  HeroSection,
  PricingSection,
} from "@/components/landing/sections";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <PricingSection />
        <DevelopersSection />
      </main>
      <Footer />
    </div>
  );
}
