'use client'
import { useRef, useEffect } from 'react'
import ScrollButton from '@ui/ScrollButton'

// SECCIÓN: IMPORTS DE ÍCONOS SVG
import AppleIcon from '@/public/images/categories/apple.svg'
import AndroidIcon from '@/public/images/categories/android.svg'
import ConsolasIcon from '@/public/images/categories/consolas.svg'
import WearablesIcon from '@/public/images/categories/wearables.svg'
import FotoVideoIcon from '@/public/images/categories/foto-video.svg'
import AccesoriosIcon from '@/public/images/categories/accesorios.svg'
import DroneIcon from '@/public/images/categories/drone.svg'
import DefaultIcon from '@/public/images/categories/default.svg'

// SECCIÓN: INTERFACES Y TIPOS
interface Categoria {
  nombre: string
}

interface Props {
  categorias: Categoria[]
  cat: string
  setCat: (value: string) => void
}

// SECCIÓN: MAPEO DE ÍCONOS
const ICONOS_CATEGORIAS: Record<string, React.ElementType> = {
  APPLE: AppleIcon,
  ANDROID: AndroidIcon,
  CONSOLAS: ConsolasIcon,
  WEARABLES: WearablesIcon,
  'FOTO Y VIDEO': FotoVideoIcon,
  DRONE: DroneIcon,
  ACCESORIOS: AccesoriosIcon,
}

// SECCIÓN: COMPONENTE PRINCIPAL
export default function TabsCategorias({ categorias, cat, setCat }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // SECCIÓN: FUNCIONES AUXILIARES
  // Función para scroll horizontal con botones left/right
  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -200 : 200,
        behavior: 'smooth',
      })
    }
  }

  // Función para centrar un elemento dentro del contenedor
  const scrollToCenter = (el: HTMLElement) => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const offset = el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2
      container.scrollTo({ left: offset, behavior: 'smooth' })
    }
  }

  // SECCIÓN: EFECTOS
  // 👉 Auto-centrar el tab activo cuando cambia `cat` o la lista de `categorias`
  // Esto sirve también cuando se hace una búsqueda: al filtrar, el tab activo aparecerá centrado
  useEffect(() => {
    if (scrollRef.current && cat) {
      const activeBtn = scrollRef.current.querySelector<HTMLButtonElement>(
        `button[data-categoria="${cat}"]`,
      )
      if (activeBtn) scrollToCenter(activeBtn)
    }
  }, [cat, categorias])

  // SECCIÓN: RENDERIZADO
  return (
    <div className="relative flex items-center">
      {/* Botón izquierda */}
      <ScrollButton direction="left" onClick={() => scroll('left')} />

      {/* Contenedor scrollable */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-10 overflow-x-auto no-scrollbar px-2 md:px-6 py-6 
                   snap-x snap-mandatory scroll-smooth"
      >
        {categorias.map((c) => {
          const isActive = cat === c.nombre
          const Icon = ICONOS_CATEGORIAS[c.nombre.toUpperCase()] || DefaultIcon

          return (
            <button
              key={c.nombre}
              // Atributo de data para poder localizarlo en el useEffect
              data-categoria={c.nombre}
              onClick={(e) => {
                setCat(c.nombre)
                // 👉 Centramos el tab seleccionado al hacer click
                scrollToCenter(e.currentTarget)
              }}
              className={`flex flex-col items-center justify-center 
                w-[120px] h-[120px] md:w-[160px] md:h-[160px] 
                flex-shrink-0 rounded-2xl border 
                transition-all duration-300 transform snap-center
                ${
                  isActive
                    ? 'bg-orange-500 text-white border-orange-500 ring-2 ring-orange-500/20 shadow-md scale-105 md:-translate-y-1'
                    : 'bg-white text-gray-800 border-gray-200 shadow-sm hover:shadow-md hover:scale-105 md:hover:-translate-y-1'
                }`}
            >
              {/* Icono SVG dinámico */}
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <Icon
                  className={`w-full h-full object-contain transition-all duration-200 ${
                    isActive ? 'text-white scale-125' : 'text-gray-800'
                  }`}
                />
              </div>

              {/* Texto */}
              <div className="px-2 w-full flex items-center justify-center">
                <span className="text-sm md:text-base font-semibold text-center break-words leading-tight">
                  {c.nombre}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Botón derecha */}
      <ScrollButton direction="right" onClick={() => scroll('right')} />
    </div>
  )
}
