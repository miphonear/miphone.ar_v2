import { ALERTAS } from '@/lib/constantes'
import ProductosAccesorios from './ProductosAccesorios'
import ProductosGenerico from './ProductosGenerico'
import ProductosSeminuevos from './ProductosSeminuevos'

interface Props {
  nombre: string
  headers: string[]
  productos: string[][]
  open?: boolean
}

export default function Productos({ nombre, headers, productos, open = false }: Props) {
  const n = nombre.toLowerCase()
  const alerta = ALERTAS[nombre.toUpperCase()] || null

  // ACCESORIOS
  if (n.includes('accesorio')) {
    return (
      <ProductosAccesorios
        nombre={nombre}
        headers={headers}
        productos={productos}
        alerta={alerta}
        open={open}
      />
    )
  }
  // SEMINUEVOS
  if (n.includes('seminuevo') || n.includes('usado')) {
    return (
      <ProductosSeminuevos
        nombre={nombre}
        headers={headers}
        productos={productos}
        alerta={alerta}
        open={open}
      />
    )
  }
  // GENERICO
  return (
    <ProductosGenerico
      nombre={nombre}
      headers={headers}
      productos={productos}
      alerta={alerta}
      open={open}
    />
  )
}
