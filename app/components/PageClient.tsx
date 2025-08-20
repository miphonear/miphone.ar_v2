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

  function handleSearch(newQuery) {
    setQuery(newQuery)
    if (newQuery && newQuery.length > 0) {
      router.replace(`${pathname}?q=${encodeURIComponent(newQuery)}`)
    } else {
      router.replace(pathname)
    }
  }

  return (
    <div className="relative">
      {/* Fondo global */}
      <BackgroundBlobs />
      <AnnouncementBar />
      <Nav />
      <Header />
      <main className="pt-4 px-4 md:px-8 relative z-10">
        <BrandsCarousel onSearch={handleSearch} />
        <section className="mt-12">
          <Contenido query={query} setQuery={handleSearch} />
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
      <WhatsAppFloat />
    </div>
  )
}
