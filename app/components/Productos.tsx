"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

interface Props {
  nombre: string;
  headers: string[];
  productos: string[][];
}

export default function Productos({ nombre, headers, productos }: Props) {
  // Agrupa por modelo (columna 0)
  const agrupados: Record<string, string[][]> = {};
  productos.forEach((row) => {
    const modelo = row[0]?.trim() || "-";
    agrupados[modelo] = agrupados[modelo] || [];
    agrupados[modelo].push(row);
  });

  const idx = (col: string) => headers.findIndex((h) => h.toLowerCase() === col.toLowerCase());

  return (
    <div className="space-y-4">
      <Disclosure as="div">
        {({ open }) => (
          <div
            className={`rounded-2xl shadow-xs transition border ${open ? "border-2 border-orange-400 bg-orange-50/50" : "border-2 border-gray-200 bg-white/80"
              }`}
          >
            {/* Cabecera */}
            <Disclosure.Button
              className={`
                flex w-full justify-between items-center px-6 py-4 text-left text-base font-bold
                rounded-t-2xl group transition hover:text-orange-600
                ${open ? "text-orange-500" : "text-gray-800"}
                `}
            >
              <span>{nombre}</span>
              <ChevronUp
                className={`
                  h-6 w-6 transition-transform duration-200
                  ${open ? "rotate-180 text-orange-500" : "rotate-0"}
                `}
              />
            </Disclosure.Button>
            {/* Panel */}
            <Disclosure.Panel className="px-6 py-4">
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
                            className="flex justify-between items-center border-t first:border-t-0 py-1 text-sm"
                          >
                            <span className="text-gray-700">{row[1]}</span>
                            <div className="flex items-center gap-2">
                              {/* Badge */}
                              {headers.includes("L") && row[idx("L")] && (
                                <span className="bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 text-xs font-medium shadow-sm">
                                  {row[idx("L")]}
                                </span>
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
        )}
      </Disclosure>
    </div>
  );
}
