// components/ProductLabel.tsx
"use client";
interface ProductLabelProps {
    value: string;
}

export default function ProductLabel({ value }: ProductLabelProps) {
    const upper = value.trim().toUpperCase();
    const baseClass =
        "inline-flex items-center rounded-md font-semibold gap-1 px-1 py-0 text-[10px] sm:px-2 sm:py-0.5 sm:text-xs";

    if (upper === "SALE") {
        return (
            <span className={`${baseClass} bg-red-100 text-red-800`}>
                <span role="img" aria-label="Oferta">🔥</span> ¡OFERTA!
            </span>
        );
    }
    if (upper === "NEW") {
        return (
            <span className={`${baseClass} bg-blue-100 text-blue-700`}>
                <span role="img" aria-label="Nuevo">✈️</span> ¡NUEVO!
            </span>
        );
    }
    return (
        <span className={`${baseClass} bg-gray-100 text-gray-800`}>
            {value}
        </span>
    );
}
