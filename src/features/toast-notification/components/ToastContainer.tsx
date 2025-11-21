// Contenedor principal de todos los toasts

import type { ToastNotification, ToastPosition } from "../types/toast.types";

import { ToastStack } from "./ToastStack";

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
  onExpand: (id: string) => void;
  onCollapse: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
}

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export const ToastContainer = ({
  toasts,
  onDismiss,
  onExpand,
  onCollapse,
  onPause,
  onResume,
}: ToastContainerProps) => {
  return (
    <>
      {POSITIONS.map((position) => (
        <ToastStack
          key={position}
          toasts={toasts}
          position={position}
          onDismiss={onDismiss}
          onExpand={onExpand}
          onCollapse={onCollapse}
          onPause={onPause}
          onResume={onResume}
        />
      ))}
    </>
  );
};
