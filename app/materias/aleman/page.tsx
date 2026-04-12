"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function AlemanHubPage() {
  // 👇 Traemos activeTheme, toggleTheme y ownedItems desde el hook
  const { gems, completedMissions, activeTheme, toggleTheme, ownedItems } = useProgress();

  const misiones = [
    { id: "posesivos", titulo: "Misión 1: Posesivos", desc: "Sein vs Ihr (El Inventario)", icono: "⚔️", ruta: "/materias/aleman/posesivos" },
    { id: "adjetivos", titulo: "Misión 2: Adjetivos", desc: "Rasgos de carácter (El Yunque)", icono: "🎭", ruta: "/materias/aleman/adjetivos" },
    { id: "oraciones", titulo: "Misión 3: Crafteo", desc: "Armar oraciones (Mesa de Crafteo)", icono: "🧱", ruta: "/materias/aleman/oraciones" },
  ];

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto relative text-white bg-[#1e1e1e]">
      {/* HUD de Gemas */}
      <div className="absolute top-4 right-4 z-50">
        <div className="mc-card !bg-[#313131] !p-2 !border-2 border-yellow-500 flex items-center gap-2 shadow-lg">
          <span className="text-2xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">💎</span>
          <span className="text-xl font-black text-yellow-400 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">{gems}</span>
        </div>
      </div>

      <Link href="/">
        <button className="mc-button !bg-[#7a7a7a] text-white mb-8 text-sm px-4 py-2 mt-4">
          ⬅ Volver al Mapa Principal
        </button>
      </Link>

      <div className="mc-card mb-8 border-[#528044] text-center bg-[#2d2d2d]">
        <h1 className="text-4xl font-black text-[#528044] mb-2 uppercase tracking-widest drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          BIOMA ALEMÁN
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

      {/* 👇 EL VESTIDOR DE SKINS: Solo aparece si Pia compró la skin */}
      {ownedItems?.skin_pink && (
        <div className="mc-card mb-8 border-[#ff69b4] bg-[#ffb6c1]/10 p-4">
          <p className="text-center text-xs font-bold uppercase mb-3 tracking-widest text-[#ff69b4]">
            👗 VESTIDOR DE SKINS
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => toggleTheme("minecraft")}
              className={`mc-button flex-1 !py-2 !text-xs text-white transition-all ${activeTheme === "minecraft" ? "!bg-[#528044] border-white scale-105" : "!bg-[#3a3a3a] opacity-70 hover:opacity-100"}`}
            >
              🟩 CLASSIC
            </button>
            <button 
              onClick={() => toggleTheme("skin_pink")}
              className={`mc-button flex-1 !py-2 !text-xs text-white transition-all ${activeTheme === "skin_pink" ? "!bg-[#ff69b4] border-white scale-105" : "!bg-[#3a3a3a] opacity-70 hover:opacity-100"}`}
            >
              🌸 MY MELODY
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {misiones.map((m) => {
          const misionesGuardadas = completedMissions as Record<string, number>;
          const vecesCompletada = misionesGuardadas[`aleman_${m.id}`] || 0;
          const yaCompletada = vecesCompletada > 0;

          return (
            <Link key={m.id} href={m.ruta} className="block">
              <div className={`mc-card flex items-center justify-between transition-transform hover:-translate-y-1 active:translate-y-0 cursor-pointer ${
                  yaCompletada ? "border-yellow-500 bg-[#3a3a3a]" : "border-gray-600 bg-[#2a2a2a]"
              }`}>
                <div className="flex items-center gap-4">
                  <span className={`text-4xl p-3 border-4 ${yaCompletada ? "border-yellow-500" : "border-black"}`}>
                    {m.icono}
                  </span>
                  <div>
                    <h3 className={`font-black text-2xl ${yaCompletada ? "text-yellow-400" : "text-white"}`}>
                      {m.titulo}
                    </h3>
                    <p className="text-gray-300 text-sm">{m.desc}</p>
                    {yaCompletada && (
                      <span className="text-xs text-yellow-500 font-bold mt-1 block">
                        ⭐ Completada {vecesCompletada} {vecesCompletada === 1 ? "vez" : "veces"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-3xl bg-[#528044] p-2 border-2 border-black drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">▶</div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}