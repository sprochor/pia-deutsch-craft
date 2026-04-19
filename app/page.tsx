"use client";
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';

export default function Home() {
  // Usamos el hook para leer las gemas totales nada más entrar a la app
  const { gems } = useProgress();

  const materias = [
    { 
      id: 'aleman', 
      nombre: 'Alemán', 
      descripcion: 'Bioma desbloqueado: Examen 17/04',
      bloque: 'bg-[#528044]', // Verde tipo pasto
      btnColor: '!bg-[#528044] hover:!bg-[#639c52]',
      icono: '📖',
      status: 'unlocked'
    },
    { 
      id: 'ingles', 
      nombre: 'Inglés', 
      descripcion: 'Bioma desbloqueado: Examen 21/04',
      bloque: 'bg-[#ef4444]', // Rojo tipo Redstone
      btnColor: '!bg-[#ef4444] hover:!bg-[#dc2626]',
      icono: '🧭',
      status: 'unlocked'
    },
    { 
      id: 'matematica', 
      nombre: 'Matemática', 
      descripcion: 'Próximamente...', 
      bloque: 'bg-[#3b82f6]', // Azul tipo diamante
      btnColor: '',
      icono: '📐',
      status: 'locked'
    }
  ];

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto relative">
      
      {/* Inventario Global de Gemas */}
      <div className="absolute top-4 right-4 z-50">
        <div className="mc-card !bg-[#313131] !p-2 !border-2 flex items-center gap-2 border-yellow-500 shadow-lg">
          <span className="text-2xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">💎</span>
          <span className="text-xl font-black text-yellow-400 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {gems}
          </span>
        </div>
      </div>

      <header className="text-center mb-12 mt-8">
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-widest text-[#528044] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          PIACRAFT ACADEMY
        </h1>
        <p className="text-xl text-gray-300 font-bold">Selecciona tu bioma de estudio, Pia</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {materias.map((materia) => (
          <div key={materia.id} className={`mc-card ${materia.status === 'locked' ? 'opacity-50 grayscale' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">{materia.icono || '🔒'}</span>
              <span className={`px-3 py-1 text-xs font-black uppercase text-white ${materia.bloque} border-2 border-black drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]`}>
                Nivel 4to Grado
              </span>
            </div>
            
            <h2 className="text-3xl font-black mb-2 tracking-wide text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              {materia.nombre}
            </h2>
            <p className="text-gray-300 mb-6 font-bold">{materia.descripcion}</p>

            {materia.status !== 'locked' ? (
              <Link href={`/materias/${materia.id}`}>
                <button className={`mc-button w-full text-white ${materia.btnColor}`}>
                  VIAJAR AL BIOMA
                </button>
              </Link>
            ) : (
              <button className="mc-button w-full cursor-not-allowed text-gray-400 !bg-[#7a7a7a]" disabled>
                CRAFTEANDO...
              </button>
            )}
          </div>
        ))}
      </div>

      <footer className="mt-20 text-center text-gray-500 text-sm font-bold uppercase tracking-wider">
        Desarrollado para la mejor jugadora del Pestalozzi
      </footer>
    </main>
  );
}