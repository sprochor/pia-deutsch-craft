"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useSound } from '@/hooks/useSound';

export default function MochilaPage() {
  const { gems, addGems } = useProgress();
  const { playClick, playSuccess, playError } = useSound();
  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [gananciaActual, setGananciaActual] = useState(0);

  // Pool enfocado en Colours y School Things
  const poolPreguntas = [
    { 
      id: 1, 
      texto: "Guarda un CUADERNO AZUL en la mochila.", 
      opciones: ["A blue copybook 📘", "A red copybook 📕", "A blue backpack 🎒"], 
      correcta: "A blue copybook 📘", 
      explicacion: "Azul es 'blue' y cuaderno es 'copybook'." 
    },
    { 
      id: 2, 
      texto: "Necesitamos un SACAPUNTAS ROJO.", 
      opciones: ["A green sharpener 🟩", "A red eraser 🟥", "A red sharpener 🖍️"], 
      correcta: "A red sharpener 🖍️", 
      explicacion: "Rojo es 'red' y sacapuntas es 'sharpener'." 
    },
    { 
      id: 3, 
      texto: "Falta la GOMA DE BORRAR VERDE.", 
      opciones: ["A green rubber 🟩", "A yellow rubber 🟨", "A green glue 🧪"], 
      correcta: "A green rubber 🟩", 
      explicacion: "Goma de borrar se puede decir 'rubber' (o eraser), y verde es 'green'." 
    },
    { 
      id: 4, 
      texto: "Lleva el PEGAMENTO AMARILLO para plástica.", 
      opciones: ["A yellow glue 🧴", "A pink glue 🌸", "A yellow copybook 📒"], 
      correcta: "A yellow glue 🧴", 
      explicacion: "Amarillo es 'yellow' y pegamento es 'glue'." 
    },
    { 
      id: 5, 
      texto: "¡Y ahora guarda todo en la MOCHILA NEGRA!", 
      opciones: ["A black sharpener ⛏️", "A black backpack 🎒", "A white backpack 🎒"], 
      correcta: "A black backpack 🎒", 
      explicacion: "Negro es 'black' y mochila es 'backpack'." 
    },
    { 
      id: 6, 
      texto: "Te olvidaste la GOMA DE BORRAR ROSA.", 
      opciones: ["A pink rubber 🌸", "A pink copybook 🎟️", "A red eraser 🍎"], 
      correcta: "A pink rubber 🌸", 
      explicacion: "Rosa es 'pink' y goma de borrar es 'rubber' o 'eraser'." 
    }
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
      const ganadas = addGems('ingles_mochila', 100);
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

      <Link href="/materias/ingles">
        <button className="mc-button !bg-[#7a7a7a] text-white mb-8 text-sm px-4 py-2 mt-4" onClick={playClick}>
          ⬅ Volver al Bioma Inglés
        </button>
      </Link>

      <div className="mc-card mb-8 border-[#3b82f6] bg-[#2d2d2d]">
        <h1 className="text-3xl font-black text-[#3b82f6] mb-2 uppercase tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Misión 3: La Mochila
        </h1>
        <p className="text-gray-300 font-bold italic">School things & Colours: ¡Prepara tu inventario para la escuela!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {preguntas.map((q) => {
          const respondido = respuestas[q.id];
          const esCorrecta = respondido === q.correcta;

          return (
            <div key={q.id} className="mc-card bg-[#3a3a3a] border-gray-600 p-4 flex flex-col justify-between">
              <p className="text-lg mb-4 text-gray-200 font-bold">{q.texto}</p>
              <div className="flex flex-col gap-2">
                {q.opciones.map((opcion: string) => (
                  <button
                    key={opcion}
                    onClick={() => seleccionarOpcion(q.id, opcion)}
                    disabled={mostrarResultado}
                    className={`mc-button !py-3 !text-sm text-white ${
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

              {mostrarResultado && respondido && !esCorrecta && (
                <div className="mt-4 p-3 bg-red-900/40 border-2 border-red-500 rounded text-sm text-red-100">
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
            ¡MOCHILA LISTA! +{gananciaActual} GEMAS 💎
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
            CERRAR MOCHILA (COMPROBAR)
          </button>
        ) : (
          <button 
            onClick={() => { setRespuestas({}); setMostrarResultado(false); setGananciaActual(0); }}
            className="mc-button !bg-[#866043] text-white w-full py-4 text-2xl font-black"
          >
            VACIAR Y REPETIR
          </button>
        )}
      </div>
    </main>
  );
}