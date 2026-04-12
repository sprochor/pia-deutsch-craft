"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useSound } from '@/hooks/useSound';

export default function PosesivosPage() {
  const { gems, addGems } = useProgress();
  const { playClick, playSuccess, playError } = useSound();
  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [gananciaActual, setGananciaActual] = useState(0);

  // Banco de datos expandido
  const poolPreguntas = [
    { id: 1, texto: "Das ist Steve. _____ Schwert ist aus Diamant.", opciones: ["Sein", "Ihr"], correcta: "Sein" },
    { id: 2, texto: "Das ist Alex. _____ Augen sind grün.", opciones: ["Seine", "Ihre"], correcta: "Ihre" },
    { id: 3, texto: "Steve hat einen Hund. _____ Hund heißt Galleta.", opciones: ["Sein", "Ihr"], correcta: "Sein" },
    { id: 4, texto: "Alex baut ein Haus. _____ Haus ist aus Stein.", opciones: ["Sein", "Ihr"], correcta: "Ihr" },
    { id: 5, texto: "Das ist Steve. _____ Haare sind braun.", opciones: ["Seine", "Ihre"], correcta: "Seine" },
    { id: 6, texto: "Mia hat eine Freundin. _____ Freundin heißt Maja.", opciones: ["Sein", "Ihr"], correcta: "Ihr" },
    { id: 7, texto: "Mia hat einen Freund. _____ Freund hat blonde Haare.", opciones: ["Sein", "Ihr"], correcta: "Sein" },
    { id: 8, texto: "Das ist Alex. _____ Lieblingssport ist Schwimmen.", opciones: ["Sein", "Ihr"], correcta: "Ihr" }
  ];

  useEffect(() => {
    // Mezclar y elegir 5 al azar al entrar
    const shuffled = [...poolPreguntas].sort(() => 0.5 - Math.random());
    setPreguntas(shuffled.slice(0, 5));
  }, []);

  const seleccionarOpcion = (id, opcion) => {
    if (!mostrarResultado) {
      playClick();
      setRespuestas({ ...respuestas, [id]: opcion });
    }
  };

  const comprobar = () => {
    const todasCorrectas = preguntas.every(q => respuestas[q.id] === q.correcta);
    if (todasCorrectas) {
      playSuccess();
      const ganadas = addGems('aleman_posesivos', 100);
      setGananciaActual(ganadas);
    } else {
      playError();
    }
    setMostrarResultado(true);
  };

  // ... (El resto del JSX es igual al anterior, solo asegúrate de que use las variables nuevas)
  return (
    // Usa el mismo JSX que te pasé antes para Posesivos
    // agregando {gananciaActual > 0 && ...} para el mensaje de éxito
    <div className="p-8">/* Implementación del JSX anterior con playClick/playSuccess */</div>
  );
}