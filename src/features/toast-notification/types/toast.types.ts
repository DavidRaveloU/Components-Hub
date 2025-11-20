/**
 * Los 5 tipos de toast (success, error, warning, info, default)
 */
export type ToastType = "success" | "error" | "warning" | "info" | "default";

/**
 * Las 6 posiciones posibles
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Tipos de animación (slide, fade, bounce, etc.)
 */
export type ToastAnimation = "slide" | "fade" | "bounce" | "zoom";

/**
 * Toast individual
 */
export interface ToastNotification {
  id: string;
  type: ToastType;
  title?: string;
  description: string;
  position: ToastPosition;
  animation: ToastAnimation;
  duration?: number;
  createdAt: Date;
  isExpanded: boolean;
  isPaused: boolean;
}

/**
 * Opciones al crear un toast (lo que pasa el usuario)
 */
export interface ToastOptions {
  title?: string;
  description: string;
  position?: ToastPosition; // default: "top-right"
  animation?: ToastAnimation; // default: "slide"
  duration?: number; // default: 5000
}

/**
 * Lo que expone el hook/context
 */
export interface ToastContextValue {
  toasts: ToastNotification[];
  success: (options: ToastOptions | string) => string;
  error: (options: ToastOptions | string) => string;
  warning: (options: ToastOptions | string) => string;
  info: (options: ToastOptions | string) => string;
  default: (options: ToastOptions | string) => string;
  dismiss: (id?: string) => void; // sin id = dismiss all
  dismissAll: () => void;
  expand: (id: string) => void;
  collapse: (id: string) => void;
  pause: (id: string) => void;
  resume: (id: string) => void;
}

/**
 * Props del ToastContainer
 */
export interface ToastContainerProps {
  toast: ToastNotification;
  onDismiss: (id: string) => void;
  onExpand: (id: string) => void;
  onCollapse: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  isStacked: boolean;
  stackIndex: number;
}
