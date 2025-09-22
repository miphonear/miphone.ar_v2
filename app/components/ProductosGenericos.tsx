// C:/Users/Guido/Desktop/miphone - copia/app/components/ProductosGenericos.tsx
'use client'
import Alert from '@ui/Alert'
import type { Producto } from '@/app/types/Producto'
import { useMemo } from 'react'
import ProductModelCard from './ProductModelCard' // Nuevo componente

// SECCIÓN: INTERFACES Y TIPOS
interface Props {
  productos: Producto[]
  alerta?: string
}

// SECCIÓN: COMPONENTE PRINCIPAL
export default function ProductosGenericos({ productos, alerta }: Props) {
  // SECCIÓN: FILTRADO Y AGRUPACIÓN
  // Filtrar productos visibles (memoizado para optimización)
  const visibles = useMemo(
    () => productos.filter((p) => p.ocultar?.toLowerCase() !== 'x'),
    [productos],
  )

  // Agrupación de productos memoizada para que solo se recalcule si 'visibles' cambia
  const agrupadosPorModelo = useMemo(() => {
    const agrupados: Record<string, Producto[]> = {}
    visibles.forEach((p) => {
      const modelo = p.modelo?.trim() || '-'
      if (!agrupados[modelo]) agrupados[modelo] = []
      agrupados[modelo].push(p)
    })
    return Object.entries(agrupados)
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
        {agrupadosPorModelo.map(([modelo, variantes], i) => (
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
