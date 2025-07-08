'use client'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

// Configuración
const COTI_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ7PS8pvnCKdpLgJFonsZNN54Rs8oTpzGgCxhbfZzd3KmKb9k12OEwgAWuDAHiIPraWKxoS5TlCm4X/pub?gid=0&single=true&output=csv'
const COTI_KEY = 'cotiBlue'
const COTI_TTL = 15 * 60 * 1000 // 15 minutos

function getCachedCotizacion() {
  try {
    const raw = localStorage.getItem(COTI_KEY)
    if (!raw) return null
    const { value, time } = JSON.parse(raw)
    return Date.now() - time < COTI_TTL ? value : null
  } catch {
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

  // Fetch cotización al montar el componente
  useEffect(() => {
    const cached = getCachedCotizacion()
    if (cached) {
      setCotizacion(cached)
      return
    }
    fetch(COTI_URL)
      .then((res) => res.text())
      .then((csv) => {
        // Solo primer celda
        const v = csv.trim().split('\n')[0]?.split(',')[0]?.replace(',', '.') || 'N/A'
        setCotizacion(v)
        setCachedCotizacion(v)
      })
      .catch(() => setCotizacion('N/A'))
  }, [])

  if (!visible) return null

  return (
    <div className="w-full bg-gray-100 text-gray-700 text-xs md:text-sm font-semibold py-1 px-4 flex items-center justify-center select-none relative">
      <span>
        {/* Anuncios */}
        Dólar hoy: <span className="font-bold">{cotizacion}</span>
      </span>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-600 transition"
        onClick={() => setVisible(false)}
        aria-label="Cerrar anuncio"
        type="button"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
