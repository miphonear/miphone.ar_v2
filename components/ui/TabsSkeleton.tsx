// app/components/ui/TabsSkeleton.tsx

// Componente para una única tarjeta de esqueleto
function SkeletonCard() {
  return (
    <div
      className="flex flex-col items-center justify-center 
                 w-[120px] h-[120px] md:w-[160px] md:h-[160px] 
                 flex-shrink-0 rounded-2xl bg-gray-200"
    >
      {/* Círculo para el ícono */}
      <div className="w-12 h-12 mb-3 bg-gray-300 rounded-full"></div>
      {/* Barra para el texto */}
      <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
    </div>
  )
}

// Componente principal del esqueleto
export default function TabsSkeleton() {
  return (
    <div className="relative flex items-center">
      <div
        className="flex w-full justify-center gap-4 md:gap-10 overflow-x-hidden no-scrollbar px-2 md:px-6 py-6 
                   animate-pulse" // <-- Añadimos justify-center
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  )
}
