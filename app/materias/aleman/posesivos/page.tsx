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

  // Banco de datos con explicaciones y correcciones gramaticales
  const poolPreguntas = [
    { id: 1, texto: "Das ist Steve. _____ Schwert ist aus Diamant.", opciones: ["Sein", "Ihr"], correcta: "Sein", explicacion: "El dueño de la espada es Steve (un varón), por eso usamos 'Sein'." },
    { id: 2, texto: "Das ist Alex. _____ Augen sind grün.", opciones: ["Seine", "Ihre"], correcta: "Ihre", explicacion: "Alex es nena (Ihr) y 'ojos' (Augen) es plural, por eso agregamos la -e: 'Ihre'." },
    { id: 3, texto: "Steve hat einen Hund. _____ Hund heißt Galleta.", opciones: ["Sein", "Ihr"], correcta: "Sein", explicacion: "El dueño de Galleta es Steve (varón), así que usamos 'Sein'." },
    { id: 4, texto: "Alex baut ein Haus. _____ Haus ist aus Stein.", opciones: ["Sein", "Ihr"], correcta: "Ihr", explicacion: "Como la dueña de la casa es Alex (nena), usamos 'Ihr'." },
    { id: 5, texto: "Das ist Steve. _____ Haare sind braun.", opciones: ["Seine", "Ihre"], correcta: "Seine", explicacion: "Steve es varón (Sein) y el pelo (Haare) es plural, por eso lleva la -e: 'Seine'." },
    { id: 6, texto: "Mia hat eine Freundin. _____ Freundin heißt Maja.", opciones: ["Seine", "Ihre"], correcta: "Ihre", explicacion: "Mia es nena (Ihr) y su amiga (Freundin) es femenino, por eso agregamos la -e: 'Ihre'." },
    { id: 7, texto: "Mia hat einen Freund. _____ Freund hat blonde Haare.", opciones: ["Sein", "Ihr"], correcta: "Ihr", explicacion: "Hablamos del amigo de Mia. Como Mia es nena, el posesivo es 'Ihr' (no importa que el amigo sea varón)." },
    { id: 8, texto: "Das ist Alex. _____ Lieblingssport ist Schwimmen.", opciones: ["Sein", "Ihr"], correcta: "Ihr", explicacion: "Hablamos del deporte de Alex (nena), así que usamos 'Ihr'." }
  ];

  useEffect(() => {
    const shuffled = [...poolPreguntas].sort(() => 0.5 - Math.random());
    setPreguntas(shuffled.slice(0, 5));
  }, []);

  const seleccionarOpcion = (id: number, opcion: string) => {
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

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto relative text-white bg-[#1e1e1e]">
      <div className="absolute top-4 right-4 z-50">
        <div className="mc-card !bg-[#313131] !p-2 !border-2 flex items-center gap-2 border-yellow-500 shadow-lg">
          <span className="text-2xl">💎</span>
          <span className="text-xl font-black text-yellow-400">{gems}</span>
        </div>
      </div>

      <Link href="/materias/aleman">
        <button className="mc-button !bg-[#7a7a7a] text-white mb-8 text-sm px-4 py-2 mt-4" onClick={playClick}>
          ⬅ Volver al Bioma
        </button>
      </Link>

      <div className="mc-card mb-8 border-[#3b82f6] bg-[#2d2d2d]">
        <h1 className="text-3xl font-black text-[#3b82f6] mb-2 uppercase tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Misión 1: El Inventario (Posesivos)
        </h1>
        <p className="text-gray-300 font-bold italic">Completa con Sein o Ihr / Seine o Ihre...</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {preguntas.map((q) => {
          const respondido = respuestas[q.id];
          const esCorrecta = respondido === q.correcta;

          return (
            <div key={q.id} className="mc-card bg-[#3a3a3a] border-gray-600 p-4 flex flex-col justify-between">
              <p className="text-lg mb-4 text-gray-200 font-bold">{q.texto}</p>
              
              <div className="flex gap-2">
                {q.opciones.map((opcion: string) => (
                  <button
                    key={opcion}
                    onClick={() => seleccionarOpcion(q.id, opcion)}
                    disabled={mostrarResultado}
                    className={`mc-button flex-1 !py-2 !text-sm text-white ${
                      respondido === opcion ? '!bg-[#3b82f6]' : '!bg-[#5a5a5a]'
                    } ${
                      mostrarResultado && opcion === q.correcta ? '!bg-[#528044]' : ''
                    } ${
                      mostrarResultado && respondido === opcion && !esCorrecta ? '!bg-red-600' : ''
                    }`}
                  >
                    {opcion}
                  </button>
                ))}
              </div>

              {/* Lógica de la explicación: Solo aparece si comprobó y se equivocó en ESTA pregunta */}
              {mostrarResultado && respondido && !esCorrecta && (
                <div className="mt-4 p-3 bg-red-900/40 border-2 border-red-500 rounded text-sm text-red-100 animate-pulse">
                  <span className="font-black text-red-400 block mb-1">💡 TIP DE CRAFTEO:</span> 
                  {q.explicacion}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mostrarResultado && gananciaActual > 0 && (
        <div className="mt-8 mc-card !bg-yellow-600 border-yellow-400 text-center animate-bounce">
          <p className="text-2xl font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            ¡INVENTARIO GUARDADO! +{gananciaActual} GEMAS 💎
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        {!mostrarResultado ? (
          <button 
            onClick={comprobar}
            disabled={Object.keys(respuestas).length < preguntas.length}
            className={`mc-button text-white w-full py-4 text-2xl font-black ${
              Object.keys(respuestas).length < preguntas.length ? 'opacity-50 !bg-[#7a7a7a]' : '!bg-[#3b82f6]'
            }`}
          >
            COMPROBAR INVENTARIO
          </button>
        ) : (
          <button 
            onClick={() => { setRespuestas({}); setMostrarResultado(false); setGananciaActual(0); }}
            className="mc-button !bg-[#866043] text-white w-full py-4 text-2xl font-black"
          >
            NUEVA RONDA (REPETIR)
          </button>
        )}
      </div>
    </main>
  );
}