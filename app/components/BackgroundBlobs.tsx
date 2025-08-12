// app/components/BackgroundBlobs.tsx
export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Blob en el centro */}
      <svg
        className="
          absolute top-2/3 left-1/2 -translate-x-1/2
          w-[1000px] h-[1000px]   /* tamaño base (mobile) */
          md:w-[3000px] md:h-[3000px] /* tamaño en desktop */
          opacity-15 blur-3xl
        "
        viewBox="0 0 800 800"
        preserveAspectRatio="none" // ⬅️ clave para permitir deformación
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#8B5CF6"
          d="M400,0C500,0,600,100,600,200C600,300,500,400,400,400C300,400,200,300,200,200C200,100,300,0,400,0Z"
        />
      </svg>
    </div>
  )
}
