// app/hooks/useCategorias.ts
"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";

type Categoria = {
  nombre: string;
  headers: string[];
  productos: string[][];
};

function procesarCategorias(rows: string[][]): Categoria[] {
  const categorias: Categoria[] = [];
  let nombre: string | null = null,
    headers: string[] = [],
    productos: string[][] = [],
    esperando = false;

  rows.forEach((raw) => {
    const fila = raw.map((c) => (c || "").trim());
    const filled = fila.filter(Boolean);
    if (filled.length === 1 && filled[0] === filled[0].toUpperCase()) {
      if (nombre && headers.length) categorias.push({ nombre, headers, productos });
      nombre = filled[0];
      headers = [];
      productos = [];
      esperando = true;
    } else if (esperando) {
      headers = fila;
      esperando = false;
    } else if (headers.length && filled.length) {
      productos.push(fila);
    }
  });
  if (nombre && headers.length) categorias.push({ nombre, headers, productos });
  return categorias;
}

export function useCategorias(url: string) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Papa.parse(url, {
      download: true,
      complete: ({ data }) => {
        setCategorias(procesarCategorias(data as string[][]));
        setLoading(false);
      }
    });
  }, [url]);

  return { categorias, loading };
}
