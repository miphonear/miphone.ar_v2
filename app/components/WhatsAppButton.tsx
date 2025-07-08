interface Props {
  mensaje: string
  className?: string
}

export default function WhatsAppButton({ mensaje, className }: Props) {
  return (
    <a
      href={`https://wa.me/5491127737463?text=${encodeURIComponent(mensaje)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-[#25d366] font-semibold text-xs ring-2 ring-[#25d366] rounded-lg px-2 py-1 hover:bg-green-50 focus:outline-none focus:ring-4 focus:ring-[#25d366]/40 transition ${
        className || ''
      }`}
    >
      Consultar
    </a>
  )
}
