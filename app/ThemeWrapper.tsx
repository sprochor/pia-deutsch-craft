"use client";
import { useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { ownedItems } = useProgress();

  useEffect(() => {
    // Si tiene la skin comprada, le agregamos la clase al body
    if (ownedItems?.skin_pink) {
      document.body.classList.add("theme-pink");
    } else {
      document.body.classList.remove("theme-pink");
    }
  }, [ownedItems]);

  return <>{children}</>;
}