"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, X, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const otherProjects = [
  {
    id: 1,
    name: "Locamil",
    subtitle: "Gestão de Locadora",
    description: "Sistema completo para locadoras de veículos. Para saber mais, clique em Detalhes.",
    fullDescription: "Sistema de gestão para locadoras de veículos com controle de frota, reservas, contratos, clientes e financeiro. Dashboard com métricas em tempo real.",
    image: "/locamil-main.jpg",
    technologies: ["Python", "Flask", "SQLAlchemy", "Bootstrap"],
    features: ["Controle de frota", "Gestão de reservas", "Contratos automáticos", "Dashboard financeiro"],
    status: "Em produção",
    isMobile: false,
    githubUrl: "https://github.com/ghmata/locamil",
  },
  {
    id: 2,
    name: "PDF Extractor Pro",
    subtitle: "Extração Inteligente",
    description: "Extraia tabelas de PDFs e converta para Excel automaticamente. Para saber mais, clique em Detalhes.",
    fullDescription: "Ferramenta desktop para extração automática de tabelas de arquivos PDF. Processa múltiplos arquivos em lote e gera planilhas Excel organizadas.",
    image: "/pdf-extraction-tool-dark-interface.jpg",
    technologies: ["Python", "CustomTkinter", "pdfplumber", "Pandas"],
    features: ["Processamento em lote", "Extração de tabelas", "Exportação Excel", "Interface moderna"],
    status: "Em produção",
    isMobile: false,
    githubUrl: null,
  },
  {
    id: 3,
    name: "Landing Pages Premium",
    subtitle: "Páginas de Conversão",
    description: "Landing pages modernas e otimizadas para conversão. Para saber mais, clique em Detalhes.",
    fullDescription: "Desenvolvimento de landing pages de alta conversão com design moderno, animações suaves e otimização para SEO e performance.",
    image: "/landingpages-main.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    features: ["Design responsivo", "Animações modernas", "SEO otimizado", "Alta performance"],
    status: "Disponível",
    isMobile: false,
    githubUrl: null,
  },
  {
    id: 4,
    name: "ClinicAI",
    subtitle: "Agendamento Inteligente",
    description: "Sistema de agendamento automatizado para clínicas e consultórios. Para saber mais, clique em Detalhes.",
    fullDescription: "Plataforma de agendamento para clínicas com confirmação automática via WhatsApp, lembretes, gestão de pacientes e relatórios de ocupação.",
    image: "/clinicai-main.jpg",
    technologies: ["Next.js", "FastAPI", "WhatsApp API", "PostgreSQL"],
    features: ["Agendamento online", "Confirmação WhatsApp", "Lembretes automáticos", "Relatórios de ocupação"],
    status: "Disponível",
    isMobile: false,
    githubUrl: null,
  },
]

// iPhone Frame Component
function IPhoneFrame({ imageSrc, alt }: { imageSrc: string; alt: string }) {
  return (
    <div className="relative flex justify-center">
      <div className="w-[140px] h-[280px] bg-gray-900 rounded-[2rem] border-[4px] border-gray-800 shadow-2xl shadow-violet-500/20 overflow-hidden relative">
        <img src={imageSrc} alt={alt} className="w-full h-full object-cover" />
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full z-20" />
      </div>
    </div>
  )
}

// Modal Component
function ProjectModal({ project, isOpen, onClose }: { project: typeof otherProjects[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-auto"
          >
            <div className="glass rounded-2xl overflow-hidden min-h-full">
              <div className="relative h-48 md:h-64 overflow-hidden bg-[#0a0e27]">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover"
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

              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
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
                  {project.githubUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="border-[#667eea] text-white hover:bg-[#667eea]/10 bg-transparent"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
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

export function OtherProjects() {
  const [selectedProject, setSelectedProject] = useState<typeof otherProjects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: typeof otherProjects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Outros Projetos</h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto">Mais soluções desenvolvidas para diversos segmentos.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => openModal(project)}
                className="glass rounded-xl overflow-hidden cursor-pointer group card-hover"
              >
                <div className="relative h-48 overflow-hidden bg-[#0a0e27] flex items-center justify-center">
                  {project.isMobile ? (
                    <IPhoneFrame imageSrc={project.image} alt={project.name} />
                  ) : (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] to-transparent pointer-events-none" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#667eea] hover:text-[#00ff88] transition-colors"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      <ExternalLink className="h-4 w-4 text-[#667eea] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <p className="text-[#94a3b8] text-sm mt-1">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}
