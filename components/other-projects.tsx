"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { ProjectModal } from "@/components/project-modal"
import { otherProjects } from "@/data/projects"
import type { Project } from "@/types/project"

export function OtherProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <>
      <section id="outros-projetos" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Outros Projetos</h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto">
              Mais soluções desenvolvidas para diversos segmentos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => openModal(project)}
                className="glass rounded-xl overflow-hidden cursor-pointer group card-hover"
              >
                <div className="relative h-48 overflow-hidden bg-[#0a0e27] flex items-center justify-center">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
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
                          aria-label={`GitHub ${project.name}`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      <ExternalLink className="h-4 w-4 text-[#667eea] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <p className="text-[#60a5fa] text-xs font-medium mt-1">{project.subtitle}</p>
                  <p className="text-[#94a3b8] text-sm mt-2 line-clamp-2">{project.description}</p>
                  {/* Mini tech badges */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] text-[#667eea] px-1.5 py-0.5 rounded bg-[#667eea]/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal compartilhado */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
