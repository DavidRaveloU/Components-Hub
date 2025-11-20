import {
  CheckCircle,
  CircleAlert,
  CircleEllipsis,
  CircleQuestionMark,
  XCircle,
} from "lucide-react";
import type {
  ToastAnimation,
  ToastPosition,
  ToastType,
} from "../types/toast.types";

export const TOAST_TYPE_CONFIG: Record<
  ToastType,
  {
    icon: typeof CheckCircle;
    className: string;
  }
> = {
  success: {
    icon: CheckCircle,
    className: "bg-green-50 border-green-500",
  },
  error: {
    icon: XCircle,
    className: "bg-red-50 border-red-500",
  },
  warning: {
    icon: CircleAlert,
    className: "bg-yellow-50 border-yellow-500",
  },
  info: {
    icon: CircleQuestionMark,
    className: "bg-blue-50 border-blue-500",
  },
  default: {
    icon: CircleEllipsis,
    className: "bg-gray-50 border-gray-500",
  },
};

/**
 * Clases de animación por tipo
 */
export const TOAST_ANIMATION_CONFIG: Record<
  ToastAnimation,
  {
    enter: string;
    exit: string;
  }
> = {
  slide: {
    enter: "animate-slide-in",
    exit: "animate-slide-out",
  },
  fade: {
    enter: "animate-fade-in",
    exit: "animate-fade-out",
  },
  bounce: {
    enter: "animate-bounce-in",
    exit: "animate-bounce-out",
  },
  zoom: {
    enter: "animate-zoom-in",
    exit: "animate-zoom-out",
  },
};

/**
 * Configuración por posición (para saber hacia dónde animar)
 */
export const TOAST_POSITION_CONFIG: Record<
  ToastPosition,
  {
    containerClassName: string;
    stackDirection: "up" | "down";
  }
> = {
  "top-right": {
    containerClassName: "top-4 right-4",
    stackDirection: "down",
  },
  "top-left": {
    containerClassName: "top-4 left-4",
    stackDirection: "down",
  },
  "top-center": {
    containerClassName: "top-4 left-1/2 -translate-x-1/2",
    stackDirection: "down",
  },
  "bottom-right": {
    containerClassName: "bottom-4 right-4",
    stackDirection: "up",
  },
  "bottom-left": {
    containerClassName: "bottom-4 left-4",
    stackDirection: "up",
  },
  "bottom-center": {
    containerClassName: "bottom-4 left-1/2 -translate-x-1/2",
    stackDirection: "up",
  },
};

/**
 * Valores por defecto
 */
export const TOAST_DEFAULTS = {
  position: "top-right" as const,
  animation: "slide" as const,
  duration: 5000,
  maxToasts: 3,
};
