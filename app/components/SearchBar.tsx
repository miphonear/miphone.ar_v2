'use client'
import { Search, X } from 'lucide-react'
import { useRef } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Buscar productos',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative max-w-lg mx-auto">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="w-5 h-5" />
      </span>
      <input
        ref={inputRef}
        type="text"
        className="w-full pl-10 pr-10 py-2 rounded-full ring-2 ring-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  )
}
