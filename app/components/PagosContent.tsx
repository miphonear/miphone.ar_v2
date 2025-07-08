// app/components/PagosContent.tsx
export default function PagosContent() {
  return (
    <div>
      <ul className="mb-2 list-inside space-y-1">
        <li>
          💵 Efectivo en USD y/o pesos argentinos<span className="text-xs"> (*)</span>
        </li>
        <li>
          💳 USDT, Wise, PayPal, GrabrFi <span className="text-xs">(con comisión)</span>
        </li>
        <li>
          🏦 Transferencias internacionales ACH-USA <span className="text-xs">(con comisión)</span>
        </li>
        <li>❌ No financiamos, ni aceptamos transferencias bancarias nacionales</li>
      </ul>
      <p className="mt-2 text-xs text-gray-500">
        (*) No recibimos billetes rotos, escritos ni de cara chica (anteriores a 1977) <br />
        Los precios publicados no incluyen IVA
      </p>
    </div>
  )
}
