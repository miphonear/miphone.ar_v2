'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

// SECCIÓN: IMPORTS DE COMPONENTES GLOBALES
import AnnouncementBar from './AnnouncementBar'
import Nav from './Nav'
import Header from './Header'
import Contenido from './Contenido'
import GoogleReviews from './GoogleReviews'
import BrandsCarousel from './BrandsCarousel'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton'
import WhatsAppFloat from './WhatsAppFloat'
import BackgroundBlobs from './BackgroundBlobs'

// SECCIÓN: COMPONENTE PRINCIPAL
export default function PageClient() {
  // SECCIÓN: HOOKS DE NAVEGACIÓN
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // --- ¡AQUÍ ESTÁ EL CAMBIO PRINCIPAL! ---
  // No más useState para la query. La derivamos directamente de la URL.
  // La URL es ahora la única fuente de verdad.
  const query = searchParams.get('q') || ''

  // Esta función AHORA solo se encarga de actualizar la URL.
  // El componente se re-renderizará automáticamente cuando la URL cambie.
  const handleSearch = useCallback(
    (newQuery: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (newQuery) {
        params.set('q', newQuery)
      } else {
        params.delete('q')
      }
      // Usamos replace para no ensuciar el historial del navegador
      router.replace(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  // SECCIÓN: RENDERIZADO PRINCIPAL
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Fondo global */}
      <BackgroundBlobs />

      {/* Header fijo arriba */}
      <AnnouncementBar />
      <Nav />
      {/* El Header recibe la query derivada de la URL y la función para actualizarla */}
      <Header initialValue={query} onSearch={handleSearch} />

      {/* Main crece y empuja el footer hacia abajo */}
      <main className="flex-grow px-2 relative z-10">
        {/* Contenido principal */}
        <section>
          <div className="flex flex-col items-center justify-center mt-6 mb-12">
            <span className="text-3xl mb-2">✨</span>
            <h2 className="relative inline-block text-xl md:text-2xl font-bold text-gray-800 pb-2">
              Explorá nuestro catálogo
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 
                 bg-gradient-to-r from-orange-400 to-violet-500 rounded-full"
              ></span>
            </h2>
          </div>
          {/* Contenido recibe la query derivada de la URL */}
          <Contenido query={query} />
        </section>

        {/* Google Reviews */}
        <section>
          <GoogleReviews />
        </section>

        {/* Carousel de marcas */}
        <section>
          <BrandsCarousel onSearch={handleSearch} />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Botones flotantes */}
      <ScrollToTopButton />
      <WhatsAppFloat />
    </div>
  )
}
