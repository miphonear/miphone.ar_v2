'use client'
import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeVisible = window.scrollY > 150
          setVisible((prev) => (prev !== shouldBeVisible ? shouldBeVisible : prev))
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      aria-label="Subir al inicio"
      onClick={handleClick}
      className={cn(
        'fixed right-4 z-[60]', // z-index alto para no quedar detrás del WP
        'bottom-20 sm:bottom-20', // En mobile lo subimos para dejar espacio al WP Float
        'flex items-center justify-center',
        'rounded-full shadow-md border',
        'bg-orange-500 text-white hover:bg-orange-600 transition-colors',
        // Animación fade + slide-up
        'transition-all duration-300 ease-out',
        visible
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-8 pointer-events-none',
      )}
      style={{
        width: 56,
        height: 56,
      }}
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  )
}
