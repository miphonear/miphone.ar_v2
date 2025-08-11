'use client'
import { X } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

// Configuración
const COTI_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ7PS8pvnCKdpLgJFonsZNN54Rs8oTpzGgCxhbfZzd3KmKb9k12OEwgAWuDAHiIPraWKxoS5TlCm4X/pub?gid=0&single=true&output=csv'
const COTI_KEY = 'cotiBlue'
const COTI_TTL = 15 * 60 * 1000 // 15 minutos

function getCachedCotizacion(): string | null {
  try {
    const raw = localStorage.getItem(COTI_KEY)
    if (!raw) return null
    const { value, time } = JSON.parse(raw)
    return Date.now() - time < COTI_TTL ? value : null
  } catch {
    // Ignorar errores de localStorage (ej: en modo incógnito)
    return null
  }
}

function setCachedCotizacion(value: string) {
  try {
    localStorage.setItem(COTI_KEY, JSON.stringify({ value, time: Date.now() }))
  } catch {
    // Ignorar errores de localStorage (ej: en modo incógnito)
  }
}

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  const [cotizacion, setCotizacion] = useState<string>('N/A')
  const [loading, setLoading] = useState(true)

  const fetchCotizacion = useCallback(async () => {
    const cached = getCachedCotizacion()
    if (cached) {
      setCotizacion(cached)
      setLoading(false)
      return
    }

    const controller = new AbortController()
    try {
      const res = await fetch(COTI_URL, { signal: controller.signal })
      const csv = await res.text()

      // Tomar la primera celda de la primera fila
      const firstCell = csv.trim().split('\n')[0]?.split(',')[0]?.replace(',', '.') || 'N/A'

      setCotizacion((prev) => {
        if (prev !== firstCell) {
          setCachedCotizacion(firstCell)
          return firstCell
        }
        return prev
      })
    } catch {
      setCotizacion('N/A')
    } finally {
      setLoading(false)
    }

    return () => controller.abort()
  }, [])

  useEffect(() => {
    fetchCotizacion()
  }, [fetchCotizacion])

  if (!visible) return null

  return (
    <div className="w-full bg-gray-100 text-gray-700 text-xs md:text-sm font-semibold py-1 px-4 flex items-center justify-center select-none relative">
      <span aria-live="polite" className="flex items-center gap-1">
        Dólar hoy:{' '}
        {loading ? (
          <span className="inline-block w-12 h-4 bg-gray-300 rounded animate-pulse" />
        ) : (
          <span className="font-bold">{cotizacion}</span>
        )}
      </span>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
        onClick={() => setVisible(false)}
        aria-label="Cerrar anuncio"
        type="button"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
