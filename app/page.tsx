import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SolarysShowcase } from "@/components/solarys-showcase"
import { VaultisShowcase } from "@/components/vaultis-showcase"
import { ProjectsMatrix } from "@/components/projects-matrix"
import { ServicesGrid } from "@/components/services-grid"
import { AboutSection } from "@/components/about-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { FloatingWhatsAppButton } from "@/components/floating-whatsapp-button"

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-[#08090b] text-[#f4f5f7] selection:bg-[#10b981]/25 selection:text-white">
        <Header />
        <HeroSection />
        <SolarysShowcase />
        <VaultisShowcase />
        <ProjectsMatrix />
        <ServicesGrid />
        <AboutSection />
        <CTASection />
        <Footer />
      </main>
      <FloatingWhatsAppButton />
    </>
  )
}
