"use client"

import { CheckCircle2 } from "lucide-react"

const architecturePoints = [
  {
    title: "Isolamento Multi-Tenant com RLS",
    desc: "Arquitetura com Supabase Row Level Security que garante que cada integradora acesse única e exclusivamente os seus próprios clientes, propostas e métricas.",
  },
  {
    title: "Motor Solar INPE / CRESESB",
    desc: "Simulador geoespacial que calcula irradiância solar média por latitude/longitude no Brasil, estimando payback financeiro e potência necessária em segundos.",
  },
  {
    title: "Billing Automatizado com Stripe",
    desc: "Fluxo de assinaturas recorrentes com webhooks de conciliação automática, upgrade de planos e bloqueio por inadimplência sem intervenção humana.",
  },
  {
    title: "Motor de Propostas em PDF",
    desc: "Geração instantânea de propostas comerciais customizadas com logotipo e dados da integradora (White-label), reduzindo o tempo de fechamento de 45 para 3 minutos.",
  },
]

const stackList = [
  "Next.js 15",
  "TypeScript",
  "Supabase (RLS)",
  "PostgreSQL",
  "Stripe Billing",
  "Tailwind CSS",
]

export function SolarysShowcase() {
  return (
    <section id="destaques" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/[0.08] relative">
      <div id="solarys" className="relative -top-24" />
      <div className="container mx-auto max-w-6xl space-y-12 sm:space-y-16">
        {/* Case Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#10b981] uppercase tracking-wider">
              Caso de Estudo // 01
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Solarys Digital
            </h2>
            <p className="text-sm sm:text-base text-[#9ca3af] max-w-2xl">
              Plataforma SaaS B2B2C para dimensionamento de energia solar e faturamento automatizado.
            </p>
          </div>

          <div className="text-xs font-mono text-[#64748b]">
            NEXT.JS · SUPABASE · STRIPE
          </div>
        </div>

        {/* Visual Showcase (Responsive Height Video Container) */}
        <div className="max-w-4xl mx-auto relative group">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060709] relative h-[280px] sm:h-[420px] md:h-[500px] flex items-center justify-center">
            {/* Ambient blurred backdrop for seamless visual filling */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl scale-110 pointer-events-none"
              style={{ backgroundImage: `url(/videos/solarys-poster.webp)` }}
            />

            <div className="w-full h-full relative flex items-center justify-center p-2 sm:p-3 z-10">
              <video
                src="/videos/solarys.mp4"
                poster="/videos/solarys-poster.webp"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
          <div className="text-[10px] font-mono text-[#64748b] text-center mt-2 uppercase tracking-widest">
            Demonstração em Vídeo // Plataforma Solarys Digital
          </div>
        </div>

        {/* Engineering Data Sheet Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Context & The Bottleneck (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block mb-2">
                // O Desafio de Negócio
              </span>
              <p className="text-sm sm:text-base text-[#d1d5db] leading-relaxed">
                Integradoras de energia solar gerenciavam propostas, contratos e clientes em planilhas dispersas, sem padronização nos cálculos de irradiância solar e com alto índice de erros e inadimplência.
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider block mb-2">
                // Métricas Comprovadas
              </span>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#101216] border border-white/[0.06]">
                  <span className="text-[#9ca3af]">Tempo de Proposta</span>
                  <span className="text-[#10b981] font-bold">45 min → 3 min (-93%)</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#101216] border border-white/[0.06]">
                  <span className="text-[#9ca3af]">Cobrança & Billing</span>
                  <span className="text-[#10b981] font-bold">100% Automatizado</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#101216] border border-white/[0.06]">
                  <span className="text-[#9ca3af]">Segurança de Dados</span>
                  <span className="text-[#10b981] font-bold">RLS Multi-Tenant</span>
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
              {architecturePoints.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#101216] border border-white/[0.06] space-y-1.5"
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
