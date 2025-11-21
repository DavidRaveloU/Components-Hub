// Lógica del timer con pausa

import { useEffect, useRef } from "react";

interface UseToastTimerProps {
  duration?: number; // undefined = sin timer
  onComplete: () => void;
  isPaused: boolean;
}

export function useToastTimer({
  duration,
  onComplete,
  isPaused,
}: UseToastTimerProps) {
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  // Inicializar startTime
  useEffect(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
  }, []);

  // Manejar el timer
  useEffect(() => {
    // Limpiar timer anterior
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Si no hay duration o no está inicializado, salir
    if (!duration || startTimeRef.current === null) {
      return;
    }

    // Si está pausado, guardar el tiempo transcurrido
    if (isPaused) {
      pausedAtRef.current = Date.now() - startTimeRef.current;
      return;
    }

    // Si se reanuda después de pausa, ajustar startTime
    if (pausedAtRef.current > 0) {
      startTimeRef.current = Date.now() - pausedAtRef.current;
      pausedAtRef.current = 0;
    }

    // Calcular tiempo restante
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, duration - elapsed);

    if (remaining === 0) {
      onComplete();
      return;
    }

    // Configurar timer
    timerRef.current = window.setTimeout(() => {
      onComplete();
    }, remaining);

    // Cleanup
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [duration, isPaused, onComplete]);

  // Función para obtener el progreso (se llama desde el componente)
  const getProgress = () => {
    if (!duration || startTimeRef.current === null) return 0;
    const elapsed = isPaused
      ? pausedAtRef.current
      : Date.now() - startTimeRef.current;
    return Math.min((elapsed / duration) * 100, 100);
  };

  return {
    getProgress, // Función, no valor
    remainingTime: duration,
  };
}
