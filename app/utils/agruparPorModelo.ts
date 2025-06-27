// utils/agruparPorModelo.ts
export function agruparPorModelo(productos: string[][], modeloIdx = 0) {
  const grupos: Record<string, string[][]> = {};
  productos.forEach(row => {
    const modelo = row[modeloIdx]?.trim() || "";
    if (!modelo) return;
    if (!grupos[modelo]) grupos[modelo] = [];
    grupos[modelo].push(row);
  });
  return grupos;
}