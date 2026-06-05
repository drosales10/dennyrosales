"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const storageKey = "app-theme";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(storageKey, theme);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function onToggle() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`rounded-full border border-slate-500/70 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-100 hover:border-cyan-300 hover:text-cyan-200 ${className}`}
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? "Modo claro" : "Modo oscuro"}
    </button>
  );
}
