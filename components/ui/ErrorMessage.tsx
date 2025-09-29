// app/components/ui/ErrorMessage.tsx
'use client'

interface ErrorMessageProps {
  children: string // Recibe el string del error
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  // --- Lógica para separar el emoji del texto ---
  // Los emojis pueden ocupar más de un carácter, así que tomamos los 2 primeros por seguridad.
  const emoji = children.substring(0, 2)
  const text = children.substring(2).trim() // El resto del texto

  return (
    <div className="flex flex-col items-center justify-center text-center text-red-500 py-12">
      <span className="text-6xl mb-4">{emoji}</span>
      <p className="text-red-600">{text}</p>
    </div>
  )
}
