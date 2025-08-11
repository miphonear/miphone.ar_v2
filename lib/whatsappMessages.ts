import { GLOSARIO } from './glosario'

/**
 * Crea un mensaje de WhatsApp con formato correcto según la categoría.
 *
 * @param categoria - Nombre de la categoría
 * @param modelo - Modelo del producto (opcional, ej: iPhone 13)
 * @returns Mensaje listo para usar en WhatsAppButton
 */
export function crearMensajeWhatsApp(categoria: string, modelo?: string) {
  const pron = GLOSARIO[categoria.trim().toUpperCase()]

  if (!pron) {
    // Caso 1: la categoría NO está en el glosario o es "Seminuevos"
    return `¡Hola! Vi el ${categoria}${
      modelo ? ' ' + modelo : ''
    } en la web y me gustaría saber si está disponible.`
  }

  // Caso 2: la categoría SÍ está en el glosario
  return `¡Hola! Vi ${pron.art} ${categoria}${
    modelo ? ' ' + modelo : ''
  } en la web y me gustaría saber si ${pron.adj}.`
}
