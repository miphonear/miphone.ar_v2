'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ScrollText, CreditCard, HelpCircle } from 'lucide-react'
import Dialog from '@ui/Dialog'
import GarantiasContent from './GarantiasContent'
import PagosContent from './PagosContent'
import FAQContent from './FAQContent'
import Imagotipo from '@/public/images/imagotipo-miphone.svg'
import Isotipo from '@/public/images/isotipo-miphone.svg'

/* --- Botón FAQ reutilizable --- */
function FAQButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 
                 text-sm font-semibold text-white bg-orange-500 rounded-full 
                 transition-all duration-200 hover:bg-orange-600 hover:scale-105"
    >
      <HelpCircle className="w-5 h-5" />
      <span className="hidden sm:inline">FAQ — Links</span>
      <span className="sm:hidden">FAQ</span>
    </button>
  )
}
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'garantias' | 'pagos' | 'faq'>('faq')

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* --- MOBILE NAV --- */}
      <div className="container mx-auto flex items-center justify-between px-4 py-2 md:hidden">
        {/* Isotipo a la izquierda */}
        <Link href="/" className="block group" aria-label="Ir a inicio">
          <Isotipo
            className="w-[70px] h-auto transition-transform duration-200 group-hover:scale-100"
            draggable={false}
            aria-label="Logo miPhone"
          />
        </Link>

        {/* FAQ a la derecha */}
        <FAQButton onClick={() => setOpen(true)} />
      </div>

      {/* --- DESKTOP NAV --- */}
      <div className="container mx-auto hidden md:grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2">
        {/* Columna izquierda vacía para balancear */}
        <div />

        {/* Logo centrado */}
        <div className="flex justify-center">
          <Link href="/" className="block group" aria-label="Ir a inicio">
            <Imagotipo
              className="w-[280px] lg:w-[340px] h-auto transition-transform duration-200 group-hover:scale-105"
              draggable={false}
              aria-label="Logo miPhone"
            />
          </Link>
        </div>

        {/* FAQ a la derecha */}
        <div className="flex justify-end">
          <FAQButton onClick={() => setOpen(true)} />
        </div>
      </div>

      {/* --- MODAL FAQ --- */}
      <Dialog open={open} onClose={() => setOpen(false)} title="FAQ — Links útiles">
        {/* Tabs internos */}
        <div className="flex gap-4 border-b border-gray-200 mb-4">
          {/* Garantías */}
          <button
            onClick={() => setActiveTab('garantias')}
            className={`flex items-center gap-2 pb-2 text-sm font-medium ${
              activeTab === 'garantias'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ScrollText className="w-4 h-4" />
            Garantías
          </button>

          {/* Medios de pago / Pagos */}
          <button
            onClick={() => setActiveTab('pagos')}
            className={`flex items-center gap-2 pb-2 text-sm font-medium ${
              activeTab === 'pagos'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            {/* Mobile = Pagos / Desktop = Medios de pago */}
            <span className="sm:hidden">Pagos</span>
            <span className="hidden sm:inline">Medios de pago</span>
          </button>

          {/* Links útiles */}
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 pb-2 text-sm font-medium ${
              activeTab === 'faq'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            {/* Mobile = Links / Desktop = Links útiles */}
            <span className="sm:hidden">Links</span>
            <span className="hidden sm:inline">Links útiles</span>
          </button>
        </div>

        {/* Contenido según tab */}
        <div className="mt-2">
          {activeTab === 'garantias' && <GarantiasContent />}
          {activeTab === 'pagos' && <PagosContent />}
          {activeTab === 'faq' && <FAQContent />}
        </div>
      </Dialog>
    </nav>
  )
}
