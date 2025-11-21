// Manejo de la pila (traer al frente, etc.)

import type { ToastNotification, ToastPosition } from "../types/toast.types";
import {
  calculateStackOffset,
  calculateStackOpacity,
  calculateStackScale,
  calculateStackZIndex,
} from "../utils/toastUtils";
import { useCallback, useState } from "react";

interface UseToastStackProps {
  toasts: ToastNotification[];
  position: ToastPosition;
}

export function useToastStack({ toasts, position }: UseToastStackProps) {
  // ID del toast que está temporalmente al frente (por hover)
  const [frontToastId, setFrontToastId] = useState<string | null>(null);

  // Filtrar toasts por posición y ordenar por fecha (más recientes primero)
  const stackToasts = toasts
    .filter((toast) => toast.position === position)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Traer toast al frente temporalmente
  const bringToFront = useCallback((toastId: string) => {
    setFrontToastId(toastId);
  }, []);

  // Devolver toast a su posición original
  const sendToBack = useCallback(() => {
    setFrontToastId(null);
  }, []);

  // Calcular el índice en la pila para cada toast
  const getStackIndex = useCallback(
    (toastId: string) => {
      // Si es el toast al frente, siempre es índice 0 (más visible)
      if (frontToastId === toastId) {
        return 0;
      }

      // Encontrar el índice real en el stack
      const index = stackToasts.findIndex((t) => t.id === toastId);

      // Si el toast al frente existe y está antes de este toast, ajustar índice
      if (frontToastId) {
        const frontIndex = stackToasts.findIndex((t) => t.id === frontToastId);
        if (frontIndex !== -1 && frontIndex < index) {
          return index; // Mantener el índice original
        }
      }

      return index;
    },
    [stackToasts, frontToastId]
  );

  // Verificar si un toast está apilado (no es el primero)
  const isStacked = useCallback(
    (toastId: string) => {
      const index = getStackIndex(toastId);
      return index > 0;
    },
    [getStackIndex]
  );

  // Obtener offset vertical para apilar toasts
  const getStackOffset = useCallback(
    (toastId: string) => {
      const index = getStackIndex(toastId);
      return calculateStackOffset(index, position);
    },
    [getStackIndex, position]
  );

  // Obtener escala para toasts apilados
  const getStackScale = useCallback(
    (toastId: string) => {
      const index = getStackIndex(toastId);
      return calculateStackScale(index);
    },
    [getStackIndex]
  );

  // Obtener opacidad para toasts apilados
  const getStackOpacity = useCallback(
    (toastId: string) => {
      const index = getStackIndex(toastId);
      return calculateStackOpacity(index);
    },
    [getStackIndex]
  );

  // Obtener z-index para toasts apilados
  const getStackZIndex = useCallback(
    (toastId: string) => {
      const index = getStackIndex(toastId);
      return calculateStackZIndex(index, stackToasts.length);
    },
    [getStackIndex, stackToasts.length]
  );

  return {
    stackToasts,
    frontToastId,
    bringToFront,
    sendToBack,
    getStackIndex,
    isStacked,
    getStackOffset,
    getStackScale,
    getStackOpacity,
    getStackZIndex,
  };
}
