'use client'
import { useState, useEffect, useMemo } from 'react'
import ProductLabel from '@/components/ProductLabel'
import Alert from '@/components/ui/Alert'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUp } from 'lucide-react'
import WhatsAppButton from './WhatsAppButton'
import { GLOSARIO } from '@/lib/glosario'
import { clean } from '@/lib/clean'

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
  query,
}: Props) {
  // Mapear headers a índices
  const headerIndices = Object.fromEntries(headers.map((h, i) => [clean(h), i]))
  const idxOcultar = headerIndices[clean('ocultar')]
  const idxPrecio = headerIndices[clean('precio')]
  const idxLabel = headerIndices[clean('l')]
  const idxVariante =
    headerIndices[clean('variante')] ??
    headerIndices[clean('capacidad')] ??
    headerIndices[clean('información')] ??
    1
  const idxSpecs = headers.findIndex((h) => clean(h).includes('spec'))
  const idxLinea = headerIndices[clean('linea')]
  const idxMarca = headerIndices[clean('marca')]

  // Filtrar variantes ocultas
  const productosFiltrados =
    typeof idxOcultar === 'number'
      ? productos.filter((row) => row[idxOcultar]?.trim().toLowerCase() !== 'x')
      : productos

  // Tabs internos si existe "Linea"
  const tabs = useMemo(() => {
    return typeof idxLinea === 'number'
      ? Array.from(
          new Set(productosFiltrados.map((row) => (row[idxLinea] || 'OTROS').toUpperCase())),
        )
      : []
  }, [productosFiltrados, idxLinea])

  // Glosario
  const key = nombre.toUpperCase()
  const pron = GLOSARIO[key] || { adj: 'está disponible', art: 'el' }

  // Componente hijo para tabs internos (para cumplir reglas de hooks)
  function TabsInternos({ isOpen }: { isOpen: boolean }) {
    const [tab, setTab] = useState(tabs[0] || '')

    useEffect(() => {
      if (isOpen && query && typeof idxLinea === 'number' && tabs.length > 0) {
        const q = clean(query)
        // 1. Buscar tab por palabra exacta, substring o si el query está contenido en el tab
        let match = tabs.find((t) => {
          const tClean = clean(t)
          return tClean === q || tClean.includes(q) || q.includes(tClean)
        })
        // 2. Si no hay match, buscar en los productos de cada tab
        if (!match) {
          for (const t of tabs) {
            const productosTab = productosFiltrados.filter(
              (row) => (row[idxLinea] || 'OTROS').toUpperCase() === t,
            )
            if (productosTab.some((row) => row.some((cell) => clean(cell).includes(q)))) {
              match = t
              break
            }
          }
        }
        if (match) setTab(match)
        else setTab(tabs[0])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, query, tabs])

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
        {/* Si existe "Marca", agrupá por marca y lista simple en ficha */}
        {typeof idxMarca === 'number'
          ? (() => {
              const productosTab = productosFiltrados.filter(
                (row) => (row[idxLinea] || 'OTROS').toUpperCase() === tab,
              )
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
                            className="flex justify-between items-center py-1 px-1.5 text-sm hover:bg-purple-50 transition-colors duration-150"
                          >
                            <span className="text-gray-700">{p.modelo}</span>
                            <span className="text-gray-700 font-semibold">
                              {p.precio ? (
                                <span className="text-gray-700 font-semibold">{p.precio}</span>
                              ) : (
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
            })()
          : (() => {
              const productosTab = productosFiltrados.filter(
                (row) => (row[idxLinea] || 'OTROS').toUpperCase() === tab,
              )
              const agrupadosPorModelo: Record<string, string[][]> = {}
              productosTab.forEach((row) => {
                const modelo = row[0]?.trim() || '-'
                if (!agrupadosPorModelo[modelo]) agrupadosPorModelo[modelo] = []
                agrupadosPorModelo[modelo].push(row)
              })
              return (
                <div className="space-y-4">
                  {Object.entries(agrupadosPorModelo).map(([modelo, variantes]) => {
                    const specs =
                      idxSpecs >= 0 && variantes[0][idxSpecs] ? variantes[0][idxSpecs] : null

                    return (
                      <div
                        key={modelo}
                        className="border border-gray-200 rounded-lg p-4 bg-white/95 flex flex-col gap-1 shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-1 mb-2 gap-1">
                          <span className="font-bold text-base text-gray-900">{modelo}</span>
                          {specs && (
                            <a
                              href={specs}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-orange-500 hover:underline transition"
                              aria-label={`Ver ficha técnica de ${modelo}`}
                            >
                              Ver ficha
                            </a>
                          )}
                        </div>
                        <div className="flex flex-col gap-0">
                          {variantes.map((row, j) => (
                            <div
                              key={`${modelo}-${j}`}
                              className="flex justify-between items-center border-t border-gray-200 first:border-t-0 py-1 px-1.5 text-sm
                              transition-colors duration-150 cursor-pointer
                              hover:bg-purple-50"
                            >
                              <span className="text-gray-700">{row[idxVariante] || ''}</span>
                              <div className="flex items-center gap-2">
                                {typeof idxLabel === 'number' && row[idxLabel] && (
                                  <ProductLabel value={row[idxLabel]} />
                                )}
                                <span className="text-gray-700 font-semibold">
                                  {typeof idxPrecio === 'number' && row[idxPrecio] ? (
                                    row[idxPrecio]
                                  ) : (
                                    <span className="text-gray-500 font-semibold text-xs sm:text-sm">
                                      Consultanos
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end mt-3">
                          <WhatsAppButton
                            mensaje={`¡Hola! Vi ${pron.art} ${nombre} ${modelo} en la web y me gustaría saber si ${pron.adj}.`}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
      </>
    )
  }

  return (
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
              group transition-colors duration-300 hover:text-orange-500 focus:outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-500
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
              {/* Si existe "Linea", render tabs internos */}
              {typeof idxLinea === 'number' && tabs.length > 0 ? (
                <TabsInternos isOpen={isOpen} />
              ) : (
                // Render tradicional si no hay columna "Linea"
                <div className="space-y-4">
                  {(() => {
                    const agrupados: Record<string, string[][]> = {}
                    productosFiltrados.forEach((row) => {
                      const modelo = row[0]?.trim() || '-'
                      agrupados[modelo] = agrupados[modelo] || []
                      agrupados[modelo].push(row)
                    })
                    return Object.entries(agrupados).map(([modelo, variantes]) => {
                      const specs =
                        idxSpecs >= 0 && variantes[0][idxSpecs] ? variantes[0][idxSpecs] : null

                      return (
                        <div
                          key={modelo}
                          className="border border-gray-200 rounded-lg p-4 bg-white/95 flex flex-col gap-1 shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-1 mb-2 gap-1">
                            <span className="font-bold text-base text-gray-900">{modelo}</span>
                            {specs && (
                              <a
                                href={specs}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-orange-500 hover:underline transition"
                                aria-label={`Ver ficha técnica de ${modelo}`}
                              >
                                Ver ficha
                              </a>
                            )}
                          </div>
                          <div className="flex flex-col gap-0">
                            {variantes.map((row, j) => (
                              <div
                                key={`${modelo}-${j}`}
                                className="flex justify-between items-center border-t border-gray-200 first:border-t-0 py-1 px-1.5 text-sm
                                  transition-colors duration-150 cursor-pointer
                                  hover:bg-purple-50"
                              >
                                <span className="text-gray-700">{row[idxVariante] || ''}</span>
                                <div className="flex items-center gap-2">
                                  {typeof idxLabel === 'number' && row[idxLabel] && (
                                    <ProductLabel value={row[idxLabel]} />
                                  )}
                                  <span className="text-gray-700 font-semibold">
                                    {typeof idxPrecio === 'number' && row[idxPrecio] ? (
                                      row[idxPrecio]
                                    ) : (
                                      <span className="text-gray-500 font-semibold text-xs sm:text-sm">
                                        Consultanos
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end mt-3">
                            <WhatsAppButton
                              mensaje={`¡Hola! Vi ${pron.art} ${nombre} ${modelo} en la web y me gustaría saber si ${pron.adj}.`}
                            />
                          </div>
                        </div>
                      )
                    })
                  })()}
                </div>
              )}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  )
}
