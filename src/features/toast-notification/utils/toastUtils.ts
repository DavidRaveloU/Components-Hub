// Utilidades para el sistema de toasts

import type { ToastNotification, ToastPosition } from "../types/toast.types";

/**
 * Límite máximo de toasts por stack/posición
 */
export const MAX_TOASTS_PER_STACK = 3;

/**
 * Aplica el límite de toasts por posición.
 * Si hay más de MAX_TOASTS_PER_STACK en una posición, elimina los más antiguos.
 */
export function applyToastLimit(
  toasts: ToastNotification[]
): ToastNotification[] {
  // Agrupar por posición
  const toastsByPosition = toasts.reduce((acc, toast) => {
    if (!acc[toast.position]) {
      acc[toast.position] = [];
    }
    acc[toast.position].push(toast);
    return acc;
  }, {} as Record<ToastPosition, ToastNotification[]>);

  // Aplicar límite a cada posición
  const limitedToasts: ToastNotification[] = [];

  Object.values(toastsByPosition).forEach((positionToasts) => {
    // Ordenar por fecha de creación (más recientes primero)
    const sorted = [...positionToasts].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    // Tomar solo los primeros MAX_TOASTS_PER_STACK
    const limited = sorted.slice(0, MAX_TOASTS_PER_STACK);
    limitedToasts.push(...limited);
  });

  return limitedToasts;
}

/**
 * Calcula el offset vertical para el stacking visual
 * Cada toast se desplaza hacia abajo (top) o hacia arriba (bottom)
 */
export function calculateStackOffset(index: number, position: string): number {
  // Offset de 12px por cada toast apilado
  const offset = index * 12;

  // Si la posición es bottom, apilar hacia arriba (offset negativo)
  if (position.includes("bottom")) {
    return -offset;
  }

  // Si es top, apilar hacia abajo (offset positivo)
  return offset;
}

/**
 * Calcula la escala para el stacking visual
 * Los toasts más atrás se hacen ligeramente más pequeños
 */
export function calculateStackScale(index: number): number {
  // Cada toast apilado se reduce 2% (máximo 10% para 5 toasts)
  return 1 - index * 0.02;
}

/**
 * Calcula la opacidad para el stacking visual
 * Los toasts más atrás mantienen buena visibilidad
 */
export function calculateStackOpacity(index: number): number {
  // Opacidad completa para todos (index se mantiene para consistencia de API)
  return index >= 0 ? 1 : 1;
}

/**
 * Calcula el z-index para el stacking
 * Los toasts más recientes tienen mayor z-index
 */
export function calculateStackZIndex(
  index: number,
  totalToasts: number
): number {
  // Invertir: índice 0 (más reciente) = z-index más alto
  return totalToasts - index;
}
