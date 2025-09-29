// app/components/GoogleReviews.tsx
'use client'

export default function GoogleReviews() {
  return (
    <section className="mt-16">
      <div className="flex w-full items-center justify-center gap-2 mb-6">
        <span className="text-2xl">🤝</span>
        <h2 className="text-xl md:text-2xl text-gray-800 font-bold text-primary text-center">
          <span className="sm:hidden">Nuestros clientes</span>
          <span className="hidden sm:inline">¿Qué opinan nuestros clientes?</span>
        </h2>
      </div>
      {/* Contenedor */}
      <div className="w-full h-[500px]">
        <iframe
          // Agregado: loading="lazy" para mejorar la performance
          loading="lazy"
          title="Reseñas de nuestros clientes en Google"
          src="https://widgets.commoninja.com/iframe/a6472b8d-55bc-479a-8c9c-ed8f29426be0"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="auto"
        ></iframe>
      </div>
    </section>
  )
}
