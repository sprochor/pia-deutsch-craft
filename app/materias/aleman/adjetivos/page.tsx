"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";
import { useSound } from "@/hooks/useSound";

export default function AdjetivosPage() {
  const { gems, addGems } = useProgress();
  const { playClick, playSuccess, playError } = useSound();
  const [situaciones, setSituaciones] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [gananciaActual, setGananciaActual] = useState(0);

  // Pool de situaciones con explicaciones agregadas
  const poolSituaciones = [
    {
      id: 1,
      texto: "Un Creeper se tropieza y cae a la lava con sus bloques.",
      opciones: ["ungeschickt", "mutig"],
      correcta: "ungeschickt",
      explicacion: "'Ungeschickt' significa torpe. ¡Un Creeper que se cae a la lava definitivamente es muy torpe!"
    },
    {
      id: 2,
      texto: "Tu lobo Galleta no le tiene miedo a los esqueletos y te defiende.",
      opciones: ["schüchtern", "mutig"],
      correcta: "mutig",
      explicacion: "'Mutig' significa valiente. 'Schüchtern' es tímido. Galleta es súper valiente por enfrentarse a los esqueletos."
    },
    {
      id: 3,
      texto: "Un aldeano te regala esmeraldas y comida gratis.",
      opciones: ["großzügig", "faul"],
      correcta: "großzügig",
      explicacion: "'Großzügig' es generoso. Si te regala cosas en lugar de cobrártelas, ¡es un gran aldeano!"
    },
    {
      id: 4,
      texto: "Alex siempre te ayuda a terminar tu casa de madera.",
      opciones: ["hilfsbereit", "witzig"],
      correcta: "hilfsbereit",
      explicacion: "'Hilfsbereit' viene de 'Hilfe' (ayuda). Alguien que te ayuda a construir es muy servicial y solidario."
    },
    {
      id: 5,
      texto: "Steve habla muchísimo por el chat del servidor.",
      opciones: ["ruhig", "gesprächig"],
      correcta: "gesprächig",
      explicacion: "'Gesprächig' significa hablador o conversador. 'Ruhig' sería alguien muy tranquilo y callado."
    },
    {
      id: 6,
      texto: "Un Enderman te mira muy serio y no hace chistes.",
      opciones: ["witzig", "ernst"],
      correcta: "ernst",
      explicacion: "'Ernst' significa serio. Los Enderman definitivamente no son conocidos por ser graciosos ('witzig')."
    },
    {
      id: 7,
      texto: "Pia siempre hace sus tareas de alemán con ganas.",
      opciones: ["fleißig", "faul"],
      correcta: "fleißig",
      explicacion: "'Fleißig' significa aplicado o trabajador. ¡Exactamente como tú estudiando para este examen!"
    },
    {
      id: 8,
      texto: "Un zombie es muy lento y solo quiere dormir.",
      opciones: ["sportlich", "faul"],
      correcta: "faul",
      explicacion: "'Faul' significa perezoso o vago. Un zombie que no quiere hacer nada es muy 'faul'."
    },
    {
      id: 9,
      texto: "Corres muy rápido por todos los biomas.",
      opciones: ["sportlich", "schüchtern"],
      correcta: "sportlich",
      explicacion: "'Sportlich' significa deportivo o atlético. ¡Correr por los biomas requiere mucha energía!"
    },
    {
      id: 10,
      texto: "Escuchas con atención los problemas de un amigo.",
      opciones: ["verständnisvoll", "ungeschickt"],
      correcta: "verständnisvoll",
      explicacion: "'Verständnisvoll' significa comprensivo. Es cuando entiendes y escuchas bien a los demás."
    },
  ];

  useEffect(() => {
    const shuffled = [...poolSituaciones].sort(() => 0.5 - Math.random());
    setSituaciones(shuffled.slice(0, 6));
  }, []);

  const seleccionar = (id: number, op: string) => {
    if (!mostrarResultado) {
      playClick();
      setRespuestas({ ...respuestas, [id]: op });
    }
  };

  const comprobar = () => {
    const todasCorrectas = situaciones.every(
      (s) => respuestas[s.id] === s.correcta,
    );
    if (todasCorrectas) {
      playSuccess();
      const ganadas = addGems("aleman_adjetivos", 100);
      setGananciaActual(ganadas);
    } else {
      playError();
    }
    setMostrarResultado(true);
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto relative">
      <div className="absolute top-4 right-4 z-50">
        <div className="mc-card !bg-[#313131] !p-2 !border-2 flex items-center gap-2 border-yellow-500 shadow-lg">
          <span className="text-2xl">💎</span>
          <span className="text-xl font-black text-yellow-400">{gems}</span>
        </div>
      </div>

      <Link href="/materias/aleman">
        <button
          className="mc-button !bg-[#7a7a7a] text-white mb-8 text-sm px-4 py-2 mt-4"
          onClick={playClick}
        >
          ⬅ Volver al Bioma
        </button>
      </Link>

      <div className="mc-card mb-8 border-[#3b82f6]">
        <h1 className="text-3xl font-black text-[#3b82f6] mb-2 uppercase tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Misión 2: El Yunque de Adjetivos
        </h1>
        <p className="text-gray-300 font-bold italic">
          Forja las características de cada mob...
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {situaciones.map((s) => {
          const respondido = respuestas[s.id];
          const esCorrecta = respondido === s.correcta;

          return (
            <div
              key={s.id}
              className="mc-card bg-[#3a3a3a] border-gray-600 p-4 flex flex-col justify-between"
            >
              <p className="text-lg mb-4 text-gray-200 font-bold">{s.texto}</p>
              <div className="flex flex-col gap-2">
                {s.opciones.map((opcion: string) => (
                  <button
                    key={opcion}
                    onClick={() => seleccionar(s.id, opcion)}
                    disabled={mostrarResultado}
                    className={`mc-button !py-2 !text-sm text-white ${
                      respondido === opcion ? "!bg-[#3b82f6]" : "!bg-[#5a5a5a]"
                    } ${
                      mostrarResultado && opcion === s.correcta
                        ? "!bg-[#528044]"
                        : ""
                    } ${
                      mostrarResultado && respondido === opcion && !esCorrecta
                        ? "!bg-red-600"
                        : ""
                    }`}
                  >
                    {opcion}
                  </button>
                ))}
              </div>

              {/* Lógica de la explicación: Sin animaciones molestas para una lectura clara */}
              {mostrarResultado && respondido && !esCorrecta && (
                <div className="mt-4 p-3 bg-red-900/40 border-2 border-red-500 rounded text-sm text-red-100">
                  <span className="font-black text-red-400 block mb-1">💡 TIP DE FORJA:</span> 
                  {s.explicacion}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mostrarResultado && gananciaActual > 0 && (
        <div className="mt-8 mc-card !bg-yellow-600 border-yellow-400 text-center animate-bounce">
          <p className="text-2xl font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            ¡FORJASTE {gananciaActual} GEMAS! 💎
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        {!mostrarResultado ? (
          <button
            onClick={comprobar}
            disabled={Object.keys(respuestas).length < situaciones.length}
            className={`mc-button text-white w-full py-4 text-2xl font-black ${
              Object.keys(respuestas).length < situaciones.length
                ? "opacity-50 !bg-[#7a7a7a]"
                : "!bg-[#3b82f6]"
            }`}
          >
            FORJAR RESPUESTAS
          </button>
        ) : (
          <button
            onClick={() => {
              setRespuestas({});
              setMostrarResultado(false);
              setGananciaActual(0);
            }}
            className="mc-button !bg-[#866043] text-white w-full py-4 text-2xl font-black"
          >
            NUEVO YUNQUE (REPETIR)
          </button>
        )}
      </div>
    </main>
  );
}