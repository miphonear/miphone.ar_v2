// app/components/Productos.tsx
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUp } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import ProductLabel from "@/components/ProductLabel";
import { ALERTAS } from "@/lib/constantes";

interface Props {
  nombre: string;
  headers: string[];
  productos: string[][];
  open?: boolean;
}

export default function Productos({ nombre, headers, productos, open = false }: Props) {
  // Filtra variantes ocultas
  const idxOcultar = headers.findIndex((h) => h.toLowerCase() === "ocultar");
  const productosFiltrados = productos.filter(
    (row) => !(row[idxOcultar]?.trim().toLowerCase() === "x")
  );

  // Agrupa por modelo (columna 0)
  const agrupados: Record<string, string[][]> = {};
  productosFiltrados.forEach((row) => {
    const modelo = row[0]?.trim() || "-";
    agrupados[modelo] = agrupados[modelo] || [];
    agrupados[modelo].push(row);
  });

  const idx = (col: string) => headers.findIndex((h) => h.toLowerCase() === col.toLowerCase());

  return (
    <div>
      <Disclosure key={open ? "open" : "closed"} defaultOpen={open}>
        {({ open }) => (
          <div
            className={`rounded-2xl shadow-sm transition ${open ? "ring-2 ring-orange-500 bg-orange-50/50" : "ring-2 ring-gray-200 bg-white/80"
              }`}
          >
            <Disclosure.Button
              className={`
                flex w-full justify-between items-center px-6 py-3 text-left text-base font-bold tracking-wide
                group transition hover:text-orange-500
                ${open ? "text-orange-500" : "text-gray-800"}
              `}
            >
              <span>{nombre}</span>
              <ChevronUp
                className={`
                  h-6 w-6 transition-transform duration-300
                  ${open ? "rotate-0 text-orange-500" : "rotate-180"}
                `}
              />
            </Disclosure.Button>

            <Transition
              show={open}
              enter="transition-all duration-500 ease-out"
              enterFrom="opacity-0 max-h-0"
              enterTo="opacity-100 max-h-[1000px]"
              leave="transition-all duration-200 ease-in"
              leaveFrom="opacity-100 max-h-[1000px]"
              leaveTo="opacity-0 max-h-0"
            >
              <div>
                {/* Alertas */}
                {ALERTAS[nombre.toUpperCase()] && (
                  <div
                    className="mx-6 my-1 px-4 py-1 rounded-lg bg-violet-100 border-l-4 border-violet-400 text-sm"
                    dangerouslySetInnerHTML={{ __html: ALERTAS[nombre.toUpperCase()] }}
                  />
                )}
                <Disclosure.Panel static className="px-6 py-6 overflow-hidden">
                  <div className="space-y-4">
                    {Object.entries(agrupados).map(([modelo, variantes]) => {
                      // Specs
                      const specsIdx = headers.findIndex((h) => h.toLowerCase().includes("spec"));
                      const specs = specsIdx >= 0 ? variantes[0][specsIdx] : null;

                      return (
                        <div
                          key={modelo}
                          className="border rounded-lg p-4 bg-white/95 flex flex-col gap-1 shadow-sm"
                        >
                          {/* Modelo header */}
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                            <span className="font-bold text-base">{modelo}</span>
                            {specs && (
                              <a
                                href={specs}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline transition"
                              >
                                Ver ficha
                              </a>
                            )}
                          </div>
                          {/* Variantes */}
                          <div className="flex flex-col gap-0">
                            {variantes.map((row, j) => (
                              <div
                                key={j}
                                className="flex justify-between items-center border-t first:border-t-0 py-1 px-3 text-sm
    transition-colors duration-150 cursor-pointer hover:bg-violet-50"
                              >
                                <span className="text-gray-700">{row[1]}</span>
                                <div className="flex items-center gap-2">
                                  {/* Label */}
                                  {headers.includes("L") && row[idx("L")] && (
                                    <ProductLabel value={row[idx("L")]} />
                                  )}
                                  {/* Precio */}
                                  <span className="text-gray-700 font-semibold">
                                    {row[idx("Precio")] || "Consultar"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Botón WhatsApp */}
                          <div className="flex justify-end mt-3">
                            <WhatsAppButton
                              mensaje={`¡Hola! Vi el ${nombre} ${modelo} en la web y me gustaría saber si está disponible.`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Disclosure.Panel>
              </div>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
