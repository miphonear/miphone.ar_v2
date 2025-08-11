// app/hooks/useDebounce.ts
import { useState, useEffect } from 'react'

/**
 * Hook para "debouncear" un valor (Uso: Delay en SearchBar).
 * Devuelve el valor solo después de que haya pasado el delay sin cambios.
 *
 * @param value - Valor a debouncear
 * @param delay - Tiempo de espera en ms (default: 500 - para cambiarlo en: Contenido.tsx, no en este hook.)
 * @returns Valor debounceado
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const safeDelay = delay < 0 ? 0 : delay

    const handler = setTimeout(() => {
      setDebounced(value)
    }, safeDelay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounced
}
