'use client'
import { CreditCard, HelpCircle, ScrollText } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Dialog from './Dialog'
import FAQContent from './FAQContent'
import GarantiasContent from './GarantiasContent'
import PagosContent from './PagosContent'
import LogoMiPhone from '@/public/images/logo-miphone.svg'

// Configuración de tabs
const TABS = [
  { label: 'Garantías', labelMobile: 'Garantías', icon: ScrollText, key: 'garantias' },
  { label: 'Medios de pago', labelMobile: 'Pagos', icon: CreditCard, key: 'pagos' },
  { label: 'FAQ / Links', labelMobile: 'FAQ', icon: HelpCircle, key: 'faq' },
] as const

const BUTTON_CLASS =
  'group relative min-w-[100px] flex-1 flex flex-col items-center justify-center gap-1 py-2 px-4 text-sm font-medium transition text-gray-600 hover:text-orange-500 focus:outline-none'

const UNDERLINE_CLASS =
  'absolute left-0 bottom-0 w-full h-0.5 rounded bg-orange-500 transition-transform duration-300 scale-x-0 group-hover:scale-x-100'

export default function Nav() {
  const [open, setOpen] = useState<null | string>(null)

  return (
    <nav className="w-full pt-3 pb-0 bg-white shadow-sm z-30">
      {/* Logo */}
      <div className="container mx-auto flex justify-center items-center mb-0">
        <Link href="/" className="block group" aria-label="Ir a inicio">
          <LogoMiPhone
            className="w-[200px] sm:w-[260px] md:w-[300px] lg:w-[320px] h-auto mx-auto transition-transform duration-200 group-hover:scale-105"
            draggable={false}
            aria-label="Logo miPhone"
          />
        </Link>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-3xl mx-auto mb-4">
        <nav className="flex justify-center bg-white">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${BUTTON_CLASS} ${open === tab.key ? 'text-orange-600' : ''}`}
              onClick={() => setOpen(tab.key)}
              type="button"
              aria-pressed={open === tab.key}
            >
              <tab.icon className="w-5 h-5 mb-0.5" />
              <span className="hidden sm:block">{tab.label}</span>
              <span className="sm:hidden">{tab.labelMobile}</span>
              <span className={`${UNDERLINE_CLASS} ${open === tab.key ? 'scale-x-100' : ''}`} />
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
