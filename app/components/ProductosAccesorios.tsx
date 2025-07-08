import ProductLabel from '@/components/ProductLabel'
import Alert from '@/components/ui/Alert'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUp, Droplet, Image as ImageIcon, Info } from 'lucide-react'
import { useState } from 'react'
import ModalFotos from './ModalFotos'
import WhatsAppButton from './WhatsAppButton'

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

  const idx = (col: string) => headers.findIndex((h) => h.toLowerCase() === col.toLowerCase())
  const idxOcultar = idx('Ocultar')
  const idxFotos = idx('Fotos')

  const productosFiltrados = productos.filter(
    (row) => !(row[idxOcultar]?.trim().toLowerCase() === 'x'),
  )

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
      <Disclosure key={open ? 'open' : 'closed'} defaultOpen={open}>
        {({ open }) => (
          <div
            className={`rounded-2xl shadow-sm transition ${
              open ? 'ring-2 ring-orange-500 bg-orange-50/50' : 'ring-2 ring-gray-200 bg-white/80'
            }`}
          >
            <Disclosure.Button
              className={`
                flex w-full justify-between items-center px-6 py-3 text-left text-base font-bold tracking-wide
                group transition hover:text-orange-500 focus:outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-500
                ${open ? 'text-orange-500' : 'text-gray-800'}
              `}
            >
              <span>{nombre}</span>
              <ChevronUp
                className={`
                  h-6 w-6 transition-transform duration-300
                  ${open ? 'rotate-0 text-orange-500' : 'rotate-180'}
                `}
              />
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition-all duration-500 ease-out"
              enterFrom="opacity-0 max-h-0"
              enterTo="opacity-100 max-h-[1000px]"
              leave="transition-all duration-200 ease-in"
              leaveFrom="opacity-100 max-h-[1000px]"
              leaveTo="opacity-0 max-h-0"
            >
              <Disclosure.Panel static className="px-6 py-6 overflow-hidden">
                {/* Alerta */}
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
                            {row[idx('Producto')] || '-'}
                          </span>
                          {row[idx('L')] && <ProductLabel value={row[idx('L')]} />}
                        </div>
                        {row[idxFotos] && (
                          <button
                            type="button"
                            onClick={() => handleVerFotos(row[idx('Fotos')])}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:underline font-medium transition mt-1 sm:mt-0"
                          >
                            <ImageIcon className="w-4 h-4 inline mb-0.5" /> Ver fotos
                          </button>
                        )}
                      </div>
                      {/* Detalles y precio */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mt-2">
                        {/* Columna detalles */}
                        <div className="flex flex-col gap-1 text-sm flex-1">
                          <div className="flex items-center gap-1">
                            <Info className="w-4 h-4 text-orange-400" />
                            <span>
                              <b>Info:</b> {row[idx('Información')] || '-'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Droplet className="w-4 h-4 text-orange-400" />
                            <span>
                              <b>Colores:</b>
                            </span>
                          </div>
                          <div className="gap-1 px-5">
                            <span>{row[idx('Colores')] || '-'}</span>
                          </div>
                        </div>
                        {/* Precio + botón WhatsApp */}
                        <div className="flex flex-col items-end justify-between min-w-[110px] gap-2 mt-2 sm:mt-0">
                          <span className="text-gray-700 font-semibold">
                            {row[idx('Precio')] || 'Consultar'}
                          </span>
                          <WhatsAppButton
                            mensaje={`¡Hola! Vi el accesorio ${
                              row[idx('Producto')]
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
