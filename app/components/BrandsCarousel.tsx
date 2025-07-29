'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useEffect } from 'react'

// Importá los SVG como componentes
import AppleLogo from '@/public/images/brands/apple-logo.svg'
import CanonLogo from '@/public/images/brands/canon-logo.svg'
import DjiLogo from '@/public/images/brands/dji-logo.svg'
import GalaxyLogo from '@/public/images/brands/galaxy-logo.svg'
import GoproLogo from '@/public/images/brands/gopro-logo.svg'
import Insta360Logo from '@/public/images/brands/Insta360-logo.svg'
import MetaLogo from '@/public/images/brands/meta-logo.svg'
import NikonLogo from '@/public/images/brands/nikon-logo.svg'
import NintendoLogo from '@/public/images/brands/nintendo-logo.svg'
import PixelLogo from '@/public/images/brands/pixel-logo.svg'
import PlaystationLogo from '@/public/images/brands/playstation-logo.svg'
import RealmeLogo from '@/public/images/brands/realme-logo.svg'
import SigmaLogo from '@/public/images/brands/sigma-logo.svg'
import SonyLogo from '@/public/images/brands/sony-logo.svg'
import XboxLogo from '@/public/images/brands/xbox-logo.svg'
import XiaomiLogo from '@/public/images/brands/xiaomi-logo.svg'

interface BrandsCarouselProps {
  onSearch: (_: string) => void
}

const marcas = [
  { name: 'Apple', Logo: AppleLogo, tag: 'iPhone' },
  { name: 'Xiaomi', Logo: XiaomiLogo, tag: 'Xiaomi' },
  { name: 'Samsung', Logo: GalaxyLogo, tag: 'Samsung' },
  { name: 'Pixel', Logo: PixelLogo, tag: 'Pixel' },
  { name: 'Realme', Logo: RealmeLogo, tag: 'Realme' },
  { name: 'PlayStation', Logo: PlaystationLogo, tag: 'PlayStation' },
  { name: 'Nintendo', Logo: NintendoLogo, tag: 'Nintendo' },
  { name: 'Xbox', Logo: XboxLogo, tag: 'Xbox' },
  { name: 'Meta', Logo: MetaLogo, tag: 'Meta' },
  { name: 'GoPro', Logo: GoproLogo, tag: 'GoPro' },
  { name: 'Insta360', Logo: Insta360Logo, tag: 'Insta360' },
  { name: 'Canon', Logo: CanonLogo, tag: 'Canon' },
  { name: 'Nikon', Logo: NikonLogo, tag: 'Nikon' },
  { name: 'Sony', Logo: SonyLogo, tag: 'Sony' },
  { name: 'Sigma', Logo: SigmaLogo, tag: 'Sigma' },
  { name: 'DJI', Logo: DjiLogo, tag: 'Dji' },
]

export default function BrandsCarousel({ onSearch }: BrandsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAmount = 240

  // Duplicá los logos para el loop
  const marcasLoop = [...marcas, ...marcas]

  // Al montar, scrollea al inicio de la segunda tanda (para permitir loop en ambos sentidos)
  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current
      const halfScroll = (el.scrollWidth - el.clientWidth) / 2
      el.scrollLeft = halfScroll
    }
  }, [])

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    const el = containerRef.current
    const maxScroll = el.scrollWidth - el.clientWidth
    const halfScroll = maxScroll / 2

    if (direction === 'right') {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(() => {
        if (el.scrollLeft >= maxScroll - scrollAmount) {
          el.scrollLeft = halfScroll
        }
      }, 350)
    } else {
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      setTimeout(() => {
        if (el.scrollLeft <= scrollAmount) {
          el.scrollLeft = halfScroll
        }
      }, 350)
    }
  }

  return (
    <div className="bg-transparent">
      <div className="max-w-xl md:max-w-5xl mx-auto px-2 md:px-4 relative">
        {/* Gradiente izquierdo */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-16 z-20
          bg-gradient-to-r from-white/100 via-white/80 to-white/0"
        />
        {/* Gradiente derecho */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-16 z-20
          bg-gradient-to-l from-white/100 via-white/80 to-white/0"
        />

        {/* Botón izquierdo */}
        <button
          onClick={() => handleScroll('left')}
          aria-label="Anterior"
          className="
            hidden md:block absolute left-0 -translate-x-full 
            top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border shadow 
            hover:transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 group z-30 
          "
        >
          <ChevronLeft
            className="
              w-6 h-6 text-gray-600 transition-colors
              group-hover:text-orange-500
            "
          />
        </button>

        {/* Carrusel */}
        <div
          ref={containerRef}
          className="
            flex gap-6 md:gap-10 overflow-x-auto 
            px-1 md:px-2 no-scrollbar snap-x snap-mandatory scroll-smooth
          "
        >
          {marcasLoop.map((m, i) => (
            <button
              key={m.name + '-' + i}
              onClick={() => onSearch(m.tag)}
              className="flex-shrink-0 snap-center focus:outline-none bg-transparent transition-transform duration-200 hover:scale-110 rounded-full group"
              title={`Buscar productos de ${m.tag}`}
              tabIndex={0}
            >
              <div className="w-[70px] h-[35px] sm:w-[90px] sm:h-[45px] md:w-[120px] md:h-[60px] flex items-center justify-center p-1 sm:p-2">
                <m.Logo
                  className="max-h-full max-w-full filter grayscale opacity-60 transition duration-200 group-hover:filter-none group-hover:opacity-100"
                  aria-label={m.name}
                  draggable={false}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Botón derecho */}
        <button
          onClick={() => handleScroll('right')}
          aria-label="Siguiente"
          className="
            hidden md:block absolute right-0 translate-x-full
            top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border shadow
            hover: transition group z-30 
          "
        >
          <ChevronRight
            className="
              w-6 h-6 text-gray-600 transition-colors
              group-hover:text-orange-500
            "
          />
        </button>
      </div>
    </div>
  )
}
