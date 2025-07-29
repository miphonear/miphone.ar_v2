import UsdtLogo from '@/public/images/payments/tether-usdt-logo.svg'
import PaypalLogo from '@/public/images/payments/paypal-logo.svg'
import WiseLogo from '@/public/images/payments/wise-logo.svg'
import GrabrfiLogo from '@/public/images/payments/grabrfi-logo.svg'
import WallbitLogo from '@/public/images/payments/wallbit-logo.svg'

export default function PagosContent() {
  return (
    <div>
      <ul className="mb-4 list-inside space-y-2 text-sm">
        <li>
          <span className="font-semibold">💵 Efectivo:</span> USD y/o pesos argentinos
          <span className="block text-xs text-gray-500 sm:ml-6">
            No recibimos billetes rotos, escritos ni de cara chica (anteriores a 1977)
          </span>
        </li>
        <li>
          <span className="font-semibold">💳 Cripto y billeteras:</span> USDT, Wise, PayPal,
          Wallbit, GrabrFi
          <span className="block text-xs text-gray-500 sm:ml-6">Consultar comisiones</span>
        </li>
        <li>
          <span className="font-semibold">🏦 Transferencias internacionales:</span> ACH-USA
          <span className="block text-xs text-gray-500 sm:ml-6">Consultar comisión</span>
        </li>
        <li>
          <span className="font-semibold">❌ No financiamos</span>, ni aceptamos transferencias
          bancarias nacionales
        </li>
        <li>
          <span className="font-semibold">ℹ️</span> Los precios publicados no incluyen IVA
        </li>
      </ul>

      {/* Línea divisoria */}
      <hr className="my-4 border-t border-gray-300" />

      {/* Logos de medios de pago */}
      <div className="flex flex-wrap items-center gap-4 justify-center">
        <UsdtLogo className="h-4 w-auto" />
        <PaypalLogo className="h-4 w-auto" />
        <WallbitLogo className="h-4 w-auto" />
        <GrabrfiLogo className="h-4 w-auto" />
        <WiseLogo className="h-3 w-auto" />
      </div>
    </div>
  )
}
