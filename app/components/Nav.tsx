// app/components/Nav.tsx
'use client'
import { CreditCard, HelpCircle, ScrollText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Dialog from './Dialog'
import FAQContent from './FAQContent'
import GarantiasContent from './GarantiasContent'
import PagosContent from './PagosContent'

// Configuración de tabs
const TABS = [
  { label: 'Garantías', icon: ScrollText, key: 'garantias' },
  {
    label: 'Medios de pago',
    icon: CreditCard,
    key: 'pagos',
    labelMobile: 'Pagos',
  },
  { label: 'FAQ / Links', icon: HelpCircle, key: 'faq', labelMobile: 'FAQ' },
] as const

export default function Nav() {
  const [open, setOpen] = useState<null | string>(null)

  return (
    <nav className="w-full pt-3 pb-0 bg-white shadow-sm z-30">
      {/* Logo */}
      <div className="container mx-auto flex justify-center items-center mb-0">
        <Link href="/" className="block group" aria-label="Ir a inicio">
          <Image
            src="/images/logo-miphone-1.svg"
            alt="Logo miPhone"
            width={320}
            height={120}
            className="
    w-[200px] sm:w-[260px] md:w-[300px] lg:w-[320px]
    h-auto
    mx-auto
    transition-transform duration-200 group-hover:scale-105
  "
            priority
            draggable={false}
          />
        </Link>
      </div>
      {/* Tabs (Garantías / Pagos / FAQ) */}
      <div className="w-full max-w-3xl mx-auto mb-2">
        <nav className="flex justify-center bg-white">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`
                group relative min-w-[100px] flex-1 flex flex-col items-center justify-center gap-1 py-2 px-4 text-sm font-medium
                transition text-gray-600 hover:text-orange-500 focus:outline-none
                ${open === tab.key ? 'text-orange-600' : ''}
              `}
              onClick={() => setOpen(tab.key)}
              type="button"
            >
              <tab.icon className="w-5 h-5 mb-0.5" />
              <span className="hidden sm:block">{tab.label}</span>
              <span className="sm:hidden">
                {'labelMobile' in tab ? tab.labelMobile : tab.label}
              </span>
              {/* underline activa */}
              <span
                className={`
                  absolute left-0 bottom-0 w-full h-0.5 rounded bg-orange-500
                  transition-transform duration-300 scale-x-0 group-hover:scale-x-100
                  ${open === tab.key ? 'scale-x-100' : ''}
                `}
              />
            </button>
          ))}
        </nav>
      </div>

      {/* Dialogs */}
      <Dialog open={open === 'garantias'} onClose={() => setOpen(null)} title="Garantías">
        <GarantiasContent />
      </Dialog>
      <Dialog open={open === 'pagos'} onClose={() => setOpen(null)} title="Medios de Pago">
        <PagosContent />
      </Dialog>
      <Dialog open={open === 'faq'} onClose={() => setOpen(null)} title="FAQ / Links">
        <FAQContent />
      </Dialog>
    </nav>
  )
}
