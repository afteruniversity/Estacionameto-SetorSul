import { Navbar } from "@/components/landing/navbar";
import {
  AboutSection,
  DevelopersSection,
  HeroSection,
  PricingSection,
} from "@/components/landing/sections";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <PricingSection />
        <DevelopersSection />
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 text-center md:text-left">
          <p className="text-sm leading-loose text-muted-foreground">
            © 2024 Estacionamento Setor Sul. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
