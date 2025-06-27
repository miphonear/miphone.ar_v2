"use client";
import React, { useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

interface Props {
  nombre: string;
  headers: string[];
  productos: string[][];
}

export default function AcordeonSeminuevos({ nombre, headers, productos }: Props) {
  const [open, setOpen] = useState(false);

  const idx = (col: string) => headers.findIndex((h) => h.toLowerCase() === col.toLowerCase());

  // Agrupa por modelo (columna Producto)
  const agrupados: { [modelo: string]: string[][] } = {};
  productos.forEach((row) => {
    const modelo = row[idx("Producto")]?.trim() || "-";
    if (!agrupados[modelo]) agrupados[modelo] = [];
    agrupados[modelo].push(row);
  });

  return (
    <div className="mb-4 rounded-lg shadow border bg-white">
      {/* CABECERA */}
      <button
        className="w-full flex justify-between items-center px-4 py-3 text-lg font-semibold bg-gradient-to-r from-gray-100 to-white hover:bg-orange-50 transition rounded-t-lg"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`contenido-${nombre}`}
        type="button"
      >
        <span>{nombre}</span>
        <span className="text-2xl">{open ? "▲" : "▼"}</span>
      </button>
      {/* CONTENIDO */}
      <div
        id={`contenido-${nombre}`}
        className={`transition-all duration-200 overflow-hidden ${open ? "max-h-[2000px] py-4" : "max-h-0 py-0"}`}
      >
        <div className="space-y-4 px-4">
          {Object.entries(agrupados).map(([modelo, variantes], i) => {
            const fotos = variantes[0][idx("Fotos")];
            return (
              <div key={modelo + i} className="border rounded p-3 bg-white/90">
                {/* PRODUCTO + Ver fotos */}
                <div
                  className="flex flex-col md:flex-row md:justify-between md:items-center mb-2"
                >
                  <span className="font-semibold text-base text-center md:text-left">{modelo}</span>
                  {fotos && (
                    <a
                      href={fotos}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 md:mt-0 md:ml-4 text-sm text-blue-700 text-center md:text-right"
                    >
                      Ver fotos
                    </a>
                  )}
                </div>
                {/* SOLO UNA VARIANTE */}
                {variantes.map((row, j) => (
                  <div
                    key={j}
                    className="flex flex-col md:flex-row md:items-center md:justify-between text-sm gap-y-1"
                  >
                    {/* Izquierda: labels */}
                    <div>
                      <div>
                        <span className="font-medium">Capacidad:</span> {row[idx("Capacidad")] || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Color:</span> {row[idx("Color")] || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Batería:</span> {row[idx("Bateria")] || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Condición:</span> {row[idx("Condición")] || "-"}
                      </div>
                    </div>
                    {/* Derecha: Badge + Precio */}
                    <div className="flex flex-col items-end md:items-end mt-2 md:mt-0 min-w-[110px]">
                      {row[idx("L")] && (
                        <span className="mb-1 inline-block bg-yellow-200 rounded px-2 text-xs font-medium">
                          {row[idx("L")]}
                        </span>
                      )}
                      <span className="text-green-700 font-semibold text-base">
                        {row[idx("Precio")] || "Consultar"}
                      </span>
                    </div>
                  </div>
                ))}
                {/* BOTÓN WHATSAPP */}
                <div className="flex justify-end mt-3">
                  <WhatsAppButton
                    mensaje={`¡Hola! Vi el ${nombre} ${modelo} en la web y me gustaría saber si está disponible.`}
                    className="text-xs"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
