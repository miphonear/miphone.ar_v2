import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 150)
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      aria-label="Subir al inicio"
      onClick={handleClick}
      className={`
  fixed z-50 right-4 bottom-20
  p-4 rounded-full shadow bg-white border
  hover:bg-orange-500 hover:text-white transition
  hidden sm:inline-flex  // Solo visible en >=640px
  ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
`}
      style={{ minWidth: 44, minHeight: 44 }}
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  )
}
