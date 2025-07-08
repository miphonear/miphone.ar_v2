// app/page.tsx
'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AnnouncementBar from './components/AnnouncementBar'
import BrandsCarousel from './components/BrandsCarousel'
import Contenido from './components/Contenido'
import Footer from './components/Footer'
import Header from './components/Header'
import Nav from './components/Nav'
import ScrollToTopButton from './components/ScrollToTopButton'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function Page() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Inicializa la búsqueda si hay ?q= al entrar/refrescar
  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
  }, [searchParams])

  // Actualiza query y la URL
  function handleSearch(newQuery) {
    setQuery(newQuery)
    // Cambia la URL sin recargar
    if (newQuery && newQuery.length > 0) {
      router.replace(`${pathname}?q=${encodeURIComponent(newQuery)}`)
    } else {
      router.replace(pathname)
    }
  }

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <Header />
      <main className="pt-4 px-4 md:px-8">
        <BrandsCarousel onSearch={handleSearch} />
        <section className="mt-12">
          <Contenido query={query} setQuery={handleSearch} />
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
      <WhatsAppFloat /> {/* <--- Botón flotante */}
    </>
  )
}
