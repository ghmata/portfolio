"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { X, Github, CheckCircle2, MessageSquare, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/types/project"

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [project])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") handlePrevImage()
      if (e.key === "ArrowRight") handleNextImage()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!project) return null

  const imagesList = (project.images && project.images.length > 0)
    ? project.images
    : (project.image ? [project.image] : ["/placeholder.svg"])

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagesList.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length)
  }

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (imagesList.length <= 1) return
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      handleNextImage()
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      handlePrevImage()
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Olá Gabriel! Vi o projeto "${project.name}" no seu portfólio e gostaria de conversar sobre uma solução similar.`
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#08090b]/80 backdrop-blur-sm"
          />

          {/* Modal / Bottom Sheet Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl max-h-[88vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl z-10 bg-[#101216] border border-white/10 shadow-2xl flex flex-col"
          >
            {/* Mobile Drag Handle Indicator */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

            {/* Clean Architectural Top Bar */}
            <div className="sticky top-0 z-30 bg-[#101216]/95 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.08] flex items-center justify-between">
              <div className="text-xs font-mono text-[#64748b] tracking-wider uppercase truncate mr-2">
                Dossiê Técnico // {project.name}
              </div>

              <button
                onClick={onClose}
                className="text-xs font-mono text-[#9ca3af] hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 transition-colors shrink-0"
                aria-label="Fechar modal"
              >
                <span>Fechar</span>
                <span className="text-sm leading-none">×</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1">
              {/* Header Title & Pitch */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-[#10b981]">
                    {project.status} {project.client ? `· ${project.client}` : ""}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {project.name}
                  </h2>
                  <p className="text-sm text-[#9ca3af]">
                    {project.subtitle}
                  </p>
                </div>

                {project.metrics && (
                  <div className="p-3 rounded-lg bg-[#161920] border border-white/[0.08] max-w-xs self-start">
                    <span className="font-mono text-[10px] text-[#64748b] uppercase block">
                      Resultado Mensurado
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#10b981] mt-0.5 block">
                      {project.metrics}
                    </span>
                  </div>
                )}
              </div>

              {/* Real Screenshot Window with Swipeable Carousel */}
              <div className="relative group">
                <div className="relative h-[280px] sm:h-[420px] md:h-[520px] w-full rounded-xl overflow-hidden bg-[#060709] border border-white/10 flex items-center justify-center select-none">
                  {/* Ambient blurred backdrop for seamless visual filling */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl scale-110 pointer-events-none transition-all duration-500"
                    style={{ backgroundImage: `url(${imagesList[currentImageIndex]})` }}
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={handleDragEnd}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full relative flex items-center justify-center p-3 z-10 cursor-grab active:cursor-grabbing touch-pan-y"
                    >
                      <Image
                        src={imagesList[currentImageIndex]}
                        alt={`${project.name} - Imagem ${currentImageIndex + 1}`}
                        fill
                        className="object-contain pointer-events-none"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Chevrons if multiple images with Accessible Touch Targets */}
                  {imagesList.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-9 sm:h-9 rounded-lg bg-[#08090b]/80 border border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-20"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-9 sm:h-9 rounded-lg bg-[#08090b]/80 border border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-20"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Pagination Dots with Tactile Targets */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20 bg-[#08090b]/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                        {imagesList.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className="p-1.5 sm:p-1 focus:outline-none flex items-center justify-center"
                            aria-label={`Ir para imagem ${idx + 1}`}
                          >
                            <span
                              className={`block h-1.5 rounded-full transition-all duration-200 ${
                                idx === currentImageIndex
                                  ? "bg-[#10b981] w-3.5 sm:w-3"
                                  : "bg-[#64748b] w-1.5 hover:bg-white"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {imagesList.length > 1 && (
                  <div className="text-[10px] font-mono text-[#64748b] text-center mt-2 uppercase tracking-widest">
                    Galeria de Telas // Demonstração {currentImageIndex + 1} de {imagesList.length}
                  </div>
                )}
              </div>

              {/* 2-Column Technical Breakdown */}
              <div className="grid md:grid-cols-12 gap-6 sm:gap-8">
                {/* Left Column: The Story & Architecture */}
                <div className="md:col-span-7 space-y-6">
                  {project.problem && (
                    <div className="space-y-1.5">
                      <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block">
                        // O Desafio
                      </span>
                      <p className="text-sm text-[#d1d5db] leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="space-y-1.5 pt-4 border-t border-white/[0.06]">
                      <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block">
                        // A Solução Técnica
                      </span>
                      <p className="text-sm text-[#9ca3af] leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}

                  <div className="space-y-1.5 pt-4 border-t border-white/[0.06]">
                    <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block">
                      // Contexto Geral
                    </span>
                    <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Right Column: Stack & Features */}
                <div className="md:col-span-5 space-y-6">
                  {/* Stack */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#161920] border border-white/[0.06] space-y-3">
                    <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block">
                      Tecnologias
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-xs font-mono text-[#9ca3af] px-2 py-0.5 rounded bg-[#101216] border border-white/[0.08]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#161920] border border-white/[0.06] space-y-3">
                    <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block">
                      Capacidades & Módulos
                    </span>
                    <ul className="space-y-2">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Mobile Action Bar / Desktop Footer */}
            <div className="sticky bottom-0 z-30 bg-[#101216]/95 backdrop-blur-md px-4 py-3 sm:px-8 sm:py-6 border-t border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/553182722278?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-lg bg-white text-[#08090b] font-semibold text-xs hover:bg-[#10b981] transition-colors min-h-[48px] sm:min-h-0 w-full sm:w-auto"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Discutir Projeto no WhatsApp</span>
                  </a>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-white transition-colors min-h-[44px] sm:min-h-0 w-full sm:w-auto"
                    >
                      <Github className="w-4 h-4" />
                      <span>Ver Código</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="text-xs font-mono text-[#9ca3af] hover:text-white transition-colors text-center py-2 sm:py-0"
                >
                  Fechar [Esc]
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

