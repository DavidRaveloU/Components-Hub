// Toast individual

import { useEffect, useState } from "react";

import { TOAST_TYPE_CONFIG } from "../config/toastConfig";
import type { ToastNotification } from "../types/toast.types";
import { ToastProgress } from "./ToastProgress";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useToastTimer } from "../hooks/useToastTimer";

interface ToastProps {
  toast: ToastNotification;
  onDismiss: (id: string) => void;
  onExpand: (id: string) => void;
  onCollapse: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
}

export const Toast = ({
  toast,
  onDismiss,
  onExpand,
  onCollapse,
  onPause,
  onResume,
}: ToastProps) => {
  const [progress, setProgress] = useState(0);
  const config = TOAST_TYPE_CONFIG[toast.type];
  const Icon = config.icon;

  // Timer hook
  const { getProgress } = useToastTimer({
    duration: toast.duration,
    onComplete: () => onDismiss(toast.id),
    isPaused: toast.isPaused,
  });

  // Actualizar progreso continuamente
  useEffect(() => {
    if (!toast.duration) return;

    let animationFrameId: number;

    const updateProgress = () => {
      setProgress(getProgress());
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [getProgress, toast.duration]);

  // Handlers
  const handleMouseEnter = () => {
    if (toast.duration) {
      onPause(toast.id);
    }
  };

  const handleMouseLeave = () => {
    if (toast.duration) {
      onResume(toast.id);
    }
  };

  const handleClick = () => {
    if (toast.isExpanded) {
      onCollapse(toast.id);
    } else {
      onExpand(toast.id);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss(toast.id);
  };

  // Colores según el tipo
  const bgColor = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    warning: "bg-orange-500",
    info: "bg-blue-500",
    default: "bg-gray-700",
  }[toast.type];

  const iconBgColor = {
    success: "bg-emerald-400",
    error: "bg-red-400",
    warning: "bg-orange-400",
    info: "bg-blue-400",
    default: "bg-gray-600",
  }[toast.type];

  // Clases de animación según el tipo
  const animationClass = {
    slide: "animate-ios-slide-in",
    fade: "animate-ios-fade-in",
    bounce: "animate-ios-bounce-in",
    zoom: "animate-ios-zoom-in",
  }[toast.animation];

  return (
    <div
      className={cn(
        "relative w-[380px] rounded-2xl shadow-lg overflow-hidden cursor-pointer",
        "transition-all duration-300 ease-out",
        bgColor,
        animationClass
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="p-4 flex items-start gap-3">
        {/* Icon */}
        <div className={cn("flex-shrink-0 p-2 rounded-xl", iconBgColor)}>
          <Icon className="w-5 h-5 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="text-sm font-semibold text-white mb-1">
              {toast.title}
            </h4>
          )}
          <p
            className={cn(
              "text-sm text-white/90 transition-all duration-200",
              !toast.isExpanded && "line-clamp-2"
            )}
          >
            {toast.description}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors transition-ios"
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-white/80" />
        </button>
      </div>

      {/* Progress Bar */}
      {toast.duration && <ToastProgress progress={progress} type={toast.type} />}
    </div>
  );
};
