'use client'
import ProductLabel from '@/components/ProductLabel'
import Alert from '@/components/ui/Alert'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUp, Droplet, Image as ImageIcon, Info } from 'lucide-react'
import { useState } from 'react'
import ModalFotos from './ModalFotos'
import WhatsAppButton from './WhatsAppButton'
import { clean } from '@/lib/clean'

interface Props {
  nombre: string
  headers: string[]
  productos: string[][]
  alerta?: string
  open?: boolean
}

export default function ProductosAccesorios({
  nombre,
  headers,
  productos,
  alerta,
  open = false,
}: Props) {
  const [modalFotosOpen, setModalFotosOpen] = useState(false)
  const [fotos, setFotos] = useState<string[]>([])

  // Mapear headers a índices para acceso robusto
  const headerIndices = Object.fromEntries(headers.map((h, i) => [clean(h), i]))
  const idx = (col: string) => headerIndices[clean(col)]
  const idxOcultar = idx('Ocultar')
  const idxFotos = idx('Fotos')

  const productosFiltrados =
    typeof idxOcultar === 'number'
      ? productos.filter((row) => row[idxOcultar]?.trim().toLowerCase() !== 'x')
      : productos

  function handleVerFotos(fotoStr: string) {
    if (!fotoStr) {
      setFotos([])
    } else {
      setFotos(
        fotoStr
          .split(',')
          .map((f) => f.trim())
          .filter((f) => !!f),
      )
    }
    setModalFotosOpen(true)
  }

  return (
    <div>
      <Disclosure key={nombre + '-' + open} defaultOpen={open}>
        {({ open: isOpen }) => (
          <div
            className={`rounded-2xl shadow-sm transition ${
              isOpen ? 'ring-2 ring-orange-500 bg-orange-50/50' : 'ring-2 ring-gray-200 bg-white/80'
            }`}
          >
            <Disclosure.Button
              className={`
                flex w-full justify-between items-center px-6 py-3 text-left text-base font-bold tracking-wide
                group transition-colors duration-400 hover:text-orange-500 focus:outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-500
                ${isOpen ? 'text-orange-500' : 'text-gray-800'}
              `}
            >
              <span>{nombre}</span>
              <ChevronUp
                className={`
                  h-6 w-6 transition-transform duration-300
                  ${isOpen ? 'rotate-0 text-orange-500' : 'rotate-180'}
                `}
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
              <Disclosure.Panel static className="px-6 py-2 pb-6 overflow-hidden">
                {alerta && <Alert>{alerta}</Alert>}
                <div className="space-y-4">
                  {productosFiltrados.map((row, idxRow) => (
                    <div
                      key={idxRow}
                      className="border border-gray-200 rounded-lg bg-white/95 shadow-sm p-4 flex flex-col gap-1"
                    >
                      {/* Cabecera producto */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-gray-900">
                            {(typeof idx('Producto') === 'number' && row[idx('Producto')]) || '-'}
                          </span>
                          {typeof idx('L') === 'number' && row[idx('L')] && (
                            <ProductLabel value={row[idx('L')]} />
                          )}
                        </div>
                        {typeof idxFotos === 'number' && row[idxFotos] && (
                          <button
                            type="button"
                            onClick={() => handleVerFotos(row[idxFotos])}
                            className="flex items-center gap-1 text-sm text-orange-500 hover:underline font-medium transition mt-1 sm:mt-0"
                          >
                            <ImageIcon className="w-4 h-4 inline mb-0.5" /> Ver fotos
                          </button>
                        )}
                      </div>
                      {/* Detalles y precio */}
                      <div className="flex flex-col text-sm sm:flex-row sm:justify-between sm:items-start gap-2 mt-2">
                        {/* Columna detalles */}
                        <div className="flex flex-col gap-1 flex-1">
                          <div className="flex items-center gap-1">
                            <Info className="w-4 h-4 text-orange-400" />
                            <span>
                              <b>Info:</b>{' '}
                              {(typeof idx('Información') === 'number' &&
                                row[idx('Información')]) ||
                                '-'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Droplet className="w-4 h-4 text-orange-400" />
                            <span>
                              <b>Colores:</b>
                            </span>
                          </div>
                          <div className="gap-1 px-5">
                            <span>
                              {(typeof idx('Colores') === 'number' && row[idx('Colores')]) || '-'}
                            </span>
                          </div>
                        </div>
                        {/* Precio + botón WhatsApp */}
                        <div className="flex flex-col items-end justify-between min-w-[110px] gap-2 mt-2 sm:mt-0">
                          <span className="text-gray-700 font-semibold">
                            {typeof idx('Precio') === 'number' && row[idx('Precio')] ? (
                              row[idx('Precio')]
                            ) : (
                              <span className="text-gray-500 font-semibold text-xs sm:text-sm">
                                Consultanos
                              </span>
                            )}
                          </span>
                          <WhatsAppButton
                            mensaje={`¡Hola! Vi el accesorio ${
                              typeof idx('Producto') === 'number' && row[idx('Producto')]
                            } en la web y me gustaría saber si está disponible.`}
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
      {modalFotosOpen && (
        <ModalFotos open={modalFotosOpen} fotos={fotos} onClose={() => setModalFotosOpen(false)} />
      )}
    </div>
  )
}
