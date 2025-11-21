// Stack de toasts (contenedor por posición)

import type { ToastNotification, ToastPosition } from "../types/toast.types";

import { Toast } from "./Toast";
import { cn } from "@/utils/cn";

interface ToastStackProps {
  toasts: ToastNotification[];
  position: ToastPosition;
  onDismiss: (id: string) => void;
  onExpand: (id: string) => void;
  onCollapse: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
}

// Clases de posicionamiento
const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left": "top-8 left-8",
  "top-center": "top-8 left-1/2 -translate-x-1/2",
  "top-right": "top-8 right-8",
  "bottom-left": "bottom-8 left-8",
  "bottom-center": "bottom-8 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-8 right-8",
};

export const ToastStack = ({
  toasts,
  position,
  onDismiss,
  onExpand,
  onCollapse,
  onPause,
  onResume,
}: ToastStackProps) => {
  // Filtrar toasts por posición y ordenar por fecha (más recientes primero)
  const stackToasts = toasts
    .filter((toast) => toast.position === position)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  if (stackToasts.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col gap-3 pointer-events-none",
        POSITION_CLASSES[position]
      )}
    >
      {stackToasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            toast={toast}
            onDismiss={onDismiss}
            onExpand={onExpand}
            onCollapse={onCollapse}
            onPause={onPause}
            onResume={onResume}
          />
        </div>
      ))}
    </div>
  );
};
