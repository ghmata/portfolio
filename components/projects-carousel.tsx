"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, X, Github, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    name: "StockFlow",
    subtitle: "Sistema de Gestão de Materiais",
    client: null,
    description: "Controle total do seu estoque com dashboard visual, chat entre setores e relatórios automáticos. Para saber mais, clique em Detalhes.",
    fullDescription: "Sistema completo de gestão de materiais com dashboard interativo para visualização de estoques, chat interno para comunicação entre setores, e exportação automática de relatórios em PDF e Excel. Interface moderna com gráficos em tempo real.",
    image: "/images/Stockflow_4.png",
    imagePosition: "center 15%",
    imageType: "desktop",
    technologies: ["Python", "Flask", "SQLAlchemy", "Chart.js", "Bootstrap"],
    features: ["Dashboard em tempo real", "Chat interno", "Exportação PDF/Excel", "Controle de estoque", "Relatórios automáticos"],
    status: "Em produção",
  },
  {
    id: 2,
    name: "DocMind AI",
    subtitle: "Análise Documental com IA",
    client: null,
    description: "Faça upload de documentos e receba análises inteligentes instantâneas. Comparação automática e relatórios prontos. Para saber mais, clique em Detalhes.",
    fullDescription: "Plataforma de análise documental powered by Google Gemini. Faça upload de qualquer documento e receba análises detalhadas, comparações entre versões, extração de dados importantes e relatórios profissionais em PDF.",
    image: "/docmind-main.jpg",
    imagePosition: "center top",
    imageType: "desktop",
    technologies: ["Next.js", "FastAPI", "Google Gemini", "TypeScript", "Tailwind"],
    features: ["Análise com IA", "Comparação de documentos", "Extração de dados", "Relatórios PDF", "Interface moderna"],
    status: "Em produção",
  },
  {
    id: 3,
    name: "PLANBEL 2.0",
    subtitle: "Gerador de Planos de Aula",
    client: null,
    description: "Crie planos de aula completos e alinhados à BNCC em minutos. 4 agentes de IA trabalham juntos para você. Para saber mais, clique em Detalhes.",
    fullDescription: "Sistema multi-agente para geração de planos de aula completos e alinhados à BNCC. Utiliza 4 agentes de IA especializados que trabalham em conjunto: Pedagogo (conteúdo), Roteirista (estrutura), Designer (atividades) e Revisor (qualidade).",
    image: "/planbel-main.jpg",
    imagePosition: "center top",
    imageType: "desktop",
    technologies: ["FastAPI", "CrewAI", "Google Gemini", "React", "Streaming"],
    features: ["4 agentes IA", "Alinhado à BNCC", "Streaming em tempo real", "Exportação Word/PDF", "Banco de atividades"],
    status: "Em produção",
  },
  {
    id: 4,
    name: "CargoSync",
    subtitle: "Conferência de Manifestos de Carga",
    client: null,
    description: "Importe PDFs, sincronize com Google Sheets e confira cargas em tempo real com sua equipe. Para saber mais, clique em Detalhes.",
    fullDescription: "Sistema de conferência de manifestos de carga com importação automática de PDFs, sincronização com Google Sheets e controle de acesso por níveis. Permite conferência em tempo real com múltiplos usuários.",
    image: "/cargosync-main.jpg",
    imagePosition: "center 20%",
    imageType: "desktop",
    technologies: ["Flask", "Google Sheets API", "PyPDF2", "SQLAlchemy", "JWT"],
    features: ["Importação de PDFs", "Sync Google Sheets", "Multi-usuário", "Níveis de acesso", "Conferência em tempo real"],
    status: "Em produção",
  },
]

// Modal Component
function ProjectModal({ project, isOpen, onClose }: { project: typeof projects[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-auto"
          >
            <div className="glass rounded-2xl overflow-hidden min-h-full">
              {/* Header with image */}
              <div className="relative h-48 md:h-64 overflow-hidden bg-[#0a0e27]">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: project.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] to-transparent" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 glass rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <Badge className="bg-[#00ff88] text-[#0a0e27] mb-2">{project.status}</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{project.name}</h2>
                  <p className="text-[#60a5fa] font-medium">{project.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {project.client && (
                  <p className="text-[#00ff88] text-sm font-medium mb-4">
                    Cliente: {project.client}
                  </p>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left column */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Sobre o Projeto</h3>
                    <p className="text-[#94a3b8] leading-relaxed mb-6">
                      {project.fullDescription}
                    </p>

                    <h3 className="text-xl font-semibold text-white mb-4">Tecnologias</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-[#667eea]/20 text-[#667eea] border-[#667eea]/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Right column */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Funcionalidades</h3>
                    <ul className="space-y-3">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-[#94a3b8]">
                          <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-[#667eea]/20 flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="bg-[#00ff88] text-[#0a0e27] hover:bg-[#00ff88]/90 font-semibold"
                  >
                    <a href="#contato">
                      Quero algo similar
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#667eea] text-white hover:bg-[#667eea]/10 bg-transparent"
                    onClick={onClose}
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }, [])

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    setIsPaused(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  useEffect(() => {
    if (isPaused || isModalOpen) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isPaused, isModalOpen, nextSlide])

  return (
    <>
      <section id="projetos" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projetos em Destaque</h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto">
              Sistemas reais que estão em produção, gerando valor para empresas todos os dias.
            </p>
          </motion.div>

          <div
            className="relative max-w-5xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => !isModalOpen && setIsPaused(false)}
          >
            {/* Main Carousel */}
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-2xl overflow-hidden card-hover"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className={`relative ${(projects[currentIndex].id === 1 || projects[currentIndex].id === 4) ? 'h-56 md:h-80' : 'h-64 md:h-96'} overflow-hidden bg-[#0a0e27]`}>
                      <img
                        src={projects[currentIndex].image || "/placeholder.svg"}
                        alt={projects[currentIndex].name}
                        className={`w-full h-full ${projects[currentIndex].imageType === 'mobile' ? 'object-contain' : 'object-cover'}`}
                        style={{ objectPosition: projects[currentIndex].imagePosition }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0e27]/80 md:block hidden" />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      {projects[currentIndex].client && (
                        <span className="text-[#00ff88] text-sm font-medium mb-2">
                          Cliente: {projects[currentIndex].client}
                        </span>
                      )}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{projects[currentIndex].name}</h3>
                      <p className="text-[#60a5fa] font-medium mb-4">{projects[currentIndex].subtitle}</p>
                      <p className="text-[#94a3b8] mb-6">{projects[currentIndex].description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {projects[currentIndex].technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-[#667eea]/20 text-[#667eea] border-[#667eea]/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-fit border-[#667eea] text-white hover:bg-[#667eea]/10 group bg-transparent"
                        onClick={() => openModal(projects[currentIndex])}
                      >
                        Ver Detalhes
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 glass rounded-full hover:bg-[#667eea]/20 transition-colors z-10"
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 glass rounded-full hover:bg-[#667eea]/20 transition-colors z-10"
              aria-label="Próximo projeto"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-[#00ff88] w-8" : "bg-[#667eea]/30 hover:bg-[#667eea]/50"
                    }`}
                  aria-label={`Ir para projeto ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}
