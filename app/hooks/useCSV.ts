'use client'
import Papa, { ParseResult } from 'papaparse'
import { useEffect, useState } from 'react'
import type { Producto } from '../types/Producto'

// SECCIÓN: HOOK PRINCIPAL
// Hook para cargar y parsear CSV desde una URL, con manejo de loading/error y normalización de datos.
export function useCSV(url: string) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // SECCIÓN: EFECTO PARA FETCH Y PARSEO
  useEffect(() => {
    setLoading(true)
    setError(null)

    Papa.parse<Record<string, string>>(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data, errors }: ParseResult<Record<string, string>>) => {
        if (errors.length > 0) {
          console.error(errors) // Log para developers
          setError(
            '🔄 ¡Ups! Hubo un problema al leer el catálogo de productos. Intenta refrescar la página.',
          ) // Mensaje amigable (error al parsear CSV)
          /* El archivo no tiene el formato esperado (ej: columnas mal formateadas).
          Hay caracteres inválidos o encoding roto.
          El archivo está vacío o corrupto.
          Hay filas con estructura inconsistente que Papaparse no puede mapear. */
        } else {
          const normalizados: Producto[] = data
            .map((row) => {
              const categoria = row['Categoria']?.trim()
              const subcategoria = row['Subcategoria']?.trim()
              const modelo = row['Modelo']?.trim()

              // Ignorar filas vacías
              if (!categoria && !subcategoria && !modelo) return null

              // Ignorar filas que son encabezados repetidos
              if (
                categoria?.toUpperCase() === 'CATEGORIA' &&
                subcategoria?.toUpperCase() === 'SUBCATEGORIA'
              ) {
                return null
              }

              return {
                categoria: categoria ? categoria.toUpperCase() : '', // Normalización a mayúsculas
                subcategoria: subcategoria ? subcategoria.toUpperCase() : '', // Normalización a mayúsculas
                linea: row['Linea']?.trim().toUpperCase() || '', // Normalización a mayúsculas
                modelo: modelo || '',
                precio: row['Precio']?.trim() || '',
                ocultar: row['Ocultar']?.trim() || '',
                version: row['Version']?.trim() || '',
                specs: row['Specs']?.trim() || '',
                label: row['Label']?.trim() || '',
                capacidad: row['Capacidad']?.trim() || '',
                condicion: row['Condicion']?.trim() || '',
                color: row['Color']?.trim() || '',
                bateria: row['Bateria']?.trim() || '',
                fotos: row['Fotos']?.trim() || '',
                avatar: row['Avatar']?.trim() || '',
              }
            })
            .filter((p): p is Producto => p !== null) // Type guarding para eliminar nulls

          setProductos(normalizados)
        }
        setLoading(false)
      },
      error: () => {
        setError(
          '📶 ¡Ups! No pudimos descargar el catálogo de productos. Verifica tu conexión e intenta de nuevo.',
        ) // Mensaje amigable (error al descargar el archivo CSV)
        /* La URL está mal escrita o no existe.
        El servidor de Google Sheets (o donde esté el CSV) no responde.
        Problemas de red del usuario (sin internet, conexión caída).
        CORS bloquea la petición. */
        setLoading(false)
      },
    })
  }, [url])

  return { productos, loading, error }
}
