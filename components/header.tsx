"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"

const navLinks = [
  { href: "#projetos", label: "Projetos" },
  { href: "#destaques", label: "Casos de Estudo" },
  { href: "#capacidades", label: "Capacidades" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-[#08090b]/90 backdrop-blur-md border-b border-white/[0.08] py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <nav className="flex items-center justify-between">
          {/* Brand */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <span className="font-mono text-sm font-semibold text-white tracking-tight group-hover:text-[#10b981] transition-colors">
              gabriel.mata
            </span>
            <span className="font-mono text-xs text-[#64748b]">/</span>
            <span className="font-mono text-xs text-[#64748b] hidden sm:inline">
              software & ia
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs font-mono text-[#9ca3af] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/553182722278?text=Olá%20Gabriel!%20Vim%20pelo%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#10b981] hover:text-[#34d399] transition-colors"
            >
              <span>whatsapp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#9ca3af] hover:text-white p-1"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-6 rounded-xl bg-[#101216] border border-white/10 space-y-4">
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm font-mono text-[#9ca3af] hover:text-white py-1 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-white/[0.08]">
              <a
                href="https://wa.me/553182722278?text=Olá%20Gabriel!%20Vim%20pelo%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-xs font-mono text-[#10b981] py-2"
              >
                <span>Falar no WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
