// Barra de progreso del toast

import type { ToastType } from "../types/toast.types";
import { cn } from "@/utils/cn";

interface ToastProgressProps {
  progress: number;
  type: ToastType;
}

export const ToastProgress = ({ progress }: ToastProgressProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
      <div
        className={cn(
          "h-full bg-white transition-all duration-100 ease-linear"
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
