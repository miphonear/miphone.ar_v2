// app/components/GarantiasContent.tsx
export default function GarantiasContent() {
    return (
        <div>
            {/* Apple */}
            <div className="mb-3">
                <p className="mb-1">➡️ <strong>Garantía Apple</strong></p>
                <p className="mb-1">Período de cobertura: 12 Meses</p>
                <p className="mb-1">Oficial, mediante proveedor de servicios autorizado por Apple</p>
                <p className="mb-2">
                    <em>
                        +info:{" "}
                        <a
                            href="https://support.apple.com/es-lamr/102607"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            support.apple.com
                        </a>
                    </em>
                </p>
            </div>

            {/* Smartphones */}
            <div className="mb-3">
                <p className="mb-1">➡️ <strong>Garantía smartphones</strong></p>
                <p className="mb-1">Período de cobertura: 3 Meses</p>
                <p className="mb-1">Servicio técnico propio, opera en caso de fallas de hardware (defectos de fabricación)</p>
                <p className="mb-2">
                    <em>
                        +info:{" "}
                        <a
                            href="https://docs.google.com/document/d/1sD2YTAb0hpADEudYpXNPVmP48pfz2wajzTv6HUmZFwk/edit?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            ver documento
                        </a>
                    </em>
                </p>
            </div>

            {/* Otros productos */}
            <div>
                <p className="mb-1">➡️ <strong>Garantía otros productos</strong></p>
                <p className="mb-1">Período de cobertura: 3 Meses</p>
                <p className="mb-0">Garantía de importador, opera en caso de fallas de hardware</p>
            </div>
        </div>
    );
}