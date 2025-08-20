'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AnnouncementBar from './AnnouncementBar'
import BrandsCarousel from './BrandsCarousel'
import Contenido from './Contenido'
import Footer from './Footer'
import Header from './Header'
import Nav from './Nav'
import ScrollToTopButton from './ScrollToTopButton'
import WhatsAppFloat from './WhatsAppFloat'
import BackgroundBlobs from './BackgroundBlobs'

export default function PageClient() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
  }, [searchParams])

  function handleSearch(newQuery: string) {
    setQuery(newQuery)
    if (newQuery && newQuery.length > 0) {
      router.replace(`${pathname}?q=${encodeURIComponent(newQuery)}`)
    } else {
      router.replace(pathname)
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Fondo global */}
      <BackgroundBlobs />

      {/* Header fijo arriba */}
      <AnnouncementBar />
      <Nav />
      <Header />

      {/* Main crece y empuja el footer hacia abajo */}
      <main className="flex-grow pt-4 px-4 md:px-8 relative z-10">
        <BrandsCarousel onSearch={handleSearch} />
        <section className="mt-12">
          <Contenido query={query} setQuery={handleSearch} />
        </section>
      </main>

      {/* Footer siempre abajo */}
      <Footer />

      {/* Botones flotantes */}
      <ScrollToTopButton />
      <WhatsAppFloat />
    </div>
  )
}
