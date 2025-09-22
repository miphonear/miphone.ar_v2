// app/page.tsx
import { Suspense } from 'react'
import PageClient from './components/PageClient'

// SECCIÓN: COMPONENTE PRINCIPAL (ENTRY POINT DE LA PÁGINA)
export default function Page() {
  return (
    // SECCIÓN: SUSPENSE PARA MANEJO ASINCRÓNICO
    <Suspense fallback={null}>
      <PageClient />
    </Suspense>
  )
}
