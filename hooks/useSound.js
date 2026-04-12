"use client";
import { useCallback } from 'react';

export function useSound() {
  // useCallback asegura que la función no se recree en cada render
  const play = useCallback((soundName) => {
    try {
      // Crea el audio y lo reproduce
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.volume = 0.5; // Volumen al 50% para que no aturda
      audio.play().catch(e => console.log("Sonido bloqueado por el navegador", e));
    } catch (error) {
      console.error("Error al reproducir audio:", error);
    }
  }, []);

  return {
    playClick: () => play('click'),
    playSuccess: () => play('level_up'),
    playError: () => play('creeper'),
    playBuy: () => play('villager'),
  };
}