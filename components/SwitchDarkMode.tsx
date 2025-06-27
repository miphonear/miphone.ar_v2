"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function SwitchDarkMode() {
  // Estado: true = dark, false = light
  const [dark, setDark] = useState(false);

  // Cargar preferencia inicial desde localStorage o sistema
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const ls = localStorage.getItem("theme");
    if (ls === "dark" || (!ls && prefersDark)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handler toggle
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      className="flex items-center gap-2 px-3 py-1 rounded-full border bg-white/90 dark:bg-gray-800 dark:text-gray-100 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      onClick={toggle}
      aria-label="Cambiar modo oscuro"
      type="button"
    >
      {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-500" />}
      <span className="hidden sm:inline">{dark ? "Modo Claro" : "Modo Oscuro"}</span>
    </button>
  );
}
