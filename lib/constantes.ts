export type CategoriaConAlerta = 'MACBOOK' | 'IPHONE' | 'SAMSUNG GALAXY' | 'IPHONE SEMINUEVOS'

export const ALERTAS: Record<CategoriaConAlerta, string> = {
  MACBOOK:
    'Consultanos por versiones custom (Chip MAX, +RAM, etc). También traemos iMac, Mac mini, Mac Studio',
  IPHONE: '¡Con la compra de un iPhone + U$30, llevate un cargador 20W Apple ORIGINAL!',
  'SAMSUNG GALAXY':
    'Por otros productos de la marca (Linea Z, Samsung Tab, etc) consultanos por WhatsApp',
  'IPHONE SEMINUEVOS':
    'Todos los equipos fueron testeados y nunca reparados (piezas originales). Garantía escrita de 30 días por fallas.',
}
