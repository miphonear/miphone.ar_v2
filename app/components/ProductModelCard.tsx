// app/components/app/ProductModelCard.tsx
'use client'
import { memo } from 'react'
import type { Producto } from '@/app/types/Producto'
import ProductLabel from '@ui/ProductLabel'
import WhatsAppButton from './WhatsAppButton'
import { crearMensajeWhatsApp } from '@/lib/whatsappMessages'

// --- SECCIÓN: INTERFACES Y TIPOS ---
interface Props {
  modelo: string
  variantes: Producto[]
  animationDelay: string
}

// --- SECCIÓN: COMPONENTE PRINCIPAL ---
const ProductModelCard = memo(function ProductModelCard({
  modelo,
  variantes,
  animationDelay,
}: Props) {
  // --- Cálculos iniciales ---
  const hasNew = variantes.some((v) => v.label?.trim().toUpperCase() === 'NEW')
  const specs = variantes[0].specs || null
  const hayVersiones = variantes.some((v) => v.version && v.version.trim() !== '')

  return (
    <div
      style={{ animationDelay }}
      className="border border-gray-200 rounded-lg p-4 bg-white/90 flex flex-col gap-2 shadow-sm max-w-3xl w-full mx-auto opacity-0 animate-slideDown"
    >
      {/* --- Contenido principal (condicional) --- */}
      {hayVersiones ? (
        <>
          {/* Cabecera para vista con versiones */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-1 gap-1">
            <span className="font-bold text-base text-gray-900 flex items-center gap-2">
              {modelo}
              {hasNew && <ProductLabel value="NEW" />}
            </span>
            {specs && (
              <a
                href={specs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-orange-500 hover:underline transition"
              >
                Ver ficha
              </a>
            )}
          </div>
          {/* Lista de Variantes */}
          <div className="flex flex-col">
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
        /* Fila única para vista sin versiones */
        <div className="flex justify-between items-center">
          <span className="font-bold text-base text-gray-900 flex items-center gap-2">
            {modelo}
            {hasNew && <ProductLabel value="NEW" />}
          </span>
          <span className="pl-4 text-gray-700 font-semibold text-sm flex items-center gap-1">
            {variantes[0].label?.trim().toUpperCase() === 'SALE' && <ProductLabel value="SALE" />}
            {variantes[0].precio || (
              <span className="text-gray-500 font-semibold text-xs sm:text-sm">Consultanos</span>
            )}
          </span>
        </div>
      )}

      {/* --- Botón WhatsApp (unificado) --- */}
      <div className="flex justify-end mt-2">
        <WhatsAppButton mensaje={crearMensajeWhatsApp(variantes[0].subcategoria, modelo)} />
      </div>
    </div>
  )
})

export default ProductModelCard
