"use client"

import { Github, Linkedin, ArrowUp } from "lucide-react"

const footerLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#destaques", label: "Casos de Estudo" },
  { href: "#projetos", label: "Projetos" },
  { href: "#capacidades", label: "Capacidades" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-white/[0.08] bg-[#08090b]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#161920] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#10b981]">
              GM
            </div>
            <div>
              <span className="font-bold text-sm text-white tracking-tight block">
                Gabriel Hipólito
              </span>
              <span className="font-mono text-[11px] text-[#64748b]">
                Desenvolvimento de Software & IA
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-[#94a3b8] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ghmata"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-[#101216] hover:bg-[#161920] border border-white/10 flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/gabriel-mata"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-[#101216] hover:bg-[#161920] border border-white/10 flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg bg-[#101216] hover:bg-[#161920] border border-white/10 flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright & Location */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748b]">
          <p>© 2025–2026 Gabriel Hipólito. Desenvolvido com Next.js & Tailwind CSS.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span>Brasília, DF — Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
