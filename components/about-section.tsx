"use client"

import Image from "next/image"

const principles = [
  {
    num: "01",
    title: "Entender o Gargalo Antes do Código",
    desc: "Não construo software por vaidade técnica; cada função e automação é projetada para eliminar horas manuais ou aumentar a receita do cliente.",
  },
  {
    num: "02",
    title: "Disciplina Militar & Missão Crítica",
    desc: "A experiência na Força Aérea Brasileira (FAB) molda minha abordagem de desenvolvimento: rigor em segurança, tolerância a falhas e prazos inegociáveis.",
  },
  {
    num: "03",
    title: "Arquitetura Pragmática & Sem Bloat",
    desc: "Prefiro código direto, tipado e com boa cobertura de testes a arquiteturas complexas desnecessárias que aumentam o custo de manutenção.",
  },
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/[0.08] relative bg-[#090a0d]/60">
      <div className="container mx-auto max-w-6xl space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#10b981] uppercase tracking-wider">
              Background // Filosofia
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Sobre Mim
            </h2>
            <p className="text-sm sm:text-base text-[#9ca3af] max-w-2xl">
              Desenvolvimento pragmático, rigor militar e foco obsessivo em resolver dores operacionais reais.
            </p>
          </div>

          <div className="text-xs font-mono text-[#64748b]">
            FAB (ATIVA) · DESENVOLVEDOR FULLSTACK
          </div>
        </div>

        {/* 2-Column Editorial Profile */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Authentic Portrait (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#101216] relative aspect-[4/5]">
              <Image
                src="/profile-photo.webp"
                alt="Gabriel Hipólito - Desenvolvedor Fullstack"
                width={500}
                height={625}
                className="w-full h-full object-cover object-top filter-none lg:filter lg:grayscale lg:contrast-125 lg:hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="text-xs font-mono text-[#64748b] flex justify-between">
              <span>Gabriel Hipólito</span>
              <span>Brasília, Brasil</span>
            </div>
          </div>

          {/* Right Column: Bio & Core Principles (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-[#d1d5db] leading-relaxed">
              <p>
                Sou desenvolvedor de software focado em <strong className="text-white font-semibold">sistemas web de alto desempenho</strong>, <strong className="text-white font-semibold">automações com IA</strong> e <strong className="text-white font-semibold">plataformas SaaS</strong>. Minha missão é transformar processos manuais lentos e propensos a falhas em pipelines autônomos e confiáveis.
              </p>
              <p className="text-sm sm:text-base text-[#9ca3af]">
                Militar da ativa na Força Aérea Brasileira (FAB) e atuando no desenvolvimento de sistemas para empresas do setor de energia solar, logística e tecnologia, trago a disciplina de operações críticas para cada linha de código entregue em produção.
              </p>
            </div>

            {/* Principles */}
            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              {principles.map((item) => (
                <div
                  key={item.num}
                  className="p-4 sm:p-5 rounded-xl bg-[#101216] border border-white/[0.06] flex items-start gap-4"
                >
                  <span className="text-xs font-mono text-[#10b981] mt-0.5 shrink-0">
                    [{item.num}]
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
