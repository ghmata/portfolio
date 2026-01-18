"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, MessageSquare, FileText, Users } from "lucide-react"
import Image from "next/image"

const features = [
  { icon: Brain, label: "OCR com IA", desc: "95% precisão" },
  { icon: MessageSquare, label: "WhatsApp Bot", desc: "Envio automático" },
  { icon: FileText, label: "Relatórios PDF", desc: "Geração automática" },
  { icon: Users, label: "Multi-empresa", desc: "Escalável" },
]

export function VaultisShowcase() {
  return (
    <section id="vaultis" className="py-24 px-4 relative overflow-hidden">
      {/* Background diferenciado */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent" />
      
      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Coluna de texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30 mb-4">
              ⭐ Projeto em Destaque
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vaultis
            </h2>
            
            <p className="text-xl text-[#60a5fa] mb-6">
              Sistema Inteligente de Gestão Financeira
            </p>
            
            <p className="text-[#94a3b8] mb-8 text-lg leading-relaxed">
              Plataforma completa que reduziu em <span className="text-white font-semibold">90%</span> o tempo de lançamento de notas fiscais para restaurantes. 
              OCR com IA extrai dados automaticamente, integração via WhatsApp, 
              dashboard em tempo real e relatórios automáticos.
            </p>

            {/* Features Grid - 2x2, não 3 colunas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#667eea]/10 border border-[#667eea]/20"
                >
                  <feat.icon className="h-5 w-5 text-[#00ff88]" />
                  <div>
                    <p className="text-white font-medium text-sm">{feat.label}</p>
                    <p className="text-[#94a3b8] text-xs">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Python", "Flask", "PostgreSQL", "Groq API", "WhatsApp API"].map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-[#667eea]/10 text-[#667eea]">
                  {tech}
                </Badge>
              ))}
            </div>

            <Button
              asChild
              className="bg-[#00ff88] text-[#0a0e27] hover:bg-[#00ff88]/90 font-semibold group"
            >
              <a href="#contato">
                Quero algo similar
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          {/* Coluna de imagem - Screenshot real */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-first lg:order-last"
          >
            {/* Container com borda glow */}
            <div className="relative rounded-2xl overflow-hidden border border-[#667eea]/30 shadow-2xl shadow-[#667eea]/20">
              <Image
                src="/images/Vaulti_1.png"
                alt="Dashboard do Vaultis"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
            
            {/* Badge flutuante com resultado */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-4 -right-4 bg-[#00ff88] text-[#0a0e27] px-4 py-2 rounded-lg font-bold shadow-lg"
            >
              -90% tempo de lançamento
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
