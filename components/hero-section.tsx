"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"

const featuredIndex = [
  {
    num: "01",
    name: "Solarys Digital",
    type: "SaaS Multi-Tenant",
    desc: "Energia solar, billing Stripe e cálculo INPE/CRESESB",
    href: "#solarys",
  },
  {
    num: "02",
    name: "Vaultis",
    type: "OCR & Visão Computacional",
    desc: "Auditoria financeira e extração via WhatsApp",
    href: "#vaultis",
  },
  {
    num: "03",
    name: "DocMind AI",
    type: "Inteligência Documental",
    desc: "Análise contratual e sumários com Google Gemini",
    href: "#projetos",
  },
  {
    num: "04",
    name: "CargoSync FAB",
    type: "Logística Militar",
    desc: "Conferência de manifestos para a Força Aérea Brasileira",
    href: "#projetos",
  },
]

export function HeroSection() {
  return (
    <section id="inicio" className="pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-8 sm:space-y-12">
          {/* Micro Locator */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-[#64748b] tracking-wider uppercase">
            <span>Gabriel Hipólito</span>
            <span>—</span>
            <span>Brasília, Brasil</span>
            <span>—</span>
            <span className="text-[#10b981]">Fullstack & IA</span>
          </div>

          {/* Editorial Headline */}
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12] sm:leading-[1.08] text-balance">
              Desenvolvo sistemas web de alta complexidade e automações com inteligência artificial.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#9ca3af] leading-relaxed max-w-2xl text-balance">
              Especialista em construir soluções de ponta a ponta: plataformas SaaS multi-tenant com faturamento automatizado, esteiras de visão computacional (OCR) para triagem de documentos e aplicações de missão crítica.
            </p>
          </div>

          {/* Action Links / Touch-Friendly Mobile CTAs */}
          <div className="flex flex-col w-full sm:flex-row sm:w-auto items-stretch sm:items-center gap-3 sm:gap-6 pt-2 text-sm font-mono">
            <a
              href="#destaques"
              className="w-full sm:w-auto min-h-[48px] justify-center inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#08090b] font-semibold hover:bg-[#10b981] transition-colors"
            >
              <span>Ver Casos de Estudo</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/553182722278?text=Olá%20Gabriel!%20Vim%20pelo%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] justify-center inline-flex items-center gap-1.5 text-[#9ca3af] hover:text-white transition-colors bg-white/[0.04] sm:bg-transparent border border-white/10 sm:border-0 rounded-lg sm:rounded-none px-4 py-3 sm:p-0"
            >
              <span>Falar diretamente no WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 text-[#10b981]" />
            </a>
          </div>

          {/* Fast Index Table of Featured Works (Editorial Blueprint) */}
          <div className="pt-8 sm:pt-12 border-t border-white/[0.08]">
            <div className="text-xs font-mono text-[#64748b] uppercase tracking-wider mb-4 sm:mb-6">
              // Projetos Selecionados
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {featuredIndex.map((item) => (
                <a
                  key={item.num}
                  href={item.href}
                  className="group p-4 rounded-xl bg-[#101216]/60 hover:bg-[#14171d] border border-white/[0.06] hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#64748b] mb-3">
                    <span>[{item.num}]</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#10b981] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-white group-hover:text-[#10b981] transition-colors">
                      {item.name}
                    </h2>
                    <span className="font-mono text-[11px] text-[#10b981] block mt-0.5">
                      {item.type}
                    </span>
                    <p className="text-xs text-[#64748b] mt-2 leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
