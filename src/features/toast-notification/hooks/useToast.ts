// Hook principal (API para crear toasts)

import type {
  ToastNotification,
  ToastOptions,
  ToastType,
} from "../types/toast.types";
import { useCallback, useState } from "react";

import { TOAST_DEFAULTS } from "../config/toastConfig";
import { applyToastLimit } from "../utils/toastUtils";

export function useToast() {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Generar ID único
  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Crear toast genérico
  const createToast = useCallback(
    (type: ToastType, options: ToastOptions | string) => {
      const id = generateId();

      // Si options es string, es solo la descripción
      const opts: ToastOptions =
        typeof options === "string" ? { description: options } : options;

      const newToast: ToastNotification = {
        id,
        type,
        title: opts.title,
        description: opts.description,
        position: opts.position || TOAST_DEFAULTS.position,
        animation: opts.animation || TOAST_DEFAULTS.animation,
        duration: "duration" in opts ? opts.duration : TOAST_DEFAULTS.duration,
        createdAt: new Date(),
        isExpanded: false,
        isPaused: false,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Aplicar límite de toasts por posición
        return applyToastLimit(updated);
      });
      return id;
    },
    [generateId]
  );

  // Métodos para cada tipo
  const success = useCallback(
    (options: ToastOptions | string) => createToast("success", options),
    [createToast]
  );

  const error = useCallback(
    (options: ToastOptions | string) => createToast("error", options),
    [createToast]
  );

  const warning = useCallback(
    (options: ToastOptions | string) => createToast("warning", options),
    [createToast]
  );

  const info = useCallback(
    (options: ToastOptions | string) => createToast("info", options),
    [createToast]
  );

  const defaultToast = useCallback(
    (options: ToastOptions | string) => createToast("default", options),
    [createToast]
  );

  // Dismiss (eliminar) toast
  const dismiss = useCallback((id?: string) => {
    if (id) {
      // Eliminar toast específico
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    } else {
      // Eliminar todos
      setToasts([]);
    }
  }, []);

  // Dismiss all
  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Expandir toast
  const expand = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isExpanded: true } : toast
      )
    );
  }, []);

  // Colapsar toast
  const collapse = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isExpanded: false } : toast
      )
    );
  }, []);

  // Pausar timer
  const pause = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isPaused: true } : toast
      )
    );
  }, []);

  // Reanudar timer
  const resume = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isPaused: false } : toast
      )
    );
  }, []);

  // Promise toast (loading -> success/error)
  const promise = useCallback(
    async <T>(
      promiseFn: Promise<T>,
      options: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: Error) => string);
        position?: ToastOptions["position"];
        animation?: ToastOptions["animation"];
      }
    ) => {
      // Crear toast de loading
      const loadingId = createToast("info", {
        description: options.loading,
        position: options.position,
        animation: options.animation,
        duration: undefined, // Sin timer para loading
      });

      try {
        const result = await promiseFn;

        // Eliminar loading y mostrar success
        dismiss(loadingId);
        const successMessage =
          typeof options.success === "function"
            ? options.success(result)
            : options.success;

        return success({
          description: successMessage,
          position: options.position,
          animation: options.animation,
        });
      } catch (err) {
        // Eliminar loading y mostrar error
        dismiss(loadingId);
        const errorMessage =
          typeof options.error === "function"
            ? options.error(err as Error)
            : options.error;

        return error({
          description: errorMessage,
          position: options.position,
          animation: options.animation,
        });
      }
    },
    [createToast, dismiss, success, error]
  );

  return {
    toasts,
    success,
    error,
    warning,
    info,
    default: defaultToast,
    dismiss,
    dismissAll,
    expand,
    collapse,
    pause,
    resume,
    promise,
  };
}
