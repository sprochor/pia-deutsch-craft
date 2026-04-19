"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useSound } from '@/hooks/useSound';

export default function NumerosPage() {
  const { gems, addGems } = useProgress();
  const { playClick, playSuccess, playError } = useSound();
  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [gananciaActual, setGananciaActual] = useState(0);

  const poolPreguntas = [
    // Nivel Escritura (1-20)
    { id: 1, texto: "Escribe en inglés el número: 12", tipo: "escribir", correcta: "twelve", explicacion: "12 se escribe 'twelve'. ¡No te olvides de la 'v'!" },
    { id: 2, texto: "Escribe en inglés el número: 8", tipo: "escribir", correcta: "eight", explicacion: "8 se escribe 'eight'. Es una palabra difícil, ¡lleva 'ght'!" },
    { id: 3, texto: "Escribe en inglés el número: 15", tipo: "escribir", correcta: "fifteen", explicacion: "15 es 'fifteen' (no 'fiveteen'). ¡Se cambia el five por fif!" },
    { id: 4, texto: "Escribe en inglés el número: 20", tipo: "escribir", correcta: "twenty", explicacion: "20 se escribe 'twenty'." },
    { id: 5, texto: "Escribe en inglés el número: 11", tipo: "escribir", correcta: "eleven", explicacion: "11 se escribe 'eleven'." },
    
    // Nivel Reconocimiento (21-100)
    { id: 6, texto: "¿Cuál es el número 'FIFTY'?", opciones: ["15", "50", "5"], correcta: "50", explicacion: "Los que terminan en '-ty' son las decenas (20, 30, 40...). Fifty es 50." },
    { id: 7, texto: "¿Cómo se dice 33 en inglés?", opciones: ["Thirty-three", "Thirteen-three", "Twenty-three"], correcta: "Thirty-three", explicacion: "30 es 'thirty'. Así que 33 es 'thirty-three'." },
    { id: 8, texto: "¿Cuál es el número 'EIGHTY-TWO'?", opciones: ["28", "82", "18"], correcta: "82", explicacion: "Eighty (80) + two (2) = 82." },
    { id: 9, texto: "¿Cómo se dice 100 en inglés?", opciones: ["A hundred", "Ten-ten", "A million"], correcta: "A hundred", explicacion: "100 se dice 'a hundred' o 'one hundred'." },
    { id: 10, texto: "¿Cuál es el número 'FORTY-FOUR'?", opciones: ["14", "44", "40"], correcta: "44", explicacion: "Forty es 40. ¡Cuidado que no lleva la 'u' de four!" }
  ];

  useEffect(() => {
    const shuffled = [...poolPreguntas].sort(() => 0.5 - Math.random());
    setPreguntas(shuffled.slice(0, 5));
  }, []);

  const manejarCambio = (id: number, valor: string) => {
    setRespuestas({ ...respuestas, [id]: valor.toLowerCase().trim() });
  };

  const comprobar = () => {
    const todasCorrectas = preguntas.every(q => respuestas[q.id] === q.correcta.toLowerCase());
    if (todasCorrectas) {
      playSuccess();
      const ganadas = addGems('ingles_numeros', 150);
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

      <div className="mc-card mb-8 border-[#ef4444] bg-[#2d2d2d]">
        <h1 className="text-3xl font-black text-[#ef4444] mb-2 uppercase tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Misión 1: La Mina de Números
        </h1>
        <p className="text-gray-300 font-bold italic text-sm">Escribe los pequeños y reconoce los grandes para ganar gemas.</p>
      </div>

      <div className="grid gap-6">
        {preguntas.map((q) => {
          const respondido = respuestas[q.id];
          const esCorrecta = respondido === q.correcta.toLowerCase();

          return (
            <div key={q.id} className="mc-card bg-[#3a3a3a] border-gray-600 p-6">
              <p className="text-lg mb-4 text-gray-200 font-bold">{q.texto}</p>
              
              {q.tipo === "escribir" ? (
                <input
                  type="text"
                  disabled={mostrarResultado}
                  onChange={(e) => manejarCambio(q.id, e.target.value)}
                  placeholder="Escribe aquí..."
                  className="w-full bg-[#1e1e1e] border-2 border-gray-500 p-3 font-mono text-yellow-400 focus:border-yellow-500 outline-none"
                />
              ) : (
                <div className="flex flex-wrap gap-3">
                  {q.opciones.map((opcion: string) => (
                    <button
                      key={opcion}
                      onClick={() => manejarCambio(q.id, opcion)}
                      disabled={mostrarResultado}
                      className={`mc-button flex-1 !py-3 text-white ${
                        respondido === opcion.toLowerCase() ? '!bg-[#3b82f6]' : '!bg-[#5a5a5a]'
                      } ${
                        mostrarResultado && opcion === q.correcta ? '!bg-[#528044]' : ''
                      } ${
                        mostrarResultado && respondido === opcion.toLowerCase() && !esCorrecta ? '!bg-red-600' : ''
                      }`}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              )}

              {mostrarResultado && !esCorrecta && (
                <div className="mt-4 p-4 bg-red-900/40 border-2 border-red-500 rounded text-sm">
                  <p className="mb-1"><span className="font-black text-red-400">CORRECTO:</span> {q.correcta}</p>
                  <p className="text-red-100 italic"><span className="font-black">💡 TIP:</span> {q.explicacion}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mostrarResultado && gananciaActual > 0 && (
        <div className="mt-8 mc-card !bg-yellow-600 border-yellow-400 text-center animate-bounce">
          <p className="text-2xl font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            ¡MINERÍA EXITOSA! +{gananciaActual} GEMAS 💎
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        {!mostrarResultado ? (
          <button 
            onClick={comprobar}
            disabled={Object.keys(respuestas).length < preguntas.length}
            className={`mc-button text-white w-full py-4 text-2xl font-black ${
              Object.keys(respuestas).length < preguntas.length ? 'opacity-50 !bg-[#7a7a7a]' : '!bg-[#ef4444]'
            }`}
          >
            GUARDAR MINERALES (COMPROBAR)
          </button>
        ) : (
          <button 
            onClick={() => { setRespuestas({}); setMostrarResultado(false); setGananciaActual(0); window.location.reload(); }}
            className="mc-button !bg-[#866043] text-white w-full py-4 text-2xl font-black"
          >
            VOLVER A MINAR (REPETIR)
          </button>
        )}
      </div>
    </main>
  );
}