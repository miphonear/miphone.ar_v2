'use client'
import { Percent, Sparkles } from 'lucide-react'
import { useMemo, useState, useEffect } from 'react'
import { useCategorias } from '../hooks/useCategorias'
import { useDebounce } from '../hooks/useDebounce'
import Productos from './Productos'
import SearchBar from './SearchBar'
import OpinionesGoogle from './OpinionesGoogle'
import { filtrarCategorias } from '@/lib/filtrarCategorias'

interface ContenidoProps {
  query: string
  setQuery: (value: string) => void
}

interface SuggestionButtonProps {
  icon: React.ElementType
  label: string
  color: 'red' | 'blue'
  onClick: () => void
}

function SuggestionButton({ icon: Icon, label, color, onClick }: SuggestionButtonProps) {
  const colorClasses =
    color === 'red'
      ? 'bg-red-100 text-red-700 ring-red-300 hover:bg-red-200 focus:ring-red-400'
      : 'bg-blue-100 text-blue-700 ring-blue-300 hover:bg-blue-200 focus:ring-blue-400'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Buscar ${label.toLowerCase()}`}
      className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-full font-bold text-xs ring-1 active:scale-95 transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 ${colorClasses}`}
    >
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </button>
  )
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
      setTimeout(() => setShowMain(true), 50) // SearchBar + botones
      setTimeout(() => setShowAcordeones(true), 200) // Acordeones + OpinionesGoogle
    }
  }, [loading])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <span
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-t-transparent"
          role="status"
          aria-label="Cargando"
        ></span>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4">
      {/* SearchBar + botones sugeridos */}
      <div
        className={`transition-all duration-500 ease-out ${
          showMain ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="mb-4">
          <SearchBar
            value={query}
            onChange={setQuery}
            onClear={() => setQuery('')}
            placeholder="Buscar productos"
          />
        </div>

        <div className="flex justify-center gap-2 w-full mb-6">
          <SuggestionButton
            icon={Percent}
            label="OFERTAS"
            color="red"
            onClick={() => setQuery('SALE')}
          />
          <SuggestionButton
            icon={Sparkles}
            label="NUEVOS"
            color="blue"
            onClick={() => setQuery('NEW')}
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

      {/* Opiniones Google: aparece después de los acordeones */}
      <div
        className={`mt-8 transition-all duration-500 ease-out ${
          showAcordeones ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{
          transitionDelay: `${categoriasFiltradas.length * 0.1 + 0.2}s`,
        }}
      >
        <OpinionesGoogle />
      </div>
    </div>
  )
}
