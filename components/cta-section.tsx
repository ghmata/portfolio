"use client"

import { useState } from "react"
import { ArrowUpRight, CheckCircle2, MessageSquare, Send } from "lucide-react"

export function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatusMessage(null)

    try {
      const response = await fetch("https://formspree.io/f/xgoendao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" })
        setStatusMessage("Mensagem enviada com sucesso! Entrarei em contato em breve.")
      } else {
        setStatusMessage("Erro ao enviar mensagem. Por favor, tente pelo WhatsApp.")
      }
    } catch {
      setStatusMessage("Erro ao enviar mensagem. Por favor, tente pelo WhatsApp.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsappNumber = "553182722278"
  const whatsappMessage = encodeURIComponent(
    "Olá Gabriel! Vim pelo seu portfólio e gostaria de discutir um projeto/automação."
  )

  return (
    <section id="contato" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/[0.08] relative">
      <div className="container mx-auto max-w-6xl space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#10b981] uppercase tracking-wider">
              Contato // Novos Projetos
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Vamos Conversar?
            </h2>
            <p className="text-sm sm:text-base text-[#9ca3af] max-w-2xl">
              Disponível para desenvolvimento de novos sistemas web, esteiras de automação com IA e contratos de arquitetura de software.
            </p>
          </div>

          <div className="text-xs font-mono text-[#64748b]">
            BRASÍLIA · REMOTO · BRASIL
          </div>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Direct WhatsApp Channel (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-8 rounded-2xl bg-[#101216] border border-white/[0.06] flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#10b981] uppercase tracking-wider block">
                // Canal Mais Rápido
              </span>

              <h3 className="text-xl font-bold text-white tracking-tight">
                Conversa Direta no WhatsApp
              </h3>

              <p className="text-sm text-[#9ca3af] leading-relaxed">
                Ideal para alinhamentos rápidos de escopo, estimativas de prazo e validação de viabilidade técnica.
              </p>

              <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-[#64748b] space-y-2">
                <p>• Resposta em até 30 minutos em horário comercial</p>
                <p>• Possibilidade de chamada técnica de alinhamento</p>
                <p>• Acordo de Confidencialidade (NDA) disponível</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-[#08090b] font-semibold text-xs hover:bg-[#10b981] transition-colors min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Abrir Conversa no WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Clean Message Form (7 cols) */}
          <div className="lg:col-span-7 p-5 sm:p-8 rounded-2xl bg-[#101216] border border-white/[0.06] space-y-6">
            <div>
              <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block mb-1">
                // Formulário de Mensagem
              </span>
              <h3 className="text-lg font-bold text-white">
                Envie os Detalhes do Projeto
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-[#9ca3af] block">
                    Nome / Empresa *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full px-4 py-3.5 rounded-lg bg-[#161920] border border-white/10 text-base sm:text-sm text-white placeholder:text-[#64748b] focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-[#9ca3af] block">
                    Email de Contato *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3.5 rounded-lg bg-[#161920] border border-white/10 text-base sm:text-sm text-white placeholder:text-[#64748b] focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono text-[#9ca3af] block">
                  Descrição ou Desafio Técnico *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Conte brevemente sobre o projeto, o gargalo que deseja automatizar ou as tecnologias que pretende usar..."
                  className="w-full px-4 py-3.5 rounded-lg bg-[#161920] border border-white/10 text-base sm:text-sm text-white placeholder:text-[#64748b] focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              {statusMessage && (
                <div className="p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 text-xs font-mono text-[#10b981] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs transition-colors disabled:opacity-50 min-h-[48px]"
              >
                <Send className="w-3.5 h-3.5 text-[#10b981]" />
                <span>{isSubmitting ? "Enviando..." : "Enviar Mensagem"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
