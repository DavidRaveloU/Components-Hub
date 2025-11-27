// Simulación de progreso de carga

import { useCallback, useRef, useState } from "react";

interface UseUploadProgressProps {
  onComplete: () => void;
  onError?: (error: string) => void;
  simulateUpload?: boolean;
}

export function useUploadProgress({
  onComplete,
  onError,
  simulateUpload = true,
}: UseUploadProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const isCancelledRef = useRef(false);

  const startSimulation = useCallback(() => {
    setIsUploading(true);
    setProgress(0);
    isCancelledRef.current = false;

    let currentProgress = 0;

    intervalRef.current = window.setInterval(() => {
      if (isCancelledRef.current) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }

      // Incrementar progreso de forma no lineal (más lento al final)
      const increment = Math.random() * 15 + 5; // Entre 5% y 20%
      currentProgress = Math.min(currentProgress + increment, 100);

      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsUploading(false);

        // Simular posible error (10% de probabilidad)
        if (Math.random() < 0.1 && onError) {
          onError("Upload failed. Please try again.");
        } else {
          onComplete();
        }
      }
    }, 200); // Actualizar cada 200ms
  }, [onComplete, onError]);

  /**
   * Upload real (para usar con API)
   */
  const startRealUpload = useCallback(
    async (
      file: File,
      uploadFn: (
        file: File,
        onProgress: (progress: number) => void
      ) => Promise<void>
    ) => {
      setIsUploading(true);
      setProgress(0);
      isCancelledRef.current = false;

      try {
        await uploadFn(file, (progress) => {
          if (!isCancelledRef.current) {
            setProgress(progress);
          }
        });

        if (!isCancelledRef.current) {
          setProgress(100);
          setIsUploading(false);
          onComplete();
        }
      } catch (error) {
        if (!isCancelledRef.current) {
          setIsUploading(false);
          onError?.(error instanceof Error ? error.message : "Upload failed");
        }
      }
    },
    [onComplete, onError]
  );

  /**
   * Cancelar upload
   */
  const cancel = useCallback(() => {
    isCancelledRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsUploading(false);
    setProgress(0);
  }, []);

  /**
   * Iniciar upload (simulado o real)
   */
  const start = useCallback(
    (
      file?: File,
      uploadFn?: (
        file: File,
        onProgress: (progress: number) => void
      ) => Promise<void>
    ) => {
      if (simulateUpload) {
        startSimulation();
      } else if (file && uploadFn) {
        startRealUpload(file, uploadFn);
      }
    },
    [simulateUpload, startSimulation, startRealUpload]
  );

  return {
    progress,
    isUploading,
    start,
    cancel,
  };
}
