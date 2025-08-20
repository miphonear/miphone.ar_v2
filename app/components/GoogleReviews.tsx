// app/components/GoogleReviews.tsx
'use client'

export default function GoogleReviews() {
  return (
    <section className="mt-36">
      <div className="max-w-xl md:max-w-5xl mx-auto px-2 md:px-4">
        <h2 className="text-xl md:text-2xl text-gray-800 font-bold mb-4 text-center text-primary">
          ¿Qué opinan nuestros clientes?
        </h2>
        <div className="w-full h-[500px]">
          <iframe
            src="https://widgets.commoninja.com/iframe/a6472b8d-55bc-479a-8c9c-ed8f29426be0"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="auto"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
