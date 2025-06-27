"use client";
import React, { useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

interface Props {
  nombre: string;
  headers: string[];
  productos: string[][];
}

export default function AcordeonAccesorios({ nombre, headers, productos }: Props) {
  const [open, setOpen] = useState(false);

  const idx = (col: string) => headers.findIndex((h) => h.toLowerCase() === col.toLowerCase());

  return (
    <div className="mb-4 rounded-lg shadow border bg-white">
      {/* CABECERA del acordeón */}
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
          {productos.map((row, i) => {
            if (
              idx("Ocultar") !== -1 &&
              row[idx("Ocultar")]?.trim().toLowerCase() === "x"
            ) return null;

            const producto = row[idx("Producto")] || "-";
            const info = row[idx("Información")] || "-";
            const colores = row[idx("Colores")] || "-";
            const precio = row[idx("Precio")] || "Consultar";
            const fotos = row[idx("Fotos")];
            const badge = row[idx("L")];

            return (
              <div key={producto + i} className="border rounded p-3 bg-white/90">
                {/* Producto + Ver fotos */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <span className="font-semibold text-base text-center md:text-left">{producto}</span>
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
                {/* Info + Colores y Precio + Badge */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm gap-y-1">
                  {/* Izquierda: Info y colores */}
                  <div>
                    <div>
                      <span className="font-medium">Info:</span> {info}
                    </div>
                    <div>
                      <span className="font-medium">Colores:</span> {colores}
                    </div>
                  </div>
                  {/* Derecha: Badge + Precio */}
                  <div className="flex flex-col items-end md:items-end mt-2 md:mt-0 min-w-[110px]">
                    {badge && (
                      <span className="mb-1 inline-block bg-yellow-200 rounded px-2 text-xs font-medium">
                        {badge}
                      </span>
                    )}
                    <span className="text-green-700 font-semibold text-base">
                      {precio}
                    </span>
                  </div>
                </div>
                {/* BOTÓN WHATSAPP */}
                <div className="flex justify-end mt-3">
                  <WhatsAppButton
                    mensaje={`¡Hola! Vi el accesorio ${producto} en la web y me gustaría saber si está disponible.`}
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
