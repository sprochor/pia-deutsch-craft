"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";
import { useSound } from "@/hooks/useSound";

interface Item {
  id: string;
  nombre: string;
  precio: number;
  icono: string;
  descripcion: string;
}

export default function TiendaPage() {
  const { gems, buyItem, ownedItems } = useProgress(); // Asumiendo que actualizaste el hook
  const { playClick, playBuy, playError } = useSound();
  const [mensaje, setMensaje] = useState("");

  const stock: Item[] = [
    {
      id: "skin_pink",
      nombre: "Skin My Melody",
      precio: 300,
      icono: "🐰",
      descripcion: "Cambia el tema de la web a rosa pixelado.",
    },
    {
      id: "galleta_bone",
      nombre: "Hueso de Diamante",
      precio: 100,
      icono: "🦴",
      descripcion: "¡Un regalo especial para Galleta!",
    },
    {
      id: "enchant_book",
      nombre: "Libro Encantado",
      precio: 50,
      icono: "📖",
      descripcion: "Revela una regla de gramática secreta.",
    },
    {
      id: "diamond_sword",
      nombre: "Espada de Repaso",
      precio: 250,
      icono: "⚔️",
      descripcion: "Doble de gemas en la próxima misión.",
    },
  ];

  const manejarCompra = (item: Item) => {
    playClick(); // Suena el click apenas toca el botón

    if (ownedItems?.[item.id]) {
      setMensaje("¡Ya tienes este objeto en tu inventario!");
      return;
    }

    if (gems >= item.precio) {
      const exito = buyItem(item.id, item.precio);
      if (exito) {
        playBuy(); // <-- ¡Suena el aldeano porque compró con éxito!
        setMensaje(`¡Crafteo exitoso! Compraste: ${item.nombre}`);
      }
    } else {
      playError(); // <-- Suena el Creeper si no le alcanzan las gemas
      setMensaje("¡No tienes suficientes gemas! Ve a completar misiones.");
    }

    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto relative">
      {/* HUD de Gemas */}
      <div className="absolute top-4 right-4 z-50">
        <div className="mc-card !bg-[#313131] !p-2 !border-2 flex items-center gap-2 border-yellow-500 shadow-lg">
          <span className="text-2xl">💎</span>
          <span className="text-xl font-black text-yellow-400">{gems}</span>
        </div>
      </div>

      <Link href="/materias/aleman">
        <button className="mc-button !bg-[#7a7a7a] text-white mb-8 text-sm px-4 py-2 mt-4">
          ⬅ Salir de la Tienda
        </button>
      </Link>

      <div className="mc-card mb-8 border-[#3b82f6] bg-[#2d2d2d]">
        <h1 className="text-4xl font-black text-[#3b82f6] mb-2 uppercase text-center tracking-tighter">
          LA TIENDA DEL ALDEANO 🏪
        </h1>
        <p className="text-center text-gray-400 font-bold italic">
          "Hrrrmmm... ¿qué vas a comprar hoy?"
        </p>
      </div>

      {mensaje && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 mc-card !bg-black text-white border-white animate-bounce">
          {mensaje}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {stock.map((item) => {
          const yaEsMio = ownedItems?.[item.id];
          return (
            <div
              key={item.id}
              className={`mc-card flex flex-col justify-between ${yaEsMio ? "opacity-70 border-green-500" : "border-gray-600"}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl bg-black/30 p-4 border-2 border-black">
                  {item.icono}
                </span>
                <div>
                  <h3 className="text-xl font-black text-white">
                    {item.nombre}
                  </h3>
                  <p className="text-xs text-gray-400">{item.descripcion}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 bg-black/20 p-2 border-2 border-black">
                <div className="flex items-center gap-1">
                  <span className="text-lg">💎</span>
                  <span className="font-bold text-yellow-500">
                    {item.precio}
                  </span>
                </div>
                <button
                  onClick={() => manejarCompra(item)}
                  className={`mc-button !py-2 !px-4 text-sm ${yaEsMio ? "!bg-green-700" : "!bg-[#528044]"}`}
                >
                  {yaEsMio ? "¡ADQUIRIDO!" : "COMPRAR"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
