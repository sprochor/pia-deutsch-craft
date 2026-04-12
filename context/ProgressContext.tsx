"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ProgressContextType {
  gems: number;
  completedMissions: Record<string, number>;
  ownedItems: Record<string, boolean>;
  activeTheme: string;
  addGems: (missionId: string, points: number) => number;
  buyItem: (itemId: string, price: number) => boolean;
  toggleTheme: (themeName: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [gems, setGems] = useState<number>(0);
  const [completedMissions, setCompletedMissions] = useState<Record<string, number>>({});
  const [ownedItems, setOwnedItems] = useState<Record<string, boolean>>({});
  const [activeTheme, setActiveTheme] = useState<string>("minecraft");

  useEffect(() => {
    const saved = localStorage.getItem("piacraft_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGems(parsed.gems || 0);
        setCompletedMissions(parsed.missions || {});
        setOwnedItems(parsed.owned || {});
        setActiveTheme(parsed.activeTheme || "minecraft");
      } catch (e) { console.error(e); }
    }
  }, []);

  const save = (newGems: number, newMissions: any, newOwned: any, newTheme: string) => {
    localStorage.setItem("piacraft_progress", JSON.stringify({
      gems: newGems, missions: newMissions, owned: newOwned, activeTheme: newTheme
    }));
  };

  const toggleTheme = (themeName: string) => {
    setActiveTheme(themeName);
    save(gems, completedMissions, ownedItems, themeName);
  };

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
    save(newGems, newMissions, ownedItems, activeTheme);
    return finalPoints;
  };

  const buyItem = (itemId: string, price: number) => {
    if (gems >= price) {
      const newGems = gems - price;
      const newOwned = { ...ownedItems, [itemId]: true };
      setGems(newGems);
      setOwnedItems(newOwned);
      save(newGems, completedMissions, newOwned, activeTheme);
      return true;
    }
    return false;
  };

  return (
    <ProgressContext.Provider value={{ gems, completedMissions, ownedItems, activeTheme, addGems, buyItem, toggleTheme }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress debe usarse dentro de un ProgressProvider");
  return context;
};