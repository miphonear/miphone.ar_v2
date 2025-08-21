'use client'
import { Dialog as HDialog, Transition } from '@headlessui/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { Fragment, useCallback, useEffect, useState } from 'react'

interface ModalFotosProps {
  open: boolean
  fotos: string[]
  onClose: () => void
}

export default function ModalFotos({ open, fotos, onClose }: ModalFotosProps) {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  // Reset al abrir/cerrar
  useEffect(() => {
    if (!open) setCurrent(0)
  }, [open])

  // Funciones memoizadas para evitar recreación
  const goPrev = useCallback(() => {
    setFade(false)
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? fotos.length - 1 : prev - 1))
      setFade(true)
    }, 150)
  }, [fotos.length])

  const goNext = useCallback(() => {
    setFade(false)
    setTimeout(() => {
      setCurrent((prev) => (prev === fotos.length - 1 ? 0 : prev + 1))
      setFade(true)
    }, 150)
  }, [fotos.length])

  // Navegación por teclado
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, goPrev, goNext, onClose])

  // Precarga de imágenes adyacentes
  useEffect(() => {
    if (fotos.length > 1) {
      const nextIndex = (current + 1) % fotos.length
      const prevIndex = (current - 1 + fotos.length) % fotos.length
      new window.Image().src = fotos[nextIndex]
      new window.Image().src = fotos[prevIndex]
    }
  }, [current, fotos])

  if (!fotos || fotos.length === 0) return null

  return (
    <Transition.Root show={open} as={Fragment}>
      <HDialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        {/* Dialog content */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <HDialog.Panel className="relative w-full max-w-md sm:max-w-lg rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-0">
              {/* Botón Cerrar */}
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-400 hover:text-orange-500 transition"
                onClick={onClose}
                aria-label="Cerrar"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Carrusel */}
              <div className="flex flex-col items-center px-4 py-8">
                <div className="flex flex-row items-center w-full justify-center gap-4">
                  {/* Botón izquierdo */}
                  {fotos.length > 1 && (
                    <button
                      onClick={goPrev}
                      aria-label="Anterior"
                      className="p-2 rounded-full bg-white border shadow hover:transition group z-10"
                    >
                      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 transition-colors group-hover:text-orange-500" />
                    </button>
                  )}
                  {/* Imagen con fade */}
                  <div className="flex items-center justify-center max-w-[95vw] max-h-[80vh]">
                    <Image
                      src={fotos[current]}
                      alt={`Foto ${current + 1}`}
                      width={800}
                      height={600}
                      className={`object-contain rounded transition-opacity duration-200 ${
                        fade ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={false}
                      sizes="95vw"
                    />
                  </div>

                  {/* Botón derecho */}
                  {fotos.length > 1 && (
                    <button
                      onClick={goNext}
                      aria-label="Siguiente"
                      className="p-2 rounded-full bg-white border shadow hover:transition group z-10"
                    >
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 transition-colors group-hover:text-orange-500" />
                    </button>
                  )}
                </div>

                {/* Indicador de foto */}
                <div className="w-full pt-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    Foto {current + 1} de {fotos.length}
                  </span>
                </div>
              </div>
            </HDialog.Panel>
          </Transition.Child>
        </div>
      </HDialog>
    </Transition.Root>
  )
}
