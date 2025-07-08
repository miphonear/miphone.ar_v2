// app/components/Header.tsx
'use client'
import { Badge } from '@/components/ui/Badge'

export default function Header() {
  return (
    <header className="bg-transparent">
      <div className="container mx-auto px-4 py-4 flex flex-col items-center">
        {/* Slogan */}
        <div className="w-full flex justify-center mb-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center leading-tight">
            Lo bueno se{' '}
            <span className="bg-gradient-to-r from-[#FF6D0C] to-[#C051FF] text-transparent bg-clip-text">
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
