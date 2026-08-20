"use client"

import { useState } from "react"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"

const vaultisPillars = [
  {
    title: "OCR com IA de Visão (LLaMA-4 Vision)",
    desc: "Pipeline conectado à Groq API que processa fotos de notas e cupons fiscais em menos de 2 segundos, convertendo imagens em JSON tipado com CNPJ, itens e alíquotas.",
  },
  {
    title: "Agente WhatsApp Integrado",
    desc: "Fluxo de mensageria onde gerentes de restaurantes fotografam recibos pelo celular e recebem confirmação imediata de lançamento e conciliação.",
  },
  {
    title: "Relatórios DRE & Conciliação Bancária",
    desc: "Fechamento automático de fluxo de caixa diário com gráficos interativos e exportação de relatórios contábeis em PDF sem necessidade de digitação humana.",
  },
  {
    title: "Arquitetura Multi-Empresa",
    desc: "Suporte completo a redes e franquias com permissões hierárquicas por loja e trilha de auditoria para cada documento processado.",
  },
]

const stackList = [
  "Python",
  "Flask",
  "LLaMA-4 Vision (Groq)",
  "WhatsApp API",
  "PostgreSQL",
  "Chart.js",
]

const vaultisImages = [
  "/images/Vaulti_1.webp",
  "/images/Vaulti_2.webp",
  "/images/Vaulti_3.webp",
  "/images/Vaulti_4.webp",
  "/images/Vaulti_5.webp",
]

export function VaultisShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % vaultisImages.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + vaultisImages.length) % vaultisImages.length)
  }

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      handleNext()
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      handlePrev()
    }
  }

  return (
    <section id="vaultis" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/[0.08] relative bg-[#090a0d]/60">
      <div className="container mx-auto max-w-6xl space-y-12 sm:space-y-16">
        {/* Case Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#10b981] uppercase tracking-wider">
              Caso de Estudo // 02
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Vaultis
            </h2>
            <p className="text-sm sm:text-base text-[#9ca3af] max-w-2xl">
              Sistema de gestão financeira e auditoria de cupons fiscais via visão computacional e mensageria.
            </p>
          </div>

          <div className="text-xs font-mono text-[#64748b]">
            PYTHON · GROQ VISION · WHATSAPP
          </div>
        </div>

        {/* Visual Showcase (Swipeable Carousel) */}
        <div className="max-w-4xl mx-auto relative group">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060709] relative h-[280px] sm:h-[420px] md:h-[500px] flex items-center justify-center select-none">
            {/* Ambient blurred backdrop for seamless visual filling */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl scale-110 pointer-events-none transition-all duration-500"
              style={{ backgroundImage: `url(${vaultisImages[currentIndex]})` }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
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
                  src={vaultisImages[currentIndex]}
                  alt={`Vaultis Interface Screenshot ${currentIndex + 1}`}
                  fill
                  className="object-contain pointer-events-none"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle Navigation Chevrons with Accessible Touch Targets (44px min on mobile) */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-9 sm:h-9 rounded-lg bg-[#08090b]/80 border border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-20"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-9 sm:h-9 rounded-lg bg-[#08090b]/80 border border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-20"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Carousel Dot Indicators with Tactile Touch Target */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20 bg-[#08090b]/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-sm border border-white/10">
              {vaultisImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="p-1.5 sm:p-1 focus:outline-none flex items-center justify-center"
                  aria-label={`Ir para slide ${idx + 1}`}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-200 ${
                      idx === currentIndex
                        ? "bg-[#10b981] w-3.5 sm:w-3"
                        : "bg-[#64748b] w-1.5 hover:bg-white"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-[#64748b] text-center mt-2 uppercase tracking-widest">
            Painel de Telas // Demonstração {currentIndex + 1} de {vaultisImages.length}
          </div>
        </div>

        {/* Engineering Data Sheet Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & The Bottleneck (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block mb-2">
                // O Gargalo Operacional
              </span>
              <p className="text-sm sm:text-base text-[#d1d5db] leading-relaxed">
                Restaurantes recebem centenas de notas fiscais e cupons em papel diariamente. A digitação manual consumia até 15 horas semanais por loja, gerando erros tributários e atrasos nos relatórios de fechamento.
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block mb-2">
                // Métricas Comprovadas
              </span>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#101216] border border-white/[0.06]">
                  <span className="text-[#9ca3af]">Tempo de Lançamento</span>
                  <span className="text-[#10b981] font-bold">Redução de 90%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#101216] border border-white/[0.06]">
                  <span className="text-[#9ca3af]">Precisão de Extração OCR</span>
                  <span className="text-[#10b981] font-bold">95% de Acurácia</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#101216] border border-white/[0.06]">
                  <span className="text-[#9ca3af]">Latência por Documento</span>
                  <span className="text-[#10b981] font-bold">&lt; 2.0 segundos</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block mb-2">
                // Stack Técnica
              </span>
              <div className="flex flex-wrap gap-2">
                {stackList.map((t) => (
                  <span key={t} className="text-xs font-mono text-[#9ca3af] px-2.5 py-1 rounded bg-[#101216] border border-white/[0.08]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block mb-4">
              // Decisões de Arquitetura & Implementação
            </span>

            <div className="space-y-4">
              {vaultisPillars.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#101216] border border-white/[0.06] space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed pl-3.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
