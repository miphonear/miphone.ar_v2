'use client'
import { Search, X, Tag, Sparkles } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { useDebounce } from '@/app/hooks/useDebounce'

// SECCIÓN: INTERFACES Y TIPOS
interface Props {
  initialValue?: string
  onSearch: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
}

// SECCIÓN: COMPONENTE INTERNO PARA BOTONES SUGERIDOS
function SuggestionButtons({ onShortcut }: { onShortcut: (s: string) => void }) {
  return (
    <div className="flex flex-wrap justify-start gap-2">
      <button
        type="button"
        onClick={() => onShortcut('SALE')}
        className="flex items-center gap-2 px-2.5 py-1.5 text-sm font-semibold rounded-xl
                   bg-orange-100 text-orange-700 hover:bg-orange-200 
                   transition-colors duration-150"
      >
        <Tag className="w-4 h-4" />
        Ofertas
      </button>
      <button
        type="button"
        onClick={() => onShortcut('NEW')}
        className="flex items-center gap-2 px-2.5 py-1.5 text-sm font-semibold rounded-xl
                   bg-violet-100 text-violet-700 hover:bg-violet-200 
                   transition-colors duration-150"
      >
        <Sparkles className="w-4 h-4" />
        Nuevos
      </button>
    </div>
  )
}

// SECCIÓN: COMPONENTE PRINCIPAL
export default function SearchBar({
  initialValue = '',
  onSearch,
  placeholder = 'Buscar productos',
  autoFocus = false,
}: Props) {
  const [inputValue, setInputValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedValue = useDebounce(inputValue, 500)

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  useEffect(() => {
    setInputValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && inputValue) {
      setInputValue('')
    }
  }

  const handleShortcut = (shortcut: string) => {
    setInputValue(shortcut)
    inputRef.current?.focus()
  }

  const handleClear = () => {
    setInputValue('')
    inputRef.current?.focus()
  }

  // SECCIÓN: RENDERIZADO
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Contenedor principal unificado */}
      <div
        className="flex flex-col rounded-3xl border-2 border-gray-200 bg-white/90
                   transition-all duration-200
                   focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20"
      >
        {/* Área del input */}
        <div className="relative">
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            <Search className="w-5 h-5" />
          </span>

          <input
            ref={inputRef}
            type="text"
            // Sin borde inferior para un look unificado
            className="w-full pl-12 pr-10 py-2.5 bg-transparent 
                       text-sm md:text-base text-gray-800 placeholder-gray-400 
                       focus:outline-none"
            placeholder={placeholder}
            aria-label={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {inputValue && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 hover:bg-orange-500 hover:text-white transition"
              onClick={handleClear}
              aria-label="Limpiar búsqueda"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Área de los botones sugeridos */}
        <div className="p-3 pt-4">
          <SuggestionButtons onShortcut={handleShortcut} />
        </div>
      </div>
    </div>
  )
}
