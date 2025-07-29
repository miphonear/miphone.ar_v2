// app/hooks/useCategorias.ts
'use client'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'

type Categoria = {
  nombre: string
  headers: string[]
  productos: string[][]
}

// Procesa las filas del CSV en categorías, headers y productos
function procesarCategorias(rows: string[][]): Categoria[] {
  const categorias: Categoria[] = []
  let nombre: string | null = null,
    headers: string[] = [],
    productos: string[][] = [],
    esperando = false

  rows.forEach((raw) => {
    // Limpia cada celda
    const fila = raw.map((c) => (c || '').trim())
    const filled = fila.filter(Boolean)

    // Detecta nombre de categoría (una celda, mayúsculas)
    if (filled.length === 1 && filled[0] === fila[0] && filled[0] === filled[0].toUpperCase()) {
      if (nombre && headers.length && productos.length) {
        categorias.push({ nombre, headers, productos })
      }
      nombre = filled[0]
      headers = []
      productos = []
      esperando = true
    }
    // Detecta headers (primera fila después del nombre)
    else if (esperando) {
      headers = fila.map((h) => h.trim())
      esperando = false
    }
    // Agrega productos (filas con datos, igual o más columnas que headers)
    else if (headers.length && filled.length) {
      if (fila.length >= headers.length) {
        productos.push(fila)
      }
    }
  })

  // Agrega la última categoría si corresponde
  if (nombre && headers.length && productos.length) {
    categorias.push({ nombre, headers, productos })
  }
  return categorias
}

export function useCategorias(url: string) {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Papa.parse<string[]>(url, {
      download: true,
      header: false,
      skipEmptyLines: true,
      complete: ({ data, errors }) => {
        if (errors && errors.length > 0) {
          setError('Error al parsear el CSV')
          setLoading(false)
          return
        }
        try {
          setCategorias(procesarCategorias(data as string[][]))
        } catch {
          setError('Error al procesar los datos')
        }
        setLoading(false)
      },
      error: () => {
        setError('Error al descargar el archivo CSV')
        setLoading(false)
      },
    })
  }, [url])

  return { categorias, loading, error }
}
