'use client'
import Alert from '@ui/Alert'
import type { Producto } from '@/app/types/Producto'
import { useMemo } from 'react'
import ProductModelCard from './ProductModelCard'
import AccesoriosAlertCard from './AccesoriosAlertCard'
import { SUBCATEGORIAS_CON_ALERTA_ACCESORIOS } from '@/lib/constantes'

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

  // --- LÓGICA MODIFICADA PARA USAR LA LISTA DE SUBCATEGORÍAS ---
  const shouldShowAccesoriosAlert = useMemo(() => {
    // Si no hay productos visibles, no mostrar la alerta.
    if (visibles.length === 0) return false

    // Obtenemos la subcategoría del primer producto (todos tienen la misma en esta vista).
    const subcategoriaActual = visibles[0]?.subcategoria?.toUpperCase()

    // Solo mostramos la alerta si la subcategoría actual ESTÁ en nuestra lista de constantes.
    return SUBCATEGORIAS_CON_ALERTA_ACCESORIOS.includes(subcategoriaActual)
  }, [visibles])

  // SECCIÓN: AGRUPACIÓN POR MODELO (PRESERVANDO EL ORDEN DEL CSV)
  const agrupadosPorModelo = useMemo(() => {
    // Usamos un array para mantener el orden de aparición de los modelos.
    const agrupados: {
      modelo: string
      variantes: Producto[]
      avatarUrl?: string
    }[] = []
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
        // Buscamos la primera variante que tenga una URL en "AVATAR"
        const avatarUrl = variantesParaEsteModelo.find(
          (v) => v.avatar && v.avatar.trim() !== '',
        )?.avatar
        agrupados.push({
          modelo,
          variantes: variantesParaEsteModelo,
          avatarUrl,
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
        {agrupadosPorModelo.map(({ modelo, variantes, avatarUrl }, i) => (
          <ProductModelCard
            key={modelo}
            modelo={modelo}
            variantes={variantes}
            avatar={avatarUrl}
            animationDelay={`${i * 150}ms`}
          />
        ))}
      </div>

      {/* Render condicional de la tarjeta CTA de Accesorios */}
      {shouldShowAccesoriosAlert && <AccesoriosAlertCard />}
    </div>
  )
}
