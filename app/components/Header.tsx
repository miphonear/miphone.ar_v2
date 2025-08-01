'use client'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/Badge'

export default function Header() {
  const [anim, setAnim] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setAnim(false), 1300)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <header className="bg-transparent">
      <div className="container mx-auto px-4 py-4 flex flex-col items-center">
        {/* Slogan */}
        <div className="w-full flex justify-center mb-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center leading-tight">
            Lo bueno se{' '}
            <span
              className={`bg-gradient-to-r from-[#FF6D0C] to-[#C051FF] text-transparent bg-clip-text ${
                anim ? 'bounce-up-once' : ''
              }`}
            >
              recomienda.
            </span>
          </h2>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge emoji="🛒">Tienda Online</Badge>
          <Badge emoji="✅">Productos originales</Badge>
          <Badge emoji="🚗">Entregas en CABA y GBA</Badge>
          <Badge emoji="📦">Envíos a todo el país</Badge>
        </div>
      </div>
    </header>
  )
}
