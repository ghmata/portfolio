import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { VaultisShowcase } from "@/components/vaultis-showcase"
import { ProjectsCarousel } from "@/components/projects-carousel"
import { SocialProof } from "@/components/social-proof"
import { ServicesGrid } from "@/components/services-grid"
import { OtherProjects } from "@/components/other-projects"
import { AboutSection } from "@/components/about-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { FloatingWhatsAppButton } from "@/components/floating-whatsapp-button"


export default function Home() {
  return (
    <main className="min-h-screen grid-pattern">
      <Header />
      <HeroSection />
      <VaultisShowcase />
      <ProjectsCarousel />
      <SocialProof />
      <ServicesGrid />
      <OtherProjects />
      <AboutSection />
      <CTASection />
      <Footer />
      <FloatingWhatsAppButton />
    </main>
  )
}

