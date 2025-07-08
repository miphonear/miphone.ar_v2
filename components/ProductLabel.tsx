// components/ProductLabel.tsx
'use client'
interface ProductLabelProps {
  value: string
}

export default function ProductLabel({ value }: ProductLabelProps) {
  const upper = value.trim().toUpperCase()
  const baseClass =
    'inline-flex items-center rounded-md font-semibold px-1 text-[10px] sm:gap-0.5 sm:px-1.5 sm:text-2xs'

  if (upper === 'SALE') {
    return (
      <span className={`${baseClass} bg-red-100 text-red-800`}>
        <span role="img" aria-label="Oferta">
          🔥
        </span>
        {/* Desktop */}
        <span className="hidden sm:inline">&nbsp;¡OFERTA!</span>
        {/* Mobile */}
        <span className="inline sm:hidden">&nbsp;SALE!</span>
      </span>
    )
  }
  if (upper === 'NEW') {
    return (
      <span className={`${baseClass} bg-blue-100 text-blue-700`}>
        <span role="img" aria-label="Nuevo">
          ✈️
        </span>
        {/* Desktop */}
        <span className="hidden sm:inline">&nbsp;¡NUEVO!</span>
        {/* Mobile */}
        <span className="inline sm:hidden">&nbsp;NEW!</span>
      </span>
    )
  }
  return <span className={`${baseClass} bg-gray-100 text-gray-800`}>{value}</span>
}
