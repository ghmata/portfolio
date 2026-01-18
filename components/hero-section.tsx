"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-[#0a0e1a]">
      {/* Background minimalista - grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      {/* Gradient accent sutil no canto */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Layout assimétrico 60/40 */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          
          {/* Coluna Esquerda - Texto */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Tag pequena e discreta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-sm text-[#00ff88] font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
              Disponível para novos projetos
            </motion.div>

            {/* Headline BOLD - tipografia diferenciada */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Automações que{" "}
              <span className="text-[#00ff88]">eliminam 15h</span>{" "}
              de trabalho manual toda semana
            </motion.h1>

            {/* Subheadline limpo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#94a3b8] max-w-xl leading-relaxed mx-auto lg:mx-0"
            >
              Python + IA para transformar processos caóticos em sistemas que rodam sozinhos.
            </motion.p>

            {/* CTAs + Prova social inline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6"
            >
              {/* Prova social inline minimalista */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">95%</span>
                  <span className="text-[#64748b]">precisão IA</span>
                </div>
                <div className="w-px h-10 bg-[#64748b]/20" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">R$50k+</span>
                  <span className="text-[#64748b]">economizados</span>
                </div>
              </div>
            </motion.div>

            {/* Mini stack badges - discretos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 pt-4 justify-center lg:justify-start flex-wrap"
            >
              <span className="text-xs text-[#64748b] uppercase tracking-wide">Stack</span>
              {["Python", "React", "PostgreSQL", "AI/ML"].map((tech) => (
                <span key={tech} className="text-xs text-[#94a3b8] px-2 py-1 rounded bg-white/5">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Coluna Direita - Visual (Screenshot) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative lg:block hidden"
          >
            {/* Container com perspective para efeito 3D sutil */}
            <div className="relative rounded-2xl overflow-hidden border border-[#00ff88]/20 shadow-2xl shadow-[#00ff88]/10 transform hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/images/Vaulti_1.png"
                alt="Dashboard Vaultis - Sistema de Gestão Financeira"
                width={700}
                height={500}
                className="w-full"
                priority
              />
              
              {/* Badge flutuante com métrica */}
              <div className="absolute bottom-6 left-6 bg-[#0a0e1a]/90 backdrop-blur-sm border border-[#00ff88]/30 rounded-lg px-4 py-3 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#00ff88] animate-pulse" />
                <div>
                  <div className="text-white font-semibold text-sm">Em produção</div>
                  <div className="text-[#64748b] text-xs">Processando dados reais</div>
                </div>
              </div>
            </div>

            {/* Glow decorativo */}
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#00ff88]/10 rounded-full blur-3xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
