'use client'
import { useState, useMemo } from 'react'
import ProductLabel from '@ui/ProductLabel'
import Alert from '@ui/Alert'
import { BatteryCharging, Droplet, Image as ImageIcon, MemoryStick, Star } from 'lucide-react'
import WhatsAppButton from './WhatsAppButton'
import { crearMensajeWhatsApp } from '@/lib/whatsappMessages'
import ModalFotos from './ModalFotos'
import type { Producto } from '@/app/types/Producto'

// SECCIÓN: INTERFACES Y TIPOS
interface Props {
  productos: Producto[]
  alerta?: string
}

// SECCIÓN: COMPONENTE PRINCIPAL
export default function ProductosSeminuevos({ productos, alerta }: Props) {
  const [modalFotosOpen, setModalFotosOpen] = useState(false)
  const [fotos, setFotos] = useState<string[]>([])

  // SECCIÓN: FILTRADO Y FUNCIONES AUXILIARES
  // Filtrar productos visibles (memoizado para optimización)
  const visibles = useMemo(
    () => productos.filter((p) => p.ocultar?.toLowerCase() !== 'x'),
    [productos],
  )

  // Función para manejar visualización de fotos (modal o nueva pestaña)
  function handleVerFotos(fotoStr: string) {
    if (!fotoStr) return

    // Si es un link a Google Drive o similar → abrir en nueva pestaña
    if (
      fotoStr.includes('drive.google.com') ||
      fotoStr.includes('google.com') ||
      fotoStr.includes('photos.app.goo.gl')
    ) {
      window.open(fotoStr, '_blank')
      return
    }

    // Si son imágenes directas separadas por coma → abrir modal
    const lista = fotoStr
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean)

    if (lista.length > 0) {
      setFotos(lista)
      setModalFotosOpen(true)
    }
  }

  // SECCIÓN: RENDERIZADO PRINCIPAL
  return (
    <div className="space-y-6 mt-6">
      {/* Alerta */}
      {alerta && (
        <div className="max-w-3xl w-full mx-auto">
          <Alert type="success">{alerta}</Alert>
        </div>
      )}

      {/* Productos */}
      {visibles.map((p, i) => (
        <div
          key={i}
          style={{ animationDelay: `${i * 150}ms` }} // Delay en cascada
          className="border border-gray-200 rounded-lg bg-white/95 shadow-sm p-4 flex flex-col gap-2 
                     max-w-3xl w-full mx-auto opacity-0 animate-slideDown"
        >
          {/* Cabecera */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-gray-900">{p.modelo}</span>
              <ProductLabel value="SEMINUEVO" />
              {p.label && <ProductLabel value={p.label} />}
            </div>
            {p.fotos && (
              <button
                onClick={() => handleVerFotos(p.fotos!)}
                className="flex items-center gap-1 text-sm text-orange-500 hover:underline transition"
              >
                <ImageIcon className="w-4 h-4 inline mb-0.5" /> Ver fotos
              </button>
            )}
          </div>

          {/* Ficha */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mt-2">
            {/* Specs */}
            <div className="flex flex-col gap-1 text-sm flex-1">
              <div className="flex items-center gap-1">
                <MemoryStick className="w-4 h-4 text-orange-500" />
                <span>
                  <b>Capacidad:</b> {p.capacidad || 'No especificada'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Droplet className="w-4 h-4 text-orange-500" />
                <span>
                  <b>Color:</b> {p.color || 'No especificado'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <BatteryCharging className="w-4 h-4 text-orange-500" />
                <span>
                  <b>Batería:</b> {p.bateria || 'No especificado'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-orange-500" />
                <span>
                  <b>Condición:</b> {p.condicion || 'No especificada'}
                </span>
              </div>
            </div>

            {/* Precio + botón WhatsApp */}
            <div className="flex flex-col items-end justify-between min-w-[110px] text-sm gap-2 mt-2 sm:mt-0">
              <span className="text-gray-700 font-semibold">
                {p.precio ? (
                  p.precio
                ) : (
                  <span className="text-gray-500 font-semibold text-xs sm:text-sm">
                    Consultanos
                  </span>
                )}
              </span>
              <WhatsAppButton
                mensaje={crearMensajeWhatsApp(p.subcategoria, `${p.modelo} (seminuevo)`)}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Modal de fotos */}
      {modalFotosOpen && (
        <ModalFotos open={modalFotosOpen} fotos={fotos} onClose={() => setModalFotosOpen(false)} />
      )}
    </div>
  )
}
