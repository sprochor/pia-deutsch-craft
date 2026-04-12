import { useState, useEffect } from "react";

export function useProgress() {
  // 1. Todos los estados van arriba
  const [gems, setGems] = useState(0);
  const [completedMissions, setCompletedMissions] = useState({});
  const [ownedItems, setOwnedItems] = useState({});

  // 2. Un solo useEffect para cargar todo al inicio
  useEffect(() => {
    const saved = localStorage.getItem("piacraft_progress");
    if (saved) {
      const { gems, missions, owned } = JSON.parse(saved);
      setGems(gems || 0);
      setCompletedMissions(missions || {});
      setOwnedItems(owned || {});
    }
  }, []);

  // 3. Función para ganar gemas
  const addGems = (missionId, points) => {
    let finalPoints = points;
    const newMissions = { ...completedMissions };

    if (newMissions[missionId]) {
      finalPoints = Math.floor(points / 2); // 50% de gemas si repite
      newMissions[missionId] += 1;
    } else {
      newMissions[missionId] = 1; // 100% la primera vez
    }

    const newGems = gems + finalPoints;
    setGems(newGems);
    setCompletedMissions(newMissions);

    // Guardamos incluyendo los items que ya compró para no perderlos
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

  // 4. Función para gastar gemas en la Tienda
  const buyItem = (itemId, price) => {
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
      return true; // Compra exitosa
    }
    return false; // No le alcanzan las gemas
  };

  // 5. Retornamos todo lo que las pantallas necesitan usar
  return { gems, completedMissions, ownedItems, addGems, buyItem };
}
