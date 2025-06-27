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
      className={`inline-flex items-center gap-1 text-green-700 font-medium text-xs border border-green-300 rounded px-3 py-1 hover:bg-green-50 transition ${className || ""}`}
    >
      Consultar
    </a>
  );
}
