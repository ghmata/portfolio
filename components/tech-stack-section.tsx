"use client"

import { motion } from "framer-motion"
import { Code2, Server, Brain, Database, Cloud, Plug } from "lucide-react"

const stackCategories = [
  {
    icon: Code2,
    name: "Frontend & Runtime",
    items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Electron", "Framer Motion"],
  },
  {
    icon: Server,
    name: "Backend & Microsserviços",
    items: ["Python", "FastAPI", "Flask", "Node.js", "RESTful APIs", "Webhooks"],
  },
  {
    icon: Brain,
    name: "Inteligência Artificial & OCR",
    items: ["LLaMA-4 Vision", "Groq API", "Google Gemini", "CrewAI", "LangChain", "pdfplumber"],
  },
  {
    icon: Database,
    name: "Persistência & Dados",
    items: ["PostgreSQL", "Supabase (RLS)", "SQLite", "IndexedDB", "SQLAlchemy"],
  },
  {
    icon: Plug,
    name: "Integrações & Billing",
    items: ["Stripe Checkout", "WhatsApp Business API", "Google Sheets API", "Webhooks"],
  },
  {
    icon: Cloud,
    name: "Deploy & Infraestrutura",
    items: ["Vercel", "Docker", "PWA (Service Workers)", "Linux", "Git / GitHub Actions"],
  },
]

export function TechStackSection() {
  return (
    <section id="stack" className="py-24 px-4 sm:px-6 relative overflow-hidden border-t border-white/[0.06]">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="status-dot" />
              <span className="font-mono text-xs text-[#10b981] uppercase tracking-widest">
                Stack de Produção
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Tecnologias & Ferramental
            </h2>
            <p className="text-[#94a3b8] text-base md:text-lg mt-2 max-w-2xl">
              Conjunto de ferramentas selecionadas por robustez, velocidade de desenvolvimento e confiabilidade em escala.
            </p>
          </div>

          <div className="font-mono text-xs text-[#64748b]">
            // TECH INDEX 2026
          </div>
        </div>

        {/* 3-Column Clean Engineering Matrix */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stackCategories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="craft-card p-6 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#161920] border border-white/10 flex items-center justify-center text-[#10b981]">
                  <cat.icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {cat.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="tech-pill text-xs hover:border-[#10b981]/40 hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
