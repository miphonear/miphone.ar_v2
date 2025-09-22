// app/hooks/useDebounce.ts
import { useState, useEffect } from 'react'

/**
 * Hook para "debouncear" un valor (retrasar su actualización).
 * Devuelve el valor solo después de que haya pasado el delay sin que el valor original cambie.
 * Es ideal para optimizar búsquedas, evitando ejecutar filtros en cada pulsación de tecla.
 *
 * @param value - El valor que se quiere debouncear (ej: el texto de un input).
 * @param delay - El tiempo de espera en milisegundos (default: 500ms, cambiar en contenido.tsx no en este hook).
 * @returns El valor ya debounceado.
 */
export function useDebounce<T>(value: T, delay = 500): T {
  // SECCIÓN: ESTADO INTERNO
  // Estado que almacena el valor final después del retraso.
  const [debounced, setDebounced] = useState<T>(value)

  // SECCIÓN: LÓGICA DEL DEBOUNCE
  useEffect(() => {
    // Asegura que el delay no sea negativo.
    const safeDelay = delay < 0 ? 0 : delay

    // Inicia un temporizador. Cuando termine, actualizará el estado.
    const handler = setTimeout(() => {
      setDebounced(value)
    }, safeDelay)

    // Función de limpieza: se ejecuta cada vez que 'value' o 'delay' cambian.
    // La magia del debounce: cancela el temporizador anterior antes de crear uno nuevo.
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // Solo se re-ejecuta si el valor o el delay cambian.

  // Devuelve el último valor estable.
  return debounced
}
