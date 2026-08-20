"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { value: 12, suffix: "+", label: "Sistemas em Produção", detail: "Web, SaaS & Desktop" },
  { value: 50, suffix: "k+", label: "Requisições & Docs/mês", detail: "Processamento via IA" },
  { value: 100, suffix: "%", label: "Prazos Cumpridos", detail: "Rigor e previsibilidade" },
  { value: 6, suffix: "", label: "Setores Atendidos", detail: "Solar, Finanças, Militar, etc." },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const steps = 40
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
      {count.toLocaleString("pt-BR")}
      <span className="text-[#10b981]">{suffix}</span>
    </span>
  )
}

export function SocialProof() {
  return (
    <section className="py-16 px-4 sm:px-6 border-t border-white/[0.06] bg-[#0c0e12]/40">
      <div className="container mx-auto max-w-6xl">
        <div className="craft-card p-8 sm:p-10 rounded-2xl bg-[#101216]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex flex-col items-center text-center space-y-1"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-sm font-semibold text-white mt-1">{stat.label}</span>
                <span className="font-mono text-[11px] text-[#64748b]">{stat.detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
