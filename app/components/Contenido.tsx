'use client'
import { useMemo } from 'react'
import { useCategorias } from '../hooks/useCategorias'
import { useDebounce } from '../hooks/useDebounce'
import Productos from './Productos'
import SearchBar from './SearchBar'
import { Percent, Sparkles } from 'lucide-react'
import { filtrarCategorias } from '@/lib/filtrarCategorias'

interface ContenidoProps {
  query: string
  setQuery: (value: string) => void
}

export default function Contenido({ query, setQuery }: ContenidoProps) {
  const { categorias, loading } = useCategorias(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRr62BlKCzICpC0ctnU2mRB8cq_SOCcsgydXQJXD5pQvasO1b1iT0Wp_L7sFxH8UGJCepaMjng1GUO0/pub?gid=1610793698&single=true&output=csv',
  )
  const debouncedQuery = useDebounce(query, 300)

  // Filtrado separado
  const categoriasFiltradas = useMemo(
    () => filtrarCategorias(categorias, debouncedQuery),
    [categorias, debouncedQuery],
  )

  // Lógica abrir acordeones
  const openCategorias = useMemo(() => {
    if (!debouncedQuery.trim()) return []
    return categoriasFiltradas.map((cat) => cat.nombre)
  }, [categoriasFiltradas, debouncedQuery])

  if (loading)
    return (
      <div className="flex items-center justify-center py-24">
        <span
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-t-transparent align-[-0.125em]"
          role="status"
          aria-label="Cargando"
        ></span>
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4">
      <div className="mb-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
          placeholder="Buscar productos"
        />
      </div>
      <div className="flex justify-center gap-2 w-full mb-6">
        <button
          type="button"
          className="inline-flex items-center gap-0.5 px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs ring-1 ring-red-300 hover:bg-red-200 active:scale-95 transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-red/40 transition"
          onClick={() => setQuery('SALE')}
        >
          <Percent className="w-3 h-3" />
          <span>OFERTAS</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs ring-1 ring-blue-300 hover:bg-blue-200 active:scale-95 transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue/40 transition"
          onClick={() => setQuery('NEW')}
        >
          <Sparkles className="w-3 h-3" />
          <span>NUEVOS</span>
        </button>
      </div>
      {/* Resultados */}
      {categoriasFiltradas.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No se encontraron productos.
          <br />
          Consultar existencia por WhatsApp
        </div>
      )}
      {/* Acordeones */}
      <div className="space-y-3">
        {categoriasFiltradas.map((cat) => (
          <Productos
            key={cat.nombre}
            nombre={cat.nombre}
            headers={cat.headers}
            productos={cat.productos}
            open={openCategorias.includes(cat.nombre)}
          />
        ))}
      </div>
    </div>
  )
}
