// C:/Users/Guido/Desktop/miphone - copia/app/components/ProductosGenericos.tsx
'use client'
import Alert from '@ui/Alert'
import type { Producto } from '@/app/types/Producto'
import { useMemo } from 'react'
import ProductModelCard from './ProductModelCard'

// SECCIÓN: INTERFACES Y TIPOS
interface Props {
  productos: Producto[]
  alerta?: string
}

// SECCIÓN: COMPONENTE PRINCIPAL
export default function ProductosGenericos({ productos, alerta }: Props) {
  // SECCIÓN: FILTRADO
  const visibles = useMemo(
    () => productos.filter((p) => p.ocultar?.toLowerCase() !== 'x'),
    [productos],
  )

  // SECCIÓN: AGRUPACIÓN POR MODELO (PRESERVANDO EL ORDEN DEL CSV)
  const agrupadosPorModelo = useMemo(() => {
    // Usamos un array para mantener el orden de aparición de los modelos.
    const agrupados: { modelo: string; variantes: Producto[] }[] = []
    const modelosVistos = new Set<string>()

    visibles.forEach((p) => {
      const modelo = p.modelo?.trim() || '-'
      // Si es la primera vez que vemos este modelo, lo agregamos al array.
      if (!modelosVistos.has(modelo)) {
        modelosVistos.add(modelo)
        // Agrupamos todas las variantes de este modelo de una sola vez.
        const variantesParaEsteModelo = visibles.filter(
          (prod) => (prod.modelo?.trim() || '-') === modelo,
        )
        agrupados.push({
          modelo,
          variantes: variantesParaEsteModelo,
        })
      }
    })
    return agrupados
  }, [visibles])

  // SECCIÓN: RENDERIZADO PRINCIPAL
  return (
    <div className="space-y-4 mt-6">
      {/* Alerta contextual si existe */}
      {alerta && (
        <div className="max-w-3xl w-full mx-auto">
          <Alert>{alerta}</Alert>
        </div>
      )}

      {/* Render de productos a través del nuevo componente */}
      <div className="space-y-4">
        {agrupadosPorModelo.map(({ modelo, variantes }, i) => (
          <ProductModelCard
            key={modelo}
            modelo={modelo}
            variantes={variantes}
            animationDelay={`${i * 150}ms`}
          />
        ))}
      </div>
    </div>
  )
}
