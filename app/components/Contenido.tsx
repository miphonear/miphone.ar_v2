// app/components/Contenido.tsx
"use client";
import { useMemo } from "react";
import Productos from "./Productos";
import SearchBar from "./SearchBar";
import { useCategorias } from "../hooks/useCategorias";
import { useDebounce } from "../hooks/useDebounce";
import BrandsCarousel from "./BrandsCarousel";

export default function Contenido({ query, setQuery }) {
  const { categorias, loading } = useCategorias(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRr62BlKCzICpC0ctnU2mRB8cq_SOCcsgydXQJXD5pQvasO1b1iT0Wp_L7sFxH8UGJCepaMjng1GUO0/pub?gid=1610793698&single=true&output=csv"
  );
  const debouncedQuery = useDebounce(query, 300);

  const categoriasFiltradas = useMemo(() => {
    if (!debouncedQuery.trim()) return categorias;

    const queryWords = debouncedQuery
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    const ignoreCols = ["precio", "l", "ver ficha", "consultar"];

    return categorias
      .map((cat) => {
        const idxToSearch = cat.headers
          .map((h, i) => (ignoreCols.some(col => h.toLowerCase().includes(col)) ? null : i))
          .filter(i => i !== null) as number[];

        // Agrupa variantes por modelo
        const agrupados: Record<string, string[][]> = {};
        cat.productos.forEach((row) => {
          const modelo = row[0]?.trim() || "-";
          agrupados[modelo] = agrupados[modelo] || [];
          agrupados[modelo].push(row);
        });

        // Filtra modelos y variantes
        const modelosFiltrados = Object.entries(agrupados)
          .map(([modelo, variantes]) => {
            const variantesFiltradas = variantes.filter(row => {
              const texto = [
                cat.nombre,
                modelo,
                ...idxToSearch.map(i => row[i] || ""),
                row[cat.headers.findIndex(h => h.toLowerCase() === "l")] || ""
              ]
                .join(" ")
                .toLowerCase();

              const textoWords = texto
                .replace(/[^a-z0-9áéíóúüñ ]/gi, " ")
                .split(/\s+/)
                .filter(Boolean);

              return queryWords.every(q =>
                textoWords.some(w => w === q)
              );
            });

            if (variantesFiltradas.length > 0) {
              return [modelo, variantesFiltradas] as [string, string[][]];
            }
            return null;
          })
          .filter(Boolean) as [string, string[][]][];

        if (modelosFiltrados.length > 0) {
          const productosFiltrados = modelosFiltrados.flatMap(([, variantes]) => variantes);
          return { ...cat, productos: productosFiltrados };
        }
        return null;
      })
      .filter(Boolean) as (typeof categorias)[0][];
  }, [categorias, debouncedQuery]);


  if (loading)
    return (
      <div className="flex items-center justify-center py-24">
        <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-t-transparent align-[-0.125em]" role="status" aria-label="Cargando"></span>
      </div>
    );

  const openCategorias = debouncedQuery.trim()
    ? categoriasFiltradas.map(cat => cat.nombre)
    : [];

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 space-y-3">
      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
        placeholder="Buscar productos"
      />
      {categoriasFiltradas.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No se encontraron productos.<br />Consultar existencia por WhatsApp
        </div>
      )}
      {categoriasFiltradas.map((cat) => (
        <Productos
          key={cat.nombre + (openCategorias.includes(cat.nombre) ? "-open" : "-closed")}
          nombre={cat.nombre}
          headers={cat.headers}
          productos={cat.productos}
          open={openCategorias.includes(cat.nombre)}
        />
      ))}
    </div>
  );
}