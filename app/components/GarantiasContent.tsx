export default function GarantiasContent() {
  return (
    <div className="text-sm">
      {/* Apple */}
      <div className="mb-4">
        <p className="mb-1">
          ➡️ <span className="font-semibold">Garantía Apple</span>
        </p>
        <p className="mb-1">Período de cobertura: 12 Meses</p>
        <p className="mb-1">Oficial, mediante proveedor de servicios autorizado por Apple</p>
        <p className="mb-0">
          <em>
            +info:{' '}
            <a
              href="https://support.apple.com/es-lamr/102607"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline"
            >
              support.apple.com
            </a>
          </em>
        </p>
      </div>

      <hr className="my-4 border-t border-gray-300" />

      {/* Smartphones */}
      <div className="mb-4">
        <p className="mb-1">
          ➡️ <span className="font-semibold">Garantía smartphones</span>
        </p>
        <p className="mb-1">Período de cobertura: 3 Meses</p>
        <p className="mb-1">Servicio técnico propio, opera en caso de fallas de hardware</p>
        <p className="mb-0">
          <em>
            +info:{' '}
            <a
              href="https://docs.google.com/document/d/1sD2YTAb0hpADEudYpXNPVmP48pfz2wajzTv6HUmZFwk/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline"
            >
              ver documento
            </a>
          </em>
        </p>
      </div>

      <hr className="my-4 border-t border-gray-300" />

      {/* Otros productos */}
      <div>
        <p className="mb-1">
          ➡️ <span className="font-semibold">Garantía otros productos</span>
        </p>
        <p className="mb-1">Período de cobertura: 3 Meses</p>
        <p className="mb-0">Garantía de importador, opera en caso de fallas de hardware</p>
      </div>
    </div>
  )
}
