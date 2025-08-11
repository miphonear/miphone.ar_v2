'use client'
import { useState, useMemo } from 'react'
import ProductLabel from '@/components/ProductLabel'
import Alert from '@/components/ui/Alert'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUp } from 'lucide-react'
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
  query?: string
}

export default function ProductosGenerico({
  nombre,
  headers,
  productos,
  alerta,
  open = false,
}: Props) {
  const headerIndices = Object.fromEntries(headers.map((h, i) => [clean(h), i]))
  const idxOcultar = headerIndices[clean('ocultar')]
  const idxPrecio = headerIndices[clean('precio')]
  const idxLabel = headerIndices[clean('l')]
  const idxVariante = 1
  const idxSpecs = headers.findIndex((h) => clean(h).includes('specs'))
  const idxLinea = headerIndices[clean('linea')]
  const idxMarca = headerIndices[clean('marca')]

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

  function RenderPorModelo({ productos }: { productos: string[][] }) {
    const agrupados: Record<string, string[][]> = {}
    productos.forEach((row) => {
      const modelo = row[0]?.trim() || '-'
      agrupados[modelo] = agrupados[modelo] || []
      agrupados[modelo].push(row)
    })
    return (
      <div className="space-y-4">
        {Object.entries(agrupados).map(([modelo, variantes]) => {
          const hasNew = variantes.some(
            (row) => typeof idxLabel === 'number' && row[idxLabel]?.trim().toUpperCase() === 'NEW',
          )
          const specs = idxSpecs >= 0 && variantes[0][idxSpecs] ? variantes[0][idxSpecs] : null

          return (
            <div
              key={modelo}
              className="border border-gray-200 rounded-lg p-4 bg-white/95 flex flex-col gap-1 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-1 mb-2 gap-1">
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
              <div className="flex flex-col gap-0">
                {variantes.map((row, j) => (
                  <div
                    key={`${modelo}-${j}`}
                    className="flex justify-between items-center border-t border-gray-200 first:border-t-0 py-1 px-1.5 text-sm hover:bg-purple-50"
                  >
                    <span className="text-gray-700">{row[idxVariante] || ''}</span>
                    <span className="text-gray-700 font-semibold flex items-center gap-1">
                      {typeof idxLabel === 'number' &&
                        row[idxLabel]?.trim().toUpperCase() === 'SALE' && (
                          <ProductLabel value="SALE" />
                        )}
                      {typeof idxPrecio === 'number' && row[idxPrecio] ? (
                        row[idxPrecio]
                      ) : (
                        <span className="text-gray-500 font-semibold text-xs sm:text-sm">
                          Consultanos
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-3">
                <WhatsAppButton mensaje={crearMensajeWhatsApp(nombre, modelo)} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function TabsInternos() {
    const [tab, setTab] = useState(tabs[0] || '')

    const productosTab = productosFiltrados.filter(
      (row) => (row[idxLinea] || 'OTROS').toUpperCase() === tab,
    )

    // Caso especial: si existe MARCA (FOTOGRAFÍA)
    if (typeof idxMarca === 'number') {
      const agrupadosPorMarca: Record<string, { modelo: string; precio: string }[]> = {}
      productosTab.forEach((row) => {
        const marca = (row[idxMarca] || 'OTROS').toUpperCase()
        if (!agrupadosPorMarca[marca]) agrupadosPorMarca[marca] = []
        agrupadosPorMarca[marca].push({
          modelo: row[0] || '',
          precio: row[idxPrecio] || '',
        })
      })

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
          {Object.entries(agrupadosPorMarca).map(([marca, productosMarca]) => (
            <div
              key={marca}
              className="border border-gray-200 rounded-lg bg-white/95 p-4 shadow-sm mb-4"
            >
              <div className="font-semibold text-base text-gray-900 mb-1">{marca}</div>
              <div className="divide-y divide-gray-200">
                {productosMarca.map((p, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-1 px-1.5 text-sm hover:bg-purple-50"
                  >
                    <span className="text-gray-700">{p.modelo}</span>
                    <span className="text-gray-700 font-semibold">
                      {p.precio || (
                        <span className="text-gray-500 font-semibold text-xs sm:text-sm">
                          Consultanos
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )
    }

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
        <RenderPorModelo productos={productosTab} />
      </>
    )
  }

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
              {alerta && <Alert>{alerta}</Alert>}
              {typeof idxLinea === 'number' && tabs.length > 0 ? (
                <TabsInternos />
              ) : (
                <RenderPorModelo productos={productosFiltrados} />
              )}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  )
}
