"use client";
import { useCallback } from 'react';

export function useSound() {
  // Ahora que el archivo es .ts, este ": string" es legal
  const play = useCallback((soundName: string) => {
    try {
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio bloqueado por el navegador", e));
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