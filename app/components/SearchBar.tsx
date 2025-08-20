'use client'
import { Search, X, Tag, Sparkles } from 'lucide-react'
import { useRef, useEffect } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  placeholder?: string
  autoFocus?: boolean
}

// Botón sugerido
function SuggestionButton({
  icon: Icon,
  label,
  color,
  onClick,
}: {
  icon: React.ElementType
  label: string
  color: 'orange' | 'violet'
  onClick: () => void
}) {
  const colorClasses =
    color === 'orange'
      ? 'bg-orange-100 text-orange-700 ring-orange-300 hover:bg-orange-200 focus:ring-orange-400'
      : 'bg-violet-100 text-violet-700 ring-violet-300 hover:bg-violet-200 focus:ring-violet-400'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Buscar ${label.toLowerCase()}`}
      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-b-xl font-bold text-xs ring-1 active:scale-95 hover:scale-105 transition-all duration-150 focus:outline-none focus:ring-2 ${colorClasses}`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  )
}

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Buscar productos',
  autoFocus = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && value) {
      onClear()
      inputRef.current?.focus()
    }
  }

  const handleShortcut = (shortcut: string) => {
    onChange(shortcut)
    inputRef.current?.focus()
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Barra de búsqueda */}
      <div className="relative mb-2">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
          <Search className="w-5 h-5" />
        </span>

        <input
          ref={inputRef}
          type="text"
          className="w-full pl-10 pr-10 py-2 rounded-full ring-2 ring-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          placeholder={placeholder}
          aria-label={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {value && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
            onClick={() => {
              onClear()
              inputRef.current?.focus()
            }}
            aria-label="Limpiar búsqueda"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Botones sugeridos */}
      <div className="flex justify-center gap-2 mb-4">
        <SuggestionButton
          icon={Tag}
          label="OFERTAS"
          color="orange"
          onClick={() => handleShortcut('SALE')}
        />
        <SuggestionButton
          icon={Sparkles}
          label="NUEVOS"
          color="violet"
          onClick={() => handleShortcut('NEW')}
        />
      </div>
    </div>
  )
}
