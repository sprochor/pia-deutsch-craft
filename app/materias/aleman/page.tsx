"use client";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function AlemanHubPage() {
  const { gems, completedMissions } = useProgress();

  const misiones = [
    {
      id: "posesivos",
      titulo: "Misión 1: Posesivos",
      desc: "Sein vs Ihr (El Inventario)",
      icono: "⚔️",
      ruta: "/materias/aleman/posesivos",
    },
    {
      id: "adjetivos",
      titulo: "Misión 2: Adjetivos",
      desc: "Rasgos de carácter (El Yunque)",
      icono: "🎭",
      ruta: "/materias/aleman/adjetivos",
    },
    {
      id: "oraciones",
      titulo: "Misión 3: Crafteo",
      desc: "Armar oraciones (Mesa de Crafteo)",
      icono: "🧱",
      ruta: "/materias/aleman/oraciones",
    },
  ];

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto relative">
      <div className="absolute top-4 right-4 z-50">
        <div className="mc-card !bg-[#313131] !p-2 !border-2 flex items-center gap-2 border-yellow-500 shadow-lg">
          <span className="text-2xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">💎</span>
          <span className="text-xl font-black text-yellow-400 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {gems}
          </span>
        </div>
      </div>

      <Link href="/">
        <button className="mc-button !bg-[#7a7a7a] text-white mb-8 text-sm px-4 py-2 mt-4">
          ⬅ Volver al Mapa Principal
        </button>
      </Link>

      <div className="mc-card mb-12 border-[#528044] text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <h1 className="text-4xl font-black text-[#528044] mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] tracking-widest uppercase">
          Bioma Alemán
        </h1>
        <p className="text-gray-300 font-bold bg-black/50 inline-block px-4 py-1">
          Examen: Viernes 17/04
        </p>
      </div>

      <div className="mb-8 text-center">
        <Link href="/materias/aleman/tienda">
          <button className="mc-button !bg-[#866043] hover:!bg-[#9e714f] text-white w-full py-4 text-2xl font-black shadow-lg animate-pulse border-yellow-500">
            🏪 VISITAR LA TIENDA DEL ALDEANO
          </button>
        </Link>
      </div>

      <div className="space-y-6">
        {misiones.map((m) => {
          // 1. Definimos el tipo para que TS no se queje
          const misionesGuardadas = completedMissions as Record<string, number>;
          
          // 2. Buscamos cuántas veces se completó
          const vecesCompletada = misionesGuardadas[`aleman_${m.id}`] || 0;
          
          // 3. DECLARAMOS la variable que faltaba
          const yaCompletada = vecesCompletada > 0;

          return (
            <Link key={m.id} href={m.ruta} className="block">
              <div
                className={`mc-card flex items-center justify-between transition-transform hover:-translate-y-1 active:translate-y-0 cursor-pointer ${
                  yaCompletada
                    ? "border-yellow-500 bg-[#4a4a4a]"
                    : "border-gray-600 bg-[#3a3a3a]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-4xl bg-[#313131] p-3 border-4 ${
                        yaCompletada ? "border-yellow-500" : "border-black"
                    }`}
                  >
                    {m.icono}
                  </span>
                  <div>
                    <h3
                      className={`font-black text-2xl tracking-wide ${
                        yaCompletada ? "text-yellow-400" : "text-white"
                      }`}
                    >
                      {m.titulo}
                    </h3>
                    <p className="text-gray-300 text-sm">{m.desc}</p>
                    {yaCompletada && (
                      <span className="text-xs text-yellow-500 font-bold mt-1 block">
                        ⭐ Completada {vecesCompletada}{" "}
                        {vecesCompletada === 1 ? "vez" : "veces"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-3xl bg-[#528044] p-2 border-2 border-black drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-white">
                  ▶
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}