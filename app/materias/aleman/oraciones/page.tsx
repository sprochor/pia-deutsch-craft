"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useSound } from '@/hooks/useSound';

export default function OracionesPage() {
  const { gems, addGems } = useProgress();
  const { playClick, playSuccess, playError } = useSound();
  
  const [misiones, setMisiones] = useState<any[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [palabrasSeleccionadas, setPalabrasSeleccionadas] = useState<string[]>([]);
  const [palabrasDisponibles, setPalabrasDisponibles] = useState<string[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [gananciaActual, setGananciaActual] = useState(0);

  const poolOraciones = [
    { 
      id: 1, 
      desordenadas: ["zusammen", "ins Schwimmbad.", "gehen", "wir", "Am Wochenende"], 
      correcta: "Am Wochenende gehen wir zusammen ins Schwimmbad.",
      explicacion: "En alemán, el verbo siempre va en la POSICIÓN 2. Si empiezas con el tiempo (Am Wochenende), el verbo (gehen) viene inmediatamente después."
    },
    { 
      id: 2, 
      desordenadas: ["Videospiele.", "Wir", "manchmal", "spielen"], 
      correcta: "Wir spielen manchmal Videospiele.",
      explicacion: "Estructura básica: Sujeto (Wir) + Verbo (spielen) + Adverbio (manchmal) + Objeto."
    },
    { 
      id: 3, 
      desordenadas: ["gern", "wir", "Außerdem", "Tennis.", "spielen"], 
      correcta: "Außerdem spielen wir gern Tennis.",
      explicacion: "¡Cuidado con los conectores! 'Außerdem' ocupa la posición 1, por lo que el verbo 'spielen' debe ir en la posición 2."
    },
    { 
      id: 4, 
      desordenadas: ["für Deutsch.", "lernt", "sie", "Nach der Schule"], 
      correcta: "Nach der Schule lernt sie für Deutsch.",
      explicacion: "Al igual que con el tiempo, 'Nach der Schule' cuenta como posición 1, así que el verbo 'lernt' va segundo."
    },
    { 
      id: 5, 
      desordenadas: ["con Galleta.", "spielt", "Er", "gerne"], 
      correcta: "Er spielt gerne con Galleta.",
      explicacion: "Sujeto + Verbo + Adverbio. El verbo 'spielt' se queda en su lugar favorito: la segunda posición."
    },
    { 
      id: 6, 
      desordenadas: ["in dieselbe Schule.", "gehen", "Wir"], 
      correcta: "Wir gehen in dieselbe Schule.",
      explicacion: "Una oración simple: Nosotros (Wir) + vamos (gehen) + a la misma escuela."
    }
  ];

  useEffect(() => {
    const shuffled = [...poolOraciones].sort(() => 0.5 - Math.random()).slice(0, 3);
    setMisiones(shuffled);
    prepararNivel(shuffled[0]);
  }, []);

  const prepararNivel = (mision: any) => {
    setPalabrasSeleccionadas([]);
    // Mezclamos las palabras disponibles para que no aparezcan en orden
    setPalabrasDisponibles([...mision.desordenadas].sort(() => 0.5 - Math.random()));
    setMostrarResultado(false);
    setEsCorrecto(false);
  };

  const agregarPalabra = (palabra: string) => {
    if (mostrarResultado) return;
    playClick();
    setPalabrasSeleccionadas([...palabrasSeleccionadas, palabra]);
    setPalabrasDisponibles(palabrasDisponibles.filter(p => p !== palabra));
  };

  const quitarPalabra = (palabra: string) => {
    if (mostrarResultado) return;
    playClick();
    setPalabrasDisponibles([...palabrasDisponibles, palabra]);
    setPalabrasSeleccionadas(palabrasSeleccionadas.filter(p => p !== palabra));
  };

  const comprobarOracion = () => {
    const intento = palabrasSeleccionadas.join(" ");
    const correcta = misiones[indiceActual].correcta;
    
    if (intento === correcta) {
      playSuccess();
      setEsCorrecto(true);
      const ganadas = addGems('aleman_oraciones', 150);
      setGananciaActual(ganadas);
    } else {
      playError();
      setEsCorrecto(false);
    }
    setMostrarResultado(true);
  };

  const siguienteMision = () => {
    if (indiceActual < misiones.length - 1) {
      const siguienteIndice = indiceActual + 1;
      setIndiceActual(siguienteIndice);
      prepararNivel(misiones[siguienteIndice]);
      setGananciaActual(0);
    }
  };

  if (misiones.length === 0) return null;

  const misionActual = misiones[indiceActual];

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto relative text-white bg-[#1e1e1e]">
      {/* HUD de Gemas */}
      <div className="absolute top-4 right-4 z-50">
        <div className="mc-card !bg-[#313131] !p-2 !border-2 border-yellow-500 flex items-center gap-2 shadow-lg">
          <span className="text-2xl">💎</span>
          <span className="text-xl font-black text-yellow-400">{gems}</span>
        </div>
      </div>

      <Link href="/materias/aleman">
        <button className="mc-button !bg-[#7a7a7a] mb-8 text-sm px-4 py-2 mt-4" onClick={playClick}>
          ⬅ Volver al Bioma
        </button>
      </Link>

      <div className="mc-card mb-8 border-[#528044] bg-[#2d2d2d]">
        <h1 className="text-3xl font-black text-[#528044] mb-2 uppercase tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Misión 3: Mesa de Crafteo
        </h1>
        <p className="text-gray-300 font-bold italic">Ordena las palabras para completar la misión ({indiceActual + 1}/3)</p>
      </div>

      {/* Área de Crafteo (Oración que se va armando) */}
      <div className="mc-card bg-[#4e4e4e] border-black min-h-[120px] mb-8 flex flex-wrap gap-2 items-center justify-center p-6">
        {palabrasSeleccionadas.length === 0 && !mostrarResultado && (
          <span className="text-gray-400 italic">Selecciona palabras para craftear la oración...</span>
        )}
        {palabrasSeleccionadas.map((palabra, idx) => (
          <button
            key={`sel-${idx}`}
            onClick={() => quitarPalabra(palabra)}
            disabled={mostrarResultado}
            className="mc-button !bg-[#3b82f6] text-white animate-in zoom-in"
          >
            {palabra}
          </button>
        ))}
      </div>

      {/* Feedback y Explicación */}
      {mostrarResultado && (
        <div className={`mc-card mb-8 transition-all border-4 ${esCorrecto ? 'border-green-500 bg-green-900/30' : 'border-red-500 bg-red-900/30'}`}>
          <div className="text-xl font-black mb-2 flex items-center justify-center gap-2">
            {esCorrecto ? (
              <>
                <span className="animate-bounce">💎</span> 
                <span>¡CRAFTEO EXITOSO!</span> 
                <span className="animate-bounce">💎</span>
              </>
            ) : (
              "¡ERROR DE CRAFTEO! 🧨"
            )}
          </div>
          
          {!esCorrecto && (
            <div className="text-left bg-black/40 p-4 rounded border border-red-400 mt-4">
              <p className="text-red-300 text-sm mb-2 font-bold">Respuesta correcta:</p>
              <p className="text-white text-lg mb-3">{misionActual.correcta}</p>
              <hr className="border-red-500/30 mb-3" />
              <p className="text-red-100 text-sm leading-relaxed">
                <span className="font-black text-red-400 text-base">💡 TIP DE CRAFTEO:</span> <br/>
                {misionActual.explicacion}
              </p>
            </div>
          )}
          
          {esCorrecto && gananciaActual > 0 && (
            <p className="text-yellow-400 font-bold text-lg mt-2">Ganaste {gananciaActual} gemas</p>
          )}
        </div>
      )}

      {/* Inventario de Palabras */}
      {!mostrarResultado && (
        <div className="mc-card bg-[#313131] border-gray-500 p-6 mb-8 text-center">
          <p className="text-xs text-gray-400 uppercase mb-4 tracking-widest font-bold">Inventario de Palabras</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {palabrasDisponibles.map((palabra, idx) => (
              <button
                key={`disp-${idx}`}
                onClick={() => agregarPalabra(palabra)}
                className="mc-button !bg-[#5a5a5a] text-white hover:!bg-[#707070]"
              >
                {palabra}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="text-center">
        {!mostrarResultado ? (
          <button
            onClick={comprobarOracion}
            disabled={palabrasSeleccionadas.length === 0}
            className={`mc-button w-full py-4 text-2xl font-black ${
              palabrasSeleccionadas.length === 0 ? 'opacity-50 !bg-gray-600' : '!bg-[#528044]'
            }`}
          >
            CRAFTEAR ORACIÓN
          </button>
        ) : (
          <button
            onClick={indiceActual < misiones.length - 1 ? siguienteMision : () => window.location.reload()}
            className="mc-button !bg-[#3b82f6] w-full py-4 text-2xl font-black"
          >
            {indiceActual < misiones.length - 1 ? "SIGUIENTE MISIÓN" : "TERMINAR PARTIDA"}
          </button>
        )}
      </div>
    </main>
  );
}