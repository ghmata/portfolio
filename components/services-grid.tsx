"use client"

import { CheckCircle2 } from "lucide-react"

const capabilities = [
  {
    tag: "01",
    title: "Sistemas Web & Plataformas SaaS",
    description:
      "Arquiteturas modernas com Next.js, React e TypeScript focadas em isolamento de dados, alta conversão e automação de faturamento.",
    bullets: [
      "Isolamento Multi-Tenant com Row Level Security (RLS)",
      "Billing automatizado e conciliação de assinaturas via Stripe",
      "Dashboards gerenciais em tempo real com controle de acesso",
    ],
    stack: ["Next.js 15", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Stripe API"],
  },
  {
    tag: "02",
    title: "Pipelines de IA Aplicada & Visão Computacional",
    description:
      "Modelos de inteligência artificial aplicados a problemas reais de negócios, substituindo horas de triagem manual e análise documental.",
    bullets: [
      "OCR de precisão com LLaMA-4 Vision via Groq em < 2 segundos",
      "Análise e auditoria documental multimodal com Google Gemini",
      "Orquestração multi-agente autônoma com CrewAI alinhada a regras de negócio",
    ],
    stack: ["Google Gemini", "Groq API", "LLaMA-4 Vision", "CrewAI", "LangChain", "pdfplumber"],
  },
  {
    tag: "03",
    title: "Automações de Processos & Mensageria",
    description:
      "Integrações de sistemas que conectam CRMs, WhatsApp, bancos de dados e planilhas em pipelines resilientes e assíncronos.",
    bullets: [
      "Agentes de atendimento e triagem financeira via WhatsApp 24/7",
      "Sincronização bidirecional com Google Sheets e APIs bancárias",
      "Processamento assíncrono com webhooks e filas de mensageria",
    ],
    stack: ["Python", "FastAPI", "Flask", "WhatsApp API", "Webhooks", "Redis Queue"],
  },
  {
    tag: "04",
    title: "Aplicações Desktop & PWA Offline-First",
    description:
      "Softwares empacotados para uso corporativo local ou aplicações web que continuam operando 100% mesmo sem sinal de internet.",
    bullets: [
      "Aplicações Electron com rotação de instâncias e segurança",
      "PWAs com persistência local em IndexedDB e sincronização sob demanda",
      "Executáveis desktop em Python (CustomTkinter) com processamento em lote",
    ],
    stack: ["Electron", "IndexedDB", "SQLite", "CustomTkinter", "Service Workers", "PWA"],
  },
]

export function ServicesGrid() {
  return (
    <section id="capacidades" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/[0.08] relative">
      <div className="container mx-auto max-w-6xl space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#10b981] uppercase tracking-wider">
              Capacidades // Especialidades
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              O que Eu Construo
            </h2>
            <p className="text-sm sm:text-base text-[#9ca3af] max-w-2xl">
              Do código de baixo acoplamento ao deploy seguro em produção. Desenvolvimento focado em resolver gargalos operacionais.
            </p>
          </div>

          <div className="text-xs font-mono text-[#64748b]">
            FULLSTACK & AI DEVELOPMENT
          </div>
        </div>

        {/* 2-Column Editorial Grid with Clean Lines */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-5 sm:p-8 rounded-2xl bg-[#101216] border border-white/[0.06] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#10b981] block">
                  [{cap.tag}]
                </span>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {cap.title}
                </h3>

                <p className="text-sm text-[#9ca3af] leading-relaxed">
                  {cap.description}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {cap.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-[#d1d5db]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div className="pt-6 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {cap.stack.map((tech) => (
                  <span key={tech} className="text-xs font-mono text-[#9ca3af] px-2 py-0.5 rounded bg-[#161920] border border-white/[0.06]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
