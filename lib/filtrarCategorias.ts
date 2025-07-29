import { clean } from './clean'

export function filtrarCategorias(
  categorias: {
    nombre: string
    headers: string[]
    productos: string[][]
  }[],
  query: string,
) {
  if (!query.trim()) return categorias

  const words = clean(query).split(' ').filter(Boolean)

  return categorias
    .map((cat) => {
      const idxModelo =
        cat.headers.findIndex((h) => clean(h).includes('modelo')) !== -1
          ? cat.headers.findIndex((h) => clean(h).includes('modelo'))
          : cat.headers.findIndex((h) => clean(h).includes('producto'))
      const idxVariante = idxModelo !== -1 ? idxModelo + 1 : -1
      const idxLabel = cat.headers.findIndex((h) => clean(h) === 'l')
      const idxMarca = cat.headers.findIndex((h) => clean(h) === 'marca')
      const idxTipo = cat.headers.findIndex((h) => clean(h) === 'tipo')
      const idxLinea = cat.headers.findIndex((h) => clean(h) === 'linea') // <--- AGREGADO

      // Agrupar por modelo
      const agrupados: Record<string, string[][]> = {}
      cat.productos.forEach((row) => {
        const modelo = idxModelo !== -1 ? row[idxModelo]?.trim() : '-'
        agrupados[modelo] = agrupados[modelo] || []
        agrupados[modelo].push(row)
      })

      // Filtrar en nombre de categoría, modelo, variante, label, marca, tipo y linea
      const modelosFiltrados = Object.entries(agrupados)
        .map(([modelo, variantes]) => {
          const variantesFiltradas = variantes.filter((row) => {
            const campos = [
              clean(cat.nombre),
              clean(modelo),
              idxVariante !== -1 && idxVariante < row.length ? clean(row[idxVariante] || '') : '',
              idxLabel !== -1 && idxLabel < row.length ? clean(row[idxLabel] || '') : '',
              idxMarca !== -1 && idxMarca < row.length ? clean(row[idxMarca] || '') : '',
              idxTipo !== -1 && idxTipo < row.length ? clean(row[idxTipo] || '') : '',
              idxLinea !== -1 && idxLinea < row.length ? clean(row[idxLinea] || '') : '', // <--- AGREGADO
            ]
            return words.every((word) => campos.some((campo) => campo.split(' ').includes(word)))
          })

          if (variantesFiltradas.length > 0) {
            return [modelo, variantesFiltradas] as [string, string[][]]
          }
          return null
        })
        .filter(Boolean) as [string, string[][]][]

      if (modelosFiltrados.length > 0) {
        const productosFiltrados = modelosFiltrados.flatMap(([, variantes]) => variantes)
        return { ...cat, productos: productosFiltrados }
      }
      return null
    })
    .filter(Boolean) as typeof categorias
}
