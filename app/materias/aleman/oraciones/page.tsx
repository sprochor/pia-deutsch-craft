"use client";
import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useSound } from '@/hooks/useSound';

export default function OracionesPage() {
  const { gems, addGems } = useProgress();
  const { playClick, playSuccess, playError } = useSound();
  const [misiones, setMisiones] = useState<any[]>([]);
  const [nivelActual, setNivelActual] = useState(0);

  const poolOraciones = [
    { id: 1, desordenadas: ["zusammen", "ins Schwimmbad.", "gehen", "wir", "Am Wochenende"], correcta: "Am Wochenende gehen wir zusammen ins Schwimmbad." },
    { id: 2, desordenadas: ["Videospiele.", "Wir", "manchmal", "spielen"], correcta: "Wir spielen manchmal Videospiele." },
    { id: 3, desordenadas: ["spielen", "gern", "wir", "Außerdem", "Tennis."], correcta: "Außerdem spielen wir gern Tennis." },
    { id: 4, desordenadas: ["für Deutsch.", "lernt", "sie", "Nach der Schule"], correcta: "Nach der Schule lernt sie für Deutsch." },
    { id: 5, desordenadas: ["zum Lachen.", "mich", "bringt", "Er"], correcta: "Er bringt mich zum Lachen." },
    { id: 6, desordenadas: ["in dieselbe Schule.", "gehen", "Wir"], correcta: "Wir gehen in dieselbe Schule." }
  ];

  useEffect(() => {
    const shuffled = [...poolOraciones].sort(() => 0.5 - Math.random());
    setMisiones(shuffled.slice(0, 3));
  }, []);

  // En las funciones de agregar/quitar palabra, llama a playClick()
  // En comprobarOracion, si es correcto playSuccess(), si no playError()
  
  // ... resto de la lógica de la mesa de crafteo ...
}