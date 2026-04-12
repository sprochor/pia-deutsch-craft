"use client";

import { useState, useEffect } from "react";

// Definimos la estructura para que TypeScript sepa qué hay en el cofre
interface ProgressData {
  gems: number;
  missions: Record<string, number>;
  owned: Record<string, boolean>;
}

export function useProgress() {
  const [gems, setGems] = useState<number>(0);
  const [completedMissions, setCompletedMissions] = useState<Record<string, number>>({});
  const [ownedItems, setOwnedItems] = useState<Record<string, boolean>>({});

  // Cargar desde el inventario del navegador (localStorage)
  useEffect(() => {
    const saved = localStorage.getItem("piacraft_progress");
    if (saved) {
      try {
        const parsed: ProgressData = JSON.parse(saved);
        setGems(parsed.gems || 0);
        setCompletedMissions(parsed.missions || {});
        setOwnedItems(parsed.owned || {});
      } catch (e) {
        console.error("Error al cargar progreso", e);
      }
    }
  }, []);

  const addGems = (missionId: string, points: number) => {
    let finalPoints = points;
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

  const buyItem = (itemId: string, price: number) => {
    if (gems >= price) {
      const newGems = gems - price;
      const newOwned = { ...ownedItems, [itemId]: true };

      setGems(newGems);
      setOwnedItems(newOwned);

      localStorage.setItem(
        "piacraft_progress",
        JSON.stringify({
          gems: newGems,
          missions: completedMissions,
          owned: newOwned,
        }),
      );
      return true;
    }
    return false;
  };

  return { gems, completedMissions, ownedItems, addGems, buyItem };
}