"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useSound } from '@/hooks/useSound';

export default function AdjetivosPage() {
  const { gems, addGems } = useProgress();
  const { playClick, playSuccess, playError } = useSound();
  const [situaciones, setSituaciones] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const poolSituaciones = [
    { id: 1, texto: "Un Creeper se tropieza y cae a la lava.", opciones: ["ungeschickt", "mutig"], correcta: "ungeschickt" },
    { id: 2, texto: "Tu lobo Galleta no teme a los esqueletos.", opciones: ["schüchtern", "mutig"], correcta: "mutig" },
    { id: 3, texto: "Un aldeano te regala esmeraldas.", opciones: ["großzügig", "faul"], correcta: "großzügig" },
    { id: 4, texto: "Alex te ayuda con tu casa.", opciones: ["hilfsbereit", "witzig"], correcta: "hilfsbereit" },
    { id: 5, texto: "Steve habla mucho por el chat.", opciones: ["ruhig", "gesprächig"], correcta: "gesprächig" },
    { id: 6, texto: "Un Enderman te mira fijo y es serio.", opciones: ["witzig", "ernst"], correcta: "ernst" },
    { id: 7, texto: "Pia siempre hace sus tareas de alemán.", opciones: ["fleißig", "faul"], correcta: "fleißig" },
    { id: 8, texto: "Un zombie es lento y no quiere trabajar.", opciones: ["sportlich", "faul"], correcta: "faul" },
    { id: 9, texto: "Corres muy rápido en el bioma.", opciones: ["sportlich", "schüchtern"], correcta: "sportlich" },
    { id: 10, texto: "Escuchas los problemas de un amigo.", opciones: ["verständnisvoll", "ungeschickt"], correcta: "verständnisvoll" }
  ];

  useEffect(() => {
    const shuffled = [...poolSituaciones].sort(() => 0.5 - Math.random());
    setSituaciones(shuffled.slice(0, 6));
  }, []);

  const seleccionar = (id, op) => {
    if (!mostrarResultado) {
      playClick();
      setRespuestas({ ...respuestas, [id]: op });
    }
  };

  const comprobar = () => {
    const correctas = situaciones.filter(s => respuestas[s.id] === s.correcta).length;
    if (correctas === situaciones.length) {
      playSuccess();
      addGems('aleman_adjetivos', 100);
    } else {
      playError();
    }
    setMostrarResultado(true);
  };

  return (/* JSX del Yunque de Adjetivos con playClick/Success */);
}