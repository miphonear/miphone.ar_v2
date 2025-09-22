'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'

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
  // SECCIÓN: ESTADOS Y HOOKS DE NAVEGACIÓN
  // Este estado ahora guarda el valor FINAL y DEBOUNCED de la búsqueda.
  const [query, setQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Sincroniza el estado con la URL solo en la carga inicial de la página.
  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
  }, [searchParams]) // Se ejecuta solo cuando los parámetros de la URL cambian.

  // Función que recibe el valor FINAL y DEBOUNCED desde SearchBar.
  const handleSearch = useCallback(
    (finalQuery: string) => {
      setQuery(finalQuery)
      const url = finalQuery ? `${pathname}?q=${encodeURIComponent(finalQuery)}` : pathname
      router.replace(url)
    },
    [pathname, router],
  )

  // SECCIÓN: RENDERIZADO PRINCIPAL
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Fondo global */}
      <BackgroundBlobs />

      {/* Header fijo arriba */}
      <AnnouncementBar />
      <Nav />
      <Header initialValue={query} onSearch={handleSearch} />

      {/* Main crece y empuja el footer hacia abajo */}
      <main className="flex-grow px-2 relative z-10">
        {/* Contenido principal */}
        <section>
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
