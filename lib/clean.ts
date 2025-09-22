// app/lib/clean.ts

// SECCIÓN: FUNCIÓN PRINCIPAL
// Limpia un string para búsquedas o comparaciones: minúsculas, sin acentos, solo alfanuméricos con espacios simples, trim.
export function clean(str: string = ''): string {
  // Manejo de input inválido (ej: undefined/null → return vacío)
  if (typeof str !== 'string') return ''

  return str
    .toLowerCase() // Convertir a minúsculas para case-insensitive
    .normalize('NFD') // Normalizar para separar acentos/diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos (acentos)
    .replace(/[^a-z0-9]+/g, ' ') // Reemplazar no-alfanuméricos por espacio (quitado 'i' ya que es minúsculas)
    .replace(/\s+/g, ' ') // Colapsar múltiples espacios en uno solo
    .trim() // Remover espacios al inicio y final
}
