'use client'

import { useEffect, useRef, useState } from 'react'
import { useDraggable } from '@/hooks/use-draggable'
import { MessageCircle } from 'lucide-react'

export function FloatingWhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  const {
    position,
    isDragging,
    handleMouseDown,
    handleTouchStart,
    setPosition,
    constrainPosition
  } = useDraggable({
    defaultPosition: { x: 20, y: 100 },
    storageKey: 'whatsapp-button-position'
  })

  // Detectar se está no cliente e se é mobile
  useEffect(() => {
    setIsClient(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    
    // Definir posição inicial baseada no tamanho da tela
    if (typeof window !== 'undefined') {
      setPosition({ x: 20, y: window.innerHeight - 140 })
    }

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [setPosition])

  // Ajustar posição quando a janela é redimensionada (apenas mobile)
  useEffect(() => {
    if (!isMobile) return

    const handleResize = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const constrainedPos = constrainPosition(position, rect.width, rect.height)
        if (constrainedPos.x !== position.x || constrainedPos.y !== position.y) {
          setPosition(constrainedPos)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [position, constrainPosition, setPosition, isMobile])

  // Prevenir click quando está arrastando
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDragging) {
      e.preventDefault()
    }
  }

  // Não renderizar até estar no cliente
  if (!isClient) {
    return null
  }

  // Desktop: posição fixa no canto inferior direito
  if (!isMobile) {
    return (
      <a
        href="https://wa.me/5561983073229?text=Olá! Vi seu portfólio e quero conversar"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999] group"
        aria-label="Fale comigo no WhatsApp"
      >
        <div className="relative">
          {/* Botão principal */}
          <div className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110">
            <MessageCircle className="w-7 h-7" />
          </div>

          {/* Animação de pulse */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
            Fale comigo no WhatsApp
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900" />
          </div>
        </div>
      </a>
    )
  }

  // Mobile: botão arrastável
  return (
    <a
      ref={buttonRef}
      href="https://wa.me/5561983073229?text=Olá! Vi seu portfólio e quero conversar"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className="floating-whatsapp-button"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        cursor: isDragging ? 'grabbing' : 'pointer',
        touchAction: 'none',
        userSelect: 'none'
      }}
      aria-label="Fale comigo no WhatsApp"
    >
      <div className="relative group">
        {/* Botão principal */}
        <div className="bg-[#25D366] active:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all duration-300">
          <MessageCircle className="w-7 h-7" />
        </div>

        {/* Animação de pulse */}
        {!isDragging && (
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />
        )}
      </div>

      <style jsx>{`
        .floating-whatsapp-button {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </a>
  )
}
