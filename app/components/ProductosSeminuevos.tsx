'use client'
import ProductLabel from '@/components/ProductLabel'
import Alert from '@/components/ui/Alert'
import { Disclosure, Transition } from '@headlessui/react'
import {
  BatteryCharging,
  ChevronUp,
  Droplet,
  Image as ImageIcon,
  MemoryStick,
  Star,
} from 'lucide-react'
import WhatsAppButton from './WhatsAppButton'
import { crearMensajeWhatsApp } from '@/lib/whatsappMessages'
import { clean } from '@/lib/clean'
import {
  ACCORDION_WRAPPER_CLASS,
  ACCORDION_HEADER_CLASS,
  ACCORDION_PANEL_CLASS,
} from '@/components/ui/accordionStyles'

interface Props {
  nombre: string
  headers: string[]
  productos: string[][]
  alerta?: string
  open?: boolean
}

export default function ProductosSeminuevos({
  nombre,
  headers,
  productos,
  alerta,
  open = false,
}: Props) {
  // Mapear headers a índices
  const headerIndices = Object.fromEntries(headers.map((h, i) => [clean(h), i]))
  const idx = (col: string) => headerIndices[clean(col)]
  const idxOcultar = idx('Ocultar')
  const idxFotos = idx('Fotos')

  const productosFiltrados =
    typeof idxOcultar === 'number'
      ? productos.filter((row) => row[idxOcultar]?.trim().toLowerCase() !== 'x')
      : productos

  return (
    <Disclosure key={nombre + '-' + open} defaultOpen={open}>
      {({ open: isOpen }) => (
        <div className={ACCORDION_WRAPPER_CLASS(isOpen)}>
          <Disclosure.Button className={ACCORDION_HEADER_CLASS(isOpen)}>
            <span>{nombre}</span>
            <ChevronUp
              className={`h-6 w-6 transition-transform duration-300 ${
                isOpen ? 'rotate-0 text-orange-500' : 'rotate-180'
              }`}
            />
          </Disclosure.Button>
          <Transition
            show={isOpen}
            enter="transition-all duration-500 ease-out"
            enterFrom="opacity-0 max-h-0"
            enterTo="opacity-100 max-h-[1000px]"
            leave="transition-all duration-200 ease-in"
            leaveFrom="opacity-100 max-h-[1000px]"
            leaveTo="opacity-0 max-h-0"
          >
            <Disclosure.Panel static className={ACCORDION_PANEL_CLASS}>
              {alerta && <Alert type="success">{alerta}</Alert>}
              <div className="space-y-4">
                {productosFiltrados.map((row, idxRow) => (
                  <div
                    key={idxRow}
                    className="border border-gray-200 rounded-lg bg-white/95 shadow-sm p-4 flex flex-col gap-1"
                  >
                    {/* Modelo header + Label */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-gray-900">
                          {(typeof idx('Producto') === 'number' && row[idx('Producto')]) || '-'}
                        </span>
                        {typeof idx('L') === 'number' && row[idx('L')] && (
                          <ProductLabel value={row[idx('L')]} />
                        )}
                      </div>
                      {typeof idxFotos === 'number' &&
                        row[idxFotos] &&
                        row[idxFotos].trim() !== '' && (
                          <a
                            href={row[idxFotos]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-orange-500 hover:underline transition"
                          >
                            <ImageIcon className="w-4 h-4 inline mb-0.5" /> Ver fotos
                          </a>
                        )}
                    </div>

                    {/* Ficha */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mt-2">
                      {/* Specs */}
                      <div className="flex flex-col gap-1 text-sm flex-1">
                        <div className="flex items-center gap-1">
                          <MemoryStick className="w-4 h-4 text-orange-500" />
                          <span>
                            <b>Capacidad:</b>{' '}
                            {(typeof idx('Capacidad') === 'number' && row[idx('Capacidad')]) || '-'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Droplet className="w-4 h-4 text-orange-500" />
                          <span>
                            <b>Color:</b>{' '}
                            {(typeof idx('Color') === 'number' && row[idx('Color')]) || '-'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BatteryCharging className="w-4 h-4 text-orange-500" />
                          <span>
                            <b>Batería:</b>{' '}
                            {(typeof idx('Bateria') === 'number' && row[idx('Bateria')]) || 'N/D'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-orange-500" />
                          <span>
                            <b>Condición:</b>
                          </span>
                        </div>
                        <div className="gap-1 px-5">
                          <span>
                            {(typeof idx('Condición') === 'number' && row[idx('Condición')]) || '-'}
                          </span>
                        </div>
                      </div>

                      {/* Precio + botón WhatsApp */}
                      <div className="flex flex-col items-end justify-between min-w-[110px] text-sm gap-2 mt-2 sm:mt-0">
                        <span className="text-gray-700 font-semibold">
                          {typeof idx('Precio') === 'number' && row[idx('Precio')] ? (
                            row[idx('Precio')]
                          ) : (
                            <span className="text-gray-500 font-semibold text-xs sm:text-sm">
                              ↓
                            </span>
                          )}
                        </span>
                        <WhatsAppButton
                          mensaje={crearMensajeWhatsApp(
                            typeof idx('Producto') === 'number'
                              ? `${row[idx('Producto')]} (seminuevo)`
                              : '',
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  )
}
