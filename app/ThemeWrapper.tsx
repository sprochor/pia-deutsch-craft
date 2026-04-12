"use client";
import { useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { activeTheme } = useProgress();

  useEffect(() => {
    // Limpiamos temas anteriores
    document.body.classList.remove("theme-pink");
    
    // Aplicamos el tema activo
    if (activeTheme === "skin_pink") {
      document.body.classList.add("theme-pink");
    }
  }, [activeTheme]);

  return <>{children}</>;
}