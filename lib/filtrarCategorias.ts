// lib/filtrarCategorias.ts
import { Producto } from '@/app/types/Producto'
import { clean } from './clean'

// SECCIÓN: TIPOS (ajusta según tu app)
interface Categoria {
  nombre: string
  subcategorias: { nombre: string; productos: Producto[]; lineas: string[] }[]
}

// SECCIÓN: FUNCIÓN PRINCIPAL
// Filtra categorías basadas en una query, buscando en múltiples campos de Producto (categoria, subcategoria, linea, modelo, version, label, etc.).
export function filtrarCategorias(categorias: Categoria[], query: string) {
  if (!query.trim()) return categorias

  const words = clean(query).split(' ').filter(Boolean)

  return categorias
    .map((cat) => {
      const subcategoriasFiltradas = cat.subcategorias
        .map((sub) => {
          const productosFiltrados = sub.productos.filter((p) => {
            const campos = [
              clean(cat.nombre),
              clean(sub.nombre),
              clean(p.linea || ''),
              clean(p.modelo || ''),
              clean(p.version || ''),
              clean(p.label || ''),
              clean(p.capacidad || ''),
              clean(p.color || ''),
              // Agrega más campos si es necesario (ej: clean(p.marca || ''), clean(p.tipo || ''))
            ]
            return words.every((word) => campos.some((campo) => campo.includes(word)))
          })

          if (productosFiltrados.length > 0) {
            return {
              ...sub,
              productos: productosFiltrados,
              lineas: Array.from(new Set(productosFiltrados.map((p) => p.linea))).filter(Boolean),
            }
          }
          return null
        })
        .filter((sub): sub is NonNullable<typeof sub> => sub !== null)

      if (subcategoriasFiltradas.length > 0) {
        return { ...cat, subcategorias: subcategoriasFiltradas }
      }
      return null
    })
    .filter((cat): cat is Categoria => cat !== null) // Type guarding final
}
