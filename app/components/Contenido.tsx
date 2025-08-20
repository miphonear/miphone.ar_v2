'use client'
import { useMemo, useState, useEffect } from 'react'
import { useCategorias } from '../hooks/useCategorias'
import { useDebounce } from '../hooks/useDebounce'
import Productos from './Productos'
import SearchBar from './SearchBar'
import GoogleReviews from './GoogleReviews'
import { filtrarCategorias } from '@/lib/filtrarCategorias'

interface ContenidoProps {
  query: string
  setQuery: (value: string) => void
}

export default function Contenido({ query, setQuery }: ContenidoProps) {
  const { categorias, loading } = useCategorias(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRr62BlKCzICpC0ctnU2mRB8cq_SOCcsgydXQJXD5pQvasO1b1iT0Wp_L7sFxH8UGJCepaMjng1GUO0/pub?gid=1610793698&single=true&output=csv',
  )
  const debouncedQuery = useDebounce(query, 500)

  const categoriasFiltradas = useMemo(
    () => filtrarCategorias(categorias, debouncedQuery),
    [categorias, debouncedQuery],
  )

  const openCategorias = useMemo(() => {
    if (!debouncedQuery.trim()) return []
    return categoriasFiltradas.map((cat) => cat.nombre)
  }, [categoriasFiltradas, debouncedQuery])

  // Estados para animaciones
  const [showMain, setShowMain] = useState(false)
  const [showAcordeones, setShowAcordeones] = useState(false)

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setShowMain(true), 50) // SearchBar
      setTimeout(() => setShowAcordeones(true), 200) // Acordeones
    }
  }, [loading])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <span
          className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-orange-500 border-t-transparent"
          role="status"
          aria-label="Cargando"
        ></span>
      </div>
    )
  }

  return (
    <>
      {/* 👇 Bloque sigue limitado a 768px */}
      <div className="max-w-3xl mx-auto px-2 sm:px-4">
        {/* SearchBar con atajos integrados */}
        <div
          className={`transition-all duration-500 ease-out ${
            showMain ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="mb-6">
            <SearchBar
              value={query}
              onChange={setQuery}
              onClear={() => setQuery('')}
              placeholder="Buscar productos"
            />
          </div>
        </div>

        {/* Resultados vacíos */}
        {categoriasFiltradas.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No se encontraron productos.
            <br />
            Consultar existencia por WhatsApp
          </div>
        )}

        {/* Acordeones con entrada escalonada */}
        <div className="space-y-3">
          {categoriasFiltradas.map((cat, i) => (
            <div
              key={cat.nombre}
              className={`transition-all duration-500 ease-out ${
                showAcordeones ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{
                transitionDelay: `${i * 0.1}s`, // delay escalonado
              }}
            >
              <Productos
                nombre={cat.nombre}
                headers={cat.headers}
                productos={cat.productos}
                open={openCategorias.includes(cat.nombre)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 👇 Google Reviews fuera del max-w-3xl */}
      <GoogleReviews />
    </>
  )
}
