"use client";
import { useState, useEffect } from "react";

interface ProgressData {
  gems: number;
  missions: Record<string, number>;
  owned: Record<string, boolean>;
  activeTheme: string; // <-- Nueva variable para el tema actual
}

export function useProgress() {
  const [gems, setGems] = useState<number>(0);
  const [completedMissions, setCompletedMissions] = useState<Record<string, number>>({});
  const [ownedItems, setOwnedItems] = useState<Record<string, boolean>>({});
  const [activeTheme, setActiveTheme] = useState<string>("minecraft"); // Default

  useEffect(() => {
    const saved = localStorage.getItem("piacraft_progress");
    if (saved) {
      const parsed: ProgressData = JSON.parse(saved);
      setGems(parsed.gems || 0);
      setCompletedMissions(parsed.missions || {});
      setOwnedItems(parsed.owned || {});
      setActiveTheme(parsed.activeTheme || "minecraft");
    }
  }, []);

  // Función para cambiar el estilo visual
  const toggleTheme = (themeName: string) => {
    setActiveTheme(themeName);
    const currentProgress = {
      gems,
      missions: completedMissions,
      owned: ownedItems,
      activeTheme: themeName
    };
    localStorage.setItem("piacraft_progress", JSON.stringify(currentProgress));
  };

  const addGems = (missionId: string, points: number) => {
    const newMissions = { ...completedMissions };

    if (newMissions[missionId]) {
      finalPoints = Math.floor(points / 2);
      newMissions[missionId] += 1;
    } else {
      newMissions[missionId] = 1;
    }

    const newGems = gems + finalPoints;
    setGems(newGems);
    setCompletedMissions(newMissions);

    localStorage.setItem(
      "piacraft_progress",
      JSON.stringify({
        gems: newGems,
        missions: newMissions,
        owned: ownedItems,
      }),
    );

    return finalPoints;
  };

  };

  const buyItem = (itemId: string, price: number) => {
    if (gems >= price) {
      const newGems = gems - price;
      const newOwned = { ...ownedItems, [itemId]: true };
      setGems(newGems);
      setOwnedItems(newOwned);
      
      localStorage.setItem("piacraft_progress", JSON.stringify({
        gems: newGems,
        missions: completedMissions,
        owned: newOwned,
        activeTheme
      }));
      return true;
    }
    return false;
  };

  return { gems, completedMissions, ownedItems, activeTheme, addGems, buyItem, toggleTheme };
}