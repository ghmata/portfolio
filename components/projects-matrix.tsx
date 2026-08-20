"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronRight, Layers, Brain, Globe, Zap, Layout } from "lucide-react"
import Image from "next/image"
import { allProjects } from "@/data/projects"
import { ProjectModal } from "@/components/project-modal"
import type { Project } from "@/types/project"

const categories = [
  { id: "all", label: "Todos os Projetos", icon: Layers },
  { id: "landing_pages", label: "Landing Pages", icon: Layout },
  { id: "ai_automation", label: "IA & Automações", icon: Brain },
  { id: "web_saas", label: "Sistemas Web & SaaS", icon: Globe },
  { id: "desktop_pwa", label: "Desktop & PWA", icon: Zap },
]

export function ProjectsMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProjects = activeCategory === "all"
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory)

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <>
      <section id="projetos" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/[0.08] relative">
        <div className="container mx-auto max-w-6xl space-y-8 sm:space-y-12">
          {/* Section Header & Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="space-y-2">
              <div className="text-xs font-mono text-[#10b981] uppercase tracking-wider">
                Índice Geral de Projetos // Produção
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Software & Automações
              </h2>
              <p className="text-sm sm:text-base text-[#9ca3af] max-w-2xl">
                Projetos desenvolvidos para clientes reais, auditoria militar e operações de alta disponibilidade.
              </p>
            </div>

            {/* Horizontal Snap Category Filters on Mobile */}
            <div className="flex flex-nowrap overflow-x-auto scrollbar-none gap-2 pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:pb-0 md:flex-wrap snap-x">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id
                const count = cat.id === "all"
                  ? allProjects.length
                  : allProjects.filter((p) => p.category === cat.id).length

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 snap-start px-3.5 py-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-mono transition-all duration-200 min-h-[38px] sm:min-h-0 flex items-center ${
                      isActive
                        ? "bg-white text-[#08090b] font-semibold"
                        : "bg-[#101216] text-[#9ca3af] hover:text-white border border-white/[0.06]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="ml-1.5 opacity-60">({count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Architectural Ledger List (Zero AI-template clichés) */}
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                onClick={() => handleOpenModal(project)}
                className="group cursor-pointer py-5 sm:py-6 hover:bg-[#101216]/80 px-3 sm:px-4 -mx-2 sm:-mx-4 rounded-xl transition-colors duration-200"
              >
                <div className="grid lg:grid-cols-12 gap-4 lg:gap-6 items-center">
                  {/* Col 1: Index + Name + Subtitle (5 cols) */}
                  <div className="lg:col-span-5 flex items-start gap-4">
                    <span className="text-xs font-mono text-[#64748b] mt-1 shrink-0">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#10b981] transition-colors flex items-center gap-2">
                        <span>{project.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#64748b] group-hover:text-[#10b981] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </h3>
                      <p className="text-xs text-[#9ca3af] mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Col 2: Segment / Client (2 cols) */}
                  <div className="lg:col-span-2 hidden lg:block text-xs font-mono text-[#64748b]">
                    {project.client || "SaaS Proprietário"}
                  </div>

                  {/* Col 3: Tech Stack (3 cols) */}
                  <div className="lg:col-span-3 text-xs font-mono text-[#9ca3af] truncate">
                    {project.technologies.slice(0, 3).join(" · ")}
                  </div>

                  {/* Col 4: Status / Impact (2 cols) */}
                  <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-3">
                    <span className="text-xs font-mono text-[#10b981]">
                      {project.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#64748b] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
