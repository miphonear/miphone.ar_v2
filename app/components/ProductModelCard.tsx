'use client'
import { memo, useState, useEffect } from 'react'
import type { Producto } from '@/app/types/Producto'
import ProductLabel from '@ui/ProductLabel'
import WhatsAppButton from './WhatsAppButton'
import { crearMensajeWhatsApp } from '@/lib/whatsappMessages'

// --- INTERFAZ DE PROPS ---
interface Props {
  modelo: string
  variantes: Producto[]
  avatar?: string
  animationDelay: string
}

/**
 * ProductModelCard: Componente optimizado para mostrar una tarjeta de producto.
 * Utiliza React.memo para evitar re-renders innecesarios si las props no cambian.
 * Presenta un layout responsivo:
 * - Desktop: Avatar a la izquierda, contenido a la derecha.
 * - Mobile: Avatar centrado entre el título y las variantes.
 * Incluye un fallback a una imagen de stock si la URL del avatar está corrupta.
 */

// --- CONSTANTE PARA LA IMAGEN DE STOCK ---
const STOCK_AVATAR_URL = '/images/placeholder-avatar.png'

const ProductModelCard = memo(function ProductModelCard({
  modelo,
  variantes,
  avatar,
  animationDelay,
}: Props) {
  const [imageSrc, setImageSrc] = useState(avatar)

  // Sincroniza el estado si la prop 'avatar' cambia.
  // Esencial para que el componente se actualice correctamente en listas.
  useEffect(() => {
    setImageSrc(avatar)
  }, [avatar])

  // Función que se dispara si la carga de la imagen falla,
  // cambiando la fuente a la imagen de stock.
  const handleError = () => {
    setImageSrc(STOCK_AVATAR_URL)
  }

  // --- CÁLCULOS DERIVADOS ---
  const hasNew = variantes.some((v) => v.label?.trim().toUpperCase() === 'NEW')
  const specs = variantes[0].specs || null
  const hayVersiones = variantes.some((v) => v.version && v.version.trim() !== '')

  // --- SUBCOMPONENTES REUTILIZABLES ---
  // Extraer lógica repetida a componentes internos mejora la legibilidad.

  // Componente para el título del modelo, incluyendo el label "NEW".
  const Title = () => (
    <span className="font-bold text-base text-gray-900 flex items-center gap-2">
      {modelo}
      {hasNew && <ProductLabel value="NEW" />}
    </span>
  )

  // Componente para el avatar en vista móvil. Ahora usa el estado y el manejador de error.
  const MobileAvatar = () =>
    avatar ? (
      <div className="mt-2 flex justify-center md:hidden">
        <img
          src={imageSrc}
          alt={`Avatar de ${modelo}`}
          className="w-24 h-24 rounded-lg object-contain"
          loading="lazy"
          onError={handleError}
        />
      </div>
    ) : null

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div
      style={{ animationDelay }}
      className="border border-gray-200 rounded-lg p-4 bg-white/90 flex shadow-sm max-w-3xl w-full mx-auto opacity-0 animate-slideDown"
    >
      <div className="flex w-full items-start gap-4">
        {/* --- 1. AVATAR DESKTOP (IZQUIERDA) --- */}
        {avatar && (
          <div className="hidden md:flex w-16 flex-shrink-0 items-center sm:w-20">
            <img
              src={imageSrc}
              alt={`Avatar de ${modelo}`}
              className="w-full h-auto object-contain"
              loading="lazy"
              onError={handleError}
            />
          </div>
        )}

        {/* --- 2. CONTENIDO (DERECHA) --- */}
        <div className="flex flex-col flex-grow">
          <div className="flex-grow">
            {hayVersiones ? (
              <>
                {/* Cabecera para vista con versiones */}
                <div className="flex justify-between items-center px-1 gap-1">
                  <Title />
                  {specs && (
                    <a
                      href={specs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-500 hover:underline transition flex-shrink-0" // flex-shrink-0 evita que el texto se rompa
                    >
                      Ver ficha
                    </a>
                  )}
                </div>

                <MobileAvatar />

                {/* Contenedor de variantes */}
                <div className="flex flex-col mt-2">
                  {variantes.map((v, j) => (
                    <div
                      key={`${modelo}-${j}`}
                      className="flex justify-between items-center border-t border-gray-200 first:border-t-0 py-1 px-1.5 text-sm hover:bg-purple-50"
                    >
                      <span className="text-gray-700">{v.version || ''}</span>
                      <span className="text-gray-700 font-semibold flex items-center gap-1">
                        {v.label?.trim().toUpperCase() === 'SALE' && <ProductLabel value="SALE" />}
                        {v.precio || (
                          <span className="text-gray-500 font-semibold text-xs sm:text-sm">
                            Consultanos
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Fila única para vista sin versiones */}
                <div className="flex justify-between items-center">
                  <Title />
                  <span className="pl-4 text-gray-700 font-semibold text-sm flex items-center gap-1">
                    {variantes[0].label?.trim().toUpperCase() === 'SALE' && (
                      <ProductLabel value="SALE" />
                    )}
                    {variantes[0].precio || (
                      <span className="text-gray-500 font-semibold text-xs sm:text-sm">
                        Consultanos
                      </span>
                    )}
                  </span>
                </div>

                <MobileAvatar />
              </>
            )}
          </div>

          {/* Boton WhatsApp (Consultar) */}
          <div className="flex justify-end mt-4">
            <WhatsAppButton mensaje={crearMensajeWhatsApp(variantes[0].subcategoria, modelo)} />
          </div>
        </div>
      </div>
    </div>
  )
})

export default ProductModelCard
