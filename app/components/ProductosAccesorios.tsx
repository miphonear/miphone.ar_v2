'use client'
import { useMemo, useState } from 'react'
import ProductLabel from '@/components/ProductLabel'
import { clean } from '@/lib/clean'
import WhatsAppButton from './WhatsAppButton'
import { crearMensajeWhatsApp } from '@/lib/whatsappMessages'
import ModalFotos from './ModalFotos'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUp, Image as ImageIcon } from 'lucide-react'
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

export default function ProductosAccesorios({ nombre, headers, productos, open = false }: Props) {
  const [modalFotosOpen, setModalFotosOpen] = useState(false)
  const [fotos, setFotos] = useState<string[]>([])

  const headerIndices = Object.fromEntries(headers.map((h, i) => [clean(h), i]))
  const idx = (col: string) => headerIndices[clean(col)]
  const idxOcultar = idx('Ocultar')
  const idxFotos = idx('Fotos')
  const idxLinea = idx('Linea')

  const productosFiltrados =
    typeof idxOcultar === 'number'
      ? productos.filter((row) => row[idxOcultar]?.trim().toLowerCase() !== 'x')
      : productos

  const tabs = useMemo(() => {
    return typeof idxLinea === 'number'
      ? Array.from(
          new Set(productosFiltrados.map((row) => (row[idxLinea] || 'OTROS').toUpperCase())),
        )
      : []
  }, [productosFiltrados, idxLinea])

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

  function RenderProductos(lista: string[][]) {
    return (
      <div className="space-y-4">
        {lista.map((row, idxRow) => (
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
              <div className="flex flex-col gap-1 flex-1">
                <div>
                  <b>Info:</b>{' '}
                  {(typeof idx('Información') === 'number' && row[idx('Información')]) || '-'}
                </div>
                <div>
                  <b>Colores:</b>{' '}
                  {(typeof idx('Colores') === 'number' && row[idx('Colores')]) || '-'}
                </div>
              </div>

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
                  mensaje={crearMensajeWhatsApp(
                    typeof idx('Producto') === 'number' ? `accesorio ${row[idx('Producto')]}` : '',
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function TabsInternos() {
    const [tab, setTab] = useState(tabs[0] || '')

    const productosTab = productosFiltrados.filter(
      (row) => (row[idxLinea] || 'OTROS').toUpperCase() === tab,
    )

    return (
      <>
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t}
              className={`px-3 py-1 rounded font-semibold text-xs sm:text-sm transition
                ${
                  tab === t
                    ? 'bg-orange-100 text-orange-700 shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                }
              `}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        {RenderProductos(productosTab)}
      </>
    )
  }

  return (
    <>
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
                {typeof idxLinea === 'number' && tabs.length > 0 ? (
                  <TabsInternos />
                ) : (
                  RenderProductos(productosFiltrados)
                )}
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>

      {modalFotosOpen && (
        <ModalFotos open={modalFotosOpen} fotos={fotos} onClose={() => setModalFotosOpen(false)} />
      )}
    </>
  )
}
