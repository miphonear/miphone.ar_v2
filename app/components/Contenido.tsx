// app/components/Contenido.tsx
"use client";
import Productos from "./Productos";
import { useCategorias } from "../hooks/useCategorias";

export default function Contenido() {
  const { categorias, loading } = useCategorias(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRr62BlKCzICpC0ctnU2mRB8cq_SOCcsgydXQJXD5pQvasO1b1iT0Wp_L7sFxH8UGJCepaMjng1GUO0/pub?gid=1610793698&single=true&output=csv"
  );

  if (loading)
    return (
      <div className="flex items-center justify-center py-24">
        <span
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-t-transparent align-[-0.125em]"
          role="status"
          aria-label="Cargando"
        ></span>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 space-y-2">
      {categorias.map((cat) => (
        <Productos
          key={cat.nombre}
          nombre={cat.nombre}
          headers={cat.headers}
          productos={cat.productos}
        />
      ))}
    </div>
  );
}
