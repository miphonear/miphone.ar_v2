'use client'
import { useMemo, useState, useEffect } from 'react'
import { useCSV } from '@/app/hooks/useCSV'
import type { Producto } from '@/app/types/Producto'
import TabsCategorias from './TabsCategorias'
import ProductosGenericos from './ProductosGenericos'
import ProductosSeminuevos from './ProductosSeminuevos'
import ProductosAccesorios from './ProductosAccesorios'
import { ALERTAS } from '@/lib/constantes'
import { filtrarCategorias } from '@/lib/filtrarCategorias'

interface ContenidoProps {
  query: string
}

export default function Contenido({ query }: ContenidoProps) {
  // CARGA DE DATOS
  const {
    productos: genericos,
    loading: loadingGen,
    error: errorGen,
  } = useCSV(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRr62BlKCzICpC0ctnU2mRB8cq_SOCcsgydXQJXD5pQvasO1b1iT0Wp_L7sFxH8UGJCepaMjng1GUO0/pub?gid=1062531966&single=true&output=csv',
  )
  const {
    productos: especiales,
    loading: loadingEsp,
    error: errorEsp,
  } = useCSV(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRr62BlKCzICpC0ctnU2mRB8cq_SOCcsgydXQJXD5pQvasO1b1iT0Wp_L7sFxH8UGJCepaMjng1GUO0/pub?gid=1307357173&single=true&output=csv',
  )

  const productos = useMemo(() => [...genericos, ...especiales], [genericos, especiales])
  const loading = loadingGen || loadingEsp
  const error = errorGen || errorEsp

  // FILTRADO Y AGRUPACIÓN
  const categorias = useMemo(() => {
    const map: Record<string, Record<string, Producto[]>> = {}
    productos.forEach((p) => {
      if (!map[p.categoria]) map[p.categoria] = {}
      if (!map[p.categoria][p.subcategoria]) map[p.categoria][p.subcategoria] = []
      map[p.categoria][p.subcategoria].push(p)
    })

    const categoriasAgrupadas = Object.entries(map).map(([categoria, subs]) => ({
      nombre: categoria,
      subcategorias: Object.entries(subs).map(([sub, items]) => ({
        nombre: sub,
        productos: items,
        lineas: Array.from(new Set(items.map((p) => p.linea))).filter(Boolean),
      })),
    }))

    return filtrarCategorias(categoriasAgrupadas, query)
  }, [productos, query])

  // ESTADOS DE NAVEGACIÓN
  const [cat, setCat] = useState('')
  const categoriaActual = categorias.find((c) => c.nombre === cat)
  const [sub, setSub] = useState('')
  const [linea, setLinea] = useState<string>('')

  // Animaciones
  const [showSubcategorias, setShowSubcategorias] = useState(false)
  const [showLineas, setShowLineas] = useState(false)

  // Selección inicial de categoría
  useEffect(() => {
    const categoriaExiste = categorias.some((c) => c.nombre === cat)
    if (categorias.length > 0 && !categoriaExiste) {
      setCat(categorias[0].nombre)
    } else if (categorias.length === 0) {
      setCat('')
    }
  }, [categorias, cat])

  // Selección inicial de subcategoría
  useEffect(() => {
    if (categoriaActual) {
      setSub(categoriaActual.subcategorias[0]?.nombre || '')
      setLinea('')
    } else {
      setSub('')
    }
  }, [cat, categoriaActual])

  // Selección automática de línea si existen
  useEffect(() => {
    const subcategoriaActual = categoriaActual?.subcategorias.find((s) => s.nombre === sub)
    if (subcategoriaActual) {
      if (subcategoriaActual.lineas.length > 0) {
        setLinea(subcategoriaActual.lineas[0]) // ✅ siempre selecciona la primera
      } else {
        setLinea('')
      }
    }
  }, [sub, categoriaActual])

  // Animación subcategorías
  useEffect(() => {
    if (categoriaActual) {
      setShowSubcategorias(false)
      const timer = setTimeout(() => setShowSubcategorias(true), 50)
      return () => clearTimeout(timer)
    } else {
      setShowSubcategorias(false)
    }
  }, [categoriaActual])

  // Animación líneas
  useEffect(() => {
    const subcategoriaActual = categoriaActual?.subcategorias.find((s) => s.nombre === sub)
    if (subcategoriaActual && subcategoriaActual.lineas.length > 0) {
      setShowLineas(false)
      const timer = setTimeout(() => setShowLineas(true), 50)
      return () => clearTimeout(timer)
    } else {
      setShowLineas(false)
    }
  }, [sub, categoriaActual])

  // ESTADOS ESPECIALES
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[30vh] md:min-h-[60vh]">
        <span
          className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-orange-500 border-t-transparent"
          role="status"
          aria-label="Cargando"
        ></span>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">{error}</div>
  }

  // RENDER PRINCIPAL
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl md:text-2xl text-gray-800 font-bold text-center text-primary mt-6 mb-2">
        Explorá nuestro catálogo
      </h2>

      {categorias.length === 0 && query.trim() ? (
        <div className="text-center text-gray-500 py-12">
          🤔 No se encontraron productos para &ldquo;{query}&rdquo;.
          <br />
          Intentá con otra búsqueda o consultanos por WhatsApp.
        </div>
      ) : (
        <>
          <TabsCategorias categorias={categorias} cat={cat} setCat={setCat} />

          {/* Subcategorías */}
          {categoriaActual && (
            <div
              className={`flex justify-start md:justify-center transition-all duration-500 ease-out
                ${
                  showSubcategorias
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
            >
              <div className="flex overflow-x-auto no-scrollbar rounded-md border border-gray-200 divide-x divide-gray-300 max-w-full snap-x snap-mandatory scroll-smooth">
                {categoriaActual.subcategorias.map((s) => (
                  <button
                    key={s.nombre}
                    onClick={() => {
                      setSub(s.nombre)
                      setLinea('')
                    }}
                    className={`px-3 py-1.5 text-sm font-semibold whitespace-nowrap snap-center transition
                      ${
                        sub === s.nombre
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {s.nombre} <span className="text-xs opacity-70">({s.productos.length})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Líneas */}
          {categoriaActual?.subcategorias
            .filter((s) => s.nombre === sub)
            .map((s) =>
              s.lineas && s.lineas.length > 0 ? (
                <div
                  key={`${s.nombre}-lineas`}
                  className={`mt-3 flex justify-start md:justify-center transition-all duration-500 ease-out
                    ${
                      showLineas
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                >
                  <div className="flex overflow-x-auto no-scrollbar rounded-md border border-gray-200 divide-x divide-gray-300 max-w-full snap-x snap-mandatory scroll-smooth">
                    {s.lineas.map((ln) => {
                      const count = s.productos.filter((p) => p.linea === ln).length
                      return (
                        <button
                          key={ln}
                          onClick={() => setLinea(ln)}
                          className={`px-3 py-1.5 text-sm font-semibold whitespace-nowrap snap-center transition
                            ${
                              linea === ln
                                ? 'bg-orange-500 text-white'
                                : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                          {ln} <span className="text-xs opacity-70">({count})</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : null,
            )}

          {/* Render de la subcategoría seleccionada */}
          {categoriaActual?.subcategorias
            .filter((s) => s.nombre === sub)
            .map((s) => {
              const alerta = ALERTAS[s.nombre.toUpperCase() as keyof typeof ALERTAS] || null
              const productosFiltradosLinea = linea
                ? s.productos.filter((p) => p.linea === linea)
                : s.productos

              if (s.nombre.toLowerCase().includes('seminuevo')) {
                return (
                  <ProductosSeminuevos
                    key={s.nombre}
                    productos={productosFiltradosLinea}
                    alerta={alerta}
                  />
                )
              }

              if (categoriaActual?.nombre.toLowerCase().includes('accesorio')) {
                return (
                  <ProductosAccesorios
                    key={s.nombre}
                    productos={productosFiltradosLinea}
                    alerta={alerta}
                  />
                )
              }

              return (
                <ProductosGenericos
                  key={s.nombre}
                  productos={productosFiltradosLinea}
                  alerta={alerta}
                />
              )
            })}
        </>
      )}
    </div>
  )
}
