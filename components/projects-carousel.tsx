"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectModal } from "@/components/project-modal"
import { carouselProjects } from "@/data/projects"
import type { Project } from "@/types/project"

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselProjects.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselProjects.length) % carouselProjects.length)
  }, [])

  const openModal = (project: Project) => {
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

  const currentProject = carouselProjects[currentIndex]

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
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  }}
                  className="glass rounded-2xl overflow-hidden card-hover"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-96 overflow-hidden bg-[#0a0e27]">
                      <img
                        src={currentProject.image || "/placeholder.svg"}
                        alt={currentProject.name}
                        className={`w-full h-full ${currentProject.imageType === "mobile" ? "object-contain" : "object-cover"}`}
                        style={{ objectPosition: currentProject.imagePosition ?? "center" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0e27]/80 md:block hidden" />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      {currentProject.client && (
                        <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30 w-fit mb-2">
                          🏢 Cliente Real
                        </Badge>
                      )}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {currentProject.name}
                      </h3>
                      <p className="text-[#60a5fa] font-medium mb-4">{currentProject.subtitle}</p>
                      <p className="text-[#94a3b8] mb-6">{currentProject.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {currentProject.technologies.slice(0, 3).map((tech) => (
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
                        onClick={() => openModal(currentProject)}
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
              {carouselProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#00ff88] w-8"
                      : "bg-[#667eea]/30 hover:bg-[#667eea]/50"
                  }`}
                  aria-label={`Ir para projeto ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal compartilhado */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
