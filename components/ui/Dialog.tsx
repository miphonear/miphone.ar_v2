'use client'
import { Dialog as HDialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment, ReactNode, useRef } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

// Constante fuera del componente y clases simplificadas.
// w-full en el panel se encarga de las pantallas pequeñas.
const PANEL_SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export default function Dialog({ open, onClose, title, children, size = 'md' }: Props) {
  // Ref para el foco inicial (accesibilidad)
  const closeButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      {/* InitialFocus para mejorar la accesibilidad */}
      <HDialog as="div" className="relative z-50" onClose={onClose} initialFocus={closeButtonRef}>
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
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
            <HDialog.Panel
              className={`relative w-full ${PANEL_SIZES[size]} rounded-lg bg-white p-6 shadow-xl ring-1 ring-black/5`}
            >
              {/* Botón Cerrar */}
              <div className="absolute right-4 top-4">
                <button
                  ref={closeButtonRef} // Asignar la ref
                  type="button"
                  className="text-gray-400 hover:text-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md"
                  onClick={onClose}
                  aria-label="Cerrar modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Título */}
              {title && (
                <HDialog.Title
                  as="h3"
                  className="text-lg font-semibold text-gray-900 pr-8" // pr-8 para que no se solape con el botón X
                >
                  {title}
                </HDialog.Title>
              )}

              {/* Contenido */}
              <div className={title ? 'mt-4' : ''}>{children}</div>
            </HDialog.Panel>
          </Transition.Child>
        </div>
      </HDialog>
    </Transition.Root>
  )
}
