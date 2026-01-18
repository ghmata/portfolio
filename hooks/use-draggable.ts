'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface Position {
  x: number
  y: number
}

interface UseDraggableOptions {
  defaultPosition?: Position
  storageKey?: string
}

export function useDraggable({ defaultPosition = { x: 20, y: 20 }, storageKey }: UseDraggableOptions) {
  const [position, setPosition] = useState<Position>(defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPos = useRef<Position>({ x: 0, y: 0 })
  const elementStartPos = useRef<Position>({ x: 0, y: 0 })

  // Carregar posição salva do localStorage
  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        try {
          const savedPos = JSON.parse(saved)
          setPosition(savedPos)
        } catch (e) {
          console.error('Erro ao carregar posição salva:', e)
        }
      }
    }
  }, [storageKey])

  // Salvar posição no localStorage quando mudar
  useEffect(() => {
    if (storageKey && typeof window !== 'undefined' && !isDragging) {
      localStorage.setItem(storageKey, JSON.stringify(position))
    }
  }, [position, storageKey, isDragging])

  // Garantir que o elemento fique dentro da viewport
  const constrainPosition = useCallback((pos: Position, elementWidth: number, elementHeight: number): Position => {
    const maxX = window.innerWidth - elementWidth
    const maxY = window.innerHeight - elementHeight

    return {
      x: Math.max(0, Math.min(pos.x, maxX)),
      y: Math.max(0, Math.min(pos.y, maxY))
    }
  }, [])

  // Handler para início do arrasto (mouse)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    elementStartPos.current = position
  }, [position])

  // Handler para início do arrasto (touch)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      const touch = e.touches[0]
      dragStartPos.current = { x: touch.clientX, y: touch.clientY }
      elementStartPos.current = position
    }
  }, [position])

  // Handler para movimento (mouse)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - dragStartPos.current.x
      const deltaY = e.clientY - dragStartPos.current.y

      const newPosition = {
        x: elementStartPos.current.x + deltaX,
        y: elementStartPos.current.y + deltaY
      }

      setPosition(newPosition)
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  // Handler para movimento (touch)
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return

      const touch = e.touches[0]
      const deltaX = touch.clientX - dragStartPos.current.x
      const deltaY = touch.clientY - dragStartPos.current.y

      const newPosition = {
        x: elementStartPos.current.x + deltaX,
        y: elementStartPos.current.y + deltaY
      }

      setPosition(newPosition)
    }

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false)
      }
    }

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  return {
    position,
    isDragging,
    handleMouseDown,
    handleTouchStart,
    setPosition,
    constrainPosition
  }
}
