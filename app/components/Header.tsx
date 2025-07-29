'use client'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/Badge'

const palabras = ['Lo', 'bueno', 'se', 'recomienda.']

export default function Header() {
  const [show, setShow] = useState([false, false, false, false])

  useEffect(() => {
    palabras.forEach((_, i) => {
      setTimeout(() => {
        setShow((prev) => {
          const nuevo = [...prev]
          nuevo[i] = true
          return nuevo
        })
      }, i * 180) // delay
    })
  }, [])

  return (
    <header className="bg-transparent">
      <div className="container mx-auto px-4 py-4 flex flex-col items-center">
        {/* Slogan */}
        <div className="w-full flex justify-center mb-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center leading-tight">
            {palabras.map((palabra, i) => (
              <span
                key={palabra}
                className={`mx-1 ${show[i] ? 'bounce-up-once' : 'opacity-0'} ${
                  palabra === 'recomienda.'
                    ? 'bg-gradient-to-r from-[#FF6D0C] to-[#C051FF] text-transparent bg-clip-text'
                    : ''
                }`}
              >
                {palabra}
              </span>
            ))}
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
