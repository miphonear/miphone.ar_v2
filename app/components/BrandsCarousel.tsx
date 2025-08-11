'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useEffect } from 'react'

// Logos
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

const MARCAS = [
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

const SCROLL_AMOUNT = 240
const SCROLL_DURATION = 350

function ScrollButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right'
  onClick: () => void
}) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  const positionClass =
    direction === 'left' ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'

  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
      className={`hidden md:block absolute ${positionClass} top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border shadow hover:transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 group z-30`}
    >
      <Icon className="w-6 h-6 text-gray-600 transition-colors group-hover:text-orange-500" />
    </button>
  )
}

export default function BrandsCarousel({ onSearch }: BrandsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const marcasLoop = [...MARCAS, ...MARCAS]

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
      el.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' })
      setTimeout(() => {
        if (el.scrollLeft >= maxScroll - SCROLL_AMOUNT) {
          el.scrollLeft = halfScroll
        }
      }, SCROLL_DURATION)
    } else {
      el.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' })
      setTimeout(() => {
        if (el.scrollLeft <= SCROLL_AMOUNT) {
          el.scrollLeft = halfScroll
        }
      }, SCROLL_DURATION)
    }
  }

  return (
    <div className="bg-transparent">
      <div className="max-w-xl md:max-w-5xl mx-auto px-2 md:px-4 relative">
        {/* Gradientes */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-22 z-20 bg-gradient-to-r from-white/100 via-white/95 to-white/0" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-22 z-20 bg-gradient-to-l from-white/100 via-white/95 to-white/0" />

        {/* Botones */}
        <ScrollButton direction="left" onClick={() => handleScroll('left')} />

        {/* Carrusel */}
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-10 overflow-x-auto px-1 md:px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
          role="list"
        >
          {marcasLoop.map((m, i) => (
            <button
              key={`${m.name}-${i}`}
              onClick={() => onSearch(m.tag)}
              className="flex-shrink-0 snap-center focus:outline-none bg-transparent transition-transform duration-200 hover:scale-110 rounded-full group"
              title={`Buscar productos de ${m.tag}`}
              role="listitem"
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

        <ScrollButton direction="right" onClick={() => handleScroll('right')} />
      </div>
    </div>
  )
}
